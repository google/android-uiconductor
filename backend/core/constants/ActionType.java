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

package com.google.uicd.backend.core.constants;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * Uicd ActionType enum When adding new actions, we need update this enum, annotatiomn in the
 * BaseAction class, and also update the frontend mapping.
 */
public enum ActionType {
  // go/keep-sorted start
  CLICK_ACTION("ClickAction"),
  COMMAND_LINE_ACTION("CommandLineAction"),
  COMPOUND_ACTION("CompoundAction"),
  CONDITION_CLICK_ACTION("ConditionClickAction"),
  CONDITION_VALIDATION_ACTION("ConditionValidationAction"),
  DOUBLE_TAP_POWER_BUTTON_ACTION("DoubleTapPowerButtonAction"),
  DRAG_ACTION("DragAction"),
  FETCH_SCREEN_CONTENT_ACTION("FetchScreenContentAction"),
  GLOBAL_VARIABLE_VALIDATION_ACTION("GlobalVariableValidationAction"),
  IMAGE_DIFF_VALIDATION_ACTION("ImageDiffValidationAction"),
  INPUT_ACTION("InputAction"),
  LOGCAT_VALIDATION_ACTION("LogcatValidationAction"),
  LONG_CLICK_ACTION("LongClickAction"),
  LOOP_SCREEN_CONTENT_VALIDATION_ACTION("LoopScreenContentValidationAction"),
  ML_IMAGE_VALIDATION_ACTION("MLImageValidationAction"),
  REBOOT_ACTION("RebootAction"),
  SCREEN_CAP_ACTION("ScreenCapAction"),
  SCREEN_CONTENT_VALIDATION_ACTION("ScreenContentValidationAction"),
  SCREEN_ROTATE_ACTION("ScreenRotateAction"),
  SCRIPT_EXECUTION_ACTION("ScriptExecutionAction"),
  SCROLL_SCREEN_CONTENT_VALIDATION_ACTION("ScrollScreenContentValidationAction"),
  SNIPPET_VALIDATION_ACTION("SnippetValidationAction"),
  SWIPE_ACTION("SwipeAction"),
  UNKNOWN("Unknown"),
  WAIT_ACTION("WaitAction"),
  ZOOM_ACTION("ZoomAction");
  // go/keep-sorted end

  ActionType(String actionName) {
    this.actionName = actionName;
  }

  private final String actionName;

  @JsonCreator
  public static ActionType fromString(String value) {
    for (ActionType actionType : ActionType.values()) {
      if (actionType.actionName.equalsIgnoreCase(value)
          || actionType.toString().equalsIgnoreCase(value)) {
        return actionType;
      }
    }
    return ActionType.UNKNOWN;
  }

  public String getActionName() {
    return actionName;
  }
}
