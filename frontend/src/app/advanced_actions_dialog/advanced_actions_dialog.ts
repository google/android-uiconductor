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

import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {QueryBuilderConfig} from 'angular2-query-builder';
import {iif, ReplaySubject} from 'rxjs';
import {concatMap, map, take, takeUntil} from 'rxjs/operators';

import {ACTIONS, ActionSummaryMetaData} from '../constants/actions';
import {POPUP_DIALOG_DEFAULT_DIMENSION} from '../constants/constants';
import {ImageResponse, Query, ScaledScreenDimensionsResponse, UuidResponse} from '../constants/interfaces';
import {Bounds} from '../constants/rect';
import {CLICK_STRATEGY_TYPES, CONTENT_MATCH_TYPES, ContentMatchType, ContextStorageType, DirectionType, ElementSelectorType, ICON_IMAGE_TYPES, IconImageType, PACKAGE_NAMES, PackageName, ScreenContentSearchType, STOP_TYPES, StopType, StrategyType, ValidationActionType, ValidationRequestDetails} from '../constants/screen_validation_constants';
import {Circle, Rectangle, Shape} from '../constants/shape';
import {PanSwipeEvent} from '../screen_cast/screen_cast';
import {FetchContentActionDetails} from '../screen_validation_flow/fetch_content_form';
import {BackendManagerService} from '../services/backend_manager_service';
import {ControlMessageService} from '../services/control_message_service';

import {ScriptActionInfoDialogComponent} from './script_action_info_dialog';
import {SnippetActionInfoDialogComponent} from './snippet_action_info_dialog';

/** Advanced Action model */
export interface CommandLineActionDetails extends ActionSummaryMetaData {
  actionDescription: string;
  commandLine: string;
  commandlineExecutionTimeoutSec?: number;
  delayAfterActionMs?: number;
  expectedReturnCode?: number;
  isAdbCommand: boolean;
  needShellOutput: boolean;
}

/** Text validator */
export interface TextValidator {
  contentMatchType: ContentMatchType;
  patternValue: string;
}

/** Advanced Action model */
export interface InputActionDetails extends ActionSummaryMetaData {
  isSingleChar: boolean;
  keyCode?: number;
  inputString?: string;
}

/** Advanced Action model */
export interface RebootActionDetails extends ActionSummaryMetaData {
  onlyReconnectToDevice: boolean;
  reconnectTimeInSec: number;
}

/** Advanced Action model */
export interface ClickActionDetails extends ActionSummaryMetaData {
  strategy: StrategyType;
  selector: string;
  isByElement: boolean;
}

/** Advanced Action model */
export interface SnippetValidationActionDetails extends ActionSummaryMetaData {
  packageName: PackageName;
  methodName: string;
  argumentsSeparatedByComma: string;
  commandlineExecutionTimeoutSec: number;
  matchType: ContentMatchType;
  textPattern: string;
  stopType: StopType;
  executeSnippetOnly: boolean;
}

/** Advanced Action model */
export interface ScriptExecutionActionDetails extends ActionSummaryMetaData {
  delayAfterActionMs: number;
  actionDescription: string;
  arguments: string;
  scriptCodeContent: string;
  commandlineExecutionTimeoutSec: number;
}

/** Object for MethodList */
export interface MethodNameObj {
  value: string;
  displayText: string;
}

/** Action model for generic validation action */
export interface ValidationActionDetails extends ActionSummaryMetaData {
  textValidator: TextValidator;
  stopType: StopType;
}

/** Action model for screen content validation action */
export interface ScreenContentValidationActionDetails extends
    ValidationActionDetails {
  selectedText: string;
  selectedType: ElementSelectorType;
  selectedBound: Bounds;
  screenContentSearchType: ScreenContentSearchType;
  contextStorageType: ContextStorageType;
}

/** Action model for scroll screen content validation action */
export interface ScrollScreenContentValidationActionDetails extends
    ScreenContentValidationActionDetails {
  scrollOrientation: DirectionType;
  scrollMaxNumber: number;
}

/** Action model for loop screen content validation action */
export interface LoopScreenContentValidationActionDetails extends
    ScreenContentValidationActionDetails {
  waitUntilDisappear: boolean;
  timeout: number;
}

/** Action model for condition validtion action */
export interface ConditionValidationActionDetails extends
    ValidationActionDetails {
  query: Query;
}

/** Advanced Action model */
export interface ImageDiffActionDetails extends ActionSummaryMetaData {
  diffScoreThreshold: number;
  includeRegion: boolean;
  refImageUuid: string;
  regions: Shape[];
  stopType: StopType;
}

/**
 * Advanced Action model
 *
 * Note that this advanced action must extend {@code ValidationActionDetails}.
 * Initializing otherwise will not properly call {@code addValidationStep}.
 */
export interface LogcatValidationActionDetails extends ValidationActionDetails {
  commandLine: string;
  commandlineExecutionTimeoutSec: number;
  logcatOnly: boolean;
}

/**
 * Advanced Action model
 *
 * Note that this advanced action must extend {@code ValidationActionDetails}.
 * Initializing otherwise will not properly call {@code addValidationStep}.
 */
export interface GlobalVariableValidationActionDetails extends
    ActionSummaryMetaData {
  expression: string;
  stopType: StopType;
}

/**
 * Advanced action model for ML image validation
 *
 * Note that this advanced action must extend {@code ValidationActionDetails}.
 * Initializing otherwise will not properly call {@code addValidationStep}.
 */
export interface MLImageValidationActionDetails extends
    ScreenContentValidationActionDetails {
  iconImageType: IconImageType;
}

/** Advanced Action model */
export interface DoubleTapPowerButtonDetails extends ActionSummaryMetaData {}

enum ShapeType {
  RECTANGULAR = 'RECTANGULAR',
  CIRCULAR = 'CIRCULAR',
}

/** Add advanced action dialog */
@Component({
  selector: 'advanced-actions-dialog',
  templateUrl: './advanced_actions_dialog.ng.html',
  styleUrls: ['./advanced_actions_dialog.css'],
})
export class AdvancedActionDialogComponent implements OnInit, OnDestroy {
  @ViewChild('screenshot', {static: false}) screenshot!: ElementRef;
  @ViewChild('regionCanvas', {static: false}) regionCanvas!: ElementRef;

  readonly CONTENT_MATCH_TYPES = CONTENT_MATCH_TYPES;
  readonly PACKAGE_NAMES = PACKAGE_NAMES;
  readonly STRATEGY_TYPES = CLICK_STRATEGY_TYPES;
  readonly STOP_TYPES = STOP_TYPES;
  readonly ACTIONS = ACTIONS;
  readonly ICON_IMAGE_TYPES = ICON_IMAGE_TYPES;

  methodNames: MethodNameObj[] = [];
  isWaitingForMethods = false;

  selectedActionType = '';
  isNewAction = true;
  screenshotImg = new Image();
  screenshotScaledWidth = 0;
  screenshotScaledHeight = 0;
  selectedRegions: Shape[] = [];
  regionShapeSelected = '';

  advancedActionTypeList = [
    ACTIONS.COMMAND_LINE_ACTION,
    ACTIONS.CLICK_ACTION,
    ACTIONS.INPUT_ACTION,
    ACTIONS.REBOOT_ACTION,
    ACTIONS.SNIPPET_VALIDATION_ACTION,
    ACTIONS.SCRIPT_EXECUTION_ACTION,
    ACTIONS.IMAGE_DIFF_VALIDATION_ACTION,
    ACTIONS.LOGCAT_VALIDATION_ACTION,
    ACTIONS.GLOBAL_VARIABLE_VALIDATION_ACTION,
    ACTIONS.ML_IMAGE_VALIDATION_ACTION,
    ACTIONS.CONDITION_VALIDATION_ACTION,
    ACTIONS.DOUBLE_TAP_POWER_BUTTON_ACTION,
  ];

  validationActionTypeList = [
    ACTIONS.SCREEN_CONTENT_VALIDATION_ACTION.type,
    ACTIONS.SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.type,
    ACTIONS.LOOP_SCREEN_CONTENT_VALIDATION_ACTION.type,
    ACTIONS.CONDITION_CLICK_ACTION.type,
  ];

  readonly config: QueryBuilderConfig = {
    fields: {
      text: {
        name: 'Display Text',
        type: 'string',
        operators: ['=', '!=', 'contains'],
      },
      class: {
        name: 'Class',
        type: 'string',
        operators: ['=', '!=', 'contains'],
      },
      contentDesc: {
        name: 'Content Description',
        type: 'string',
        operators: ['=', '!=', 'contains'],
      },
      checkable: {name: 'Checkable', type: 'boolean'},
      checked: {name: 'Checked', type: 'boolean'},
      clickable: {name: 'Clickable', type: 'boolean'},
      resourceId: {
        name: 'Resource ID',
        type: 'string',
        operators: ['=', '!=', 'contains'],
      },
    }
  };

  commandLineActionDetails: CommandLineActionDetails = {
    actionDescription: '',
    name: ACTIONS.COMMAND_LINE_ACTION.shortName,
    type: ACTIONS.COMMAND_LINE_ACTION.type,
    commandLine: '',
    commandlineExecutionTimeoutSec: 5,
    expectedReturnCode: 0,
    delayAfterActionMs: 100,
    isAdbCommand: false,
    needShellOutput: false,
  };

  inputActionDetails: InputActionDetails = {
    name: ACTIONS.INPUT_ACTION.shortName,
    type: ACTIONS.INPUT_ACTION.type,
    isSingleChar: false,
    keyCode: 0,
    inputString: '',
  };

  rebootActionDetails: RebootActionDetails = {
    name: ACTIONS.REBOOT_ACTION.shortName,
    type: ACTIONS.REBOOT_ACTION.type,
    onlyReconnectToDevice: false,
    reconnectTimeInSec: 30,
  };

  clickActionDetails: ClickActionDetails = {
    name: '',  // For advance action, provide an empty name,
               // backend will generate details name
    type: ACTIONS.CLICK_ACTION.type,
    isByElement: true,
    strategy: StrategyType.TEXT,
    selector: '',
  };

  snippetValidationActionDetails: SnippetValidationActionDetails = {
    name: ACTIONS.SNIPPET_VALIDATION_ACTION.shortName,
    type: ACTIONS.SNIPPET_VALIDATION_ACTION.type,
    packageName: PackageName.EMPTY_STRING,
    methodName: '',
    argumentsSeparatedByComma: '',
    commandlineExecutionTimeoutSec: 5,
    matchType: ContentMatchType.EQUALS,
    textPattern: '',
    stopType: StopType.STOP_TEST_IF_FALSE,
    executeSnippetOnly: false,
  };

  scriptExecutionActionDetails: ScriptExecutionActionDetails = {
    name: ACTIONS.SCRIPT_EXECUTION_ACTION.shortName,
    type: ACTIONS.SCRIPT_EXECUTION_ACTION.type,
    delayAfterActionMs: 1000,
    actionDescription: '',
    arguments: '',
    scriptCodeContent: '',
    commandlineExecutionTimeoutSec: 5,
  };

  imageDiffActionDetails: ImageDiffActionDetails = {
    name: ACTIONS.IMAGE_DIFF_VALIDATION_ACTION.shortName,
    type: ACTIONS.IMAGE_DIFF_VALIDATION_ACTION.type,
    diffScoreThreshold: 0.99,
    includeRegion: true,
    refImageUuid: '',
    regions: [],
    stopType: StopType.STOP_TEST_IF_FALSE,
  };

  logcatValidationActionDetails: LogcatValidationActionDetails = {
    name: ACTIONS.LOGCAT_VALIDATION_ACTION.shortName,
    type: ACTIONS.LOGCAT_VALIDATION_ACTION.type,
    actionType: ACTIONS.LOGCAT_VALIDATION_ACTION.actionType,
    commandLine: '',
    commandlineExecutionTimeoutSec: 5,
    textValidator: {
      contentMatchType: ContentMatchType.EQUALS,
      patternValue: '',
    },
    logcatOnly: false,
    stopType: StopType.STOP_TEST_IF_FALSE,
  };

  globalVarValidationActionDetails: GlobalVariableValidationActionDetails = {
    name: ACTIONS.GLOBAL_VARIABLE_VALIDATION_ACTION.shortName,
    type: ACTIONS.GLOBAL_VARIABLE_VALIDATION_ACTION.type,
    actionType: ACTIONS.GLOBAL_VARIABLE_VALIDATION_ACTION.actionType,
    expression: '',
    stopType: StopType.STOP_TEST_IF_FALSE,
  };

  mlImageValidationActionDetails: MLImageValidationActionDetails = {
    name: ACTIONS.ML_IMAGE_VALIDATION_ACTION.shortName,
    type: ACTIONS.ML_IMAGE_VALIDATION_ACTION.type,
    actionType: ACTIONS.ML_IMAGE_VALIDATION_ACTION.actionType,
    iconImageType: IconImageType.BLUE_DOT,
    stopType: StopType.STOP_TEST_IF_FALSE,
    textValidator: {
      contentMatchType: ContentMatchType.EQUALS,
      patternValue: '',
    },
    selectedText: '',
    selectedType: ElementSelectorType.RESOURCE_ID,
    selectedBound: new Bounds(0, 0, 0, 0),
    screenContentSearchType: ScreenContentSearchType.STRICT,
    contextStorageType: ContextStorageType.TEXT_BASED,
  };

  fetchActionDetails: FetchContentActionDetails = {
    name: '',
    type: ACTIONS.FETCH_SCREEN_CONTENT_ACTION.type,
    strategy: StrategyType.POSITION,
    selector: '',
    globalVariableName: '',
    attributeType: '',
    isExportField: true,
    bounds: undefined,
  };

  conditionValidationAction: ConditionValidationActionDetails = {
    name: ACTIONS.CONDITION_VALIDATION_ACTION.shortName,
    type: ACTIONS.CONDITION_VALIDATION_ACTION.type,
    textValidator: {
      contentMatchType: ContentMatchType.EQUALS,
      patternValue: '',
    },
    stopType: StopType.STOP_TEST_IF_FALSE,
    query: {
      condition: 'and',
      rules:
          [
            {
              field: 'resourceId',
              operator: '=',
              value: 'com.android.uicd.sample'
            },
            {field: 'text', operator: '=', value: 'Text to match'},
          ]

    },
  };

  screenContentValidationActionDetails: ScreenContentValidationActionDetails = {
    name: ACTIONS.SCREEN_CONTENT_VALIDATION_ACTION.shortName,
    type: ACTIONS.SCREEN_CONTENT_VALIDATION_ACTION.type,
    textValidator: {
      contentMatchType: ContentMatchType.EQUALS,
      patternValue: '',
    },
    stopType: StopType.STOP_TEST_IF_FALSE,
    selectedText: '',
    selectedType: ElementSelectorType.RESOURCE_ID,
    selectedBound: new Bounds(0, 0, 0, 0),
    screenContentSearchType: ScreenContentSearchType.STRICT,
    contextStorageType: ContextStorageType.TEXT_BASED,
  };

  scrollScreenContentValidationActionDetails:
      ScrollScreenContentValidationActionDetails = {
        name: ACTIONS.SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.shortName,
        type: ACTIONS.SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.type,
        textValidator: {
          contentMatchType: ContentMatchType.EQUALS,
          patternValue: '',
        },
        stopType: StopType.STOP_TEST_IF_FALSE,
        selectedText: '',
        selectedType: ElementSelectorType.RESOURCE_ID,
        selectedBound: new Bounds(0, 0, 0, 0),
        screenContentSearchType: ScreenContentSearchType.STRICT,
        scrollOrientation: DirectionType.UP,
        contextStorageType: ContextStorageType.TEXT_BASED,
        scrollMaxNumber: 30,
      };

  loopScreenContentValidationActionDetails:
      LoopScreenContentValidationActionDetails = {
        name: ACTIONS.SCREEN_CONTENT_VALIDATION_ACTION.shortName,
        type: ACTIONS.SCREEN_CONTENT_VALIDATION_ACTION.type,
        textValidator: {
          contentMatchType: ContentMatchType.EQUALS,
          patternValue: '',
        },
        stopType: StopType.STOP_TEST_IF_FALSE,
        selectedText: '',
        selectedType: ElementSelectorType.RESOURCE_ID,
        selectedBound: new Bounds(0, 0, 0, 0),
        screenContentSearchType: ScreenContentSearchType.STRICT,
        waitUntilDisappear: false,
        timeout: 0,
        contextStorageType: ContextStorageType.TEXT_BASED,
      };

  conditionClickActionDetails: ScreenContentValidationActionDetails = {
    name: ACTIONS.SCREEN_CONTENT_VALIDATION_ACTION.shortName,
    type: ACTIONS.SCREEN_CONTENT_VALIDATION_ACTION.type,
    textValidator: {
      contentMatchType: ContentMatchType.EQUALS,
      patternValue: '',
    },
    stopType: StopType.STOP_TEST_IF_FALSE,
    selectedText: '',
    selectedType: ElementSelectorType.RESOURCE_ID,
    selectedBound: new Bounds(0, 0, 0, 0),
    screenContentSearchType: ScreenContentSearchType.STRICT,
    contextStorageType: ContextStorageType.TEXT_BASED,
  };

  validationRequestDetails: ValidationRequestDetails = {
    actionType: '',
    contentData: '',
    selectedBounds: undefined,
    contentMatchType: ContentMatchType.EQUALS,
    contextStorageType: ContextStorageType.TEXT_BASED,
    elementSelectorType: ElementSelectorType.DISPLAY_TEXT,
    screenContentSearchType: ScreenContentSearchType.AROUND,
    scrollDirectionType: DirectionType.UP,
    stopType: StopType.STOP_TEST_IF_FALSE,
    timeout: 60,
    waitUntilDisappear: false
  };

  doubleTapPowerButtonDetails: DoubleTapPowerButtonDetails = {
    name: ACTIONS.DOUBLE_TAP_POWER_BUTTON_ACTION.shortName,
    actionType: ACTIONS.DOUBLE_TAP_POWER_BUTTON_ACTION.type,
    type: ACTIONS.DOUBLE_TAP_POWER_BUTTON_ACTION.type,
  };
  /** Handle on-destroy Subject, used to unsubscribe. */
  private readonly destroyed = new ReplaySubject<void>(1);

  constructor(
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<AdvancedActionDialogComponent>,
      private readonly backendManagerService: BackendManagerService,
      private readonly controlMessageService: ControlMessageService,
      @Inject(MAT_DIALOG_DATA) private readonly data: ActionSummaryMetaData) {}

  ngOnInit() {
    if (this.data) {
      this.isNewAction = false;

      // Set details for the selected action.
      switch (this.data.actionType) {
        case ACTIONS.COMMAND_LINE_ACTION.actionType:
          this.commandLineActionDetails = this.data as CommandLineActionDetails;
          this.selectedActionType = ACTIONS.COMMAND_LINE_ACTION.type;
          break;
        case ACTIONS.INPUT_ACTION.actionType:
          this.inputActionDetails = this.data as InputActionDetails;
          this.selectedActionType = ACTIONS.INPUT_ACTION.type;
          break;
        case ACTIONS.CLICK_ACTION.actionType:
          this.clickActionDetails = this.data as ClickActionDetails;
          this.selectedActionType = ACTIONS.CLICK_ACTION.type;
          break;
        case ACTIONS.REBOOT_ACTION.actionType:
          this.rebootActionDetails = this.data as RebootActionDetails;
          this.selectedActionType = ACTIONS.REBOOT_ACTION.type;
          break;
        case ACTIONS.SNIPPET_VALIDATION_ACTION.actionType:
          this.snippetValidationActionDetails =
              this.data as SnippetValidationActionDetails;
          this.selectedActionType = ACTIONS.SNIPPET_VALIDATION_ACTION.type;
          break;
        case ACTIONS.SCRIPT_EXECUTION_ACTION.actionType:
          this.scriptExecutionActionDetails =
              this.data as ScriptExecutionActionDetails;
          this.selectedActionType = ACTIONS.SCRIPT_EXECUTION_ACTION.type;
          break;
        case ACTIONS.IMAGE_DIFF_VALIDATION_ACTION.actionType:
          this.imageDiffActionDetails = this.data as ImageDiffActionDetails;
          this.selectedActionType = ACTIONS.IMAGE_DIFF_VALIDATION_ACTION.type;
          break;
        case ACTIONS.LOGCAT_VALIDATION_ACTION.actionType:
          this.logcatValidationActionDetails =
              this.data as LogcatValidationActionDetails;
          this.selectedActionType = ACTIONS.LOGCAT_VALIDATION_ACTION.type;
          break;
        case ACTIONS.GLOBAL_VARIABLE_VALIDATION_ACTION.actionType:
          this.globalVarValidationActionDetails =
              this.data as GlobalVariableValidationActionDetails;
          this.selectedActionType =
              ACTIONS.GLOBAL_VARIABLE_VALIDATION_ACTION.type;
          break;
        case ACTIONS.FETCH_SCREEN_CONTENT_ACTION.actionType:
          this.fetchActionDetails = this.data as FetchContentActionDetails;
          this.selectedActionType = ACTIONS.FETCH_SCREEN_CONTENT_ACTION.type;
          break;
        case ACTIONS.SCREEN_CONTENT_VALIDATION_ACTION.actionType:
          this.screenContentValidationActionDetails =
              this.data as ScreenContentValidationActionDetails;
          this.convertToValidationRequest(
              this.screenContentValidationActionDetails);
          this.selectedActionType =
              ACTIONS.SCREEN_CONTENT_VALIDATION_ACTION.type;
          break;
        case ACTIONS.SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.actionType:
          this.scrollScreenContentValidationActionDetails =
              this.data as ScrollScreenContentValidationActionDetails;
          this.convertToValidationRequest(
              this.scrollScreenContentValidationActionDetails);
          this.selectedActionType =
              ACTIONS.SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.type;
          break;
        case ACTIONS.LOOP_SCREEN_CONTENT_VALIDATION_ACTION.actionType:
          this.loopScreenContentValidationActionDetails =
              this.data as LoopScreenContentValidationActionDetails;
          this.convertToValidationRequest(
              this.loopScreenContentValidationActionDetails);
          this.selectedActionType =
              ACTIONS.LOOP_SCREEN_CONTENT_VALIDATION_ACTION.type;
          break;
        case ACTIONS.CONDITION_CLICK_ACTION.actionType:
          this.conditionClickActionDetails =
              this.data as ScreenContentValidationActionDetails;
          this.convertToValidationRequest(this.conditionClickActionDetails);
          this.selectedActionType = ACTIONS.CONDITION_CLICK_ACTION.type;
          break;
        case ACTIONS.ML_IMAGE_VALIDATION_ACTION.actionType:
          this.mlImageValidationActionDetails =
              this.data as MLImageValidationActionDetails;
          this.selectedActionType = ACTIONS.ML_IMAGE_VALIDATION_ACTION.type;
          break;
        case ACTIONS.CONDITION_VALIDATION_ACTION.actionType:
          this.conditionValidationAction =
              this.data as ConditionValidationActionDetails;
          this.selectedActionType = ACTIONS.CONDITION_VALIDATION_ACTION.type;
          break;
        case ACTIONS.DOUBLE_TAP_POWER_BUTTON_ACTION.actionType:
          this.doubleTapPowerButtonDetails =
              this.data as DoubleTapPowerButtonDetails;
          this.selectedActionType = ACTIONS.DOUBLE_TAP_POWER_BUTTON_ACTION.type;
          break;
        default:
          break;
      }
    }

    this.backendManagerService.getScaledScreenDimensions()
        .pipe(
            take(1),
            takeUntil(this.destroyed),
            )
        .subscribe((data: ScaledScreenDimensionsResponse) => {
          this.screenshotScaledWidth = data.width;
          this.screenshotScaledHeight = data.height;
        });
  }

  ngOnDestroy() {
    // Unsubscribes all pending subscriptions.
    this.destroyed.next();
  }

  saveAction() {
    let actionData: ActionSummaryMetaData = this.commandLineActionDetails;

    switch (this.selectedActionType) {
        // Save details for regular actions.
      case ACTIONS.COMMAND_LINE_ACTION.type:
        actionData = this.commandLineActionDetails;
        break;
      case ACTIONS.CLICK_ACTION.type:
        actionData = this.clickActionDetails;
        break;
      case ACTIONS.INPUT_ACTION.type:
        actionData = this.inputActionDetails;
        break;
      case ACTIONS.REBOOT_ACTION.type:
        actionData = this.rebootActionDetails;
        break;
      case ACTIONS.SNIPPET_VALIDATION_ACTION.type:
        actionData = this.snippetValidationActionDetails;
        break;
      case ACTIONS.SCRIPT_EXECUTION_ACTION.type:
        actionData = this.scriptExecutionActionDetails;
        break;
      case ACTIONS.LOGCAT_VALIDATION_ACTION.type:
        actionData = this.logcatValidationActionDetails;
        break;
      case ACTIONS.IMAGE_DIFF_VALIDATION_ACTION.type:
        actionData = this.imageDiffActionDetails;
        this.saveImageDiffAction(actionData);
        return;
      // Save details for validations.
      case ACTIONS.GLOBAL_VARIABLE_VALIDATION_ACTION.type:
        actionData = this.globalVarValidationActionDetails;
        break;
      case ACTIONS.ML_IMAGE_VALIDATION_ACTION.type:
        actionData = this.mlImageValidationActionDetails;
        break;
      case ACTIONS.FETCH_SCREEN_CONTENT_ACTION.type:
        actionData = this.fetchActionDetails;
        break;
      case ACTIONS.SCREEN_CONTENT_VALIDATION_ACTION.type:
        actionData = this.screenContentValidationActionDetails;
        break;
      case ACTIONS.SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.type:
        actionData = this.scrollScreenContentValidationActionDetails;
        break;
      case ACTIONS.LOOP_SCREEN_CONTENT_VALIDATION_ACTION.type:
        actionData = this.loopScreenContentValidationActionDetails;
        break;
      case ACTIONS.CONDITION_CLICK_ACTION.type:
        actionData = this.conditionClickActionDetails;
        break;
      case ACTIONS.CONDITION_VALIDATION_ACTION.type:
        actionData = this.conditionValidationAction;
        break;
      case ACTIONS.DOUBLE_TAP_POWER_BUTTON_ACTION.type:
        actionData = this.doubleTapPowerButtonDetails;
        break;
      default:
        break;
    }

    if (this.isNewAction) {
      this.backendManagerService.addActionToWorkflow(actionData)
          .pipe(
              take(1),
              takeUntil(this.destroyed),
              )
          .subscribe(() => {
            this.controlMessageService.sendRefreshWorkflowMsg();
            this.closeDialog(true);
          });
    } else {
      if (this.validationActionTypeList.includes(this.selectedActionType) &&
          actionData.actionId) {
        this.backendManagerService
            .updateValidationAction(
                actionData.actionId, this.validationRequestDetails)
            .pipe(
                take(1),
                takeUntil(this.destroyed),
                )
            .subscribe(() => {
              this.controlMessageService.sendRefreshWorkflowMsg();
              this.closeDialog(true);
            });
      } else {
        this.backendManagerService.updateActionMetadata(actionData)
            .pipe(
                take(1),
                takeUntil(this.destroyed),
                )
            .subscribe(() => {
              this.controlMessageService.sendRefreshWorkflowMsg();
              this.closeDialog(true);
            });
      }
    }
  }

  convertToValidationRequest(action: ScreenContentValidationActionDetails|
                             LoopScreenContentValidationActionDetails|
                             ScrollScreenContentValidationActionDetails) {
    switch (action.actionType) {
      case ACTIONS.SCREEN_CONTENT_VALIDATION_ACTION.actionType:
        this.validationRequestDetails.actionType =
            ValidationActionType.SCREEN_CONTENT_VALIDATION_ACTION;
        break;
      case ACTIONS.SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.actionType:
        this.validationRequestDetails.actionType =
            ValidationActionType.SCROLL_SCREEN_CONTENT_VALIDATION_ACTION;
        break;
      case ACTIONS.LOOP_SCREEN_CONTENT_VALIDATION_ACTION.actionType:
        this.validationRequestDetails.actionType =
            ValidationActionType.LOOP_SCREEN_CONTENT_VALIDATION_ACTION;
        break;
      case ACTIONS.CONDITION_CLICK_ACTION.actionType:
        this.validationRequestDetails.actionType =
            ValidationActionType.CONDITION_CLICK_ACTION;
        break;
      default:
        break;
    }

    this.validationRequestDetails.selectedBounds = action.selectedBound;
    this.validationRequestDetails.elementSelectorType = action.selectedType;
    this.validationRequestDetails.stopType = action.stopType;
    this.validationRequestDetails.screenContentSearchType =
        action.screenContentSearchType;
    this.validationRequestDetails.contentData = action.selectedText;
    this.validationRequestDetails.contextStorageType =
        action.contextStorageType;
    if (action.textValidator) {
      this.validationRequestDetails.contentMatchType =
          action.textValidator.contentMatchType;
    }

    // LoopScreenContentValidation
    if ((action as LoopScreenContentValidationActionDetails).timeout !==
        undefined) {
      this.validationRequestDetails.timeout =
          (action as LoopScreenContentValidationActionDetails).timeout;
      this.validationRequestDetails.waitUntilDisappear =
          (action as LoopScreenContentValidationActionDetails)
              .waitUntilDisappear;
    }
    // ScrollScreenContentValidation
    if ((action as ScrollScreenContentValidationActionDetails)
            .scrollOrientation !== undefined) {
      this.validationRequestDetails.scrollDirectionType =
          (action as ScrollScreenContentValidationActionDetails)
              .scrollOrientation;
      this.validationRequestDetails.scrollMaxNumber =
          (action as ScrollScreenContentValidationActionDetails)
              .scrollMaxNumber;
    }
  }

  isValidationAction(): boolean {
    if (this.selectedActionType === ACTIONS.FETCH_SCREEN_CONTENT_ACTION.type) {
      return false;
    }
    if (this.validationActionTypeList.includes(this.selectedActionType)) {
      return true;
    }
    return false;
  }

  selectedPackageChanged(selectedPackage: string) {
    if (selectedPackage !== undefined) {
      this.isWaitingForMethods = true;
      this.backendManagerService.getAllAvailableSnippetMethods(selectedPackage)
          .pipe(
              take(1),
              takeUntil(this.destroyed),
              )
          .subscribe(data => {
            this.methodNames = [];
            for (const methodData of data as string[]) {
              const methodStart = methodData.indexOf(' ') + 1;
              const methodEnd = methodData.indexOf('(');
              this.methodNames.push({
                value: methodData.substring(methodStart, methodEnd),
                displayText: methodData
              });
            }
            this.isWaitingForMethods = false;
          });
    }
  }

  methodSelected(selectedMethodValue: string) {
    for (const entry of this.methodNames) {
      if (entry.value === selectedMethodValue) {
        if (entry.displayText.includes('returns void')) {
          this.snippetValidationActionDetails.executeSnippetOnly = true;
          break;
        }
      }
    }
  }

  openActionInfoDialog() {
    switch (this.selectedActionType) {
      case ACTIONS.SNIPPET_VALIDATION_ACTION.type:
        this.dialog.open(SnippetActionInfoDialogComponent, {
          width: POPUP_DIALOG_DEFAULT_DIMENSION.width,
        });
        break;
      case ACTIONS.SCRIPT_EXECUTION_ACTION.type:
        this.dialog.open(ScriptActionInfoDialogComponent, {
          width: POPUP_DIALOG_DEFAULT_DIMENSION.width,
        });
        break;
      default:
        break;
    }
  }

  saveImageDiffAction(actionData: ActionSummaryMetaData) {
    if (this.screenshotImg.src !== '') {
      const base64ImgStr =
          this.screenshotImg.src.replace('data:image/png;base64,', '');
      this.backendManagerService.addImage(base64ImgStr)
          .pipe(
              map((data: UuidResponse) => {
                this.imageDiffActionDetails.refImageUuid = data.uuid;
              }),
              concatMap(
                  data => this.backendManagerService.getScaledRegions(
                      this.selectedRegions)),
              map((data: Shape[]) => {
                this.imageDiffActionDetails.regions = data;
              }),
              concatMap(
                  data =>
                      iif(() => this.isNewAction,
                          this.backendManagerService.addActionToWorkflow(
                              actionData),
                          this.backendManagerService.updateActionMetadata(
                              actionData))),
              takeUntil(this.destroyed),
              )
          .subscribe(() => {
            if (this.isNewAction) {
              this.controlMessageService.sendRefreshWorkflowMsg();
              this.closeDialog(true);
            }
          });
    }
  }

  getScreenShotCanvasCtx() {
    return this.screenshot.nativeElement.getContext('2d');
  }

  getRegionCanvasCtx() {
    return this.regionCanvas.nativeElement.getContext('2d');
  }

  takeScreenshot() {
    const screenshotCtx = this.getScreenShotCanvasCtx();
    const regionCanvasCtx = this.getRegionCanvasCtx();
    this.clearRegionCanvas(regionCanvasCtx);

    this.screenshotImg.onload = () => {
      if (screenshotCtx != null) {
        screenshotCtx.drawImage(
            this.screenshotImg, 0, 0, this.screenshotScaledWidth,
            this.screenshotScaledHeight);
      }
    };

    this.backendManagerService.takeScreenshot()
        .pipe(
            take(1),
            takeUntil(this.destroyed),
            )
        .subscribe((data: ImageResponse) => {
          this.screenshotImg.src = 'data:image/png;base64,' + data.image;
        });
  }

  clearRegionCanvas(ctx: CanvasRenderingContext2D) {
    this.selectedRegions = [];
    ctx.canvas.width = this.screenshotScaledWidth;
    ctx.canvas.height = this.screenshotScaledHeight;
  }

  pan(event: PanSwipeEvent) {
    if (event.isFinal) {
      const ctx = this.getRegionCanvasCtx();
      ctx.beginPath();
      // When the user drags on canvas, depending upon the button selected,
      // region shape will be drawn on the canvas.
      switch (this.regionShapeSelected) {
        case 'Rectangle':
          const originX = event.srcEvent.offsetX - event.deltaX;
          const originY = event.srcEvent.offsetY - event.deltaY;
          ctx.rect(originX, originY, event.deltaX, event.deltaY);
          this.selectedRegions.push(new Rectangle(
              ShapeType.RECTANGULAR, originX, originY, event.deltaX,
              event.deltaY));
          break;
        case 'Circle':
          const centerX = event.srcEvent.offsetX - (event.deltaX / 2);
          const centerY = event.srcEvent.offsetY - (event.deltaY / 2);
          ctx.arc(centerX, centerY, event.deltaX / 2, 0, Math.PI * 2);
          this.selectedRegions.push(new Circle(
              ShapeType.CIRCULAR, centerX, centerY, event.deltaX / 2));
          break;
        default:
          alert('Please select a region shape.');
          break;
      }
      ctx.strokeStyle = 'red';
      ctx.stroke();
    }
  }

  selectRegionShape(regionShape: string) {
    this.regionShapeSelected = regionShape;
  }

  removeLastSelectedRegion() {
    if (this.selectedRegions.length > 0) {
      const ctx = this.getRegionCanvasCtx();
      const lastSelectedRegion = this.selectedRegions.pop();
      if (lastSelectedRegion instanceof Circle) {
        const lastSelectedCircle = lastSelectedRegion;
        ctx.clearRect(
            lastSelectedCircle.centerX - lastSelectedCircle.radius - 1,
            lastSelectedCircle.centerY - lastSelectedCircle.radius - 1,
            (2 * lastSelectedCircle.radius) + 2,
            (2 * lastSelectedCircle.radius) + 2);
      } else {
        const lastSelectedRect = lastSelectedRegion as Rectangle;
        ctx.clearRect(
            lastSelectedRect.originX - 1, lastSelectedRect.originY - 1,
            lastSelectedRect.width + 2, lastSelectedRect.height + 2);
      }
    }
  }

  closeDialog(isSaved: boolean) {
    this.dialogRef.close(isSaved);
  }
}
