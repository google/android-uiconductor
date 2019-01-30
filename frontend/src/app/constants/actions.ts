// Copyright 2019 Google Inc.
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

export const ACTIONS = {
  CLICK_ACTION: {type: 'ClickAction', shortName: 'CLICK', color: 'tomato'},
  COMMAND_LINE_ACTION:
      {type: 'CommandLineAction', shortName: 'CMD', color: 'dodgerblue'},
  COMPOUND_ACTION:
      {type: 'CompoundAction', shortName: 'CPD', color: 'darkorange'},
  INPUT_ACTION: {type: 'InputAction', shortName: 'INPUT', color: 'limegreen'},
  LOGCAT_VALIDATION_ACTION: {
    type: 'LogcatValidationAction',
    shortName: 'LOGVAL',
    color: 'darkorange'
  },
  SCREEN_CAP_ACTION:
      {type: 'ScreenCapAction', shortName: 'SCREEN', color: 'darkorange'},
  SCREEN_CONTENT_VALIDATION_ACTION: {
    type: 'ScreenContentValidationAction',
    shortName: 'VERIFY',
    color: 'dodgerblue'
  },
  SCROLL_SCREEN_CONTENT_VALIDATION_ACTION: {
    type: 'ScrollScreenContentValidationAction',
    shortName: 'VERIFY',
    color: 'dodgerblue'
  },
  LOOP_SCREEN_CONTENT_VALIDATION_ACTION: {
    type: 'LoopScreenContentValidationAction',
    shortName: 'VERIFY',
    color: 'dodgerblue'
  },
  IMAGE_MATCHING_VALIDATION_ACTION: {
    type: 'ImageMatchingValidationAction',
    shortName: 'VERIFY',
    color: 'dodgerblue'
  },
  GLOBAL_VARIABLE_VALIDATION_ACTION: {
    type: 'GlobalVariableValidationAction',
    shortName: 'VERIFY',
    color: 'dodgerblue'
  },
  SCREEN_ROTATE_ACTION:
      {type: 'ScreenRotateAction', shortName: 'ROTATE', color: 'limegreen'},
  FETCH_SCREEN_CONTENT_ACTION: {
    type: 'FetchScreenContentAction',
    shortName: 'FETCH',
    color: 'dodgerblue'
  },
  SWIPE_ACTION: {type: 'SwipeAction', shortName: 'SWIPE', color: 'deepskyblue'},
  LONG_CLICK_ACTION:
      {type: 'LongClickAction', shortName: 'LCLICK', color: 'skyblue'},
  REBOOT_ACTION: {type: 'RebootAction', shortName: 'REBOOT', color: 'skyblue'},
  ZOOM_ACTION: {type: 'ZoomAction', shortName: 'ZOOM', color: 'limegreen'},
  CONDITION_CLICK_ACTION:
      {type: 'ConditionClickAction', shortName: 'CCLICK', color: 'limegreen'},
  DRAG_ACTION: {type: 'DragAction', shortName: 'DRAG', color: 'skyblue'},
  IMAGE_VALIDATION_CLICK_ACTION: {
    type: 'ImageValidationClickAction',
    shortName: 'IVCLICK',
    color: 'skyblue'
  },
  UICD_SNIPPET_VALIDATION_ACTION: {
    type: 'UicdSnippetValidationAction',
    shortName: 'SNIPPET',
    color: 'dodgerblue'
  },
  SCRIPT_EXECUTION_ACTION:
      {type: 'ScriptExecutionAction', shortName: 'SCRIPT', color: 'limegreen'},
};
