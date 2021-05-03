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

package com.google.uicd.backend.controllers.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.auto.value.AutoValue;
import com.google.uicd.backend.core.constants.ActionType;
import com.google.uicd.backend.core.uicdactions.BaseAction;
import com.google.uicd.backend.core.uicdactions.ClickAction;
import com.google.uicd.backend.core.uicdactions.CompoundAction;

/** Contains ActionSummaryMetaData for frontend display. */
@AutoValue
public abstract class ActionSummaryMetaDataResponse {
  public abstract String getActionId();

  public abstract String getName();

  public abstract String getType();

  public abstract String getCreatedBy();

  public abstract int getDelayAfterActionMs();

  public abstract int getDeviceIndex();

  public abstract boolean getForceDeviceOnChildren();

  public abstract String getActionType();

  @JsonProperty("isRawXY") // To make sure it matches the frontend requirement
  public abstract boolean isRawXY();

  public abstract String getActionDescription();

  @JsonProperty("runAlways")
  public abstract boolean runAlways();

  public abstract int getRepeatTime();

  public static ActionSummaryMetaDataResponse create(
      String actionId,
      String name,
      String type,
      String createdBy,
      int delayAfterActionMs,
      int deviceIndex,
      boolean forceDeviceOnChildren,
      String actionType,
      boolean isRawXY,
      String actionDescription,
      boolean runAlways,
      int repeatTime) {
    return new AutoValue_ActionSummaryMetaDataResponse(
        actionId,
        name,
        type,
        createdBy,
        delayAfterActionMs,
        deviceIndex,
        forceDeviceOnChildren,
        actionType,
        isRawXY,
        actionDescription,
        runAlways,
        repeatTime);
  }

  public static ActionSummaryMetaDataResponse createDefault() {
    return new AutoValue_ActionSummaryMetaDataResponse(
        "", "", "", "", 0, 0, false, "", false, "", false, 0);
  }

  public static ActionSummaryMetaDataResponse createdFromBaseAction(BaseAction action) {
    // The following field should not in the ActionSummaryMetaData, need to clean and move to a
    // separate call, but that require changes in the frontend.
    boolean forceDeviceOnChildren = false;
    int repeatTime = 0;
    boolean isRawXY = false;
    if (action.getActionType() == ActionType.COMPOUND_ACTION) {
      CompoundAction compoundAction = (CompoundAction) action;
      forceDeviceOnChildren = compoundAction.isForceDeviceOnChildren();
      repeatTime = compoundAction.getRepeatTime();
    }
    if (action.getActionType() == ActionType.CLICK_ACTION) {
      ClickAction clickAction = (ClickAction) action;
      isRawXY = clickAction.isRawXYClick();
    }
    return create(
        action.getActionId().toString(),
        action.getName(),
        action.getClass().getSimpleName(),
        action.getCreatedBy(),
        action.getDelayAfterActionMs(),
        action.getDeviceIndex(),
        forceDeviceOnChildren,
        action.getActionType().toString(),
        isRawXY,
        action.getActionDescription(),
        action.isRunAlways(),
        repeatTime);
  }
}
