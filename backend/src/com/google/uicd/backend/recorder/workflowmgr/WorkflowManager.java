// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.uicd.backend.recorder.workflowmgr;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.constants.DeviceOrientation;
import com.google.uicd.backend.core.constants.JsonFlag;
import com.google.uicd.backend.core.constants.StopType;
import com.google.uicd.backend.core.db.ActionEntity;
import com.google.uicd.backend.core.db.ActionStorageManager;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.devicesdriver.DeviceCallbackHandler;
import com.google.uicd.backend.core.devicesdriver.DevicesDriverManager;
import com.google.uicd.backend.core.exceptions.UicdActionException;
import com.google.uicd.backend.core.exceptions.UicdDeviceException;
import com.google.uicd.backend.core.exceptions.UicdDeviceHttpConnectionResetException;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.uicdactions.ActionContext;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayMode;
import com.google.uicd.backend.core.uicdactions.ActionExecutionResult;
import com.google.uicd.backend.core.uicdactions.ActionPlayer;
import com.google.uicd.backend.core.uicdactions.BaseAction;
import com.google.uicd.backend.core.uicdactions.ClickAction;
import com.google.uicd.backend.core.uicdactions.CompoundAction;
import com.google.uicd.backend.core.uicdactions.ConditionClickAction;
import com.google.uicd.backend.core.uicdactions.DragAction;
import com.google.uicd.backend.core.uicdactions.ImageMatchingValidationAction;
import com.google.uicd.backend.core.uicdactions.ImageValidationClickAction;
import com.google.uicd.backend.core.uicdactions.InputAction;
import com.google.uicd.backend.core.uicdactions.LongClickAction;
import com.google.uicd.backend.core.uicdactions.LoopScreenContentValidationAction;
import com.google.uicd.backend.core.uicdactions.ScreenContentValidationAction;
import com.google.uicd.backend.core.uicdactions.ScreenRotateAction;
import com.google.uicd.backend.core.uicdactions.ScrollScreenContentValidationAction;
import com.google.uicd.backend.core.uicdactions.SwipeAction;
import com.google.uicd.backend.core.uicdactions.ZoomAction;
import com.google.uicd.backend.core.utils.UicdSnippetClientDriver;
import com.google.uicd.backend.core.xmlparser.Bounds;
import com.google.uicd.backend.core.xmlparser.NodeContext;
import com.google.uicd.backend.core.xmlparser.Position;
import com.google.uicd.backend.core.xmlparser.XmlHelper;
import com.google.uicd.backend.recorder.db.TestCaseHistoryDAO;
import com.google.uicd.backend.recorder.db.TestCaseHistoryEntity;
import com.google.uicd.backend.recorder.websocket.minicap.MinicapUtil;
import java.awt.Point;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkflowManager {

  private CompoundAction workspaceCompoundAction = new CompoundAction();
  private ActionContext actionContext = null;
  private DevicesDriverManager devicesDriverManager;
  private ActionStorageManager actionStorageManager;
  @Autowired TestCaseHistoryDAO testCaseHistoryDAO;
  private PlayMode playMode = PlayMode.SINGLE;
  private Logger logger = LogManager.getLogManager().getLogger("Uicd");
  private NodeContext dragNodeContext;

  public void addAction(String uuid) throws UicdActionException {
    workspaceCompoundAction.addAction(actionStorageManager.getActionByUUID(uuid));
  }

  private void addAction(BaseAction action) {
    actionStorageManager.saveAction(action);
    action.setDeviceIndex(devicesDriverManager.getSelectedDeviceIndex());
    workspaceCompoundAction.addAction(action);
  }

  public void recordScreenValidation(
      Bounds selectedBounds,
      String elementType,
      String value,
      String textMatchType,
      String boundsSearchType,
      String contentStorageType,
      String stopType,
      boolean isLoopValidation,
      boolean isConditionClick,
      boolean isScrollValidation,
      Integer scrollDirection,
      Integer timeout,
      boolean isWaitUntilDisappear) {
    AndroidDeviceDriver androidDeviceDriver = devicesDriverManager.getSelectedAndroidDeviceDriver();
    NodeContext nodeContext = null;
    if (contentStorageType.equals("contextbased")) {
      nodeContext =
          XmlHelper.getContextFromBound(
              androidDeviceDriver.fetchCurrentXML(),
              selectedBounds,
              androidDeviceDriver.getWidthRatio(),
              androidDeviceDriver.getHeightRatio());
    }

    if (isLoopValidation) {
      this.addAction(
          new LoopScreenContentValidationAction(
              selectedBounds,
              elementType,
              value,
              textMatchType,
              boundsSearchType,
              nodeContext,
              StopType.valueOf(stopType),
              timeout,
              isWaitUntilDisappear));
    } else if (isConditionClick) {
      this.addAction(
          new ConditionClickAction(
              selectedBounds,
              elementType,
              value,
              textMatchType,
              boundsSearchType,
              nodeContext,
              StopType.valueOf(stopType)));
    } else if (isScrollValidation) {
      this.addAction(
          new ScrollScreenContentValidationAction(
              selectedBounds,
              elementType,
              value,
              textMatchType,
              boundsSearchType,
              nodeContext,
              StopType.valueOf(stopType),
              scrollDirection));
    } else {
      this.addAction(
          new ScreenContentValidationAction(
              selectedBounds,
              elementType,
              value,
              textMatchType,
              boundsSearchType,
              nodeContext,
              StopType.valueOf(stopType)));
    }
  }

  /* action to perform image matching validation on current phone screen */
  public void recordScreenImageMatchingValidation(String imageMatchingValidationStepMetadataJson) {
    byte[] mapData = imageMatchingValidationStepMetadataJson.getBytes();
    Map<String, String> map = new HashMap<>();
    ObjectMapper objectMapper = new ObjectMapper();

    try {
      map = objectMapper.readValue(mapData, HashMap.class);
    } catch (IOException e) {
      logger.severe(e.getMessage());
      return;
    }

    StopType stopType = StopType.valueOf(map.get("stopType"));
    String boundsSearchType = map.get("textPosition");
    String imageData = map.get("imageData");
    double[] coordinates = new double[4];
    coordinates[0] = Double.parseDouble(map.get("startX"));
    coordinates[1] = Double.parseDouble(map.get("startY"));
    coordinates[2] = Double.parseDouble(map.get("endX"));
    coordinates[3] = Double.parseDouble(map.get("endY"));
    Bounds bounds = new Bounds(coordinates[0], coordinates[1], coordinates[2], coordinates[3]);
    double threshold = Double.parseDouble(map.get("threshold"));
    this.addAction(
        new ImageMatchingValidationAction(
            boundsSearchType, stopType, imageData, bounds, threshold));
  }

  /* actions from the user direct input on the cast screen */
  public void recordAndClick(int x, int y, boolean isDoubleClick) {
    AndroidDeviceDriver androidDeviceDriver = devicesDriverManager.getSelectedAndroidDeviceDriver();
    try {
      NodeContext nodeContext =
          XmlHelper.getContextFromPos(
              androidDeviceDriver.fetchCurrentXML(),
              new Position(x, y),
              androidDeviceDriver.getWidthRatio(),
              androidDeviceDriver.getHeightRatio());
      addAction(new ClickAction(nodeContext, isDoubleClick));
      androidDeviceDriver.clickDevice(x, y, isDoubleClick);
    } catch (UicdDeviceHttpConnectionResetException e) {
      logger.severe(e.getMessage());
    }
  }

  public void recordAndLongClick(int x, int y, int duration) {
    AndroidDeviceDriver androidDeviceDriver = devicesDriverManager.getSelectedAndroidDeviceDriver();
    NodeContext nodeContext =
        XmlHelper.getContextFromPos(
            androidDeviceDriver.fetchCurrentXML(),
            new Position(x, y),
            androidDeviceDriver.getWidthRatio(),
            androidDeviceDriver.getHeightRatio());
    addAction(new LongClickAction(nodeContext, duration));
    androidDeviceDriver.longClickDevice(x, y, duration);
  }

  /* action to perform image matching validation and click if match */
  public void recordAndImageValidationClick(String imageValidationClickMetadataJson) {
    byte[] mapData = imageValidationClickMetadataJson.getBytes();
    Map<String, String> map = new HashMap<>();
    ObjectMapper objectMapper = new ObjectMapper();

    try {
      map = objectMapper.readValue(mapData, HashMap.class);
    } catch (IOException e) {
      logger.severe(e.getMessage());
      return;
    }

    String boundsSearchType = map.get("textPosition");
    String imageData = map.get("imageData");
    double[] coordinates = new double[4];
    coordinates[0] = Double.parseDouble(map.get("startX"));
    coordinates[1] = Double.parseDouble(map.get("startY"));
    coordinates[2] = Double.parseDouble(map.get("endX"));
    coordinates[3] = Double.parseDouble(map.get("endY"));
    Bounds bounds = new Bounds(coordinates[0], coordinates[1], coordinates[2], coordinates[3]);
    double threshold = Double.parseDouble(map.get("threshold"));
    boolean isDoubleClick = map.get("clickType").equals("DoubleClick");
    this.addAction(
        new ImageValidationClickAction(
            boundsSearchType, imageData, bounds, threshold, isDoubleClick));
    AndroidDeviceDriver androidDeviceDriver = devicesDriverManager.getSelectedAndroidDeviceDriver();
    try {
      androidDeviceDriver.clickDevice(
          (int) (coordinates[0] + coordinates[2]) / 2,
          (int) (coordinates[1] + coordinates[3]) / 2,
          isDoubleClick);
    } catch (UicdDeviceHttpConnectionResetException e) {
      logger.severe(e.getMessage());
    }
  }

  public void recordAndSwipe(int startX, int startY, int endX, int endY) {
    AndroidDeviceDriver androidDeviceDriver = devicesDriverManager.getSelectedAndroidDeviceDriver();
    addAction(new SwipeAction(startX, startY, endX, endY));
    androidDeviceDriver.swipeDevice(startX, startY, endX, endY);
  }

  public void recordAndInput(int keyCode) {
    addAction(new InputAction(keyCode));
    AndroidDeviceDriver androidDeviceDriver = devicesDriverManager.getSelectedAndroidDeviceDriver();
    androidDeviceDriver.inputKeyCode(keyCode);
  }

  public void recordAndZoom(int x1, int y1, int x2, int y2, boolean isZoomin){
    AndroidDeviceDriver androidDeviceDriver = devicesDriverManager.getSelectedAndroidDeviceDriver();
    addAction(new ZoomAction(x1, y1, x2, y2, isZoomin));
    androidDeviceDriver.zoomDevice(x1, y1, x2, y2, isZoomin);
  }

  public void recordAndRotate(String direction) {
    addAction(new ScreenRotateAction(direction));
    AndroidDeviceDriver androidDeviceDriver = devicesDriverManager.getSelectedAndroidDeviceDriver();
    try {
      androidDeviceDriver.rotateDevice(DeviceOrientation.fromOrientationCode(direction));
    } catch (UicdExternalCommandException e) {
      logger.warning("Rotate device failed.  " + e.getMessage());
    }
  }

  public void recordDrag(List<Point> dragPoints) {
    addAction(new DragAction(dragNodeContext, dragPoints));
    dragNodeContext = null;
  }

  public List<String> getAllAvailableSnippetMethods(String packageName) {
    UicdSnippetClientDriver UicdSnippetClientDriver =
        new UicdSnippetClientDriver(
            packageName,
            devicesDriverManager.getSelectedAndroidDeviceDriver().getDeviceId(),
            devicesDriverManager
                .getSelectedAndroidDeviceDriver()
                .getDevice()
                .getSnippetClientHostPort());
    List<String> methodList = new ArrayList<>();
    try {
      if (UicdSnippetClientDriver.startAppAndConnect()) {
        Optional<String> result = UicdSnippetClientDriver.sendRpcRequest("help", "[]");
        if (result.isPresent()) {
          for (String line : result.get().split("\n")) {
            // The valid response example:
            //   @Rpc waitForSms(int) returns JSONObject  // Wait for incoming SMS message.
            if (line.indexOf("@") >= 0) {
              methodList.add(line.substring(line.indexOf(" "), line.indexOf("//")).trim());
            }
          }
        } else {
          logger.warning("Failed to fetch all the methods under package: " + packageName);
        }
      }
    } catch (UicdExternalCommandException e) {
      logger.warning(e.getMessage());
    }
    return methodList;
  }

  // in the future we might want to extends this one, so that will support other type
  public String getContentInBounds(Bounds selectedBounds) {
    AndroidDeviceDriver androidDeviceDriver = devicesDriverManager.getSelectedAndroidDeviceDriver();
    List<String> xmls = androidDeviceDriver.fetchCurrentXML();
    NodeContext nodeContext =
        XmlHelper.getContextFromBound(
            xmls,
            selectedBounds,
            androidDeviceDriver.getWidthRatio(),
            androidDeviceDriver.getHeightRatio());
    if (nodeContext == null || nodeContext.getLeafNodeContext() == null) {
      return "";
    }
    return nodeContext.getLeafNodeContext().toJsonStr();
  }

  public void addActionToWorkflow(String jsonString) {
    for (BaseAction action : BaseAction.actionsFromJson(jsonString)) {
      // overwrite name if it is set to default
      if (action.getName().isEmpty() || action.getName().equals("New Action")) {
        action.setName(action.getDisplay());
      }
      addAction(action);
    }
  }

  public String getWorkflowJson() {
    return this.workspaceCompoundAction.toJson(JsonFlag.FRONTEND);
  }

  // Get workflow and load it to workspace
  public String loadWorkflow(String uuidStr) throws UicdActionException {
    this.workspaceCompoundAction = (CompoundAction) actionStorageManager.getActionByUUID(uuidStr);
    return workspaceCompoundAction.toJson(JsonFlag.FRONTEND);
  }

  // export test case
  public Optional<String> getWorkflow(String uuidStr) throws UicdActionException {
    BaseAction action = actionStorageManager.getActionByUUID(uuidStr);
    if (action == null) {
      logger.warning("Could not load workflow with UUID: " + uuidStr);
      return Optional.empty();
    }
    return Optional.of(action.toJson(JsonFlag.EXPORT));
  }

  public String saveCurrentWorkflow(String actionMetadataJson) {
    // Copying a testcase generates a workspace with new uuid
    workspaceCompoundAction = (CompoundAction) updateActionMetadata(actionMetadataJson);
    actionStorageManager.saveDescentActionsInMap(
        this.workspaceCompoundAction.getActionId().toString());
    return this.workspaceCompoundAction.toJson(JsonFlag.FRONTEND);
  }

  public Optional<String> getActionDetails(String uuidStr) throws UicdActionException {
    BaseAction action = actionStorageManager.getActionByUUID(uuidStr);
    if (action == null) {
      logger.warning("Could not load action with UUID: " + uuidStr);
      return Optional.empty();
    }
    return Optional.of(action.toJson(JsonFlag.FRONTEND));
  }

  public void removeAction(String uuidStr) {
    workspaceCompoundAction.removeAction(uuidStr);
  }

  public void removeLastAction() {
    if (workspaceCompoundAction.childrenActions.isEmpty()) {
      return;
    }
    workspaceCompoundAction.removeAction(
        workspaceCompoundAction
            .childrenActions
            .get(workspaceCompoundAction.childrenActions.size() - 1)
            .getActionId()
            .toString());
  }

  public String createNewWorkSpace() {
    this.workspaceCompoundAction = new CompoundAction();
    actionStorageManager.saveAction(workspaceCompoundAction, true);
    return this.workspaceCompoundAction.toJson(JsonFlag.FRONTEND);
  }

  public void setPlayMode(String playModeStr) {
    playMode = PlayMode.valueOf(playModeStr);
  }

  /* actions from the user direct input on the cast screen end */
  public String playCurrent() throws UicdDeviceException, UicdActionException {
    return playAction(this.workspaceCompoundAction.getActionId().toString());
  }

  public String playCurrentWorkflowFromAction(String actionId) throws UicdDeviceException {
    CompoundAction temp;
    try {
      if (!workspaceCompoundAction.childrenIdList.contains(actionId)) {
        logger.warning("Action not found in workflow: " + actionId);
        return new ActionExecutionResult().toJson();
      }
      temp = (CompoundAction) workspaceCompoundAction.clone();
    } catch (CloneNotSupportedException e) {
      logger.warning("Error running workflow: " + e.getMessage());
      return new ActionExecutionResult().toJson();
    }
    while (!temp.childrenIdList.get(0).equals(actionId)) {
      temp.childrenIdList.remove(0);
      temp.childrenActions.remove(0);
    }
    return playAction(temp);
  }

  public String playAction(String actionId) throws UicdActionException, UicdDeviceException {
    return playAction(actionStorageManager.getActionByUUID(actionId));
  }

  private String playAction(BaseAction currentAction) throws UicdDeviceException {

    actionContext = new ActionContext();
    actionContext.setPlayMode(playMode);
    actionContext.setCurrentDeviceIndex(devicesDriverManager.getSelectedDeviceIndex());
    resetPlaybackState();
    ActionPlayer actionPlayer =
        new ActionPlayer(devicesDriverManager.getXmldumperDriverList(), actionContext);
    ActionExecutionResult actionExecutionResult = actionPlayer.playAction(currentAction);
    try {
      saveTestHistory(actionExecutionResult, currentAction);
    } catch (Exception ex) {
      logger.warning("Save the execution result to History table failed!");
    }
    return actionExecutionResult.toJson();
  }

  public void cancelCurrentPlayback() {
    if (actionContext != null) {
      actionContext.stopPlayback();
    }
  }

  private void resetPlaybackState() {
    if (actionContext != null) {
      actionContext.resetPlaybackState();
    }
  }

  public BaseAction updateActionMetadata(String jsonData) {
    return actionStorageManager.updateActionMetadata(jsonData);
  }

  public void deleteAction(String uuid) throws UicdActionException {
    actionStorageManager.deleteAction(uuid);
  }

  public String copyAction(String uuid) throws UicdActionException, CloneNotSupportedException {
    CompoundAction oldAction = (CompoundAction) actionStorageManager.getActionByUUID(uuid);
    CompoundAction newAction = (CompoundAction) oldAction.clone();
    actionStorageManager.saveAction(newAction);
    return ((BaseAction) newAction).toJson(JsonFlag.FRONTEND);
  }

  @PostConstruct
  private void init() {
    DeviceCallbackHandler.getInstance().setDeviceCallBack(MinicapUtil::deviceCallbackOperation);
    actionStorageManager = new ActionStorageManager(true);
    actionStorageManager.saveAction(workspaceCompoundAction);
    devicesDriverManager = DevicesDriverManager.getInstance();
  }

  private void saveTestHistory(
      ActionExecutionResult actionExecutionResult, BaseAction currentAction) {
    TestCaseHistoryEntity testCaseHistoryEntity = new TestCaseHistoryEntity();
    testCaseHistoryEntity.setUuid(UUID.randomUUID().toString());
    testCaseHistoryEntity.setCreatedBy(UicdConfig.getInstance().getCurrentUser());
    testCaseHistoryEntity.setTestcaseUuid(currentAction.getActionId().toString());
    testCaseHistoryEntity.setTestDetails(actionExecutionResult.toJson());
    testCaseHistoryEntity.setTestMsg(
        currentAction.getActionType() + ": " + currentAction.getDisplay());
    testCaseHistoryEntity.setTestResult(actionExecutionResult.getPlayStatus().toString());
    testCaseHistoryDAO.saveTestExecution(testCaseHistoryEntity);
  }

  public void dragStart(Integer x, Integer y) {
    AndroidDeviceDriver androidDeviceDriver = devicesDriverManager.getSelectedAndroidDeviceDriver();
    dragNodeContext =
        XmlHelper.getContextFromPos(
            androidDeviceDriver.fetchCurrentXML(),
            new Position(x, y),
            androidDeviceDriver.getWidthRatio(),
            androidDeviceDriver.getHeightRatio());
    androidDeviceDriver.dragStart(x, y);
  }

  public void dragMove(Integer x, Integer y) {
    if (dragNodeContext == null) {
      return;
    }
    devicesDriverManager.getSelectedAndroidDeviceDriver().dragMove(x, y);
  }

  public void dragStop(Integer x, Integer y) {
    devicesDriverManager.getSelectedAndroidDeviceDriver().dragStop(x, y);
  }

  public List<ActionEntity> getActionByName(String name, String type) {
    return actionStorageManager.getActionByName(name, type);
  }
}
