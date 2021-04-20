(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+MME":
/*!********************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/advanced_actions_dialog.ts ***!
  \********************************************************************/
/*! exports provided: AdvancedActionDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvancedActionDialogComponent", function() { return AdvancedActionDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_advanced_actions_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./advanced_actions_dialog.ng.html */ "t4pl");
/* harmony import */ var _advanced_actions_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./advanced_actions_dialog.css */ "WdIy");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/actions */ "QWWV");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/rect */ "aFBn");
/* harmony import */ var _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../constants/screen_validation_constants */ "vBhh");
/* harmony import */ var _constants_shape__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../constants/shape */ "vh3h");
/* harmony import */ var _popup_dialogs_python_editor_simple__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../popup_dialogs/python_editor_simple */ "MUIB");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../services/control_message_service */ "Etwr");
/* harmony import */ var _script_action_info_dialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./script_action_info_dialog */ "sy93");
/* harmony import */ var _snippet_action_info_dialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./snippet_action_info_dialog */ "2bDc");
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

















var ShapeType;
(function (ShapeType) {
    ShapeType["RECTANGULAR"] = "RECTANGULAR";
    ShapeType["CIRCULAR"] = "CIRCULAR";
})(ShapeType || (ShapeType = {}));
/** Add advanced action dialog */
var AdvancedActionDialogComponent = /** @class */ (function () {
    function AdvancedActionDialogComponent(dialog, dialogRef, backendManagerService, controlMessageService, data) {
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.backendManagerService = backendManagerService;
        this.controlMessageService = controlMessageService;
        this.data = data;
        this.CONTENT_MATCH_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["CONTENT_MATCH_TYPES"];
        this.PACKAGE_NAMES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["PACKAGE_NAMES"];
        this.STRATEGY_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["CLICK_STRATEGY_TYPES"];
        this.STOP_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["STOP_TYPES"];
        this.ACTIONS = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"];
        this.ICON_IMAGE_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ICON_IMAGE_TYPES"];
        this.methodNames = [];
        this.isWaitingForMethods = false;
        this.selectedActionType = '';
        this.isNewAction = true;
        this.screenshotImg = new Image();
        this.screenshotScaledWidth = 0;
        this.screenshotScaledHeight = 0;
        this.selectedRegions = [];
        this.regionShapeSelected = '';
        this.cmdlineDirectSetVariable = false;
        this.advancedActionTypeList = [
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].COMMAND_LINE_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CLICK_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].INPUT_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].REBOOT_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SNIPPET_VALIDATION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCRIPT_EXECUTION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOGCAT_VALIDATION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CONDITION_VALIDATION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].PYTHON_SCRIPT_ACTION,
        ];
        this.validationActionTypeList = [
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.type,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.type,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION.type,
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CONDITION_CLICK_ACTION.type,
        ];
        this.config = {
            fields: {
                text: {
                    name: 'Display Text',
                    type: 'string',
                    defaultValue: '',
                    operators: ['=', '!=', 'contains'],
                },
                class: {
                    name: 'Class',
                    type: 'string',
                    defaultValue: '',
                    operators: ['=', '!=', 'contains'],
                },
                contentDesc: {
                    name: 'Content Description',
                    type: 'string',
                    defaultValue: '',
                    operators: ['=', '!=', 'contains'],
                },
                checkable: { name: 'Checkable', type: 'boolean', defaultValue: false },
                checked: { name: 'Checked', type: 'boolean', defaultValue: false },
                clickable: { name: 'Clickable', type: 'boolean', defaultValue: false },
                enabled: { name: 'Enabled', type: 'boolean', defaultValue: false },
                resourceId: {
                    name: 'Resource ID',
                    type: 'string',
                    operators: ['=', '!=', 'contains'],
                    defaultValue: '',
                },
            }
        };
        this.commandLineActionDetails = {
            actionDescription: '',
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].COMMAND_LINE_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].COMMAND_LINE_ACTION.type,
            commandLine: '',
            commandlineExecutionTimeoutSec: 5,
            expectedReturnCode: 0,
            delayAfterActionMs: 1000,
            isAdbCommand: false,
            needShellOutput: false,
            uicdVariableName: '',
        };
        this.inputActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].INPUT_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].INPUT_ACTION.type,
            isSingleChar: false,
            keyCode: 0,
            inputString: '',
        };
        this.rebootActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].REBOOT_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].REBOOT_ACTION.type,
            onlyReconnectToDevice: false,
            reconnectTimeInSec: 30,
        };
        this.clickActionDetails = {
            name: '',
            // backend will generate details name
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CLICK_ACTION.type,
            isByElement: true,
            isOcrMode: false,
            strategy: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["StrategyType"].TEXT_EQUALS,
            selector: '',
        };
        this.snippetValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SNIPPET_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SNIPPET_VALIDATION_ACTION.type,
            packageName: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["PackageName"].EMPTY_STRING,
            methodName: '',
            argumentsSeparatedByComma: '',
            commandlineExecutionTimeoutSec: 5,
            matchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContentMatchType"].EQUALS,
            textPattern: '',
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["StopType"].STOP_TEST_IF_FALSE,
            executeSnippetOnly: false,
        };
        this.scriptExecutionActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCRIPT_EXECUTION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCRIPT_EXECUTION_ACTION.type,
            delayAfterActionMs: 1000,
            actionDescription: '',
            arguments: '',
            scriptCodeContent: '',
            commandlineExecutionTimeoutSec: 5,
        };
        this.imageDiffActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.type,
            diffScoreThreshold: 0.99,
            includeRegion: true,
            refImageUuid: '',
            regions: [],
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["StopType"].STOP_TEST_IF_FALSE,
        };
        this.logcatValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOGCAT_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOGCAT_VALIDATION_ACTION.type,
            actionType: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOGCAT_VALIDATION_ACTION.actionType,
            commandLine: '',
            commandlineExecutionTimeoutSec: 5,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            logcatOnly: false,
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["StopType"].STOP_TEST_IF_FALSE,
        };
        this.globalVarValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.type,
            actionType: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.actionType,
            expression: '',
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["StopType"].STOP_TEST_IF_FALSE,
        };
        this.mlImageValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.type,
            actionType: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.actionType,
            iconImageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["IconImageType"].BLUE_DOT,
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["StopType"].STOP_TEST_IF_FALSE,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            selectedText: '',
            selectedType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ElementSelectorType"].RESOURCE_ID,
            selectedBound: new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Bounds"](0, 0, 0, 0),
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ScreenContentSearchType"].STRICT,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContextStorageType"].TEXT_BASED,
        };
        this.fetchActionDetails = {
            name: '',
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.type,
            strategy: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["StrategyType"].POSITION,
            selector: '',
            globalVariableName: '',
            attributeType: '',
            isExportField: true,
            bounds: undefined,
        };
        this.conditionValidationAction = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CONDITION_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CONDITION_VALIDATION_ACTION.type,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["StopType"].STOP_TEST_IF_FALSE,
            query: {
                condition: 'and',
                rules: [
                    {
                        field: 'resourceId',
                        operator: '=',
                        value: 'com.android.uicd.sample'
                    },
                    { field: 'text', operator: '=', value: 'Text to match' },
                ]
            },
            clickAfterValidation: false,
        };
        this.screenContentValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.type,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["StopType"].STOP_TEST_IF_FALSE,
            selectedText: '',
            selectedType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ElementSelectorType"].RESOURCE_ID,
            selectedBound: new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Bounds"](0, 0, 0, 0),
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ScreenContentSearchType"].STRICT,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContextStorageType"].TEXT_BASED,
        };
        this.scrollScreenContentValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.type,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["StopType"].STOP_TEST_IF_FALSE,
            selectedText: '',
            selectedType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ElementSelectorType"].RESOURCE_ID,
            selectedBound: new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Bounds"](0, 0, 0, 0),
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ScreenContentSearchType"].STRICT,
            scrollOrientation: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["DirectionType"].UP,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContextStorageType"].TEXT_BASED,
            scrollMaxNumber: 30,
        };
        this.loopScreenContentValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.type,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["StopType"].STOP_TEST_IF_FALSE,
            selectedText: '',
            selectedType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ElementSelectorType"].RESOURCE_ID,
            selectedBound: new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Bounds"](0, 0, 0, 0),
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ScreenContentSearchType"].STRICT,
            waitUntilDisappear: false,
            timeout: 0,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContextStorageType"].TEXT_BASED,
        };
        this.conditionClickActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.type,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["StopType"].STOP_TEST_IF_FALSE,
            selectedText: '',
            selectedType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ElementSelectorType"].RESOURCE_ID,
            selectedBound: new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Bounds"](0, 0, 0, 0),
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ScreenContentSearchType"].STRICT,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContextStorageType"].TEXT_BASED,
        };
        this.validationRequestDetails = {
            actionType: '',
            contentData: '',
            selectedBounds: undefined,
            contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContentMatchType"].EQUALS,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ContextStorageType"].TEXT_BASED,
            elementSelectorType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ElementSelectorType"].DISPLAY_TEXT,
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ScreenContentSearchType"].AROUND,
            scrollDirectionType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["DirectionType"].UP,
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["StopType"].STOP_TEST_IF_FALSE,
            timeout: 60,
            waitUntilDisappear: false
        };
        this.doubleTapPowerButtonDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION.shortName,
            actionType: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION.type,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION.type,
        };
        this.pythonScriptActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].PYTHON_SCRIPT_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].PYTHON_SCRIPT_ACTION.type,
            script: '',
            expectedReturnCode: 0,
        };
        /** Handle on-destroy Subject, used to unsubscribe. */
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
    }
    AdvancedActionDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.data) {
            this.isNewAction = false;
            // Set details for the selected action.
            switch (this.data.actionType) {
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].COMMAND_LINE_ACTION.actionType:
                    this.commandLineActionDetails = this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].COMMAND_LINE_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].INPUT_ACTION.actionType:
                    this.inputActionDetails = this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].INPUT_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CLICK_ACTION.actionType:
                    this.clickActionDetails = this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CLICK_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].REBOOT_ACTION.actionType:
                    this.rebootActionDetails = this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].REBOOT_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SNIPPET_VALIDATION_ACTION.actionType:
                    this.snippetValidationActionDetails =
                        this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SNIPPET_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCRIPT_EXECUTION_ACTION.actionType:
                    this.scriptExecutionActionDetails =
                        this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCRIPT_EXECUTION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.actionType:
                    this.imageDiffActionDetails = this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOGCAT_VALIDATION_ACTION.actionType:
                    this.logcatValidationActionDetails =
                        this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOGCAT_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.actionType:
                    this.globalVarValidationActionDetails =
                        this.data;
                    this.selectedActionType =
                        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.actionType:
                    this.fetchActionDetails = this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.actionType:
                    this.screenContentValidationActionDetails =
                        this.data;
                    this.convertToValidationRequest(this.screenContentValidationActionDetails);
                    this.selectedActionType =
                        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.actionType:
                    this.scrollScreenContentValidationActionDetails =
                        this.data;
                    this.convertToValidationRequest(this.scrollScreenContentValidationActionDetails);
                    this.selectedActionType =
                        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION.actionType:
                    this.loopScreenContentValidationActionDetails =
                        this.data;
                    this.convertToValidationRequest(this.loopScreenContentValidationActionDetails);
                    this.selectedActionType =
                        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CONDITION_CLICK_ACTION.actionType:
                    this.conditionClickActionDetails =
                        this.data;
                    this.convertToValidationRequest(this.conditionClickActionDetails);
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CONDITION_CLICK_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.actionType:
                    this.mlImageValidationActionDetails =
                        this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CONDITION_VALIDATION_ACTION.actionType:
                    this.conditionValidationAction =
                        this.data;
                    // `unknown`.
                    this.conditionValidationAction.query =
                        JSON.parse(JSON.stringify(this.conditionValidationAction.query), function (k, v) {
                            return v === 'true' ? true : v === 'false' ? false : v;
                        });
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CONDITION_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION.actionType:
                    this.doubleTapPowerButtonDetails =
                        this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].PYTHON_SCRIPT_ACTION.actionType:
                    this.pythonScriptActionDetails =
                        this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].PYTHON_SCRIPT_ACTION.type;
                    break;
                default:
                    break;
            }
            if (this.commandLineActionDetails.uicdVariableName &&
                this.commandLineActionDetails.uicdVariableName !== '') {
                this.cmdlineDirectSetVariable = true;
            }
        }
        this.backendManagerService.getScaledScreenDimensions()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.screenshotScaledWidth = data.width;
            _this.screenshotScaledHeight = data.height;
        });
    };
    AdvancedActionDialogComponent.prototype.ngAfterViewInit = function () {
        // see go/strict-prop-init-fix for more details
        // inject text value when editor is initialized
        if (this.data.actionType === _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].PYTHON_SCRIPT_ACTION.actionType) {
            this.pythonEditorComponent.setTextToEditor(this.pythonScriptActionDetails.script);
        }
    };
    AdvancedActionDialogComponent.prototype.ngOnDestroy = function () {
        // Unsubscribes all pending subscriptions.
        this.destroyed.next();
    };
    AdvancedActionDialogComponent.prototype.saveAction = function () {
        var _this = this;
        var actionData = this.commandLineActionDetails;
        if (!this.cmdlineDirectSetVariable) {
            this.commandLineActionDetails.uicdVariableName = '';
        }
        switch (this.selectedActionType) {
            // Save details for regular actions.
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].COMMAND_LINE_ACTION.type:
                actionData = this.commandLineActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CLICK_ACTION.type:
                actionData = this.clickActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].INPUT_ACTION.type:
                actionData = this.inputActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].REBOOT_ACTION.type:
                actionData = this.rebootActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SNIPPET_VALIDATION_ACTION.type:
                actionData = this.snippetValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCRIPT_EXECUTION_ACTION.type:
                actionData = this.scriptExecutionActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOGCAT_VALIDATION_ACTION.type:
                actionData = this.logcatValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.type:
                actionData = this.imageDiffActionDetails;
                this.saveImageDiffAction(actionData);
                return;
            // Save details for validations.
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.type:
                actionData = this.globalVarValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.type:
                actionData = this.mlImageValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.type:
                actionData = this.fetchActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.type:
                actionData = this.screenContentValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.type:
                actionData = this.scrollScreenContentValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION.type:
                actionData = this.loopScreenContentValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CONDITION_CLICK_ACTION.type:
                actionData = this.conditionClickActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CONDITION_VALIDATION_ACTION.type:
                actionData = this.conditionValidationAction;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION.type:
                actionData = this.doubleTapPowerButtonDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].PYTHON_SCRIPT_ACTION.type:
                this.pythonScriptActionDetails = {
                    name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].PYTHON_SCRIPT_ACTION.shortName,
                    type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].PYTHON_SCRIPT_ACTION.type,
                    script: this.pythonEditorComponent.getTextFromEditor(),
                    expectedReturnCode: 0,
                };
                actionData = this.pythonScriptActionDetails;
                break;
            default:
                break;
        }
        if (this.isNewAction) {
            this.backendManagerService.addActionToWorkflow(actionData)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
                .subscribe(function () {
                _this.controlMessageService.sendRefreshWorkflowMsg();
                _this.closeDialog(true);
            });
        }
        else {
            if (this.validationActionTypeList.includes(this.selectedActionType) &&
                actionData.actionId) {
                this.backendManagerService
                    .updateValidationAction(actionData.actionId, this.validationRequestDetails)
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
                    .subscribe(function () {
                    _this.controlMessageService.sendRefreshWorkflowMsg();
                    _this.closeDialog(true);
                });
            }
            else {
                this.backendManagerService.updateActionMetadata(actionData)
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
                    .subscribe(function () {
                    _this.controlMessageService.sendRefreshWorkflowMsg();
                    _this.closeDialog(true);
                });
            }
        }
    };
    AdvancedActionDialogComponent.prototype.convertToValidationRequest = function (action) {
        switch (action.actionType) {
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.actionType:
                this.validationRequestDetails.actionType =
                    _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ValidationActionType"].SCREEN_CONTENT_VALIDATION_ACTION;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.actionType:
                this.validationRequestDetails.actionType =
                    _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ValidationActionType"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION.actionType:
                this.validationRequestDetails.actionType =
                    _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ValidationActionType"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CONDITION_CLICK_ACTION.actionType:
                this.validationRequestDetails.actionType =
                    _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_10__["ValidationActionType"].CONDITION_CLICK_ACTION;
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
        if (action.timeout !==
            undefined) {
            this.validationRequestDetails.timeout =
                action.timeout;
            this.validationRequestDetails.waitUntilDisappear =
                action
                    .waitUntilDisappear;
        }
        // ScrollScreenContentValidation
        if (action
            .scrollOrientation !== undefined) {
            this.validationRequestDetails.scrollDirectionType =
                action
                    .scrollOrientation;
            this.validationRequestDetails.scrollMaxNumber =
                action
                    .scrollMaxNumber;
        }
    };
    AdvancedActionDialogComponent.prototype.isValidationAction = function () {
        if (this.selectedActionType === _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.type) {
            return false;
        }
        if (this.validationActionTypeList.includes(this.selectedActionType)) {
            return true;
        }
        return false;
    };
    AdvancedActionDialogComponent.prototype.selectedPackageChanged = function (selectedPackage) {
        var _this = this;
        if (selectedPackage !== undefined) {
            this.isWaitingForMethods = true;
            this.backendManagerService.getAllAvailableSnippetMethods(selectedPackage)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
                .subscribe(function (data) {
                _this.methodNames = [];
                for (var _i = 0, _a = data; _i < _a.length; _i++) {
                    var methodData = _a[_i];
                    var methodStart = methodData.indexOf(' ') + 1;
                    var methodEnd = methodData.indexOf('(');
                    _this.methodNames.push({
                        value: methodData.substring(methodStart, methodEnd),
                        displayText: methodData
                    });
                }
                _this.isWaitingForMethods = false;
            });
        }
    };
    AdvancedActionDialogComponent.prototype.methodSelected = function (selectedMethodValue) {
        for (var _i = 0, _a = this.methodNames; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.value === selectedMethodValue) {
                if (entry.displayText.includes('returns void')) {
                    this.snippetValidationActionDetails.executeSnippetOnly = true;
                    break;
                }
            }
        }
    };
    AdvancedActionDialogComponent.prototype.openActionInfoDialog = function () {
        switch (this.selectedActionType) {
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SNIPPET_VALIDATION_ACTION.type:
                this.dialog.open(_snippet_action_info_dialog__WEBPACK_IMPORTED_MODULE_16__["SnippetActionInfoDialogComponent"], {
                    width: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
                });
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCRIPT_EXECUTION_ACTION.type:
                this.dialog.open(_script_action_info_dialog__WEBPACK_IMPORTED_MODULE_15__["ScriptActionInfoDialogComponent"], {
                    width: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
                });
                break;
            default:
                break;
        }
    };
    AdvancedActionDialogComponent.prototype.saveImageDiffAction = function (actionData) {
        var _this = this;
        if (this.screenshotImg.src !== '') {
            var base64ImgStr = this.screenshotImg.src.replace('data:image/png;base64,', '');
            this.backendManagerService.addImage(base64ImgStr)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (data) {
                _this.imageDiffActionDetails.refImageUuid = data.uuid;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["concatMap"])(function (data) { return _this.backendManagerService.getScaledRegions(_this.selectedRegions); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (data) {
                _this.imageDiffActionDetails.regions = data;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["concatMap"])(function (data) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["iif"])(function () { return _this.isNewAction; }, _this.backendManagerService.addActionToWorkflow(actionData), _this.backendManagerService.updateActionMetadata(actionData));
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
                .subscribe(function () {
                if (_this.isNewAction) {
                    _this.controlMessageService.sendRefreshWorkflowMsg();
                    _this.closeDialog(true);
                }
            });
        }
    };
    AdvancedActionDialogComponent.prototype.getScreenShotCanvasCtx = function () {
        return this.screenshot.nativeElement.getContext('2d');
    };
    AdvancedActionDialogComponent.prototype.getRegionCanvasCtx = function () {
        return this.regionCanvas.nativeElement.getContext('2d');
    };
    AdvancedActionDialogComponent.prototype.takeScreenshot = function () {
        var _this = this;
        var screenshotCtx = this.getScreenShotCanvasCtx();
        var regionCanvasCtx = this.getRegionCanvasCtx();
        this.clearRegionCanvas(regionCanvasCtx);
        this.screenshotImg.onload = function () {
            if (screenshotCtx != null) {
                screenshotCtx.drawImage(_this.screenshotImg, 0, 0, _this.screenshotScaledWidth, _this.screenshotScaledHeight);
            }
        };
        this.backendManagerService.takeScreenshot()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.screenshotImg.src = 'data:image/png;base64,' + data.image;
        });
    };
    AdvancedActionDialogComponent.prototype.clearRegionCanvas = function (ctx) {
        this.selectedRegions = [];
        ctx.canvas.width = this.screenshotScaledWidth;
        ctx.canvas.height = this.screenshotScaledHeight;
    };
    AdvancedActionDialogComponent.prototype.pan = function (event) {
        if (event.isFinal) {
            var ctx = this.getRegionCanvasCtx();
            ctx.beginPath();
            // When the user drags on canvas, depending upon the button selected,
            // region shape will be drawn on the canvas.
            switch (this.regionShapeSelected) {
                case 'Rectangle':
                    var originX = event.srcEvent.offsetX - event.deltaX;
                    var originY = event.srcEvent.offsetY - event.deltaY;
                    ctx.rect(originX, originY, event.deltaX, event.deltaY);
                    this.selectedRegions.push(new _constants_shape__WEBPACK_IMPORTED_MODULE_11__["Rectangle"](ShapeType.RECTANGULAR, originX, originY, event.deltaX, event.deltaY));
                    break;
                case 'Circle':
                    var centerX = event.srcEvent.offsetX - (event.deltaX / 2);
                    var centerY = event.srcEvent.offsetY - (event.deltaY / 2);
                    ctx.arc(centerX, centerY, event.deltaX / 2, 0, Math.PI * 2);
                    this.selectedRegions.push(new _constants_shape__WEBPACK_IMPORTED_MODULE_11__["Circle"](ShapeType.CIRCULAR, centerX, centerY, event.deltaX / 2));
                    break;
                default:
                    alert('Please select a region shape.');
                    break;
            }
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }
    };
    AdvancedActionDialogComponent.prototype.selectRegionShape = function (regionShape) {
        this.regionShapeSelected = regionShape;
    };
    AdvancedActionDialogComponent.prototype.removeLastSelectedRegion = function () {
        if (this.selectedRegions.length > 0) {
            var ctx = this.getRegionCanvasCtx();
            var lastSelectedRegion = this.selectedRegions.pop();
            if (lastSelectedRegion instanceof _constants_shape__WEBPACK_IMPORTED_MODULE_11__["Circle"]) {
                var lastSelectedCircle = lastSelectedRegion;
                ctx.clearRect(lastSelectedCircle.centerX - lastSelectedCircle.radius - 1, lastSelectedCircle.centerY - lastSelectedCircle.radius - 1, (2 * lastSelectedCircle.radius) + 2, (2 * lastSelectedCircle.radius) + 2);
            }
            else {
                var lastSelectedRect = lastSelectedRegion;
                ctx.clearRect(lastSelectedRect.originX - 1, lastSelectedRect.originY - 1, lastSelectedRect.width + 2, lastSelectedRect.height + 2);
            }
        }
    };
    AdvancedActionDialogComponent.prototype.closeDialog = function (isSaved) {
        this.dialogRef.close(isSaved);
    };
    AdvancedActionDialogComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_13__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_14__["ControlMessageService"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
    ]; };
    AdvancedActionDialogComponent.propDecorators = {
        screenshot: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['screenshot', { static: false },] }],
        regionCanvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['regionCanvas', { static: false },] }],
        pythonEditorComponent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_popup_dialogs_python_editor_simple__WEBPACK_IMPORTED_MODULE_12__["PythonEditorSimpleComponent"],] }]
    };
    AdvancedActionDialogComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'advanced-actions-dialog',
            template: _raw_loader_advanced_actions_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_advanced_actions_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_13__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_14__["ControlMessageService"], Object])
    ], AdvancedActionDialogComponent);
    return AdvancedActionDialogComponent;
}());



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /usr/local/google/home/tccyp/uicd-package-tmp-opensource/frontend/src/main.ts */"zUnb");


/***/ }),

/***/ "0fnC":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/ui_tree_viewer/ui_tree_viewer.ng.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div fxLayout=\"column\" fxLayoutGap=\"10px\" fxFill>\n  <div fxLayout=\"row wrap\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n    <mat-slide-toggle (change)=\"toggleHighlight($event)\">Highlight</mat-slide-toggle>\n    <mat-slide-toggle (change)=\"toggleInspectDevice($event)\">Inspect Device</mat-slide-toggle>\n    <button mat-raised-button (click)=\"expandAll()\">Expand All</button>\n    <button mat-raised-button (click)=\"closeAll()\">Close All</button>\n    <button mat-raised-button (click)=\"fetchXML()\">Refresh XML</button>\n    <button mat-raised-button (click)=\"showXML()\">Show XML</button>\n    <mat-slide-toggle (change)=\"toggleAttributes($event)\" [checked]=\"true\">Toggle Attributes</mat-slide-toggle>\n  </div>\n  <div fxLayout=\"row wrap\" fxLayoutGap=\"20px\">\n    <mat-form-field fxFlex=\"2 2 auto\">\n      <input matInput placeholder=\"Press enter to search\" [(ngModel)]=\"searchStr\" (keyup.enter)=\"searchTree()\">\n    </mat-form-field>\n    <mat-form-field fxFlex=\"1 1 auto\">\n      <mat-select placeholder=\"Search Type\" [(ngModel)]=\"searchType\">\n        <mat-option *ngFor=\"let t of searchTypes\" [value]=\"t\">\n          {{t}}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  </div>\n  <div fxLayout=\"row wrap\">\n    <div class=\"treeArea\" fxFlex>\n      <div #jsTree></div>\n    </div>\n    <div class=\"attributeList\" *ngIf=\"showAttributes\" fxFlex>\n      <div *ngFor=\"let attr of attributes\" class=\"attributeItem\">\n        <div class=\"attributeTitle\">{{ attr.name }}</div>\n        <div class=\"attributeValue\">{{ attr.value }}</div>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "1C7L":
/*!***************************************************!*\
  !*** ./src/app/device_manager/device_manager.css ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.currentDevice {\n    float: right;\n    padding: 10px;\n    font-size: 15px;\n}\n\n.star-icon {\n    padding: 15px;\n}\n\ntable {\n  width: 100%;\n}\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZV9tYW5hZ2VyLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0FBQ2IiLCJmaWxlIjoiZGV2aWNlX21hbmFnZXIuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5jdXJyZW50RGV2aWNlIHtcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBmb250LXNpemU6IDE1cHg7XG59XG5cbi5zdGFyLWljb24ge1xuICAgIHBhZGRpbmc6IDE1cHg7XG59XG5cbnRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbiJdfQ== */");

/***/ }),

/***/ "1bMm":
/*!*************************************************************************!*\
  !*** ./src/app/screen_validation_flow/screen_validation_flow_module.ts ***!
  \*************************************************************************/
/*! exports provided: ScreenValidationFlowModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenValidationFlowModule", function() { return ScreenValidationFlowModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/chips */ "A5z7");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/stepper */ "xHqg");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _screen_validation_flow_screen_validation_flow__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../screen_validation_flow/screen_validation_flow */ "aJH2");
/* harmony import */ var _fetch_content_form__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./fetch_content_form */ "UU5W");
/* harmony import */ var _validation_details__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./validation_details */ "MB+p");
/* harmony import */ var _validation_info__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./validation_info */ "yhUx");
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




















var ScreenValidationFlowModule = /** @class */ (function () {
    function ScreenValidationFlowModule() {
    }
    ScreenValidationFlowModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _fetch_content_form__WEBPACK_IMPORTED_MODULE_17__["FetchContentComponent"],
                _screen_validation_flow_screen_validation_flow__WEBPACK_IMPORTED_MODULE_16__["ScreenValidationFlowComponent"],
                _validation_details__WEBPACK_IMPORTED_MODULE_18__["ValidationDetailsComponent"],
                _validation_info__WEBPACK_IMPORTED_MODULE_19__["ValidationInfoDialogComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__["BrowserAnimationsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__["MatCheckboxModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__["MatChipsModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__["MatDialogModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_10__["MatInputModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_11__["MatRadioModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_8__["MatOptionModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_12__["MatSelectModule"],
                _angular_material_stepper__WEBPACK_IMPORTED_MODULE_13__["MatStepperModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            ],
            exports: [
                _fetch_content_form__WEBPACK_IMPORTED_MODULE_17__["FetchContentComponent"],
                _screen_validation_flow_screen_validation_flow__WEBPACK_IMPORTED_MODULE_16__["ScreenValidationFlowComponent"],
                _validation_details__WEBPACK_IMPORTED_MODULE_18__["ValidationDetailsComponent"],
                _validation_info__WEBPACK_IMPORTED_MODULE_19__["ValidationInfoDialogComponent"],
            ],
        })
    ], ScreenValidationFlowModule);
    return ScreenValidationFlowModule;
}());



/***/ }),

/***/ "1yFU":
/*!*******************************************************!*\
  !*** ./src/app/test_explorer/test_explorer_module.ts ***!
  \*******************************************************/
/*! exports provided: TestExplorerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestExplorerModule", function() { return TestExplorerModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _popup_dialogs_dialogs_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../popup_dialogs/dialogs_module */ "XVJF");
/* harmony import */ var _popup_dialogs_hard_soft_import_action_info_dialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../popup_dialogs/hard_soft_import_action_info_dialog */ "I6yJ");
/* harmony import */ var _action_edit_dialog__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./action_edit_dialog */ "BtrL");
/* harmony import */ var _export_google3_dialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./export_google3_dialog */ "xqAX");
/* harmony import */ var _import_dialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./import_dialog */ "AFFR");
/* harmony import */ var _import_project_dialog__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./import_project_dialog */ "KbxA");
/* harmony import */ var _new_project_dialog__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./new_project_dialog */ "VNV4");
/* harmony import */ var _share_with_project_dialog__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./share_with_project_dialog */ "c5Vj");
/* harmony import */ var _test_explorer__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./test_explorer */ "JRid");
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



























var TestExplorerModule = /** @class */ (function () {
    function TestExplorerModule() {
    }
    TestExplorerModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["BrowserAnimationsModule"],
                _popup_dialogs_dialogs_module__WEBPACK_IMPORTED_MODULE_18__["DialogsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIconModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_10__["MatMenuModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__["MatProgressSpinnerModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_11__["MatProgressBarModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__["MatSnackBarModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__["MatRadioModule"],
            ],
            exports: [_test_explorer__WEBPACK_IMPORTED_MODULE_26__["TestExplorer"]],
            declarations: [
                _test_explorer__WEBPACK_IMPORTED_MODULE_26__["TestExplorer"], _action_edit_dialog__WEBPACK_IMPORTED_MODULE_20__["ActionEditDialog"], _export_google3_dialog__WEBPACK_IMPORTED_MODULE_21__["ExportGoogle3Dialog"], _import_dialog__WEBPACK_IMPORTED_MODULE_22__["ImportDialog"],
                _import_project_dialog__WEBPACK_IMPORTED_MODULE_23__["ImportProjectDialog"], _new_project_dialog__WEBPACK_IMPORTED_MODULE_24__["NewProjectDialog"], _share_with_project_dialog__WEBPACK_IMPORTED_MODULE_25__["ShareWithProjectDialog"]
            ],
            entryComponents: [
                _action_edit_dialog__WEBPACK_IMPORTED_MODULE_20__["ActionEditDialog"], _popup_dialogs_hard_soft_import_action_info_dialog__WEBPACK_IMPORTED_MODULE_19__["HardAndSoftInfoDialogComponent"], _export_google3_dialog__WEBPACK_IMPORTED_MODULE_21__["ExportGoogle3Dialog"],
                _import_dialog__WEBPACK_IMPORTED_MODULE_22__["ImportDialog"], _import_project_dialog__WEBPACK_IMPORTED_MODULE_23__["ImportProjectDialog"], _new_project_dialog__WEBPACK_IMPORTED_MODULE_24__["NewProjectDialog"], _share_with_project_dialog__WEBPACK_IMPORTED_MODULE_25__["ShareWithProjectDialog"]
            ]
        })
    ], TestExplorerModule);
    return TestExplorerModule;
}());



/***/ }),

/***/ "2bDc":
/*!***********************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/snippet_action_info_dialog.ts ***!
  \***********************************************************************/
/*! exports provided: SnippetActionInfoDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnippetActionInfoDialogComponent", function() { return SnippetActionInfoDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_snippet_action_info_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./snippet_action_info_dialog.ng.html */ "TivY");
/* harmony import */ var _snippet_action_info_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./snippet_action_info_dialog.css */ "OQgS");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
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





/**
 * Snippet Action Info dialog component shows the information on
 * how to use SnippetValidationAction
 */
var SnippetActionInfoDialogComponent = /** @class */ (function () {
    function SnippetActionInfoDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    SnippetActionInfoDialogComponent.prototype.onOkClick = function () {
        this.dialogRef.close();
    };
    SnippetActionInfoDialogComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] }
    ]; };
    SnippetActionInfoDialogComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'snippet_action_info_dialog',
            template: _raw_loader_snippet_action_info_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_snippet_action_info_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"]])
    ], SnippetActionInfoDialogComponent);
    return SnippetActionInfoDialogComponent;
}());



/***/ }),

/***/ "3a6F":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/device_manager/device_manager.ng.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<mat-tab-group>\n  <mat-tab label=\"Devices\">\n    <mat-form-field>\n      <mat-select placeholder=\"Play Mode:\" [(value)]=\"selectedPlayMode\" (selectionChange)=\"changePlayMode($event)\">\n        <mat-option *ngFor=\"let playMode of playModes\" [value]=\"playMode.name\">\n          {{playMode.display}}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <div class=\"currentDevice\" *ngIf=\"(currentDevice | async)\">\n      <b> Current Device: </b>{{(currentDevice | async).deviceId}}\n    </div>\n    <div>\n      <table mat-table [dataSource]=\"dataSource\">\n        <ng-container matColumnDef=\"position\">\n          <th mat-header-cell *matHeaderCellDef> Slot </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.position}} </td>\n        </ng-container>\n        <ng-container matColumnDef=\"device_serial\">\n          <th mat-header-cell *matHeaderCellDef> Device Serial </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.deviceSerial}} </td>\n        </ng-container>\n        <ng-container matColumnDef=\"status\">\n          <th mat-header-cell *matHeaderCellDef> Status </th>\n          <td mat-cell *matCellDef=\"let element\">\n            <div [ngSwitch]=\"element.status\">\n              <div *ngSwitchCase=\"0\">\n                No available device on this slot.\n              </div>\n\n              <div *ngSwitchCase=\"1\">\n                <button mat-raised-button (click)=\"initDevice(element.deviceSerial)\">\n                  Ready\n                </button>\n              </div>\n\n              <div *ngSwitchCase=\"2\">\n                <button mat-raised-button (click)=\"initDevice(element.deviceSerial)\">\n                  Connected\n                </button>\n              </div>\n\n              <div *ngSwitchCase=\"3\">\n                Connecting...\n              </div>\n\n              <div *ngSwitchDefault>\n                UNKNOWN\n              </div>\n            </div>\n          </td>\n        </ng-container>\n        <ng-container matColumnDef=\"selected\">\n          <th mat-header-cell *matHeaderCellDef> Selected </th>\n          <td mat-cell *matCellDef=\"let element\">\n            <div class=\"star-icon\" *ngIf=\"element.deviceSerial === (currentDevice | async).deviceId\">\n              <i class=\"material-icons\">star_rate</i>\n            </div>\n          </td>\n        </ng-container>\n        <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n      </table>\n    </div>\n  </mat-tab>\n  <mat-tab label=\"TV Remote\">\n    <tv-remote></tv-remote>\n  </mat-tab>\n</mat-tab-group>\n");

/***/ }),

/***/ "3gOg":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/screen_cast/screen_cast.ng.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n  <div class=\"phone-sidenav\">\n    <div fxLayout='column'>\n      <div style=\"padding-left:10px;\">\n        <div>\n          <div fxLayout='row' class=\"recorder-main\" fxFlexFill>\n            <div fxFlex=\"60px\" fxLayoutGap=\"15px\" fxFlexFill fxLayout='column' class='btn-container'>\n              <button mat-mini-fab color=\"primary\" (click)=\"quickSwipe(swipeDirection.LEFT)\" matTooltip=\"Swipe Left\"\n                matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-arrow-left\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"quickSwipe(swipeDirection.RIGHT)\" matTooltip=\"Swipe Right\"\n                matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-arrow-right\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"quickSwipe(swipeDirection.UP)\" matTooltip=\"Swipe Up\"\n                matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-arrow-up\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"quickSwipe(swipeDirection.DOWN)\" matTooltip=\"Swipe Down\"\n                matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-arrow-down\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"rotateScreen(rotateDirection.PORTRAIT)\"\n                matTooltip=\"Portrait Mode\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-mobile fa-2x\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"rotateScreen(rotateDirection.LANDSCAPE)\"\n                matTooltip=\"Landscape Mode\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-mobile fa-2x fa-rotate-90\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"power()\" matTooltip=\"Power\" matTooltipPosition=\"right\"\n                matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-power-off fa-lg\"></i>\n              </button>\n\n              <button mat-mini-fab color=\"primary\" (click)=\"volumeUp()\" matTooltip=\"Volume Up\"\n                matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-volume-up fa-lg\"></i>\n              </button>\n\n              <button mat-mini-fab color=\"primary\" (click)=\"volumeDown()\" matTooltip=\"Volume Down\"\n                matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-volume-down fa-lg\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"back()\" matTooltip=\"Back\" matTooltipPosition=\"right\"\n                matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-chevron-left\"></i>\n              </button>\n\n              <button mat-mini-fab color=\"primary\" (click)=\"home()\" matTooltip=\"Home\" matTooltipPosition=\"right\"\n                matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-home fa-lg\"></i>\n              </button>\n\n              <button mat-mini-fab color=\"primary\" (click)=\"overview()\" matTooltip=\"Overview\" matTooltipPosition=\"right\"\n                matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-square\"></i>\n              </button>\n            </div>\n            <div fxFlex=\"1\" [class]=\"canvasWrapperCss\" fxLayoutGap=\"10px\">\n              <div class=\"screen-widget-root\" (tap)=\"tap($event.srcEvent)\" (pan)=\"pan($event)\" (pressup)=\"pressup($event)\"\n                (press)=\"press($event.srcEvent)\" tabindex=\"0\">\n                <div class=\"phone-wrapper\">\n                  <canvas id=\"canvas-screen\" [class]=\"canvasPhoneCss\" #phoneScreen tabindex=\"0\" [width]=\"canvasWidth\"\n                    [height]=\"canvasHeight\">\n                  </canvas>\n                </div>\n                <!-- This canvas will handle drawing the hovered tree nodes -->\n                <div class=\"phone-overlay-wrapper\">\n                  <canvas id=\"canvas-overlay-hovered\" class=\"phone-canvas-widget2\" #overlayHovered tabindex=\"0\" [width]=\"canvasWidth\"\n                  [height]=\"canvasHeight\">\n                  </canvas>\n                </div>\n                <!-- This canvas will handle the selected tree nodes -->\n                <div class=\"phone-overlay-wrapper\">\n                  <canvas id=\"canvas-overlay-selected\" class=\"phone-canvas-widget2\" #overlaySelected tabindex=\"0\" [width]=\"canvasWidth\"\n                  [height]=\"canvasHeight\">\n                  </canvas>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n");

/***/ }),

/***/ "4DMm":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/test_explorer/test_explorer.ng.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"save-main-div\" fxFlexFill fxLayout='column'>\n  <div class=\"test-case-header\" fxLayout='column'>\n    <div>\n      <h3 class=\"test-case-title\">Saved Test Cases in Project: {{selectedProject.projectName}}</h3>\n      <button mat-raised-button [matMenuTriggerFor]=\"projectMenu\" style=\"float:right;\" (click)=getProjectList()>\n          Project\n      </button>\n      <mat-menu #projectMenu=\"matMenu\">\n        <button mat-menu-item (click)=openNewProjectDialog()>New</button>\n        <button mat-menu-item [matMenuTriggerFor]=\"switchProjectMenu\">Open</button>\n        <button mat-menu-item (click)=openImportProjectDialog()>Import</button>\n        <button mat-menu-item (click)=openShareProjectDialog()>Share Current Project</button>\n        <button mat-menu-item (click)=exportTopLevelTests()>Export Zip(Top Level Tests Only)</button>\n        <button mat-menu-item (click)=exportCurrentProject()>Export Project Zip</button>\n\n      </mat-menu>\n\n      <mat-menu #switchProjectMenu=\"matMenu\" >\n        <button mat-menu-item *ngFor=\"let project of projectList\"  (click)=selectProject(project) class=\"project-button\">\n          <button mat-raised-button (click)=\"deleteProject(project, $event)\" class=\"trash-hover trash-align\">\n            <i class=\"fa fa-trash center-icon-img\" ></i>\n          </button>\n          {{project.projectName}}\n        </button>\n      </mat-menu>\n\n      <li class=\"workspaceButton\" (click)=\"createFolder('#', 'New Workspace')\">\n        <i class=\"fa fa-plus-square fa-lg\" aria-hidden=\"true\"></i><a href=\"#\">New Workspace</a>\n      </li>\n    </div>\n    <input matInput placeholder=\"Press enter to search\" class=\"mat-elevation-z8\" [(ngModel)]=\"searchStr\" (keyup.enter)=\"searchTree()\">\n  </div>\n  <div class=\"action-list-tree\" fxFlex=\"2 1 inherit\">\n    <div #jsTree></div>\n  </div>\n</div>\n");

/***/ }),

/***/ "5OJA":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/log_panel/log_panel.ng.html ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"log-panel\" fxFlexFill>\n  Backend log:\n  <ul>\n    <li *ngFor=\"let item of showingLogs | async\" class='log-content-item'>{{item}}</li>\n  </ul>\n</div>\n");

/***/ }),

/***/ "69le":
/*!***********************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/script_action_info_dialog.css ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.info-table {\n    width: 100%;\n    display: table;\n    border-collapse: collapse;\n    border-spacing: 0;\n}\n\n.info-table tr {\n    border-bottom: 1px solid rgba(0,0,0,0.12);\n}\n\n.info-table td:nth-child(2) {\n    border-left: 1px solid rgba(0,0,0,0.12);\n    max-width: 400px;\n}\n\n.info-table td:nth-child(1) {\n    min-width: 150px;\n}\n\n.foot-note {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdF9hY3Rpb25faW5mb19kaWFsb2cuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0lBQ0ksV0FBVztJQUNYLGNBQWM7SUFDZCx5QkFBeUI7SUFDekIsaUJBQWlCO0FBQ3JCOztBQUNBO0lBQ0kseUNBQXlDO0FBQzdDOztBQUVBO0lBQ0ksdUNBQXVDO0lBQ3ZDLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixtQkFBbUI7QUFDdkIiLCJmaWxlIjoic2NyaXB0X2FjdGlvbl9pbmZvX2RpYWxvZy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLmluZm8tdGFibGUge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gICAgYm9yZGVyLXNwYWNpbmc6IDA7XG59XG4uaW5mby10YWJsZSB0ciB7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4xMik7XG59XG5cbi5pbmZvLXRhYmxlIHRkOm50aC1jaGlsZCgyKSB7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMTIpO1xuICAgIG1heC13aWR0aDogNDAwcHg7XG59XG5cbi5pbmZvLXRhYmxlIHRkOm50aC1jaGlsZCgxKSB7XG4gICAgbWluLXdpZHRoOiAxNTBweDtcbn1cblxuLmZvb3Qtbm90ZSB7XG4gICAgbWFyZ2luLXRvcDogMTVweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xufSJdfQ== */");

/***/ }),

/***/ "7lza":
/*!*******************************!*\
  !*** ./src/app/app_module.ts ***!
  \*******************************/
/*! exports provided: UicdHammerConfig, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UicdHammerConfig", function() { return UicdHammerConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/chips */ "A5z7");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/grid-list */ "zkoq");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/stepper */ "xHqg");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var angular_split__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! angular-split */ "cdP3");
/* harmony import */ var _advanced_actions_dialog_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./advanced_actions_dialog/advanced_actions_dialog */ "+MME");
/* harmony import */ var _advanced_actions_dialog_advanced_actions_dialog_module__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./advanced_actions_dialog/advanced_actions_dialog_module */ "eA3M");
/* harmony import */ var _advanced_actions_dialog_script_action_info_dialog__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./advanced_actions_dialog/script_action_info_dialog */ "sy93");
/* harmony import */ var _advanced_actions_dialog_snippet_action_info_dialog__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./advanced_actions_dialog/snippet_action_info_dialog */ "2bDc");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./app */ "XbWe");
/* harmony import */ var _device_manager_device_manager_module__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./device_manager/device_manager_module */ "TZWK");
/* harmony import */ var _log_panel_log_panel_module__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./log_panel/log_panel_module */ "AUgs");
/* harmony import */ var _popup_dialogs_choose_device_dialog__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./popup_dialogs/choose_device_dialog */ "jHJN");
/* harmony import */ var _popup_dialogs_dialogs_module__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./popup_dialogs/dialogs_module */ "XVJF");
/* harmony import */ var _popup_dialogs_global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./popup_dialogs/global_var_setting_dialog */ "95hE");
/* harmony import */ var _popup_dialogs_history_dialog__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./popup_dialogs/history_dialog */ "FC0R");
/* harmony import */ var _popup_dialogs_python_debugger_simple_dialog__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./popup_dialogs/python_debugger_simple_dialog */ "Ps2F");
/* harmony import */ var _popup_dialogs_replay_details_dialog__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./popup_dialogs/replay_details_dialog */ "XN9M");
/* harmony import */ var _screen_cast_screen_cast_module__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./screen_cast/screen_cast_module */ "BGdh");
/* harmony import */ var _screen_validation_flow_screen_validation_flow__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./screen_validation_flow/screen_validation_flow */ "aJH2");
/* harmony import */ var _screen_validation_flow_screen_validation_flow_module__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./screen_validation_flow/screen_validation_flow_module */ "1bMm");
/* harmony import */ var _screen_validation_flow_validation_info__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./screen_validation_flow/validation_info */ "yhUx");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./services/backend_manager_service */ "Kd50");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./services/control_message_service */ "Etwr");
/* harmony import */ var _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./services/devices_manager_service */ "Ojqq");
/* harmony import */ var _services_log_service__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./services/log_service */ "jlbu");
/* harmony import */ var _services_minicap_service__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./services/minicap_service */ "gztY");
/* harmony import */ var _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./services/test_case_manager_service */ "pEJ0");
/* harmony import */ var _test_explorer_test_explorer_module__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./test_explorer/test_explorer_module */ "1yFU");
/* harmony import */ var _ui_tree_viewer_ui_tree_viewer_module__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./ui_tree_viewer/ui_tree_viewer_module */ "GDeZ");
/* harmony import */ var _workflow_editor_workflow_editor_module__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./workflow_editor/workflow_editor_module */ "a0bj");
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

// taze: Hammer, hammerjs from //third_party/javascript/typings/hammerjs:hammerjs






















































/** Uicd Cumstomized hammer config, to make the swipe smooth. */
var UicdHammerConfig = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(UicdHammerConfig, _super);
    function UicdHammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = {
            // override hammerjs default configuration
            'pan': { threshold: 5 },
        };
        return _this;
    }
    UicdHammerConfig = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
    ], UicdHammerConfig);
    return UicdHammerConfig;
}(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__["HammerGestureConfig"]));

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_app__WEBPACK_IMPORTED_MODULE_33__["AppComponent"]],
            imports: [
                _advanced_actions_dialog_advanced_actions_dialog_module__WEBPACK_IMPORTED_MODULE_30__["AdvancedActionsDialogModule"],
                angular_split__WEBPACK_IMPORTED_MODULE_28__["AngularSplitModule"].forRoot(),
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_27__["BrowserAnimationsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
                _device_manager_device_manager_module__WEBPACK_IMPORTED_MODULE_34__["DeviceManagerModule"],
                _popup_dialogs_dialogs_module__WEBPACK_IMPORTED_MODULE_37__["DialogsModule"],
                _log_panel_log_panel_module__WEBPACK_IMPORTED_MODULE_35__["LogPanelModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__["MatCheckboxModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__["MatChipsModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__["MatDialogModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_10__["MatGridListModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_13__["MatListModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__["MatMenuModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_8__["MatOptionModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_15__["MatProgressBarModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_16__["MatProgressSpinnerModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__["MatRadioModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_18__["MatSelectModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_19__["MatSidenavModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_20__["MatSnackBarModule"],
                _angular_material_stepper__WEBPACK_IMPORTED_MODULE_21__["MatStepperModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_22__["MatTableModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_23__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_24__["MatToolbarModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_25__["MatTooltipModule"],
                _screen_cast_screen_cast_module__WEBPACK_IMPORTED_MODULE_42__["ScreenCastModule"],
                _screen_validation_flow_screen_validation_flow_module__WEBPACK_IMPORTED_MODULE_44__["ScreenValidationFlowModule"],
                _ui_tree_viewer_ui_tree_viewer_module__WEBPACK_IMPORTED_MODULE_53__["UiTreeViewerModule"],
                _test_explorer_test_explorer_module__WEBPACK_IMPORTED_MODULE_52__["TestExplorerModule"],
                _workflow_editor_workflow_editor_module__WEBPACK_IMPORTED_MODULE_54__["WorkflowEditorModule"],
            ],
            providers: [
                { provide: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__["HAMMER_GESTURE_CONFIG"], useClass: UicdHammerConfig },
                _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_46__["BackendManagerService"],
                _services_control_message_service__WEBPACK_IMPORTED_MODULE_47__["ControlMessageService"],
                _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_48__["DevicesManagerService"],
                _services_log_service__WEBPACK_IMPORTED_MODULE_49__["LogService"],
                _services_minicap_service__WEBPACK_IMPORTED_MODULE_50__["MinicapService"],
                _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_51__["TestCaseManagerService"],
            ],
            bootstrap: [_app__WEBPACK_IMPORTED_MODULE_33__["AppComponent"]],
            entryComponents: [
                _popup_dialogs_choose_device_dialog__WEBPACK_IMPORTED_MODULE_36__["ChooseDeviceDialogComponent"],
                _screen_validation_flow_screen_validation_flow__WEBPACK_IMPORTED_MODULE_43__["ScreenValidationFlowComponent"],
                _screen_validation_flow_validation_info__WEBPACK_IMPORTED_MODULE_45__["ValidationInfoDialogComponent"],
                _advanced_actions_dialog_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_29__["AdvancedActionDialogComponent"],
                _popup_dialogs_replay_details_dialog__WEBPACK_IMPORTED_MODULE_41__["ReplayDetailsDialog"],
                _advanced_actions_dialog_snippet_action_info_dialog__WEBPACK_IMPORTED_MODULE_32__["SnippetActionInfoDialogComponent"],
                _advanced_actions_dialog_script_action_info_dialog__WEBPACK_IMPORTED_MODULE_31__["ScriptActionInfoDialogComponent"],
                _popup_dialogs_history_dialog__WEBPACK_IMPORTED_MODULE_39__["HistoryDialog"],
                _popup_dialogs_global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_38__["GlobalVariableSettingDialog"],
                _popup_dialogs_python_debugger_simple_dialog__WEBPACK_IMPORTED_MODULE_40__["PythonDebuggerSimpleDialog"],
            ],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "8NVs":
/*!*************************************************!*\
  !*** ./src/app/test_explorer/import_dialog.css ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.inputField {\n  width: 100% !important;\n}\n\n.tree {\n  margin-top: 20px;\n}\n\n.mat-icon-button {\n  float: right;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltcG9ydF9kaWFsb2cuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsWUFBWTtBQUNkIiwiZmlsZSI6ImltcG9ydF9kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5pbnB1dEZpZWxkIHtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLnRyZWUge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG4ubWF0LWljb24tYnV0dG9uIHtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuIl19 */");

/***/ }),

/***/ "95hE":
/*!************************************************************!*\
  !*** ./src/app/popup_dialogs/global_var_setting_dialog.ts ***!
  \************************************************************/
/*! exports provided: GlobalVariableSettingDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalVariableSettingDialog", function() { return GlobalVariableSettingDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_global_var_setting_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./global_var_setting_dialog.ng.html */ "AsDy");
/* harmony import */ var _global_var_setting_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global_var_setting_dialog.css */ "qEeO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
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







/** Dialog allows user to override the backend global variables */
var GlobalVariableSettingDialog = /** @class */ (function () {
    function GlobalVariableSettingDialog(backendManagerService) {
        this.backendManagerService = backendManagerService;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_4__["ReplaySubject"](1);
        this.globalVariableStr = '';
    }
    GlobalVariableSettingDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.backendManagerService.getUserPresetGlobalVariable()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            if (data) {
                _this.globalVariableStr = data.globalVariableStr;
            }
        });
    };
    GlobalVariableSettingDialog.prototype.setGlobalVariable = function () {
        this.backendManagerService
            .setUserPresetGlobalVariable(this.globalVariableStr)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe(function () { });
    };
    GlobalVariableSettingDialog.prototype.ngOnDestroy = function () {
        this.destroyed.next();
    };
    GlobalVariableSettingDialog.ctorParameters = function () { return [
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_6__["BackendManagerService"] }
    ]; };
    GlobalVariableSettingDialog = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'global-var-setting-dialog',
            template: _raw_loader_global_var_setting_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_global_var_setting_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_services_backend_manager_service__WEBPACK_IMPORTED_MODULE_6__["BackendManagerService"]])
    ], GlobalVariableSettingDialog);
    return GlobalVariableSettingDialog;
}());



/***/ }),

/***/ "9hij":
/*!****************************************************!*\
  !*** ./src/app/ui_tree_viewer/copy_xml_dialog.css ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.xmlData {\n    margin-top: 25px;\n    padding: 5px;\n    border: 1px dashed black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcHlfeG1sX2RpYWxvZy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7SUFDSSxnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLHdCQUF3QjtBQUM1QiIsImZpbGUiOiJjb3B5X3htbF9kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi54bWxEYXRhIHtcbiAgICBtYXJnaW4tdG9wOiAyNXB4O1xuICAgIHBhZGRpbmc6IDVweDtcbiAgICBib3JkZXI6IDFweCBkYXNoZWQgYmxhY2s7XG59Il19 */");

/***/ }),

/***/ "AFFR":
/*!************************************************!*\
  !*** ./src/app/test_explorer/import_dialog.ts ***!
  \************************************************/
/*! exports provided: ImportDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportDialog", function() { return ImportDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_import_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./import_dialog.ng.html */ "ukZn");
/* harmony import */ var _import_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./import_dialog.css */ "8NVs");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _constants_jstree__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/jstree */ "alCr");
/* harmony import */ var _popup_dialogs_hard_soft_import_action_info_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../popup_dialogs/hard_soft_import_action_info_dialog */ "I6yJ");
/* harmony import */ var _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/test_case_manager_service */ "pEJ0");
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



// taze: $, JQuery from //third_party/javascript/typings/jquery:jquery_without_externs
// taze: jstree from //third_party/javascript/typings/jstree:jstree









/**
 * Dialog for importing test cases by username or uuid from backend into
 * current users workspace.
 */
var ImportDialog = /** @class */ (function () {
    function ImportDialog(dialog, dialogRef, testCaseManagerService, snackBar, ngZone) {
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.testCaseManagerService = testCaseManagerService;
        this.snackBar = snackBar;
        this.ngZone = ngZone;
        this.uuidImportText = '';
        this.IMPORT_COPY_TYPES = _constants_constants__WEBPACK_IMPORTED_MODULE_8__["IMPORT_COPY_TYPES"];
        this.IMPORT_UUID = 'From uuid';
        this.IMPORT_GOOGLE3 = 'From google3';
        this.importTypes = [this.IMPORT_UUID, this.IMPORT_GOOGLE3];
        this.selectedUserImportType = '';
        this.selectedImportType = '';
        this.citcClient = '';
        this.filePath = '';
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_6__["ReplaySubject"](1);
    }
    ImportDialog.prototype.ngOnInit = function () {
    };
    ImportDialog.prototype.importTest = function () {
        if (this.selectedImportType === this.IMPORT_UUID) {
            this.importTestByUUID();
        }
        else {
            this.importTestFromGoogle3();
        }
    };
    ImportDialog.prototype.importTestByUUID = function () {
        var _this = this;
        if (this.uuidImportText !== '') {
            this.testCaseManagerService
                .importTestCaseByActionId(this.uuidImportText, this.selectedUserImportType)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["catchError"])(function (error) {
                _this.snackBar.open("Test case doesn't exist", 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(null);
            }))
                .subscribe(function (metadata) {
                if (metadata && metadata.actionId) {
                    var copy = new _constants_jstree__WEBPACK_IMPORTED_MODULE_9__["JsTreeNode"](metadata.name, metadata.actionId, false);
                    copy.additionalData = [metadata.actionId];
                    _this.dialogRef.close([copy]);
                }
                else {
                    _this.snackBar.open("You do not have permission; You can make a Hard Copy Instead", 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
                }
            });
        }
    };
    ImportDialog.prototype.importTestFromGoogle3 = function () {
        var _this = this;
        if (this.citcClient !== '' && this.filePath !== '') {
            this.testCaseManagerService
                .importTestCaseFromGoogle3(this.citcClient, this.filePath)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["catchError"])(function (error) {
                _this.snackBar.open("Make sure that prodaccess is present and the path exists", 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(null);
            }))
                .subscribe(function (metadata) {
                if (metadata && metadata.actionId) {
                    var copy = new _constants_jstree__WEBPACK_IMPORTED_MODULE_9__["JsTreeNode"](metadata.name, metadata.actionId, false);
                    copy.additionalData = [metadata.actionId];
                    _this.dialogRef.close([copy]);
                }
                else {
                    _this.snackBar.open("Imported Test Case Successfully", 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
                    _this.dialogRef.close([]);
                }
            });
        }
    };
    ImportDialog.prototype.openActionInfoDialog = function () {
        var _this = this;
        this.ngZone.run(function () {
            _this.dialog.open(_popup_dialogs_hard_soft_import_action_info_dialog__WEBPACK_IMPORTED_MODULE_10__["HardAndSoftInfoDialogComponent"], {
                width: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
            });
        });
    };
    ImportDialog.prototype.ngOnDestroy = function () {
        // Unsubscribe all pending subscriptions.
        this.destroyed.next();
    };
    ImportDialog.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_11__["TestCaseManagerService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] }
    ]; };
    ImportDialog = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-import-dialog',
            template: _raw_loader_import_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_import_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"],
            _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_11__["TestCaseManagerService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"], _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"]])
    ], ImportDialog);
    return ImportDialog;
}());



/***/ }),

/***/ "AUgs":
/*!***********************************************!*\
  !*** ./src/app/log_panel/log_panel_module.ts ***!
  \***********************************************/
/*! exports provided: LogPanelModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogPanelModule", function() { return LogPanelModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _log_panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./log_panel */ "q7NG");
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






var LogPanelModule = /** @class */ (function () {
    function LogPanelModule() {
    }
    LogPanelModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _log_panel__WEBPACK_IMPORTED_MODULE_5__["LogPanelComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            ],
            exports: [
                _log_panel__WEBPACK_IMPORTED_MODULE_5__["LogPanelComponent"],
            ],
        })
    ], LogPanelModule);
    return LogPanelModule;
}());



/***/ }),

/***/ "AsDy":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/popup_dialogs/global_var_setting_dialog.ng.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h3 mat-dialog-title>Global variable setting dialog</h3>\n\n<div mat-dialog-content>\n  <div class=\"global-var-info\">\n    <span>Set up the Global variable. One for each line Example:</span>\n    <span class='variable-example-text'>$uicd_var1=ab,$uicd_foo=bar</span>\n  </div>\n\n  <mat-form-field class=\"global-var-input\">\n    <textarea matInput placeholder=\"Global Variable Settings\" [(ngModel)]=\"globalVariableStr\" rows=\"10\"\n      cols=\"100\"></textarea>\n  </mat-form-field>\n\n  <div>\n    <button mat-raised-button mat-dialog-close class='save-btn' (click)=\"setGlobalVariable()\">Save</button>\n    <button mat-raised-button mat-dialog-close>Cancel</button>\n  </div>\n\n</div>\n");

/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
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
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/**
 * environment setting
 */
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`,
 * `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a
 * negative impact on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "BGdh":
/*!***************************************************!*\
  !*** ./src/app/screen_cast/screen_cast_module.ts ***!
  \***************************************************/
/*! exports provided: ScreenCastModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenCastModule", function() { return ScreenCastModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _screen_cast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./screen_cast */ "FliP");
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










var ScreenCastModule = /** @class */ (function () {
    function ScreenCastModule() {
    }
    ScreenCastModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _screen_cast__WEBPACK_IMPORTED_MODULE_9__["ScreenCastComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__["MatTooltipModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_5__["MatProgressSpinnerModule"],
            ],
            exports: [
                _screen_cast__WEBPACK_IMPORTED_MODULE_9__["ScreenCastComponent"],
            ],
        })
    ], ScreenCastModule);
    return ScreenCastModule;
}());



/***/ }),

/***/ "BtrL":
/*!*****************************************************!*\
  !*** ./src/app/test_explorer/action_edit_dialog.ts ***!
  \*****************************************************/
/*! exports provided: ActionEditDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionEditDialog", function() { return ActionEditDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_action_edit_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./action_edit_dialog.ng.html */ "a135");
/* harmony import */ var _action_edit_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action_edit_dialog.css */ "YJV/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _advanced_actions_dialog_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../advanced_actions_dialog/advanced_actions_dialog */ "+MME");
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/actions */ "QWWV");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _constants_jstree__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../constants/jstree */ "alCr");
/* harmony import */ var _popup_dialogs_python_debugger_simple_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../popup_dialogs/python_debugger_simple_dialog */ "Ps2F");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../services/control_message_service */ "Etwr");
/* harmony import */ var _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../services/test_case_manager_service */ "pEJ0");
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
















/**
 * ActionEditDialog is a dialog that can be used to create new actions or edit
 * current actions.
 */
var ActionEditDialog = /** @class */ (function () {
    function ActionEditDialog(dialogRef, dialog, backendManagerService, testCaseManagerService, controlMessageService, snackBar, data) {
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.backendManagerService = backendManagerService;
        this.testCaseManagerService = testCaseManagerService;
        this.controlMessageService = controlMessageService;
        this.snackBar = snackBar;
        this.data = data;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_6__["ReplaySubject"](1);
        this.actionData = {
            type: 'no_type',
            name: 'empty_action',
        };
        this.folderList = [];
        this.saveToFolderId = '';
        this.isNewWorkflow = false;
        this.showEditDetails = false;
    }
    ActionEditDialog_1 = ActionEditDialog;
    ActionEditDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.backendManagerService.getActionDetails(this.data.uuid)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.actionData = data;
            if (_this.actionData.name == null ||
                _this.actionData.name.includes(_constants_constants__WEBPACK_IMPORTED_MODULE_10__["DEFAULT_WORKFLOW_NAME"])) {
                _this.isNewWorkflow = true;
                _this.actionData.name = '';
            }
            if (_this.data.isCopyAction) {
                _this.isNewWorkflow = true;
            }
            _this.showEditDetails = _this.hasEditDetails();
        });
        this.backendManagerService.getCurrentUser()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.currentUser = data.name;
        });
        this.testCaseManagerService.getTestCasesList()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            // `unknown`.
            // tslint:disable:no-any no-unnecessary-type-assertion
            var root = JSON.parse(data.treeDetails);
            // tslint:enable:no-any no-unnecessary-type-assertion
            _this.folderList = retrieveFolders(root);
            if (_this.folderList.length > 0) {
                _this.saveToFolderId =
                    _this.folderList[_this.folderList.length - 1].id;
            }
        });
        this.backendManagerService.getPlayMode()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.playMode = data;
        });
    };
    ActionEditDialog.prototype.hasEditDetails = function () {
        if (!this.actionData.actionType) {
            return false;
        }
        if (this.actionData.actionType === _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].CLICK_ACTION.actionType) {
            return this.actionData.isByElement === true;
        }
        return ActionEditDialog_1.ADVANCED_ACTIONS.includes(this.actionData.actionType);
    };
    ActionEditDialog.prototype.isCompoundAction = function () {
        return this.actionData.actionType === _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].COMPOUND_ACTION.actionType;
    };
    ActionEditDialog.prototype.isClickAction = function () {
        return this.actionData.actionType === _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].CLICK_ACTION.actionType;
    };
    ActionEditDialog.prototype.isImageDiffValidationAction = function () {
        return this.actionData.actionType ===
            _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.actionType;
    };
    ActionEditDialog.prototype.isMLImageValidation = function () {
        return this.actionData.actionType ===
            _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.actionType;
    };
    ActionEditDialog.prototype.isMultiPlayMode = function () {
        return this.playMode === 'MULTIDEVICE';
    };
    ActionEditDialog.prototype.editAction = function () {
        var _this = this;
        var detailDialogRef;
        if (this.actionData.actionType ===
            _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].PYTHON_SCRIPT_ACTION.actionType) {
            detailDialogRef = this.dialog.open(_popup_dialogs_python_debugger_simple_dialog__WEBPACK_IMPORTED_MODULE_12__["PythonDebuggerSimpleDialog"], { panelClass: 'python-overlay-style', data: this.actionData });
        }
        else {
            detailDialogRef = this.dialog.open(_advanced_actions_dialog_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_8__["AdvancedActionDialogComponent"], { width: _constants_constants__WEBPACK_IMPORTED_MODULE_10__["POPUP_DIALOG_DEFAULT_DIMENSION"].width, data: this.actionData });
        }
        detailDialogRef.afterClosed().subscribe(function (isSaved) {
            if (isSaved) {
                _this.closeDialog();
            }
        });
    };
    ActionEditDialog.prototype.cancelDialog = function () {
        this.dialogRef.close();
    };
    ActionEditDialog.prototype.deleteAction = function () {
        var _this = this;
        if (!confirm('Are you sure you wish to delete this?')) {
            return;
        }
        if (this.isImageDiffValidationAction()) {
            var imageDiffActionDetails = this.actionData;
            this.backendManagerService
                .deleteImage(imageDiffActionDetails.refImageUuid)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
                .subscribe();
        }
        this.backendManagerService.removeAction(this.data.index)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.controlMessageService.sendRefreshWorkflowMsg();
            _this.dialogRef.close({ deleted: true });
        });
    };
    ActionEditDialog.prototype.playAction = function () {
        var _this = this;
        var playActionRequest = {
            actionId: this.data.uuid,
            playSpeedFactor: 1,
        };
        this.backendManagerService.playAction(playActionRequest)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.dialogRef.close();
        });
    };
    ActionEditDialog.prototype.playWorkflowFromCurrentAction = function () {
        this.dialogRef.close({ playWorkflowRequested: true });
    };
    ActionEditDialog.prototype.saveAction = function () {
        var _this = this;
        if (!this.actionData.name) {
            this.snackBar.open('The action name can\'t be empty', 'OK', { duration: ActionEditDialog_1.SNACKBAR_DURATION_MS });
            return;
        }
        if (this.data.isSaveWorkflow && !this.data.isMoveAction &&
            !this.data.isCopyAction) {
            this.backendManagerService.saveCurrentWorkflow(this.actionData)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
                .subscribe(function () {
                var node = new _constants_jstree__WEBPACK_IMPORTED_MODULE_11__["JsTreeNode"](_this.actionData.name, _this.data.uuid, false);
                node.additionalData = [_this.data.uuid];
                var newNode = { parentId: _this.saveToFolderId, node: node };
                _this.controlMessageService.sendMessage({
                    messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_10__["MessageTypes"].ADD_NODE_TO_TREE,
                    extra: JSON.stringify(newNode)
                });
                _this.closeDialog();
            });
        }
        else {
            this.backendManagerService.updateActionMetadata(this.actionData)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
                .subscribe(function () {
                _this.closeDialog();
            });
        }
    };
    ActionEditDialog.prototype.closeDialog = function () {
        this.dialogRef.close({
            parentId: this.saveToFolderId,
            name: this.actionData.name,
            actionId: this.actionData.actionId,
            metadata: this.actionData,
        });
    };
    ActionEditDialog.prototype.ngOnDestroy = function () {
        // Unsubscribe all pending subscriptions.
        this.destroyed.next();
    };
    var ActionEditDialog_1;
    ActionEditDialog.SNACKBAR_DURATION_MS = 2000;
    ActionEditDialog.ADVANCED_ACTIONS = [
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].COMMAND_LINE_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].CLICK_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].INPUT_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].REBOOT_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].SNIPPET_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].SCRIPT_EXECUTION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].LOGCAT_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].CONDITION_CLICK_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].CONDITION_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].PYTHON_SCRIPT_ACTION.actionType,
    ];
    ActionEditDialog.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_13__["BackendManagerService"] },
        { type: _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_15__["TestCaseManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_14__["ControlMessageService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
    ]; };
    ActionEditDialog = ActionEditDialog_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'action-edit-dialog',
            template: _raw_loader_action_edit_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_action_edit_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_13__["BackendManagerService"],
            _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_15__["TestCaseManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_14__["ControlMessageService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"], Object])
    ], ActionEditDialog);
    return ActionEditDialog;
}());

function retrieveFolders(node) {
    var folders = [];
    if (node.children && node.children.length > 0) {
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
            var n = _a[_i];
            folders = folders.concat(retrieveFolders(n));
        }
    }
    if (node.id !== '#' && !node.hasOwnProperty('additionalData')) {
        // only add the folder, use unshift to make the order similar to the order
        // on the tree
        folders.unshift({ id: node.id, value: node.value });
    }
    return folders;
}


/***/ }),

/***/ "Etwr":
/*!*****************************************************!*\
  !*** ./src/app/services/control_message_service.ts ***!
  \*****************************************************/
/*! exports provided: ControlMessageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlMessageService", function() { return ControlMessageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
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




/**
 * ControlMessageService, use this service to make communication between
 * frontend component.
 */
var ControlMessageService = /** @class */ (function () {
    function ControlMessageService() {
        this.controlMessageSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
    }
    /** Get subject of control message. */
    ControlMessageService.prototype.getControlMessageSubject = function () {
        return this.controlMessageSubject;
    };
    ControlMessageService.prototype.sendMessage = function (controlMessage) {
        this.controlMessageSubject.next(controlMessage);
    };
    ControlMessageService.prototype.sendRefreshWorkflowMsg = function () {
        this.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_3__["MessageTypes"].REFRESH_WORKFLOW, extra: '' });
    };
    ControlMessageService.prototype.sendShowOverlayMsg = function () {
        this.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_3__["MessageTypes"].REFRESH_OVERLAY, extra: 'show' });
    };
    ControlMessageService.prototype.sendHideOverlayMsg = function () {
        this.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_3__["MessageTypes"].REFRESH_OVERLAY, extra: 'hide' });
    };
    ControlMessageService.prototype.sendRefreshTestCaseTreeMsg = function () {
        this.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_3__["MessageTypes"].REFRESH_TEST_CASE_TREE, extra: '' });
    };
    ControlMessageService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], ControlMessageService);
    return ControlMessageService;
}());



/***/ }),

/***/ "FC0R":
/*!*************************************************!*\
  !*** ./src/app/popup_dialogs/history_dialog.ts ***!
  \*************************************************/
/*! exports provided: HistoryDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryDialog", function() { return HistoryDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_history_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./history_dialog.ng.html */ "mxkP");
/* harmony import */ var _history_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./history_dialog.css */ "vFh4");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/test_case_manager_service */ "pEJ0");
/* harmony import */ var _replay_details_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./replay_details_dialog */ "XN9M");
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










/** Testcase execution history results and details. */
var HistoryDialog = /** @class */ (function () {
    function HistoryDialog(dialog, testCaseManagerService) {
        this.dialog = dialog;
        this.testCaseManagerService = testCaseManagerService;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
        this.dataSource = [];
        this.displayedColumns = [
            'details', 'executionId', 'testUuid', 'name', 'result', 'runDate', 'author'
        ];
    }
    HistoryDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.testCaseManagerService.fetchTestHistory()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.dataSource = data.testHistoryEntities;
        });
    };
    HistoryDialog.prototype.showDetails = function (details) {
        // tslint:disable:no-any no-unnecessary-type-assertion
        var data = JSON.parse(details);
        // tslint:enable:no-any no-unnecessary-type-assertion
        this.dialog.open(_replay_details_dialog__WEBPACK_IMPORTED_MODULE_9__["ReplayDetailsDialog"], { width: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["POPUP_DIALOG_DEFAULT_DIMENSION"].width, data: data });
    };
    HistoryDialog.prototype.formatDate = function (inputDate) {
        return new Date(inputDate);
    };
    HistoryDialog.prototype.ngOnDestroy = function () {
        this.destroyed.next();
    };
    HistoryDialog.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_8__["TestCaseManagerService"] }
    ]; };
    HistoryDialog = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'history-dialog',
            template: _raw_loader_history_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_history_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_8__["TestCaseManagerService"]])
    ], HistoryDialog);
    return HistoryDialog;
}());



/***/ }),

/***/ "FliP":
/*!********************************************!*\
  !*** ./src/app/screen_cast/screen_cast.ts ***!
  \********************************************/
/*! exports provided: ScreenCastComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenCastComponent", function() { return ScreenCastComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_screen_cast_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./screen_cast.ng.html */ "3gOg");
/* harmony import */ var _screen_cast_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./screen_cast.css */ "dmfx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/rect */ "aFBn");
/* harmony import */ var _screen_validation_flow_screen_validation_flow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../screen_validation_flow/screen_validation_flow */ "aJH2");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../services/control_message_service */ "Etwr");
/* harmony import */ var _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../services/devices_manager_service */ "Ojqq");
/* harmony import */ var _services_log_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../services/log_service */ "jlbu");
/* harmony import */ var _services_minicap_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../services/minicap_service */ "gztY");
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
















/**
 * The component for streaming the device's screen to frontend.
 */
var ScreenCastComponent = /** @class */ (function () {
    function ScreenCastComponent(dialog, minicapService, snackBar, backendManagerService, controlMessageService, devicesManagerService, logService) {
        var _this = this;
        this.dialog = dialog;
        this.minicapService = minicapService;
        this.snackBar = snackBar;
        this.backendManagerService = backendManagerService;
        this.controlMessageService = controlMessageService;
        this.devicesManagerService = devicesManagerService;
        this.logService = logService;
        this.currentStream = null;
        this.canvasWidth = 360;
        this.canvasHeight = 640;
        this.rotated = false;
        this.canvasWrapperCss = 'canvas-wrapper';
        this.canvasPhoneCss = 'phone-canvas-widget';
        this.inspectMode = false;
        this.loading = false;
        this.swipeDirection = _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SwipeDirection"];
        this.rotateDirection = _constants_constants__WEBPACK_IMPORTED_MODULE_8__["RotateDirection"];
        this.currentRotateDirection = _constants_constants__WEBPACK_IMPORTED_MODULE_8__["RotateDirection"].PORTRAIT;
        this.dragCoordinates = [];
        this.timeOfLastPan = 0;
        this.PAN_THRESHOLD_MS = 500;
        this.PAN_DISTANCE_THRESHOLD = 80;
        this.inDragMode = false;
        /** Handle on-destroy Subject, used to unsubscribe. */
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_6__["ReplaySubject"](1);
        this.logService.getMessages()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            var dInfo = _this.devicesManagerService.getCurrentDevice();
            // Small hack here to tell the reboot is ready, need match
            // the backend string in the log.
            if (data.text.includes('Reboot Done. DeviceId') && dInfo) {
                _this.initFEMiniCap(dInfo.minicapPort);
            }
        });
    }
    ScreenCastComponent.prototype.clearOverlayCanvas = function (ctx) {
        if (this.currentRotateDirection === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["RotateDirection"].LANDSCAPE) {
            ctx.canvas.width = this.canvasHeight;
            ctx.canvas.height = this.canvasWidth;
        }
        else {
            ctx.canvas.width = this.canvasWidth;
            ctx.canvas.height = this.canvasHeight;
        }
    };
    ScreenCastComponent.prototype.getScreenCanvasCtx = function () {
        return this.phoneScreen.nativeElement.getContext('2d');
    };
    ScreenCastComponent.prototype.getOverlayHoveredCanvasCtx = function () {
        return this.overlayHovered.nativeElement.getContext('2d');
    };
    ScreenCastComponent.prototype.getOverlaySelectedCanvasCtx = function () {
        return this.overlaySelected.nativeElement.getContext('2d');
    };
    ScreenCastComponent.prototype.highlightScreenElement = function (coordinates, color, ctx) {
        this.clearOverlayCanvas(ctx);
        var oriRect = _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"].createFromCoordinatesStr(coordinates);
        var srcRect = this.devicesManagerService.getDevicePhysicalScreenSize();
        var targetRect = new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"](0, 0, this.canvasWidth, this.canvasHeight);
        if (this.currentRotateDirection === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["RotateDirection"].LANDSCAPE) {
            targetRect = new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"](0, 0, this.canvasHeight, this.canvasWidth);
            if (srcRect.width < srcRect.height) {
                srcRect = new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"](0, 0, srcRect.height, srcRect.width);
            }
        }
        var rectToDraw = oriRect.scaleToTargetSurface(srcRect, targetRect);
        ctx.rect(rectToDraw.x, rectToDraw.y, rectToDraw.width, rectToDraw.height);
        ctx.fillStyle = color;
        ctx.fill();
    };
    ScreenCastComponent.prototype.highlightOCRElement = function (boundsList, color, ctx) {
        this.clearOverlayCanvas(ctx);
        for (var _i = 0, boundsList_1 = boundsList; _i < boundsList_1.length; _i++) {
            var bounds = boundsList_1[_i];
            var oriRect = _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"].createFromBoundsStr(bounds);
            var srcRect = this.devicesManagerService.getDevicePhysicalScreenSize();
            var targetRect = new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"](0, 0, this.canvasWidth, this.canvasHeight);
            if (this.currentRotateDirection === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["RotateDirection"].LANDSCAPE) {
                targetRect = new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"](0, 0, this.canvasHeight, this.canvasWidth);
                if (srcRect.width < srcRect.height) {
                    srcRect = new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"](0, 0, srcRect.height, srcRect.width);
                }
            }
            var rectToDraw = oriRect.scaleToTargetSurface(srcRect, targetRect);
            ctx.rect(rectToDraw.x, rectToDraw.y, rectToDraw.width, rectToDraw.height);
        }
        ctx.strokeStyle = color;
        ctx.stroke();
    };
    ScreenCastComponent.prototype.initFEMiniCap = function (port) {
        var _this = this;
        // For unit test in the main page, screen cast does not contains native
        // elements, need do a check here
        if (!this.phoneScreen) {
            return;
        }
        var g = this.getScreenCanvasCtx();
        var URL = window.URL;
        var img = new Image();
        var objUrl = '';
        img.onload = function () {
            _this.canvasWidth = img.width;
            _this.canvasHeight = img.height;
            if (g != null) {
                g.drawImage(img, 0, 0);
            }
            // need revokeObjectURL, otherwise will be memory leak.
            URL.revokeObjectURL(objUrl);
            // assign all to null or empty object to avoid memory leak.
        };
        if (this.currentStream) {
            this.currentStream.unsubscribe();
        }
        this.currentStream = this.minicapService.connect(port)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function (output) {
            var blob = new Blob([output], { type: 'image/jpeg' });
            // Old code: objUrl = URL.createObjectURL(blob).
            // Error message from iblaze:
            // TS21228: [tsetse] Do not call
            // URL.createObjectURL, as this can
            // lead to XSS due to content sniffing.
            objUrl = URL.createObjectURL(blob);
            img.src = objUrl;
            objUrl = '';
            blob = {};
        });
        this.controlMessageService.sendHideOverlayMsg();
    };
    /**
     * Send message to subscribers via observable subject workflow component
     * listens for messages to know when to refresh the workflow
     */
    ScreenCastComponent.prototype.sendRefreshWorkflowMsg = function () {
        this.controlMessageService.sendRefreshWorkflowMsg();
    };
    ScreenCastComponent.prototype.sendRefreshXmlMsg = function () {
        this.controlMessageService.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].REFRESH_XML, extra: 'from screen cast' });
    };
    /** Checks whether user press control key */
    ScreenCastComponent.prototype.isControlPressed = function (event) {
        if (window.navigator.userAgent.indexOf('Mac') !== -1) {
            if (event.metaKey) {
                return true;
            }
        }
        else if (event.ctrlKey) {
            return true;
        }
        return false;
    };
    ScreenCastComponent.prototype.selectRectArea = function (selectedRect, isFinal) {
        var _this = this;
        if (isFinal) {
            var ctx = this.getOverlayHoveredCanvasCtx();
            this.clearOverlayCanvas(ctx);
            var dialogRef = this.dialog.open(_screen_validation_flow_screen_validation_flow__WEBPACK_IMPORTED_MODULE_10__["ScreenValidationFlowComponent"], { data: { bounds: selectedRect.toBounds() }, width: '1000px' });
            dialogRef.afterClosed().subscribe(function () {
                _this.sendRefreshWorkflowMsg();
            });
            return;
        }
        this.strokeHoveredCanvas(selectedRect);
    };
    ScreenCastComponent.prototype.updateDragCoordinates = function (endPoint) {
        if (this.dragCoordinates.length === 0) {
            this.dragCoordinates.push(endPoint);
            return;
        }
        var currentTime = new Date().getTime();
        if (currentTime - this.timeOfLastPan > this.PAN_THRESHOLD_MS) {
            // Update the timestamp
            this.timeOfLastPan = currentTime;
            this.dragCoordinates.push(endPoint);
            return;
        }
        if (this.dragCoordinates.length > 0) {
            var lastPoint = this.dragCoordinates[this.dragCoordinates.length - 1];
            if (endPoint.getDistance(lastPoint) > this.PAN_DISTANCE_THRESHOLD) {
                this.dragCoordinates.push(endPoint);
                return;
            }
        }
        // In a single drag action, frontend will emit multiple pan events, need
        // manually merge those events, otherwise during the replay it will be too
        // slow.
        this.dragCoordinates[this.dragCoordinates.length - 1] = endPoint;
    };
    ScreenCastComponent.prototype.performDrag = function (endPoint, isFinal) {
        var _this = this;
        var ctx = this.getOverlayHoveredCanvasCtx();
        this.updateDragCoordinates(endPoint);
        if (isFinal) {
            this.inDragMode = false;
            this.backendManagerService.dragStop(endPoint.x, endPoint.y)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
                .subscribe(function () { });
            this.backendManagerService.addDragAction(this.dragCoordinates)
                .subscribe(function () {
                _this.dragCoordinates = [];
                _this.sendRefreshWorkflowMsg();
                _this.sendRefreshXmlMsg();
                _this.clearOverlayCanvas(ctx);
            });
            return;
        }
        ctx.strokeStyle = 'red';
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
        this.backendManagerService.dragMove(endPoint.x, endPoint.y)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function () { });
    };
    ScreenCastComponent.prototype.pan = function (event) {
        var _this = this;
        if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
            return;
        }
        var startPoint = new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Point"](event.srcEvent.offsetX - event.deltaX, event.srcEvent.offsetY - event.deltaY);
        if (this.isControlPressed(event.srcEvent)) {
            this.selectRectArea(new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"](startPoint.x, startPoint.y, event.deltaX, event.deltaY), event.isFinal);
        }
        else {
            if (this.inDragMode) {
                this.performDrag(new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Point"](event.srcEvent.offsetX, event.srcEvent.offsetY), event.isFinal);
            }
            else if (event.isFinal) {
                // This is a swipe event.
                var endPoint = new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Point"](event.srcEvent.offsetX, event.srcEvent.offsetY);
                this.drawLineOnHoveredCanvas(startPoint, endPoint);
                this.backendManagerService
                    .swipe(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
                    .subscribe(function () {
                    _this.sendRefreshWorkflowMsg();
                    _this.sendRefreshXmlMsg();
                });
                // Clear the on screen swipe hint, we could add in the swipe subscribe,
                // but due to the animation the swipe will take more than 500ms to
                // return.
                Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["timer"])(250).subscribe(function () {
                    _this.clearOverlayCanvas(_this.getOverlayHoveredCanvasCtx());
                });
            }
        }
    };
    ScreenCastComponent.prototype.press = function (event) {
        var _this = this;
        if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
            this.snackBar.open('Please connect device or exit the UI Viewer Mode', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
            return;
        }
        var point = new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Point"](event.offsetX, event.offsetY);
        console.log("start press at (" + point.x + ", " + point.y + ")");
        if (!this.isControlPressed(event)) {
            this.inDragMode = true;
            this.timeOfLastPan = new Date().getTime();
            var ctx = this.getOverlayHoveredCanvasCtx();
            // Start to draw the drag path
            ctx.strokeStyle = 'red';
            ctx.moveTo(point.x, point.y);
            this.dragCoordinates.push(point);
            this.backendManagerService.dragStart(point.x, point.y)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
                .subscribe(function () {
                _this.sendRefreshWorkflowMsg();
                _this.sendRefreshXmlMsg();
            });
        }
    };
    ScreenCastComponent.prototype.pressup = function (event) {
        var _this = this;
        // Pressup event is only called when there is a press and
        // it is not followed by any pan events. This means, when
        // this event is fired, user actually performed a long click.
        this.inDragMode = false;
        var point = this.dragCoordinates[0];
        this.dragCoordinates = [];
        this.backendManagerService
            .longClick(point.x, point.y, _constants_constants__WEBPACK_IMPORTED_MODULE_8__["LONGCLICK_DURATION_MS"])
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.sendRefreshWorkflowMsg();
            _this.sendRefreshXmlMsg();
        });
    };
    ScreenCastComponent.prototype.strokeHoveredCanvas = function (rect) {
        var ctx = this.getOverlayHoveredCanvasCtx();
        this.clearOverlayCanvas(ctx);
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    };
    ScreenCastComponent.prototype.drawLineOnHoveredCanvas = function (startPoint, endPoint) {
        var ctx = this.getOverlayHoveredCanvasCtx();
        // Start to draw the drag path
        ctx.lineCap = 'round';
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#28a6da99'; // blue with transparent
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
    };
    ScreenCastComponent.prototype.tap = function (event) {
        var _this = this;
        if (!this.devicesManagerService.getCurrentDevice()) {
            this.snackBar.open('Please connect device', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
            return;
        }
        if (this.inspectMode) {
            // send message to tree component and select that component
            var screenCoordinate = new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"](event.offsetX, event.offsetY, 0, 0);
            var srcRect = new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"](0, 0, this.canvasWidth, this.canvasHeight);
            var targetRect = this.devicesManagerService.getDevicePhysicalScreenSize();
            if (this.currentRotateDirection === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["RotateDirection"].LANDSCAPE) {
                srcRect = new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"](0, 0, this.canvasHeight, this.canvasWidth);
                if (targetRect.width < targetRect.height) {
                    targetRect = new _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"](0, 0, targetRect.height, targetRect.width);
                }
            }
            var deviceCoordinate = screenCoordinate.scaleToTargetSurface(srcRect, targetRect);
            this.controlMessageService.sendMessage({
                messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].INSPECT_CLICKED_NODE,
                extra: JSON.stringify(deviceCoordinate),
            });
        }
        else {
            if (this.isControlPressed(event)) {
                console.log('tap control on');
                return;
            }
            this.backendManagerService.tap(event.offsetX, event.offsetY, true)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
                .subscribe(function () {
                _this.sendRefreshWorkflowMsg();
                _this.sendRefreshXmlMsg();
            });
        }
    };
    ScreenCastComponent.prototype.quickSwipe = function (direction) {
        var _this = this;
        if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
            this.snackBar.open('Please connect device or exit the UI Viewer Mode', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
            return;
        }
        this.backendManagerService.quickSwipe(direction)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.sendRefreshWorkflowMsg();
            _this.sendRefreshXmlMsg();
        });
    };
    ScreenCastComponent.prototype.rotateScreen = function (direction) {
        var _this = this;
        if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
            this.snackBar.open('Please connect device or exit the UI Viewer Mode', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
            return;
        }
        if (direction === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["RotateDirection"].LANDSCAPE) {
            this.canvasPhoneCss = 'phone-canvas-widget-rotated';
            this.canvasWrapperCss = 'canvas-wrapper-rotated';
        }
        else {
            this.canvasPhoneCss = 'phone-canvas-widget';
            this.canvasWrapperCss = 'canvas-wrapper';
        }
        this.currentRotateDirection = direction;
        this.loading = true;
        this.backendManagerService.rotateScreen(direction)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function (returnInfo) {
            console.log(returnInfo);
            _this.loading = false;
            _this.sendRefreshWorkflowMsg();
            _this.sendRefreshXmlMsg();
        });
        this.clearOverlayCanvas(this.getOverlayHoveredCanvasCtx());
        this.clearOverlayCanvas(this.getOverlaySelectedCanvasCtx());
    };
    ScreenCastComponent.prototype.power = function () {
        this.performKeyPressAction(_constants_constants__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].KEYCODE_POWER);
    };
    ScreenCastComponent.prototype.volumeUp = function () {
        this.performKeyPressAction(_constants_constants__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].KEYCODE_VOLUME_UP);
    };
    ScreenCastComponent.prototype.volumeDown = function () {
        this.performKeyPressAction(_constants_constants__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].KEYCODE_VOLUME_DOWN);
    };
    ScreenCastComponent.prototype.back = function () {
        this.performKeyPressAction(_constants_constants__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].KEYCODE_BACK);
    };
    ScreenCastComponent.prototype.home = function () {
        this.performKeyPressAction(_constants_constants__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].KEYCODE_HOME);
    };
    ScreenCastComponent.prototype.overview = function () {
        this.performKeyPressAction(_constants_constants__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].KEYCODE_OVERVIEW);
    };
    ScreenCastComponent.prototype.performKeyPressAction = function (keyCode) {
        var _this = this;
        if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
            return;
        }
        this.backendManagerService.pressKey(keyCode)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.sendRefreshWorkflowMsg();
        });
    };
    ScreenCastComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.devicesManagerService.getCurrentDeviceSubject()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function (d) {
            _this.initFEMiniCap(d.minicapPort);
        });
        this.controlMessageService.getControlMessageSubject()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])(function (msg) {
            return msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].NODE_HOVERED ||
                msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].NODE_SELECTED ||
                msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].CLEAR_CANVAS ||
                msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].SET_INSPECT_MODE ||
                msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].HIGHLIGHT_OCR;
        }))
            .subscribe(function (msg) {
            if (msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].CLEAR_CANVAS) {
                _this.clearOverlayCanvas(_this.getOverlayHoveredCanvasCtx());
                if (msg.extra.toLowerCase() === 'all') {
                    _this.clearOverlayCanvas(_this.getOverlaySelectedCanvasCtx());
                }
            }
            else if (msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].NODE_SELECTED) {
                _this.highlightScreenElement(msg.extra, _constants_constants__WEBPACK_IMPORTED_MODULE_8__["CanvasOverlayColor"].SELECTED, _this.getOverlaySelectedCanvasCtx());
            }
            else if (msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].NODE_HOVERED) {
                _this.highlightScreenElement(msg.extra, _constants_constants__WEBPACK_IMPORTED_MODULE_8__["CanvasOverlayColor"].HOVER, _this.getOverlayHoveredCanvasCtx());
            }
            else if (msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].SET_INSPECT_MODE) {
                _this.inspectMode = msg.extra.toLowerCase() === 'true';
            }
            else if (msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].HIGHLIGHT_OCR) {
                _this.highlightOCRElement(msg.extra.split('|'), _constants_constants__WEBPACK_IMPORTED_MODULE_8__["CanvasOverlayColor"].OCR_SELECT, _this.getOverlaySelectedCanvasCtx());
            }
        });
    };
    ScreenCastComponent.prototype.ngAfterViewInit = function () {
        // see go/strict-prop-init-fix for more details
    };
    ScreenCastComponent.prototype.ngOnDestroy = function () {
        // Unsubscribes all pending subscriptions.
        this.destroyed.next();
    };
    ScreenCastComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _services_minicap_service__WEBPACK_IMPORTED_MODULE_15__["MinicapService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_11__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_12__["ControlMessageService"] },
        { type: _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_13__["DevicesManagerService"] },
        { type: _services_log_service__WEBPACK_IMPORTED_MODULE_14__["LogService"] }
    ]; };
    ScreenCastComponent.propDecorators = {
        phoneScreen: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['phoneScreen', { static: false },] }],
        overlayHovered: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['overlayHovered', { static: false },] }],
        overlaySelected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['overlaySelected', { static: false },] }]
    };
    ScreenCastComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'screen-cast',
            template: _raw_loader_screen_cast_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_screen_cast_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _services_minicap_service__WEBPACK_IMPORTED_MODULE_15__["MinicapService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_11__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_12__["ControlMessageService"],
            _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_13__["DevicesManagerService"],
            _services_log_service__WEBPACK_IMPORTED_MODULE_14__["LogService"]])
    ], ScreenCastComponent);
    return ScreenCastComponent;
}());



/***/ }),

/***/ "G1pY":
/*!**************************************************!*\
  !*** ./src/app/device_manager/device_manager.ts ***!
  \**************************************************/
/*! exports provided: DeviceManager, DeviceRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceManager", function() { return DeviceManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceRow", function() { return DeviceRow; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_device_manager_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./device_manager.ng.html */ "3a6F");
/* harmony import */ var _device_manager_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./device_manager.css */ "1C7L");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
/* harmony import */ var _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/devices_manager_service */ "Ojqq");
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









/**
 * DeviceManager component displays options for execution modes(single, multi
 * device or mirroring) and which devices to use and tv controller component.
 */
var DeviceManager = /** @class */ (function () {
    function DeviceManager(backendManagerService, devicesManagerService) {
        this.backendManagerService = backendManagerService;
        this.devicesManagerService = devicesManagerService;
        this.playModes = [
            { name: 'SINGLE', display: 'Single' },
            { name: 'MULTIDEVICE', display: 'Multi Device' },
            { name: 'PLAYALL', display: 'Play All' },
        ];
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_4__["ReplaySubject"](1);
        this.displayedColumns = ['position', 'device_serial', 'status', 'selected'];
        this.selectedPlayMode = 'SINGLE';
        this.currentDevice =
            this.devicesManagerService.getCurrentDeviceSubject().asObservable();
        this.dataSource =
            this.devicesManagerService.getInitedDevicesSubject()
                .asObservable()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (initedDevices) { return initedDevices.map(function (device, index) { return new DeviceRow(device, index + 1); }); }));
    }
    DeviceManager.prototype.ngOnInit = function () { };
    DeviceManager.prototype.changePlayMode = function (event) {
        this.backendManagerService.setPlayMode(event.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe();
    };
    DeviceManager.prototype.initDevice = function (deviceId) {
        this.backendManagerService.selectedDeviceChanged(deviceId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe();
        this.devicesManagerService.updateCurrentDevice(deviceId);
    };
    DeviceManager.prototype.ngOnDestroy = function () {
        // Unsubscribe all pending subscriptions.
        this.destroyed.next();
    };
    DeviceManager.ctorParameters = function () { return [
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__["BackendManagerService"] },
        { type: _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_8__["DevicesManagerService"] }
    ]; };
    DeviceManager = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-device-manager',
            template: _raw_loader_device_manager_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_device_manager_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__["BackendManagerService"],
            _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_8__["DevicesManagerService"]])
    ], DeviceManager);
    return DeviceManager;
}());

/**
 * DeviceRow interface is used to construct mat-table source in template.
 */
var DeviceRow = /** @class */ (function () {
    function DeviceRow(device, position) {
        this.position = position;
        this.status = _constants_constants__WEBPACK_IMPORTED_MODULE_6__["DeviceStatus"].READY_TO_CONNECT;
        this.deviceSerial = device.deviceId;
    }
    return DeviceRow;
}());



/***/ }),

/***/ "GDeZ":
/*!*********************************************************!*\
  !*** ./src/app/ui_tree_viewer/ui_tree_viewer_module.ts ***!
  \*********************************************************/
/*! exports provided: UiTreeViewerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiTreeViewerModule", function() { return UiTreeViewerModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/slide-toggle */ "1jcm");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _copy_xml_dialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./copy_xml_dialog */ "R9JL");
/* harmony import */ var _ocr_viewer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ocr_viewer */ "t2CA");
/* harmony import */ var _ui_tree_viewer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./ui_tree_viewer */ "q/7+");
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




















var UiTreeViewerModule = /** @class */ (function () {
    function UiTreeViewerModule() {
    }
    UiTreeViewerModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__["BrowserAnimationsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_10__["MatProgressBarModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__["MatProgressSpinnerModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_12__["MatSelectModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_14__["MatSnackBarModule"],
                _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_13__["MatSlideToggleModule"],
            ],
            exports: [_ui_tree_viewer__WEBPACK_IMPORTED_MODULE_19__["UiTreeViewer"], _ocr_viewer__WEBPACK_IMPORTED_MODULE_18__["OCRViewerComponent"]],
            declarations: [_ui_tree_viewer__WEBPACK_IMPORTED_MODULE_19__["UiTreeViewer"], _copy_xml_dialog__WEBPACK_IMPORTED_MODULE_17__["CopyXmlDialog"], _ocr_viewer__WEBPACK_IMPORTED_MODULE_18__["OCRViewerComponent"]],
            entryComponents: [_copy_xml_dialog__WEBPACK_IMPORTED_MODULE_17__["CopyXmlDialog"]]
        })
    ], UiTreeViewerModule);
    return UiTreeViewerModule;
}());



/***/ }),

/***/ "GXBt":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/advanced_actions_dialog/script_action_info_dialog.ng.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n    <h2>Script Configuration Details</h2>\n    <table class='info-table'>\n        <thead>\n            <tr>\n                <th>Field Name</th>\n                <th>Description & Examples</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>Script Argument List</td>\n                <td>This field specifies arguments to run the Python script with. Arguments can be configured in two ways:\n                    1. List the arguments in order, for example: '1,2,3 Android Nuwa'. To use them in the script, reference them as follows:<br>\n                    <b>import sys<br>\n                    str = sys.argv[2] # this will give you 'Nuwa'<br>\n                    print str<br>\n                    </b>\n                    2. List the arguments with explicit names, for example: '--systemVersion=Oreo' and reference the name directly in the script as follows:<br>\n                    <b>import argparse<br>\n                    parser = argparse.ArgumentParser(description='manual to this script')<br>\n                    parser.add_argument('--systemVersion', type=str, default = None)<br>\n                    args = parser.parse_args()<br>\n                    print args.systemVersion<br>\n                    </b>\n                </td>\n            </tr>\n            <tr>\n                <td>Script Code Content</td>\n                <td>This field contains the code content of the script. Note that you should import the 'android' library first, as this provides APIs to interact with the connected device.\n                    Refer to this <a href=\"http://www.mithril.com.au/android/doc/\">link</a> for more information on the available APIs.\n                    Please note that the script should conform to Python2 syntax. The following is an example Python script to trigger a notification on the screen:<br>\n                    <b>import android<br>\n                    droid = android.Android()<br>\n                    droid.makeToast('Hello, Android!')<br>\n                    </b>\n                </td>\n            </tr>\n        </tbody>\n    </table>  \n    <div class=\"foot-note\" >*More details can be found in go/uicd</div>\n    <button mat-raised-button color=\"primary\" (click)=\"onOkClick()\">OK</button>\n</div>\n");

/***/ }),

/***/ "I6yJ":
/*!**********************************************************************!*\
  !*** ./src/app/popup_dialogs/hard_soft_import_action_info_dialog.ts ***!
  \**********************************************************************/
/*! exports provided: HardAndSoftInfoDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HardAndSoftInfoDialogComponent", function() { return HardAndSoftInfoDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_hard_soft_import_action_info_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./hard_soft_import_action_info_dialog.ng.html */ "Tf1p");
/* harmony import */ var _hard_soft_import_action_info_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hard_soft_import_action_info_dialog.css */ "L31Q");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
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





/**
 * Snippet Action Info dialog component shows the information on
 * how to use SnippetValidationAction
 */
var HardAndSoftInfoDialogComponent = /** @class */ (function () {
    function HardAndSoftInfoDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    HardAndSoftInfoDialogComponent.prototype.onOkClick = function () {
        this.dialogRef.close();
    };
    HardAndSoftInfoDialogComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] }
    ]; };
    HardAndSoftInfoDialogComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'hard_soft_import_action_info_dialog',
            template: _raw_loader_hard_soft_import_action_info_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_hard_soft_import_action_info_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"]])
    ], HardAndSoftInfoDialogComponent);
    return HardAndSoftInfoDialogComponent;
}());



/***/ }),

/***/ "IgFR":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/test_explorer/new_project_dialog.ng.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h1 mat-dialog-title> New Project </h1>\n<div mat-dialog-content fxLayout=\"column\">\n  <mat-form-field>\n    <input matInput placeholder=\"Name\" [(ngModel)]='projectName' required>\n    <mat-error *ngIf=\"!projectName\">You must input a name.</mat-error>\n  </mat-form-field>\n</div>\n<div class=\"error-message\">{{result}}</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"saveNewProject()\">Save</button>\n  <button mat-raised-button (click)=\"dismissDialog()\">Cancel</button>\n</div>\n");

/***/ }),

/***/ "JOkJ":
/*!*****************************************************************!*\
  !*** ./src/app/popup_dialogs/python_debugger_simple_dialog.css ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.python-script-input {\n  margin-top: 10px;\n  border-style: groove;\n  border-width: 0.5px;\n  margin-bottom: 10px;\n}\n\n.python-save-action {\n  height: 36px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB5dGhvbl9kZWJ1Z2dlcl9zaW1wbGVfZGlhbG9nLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtFQUNFLGdCQUFnQjtFQUNoQixvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7QUFDZCIsImZpbGUiOiJweXRob25fZGVidWdnZXJfc2ltcGxlX2RpYWxvZy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLnB5dGhvbi1zY3JpcHQtaW5wdXQge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBib3JkZXItc3R5bGU6IGdyb292ZTtcbiAgYm9yZGVyLXdpZHRoOiAwLjVweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLnB5dGhvbi1zYXZlLWFjdGlvbiB7XG4gIGhlaWdodDogMzZweDtcbn1cbiJdfQ== */");

/***/ }),

/***/ "JRid":
/*!************************************************!*\
  !*** ./src/app/test_explorer/test_explorer.ts ***!
  \************************************************/
/*! exports provided: TestExplorer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestExplorer", function() { return TestExplorer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_test_explorer_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./test_explorer.ng.html */ "4DMm");
/* harmony import */ var _test_explorer_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./test_explorer.css */ "P7fF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ "EcEN");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _constants_jstree__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../constants/jstree */ "alCr");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../services/control_message_service */ "Etwr");
/* harmony import */ var _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../services/test_case_manager_service */ "pEJ0");
/* harmony import */ var _action_edit_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./action_edit_dialog */ "BtrL");
/* harmony import */ var _export_google3_dialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./export_google3_dialog */ "xqAX");
/* harmony import */ var _import_dialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./import_dialog */ "AFFR");
/* harmony import */ var _import_project_dialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./import_project_dialog */ "KbxA");
/* harmony import */ var _new_project_dialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./new_project_dialog */ "VNV4");
/* harmony import */ var _share_with_project_dialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./share_with_project_dialog */ "c5Vj");
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



// taze: $, JQuery from //third_party/javascript/typings/jquery:jquery_without_externs
// taze: jstree from //third_party/javascript/typings/jstree:jstree
// taze: saveAs from //third_party/javascript/typings/file_saver:file_saver



// to backend.














/**
 * Test case explorer component responsible for drawing test case tree.
 */
var TestExplorer = /** @class */ (function () {
    function TestExplorer(dialog, testCaseManagerService, backendManagerService, controlMessageService, snackBar, ngZone) {
        this.dialog = dialog;
        this.testCaseManagerService = testCaseManagerService;
        this.backendManagerService = backendManagerService;
        this.controlMessageService = controlMessageService;
        this.snackBar = snackBar;
        this.ngZone = ngZone;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_7__["ReplaySubject"](1);
        this.treeUUID = '';
        this.searchStr = '';
        this.selectedProject = {
            projectName: '',
            projectId: '',
            shareWith: '',
        };
        this.defaultProjectId = '';
        this.defaultProjectName = '';
        this.projectList = [];
        this.currentUser = '';
        this.menuItems = {
            'open': {
                'action': this.openLoadAction.bind(this),
                'label': 'Open',
                'icon': 'fa fa-share-alt-square',
            },
            'add': {
                'action': this.addAction.bind(this),
                'label': 'Add',
                'icon': 'fa fa-plug',
            },
            'newFolder': {
                'action': this.newFolderAction.bind(this),
                'label': 'New Folder',
                'icon': 'fa fa-folder-open-o',
            },
            'play': {
                'action': this.playAll.bind(this),
                'label': 'Play',
                'icon': 'fa fa-play',
            },
            'edit': {
                'action': this.editAction.bind(this),
                'label': 'Edit',
                'icon': 'fa fa-pencil-square-o'
            },
            'delete': {
                'action': this.deleteAction.bind(this),
                'label': 'Delete',
                'icon': 'fa fa-trash',
            },
            'import': {
                'action': this.importAction.bind(this),
                'label': 'Import',
                'icon': 'fa fa-envelope-open',
            },
            'rename': {
                'action': this.renameAction.bind(this),
                'label': 'Rename',
                'icon': 'fa fa-tag'
            },
            'moveTo': {
                'action': this.moveAction.bind(this),
                'label': 'MoveTo',
                'icon': 'fa fa-paper-plane-o'
            },
            'download': {
                'action': this.downloadAction.bind(this),
                'label': 'Download',
                'icon': 'fa fa-download'
            },
            'exportToGoogle3': {
                'action': this.exportAction.bind(this),
                'label': 'Export to Google3',
                'icon': 'fa fa-cloud-upload'
            }
        };
    }
    TestExplorer.prototype.ngOnInit = function () {
        var _this = this;
        this.backendManagerService.getCurrentUser()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.currentUser = data.name;
            _this.defaultProjectId = _constants_constants__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_PROJECT_ID_PREFIX"] + _this.currentUser;
            _this.defaultProjectName =
                _constants_constants__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_PROJECT_NAME_PREFIX"] + _this.currentUser;
            _this.selectedProject.projectId = _this.defaultProjectId;
            _this.selectedProject.projectName = _this.defaultProjectName;
            _this.initiateProject();
        });
        this.controlMessageService.getControlMessageSubject()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])(function (msg) { return (msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].ADD_NODE_TO_TREE) ||
            (msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].REFRESH_TEST_CASE_TREE); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            if (data.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].ADD_NODE_TO_TREE) {
                // `unknown`.
                // tslint:disable:no-any no-unnecessary-type-assertion
                var newNode = JSON.parse(data.extra);
                // tslint:enable:no-any no-unnecessary-type-assertion
                _this.jsTree.jstree('create_node', newNode.parentId, newNode.node);
            }
            else {
                _this.refreshTree(false);
            }
        });
    };
    TestExplorer.prototype.setupDataTree = function () {
        var jsTreeObj = $(this.jsTreeEl.nativeElement);
        this.jsTree = jsTreeObj.jstree({
            'core': {
                'themes': {
                    'dots': false,
                },
                'data': {},
                'check_callback': this.isValidCB,
            },
            'search': {
                'case_insensitive': true,
                'show_only_matches': true,
            },
            'plugins': ['wholerow', 'dnd', 'contextmenu', 'sort', 'search'],
            'contextmenu': { items: this.menuItems },
        });
        this.refreshTree(false);
        this.addEventHooks();
    };
    /**
     * Before call {@code refreshTree}, {@code this.selectedProject.projectId}
     * need to be the correct one.
     */
    TestExplorer.prototype.refreshTree = function (isNewWorkspace) {
        var _this = this;
        this.testCaseManagerService
            .getTestCasesListByProjectId(this.selectedProject.projectId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            if (data.uuid) {
                _this.treeUUID = data.uuid;
            }
            if (data.treeDetails) {
                // `unknown`.
                // tslint:disable:no-any no-unnecessary-type-assertion
                _this.updateDataTree(Object(_services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_13__["convertToJsTreeFormat"])(JSON.parse(data.treeDetails)), isNewWorkspace);
                // tslint:enable:no-any no-unnecessary-type-assertion
            }
            else {
                _this.saveEmptyTreeToBackend();
            }
        });
    };
    TestExplorer.prototype.searchTree = function () {
        this.jsTree.jstree('search', this.searchStr);
    };
    TestExplorer.prototype.saveTreeToBackend = function () {
        // _model holds the jstree internal state. It is the only place(that I can
        // find) that holds the data object with original json passed and is up to
        // date.
        var modelData = this.getJsTreeInstance()['_model'].data;
        var data = Object(_services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_13__["reconstructJsTreeData"])(modelData, '#');
        this.getJsTreeInstance()['settings'].core.data = data;
        var jsonData = Object(_services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_13__["convertToJsonTreeFormat"])(data);
        console.log('saveTreeToBackend');
        this.testCaseManagerService
            .updateTestCaseTree(jsonData, this.treeUUID, this.selectedProject.projectId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
            .subscribe();
    };
    TestExplorer.prototype.saveEmptyTreeToBackend = function () {
        var _this = this;
        // Need directly call the save to backend, otherwise update won't pick up
        // the latest jsTree data from ['_model'].data, pass in the empty treeUUID,
        // backend will generate a new UUID for the tree.
        this.testCaseManagerService
            .updateTestCaseTree(Object(_services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_13__["emptyTreeExample"])(), /* treeUUID */ '', this.selectedProject.projectId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.updateDataTree(Object(_services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_13__["convertToJsTreeFormat"])(Object(_services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_13__["emptyTreeExample"])()), false);
            _this.refreshTree(false);
        });
    };
    TestExplorer.prototype.addEventHooks = function () {
        var _this = this;
        this.jsTree.on('move_node.jstree create_node.jstree delete_node.jstree refresh.jstree, rename_node.jstree', this.saveTreeToBackend.bind(this));
        this.jsTree.on('select_node.jstree', function (e, action) {
            var node = action.node;
            if (!node.original.isFolder && action.event &&
                action.event.type !== 'contextmenu') {
                if (!confirm('Do you wish to load this test case?')) {
                    return;
                }
                var uuid_1 = _this.getUUIDFromNode(node);
                _this.backendManagerService.loadWorkflow(uuid_1)
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(_this.destroyed))
                    .subscribe(function (data) {
                    _this.controlMessageService.sendRefreshWorkflowMsg();
                });
            }
        });
    };
    TestExplorer.prototype.getJsTreeInstance = function () {
        // jstree(true) returns an existing instance instead of creating a new
        // instance.
        return this.jsTree.jstree(true);
    };
    // tslint:disable:no-any no typing info available for jstree.
    TestExplorer.prototype.isValidCB = function (op, nodeDragged, parentNode, currentPosition, more) {
        // tslint:enable:no-any
        if (op === 'move_node' && more && more.dnd && more.ref &&
            more.ref.original && !more.ref.original.isFolder) {
            return false;
        }
        return true;
    };
    TestExplorer.prototype.updateDataTree = function (jsTreeNode, isNewWorkspace) {
        var _this = this;
        // 'settings' is an internal field that contains some desired jstree
        // properties.
        this.getJsTreeInstance()['settings'].core.data = jsTreeNode;
        this.getJsTreeInstance().refresh(
        /* skip_loading */ false, /* forget_state */ true);
        if (isNewWorkspace) {
            this.backendManagerService.createNewWorkSpace()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
                .subscribe(function () {
                _this.controlMessageService.sendRefreshWorkflowMsg();
            });
        }
    };
    TestExplorer.prototype.getUUIDFromNode = function (node) {
        var uuid = node.id;
        // if it has additional data that means that it is an action,
        // rather than just a folder, so it's additional data
        // is the uuid needed to retrieve those actions
        // from the database
        if (node.original.additionalData &&
            node.original.additionalData.length > 0) {
            uuid = node.original.additionalData[0];
        }
        return uuid;
    };
    TestExplorer.prototype.getCurrentNode = function (nodeRef) {
        var nodes = this.getJsTreeInstance().get_selected(nodeRef);
        if (nodes.length > 0) {
            return nodes[0];
        }
        throw new Error('cannot get selected node reference.');
    };
    TestExplorer.prototype.openLoadAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        if (currentNode.original.isFolder) {
            this.snackBar.open('Open operation cannot be performed on a folder!', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["SNACKBAR_DURATION_MS"] });
            return;
        }
        var uuid = this.getUUIDFromNode(currentNode);
        this.backendManagerService.loadWorkflow(uuid)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    TestExplorer.prototype.addAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        if (currentNode.original.isFolder) {
            this.snackBar.open('Add operation cannot be performed on a folder!', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["SNACKBAR_DURATION_MS"] });
            return;
        }
        var uuid = this.getUUIDFromNode(currentNode);
        this.backendManagerService.addActionByUUID(uuid)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    TestExplorer.prototype.editAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        this.ngZone.run(function () {
            var dialogRef = _this.dialog.open(_action_edit_dialog__WEBPACK_IMPORTED_MODULE_14__["ActionEditDialog"], { width: '800px', data: { uuid: _this.getUUIDFromNode(currentNode) } });
            dialogRef.afterClosed().subscribe(function (data) {
                if (data) {
                    if (data.deleted) {
                        _this.jsTree.jstree('delete_node', currentNode);
                    }
                    else if (data.name !== currentNode.text) {
                        currentNode.original.text = data.name;
                        _this.jsTree.jstree('rename_node', currentNode, data.name);
                    }
                }
            });
        });
    };
    TestExplorer.prototype.newFolderAction = function (nodeRef) {
        var currentNode = this.getCurrentNode(nodeRef);
        if (!currentNode.original.isFolder) {
            this.snackBar.open('New Folder operation can only be performed on a folder!', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["SNACKBAR_DURATION_MS"] });
            return;
        }
        this.createFolder(currentNode.id, 'New Folder');
    };
    TestExplorer.prototype.createFolder = function (parentId, name) {
        var newNode = new _constants_jstree__WEBPACK_IMPORTED_MODULE_10__["JsTreeNode"](name, Object(uuid__WEBPACK_IMPORTED_MODULE_6__["v4"])());
        this.jsTree.jstree('create_node', parentId, newNode);
    };
    TestExplorer.prototype.playAll = function (nodeRef) {
    };
    TestExplorer.prototype.deleteAction = function (nodeRef) {
        if (confirm('Are you sure you wish to delete this?')) {
            this.jsTree.jstree('delete_node', this.getCurrentNode(nodeRef));
        }
    };
    TestExplorer.prototype.importAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        if (!currentNode.original.isFolder) {
            this.snackBar.open('New Folder operation can only be performed on a folder!', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["SNACKBAR_DURATION_MS"] });
            return;
        }
        this.ngZone.run(function () {
            var dialogRef = _this.dialog.open(_import_dialog__WEBPACK_IMPORTED_MODULE_16__["ImportDialog"], { width: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["POPUP_DIALOG_DEFAULT_DIMENSION"].width, data: {} });
            dialogRef.afterClosed().subscribe(function (data) {
                if (data) {
                    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                        var node = data_1[_i];
                        _this.jsTree.jstree('create_node', currentNode.id, node);
                    }
                }
            });
        });
    };
    TestExplorer.prototype.renameAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        var uuid = this.getUUIDFromNode(currentNode);
        this.jsTree.jstree('edit', currentNode, null, function (node, status) {
            if (status && node) {
                if (!node.original.isFolder) {
                    _this.backendManagerService.getActionDetails(uuid)
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(_this.destroyed))
                        .subscribe(function (data) {
                        data.name = node.text;
                        _this.backendManagerService.updateActionMetadata(data)
                            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(_this.destroyed))
                            .subscribe();
                    });
                }
                node.original.text = node.text;
                _this.saveTreeToBackend();
            }
        });
    };
    TestExplorer.prototype.moveAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        if (currentNode.original.isFolder) {
            this.snackBar.open('CopyTo operation cannot be performed on a folder!', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["SNACKBAR_DURATION_MS"] });
            return;
        }
        var uuid = this.getUUIDFromNode(currentNode);
        this.ngZone.run(function () {
            var dialogRef = _this.dialog.open(_action_edit_dialog__WEBPACK_IMPORTED_MODULE_14__["ActionEditDialog"], {
                width: '800px',
                data: {
                    uuid: uuid,
                    isSaveWorkflow: true,
                    isMoveAction: true,
                },
            });
            dialogRef.afterClosed().subscribe(function (data) {
                if (!data) {
                    return;
                }
                _this.jsTree.jstree('move_node', currentNode, data.parentId, 'last', function (node, parentNode, position) {
                    if (node.text === data.name) {
                        return;
                    }
                    _this.backendManagerService.updateActionMetadata(data.metadata)
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(_this.destroyed))
                        .subscribe();
                    node.original.text = data.name;
                    _this.jsTree.jstree('rename_node', node, data.name);
                });
            });
        });
    };
    TestExplorer.prototype.downloadTest = function (uuid, filename, filterTopLevelWorkflow) {
        this.backendManagerService.exportTestCase(uuid).subscribe(function (data) {
            if (filterTopLevelWorkflow && !data.isTopLevelWorkflow)
                return;
            var formatted = JSON.stringify(data, null, 2);
            var exportData = new Blob([formatted + '\n'], { type: 'application/octet-stream' });
            saveAs(exportData, filename);
        });
    };
    TestExplorer.prototype.downloadRefImgs = function (uuidStr) {
        var _this = this;
        this.backendManagerService.exportRefImagesForWorkflow(uuidStr)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            var uuidStrToBase64 = data.uuidTobase64Img;
            _this.exportRefImgs(uuidStrToBase64);
        });
    };
    TestExplorer.prototype.exportRefImgs = function (uuidStrToBase64) {
        for (var _i = 0, _a = Object.keys(uuidStrToBase64); _i < _a.length; _i++) {
            var uuid_2 = _a[_i];
            var imgBase64Str = uuidStrToBase64[uuid_2];
            var blobData = this.convertBase64ToBlobData(imgBase64Str);
            var blob = new Blob(blobData, { type: 'image/png' });
            saveAs(blob, uuid_2);
        }
    };
    TestExplorer.prototype.convertBase64ToBlobData = function (imgBase64Str) {
        var sliceSize = 512;
        var byteCharacters = atob(imgBase64Str);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var byteCharactersSlice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbersSlice = new Array(byteCharactersSlice.length);
            for (var i = 0; i < byteCharactersSlice.length; i++) {
                byteNumbersSlice[i] = byteCharactersSlice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbersSlice);
            byteArrays.push(byteArray);
        }
        return byteArrays;
    };
    TestExplorer.prototype.downloadAction = function (nodeRef) {
        var currentNode = this.getCurrentNode(nodeRef);
        console.log('Start download action');
        if (currentNode.original.isFolder) {
            this.downloadActionInFolder(currentNode.id);
            this.snackBar.open('Batch export only download top level workflow!', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["SNACKBAR_DURATION_MS"] });
            return;
        }
        // Only filter by toplevel when it is a batch download
        this.downloadActionByUUID(currentNode.id, currentNode.text, false);
    };
    TestExplorer.prototype.downloadActionInFolder = function (uuid) {
        var currentNode = this.getJsTreeInstance().get_node(uuid);
        for (var i = 0; i < currentNode.children.length; i++) {
            var childNode = this.getJsTreeInstance().get_node(currentNode.children[i]);
            if (childNode.original.isFolder) {
                this.downloadActionInFolder(currentNode.children[i]);
            }
            else {
                this.downloadActionByUUID(currentNode.children[i], childNode.text, true);
            }
        }
    };
    TestExplorer.prototype.downloadActionByUUID = function (uuid, fileName, filterTopLevelWorkflow) {
        var testcaseId = this.getUUIDFromNode(this.getJsTreeInstance().get_node(uuid));
        this.downloadTest(testcaseId, fileName, filterTopLevelWorkflow);
        this.downloadRefImgs(uuid);
    };
    TestExplorer.prototype.exportAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        var uuid = this.getUUIDFromNode(currentNode);
        this.backendManagerService.exportTestCase(uuid).subscribe(function (returnedData) {
            var google3Path = '';
            google3Path = returnedData.additionalData.filePath;
            _this.ngZone.run(function () {
                _this.dialog.open(_export_google3_dialog__WEBPACK_IMPORTED_MODULE_15__["ExportGoogle3Dialog"], { width: '800px', data: { actionId: uuid, google3Path: google3Path } });
            });
        });
    };
    TestExplorer.prototype.exportCurrentProject = function () {
        var exportProjectReq = {
            projectId: this.selectedProject.projectId,
            projectName: this.selectedProject.projectName,
            zipFileName: '',
        };
        this.backendManagerService.exportCurrentProject(exportProjectReq);
    };
    TestExplorer.prototype.exportTopLevelTests = function () {
        var exportProjectReq = {
            projectId: this.selectedProject.projectId,
            projectName: this.selectedProject.projectName,
            zipFileName: '',
        };
        this.backendManagerService.exportTopLevelTests(exportProjectReq);
    };
    TestExplorer.prototype.getAllActionId = function (node, actionIdList) {
        if (node.additionalData && node.additionalData.length > 0) {
            var uuid_3 = node.additionalData[0];
            actionIdList.push(uuid_3);
        }
        if (node.children && node.children.length > 0) {
            for (var i = 0; i < node.children.length; i++) {
                this.getAllActionId(node.children[i], actionIdList);
            }
        }
    };
    TestExplorer.prototype.openNewProjectDialog = function () {
        var _this = this;
        var dialogConfig = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogConfig"]();
        dialogConfig.width = _constants_constants__WEBPACK_IMPORTED_MODULE_9__["POPUP_DIALOG_DEFAULT_DIMENSION"].width;
        var dialogRef = this.dialog.open(_new_project_dialog__WEBPACK_IMPORTED_MODULE_18__["NewProjectDialog"], dialogConfig);
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                _this.selectedProject = data;
                _this.controlMessageService.sendRefreshTestCaseTreeMsg();
            }
        });
    };
    TestExplorer.prototype.openShareProjectDialog = function () {
        var dialogConfig = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogConfig"]();
        dialogConfig.width = _constants_constants__WEBPACK_IMPORTED_MODULE_9__["POPUP_DIALOG_DEFAULT_DIMENSION"].width;
        dialogConfig.data = this.selectedProject;
        var dialogRef = this.dialog.open(_share_with_project_dialog__WEBPACK_IMPORTED_MODULE_19__["ShareWithProjectDialog"], dialogConfig);
        dialogRef.afterClosed().subscribe();
    };
    TestExplorer.prototype.openImportProjectDialog = function () {
        var dialogConfig = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogConfig"]();
        dialogConfig.width = _constants_constants__WEBPACK_IMPORTED_MODULE_9__["POPUP_DIALOG_DEFAULT_DIMENSION"].width;
        this.dialog.open(_import_project_dialog__WEBPACK_IMPORTED_MODULE_17__["ImportProjectDialog"], dialogConfig);
    };
    TestExplorer.prototype.getProjectList = function () {
        var _this = this;
        this.backendManagerService.getProjectList()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.projectList = data.projectList;
        });
    };
    TestExplorer.prototype.selectProject = function (project) {
        var _this = this;
        this.backendManagerService.setCurrentProject(project.projectId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            if (data.success) {
                _this.selectedProject = data.projectList[0];
                _this.refreshTree(true);
            }
        });
    };
    TestExplorer.prototype.deleteProject = function (project, event) {
        var _this = this;
        event.stopPropagation();
        if (this.selectedProject.projectId === project.projectId) {
            alert('You cannot delete the current project');
            return;
        }
        if (confirm('Are you sure you want to delete project ' + project.projectName +
            '?')) {
            this.backendManagerService.deleteProject(project.projectId)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
                .subscribe(function (data) {
                if (data.success) {
                    _this.getProjectList();
                }
            });
            this.testCaseManagerService.deleteTestCaseTree(project.projectId)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
                .subscribe();
        }
    };
    /**
     * Initialize project. Set to the default one with name {@code
     * this.defaultProjectName}. If the default one doesn't exist, it will be
     * created with projectId is a UUID.
     */
    TestExplorer.prototype.initiateProject = function () {
        var _this = this;
        console.log('init project');
        this.backendManagerService.getProjectList()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])(function (data) {
            var defaultProjectId = _this.defaultProjectId;
            if (data.success && data.projectList.length > 0) {
                defaultProjectId = data.projectList[0].projectId;
            }
            return _this.backendManagerService.setCurrentProject(defaultProjectId);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.projectList = data.projectList;
            _this.selectedProject = data.projectList[0];
            _this.setupDataTree();
        });
    };
    TestExplorer.prototype.ngOnDestroy = function () {
        // Unsubscribe all pending subscriptions.
        this.destroyed.next();
        if (this.jsTree) {
            this.jsTree.off();
        }
    };
    TestExplorer.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_13__["TestCaseManagerService"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_11__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_12__["ControlMessageService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] }
    ]; };
    TestExplorer.propDecorators = {
        jsTreeEl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['jsTree', { static: true },] }]
    };
    TestExplorer = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'test-explorer',
            template: _raw_loader_test_explorer_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_test_explorer_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_13__["TestCaseManagerService"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_11__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_12__["ControlMessageService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"], _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"]])
    ], TestExplorer);
    return TestExplorer;
}());



/***/ }),

/***/ "JRns":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/screen_validation_flow/fetch_content_form.ng.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"form-container\">\n  <h3>Fetch content from screen</h3>\n  <div class=\"selected-content\">Selected content: <span class=\"selected-content-span\">{{currentSelectedText}}</span>\n  </div>\n  <div>\n    <b>Selected By:</b>\n  </div>\n  <mat-radio-group placeholder=\"\" [ngModel]=\"fetchActionDetails.strategy\" (ngModelChange)=\"fetchActionDetails.strategy=$event;emitUpdate()\" name=\"selectedStrategy\">\n    <mat-radio-button *ngFor=\"let c of STRATEGY_TYPES\" [value]=\"c.value\" (change)=\"selectorChanged($event)\">\n      {{ c.displayText }}\n    </mat-radio-button>\n  </mat-radio-group>\n  <mat-form-field>\n    <input matInput [ngModel]=\"fetchActionDetails.selector\" (ngModelChange)=\"fetchActionDetails.selector=$event;emitUpdate();\" placeholder=\"Selector Value\" required>\n  </mat-form-field>\n\n  <div *ngIf=\"showAttributeInput()\">\n    <mat-form-field>\n      <input matInput [ngModel]=\"fetchActionDetails.attributeType\" (ngModelChange)=\"fetchActionDetails.attributeType=$event;emitUpdate();\" placeholder=\"XML Attribute Name\">\n    </mat-form-field>\n  </div>\n  <b>Selected content: {{currentSelectedText}}</b>\n  <mat-form-field>\n    <input matInput [ngModel]=\"fetchActionDetails.globalVariableName\" (ngModelChange)=\"fetchActionDetails.globalVariableName=$event;emitUpdate();\"\n      placeholder=\"Variable Name (Must start with '$uicd_')\" required>\n  </mat-form-field>\n  <div *ngIf=\"showButtons\">\n    <button mat-raised-button color=\"primary\" name=\"previousPageBtn\" (click)='previousPageClicked()'>Back</button>\n    <button mat-raised-button color=\"primary\" name=\"closePopupBtn\" (click)='closePopup()'>Add Action</button>\n  </div>\n</div>\n");

/***/ }),

/***/ "KbxA":
/*!********************************************************!*\
  !*** ./src/app/test_explorer/import_project_dialog.ts ***!
  \********************************************************/
/*! exports provided: ImportProjectDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportProjectDialog", function() { return ImportProjectDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_import_project_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./import_project_dialog.ng.html */ "TLnq");
/* harmony import */ var _import_project_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./import_project_dialog.css */ "ODag");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/control_message_service */ "Etwr");
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



// taze: $, JQuery from //third_party/javascript/typings/jquery:jquery_without_externs
// taze: jstree from //third_party/javascript/typings/jstree:jstree








/**
 * Dialog for importing project by username into a new project.
 */
var ImportProjectDialog = /** @class */ (function () {
    function ImportProjectDialog(dialog, dialogRef, backendManagerService, controlMessageService, snackBar, ngZone) {
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.backendManagerService = backendManagerService;
        this.controlMessageService = controlMessageService;
        this.snackBar = snackBar;
        this.ngZone = ngZone;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_6__["ReplaySubject"](1);
        this.IMPORT_ZIP = 'From zip file';
        this.IMPORT_USER = 'From user';
        this.importTypes = [this.IMPORT_ZIP, this.IMPORT_USER];
        this.IMPORT_COPY_TYPES = _constants_constants__WEBPACK_IMPORTED_MODULE_8__["IMPORT_COPY_TYPES"];
        this.importedZipFileName = '';
        this.selectedImportType = '';
        this.usernameImportText = '';
        this.projectList = [];
        this.selectedProject = {
            projectName: '',
            projectId: '',
        };
        this.targetProjectName = '';
        this.showOverlay = false;
        this.importedFile = null;
    }
    ImportProjectDialog.prototype.ngOnInit = function () { };
    ImportProjectDialog.prototype.fetchProjectListByUsername = function () {
        var _this = this;
        this.backendManagerService.getProjectListByUsername(this.usernameImportText)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.projectList = data.projectList;
        });
    };
    ImportProjectDialog.prototype.importProject = function () {
        if (this.targetProjectName.length < 3) {
            this.snackBar.open("Project name length need to be greater than 3.", 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
        }
        if (this.selectedImportType === this.IMPORT_ZIP) {
            this.importProjectFromZip();
            return;
        }
        this.importProjectFromUser();
    };
    ImportProjectDialog.prototype.importProjectFromUser = function () {
        var _this = this;
        this.showOverlay = true;
        this.backendManagerService.createProject(this.targetProjectName)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["switchMap"])(function (response) {
            if (response.success) {
                var projectCopyRequest = {
                    srcProjectId: _this.selectedProject.projectId,
                    targetProjectId: response.projectList[0].projectId
                };
                return _this.backendManagerService.copyProject(projectCopyRequest);
            }
            else {
                _this.controlMessageService.sendHideOverlayMsg();
                _this.snackBar.open("Failed to create project, please make sure this name \n                      doesn't already exist.", 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
                _this.showOverlay = false;
                return rxjs__WEBPACK_IMPORTED_MODULE_6__["EMPTY"];
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.showOverlay = false;
            _this.snackBar.open("Project copied, please select new project in the list.", 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
            _this.dismissDialog();
        });
    };
    ImportProjectDialog.prototype.importProjectFromZip = function () {
        var _this = this;
        if (!this.importedFile) {
            return;
        }
        this.showOverlay = true;
        this.backendManagerService
            .unzipAndImport(this.targetProjectName, this.importedFile)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.snackBar.open('Project successfully imported', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
            _this.dismissDialog();
        }, function () {
            _this.showOverlay = false;
            _this.snackBar.open('Error while importing the project from zip file', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
        });
    };
    ImportProjectDialog.prototype.importFileSelected = function (event) {
        if (!event.target) {
            return;
        }
        var fileInput = event.target;
        if (!fileInput.files) {
            return;
        }
        this.importedFile = fileInput.files[0];
    };
    ImportProjectDialog.prototype.dismissDialog = function () {
        this.dialogRef.close();
    };
    ImportProjectDialog.prototype.ngOnDestroy = function () {
        // Unsubscribe all pending subscriptions.
        this.destroyed.next();
    };
    ImportProjectDialog.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_9__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_10__["ControlMessageService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] }
    ]; };
    ImportProjectDialog = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-import-project-dialog',
            template: _raw_loader_import_project_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_import_project_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_9__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_10__["ControlMessageService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"], _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"]])
    ], ImportProjectDialog);
    return ImportProjectDialog;
}());



/***/ }),

/***/ "Kd50":
/*!*****************************************************!*\
  !*** ./src/app/services/backend_manager_service.ts ***!
  \*****************************************************/
/*! exports provided: BackendManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackendManagerService", function() { return BackendManagerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
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




/** Communicates to the UIConductor Java backend */
var BackendManagerService = /** @class */ (function () {
    function BackendManagerService(http) {
        this.http = http;
        this.OPTIONS = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
            })
        };
    }
    /** Adds the given action to current workflow */
    BackendManagerService.prototype.addActionByUUID = function (uuid) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/addActionByUUID', { params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('uuidStr', uuid) });
    };
    /** Adds action to current workflow */
    BackendManagerService.prototype.addActionToWorkflow = function (action) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/addActionToWorkflow', action);
    };
    /** Add validation action to current workflow */
    BackendManagerService.prototype.addValidationStep = function (action) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/addValidationStep', action);
    };
    /** Adds drag Action */
    BackendManagerService.prototype.addDragAction = function (pointsList) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/addDragAction', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('xList', pointsList.map(function (p) { return Math.floor(p.x).toString(); }).join(','))
                .set('yList', pointsList.map(function (p) { return Math.floor(p.y).toString(); }).join(','))
        });
    };
    /** Stops playing current workflow */
    BackendManagerService.prototype.cancelCurrentWorkflow = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/cancelCurrentWorkflow');
    };
    /** Creates a new workspace */
    BackendManagerService.prototype.createNewWorkSpace = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/createNewWorkSpace');
    };
    /** copy project */
    BackendManagerService.prototype.copyProject = function (projectCopyRequest) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/copyProjectTree', projectCopyRequest, this.OPTIONS);
    };
    /** Performs double click on current device */
    BackendManagerService.prototype.doubleClick = function (x, y) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/doubleclick', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('x', Math.floor(x).toString())
                .set('y', Math.floor(y).toString())
        });
    };
    /** Performs dragMove click on current device */
    BackendManagerService.prototype.dragMove = function (x, y) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/dragMove', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('x', Math.floor(x).toString())
                .set('y', Math.floor(y).toString())
        });
    };
    /** Performs dragStart on current device */
    BackendManagerService.prototype.dragStart = function (x, y) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/dragStart', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('x', Math.floor(x).toString())
                .set('y', Math.floor(y).toString())
        });
    };
    /** Performs dragStop on current device */
    BackendManagerService.prototype.dragStop = function (x, y) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/dragStop', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('x', Math.floor(x).toString())
                .set('y', Math.floor(y).toString())
        });
    };
    /** Performs Drag with context action on current devices */
    BackendManagerService.prototype.dragWithStartEndContext = function (startX, startY, endX, endY) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/dragWithStartEndContext', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('startX', Math.floor(startX).toString())
                .set('startY', Math.floor(startY).toString())
                .set('endX', Math.floor(endX).toString())
                .set('endY', Math.floor(endY).toString())
        });
    };
    /** Performs Swipe with context action on current devices */
    BackendManagerService.prototype.swipeWithStartEndContext = function (startX, startY, endX, endY) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/swipeWithStartEndContext', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('startX', Math.floor(startX).toString())
                .set('startY', Math.floor(startY).toString())
                .set('endX', Math.floor(endX).toString())
                .set('endY', Math.floor(endY).toString())
        });
    };
    /** Returns raw json test information for given test */
    BackendManagerService.prototype.exportTestCase = function (uuid) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/exportTestCase', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('uuidStr', uuid),
        });
    };
    /**
     * Returns dictionary of reference image uuids to reference image in form of
     * base64 string
     */
    BackendManagerService.prototype.exportRefImagesForWorkflow = function (uuid) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/exportRefImagesForWorkflow', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('uuidStr', uuid),
        });
    };
    /**
     * Exports the given project as a zip file
     */
    BackendManagerService.prototype.exportCurrentProject = function (exportImportProjectReq) {
        var url = _constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/exportProjectToZip?' +
            new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('projectId', exportImportProjectReq.projectId)
                .set('projectName', exportImportProjectReq.projectName)
                .toString();
        window.open(url);
    };
    /**
     * Exports the given project as a zip file
     */
    BackendManagerService.prototype.exportTopLevelTests = function (exportImportProjectReq) {
        var url = _constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/exportTopLevelCaseOnlyToZip?' +
            new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('projectId', exportImportProjectReq.projectId)
                .set('projectName', exportImportProjectReq.projectName)
                .toString();
        window.open(url);
    };
    /** Upload zip file and import */
    BackendManagerService.prototype.unzipAndImport = function (projectName, file) {
        var formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('projectName', projectName);
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Accept': 'application/zip' });
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/unzipAndImport', formData, { headers: headers });
    };
    /**
     * Gets the content details from the select area.
     * (DisplayText|ResourceID|checked)
     */
    BackendManagerService.prototype.getContentFromScreen = function (bounds) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getContentFromScreen', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('startX', Math.floor(bounds.x1).toString())
                .set('startY', Math.floor(bounds.y1).toString())
                .set('endX', Math.floor(bounds.x2).toString())
                .set('endY', Math.floor(bounds.y2).toString())
        });
    };
    /**
     * Gets the global variable from backend in plain string format to make it
     * simple. It doesn't include the resevered internal variables (e.g. adb
     * path, input path output path). Expected return will be something
     * similar to: $uicd_var1=abc,$uicd_var2=123.
     */
    BackendManagerService.prototype.getUserPresetGlobalVariable = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getUserPresetGlobalVariable');
    };
    /**
     * Set the global variable from backend in plain string format.
     * simple. Expected input should be in the following format:
     * $uicd_var1=abc,$uicd_var2=123.
     */
    BackendManagerService.prototype.setUserPresetGlobalVariable = function (globalVariableStr) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/setUserPresetGlobalVariable', globalVariableStr);
    };
    /** Fetches the current XML representation of the device screen */
    BackendManagerService.prototype.fetchXML = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/fetchCurrentXML');
    };
    /** Gets current workflow in json format */
    BackendManagerService.prototype.getCurrentWorkflow = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getCurrentWorkflow');
    };
    /** Gets action details. */
    BackendManagerService.prototype.getActionDetails = function (uuid) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getActionDetails', { params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('uuidStr', uuid) });
    };
    /** Gets current user of UICD */
    BackendManagerService.prototype.getCurrentUser = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getCurrentUser');
    };
    /** Gets adb connected devices from backend */
    BackendManagerService.prototype.getDevicesList = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getDevicesList');
    };
    /** Gets devices that already initialized in backend */
    BackendManagerService.prototype.getInitedDevices = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getInitializedDevicesDetails');
    };
    /** Gets current play mode */
    BackendManagerService.prototype.getPlayMode = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getPlayMode');
    };
    /** Gets xmldumper version and uicd backend version */
    BackendManagerService.prototype.getVersionInfo = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getVersionInfo');
    };
    /**
     * Checks whether backend already initialized the device to avoid
     * reinitialized devices when user refresh the frontend
     */
    BackendManagerService.prototype.hasInitializedDevices = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/hasInitedDevices');
    };
    /**
     * Initializes single device in backend, backend will start the xmldumper
     * server on the device
     * @param deviceId
     */
    BackendManagerService.prototype.initDevice = function (deviceId) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/initDevice', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('deviceId', deviceId),
        });
    };
    /**
     * Initialize device list in backend, backend will start the xmldumper
     * server on the device
     * @param deviceIdList device id list separater by comma.
     * @param isCleanInit whether need a clean init.
     */
    BackendManagerService.prototype.initDevicesFromListV2 = function (deviceIdList, isCleanInit) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/initDevicesFromListV2', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('devicesIdList', deviceIdList)
                .set('isCleanInit', isCleanInit.toString()),
        });
    };
    /** Changes the current workflow in backend. */
    BackendManagerService.prototype.loadWorkflow = function (uuid) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/loadWorkflow', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('uuidStr', uuid),
        });
    };
    /**
     * Performs long click on current device
     */
    BackendManagerService.prototype.longClick = function (x, y, duration) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/longclick', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('x', Math.floor(x).toString())
                .set('y', Math.floor(y).toString())
                .set('duration', duration.toString())
        });
    };
    /**
     * Sends given keyCode to the backend and will click the button on the
     * current selected device
     * @param keyCode which key to click.
     */
    BackendManagerService.prototype.pressKey = function (keyCode) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/pressKey', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('keyCode', keyCode.toString()),
        });
    };
    /** Plays current workflow */
    BackendManagerService.prototype.playCurrentWorkflow = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/playCurrentWorkflow');
    };
    /** Plays the current workflow starting from given action */
    BackendManagerService.prototype.playCurrentWorkflowFromAction = function (playActionRequest) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/playCurrentWorkflowFromAction', playActionRequest, this.OPTIONS);
    };
    /** Plays the given action. */
    BackendManagerService.prototype.playAction = function (playActionRequest) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/playAction', playActionRequest, this.OPTIONS);
    };
    /** Removes the action with given uuid */
    BackendManagerService.prototype.removeAction = function (index) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/removeAction', index);
    };
    /** Removes last action in current workflow */
    BackendManagerService.prototype.undo = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/undo');
    };
    /** Removes last action in current workflow */
    BackendManagerService.prototype.redo = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/redo');
    };
    /**
     * Reorders the current workflow compound's children Action based on the
     * actionIdList on backend
     */
    BackendManagerService.prototype.reorderActions = function (actionIdList) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/reorderActions', JSON.stringify(actionIdList), this.OPTIONS);
    };
    /**
     * Saves the given workflow to backend
     * @workflow workflow description
     */
    BackendManagerService.prototype.saveCurrentWorkflow = function (workflow) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/saveCurrentWorkflow', JSON.stringify(workflow));
    };
    /**
     * Saves the current workflow to backend
     */
    BackendManagerService.prototype.saveCurrentWorkflowWithoutMetadata = function () {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/saveCurrentWorkflowWithoutMetadata', null);
    };
    /**
     * Sets different play configurations
     * @param mode SINGLE|MULTI|PLAYALL
     */
    BackendManagerService.prototype.setPlayMode = function (mode) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/setPlayMode', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('playMode', mode),
        });
    };
    /**
     * Sets play speed factor
     * @param playSpeedFactor. >= 0.1, backend have the logic to make sure it
     * greater than 0.1
     */
    BackendManagerService.prototype.setPlaySpeedFactor = function (playSpeedFactor) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/setPlaySpeedFactor', playSpeedFactor);
    };
    /**
     * Changes the current device used for test
     * @param deviceId serial of the device to be used in the test
     */
    BackendManagerService.prototype.selectedDeviceChanged = function (deviceId) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/selectedDeviceChanged', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('deviceId', deviceId),
        });
    };
    /** Restart backend spring service */
    BackendManagerService.prototype.softRestart = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/softRestart');
    };
    /** Performs swipe action */
    BackendManagerService.prototype.swipe = function (startX, startY, endX, endY) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/swipe', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('startX', Math.floor(startX).toString())
                .set('startY', Math.floor(startY).toString())
                .set('endX', Math.floor(endX).toString())
                .set('endY', Math.floor(endY).toString())
        });
    };
    /**
     * Sends the tap command to backend, (x,y) is at frontend scale(logic
     * point), and backend will covert to physical point(store the logic
     * point).
     */
    BackendManagerService.prototype.tap = function (x, y, isStrictMode) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/tap', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('x', Math.floor(x).toString())
                .set('y', Math.floor(y).toString())
                .set('isStrictMode', String(isStrictMode))
        });
    };
    /** Validates the backend status */
    BackendManagerService.prototype.validateUicdBackendConnection = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/validateUicdBackendConnection');
    };
    /** Performs Zoom action on current devices */
    BackendManagerService.prototype.zoom = function (x1, y1, x2, y2, isZoomIn) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/zoom', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('x1', Math.floor(x1).toString())
                .set('y1', Math.floor(y1).toString())
                .set('x2', Math.floor(x2).toString())
                .set('y2', Math.floor(y2).toString())
                .set('isZoomIn', String(isZoomIn))
        });
    };
    /**
     * Updates the workflow with the same uuid.
     * @param workflow new workflow description.
     */
    BackendManagerService.prototype.updateActionMetadata = function (workflow) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/updateActionMetadata', JSON.stringify(workflow));
    };
    /** Updates the validation action. */
    BackendManagerService.prototype.updateValidationAction = function (uuidStr, req) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/updateValidationAction', JSON.stringify(req), { params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('uuidStr', uuidStr) });
    };
    /**
     * Performs Swipe action on current device following given direction.
     */
    BackendManagerService.prototype.quickSwipe = function (direction) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/quickSwipe', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('dir', direction),
        });
    };
    /**
     * Performs Swipe action on current device following given direction.
     */
    BackendManagerService.prototype.rotateScreen = function (direction) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/screenRotate', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('dir', direction),
        });
    };
    /** Takes the screenshot of the current screen of selected device */
    BackendManagerService.prototype.takeScreenshot = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/takeScreenshot');
    };
    /** Gets the scaled dimensions of the screenshot */
    BackendManagerService.prototype.getScaledScreenDimensions = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getScaledScreenDimensions');
    };
    /** Adds Image to image database */
    BackendManagerService.prototype.addImage = function (imgBase64Str) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/addImage', imgBase64Str);
    };
    /**
     * Gets scaled regions from the backend so that can be saved in the
     * action
     */
    BackendManagerService.prototype.getScaledRegions = function (regionsSelected) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getScaledRegions', JSON.stringify(regionsSelected));
    };
    /**
     * Gets scaled regions from the backend so that can be saved in the
     * action
     */
    BackendManagerService.prototype.deleteImage = function (refImgUuid) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + "/deleteImage", refImgUuid);
    };
    /**
     * Creates new project.
     */
    BackendManagerService.prototype.createProject = function (projectName) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/createProject', projectName);
    };
    /**
     * Deletes project.
     */
    BackendManagerService.prototype.deleteProject = function (projectId) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/deleteProjectByProjectId', projectId);
    };
    /**
     * Adds share with user list to current project
     */
    BackendManagerService.prototype.addShareWithUserListToProject = function (userList) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/addShareWithUserListToProject', userList);
    };
    /**
     * Gets project list that contains all the projects of current user.
     */
    BackendManagerService.prototype.getProjectList = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getProjectList');
    };
    /**
     * Gets project list that contains all the projects of the given user.
     */
    BackendManagerService.prototype.getProjectListByUsername = function (username) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getProjectListByUsername', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('username', username),
        });
    };
    /**
     * Sets current project after user selects from project list.
     */
    BackendManagerService.prototype.setCurrentProject = function (projectName) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/setCurrentProject', projectName);
    };
    /**
     * Fetches the methods available in the snippet validation action for the
     * selected package.
     * @param packageName name of the package of which the methods needs to
     *     fetched
     */
    BackendManagerService.prototype.getAllAvailableSnippetMethods = function (packageName) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getAllAvailableSnippetMethods', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('packageName', packageName),
        });
    };
    /** Fetches details information from ocr engine. */
    BackendManagerService.prototype.getOcrDetails = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getOcrDetails');
    };
    /** Start python debugger service */
    BackendManagerService.prototype.initPdbDebuggerServer = function (pythonDebugger) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/runPdbDebugger', pythonDebugger, this.OPTIONS);
    };
    /** Set break points in pdb debugger */
    BackendManagerService.prototype.pdbDebuggerBreak = function (breakLines) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/pdbDebuggerBreak', { params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('breakLines', breakLines) });
    };
    /** Remove break points in pdb debugger */
    BackendManagerService.prototype.pdbDebuggerClear = function (breakLines) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/pdbDebuggerClear', { params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('breakLines', breakLines) });
    };
    /** Continue in pdb debugger */
    BackendManagerService.prototype.pdbDebuggerContinue = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/pdbDebuggerContinue');
    };
    /** Step in in pdb debugger */
    BackendManagerService.prototype.pdbDebuggerStepIn = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/pdbDebuggerStepIn');
    };
    /** Next in pdb debugger */
    BackendManagerService.prototype.pdbDebuggerNext = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/pdbDebuggerNext');
    };
    /** Stop the pdb debugger */
    BackendManagerService.prototype.pdbDebuggerStop = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/stopPdbDebugger');
    };
    BackendManagerService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    BackendManagerService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], BackendManagerService);
    return BackendManagerService;
}());



/***/ }),

/***/ "KxXs":
/*!***************************************************************!*\
  !*** ./src/app/screen_validation_flow/validation_details.css ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n\n.input-highlight {\n  color:#3f51b5;\n}\n\n\n.mat-select-panel {\n  opacity: 0;\n  background: white;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkYXRpb25fZGV0YWlscy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7OztBQUdGO0VBQ0UsYUFBYTtBQUNmOzs7QUFFQTtFQUNFLFVBQVU7RUFDVixpQkFBaUI7QUFDbkIiLCJmaWxlIjoidmFsaWRhdGlvbl9kZXRhaWxzLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5cbi5pbnB1dC1oaWdobGlnaHQge1xuICBjb2xvcjojM2Y1MWI1O1xufVxuXG4ubWF0LXNlbGVjdC1wYW5lbCB7XG4gIG9wYWNpdHk6IDA7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xufVxuIl19 */");

/***/ }),

/***/ "L31Q":
/*!***********************************************************************!*\
  !*** ./src/app/popup_dialogs/hard_soft_import_action_info_dialog.css ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.info-table {\n  width: 100%;\n  display: table;\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.info-table tr {\n  border-bottom: 1px solid rgba(0,0,0,0.12);\n}\n\n.info-table td:nth-child(2) {\n  border-left: 1px solid rgba(0,0,0,0.12);\n  max-width: 400px;\n}\n\n.info-table td:nth-child(1) {\n  min-width: 150px;\n}\n\n.foot-note {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhcmRfc29mdF9pbXBvcnRfYWN0aW9uX2luZm9fZGlhbG9nLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtFQUNFLFdBQVc7RUFDWCxjQUFjO0VBQ2QseUJBQXlCO0VBQ3pCLGlCQUFpQjtBQUNuQjs7QUFDQTtFQUNFLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLHVDQUF1QztFQUN2QyxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCIiwiZmlsZSI6ImhhcmRfc29mdF9pbXBvcnRfYWN0aW9uX2luZm9fZGlhbG9nLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4uaW5mby10YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiB0YWJsZTtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XG59XG4uaW5mby10YWJsZSB0ciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMTIpO1xufVxuXG4uaW5mby10YWJsZSB0ZDpudGgtY2hpbGQoMikge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4xMik7XG4gIG1heC13aWR0aDogNDAwcHg7XG59XG5cbi5pbmZvLXRhYmxlIHRkOm50aC1jaGlsZCgxKSB7XG4gIG1pbi13aWR0aDogMTUwcHg7XG59XG4uZm9vdC1ub3RlIHtcbiAgbWFyZ2luLXRvcDogMTVweDtcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcbn1cbiJdfQ== */");

/***/ }),

/***/ "L7vy":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/screen_validation_flow/validation_details.ng.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"row\">Validation Step</div>\n<div class=\"row\" *ngIf=\"!validationActionDetails.ocrMode\">\n  <mat-form-field class=\"selector-css\">\n    <mat-select placeholder=\"Selector Type\" [(ngModel)]=\"validationActionDetails.elementSelectorType\"\n      (ngModelChange)=\"updateContentData(); emitUpdate();\" class=\"slot-selector\">\n      <mat-option *ngFor=\"let c of ELEMENT_SELECTOR_TYPES\" [value]=\"c.value\" class='mat-option'>\n        {{ c.displayText }}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n</div>\n<div class=\"row\">\n  <mat-form-field>\n    <input class=\"input-highlight\" matInput placeholder=\"Please input\" [(ngModel)]=\"validationActionDetails.contentData\"\n      (ngModelChange)=\"emitUpdate()\" name=\"contentDataInput\">\n  </mat-form-field>\n</div>\n<div>\n  <mat-checkbox placeholder=\"OCR Enabled\" [(ngModel)]=\"validationActionDetails.ocrMode\" (ngModelChange)=\"emitUpdate()\">\n    Use OCR</mat-checkbox>\n</div>\n<div class=\"row\" *ngIf=\"!validationActionDetails.ocrMode\">Advanced</div>\n<div *ngIf=\"!validationActionDetails.ocrMode\">\n  <mat-checkbox placeholder=\"Is Match Node Context\" [(ngModel)]=\"matchNodeContext\" (ngModelChange)=\"emitUpdate()\">Match\n    Node Context</mat-checkbox>\n</div>\n<div *ngIf=\"!matchNodeContext && !validationActionDetails.ocrMode\">\n  <mat-form-field class=\"selector-css\">\n    <mat-select placeholder=\"Match Type\" [(ngModel)]=\"validationActionDetails.contentMatchType\"\n      (ngModelChange)=\"emitUpdate()\" class=\"slot-selector\">\n      <mat-option *ngFor=\"let c of CONTENT_MATCH_TYPES\" [value]=\"c.value\" class='mat-option'>\n        {{ c.displayText }}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n  <mat-form-field>\n    <mat-select placeholder=\"Search Range\" [(ngModel)]=\"validationActionDetails.screenContentSearchType\"\n      (ngModelChange)=\"emitUpdate()\">\n      <mat-option *ngFor=\"let c of SCREEN_CONTENT_SEARCH_TYPES\" [value]=\"c.value\" class='mat-option'>\n        {{ c.displayText }}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n</div>\n<div class=\"row\" *ngIf=\"!isConditionalClick()\">\n  <mat-form-field>\n    <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"validationActionDetails.stopType\" (ngModelChange)=\"emitUpdate()\">\n      <mat-option *ngFor=\"let c of STOP_TYPES\" [value]=\"c.value\">{{ c.displayText }}</mat-option>\n    </mat-select>\n  </mat-form-field>\n  <button mat-mini-fab color=\"primary\" (click)=\"openValidationDetailsInfoDlg()\" matTooltip=\"Show Info\"\n    matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n    <i class=\"fa fa-info\"></i>\n  </button>\n</div>\n<div class=\"row\" *ngIf=\"isConditionalClick()\">\n  <b>Note: Validation failure for Conditional Click does not fail the test, it only bypasses the click operation.</b>\n</div>\n<div class=\"row\" *ngIf=\"isLoopValidation()\">Timeout (in seconds):\n  <mat-form-field>\n    <textarea rows=\"1\" cols=\"10\" matInput [(ngModel)]=\"validationActionDetails.timeout\"\n      (ngModelChange)=\"emitUpdate()\"></textarea>\n  </mat-form-field>\n  <mat-form-field>\n    <mat-select placeholder=\"Wait Until\" [(ngModel)]=\"selectedWaitUntilType\" (ngModelChange)=\"emitUpdate()\">\n      <mat-option *ngFor=\"let c of WAIT_UNTIL_TYPES\" [value]=\"c.value\">{{ c.displayText }}</mat-option>\n    </mat-select>\n  </mat-form-field>\n</div>\n\n<div class=\"row\" *ngIf=\"isScrollValidation()\">Max Scroll Number:\n  <mat-form-field>\n    <input class=\"input-highlight\" matInput placeholder=\"Max Scroll Number\"\n      [(ngModel)]=\"validationActionDetails.scrollMaxNumber\" (ngModelChange)=\"emitUpdate()\">\n  </mat-form-field>\n</div>\n<div *ngIf=\"showButtons\">\n  <button mat-raised-button color=\"primary\" name=\"previousPage\" (click)='previousPageClicked()'>Back</button>\n  <button mat-raised-button color=\"primary\" name=\"closePopup\" (click)='closePopup()'>Add Action</button>\n</div>\n");

/***/ }),

/***/ "M2sI":
/*!*************************!*\
  !*** ./src/app/app.css ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.bloc {\n  height: 100%;\n}\n\n.explanations {\n  padding: 15px;\n}\n\n.panel {\n  font-size: 100px;\n  font-weight: bold;\n  color: #cccccc;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  overflow: hidden;\n}\n\n.panel > p {\n  margin: 0;\n}\n\nbutton {\n  margin-bottom: 10px;\n}\n\n.example-sidenav-fab-container {\n  width: 500px;\n  height: 300px;\n  border: 1px solid rgba(0, 0, 0, 0.5);\n}\n\n.example-sidenav-fab-container md-sidenav {\n  max-width: 200px;\n}\n\n.example-sidenav-fab-container .mat-sidenav-content,\n.example-sidenav-fab-container md-sidenav {\n  display: flex;\n  overflow: visible;\n}\n\n.example-scrolling-content {\n  overflow: auto;\n  height: 100%;\n}\n\n.example-fab.mat-mini-fab {\n  position: absolute;\n  right: 20px;\n  bottom: 10px;\n}\n\n.main-container {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  height: 100%;\n}\n\n.main-body {\n  flex:1;\n  display: flex;\n}\n\n.sidevar-container {\n  flex:1;\n}\n\n.record-btn {\n  position: relative;\n  bottom: 50px;\n  left: 30px;\n  z-index: 2;\n}\n\n.main-col-container{\n  display: flex;\n}\n\n.main-col-middle{\n  display: 1;\n  width:700px;\n  background-color: #f5f5f5;\n}\n\n.main-col-right{\n  min-width: 300px;\n  background-color: #f5f5f5;\n}\n\n.main-container .main-toolbar {\n  background-color: #28a6da;\n}\n\n.device-prepare-overlay{\n  background-color:gray;\n  width: 100%;\n  height: 100%;\n  opacity: 0.5;\n  z-index: 99;\n  position: absolute;\n  top: 0px;\n}\n\n.device-prepare-overlay-progressbar {\n  width: 400px;\n   left: 45%;\n  top: 50%;\n}\n\n.handle-row {\n  width: 15px;\n  top: 50%;\n  left: -2px;\n  transform: translateX(-50%) rotate(270deg);\n  cursor: col-resize;;\n}\n\n.handle-column {\n  height: 15px;\n  left: 50%;\n  top: -4px;\n  cursor: row-resize;\n}\n\n.uicd-column-splitter{\n\n  background-color: #e5e5e5;\n  cursor: col-resize;\n  width: 8px;\n}\n\n.uicd-column-breaker {\n  cursor: column-resize;\n  background-color: #e5e5e5;\n  width: 3px;\n}\n\n.uicd-row-splitter{\n  background-color: #e5e5e5;\n  cursor: row-resize;\n  height: 8px;\n}\n\n.handle {\n  outline: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n       user-select: none;\n  z-index: 9999;\n  height: 5px;\n  display: block;\n  padding: 0;\n  margin: 0;\n  position: relative;\n  line-height: 0;\n}\n\n.footer-div {\n  background-color: #f5f5f5;\n  position: relative;\n}\n\n.footer-content {\n  position: absolute;\n  left: 50%;\n}\n\n.mat-tab-header {\n  background-color: #f5f5f5;\n}\n\n.toolbar-icon {\n  padding: 0 14px;\n}\n\n.toolbar-spacer {\n  flex: 1 1 auto;\n}\n\n.test-case-wrapper {\n  display: flex;\n  height: 100%;\n}\n\n.log-area-wrapper {\n  display: flex;\n  height: 500px;\n  width: 100%;\n}\n\n.recorder-area-wrapper {\n  display: flex;\n  height: 500px;\n}\n\n.workspace-log-splitter {\n  overflow: hidden !important;\n}\n\n.split-body {\n  display: flex;\n  overflow: auto;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7RUFDRSxjQUFjO0VBQ2QsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBQ0E7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsY0FBYztFQUNkLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixvQkFBb0I7RUFDcEIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsTUFBTTtFQUNOLGFBQWE7QUFDZjs7QUFDQTtFQUNFLE1BQU07QUFDUjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osVUFBVTtFQUNWLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFVBQVU7RUFDVixXQUFXO0VBQ1gseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsWUFBWTtFQUNaLFlBQVk7RUFDWixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLFFBQVE7QUFDVjs7QUFFQTtFQUNFLFlBQVk7R0FDWCxTQUFTO0VBQ1YsUUFBUTtBQUNWOztBQUNBO0VBQ0UsV0FBVztFQUNYLFFBQVE7RUFDUixVQUFVO0VBQ1YsMENBQTBDO0VBQzFDLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixTQUFTO0VBQ1QsU0FBUztFQUNULGtCQUFrQjtBQUNwQjs7QUFFQTs7RUFFRSx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQix5QkFBeUI7RUFDekIsVUFBVTtBQUNaOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IseUJBQXlCO0VBQ3pCLHNCQUFpQjtPQUFqQixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLFdBQVc7RUFDWCxjQUFjO0VBQ2QsVUFBVTtFQUNWLFNBQVM7RUFDVCxrQkFBa0I7RUFDbEIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztBQUNYOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsYUFBYTtBQUNmOztBQUVBO0VBQ0UsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7QUFDaEIiLCJmaWxlIjoiYXBwLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG46aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uYmxvYyB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmV4cGxhbmF0aW9ucyB7XG4gIHBhZGRpbmc6IDE1cHg7XG59XG5cbi5wYW5lbCB7XG4gIGZvbnQtc2l6ZTogMTAwcHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogI2NjY2NjYztcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLnBhbmVsID4gcCB7XG4gIG1hcmdpbjogMDtcbn1cbmJ1dHRvbiB7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5leGFtcGxlLXNpZGVuYXYtZmFiLWNvbnRhaW5lciB7XG4gIHdpZHRoOiA1MDBweDtcbiAgaGVpZ2h0OiAzMDBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjUpO1xufVxuXG4uZXhhbXBsZS1zaWRlbmF2LWZhYi1jb250YWluZXIgbWQtc2lkZW5hdiB7XG4gIG1heC13aWR0aDogMjAwcHg7XG59XG5cbi5leGFtcGxlLXNpZGVuYXYtZmFiLWNvbnRhaW5lciAubWF0LXNpZGVuYXYtY29udGVudCxcbi5leGFtcGxlLXNpZGVuYXYtZmFiLWNvbnRhaW5lciBtZC1zaWRlbmF2IHtcbiAgZGlzcGxheTogZmxleDtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG5cbi5leGFtcGxlLXNjcm9sbGluZy1jb250ZW50IHtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmV4YW1wbGUtZmFiLm1hdC1taW5pLWZhYiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDIwcHg7XG4gIGJvdHRvbTogMTBweDtcbn1cblxuLm1haW4tY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLm1haW4tYm9keSB7XG4gIGZsZXg6MTtcbiAgZGlzcGxheTogZmxleDtcbn1cbi5zaWRldmFyLWNvbnRhaW5lciB7XG4gIGZsZXg6MTtcbn1cblxuLnJlY29yZC1idG4ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvdHRvbTogNTBweDtcbiAgbGVmdDogMzBweDtcbiAgei1pbmRleDogMjtcbn1cblxuLm1haW4tY29sLWNvbnRhaW5lcntcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLm1haW4tY29sLW1pZGRsZXtcbiAgZGlzcGxheTogMTtcbiAgd2lkdGg6NzAwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XG59XG5cbi5tYWluLWNvbC1yaWdodHtcbiAgbWluLXdpZHRoOiAzMDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcbn1cblxuLm1haW4tY29udGFpbmVyIC5tYWluLXRvb2xiYXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjhhNmRhO1xufVxuXG4uZGV2aWNlLXByZXBhcmUtb3ZlcmxheXtcbiAgYmFja2dyb3VuZC1jb2xvcjpncmF5O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvcGFjaXR5OiAwLjU7XG4gIHotaW5kZXg6IDk5O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMHB4O1xufVxuXG4uZGV2aWNlLXByZXBhcmUtb3ZlcmxheS1wcm9ncmVzc2JhciB7XG4gIHdpZHRoOiA0MDBweDtcbiAgIGxlZnQ6IDQ1JTtcbiAgdG9wOiA1MCU7XG59XG4uaGFuZGxlLXJvdyB7XG4gIHdpZHRoOiAxNXB4O1xuICB0b3A6IDUwJTtcbiAgbGVmdDogLTJweDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSgyNzBkZWcpO1xuICBjdXJzb3I6IGNvbC1yZXNpemU7O1xufVxuXG4uaGFuZGxlLWNvbHVtbiB7XG4gIGhlaWdodDogMTVweDtcbiAgbGVmdDogNTAlO1xuICB0b3A6IC00cHg7XG4gIGN1cnNvcjogcm93LXJlc2l6ZTtcbn1cblxuLnVpY2QtY29sdW1uLXNwbGl0dGVye1xuXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNWU1ZTU7XG4gIGN1cnNvcjogY29sLXJlc2l6ZTtcbiAgd2lkdGg6IDhweDtcbn1cblxuLnVpY2QtY29sdW1uLWJyZWFrZXIge1xuICBjdXJzb3I6IGNvbHVtbi1yZXNpemU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlNWU1ZTU7XG4gIHdpZHRoOiAzcHg7XG59XG5cbi51aWNkLXJvdy1zcGxpdHRlcntcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZTVlNTtcbiAgY3Vyc29yOiByb3ctcmVzaXplO1xuICBoZWlnaHQ6IDhweDtcbn1cblxuLmhhbmRsZSB7XG4gIG91dGxpbmU6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICB6LWluZGV4OiA5OTk5O1xuICBoZWlnaHQ6IDVweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsaW5lLWhlaWdodDogMDtcbn1cblxuLmZvb3Rlci1kaXYge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5mb290ZXItY29udGVudCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNTAlO1xufVxuXG4ubWF0LXRhYi1oZWFkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xufVxuXG4udG9vbGJhci1pY29uIHtcbiAgcGFkZGluZzogMCAxNHB4O1xufVxuXG4udG9vbGJhci1zcGFjZXIge1xuICBmbGV4OiAxIDEgYXV0bztcbn1cblxuLnRlc3QtY2FzZS13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4ubG9nLWFyZWEtd3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogNTAwcHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4ucmVjb3JkZXItYXJlYS13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiA1MDBweDtcbn1cblxuLndvcmtzcGFjZS1sb2ctc3BsaXR0ZXIge1xuICBvdmVyZmxvdzogaGlkZGVuICFpbXBvcnRhbnQ7XG59XG5cbi5zcGxpdC1ib2R5IHtcbiAgZGlzcGxheTogZmxleDtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG4iXX0= */");

/***/ }),

/***/ "MB+p":
/*!**************************************************************!*\
  !*** ./src/app/screen_validation_flow/validation_details.ts ***!
  \**************************************************************/
/*! exports provided: ValidationDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationDetailsComponent", function() { return ValidationDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_validation_details_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./validation_details.ng.html */ "L7vy");
/* harmony import */ var _validation_details_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation_details.css */ "KxXs");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/rect */ "aFBn");
/* harmony import */ var _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/screen_validation_constants */ "vBhh");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
/* harmony import */ var _validation_info__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./validation_info */ "yhUx");
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












/** Fetch the screen content */
var ValidationDetailsComponent = /** @class */ (function () {
    function ValidationDetailsComponent(backendManagerService, dialog) {
        this.backendManagerService = backendManagerService;
        this.dialog = dialog;
        this.CONTENT_MATCH_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["CONTENT_MATCH_TYPES"];
        this.ELEMENT_SELECTOR_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ELEMENT_SELECTOR_TYPES"];
        this.SCREEN_CONTENT_SEARCH_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["SCREEN_CONTENT_SEARCH_TYPES"];
        this.STOP_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["STOP_TYPES"];
        this.WAIT_UNTIL_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["WAIT_UNTIL_TYPES"];
        this.showButtons = true;
        /** Handle on-destroy Subject, used to unsubscribe. */
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
        this.validationActionDetails = {
            actionType: '',
            contentData: '',
            selectedBounds: undefined,
            contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ContentMatchType"].EQUALS,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ContextStorageType"].TEXT_BASED,
            elementSelectorType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ElementSelectorType"]
                .DISPLAY_TEXT,
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ScreenContentSearchType"]
                .FULLSCREEN,
            scrollDirectionType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["DirectionType"].UP,
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["StopType"].STOP_TEST_IF_FALSE,
            timeout: 60,
            waitUntilDisappear: false,
            scrollMaxNumber: 30,
            ocrMode: false,
        };
        this.validationActionDetailsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.actionAdded = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.previousPage = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
    }
    ValidationDetailsComponent.prototype.fetchContentData = function () {
        var _this = this;
        if (!this.validationActionDetails.selectedBounds) {
            return;
        }
        // Need add delay(0) here to avoid the "Expression has changed after it was
        // checked" issue.
        this.backendManagerService
            .getContentFromScreen(this.validationActionDetails.selectedBounds)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["delay"])(0), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (screenContentSummary) {
            _this.screenContentSummary = screenContentSummary;
            _this.updateContentData();
        });
    };
    Object.defineProperty(ValidationDetailsComponent.prototype, "selectedBounds", {
        set: function (selectedBounds) {
            this.validationActionDetails.selectedBounds = selectedBounds;
            this.fetchContentData();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationDetailsComponent.prototype, "selectedActionType", {
        set: function (actionType) {
            this.validationActionDetails.actionType = actionType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationDetailsComponent.prototype, "scrollDirectionType", {
        set: function (scrollDirectionType) {
            this.validationActionDetails.scrollDirectionType = scrollDirectionType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationDetailsComponent.prototype, "selectedWaitUntilType", {
        get: function () {
            if (this.validationActionDetails.waitUntilDisappear) {
                return _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["WaitUntilType"].WAIT_UNTIL_DISAPPEAR;
            }
            return _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["WaitUntilType"].WAIT_UNTIL_APPEAR;
        },
        /**
         * WaitUntilType and MatchNodeContext doesn't align with backend definition,
         * use the set/get function to convert between boolean and enum
         */
        set: function (value) {
            if (value ===
                _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["WaitUntilType"].WAIT_UNTIL_DISAPPEAR) {
                this.validationActionDetails.waitUntilDisappear = true;
                return;
            }
            this.validationActionDetails.waitUntilDisappear = false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationDetailsComponent.prototype, "matchNodeContext", {
        get: function () {
            return this.validationActionDetails.contextStorageType ===
                _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ContextStorageType"].CONTEXT_BASED;
        },
        set: function (value) {
            if (value) {
                this.validationActionDetails.contextStorageType =
                    _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ContextStorageType"].CONTEXT_BASED;
                return;
            }
            this.validationActionDetails.contextStorageType =
                _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ContextStorageType"].TEXT_BASED;
        },
        enumerable: false,
        configurable: true
    });
    ValidationDetailsComponent.prototype.isConditionalClick = function () {
        return this.validationActionDetails.actionType ===
            _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ValidationActionType"].CONDITION_CLICK_ACTION;
    };
    ValidationDetailsComponent.prototype.isLoopValidation = function () {
        return this.validationActionDetails.actionType ===
            _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ValidationActionType"]
                .LOOP_SCREEN_CONTENT_VALIDATION_ACTION;
    };
    ValidationDetailsComponent.prototype.isScrollValidation = function () {
        return this.validationActionDetails.actionType ===
            _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ValidationActionType"]
                .SCROLL_SCREEN_CONTENT_VALIDATION_ACTION;
    };
    ValidationDetailsComponent.prototype.openValidationDetailsInfoDlg = function () {
        this.dialog.open(_validation_info__WEBPACK_IMPORTED_MODULE_11__["ValidationInfoDialogComponent"], {
            width: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
        });
    };
    ValidationDetailsComponent.prototype.updateContentData = function () {
        if (!this.screenContentSummary) {
            return;
        }
        switch (this.validationActionDetails.elementSelectorType) {
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ElementSelectorType"].DISPLAY_TEXT:
                this.validationActionDetails.contentData =
                    this.screenContentSummary.displayText;
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ElementSelectorType"].RESOURCE_ID:
                this.validationActionDetails.contentData =
                    this.screenContentSummary.resourceId;
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_9__["ElementSelectorType"].CHECK:
                this.validationActionDetails.contentData =
                    (String)(this.screenContentSummary.checked);
                break;
            default:
                break;
        }
    };
    ValidationDetailsComponent.prototype.emitUpdate = function () {
        this.validationActionDetailsChange.emit(this.validationActionDetails);
    };
    ValidationDetailsComponent.prototype.closePopup = function () {
        var _this = this;
        this.backendManagerService.addValidationStep(this.validationActionDetails)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.actionAdded.emit();
        });
    };
    ValidationDetailsComponent.prototype.previousPageClicked = function () {
        this.previousPage.emit();
    };
    ValidationDetailsComponent.prototype.ngOnDestroy = function () {
        // Unsubscribes all pending subscriptions.
        this.destroyed.next();
    };
    ValidationDetailsComponent.ctorParameters = function () { return [
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_10__["BackendManagerService"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] }
    ]; };
    ValidationDetailsComponent.propDecorators = {
        showButtons: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        validationActionDetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        validationActionDetailsChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        selectedBounds: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        selectedActionType: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        scrollDirectionType: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        actionAdded: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        previousPage: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }]
    };
    ValidationDetailsComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'validation-details',
            template: _raw_loader_validation_details_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_validation_details_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_services_backend_manager_service__WEBPACK_IMPORTED_MODULE_10__["BackendManagerService"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"]])
    ], ValidationDetailsComponent);
    return ValidationDetailsComponent;
}());



/***/ }),

/***/ "MUIB":
/*!*******************************************************!*\
  !*** ./src/app/popup_dialogs/python_editor_simple.ts ***!
  \*******************************************************/
/*! exports provided: PythonEditorSimpleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PythonEditorSimpleComponent", function() { return PythonEditorSimpleComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_python_editor_simple_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./python_editor_simple.ng.html */ "bQ7Z");
/* harmony import */ var _python_editor_simple_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./python_editor_simple.css */ "k75F");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "qCKp");
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





/** Dialog allows user to override the backend global variables */
var PythonEditorSimpleComponent = /** @class */ (function () {
    function PythonEditorSimpleComponent() {
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_4__["ReplaySubject"](1);
        this.pythonScript = '';
    }
    PythonEditorSimpleComponent.prototype.ngOnInit = function () { };
    PythonEditorSimpleComponent.prototype.setTextToEditor = function (text) {
        this.pythonScript = text;
    };
    PythonEditorSimpleComponent.prototype.getTextFromEditor = function () {
        return this.pythonScript;
    };
    PythonEditorSimpleComponent.prototype.ngOnDestroy = function () {
        this.destroyed.next();
    };
    PythonEditorSimpleComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'python-editor-simple',
            template: _raw_loader_python_editor_simple_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_python_editor_simple_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        })
    ], PythonEditorSimpleComponent);
    return PythonEditorSimpleComponent;
}());



/***/ }),

/***/ "MuLV":
/*!*************************************************************!*\
  !*** ./src/app/test_explorer/share_with_project_dialog.css ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlX3dpdGhfcHJvamVjdF9kaWFsb2cuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFIiwiZmlsZSI6InNoYXJlX3dpdGhfcHJvamVjdF9kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbiJdfQ== */");

/***/ }),

/***/ "ODag":
/*!*********************************************************!*\
  !*** ./src/app/test_explorer/import_project_dialog.css ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.inputField {\n    width: 100%;\n}\n\n.waitingOverlay {\n  background-color:gray;\n  width: 100%;\n  height: 100%;\n  opacity: 0.5;\n  z-index: 99;\n  top: 0px;\n  margin-top: 20px;\n}\n\n.hiddenInput {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltcG9ydF9wcm9qZWN0X2RpYWxvZy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsV0FBVztFQUNYLFlBQVk7RUFDWixZQUFZO0VBQ1osV0FBVztFQUNYLFFBQVE7RUFDUixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2YiLCJmaWxlIjoiaW1wb3J0X3Byb2plY3RfZGlhbG9nLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4uaW5wdXRGaWVsZCB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbi53YWl0aW5nT3ZlcmxheSB7XG4gIGJhY2tncm91bmQtY29sb3I6Z3JheTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb3BhY2l0eTogMC41O1xuICB6LWluZGV4OiA5OTtcbiAgdG9wOiAwcHg7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbi5oaWRkZW5JbnB1dCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59Il19 */");

/***/ }),

/***/ "OQgS":
/*!************************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/snippet_action_info_dialog.css ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.info-table {\n  width: 100%;\n  display: table;\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.info-table tr {\n  border-bottom: 1px solid rgba(0,0,0,0.12);\n}\n\n.info-table td:nth-child(2) {\n  border-left: 1px solid rgba(0,0,0,0.12);\n  max-width: 400px;\n}\n\n.info-table td:nth-child(1) {\n\n  min-width: 150px;\n}\n\n.foot-note {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNuaXBwZXRfYWN0aW9uX2luZm9fZGlhbG9nLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtFQUNFLFdBQVc7RUFDWCxjQUFjO0VBQ2QseUJBQXlCO0VBQ3pCLGlCQUFpQjtBQUNuQjs7QUFDQTtFQUNFLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLHVDQUF1QztFQUN2QyxnQkFBZ0I7QUFDbEI7O0FBRUE7O0VBRUUsZ0JBQWdCO0FBQ2xCOztBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtBQUNyQiIsImZpbGUiOiJzbmlwcGV0X2FjdGlvbl9pbmZvX2RpYWxvZy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLmluZm8tdGFibGUge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogdGFibGU7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIGJvcmRlci1zcGFjaW5nOiAwO1xufVxuLmluZm8tdGFibGUgdHIge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLDAsMCwwLjEyKTtcbn1cblxuLmluZm8tdGFibGUgdGQ6bnRoLWNoaWxkKDIpIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMTIpO1xuICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuXG4uaW5mby10YWJsZSB0ZDpudGgtY2hpbGQoMSkge1xuXG4gIG1pbi13aWR0aDogMTUwcHg7XG59XG4uZm9vdC1ub3RlIHtcbiAgbWFyZ2luLXRvcDogMTVweDtcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcbn0iXX0= */");

/***/ }),

/***/ "OaC0":
/*!***************************************************!*\
  !*** ./src/app/ui_tree_viewer/ui_tree_viewer.css ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.attributeList {\n  text-align: left;\n  float: left;\n  overflow: auto;\n}\n\n.treeArea{\n  float: left;\n  overflow: auto;\n  max-height: 400px;\n}\n\n.attributeItem {\n  width: 100%;\n  padding: 0px 5px 0px 0px;\n  border: 0.5px solid grey;\n}\n\n.attributeTitle {\n  display: inline-block;\n  width: 13rem;\n  padding: 5px;\n  background-color: whitesmoke;\n}\n\n.attributeValue {\n  display: inline-block;\n  padding: 5px 5px 5px 5px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVpX3RyZWVfdmlld2VyLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtFQUNFLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxjQUFjO0VBQ2QsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsV0FBVztFQUNYLHdCQUF3QjtFQUN4Qix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsWUFBWTtFQUNaLFlBQVk7RUFDWiw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsd0JBQXdCO0FBQzFCIiwiZmlsZSI6InVpX3RyZWVfdmlld2VyLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4uYXR0cmlidXRlTGlzdCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGZsb2F0OiBsZWZ0O1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLnRyZWVBcmVhe1xuICBmbG9hdDogbGVmdDtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIG1heC1oZWlnaHQ6IDQwMHB4O1xufVxuXG4uYXR0cmlidXRlSXRlbSB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwcHggNXB4IDBweCAwcHg7XG4gIGJvcmRlcjogMC41cHggc29saWQgZ3JleTtcbn1cblxuLmF0dHJpYnV0ZVRpdGxlIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMTNyZW07XG4gIHBhZGRpbmc6IDVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcbn1cblxuLmF0dHJpYnV0ZVZhbHVlIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiA1cHggNXB4IDVweCA1cHg7XG59XG4iXX0= */");

/***/ }),

/***/ "Ojqq":
/*!*****************************************************!*\
  !*** ./src/app/services/devices_manager_service.ts ***!
  \*****************************************************/
/*! exports provided: DeviceInfo, DevicesManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceInfo", function() { return DeviceInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevicesManagerService", function() { return DevicesManagerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/rect */ "aFBn");
/* harmony import */ var _backend_manager_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./backend_manager_service */ "Kd50");
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





/** Maintains the connected device details information */
var DeviceInfo = /** @class */ (function () {
    function DeviceInfo(jsonData) {
        // tslint:disable:no-any no-unnecessary-type-assertion
        var obj = JSON.parse(jsonData);
        // tslint:enable:no-any no-unnecessary-type-assertion
        this.serial = obj['serial'];
        /**
         * backend are returning two different names, can not change backend before
         * the frontend full merged. keep this two for now.
         */
        this.deviceId = obj['deviceId'];
        this.product = obj['product'];
        this.model = obj['model'];
        this.device = obj['device'];
        this.minicapPort = obj['minicapPort'];
        this.physicalWidth = obj['physicalWidth'];
        this.physicalHeight = obj['physicalHeight'];
        this.slot = -1;
    }
    return DeviceInfo;
}());

/** Manages the connected devices */
var DevicesManagerService = /** @class */ (function () {
    function DevicesManagerService(backendManagerService) {
        this.backendManagerService = backendManagerService;
        this.initedDevices = [];
        this.currentDeviceSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this.initedDevicesSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
    }
    /** Gets adb connected devices from backend */
    DevicesManagerService.prototype.getDevicesList = function () {
        return this.backendManagerService.getDevicesList();
    };
    /**
     * Gets subject of current device, when current device changed, we need update
     * the screen streaming component etc.
     */
    DevicesManagerService.prototype.getCurrentDeviceSubject = function () {
        return this.currentDeviceSubject;
    };
    /** Gets subject of currently initalized devices */
    DevicesManagerService.prototype.getInitedDevicesSubject = function () {
        return this.initedDevicesSubject;
    };
    /** Gets devices list that already connected to uicd */
    DevicesManagerService.prototype.getInitedDevices = function () {
        return this.initedDevices;
    };
    /** Gets current selected device */
    DevicesManagerService.prototype.getCurrentDevice = function () {
        return this.currentDevice;
    };
    /** Gets current selected device physical screen size in the rect format */
    DevicesManagerService.prototype.getDevicePhysicalScreenSize = function () {
        if (this.currentDevice === undefined) {
            return new _constants_rect__WEBPACK_IMPORTED_MODULE_3__["Rect"](0, 0, 0, 0);
        }
        return new _constants_rect__WEBPACK_IMPORTED_MODULE_3__["Rect"](0, 0, this.currentDevice.physicalWidth, this.currentDevice.physicalHeight);
    };
    /**
     * Sets devices list that already connected to uicd
     * @param DeviceInfo[]
     */
    DevicesManagerService.prototype.setInitedDevices = function (devicesInfo) {
        this.initedDevices = devicesInfo;
        this.initedDevicesSubject.next(devicesInfo);
    };
    DevicesManagerService.prototype.updateCurrentDevice = function (deviceId) {
        if (this.initedDevices.length <= 0) {
            return;
        }
        this.currentDevice =
            this.initedDevices.find(function (d) { return d.deviceId === deviceId; });
        if (this.currentDevice === undefined) {
            this.currentDevice = this.initedDevices[0];
        }
        this.emitUpdateCurrentDeviceEvent();
    };
    DevicesManagerService.prototype.emitUpdateCurrentDeviceEvent = function () {
        this.currentDeviceSubject.next(this.currentDevice);
    };
    DevicesManagerService.ctorParameters = function () { return [
        { type: _backend_manager_service__WEBPACK_IMPORTED_MODULE_4__["BackendManagerService"] }
    ]; };
    DevicesManagerService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_backend_manager_service__WEBPACK_IMPORTED_MODULE_4__["BackendManagerService"]])
    ], DevicesManagerService);
    return DevicesManagerService;
}());



/***/ }),

/***/ "P7fF":
/*!*************************************************!*\
  !*** ./src/app/test_explorer/test_explorer.css ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.action-list-tree {\n  height: 100%;\n}\n\n.test-case-header {\n  background-color: #f5f5f5;\n  margin: 0px;\n}\n\n.test-case-title {\n  font-size: 18px;\n  display: inline-flex;\n  padding-left: 15px;\n  padding-bottom: 5px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.workspaceButton {\n  float: right;\n  display: inline-flex;\n  margin-top: 8px;\n  margin-bottom: 8px;\n  margin-right: 2px;\n}\n\nli {\n  overflow: hidden;\n  background: #f5f5f5;\n  list-style: none;\n  white-space:nowrap;\n  margin-right: 10px;\n  display: inline-flex;\n  line-height: 30px;\n  text-align: center;\n}\n\nli a {\n    opacity: 0;\n    color: #f5f5f5;\n    max-width: 0;\n    display: inline-flex;\n    text-decoration: none;\n    transition: max-width 1s ease-out .1s, opacity 1s ease-out .1s, color;\n    padding-left: 2px;\n}\n\nli a:hover {\n    color: black;\n}\n\nli:hover a {\n    opacity: 1;\n    max-width: 150px;\n    transition: max-width 1s ease-out .1s, opacity 1s ease-out .1s, color .2s;\n}\n\n.fa-lg {\n  line-height: 30px;\n}\n\n.mat-raised-button {\n  float:right;\n  margin-top: 5px;\n  margin-right: 5px;\n}\n\n.trash-hover:hover{\n  background-color: #ff6666;\n}\n\n.project-button{\n  padding-left:6px;\n}\n\n.trash-align{\n  padding: 0;\n  min-width: 32px;\n  box-shadow:none;\n  float: left;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RfZXhwbG9yZXIuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGVBQWU7RUFDZixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG9CQUFvQjtFQUNwQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsY0FBYztJQUNkLFlBQVk7SUFDWixvQkFBb0I7SUFDcEIscUJBQXFCO0lBQ3JCLHFFQUFxRTtJQUNyRSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLGdCQUFnQjtJQUNoQix5RUFBeUU7QUFDN0U7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsZUFBZTtFQUNmLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixlQUFlO0VBQ2YsZUFBZTtFQUNmLFdBQVc7QUFDYiIsImZpbGUiOiJ0ZXN0X2V4cGxvcmVyLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4uYWN0aW9uLWxpc3QtdHJlZSB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLnRlc3QtY2FzZS1oZWFkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xuICBtYXJnaW46IDBweDtcbn1cblxuLnRlc3QtY2FzZS10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIHBhZGRpbmctbGVmdDogMTVweDtcbiAgcGFkZGluZy1ib3R0b206IDVweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLndvcmtzcGFjZUJ1dHRvbiB7XG4gIGZsb2F0OiByaWdodDtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBtYXJnaW4tcmlnaHQ6IDJweDtcbn1cblxubGkge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICBsaXN0LXN0eWxlOiBub25lO1xuICB3aGl0ZS1zcGFjZTpub3dyYXA7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmxpIGEge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgY29sb3I6ICNmNWY1ZjU7XG4gICAgbWF4LXdpZHRoOiAwO1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICB0cmFuc2l0aW9uOiBtYXgtd2lkdGggMXMgZWFzZS1vdXQgLjFzLCBvcGFjaXR5IDFzIGVhc2Utb3V0IC4xcywgY29sb3I7XG4gICAgcGFkZGluZy1sZWZ0OiAycHg7XG59XG5cbmxpIGE6aG92ZXIge1xuICAgIGNvbG9yOiBibGFjaztcbn1cblxubGk6aG92ZXIgYSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICBtYXgtd2lkdGg6IDE1MHB4O1xuICAgIHRyYW5zaXRpb246IG1heC13aWR0aCAxcyBlYXNlLW91dCAuMXMsIG9wYWNpdHkgMXMgZWFzZS1vdXQgLjFzLCBjb2xvciAuMnM7XG59XG5cbi5mYS1sZyB7XG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xufVxuXG4ubWF0LXJhaXNlZC1idXR0b24ge1xuICBmbG9hdDpyaWdodDtcbiAgbWFyZ2luLXRvcDogNXB4O1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxuLnRyYXNoLWhvdmVyOmhvdmVye1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY2NjY2O1xufVxuXG4ucHJvamVjdC1idXR0b257XG4gIHBhZGRpbmctbGVmdDo2cHg7XG59XG5cbi50cmFzaC1hbGlnbntcbiAgcGFkZGluZzogMDtcbiAgbWluLXdpZHRoOiAzMnB4O1xuICBib3gtc2hhZG93Om5vbmU7XG4gIGZsb2F0OiBsZWZ0O1xufVxuIl19 */");

/***/ }),

/***/ "PqgP":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/popup_dialogs/replay_details_dialog.ng.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h3 mat-dialog-title> Test Result: <span [class]=\"testStatusColor\">{{data.playStatus}}</span></h3>\n<div mat-dialog-content fxLayout=\"column\">\n  <div #jsTree> </div>\n  <mat-grid-list cols=\"3\" rowHeight=\"300px\">\n    <mat-grid-tile *ngFor=\"let tile of outputList\">\n      <img height = \"300px\" [src]=\"tile.path\" />\n    </mat-grid-tile>\n  </mat-grid-list>\n</div>\n");

/***/ }),

/***/ "Ps2F":
/*!****************************************************************!*\
  !*** ./src/app/popup_dialogs/python_debugger_simple_dialog.ts ***!
  \****************************************************************/
/*! exports provided: PythonDebuggerSimpleDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PythonDebuggerSimpleDialog", function() { return PythonDebuggerSimpleDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_python_debugger_simple_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./python_debugger_simple_dialog.ng.html */ "tMgY");
/* harmony import */ var _python_debugger_simple_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./python_debugger_simple_dialog.css */ "JOkJ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/actions */ "QWWV");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/control_message_service */ "Etwr");
/* harmony import */ var _python_editor_simple__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./python_editor_simple */ "MUIB");
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











/**
 * Pdb debugger component for python in UICD
 */
var PythonDebuggerSimpleDialog = /** @class */ (function () {
    function PythonDebuggerSimpleDialog(backendManagerService, controlMessageService, dialogRef, actionData) {
        this.backendManagerService = backendManagerService;
        this.controlMessageService = controlMessageService;
        this.dialogRef = dialogRef;
        this.actionData = actionData;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
        this.pythonScript = '';
        this.pdbDebuggerOption = '';
        this.breakPointMap = new Map();
        if (this.actionData) { // from action edit dialog
            this.pythonScript = this.actionData.script;
        }
    }
    PythonDebuggerSimpleDialog.prototype.ngAfterViewInit = function () {
        // Without assert, compiler will give compile error
        // see go/strict-prop-init-fix for more details
        this.pythonEditorSimpleComponent.setTextToEditor(this.pythonScript);
    };
    PythonDebuggerSimpleDialog.prototype.ngOnDestroy = function () { };
    PythonDebuggerSimpleDialog.prototype.saveAction = function () {
        var _this = this;
        this.pythonScript = this.pythonEditorSimpleComponent.getTextFromEditor();
        if (this.actionData) {
            this.actionData.script = this.pythonScript;
            this.backendManagerService.updateActionMetadata(this.actionData)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
                .subscribe(function () {
                _this.controlMessageService.sendRefreshWorkflowMsg();
                _this.dialogRef.close();
            });
            return;
        }
        this.actionData = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].PYTHON_SCRIPT_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].PYTHON_SCRIPT_ACTION.type,
            script: this.pythonScript,
            expectedReturnCode: 0,
        };
        this.backendManagerService.addActionToWorkflow(this.actionData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.controlMessageService.sendRefreshWorkflowMsg();
            _this.dialogRef.close();
        });
    };
    PythonDebuggerSimpleDialog.logMaxSize = 1000;
    PythonDebuggerSimpleDialog.ctorParameters = function () { return [
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_9__["ControlMessageService"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
    ]; };
    PythonDebuggerSimpleDialog.propDecorators = {
        pythonEditorSimpleComponent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_python_editor_simple__WEBPACK_IMPORTED_MODULE_10__["PythonEditorSimpleComponent"],] }]
    };
    PythonDebuggerSimpleDialog = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'python-debugger-simple-dialog',
            template: _raw_loader_python_debugger_simple_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_python_debugger_simple_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_9__["ControlMessageService"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"], Object])
    ], PythonDebuggerSimpleDialog);
    return PythonDebuggerSimpleDialog;
}());



/***/ }),

/***/ "QFgC":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/screen_validation_flow/validation_info.ng.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n    <h2>Validation Option Details</h2>\n    <h3>Match Node Context</h3>\n    <table class='info-table'>\n        <thead>\n          <tr>\n              <th>Type</th>\n              <th>Description</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n              <td>True</td>\n              <td>Match Context(UI hierarchy based match,\n                search the element not only by the text, but also by the element around it).\n                Useful when doing the condition click.\n              </td>\n          </tr>\n          <tr>\n              <td>False</td>\n              <td>Directly match the target text.</td>\n          </tr>\n        </tbody>\n      </table>\n      <h3>Search Range</h3>\n      <table class='info-table'>\n        <thead>\n          <tr>\n              <th>Type</th>\n              <th>Description</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n              <td>Strict</td>\n              <td>Search for text within a 100px radius on the screen (Physical device resolution).</td>\n          </tr>\n          <tr>\n              <td>Around</td>\n            <td><b>Default value</b>. Search for text within a 300px radius on the screen (Physical device resolution).</td>\n          </tr>\n          <tr>\n              <td>Full Screen</td>\n              <td>Search for text on the entire screen. Note: Only use this if the text is unique enough to only appear once on the screen.</td>\n          </tr>\n        </tbody>\n      </table>\n\n      <h3>Stop Type</h3>\n      <table class='info-table'>\n          <thead>\n            <tr>\n                <th>Type</th>\n                <th>Description</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n                <td>Fail Test If Validation False</td>\n                <td>Stop and fail the test if the validation is false.</td>\n            </tr>\n            <tr>\n                <td>Fail Test If Validation True</td>\n              <td>Stop and fail the test if the validation is true.</td>\n            </tr>\n            <tr>\n                <td>Stop Current Compound If False</td>\n                <td>Break the current compound action if the validation is false but continue test sequence. Note: This validation does not fail the test.</td>\n            </tr>\n            <tr>\n                <td>Stop Current Compound If True</td>\n                <td>Break the current compound action if the validation is true but continue test sequence. Note: This validation does not fail the test.</td>\n            </tr>\n          </tbody>\n        </table>\n\n      <div class=\"foot-note\" >*More details on uicd userguide</div>\n      <button mat-raised-button color=\"primary\" (click)=\"onOkClick()\">OK</button>\n  </div>\n");

/***/ }),

/***/ "QWWV":
/*!**************************************!*\
  !*** ./src/app/constants/actions.ts ***!
  \**************************************/
/*! exports provided: ACTIONS, actionModelFromJson, WorkflowModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTIONS", function() { return ACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionModelFromJson", function() { return actionModelFromJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkflowModel", function() { return WorkflowModel; });
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
/** ACTION infos */
var ACTIONS = {
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
    PYTHON_SCRIPT_ACTION: {
        actionType: 'PYTHON_SCRIPT_ACTION',
        type: 'PythonScriptAction',
        shortName: 'PYSCRIPT',
        color: 'tomato'
    },
};
/** Function to generate ActionModel from JSON data which backend returns. */
function actionModelFromJson(jsonData, index) {
    // tslint:disable:no-any no-unnecessary-type-assertion
    var actionModel = JSON.parse(jsonData);
    // tslint:enable:no-any no-unnecessary-type-assertion
    actionModel.actionIndex = index;
    return actionModel;
}
/** Workflow model for frontend */
var WorkflowModel = /** @class */ (function () {
    function WorkflowModel(jsonData) {
        // tslint:disable:no-any no-unnecessary-type-assertion
        var obj = JSON.parse(jsonData);
        // tslint:enable:no-any no-unnecessary-type-assertion
        this.actionId = obj['actionId'];
        this.name = obj['name'];
        this.childrenActions = obj['childrenActions'].map(function (item, index) {
            return actionModelFromJson(JSON.stringify(item), index);
        });
    }
    return WorkflowModel;
}());



/***/ }),

/***/ "R5Pa":
/*!****************************************************!*\
  !*** ./src/app/workflow_editor/workflow_editor.ts ***!
  \****************************************************/
/*! exports provided: WorkflowEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkflowEditorComponent", function() { return WorkflowEditorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_workflow_editor_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./workflow_editor.ng.html */ "x9BQ");
/* harmony import */ var _workflow_editor_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./workflow_editor.css */ "xPQS");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _advanced_actions_dialog_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../advanced_actions_dialog/advanced_actions_dialog */ "+MME");
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/actions */ "QWWV");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _popup_dialogs_global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../popup_dialogs/global_var_setting_dialog */ "95hE");
/* harmony import */ var _popup_dialogs_history_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../popup_dialogs/history_dialog */ "FC0R");
/* harmony import */ var _popup_dialogs_python_debugger_simple_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../popup_dialogs/python_debugger_simple_dialog */ "Ps2F");
/* harmony import */ var _popup_dialogs_replay_details_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../popup_dialogs/replay_details_dialog */ "XN9M");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../services/control_message_service */ "Etwr");
/* harmony import */ var _services_log_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../services/log_service */ "jlbu");
/* harmony import */ var _test_explorer_action_edit_dialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../test_explorer/action_edit_dialog */ "BtrL");
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



















/** The workflow editor component. */
var WorkflowEditorComponent = /** @class */ (function () {
    function WorkflowEditorComponent(controlMessageService, backendManagerService, logService, dialog, snackBar) {
        var _this = this;
        this.controlMessageService = controlMessageService;
        this.backendManagerService = backendManagerService;
        this.logService = logService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.START_ACTION_STATUS_KEYWORD = 'Start Action Path:';
        this.END_ACTION_STATUS_KEYWORD = 'End Action Path:';
        this.PLAYACTION_STATUS_SPLITTER = '->';
        this.showPython = true;
        this.isReplaying = false;
        this.workflowModel = { actionId: '', name: '', childrenActions: [] };
        /** Handle on-destroy Subject, used to unsubscribe. */
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_6__["ReplaySubject"](1);
        this.pathStack = [];
        this.pathIndexStack = [];
        this.playSpeedFactor = 1.0;
        /**
         * Indicates the actions which is currently playing. Stack stores all parent
         * compound actions
         */
        this.currentPlayActionPath = '';
        this.controlMessageService.getControlMessageSubject()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])(function (msg) {
            return msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_10__["MessageTypes"].REFRESH_WORKFLOW;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["concatMap"])(function () { return _this.backendManagerService.getCurrentWorkflow(); }))
            .subscribe(function (data) {
            _this.workflowModel = new _constants_actions__WEBPACK_IMPORTED_MODULE_9__["WorkflowModel"](JSON.stringify(data));
            _this.pathStack = [Object(_constants_actions__WEBPACK_IMPORTED_MODULE_9__["actionModelFromJson"])(JSON.stringify(data), 0)];
            _this.pathIndexStack = [0];
        });
        // Highlight the playing action by check the action id in log messages
        this.logService.getMessages()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.highlightAction(data.text);
        });
        // Sync the current workflow with backend
        this.controlMessageService.sendRefreshWorkflowMsg();
    }
    WorkflowEditorComponent_1 = WorkflowEditorComponent;
    /*
     * Currently the highlight logic is based on the log information, originally,
     * it searches the actionId in the log, and highlight, it works for most
     * cases, however it won't work when we have multiple compound action in same
     * workflow(will highlight both). We are using index path to track the
     * progress. for example in the log, it will show 1->0->2, which indicates the
     * index of child in compound action at each level.
     */
    WorkflowEditorComponent.prototype.highlightAction = function (logContent) {
        if (logContent.includes(this.START_ACTION_STATUS_KEYWORD)) {
            this.currentPlayActionPath =
                logContent.replace(this.START_ACTION_STATUS_KEYWORD, '').trim();
        }
        else if (logContent.includes(this.END_ACTION_STATUS_KEYWORD)) {
            // remove the last level trace, i.e. in the log we see <END> 1->2->3
            // we want to backtrace remove the last section.
            var indexArr = this.currentPlayActionPath.split(this.PLAYACTION_STATUS_SPLITTER);
            if (indexArr.length > 1) {
                indexArr.pop();
                this.currentPlayActionPath =
                    indexArr.join(this.PLAYACTION_STATUS_SPLITTER);
            }
            else {
                this.currentPlayActionPath = '';
            }
        }
    };
    WorkflowEditorComponent.prototype.addActionPlus = function () {
        this.dialog.open(_advanced_actions_dialog_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_8__["AdvancedActionDialogComponent"], {
            width: _constants_constants__WEBPACK_IMPORTED_MODULE_10__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
        });
    };
    WorkflowEditorComponent.prototype.addScreenShot = function () {
        var _this = this;
        var action = {
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].SCREEN_CAP_ACTION.type,
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].SCREEN_CAP_ACTION.shortName
        };
        this.backendManagerService.addActionToWorkflow(action)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1))
            .subscribe(function () {
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    WorkflowEditorComponent.prototype.addWait = function () {
        var _this = this;
        var action = {
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].WAIT_ACTION.type,
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"].WAIT_ACTION.shortName,
        };
        this.backendManagerService.addActionToWorkflow(action)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1))
            .subscribe(function () {
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    WorkflowEditorComponent.prototype.clearRecord = function () {
        var _this = this;
        this.backendManagerService.createNewWorkSpace().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1)).subscribe(function () {
            _this.pathStack = [];
            _this.pathIndexStack = [];
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    WorkflowEditorComponent.prototype.getActionToolTip = function (action) {
        if (!action.actionDescription || '' === action.actionDescription) {
            return action.name;
        }
        return action.actionDescription;
    };
    WorkflowEditorComponent.prototype.onDropSuccess = function () {
        var _this = this;
        var reorderActions = this.workflowModel.childrenActions.map(function (action) { return action.actionId; });
        this.backendManagerService.reorderActions(reorderActions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1))
            .subscribe(function () {
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    WorkflowEditorComponent.prototype.openHistoryDialog = function () {
        this.dialog.open(_popup_dialogs_history_dialog__WEBPACK_IMPORTED_MODULE_12__["HistoryDialog"], { width: _constants_constants__WEBPACK_IMPORTED_MODULE_10__["POPUP_DIALOG_DEFAULT_DIMENSION"].width });
    };
    WorkflowEditorComponent.prototype.openSaveWorkflowDialog = function () {
        var _this = this;
        if (this.workflowModel.name === '' ||
            this.workflowModel.name.includes(_constants_constants__WEBPACK_IMPORTED_MODULE_10__["DEFAULT_WORKFLOW_NAME"])) { // New workflow
            var dialogRef = this.dialog.open(_test_explorer_action_edit_dialog__WEBPACK_IMPORTED_MODULE_18__["ActionEditDialog"], {
                width: _constants_constants__WEBPACK_IMPORTED_MODULE_10__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
                data: { uuid: this.workflowModel.actionId, isSaveWorkflow: true }
            });
            dialogRef.afterClosed().subscribe(function (data) {
                _this.controlMessageService.sendRefreshWorkflowMsg();
            });
        }
        else {
            this.backendManagerService.saveCurrentWorkflowWithoutMetadata()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
                .subscribe(function (response) {
                if (response === true) {
                    _this.snackBar.open('Current workflow saved!', 'OK', { duration: WorkflowEditorComponent_1.SNACKBAR_DURATION_MS });
                }
                else {
                    _this.snackBar.open('Error: Current workflow failed to save!', 'OK', { duration: WorkflowEditorComponent_1.SNACKBAR_DURATION_MS });
                }
            });
        }
    };
    WorkflowEditorComponent.prototype.openActionEditDialog = function (id, index) {
        var _this = this;
        var dialogConfig = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogConfig"]();
        dialogConfig.width = _constants_constants__WEBPACK_IMPORTED_MODULE_10__["POPUP_DIALOG_DEFAULT_DIMENSION"].width;
        dialogConfig.data = { 'uuid': id, 'index': index };
        var dialogRef = this.dialog.open(_test_explorer_action_edit_dialog__WEBPACK_IMPORTED_MODULE_18__["ActionEditDialog"], dialogConfig);
        dialogRef.afterClosed()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])(function (data) { return data && data.hasOwnProperty('playWorkflowRequested'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["concatMap"])(function () {
            _this.preparePlay();
            var playActionRequest = {
                actionId: id,
                playSpeedFactor: _this.playSpeedFactor,
            };
            return _this.backendManagerService.playCurrentWorkflowFromAction(playActionRequest);
        }))
            .subscribe(function (data) {
            _this.finishPlay(data);
        });
    };
    WorkflowEditorComponent.prototype.preparePlay = function () {
        var _this = this;
        if (this.isReplaying) {
            this.backendManagerService.cancelCurrentWorkflow()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1))
                .subscribe(function () {
                _this.isReplaying = false;
                _this.logService.log(_constants_constants__WEBPACK_IMPORTED_MODULE_10__["TestStatusMsg"].TEST_END_CANCELLED);
            });
            return false;
        }
        this.isReplaying = true;
        this.logService.log(_constants_constants__WEBPACK_IMPORTED_MODULE_10__["TestStatusMsg"].TEST_START);
        return true;
    };
    WorkflowEditorComponent.prototype.finishPlay = function (data) {
        this.isReplaying = false;
        this.controlMessageService.sendRefreshWorkflowMsg();
        this.logService.log(_constants_constants__WEBPACK_IMPORTED_MODULE_10__["TestStatusMsg"].TEST_END);
        this.dialog.open(_popup_dialogs_replay_details_dialog__WEBPACK_IMPORTED_MODULE_14__["ReplayDetailsDialog"], { width: _constants_constants__WEBPACK_IMPORTED_MODULE_10__["POPUP_DIALOG_DEFAULT_DIMENSION"].width, data: data });
    };
    WorkflowEditorComponent.prototype.playCurrentWorkflow = function () {
        var _this = this;
        if (!this.preparePlay()) {
            return;
        }
        var playActionRequest = {
            actionId: this.workflowModel.actionId,
            playSpeedFactor: this.playSpeedFactor,
        };
        this.backendManagerService.playAction(playActionRequest)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.finishPlay(data);
        });
    };
    WorkflowEditorComponent.prototype.undo = function () {
        var _this = this;
        this.backendManagerService.undo().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1)).subscribe(function () {
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    WorkflowEditorComponent.prototype.redo = function () {
        var _this = this;
        this.backendManagerService.redo().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1)).subscribe(function () {
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    WorkflowEditorComponent.prototype.getTextByType = function (actionModel) {
        if (actionModel.actionType in _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"]) {
            return _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"][actionModel.actionType].shortName;
        }
        return 'UNKNOWN';
    };
    WorkflowEditorComponent.prototype.getColorByType = function (actionModel) {
        if (actionModel.actionType in _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"]) {
            return _constants_actions__WEBPACK_IMPORTED_MODULE_9__["ACTIONS"][actionModel.actionType].color;
        }
        return _constants_constants__WEBPACK_IMPORTED_MODULE_10__["ActionColor"].BLACK;
    };
    WorkflowEditorComponent.prototype.getBackgroundColor = function (actionModel) {
        if (!this.isReplaying) {
            return this.getColorByType(actionModel);
        }
        if (this.needHighLightCurrentAction(actionModel.actionIndex)) {
            return _constants_constants__WEBPACK_IMPORTED_MODULE_10__["ActionColor"].BLUE;
        }
        return _constants_constants__WEBPACK_IMPORTED_MODULE_10__["ActionColor"].GRAY;
    };
    WorkflowEditorComponent.prototype.needHighLightCurrentAction = function (actionIndex) {
        var pathList = this.pathIndexStack.slice(0);
        pathList.push(actionIndex);
        var pathStr = pathList.join(this.PLAYACTION_STATUS_SPLITTER);
        // Current path could be 1->6  or 1->6->4, both cases we want to hight light
        // 7th element. Can not just do startsWith, since we could something like
        // 1->61->2 in the path. It will highlight both 6th and 61th.
        if (this.currentPlayActionPath === pathStr ||
            this.currentPlayActionPath.startsWith(pathStr + this.PLAYACTION_STATUS_SPLITTER)) {
            return true;
        }
        return false;
    };
    WorkflowEditorComponent.prototype.expandCompoundAction = function (action, event) {
        var _this = this;
        this.logService.log('Expand Compound Action: ' + action.name);
        this.pathStack = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])(this.pathStack, [action]);
        this.pathIndexStack = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])(this.pathIndexStack, [action.actionIndex]);
        event.stopPropagation();
        this.backendManagerService.loadWorkflow(action.actionId).subscribe(function (data) {
            _this.workflowModel = new _constants_actions__WEBPACK_IMPORTED_MODULE_9__["WorkflowModel"](JSON.stringify(data));
        });
    };
    WorkflowEditorComponent.prototype.goBackFromExpandedCompoundAction = function (action) {
        var _this = this;
        this.logService.log('Go back to:' + action.name);
        var index = this.pathStack.findIndex(function (x) { return x.actionId === action.actionId; });
        this.pathStack = this.pathStack.slice(0, index + 1);
        this.pathIndexStack = this.pathIndexStack.slice(0, index + 1);
        this.backendManagerService.loadWorkflow(action.actionId).subscribe(function (data) {
            _this.workflowModel = new _constants_actions__WEBPACK_IMPORTED_MODULE_9__["WorkflowModel"](JSON.stringify(data));
        });
    };
    WorkflowEditorComponent.prototype.openGlobalVarSettings = function () {
        this.dialog.open(_popup_dialogs_global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_11__["GlobalVariableSettingDialog"], { width: _constants_constants__WEBPACK_IMPORTED_MODULE_10__["POPUP_DIALOG_DEFAULT_DIMENSION"].width });
    };
    WorkflowEditorComponent.prototype.openPdbDebuggerDialog = function () {
        this.dialog.open(_popup_dialogs_python_debugger_simple_dialog__WEBPACK_IMPORTED_MODULE_13__["PythonDebuggerSimpleDialog"], { panelClass: 'python-overlay-style' });
    };
    WorkflowEditorComponent.prototype.onSpeedSliderChange = function (event) {
        if (this.isReplaying) {
            this.backendManagerService.setPlaySpeedFactor(event.value)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.destroyed))
                .subscribe();
        }
    };
    WorkflowEditorComponent.prototype.ngOnDestroy = function () {
        // Unsubscribes all pending subscriptions.
        this.destroyed.next();
    };
    var WorkflowEditorComponent_1;
    WorkflowEditorComponent.SNACKBAR_DURATION_MS = 2000;
    WorkflowEditorComponent.ctorParameters = function () { return [
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_16__["ControlMessageService"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_15__["BackendManagerService"] },
        { type: _services_log_service__WEBPACK_IMPORTED_MODULE_17__["LogService"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] }
    ]; };
    WorkflowEditorComponent = WorkflowEditorComponent_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'workflow-editor',
            template: _raw_loader_workflow_editor_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_workflow_editor_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_services_control_message_service__WEBPACK_IMPORTED_MODULE_16__["ControlMessageService"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_15__["BackendManagerService"],
            _services_log_service__WEBPACK_IMPORTED_MODULE_17__["LogService"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"]])
    ], WorkflowEditorComponent);
    return WorkflowEditorComponent;
}());



/***/ }),

/***/ "R9JL":
/*!***************************************************!*\
  !*** ./src/app/ui_tree_viewer/copy_xml_dialog.ts ***!
  \***************************************************/
/*! exports provided: CopyXmlDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CopyXmlDialog", function() { return CopyXmlDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_copy_xml_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./copy_xml_dialog.ng.html */ "qeW4");
/* harmony import */ var _copy_xml_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./copy_xml_dialog.css */ "9hij");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
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





/** Simple dialog for showing raw xml string */
var CopyXmlDialog = /** @class */ (function () {
    function CopyXmlDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    CopyXmlDialog.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
    ]; };
    CopyXmlDialog = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-copy-xml-dialog',
            template: _raw_loader_copy_xml_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_copy_xml_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"], String])
    ], CopyXmlDialog);
    return CopyXmlDialog;
}());



/***/ }),

/***/ "TLnq":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/test_explorer/import_project_dialog.ng.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div mat-dialog-content fxLayout=\"column\">\n  <div fxLayout=\"column\">\n    <mat-form-field>\n      <mat-select placeholder=\"Select an import type\" [(ngModel)]=\"selectedImportType\">\n        <mat-option *ngFor=\"let importType of importTypes\" [value]=\"importType\">\n          {{importType}}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <div [ngSwitch]=\"selectedImportType\">\n      <div *ngSwitchCase=\"IMPORT_USER\">\n        <mat-form-field class=\"inputField\">\n          <input matInput placeholder=\"Import by Username\" [(ngModel)]=\"usernameImportText\" (keyup.enter)=\"fetchProjectListByUsername()\">\n          <mat-hint align=\"end\">Click \"Fetch Projects\" button after input username</mat-hint>\n        </mat-form-field>\n        <br/>\n        <mat-form-field>\n          <mat-select placeholder=\"Select a project you want to import\" [(ngModel)]=\"selectedProject\" (click)=\"fetchProjectListByUsername()\">\n          <mat-option *ngFor=\"let projectRecord of projectList\" [value]=\"projectRecord\">{{projectRecord.projectName}}</mat-option>\n          </mat-select>\n        </mat-form-field>\n      </div>\n      <div *ngSwitchCase=\"IMPORT_ZIP\">\n        <p>{{importedFile?.name}}</p>\n      </div>\n    </div>\n\n    <mat-form-field >\n      <input matInput placeholder=\"Input new project name for the imported project\" [(ngModel)]=\"targetProjectName\">\n      <mat-hint align=\"end\">Click \"Import\" button after input new project name</mat-hint>\n    </mat-form-field>\n  </div>\n</div>\n<div mat-dialog-actions>\n  <div [ngSwitch]=\"selectedImportType\">\n    <div *ngSwitchCase=\"IMPORT_USER\">\n      <button mat-raised-button (click)=\"fetchProjectListByUsername()\" [disabled]=\"usernameImportText === ''\">Fetch Projects</button>\n    </div>\n    <div *ngSwitchCase=\"IMPORT_ZIP\">\n      <button mat-raised-button (click)=\"importZip.click()\">Select a file</button>\n      <input type=\"file\" class=\"hiddenInput\" accept=\".zip\" (change)=\"importFileSelected($event)\" #importZip />\n    </div>\n  </div>\n  <button mat-raised-button (click)=\"importProject()\" [disabled]=\"targetProjectName === ''\">Import</button>\n  <button mat-raised-button mat-dialog-close>Close</button>\n</div>\n<div class=\"waitingOverlay\" *ngIf=\"showOverlay\">\n  <mat-progress-bar mode=\"indeterminate\">\n  </mat-progress-bar>\n</div>\n");

/***/ }),

/***/ "TZWK":
/*!*********************************************************!*\
  !*** ./src/app/device_manager/device_manager_module.ts ***!
  \*********************************************************/
/*! exports provided: DeviceManagerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceManagerModule", function() { return DeviceManagerModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _device_manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./device_manager */ "G1pY");
/* harmony import */ var _tv_remote__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tv_remote */ "uWoT");
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










var DeviceManagerModule = /** @class */ (function () {
    function DeviceManagerModule() {
    }
    DeviceManagerModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_4__["MatSelectModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["BrowserModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_5__["MatTableModule"],
            ],
            declarations: [_device_manager__WEBPACK_IMPORTED_MODULE_8__["DeviceManager"], _tv_remote__WEBPACK_IMPORTED_MODULE_9__["TvRemote"]],
            exports: [_device_manager__WEBPACK_IMPORTED_MODULE_8__["DeviceManager"], _tv_remote__WEBPACK_IMPORTED_MODULE_9__["TvRemote"]],
        })
    ], DeviceManagerModule);
    return DeviceManagerModule;
}());



/***/ }),

/***/ "Tf1p":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/popup_dialogs/hard_soft_import_action_info_dialog.ng.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n    <h2>Hard and Soft Import Details</h2>\n    <table class='info-table'>\n        <thead>\n            <tr>\n                <th>Field Name</th>\n                <th>Description</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>Hard Import</td>\n                <td>Hard Import will load the test cases in a way that the loaded test case acts as\n                  a different test case than the original test case; Any change made to the newly\n                  imported test case will not impact the original test case and vice versa.\n                  The two cases, imported and original, will act independently.\n                </td>\n            </tr>\n            <tr>\n                <td>Soft Import</td>\n                <td>Soft Import will load the test cases in a way that the loaded test case acts as\n                  the same test case as the original test case; Any change made to the newly\n                  imported test case will have a similar impact on the original test case and\n                  vice versa. The two cases, imported and original, will not act independently.</td>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"foot-note\" >*More details can be found in go/uicd</div>\n    <button mat-raised-button color=\"primary\" (click)=\"onOkClick()\">OK</button>\n</div>\n");

/***/ }),

/***/ "TivY":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/advanced_actions_dialog/snippet_action_info_dialog.ng.html ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n    <h2>On-Device Snippet Details</h2>\n    <table class='info-table'>\n        <thead>\n            <tr>\n                <th>Field Name</th>\n                <th>Description</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>Package Name</td>\n                <td>This field specifies the snippet package in the APK that has been installed onto the connected device.\n                    Once selected, Nuwa will fetch all the methods under that package and list them in the Method Name box.\n                    Note: If the package cannot be found, the method list will be empty.\n                </td>\n            </tr>\n            <tr>\n                <td>Method Name</td>\n                <td>Each method name entry contains the method name, the arguments list it requires, and the type of the return value.</td>\n            </tr>\n            <tr>\n                <td>Arguments</td>\n                <td>You should enter the corresponding arguments that the selected snippet call requires here.\n                    The arguments should be separated by ',' and every one of them is kept in the correct format of the variable type.\n                    For example, the input of method <b>wifiConnectSimple(String, String)</b> can be <b>GoogleGuest, null</b>.\n                </td>\n            </tr>\n            <tr>\n                <td>Timeout Limit</td>\n                <td>This field is to set how long to wait (in milliseconds) for the snippet to complete and return.\n                </td>\n            </tr>\n            <tr>\n                <td>Snippet Service Only (No validation)</td>\n                <td>This field is to set whether you want to validate the return value or not. If the snippet you select returns null, this box will be automatically selected.\n                    Note that if you uncheck this box for snippets that do not return a value, it will cause the action to fail.\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"foot-note\" >*More details can be found in go/uicd</div>\n    <button mat-raised-button color=\"primary\" (click)=\"onOkClick()\">OK</button>\n</div>\n");

/***/ }),

/***/ "UU5W":
/*!**************************************************************!*\
  !*** ./src/app/screen_validation_flow/fetch_content_form.ts ***!
  \**************************************************************/
/*! exports provided: FetchContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchContentComponent", function() { return FetchContentComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_fetch_content_form_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./fetch_content_form.ng.html */ "JRns");
/* harmony import */ var _fetch_content_form_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fetch_content_form.css */ "ayJo");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/actions */ "QWWV");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/rect */ "aFBn");
/* harmony import */ var _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/screen_validation_constants */ "vBhh");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
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










/** Fetch the screen content */
var FetchContentComponent = /** @class */ (function () {
    function FetchContentComponent(backendManagerService) {
        this.backendManagerService = backendManagerService;
        this.STRATEGY_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["FETCH_CONTENT_STRATEGY_TYPES"];
        this.currentSelectedText = '';
        this.showButtons = true;
        /** Handle on-destroy Subject, used to unsubscribe. */
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_4__["ReplaySubject"](1);
        this.fetchActionDetails = {
            name: '',
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_6__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.type,
            strategy: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StrategyType"].POSITION,
            selector: '',
            globalVariableName: '',
            attributeType: '',
            isExportField: true,
            bounds: undefined,
        };
        this.fetchActionDetailsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.screenContentSummary = {
            displayText: '',
            resourceId: '',
            checked: false,
        };
        this.actionAdded = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.previousPage = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
    }
    FetchContentComponent.prototype.fetchContentData = function () {
        var _this = this;
        if (!this.fetchActionDetails.bounds) {
            return;
        }
        // Need add delay(0) here to avoid the "Expression has changed after it was
        // checked" issue.
        this.backendManagerService
            .getContentFromScreen(this.fetchActionDetails.bounds)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["delay"])(0), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe(function (screenContentSummary) {
            _this.screenContentSummary = screenContentSummary;
            _this.currentSelectedText = _this.screenContentSummary.displayText;
            _this.updateSelector(_constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StrategyType"].POSITION);
        });
    };
    Object.defineProperty(FetchContentComponent.prototype, "selectedBounds", {
        set: function (selectedBounds) {
            this.fetchActionDetails.bounds = selectedBounds;
            this.fetchContentData();
        },
        enumerable: false,
        configurable: true
    });
    FetchContentComponent.prototype.selectorChanged = function (event) {
        this.updateSelector(event.value);
    };
    FetchContentComponent.prototype.updateSelector = function (strategy) {
        switch (strategy) {
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StrategyType"].POSITION:
                if (this.fetchActionDetails.bounds) {
                    // If fetchActionDetails comes from json.parse, it won't have
                    // toBoundsStr function on bounds field.
                    var bounds = new _constants_rect__WEBPACK_IMPORTED_MODULE_7__["Bounds"](this.fetchActionDetails.bounds.x1, this.fetchActionDetails.bounds.x2, this.fetchActionDetails.bounds.y1, this.fetchActionDetails.bounds.y2);
                    this.fetchActionDetails.selector = bounds.toBoundsStr();
                }
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StrategyType"].RESOURCEID:
                this.fetchActionDetails.selector = this.screenContentSummary.resourceId;
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StrategyType"].XPATH:
                this.fetchActionDetails.selector = ''; // XPath is provided by user.
                break;
            default:
                break;
        }
    };
    FetchContentComponent.prototype.showAttributeInput = function () {
        return this.fetchActionDetails.strategy === _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StrategyType"].XPATH;
    };
    FetchContentComponent.prototype.closePopup = function () {
        var _this = this;
        this.backendManagerService.addActionToWorkflow(this.fetchActionDetails)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.actionAdded.emit();
        });
    };
    FetchContentComponent.prototype.emitUpdate = function () {
        this.fetchActionDetailsChange.emit(this.fetchActionDetails);
    };
    FetchContentComponent.prototype.previousPageClicked = function () {
        this.previousPage.emit();
    };
    FetchContentComponent.prototype.ngOnDestroy = function () {
        // Unsubscribes all pending subscriptions.
        this.destroyed.next();
    };
    FetchContentComponent.ctorParameters = function () { return [
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_9__["BackendManagerService"] }
    ]; };
    FetchContentComponent.propDecorators = {
        showButtons: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        fetchActionDetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        fetchActionDetailsChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        selectedBounds: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        actionAdded: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        previousPage: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }]
    };
    FetchContentComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'fetch-content-form',
            template: _raw_loader_fetch_content_form_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_fetch_content_form_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_services_backend_manager_service__WEBPACK_IMPORTED_MODULE_9__["BackendManagerService"]])
    ], FetchContentComponent);
    return FetchContentComponent;
}());



/***/ }),

/***/ "VNV4":
/*!*****************************************************!*\
  !*** ./src/app/test_explorer/new_project_dialog.ts ***!
  \*****************************************************/
/*! exports provided: NewProjectDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewProjectDialog", function() { return NewProjectDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_new_project_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./new_project_dialog.ng.html */ "IgFR");
/* harmony import */ var _new_project_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./new_project_dialog.css */ "aIQo");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
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








/** The dialog when creating a new project. */
var NewProjectDialog = /** @class */ (function () {
    function NewProjectDialog(dialogRef, backendManagerService) {
        this.dialogRef = dialogRef;
        this.backendManagerService = backendManagerService;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
        this.projectName = '';
        this.result = '';
    }
    NewProjectDialog.prototype.dismissDialog = function () {
        this.dialogRef.close(this.newCreatedProject);
    };
    NewProjectDialog.prototype.saveNewProject = function () {
        var _this = this;
        this.backendManagerService.createProject(this.projectName)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (response) {
            if (response.success) {
                _this.newCreatedProject = response.projectList[0];
                _this.dismissDialog();
            }
            else {
                _this.result =
                    'Failed to create project, please make sure this name doesn\'t already exist.';
            }
        });
    };
    NewProjectDialog.prototype.ngOnDestroy = function () {
        this.destroyed.next();
    };
    NewProjectDialog.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__["BackendManagerService"] }
    ]; };
    NewProjectDialog = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'new-project-dialog',
            template: _raw_loader_new_project_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_new_project_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__["BackendManagerService"]])
    ], NewProjectDialog);
    return NewProjectDialog;
}());



/***/ }),

/***/ "WdIy":
/*!*********************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/advanced_actions_dialog.css ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.new-action-form > * {\n  width: 100%;\n}\n\n.new-action-form {\n  display: flex;\n  flex-direction: column;\n}\n\n.form-text-align {\n  padding: 0 1em;\n}\n\nmd-icon {\n  font-family: 'Material Icons' !important;\n}\n\n.material-icons.blue {\n  color: #3F87F2;\n}\n\n.image-val-action {\n  min-width: 360px;\n  max-height: 100%;\n}\n\n.align-center {\n  display: flex;\n  justify-content: center;\n  margin: 5px;\n}\n\n.margin-5 {\n  margin: 5px;\n}\n\n.phone-canvas-widget {\n  z-index: 1;\n}\n\n.phone-canvas-widget-2 {\n  z-index: 2;\n}\n\n.padding-10 {\n  padding: 10px;\n}\n\n.width-50 {\n  width: 50px;\n}\n\n.width-90 {\n  width: 90px;\n}\n\n.width-300 {\n  width: 300px;\n}\n\n.python-editor{\n  min-height:500px;\n  margin-bottom:10px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkdmFuY2VkX2FjdGlvbnNfZGlhbG9nLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usd0NBQXdDO0FBQzFDOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEIiLCJmaWxlIjoiYWR2YW5jZWRfYWN0aW9uc19kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5uZXctYWN0aW9uLWZvcm0gPiAqIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5uZXctYWN0aW9uLWZvcm0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uZm9ybS10ZXh0LWFsaWduIHtcbiAgcGFkZGluZzogMCAxZW07XG59XG5cbm1kLWljb24ge1xuICBmb250LWZhbWlseTogJ01hdGVyaWFsIEljb25zJyAhaW1wb3J0YW50O1xufVxuXG4ubWF0ZXJpYWwtaWNvbnMuYmx1ZSB7XG4gIGNvbG9yOiAjM0Y4N0YyO1xufVxuXG4uaW1hZ2UtdmFsLWFjdGlvbiB7XG4gIG1pbi13aWR0aDogMzYwcHg7XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG59XG5cbi5hbGlnbi1jZW50ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luOiA1cHg7XG59XG5cbi5tYXJnaW4tNSB7XG4gIG1hcmdpbjogNXB4O1xufVxuXG4ucGhvbmUtY2FudmFzLXdpZGdldCB7XG4gIHotaW5kZXg6IDE7XG59XG5cbi5waG9uZS1jYW52YXMtd2lkZ2V0LTIge1xuICB6LWluZGV4OiAyO1xufVxuXG4ucGFkZGluZy0xMCB7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi53aWR0aC01MCB7XG4gIHdpZHRoOiA1MHB4O1xufVxuXG4ud2lkdGgtOTAge1xuICB3aWR0aDogOTBweDtcbn1cblxuLndpZHRoLTMwMCB7XG4gIHdpZHRoOiAzMDBweDtcbn1cblxuLnB5dGhvbi1lZGl0b3J7XG4gIG1pbi1oZWlnaHQ6NTAwcHg7XG4gIG1hcmdpbi1ib3R0b206MTBweDtcbn1cbiJdfQ== */");

/***/ }),

/***/ "Wnvv":
/*!***********************************************!*\
  !*** ./src/app/ui_tree_viewer/ocr_viewer.css ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.ocr-result-list {\n    overflow: auto;\n    width: 100%;\n    min-height: 300px;\n}\n\n.ocr-result-list-item {\n    list-style: circle inside none;\n    height: 25px;\n    cursor: -webkit-grab;\n    cursor: grab\n}\n\n.ocr-result-list-item:hover {\n    background-color: #beebff;\n    opacity: 0.9;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9jcl92aWV3ZXIuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0lBQ0ksY0FBYztJQUNkLFdBQVc7SUFDWCxpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSw4QkFBOEI7SUFDOUIsWUFBWTtJQUNaLG9CQUFXO0lBQVg7QUFDSjs7QUFDQTtJQUNJLHlCQUF5QjtJQUN6QixZQUFZO0FBQ2hCIiwiZmlsZSI6Im9jcl92aWV3ZXIuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5vY3ItcmVzdWx0LWxpc3Qge1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1pbi1oZWlnaHQ6IDMwMHB4O1xufVxuLm9jci1yZXN1bHQtbGlzdC1pdGVtIHtcbiAgICBsaXN0LXN0eWxlOiBjaXJjbGUgaW5zaWRlIG5vbmU7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICAgIGN1cnNvcjogZ3JhYlxufVxuLm9jci1yZXN1bHQtbGlzdC1pdGVtOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmVlYmZmO1xuICAgIG9wYWNpdHk6IDAuOTtcbn0iXX0= */");

/***/ }),

/***/ "XN9M":
/*!********************************************************!*\
  !*** ./src/app/popup_dialogs/replay_details_dialog.ts ***!
  \********************************************************/
/*! exports provided: ReplayDetailsDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReplayDetailsDialog", function() { return ReplayDetailsDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_replay_details_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./replay_details_dialog.ng.html */ "PqgP");
/* harmony import */ var _replay_details_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./replay_details_dialog.css */ "bo1v");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "EcEN");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _constants_jstree__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/jstree */ "alCr");
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



// taze: $, JQuery from //third_party/javascript/typings/jquery:jquery_without_externs
// taze: jstree from //third_party/javascript/typings/jstree:jstree





/** Pop-up dialog showing test result information. */
var ReplayDetailsDialog = /** @class */ (function () {
    function ReplayDetailsDialog(data) {
        this.data = data;
        this.testResult = 'SKIPPED';
        this.testStatusColor = 'RED';
        this.outputList = [];
    }
    ReplayDetailsDialog.prototype.ngOnInit = function () {
        this.testStatusColor = this.getTestStatusCss(this.data.playStatus);
        var treeData = this.constructTreeData(this.data);
        this.setupDataTree(treeData);
    };
    ReplayDetailsDialog.prototype.getTestStatusCss = function (playStatus) {
        switch (playStatus) {
            case 'PASS':
                return 'test-status-pass';
            case 'FAIL':
                return 'test-status-fail';
            case 'CANCELLED':
                return 'test-status-cancelled';
            default:
                return '';
        }
    };
    ReplayDetailsDialog.prototype.setupDataTree = function (data) {
        var jsTreeObj = $(this.jsTreeEl.nativeElement);
        this.jsTree = jsTreeObj.jstree({
            'core': {
                'themes': {
                    'dots': false,
                },
                'data': data,
                'plugins': ['wholerow'],
            }
        });
    };
    ReplayDetailsDialog.prototype.getNodeTitle = function (playStatus, content) {
        switch (playStatus) {
            case 'SKIPPED':
                return '<span class="skipped-status">(SKIPPED) </span><span class="skipped-content">' +
                    content + '</span>';
            case 'FAIL':
                return '<span class="failed-status">(FAIL) </span><span class="content-bold">' +
                    content + '</span>';
            case 'EXIT_CURRENT_COMPOUND':
                return '<span class="exit-current-compound-status">(Exit Current Compound) </span><span class="content-bold">' +
                    content + '</span>';
            default:
                if (content.includes('Validation')) {
                    return '<span class="pass-status">(PASS) </span><span>' + content +
                        '</span>';
                }
                else {
                    return content;
                }
        }
    };
    ReplayDetailsDialog.prototype.constructTreeData = function (node) {
        var jsNode = new _constants_jstree__WEBPACK_IMPORTED_MODULE_7__["JsTreeNode"](this.getNodeTitle(node.playStatus, node.content), Object(uuid__WEBPACK_IMPORTED_MODULE_5__["v4"])());
        jsNode.icon = 'fa fa-mouse-pointer';
        if (node.childrenResult && node.childrenResult.length > 0) {
            jsNode.children =
                node.childrenResult.map(this.constructTreeData.bind(this));
        }
        if (node.outputType === 'SCREENSHOT' || node.outputType === 'LOGCAT' ||
            node.outputType === 'IMG_VALIDATION') {
            this.outputList.push({
                outputType: node.outputType,
                path: _constants_constants__WEBPACK_IMPORTED_MODULE_6__["BACKEND_BASE_URL"] + '/getSavedResource?path=' + node.externalFilePath
            });
        }
        return jsNode;
    };
    ReplayDetailsDialog.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
    ]; };
    ReplayDetailsDialog.propDecorators = {
        jsTreeEl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['jsTree', { static: true },] }]
    };
    ReplayDetailsDialog = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-replay-details-dialog',
            template: _raw_loader_replay_details_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_replay_details_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object])
    ], ReplayDetailsDialog);
    return ReplayDetailsDialog;
}());



/***/ }),

/***/ "XVJF":
/*!*************************************************!*\
  !*** ./src/app/popup_dialogs/dialogs_module.ts ***!
  \*************************************************/
/*! exports provided: DialogsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogsModule", function() { return DialogsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/chips */ "A5z7");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/grid-list */ "zkoq");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var angular_split__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! angular-split */ "cdP3");
/* harmony import */ var _choose_device_dialog__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./choose_device_dialog */ "jHJN");
/* harmony import */ var _global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./global_var_setting_dialog */ "95hE");
/* harmony import */ var _hard_soft_import_action_info_dialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./hard_soft_import_action_info_dialog */ "I6yJ");
/* harmony import */ var _history_dialog__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./history_dialog */ "FC0R");
/* harmony import */ var _python_debugger_simple_dialog__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./python_debugger_simple_dialog */ "Ps2F");
/* harmony import */ var _python_editor_simple__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./python_editor_simple */ "MUIB");
/* harmony import */ var _replay_details_dialog__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./replay_details_dialog */ "XN9M");
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



























var DialogsModule = /** @class */ (function () {
    function DialogsModule() {
    }
    DialogsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _choose_device_dialog__WEBPACK_IMPORTED_MODULE_20__["ChooseDeviceDialogComponent"],
                _global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_21__["GlobalVariableSettingDialog"],
                _hard_soft_import_action_info_dialog__WEBPACK_IMPORTED_MODULE_22__["HardAndSoftInfoDialogComponent"],
                _history_dialog__WEBPACK_IMPORTED_MODULE_23__["HistoryDialog"],
                _python_debugger_simple_dialog__WEBPACK_IMPORTED_MODULE_24__["PythonDebuggerSimpleDialog"],
                _python_editor_simple__WEBPACK_IMPORTED_MODULE_25__["PythonEditorSimpleComponent"],
                _replay_details_dialog__WEBPACK_IMPORTED_MODULE_26__["ReplayDetailsDialog"],
            ],
            imports: [
                angular_split__WEBPACK_IMPORTED_MODULE_19__["AngularSplitModule"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__["BrowserModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__["BrowserAnimationsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__["MatCheckboxModule"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_8__["MatChipsModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__["MatGridListModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MatOptionModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatTableModule"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__["MatTooltipModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__["MatRadioModule"],
            ],
            exports: [
                _choose_device_dialog__WEBPACK_IMPORTED_MODULE_20__["ChooseDeviceDialogComponent"],
                _global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_21__["GlobalVariableSettingDialog"],
                _hard_soft_import_action_info_dialog__WEBPACK_IMPORTED_MODULE_22__["HardAndSoftInfoDialogComponent"],
                _history_dialog__WEBPACK_IMPORTED_MODULE_23__["HistoryDialog"],
                _python_debugger_simple_dialog__WEBPACK_IMPORTED_MODULE_24__["PythonDebuggerSimpleDialog"],
                _python_editor_simple__WEBPACK_IMPORTED_MODULE_25__["PythonEditorSimpleComponent"],
                _replay_details_dialog__WEBPACK_IMPORTED_MODULE_26__["ReplayDetailsDialog"],
            ],
        })
    ], DialogsModule);
    return DialogsModule;
}());



/***/ }),

/***/ "XbWe":
/*!************************!*\
  !*** ./src/app/app.ts ***!
  \************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_app_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./app.ng.html */ "kjG2");
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.css */ "M2sI");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constants/constants */ "bl9C");
/* harmony import */ var _popup_dialogs_choose_device_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./popup_dialogs/choose_device_dialog */ "jHJN");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/backend_manager_service */ "Kd50");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/control_message_service */ "Etwr");
/* harmony import */ var _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/devices_manager_service */ "Ojqq");
/* harmony import */ var _services_log_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/log_service */ "jlbu");
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













/**
 * AppComponent from frontend
 */
var AppComponent = /** @class */ (function () {
    function AppComponent(dialog, logService, backendManagerService, controlMessageService, devicesManagerService) {
        this.dialog = dialog;
        this.logService = logService;
        this.backendManagerService = backendManagerService;
        this.controlMessageService = controlMessageService;
        this.devicesManagerService = devicesManagerService;
        this.devicePrepareLoading = false;
        this.showUiTree = false;
        this.title = 'frontend';
        this.direction = 'horizontal';
        /** Handle on-destroy Subject, used to unsubscribe. */
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // if have inited devices, don't show dialog
        this.backendManagerService.getInitedDevices()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            if (data.deviceStatusList.length === 0) {
                // open device picker dialog
                _this.openDevicePickerDialog();
            }
            else {
                _this.initDeviceManagerService(data);
            }
        });
        this.controlMessageService.getControlMessageSubject()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["filter"])(function (msg) {
            return msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].REFRESH_OVERLAY;
        }))
            .subscribe(function (msg) {
            if (msg.extra.toLowerCase() === 'hide') {
                _this.devicePrepareLoading = false;
            }
            else {
                _this.devicePrepareLoading = true;
            }
        });
    };
    AppComponent.prototype.initDeviceManagerService = function (data) {
        if (!data.deviceStatusList) {
            return;
        }
        this.devicesManagerService.setInitedDevices(data.deviceStatusList.map(function (item) { return new _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_11__["DeviceInfo"](JSON.stringify(item)); }));
        this.devicesManagerService.updateCurrentDevice(this.devicesManagerService.getInitedDevices()[0].deviceId);
    };
    AppComponent.prototype.openDevicePickerDialog = function () {
        var _this = this;
        var dialog = this.dialog.open(_popup_dialogs_choose_device_dialog__WEBPACK_IMPORTED_MODULE_8__["ChooseDeviceDialogComponent"], {
            height: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["POPUP_DIALOG_DEFAULT_DIMENSION"].height,
            width: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
        });
        dialog.afterClosed()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (selection) { return _this.selectAndInitDevices(selection); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.initDeviceManagerService(data);
            //   this.devicePrepareLoading = false;
        });
    };
    AppComponent.prototype.selectAndInitDevices = function (selection) {
        if (!selection)
            return rxjs__WEBPACK_IMPORTED_MODULE_5__["EMPTY"];
        this.devicePrepareLoading = true;
        return this.backendManagerService
            .initDevicesFromListV2(selection.join(), true)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1));
    };
    AppComponent.prototype.softRestart = function () {
        var _this = this;
        this.backendManagerService.softRestart()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(function (err) {
            _this.devicePrepareLoading = true;
            return err.statusText;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function () { });
        // After call the softRestart, backend service will be restarted, we need
        // use validateUicdBackendConnection api with retryWhen operator to check
        // whether backend is ready to serve the frontend request. Normally the
        // backend will be back online in 2-3 seconds.
        var retryCnt = 0;
        this.backendManagerService.validateUicdBackendConnection()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["delay"])(2000), // wait 2 seconds, otherwise
        // validateUicdBackendConnection might be handled
        // faster than softRestart request.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["retryWhen"])(function (errors) { return errors.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["delay"])(2000), // retry every 2 seconds
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(10), // retry 10 times
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function () {
            retryCnt++;
            _this.logService.log("Trying to connect to the backend... attempt " + retryCnt + "/10.");
            if (retryCnt === 10) {
                _this.logService.log('Retried 10 times, can not connect to backend service.');
            }
        })); }))
            .subscribe(function () {
            _this.logService.log('Connected to the backend successfully!');
            window.location.reload();
        });
    };
    AppComponent.prototype.tabChange = function (e) {
        this.showUiTree = (e.index === _constants_constants__WEBPACK_IMPORTED_MODULE_7__["BottomMenuTabs"].UI_VIEWER);
        this.controlMessageService.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].CLEAR_CANVAS, extra: '' });
    };
    AppComponent.prototype.versionInfo = function () {
        this.backendManagerService.getVersionInfo()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (versionInfo) {
            window.alert("UIConductor Backend Version: " + versionInfo.backendVersion + "\n          '\nXmlDumper APK Version: " + versionInfo.xmlDumperVersion);
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        // Unsubscribes all pending subscriptions.
        this.destroyed.next();
    };
    AppComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _services_log_service__WEBPACK_IMPORTED_MODULE_12__["LogService"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_9__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_10__["ControlMessageService"] },
        { type: _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_11__["DevicesManagerService"] }
    ]; };
    AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-root',
            template: _raw_loader_app_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_app_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _services_log_service__WEBPACK_IMPORTED_MODULE_12__["LogService"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_9__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_10__["ControlMessageService"],
            _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_11__["DevicesManagerService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "Xrdp":
/*!********************************************************!*\
  !*** ./src/app/popup_dialogs/choose_device_dialog.css ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.device-card{\n  margin-bottom: 20px;\n}\n\n.device-card-title {\n  font-size: 15px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNob29zZV9kZXZpY2VfZGlhbG9nLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGVBQWU7QUFDakIiLCJmaWxlIjoiY2hvb3NlX2RldmljZV9kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5kZXZpY2UtY2FyZHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmRldmljZS1jYXJkLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuIl19 */");

/***/ }),

/***/ "YJV/":
/*!******************************************************!*\
  !*** ./src/app/test_explorer/action_edit_dialog.css ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.example-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.example-container > * {\n  width: 100%;\n}\n\n.createdByLabel {\n  color: darkred;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbl9lZGl0X2RpYWxvZy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsY0FBYztBQUNoQiIsImZpbGUiOiJhY3Rpb25fZWRpdF9kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5leGFtcGxlLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5leGFtcGxlLWNvbnRhaW5lciA+ICoge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmNyZWF0ZWRCeUxhYmVsIHtcbiAgY29sb3I6IGRhcmtyZWQ7XG59XG4iXX0= */");

/***/ }),

/***/ "a0bj":
/*!***********************************************************!*\
  !*** ./src/app/workflow_editor/workflow_editor_module.ts ***!
  \***********************************************************/
/*! exports provided: WorkflowEditorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkflowEditorModule", function() { return WorkflowEditorModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/slider */ "5RNC");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tree */ "8yBR");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var ng2_dnd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng2-dnd */ "lJEt");
/* harmony import */ var _workflow_editor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./workflow_editor */ "R5Pa");
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














var WorkflowEditorModule = /** @class */ (function () {
    function WorkflowEditorModule() {
    }
    WorkflowEditorModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _workflow_editor__WEBPACK_IMPORTED_MODULE_13__["WorkflowEditorComponent"],
            ],
            imports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["BrowserAnimationsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__["BrowserModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ng2_dnd__WEBPACK_IMPORTED_MODULE_12__["DndModule"].forRoot(),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__["MatProgressSpinnerModule"],
                _angular_material_slider__WEBPACK_IMPORTED_MODULE_7__["MatSliderModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_8__["MatTooltipModule"],
                _angular_material_tree__WEBPACK_IMPORTED_MODULE_9__["MatTreeModule"],
            ],
            exports: [
                _workflow_editor__WEBPACK_IMPORTED_MODULE_13__["WorkflowEditorComponent"],
            ],
        })
    ], WorkflowEditorModule);
    return WorkflowEditorModule;
}());



/***/ }),

/***/ "a135":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/test_explorer/action_edit_dialog.ng.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h1 mat-dialog-title> Action Details </h1>\n<div mat-dialog-content fxLayout=\"column\">\n  <mat-form-field>\n        <input matInput placeholder=\"Action Id\" [(ngModel)]=\"actionData.actionId\" readonly>\n  </mat-form-field>\n\n  <mat-form-field>\n    <input matInput placeholder=\"Name\" [(ngModel)]=\"actionData.name\" required>\n    <mat-error *ngIf=\"!actionData.name\">You must input a name.</mat-error>\n  </mat-form-field>\n\n  <mat-checkbox *ngIf=\"isMultiPlayMode() && isCompoundAction()\" placeholder=\"Force device index on all children actions\" [(ngModel)]=\"actionData.forceDeviceOnChildren\">Force device index on all children actions</mat-checkbox>\n\n  <mat-form-field *ngIf=\"isMultiPlayMode()\">\n    <input matInput placeholder=\"Device index\" type=\"number\" min=\"0\" [(ngModel)]=\"actionData.deviceIndex\">\n  </mat-form-field>\n\n  <mat-form-field *ngIf=\"!isMLImageValidation()\">\n    <input matInput placeholder=\"Delay After (ms)\" type=\"number\" [(ngModel)]=\"actionData.delayAfterActionMs\">\n  </mat-form-field>\n\n  <mat-form-field *ngIf=\"isMLImageValidation()\">\n    <input matInput placeholder=\"Icon Image\" [(ngModel)]=\"validationData.iconImageType\" [disabled]=\"!isMLImageValidation()\">\n  </mat-form-field>\n\n  <mat-form-field *ngIf=\"isCompoundAction()\">\n    <input matInput placeholder=\"Repeat Time\" type=\"number\" [(ngModel)]=\"actionData.repeatTime\" [disabled]=\"!isCompoundAction()\">\n  </mat-form-field>\n\n  <mat-form-field>\n    <input matInput placeholder=\"Action Type\" [(ngModel)]=\"actionData.actionType\" [disabled]=\"true\">\n  </mat-form-field>\n\n  <mat-checkbox *ngIf=\"isClickAction()\" placeholder=\"Is Raw xy\" [disabled]=\"false\" [(ngModel)]=\"actionData.isRawXY\">is raw XY</mat-checkbox>\n\n  <mat-form-field *ngIf=\"isCompoundAction()\">\n    <input matInput placeholder=\"Share With\" [(ngModel)]=\"actionData.shareWith\">\n  </mat-form-field>\n\n  <mat-form-field *ngIf=\"!isMLImageValidation()\">\n    <textarea matInput placeholder=\"Description\" [(ngModel)]=\"actionData.actionDescription\"></textarea>\n  </mat-form-field>\n\n  <mat-form-field *ngIf=\"data.isSaveWorkflow || isNewWorkflow || data.isMoveAction\">\n    <mat-select placeholder=\"Folder\" [(ngModel)]=\"saveToFolderId\">\n      <mat-option *ngFor=\"let folder of folderList\" [value]=\"folder.id\">{{ folder.value }}</mat-option>\n    </mat-select>\n  </mat-form-field>\n\n  <mat-checkbox [(ngModel)]=\"actionData.runAlways\">Run Always (run current step even if previous step failed)</mat-checkbox>\n  <mat-checkbox *ngIf=\"isCompoundAction() && actionData.runAlways\" [(ngModel)]=\"actionData.runAlwaysRecursive\">Recursive(run always Recursively)</mat-checkbox>\n  <mat-checkbox *ngIf=\"isCompoundAction()\" [(ngModel)]=\"actionData.isTopLevelWorkflow\">Is top level workflow?</mat-checkbox>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"saveAction()\">Save</button>\n  <button mat-raised-button (click)=\"cancelDialog()\">Cancel</button>\n  <button mat-raised-button (click)=\"deleteAction()\">Delete</button>\n  <button mat-raised-button (click)=\"playAction()\">Play</button>\n  <button mat-raised-button *ngIf=\"showEditDetails\" (click)=\"editAction()\">Edit Details</button>\n  <button mat-raised-button (click)=\"playWorkflowFromCurrentAction()\">\n      Play Workflow From Here</button>\n</div>\n");

/***/ }),

/***/ "aFBn":
/*!***********************************!*\
  !*** ./src/app/constants/rect.ts ***!
  \***********************************/
/*! exports provided: Rect, Bounds, Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rect", function() { return Rect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bounds", function() { return Bounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
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
/**
 * Rectangle class to convert the format between rect need by frontend canvas
 * and one generated by the android xml dumper.
 */
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        var _this = this;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.toString = function () {
            return "[" + _this.x + "," + _this.y + "][" + _this.width + "," + _this.height + "]";
        };
    }
    /** Create rect from x1,x2,y1,y2 */
    Rect.createFromCoordinatesStr = function (coordinates) {
        var rect = new Rect(0, 0, 0, 0);
        if (!coordinates || coordinates.length <= 0) {
            return rect;
        }
        // comes in as [startX,startY][endX,endY] in a string
        // returns array in form of:
        // ["", "startX", "startY", "", "endX", "endY", "" ]
        var coordinatesArray = coordinates.split(/[\[\],]/);
        if (coordinatesArray.length !== 7) {
            return rect;
        }
        rect.x = Rect.strToNumber(coordinatesArray[1]);
        rect.y = Rect.strToNumber(coordinatesArray[2]);
        var endX = Rect.strToNumber(coordinatesArray[4]);
        var endY = Rect.strToNumber(coordinatesArray[5]);
        rect.width = endX - rect.x;
        rect.height = endY - rect.y;
        return rect;
    };
    Rect.createFromBoundsStr = function (coordinates) {
        var rect = new Rect(0, 0, 0, 0);
        if (!coordinates || coordinates.length <= 0) {
            return rect;
        }
        // comes in as [startX,startY][width,height] in a string
        // returns array in form of:
        // ["", "startX", "startY", "", "endX", "endY", "" ]
        var coordinatesArray = coordinates.split(/[\[\],]/);
        if (coordinatesArray.length !== 7) {
            return rect;
        }
        rect.x = Rect.strToNumber(coordinatesArray[1]);
        rect.y = Rect.strToNumber(coordinatesArray[2]);
        rect.width = Rect.strToNumber(coordinatesArray[4]);
        rect.height = Rect.strToNumber(coordinatesArray[5]);
        return rect;
    };
    Rect.fromBounds = function (bounds) {
        return new Rect(bounds.x1, bounds.y1, bounds.x2 - bounds.x1, bounds.y2 - bounds.y1);
    };
    // Backend use (x1,y1)(x2,y2), need to do the conversion here
    Rect.prototype.toBounds = function () {
        return new Bounds(this.x, this.y, this.x + this.width, this.y + this.height);
    };
    Rect.prototype.contains = function (r) {
        return this.x <= r.x && this.y <= r.y &&
            this.x + this.width >= r.x + r.width &&
            this.y + this.height >= r.y + r.height;
    };
    Rect.prototype.area = function () {
        return this.width * this.height;
    };
    /**
     * Map current rectangle to the target, for example, (10,20) on a 100*200
     * canvas is actually (100, 300) on a 1000*3000 physical screen.
     * xRatio = 10 / 100 = 0.1
     * x = 10 / 0.1 = 100;
     * The rest fields are similar.
     */
    Rect.prototype.scaleToTargetSurface = function (rectSrc, rectTarget) {
        var xRatio = rectSrc.width / rectTarget.width;
        var yRatio = rectSrc.height / rectTarget.height;
        var rect = new Rect(this.x / xRatio, this.y / yRatio, this.width / xRatio, this.height / yRatio);
        return rect;
    };
    Rect.strToNumber = function (str) {
        var val = Number(str);
        if (isNaN(val))
            throw new Error('wrong format of coordinate');
        return val;
    };
    return Rect;
}());

/** Uses (x1,y1)(x2,y2) to represent a rectangle area, matches the backend */
var Bounds = /** @class */ (function () {
    function Bounds(x1, y1, x2, y2) {
        var _this = this;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.toString = function () {
            return "[" + _this.x1 + "," + _this.y1 + "][" + _this.x2 + "," + _this.y2 + "]";
        };
    }
    /** Converts to [startX,startY][endX,endY] string format */
    Bounds.prototype.toBoundsStr = function () {
        return "[" + this.x1 + "," + this.y1 + "][" + this.x2 + "," + this.y2 + "]";
    };
    Bounds.prototype.getDistanceToOriPoint = function () {
        return Math.sqrt(this.x1 * this.x1 + this.y1 * this.y1);
    };
    Bounds.prototype.area = function () {
        return (this.x2 - this.x1) * (this.y2 - this.y1);
    };
    Bounds.prototype.compare = function (r) {
        if (this.getDistanceToOriPoint() < r.getDistanceToOriPoint()) {
            return -1;
        }
        else if (this.getDistanceToOriPoint() === r.getDistanceToOriPoint()) {
            if (this.area() === r.area()) {
                return 0;
            }
            return this.area() < r.area() ? -1 : 1;
        }
        else {
            return 1;
        }
    };
    return Bounds;
}());

/** Stores the x,y coordinate on the screen */
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.getDistance = function (targetPoint) {
        return Math.sqrt((this.x - targetPoint.x) * (this.x - targetPoint.x) +
            (this.y - targetPoint.y) * (this.y - targetPoint.y));
    };
    return Point;
}());



/***/ }),

/***/ "aIQo":
/*!******************************************************!*\
  !*** ./src/app/test_explorer/new_project_dialog.css ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.error-message {\n    color: red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld19wcm9qZWN0X2RpYWxvZy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7SUFDSSxVQUFVO0FBQ2QiLCJmaWxlIjoibmV3X3Byb2plY3RfZGlhbG9nLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4uZXJyb3ItbWVzc2FnZSB7XG4gICAgY29sb3I6IHJlZDtcbn0iXX0= */");

/***/ }),

/***/ "aJH2":
/*!******************************************************************!*\
  !*** ./src/app/screen_validation_flow/screen_validation_flow.ts ***!
  \******************************************************************/
/*! exports provided: ScreenValidationFlowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenValidationFlowComponent", function() { return ScreenValidationFlowComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_screen_validation_flow_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./screen_validation_flow.ng.html */ "flaW");
/* harmony import */ var _screen_validation_flow_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./screen_validation_flow.css */ "t8yB");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/rect */ "aFBn");
/* harmony import */ var _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/screen_validation_constants */ "vBhh");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/control_message_service */ "Etwr");
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










/** Allows user to create screen related validation action */
var ScreenValidationFlowComponent = /** @class */ (function () {
    function ScreenValidationFlowComponent(dialogRef, backendManagerService, controlMessageService, snackBar, data) {
        this.dialogRef = dialogRef;
        this.backendManagerService = backendManagerService;
        this.controlMessageService = controlMessageService;
        this.snackBar = snackBar;
        this.data = data;
        this.LONGCLICK_DURATION_MS = 2000;
        this.SNACKBAR_DURATION_MS = 2000;
        this.VALIDATION_GROUPS = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["VALIDATION_GROUPS"];
        this.VALIDATION_ACTIONS = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["VALIDATION_ACTIONS"];
        this.SPECIAL_CLICK_ACTIONS = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["SPECIAL_CLICK_ACTIONS"];
        this.DIRECTIONS = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["DIRECTIONS"];
        this.elementSelectorTypes = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ELEMENT_SELECTOR_TYPES"];
        this.selectedBounds = new _constants_rect__WEBPACK_IMPORTED_MODULE_6__["Bounds"](0, 0, 0, 0);
        this.selectedDirection = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["DirectionType"].DOWN;
        this.selectedElementSelectorType = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ElementSelectorType"].DISPLAY_TEXT;
        this.selectedValidationGroup = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ValidationGroupType"].SCREEN_CONTENT_VALIDATION;
        this.selectedSpecialClick = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["SpecialClickType"].DOUBLE_CLICK;
        this.selectedValidationAction = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ValidationActionType"].SCREEN_CONTENT_VALIDATION_ACTION;
        this.selectedBounds = data.bounds;
    }
    ScreenValidationFlowComponent.prototype.closePopup = function () {
        this.dialogRef.close();
    };
    Object.defineProperty(ScreenValidationFlowComponent.prototype, "selectedActionType", {
        get: function () {
            return this.selectedValidationAction;
        },
        enumerable: false,
        configurable: true
    });
    ScreenValidationFlowComponent.prototype.getNextButtonText = function () {
        if (this.selectedValidationGroup === _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ValidationGroupType"].SPECIAL_CLICK) {
            return 'Add Action';
        }
        return 'Next';
    };
    ScreenValidationFlowComponent.prototype.nextPage = function (stepper) {
        if (this.selectedValidationGroup === _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ValidationGroupType"].SPECIAL_CLICK) {
            this.specialClick();
            return;
        }
        stepper.next();
    };
    ScreenValidationFlowComponent.prototype.showDirection = function () {
        return this.selectedValidationGroup ===
            _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ValidationGroupType"].SCREEN_CONTENT_VALIDATION &&
            this.selectedValidationAction ===
                _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ValidationActionType"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION;
    };
    ScreenValidationFlowComponent.prototype.showFetchContentAction = function () {
        return this.selectedValidationGroup ===
            _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ValidationGroupType"].FETCH_SCREEN_CONTENT;
    };
    ScreenValidationFlowComponent.prototype.showSpecialActions = function () {
        return this.selectedValidationGroup === _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ValidationGroupType"].SPECIAL_CLICK;
    };
    ScreenValidationFlowComponent.prototype.showValidationActions = function () {
        return this.selectedValidationGroup ===
            _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ValidationGroupType"].SCREEN_CONTENT_VALIDATION;
    };
    ScreenValidationFlowComponent.prototype.specialClick = function () {
        var _this = this;
        var observable = null;
        switch (this.selectedSpecialClick) {
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["SpecialClickType"].CLICK_WITH_CONTEXT:
                observable = this.backendManagerService.tap((this.selectedBounds.x1 + this.selectedBounds.x2) / 2, (this.selectedBounds.y1 + this.selectedBounds.y2) / 2, false);
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["SpecialClickType"].DOUBLE_CLICK:
                observable = this.backendManagerService.doubleClick((this.selectedBounds.x1 + this.selectedBounds.x2) / 2, (this.selectedBounds.y1 + this.selectedBounds.y2) / 2);
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["SpecialClickType"].LONG_CLICK:
                observable = this.backendManagerService.longClick((this.selectedBounds.x1 + this.selectedBounds.x2) / 2, (this.selectedBounds.y1 + this.selectedBounds.y2) / 2, this.LONGCLICK_DURATION_MS);
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["SpecialClickType"].ZOOM_IN:
                observable = this.backendManagerService.zoom(this.selectedBounds.x1, this.selectedBounds.y1, this.selectedBounds.x2, this.selectedBounds.y2, true);
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["SpecialClickType"].ZOOM_OUT:
                observable = this.backendManagerService.zoom(this.selectedBounds.x1, this.selectedBounds.y1, this.selectedBounds.x2, this.selectedBounds.y2, false);
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["SpecialClickType"].DRAG_WITH_CONTEXT:
                observable = this.backendManagerService.dragWithStartEndContext(this.selectedBounds.x1, this.selectedBounds.y1, this.selectedBounds.x2, this.selectedBounds.y2);
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["SpecialClickType"].SWIPE_WITH_CONTEXT:
                observable = this.backendManagerService.swipeWithStartEndContext(this.selectedBounds.x1, this.selectedBounds.y1, this.selectedBounds.x2, this.selectedBounds.y2);
                break;
            default:
                break;
        }
        if (!observable) {
            return;
        }
        observable.subscribe(function () {
            _this.dialogRef.close();
            _this.snackBar.open('New action added to workflow.', 'OK', { duration: _this.SNACKBAR_DURATION_MS });
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    ScreenValidationFlowComponent.prototype.previousPage = function (stepper) {
        stepper.previous();
    };
    ScreenValidationFlowComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_9__["ControlMessageService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
    ]; };
    ScreenValidationFlowComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'screen-validation-flow',
            template: _raw_loader_screen_validation_flow_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_screen_validation_flow_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_9__["ControlMessageService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"], Object])
    ], ScreenValidationFlowComponent);
    return ScreenValidationFlowComponent;
}());



/***/ }),

/***/ "alCr":
/*!*************************************!*\
  !*** ./src/app/constants/jstree.ts ***!
  \*************************************/
/*! exports provided: JsTreeNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsTreeNode", function() { return JsTreeNode; });
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
/** Object expected by jstree library. */
var JsTreeNode = /** @class */ (function () {
    function JsTreeNode(text, id, isFolder) {
        if (isFolder === void 0) { isFolder = true; }
        this.text = text;
        this.id = id;
        this.isFolder = isFolder;
        this.icon = 'fa fa-folder';
        this.state = { 'opened': true };
        this.children = [];
        if (!isFolder) {
            this.icon = 'fa fa-file-code-o';
        }
    }
    return JsTreeNode;
}());



/***/ }),

/***/ "ayJo":
/*!***************************************************************!*\
  !*** ./src/app/screen_validation_flow/fetch_content_form.css ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.form-container {\n  display: flex;\n  flex-direction: column;\n  min-width: 600px;\n  overflow:auto;\n  max-height: 600px;\n  flex:1;\n  -webkit-padding-before: 0%;\n          padding-block-start: 0%\n}\n\n.selected-content {\n  font-size: 14px;\n  display: flex;\n  height: 15px;\n  max-height: 100px;\n  vertical-align: top;\n}\n\n.selected-content-span {\n  font-size:12px;\n  color: #3f51b5;\n  flex:1;\n  height: 100;\n  display: flex;\n  overflow-y: auto;\n  }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZldGNoX2NvbnRlbnRfZm9ybS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLE1BQU07RUFDTiwwQkFBc0I7VUFBdEI7QUFDRjs7QUFFQTtFQUNFLGVBQWU7RUFDZixhQUFhO0VBQ2IsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsY0FBYztFQUNkLE1BQU07RUFDTixXQUFXO0VBQ1gsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQiIsImZpbGUiOiJmZXRjaF9jb250ZW50X2Zvcm0uY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5mb3JtLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi13aWR0aDogNjAwcHg7XG4gIG92ZXJmbG93OmF1dG87XG4gIG1heC1oZWlnaHQ6IDYwMHB4O1xuICBmbGV4OjE7XG4gIHBhZGRpbmctYmxvY2stc3RhcnQ6IDAlXG59XG5cbi5zZWxlY3RlZC1jb250ZW50IHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDE1cHg7XG4gIG1heC1oZWlnaHQ6IDEwMHB4O1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xufVxuXG4uc2VsZWN0ZWQtY29udGVudC1zcGFuIHtcbiAgZm9udC1zaXplOjEycHg7XG4gIGNvbG9yOiAjM2Y1MWI1O1xuICBmbGV4OjE7XG4gIGhlaWdodDogMTAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICB9XG4iXX0= */");

/***/ }),

/***/ "bQ7Z":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/popup_dialogs/python_editor_simple.ng.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div #editorContainer class=\"python-code-editor\">\n  <textarea placeholder=\"Enter your python script here\"\n            matInput [(ngModel)]=\"pythonScript\" rows=\"10\" cols=\"100\"></textarea>\n</div>\n");

/***/ }),

/***/ "bl9C":
/*!****************************************!*\
  !*** ./src/app/constants/constants.ts ***!
  \****************************************/
/*! exports provided: BACKEND_BASE_URL, LONGCLICK_DURATION_MS, SNACKBAR_DURATION_MS, DEFAULT_WORKFLOW_NAME, DEFAULT_PROJECT_ID_PREFIX, DEFAULT_PROJECT_NAME_PREFIX, DeviceStatus, BottomMenuTabs, ImportCopyType, IMPORT_COPY_TYPES, ImportType, KeyCodes, MessageTypes, POPUP_DIALOG_DEFAULT_DIMENSION, ActionColor, TestStatusMsg, CanvasOverlayColor, SwipeDirection, RotateDirection, PdbDebuggerOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BACKEND_BASE_URL", function() { return BACKEND_BASE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LONGCLICK_DURATION_MS", function() { return LONGCLICK_DURATION_MS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNACKBAR_DURATION_MS", function() { return SNACKBAR_DURATION_MS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_WORKFLOW_NAME", function() { return DEFAULT_WORKFLOW_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_PROJECT_ID_PREFIX", function() { return DEFAULT_PROJECT_ID_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_PROJECT_NAME_PREFIX", function() { return DEFAULT_PROJECT_NAME_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceStatus", function() { return DeviceStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BottomMenuTabs", function() { return BottomMenuTabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportCopyType", function() { return ImportCopyType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IMPORT_COPY_TYPES", function() { return IMPORT_COPY_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportType", function() { return ImportType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCodes", function() { return KeyCodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageTypes", function() { return MessageTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POPUP_DIALOG_DEFAULT_DIMENSION", function() { return POPUP_DIALOG_DEFAULT_DIMENSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionColor", function() { return ActionColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestStatusMsg", function() { return TestStatusMsg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasOverlayColor", function() { return CanvasOverlayColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwipeDirection", function() { return SwipeDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RotateDirection", function() { return RotateDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PdbDebuggerOptions", function() { return PdbDebuggerOptions; });
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
var BACKEND_BASE_URL = 'http://localhost:8089';
/** Default duration for long click */
var LONGCLICK_DURATION_MS = 2000;
/** Default duration to show snack bars for notifications */
var SNACKBAR_DURATION_MS = 2000;
/**
 * Default workflow name for the current compound action in order to be able to
 * trace back to the unsaved workflow.
 */
var DEFAULT_WORKFLOW_NAME = 'Default_Workflow';
/**
 * Default prefix of the project id for the default project that existing user
 * are using.
 */
var DEFAULT_PROJECT_ID_PREFIX = 'default_project_id_';
/**
 * Default prefix of the project name that is created the first time UICD
 * launched.
 */
var DEFAULT_PROJECT_NAME_PREFIX = 'default_project_';
/** Connected devices status */
var DeviceStatus;
(function (DeviceStatus) {
    DeviceStatus[DeviceStatus["NO_DEVICE"] = 0] = "NO_DEVICE";
    DeviceStatus[DeviceStatus["READY_TO_CONNECT"] = 1] = "READY_TO_CONNECT";
    DeviceStatus[DeviceStatus["CONNECTED"] = 2] = "CONNECTED";
    DeviceStatus[DeviceStatus["CONNECTING"] = 3] = "CONNECTING";
})(DeviceStatus || (DeviceStatus = {}));
/** Tab titles for bottom tab menu */
var BottomMenuTabs;
(function (BottomMenuTabs) {
    BottomMenuTabs[BottomMenuTabs["LOG"] = 0] = "LOG";
    BottomMenuTabs[BottomMenuTabs["UI_VIEWER"] = 1] = "UI_VIEWER";
})(BottomMenuTabs || (BottomMenuTabs = {}));
/** Import Copy types */
var ImportCopyType;
(function (ImportCopyType) {
    ImportCopyType["SOFTCOPY"] = "SOFTCOPY";
    ImportCopyType["HARDCOPY"] = "HARDCOPY";
})(ImportCopyType || (ImportCopyType = {}));
/** Direction model for ratio button (swipe or scroll related actions) */
var IMPORT_COPY_TYPES = [
    { value: ImportCopyType.SOFTCOPY, displayText: 'Soft Copy' },
    { value: ImportCopyType.HARDCOPY, displayText: 'Hard Copy' },
];
/** Import types */
var ImportType;
(function (ImportType) {
    ImportType[ImportType["UUID"] = 0] = "UUID";
    ImportType[ImportType["USERNAME"] = 1] = "USERNAME";
})(ImportType || (ImportType = {}));
/** Reserved key code for android device */
var KeyCodes;
(function (KeyCodes) {
    KeyCodes[KeyCodes["KEYCODE_HOME"] = 3] = "KEYCODE_HOME";
    KeyCodes[KeyCodes["KEYCODE_BACK"] = 4] = "KEYCODE_BACK";
    KeyCodes[KeyCodes["KEYCODE_DPAD_UP"] = 19] = "KEYCODE_DPAD_UP";
    KeyCodes[KeyCodes["KEYCODE_DPAD_DOWN"] = 20] = "KEYCODE_DPAD_DOWN";
    KeyCodes[KeyCodes["KEYCODE_DPAD_LEFT"] = 21] = "KEYCODE_DPAD_LEFT";
    KeyCodes[KeyCodes["KEYCODE_DPAD_RIGHT"] = 22] = "KEYCODE_DPAD_RIGHT";
    KeyCodes[KeyCodes["KEYCODE_DPAD_CENTER"] = 23] = "KEYCODE_DPAD_CENTER";
    KeyCodes[KeyCodes["KEYCODE_VOLUME_UP"] = 24] = "KEYCODE_VOLUME_UP";
    KeyCodes[KeyCodes["KEYCODE_VOLUME_DOWN"] = 25] = "KEYCODE_VOLUME_DOWN";
    KeyCodes[KeyCodes["KEYCODE_POWER"] = 26] = "KEYCODE_POWER";
    KeyCodes[KeyCodes["KEYCODE_MEDIA_PLAY_PAUSE"] = 85] = "KEYCODE_MEDIA_PLAY_PAUSE";
    KeyCodes[KeyCodes["KEYCODE_OVERVIEW"] = 187] = "KEYCODE_OVERVIEW";
})(KeyCodes || (KeyCodes = {}));
/** Message type for indicate workflow's status */
var MessageTypes;
(function (MessageTypes) {
    MessageTypes[MessageTypes["REFRESH_WORKFLOW"] = 0] = "REFRESH_WORKFLOW";
    MessageTypes[MessageTypes["NODE_SELECTED"] = 1] = "NODE_SELECTED";
    MessageTypes[MessageTypes["NODE_HOVERED"] = 2] = "NODE_HOVERED";
    MessageTypes[MessageTypes["CLEAR_CANVAS"] = 3] = "CLEAR_CANVAS";
    MessageTypes[MessageTypes["INSPECT_CLICKED_NODE"] = 4] = "INSPECT_CLICKED_NODE";
    MessageTypes[MessageTypes["SET_INSPECT_MODE"] = 5] = "SET_INSPECT_MODE";
    MessageTypes[MessageTypes["TEST_START"] = 6] = "TEST_START";
    MessageTypes[MessageTypes["TEST_END"] = 7] = "TEST_END";
    MessageTypes[MessageTypes["REFRESH_XML"] = 8] = "REFRESH_XML";
    MessageTypes[MessageTypes["ADD_NODE_TO_TREE"] = 9] = "ADD_NODE_TO_TREE";
    MessageTypes[MessageTypes["REFRESH_TEST_CASE_TREE"] = 10] = "REFRESH_TEST_CASE_TREE";
    MessageTypes[MessageTypes["REFRESH_OVERLAY"] = 11] = "REFRESH_OVERLAY";
    MessageTypes[MessageTypes["HIGHLIGHT_OCR"] = 12] = "HIGHLIGHT_OCR";
})(MessageTypes || (MessageTypes = {}));
/** Default size of a popup dialog */
var POPUP_DIALOG_DEFAULT_DIMENSION = {
    width: '800px',
    height: '600px',
};
/** Default Color for Action */
var ActionColor;
(function (ActionColor) {
    ActionColor["BLUE"] = "blue";
    ActionColor["BLACK"] = "black";
    ActionColor["GRAY"] = "gray";
})(ActionColor || (ActionColor = {}));
/** Test status message for logging */
var TestStatusMsg;
(function (TestStatusMsg) {
    TestStatusMsg["TEST_START"] = "================ Test Start ==================";
    TestStatusMsg["TEST_END"] = "================ Test End ====================";
    TestStatusMsg["TEST_END_CANCELLED"] = "================ Test End (Cancelled) ========";
})(TestStatusMsg || (TestStatusMsg = {}));
/** Overlay color in inspect mode */
var CanvasOverlayColor;
(function (CanvasOverlayColor) {
    CanvasOverlayColor["SELECTED"] = "#68b4e855";
    CanvasOverlayColor["HOVER"] = "#00008055";
    CanvasOverlayColor["OCR_SELECT"] = "#00ff00ff";
})(CanvasOverlayColor || (CanvasOverlayColor = {}));
/** Four directions that user can do when swiping */
var SwipeDirection;
(function (SwipeDirection) {
    SwipeDirection["LEFT"] = "left";
    SwipeDirection["RIGHT"] = "right";
    SwipeDirection["UP"] = "up";
    SwipeDirection["DOWN"] = "down";
})(SwipeDirection || (SwipeDirection = {}));
/** Directions for screen rotation */
var RotateDirection;
(function (RotateDirection) {
    RotateDirection["PORTRAIT"] = "0";
    RotateDirection["LANDSCAPE"] = "1";
})(RotateDirection || (RotateDirection = {}));
/** Enum for pdb debugger options */
var PdbDebuggerOptions;
(function (PdbDebuggerOptions) {
    PdbDebuggerOptions["NEXT"] = "NEXT";
    PdbDebuggerOptions["STEP_IN"] = "STEP_IN";
    PdbDebuggerOptions["CONTINUE"] = "CONTINUE";
    PdbDebuggerOptions["BREAK"] = "BREAK";
    PdbDebuggerOptions["RUN"] = "RUN";
})(PdbDebuggerOptions || (PdbDebuggerOptions = {}));


/***/ }),

/***/ "bo1v":
/*!*********************************************************!*\
  !*** ./src/app/popup_dialogs/replay_details_dialog.css ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.test-status-pass {\n  color: green;\n}\n\n.test-status-fail {\n  color: OrangeRed;\n}\n\n.test-status-cancelled {\n  color: OrangeRed;\n}\n\n:host ::ng-deep .skipped-status {\n  color:Orange;\n}\n\n:host ::ng-deep .skipped-content {\n  text-decoration: line-through;\n}\n\n:host ::ng-deep .exit-current-compound_status {\n  color:Chocolate;\n}\n\n:host ::ng-deep .failed-status {\n  color:OrangeRed;\n}\n\n:host ::ng-deep .pass-status {\n  color:green;\n}\n\n:host ::ng-deep .content-bold {\n font-weight: bold;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcGxheV9kZXRhaWxzX2RpYWxvZy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtDQUNDLGlCQUFpQjtBQUNsQiIsImZpbGUiOiJyZXBsYXlfZGV0YWlsc19kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi50ZXN0LXN0YXR1cy1wYXNzIHtcbiAgY29sb3I6IGdyZWVuO1xufVxuXG4udGVzdC1zdGF0dXMtZmFpbCB7XG4gIGNvbG9yOiBPcmFuZ2VSZWQ7XG59XG5cbi50ZXN0LXN0YXR1cy1jYW5jZWxsZWQge1xuICBjb2xvcjogT3JhbmdlUmVkO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgLnNraXBwZWQtc3RhdHVzIHtcbiAgY29sb3I6T3JhbmdlO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgLnNraXBwZWQtY29udGVudCB7XG4gIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgLmV4aXQtY3VycmVudC1jb21wb3VuZF9zdGF0dXMge1xuICBjb2xvcjpDaG9jb2xhdGU7XG59XG5cbjpob3N0IDo6bmctZGVlcCAuZmFpbGVkLXN0YXR1cyB7XG4gIGNvbG9yOk9yYW5nZVJlZDtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIC5wYXNzLXN0YXR1cyB7XG4gIGNvbG9yOmdyZWVuO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgLmNvbnRlbnQtYm9sZCB7XG4gZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4iXX0= */");

/***/ }),

/***/ "c5Vj":
/*!************************************************************!*\
  !*** ./src/app/test_explorer/share_with_project_dialog.ts ***!
  \************************************************************/
/*! exports provided: ShareWithProjectDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareWithProjectDialog", function() { return ShareWithProjectDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_share_with_project_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./share_with_project_dialog.ng.html */ "hlqO");
/* harmony import */ var _share_with_project_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./share_with_project_dialog.css */ "MuLV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
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








/** The dialog when creating a new project. */
var ShareWithProjectDialog = /** @class */ (function () {
    function ShareWithProjectDialog(dialogRef, backendManagerService, data) {
        this.dialogRef = dialogRef;
        this.backendManagerService = backendManagerService;
        this.data = data;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
        this.userList = '';
        this.userList = data.shareWith || '';
    }
    ShareWithProjectDialog.prototype.dismissDialog = function () {
        this.dialogRef.close();
    };
    ShareWithProjectDialog.prototype.saveNewProject = function () {
        var _this = this;
        this.backendManagerService.addShareWithUserListToProject(this.userList)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.dismissDialog();
        });
    };
    ShareWithProjectDialog.prototype.ngOnDestroy = function () {
        this.destroyed.next();
    };
    ShareWithProjectDialog.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__["BackendManagerService"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
    ]; };
    ShareWithProjectDialog = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'share_with_project_dialog',
            template: _raw_loader_share_with_project_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_share_with_project_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__["BackendManagerService"], Object])
    ], ShareWithProjectDialog);
    return ShareWithProjectDialog;
}());



/***/ }),

/***/ "dmfx":
/*!*********************************************!*\
  !*** ./src/app/screen_cast/screen_cast.css ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.demo-tab-group {\n  border: 1px solid #e8e8e8;\n}\n\n.demo-tab-content {\n  padding: 16px;\n}\n\n.phone-canvas-widget {\n  background-color: white;\n  z-index: 0;\n}\n\n.phone-canvas-widget-rotated {\n  background-color: white;\n  z-index: 0;\n  transform: rotate(270deg) translate(140px, 140px);\n}\n\n.canvas-wrapper {\n  margin-top: 10px;\n  width: 360px;\n  min-width: 360px;\n  max-height: 100% !important;\n}\n\n.canvas-wrapper-rotated {\n  margin-top: 10px;\n  width: 640px;\n  min-width: 640px;\n  max-height: 360px;\n}\n\n.phone-canvas-widget2 {\n  background-color: #11000000;\n  z-index: 9;\n}\n\n.phone-sidenav {\n  display: flex;\n  flex-direction: column;\n}\n\n.devices_selector {\n  position: absolute;\n  top: 720px;\n  left:100px;\n}\n\n.spinner {\n  position: absolute;\n  z-index: 999;\n  left: 35%;\n  top: 35%;\n}\n\n.canvas-overlay{\n  background-color: aquamarine;\n  width: 100%;\n  height: 100%;\n}\n\n.btn-container{\n  padding: 15px 10px 15px 10px;\n  background-color: whitesmoke;\n}\n\n.control-nav {\n  flex-direction: column;\n}\n\n.uicd-row-breaker {\n  background-color: #e5e5e5;\n  height: 3px;\n}\n\n.tab-group{\n  background-color: whitesmoke;\n}\n\n.clearfix {\n  clear: both;\n}\n\n.screen-widget-root {\n  position: relative;\n  height: 100%;\n}\n\n.phone-wrapper {\n  height: 100%;\n}\n\n.phone-overlay-wrapper {\n  background-color: rgba(0, 0, 255, 0);\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  /* absolute position implies no width and height */\n  width: 100%;\n  height: 100%\n}\n\n.recorder-main {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmVlbl9jYXN0LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixVQUFVO0FBQ1o7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsVUFBVTtFQUNWLGlEQUFpRDtBQUNuRDs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLFNBQVM7RUFDVCxRQUFRO0FBQ1Y7O0FBRUE7RUFDRSw0QkFBNEI7RUFDNUIsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLDRCQUE0QjtFQUM1Qiw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsV0FBVztBQUNiOztBQUVBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLG9DQUFvQztFQUNwQyxrQkFBa0I7RUFDbEIsU0FBUztFQUNULFFBQVE7RUFDUixrREFBa0Q7RUFDbEQsV0FBVztFQUNYO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCIiwiZmlsZSI6InNjcmVlbl9jYXN0LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4uZGVtby10YWItZ3JvdXAge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZThlOGU4O1xufVxuXG4uZGVtby10YWItY29udGVudCB7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG5cbi5waG9uZS1jYW52YXMtd2lkZ2V0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHotaW5kZXg6IDA7XG59XG5cbi5waG9uZS1jYW52YXMtd2lkZ2V0LXJvdGF0ZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgei1pbmRleDogMDtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKSB0cmFuc2xhdGUoMTQwcHgsIDE0MHB4KTtcbn1cblxuLmNhbnZhcy13cmFwcGVyIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgd2lkdGg6IDM2MHB4O1xuICBtaW4td2lkdGg6IDM2MHB4O1xuICBtYXgtaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XG59XG5cbi5jYW52YXMtd3JhcHBlci1yb3RhdGVkIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgd2lkdGg6IDY0MHB4O1xuICBtaW4td2lkdGg6IDY0MHB4O1xuICBtYXgtaGVpZ2h0OiAzNjBweDtcbn1cblxuLnBob25lLWNhbnZhcy13aWRnZXQyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzExMDAwMDAwO1xuICB6LWluZGV4OiA5O1xufVxuXG4ucGhvbmUtc2lkZW5hdiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4uZGV2aWNlc19zZWxlY3RvciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA3MjBweDtcbiAgbGVmdDoxMDBweDtcbn1cblxuLnNwaW5uZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDk5OTtcbiAgbGVmdDogMzUlO1xuICB0b3A6IDM1JTtcbn1cblxuLmNhbnZhcy1vdmVybGF5e1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhbWFyaW5lO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uYnRuLWNvbnRhaW5lcntcbiAgcGFkZGluZzogMTVweCAxMHB4IDE1cHggMTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcbn1cblxuLmNvbnRyb2wtbmF2IHtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLnVpY2Qtcm93LWJyZWFrZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTVlNWU1O1xuICBoZWlnaHQ6IDNweDtcbn1cblxuLnRhYi1ncm91cHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcbn1cblxuLmNsZWFyZml4IHtcbiAgY2xlYXI6IGJvdGg7XG59XG5cbi5zY3JlZW4td2lkZ2V0LXJvb3Qge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLnBob25lLXdyYXBwZXIge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5waG9uZS1vdmVybGF5LXdyYXBwZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDI1NSwgMCk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMHB4O1xuICB0b3A6IDBweDtcbiAgLyogYWJzb2x1dGUgcG9zaXRpb24gaW1wbGllcyBubyB3aWR0aCBhbmQgaGVpZ2h0ICovXG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCVcbn1cblxuLnJlY29yZGVyLW1haW4ge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuIl19 */");

/***/ }),

/***/ "eA3M":
/*!***************************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/advanced_actions_dialog_module.ts ***!
  \***************************************************************************/
/*! exports provided: AdvancedActionsDialogModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvancedActionsDialogModule", function() { return AdvancedActionsDialogModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/chips */ "A5z7");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var angular2_query_builder__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! angular2-query-builder */ "sPFo");
/* harmony import */ var _popup_dialogs_dialogs_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../popup_dialogs/dialogs_module */ "XVJF");
/* harmony import */ var _screen_validation_flow_screen_validation_flow_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../screen_validation_flow/screen_validation_flow_module */ "1bMm");
/* harmony import */ var _advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./advanced_actions_dialog */ "+MME");
/* harmony import */ var _script_action_info_dialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./script_action_info_dialog */ "sy93");
/* harmony import */ var _snippet_action_info_dialog__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./snippet_action_info_dialog */ "2bDc");
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
























var AdvancedActionsDialogModule = /** @class */ (function () {
    function AdvancedActionsDialogModule() {
    }
    AdvancedActionsDialogModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_21__["AdvancedActionDialogComponent"],
                _snippet_action_info_dialog__WEBPACK_IMPORTED_MODULE_23__["SnippetActionInfoDialogComponent"],
                _script_action_info_dialog__WEBPACK_IMPORTED_MODULE_22__["ScriptActionInfoDialogComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__["BrowserModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["BrowserAnimationsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _popup_dialogs_dialogs_module__WEBPACK_IMPORTED_MODULE_19__["DialogsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_5__["MatButtonToggleModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__["MatCheckboxModule"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_8__["MatChipsModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_14__["MatRadioModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MatOptionModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_15__["MatSelectModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_13__["MatProgressBarModule"], angular2_query_builder__WEBPACK_IMPORTED_MODULE_18__["QueryBuilderModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _screen_validation_flow_screen_validation_flow_module__WEBPACK_IMPORTED_MODULE_20__["ScreenValidationFlowModule"],
            ],
            exports: [_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_21__["AdvancedActionDialogComponent"]],
        })
    ], AdvancedActionsDialogModule);
    return AdvancedActionsDialogModule;
}());



/***/ }),

/***/ "flaW":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/screen_validation_flow/screen_validation_flow.ng.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<mat-horizontal-stepper #stepper class=\"validation-stepper\">\n  <mat-step>\n    <form>\n      <ng-template matStepLabel>Select Action Type</ng-template>\n      <div class='validation-flow-step'>\n        <div>\n          <h3>Please select action type:</h3>\n        </div>\n        <div>\n          <mat-radio-group placeholder=\"\" [(ngModel)]=\"selectedValidationGroup\" name=\"validationGroup\">\n            <mat-radio-button class='validation-group-radio' *ngFor=\"let c of VALIDATION_GROUPS\" [value]=\"c.value\">\n              {{ c.displayText }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </div>\n        <div *ngIf=\"showValidationActions()\">\n          <div>\n            <h3>Please select validation subtype:</h3>\n          </div>\n          <mat-radio-group placeholder=\"\" [(ngModel)]=\"selectedValidationAction\" name=\"validationAction\">\n            <mat-radio-button *ngFor=\"let c of VALIDATION_ACTIONS\" [value]=\"c.value\">\n              {{ c.displayText }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </div>\n        <div *ngIf=\"showSpecialActions()\">\n          <div>\n            <h3>Please select special click subtype:</h3>\n          </div>\n          <mat-radio-group placeholder=\"\" [(ngModel)]=\"selectedSpecialClick\" name=\"specialClickType\">\n            <mat-radio-button *ngFor=\"let c of SPECIAL_CLICK_ACTIONS\" [value]=\"c.value\">\n              {{ c.displayText }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </div>\n        <div *ngIf=\"showDirection()\">\n          <div>\n            <h3>Please select scroll direction:</h3>\n          </div>\n          <mat-radio-group placeholder=\"\" [(ngModel)]=\"selectedDirection\" name=\"directionModel\">\n            <mat-radio-button *ngFor=\"let c of DIRECTIONS\" [value]=\"c.value\">\n              {{ c.displayText }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </div>\n      </div>\n      <div>\n        <button mat-raised-button color=\"primary\" (click)=\"nextPage(stepper)\">{{getNextButtonText()}}</button>\n      </div>\n    </form>\n  </mat-step>\n  <mat-step>\n    <form class=\"step-two-form\">\n      <ng-template matStepLabel>Fill Action Details</ng-template>\n      <fetch-content-form *ngIf=\"showFetchContentAction()\" [selectedBounds]=\"selectedBounds\"\n                          (actionAdded)='closePopup()' (previousPage)='previousPage(stepper)'></fetch-content-form>\n\n      <validation-details *ngIf=\"showValidationActions()\" [selectedBounds]=\"selectedBounds\"\n                          [scrollDirectionType]=\"selectedDirection\" [selectedActionType]='selectedActionType' (actionAdded)='closePopup()'\n                          (previousPage)='previousPage(stepper)'>\n      </validation-details>\n    </form>\n  </mat-step>\n</mat-horizontal-stepper>\n");

/***/ }),

/***/ "gQki":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/test_explorer/export_google3_dialog.ng.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div mat-dialog-content fxLayout=\"column\">\n  <div fxLayout=\"column\">\n    <mat-form-field >\n      <input matInput placeholder=\"citc client\" [(ngModel)]=\"citcClient\">\n    </mat-form-field><br>\n    <mat-form-field >\n      <input matInput placeholder=\"Google3 file path\" [(ngModel)]=\"filePath\">\n    </mat-form-field>\n  </div>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"exportTest()\">Export</button>\n  <button mat-raised-button mat-dialog-close>Close</button>\n</div>\n");

/***/ }),

/***/ "gztY":
/*!*********************************************!*\
  !*** ./src/app/services/minicap_service.ts ***!
  \*********************************************/
/*! exports provided: MinicapService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinicapService", function() { return MinicapService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs_webSocket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/webSocket */ "3uOa");
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





var MINICAP_WEBSOCKET_URL = 'ws://localhost:';
/**
 * MinicapService to get the log information form the backend through websocket
 */
var MinicapService = /** @class */ (function () {
    function MinicapService() {
        this.messages = rxjs__WEBPACK_IMPORTED_MODULE_2__["EMPTY"];
    }
    MinicapService.prototype.connect = function (port) {
        var fullURL = "" + MINICAP_WEBSOCKET_URL + port;
        console.log('minicap service connected! port number:' + fullURL);
        this.messages = Object(rxjs_webSocket__WEBPACK_IMPORTED_MODULE_4__["webSocket"])({ url: fullURL, deserializer: function (msg) { return msg; } })
            .asObservable()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return response.data;
        }));
        return this.messages;
    };
    MinicapService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], MinicapService);
    return MinicapService;
}());



/***/ }),

/***/ "hN/g":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js/dist/zone */ "0TWp");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__);
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
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are
 * sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded
 * before your main file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of
 * browsers that automatically update themselves. This includes Safari >= 10,
 * Chrome >= 55 (including Opera), Edge >= 13 on the desktop, and iOS 10 and
 * Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using
 * IE/Edge or Safari. Standard animation support in Angular DOES NOT require any
 * polyfills (as of Angular 6.0).
 */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following
 * flags because those flags need to be set before `zone.js` being loaded, and
 * webpack will put import in the top of bundle, so user need to create a
 * separate file in this directory (for example: zone-flags.ts), and put the
 * following flags into that file, and then add the following code before
 * importing zone.js. import './zone-flags.ts';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch
 * requestAnimationFrame (window as any).__Zone_disable_on_property = true; //
 * disable patch onProperty such as onclick (window as
 * any).__zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove']; // disable
 * patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by
 * zone.js with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
// import zone.js Doesn't work with internal build system, we might need it on
// the open source version.
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */


/***/ }),

/***/ "hlqO":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/test_explorer/share_with_project_dialog.ng.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h1 mat-dialog-title>Project Share with </h1>\n<div mat-dialog-content fxLayout=\"column\">\n  <mat-form-field>\n    <input matInput placeholder=\"Name\" [(ngModel)]='userList' required>\n    <mat-error *ngIf=\"!userList\">Please put username, separated by comma.</mat-error>\n  </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"saveNewProject()\">Save</button>\n  <button mat-raised-button (click)=\"dismissDialog()\">Cancel</button>\n</div>\n");

/***/ }),

/***/ "jHJN":
/*!*******************************************************!*\
  !*** ./src/app/popup_dialogs/choose_device_dialog.ts ***!
  \*******************************************************/
/*! exports provided: ChooseDeviceDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChooseDeviceDialogComponent", function() { return ChooseDeviceDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_choose_device_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./choose_device_dialog.ng.html */ "slrl");
/* harmony import */ var _choose_device_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./choose_device_dialog.css */ "Xrdp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/devices_manager_service */ "Ojqq");
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








/**
 * The init Dialog for user to select devices.
 */
var ChooseDeviceDialogComponent = /** @class */ (function () {
    function ChooseDeviceDialogComponent(dialogRef, devicesManagerService) {
        this.dialogRef = dialogRef;
        this.devicesManagerService = devicesManagerService;
        this.devices = [];
        this.slotOptions = [];
        /** Handle on-destroy Subject, used to unsubscribe. */
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
    }
    ChooseDeviceDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get device list
        this.devicesManagerService.getDevicesList()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            if (data instanceof Array) {
                _this.devices = data.map(function (item, index) {
                    _this.slotOptions.push({ index: index + 1, disabled: false });
                    return new _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_7__["DeviceInfo"](item);
                });
                if (_this.devices.length === 1) {
                    _this.devices[0].slot = 1;
                }
            }
            else {
                console.error('Should get a return array from backend.');
            }
        });
    };
    ChooseDeviceDialogComponent.prototype.confirmSelection = function () {
        this.dialogRef.close(this.devices.filter(function (d) { return d.slot !== -1; })
            .sort(function (a, b) { return a.slot - b.slot; })
            .map(function (d) { return d.serial; }));
    };
    ChooseDeviceDialogComponent.prototype.updateAvailableSlot = function (event) {
        for (var i = 0; i < this.slotOptions.length; i++) {
            this.slotOptions[i].disabled = false;
        }
        for (var i = 0; i < this.devices.length; i++) {
            if (this.devices[i].slot !== -1) {
                this.slotOptions[this.devices[i].slot - 1].disabled = true;
            }
        }
    };
    ChooseDeviceDialogComponent.prototype.ngOnDestroy = function () {
        // Unsubscribes all pending subscriptions.
        this.destroyed.next();
    };
    ChooseDeviceDialogComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_7__["DevicesManagerService"] }
    ]; };
    ChooseDeviceDialogComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-choose-device-dialog',
            template: _raw_loader_choose_device_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_choose_device_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"],
            _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_7__["DevicesManagerService"]])
    ], ChooseDeviceDialogComponent);
    return ChooseDeviceDialogComponent;
}());



/***/ }),

/***/ "jlbu":
/*!*****************************************!*\
  !*** ./src/app/services/log_service.ts ***!
  \*****************************************/
/*! exports provided: LogService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogService", function() { return LogService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs_webSocket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/webSocket */ "3uOa");
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





var LOG_WEBSOCKET_URL = 'ws://localhost:8888/log';
/** LogService to get the log information form the backend through websocket */
var LogService = /** @class */ (function () {
    function LogService() {
        this.frontendSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.wsMessages =
            Object(rxjs_webSocket__WEBPACK_IMPORTED_MODULE_4__["webSocket"])({ url: LOG_WEBSOCKET_URL, deserializer: function (msg) { return msg; } })
                .asObservable()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
                return { type: response.type, text: response.data };
            }));
    }
    LogService.prototype.getMessages = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(this.wsMessages, this.frontendSubject.asObservable());
    };
    LogService.prototype.log = function (msg) {
        this.frontendSubject.next({ type: 'FrontendMsg', text: msg });
    };
    LogService.ctorParameters = function () { return []; };
    LogService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
    ], LogService);
    return LogService;
}());



/***/ }),

/***/ "k75F":
/*!********************************************************!*\
  !*** ./src/app/popup_dialogs/python_editor_simple.css ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.python-code-editor-simple {\n    min-width: 400px;\n    min-height: 400px;\n    height: 100%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB5dGhvbl9lZGl0b3Jfc2ltcGxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtJQUNJLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsWUFBWTtBQUNoQiIsImZpbGUiOiJweXRob25fZWRpdG9yX3NpbXBsZS5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLnB5dGhvbi1jb2RlLWVkaXRvci1zaW1wbGUge1xuICAgIG1pbi13aWR0aDogNDAwcHg7XG4gICAgbWluLWhlaWdodDogNDAwcHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xufVxuIl19 */");

/***/ }),

/***/ "kjG2":
/*!*******************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.ng.html ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"main-container\" fxLayout='column' fxFill>\n  <div class=\"device-prepare-overlay\" *ngIf=\"devicePrepareLoading\">\n    <mat-progress-bar mode=\"indeterminate\" class=\"device-prepare-overlay-progressbar\">\n    </mat-progress-bar>\n  </div>\n  <div fxFlex=\"64px\">\n    <mat-toolbar color=\"primary\" class='main-toolbar'>\n      <button mat-icon-button (click)='openDevicePickerDialog()' class='device-picker-btn'>\n        <mat-icon matTooltip=\"Reinitialize devices\" class=\"material-icons\">menu</mat-icon>\n      </button>\n      <span>UIConductor</span>\n      <span class=\"toolbar-spacer\"></span>\n      <button mat-icon-button class=\"toolbar-icon\" (click)='softRestart()'>\n        <mat-icon matTooltip=\"Restart UIConductor\" class=\"material-icons\">refresh</mat-icon>\n      </button>\n      <button mat-icon-button class=\"toolbar-icon\" (click)='versionInfo()'>\n        <mat-icon matTooltip=\"Version Info\" class=\"material-icons\">info</mat-icon>\n      </button>\n    </mat-toolbar>\n  </div>\n  <div class=\"split-body ex-percent\" fxFlex>\n    <as-split unit=\"percent\">\n      <as-split-area size=\"25\">\n        <as-split direction=\"vertical\" restrictMove=\"true\">\n          <as-split-area size=\"75\">\n            <screen-cast></screen-cast>\n          </as-split-area>\n          <as-split-area size=\"25\">\n            <app-device-manager></app-device-manager>\n          </as-split-area>\n        </as-split>\n      </as-split-area>\n      <as-split-area size=\"55\">\n        <as-split direction=\"vertical\" restrictMove=\"true\">\n          <as-split-area size=\"70\">\n            <workflow-editor></workflow-editor>\n          </as-split-area>\n          <as-split-area size=\"30\">\n            <mat-tab-group (selectedTabChange)=\"tabChange($event)\">\n              <mat-tab label=\"Log\">\n                <log-panel></log-panel>\n              </mat-tab>\n              <mat-tab label=\"UI Viewer\">\n                <ui-tree-viewer *ngIf=\"showUiTree\"></ui-tree-viewer>\n              </mat-tab>\n              <mat-tab label=\"OCR Viewer\">\n                <app-ocr-viewer></app-ocr-viewer>\n              </mat-tab>\n            </mat-tab-group>\n          </as-split-area>\n        </as-split>\n      </as-split-area>\n      <as-split-area size=\"20\">\n        <test-explorer></test-explorer>\n      </as-split-area>\n    </as-split>\n  </div>\n  <div class=\"footer-div\" fxFlex=\"25px\">\n    <span class=\"footer-content\">UIConductor @Google</span>\n  </div>\n</div>\n");

/***/ }),

/***/ "lP55":
/*!*********************************************************!*\
  !*** ./src/app/test_explorer/export_google3_dialog.css ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.inputField {\n  width: 100% !important;\n}\n\n.tree {\n  margin-top: 20px;\n}\n\n.mat-icon-button {\n  float: right;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cG9ydF9nb29nbGUzX2RpYWxvZy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxZQUFZO0FBQ2QiLCJmaWxlIjoiZXhwb3J0X2dvb2dsZTNfZGlhbG9nLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4uaW5wdXRGaWVsZCB7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG59XG5cbi50cmVlIHtcbiAgbWFyZ2luLXRvcDogMjBweDtcbn1cblxuLm1hdC1pY29uLWJ1dHRvbiB7XG4gIGZsb2F0OiByaWdodDtcbn1cbiJdfQ== */");

/***/ }),

/***/ "mQpj":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/ui_tree_viewer/ocr_viewer.ng.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div fxLayout=\"column\" fxLayoutGap=\"10px\" fxFill>\n    <div fxLayout=\"row wrap\" fxLayoutGap=\"10px\" >\n      <button mat-raised-button (click)=\"showOCRDetails()\" [disabled]=\"orcLoading\">Show OCR Details XML</button>\n      <button mat-raised-button (click)=\"orderByText()\" [disabled]=\"orcLoading\">OrderByText</button>\n      <button mat-raised-button (click)=\"orderByPosition()\" [disabled]=\"orcLoading\">OrderByPosition</button>\n    </div>\n    <div class=\"device-prepare-overlay\" *ngIf=\"orcLoading\">\n        <mat-progress-bar mode=\"indeterminate\" class=\"device-prepare-overlay-progressbar\">\n        </mat-progress-bar>\n        Processing image...It might take couple of seconds...\n      </div>\n    <div fxLayout=\"row wrap\" class =\"ocr-result-list\" fxFill>\n        <ul>\n            <li *ngFor=\"let item of records\" class =\"ocr-result-list-item\" (click)=\"onRecordClicked(item)\">\n                    <b>{{item.text}} </b>{{item.bounds}} \n            </li>\n        </ul>\n    </div>\n  </div>");

/***/ }),

/***/ "mxkP":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/popup_dialogs/history_dialog.ng.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h3 mat-dialog-title>Test Execution History</h3>\n<div mat-dialog-content>\n  <table mat-table [dataSource]=\"dataSource\" class=\"testTable\">\n    <ng-container matColumnDef=\"details\">\n      <th mat-header-cell *matHeaderCellDef>Details</th>\n      <td mat-cell *matCellDef=\"let element\">\n        <button mat-raised-button color=\"primary\" (click)=\"showDetails(element.testDetails)\">Details</button>\n      </td>\n    </ng-container>\n    <ng-container matColumnDef=\"executionId\">\n      <th mat-header-cell *matHeaderCellDef>Execution Id</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.executionId}} </td>\n    </ng-container>\n    <ng-container matColumnDef=\"testUuid\">\n      <th mat-header-cell *matHeaderCellDef>Test UUID</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.testcaseUuid}} </td>\n    </ng-container>\n    <ng-container matColumnDef=\"name\">\n      <th mat-header-cell *matHeaderCellDef>Name</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.testName}} </td>\n    </ng-container>\n    <ng-container matColumnDef=\"result\">\n      <th mat-header-cell *matHeaderCellDef>Result</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.testResult}} </td>\n    </ng-container>\n    <ng-container matColumnDef=\"runDate\">\n      <th mat-header-cell *matHeaderCellDef>Run Date</th>\n<!--       <td mat-cell *matCellDef=\"let element\"> {{element.createdAt.epochSecond * 1000 | date:'yyyy-MM-dd HH:mm:ss'}} </td> -->\n      <td mat-cell *matCellDef=\"let element\"> {{formatDate(element.createdAt) | date:'MM/dd@h:mma'}} </td>\n    </ng-container>\n    <ng-container matColumnDef=\"author\">\n      <th mat-header-cell *matHeaderCellDef>Author</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.createdBy}} </td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n  </table>\n</div>\n");

/***/ }),

/***/ "pEJ0":
/*!*******************************************************!*\
  !*** ./src/app/services/test_case_manager_service.ts ***!
  \*******************************************************/
/*! exports provided: TestCaseManagerService, convertToJsTreeFormat, reconstructJsTreeData, convertToJsonTreeFormat, emptyTreeExample */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestCaseManagerService", function() { return TestCaseManagerService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToJsTreeFormat", function() { return convertToJsTreeFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reconstructJsTreeData", function() { return reconstructJsTreeData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToJsonTreeFormat", function() { return convertToJsonTreeFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyTreeExample", function() { return emptyTreeExample; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _constants_jstree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/jstree */ "alCr");
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





/**
 * TestcaseManager offers functionality to handle test case operations and
 * transmits them to backend.
 */
var TestCaseManagerService = /** @class */ (function () {
    function TestCaseManagerService(http) {
        this.http = http;
        this.OPTIONS = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
            })
        };
    }
    TestCaseManagerService.prototype.getTestCasesListByUsername = function (username) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/fetchTestcaseTreeByUsername', { params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('username', username) });
    };
    TestCaseManagerService.prototype.getTestCasesList = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/fetchTestcaseTree');
    };
    TestCaseManagerService.prototype.getTestCasesListByProjectId = function (projectId) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/fetchTestcaseTreeByProjectId', { params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('projectId', projectId) });
    };
    TestCaseManagerService.prototype.fetchTestHistory = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/fetchTestHistory');
    };
    TestCaseManagerService.prototype.updateTestCaseTree = function (node, treeUUID, projectId) {
        var req = {
            uuid: treeUUID,
            treeDetails: JSON.stringify(node),
            projectId: projectId,
        };
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/updateTestCaseTree', req, this.OPTIONS);
    };
    TestCaseManagerService.prototype.deleteTestCaseTree = function (projectId) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/deleteTree', projectId);
    };
    /**
     * Send request to backend to copy the action with the given actionId.
     * Return the created action
     */
    TestCaseManagerService.prototype.importTestCaseByActionId = function (actionId, userPreferredCopyType) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/importTestCaseByActionId', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('actionId', actionId)
                .set('copyRequest', userPreferredCopyType)
        });
    };
    /** Send request to backend to import a test from Google3 */
    TestCaseManagerService.prototype.importTestCaseFromGoogle3 = function (citcClient, path) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/importTestCaseFromGoogle3', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('citcClient', citcClient).set('path', path)
        });
    };
    /** Send request to backend to export the test to Google3 */
    TestCaseManagerService.prototype.exportTestCaseFromGoogle3 = function (citcClient, path, uuid) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/exportTestCaseFromGoogle3', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('citcClient', citcClient)
                .set('path', path)
                .set('uuid', uuid)
        });
    };
    TestCaseManagerService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    TestCaseManagerService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({ providedIn: 'root' }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TestCaseManagerService);
    return TestCaseManagerService;
}());

/**
 * convertToJsTreeFormat converts given tree in the backend json format to
 * a format that can be set in jsTree.
 * @param node root node.
 */
function convertToJsTreeFormat(node) {
    var jsTreeNode = {
        text: node.value,
        icon: 'fa fa-folder',
        id: node.id,
        state: { 'opened': true },
        isFolder: true,
        children: [],
    };
    if (node.additionalData && node.additionalData.length > 0) {
        jsTreeNode.additionalData = node.additionalData;
        jsTreeNode.isFolder = false;
        jsTreeNode.icon = 'fa fa-file-code-o';
    }
    if (node.children) {
        jsTreeNode.children =
            node.children.map(function (child) { return convertToJsTreeFormat(child); });
    }
    return jsTreeNode;
}
/**
 * reconstructJsTreeData retrieves tree in JSTreeNode format given internal
 * _model data format.
 * @param data internal _model.data from jsTree
 * @id id of the root node of the tree
 */
function reconstructJsTreeData(data, id) {
    var jsTreeNode;
    if (data[id].original) {
        jsTreeNode = data[id].original;
        jsTreeNode.children = [];
    }
    else {
        jsTreeNode = new _constants_jstree__WEBPACK_IMPORTED_MODULE_4__["JsTreeNode"](data[id].text, data[id].id);
    }
    if (data[id].children) {
        jsTreeNode.children = data[id].children.map(function (child) { return reconstructJsTreeData(data, child); });
    }
    return jsTreeNode;
}
/**
 * converToJsonTreeFormat converts a JsTree node format to object format
 * expected by backend calls.
 * @param jsTreeNode root node of jsTree.
 */
function convertToJsonTreeFormat(jsTreeNode) {
    var node = {
        value: jsTreeNode.text,
        id: jsTreeNode.id,
        emitLoadNextLevel: false,
        children: [],
    };
    if (jsTreeNode.additionalData) {
        node.additionalData = jsTreeNode.additionalData;
    }
    if (jsTreeNode.children) {
        node.children = jsTreeNode.children.map(convertToJsonTreeFormat);
    }
    return node;
}
/** The empty test case tree example that will be create for a new project. */
function emptyTreeExample() {
    return {
        value: 'MyWorkspace',
        id: '1',
        emitLoadNextLevel: false,
        children: []
    };
}


/***/ }),

/***/ "q/7+":
/*!**************************************************!*\
  !*** ./src/app/ui_tree_viewer/ui_tree_viewer.ts ***!
  \**************************************************/
/*! exports provided: UiTreeViewer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiTreeViewer", function() { return UiTreeViewer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_ui_tree_viewer_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./ui_tree_viewer.ng.html */ "0fnC");
/* harmony import */ var _ui_tree_viewer_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui_tree_viewer.css */ "OaC0");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ "EcEN");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _constants_jstree__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../constants/jstree */ "alCr");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../constants/rect */ "aFBn");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../services/control_message_service */ "Etwr");
/* harmony import */ var _copy_xml_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./copy_xml_dialog */ "R9JL");
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



// taze: $, JQuery from //third_party/javascript/typings/jquery:jquery_without_externs
// taze: jstree from //third_party/javascript/typings/jstree:jstree



// to backend.









var ICON_CLASSES = {
    'hierarchy': 'fa fa-sitemap',
    'FrameLayout': 'fa fa-object-group',
    'ViewGroup': 'fa fa-users',
    'TextView': 'fa fa-file-text',
    'LinearLayout': 'fa fa-bars',
    'RelativeLayout': 'fa fa-object-ungroup',
    'GridLayout': 'fa fa-th',
    'View': 'fa fa-window-maximize',
    'ImageView': 'fa fa-picture-o',
    'default': 'fa fa-folder'
};
/**
 * Component responsible for drawing and interacting with UI tree XML of device
 * screen.
 */
var UiTreeViewer = /** @class */ (function () {
    function UiTreeViewer(dialog, snackBar, backendManagerService, controlMessageService) {
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.backendManagerService = backendManagerService;
        this.controlMessageService = controlMessageService;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_7__["ReplaySubject"](1);
        this.domParser = new DOMParser();
        this.searchStr = '';
        this.rawXML = '';
        this.searchType = 'ALL';
        this.searchTypes = ['ALL'];
        this.searchSuccess = false;
        this.showAttributes = true;
        this.highlightMode = false;
        this.attributes = [];
        this.nodeBounds = [];
    }
    UiTreeViewer.prototype.ngOnInit = function () {
        var _this = this;
        this.setupDataTree();
        this.controlMessageService.getControlMessageSubject()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])(function (msg) {
            return msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].INSPECT_CLICKED_NODE;
        }))
            .subscribe(function (msg) {
            // `unknown`.
            // tslint:disable:no-any no-unnecessary-type-assertion
            var coor = JSON.parse(msg.extra);
            // tslint:enable:no-any no-unnecessary-type-assertion
            var smallestContainingNode = _this.nodeBounds.filter(function (el) { return el.bound.contains(coor); })
                .reduce(function (prev, curr) {
                if (prev.bound.area() > curr.bound.area()) {
                    return curr;
                }
                return prev;
            });
            if (smallestContainingNode) {
                _this.jsTree.jstree('deselect_all');
                _this.focusNode(smallestContainingNode.id);
            }
        });
        this.fetchXML();
    };
    UiTreeViewer.prototype.setupDataTree = function () {
        var jsTreeObj = $(this.jsTreeEl.nativeElement);
        this.jsTree = jsTreeObj.jstree({
            'core': {
                'themes': {
                    'dots': false,
                },
                'data': {},
            },
            'search': {
                'case_insensitive': true,
                'search_callback': this.jsTreeSearchCB.bind(this),
            },
            'plugins': ['search', 'wholerow'],
        });
        this.buildSelectEvent();
        this.buildSearchCompleteEvent();
        this.buildHoverEvent();
        this.buildDehoverEvent();
    };
    UiTreeViewer.prototype.buildHoverEvent = function () {
        var _this = this;
        this.jsTree.on('hover_node.jstree', function (e, action) {
            if (_this.highlightMode) {
                _this.sendDrawMessage(_constants_constants__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].NODE_HOVERED, action.node.original.attributes);
            }
        });
    };
    UiTreeViewer.prototype.sendDrawMessage = function (messageType, attributes) {
        if (attributes) {
            var coordinates = attributes.find(function (el) { return el.name === 'bounds'; });
            if (coordinates && coordinates.value) {
                this.controlMessageService.sendMessage({ messageType: messageType, extra: coordinates.value });
            }
        }
    };
    UiTreeViewer.prototype.buildDehoverEvent = function () {
        var _this = this;
        this.jsTree.on('dehover_node.jstree', function (e, action) {
            if (_this.highlightMode) {
                _this.controlMessageService.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].CLEAR_CANVAS, extra: '' });
            }
        });
    };
    UiTreeViewer.prototype.buildSelectEvent = function () {
        var _this = this;
        this.jsTree.on('select_node.jstree', function (e, action) {
            var attr = action.node.original.attributes;
            if (attr != null) {
                _this.attributes = attr;
                if (_this.highlightMode) {
                    _this.sendDrawMessage(_constants_constants__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].NODE_SELECTED, action.node.original.attributes);
                }
            }
        });
    };
    UiTreeViewer.prototype.buildSearchCompleteEvent = function () {
        var _this = this;
        this.jsTree.on('search.jstree', function () {
            if (!_this.searchSuccess) {
                _this.snackBar.open('No matches found', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["SNACKBAR_DURATION_MS"] });
            }
            _this.searchSuccess = false;
        });
    };
    UiTreeViewer.prototype.getJsTreeInstance = function () {
        // jstree(true) returns an existing instance instead of creating a new
        // instance.
        return this.jsTree.jstree(true);
    };
    UiTreeViewer.prototype.updateDataTree = function (jsTreeNode) {
        // 'settings' is an internal field that contains some desired jstree
        // properties.
        this.getJsTreeInstance()['settings'].core.data = jsTreeNode;
        this.getJsTreeInstance().refresh(
        /* skip_loading */ false, /* forget_state */ true);
    };
    UiTreeViewer.prototype.fetchXML = function () {
        var _this = this;
        this.controlMessageService.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].CLEAR_CANVAS, extra: 'all' });
        this.nodeBounds = [];
        this.searchTypes = ['ALL'];
        this.backendManagerService.fetchXML()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            var treeData = [];
            _this.rawXML = data.join();
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var line = data_1[_i];
                var domObj = _this.domParser.parseFromString(line, 'text/xml');
                var obj = domObj.getElementsByTagName('hierarchy');
                treeData.push(_this.convertXMLToJSTreeNode(obj[0]));
            }
            _this.updateDataTree(treeData);
        });
    };
    /*
     * Example XML(for reference):
     * <hierarchy>
     * <node index="0" text="" class="android.widget.FrameLayout"
     * package="com.android.systemui" content-desc="" checkable="false"
     * checked="false" clickable="false" enabled="true" focusable="false"
     * focused="false" scrollable="false" long-clickable="false" password="false"
     * selected="false" bounds="[0,0][1080,2028]" resource-id="">
     *   <node index="0" text="" class="android.view.View"
     *   package="com.android.systemui" content-desc="" checkable="false"
     *   checked="false" clickable="false" enabled="true" focusable="false"
     *   focused="false" scrollable="false" long-clickable="false"
     *   password="false" selected="false" bounds="[0,0][1080,2028]"
     *   resource-id="com.android.systemui:id/scrim_behind"/>
     * </node>
     * </hierarchy>
     */
    UiTreeViewer.prototype.convertXMLToJSTreeNode = function (xmlNode) {
        var _this = this;
        var text = xmlNode.className;
        if (text === '') {
            text = xmlNode.tagName;
        }
        text = text.replace(/.+\..+\./, '');
        var id = Object(uuid__WEBPACK_IMPORTED_MODULE_6__["v4"])();
        var node = new _constants_jstree__WEBPACK_IMPORTED_MODULE_10__["JsTreeNode"](text, id);
        if (ICON_CLASSES.hasOwnProperty(text)) {
            node.icon = ICON_CLASSES[text];
        }
        node.attributes = [];
        for (var attr in xmlNode.attributes) {
            if (!isNaN(Number(attr))) {
                var name_1 = xmlNode.attributes[attr]['name'];
                var value = xmlNode.attributes[attr]['value'];
                node.attributes.push({ name: name_1, value: value });
                if (this.searchTypes.indexOf(name_1) < 0) {
                    this.searchTypes.push(name_1);
                }
                if (name_1 === 'bounds') {
                    this.nodeBounds.push({ id: id, bound: _constants_rect__WEBPACK_IMPORTED_MODULE_11__["Rect"].createFromCoordinatesStr(value) });
                }
            }
        }
        xmlNode.childNodes.forEach(function (child) {
            node.children.push(_this.convertXMLToJSTreeNode(child));
        });
        return node;
    };
    UiTreeViewer.prototype.focusNode = function (nodeId) {
        this.jsTree.jstree('select_node', nodeId);
        this.getJsTreeInstance()
            .get_node(nodeId, true)
            .children('jstree-anchor')
            .focus();
    };
    UiTreeViewer.prototype.jsTreeSearchCB = function (text, node) {
        var lowerCaseText = text.toLowerCase();
        if (node.original.attributes) {
            for (var _i = 0, _a = node.original.attributes; _i < _a.length; _i++) {
                var attr = _a[_i];
                if (this.searchType !== 'ALL' && this.searchType !== attr.name) {
                    continue;
                }
                if (!attr.value || !attr.value.toLowerCase().includes(lowerCaseText)) {
                    continue;
                }
                this.searchSuccess = true;
                this.focusNode(node.id);
            }
        }
    };
    UiTreeViewer.prototype.toggleHighlight = function (e) {
        this.highlightMode = e.checked;
        if (!this.highlightMode) {
            this.controlMessageService.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].CLEAR_CANVAS, extra: 'all' });
        }
    };
    UiTreeViewer.prototype.toggleInspectDevice = function (e) {
        this.controlMessageService.sendMessage({
            messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].SET_INSPECT_MODE,
            extra: e.checked.toString()
        });
    };
    UiTreeViewer.prototype.toggleAttributes = function (e) {
        this.showAttributes = e.checked;
    };
    UiTreeViewer.prototype.expandAll = function () {
        this.jsTree.jstree('open_all');
    };
    UiTreeViewer.prototype.closeAll = function () {
        this.jsTree.jstree('close_all');
    };
    UiTreeViewer.prototype.showXML = function () {
        this.dialog.open(_copy_xml_dialog__WEBPACK_IMPORTED_MODULE_14__["CopyXmlDialog"], {
            width: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
            height: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["POPUP_DIALOG_DEFAULT_DIMENSION"].height,
            data: this.rawXML
        });
    };
    UiTreeViewer.prototype.searchTree = function () {
        this.jsTree.jstree('deselect_all');
        this.jsTree.jstree('search', this.searchStr);
    };
    UiTreeViewer.prototype.ngOnDestroy = function () {
        this.controlMessageService.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].CLEAR_CANVAS, extra: 'all' });
        this.controlMessageService.sendMessage({
            messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_9__["MessageTypes"].SET_INSPECT_MODE,
            extra: 'false',
        });
        this.destroyed.next();
    };
    UiTreeViewer.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_12__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_13__["ControlMessageService"] }
    ]; };
    UiTreeViewer.propDecorators = {
        jsTreeEl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['jsTree', { static: true },] }]
    };
    UiTreeViewer = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'ui-tree-viewer',
            template: _raw_loader_ui_tree_viewer_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_ui_tree_viewer_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_12__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_13__["ControlMessageService"]])
    ], UiTreeViewer);
    return UiTreeViewer;
}());



/***/ }),

/***/ "q7NG":
/*!****************************************!*\
  !*** ./src/app/log_panel/log_panel.ts ***!
  \****************************************/
/*! exports provided: LogPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogPanelComponent", function() { return LogPanelComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_log_panel_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./log_panel.ng.html */ "5OJA");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _services_log_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/log_service */ "jlbu");
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





/**
 * Log component to display the log information from both backend log/frontend
 * events.
 */
var LogPanelComponent = /** @class */ (function () {
    function LogPanelComponent(logService) {
        this.logService = logService;
        // Get the log observable, filter out the empty entry and accumulate values by
        // the scan(), limit to last 1000 entries.
        this.showingLogs = this.logService.getMessages().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (item) { return item.text.length > 0; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (item) {
            return new Date().toLocaleString('en-US', { hour12: false }) + ': ' +
                item.text;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["scan"])(function (acc, value) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])([value], acc).slice(-LogPanelComponent_1.logMaxSize); }, []));
    }
    LogPanelComponent_1 = LogPanelComponent;
    var LogPanelComponent_1;
    LogPanelComponent.logMaxSize = 1000;
    LogPanelComponent.ctorParameters = function () { return [
        { type: _services_log_service__WEBPACK_IMPORTED_MODULE_4__["LogService"] }
    ]; };
    LogPanelComponent = LogPanelComponent_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({ selector: 'log-panel', template: _raw_loader_log_panel_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"] }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_services_log_service__WEBPACK_IMPORTED_MODULE_4__["LogService"]])
    ], LogPanelComponent);
    return LogPanelComponent;
}());



/***/ }),

/***/ "qEeO":
/*!*************************************************************!*\
  !*** ./src/app/popup_dialogs/global_var_setting_dialog.css ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.variable-example-text {\n  font-size:15px;\n  color: #3f51b5;\n  display: block;\n}\n\n.global-var-input {\n  margin-top: 20px;\n  min-width: 600px;\n}\n\n.global-var-info {\n  border-bottom: gray;\n  border-bottom-width: 1px;\n  border-bottom-style: dashed;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbF92YXJfc2V0dGluZ19kaWFsb2cuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0VBQ0UsY0FBYztFQUNkLGNBQWM7RUFDZCxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQix3QkFBd0I7RUFDeEIsMkJBQTJCO0FBQzdCIiwiZmlsZSI6Imdsb2JhbF92YXJfc2V0dGluZ19kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi52YXJpYWJsZS1leGFtcGxlLXRleHQge1xuICBmb250LXNpemU6MTVweDtcbiAgY29sb3I6ICMzZjUxYjU7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uZ2xvYmFsLXZhci1pbnB1dCB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG4gIG1pbi13aWR0aDogNjAwcHg7XG59XG5cbi5nbG9iYWwtdmFyLWluZm8ge1xuICBib3JkZXItYm90dG9tOiBncmF5O1xuICBib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7XG4gIGJvcmRlci1ib3R0b20tc3R5bGU6IGRhc2hlZDtcbn1cbiJdfQ== */");

/***/ }),

/***/ "qeW4":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/ui_tree_viewer/copy_xml_dialog.ng.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h1 mat-dialog-title> Raw XML </h1>\n<div mat-dialog-content>\n  <p class=\"xmlData\">{{data}}</p>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button mat-dialog-close>Close</button>\n</div>\n\n");

/***/ }),

/***/ "slrl":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/popup_dialogs/choose_device_dialog.ng.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h1 mat-dialog-title>Choose Your Device:</h1>\n\n<mat-dialog-content>\n  <div fxLayout=\"row wrap\" fxLayoutGap=\"20px\">\n    <div *ngFor=\"let device of devices\" fxFlex=\"30\">\n\n      <mat-card class=\"device-card\">\n        <mat-card-title class='device-card-title'>{{device.serial}}</mat-card-title>\n        <mat-card-content>\n          <ul>\n            <li>{{device.product}}</li>\n            <li>{{device.model}}</li>\n            <li>{{device.device}}</li>\n          </ul>\n\n          <mat-form-field>\n            <mat-select placeholder=\"Device Slot\" [(ngModel)]=\"device.slot\" (ngModelChange)=\"updateAvailableSlot($event)\" class=\"slot-selector\">\n              <mat-option [value]=\"-1\" class='mat-option'></mat-option>\n              <mat-option *ngFor=\"let option of slotOptions\" [value]=\"option.index\" [disabled]=\"option.disabled\" class='mat-option'>\n                Slot {{ option.index }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n        </mat-card-content>\n      </mat-card>\n\n\n    </div>\n    <!-- No devices found card -->\n    <mat-card *ngIf=\"devices?.length == 0\" class=\"error-card\">\n      <mat-card-title>\n        No device detected. Please connect a device to the host and run adb devices to check.\n      </mat-card-title>\n    </mat-card>\n  </div>\n</mat-dialog-content>\n\n<mat-dialog-actions >\n  <button mat-raised-button (click)=\"confirmSelection()\" color=\"primary\" [mat-dialog-close]=\"true\" cdkFocusInitial class=\"init-btn\">\n    Initialize\n  </button>\n  <button mat-raised-button mat-dialog-close>\n    Cancel\n  </button>\n</mat-dialog-actions>\n");

/***/ }),

/***/ "sy93":
/*!**********************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/script_action_info_dialog.ts ***!
  \**********************************************************************/
/*! exports provided: ScriptActionInfoDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptActionInfoDialogComponent", function() { return ScriptActionInfoDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_script_action_info_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./script_action_info_dialog.ng.html */ "GXBt");
/* harmony import */ var _script_action_info_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./script_action_info_dialog.css */ "69le");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
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





/**
 * Script Action Info dialog component provides the information page
 * regarding ScriptExecutionAction
 */
var ScriptActionInfoDialogComponent = /** @class */ (function () {
    function ScriptActionInfoDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    ScriptActionInfoDialogComponent.prototype.onOkClick = function () {
        this.dialogRef.close();
    };
    ScriptActionInfoDialogComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] }
    ]; };
    ScriptActionInfoDialogComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'script_action_info_dialog',
            template: _raw_loader_script_action_info_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_script_action_info_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"]])
    ], ScriptActionInfoDialogComponent);
    return ScriptActionInfoDialogComponent;
}());



/***/ }),

/***/ "t2CA":
/*!**********************************************!*\
  !*** ./src/app/ui_tree_viewer/ocr_viewer.ts ***!
  \**********************************************/
/*! exports provided: OCRViewerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OCRViewerComponent", function() { return OCRViewerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_ocr_viewer_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./ocr_viewer.ng.html */ "mQpj");
/* harmony import */ var _ocr_viewer_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ocr_viewer.css */ "Wnvv");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/rect */ "aFBn");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/control_message_service */ "Etwr");
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










/** OCR viewer component */
var OCRViewerComponent = /** @class */ (function () {
    function OCRViewerComponent(backendManagerService, controlMessageService) {
        this.backendManagerService = backendManagerService;
        this.controlMessageService = controlMessageService;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_4__["ReplaySubject"](1);
        this.records = [];
        this.orcLoading = false;
        this.textOrderDesc = true;
        this.positionOrderDesc = true;
    }
    OCRViewerComponent.prototype.showOCRDetails = function () {
        var _this = this;
        this.orcLoading = true;
        this.records = [];
        this.backendManagerService.getOcrDetails()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.orcLoading = false;
            _this.updatePhoneScreen(data);
        });
    };
    OCRViewerComponent.prototype.updatePhoneScreen = function (data) {
        var rectArr = [];
        for (var _i = 0, _a = data.boundsStringMapping; _i < _a.length; _i++) {
            var entry = _a[_i];
            rectArr.push(_constants_rect__WEBPACK_IMPORTED_MODULE_7__["Rect"].fromBounds(entry.bounds));
            var bounds = new _constants_rect__WEBPACK_IMPORTED_MODULE_7__["Bounds"](entry.bounds.x1, entry.bounds.y1, entry.bounds.x2, entry.bounds.y2);
            this.records.push({ text: entry.text, bounds: bounds });
        }
        this.controlMessageService.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_6__["MessageTypes"].HIGHLIGHT_OCR, extra: rectArr.join('|') });
    };
    OCRViewerComponent.prototype.onRecordClicked = function (item) {
        this.controlMessageService.sendMessage({
            messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_6__["MessageTypes"].NODE_HOVERED,
            extra: item.bounds.toString()
        });
    };
    OCRViewerComponent.prototype.orderByText = function () {
        this.records.sort(function (a, b) { return a.text.localeCompare(b.text); });
        if (this.textOrderDesc) {
            this.records.reverse();
        }
        this.textOrderDesc = !this.textOrderDesc;
    };
    OCRViewerComponent.prototype.orderByPosition = function () {
        this.records.sort(function (a, b) { return a.bounds.compare(b.bounds); });
        if (this.positionOrderDesc) {
            this.records.reverse();
        }
        this.positionOrderDesc = !this.positionOrderDesc;
    };
    OCRViewerComponent.prototype.ngOnDestroy = function () {
        this.controlMessageService.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_6__["MessageTypes"].CLEAR_CANVAS, extra: 'all' });
        this.destroyed.next();
    };
    OCRViewerComponent.ctorParameters = function () { return [
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_9__["ControlMessageService"] }
    ]; };
    OCRViewerComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-ocr-viewer',
            template: _raw_loader_ocr_viewer_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewEncapsulation"].None,
            styles: [_ocr_viewer_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_9__["ControlMessageService"]])
    ], OCRViewerComponent);
    return OCRViewerComponent;
}());



/***/ }),

/***/ "t4pl":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/advanced_actions_dialog/advanced_actions_dialog.ng.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<p>Advanced Action</p>\n<div class=\"new-action-form\" *ngIf=\"isNewAction\">\n  <mat-form-field>\n    <mat-select [(value)]=\"selectedActionType\" class=\"action-selector\">\n      <mat-option *ngFor=\"let action of advancedActionTypeList\" [value]=\"action.type\" class='mat-option'>\n        {{ action.type }}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n</div>\n<div [ngSwitch]=\"selectedActionType\">\n  <div *ngSwitchCase=\"ACTIONS.COMMAND_LINE_ACTION.type\">\n    <div class='new-action-form'>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"commandLineActionDetails.name\" placeholder=\"Name\" class=\"cmd-name\">\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput class=\"cmd-delay\" [(ngModel)]=\"commandLineActionDetails.delayAfterActionMs\"\n          placeholder=\"Delay After Action (ms)\" type=\"number\" class=\"cmd-delay-ms\">\n      </mat-form-field>\n      <mat-form-field>\n        <textarea matInput [(ngModel)]=\"commandLineActionDetails.actionDescription\" placeholder=\"Description\"\n          class=\"cmd-desc\"></textarea>\n      </mat-form-field>\n      <mat-form-field>\n        <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"commandLineActionDetails.commandLine\"\n          placeholder=\"Command Line\" class=\"cmd-input\"></textarea>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"commandLineActionDetails.expectedReturnCode\" placeholder=\"Expected Return Code\"\n          class=\"cmd-expected-code\">\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"commandLineActionDetails.commandlineExecutionTimeoutSec\"\n          placeholder=\"Command Timeout (sec)\" type=\"number\" class='cmd-timeout'>\n      </mat-form-field>\n      <mat-checkbox [(ngModel)]=\"commandLineActionDetails.isAdbCommand\">ADB command</mat-checkbox>\n      <mat-checkbox [(ngModel)]=\"commandLineActionDetails.needShellOutput\">Need Shell Output</mat-checkbox>\n      <mat-checkbox [(ngModel)]=\"cmdlineDirectSetVariable\">Directly set output To global variable</mat-checkbox>\n      <mat-form-field *ngIf=\"cmdlineDirectSetVariable\">\n        <input matInput [(ngModel)]=\"commandLineActionDetails.uicdVariableName\" placeholder=\"Uicd global variable name start with $uicd_\">\n      </mat-form-field>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.LOGCAT_VALIDATION_ACTION.type\">\n    <div class='new-action-form'>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"logcatValidationActionDetails.name\" placeholder=\"Name\" class=\"logcat-name\">\n      </mat-form-field>\n      <mat-form-field>\n        <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"logcatValidationActionDetails.commandLine\"\n          placeholder=\"Command Line\"></textarea>\n      </mat-form-field>\n      <mat-form-field class=\"selector-css\">\n        <mat-select placeholder=\"Match Type\" [(ngModel)]=\"logcatValidationActionDetails.textValidator.contentMatchType\"\n          class=\"slot-selector\">\n          <mat-option *ngFor=\"let c of CONTENT_MATCH_TYPES\" [value]=\"c.value\" class='mat-option'>\n            {{ c.displayText }}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n      <mat-form-field>\n        <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"logcatValidationActionDetails.textValidator.patternValue\"\n          placeholder=\"Text Pattern\"></textarea>\n      </mat-form-field>\n      <mat-form-field>\n        <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"logcatValidationActionDetails.stopType\">\n          <mat-option *ngFor=\"let sType of STOP_TYPES\" [value]=\"sType.value\">{{ sType.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"logcatValidationActionDetails.commandlineExecutionTimeoutSec\"\n          placeholder=\"Command Timeout (sec)\" type=\"number\">\n      </mat-form-field>\n      <mat-checkbox placeholder=\"Logcat Only\" [(ngModel)]=\"logcatValidationActionDetails.logcatOnly\">Logcat Only(No\n        Validation)\n      </mat-checkbox>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.INPUT_ACTION.type\">\n    Input Action\n    <div class='new-action-form'>\n      <div [hidden]='inputActionDetails.isSingleChar'>\n        <mat-form-field>\n          <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"inputActionDetails.inputString\"\n            placeholder=\"Input String\"></textarea>\n        </mat-form-field>\n      </div>\n      <div [hidden]='!inputActionDetails.isSingleChar'>\n        <mat-form-field>\n          <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"inputActionDetails.keyCode\"\n            placeholder=\"Key Code\"></textarea>\n        </mat-form-field>\n      </div>\n      <mat-checkbox [(ngModel)]=\"inputActionDetails.isSingleChar\">Raw Key Code</mat-checkbox>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.REBOOT_ACTION.type\">\n    <div class='new-action-form'>\n      <mat-checkbox [(ngModel)]=\"rebootActionDetails.onlyReconnectToDevice\">Skip Reboot, Reconnect to Device Only\n      </mat-checkbox>\n      Time to wait (in seconds) after reboot before reconnecting:<textarea rows=\"1\" cols=\"10\" matInput\n        [(ngModel)]=\"rebootActionDetails.reconnectTimeInSec\">30</textarea>\n      <br>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.CLICK_ACTION.type\">\n    Click by Element Info\n    <div class='new-action-form'>\n      <mat-form-field class=\"selector-css\" *ngIf=\"!clickActionDetails.isOcrMode\">\n        <mat-select placeholder=\"Selector Type\" [(ngModel)]=\"clickActionDetails.strategy\" class=\"slot-selector\">\n          <mat-option *ngFor=\"let c of STRATEGY_TYPES\" [value]=\"c.value\" class='mat-option'>\n            {{ c.displayText }}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"clickActionDetails.selector\" placeholder=\"Selector\">\n      </mat-form-field>\n      <mat-checkbox placeholder=\"OCR Enabled\" [(ngModel)]=\"clickActionDetails.isOcrMode\" (ngModelChange)=\"emitUpdate()\">\n        Use OCR\n      </mat-checkbox>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.GLOBAL_VARIABLE_VALIDATION_ACTION.type\">\n    Global Variable Expression Validation Action\n    <div class='new-action-form'>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"globalVarValidationActionDetails.expression\" placeholder=\"Expression\">\n      </mat-form-field>\n      <mat-form-field>\n        <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"globalVarValidationActionDetails.stopType\">\n          <mat-option *ngFor=\"let sType of STOP_TYPES\" [value]=\"sType.value\">{{ sType.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.SNIPPET_VALIDATION_ACTION.type\">\n    <div class=\"row\">\n      <span class=\"form-text-align\">Snippet Validation Action</span>\n      <button mat-mini-fab color=\"primary\" (click)=\"openActionInfoDialog()\" matTooltip=\"Show Info\"\n        matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n        <i class=\"fa fa-info\"></i>\n      </button>\n    </div>\n    <div class='new-action-form'>\n      <mat-form-field>\n        <mat-select placeholder=\"Package Name\" [(ngModel)]=\"snippetValidationActionDetails.packageName\"\n          (ngModelChange)=\"selectedPackageChanged($event)\">\n          <mat-option *ngFor=\"let pName of PACKAGE_NAMES\" [value]=\"pName.value\">{{ pName.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n      <mat-progress-bar *ngIf=\"isWaitingForMethods\" mode=\"indeterminate\"></mat-progress-bar>\n      <mat-form-field>\n        <mat-select placeholder=\"Method Name\" [(ngModel)]=\"snippetValidationActionDetails.methodName\"\n          (ngModelChange)=\"methodSelected($event)\">\n          <mat-option *ngFor=\"let mName of methodNames\" [value]=\"mName.value\">{{ mName.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"snippetValidationActionDetails.argumentsSeparatedByComma\"\n          placeholder=\"Arguments Separated By ','\">\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"snippetValidationActionDetails.commandlineExecutionTimeoutSec\"\n          placeholder=\"Command Timeout (sec)\" type=\"number\" class='cmd-timeout'>\n      </mat-form-field>\n      <mat-form-field>\n        <mat-select placeholder=\"Match Type\" [(ngModel)]=\"snippetValidationActionDetails.matchType\">\n          <mat-option *ngFor=\"let cmType of CONTENT_MATCH_TYPES\" [value]=\"cmType.value\">{{ cmType.displayText }}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"snippetValidationActionDetails.textPattern\" placeholder=\"Text Pattern\">\n      </mat-form-field>\n      <mat-form-field>\n        <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"snippetValidationActionDetails.stopType\">\n          <mat-option *ngFor=\"let sType of STOP_TYPES\" [value]=\"sType.value\">{{ sType.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.SCRIPT_EXECUTION_ACTION.type\">\n    <div class=\"row\">\n      <span class=\"form-text-align\">Execute Python 2.7 Scripts on the Android Device</span>\n      <button mat-mini-fab color=\"primary\" (click)=\"openActionInfoDialog()\" matTooltip=\"Show Info\"\n        matTooltipPosition=\"left\" matTooltipShowDelay=\"500\">\n        <i class=\"fa fa-info\"></i>\n      </button>\n    </div>\n    <div class='new-action-form'>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"scriptExecutionActionDetails.delayAfterActionMs\"\n          placeholder=\"Delay After Action (ms)\" type=\"number\">\n      </mat-form-field>\n      <mat-form-field>\n        <textarea matInput [(ngModel)]=\"scriptExecutionActionDetails.actionDescription\"\n          placeholder=\"Description\"></textarea>\n      </mat-form-field>\n      <mat-form-field>\n        <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"scriptExecutionActionDetails.arguments\"\n          placeholder=\"Script Arguments (separated by spaces)\"></textarea>\n      </mat-form-field>\n      <mat-form-field>\n        <textarea rows=\"8\" cols=\"500\" matInput [(ngModel)]=\"scriptExecutionActionDetails.scriptCodeContent\"\n          placeholder=\"Script Code Content\"></textarea>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"scriptExecutionActionDetails.commandlineExecutionTimeoutSec\"\n          placeholder=\"Script Timeout (sec)\" type=\"number\">\n      </mat-form-field>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.IMAGE_DIFF_VALIDATION_ACTION.type\" (pan)=\"pan($event)\">\n    <div class=\"row\">\n      <span class=\"form-text-align\">Image Diff Validation Action</span>\n      <button mat-mini-fab color=\"primary\" (click)=\"openActionInfoDialog()\" matTooltip=\"Show Info\"\n        matTooltipPosition=\"left\" matTooltipShowDelay=\"500\">\n        <i class=\"fa fa-info\"></i>\n      </button>\n    </div>\n    <div class=\"new-action-form\">\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"imageDiffActionDetails.diffScoreThreshold\"\n          placeholder=\"Diff Score Threshold (0 - 1)\" type=\"number\" />\n      </mat-form-field>\n\n      <div class=\"align-center\">\n        <button mat-raised-button (click)=\"takeScreenshot()\">Take Screenshot</button>\n      </div>\n      <div>\n        <div class=\"row align-center\">\n          <mat-button-toggle-group>\n            <mat-button-toggle (change)=\"imageDiffActionDetails.includeRegion = $event.source.checked\" class=\"margin-5\"\n              value=\"include\">Include Regions</mat-button-toggle>\n            <mat-button-toggle (change)=\"imageDiffActionDetails.includeRegion = !$event.source.checked\" class=\"margin-5\"\n              value=\"exclude\">Exclude Regions</mat-button-toggle>\n          </mat-button-toggle-group>\n        </div>\n\n        <hr />\n        <div class=\"row align-center\">\n          <button class=\"margin-5\" mat-raised-button (click)=\"removeLastSelectedRegion()\">\n            Remove Last Region\n          </button>\n          <button class=\"margin-5\" mat-raised-button (click)=\"clearRegionCanvas(getRegionCanvasCtx())\">\n            Clear\n          </button>\n        </div>\n        <div class=\"row align-center\">\n          <mat-radio-group (change)=\"selectRegionShape($event.value)\">\n            <mat-radio-button class=\"margin-5\" value=\"Rectangle\">Rectangle</mat-radio-button>\n            <mat-radio-button class=\"margin-5\" value=\"Circle\">Circle</mat-radio-button>\n          </mat-radio-group>\n        </div>\n        <div class=\"phone-canvas-widget align-center\">\n          <canvas #screenshot [width]=\"screenshotScaledWidth\" [height]=\"screenshotScaledHeight\">\n          </canvas>\n        </div>\n        <div class=\"phone-canvas-widget-2 align-center\" [style.margin-top.px]=\"(-1 * screenshotScaledHeight) - 5\">\n          <canvas #regionCanvas [width]=\"screenshotScaledWidth\" [height]=\"screenshotScaledHeight\">\n          </canvas>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.ML_IMAGE_VALIDATION_ACTION.type\">\n    <mat-form-field class=\"selector-css\">\n      <mat-select placeholder=\"Icon Image\" [(ngModel)]=\"mlImageValidationActionDetails.iconImageType\"\n        class=\"slot-selector\">\n        <mat-option *ngFor=\"let c of ICON_IMAGE_TYPES\" [value]=\"c.value\" class='mat-option'>\n          <span>\n            <mat-icon matTooltip=\"Icon Image\" class=\"material-icons md-36 blue\">{{c.matIcon}}</mat-icon>\n          </span>\n          <span>{{ \"  \" + c.displayText }}</span>\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <div class='new-action-form'>\n      <mat-form-field>\n        <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"mlImageValidationActionDetails.stopType\">\n          <mat-option *ngFor=\"let sType of STOP_TYPES\" [value]=\"sType.value\">{{ sType.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.CONDITION_VALIDATION_ACTION.type\">\n    <div class='new-action-form'>\n      <query-builder [(ngModel)]='conditionValidationAction.query' [config]='config'>\n        <ng-container\n          *queryButtonGroup=\"let ruleset; let addRule=addRule; let addRuleSet=addRuleSet; let removeRuleSet=removeRuleSet\">\n          <button type=\"button\" mat-icon-button color=\"primary\" (click)=\"addRule()\">\n            <mat-icon>add</mat-icon>\n          </button>\n          <button type=\"button\" mat-icon-button color=\"primary\" *ngIf=\"addRuleSet\" (click)=\"addRuleSet()\">\n            <mat-icon>add_circle_outline</mat-icon>\n          </button>\n          <button type=\"button\" mat-icon-button color=\"accent\" *ngIf=\"removeRuleSet\" (click)=\"removeRuleSet()\">\n            <mat-icon>remove_circle_outline</mat-icon>\n          </button>\n        </ng-container>\n        <ng-container *queryArrowIcon>\n          <mat-icon ngClass=\"mat-arrow-icon\">chevron_right</mat-icon>\n        </ng-container>\n        <ng-container *queryRemoveButton=\"let rule; let removeRule=removeRule\">\n          <button type=\"button\" mat-icon-button color=\"accent\" (click)=\"removeRule(rule)\">\n            <mat-icon>remove</mat-icon>\n          </button>\n        </ng-container>\n        <ng-container *querySwitchGroup=\"let ruleset; let onChange=onChange\">\n          <mat-radio-group *ngIf=\"ruleset\" [(ngModel)]=\"ruleset.condition\" (ngModelChange)=\"onChange($event)\">\n            <mat-radio-button class=\"padding-10\" value=\"and\">And</mat-radio-button>\n            <mat-radio-button class=\"padding-10\" value=\"or\">Or</mat-radio-button>\n          </mat-radio-group>\n        </ng-container>\n        <ng-container *queryEntity=\"let rule; let entities=entities; let onChange=onChange\">\n          <mat-form-field>\n            <mat-select [(ngModel)]=\"rule.entity\" (ngModelChange)=\"onChange($event, rule)\">\n              <mat-option *ngFor=\"let entity of entities\" [value]=\"entity.value\">\n                {{entity.name}}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryField=\"let rule; let fields=fields; let onChange=onChange; let getFields = getFields\">\n          <mat-form-field>\n            <mat-select [(ngModel)]=\"rule.field\" (ngModelChange)=\"onChange($event, rule)\">\n              <mat-option *ngFor=\"let field of getFields(rule.entity)\" [value]=\"field.value\">\n                {{ field.name }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryOperator=\"let rule; let operators=operators; let onChange=onChange\">\n          <mat-form-field class=\"width-90\">\n            <mat-select [(ngModel)]=\"rule.operator\" (ngModelChange)=\"onChange(rule)\">\n              <mat-option *ngFor=\"let value of operators\" [value]=\"value\">\n                {{ value }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryInput=\"let rule; type: 'boolean'; let onChange=onChange\">\n          <mat-checkbox [(ngModel)]=\"rule.value\" (ngModelChange)=\"onChange()\"></mat-checkbox>\n        </ng-container>\n        <ng-container\n          *queryInput=\"let rule; let field=field; let options=options; type: 'category'; let onChange=onChange\">\n          <mat-form-field>\n            <mat-select [(ngModel)]=\"rule.value\" (ngModelChange)=\"onChange()\">\n              <mat-option *ngFor=\"let opt of options\" [value]=\"opt.value\">\n                {{ opt.name }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryInput=\"let rule; let options=options; type: 'multiselect'; let onChange=onChange\">\n          <mat-form-field class=\"width-300\">\n            <mat-select [(ngModel)]=\"rule.value\" multiple (ngModelChange)=\"onChange()\">\n              <mat-option *ngFor=\"let opt of options\" [value]=\"opt.value\">\n                {{ opt.name }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryInput=\"let rule; let field=field; type: 'number'; let onChange=onChange\">\n          <mat-form-field class=\"width-50\">\n            <input matInput [(ngModel)]=\"rule.value\" type=\"number\" (ngModelChange)=\"onChange()\">\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryInput=\"let rule; let field=field; type: 'string'; let onChange=onChange\">\n          <mat-form-field>\n            <input matInput [(ngModel)]=\"rule.value\" (ngModelChange)=\"onChange()\">\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryInput=\"let rule; let field=field; type: 'textarea'; let onChange=onChange\">\n          <mat-form-field>\n            <textarea matInput [(ngModel)]=\"rule.value\" (ngModelChange)=\"onChange()\">\n            </textarea>\n          </mat-form-field>\n        </ng-container>\n      </query-builder>\n      <mat-checkbox placeholder=\"Find Element and Click\" [(ngModel)]=\"conditionValidationAction.clickAfterValidation\">Find and Click(No\n        Validation)\n      </mat-checkbox>\n      <mat-form-field *ngIf=\"!conditionValidationAction.clickAfterValidation\">\n        <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"conditionValidationAction.stopType\">\n          <mat-option *ngFor=\"let sType of STOP_TYPES\" [value]=\"sType.value\">{{ sType.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.FETCH_SCREEN_CONTENT_ACTION.type\">\n    <fetch-content-form [(fetchActionDetails)]=\"fetchActionDetails\" [showButtons]=\"false\"></fetch-content-form>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.DOUBLE_TAP_POWER_BUTTON_ACTION.type\">\n  </div>\n  <div *ngIf=\"isValidationAction()\">\n    <validation-details [(validationActionDetails)]=\"validationRequestDetails\" [showButtons]=\"false\">\n    </validation-details>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.PYTHON_SCRIPT_ACTION.type\">\n    <div class='new-action-form'>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"pythonScriptActionDetails.name\" placeholder=\"Name\">\n      </mat-form-field>\n      <python-editor-simple class=\"python-editor-simple\" language=\"python\"></python-editor-simple>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"pythonScriptActionDetails.expectedReturnCode\" placeholder=\"Expected Return Code\">\n      </mat-form-field>\n    </div>\n  </div>\n  <div>\n    <button mat-raised-button class='save-action-btn' (click)=\"saveAction()\">Save Action</button>\n    <button mat-raised-button mat-dialog-close>Cancel</button>\n  </div>\n</div>\n");

/***/ }),

/***/ "t8yB":
/*!*******************************************************************!*\
  !*** ./src/app/screen_validation_flow/screen_validation_flow.css ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n\n.info-text {\n  color: #3f51b5;\n}\n\n\n.step-two-form {\n  margin-left: 20px;\n}\n\n\n.summary-container {\n  display:flex;\n  flex-direction: column;\n}\n\n\n.summary-table {\n  border-collapse: collapse;\n  border-spacing: 0;\n  display: table;\n  width: 100%;\n}\n\n\n.summary-table tr {\n  border-bottom: 1px solid rgba(0,0,0,.12);\n}\n\n\n.summary-table td:nth-child(2) {\n  color: #3f51b5;\n}\n\n\n.validation-flow-step {\n  height: 280px;\n  margin-top: 30px;\n  margin-bottom: 30px;\n}\n\n\n.validation-stepper {\n  color: #666;\n  height: 500px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmVlbl92YWxpZGF0aW9uX2Zsb3cuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOzs7QUFHRjtFQUNFLGNBQWM7QUFDaEI7OztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COzs7QUFFQTtFQUNFLFlBQVk7RUFDWixzQkFBc0I7QUFDeEI7OztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2QsV0FBVztBQUNiOzs7QUFFQTtFQUNFLHdDQUF3QztBQUMxQzs7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOzs7QUFFQTtFQUNFLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCOzs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0FBQ2YiLCJmaWxlIjoic2NyZWVuX3ZhbGlkYXRpb25fZmxvdy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuXG4uaW5mby10ZXh0IHtcbiAgY29sb3I6ICMzZjUxYjU7XG59XG5cbi5zdGVwLXR3by1mb3JtIHtcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG59XG5cbi5zdW1tYXJ5LWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6ZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLnN1bW1hcnktdGFibGUge1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBib3JkZXItc3BhY2luZzogMDtcbiAgZGlzcGxheTogdGFibGU7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uc3VtbWFyeS10YWJsZSB0ciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsMCwwLC4xMik7XG59XG5cbi5zdW1tYXJ5LXRhYmxlIHRkOm50aC1jaGlsZCgyKSB7XG4gIGNvbG9yOiAjM2Y1MWI1O1xufVxuXG4udmFsaWRhdGlvbi1mbG93LXN0ZXAge1xuICBoZWlnaHQ6IDI4MHB4O1xuICBtYXJnaW4tdG9wOiAzMHB4O1xuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xufVxuXG4udmFsaWRhdGlvbi1zdGVwcGVyIHtcbiAgY29sb3I6ICM2NjY7XG4gIGhlaWdodDogNTAwcHg7XG59XG4iXX0= */");

/***/ }),

/***/ "tEPa":
/*!************************************************************!*\
  !*** ./src/app/screen_validation_flow/validation_info.css ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.info-table {\n  width: 100%;\n  display: table;\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.info-table tr {\n  border-bottom: 1px solid rgba(0,0,0,0.12);\n}\n\n.info-table td:nth-child(2) {\n  border-left: 1px solid rgba(0,0,0,0.12);\n  max-width: 400px;\n}\n\n.info-table td:nth-child(1) {\n\n  min-width: 150px;\n}\n\n.foot-note {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkYXRpb25faW5mby5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7RUFDRSxXQUFXO0VBQ1gsY0FBYztFQUNkLHlCQUF5QjtFQUN6QixpQkFBaUI7QUFDbkI7O0FBQ0E7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSx1Q0FBdUM7RUFDdkMsZ0JBQWdCO0FBQ2xCOztBQUVBOztFQUVFLGdCQUFnQjtBQUNsQjs7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckIiLCJmaWxlIjoidmFsaWRhdGlvbl9pbmZvLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4uaW5mby10YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiB0YWJsZTtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XG59XG4uaW5mby10YWJsZSB0ciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMTIpO1xufVxuXG4uaW5mby10YWJsZSB0ZDpudGgtY2hpbGQoMikge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4xMik7XG4gIG1heC13aWR0aDogNDAwcHg7XG59XG5cbi5pbmZvLXRhYmxlIHRkOm50aC1jaGlsZCgxKSB7XG5cbiAgbWluLXdpZHRoOiAxNTBweDtcbn1cbi5mb290LW5vdGUge1xuICBtYXJnaW4tdG9wOiAxNXB4O1xuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xufVxuIl19 */");

/***/ }),

/***/ "tMgY":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/popup_dialogs/python_debugger_simple_dialog.ng.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h3 mat-dialog-title>Python script action</h3>\n\n<div class=\"main-container\" fxLayout='column' fxFill>\n  <div class=\"python-script-input\">\n    <python-editor-simple language=\"python\" fxFlex></python-editor-simple>\n  </div>\n    <div>\n        <button class=\"python-save-action\" mat-raised-button (click)=\"saveAction()\" matTooltip=\"Save\"\n                    matTooltipPosition=\"left\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-download\"></i>\n                Save Python Action\n         </button>\n    </div>\n</div>\n\n\n");

/***/ }),

/***/ "uWoT":
/*!*********************************************!*\
  !*** ./src/app/device_manager/tv_remote.ts ***!
  \*********************************************/
/*! exports provided: TvRemote */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TvRemote", function() { return TvRemote; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_tv_remote_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./tv_remote.ng.html */ "vEou");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/backend_manager_service */ "Kd50");
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







/**
 * TvRemote component containing buttons to remotely control an android TV.
 */
var TvRemote = /** @class */ (function () {
    function TvRemote(backendManagerService) {
        this.backendManagerService = backendManagerService;
        // To give access to KeyCodes enum in template.
        this.keyCodes = _constants_constants__WEBPACK_IMPORTED_MODULE_5__["KeyCodes"];
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
    }
    TvRemote.prototype.sendKeyEvent = function (keyCode) {
        console.log('key pressed' + keyCode.toString());
        return this.backendManagerService.pressKey(keyCode)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
            .subscribe();
    };
    TvRemote.prototype.ngOnDestroy = function () {
        // Unsubscribes all pending subscriptions.
        this.destroyed.next();
    };
    TvRemote.ctorParameters = function () { return [
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_6__["BackendManagerService"] }
    ]; };
    TvRemote = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'tv-remote',
            template: _raw_loader_tv_remote_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_services_backend_manager_service__WEBPACK_IMPORTED_MODULE_6__["BackendManagerService"]])
    ], TvRemote);
    return TvRemote;
}());



/***/ }),

/***/ "ukZn":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/test_explorer/import_dialog.ng.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div mat-dialog-content fxLayout=\"column\">\n  <div fxLayout=\"column\">\n    <mat-form-field>\n      <mat-select placeholder=\"Select an import type\" [(ngModel)]=\"selectedImportType\">\n        <mat-option *ngFor=\"let importType of importTypes\" [value]=\"importType\">\n          {{importType}}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <div [ngSwitch]=\"selectedImportType\">\n      <div *ngSwitchCase=\"IMPORT_UUID\">\n        <mat-form-field class=\"inputField\">\n          <input matInput placeholder=\"Import by UUID\" [(ngModel)]=\"uuidImportText\">\n        </mat-form-field>\n        <div fxLayout=\"row\">\n          <mat-radio-group placeholder=\"\" [(ngModel)]=\"selectedUserImportType\">\n            <mat-radio-button *ngFor=\"let importFromUserType of IMPORT_COPY_TYPES\" [value]=\"importFromUserType.value\">\n              {{ importFromUserType.displayText }}\n            </mat-radio-button>\n          </mat-radio-group>\n          <span>\n            <button mat-mini-fab color=\"primary\" (click)=\"openActionInfoDialog()\" matTooltip=\"Show Info\"\n              matTooltipPosition=\"right\" matTooltipShowDelay=\"500\" style=\"margin-left:15px\">\n              <i class=\"fa fa-info\"></i>\n            </button>\n          </span>\n        </div>\n      </div>\n      <div *ngSwitchCase=\"IMPORT_GOOGLE3\">\n        <mat-form-field >\n          <input matInput placeholder=\"citc client\" [(ngModel)]=\"citcClient\">\n        </mat-form-field><br>\n        <mat-form-field >\n          <input matInput placeholder=\"Google3 file path\" [(ngModel)]=\"filePath\">\n        </mat-form-field>\n      </div>\n    </div>\n  </div>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"importTest()\">Import</button>\n  <button mat-raised-button mat-dialog-close>Close</button>\n</div>\n");

/***/ }),

/***/ "vBhh":
/*!**********************************************************!*\
  !*** ./src/app/constants/screen_validation_constants.ts ***!
  \**********************************************************/
/*! exports provided: ValidationGroupType, ValidationActionType, SpecialClickType, DirectionType, VALIDATION_GROUPS, VALIDATION_ACTIONS, SPECIAL_CLICK_ACTIONS, DIRECTIONS, StopType, STOP_TYPES, ScreenContentSearchType, SCREEN_CONTENT_SEARCH_TYPES, ContentMatchType, CONTENT_MATCH_TYPES, ContextStorageType, IconImageType, ICON_IMAGE_TYPES, ElementSelectorType, ELEMENT_SELECTOR_TYPES, StrategyType, CLICK_STRATEGY_TYPES, FETCH_CONTENT_STRATEGY_TYPES, WaitUntilType, WAIT_UNTIL_TYPES, PackageName, PACKAGE_NAMES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationGroupType", function() { return ValidationGroupType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationActionType", function() { return ValidationActionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpecialClickType", function() { return SpecialClickType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectionType", function() { return DirectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATION_GROUPS", function() { return VALIDATION_GROUPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATION_ACTIONS", function() { return VALIDATION_ACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPECIAL_CLICK_ACTIONS", function() { return SPECIAL_CLICK_ACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIRECTIONS", function() { return DIRECTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StopType", function() { return StopType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STOP_TYPES", function() { return STOP_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenContentSearchType", function() { return ScreenContentSearchType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCREEN_CONTENT_SEARCH_TYPES", function() { return SCREEN_CONTENT_SEARCH_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentMatchType", function() { return ContentMatchType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTENT_MATCH_TYPES", function() { return CONTENT_MATCH_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextStorageType", function() { return ContextStorageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconImageType", function() { return IconImageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ICON_IMAGE_TYPES", function() { return ICON_IMAGE_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElementSelectorType", function() { return ElementSelectorType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ELEMENT_SELECTOR_TYPES", function() { return ELEMENT_SELECTOR_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategyType", function() { return StrategyType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLICK_STRATEGY_TYPES", function() { return CLICK_STRATEGY_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CONTENT_STRATEGY_TYPES", function() { return FETCH_CONTENT_STRATEGY_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaitUntilType", function() { return WaitUntilType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WAIT_UNTIL_TYPES", function() { return WAIT_UNTIL_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PackageName", function() { return PackageName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PACKAGE_NAMES", function() { return PACKAGE_NAMES; });
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
/** Logic group type from validation related actions, only used in frontend */
var ValidationGroupType;
(function (ValidationGroupType) {
    // go/keep-sorted start
    ValidationGroupType[ValidationGroupType["FETCH_SCREEN_CONTENT"] = 0] = "FETCH_SCREEN_CONTENT";
    ValidationGroupType[ValidationGroupType["SCREEN_CONTENT_VALIDATION"] = 1] = "SCREEN_CONTENT_VALIDATION";
    ValidationGroupType[ValidationGroupType["SPECIAL_CLICK"] = 2] = "SPECIAL_CLICK";
    // go/keep-sorted end
})(ValidationGroupType || (ValidationGroupType = {}));
/** Individual validation action type */
var ValidationActionType;
(function (ValidationActionType) {
    ValidationActionType["CONDITION_CLICK_ACTION"] = "ConditionClickAction";
    ValidationActionType["LOOP_SCREEN_CONTENT_VALIDATION_ACTION"] = "LoopScreenContentValidationAction";
    ValidationActionType["SCREEN_CONTENT_VALIDATION_ACTION"] = "ScreenContentValidationAction";
    ValidationActionType["SCROLL_SCREEN_CONTENT_VALIDATION_ACTION"] = "ScrollScreenContentValidationAction";
})(ValidationActionType || (ValidationActionType = {}));
/**
 * SpecialClick Type, it contains all the special action that can be performed
 * by mouse
 */
var SpecialClickType;
(function (SpecialClickType) {
    // go/keep-sorted start
    SpecialClickType[SpecialClickType["CLICK_WITH_CONTEXT"] = 0] = "CLICK_WITH_CONTEXT";
    SpecialClickType[SpecialClickType["DOUBLE_CLICK"] = 1] = "DOUBLE_CLICK";
    SpecialClickType[SpecialClickType["DRAG_WITH_CONTEXT"] = 2] = "DRAG_WITH_CONTEXT";
    SpecialClickType[SpecialClickType["LONG_CLICK"] = 3] = "LONG_CLICK";
    SpecialClickType[SpecialClickType["SWIPE_WITH_CONTEXT"] = 4] = "SWIPE_WITH_CONTEXT";
    SpecialClickType[SpecialClickType["ZOOM_IN"] = 5] = "ZOOM_IN";
    SpecialClickType[SpecialClickType["ZOOM_OUT"] = 6] = "ZOOM_OUT";
    // go/keep-sorted end
})(SpecialClickType || (SpecialClickType = {}));
/** Swipe or scroll direction, starts from 1, matches the backend */
var DirectionType;
(function (DirectionType) {
    DirectionType[DirectionType["UP"] = 1] = "UP";
    DirectionType[DirectionType["DOWN"] = 2] = "DOWN";
    DirectionType[DirectionType["LEFT"] = 3] = "LEFT";
    DirectionType[DirectionType["RIGHT"] = 4] = "RIGHT";
})(DirectionType || (DirectionType = {}));
/** Validation group list from ratio buttons, only used in frontend */
var VALIDATION_GROUPS = [
    {
        value: ValidationGroupType.SCREEN_CONTENT_VALIDATION,
        displayText: 'screen validation',
    },
    {
        value: ValidationGroupType.FETCH_SCREEN_CONTENT,
        displayText: 'fetch screen content validation',
    },
    { value: ValidationGroupType.SPECIAL_CLICK, displayText: 'special click' },
];
/** Validation Action type, used in frontend, mapping to backend aciton */
var VALIDATION_ACTIONS = [
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
var SPECIAL_CLICK_ACTIONS = [
    {
        value: SpecialClickType.CLICK_WITH_CONTEXT,
        displayText: 'Click With Context'
    },
    { value: SpecialClickType.LONG_CLICK, displayText: 'Long Click' },
    { value: SpecialClickType.DOUBLE_CLICK, displayText: 'Double Click' },
    { value: SpecialClickType.DRAG_WITH_CONTEXT, displayText: 'Drag With Context' },
    {
        value: SpecialClickType.SWIPE_WITH_CONTEXT,
        displayText: 'Swipe With Context'
    },
    { value: SpecialClickType.ZOOM_IN, displayText: 'Zoom In' },
    { value: SpecialClickType.ZOOM_OUT, displayText: 'Zoom Out' },
];
/** Direction model for ratio button (swipe or scroll related actions) */
var DIRECTIONS = [
    { value: DirectionType.UP, displayText: 'Up' },
    { value: DirectionType.DOWN, displayText: 'Down' },
    { value: DirectionType.LEFT, displayText: 'Left' },
    { value: DirectionType.RIGHT, displayText: 'Right' },
];
/** Stop Type, it contains all the stop type of validation actions */
var StopType;
(function (StopType) {
    StopType["STOP_TEST_IF_FALSE"] = "STOP_TEST_IF_FALSE";
    StopType["STOP_TEST_IF_TRUE"] = "STOP_TEST_IF_TRUE";
    StopType["STOP_CURRENT_COMPOUND_IF_FALSE"] = "STOP_CURRENT_COMPOUND_IF_FALSE";
    StopType["STOP_CURRENT_COMPOUND_IF_TRUE"] = "STOP_CURRENT_COMPOUND_IF_TRUE";
})(StopType || (StopType = {}));
/** Stop Type for user to choose */
var STOP_TYPES = [
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
/**
 * Stop Type, it contains all the special action that can be performed
 * by mouse
 */
var ScreenContentSearchType;
(function (ScreenContentSearchType) {
    // go/keep-sorted start
    ScreenContentSearchType["AROUND"] = "AROUND";
    ScreenContentSearchType["FULLSCREEN"] = "FULLSCREEN";
    ScreenContentSearchType["FULLSCREEN_CONTEXT"] = "FULLSCREEN_CONTEXT";
    ScreenContentSearchType["NEARBY_CONTEXT"] = "NEARBY_CONTEXT";
    ScreenContentSearchType["STRICT"] = "STRICT";
    // go/keep-sorted end
})(ScreenContentSearchType || (ScreenContentSearchType = {}));
/** Screen content search types */
var SCREEN_CONTENT_SEARCH_TYPES = [
    { value: ScreenContentSearchType.STRICT, displayText: 'Strict' },
    { value: ScreenContentSearchType.AROUND, displayText: 'Around' },
    { value: ScreenContentSearchType.FULLSCREEN, displayText: 'FullScreen' },
    { value: ScreenContentSearchType.NEARBY_CONTEXT, displayText: 'NearbyContext' },
    {
        value: ScreenContentSearchType.FULLSCREEN_CONTEXT,
        displayText: 'FullScreenContext',
    },
];
/**
 * Stop Type, it contains all the special action that can be performed
 * by mouse
 */
var ContentMatchType;
(function (ContentMatchType) {
    // go/keep-sorted start
    ContentMatchType["CONTAINS"] = "CONTAINS";
    ContentMatchType["EQUALS"] = "EQUALS";
    ContentMatchType["EQUALS_CASE_SENSITIVE"] = "EQUALS_CASE_SENSITIVE";
    ContentMatchType["IS_ANY_OF"] = "IS_ANY_OF";
    ContentMatchType["REGEX"] = "REGEX";
    // go/keep-sorted end
})(ContentMatchType || (ContentMatchType = {}));
/** Content match types */
var CONTENT_MATCH_TYPES = [
    { value: ContentMatchType.EQUALS, displayText: 'Equals' },
    {
        value: ContentMatchType.EQUALS_CASE_SENSITIVE,
        displayText: 'EqualsCaseSensitive',
    },
    { value: ContentMatchType.CONTAINS, displayText: 'Contains' },
    { value: ContentMatchType.IS_ANY_OF, displayText: 'IsAnyOf' },
    { value: ContentMatchType.REGEX, displayText: 'RegEx' },
];
/** Backend store type of the context */
var ContextStorageType;
(function (ContextStorageType) {
    // go/keep-sorted start
    ContextStorageType["CONTEXT_BASED"] = "CONTEXT_BASED";
    ContextStorageType["ID_BASED"] = "ID_BASED";
    ContextStorageType["POSITION_BASED"] = "POSITION_BASED";
    ContextStorageType["TEXT_BASED"] = "TEXT_BASED";
    // go/keep-sorted end
})(ContextStorageType || (ContextStorageType = {}));
/** Options available for icon images to validate */
var IconImageType;
(function (IconImageType) {
    // go/keep-sorted start
    IconImageType["BLUE_DOT"] = "BLUE_DOT";
    // go/keep-sorted end
})(IconImageType || (IconImageType = {}));
/** Options available for icon images to validate */
var ICON_IMAGE_TYPES = [
    { value: IconImageType.BLUE_DOT, displayText: 'Blue Dot', matIcon: 'lens' },
];
/** Different types for element selector, used in the validation action */
var ElementSelectorType;
(function (ElementSelectorType) {
    ElementSelectorType["RESOURCE_ID"] = "RESOURCE_ID";
    ElementSelectorType["DISPLAY_TEXT"] = "DISPLAY_TEXT";
    ElementSelectorType["CHECK"] = "CHECK";
    ElementSelectorType["ADVANCED"] = "ADVANCED";
})(ElementSelectorType || (ElementSelectorType = {}));
/** Content match types */
var ELEMENT_SELECTOR_TYPES = [
    { value: ElementSelectorType.RESOURCE_ID, displayText: 'resourceid' },
    { value: ElementSelectorType.DISPLAY_TEXT, displayText: 'displayText' },
    { value: ElementSelectorType.CHECK, displayText: 'checked' },
];
/** Screen content select StrategyType */
var StrategyType;
(function (StrategyType) {
    StrategyType["POSITION"] = "POSITION";
    StrategyType["RESOURCEID"] = "RESOURCEID";
    StrategyType["XPATH"] = "XPATH";
    StrategyType["TEXT"] = "TEXT";
    StrategyType["TEXT_EQUALS"] = "TEXT_EQUALS";
})(StrategyType || (StrategyType = {}));
/** Model for different strategy to select screen content */
var CLICK_STRATEGY_TYPES = [
    { value: StrategyType.TEXT, displayText: 'Text Contains' },
    { value: StrategyType.TEXT_EQUALS, displayText: 'Text Equals' },
    { value: StrategyType.RESOURCEID, displayText: 'Resource Id' },
    { value: StrategyType.XPATH, displayText: 'XPath' },
];
/** Model for different strategy to select screen content */
var FETCH_CONTENT_STRATEGY_TYPES = [
    { value: StrategyType.POSITION, displayText: 'Position' },
    { value: StrategyType.RESOURCEID, displayText: 'Resource Id' },
    { value: StrategyType.XPATH, displayText: 'XPath' },
];
/** WaitUntilType */
var WaitUntilType;
(function (WaitUntilType) {
    WaitUntilType[WaitUntilType["WAIT_UNTIL_APPEAR"] = 0] = "WAIT_UNTIL_APPEAR";
    WaitUntilType[WaitUntilType["WAIT_UNTIL_DISAPPEAR"] = 1] = "WAIT_UNTIL_DISAPPEAR";
})(WaitUntilType || (WaitUntilType = {}));
/** Wait until types for dropdown */
var WAIT_UNTIL_TYPES = [
    { value: WaitUntilType.WAIT_UNTIL_APPEAR, displayText: 'Wait Until Appear' },
    {
        value: WaitUntilType.WAIT_UNTIL_DISAPPEAR,
        displayText: 'Wait Until Disappear',
    },
];
/** Snippet Validation select PackageName */
var PackageName;
(function (PackageName) {
    PackageName[PackageName["EMPTY_STRING"] = 0] = "EMPTY_STRING";
    PackageName[PackageName["COM_GOOGLE_ANDROID_MOBLY_SNIPPET_BUNDLED"] = 1] = "COM_GOOGLE_ANDROID_MOBLY_SNIPPET_BUNDLED";
})(PackageName || (PackageName = {}));
/** Model for different strategy to select package name */
var PACKAGE_NAMES = [
    {
        value: PackageName.EMPTY_STRING,
        displayText: '',
    },
    {
        value: PackageName.COM_GOOGLE_ANDROID_MOBLY_SNIPPET_BUNDLED,
        displayText: 'com.google.android.mobly.snippet.bundled',
    },
];


/***/ }),

/***/ "vEou":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/device_manager/tv_remote.ng.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h3>TV Remote Control Actions:</h3>\n<table>\n  <tr>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_DPAD_LEFT)\">&lt;</button></td>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_DPAD_RIGHT)\">&gt;</button></td>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_DPAD_UP)\">^</button></td>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_DPAD_DOWN)\">v</button></td>\n  </tr>\n  <tr>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_BACK)\">Back</button></td>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_HOME)\">Home</button></td>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_DPAD_CENTER)\">Center</button></td>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_MEDIA_PLAY_PAUSE)\">Play/Pause</button></td>\n  </tr>\n</table>\n\n");

/***/ }),

/***/ "vFh4":
/*!**************************************************!*\
  !*** ./src/app/popup_dialogs/history_dialog.css ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.testTable {\n  width: 100%;\n}\n\n.testTable td,th {\n  padding-right:10px;\n  padding-left:10px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhpc3RvcnlfZGlhbG9nLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkIiLCJmaWxlIjoiaGlzdG9yeV9kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi50ZXN0VGFibGUge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLnRlc3RUYWJsZSB0ZCx0aCB7XG4gIHBhZGRpbmctcmlnaHQ6MTBweDtcbiAgcGFkZGluZy1sZWZ0OjEwcHg7XG59XG4iXX0= */");

/***/ }),

/***/ "vh3h":
/*!************************************!*\
  !*** ./src/app/constants/shape.ts ***!
  \************************************/
/*! exports provided: Circle, Rectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return Circle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return Rectangle; });
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
/**
 * Circle class that implements Shape and maps to Circular class in the backend.
 */
var Circle = /** @class */ (function () {
    function Circle(type, centerX, centerY, radius) {
        this.type = type;
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }
    return Circle;
}());

/**
 * Rectangle class that implements Shape and maps to Rectangular class in the
 * backend.
 */
var Rectangle = /** @class */ (function () {
    function Rectangle(type, originX, originY, width, height) {
        this.type = type;
        this.originX = originX;
        this.originY = originY;
        this.width = width;
        this.height = height;
    }
    return Rectangle;
}());



/***/ }),

/***/ "x9BQ":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/workflow_editor/workflow_editor.ng.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--\n  Copyright 2021 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n  <div class=\"control-area\" fxLayout='row wrap' fxLayoutGap=\"10px\">\n    <button mat-raised-button (click)=\"playCurrentWorkflow()\" class=\"play-current-btn\" *ngIf=\"!isReplaying\"\n      matTooltip=\"Play the current workflow\">\n      <i class=\"fa fa-play-circle center-icon-img\"></i>Play Workflow\n    </button>\n    <button mat-raised-button (click)=\"playCurrentWorkflow()\" class=\"play-current-btn\" *ngIf=\"isReplaying\"\n      matTooltip=\"Stop playing the current workflow\">\n      <i class=\"fa fa-stop-circle center-icon-img\"></i>Stop Playback\n    </button>\n    <button mat-raised-button (click)=\"clearRecord()\" class=\"btn-clear-record\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-remove center-icon-img\"></i>Clear Workspace\n    </button>\n    <button mat-raised-button (click)=\"addActionPlus()\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-plus-circle center-icon-img\"></i>\n      Add Action\n    </button>\n    <button mat-raised-button (click)=\"openSaveWorkflowDialog()\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-floppy-o center-icon-img\"></i>\n      Save Workflow\n    </button>\n    <button mat-raised-button (click)=\"addScreenShot()\" class=\"btn-add-screenshot\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-camera center-icon-img\"></i>\n      Add Screenshot\n    </button>\n    <button mat-raised-button (click)=\"addWait()\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-clock-o center-icon-img\"></i>\n      Add Wait\n    </button>\n    <button mat-raised-button (click)=\"openHistoryDialog()\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-history center-icon-img\"></i>\n      Test History\n    </button>\n    <button mat-raised-button (click)=\"openGlobalVarSettings()\" class=\"global-var-setting\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-superpowers center-icon-img\"></i>\n      Global Variable Settings\n    </button>\n    <button mat-raised-button (click)=\"undo()\" class=\"undo-last-action\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-undo center-icon-img\"></i>\n      Undo\n    </button>\n    <button mat-raised-button (click)=\"redo()\" class=\"redo-last-undo\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-repeat center-icon-img\"></i>\n      Redo\n    </button>\n    <button mat-raised-button (click)=\"openPdbDebuggerDialog()\" [disabled]=\"isReplaying\" *ngIf=\"showPython\">\n      <i class=\"fa fa-plus-circle center-icon-img\"></i>\n      Python Debugger\n    </button>\n\n    <div>\n      <span class=\"play-speed-text-label\">Play Speed: </span>\n      <span class=\"play-speed-value-label\">{{playSpeedFactor}}X</span>\n      <mat-slider min=\"0.5\" max=\"4\" step=\"0.25\" [(value)]=\"playSpeedFactor\" id=\"speed-slider\" (input)=\"onSpeedSliderChange($event)\"></mat-slider>\n    </div>\n  </div>\n  <div class=\"panel panel-success\">\n    <div class=\"breadcrumb flat\">\n      <a>Workflow: </a>\n      <a *ngFor=\"let action of pathStack\" class=\"link-style\"\n                                     (click)=\"goBackFromExpandedCompoundAction(action)\">\n      <span class=\"current-action-name-label\">{{action.name}}</span>\n    </a>\n    </div>\n    <div class=\"panel-heading\">Workflow Editor (Drag and drop to reorder sequence, hover over for more info)</div>\n    <div class=\"panel-body\">\n\n\n      <ol class=\"list-group\" dnd-sortable-container [sortableData]=\"workflowModel.childrenActions\">\n        <li *ngFor=\"let action of workflowModel.childrenActions; let i = index\"\n          (click)=\"isReplaying || openActionEditDialog(action.actionId, i)\" class=\"list-group-item action-item\"\n          [style.background-color]=\"getBackgroundColor(action)\" dnd-sortable (onDropSuccess)=\"onDropSuccess()\"\n          [sortableIndex]=\"i\" [matTooltip]=\"getActionToolTip(action)\">\n          <div class=\"expand-icon\" *ngIf=\"getTextByType(action)==='CPD'\" matTooltip=\"click to open\">\n            <i class=\"fa fa-plus-circle center-icon-img\" (click)=\"expandCompoundAction(action, $event)\"></i>\n          </div>\n          {{i + 1}}) {{getTextByType(action)}} <br> ({{action.name}})\n        </li>\n      </ol>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "xPQS":
/*!*****************************************************!*\
  !*** ./src/app/workflow_editor/workflow_editor.css ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\n * Copyright 2021 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.links line {\n  stroke: #999;\n  stroke-opacity: 0.6;\n}\n\n.list-group-item {\n  display: block;\n  width: 20%;\n  float: left;\n  color: white;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding: 10px 15px;\n  border: 1px solid #ddd;\n}\n\n.control-area {\n  padding: 15px;\n}\n\n.control-area button {\n  min-width: 140px;\n  margin-bottom: 10px;\n  margin-left: 5px;\n}\n\n.center-icon-img {\n  padding-right:5px;\n  padding-bottom:2px\n}\n\n.expand-icon {\n  display: inline-flex;\n  float:right;\n}\n\n.link-style {\n  color: rgb(89, 0, 255);\n  text-decoration: underline;\n}\n\n.play-speed-text-label {\n  margin-left: 20px;\n}\n\n.play-speed-value-label {\n  font-weight: bold;\n}\n\n.breadcrumb {\n  display: inline-block;\n  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.35);\n  overflow: hidden;\n  border-radius: 5px;\n  counter-reset: flag;\n  margin-left:20px;\n}\n\n.breadcrumb a {\n  text-decoration: none;\n  outline: none;\n  display: block;\n  float: left;\n  font-size: 12px;\n  line-height: 36px;\n  color: white;\n  padding: 0 10px 0 30px;\n  background: #666;\n  background: linear-gradient(#666, #333);\n  position: relative;\n}\n\n.breadcrumb a:first-child {\n  border-radius: 5px 0 0 5px; /*to match with the parent's radius*/\n}\n\n.breadcrumb a:first-child:before {\n  content: '';\n  display: none;\n}\n\n.breadcrumb a:last-child {\n  border-radius: 0 5px 5px 0;\n  padding-right: 20px;\n}\n\n.breadcrumb a:first-child:hover {\n  color: black;\n  background: white;\n  cursor: none;\n}\n\n.breadcrumb a:first-child:hover:after {\n  color: black;\n  background: white;\n  cursor: none;\n}\n\n/*hover/active styles*/\n\n.breadcrumb a.active, .breadcrumb a:hover{\n  background: #333;\n  background: linear-gradient(#333, #000);\n  cursor: pointer;\n}\n\n.breadcrumb a.active:after, .breadcrumb a:hover:after {\n  background: #333;\n  background: linear-gradient(135deg, #333, #000);\n}\n\n.breadcrumb a:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  right: -18px; /*half of square's length*/\n  width: 36px;\n  height: 36px;\n  transform: scale(0.707) rotate(45deg);\n  z-index: 1;\n  background: #666;\n  background: linear-gradient(135deg, #666, #333);\n  /*stylish arrow design using box shadow*/\n  box-shadow:\n      2px -2px 0 2px rgba(0, 0, 0, 0.4),\n      3px -3px 0 2px rgba(255, 255, 255, 0.1);\n  border-radius: 0 5px 0 50px;\n}\n\n.breadcrumb a:last-child:after {\n  content: none;\n}\n\n.breadcrumb a:before {\n  content: counter(flag);\n  counter-increment: flag;\n  border-radius: 100%;\n  width: 14px;\n  height: 20px;\n  line-height: 20px;\n  margin: 8px 0 5px;\n  position: absolute;\n  font-weight: bold;\n  color: black;\n  padding-left: 6px;\n}\n\n.flat a, .flat a:after {\n  background: white;\n  color: black;\n  transition: all 0.5s;\n}\n\n.flat a:before {\n  background: white;\n  box-shadow: 0 0 0 1px #ccc;\n}\n\n.flat a:hover, .flat a.active, .flat a:last-child,\n.flat a:hover:after, .flat a.active:after{\n  background: #28a6da;\n  color: white;\n}\n\n.current-action-name-label {\n  margin-left:40px;\n}\n\n.panel-heading {\n  margin-left:20px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtmbG93X2VkaXRvci5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7RUFDRSxZQUFZO0VBQ1osbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsY0FBYztFQUNkLFVBQVU7RUFDVixXQUFXO0VBQ1gsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQjtBQUNGOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QiwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsNENBQTRDO0VBQzVDLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2IsY0FBYztFQUNkLFdBQVc7RUFDWCxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLHVDQUF1QztFQUN2QyxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSwwQkFBMEIsRUFBRSxvQ0FBb0M7QUFDbEU7O0FBQ0E7RUFDRSxXQUFXO0VBQ1gsYUFBYTtBQUNmOztBQUNBO0VBQ0UsMEJBQTBCO0VBQzFCLG1CQUFtQjtBQUNyQjs7QUFDQTtFQUNFLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixZQUFZO0FBQ2Q7O0FBRUEsc0JBQXNCOztBQUN0QjtFQUNFLGdCQUFnQjtFQUNoQix1Q0FBdUM7RUFDdkMsZUFBZTtBQUNqQjs7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQiwrQ0FBK0M7QUFDakQ7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixZQUFZLEVBQUUsMEJBQTBCO0VBQ3hDLFdBQVc7RUFDWCxZQUFZO0VBQ1oscUNBQXFDO0VBQ3JDLFVBQVU7RUFDVixnQkFBZ0I7RUFDaEIsK0NBQStDO0VBQy9DLHdDQUF3QztFQUN4Qzs7NkNBRTJDO0VBQzNDLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLG9CQUFvQjtBQUN0Qjs7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQiwwQkFBMEI7QUFDNUI7O0FBQ0E7O0VBRUUsbUJBQW1CO0VBQ25CLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJ3b3JrZmxvd19lZGl0b3IuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5saW5rcyBsaW5lIHtcbiAgc3Ryb2tlOiAjOTk5O1xuICBzdHJva2Utb3BhY2l0eTogMC42O1xufVxuXG4ubGlzdC1ncm91cC1pdGVtIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAyMCU7XG4gIGZsb2F0OiBsZWZ0O1xuICBjb2xvcjogd2hpdGU7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBwYWRkaW5nOiAxMHB4IDE1cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG59XG5cbi5jb250cm9sLWFyZWEge1xuICBwYWRkaW5nOiAxNXB4O1xufVxuLmNvbnRyb2wtYXJlYSBidXR0b24ge1xuICBtaW4td2lkdGg6IDE0MHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG4uY2VudGVyLWljb24taW1nIHtcbiAgcGFkZGluZy1yaWdodDo1cHg7XG4gIHBhZGRpbmctYm90dG9tOjJweFxufVxuXG4uZXhwYW5kLWljb24ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgZmxvYXQ6cmlnaHQ7XG59XG5cbi5saW5rLXN0eWxlIHtcbiAgY29sb3I6IHJnYig4OSwgMCwgMjU1KTtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5cbi5wbGF5LXNwZWVkLXRleHQtbGFiZWwge1xuICBtYXJnaW4tbGVmdDogMjBweDtcbn1cblxuLnBsYXktc3BlZWQtdmFsdWUtbGFiZWwge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJyZWFkY3J1bWIge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGJveC1zaGFkb3c6IDAgMCAxNXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMzUpO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGNvdW50ZXItcmVzZXQ6IGZsYWc7XG4gIG1hcmdpbi1sZWZ0OjIwcHg7XG59XG5cbi5icmVhZGNydW1iIGEge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmbG9hdDogbGVmdDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBsaW5lLWhlaWdodDogMzZweDtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAwIDEwcHggMCAzMHB4O1xuICBiYWNrZ3JvdW5kOiAjNjY2O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoIzY2NiwgIzMzMyk7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmJyZWFkY3J1bWIgYTpmaXJzdC1jaGlsZCB7XG4gIGJvcmRlci1yYWRpdXM6IDVweCAwIDAgNXB4OyAvKnRvIG1hdGNoIHdpdGggdGhlIHBhcmVudCdzIHJhZGl1cyovXG59XG4uYnJlYWRjcnVtYiBhOmZpcnN0LWNoaWxkOmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcnO1xuICBkaXNwbGF5OiBub25lO1xufVxuLmJyZWFkY3J1bWIgYTpsYXN0LWNoaWxkIHtcbiAgYm9yZGVyLXJhZGl1czogMCA1cHggNXB4IDA7XG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG59XG4uYnJlYWRjcnVtYiBhOmZpcnN0LWNoaWxkOmhvdmVyIHtcbiAgY29sb3I6IGJsYWNrO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgY3Vyc29yOiBub25lO1xufVxuXG4uYnJlYWRjcnVtYiBhOmZpcnN0LWNoaWxkOmhvdmVyOmFmdGVyIHtcbiAgY29sb3I6IGJsYWNrO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgY3Vyc29yOiBub25lO1xufVxuXG4vKmhvdmVyL2FjdGl2ZSBzdHlsZXMqL1xuLmJyZWFkY3J1bWIgYS5hY3RpdmUsIC5icmVhZGNydW1iIGE6aG92ZXJ7XG4gIGJhY2tncm91bmQ6ICMzMzM7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjMzMzLCAjMDAwKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmJyZWFkY3J1bWIgYS5hY3RpdmU6YWZ0ZXIsIC5icmVhZGNydW1iIGE6aG92ZXI6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kOiAjMzMzO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMzMzLCAjMDAwKTtcbn1cblxuLmJyZWFkY3J1bWIgYTphZnRlciB7XG4gIGNvbnRlbnQ6ICcnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IC0xOHB4OyAvKmhhbGYgb2Ygc3F1YXJlJ3MgbGVuZ3RoKi9cbiAgd2lkdGg6IDM2cHg7XG4gIGhlaWdodDogMzZweDtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjcwNykgcm90YXRlKDQ1ZGVnKTtcbiAgei1pbmRleDogMTtcbiAgYmFja2dyb3VuZDogIzY2NjtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2NiwgIzMzMyk7XG4gIC8qc3R5bGlzaCBhcnJvdyBkZXNpZ24gdXNpbmcgYm94IHNoYWRvdyovXG4gIGJveC1zaGFkb3c6XG4gICAgICAycHggLTJweCAwIDJweCByZ2JhKDAsIDAsIDAsIDAuNCksXG4gICAgICAzcHggLTNweCAwIDJweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gIGJvcmRlci1yYWRpdXM6IDAgNXB4IDAgNTBweDtcbn1cblxuLmJyZWFkY3J1bWIgYTpsYXN0LWNoaWxkOmFmdGVyIHtcbiAgY29udGVudDogbm9uZTtcbn1cblxuLmJyZWFkY3J1bWIgYTpiZWZvcmUge1xuICBjb250ZW50OiBjb3VudGVyKGZsYWcpO1xuICBjb3VudGVyLWluY3JlbWVudDogZmxhZztcbiAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgd2lkdGg6IDE0cHg7XG4gIGhlaWdodDogMjBweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIG1hcmdpbjogOHB4IDAgNXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogYmxhY2s7XG4gIHBhZGRpbmctbGVmdDogNnB4O1xufVxuXG4uZmxhdCBhLCAuZmxhdCBhOmFmdGVyIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGNvbG9yOiBibGFjaztcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXM7XG59XG4uZmxhdCBhOmJlZm9yZSB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3gtc2hhZG93OiAwIDAgMCAxcHggI2NjYztcbn1cbi5mbGF0IGE6aG92ZXIsIC5mbGF0IGEuYWN0aXZlLCAuZmxhdCBhOmxhc3QtY2hpbGQsXG4uZmxhdCBhOmhvdmVyOmFmdGVyLCAuZmxhdCBhLmFjdGl2ZTphZnRlcntcbiAgYmFja2dyb3VuZDogIzI4YTZkYTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uY3VycmVudC1hY3Rpb24tbmFtZS1sYWJlbCB7XG4gIG1hcmdpbi1sZWZ0OjQwcHg7XG59XG5cbi5wYW5lbC1oZWFkaW5nIHtcbiAgbWFyZ2luLWxlZnQ6MjBweDtcbn1cbiJdfQ== */");

/***/ }),

/***/ "xqAX":
/*!********************************************************!*\
  !*** ./src/app/test_explorer/export_google3_dialog.ts ***!
  \********************************************************/
/*! exports provided: ExportGoogle3Dialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExportGoogle3Dialog", function() { return ExportGoogle3Dialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_export_google3_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./export_google3_dialog.ng.html */ "gQki");
/* harmony import */ var _export_google3_dialog_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./export_google3_dialog.css */ "lP55");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/constants */ "bl9C");
/* harmony import */ var _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/test_case_manager_service */ "pEJ0");
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



// taze: $, JQuery from //third_party/javascript/typings/jquery:jquery_without_externs
// taze: jstree from //third_party/javascript/typings/jstree:jstree







/**
 * Dialog for exporting test cases to Google3
 */
var ExportGoogle3Dialog = /** @class */ (function () {
    function ExportGoogle3Dialog(dialog, dialogRef, testCaseManagerService, snackBar, data) {
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.testCaseManagerService = testCaseManagerService;
        this.snackBar = snackBar;
        this.data = data;
        this.citcClient = '';
        this.filePath = '';
        this.uuid = '';
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_6__["ReplaySubject"](1);
    }
    ExportGoogle3Dialog.prototype.ngOnInit = function () {
        this.filePath = this.data.google3Path;
    };
    ExportGoogle3Dialog.prototype.exportTest = function () {
        var _this = this;
        if (this.citcClient !== '' && this.filePath !== '') {
            this.testCaseManagerService
                .exportTestCaseFromGoogle3(this.citcClient, this.filePath, this.data.actionId)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["catchError"])(function (error) {
                _this.snackBar.open("Make sure that prodaccess is present and the path exists", 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(null);
            }))
                .subscribe(function (metadata) {
                _this.snackBar.open("Exported Test Case Successfully", 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["SNACKBAR_DURATION_MS"] });
                _this.dialogRef.close([]);
            });
        }
    };
    ExportGoogle3Dialog.prototype.ngOnDestroy = function () {
        // Unsubscribe all pending subscriptions.
        this.destroyed.next();
    };
    ExportGoogle3Dialog.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_9__["TestCaseManagerService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
    ]; };
    ExportGoogle3Dialog = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-export-google3-dialog',
            template: _raw_loader_export_google3_dialog_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_export_google3_dialog_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"],
            _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_9__["TestCaseManagerService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"], Object])
    ], ExportGoogle3Dialog);
    return ExportGoogle3Dialog;
}());



/***/ }),

/***/ "yhUx":
/*!***********************************************************!*\
  !*** ./src/app/screen_validation_flow/validation_info.ts ***!
  \***********************************************************/
/*! exports provided: ValidationInfoDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationInfoDialogComponent", function() { return ValidationInfoDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_validation_info_ng_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./validation_info.ng.html */ "QFgC");
/* harmony import */ var _validation_info_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation_info.css */ "tEPa");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
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





/** Displays the instruction for validation related actions */
var ValidationInfoDialogComponent = /** @class */ (function () {
    function ValidationInfoDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    ValidationInfoDialogComponent.prototype.onOkClick = function () {
        this.dialogRef.close();
    };
    ValidationInfoDialogComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] }
    ]; };
    ValidationInfoDialogComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'validation-info-dialog',
            template: _raw_loader_validation_info_ng_html__WEBPACK_IMPORTED_MODULE_1__["default"],
            styles: [_validation_info_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"]])
    ], ValidationInfoDialogComponent);
    return ValidationInfoDialogComponent;
}());



/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfills_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills.ts */ "hN/g");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hammerjs */ "yLV6");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "a3Wg");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/app_module */ "7lza");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./environments/environment */ "AytR");
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






if (_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_4__["AppModule"]).catch(function (err) { return console.log(err); });


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map