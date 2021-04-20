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

import {Bounds} from './rect';

/** Logic group type from validation related actions, only used in frontend */
export enum ValidationGroupType {
  // go/keep-sorted start
  FETCH_SCREEN_CONTENT,
  SCREEN_CONTENT_VALIDATION,
  SPECIAL_CLICK,
  // go/keep-sorted end
}

/** Logic group model */
export interface ValidationGroupModel {
  value: ValidationGroupType;
  displayText: string;
}

/** Individual validation action type */
export enum ValidationActionType {
  CONDITION_CLICK_ACTION = 'ConditionClickAction',
  LOOP_SCREEN_CONTENT_VALIDATION_ACTION = 'LoopScreenContentValidationAction',
  SCREEN_CONTENT_VALIDATION_ACTION = 'ScreenContentValidationAction',
  SCROLL_SCREEN_CONTENT_VALIDATION_ACTION =
      'ScrollScreenContentValidationAction',
}

/** Model for the individual validation action */
export interface ValidationActionModel {
  value: ValidationActionType;
  displayText: string;
}

/**
 * SpecialClick Type, it contains all the special action that can be performed
 * by mouse
 */
export enum SpecialClickType {
  // go/keep-sorted start
  CLICK_WITH_CONTEXT,
  DOUBLE_CLICK,
  DRAG_WITH_CONTEXT,
  LONG_CLICK,
  SWIPE_WITH_CONTEXT,
  ZOOM_IN,
  ZOOM_OUT,
  // go/keep-sorted end
}

/** Model for special click */
export interface SpecialClickModel {
  value: SpecialClickType;
  displayText: string;
}

/** Swipe or scroll direction, starts from 1, matches the backend */
export enum DirectionType {
  UP = 1,
  DOWN = 2,
  LEFT = 3,
  RIGHT = 4,
}

/** Direction model for the direction ratio buttons */
export interface DirectionModel {
  value: DirectionType;
  displayText: string;
}

/** Validation group list from ratio buttons, only used in frontend */
export const VALIDATION_GROUPS: ValidationGroupModel[] = [
  {
    value: ValidationGroupType.SCREEN_CONTENT_VALIDATION,
    displayText: 'screen validation',
  },
  {
    value: ValidationGroupType.FETCH_SCREEN_CONTENT,
    displayText: 'fetch screen content validation',
  },
  {value: ValidationGroupType.SPECIAL_CLICK, displayText: 'special click'},
];

/** Validation Action type, used in frontend, mapping to backend aciton */
export const VALIDATION_ACTIONS: ValidationActionModel[] = [
  {
    value: ValidationActionType.SCREEN_CONTENT_VALIDATION_ACTION,
    displayText: 'Regular Validation',
  },
  {
    value: ValidationActionType.LOOP_SCREEN_CONTENT_VALIDATION_ACTION,
    displayText: 'Loop Validation',
  },
  {
    value: ValidationActionType.SCROLL_SCREEN_CONTENT_VALIDATION_ACTION,
    displayText: 'Validate Then Scroll',
  },
  {
    value: ValidationActionType.CONDITION_CLICK_ACTION,
    displayText: 'Conditional Click',
  },
];

/** Special click related actions */
export const SPECIAL_CLICK_ACTIONS: SpecialClickModel[] = [
  {
    value: SpecialClickType.CLICK_WITH_CONTEXT,
    displayText: 'Click With Context'
  },
  {value: SpecialClickType.LONG_CLICK, displayText: 'Long Click'},
  {value: SpecialClickType.DOUBLE_CLICK, displayText: 'Double Click'},
  {value: SpecialClickType.DRAG_WITH_CONTEXT, displayText: 'Drag With Context'},
  {
    value: SpecialClickType.SWIPE_WITH_CONTEXT,
    displayText: 'Swipe With Context'
  },
  {value: SpecialClickType.ZOOM_IN, displayText: 'Zoom In'},
  {value: SpecialClickType.ZOOM_OUT, displayText: 'Zoom Out'},
];

/** Direction model for ratio button (swipe or scroll related actions) */
export const DIRECTIONS: DirectionModel[] = [
  {value: DirectionType.UP, displayText: 'Up'},
  {value: DirectionType.DOWN, displayText: 'Down'},
  {value: DirectionType.LEFT, displayText: 'Left'},
  {value: DirectionType.RIGHT, displayText: 'Right'},
];

/** Model for the individual validation action */
export interface StopModel {
  value: StopType;
  displayText: string;
}

/** Stop Type, it contains all the stop type of validation actions */
export enum StopType {
  STOP_TEST_IF_FALSE = 'STOP_TEST_IF_FALSE',
  STOP_TEST_IF_TRUE = 'STOP_TEST_IF_TRUE',
  STOP_CURRENT_COMPOUND_IF_FALSE = 'STOP_CURRENT_COMPOUND_IF_FALSE',
  STOP_CURRENT_COMPOUND_IF_TRUE = 'STOP_CURRENT_COMPOUND_IF_TRUE',
}

/** Stop Type for user to choose */
export const STOP_TYPES: StopModel[] = [
  {
    value: StopType.STOP_TEST_IF_FALSE,
    displayText: 'Stop Test If Validation False'
  },
  {
    value: StopType.STOP_TEST_IF_TRUE,
    displayText: 'Stop Test If Validation True'
  },
  {
    value: StopType.STOP_CURRENT_COMPOUND_IF_FALSE,
    displayText: 'Stop Current Compound If False',
  },
  {
    value: StopType.STOP_CURRENT_COMPOUND_IF_TRUE,
    displayText: 'Stop Current Compound If True',
  },
];

/** Model for the individual validation action */
export interface ScreenContentSearchModel {
  value: ScreenContentSearchType;
  displayText: string;
}

/**
 * Stop Type, it contains all the special action that can be performed
 * by mouse
 */
export enum ScreenContentSearchType {
  // go/keep-sorted start
  AROUND = 'AROUND',
  FULLSCREEN = 'FULLSCREEN',
  FULLSCREEN_CONTEXT = 'FULLSCREEN_CONTEXT',
  NEARBY_CONTEXT = 'NEARBY_CONTEXT',
  STRICT = 'STRICT',
  // go/keep-sorted end
}

/** Screen content search types */
export const SCREEN_CONTENT_SEARCH_TYPES: ScreenContentSearchModel[] = [
  {value: ScreenContentSearchType.STRICT, displayText: 'Strict'},
  {value: ScreenContentSearchType.AROUND, displayText: 'Around'},
  {value: ScreenContentSearchType.FULLSCREEN, displayText: 'FullScreen'},
  {value: ScreenContentSearchType.NEARBY_CONTEXT, displayText: 'NearbyContext'},
  {
    value: ScreenContentSearchType.FULLSCREEN_CONTEXT,
    displayText: 'FullScreenContext',
  },
];

/** Model for the individual validation action */
export interface ContentMatchModel {
  value: ContentMatchType;
  displayText: string;
}

/**
 * Stop Type, it contains all the special action that can be performed
 * by mouse
 */
export enum ContentMatchType {
  // go/keep-sorted start
  CONTAINS = 'CONTAINS',
  EQUALS = 'EQUALS',
  EQUALS_CASE_SENSITIVE = 'EQUALS_CASE_SENSITIVE',
  IS_ANY_OF = 'IS_ANY_OF',
  REGEX = 'REGEX',
  // go/keep-sorted end
}

/** Content match types */
export const CONTENT_MATCH_TYPES: ContentMatchModel[] = [
  {value: ContentMatchType.EQUALS, displayText: 'Equals'},
  {
    value: ContentMatchType.EQUALS_CASE_SENSITIVE,
    displayText: 'EqualsCaseSensitive',
  },
  {value: ContentMatchType.CONTAINS, displayText: 'Contains'},
  {value: ContentMatchType.IS_ANY_OF, displayText: 'IsAnyOf'},
  {value: ContentMatchType.REGEX, displayText: 'RegEx'},
];

/** Backend store type of the context */
export enum ContextStorageType {
  // go/keep-sorted start
  CONTEXT_BASED = 'CONTEXT_BASED',
  ID_BASED = 'ID_BASED',
  POSITION_BASED = 'POSITION_BASED',
  TEXT_BASED = 'TEXT_BASED',
  // go/keep-sorted end
}

/** Model for the individual icon image */
export interface IconImageModel {
  value: IconImageType;
  displayText: string;
  matIcon: string;
}

/** Options available for icon images to validate */
export enum IconImageType {
  // go/keep-sorted start
  BLUE_DOT = 'BLUE_DOT',
  // go/keep-sorted end
}

/** Options available for icon images to validate */
export const ICON_IMAGE_TYPES: IconImageModel[] = [
  {value: IconImageType.BLUE_DOT, displayText: 'Blue Dot', matIcon: 'lens'},
];

/** Model for the element selector radio button group */
export interface ElementSelectorTypeModel {
  value: ElementSelectorType;
  displayText: string;
}

/** Different types for element selector, used in the validation action */
export enum ElementSelectorType {
  RESOURCE_ID = 'RESOURCE_ID',
  DISPLAY_TEXT = 'DISPLAY_TEXT',
  CHECK = 'CHECK',
  ADVANCED = 'ADVANCED',
}

/** Content match types */
export const ELEMENT_SELECTOR_TYPES: ElementSelectorTypeModel[] = [
  {value: ElementSelectorType.RESOURCE_ID, displayText: 'resourceid'},
  {value: ElementSelectorType.DISPLAY_TEXT, displayText: 'displayText'},
  {value: ElementSelectorType.CHECK, displayText: 'checked'},
];

/** Model for the element selector radio button group */
export interface StrategyTypeModel {
  value: StrategyType;
  displayText: string;
}

/** Screen content select StrategyType */
export enum StrategyType {
  POSITION = 'POSITION',
  RESOURCEID = 'RESOURCEID',
  XPATH = 'XPATH',
  TEXT = 'TEXT',
  TEXT_EQUALS = 'TEXT_EQUALS',
}

/** Model for different strategy to select screen content */
export const CLICK_STRATEGY_TYPES: StrategyTypeModel[] = [
  {value: StrategyType.TEXT, displayText: 'Text Contains'},
  {value: StrategyType.TEXT_EQUALS, displayText: 'Text Equals'},
  {value: StrategyType.RESOURCEID, displayText: 'Resource Id'},
  {value: StrategyType.XPATH, displayText: 'XPath'},
];

/** Model for different strategy to select screen content */
export const FETCH_CONTENT_STRATEGY_TYPES: StrategyTypeModel[] = [
  {value: StrategyType.POSITION, displayText: 'Position'},
  {value: StrategyType.RESOURCEID, displayText: 'Resource Id'},
  {value: StrategyType.XPATH, displayText: 'XPath'},
];

/** Validation data for dialog popup */
export interface ValidationDetails {
  bounds: Bounds;
}

/** WaitUntilType */
export enum WaitUntilType {
  WAIT_UNTIL_APPEAR,
  WAIT_UNTIL_DISAPPEAR,
}

/** Model for waituntil option dropdown */
export interface WaitUntilModel {
  value: WaitUntilType;
  displayText: string;
}

/** Wait until types for dropdown */
export const WAIT_UNTIL_TYPES: WaitUntilModel[] = [
  {value: WaitUntilType.WAIT_UNTIL_APPEAR, displayText: 'Wait Until Appear'},
  {
    value: WaitUntilType.WAIT_UNTIL_DISAPPEAR,
    displayText: 'Wait Until Disappear',
  },
];

/** Request for new validation actions */
export interface ValidationRequestDetails {
  // go/keep-sorted start
  actionType?: string;
  contentData?: string;
  contentMatchType?: ContentMatchType;
  contextStorageType?: ContextStorageType;
  elementSelectorType?: ElementSelectorType;
  iconImageType?: IconImageType;
  ocrMode?: boolean;
  screenContentSearchType?: ScreenContentSearchType;
  scrollDirectionType?: DirectionType;
  scrollMaxNumber?: number;
  selectedBounds?: Bounds;
  stopType: StopType;
  timeout?: number;
  waitUntilDisappear?: boolean;
  // go/keep-sorted end
}

/** Model for the package name */
export interface PackageNameModel {
  value: PackageName;
  displayText: string;
}

/** Snippet Validation select PackageName */
export enum PackageName {
  EMPTY_STRING,
  COM_GOOGLE_ANDROID_MOBLY_SNIPPET_BUNDLED,
}

/** Model for different strategy to select package name */
export const PACKAGE_NAMES: PackageNameModel[] = [
  {
    value: PackageName.EMPTY_STRING,
    displayText: '',
  },
  {
    value: PackageName.COM_GOOGLE_ANDROID_MOBLY_SNIPPET_BUNDLED,
    displayText: 'com.google.android.mobly.snippet.bundled',
  },
];
