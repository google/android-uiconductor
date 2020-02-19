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

package com.google.uicd.backend.core.uicdactions;

import com.google.common.annotations.VisibleForTesting;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.globalvariables.UicdGlobalVariableMap;
import java.nio.file.Paths;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.UUID;

/**
 * ActionContext. Context class for action player.
 */
public class ActionContext {

  public ActionContext() {
    this.executionId = UUID.randomUUID();
  }
  private final UUID executionId;
  private final HashMap<String, PlayStatus> devicesStatus = new HashMap<>();
  private UUID currentPlayingActionId;
  private int currentDeviceIndex;
  private PlayMode playMode = PlayMode.SINGLE;
  private int actionSequenceIndex = 0;
  private boolean cancelRequested = false;
  private double playSpeedFactor = 1.0;
  private static final String PNG_EXTENSION = ".png";

  /* Use this field only for the frontend highlight feature, sometimes we will have a workflow
   * contains two same compound actions, we need use index to figure out which one to highlight
   */
  private int currentPlayActionIndex = 0;
  private final Deque<Integer> currentPlayingPath = new ArrayDeque<>();

  private UicdGlobalVariableMap globalVariableMap = new UicdGlobalVariableMap();

  protected int getNextActionSequenceIndex() {
    return actionSequenceIndex++;
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

  public void setCurrentPlayingActionId(UUID currentPlayingActionId) {
    this.currentPlayingActionId = currentPlayingActionId;
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

  public void setPlayMode(PlayMode playMode) {
    this.playMode = playMode;
  }

  public void setFailStatus(String deviceId) {
    devicesStatus.put(deviceId, PlayStatus.FAIL);
  }

  @VisibleForTesting
  public void setDevicesStatus(String deviceId, PlayStatus status) {
    devicesStatus.put(deviceId, status);
  }

  public void removeStatus(String deviceId) {
    devicesStatus.remove(deviceId);
  }

  public boolean canRunAction(String deviceId) {
    if (this.playMode == playMode.MULTIDEVICE) {
      return this.devicesStatus.values().stream().noneMatch(x-> x == PlayStatus.FAIL);
    }
    return devicesStatus.getOrDefault(deviceId, PlayStatus.READY) != PlayStatus.FAIL;
  }

  public void setGlobalVariableMap(UicdGlobalVariableMap uicdGlobalVariableMap) {
    this.globalVariableMap = uicdGlobalVariableMap;
  }

  public String expandUicdGlobalVariable(String target, String deviceId) {
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
   * @return Full path of the screenshot specific to the currently playing action..
   */
  public String getScreenCapFullPath() {
    return Paths.get(
            UicdConfig.getInstance().getTestOutputFolder(),
            this.getExecutionId().toString(),
            this.getCurrentPlayingActionId() + PNG_EXTENSION)
        .toString();
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

  /**
   * PlayMode Uicd support three modes SINGLE: one device MULTIDEVICE: multidevices with interaction
   * PLAYALL: multidevices the play together without interaction
   */
  public enum PlayMode {
    SINGLE, MULTIDEVICE, PLAYALL
  }

  /**
   * PlayStatus
   */
  public enum PlayStatus {
    READY,
    PASS,
    FAIL,
    CANCELLED,
    SKIPPED,
    EXIT_CURRENT_COMPOUND
  }
}
