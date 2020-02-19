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

/**
 * All the supported actions in uicd. Corresponse to the enum in the backend.
 */
export interface ActionTypeItem {
  actionType: string;
  type: string;
  shortName: string;
  color: string;
}

/**
 * Use index signature to make sure it can be access by ACTIONS.XX_ACTION and
 * foo['XX_ACTION'] at same time.
 */
export interface ActionTypeInfo {
  [key: string]: ActionTypeItem;
  // go/keep-sorted start
  CLICK_ACTION: ActionTypeItem;
  COMMAND_LINE_ACTION: ActionTypeItem;
  COMPOUND_ACTION: ActionTypeItem;
  CONDITION_CLICK_ACTION: ActionTypeItem;
  CONDITION_VALIDATION_ACTION: ActionTypeItem;
  DOUBLE_TAP_POWER_BUTTON_ACTION: ActionTypeItem;
  DRAG_ACTION: ActionTypeItem;
  FETCH_SCREEN_CONTENT_ACTION: ActionTypeItem;
  GLOBAL_VARIABLE_VALIDATION_ACTION: ActionTypeItem;
  IMAGE_DIFF_VALIDATION_ACTION: ActionTypeItem;
  INPUT_ACTION: ActionTypeItem;
  LOGCAT_VALIDATION_ACTION: ActionTypeItem;
  LONG_CLICK_ACTION: ActionTypeItem;
  LOOP_SCREEN_CONTENT_VALIDATION_ACTION: ActionTypeItem;
  ML_IMAGE_VALIDATION_ACTION: ActionTypeItem;
  REBOOT_ACTION: ActionTypeItem;
  SCREEN_CAP_ACTION: ActionTypeItem;
  SCREEN_CONTENT_VALIDATION_ACTION: ActionTypeItem;
  SCREEN_ROTATE_ACTION: ActionTypeItem;
  SCRIPT_EXECUTION_ACTION: ActionTypeItem;
  SCROLL_SCREEN_CONTENT_VALIDATION_ACTION: ActionTypeItem;
  SNIPPET_VALIDATION_ACTION: ActionTypeItem;
  SWIPE_ACTION: ActionTypeItem;
  WAIT_ACTION: ActionTypeItem;
  ZOOM_ACTION: ActionTypeItem;
  // go/keep-sorted end
}

/** ACTION infos */
export const ACTIONS: ActionTypeInfo = {
  CLICK_ACTION: {
    actionType: 'CLICK_ACTION',
    type: 'ClickAction',
    shortName: 'CLICK',
    color: 'tomato'
  },
  COMMAND_LINE_ACTION: {
    actionType: 'COMMAND_LINE_ACTION',
    type: 'CommandLineAction',
    shortName: 'CMD',
    color: 'dodgerblue'
  },
  COMPOUND_ACTION: {
    actionType: 'COMPOUND_ACTION',
    type: 'CompoundAction',
    shortName: 'CPD',
    color: 'darkorange'
  },
  CONDITION_CLICK_ACTION: {
    actionType: 'CONDITION_CLICK_ACTION',
    type: 'ConditionClickAction',
    shortName: 'CCLICK',
    color: 'limegreen'
  },
  CONDITION_VALIDATION_ACTION: {
    actionType: 'CONDITION_VALIDATION_ACTION',
    type: 'ConditionValidationAction',
    shortName: 'VERIFY',
    color: 'dodgerblue',
  },
  DRAG_ACTION: {
    actionType: 'DRAG_ACTION',
    type: 'DragAction',
    shortName: 'DRAG',
    color: 'skyblue'
  },
  FETCH_SCREEN_CONTENT_ACTION: {
    actionType: 'FETCH_SCREEN_CONTENT_ACTION',
    type: 'FetchScreenContentAction',
    shortName: 'FETCH',
    color: 'dodgerblue'
  },
  GLOBAL_VARIABLE_VALIDATION_ACTION: {
    actionType: 'GLOBAL_VARIABLE_VALIDATION_ACTION',
    type: 'GlobalVariableValidationAction',
    shortName: 'VERIFY',
    color: 'dodgerblue'
  },
  IMAGE_DIFF_VALIDATION_ACTION: {
    actionType: 'IMAGE_DIFF_VALIDATION_ACTION',
    type: 'ImageDiffValidationAction',
    shortName: 'IMAGEDIFF',
    color: 'limegreen'
  },
  INPUT_ACTION: {
    actionType: 'INPUT_ACTION',
    type: 'InputAction',
    shortName: 'INPUT',
    color: 'limegreen'
  },
  LOGCAT_VALIDATION_ACTION: {
    actionType: 'LOGCAT_VALIDATION_ACTION',
    type: 'LogcatValidationAction',
    shortName: 'LOGVAL',
    color: 'darkorange'
  },
  LONG_CLICK_ACTION: {
    actionType: 'LONG_CLICK_ACTION',
    type: 'LongClickAction',
    shortName: 'LCLICK',
    color: 'skyblue'
  },
  LOOP_SCREEN_CONTENT_VALIDATION_ACTION: {
    actionType: 'LOOP_SCREEN_CONTENT_VALIDATION_ACTION',
    type: 'LoopScreenContentValidationAction',
    shortName: 'VERIFY',
    color: 'dodgerblue'
  },
  ML_IMAGE_VALIDATION_ACTION: {
    actionType: 'ML_IMAGE_VALIDATION_ACTION',
    type: 'MLImageValidationAction',
    shortName: 'MLVERIFY',
    color: 'dodgerblue'
  },
  REBOOT_ACTION: {
    actionType: 'REBOOT_ACTION',
    type: 'RebootAction',
    shortName: 'REBOOT',
    color: 'skyblue'
  },
  SCREEN_CAP_ACTION: {
    actionType: 'SCREEN_CAP_ACTION',
    type: 'ScreenCapAction',
    shortName: 'SCREEN CAP',
    color: 'darkorange'
  },
  SCREEN_CONTENT_VALIDATION_ACTION: {
    actionType: 'SCREEN_CONTENT_VALIDATION_ACTION',
    type: 'ScreenContentValidationAction',
    shortName: 'VERIFY',
    color: 'dodgerblue'
  },
  SCREEN_ROTATE_ACTION: {
    actionType: 'SCREEN_ROTATE_ACTION',
    type: 'ScreenRotateAction',
    shortName: 'ROTATE',
    color: 'limegreen'
  },
  SCRIPT_EXECUTION_ACTION: {
    actionType: 'SCRIPT_EXECUTION_ACTION',
    type: 'ScriptExecutionAction',
    shortName: 'SCRIPT',
    color: 'limegreen'
  },
  SCROLL_SCREEN_CONTENT_VALIDATION_ACTION: {
    actionType: 'SCROLL_SCREEN_CONTENT_VALIDATION_ACTION',
    type: 'ScrollScreenContentValidationAction',
    shortName: 'VERIFY',
    color: 'dodgerblue'
  },
  SNIPPET_VALIDATION_ACTION: {
    actionType: 'SNIPPET_VALIDATION_ACTION',
    type: 'SnippetValidationAction',
    shortName: 'SNIPPET',
    color: 'dodgerblue'
  },
  SWIPE_ACTION: {
    actionType: 'SWIPE_ACTION',
    type: 'SwipeAction',
    shortName: 'SWIPE',
    color: 'deepskyblue'
  },
  WAIT_ACTION: {
    actionType: 'WAIT_ACTION',
    type: 'WaitAction',
    shortName: 'WAIT',
    color: 'limegreen',
  },
  ZOOM_ACTION: {
    actionType: 'ZOOM_ACTION',
    type: 'ZoomAction',
    shortName: 'ZOOM',
    color: 'limegreen'
  },
  DOUBLE_TAP_POWER_BUTTON_ACTION: {
    actionType: 'DOUBLE_TAP_POWER_BUTTON_ACTION',
    type: 'DoubleTapPowerButtonAction',
    shortName: 'DPOWER',
    color: 'tomato'
  },
};

/** Metadata of action */
export interface ActionSummaryMetaData {
  actionId?: string;
  name: string;
  // need this field for backend jackson deserialization, the "key" name has to
  // be 'type'.
  type: string;
  playStatus?: string;
  createdBy?: string;
  delayAfterActionMs?: number;
  deviceIndex?: number;
  forceDeviceOnChildren?: boolean;
  actionType?: string;
  isRawXY?: boolean;
  actionDescription?: string;
  runAlways?: boolean;
  isDirty?: boolean;
  repeatTime?: string;
}


/** Action model for the frontend */
export declare interface ActionModel {
  actionId: string;
  actionType: string;
  name: string;
  actionIndex: number;
}

/** Function to generate ActionModel from JSON data which backend returns. */
export function actionModelFromJson(
    jsonData: string, index: number): ActionModel {
  const actionModel: ActionModel = JSON.parse(jsonData);
  actionModel.actionIndex = index;
  return actionModel;
}

/** Workflow model for frontend */
export class WorkflowModel {
  actionId: string;
  name: string;
  childrenActions: ActionModel[];

  constructor(jsonData: string) {
    const obj = JSON.parse(jsonData);

    this.actionId = obj['actionId'];
    this.name = obj['name'];
    this.childrenActions = obj['childrenActions'].map(
        (item: object, index: number) =>
            actionModelFromJson(JSON.stringify(item), index));
  }
}
