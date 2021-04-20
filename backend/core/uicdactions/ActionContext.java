// Copyright 2021 Google LLC
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

package com.google.uicd.backend.core.uicdactions;

import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.globalvariables.UicdGlobalVariableMap;
import com.google.uicd.backend.core.utils.ImageUtil;
import java.nio.file.Paths;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.UUID;

/** ActionContext. Context class for action player. */
public class ActionContext {

  public ActionContext() {
    this.executionId = UUID.randomUUID();
  }

  private final UUID executionId;
  private final Deque<PlayStatus> playStatusStack = new ArrayDeque<>();
  private UUID currentPlayingActionId;
  private String currentPlayingActionName;
  private int currentDeviceIndex;
  private PlayMode playMode = PlayMode.SINGLE;
  private int actionSequenceIndex = 0;
  private boolean cancelRequested = false;
  private double playSpeedFactor = 1.0;
  private static final String PNG_EXTENSION = ".png";
  private static final String FAILED_STEP_SCREEN_CAP_FILENAME = "FailedStepScreenShot.png";

  private List<String> lastXmlDump = new ArrayList<>();
  private List<String> failedStepXmlDump = new ArrayList<>();

  /* Use this field only for the frontend highlight feature, sometimes we will have a workflow
   * contains two same compound actions, we need use index to figure out which one to highlight
   */
  private int currentPlayActionIndex = 0;
  private final Deque<Integer> currentPlayingPath = new ArrayDeque<>();

  private UicdGlobalVariableMap globalVariableMap = new UicdGlobalVariableMap();

  private String rootActionName = "";

  protected int getNextActionSequenceIndex() {
    return actionSequenceIndex++;
  }

  public boolean canRunAction() {
    PlayStatus playStatus = getTopPlayStatus();
    return playStatus == PlayStatus.READY || playStatus == PlayStatus.PASS;
  }

  /** Injects the global variable into the target string */
  public String expandUicdGlobalVariable(String target, String deviceId) {
    if (target == null) {
      return "";
    }
    // target could have multiple $uicd, we need replace all of them
    for (String keyWord : UicdGlobalVariableMap.PARAM_KEYWORD_LIST) {
      String devicdIdKeyword = UicdGlobalVariableMap.getUicdDeviceidParamKeyword(keyWord);
      if (target.contains(devicdIdKeyword)) {
        target = target.replace(devicdIdKeyword, deviceId);
      }
    }

    for (String key : this.globalVariableMap.getRawMap().keySet()) {
      if (target.contains(key)) {
        target = target.replace(key, this.globalVariableMap.getRawValue(key));
      }
    }

    return target;
  }

  public int getCurrentActionSequenceIndex() {
    return actionSequenceIndex;
  }

  public UUID getExecutionId() {
    return executionId;
  }

  public int getCurrentDeviceIndex() {
    return currentDeviceIndex;
  }

  public UUID getCurrentPlayingActionId() {
    return currentPlayingActionId;
  }

  public void setCurrentPlayingAction(UUID actionId, String name) {
    this.currentPlayingActionId = actionId;
    this.currentPlayingActionName = name;
  }

  public void setCurrentDeviceIndex(int currentDeviceIndex) {
    this.currentDeviceIndex = currentDeviceIndex;
  }

  public void resetPlaybackState() {
    cancelRequested = false;
  }

  public void stopPlayback() {
    cancelRequested = true;
  }

  public boolean playbackStopRequested() {
    return cancelRequested;
  }

  public PlayMode getPlayMode() {
    return playMode;
  }

  public PlayStatus getTopPlayStatus() {
    if (playStatusStack.isEmpty()) {
      return PlayStatus.READY;
    }
    return playStatusStack.peek();
  }

  /**
   * Pops the stack when we finish current action, return to its parent level. Need bubble up if the
   * status if it is fail or cancelled.
   */
  public PlayStatus popPlayStatus() {
    PlayStatus playStatus = playStatusStack.pop();
    if (playStatus == PlayStatus.FAIL || playStatus == PlayStatus.CANCELLED) {
      updateTopPlayStatus(playStatus);
    }
    return playStatus;
  }

  /**
   * Uses a stack to track the current play status, we can consider the workflow as a Graph (Tree in
   * most cases), note that we can add some compound action multiple times to the parent. Adding
   * special logic in push pop to handle our need like EXIT_CURRENT_COMPOUND. Before run the action
   * push the status into the stack, and change the status from its parent
   */
  public void pushPlayStatus(PlayStatus playStatus, boolean runAlways) {
    if (canRunAction() || runAlways) {
      playStatusStack.push(playStatus);
    } else {
      playStatusStack.push(PlayStatus.SKIPPED);
    }
  }

  public void pushPlayStatus(PlayStatus playStatus) {
    pushPlayStatus(playStatus, false);
  }

  /** Provides a helper function to set the fail status.. */
  public void setFailStatusRecordXmlAndScreen(String deviceId) {
    updateTopPlayStatus(PlayStatus.FAIL);
    recordFailedXmlDump();

    String failScreenshotPath =
        getOutputFileFullPath(rootActionName + "_" + FAILED_STEP_SCREEN_CAP_FILENAME);
    ImageUtil.saveScreenshotToLocal(deviceId, failScreenshotPath);
  }

  /** Updates the status on the top of the stack */
  public void updateTopPlayStatus(PlayStatus playStatus) {
    if (playStatusStack.isEmpty()) {
      return;
    }
    playStatusStack.pop();
    playStatusStack.push(playStatus);
  }

  /** For validation action, the result affects parents status. */
  public void updateParentPlayStatus(PlayStatus playStatus) {
    if (playStatusStack.size() < 2) {
      return;
    }
    PlayStatus tmpTopPlaystatus = playStatusStack.pop();
    playStatusStack.pop();
    playStatusStack.push(playStatus);
    playStatusStack.push(tmpTopPlaystatus);
  }

  public void setGlobalVariableMap(UicdGlobalVariableMap uicdGlobalVariableMap) {
    this.globalVariableMap = uicdGlobalVariableMap;
  }

  public void setPlayMode(PlayMode playMode) {
    this.playMode = playMode;
  }

  public UicdGlobalVariableMap getGlobalVariableMap() {
    return globalVariableMap;
  }

  public double getPlaySpeedFactor() {
    return playSpeedFactor;
  }

  public void setPlaySpeedFactor(double playSpeedFactor) {
    // Speed can not be smaller than 10% of the original speed
    this.playSpeedFactor = Math.max(playSpeedFactor, 0.1);
  }

  /**
   * Gets a descriptive path from this action context instance.
   *
   * @param filename the target filename
   * @return Full path of the screenshot specific to the currently playing action..
   */
  public String getOutputFileFullPath(String filename) {
    return Paths.get(getCurrentActionOutputBasePath(), filename).toString();
  }

  private String getCurrentActionOutputBasePath() {
    return Paths.get(
            UicdConfig.getInstance().getTestOutputFolder(), this.getExecutionId().toString())
        .toString();
  }

  /**
   * Gets a descriptive path from this action context instance.
   *
   * @param prefix the prefix of the filename so that later we know the origin(screen cap/ocr etc)
   * @return Full path of the screenshot specific to the currently playing action..
   */
  public String getScreenCapFullPath(String prefix) {
    // Action name could contain whitespace, file system doesn't like it.
    String actionName =
        this.getCurrentPlayingActionName()
            .replaceAll("\\s", "_")
            .replaceAll("[()'\"]", "_");
    return getOutputFileFullPath(
        prefix
            + actionName
            + "_"
            + this.getCurrentPlayingActionId().toString().substring(0, 4)
            + PNG_EXTENSION);
  }

  public String getScreenCapFullPath() {
    return getScreenCapFullPath("");
  }

  public int getCurrentPlayActionIndex() {
    return currentPlayActionIndex;
  }

  public void setCurrentPlayActionIndex(int currentPlayActionIndex) {
    this.currentPlayActionIndex = currentPlayActionIndex;
  }

  public void increaseCurrentPlayActionIndex() {
    this.currentPlayActionIndex++;
  }

  public Deque<Integer> getCurrentPlayingPath() {
    return currentPlayingPath;
  }

  public static ActionContext makeCopy(ActionContext other) {
    ActionContext actionContext = new ActionContext();
    actionContext.globalVariableMap = other.getGlobalVariableMap();
    return actionContext;
  }

  public void setLastXmlDump(List<String> lastXmlDump) {
    this.lastXmlDump = lastXmlDump;
  }

  public void recordFailedXmlDump() {
    // If runAlways is true, the lastXmlDump might not be the same xml we got from the failed step.
    // Need call this function directly in the validationAction to update the failedStepXmlDump.
    this.failedStepXmlDump = this.lastXmlDump;
  }

  public String getCurrentPlayingActionName() {
    return currentPlayingActionName;
  }

  public List<String> getFailedStepXmlDump() {
    return failedStepXmlDump;
  }

  public void setRootActionName(String rootActionName) {
    this.rootActionName = rootActionName;
  }

  public String getRootActionName() {
    return rootActionName;
  }

  /**
   * PlayMode Uicd support three modes SINGLE: one device MULTIDEVICE: multidevices with interaction
   * PLAYALL: multidevices the play together without interaction
   */
  public enum PlayMode {
    SINGLE,
    MULTIDEVICE,
    PLAYALL
  }

  /** PlayStatus */
  public enum PlayStatus {
    READY,
    PASS,
    FAIL,
    CANCELLED,
    SKIPPED,
    EXIT_CURRENT_COMPOUND
  }
}
