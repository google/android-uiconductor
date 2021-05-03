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

/** Base url to connect the backend, currently it is hard code ot port 8089 */
export const BACKEND_BASE_URL = 'http://localhost:8089';

/** Default duration for long click */
export const LONGCLICK_DURATION_MS = 2000;
/** Default duration to show snack bars for notifications */
export const SNACKBAR_DURATION_MS = 2000;

/**
 * Default workflow name for the current compound action in order to be able to
 * trace back to the unsaved workflow.
 */
export const DEFAULT_WORKFLOW_NAME = 'Default_Workflow';

/**
 * Default prefix of the project id for the default project that existing user
 * are using.
 */
export const DEFAULT_PROJECT_ID_PREFIX = 'default_project_id_';
/**
 * Default prefix of the project name that is created the first time UICD
 * launched.
 */
export const DEFAULT_PROJECT_NAME_PREFIX = 'default_project_';

/** Connected devices status */
export enum DeviceStatus {
  NO_DEVICE,
  READY_TO_CONNECT,
  CONNECTED,
  CONNECTING,
}

/** Tab titles for bottom tab menu */
export enum BottomMenuTabs {
  LOG,
  UI_VIEWER,
}

/** Import Copy types */
export enum ImportCopyType {
  SOFTCOPY = 'SOFTCOPY',
  HARDCOPY = 'HARDCOPY',
}

/** Direction model for the direction ratio buttons */
export interface ImportCopyTypeModel {
  value: ImportCopyType;
  displayText: string;
}

/** Direction model for ratio button (swipe or scroll related actions) */
export const IMPORT_COPY_TYPES: ImportCopyTypeModel[] = [
  {value: ImportCopyType.SOFTCOPY, displayText: 'Soft Copy'},
  {value: ImportCopyType.HARDCOPY, displayText: 'Hard Copy'},
];

/** Import types */
export enum ImportType {
  UUID,
  USERNAME,
}

/** Reserved key code for android device */
export enum KeyCodes {
  KEYCODE_HOME = 3,
  KEYCODE_BACK = 4,
  KEYCODE_DPAD_UP = 19,
  KEYCODE_DPAD_DOWN = 20,
  KEYCODE_DPAD_LEFT = 21,
  KEYCODE_DPAD_RIGHT = 22,
  KEYCODE_DPAD_CENTER = 23,
  KEYCODE_VOLUME_UP = 24,
  KEYCODE_VOLUME_DOWN = 25,
  KEYCODE_POWER = 26,
  KEYCODE_MEDIA_PLAY_PAUSE = 85,
  KEYCODE_OVERVIEW = 187,
}

/** Message type for indicate workflow's status */
export enum MessageTypes {
  REFRESH_WORKFLOW = 0,
  NODE_SELECTED = 1,
  NODE_HOVERED = 2,
  CLEAR_CANVAS = 3,
  INSPECT_CLICKED_NODE = 4,
  SET_INSPECT_MODE = 5,
  TEST_START = 6,
  TEST_END = 7,
  REFRESH_XML = 8,
  ADD_NODE_TO_TREE = 9,
  REFRESH_TEST_CASE_TREE = 10,
  REFRESH_OVERLAY = 11,
  HIGHLIGHT_OCR = 12,
}

/** Default size of a popup dialog */
export const POPUP_DIALOG_DEFAULT_DIMENSION = {
  width: '800px',
  height: '600px',
};

/** Default Color for Action */
export enum ActionColor {
  BLUE = 'blue',
  BLACK = 'black',
  GRAY = 'gray',
}

/** Test status message for logging */
export enum TestStatusMsg {
  TEST_START = '================ Test Start ==================',
  TEST_END = '================ Test End ====================',
  TEST_END_CANCELLED = '================ Test End (Cancelled) ========',
}

/** Overlay color in inspect mode */
export enum CanvasOverlayColor {
  SELECTED = '#68b4e855',
  HOVER = '#00008055',
  OCR_SELECT = '#00ff00ff',
}

/** Four directions that user can do when swiping */
export enum SwipeDirection {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down',
}

/** Directions for screen rotation */
export enum RotateDirection {
  PORTRAIT = '0',
  LANDSCAPE = '1',
}

/** Enum for pdb debugger options */
export enum PdbDebuggerOptions {
  NEXT = 'NEXT',
  STEP_IN = 'STEP_IN',
  CONTINUE = 'CONTINUE',
  BREAK = 'BREAK',
  RUN = 'RUN',
}
