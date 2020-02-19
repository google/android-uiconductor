// Copyright 2019 Google LLC
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

import com.fasterxml.jackson.core.type.TypeReference;
import com.google.api.client.util.Base64;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.constants.DeviceOrientation;
import com.google.uicd.backend.core.constants.JsonFlag;
import com.google.uicd.backend.core.db.ImageStorageManager;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.devicesdriver.DeviceCallbackHandler;
import com.google.uicd.backend.core.devicesdriver.DevicesDriverManager;
import com.google.uicd.backend.core.exceptions.UicdActionException;
import com.google.uicd.backend.core.exceptions.UicdDeviceException;
import com.google.uicd.backend.core.exceptions.UicdDeviceHttpConnectionResetException;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.uicdactions.ActionContext;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayMode;
import com.google.uicd.backend.core.uicdactions.ActionExecutionResult;
import com.google.uicd.backend.core.uicdactions.ActionPlayer;
import com.google.uicd.backend.core.uicdactions.BaseAction;
import com.google.uicd.backend.core.uicdactions.ClickAction;
import com.google.uicd.backend.core.uicdactions.CompoundAction;
import com.google.uicd.backend.core.uicdactions.DragAction;
import com.google.uicd.backend.core.uicdactions.InputAction;
import com.google.uicd.backend.core.uicdactions.LongClickAction;
import com.google.uicd.backend.core.uicdactions.ScreenContentValidationAction;
import com.google.uicd.backend.core.uicdactions.ScreenRotateAction;
import com.google.uicd.backend.core.uicdactions.SwipeAction;
import com.google.uicd.backend.core.uicdactions.ValidationReqDetails;
import com.google.uicd.backend.core.uicdactions.ZoomAction;
import com.google.uicd.backend.core.utils.ImageUtil;
import com.google.uicd.backend.core.utils.JsonUtil;
import com.google.uicd.backend.core.utils.Region;
import com.google.uicd.backend.core.utils.UicdSnippetClientDriver;
import com.google.uicd.backend.core.xmlparser.Bounds;
import com.google.uicd.backend.core.xmlparser.NodeContext;
import com.google.uicd.backend.core.xmlparser.Position;
import com.google.uicd.backend.core.xmlparser.XmlHelper;
import com.google.uicd.backend.recorder.db.DbActionStorageManager;
import com.google.uicd.backend.recorder.db.TestHistoryEntity;
import com.google.uicd.backend.recorder.services.TestHistoryManager;
import com.google.uicd.backend.recorder.websocket.minicap.MinicapUtil;
import java.awt.Point;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

/** Manages workflow. */
@Service
public class WorkflowManager {

  private CompoundAction workspaceCompoundAction = new CompoundAction();
  private ActionContext actionContext = null;
  private DevicesDriverManager devicesDriverManager;

  @Autowired private DbActionStorageManager actionStorageManager;

  @Autowired private ApplicationContext applicationContext;

  private ImageStorageManager imageStorageManager;
  @Autowired TestHistoryManager testHistoryManager;

  private PlayMode playMode = PlayMode.SINGLE;
  private Logger logger = LogManager.getLogManager().getLogger("uicd");
  private NodeContext dragNodeContext;

  private String globalVariableMapStr = "";

  public void addAction(String uuid) throws UicdActionException {
    workspaceCompoundAction.addAction(actionStorageManager.getActionByUUID(uuid));
  }

  private void addAction(BaseAction action) {
    action.setDeviceIndex(devicesDriverManager.getSelectedDeviceIndex());
    actionStorageManager.saveAction(action);
    workspaceCompoundAction.addAction(action);
    actionStorageManager.saveAction(workspaceCompoundAction);
  }

  /**
   * Record validations by saving the validation request details and adding to workspace.
   *
   * @param validationReqDetails Validation request details retrieved from Json.
   */
  public void recordScreenValidation(ValidationReqDetails validationReqDetails) {
    AndroidDeviceDriver androidDeviceDriver = devicesDriverManager.getSelectedAndroidDeviceDriver();

    validationReqDetails =
        validationReqDetails.withNodeContext(
            XmlHelper.getContextFromBound(
                androidDeviceDriver.fetchCurrentXML(),
                validationReqDetails.getSelectedBounds(),
                androidDeviceDriver.getWidthRatio(),
                androidDeviceDriver.getHeightRatio()));

    BaseAction action = validationReqDetails.toAction();
    if (action != null) {
      this.addAction(action);
    }
  }

  public void updateValidationAction(String uuidStr, ValidationReqDetails validationReqDetails)
      throws UicdActionException {
    BaseAction action = actionStorageManager.getActionByUUID(uuidStr);

    if (action instanceof ScreenContentValidationAction
        && ((ScreenContentValidationAction) action).getSavedNodeContext() != null) {
      ScreenContentValidationAction screenContentValidationAction =
          (ScreenContentValidationAction) action;
      validationReqDetails =
          validationReqDetails.withNodeContext(screenContentValidationAction.getSavedNodeContext());
    }

    BaseAction newAction = validationReqDetails.toAction();
    newAction.updateCommonFields(action);
    action.updateAction(newAction);
    actionStorageManager.saveAction(action);
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

  public void recordAndZoom(int x1, int y1, int x2, int y2, boolean isZoomin) {
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
    UicdSnippetClientDriver uicdSnippetClientDriver =
        new UicdSnippetClientDriver(
            packageName,
            devicesDriverManager.getSelectedAndroidDeviceDriver().getDeviceId(),
            devicesDriverManager
                .getSelectedAndroidDeviceDriver()
                .getDevice()
                .getSnippetClientHostPort());
    List<String> methodList = new ArrayList<>();
    try {
      if (uicdSnippetClientDriver.startAppAndConnect()) {
        Optional<String> result = uicdSnippetClientDriver.sendRpcRequest("help", "[]");
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
    this.globalVariableMapStr = workspaceCompoundAction.getAdditionalData().getGlobalVariableStr();
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
    actionStorageManager.saveAction(this.workspaceCompoundAction);
    return this.workspaceCompoundAction.toJson(JsonFlag.FRONTEND);
  }

  public boolean saveCurrentWorkflowWithoutMetadata() {
    return actionStorageManager.saveAction(this.workspaceCompoundAction);
  }

  public Optional<String> getActionDetails(String uuidStr) throws UicdActionException {
    BaseAction action = actionStorageManager.getActionByUUID(uuidStr);
    if (action == null) {
      logger.warning("Could not load action with UUID: " + uuidStr);
      return Optional.empty();
    }
    return Optional.of(action.toJson(JsonFlag.FRONTEND));
  }

  public void removeAction(int index) {
    workspaceCompoundAction.removeByIndex(index);
  }

  public void removeLastAction() {
    workspaceCompoundAction.removeLastAction();
    actionStorageManager.saveAction(workspaceCompoundAction);
  }

  public String createNewWorkSpace() {
    this.workspaceCompoundAction = new CompoundAction();
    actionStorageManager.saveAction(workspaceCompoundAction);
    return this.workspaceCompoundAction.toJson(JsonFlag.FRONTEND);
  }

  public void setPlayMode(String playModeStr) {
    playMode = PlayMode.valueOf(playModeStr);
  }

  public String getPlayMode() {
    return playMode.name();
  }

  /* actions from the user direct input on the cast screen end */
  public String playCurrent(double speedFactor) throws UicdDeviceException, UicdActionException {
    return playAction(this.workspaceCompoundAction.getActionId().toString(), speedFactor);
  }

  public String playCurrentWorkflowFromAction(String actionId, double speedFactor)
      throws UicdDeviceException {
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
    int offset = 0;
    while (!temp.childrenIdList.get(0).equals(actionId)) {
      offset++;
      temp.childrenIdList.remove(0);
      temp.childrenActions.remove(0);
    }
    return playAction(temp, speedFactor, offset);
  }

  public String playAction(String actionId, double playSpeedFactor)
      throws UicdActionException, UicdDeviceException {
    return playAction(actionId, playSpeedFactor, 0);
  }

  public String playAction(String actionId, double playSpeedFactor, int offset)
      throws UicdActionException, UicdDeviceException {
    // If actionId is not provided by frontend, backend will play the current workspace.
    if (actionId.isEmpty()) {
      actionId = this.workspaceCompoundAction.getActionId().toString();
    }
    return playAction(actionStorageManager.getActionByUUID(actionId), playSpeedFactor, offset);
  }

  private String playAction(BaseAction currentAction, double playSpeedFactor, int offset)
      throws UicdDeviceException {

    actionContext = new ActionContext();
    actionContext.setPlayMode(playMode);
    actionContext.setCurrentDeviceIndex(devicesDriverManager.getSelectedDeviceIndex());
    actionContext.getGlobalVariableMap().fillRawMapByJsonOrPlainStr(globalVariableMapStr);
    actionContext.setCurrentPlayActionIndex(offset);
    resetPlaybackState();
    actionContext.setPlaySpeedFactor(playSpeedFactor);
    ActionPlayer actionPlayer =
        new ActionPlayer(devicesDriverManager.getXmlDumperDriverList(), actionContext);
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

  public String copyAction(String uuid) throws UicdActionException, CloneNotSupportedException {
    CompoundAction oldAction = (CompoundAction) actionStorageManager.getActionByUUID(uuid);
    CompoundAction newAction = (CompoundAction) oldAction.clone();
    actionStorageManager.saveAction(newAction);
    return newAction.toJson(JsonFlag.FRONTEND);
  }

  /* Initialize objects that are not managed by Spring. WorkflowManager is actually the boundary of
   * Spring MVC and core library which is independent of Spring and used by uicdcli and
   * Mobileharness. Make it public otherwise ErrorProne in g3 will have a warning about init is
   * never used.
   */
  @PostConstruct
  public void init() {
    DeviceCallbackHandler.getInstance().setDeviceCallBack(MinicapUtil::deviceCallbackOperation);
    actionStorageManager.saveAction(workspaceCompoundAction);
    devicesDriverManager = DevicesDriverManager.getInstance();
    imageStorageManager = ImageStorageManager.getInstance();
  }

  private void saveTestHistory(
      ActionExecutionResult actionExecutionResult, BaseAction currentAction) throws UicdException {
    TestHistoryEntity testCaseHistoryEntity = new TestHistoryEntity();
    testCaseHistoryEntity.setUuid(UUID.randomUUID().toString());
    testCaseHistoryEntity.setCreatedBy(UicdConfig.getInstance().getCurrentUser());
    testCaseHistoryEntity.setTestcaseUuid(currentAction.getActionId().toString());
    testCaseHistoryEntity.setTestDetails(actionExecutionResult.toJson());
    testCaseHistoryEntity.setTestMsg(
        currentAction.getActionType() + ": " + currentAction.getDisplay());
    testCaseHistoryEntity.setTestResult(actionExecutionResult.getPlayStatus().toString());
    testHistoryManager.save(testCaseHistoryEntity);
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

  public CompoundAction getCurrentWorkflow() {
    return this.workspaceCompoundAction;
  }

  /**
   * Reorder the current workflow compound's children Action based on the order of actionIdList,
   * enable user to reorder by "drag and drop" on frontend.
   *
   * @param actionIdList the new order of the children actions
   */
  public void reorderActions(List<String> actionIdList) {
    if (this.workspaceCompoundAction == null) {
      logger.warning("Reorder empty workspace. Backend/Frontend out of sync.");
      return;
    }
    this.workspaceCompoundAction.childrenIdList = actionIdList;
    List<BaseAction> updatedActionList = new ArrayList<>();
    for (String id : actionIdList) {
      updatedActionList.add(
          this.workspaceCompoundAction.childrenActions.stream()
              .filter(action -> action.getActionId().toString().equals(id))
              .findFirst()
              .get());
    }
    this.workspaceCompoundAction.childrenActions = updatedActionList;

    actionStorageManager.saveAction(this.workspaceCompoundAction);
  }

  public String getGlobalVariableMapInPlainString() {
    return globalVariableMapStr;
  }

  public void setGlobalVariableMapStringFormat(String globalVariableMapStr) {
    workspaceCompoundAction.getAdditionalData().setGlobalVariableStr(globalVariableMapStr);
    this.globalVariableMapStr = globalVariableMapStr;
  }

  /**
   * Sets the workflow replay speed on the fly. Only can be triggered from frontend. In MH or CLI,
   * it will still use the default speed.
   *
   * @param playSpeedFactor the speed factor of the replay. 1.0 means normal speed.
   */
  public void setPlaySpeedFactor(double playSpeedFactor) {
    if (actionContext == null) {
      return;
    }
    actionContext.setPlaySpeedFactor(playSpeedFactor);
  }

  public String takeScreenshot() throws UicdException, IOException {
    String deviceId = devicesDriverManager.getSelectedAndroidDeviceDriver().getDeviceId();
    String screenshotTmpPath = UicdConfig.getInstance().getTestOutputFolder();
    screenshotTmpPath = Paths.get(screenshotTmpPath, deviceId, "tmpScreenCapture.png").toString();
    ImageUtil.saveScreenshotToLocal(deviceId, screenshotTmpPath);
    BufferedImage bImage = ImageIO.read(new File(screenshotTmpPath));
    ByteArrayOutputStream bos = new ByteArrayOutputStream();
    ImageIO.write(bImage, "png", bos);
    return Base64.encodeBase64String(bos.toByteArray());
  }

  public String addImage(String imgBase64Str) {
    String uuid = UUID.randomUUID().toString();
    byte[] imgBytes = Base64.decodeBase64(imgBase64Str);
    imageStorageManager.addImage(uuid, imgBytes);
    return uuid;
  }

  public void deleteImage(String uuid) {
    imageStorageManager.deleteImage(uuid);
  }

  public void updateImage(String uuid, String imgBase64Str) {
    byte[] imgBytes = Base64.decodeBase64(imgBase64Str);
    imageStorageManager.updateImage(uuid, imgBytes);
  }

  public String getImage(String uuid) {
    return Base64.encodeBase64String(imageStorageManager.getImage(uuid));
  }

  public String getScaledRegions(String regionsJson) {
    List<Region> scaledRegions = new ArrayList<>();
    AndroidDeviceDriver deviceDriver = devicesDriverManager.getSelectedAndroidDeviceDriver();
    for (Region region : JsonUtil.fromJson(regionsJson, new TypeReference<List<Region>>() {})) {
      scaledRegions.add(
          region.getScaledRegion(
              /* hostScrnWidth= */ deviceDriver.getHostScreenWidth(),
              /* hostScrnHeight= */ deviceDriver.getHostScreenHeight(),
              /* devPhyWidth= */ deviceDriver.getDevice().getWidth(),
              /* devPhyHeight= */ deviceDriver.getDevice().getHeight()));
    }
    return JsonUtil.toJson(scaledRegions);
  }

  public int getScaledScreenWidth() {
    return devicesDriverManager.getSelectedAndroidDeviceDriver().getHostScreenWidth();
  }

  public int getScaledScreenHeight() {
    return devicesDriverManager.getSelectedAndroidDeviceDriver().getHostScreenHeight();
  }

  public Map<String, String> getUuidToBase64RefImgs(String uuid) throws UicdActionException {
    return actionStorageManager.getUuidToBase64RefImgs(uuid);
  }
}
