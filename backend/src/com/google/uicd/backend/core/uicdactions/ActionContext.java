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

package com.google.uicd.backend.core.uicdactions;

import com.google.uicd.backend.core.globalvariables.UicdGlobalVariableMap;
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

  private final UicdGlobalVariableMap globalVariableMap = new UicdGlobalVariableMap();

  int getNextActionSequenceIndex() {
    return actionSequenceIndex++;
  }

  int getCurrentActionSequenceIndex() {
    return actionSequenceIndex;
  }

  public UUID getExecutionId() {
    return executionId;
  }


  int getCurrentDeviceIndex() {
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

  public void removeStatus(String deviceId) {
    devicesStatus.remove(deviceId);
  }

  public boolean canRunAction(String deviceId) {
    return devicesStatus.getOrDefault(deviceId, PlayStatus.READY) != PlayStatus.FAIL;
  }

  public String expandUicdGlobalVariable(String target, String deviceId) {
    // target could have multiple $uicd, we need replace all of them
    if (target.contains(UicdGlobalVariableMap.UICD_DEVICEID_PARAM_KEYWORD)) {
      target =
          target.replace(
              UicdGlobalVariableMap.UICD_DEVICEID_PARAM_KEYWORD, deviceId);
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
