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

package com.google.uicd.backend.core.constants;

/**
 * Uicd ActionType enum When adding new actions, we need update this enum, annotatiomn in the
 * BaseAction class, and also update the frontend mapping.
 */
public enum ActionType {
  CLICK_ACTION("ClickAction"),
  COMMAND_LINE_ACTION("CommandLineAction"),
  COMPOUND_ACTION("CompoundAction"),
  INPUT_ACTION("InputAction"),
  LOGCAT_VALIDATION_ACTION("LogcatValidationAction"),
  SCREEN_CAP_ACTION("ScreenCapAction"),
  SCREEN_CONTENT_VALIDATION_ACTION("ScreenContentValidationAction"),
  LOOP_SCREEN_CONTENT_VALIDATION_ACTION("LoopScreenContentValidationAction"),
  SCROLL_SCREEN_CONTENT_VALIDATION_ACTION("ScrollScreenContentValidationAction"),
  IMAGE_MATCHING_VALIDATION_ACTION("ImageMatchingValidationAction"),
  CONDITION_CLICK_ACTION("ConditionClickAction"),
  SWIPE_ACTION("SwipeAction"),
  REBOOT_ACTION("RebootAction"),
  LONG_CLICK_ACTION("LongClickAction"),
  ZOOM_ACTION("ZoomAction"),
  DRAG_ACTION("DragAction"),
  GLOBAL_VARIABLE_VALIDATION_ACTION("GlobalVariableValidationAction"),
  FETCH_SCREEN_CONTENT_ACTION("FetchScreenContentAction"),
  SCREEN_ROTATE_ACTION("ScreenRotateAction"),
  IMAGE_VALIDATION_CLICK_ACTION("ImageValidationClickAction"),
  UICD_SNIPPET_VALIDATION_ACTION("UicdSnippetValidationAction"),
  SCRIPT_EXECUTION_ACTION("ScriptExecutionAction"),
  UNKNOWN("Unknown");

  ActionType(String actionName) {
    this.actionName = actionName;
  }
  private final String actionName;

  public static ActionType fromString(String value) {
    for (ActionType actionType : ActionType.values()) {
      if (actionType.actionName.equals(value)) {
        return actionType;
      }
    }
    return ActionType.UNKNOWN;
  }

  public String getActionName() {
    return actionName;
  }

}
