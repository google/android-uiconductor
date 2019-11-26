(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/advanced_actions_dialog/advanced_actions_dialog.ng.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/advanced_actions_dialog/advanced_actions_dialog.ng.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<p>Advanced Action</p>\n<div class=\"new-action-form\" *ngIf=\"isNewAction\">\n  <mat-form-field>\n    <mat-select [(value)]=\"selectedActionType\" class=\"action-selector\">\n      <mat-option *ngFor=\"let action of advancedActionTypeList\" [value]=\"action.type\" class='mat-option'>\n        {{ action.type }}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n</div>\n<div [ngSwitch]=\"selectedActionType\">\n  <div *ngSwitchCase=\"ACTIONS.COMMAND_LINE_ACTION.type\">\n    <div class='new-action-form'>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"commandLineActionDetails.name\" placeholder=\"Name\" class=\"cmd-name\">\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput class=\"cmd-delay\" [(ngModel)]=\"commandLineActionDetails.delayAfterActionMs\"\n               placeholder=\"Delay After Action (ms)\" type=\"number\" class=\"cmd-delay-ms\">\n      </mat-form-field>\n      <mat-form-field>\n        <textarea matInput [(ngModel)]=\"commandLineActionDetails.actionDescription\" placeholder=\"Description\"\n                  class=\"cmd-desc\"></textarea>\n      </mat-form-field>\n      <mat-form-field>\n        <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"commandLineActionDetails.commandLine\"\n                  placeholder=\"Command Line\" class=\"cmd-input\"></textarea>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"commandLineActionDetails.expectedReturnCode\" placeholder=\"Expected Return Code\"\n               class=\"cmd-expected-code\">\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"commandLineActionDetails.commandlineExecutionTimeoutSec\"\n               placeholder=\"Command Timeout (sec)\" type=\"number\" class='cmd-timeout'>\n      </mat-form-field>\n      <mat-checkbox [(ngModel)]=\"commandLineActionDetails.isAdbCommand\">ADB command</mat-checkbox>\n      <mat-checkbox [(ngModel)]=\"commandLineActionDetails.needShellOutput\">Need Shell Output</mat-checkbox>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.LOGCAT_VALIDATION_ACTION.type\">\n    <div class='new-action-form'>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"logcatValidationActionDetails.name\" placeholder=\"Name\" class=\"logcat-name\">\n      </mat-form-field>\n      <mat-form-field>\n        <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"logcatValidationActionDetails.commandLine\"\n                  placeholder=\"Command Line\"></textarea>\n      </mat-form-field>\n      <mat-form-field class=\"selector-css\">\n        <mat-select placeholder=\"Match Type\" [(ngModel)]=\"logcatValidationActionDetails.textValidator.contentMatchType\"\n                    class=\"slot-selector\">\n          <mat-option *ngFor=\"let c of CONTENT_MATCH_TYPES\" [value]=\"c.value\" class='mat-option'>\n            {{ c.displayText }}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n      <mat-form-field>\n        <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"logcatValidationActionDetails.textValidator.patternValue\"\n                  placeholder=\"Text Pattern\"></textarea>\n      </mat-form-field>\n      <mat-form-field>\n        <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"logcatValidationActionDetails.stopType\">\n          <mat-option *ngFor=\"let sType of STOP_TYPES\" [value]=\"sType.value\">{{ sType.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"logcatValidationActionDetails.commandlineExecutionTimeoutSec\"\n               placeholder=\"Command Timeout (sec)\" type=\"number\">\n      </mat-form-field>\n      <mat-checkbox placeholder=\"Logcat Only\" [(ngModel)]=\"logcatValidationActionDetails.logcatOnly\">Logcat Only(No\n        Validation)\n      </mat-checkbox>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.INPUT_ACTION.type\">\n    Input Action\n    <div class='new-action-form'>\n      <div [hidden]='inputActionDetails.isSingleChar'>\n        <mat-form-field>\n          <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"inputActionDetails.inputString\"\n                    placeholder=\"Input String\"></textarea>\n        </mat-form-field>\n      </div>\n      <div [hidden]='!inputActionDetails.isSingleChar'>\n        <mat-form-field>\n          <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"inputActionDetails.keyCode\"\n                    placeholder=\"Key Code\"></textarea>\n        </mat-form-field>\n      </div>\n      <mat-checkbox [(ngModel)]=\"inputActionDetails.isSingleChar\">Raw Key Code</mat-checkbox>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.REBOOT_ACTION.type\">\n    <div class='new-action-form'>\n      <mat-checkbox [(ngModel)]=\"rebootActionDetails.onlyReconnectToDevice\">Skip Reboot, Reconnect to Device Only\n      </mat-checkbox>\n      Time to wait (in seconds) after reboot before reconnecting:<textarea rows=\"1\" cols=\"10\" matInput\n                                                                           [(ngModel)]=\"rebootActionDetails.reconnectTimeInSec\">30</textarea>\n      <br>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.CLICK_ACTION.type\">\n    Click by Element Info\n    <div class='new-action-form'>\n      <mat-form-field class=\"selector-css\">\n        <mat-select placeholder=\"Selector Type\" [(ngModel)]=\"clickActionDetails.strategy\" class=\"slot-selector\">\n          <mat-option *ngFor=\"let c of STRATEGY_TYPES\" [value]=\"c.value\" class='mat-option'>\n            {{ c.displayText }}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"clickActionDetails.selector\" placeholder=\"Selector\">\n      </mat-form-field>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.GLOBAL_VARIABLE_VALIDATION_ACTION.type\">\n    Global Variable Expression Validation Action\n    <div class='new-action-form'>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"globalVarValidationActionDetails.expression\" placeholder=\"Expression\">\n      </mat-form-field>\n      <mat-form-field>\n        <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"globalVarValidationActionDetails.stopType\">\n          <mat-option *ngFor=\"let sType of STOP_TYPES\" [value]=\"sType.value\">{{ sType.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.SNIPPET_VALIDATION_ACTION.type\">\n    <div class=\"row\">\n      <span class=\"form-text-align\">Snippet Validation Action</span>\n      <button mat-mini-fab color=\"primary\" (click)=\"openActionInfoDialog()\" matTooltip=\"Show Info\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n        <i class=\"fa fa-info\"></i>\n      </button>\n    </div>\n    <div class='new-action-form'>\n      <mat-form-field>\n        <mat-select placeholder=\"Package Name\" [(ngModel)]=\"snippetValidationActionDetails.packageName\" (ngModelChange)=\"selectedPackageChanged($event)\">\n          <mat-option *ngFor=\"let pName of PACKAGE_NAMES\" [value]=\"pName.value\">{{ pName.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n          <mat-progress-bar *ngIf=\"isWaitingForMethods\" mode=\"indeterminate\"></mat-progress-bar>\n      <mat-form-field>\n        <mat-select placeholder=\"Method Name\" [(ngModel)]=\"snippetValidationActionDetails.methodName\" (ngModelChange)=\"methodSelected($event)\">\n          <mat-option *ngFor=\"let mName of methodNames\" [value]=\"mName.value\">{{ mName.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"snippetValidationActionDetails.argumentsSeparatedByComma\" placeholder=\"Arguments Separated By ','\">\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"snippetValidationActionDetails.commandlineExecutionTimeoutSec\"\n          placeholder=\"Command Timeout (sec)\" type=\"number\" class='cmd-timeout'>\n      </mat-form-field>\n      <mat-form-field>\n        <mat-select placeholder=\"Match Type\" [(ngModel)]=\"snippetValidationActionDetails.matchType\">\n          <mat-option *ngFor=\"let cmType of CONTENT_MATCH_TYPES\" [value]=\"cmType.value\">{{ cmType.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"snippetValidationActionDetails.textPattern\" placeholder=\"Text Pattern\">\n      </mat-form-field>\n      <mat-form-field>\n        <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"snippetValidationActionDetails.stopType\">\n          <mat-option *ngFor=\"let sType of STOP_TYPES\" [value]=\"sType.value\">{{ sType.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.SCRIPT_EXECUTION_ACTION.type\">\n        <div class = \"row\">\n          <span class=\"form-text-align\">Execute Python 2.7 Scripts on the Android Device</span>\n          <button mat-mini-fab color=\"primary\" (click)=\"openActionInfoDialog()\" matTooltip=\"Show Info\" matTooltipPosition=\"left\" matTooltipShowDelay=\"500\">\n            <i class=\"fa fa-info\"></i>\n          </button>\n        </div>\n        <div class='new-action-form'>\n          <mat-form-field>\n            <input matInput [(ngModel)]=\"scriptExecutionActionDetails.delayAfterActionMs\" placeholder=\"Delay After Action (ms)\" type=\"number\">\n          </mat-form-field>\n          <mat-form-field>\n            <textarea matInput [(ngModel)]=\"scriptExecutionActionDetails.actionDescription\" placeholder=\"Description\"></textarea>\n          </mat-form-field>\n          <mat-form-field>\n            <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"scriptExecutionActionDetails.arguments\" placeholder=\"Script Arguments (separated by spaces)\"></textarea>\n          </mat-form-field>\n          <mat-form-field>\n            <textarea rows=\"8\" cols=\"500\" matInput [(ngModel)]=\"scriptExecutionActionDetails.scriptCodeContent\" placeholder=\"Script Code Content\"></textarea>\n          </mat-form-field>\n          <mat-form-field>\n            <input matInput [(ngModel)]=\"scriptExecutionActionDetails.commandlineExecutionTimeoutSec\" placeholder=\"Script Timeout (sec)\" type=\"number\">\n          </mat-form-field>\n        </div>\n      </div>\n  <div *ngSwitchCase=\"ACTIONS.IMAGE_DIFF_VALIDATION_ACTION.type\" (pan)=\"pan($event)\">\n    <div class=\"row\">\n      <span class=\"form-text-align\">Image Diff Validation Action</span>\n      <button mat-mini-fab color=\"primary\" (click)=\"openActionInfoDialog()\" matTooltip=\"Show Info\" matTooltipPosition=\"left\" matTooltipShowDelay=\"500\">\n        <i class=\"fa fa-info\"></i>\n      </button>\n    </div>\n    <div class=\"new-action-form\">\n      <mat-form-field>\n        <input matInput [(ngModel)]=\"imageDiffActionDetails.diffScoreThreshold\" placeholder=\"Diff Score Threshold (0 - 1)\" type=\"number\"/>\n      </mat-form-field>\n\n      <div class=\"align-center\">\n        <button mat-raised-button (click)=\"takeScreenshot()\">Take Screenshot</button>\n      </div>\n      <div>\n        <div class=\"row align-center\">\n          <mat-button-toggle-group>\n            <mat-button-toggle (change)=\"imageDiffActionDetails.includeRegion = $event.source.checked\" class=\"margin-5\" value=\"include\">Include Regions</mat-button-toggle>\n            <mat-button-toggle (change)=\"imageDiffActionDetails.includeRegion = !$event.source.checked\" class=\"margin-5\" value=\"exclude\">Exclude Regions</mat-button-toggle>\n          </mat-button-toggle-group>\n        </div>\n\n        <hr />\n        <div class=\"row align-center\">\n          <button class=\"margin-5\" mat-raised-button (click)=\"removeLastSelectedRegion()\">\n            Remove Last Region\n          </button>\n          <button class=\"margin-5\" mat-raised-button (click)=\"clearRegionCanvas(getRegionCanvasCtx())\">\n            Clear\n          </button>\n        </div>\n        <div class=\"row align-center\">\n          <mat-radio-group (change)=\"selectRegionShape($event.value)\">\n            <mat-radio-button class=\"margin-5\" value=\"Rectangle\">Rectangle</mat-radio-button>\n            <mat-radio-button class=\"margin-5\" value=\"Circle\">Circle</mat-radio-button>\n          </mat-radio-group>\n        </div>\n        <div class=\"phone-canvas-widget align-center\">\n          <canvas #screenshot [width]=\"screenshotScaledWidth\" [height]=\"screenshotScaledHeight\">\n          </canvas>\n        </div>\n        <div class=\"phone-canvas-widget-2 align-center\" [style.margin-top.px]=\"(-1 * screenshotScaledHeight) - 5\">\n          <canvas #regionCanvas [width]=\"screenshotScaledWidth\" [height]=\"screenshotScaledHeight\">\n          </canvas>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.ML_IMAGE_VALIDATION_ACTION.type\">\n    <mat-form-field class=\"selector-css\">\n      <mat-select\n          placeholder=\"Icon Image\"\n          [(ngModel)]=\"mlImageValidationActionDetails.iconImageType\"\n          class=\"slot-selector\">\n        <mat-option\n            *ngFor=\"let c of ICON_IMAGE_TYPES\"\n            [value]=\"c.value\"\n            class='mat-option'>\n          <span><mat-icon matTooltip=\"Icon Image\" class=\"material-icons md-36 blue\">{{c.matIcon}}</mat-icon></span>\n          <span>{{ \"  \" + c.displayText }}</span>\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <div class='new-action-form'>\n      <mat-form-field>\n        <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"mlImageValidationActionDetails.stopType\">\n          <mat-option *ngFor=\"let sType of STOP_TYPES\" [value]=\"sType.value\">{{ sType.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.CONDITION_VALIDATION_ACTION.type\">\n    <div class='new-action-form'>\n      <query-builder [(ngModel)]='conditionValidationAction.query' [config]='config'>\n        <ng-container *queryButtonGroup=\"let ruleset; let addRule=addRule; let addRuleSet=addRuleSet; let removeRuleSet=removeRuleSet\">\n          <button type=\"button\" mat-icon-button color=\"primary\" (click)=\"addRule()\">\n            <mat-icon>add</mat-icon></button>\n          <button type=\"button\" mat-icon-button color=\"primary\" *ngIf=\"addRuleSet\" (click)=\"addRuleSet()\">\n            <mat-icon>add_circle_outline</mat-icon></button>\n          <button type=\"button\" mat-icon-button color=\"accent\" *ngIf=\"removeRuleSet\" (click)=\"removeRuleSet()\">\n            <mat-icon>remove_circle_outline</mat-icon></button>\n        </ng-container>\n        <ng-container *queryArrowIcon>\n          <mat-icon ngClass=\"mat-arrow-icon\">chevron_right</mat-icon>\n        </ng-container>\n        <ng-container *queryRemoveButton=\"let rule; let removeRule=removeRule\">\n          <button type=\"button\" mat-icon-button color=\"accent\" (click)=\"removeRule(rule)\">\n            <mat-icon>remove</mat-icon>\n          </button>\n        </ng-container>\n        <ng-container *querySwitchGroup=\"let ruleset; let onChange=onChange\">\n          <mat-radio-group *ngIf=\"ruleset\" [(ngModel)]=\"ruleset.condition\" (ngModelChange)=\"onChange($event)\">\n            <mat-radio-button class=\"padding-10\" value=\"and\">And</mat-radio-button>\n            <mat-radio-button class=\"padding-10\" value=\"or\">Or</mat-radio-button>\n          </mat-radio-group>\n        </ng-container>\n        <ng-container *queryEntity=\"let rule; let entities=entities; let onChange=onChange\">\n          <mat-form-field>\n            <mat-select [(ngModel)]=\"rule.entity\" (ngModelChange)=\"onChange($event, rule)\">\n              <mat-option *ngFor=\"let entity of entities\" [value]=\"entity.value\">\n              {{entity.name}}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryField=\"let rule; let fields=fields; let onChange=onChange; let getFields = getFields\">\n          <mat-form-field>\n            <mat-select [(ngModel)]=\"rule.field\" (ngModelChange)=\"onChange($event, rule)\">\n              <mat-option *ngFor=\"let field of getFields(rule.entity)\" [value]=\"field.value\">\n                {{ field.name }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryOperator=\"let rule; let operators=operators; let onChange=onChange\">\n          <mat-form-field class=\"width-90\">\n            <mat-select [(ngModel)]=\"rule.operator\" (ngModelChange)=\"onChange(rule)\">\n              <mat-option *ngFor=\"let value of operators\" [value]=\"value\">\n                {{ value }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryInput=\"let rule; type: 'boolean'; let onChange=onChange\">\n          <mat-checkbox [(ngModel)]=\"rule.value\" (ngModelChange)=\"onChange()\"></mat-checkbox>\n        </ng-container>\n        <ng-container *queryInput=\"let rule; let field=field; let options=options; type: 'category'; let onChange=onChange\">\n          <mat-form-field>\n            <mat-select [(ngModel)]=\"rule.value\" (ngModelChange)=\"onChange()\">\n              <mat-option *ngFor=\"let opt of options\" [value]=\"opt.value\">\n                {{ opt.name }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryInput=\"let rule; let options=options; type: 'multiselect'; let onChange=onChange\">\n          <mat-form-field class=\"width-300\">\n            <mat-select [(ngModel)]=\"rule.value\" multiple (ngModelChange)=\"onChange()\">\n              <mat-option *ngFor=\"let opt of options\" [value]=\"opt.value\">\n                {{ opt.name }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryInput=\"let rule; let field=field; type: 'number'; let onChange=onChange\">\n          <mat-form-field class=\"width-50\">\n            <input matInput [(ngModel)]=\"rule.value\" type=\"number\" (ngModelChange)=\"onChange()\">\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryInput=\"let rule; let field=field; type: 'string'; let onChange=onChange\">\n          <mat-form-field>\n            <input matInput [(ngModel)]=\"rule.value\" (ngModelChange)=\"onChange()\">\n          </mat-form-field>\n        </ng-container>\n        <ng-container *queryInput=\"let rule; let field=field; type: 'textarea'; let onChange=onChange\">\n          <mat-form-field>\n            <textarea matInput [(ngModel)]=\"rule.value\" (ngModelChange)=\"onChange()\">\n            </textarea>\n          </mat-form-field>\n        </ng-container>\n      </query-builder>\n      <mat-form-field>\n        <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"conditionValidationAction.stopType\">\n          <mat-option *ngFor=\"let sType of STOP_TYPES\" [value]=\"sType.value\">{{ sType.displayText }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.FETCH_SCREEN_CONTENT_ACTION.type\">\n    <fetch-content-form [(fetchActionDetails)]=\"fetchActionDetails\" [showButtons]=\"false\"></fetch-content-form>\n  </div>\n  <div *ngSwitchCase=\"ACTIONS.DOUBLE_TAP_POWER_BUTTON_ACTION.type\">\n  </div>\n  <div *ngIf=\"isValidationAction()\">\n    <validation-details [(validationActionDetails)]=\"validationRequestDetails\" [showButtons]=\"false\"></validation-details>\n  </div>\n  <div>\n    <button mat-raised-button class='save-action-btn' (click)=\"saveAction()\">Save Action</button>\n    <button mat-raised-button mat-dialog-close>Cancel</button>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/advanced_actions_dialog/script_action_info_dialog.ng.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/advanced_actions_dialog/script_action_info_dialog.ng.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n    <h2>Script Configuration Details</h2>\n    <table class='info-table'>\n        <thead>\n            <tr>\n                <th>Field Name</th>\n                <th>Description & Examples</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>Script Argument List</td>\n                <td>This field specifies arguments to run the Python script with. Arguments can be configured in two ways:\n                    1. List the arguments in order, for example: '1,2,3 Android Nuwa'. To use them in the script, reference them as follows:<br>\n                    <b>import sys<br>\n                    str = sys.argv[2] # this will give you 'Nuwa'<br>\n                    print str<br>\n                    </b>\n                    2. List the arguments with explicit names, for example: '--systemVersion=Oreo' and reference the name directly in the script as follows:<br>\n                    <b>import argparse<br>\n                    parser = argparse.ArgumentParser(description='manual to this script')<br>\n                    parser.add_argument('--systemVersion', type=str, default = None)<br>\n                    args = parser.parse_args()<br>\n                    print args.systemVersion<br>\n                    </b>\n                </td>\n            </tr>\n            <tr>\n                <td>Script Code Content</td>\n                <td>This field contains the code content of the script. Note that you should import the 'android' library first, as this provides APIs to interact with the connected device.\n                    Refer to this <a href=\"http://www.mithril.com.au/android/doc/\">link</a> for more information on the available APIs.\n                    Please note that the script should conform to Python2 syntax. The following is an example Python script to trigger a notification on the screen:<br>\n                    <b>import android<br>\n                    droid = android.Android()<br>\n                    droid.makeToast('Hello, Android!')<br>\n                    </b>\n                </td>\n            </tr>\n        </tbody>\n    </table>  \n    <div class=\"foot-note\" >*More details can be found in go/uicd</div>\n    <button mat-raised-button color=\"primary\" (click)=\"onOkClick()\">OK</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/advanced_actions_dialog/snippet_action_info_dialog.ng.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/advanced_actions_dialog/snippet_action_info_dialog.ng.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n    <h2>On-Device Snippet Details</h2>\n    <table class='info-table'>\n        <thead>\n            <tr>\n                <th>Field Name</th>\n                <th>Description</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>Package Name</td>\n                <td>This field specifies the snippet package in the APK that has been installed onto the connected device.\n                    Once selected, Nuwa will fetch all the methods under that package and list them in the Method Name box.\n                    Note: If the package cannot be found, the method list will be empty.\n                </td>\n            </tr>\n            <tr>\n                <td>Method Name</td>\n                <td>Each method name entry contains the method name, the arguments list it requires, and the type of the return value.</td>\n            </tr>\n            <tr>\n                <td>Arguments</td>\n                <td>You should enter the corresponding arguments that the selected snippet call requires here.\n                    The arguments should be separated by ',' and every one of them is kept in the correct format of the variable type.\n                    For example, the input of method <b>wifiConnectSimple(String, String)</b> can be <b>GoogleGuest, null</b>.\n                </td>\n            </tr>\n            <tr>\n                <td>Timeout Limit</td>\n                <td>This field is to set how long to wait (in milliseconds) for the snippet to complete and return.\n                </td>\n            </tr>\n            <tr>\n                <td>Snippet Service Only (No validation)</td>\n                <td>This field is to set whether you want to validate the return value or not. If the snippet you select returns null, this box will be automatically selected.\n                    Note that if you uncheck this box for snippets that do not return a value, it will cause the action to fail.\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"foot-note\" >*More details can be found in go/uicd</div>\n    <button mat-raised-button color=\"primary\" (click)=\"onOkClick()\">OK</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.ng.html":
/*!*******************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.ng.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"main-container\" fxLayout='column' fxFill>\n  <div class=\"device-prepare-overlay\" *ngIf=\"devicePrepareLoading\">\n    <mat-progress-bar mode=\"indeterminate\" class=\"device-prepare-overlay-progressbar\">\n    </mat-progress-bar>\n  </div>\n  <div fxFlex=\"64px\">\n    <mat-toolbar color=\"primary\" class='main-toolbar'>\n      <button mat-icon-button (click)='openDevicePickerDialog()' class='device-picker-btn'>\n        <mat-icon matTooltip=\"Reinitialize devices\" class=\"material-icons\">menu</mat-icon>\n      </button>\n      <span>UIConductor</span>\n      <span class=\"toolbar-spacer\"></span>\n      <button mat-icon-button class=\"toolbar-icon\" (click)='softRestart()'>\n        <mat-icon matTooltip=\"Restart UIConductor\" class=\"material-icons\">refresh</mat-icon>\n      </button>\n      <button mat-icon-button class=\"toolbar-icon\" (click)='versionInfo()'>\n        <mat-icon matTooltip=\"Version Info\" class=\"material-icons\">info</mat-icon>\n      </button>\n    </mat-toolbar>\n  </div>\n  <div class=\"split-body ex-percent\" fxFlex>\n    <as-split unit=\"percent\">\n      <as-split-area size=\"25\">\n        <as-split direction=\"vertical\" restrictMove=\"true\">\n          <as-split-area size=\"75\">\n            <screen-cast></screen-cast>\n          </as-split-area>\n          <as-split-area size=\"25\">\n            <app-device-manager></app-device-manager>\n          </as-split-area>\n        </as-split>\n      </as-split-area>\n      <as-split-area size=\"55\">\n        <as-split direction=\"vertical\" restrictMove=\"true\">\n          <as-split-area size=\"70\">\n            <workflow-editor></workflow-editor>\n          </as-split-area>\n          <as-split-area size=\"30\">\n            <mat-tab-group (selectedTabChange)=\"tabChange($event)\">\n              <mat-tab label=\"Log\">\n                <log-panel></log-panel>\n              </mat-tab>\n              <mat-tab label=\"UI Viewer\">\n                <ui-tree-viewer *ngIf=\"showUiTree\"></ui-tree-viewer>\n              </mat-tab>\n            </mat-tab-group>\n          </as-split-area>\n        </as-split>\n      </as-split-area>\n      <as-split-area size=\"20\">\n        <test-explorer></test-explorer>\n      </as-split-area>\n    </as-split>\n  </div>\n  <div class=\"footer-div\" fxFlex=\"25px\">\n    <span class=\"footer-content\">UIConductor @Google</span>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/device_manager/device_manager.ng.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/device_manager/device_manager.ng.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<mat-tab-group>\n  <mat-tab label=\"Devices\">\n    <mat-form-field>\n      <mat-select placeholder=\"Play Mode:\" [(value)]=\"selectedPlayMode\" (selectionChange)=\"changePlayMode($event)\">\n        <mat-option *ngFor=\"let playMode of playModes\" [value]=\"playMode.name\">\n          {{playMode.display}}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <div class=\"currentDevice\" *ngIf=\"(currentDevice | async)\">\n      <b> Current Device: </b>{{(currentDevice | async).deviceId}}\n    </div>\n    <div>\n      <table mat-table [dataSource]=\"dataSource\">\n        <ng-container matColumnDef=\"position\">\n          <th mat-header-cell *matHeaderCellDef> Slot </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.position}} </td>\n        </ng-container>\n        <ng-container matColumnDef=\"device_serial\">\n          <th mat-header-cell *matHeaderCellDef> Device Serial </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.deviceSerial}} </td>\n        </ng-container>\n        <ng-container matColumnDef=\"status\">\n          <th mat-header-cell *matHeaderCellDef> Status </th>\n          <td mat-cell *matCellDef=\"let element\">\n            <div [ngSwitch]=\"element.status\">\n              <div *ngSwitchCase=\"0\">\n                No available device on this slot.\n              </div>\n\n              <div *ngSwitchCase=\"1\">\n                <button mat-raised-button (click)=\"initDevice(element.deviceSerial)\">\n                  Ready\n                </button>\n              </div>\n\n              <div *ngSwitchCase=\"2\">\n                <button mat-raised-button (click)=\"initDevice(element.deviceSerial)\">\n                  Connected\n                </button>\n              </div>\n\n              <div *ngSwitchCase=\"3\">\n                Connecting...\n              </div>\n\n              <div *ngSwitchDefault>\n                UNKNOWN\n              </div>\n            </div>\n          </td>\n        </ng-container>\n        <ng-container matColumnDef=\"selected\">\n          <th mat-header-cell *matHeaderCellDef> Selected </th>\n          <td mat-cell *matCellDef=\"let element\">\n            <div class=\"star-icon\" *ngIf=\"element.deviceSerial === (currentDevice | async).deviceId\">\n              <i class=\"material-icons\">star_rate</i>\n            </div>\n          </td>\n        </ng-container>\n        <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n      </table>\n    </div>\n  </mat-tab>\n  <mat-tab label=\"TV Remote\">\n    <tv-remote></tv-remote>\n  </mat-tab>\n</mat-tab-group>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/device_manager/tv_remote.ng.html":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/device_manager/tv_remote.ng.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h3>TV Remote Control Actions:</h3>\n<table>\n  <tr>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_DPAD_LEFT)\">&lt;</button></td>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_DPAD_RIGHT)\">&gt;</button></td>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_DPAD_UP)\">^</button></td>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_DPAD_DOWN)\">v</button></td>\n  </tr>\n  <tr>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_BACK)\">Back</button></td>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_HOME)\">Home</button></td>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_DPAD_CENTER)\">Center</button></td>\n    <td><button mat-raised-button (click)=\"sendKeyEvent(keyCodes.KEYCODE_MEDIA_PLAY_PAUSE)\">Play/Pause</button></td>\n  </tr>\n</table>\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/log_panel/log_panel.ng.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/log_panel/log_panel.ng.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"log-panel\" fxFlexFill>\n  Backend log:\n  <ul>\n    <li *ngFor=\"let item of showingLogs | async\" class='log-content-item'>{{item}}</li>\n  </ul>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/popup_dialogs/choose_device_dialog.ng.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/popup_dialogs/choose_device_dialog.ng.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h1 mat-dialog-title>Choose Your Device:</h1>\n\n<mat-dialog-content>\n  <div fxLayout=\"row wrap\" fxLayoutGap=\"20px\">\n    <div *ngFor=\"let device of devices\" fxFlex=\"30\">\n\n      <mat-card class=\"device-card\">\n        <mat-card-title class='device-card-title'>{{device.serial}}</mat-card-title>\n        <mat-card-content>\n          <ul>\n            <li>{{device.product}}</li>\n            <li>{{device.model}}</li>\n            <li>{{device.device}}</li>\n          </ul>\n\n          <mat-form-field>\n            <mat-select placeholder=\"Device Slot\" [(ngModel)]=\"device.slot\" (ngModelChange)=\"updateAvailableSlot($event)\" class=\"slot-selector\">\n              <mat-option [value]=\"-1\" class='mat-option'></mat-option>\n              <mat-option *ngFor=\"let option of slotOptions\" [value]=\"option.index\" [disabled]=\"option.disabled\" class='mat-option'>\n                Slot {{ option.index }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n        </mat-card-content>\n      </mat-card>\n\n\n    </div>\n    <!-- No devices found card -->\n    <mat-card *ngIf=\"devices?.length == 0\" class=\"error-card\">\n      <mat-card-title>\n        No device detected. Please connect a device to the host and run adb devices to check.\n      </mat-card-title>\n    </mat-card>\n  </div>\n</mat-dialog-content>\n\n<mat-dialog-actions >\n  <button mat-raised-button (click)=\"confirmSelection()\" color=\"primary\" [mat-dialog-close]=\"true\" cdkFocusInitial class=\"init-btn\">\n    Initialize\n  </button>\n  <button mat-raised-button mat-dialog-close>\n    Cancel\n  </button>\n</mat-dialog-actions>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/popup_dialogs/global_var_setting_dialog.ng.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/popup_dialogs/global_var_setting_dialog.ng.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h3 mat-dialog-title>Global variable setting dialog</h3>\n\n<div mat-dialog-content>\n  <div class=\"global-var-info\">\n    <span>Set up the Global variable. One for each line Example:</span>\n    <span class='variable-example-text'>$uicd_var1=ab,$uicd_foo=bar</span>\n  </div>\n\n  <mat-form-field class=\"global-var-input\">\n    <textarea matInput placeholder=\"Global Variable Settings\" [(ngModel)]=\"globalVariableStr\" rows=\"10\"\n      cols=\"100\"></textarea>\n  </mat-form-field>\n\n  <div>\n    <button mat-raised-button mat-dialog-close class='save-btn' (click)=\"setGlobalVariable()\">Save</button>\n    <button mat-raised-button mat-dialog-close>Cancel</button>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/popup_dialogs/history_dialog.ng.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/popup_dialogs/history_dialog.ng.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h3 mat-dialog-title>Test Execution History</h3>\n<div mat-dialog-content>\n  <table mat-table [dataSource]=\"dataSource\" class=\"testTable\">\n    <ng-container matColumnDef=\"details\">\n      <th mat-header-cell *matHeaderCellDef>Details</th>\n      <td mat-cell *matCellDef=\"let element\">\n        <button mat-raised-button color=\"primary\" (click)=\"showDetails(element.testDetails)\">Details</button>\n      </td>\n    </ng-container>\n    <ng-container matColumnDef=\"uuid\">\n      <th mat-header-cell *matHeaderCellDef>UUID</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.uuid}} </td>\n    </ng-container>\n    <ng-container matColumnDef=\"testUuid\">\n      <th mat-header-cell *matHeaderCellDef>Test UUID</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.testcaseUuid}} </td>\n    </ng-container>\n    <ng-container matColumnDef=\"name\">\n      <th mat-header-cell *matHeaderCellDef>Name</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.testMsg}} </td>\n    </ng-container>\n    <ng-container matColumnDef=\"result\">\n      <th mat-header-cell *matHeaderCellDef>Result</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.testResult}} </td>\n    </ng-container>\n    <ng-container matColumnDef=\"runDate\">\n      <th mat-header-cell *matHeaderCellDef>Run Date</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.createdAt.epochSecond * 1000 | date:'yyyy-MM-dd HH:mm:ss'}} </td>\n    </ng-container>\n    <ng-container matColumnDef=\"author\">\n      <th mat-header-cell *matHeaderCellDef>Author</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.createdBy}} </td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n  </table>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/popup_dialogs/replay_details_dialog.ng.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/popup_dialogs/replay_details_dialog.ng.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h3 mat-dialog-title> Test Result: <span [class]=\"testStatusColor\">{{data.playStatus}}</span></h3>\n<div mat-dialog-content fxLayout=\"column\">\n  <div #jsTree> </div>\n  <mat-grid-list cols=\"3\" rowHeight=\"300px\">\n    <mat-grid-tile *ngFor=\"let tile of outputList\">\n      <img height = \"300px\" [src]=\"tile.path\" />\n    </mat-grid-tile>\n  </mat-grid-list>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/screen_cast/screen_cast.ng.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/screen_cast/screen_cast.ng.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n  <div class=\"phone-sidenav\">\n    <div fxLayout='column'>\n      <div style=\"padding-left:10px;\">\n        <div>\n          <div fxLayout='row' class=\"recorder-main\" fxFlexFill>\n            <div fxFlex=\"60px\" fxLayoutGap=\"15px\" fxFlexFill fxLayout='column' class='btn-container'>\n              <button mat-mini-fab color=\"primary\" (click)=\"quickSwipe(swipeDirection.LEFT)\" matTooltip=\"Swipe Left\"\n                matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-arrow-left\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"quickSwipe(swipeDirection.RIGHT)\" matTooltip=\"Swipe Right\"\n                matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-arrow-right\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"quickSwipe(swipeDirection.UP)\" matTooltip=\"Swipe Up\"\n                matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-arrow-up\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"quickSwipe(swipeDirection.DOWN)\" matTooltip=\"Swipe Down\"\n                matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-arrow-down\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"rotateScreen(rotateDirection.PORTRAIT)\"\n                matTooltip=\"Portrait Mode\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-mobile fa-2x\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"rotateScreen(rotateDirection.LANDSCAPE)\"\n                matTooltip=\"Landscape Mode\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-mobile fa-2x fa-rotate-90\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"power()\" matTooltip=\"Power\" matTooltipPosition=\"right\"\n                matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-power-off fa-lg\"></i>\n              </button>\n\n              <button mat-mini-fab color=\"primary\" (click)=\"volumeUp()\" matTooltip=\"Volume Up\"\n                matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-volume-up fa-lg\"></i>\n              </button>\n\n              <button mat-mini-fab color=\"primary\" (click)=\"volumeDown()\" matTooltip=\"Volume Down\"\n                matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-volume-down fa-lg\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"back()\" matTooltip=\"Back\" matTooltipPosition=\"right\"\n                matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-chevron-left\"></i>\n              </button>\n\n              <button mat-mini-fab color=\"primary\" (click)=\"home()\" matTooltip=\"Home\" matTooltipPosition=\"right\"\n                matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-home fa-lg\"></i>\n              </button>\n\n              <button mat-mini-fab color=\"primary\" (click)=\"overview()\" matTooltip=\"Overview\" matTooltipPosition=\"right\"\n                matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-square\"></i>\n              </button>\n            </div>\n            <div fxFlex=\"1\" class=\"canvas-wrapper\" fxLayoutGap=\"10px\">\n              <div class=\"screen-widget-root\" (tap)=\"tap($event.srcEvent)\" (pan)=\"pan($event)\" (pressup)=\"pressup($event)\"\n                (press)=\"press($event.srcEvent)\" tabindex=\"1\">\n                <div class=\"phone-wrapper\">\n                  <canvas id=\"canvas-screen\" class=\"phone-canvas-widget\" #phoneScreen tabindex=\"1\" [width]=\"canvasWidth\"\n                    [height]=\"canvasHeight\">\n                  </canvas>\n                </div>\n                <!-- This canvas will handle drawing the hovered tree nodes -->\n                <div class=\"phone-overlay-wrapper\">\n                  <canvas id=\"canvas-overlay-hovered\" class=\"phone-canvas-widget2\" #overlayHovered tabindex=\"1\"\n                    [width]=\"canvasWidth\" [height]=\"canvasHeight\">\n                  </canvas>\n                </div>\n                <!-- This canvas will handle the selected tree nodes -->\n                <div class=\"phone-overlay-wrapper\">\n                  <canvas id=\"canvas-overlay-selected\" class=\"phone-canvas-widget2\" #overlaySelected tabindex=\"1\"\n                    [width]=\"canvasWidth\" [height]=\"canvasHeight\">\n                  </canvas>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/screen_validation_flow/fetch_content_form.ng.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/screen_validation_flow/fetch_content_form.ng.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"form-container\">\n  <h3>Fetch content from screen</h3>\n  <div class=\"selected-content\">Selected content: <span class=\"selected-content-span\">{{currentSelectedText}}</span>\n  </div>\n  <div>\n    <b>Selected By:</b>\n  </div>\n  <mat-radio-group placeholder=\"\" [ngModel]=\"fetchActionDetails.strategy\" (ngModelChange)=\"fetchActionDetails.strategy=$event;emitUpdate()\" name=\"selectedStrategy\">\n    <mat-radio-button *ngFor=\"let c of STRATEGY_TYPES\" [value]=\"c.value\" (change)=\"selectorChanged($event)\">\n      {{ c.displayText }}\n    </mat-radio-button>\n  </mat-radio-group>\n  <mat-form-field>\n    <input matInput [ngModel]=\"fetchActionDetails.selector\" (ngModelChange)=\"fetchActionDetails.selector=$event;emitUpdate();\" placeholder=\"Selector Value\" required>\n  </mat-form-field>\n\n  <div *ngIf=\"showAttributeInput()\">\n    <mat-form-field>\n      <input matInput [ngModel]=\"fetchActionDetails.attributeType\" (ngModelChange)=\"fetchActionDetails.attributeType=$event;emitUpdate();\" placeholder=\"XML Attribute Name\">\n    </mat-form-field>\n  </div>\n  <b>Selected content: {{currentSelectedText}}</b>\n  <mat-form-field>\n    <input matInput [ngModel]=\"fetchActionDetails.globalVariableName\" (ngModelChange)=\"fetchActionDetails.globalVariableName=$event;emitUpdate();\"\n      placeholder=\"Variable Name (Must start with '$uicd_')\" required>\n  </mat-form-field>\n  <div *ngIf=\"showButtons\">\n    <button mat-raised-button color=\"primary\" name=\"previousPageBtn\" (click)='previousPageClicked()'>Back</button>\n    <button mat-raised-button color=\"primary\" name=\"closePopupBtn\" (click)='closePopup()'>Add Action</button>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/screen_validation_flow/screen_validation_flow.ng.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/screen_validation_flow/screen_validation_flow.ng.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<mat-horizontal-stepper #stepper class=\"validation-stepper\">\n  <mat-step>\n    <form>\n      <ng-template matStepLabel>Select Action Type</ng-template>\n      <div class='validation-flow-step'>\n        <div>\n          <h3>Please select action type:</h3>\n        </div>\n        <div>\n          <mat-radio-group placeholder=\"\" [(ngModel)]=\"selectedValidationGroup\" name=\"validationGroup\">\n            <mat-radio-button class='validation-group-radio' *ngFor=\"let c of VALIDATION_GROUPS\" [value]=\"c.value\">\n              {{ c.displayText }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </div>\n        <div *ngIf=\"showValidationActions()\">\n          <div>\n            <h3>Please select validation subtype:</h3>\n          </div>\n          <mat-radio-group placeholder=\"\" [(ngModel)]=\"selectedValidationAction\" name=\"validationAction\">\n            <mat-radio-button *ngFor=\"let c of VALIDATION_ACTIONS\" [value]=\"c.value\">\n              {{ c.displayText }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </div>\n        <div *ngIf=\"showSpecialActions()\">\n          <div>\n            <h3>Please select special click subtype:</h3>\n          </div>\n          <mat-radio-group placeholder=\"\" [(ngModel)]=\"selectedSpecialClick\" name=\"specialClickType\">\n            <mat-radio-button *ngFor=\"let c of SPECIAL_CLICK_ACTIONS\" [value]=\"c.value\">\n              {{ c.displayText }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </div>\n        <div *ngIf=\"showDirection()\">\n          <div>\n            <h3>Please select scroll direction:</h3>\n          </div>\n          <mat-radio-group placeholder=\"\" [(ngModel)]=\"selectedDirection\" name=\"directionModel\">\n            <mat-radio-button *ngFor=\"let c of DIRECTIONS\" [value]=\"c.value\">\n              {{ c.displayText }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </div>\n      </div>\n      <div>\n        <button mat-raised-button color=\"primary\" (click)=\"nextPage(stepper)\">{{getNextButtonText()}}</button>\n      </div>\n    </form>\n  </mat-step>\n  <mat-step>\n    <form class=\"step-two-form\">\n      <ng-template matStepLabel>Fill Action Details</ng-template>\n      <fetch-content-form *ngIf=\"showFetchContentAction()\" [selectedBounds]=\"selectedBounds\"\n                          (actionAdded)='closePopup()' (previousPage)='previousPage(stepper)'></fetch-content-form>\n\n      <validation-details *ngIf=\"showValidationActions()\" [selectedBounds]=\"selectedBounds\"\n                          [scrollDirectionType]=\"selectedDirection\" [selectedActionType]='selectedActionType' (actionAdded)='closePopup()'\n                          (previousPage)='previousPage(stepper)'>\n      </validation-details>\n    </form>\n  </mat-step>\n</mat-horizontal-stepper>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/screen_validation_flow/validation_details.ng.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/screen_validation_flow/validation_details.ng.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n  <div class=\"row\">Validation Step</div>\n  <div class=\"row\">\n    <mat-form-field class=\"selector-css\">\n      <mat-select placeholder=\"Selector Type\" [(ngModel)]=\"validationActionDetails.elementSelectorType\"\n                  (ngModelChange)=\"updateContentData(); emitUpdate();\" class=\"slot-selector\">\n        <mat-option *ngFor=\"let c of ELEMENT_SELECTOR_TYPES\" [value]=\"c.value\" class='mat-option'>\n          {{ c.displayText }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  </div>\n  <div class=\"row\">\n    <mat-form-field>\n      <input class=\"input-highlight\" matInput placeholder=\"Please input\" [(ngModel)]=\"validationActionDetails.contentData\"\n             (ngModelChange)=\"emitUpdate()\" name=\"contentDataInput\">\n    </mat-form-field>\n  </div>\n  <div class=\"row\">Advanced</div>\n  <div>\n    <mat-checkbox placeholder=\"Is Match Node Context\" [(ngModel)]=\"matchNodeContext\" (ngModelChange)=\"emitUpdate()\">Match Node Context</mat-checkbox>\n  </div>\n  <div *ngIf=\"!matchNodeContext\">\n    <mat-form-field class=\"selector-css\">\n      <mat-select placeholder=\"Match Type\" [(ngModel)]=\"validationActionDetails.contentMatchType\" (ngModelChange)=\"emitUpdate()\" class=\"slot-selector\">\n        <mat-option *ngFor=\"let c of CONTENT_MATCH_TYPES\" [value]=\"c.value\" class='mat-option'>\n          {{ c.displayText }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <mat-form-field>\n      <mat-select placeholder=\"Search Range\" [(ngModel)]=\"validationActionDetails.screenContentSearchType\" (ngModelChange)=\"emitUpdate()\">\n        <mat-option *ngFor=\"let c of SCREEN_CONTENT_SEARCH_TYPES\" [value]=\"c.value\" class='mat-option'>\n          {{ c.displayText }}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  </div>\n  <div class=\"row\">\n    <mat-form-field>\n      <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"validationActionDetails.stopType\" (ngModelChange)=\"emitUpdate()\">\n        <mat-option *ngFor=\"let c of STOP_TYPES\" [value]=\"c.value\">{{ c.displayText }}</mat-option>\n      </mat-select>\n    </mat-form-field>\n    <button mat-mini-fab color=\"primary\" (click)=\"openValidationDetailsInfoDlg()\" matTooltip=\"Show Info\"\n            matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n      <i class=\"fa fa-info\"></i>\n    </button>\n  </div>\n  <div class=\"row\" *ngIf=\"isConditionalClick()\">\n    <b>Note: Validation failure for Conditional Click does not fail the test, it only bypasses the click operation.</b>\n  </div>\n  <div class=\"row\" *ngIf=\"isLoopValidation()\">Timeout (in seconds):\n    <mat-form-field>\n      <textarea rows=\"1\" cols=\"10\" matInput [(ngModel)]=\"validationActionDetails.timeout\" (ngModelChange)=\"emitUpdate()\"></textarea>\n    </mat-form-field>\n    <mat-form-field>\n      <mat-select placeholder=\"Wait Until\" [(ngModel)]=\"selectedWaitUntilType\" (ngModelChange)=\"emitUpdate()\">\n        <mat-option *ngFor=\"let c of WAIT_UNTIL_TYPES\" [value]=\"c.value\">{{ c.displayText }}</mat-option>\n      </mat-select>\n    </mat-form-field>\n  </div>\n\n  <div class=\"row\" *ngIf=\"isScrollValidation()\">Max Scroll Number:\n    <mat-form-field>\n      <input class=\"input-highlight\" matInput placeholder=\"Max Scroll Number\" [(ngModel)]=\"validationActionDetails.scrollMaxNumber\"\n             (ngModelChange)=\"emitUpdate()\">\n    </mat-form-field>\n  </div>\n<div *ngIf=\"showButtons\">\n  <button mat-raised-button color=\"primary\" name=\"previousPage\" (click)='previousPageClicked()'>Back</button>\n  <button mat-raised-button color=\"primary\" name=\"closePopup\" (click)='closePopup()'>Add Action</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/screen_validation_flow/validation_info.ng.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/screen_validation_flow/validation_info.ng.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n    <h2>Validation Option Details</h2>\n    <h3>Match Node Context</h3>\n    <table class='info-table'>\n        <thead>\n          <tr>\n              <th>Type</th>\n              <th>Description</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n              <td>True</td>\n              <td>Match Context(UI hierarchy based match,\n                search the element not only by the text, but also by the element around it).\n                Useful when doing the condition click.\n              </td>\n          </tr>\n          <tr>\n              <td>False</td>\n              <td>Directly match the target text.</td>\n          </tr>\n        </tbody>\n      </table>\n      <h3>Search Range</h3>\n      <table class='info-table'>\n        <thead>\n          <tr>\n              <th>Type</th>\n              <th>Description</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n              <td>Strict</td>\n              <td>Search for text within a 100px radius on the screen (Physical device resolution).</td>\n          </tr>\n          <tr>\n              <td>Around</td>\n            <td><b>Default value</b>. Search for text within a 300px radius on the screen (Physical device resolution).</td>\n          </tr>\n          <tr>\n              <td>Full Screen</td>\n              <td>Search for text on the entire screen. Note: Only use this if the text is unique enough to only appear once on the screen.</td>\n          </tr>\n        </tbody>\n      </table>\n\n      <h3>Stop Type</h3>\n      <table class='info-table'>\n          <thead>\n            <tr>\n                <th>Type</th>\n                <th>Description</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n                <td>Fail Test If Validation False</td>\n                <td>Stop and fail the test if the validation is false.</td>\n            </tr>\n            <tr>\n                <td>Fail Test If Validation True</td>\n              <td>Stop and fail the test if the validation is true.</td>\n            </tr>\n            <tr>\n                <td>Stop Current Compound If False</td>\n                <td>Break the current compound action if the validation is false but continue test sequence. Note: This validation does not fail the test.</td>\n            </tr>\n            <tr>\n                <td>Stop Current Compound If True</td>\n                <td>Break the current compound action if the validation is true but continue test sequence. Note: This validation does not fail the test.</td>\n            </tr>\n          </tbody>\n        </table>\n\n      <div class=\"foot-note\" >*More details on uicd userguide</div>\n      <button mat-raised-button color=\"primary\" (click)=\"onOkClick()\">OK</button>\n  </div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/test_explorer/action_edit_dialog.ng.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/test_explorer/action_edit_dialog.ng.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h1 mat-dialog-title> Action Details </h1>\n<div mat-dialog-content fxLayout=\"column\">\n  <h5 class=\"createdByLabel\" *ngIf=\"currentUser !== actionData.createdBy\">\n    Created by: <span *ngIf=\"!actionData.createdBy\">No Owner</span>\n    <span *ngIf=\"actionData.createdBy\">{{actionData.createdBy}}</span>, Editing is restricted!\n  </h5>\n  <mat-form-field>\n        <input matInput placeholder=\"Action Id\" [(ngModel)]=\"actionData.actionId\" readonly>\n  </mat-form-field>\n\n  <mat-form-field>\n    <input matInput placeholder=\"Name\" [(ngModel)]=\"actionData.name\" required [disabled]=\"currentUser !== actionData.createdBy\">\n    <mat-error *ngIf=\"!actionData.name\">You must input a name.</mat-error>\n  </mat-form-field>\n\n  <mat-checkbox *ngIf=\"isMultiPlayMode() && isCompoundAction()\" placeholder=\"Force device index on all children actions\" [(ngModel)]=\"actionData.forceDeviceOnChildren\">Force device index on all children actions</mat-checkbox>\n\n  <mat-form-field *ngIf=\"isMultiPlayMode()\">\n    <input matInput placeholder=\"Device index\" type=\"number\" min=\"0\" [(ngModel)]=\"actionData.deviceIndex\" [disabled]=\"currentUser !== actionData.createdBy\">\n  </mat-form-field>\n\n  <mat-form-field *ngIf=\"!isMLImageValidation()\">\n    <input matInput placeholder=\"Delay After (ms)\" type=\"number\" [(ngModel)]=\"actionData.delayAfterActionMs\" [disabled]=\"currentUser !== actionData.createdBy\">\n  </mat-form-field>\n\n  <mat-form-field *ngIf=\"isMLImageValidation()\">\n    <input matInput placeholder=\"Icon Image\" [(ngModel)]=\"validationData.iconImageType\" [disabled]=\"!isMLImageValidation()\">\n  </mat-form-field>\n\n  <mat-form-field *ngIf=\"isCompoundAction()\">\n    <input matInput placeholder=\"Repeat Time\" type=\"number\" [(ngModel)]=\"actionData.repeatTime\" [disabled]=\"!isCompoundAction()\">\n  </mat-form-field>\n\n  <mat-form-field>\n    <input matInput placeholder=\"Action Type\" [(ngModel)]=\"actionData.actionType\" [disabled]=\"true\">\n  </mat-form-field>\n\n  <mat-checkbox *ngIf=\"isClickAction()\" placeholder=\"Is Raw xy\" [disabled]=\"true\" [(ngModel)]=\"actionData.isRawXY\">is raw XY</mat-checkbox>\n\n  <mat-form-field *ngIf=\"!isMLImageValidation()\">\n    <textarea matInput placeholder=\"Description\" [(ngModel)]=\"actionData.actionDescription\" [disabled]=\"currentUser !== actionData.createdBy\"></textarea>\n  </mat-form-field>\n\n  <mat-form-field *ngIf=\"data.isSaveWorkflow || isNewWorkflow || data.isMoveAction\">\n    <mat-select placeholder=\"Folder\" [(ngModel)]=\"saveToFolderId\">\n      <mat-option *ngFor=\"let folder of folderList\" [value]=\"folder.id\">{{ folder.value }}</mat-option>\n    </mat-select>\n  </mat-form-field>\n\n  <mat-checkbox [(ngModel)]=\"actionData.runAlways\" [disabled]=\"currentUser !== actionData.createdBy\">Run Always (run current step even if previous step failed)</mat-checkbox>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"saveAction()\">Save</button>\n  <button mat-raised-button (click)=\"cancelDialog()\">Cancel</button>\n  <button mat-raised-button (click)=\"deleteAction()\">Delete</button>\n  <button mat-raised-button (click)=\"playAction()\">Play</button>\n  <button mat-raised-button *ngIf=\"showEditDetails\" (click)=\"editAction()\">Edit Details</button>\n  <button mat-raised-button (click)=\"playWorkflowFromCurrentAction()\">\n      Play Workflow From Here</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/test_explorer/import_dialog.ng.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/test_explorer/import_dialog.ng.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div mat-dialog-content fxLayout=\"column\">\n  <div fxLayout=\"column\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n      <mat-form-field class=\"inputField\">\n        <input matInput placeholder=\"Import by UUID\" [(ngModel)]=\"uuidImportText\">\n      </mat-form-field>\n    </div>\n  </div>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"importTestCase()\">Import</button>\n  <button mat-raised-button mat-dialog-close>Close</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/test_explorer/import_project_dialog.ng.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/test_explorer/import_project_dialog.ng.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div mat-dialog-content fxLayout=\"column\">\n  <div fxLayout=\"column\">\n    <mat-form-field>\n      <mat-select placeholder=\"Select an import type\" [(ngModel)]=\"selectedImportType\">\n        <mat-option *ngFor=\"let importType of importTypes\" [value]=\"importType\">\n          {{importType}}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <div [ngSwitch]=\"selectedImportType\">\n      <div *ngSwitchCase=\"IMPORT_USER\">\n        <mat-form-field class=\"inputField\">\n          <input matInput placeholder=\"Import by Username\" [(ngModel)]=\"usernameImportText\" (keyup.enter)=\"fetchProjectListByUsername()\">\n          <mat-hint align=\"end\">Click \"Fetch Projects\" button after input username</mat-hint>\n        </mat-form-field>\n        <mat-form-field>\n          <mat-select placeholder=\"Select a project you want to import\" [(ngModel)]=\"selectedProject\" (click)=\"fetchProjectListByUsername()\">\n          <mat-option *ngFor=\"let projectRecord of projectList\" [value]=\"projectRecord\">{{projectRecord.projectName}}</mat-option>\n          </mat-select>\n        </mat-form-field>\n      </div>\n      <div *ngSwitchCase=\"IMPORT_ZIP\">\n        <p>{{importedFile?.name}}</p>\n      </div>\n    </div>\n\n    <mat-form-field >\n      <input matInput placeholder=\"Input new project name for the imported project\" [(ngModel)]=\"targetProjectName\">\n      <mat-hint align=\"end\">Click \"Import\" button after input new project name</mat-hint>\n    </mat-form-field>\n  </div>\n</div>\n<div mat-dialog-actions>\n  <div [ngSwitch]=\"selectedImportType\">\n    <div *ngSwitchCase=\"IMPORT_USER\">\n      <button mat-raised-button (click)=\"fetchProjectListByUsername()\" [disabled]=\"usernameImportText === ''\">Fetch Projects</button>\n    </div>\n    <div *ngSwitchCase=\"IMPORT_ZIP\">\n      <button mat-raised-button (click)=\"importZip.click()\">Select a file</button>\n      <input type=\"file\" class=\"hiddenInput\" accept=\".zip\" (change)=\"importFileSelected($event)\" #importZip />\n    </div>\n  </div>\n  <button mat-raised-button (click)=\"importProject()\" [disabled]=\"targetProjectName === ''\">Import</button>\n  <button mat-raised-button mat-dialog-close>Close</button>\n</div>\n<div class=\"waitingOverlay\" *ngIf=\"showOverlay\">\n  <mat-progress-bar mode=\"indeterminate\">\n  </mat-progress-bar>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/test_explorer/new_project_dialog.ng.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/test_explorer/new_project_dialog.ng.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h1 mat-dialog-title> New Project </h1>\n<div mat-dialog-content fxLayout=\"column\">\n  <mat-form-field>\n    <input matInput placeholder=\"Name\" [(ngModel)]='projectName' required>\n    <mat-error *ngIf=\"!projectName\">You must input a name.</mat-error>\n  </mat-form-field>\n</div>\n<div class=\"error-message\">{{result}}</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"saveNewProject()\">Save</button>\n  <button mat-raised-button (click)=\"dismissDialog()\">Cancel</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/test_explorer/test_explorer.ng.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/test_explorer/test_explorer.ng.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"save-main-div\" fxFlexFill fxLayout='column'>\n  <div class=\"test-case-header\" fxLayout='column'>\n    <div>\n      <h3 class=\"test-case-title\">Saved Test Cases in Project: {{selectedProject.projectName}}</h3>\n      <button mat-raised-button [matMenuTriggerFor]=\"projectMenu\" style=\"float:right;\" (click)=getProjectList()>\n          Project\n      </button>\n      <mat-menu #projectMenu=\"matMenu\">\n        <button mat-menu-item (click)=openNewProjectDialog()>New</button>\n        <button mat-menu-item [matMenuTriggerFor]=\"switchProjectMenu\">Open</button>\n        <button mat-menu-item (click)=openImportProjectDialog()>Import</button>\n        <button mat-menu-item (click)=exportCurrentProject()>Export Project Zip</button>\n      </mat-menu>\n\n      <mat-menu #switchProjectMenu=\"matMenu\" >\n        <button mat-menu-item *ngFor=\"let project of projectList\"  (click)=selectProject(project) class=\"project-button\">\n          <button mat-raised-button (click)=\"deleteProject(project, $event)\" class=\"trash-hover trash-align\">\n            <i class=\"fa fa-trash center-icon-img\" ></i>\n          </button>\n          {{project.projectName}}\n        </button>\n      </mat-menu>\n\n      <li class=\"workspaceButton\" (click)=\"createFolder('#', 'New Workspace')\">\n        <i class=\"fa fa-plus-square fa-lg\" aria-hidden=\"true\"></i><a href=\"#\">New Workspace</a>\n      </li>\n    </div>\n    <input matInput placeholder=\"Press enter to search\" class=\"mat-elevation-z8\" [(ngModel)]=\"searchStr\" (keyup.enter)=\"searchTree()\">\n  </div>\n  <div class=\"action-list-tree\" fxFlex=\"2 1 inherit\">\n    <div #jsTree></div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/ui_tree_viewer/copy_xml_dialog.ng.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/ui_tree_viewer/copy_xml_dialog.ng.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h1 mat-dialog-title> Raw XML </h1>\n<div mat-dialog-content>\n  <p class=\"xmlData\">{{data}}</p>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button mat-dialog-close>Close</button>\n</div>\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/ui_tree_viewer/ui_tree_viewer.ng.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/ui_tree_viewer/ui_tree_viewer.ng.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div fxLayout=\"column\" fxLayoutGap=\"10px\" fxFill>\n  <div fxLayout=\"row wrap\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\">\n    <mat-slide-toggle (change)=\"toggleHighlight($event)\">Highlight</mat-slide-toggle>\n    <mat-slide-toggle (change)=\"toggleInspectDevice($event)\">Inspect Device</mat-slide-toggle>\n    <button mat-raised-button (click)=\"expandAll()\">Expand All</button>\n    <button mat-raised-button (click)=\"closeAll()\">Close All</button>\n    <button mat-raised-button (click)=\"fetchXML()\">Refresh XML</button>\n    <button mat-raised-button (click)=\"showXML()\">Show XML</button>\n    <mat-slide-toggle (change)=\"toggleAttributes($event)\" [checked]=\"true\">Toggle Attributes</mat-slide-toggle>\n  </div>\n  <div fxLayout=\"row wrap\" fxLayoutGap=\"20px\">\n    <mat-form-field fxFlex=\"2 2 auto\">\n      <input matInput placeholder=\"Press enter to search\" [(ngModel)]=\"searchStr\" (keyup.enter)=\"searchTree()\">\n    </mat-form-field>\n    <mat-form-field fxFlex=\"1 1 auto\">\n      <mat-select placeholder=\"Search Type\" [(ngModel)]=\"searchType\">\n        <mat-option *ngFor=\"let t of searchTypes\" [value]=\"t\">\n          {{t}}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n  </div>\n  <div fxLayout=\"row wrap\">\n    <div class=\"treeArea\" fxFlex>\n      <div #jsTree></div>\n    </div>\n    <div class=\"attributeList\" *ngIf=\"showAttributes\" fxFlex>\n      <div *ngFor=\"let attr of attributes\" class=\"attributeItem\">\n        <div class=\"attributeTitle\">{{ attr.name }}</div>\n        <div class=\"attributeValue\">{{ attr.value }}</div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/workflow_editor/workflow_editor.ng.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/workflow_editor/workflow_editor.ng.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google LLC\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n  <div class=\"control-area\" fxLayout='row wrap' fxLayoutGap=\"10px\">\n    <button mat-raised-button (click)=\"playCurrentWorkflow()\" class=\"play-current-btn\" *ngIf=\"!isReplaying\"\n      matTooltip=\"Play the current workflow\">\n      <i class=\"fa fa-play-circle center-icon-img\"></i>Play Workflow\n    </button>\n    <button mat-raised-button (click)=\"playCurrentWorkflow()\" class=\"play-current-btn\" *ngIf=\"isReplaying\"\n      matTooltip=\"Stop playing the current workflow\">\n      <i class=\"fa fa-stop-circle center-icon-img\"></i>Stop Playback\n    </button>\n    <button mat-raised-button (click)=\"clearRecord()\" class=\"btn-clear-record\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-remove center-icon-img\"></i>Clear Workspace\n    </button>\n    <button mat-raised-button (click)=\"addActionPlus()\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-plus-circle center-icon-img\"></i>\n      Add Action\n    </button>\n    <button mat-raised-button (click)=\"openSaveWorkflowDialog()\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-floppy-o center-icon-img\"></i>\n      Save Workflow\n    </button>\n    <button mat-raised-button (click)=\"addScreenShot()\" class=\"btn-add-screenshot\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-camera center-icon-img\"></i>\n      Add Screenshot\n    </button>\n    <button mat-raised-button (click)=\"addWait()\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-clock-o center-icon-img\"></i>\n      Add Wait\n    </button>\n    <button mat-raised-button (click)=\"openHistoryDialog()\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-history center-icon-img\"></i>\n      Test History\n    </button>\n    <button mat-raised-button (click)=\"openGlobalVarSettings()\" class=\"global-var-setting\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-superpowers center-icon-img\"></i>\n      Global Variable Settings\n    </button>\n    <button mat-raised-button (click)=\"removeLast()\" class=\"remove-last-btn\" [disabled]=\"isReplaying\">\n      <i class=\"fa fa-undo center-icon-img\"></i>\n      Remove Last Action\n    </button>\n\n    <div>\n      <span class=\"play-speed-text-label\">Play Speed: </span>\n      <span class=\"play-speed-value-label\">{{playSpeedFactor}}X</span>\n      <mat-slider min=\"0.5\" max=\"4\" step=\"0.25\" [(value)]=\"playSpeedFactor\" id=\"speed-slider\" (input)=\"onSpeedSliderChange($event)\"></mat-slider>\n    </div>\n  </div>\n  <div class=\"panel panel-success\">\n    <div class=\"breadcrumb flat\">\n      <a>Workflow: </a>\n      <a *ngFor=\"let action of pathStack\" class=\"link-style\"\n                                     (click)=\"goBackFromExpandedCompoundAction(action)\">\n      <span class=\"current-action-name-label\">{{action.name}}</span>\n    </a>\n    </div>\n    <div class=\"panel-heading\">Workflow Editor (Drag and drop to reorder sequence, hover over for more info)</div>\n    <div class=\"panel-body\">\n\n\n      <ol class=\"list-group\" dnd-sortable-container [sortableData]=\"workflowModel.childrenActions\">\n        <li *ngFor=\"let action of workflowModel.childrenActions; let i = index\"\n          (click)=\"isReplaying || openActionEditDialog(action.actionId, i)\" class=\"list-group-item action-item\"\n          [style.background-color]=\"getBackgroundColor(action)\" dnd-sortable (onDropSuccess)=\"onDropSuccess()\"\n          [sortableIndex]=\"i\">\n          <div class=\"expand-icon\" *ngIf=\"getTextByType(action)==='CPD'\" matTooltip=\"click to open\">\n            <i class=\"fa fa-plus-circle center-icon-img\" (click)=\"expandCompoundAction(action, $event)\"></i>\n          </div>\n          {{i + 1}}) {{getTextByType(action)}} <br> ({{action.name}})\n        </li>\n      </ol>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/zone.js/dist/zone.js":
/*!*******************************************!*\
  !*** ./node_modules/zone.js/dist/zone.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	 true ? factory() :
	undefined;
}(this, (function () { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Zone$1 = (function (global) {
    var performance = global['performance'];
    function mark(name) {
        performance && performance['mark'] && performance['mark'](name);
    }
    function performanceMeasure(name, label) {
        performance && performance['measure'] && performance['measure'](name, label);
    }
    mark('Zone');
    var checkDuplicate = global[('__zone_symbol__forceDuplicateZoneCheck')] === true;
    if (global['Zone']) {
        // if global['Zone'] already exists (maybe zone.js was already loaded or
        // some other lib also registered a global object named Zone), we may need
        // to throw an error, but sometimes user may not want this error.
        // For example,
        // we have two web pages, page1 includes zone.js, page2 doesn't.
        // and the 1st time user load page1 and page2, everything work fine,
        // but when user load page2 again, error occurs because global['Zone'] already exists.
        // so we add a flag to let user choose whether to throw this error or not.
        // By default, if existing Zone is from zone.js, we will not throw the error.
        if (checkDuplicate || typeof global['Zone'].__symbol__ !== 'function') {
            throw new Error('Zone already loaded.');
        }
        else {
            return global['Zone'];
        }
    }
    var Zone = /** @class */ (function () {
        function Zone(parent, zoneSpec) {
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate =
                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function () {
            if (global['Promise'] !== patches['ZoneAwarePromise']) {
                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                    'has been overwritten.\n' +
                    'Most likely cause is that a Promise polyfill has been loaded ' +
                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                    'If you must load one, do so before loading zone.js.)');
            }
        };
        Object.defineProperty(Zone, "root", {
            get: function () {
                var zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "current", {
            get: function () {
                return _currentZoneFrame.zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "currentTask", {
            get: function () {
                return _currentTask;
            },
            enumerable: true,
            configurable: true
        });
        Zone.__load_patch = function (name, fn) {
            if (patches.hasOwnProperty(name)) {
                if (checkDuplicate) {
                    throw Error('Already loaded patch: ' + name);
                }
            }
            else if (!global['__Zone_disable_' + name]) {
                var perfName = 'Zone:' + name;
                mark(perfName);
                patches[name] = fn(global, Zone, _api);
                performanceMeasure(perfName, perfName);
            }
        };
        Object.defineProperty(Zone.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Zone.prototype.get = function (key) {
            var zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function (key) {
            var current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        };
        Zone.prototype.fork = function (zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function (callback, source) {
            if (typeof callback !== 'function') {
                throw new Error('Expecting function got: ' + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        };
        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
            if (task.zone != this) {
                throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            }
            // https://github.com/angular/zone.js/issues/778, sometimes eventTask
            // will run in notScheduled(canceled) state, we should not try to
            // run such kind of task but just return
            if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) {
                return;
            }
            var reEntryGuard = task.state != running;
            reEntryGuard && task._transitionTo(running, scheduled);
            task.runCount++;
            var previousTask = _currentTask;
            _currentTask = task;
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                    task.cancelFn = undefined;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                // if the task's state is notScheduled or unknown, then it has already been cancelled
                // we should not reset the state to scheduled
                if (task.state !== notScheduled && task.state !== unknown) {
                    if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                        reEntryGuard && task._transitionTo(scheduled, running);
                    }
                    else {
                        task.runCount = 0;
                        this._updateTaskCount(task, -1);
                        reEntryGuard &&
                            task._transitionTo(notScheduled, running, notScheduled);
                    }
                }
                _currentZoneFrame = _currentZoneFrame.parent;
                _currentTask = previousTask;
            }
        };
        Zone.prototype.scheduleTask = function (task) {
            if (task.zone && task.zone !== this) {
                // check if the task was rescheduled, the newZone
                // should not be the children of the original zone
                var newZone = this;
                while (newZone) {
                    if (newZone === task.zone) {
                        throw Error("can not reschedule task to " + this.name + " which is descendants of the original zone " + task.zone.name);
                    }
                    newZone = newZone.parent;
                }
            }
            task._transitionTo(scheduling, notScheduled);
            var zoneDelegates = [];
            task._zoneDelegates = zoneDelegates;
            task._zone = this;
            try {
                task = this._zoneDelegate.scheduleTask(this, task);
            }
            catch (err) {
                // should set task's state to unknown when scheduleTask throw error
                // because the err may from reschedule, so the fromState maybe notScheduled
                task._transitionTo(unknown, scheduling, notScheduled);
                // TODO: @JiaLiPassion, should we check the result from handleError?
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            if (task._zoneDelegates === zoneDelegates) {
                // we have to check because internally the delegate can reschedule the task.
                this._updateTaskCount(task, 1);
            }
            if (task.state == scheduling) {
                task._transitionTo(scheduled, scheduling);
            }
            return task;
        };
        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
            return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, undefined));
        };
        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function (task) {
            if (task.zone != this)
                throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            task._transitionTo(canceling, scheduled, running);
            try {
                this._zoneDelegate.cancelTask(this, task);
            }
            catch (err) {
                // if error occurs when cancelTask, transit the state to unknown
                task._transitionTo(unknown, canceling);
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            this._updateTaskCount(task, -1);
            task._transitionTo(notScheduled, canceling);
            task.runCount = 0;
            return task;
        };
        Zone.prototype._updateTaskCount = function (task, count) {
            var zoneDelegates = task._zoneDelegates;
            if (count == -1) {
                task._zoneDelegates = null;
            }
            for (var i = 0; i < zoneDelegates.length; i++) {
                zoneDelegates[i]._updateTaskCount(task.type, count);
            }
        };
        Zone.__symbol__ = __symbol__;
        return Zone;
    }());
    var DELEGATE_ZS = {
        name: '',
        onHasTask: function (delegate, _, target, hasTaskState) { return delegate.hasTask(target, hasTaskState); },
        onScheduleTask: function (delegate, _, target, task) {
            return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function (delegate, _, target, task, applyThis, applyArgs) {
            return delegate.invokeTask(target, task, applyThis, applyArgs);
        },
        onCancelTask: function (delegate, _, target, task) { return delegate.cancelTask(target, task); }
    };
    var ZoneDelegate = /** @class */ (function () {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
            this._interceptZS =
                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt =
                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._interceptCurrZone =
                zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt =
                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
            this._handleErrorZS =
                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt =
                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._handleErrorCurrZone =
                zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
            this._scheduleTaskZS =
                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt = zoneSpec &&
                (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._scheduleTaskCurrZone =
                zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
            this._invokeTaskZS =
                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt =
                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._invokeTaskCurrZone =
                zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
            this._cancelTaskZS =
                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt =
                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._cancelTaskCurrZone =
                zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
            this._hasTaskZS = null;
            this._hasTaskDlgt = null;
            this._hasTaskDlgtOwner = null;
            this._hasTaskCurrZone = null;
            var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
            var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
            if (zoneSpecHasTask || parentHasTask) {
                // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                // a case all task related interceptors must go through this ZD. We can't short circuit it.
                this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                this._hasTaskDlgt = parentDelegate;
                this._hasTaskDlgtOwner = this;
                this._hasTaskCurrZone = zone;
                if (!zoneSpec.onScheduleTask) {
                    this._scheduleTaskZS = DELEGATE_ZS;
                    this._scheduleTaskDlgt = parentDelegate;
                    this._scheduleTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onInvokeTask) {
                    this._invokeTaskZS = DELEGATE_ZS;
                    this._invokeTaskDlgt = parentDelegate;
                    this._invokeTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onCancelTask) {
                    this._cancelTaskZS = DELEGATE_ZS;
                    this._cancelTaskDlgt = parentDelegate;
                    this._cancelTaskCurrZone = this.zone;
                }
            }
        }
        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
            return this._interceptZS ?
                this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                callback;
        };
        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function (targetZone, error) {
            return this._handleErrorZS ?
                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                true;
        };
        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
            var returnTask = task;
            if (this._scheduleTaskZS) {
                if (this._hasTaskZS) {
                    returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                }
                returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                if (!returnTask)
                    returnTask = task;
            }
            else {
                if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == microTask) {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
            }
            return returnTask;
        };
        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
            return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                task.callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
            }
            else {
                if (!task.cancelFn) {
                    throw Error('Task is not cancelable');
                }
                value = task.cancelFn(task);
            }
            return value;
        };
        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
            // hasTask should not throw error so other ZoneDelegate
            // can still trigger hasTask callback
            try {
                this._hasTaskZS &&
                    this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
            }
            catch (err) {
                this.handleError(targetZone, err);
            }
        };
        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                var isEmpty = {
                    microTask: counts['microTask'] > 0,
                    macroTask: counts['macroTask'] > 0,
                    eventTask: counts['eventTask'] > 0,
                    change: type
                };
                this.hasTask(this.zone, isEmpty);
            }
        };
        return ZoneDelegate;
    }());
    var ZoneTask = /** @class */ (function () {
        function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
            this._zone = null;
            this.runCount = 0;
            this._zoneDelegates = null;
            this._state = 'notScheduled';
            this.type = type;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            this.callback = callback;
            var self = this;
            // TODO: @JiaLiPassion options should have interface
            if (type === eventTask && options && options.useG) {
                this.invoke = ZoneTask.invokeTask;
            }
            else {
                this.invoke = function () {
                    return ZoneTask.invokeTask.call(global, self, this, arguments);
                };
            }
        }
        ZoneTask.invokeTask = function (task, target, args) {
            if (!task) {
                task = this;
            }
            _numberOfNestedTaskFrames++;
            try {
                task.runCount++;
                return task.zone.runTask(task, target, args);
            }
            finally {
                if (_numberOfNestedTaskFrames == 1) {
                    drainMicroTaskQueue();
                }
                _numberOfNestedTaskFrames--;
            }
        };
        Object.defineProperty(ZoneTask.prototype, "zone", {
            get: function () {
                return this._zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoneTask.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        ZoneTask.prototype.cancelScheduleRequest = function () {
            this._transitionTo(notScheduled, scheduling);
        };
        ZoneTask.prototype._transitionTo = function (toState, fromState1, fromState2) {
            if (this._state === fromState1 || this._state === fromState2) {
                this._state = toState;
                if (toState == notScheduled) {
                    this._zoneDelegates = null;
                }
            }
            else {
                throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ? ' or \'' + fromState2 + '\'' : '') + ", was '" + this._state + "'.");
            }
        };
        ZoneTask.prototype.toString = function () {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId.toString();
            }
            else {
                return Object.prototype.toString.call(this);
            }
        };
        // add toJSON method to prevent cyclic error when
        // call JSON.stringify(zoneTask)
        ZoneTask.prototype.toJSON = function () {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                runCount: this.runCount
            };
        };
        return ZoneTask;
    }());
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  MICROTASK QUEUE
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var symbolSetTimeout = __symbol__('setTimeout');
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var nativeMicroTaskQueuePromise;
    function scheduleMicroTask(task) {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (!nativeMicroTaskQueuePromise) {
                if (global[symbolPromise]) {
                    nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
                }
            }
            if (nativeMicroTaskQueuePromise) {
                var nativeThen = nativeMicroTaskQueuePromise[symbolThen];
                if (!nativeThen) {
                    // native Promise is not patchable, we need to use `then` directly
                    // issue 1078
                    nativeThen = nativeMicroTaskQueuePromise['then'];
                }
                nativeThen.call(nativeMicroTaskQueuePromise, drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
        task && _microTaskQueue.push(task);
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                var queue = _microTaskQueue;
                _microTaskQueue = [];
                for (var i = 0; i < queue.length; i++) {
                    var task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (error) {
                        _api.onUnhandledError(error);
                    }
                }
            }
            _api.microtaskDrainDone();
            _isDrainingMicrotaskQueue = false;
        }
    }
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  BOOTSTRAP
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var NO_ZONE = { name: 'NO ZONE' };
    var notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
    var microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
    var patches = {};
    var _api = {
        symbol: __symbol__,
        currentZoneFrame: function () { return _currentZoneFrame; },
        onUnhandledError: noop,
        microtaskDrainDone: noop,
        scheduleMicroTask: scheduleMicroTask,
        showUncaughtError: function () { return !Zone[__symbol__('ignoreConsoleErrorUncaughtError')]; },
        patchEventTarget: function () { return []; },
        patchOnProperties: noop,
        patchMethod: function () { return noop; },
        bindArguments: function () { return []; },
        patchThen: function () { return noop; },
        patchMacroTask: function () { return noop; },
        setNativePromise: function (NativePromise) {
            // sometimes NativePromise.resolve static function
            // is not ready yet, (such as core-js/es6.promise)
            // so we need to check here.
            if (NativePromise && typeof NativePromise.resolve === 'function') {
                nativeMicroTaskQueuePromise = NativePromise.resolve(0);
            }
        },
        patchEventPrototype: function () { return noop; },
        isIEOrEdge: function () { return false; },
        getGlobalObjects: function () { return undefined; },
        ObjectDefineProperty: function () { return noop; },
        ObjectGetOwnPropertyDescriptor: function () { return undefined; },
        ObjectCreate: function () { return undefined; },
        ArraySlice: function () { return []; },
        patchClass: function () { return noop; },
        wrapWithCurrentZone: function () { return noop; },
        filterProperties: function () { return []; },
        attachOriginToPatched: function () { return noop; },
        _redefineProperty: function () { return noop; },
        patchCallbacks: function () { return noop; }
    };
    var _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
    var _currentTask = null;
    var _numberOfNestedTaskFrames = 0;
    function noop() { }
    function __symbol__(name) {
        return '__zone_symbol__' + name;
    }
    performanceMeasure('Zone', 'Zone');
    return global['Zone'] = Zone;
})(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

var __values = (undefined && undefined.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('ZoneAwarePromise', function (global, Zone, api) {
    var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ObjectDefineProperty = Object.defineProperty;
    function readableObjectToString(obj) {
        if (obj && obj.toString === Object.prototype.toString) {
            var className = obj.constructor && obj.constructor.name;
            return (className ? className : '') + ': ' + JSON.stringify(obj);
        }
        return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    var __symbol__ = api.symbol;
    var _uncaughtPromiseErrors = [];
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var creationTrace = '__creationTrace__';
    api.onUnhandledError = function (e) {
        if (api.showUncaughtError()) {
            var rejection = e && e.rejection;
            if (rejection) {
                console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
            }
            else {
                console.error(e);
            }
        }
    };
    api.microtaskDrainDone = function () {
        while (_uncaughtPromiseErrors.length) {
            var _loop_1 = function () {
                var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                try {
                    uncaughtPromiseError.zone.runGuarded(function () {
                        throw uncaughtPromiseError;
                    });
                }
                catch (error) {
                    handleUnhandledRejection(error);
                }
            };
            while (_uncaughtPromiseErrors.length) {
                _loop_1();
            }
        }
    };
    var UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');
    function handleUnhandledRejection(e) {
        api.onUnhandledError(e);
        try {
            var handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
            if (handler && typeof handler === 'function') {
                handler.call(this, e);
            }
        }
        catch (err) {
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) {
        return value;
    }
    function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
    }
    var symbolState = __symbol__('state');
    var symbolValue = __symbol__('value');
    var symbolFinally = __symbol__('finally');
    var symbolParentPromiseValue = __symbol__('parentPromiseValue');
    var symbolParentPromiseState = __symbol__('parentPromiseState');
    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return function (v) {
            try {
                resolvePromise(promise, state, v);
            }
            catch (err) {
                resolvePromise(promise, false, err);
            }
            // Do not return value or you will break the Promise spec.
        };
    }
    var once = function () {
        var wasCalled = false;
        return function wrapper(wrappedFunction) {
            return function () {
                if (wasCalled) {
                    return;
                }
                wasCalled = true;
                wrappedFunction.apply(null, arguments);
            };
        };
    };
    var TYPE_ERROR = 'Promise resolved with itself';
    var CURRENT_TASK_TRACE_SYMBOL = __symbol__('currentTaskTrace');
    // Promise Resolution
    function resolvePromise(promise, state, value) {
        var onceWrapper = once();
        if (promise === value) {
            throw new TypeError(TYPE_ERROR);
        }
        if (promise[symbolState] === UNRESOLVED) {
            // should only get value.then once based on promise spec.
            var then = null;
            try {
                if (typeof value === 'object' || typeof value === 'function') {
                    then = value && value.then;
                }
            }
            catch (err) {
                onceWrapper(function () {
                    resolvePromise(promise, false, err);
                })();
                return promise;
            }
            // if (value instanceof ZoneAwarePromise) {
            if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (state !== REJECTED && typeof then === 'function') {
                try {
                    then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
                }
                catch (err) {
                    onceWrapper(function () {
                        resolvePromise(promise, false, err);
                    })();
                }
            }
            else {
                promise[symbolState] = state;
                var queue = promise[symbolValue];
                promise[symbolValue] = value;
                if (promise[symbolFinally] === symbolFinally) {
                    // the promise is generated by Promise.prototype.finally
                    if (state === RESOLVED) {
                        // the state is resolved, should ignore the value
                        // and use parent promise value
                        promise[symbolState] = promise[symbolParentPromiseState];
                        promise[symbolValue] = promise[symbolParentPromiseValue];
                    }
                }
                // record task information in value when error occurs, so we can
                // do some additional work such as render longStackTrace
                if (state === REJECTED && value instanceof Error) {
                    // check if longStackTraceZone is here
                    var trace = Zone.currentTask && Zone.currentTask.data &&
                        Zone.currentTask.data[creationTrace];
                    if (trace) {
                        // only keep the long stack trace into error when in longStackTraceZone
                        ObjectDefineProperty(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
                    }
                }
                for (var i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    try {
                        // try to print more readable error log
                        throw new Error('Uncaught (in promise): ' + readableObjectToString(value) +
                            (value && value.stack ? '\n' + value.stack : ''));
                    }
                    catch (err) {
                        var error_1 = err;
                        error_1.rejection = value;
                        error_1.promise = promise;
                        error_1.zone = Zone.current;
                        error_1.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error_1);
                        api.scheduleMicroTask(); // to make sure that it is running
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    var REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            // if the promise is rejected no catch status
            // and queue.length > 0, means there is a error handler
            // here to handle the rejected promise, we should trigger
            // windows.rejectionhandled eventHandler or nodejs rejectionHandled
            // eventHandler
            try {
                var handler = Zone[REJECTION_HANDLED_HANDLER];
                if (handler && typeof handler === 'function') {
                    handler.call(this, { rejection: promise[symbolValue], promise: promise });
                }
            }
            catch (err) {
            }
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var promiseState = promise[symbolState];
        var delegate = promiseState ?
            (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
            (typeof onRejected === 'function') ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                var parentPromiseValue = promise[symbolValue];
                var isFinallyPromise = chainPromise && symbolFinally === chainPromise[symbolFinally];
                if (isFinallyPromise) {
                    // if the promise is generated from finally call, keep parent promise's state and value
                    chainPromise[symbolParentPromiseValue] = parentPromiseValue;
                    chainPromise[symbolParentPromiseState] = promiseState;
                }
                // should not pass value to finally callback
                var value = zone.run(delegate, undefined, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ?
                    [] :
                    [parentPromiseValue]);
                resolvePromise(chainPromise, true, value);
            }
            catch (error) {
                // if error occurs, should always return this error
                resolvePromise(chainPromise, false, error);
            }
        }, chainPromise);
    }
    var ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';
    var ZoneAwarePromise = /** @class */ (function () {
        function ZoneAwarePromise(executor) {
            var promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (error) {
                resolvePromise(promise, false, error);
            }
        }
        ZoneAwarePromise.toString = function () {
            return ZONE_AWARE_PROMISE_TO_STRING;
        };
        ZoneAwarePromise.resolve = function (value) {
            return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function (error) {
            return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function (values) {
            var e_1, _a;
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            function onResolve(value) {
                resolve(value);
            }
            function onReject(error) {
                reject(error);
            }
            try {
                for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                    var value = values_1_1.value;
                    if (!isThenable(value)) {
                        value = this.resolve(value);
                    }
                    value.then(onResolve, onReject);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return promise;
        };
        ZoneAwarePromise.all = function (values) {
            var e_2, _a;
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            // Start at 2 to prevent prematurely resolving if .then is called immediately.
            var unresolvedCount = 2;
            var valueIndex = 0;
            var resolvedValues = [];
            var _loop_2 = function (value) {
                if (!isThenable(value)) {
                    value = this_1.resolve(value);
                }
                var curValueIndex = valueIndex;
                value.then(function (value) {
                    resolvedValues[curValueIndex] = value;
                    unresolvedCount--;
                    if (unresolvedCount === 0) {
                        resolve(resolvedValues);
                    }
                }, reject);
                unresolvedCount++;
                valueIndex++;
            };
            var this_1 = this;
            try {
                for (var values_2 = __values(values), values_2_1 = values_2.next(); !values_2_1.done; values_2_1 = values_2.next()) {
                    var value = values_2_1.value;
                    _loop_2(value);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (values_2_1 && !values_2_1.done && (_a = values_2.return)) _a.call(values_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            // Make the unresolvedCount zero-based again.
            unresolvedCount -= 2;
            if (unresolvedCount === 0) {
                resolve(resolvedValues);
            }
            return promise;
        };
        Object.defineProperty(ZoneAwarePromise.prototype, Symbol.toStringTag, {
            get: function () {
                return 'Promise';
            },
            enumerable: true,
            configurable: true
        });
        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        ZoneAwarePromise.prototype.finally = function (onFinally) {
            var chainPromise = new this.constructor(null);
            chainPromise[symbolFinally] = symbolFinally;
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
            }
            return chainPromise;
        };
        return ZoneAwarePromise;
    }());
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[symbolPromise] = global['Promise'];
    var ZONE_AWARE_PROMISE = Zone.__symbol__('ZoneAwarePromise');
    var desc = ObjectGetOwnPropertyDescriptor(global, 'Promise');
    if (!desc || desc.configurable) {
        desc && delete desc.writable;
        desc && delete desc.value;
        if (!desc) {
            desc = { configurable: true, enumerable: true };
        }
        desc.get = function () {
            // if we already set ZoneAwarePromise, use patched one
            // otherwise return native one.
            return global[ZONE_AWARE_PROMISE] ? global[ZONE_AWARE_PROMISE] : global[symbolPromise];
        };
        desc.set = function (NewNativePromise) {
            if (NewNativePromise === ZoneAwarePromise) {
                // if the NewNativePromise is ZoneAwarePromise
                // save to global
                global[ZONE_AWARE_PROMISE] = NewNativePromise;
            }
            else {
                // if the NewNativePromise is not ZoneAwarePromise
                // for example: after load zone.js, some library just
                // set es6-promise to global, if we set it to global
                // directly, assertZonePatched will fail and angular
                // will not loaded, so we just set the NewNativePromise
                // to global[symbolPromise], so the result is just like
                // we load ES6 Promise before zone.js
                global[symbolPromise] = NewNativePromise;
                if (!NewNativePromise.prototype[symbolThen]) {
                    patchThen(NewNativePromise);
                }
                api.setNativePromise(NewNativePromise);
            }
        };
        ObjectDefineProperty(global, 'Promise', desc);
    }
    global['Promise'] = ZoneAwarePromise;
    var symbolThenPatched = __symbol__('thenPatched');
    function patchThen(Ctor) {
        var proto = Ctor.prototype;
        var prop = ObjectGetOwnPropertyDescriptor(proto, 'then');
        if (prop && (prop.writable === false || !prop.configurable)) {
            // check Ctor.prototype.then propertyDescriptor is writable or not
            // in meteor env, writable is false, we should ignore such case
            return;
        }
        var originalThen = proto.then;
        // Keep a reference to the original method.
        proto[symbolThen] = originalThen;
        Ctor.prototype.then = function (onResolve, onReject) {
            var _this = this;
            var wrapped = new ZoneAwarePromise(function (resolve, reject) {
                originalThen.call(_this, resolve, reject);
            });
            return wrapped.then(onResolve, onReject);
        };
        Ctor[symbolThenPatched] = true;
    }
    api.patchThen = patchThen;
    function zoneify(fn) {
        return function () {
            var resultPromise = fn.apply(this, arguments);
            if (resultPromise instanceof ZoneAwarePromise) {
                return resultPromise;
            }
            var ctor = resultPromise.constructor;
            if (!ctor[symbolThenPatched]) {
                patchThen(ctor);
            }
            return resultPromise;
        };
    }
    if (NativePromise) {
        patchThen(NativePromise);
        var fetch_1 = global['fetch'];
        if (typeof fetch_1 == 'function') {
            global[api.symbol('fetch')] = fetch_1;
            global['fetch'] = zoneify(fetch_1);
        }
    }
    // This is not part of public API, but it is useful for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Suppress closure compiler errors about unknown 'Zone' variable
 * @fileoverview
 * @suppress {undefinedVars,globalThis,missingRequire}
 */
// issue #989, to reduce bundle size, use short name
/** Object.getOwnPropertyDescriptor */
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
/** Object.defineProperty */
var ObjectDefineProperty = Object.defineProperty;
/** Object.getPrototypeOf */
var ObjectGetPrototypeOf = Object.getPrototypeOf;
/** Object.create */
var ObjectCreate = Object.create;
/** Array.prototype.slice */
var ArraySlice = Array.prototype.slice;
/** addEventListener string const */
var ADD_EVENT_LISTENER_STR = 'addEventListener';
/** removeEventListener string const */
var REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
/** zoneSymbol addEventListener */
var ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
/** zoneSymbol removeEventListener */
var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
/** true string const */
var TRUE_STR = 'true';
/** false string const */
var FALSE_STR = 'false';
/** __zone_symbol__ string const */
var ZONE_SYMBOL_PREFIX = '__zone_symbol__';
function wrapWithCurrentZone(callback, source) {
    return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
    return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
var zoneSymbol = Zone.__symbol__;
var isWindowExists = typeof window !== 'undefined';
var internalWindow = isWindowExists ? window : undefined;
var _global = isWindowExists && internalWindow || typeof self === 'object' && self || global;
var REMOVE_ATTRIBUTE = 'removeAttribute';
var NULL_ON_PROP_VALUE = [null];
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = wrapWithCurrentZone(args[i], source + '_' + i);
        }
    }
    return args;
}
function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];
    var _loop_1 = function (i) {
        var name_1 = fnNames[i];
        var delegate = prototype[name_1];
        if (delegate) {
            var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name_1);
            if (!isPropertyWritable(prototypeDesc)) {
                return "continue";
            }
            prototype[name_1] = (function (delegate) {
                var patched = function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                };
                attachOriginToPatched(patched, delegate);
                return patched;
            })(delegate);
        }
    };
    for (var i = 0; i < fnNames.length; i++) {
        _loop_1(i);
    }
}
function isPropertyWritable(propertyDesc) {
    if (!propertyDesc) {
        return true;
    }
    if (propertyDesc.writable === false) {
        return false;
    }
    return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
}
var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isNode = (!('nw' in _global) && typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]');
var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']);
// we are in electron of nw, so we are both browser and nodejs
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isMix = typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]' && !isWebWorker &&
    !!(isWindowExists && internalWindow['HTMLElement']);
var zoneSymbolEventNames = {};
var wrapFn = function (event) {
    // https://github.com/angular/zone.js/issues/911, in IE, sometimes
    // event will be undefined, so we need to use window.event
    event = event || _global.event;
    if (!event) {
        return;
    }
    var eventNameSymbol = zoneSymbolEventNames[event.type];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
    }
    var target = this || event.target || _global;
    var listener = target[eventNameSymbol];
    var result;
    if (isBrowser && target === internalWindow && event.type === 'error') {
        // window.onerror have different signiture
        // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#window.onerror
        // and onerror callback will prevent default when callback return true
        var errorEvent = event;
        result = listener &&
            listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
        if (result === true) {
            event.preventDefault();
        }
    }
    else {
        result = listener && listener.apply(this, arguments);
        if (result != undefined && !result) {
            event.preventDefault();
        }
    }
    return result;
};
function patchProperty(obj, prop, prototype) {
    var desc = ObjectGetOwnPropertyDescriptor(obj, prop);
    if (!desc && prototype) {
        // when patch window object, use prototype to check prop exist or not
        var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
        if (prototypeDesc) {
            desc = { enumerable: true, configurable: true };
        }
    }
    // if the descriptor not exists or is not configurable
    // just return
    if (!desc || !desc.configurable) {
        return;
    }
    var onPropPatchedSymbol = zoneSymbol('on' + prop + 'patched');
    if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
        return;
    }
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    var originalDescGet = desc.get;
    var originalDescSet = desc.set;
    // substr(2) cuz 'onclick' -> 'click', etc
    var eventName = prop.substr(2);
    var eventNameSymbol = zoneSymbolEventNames[eventName];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
    }
    desc.set = function (newValue) {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return;
        }
        var previousValue = target[eventNameSymbol];
        if (previousValue) {
            target.removeEventListener(eventName, wrapFn);
        }
        // issue #978, when onload handler was added before loading zone.js
        // we should remove it with originalDescSet
        if (originalDescSet) {
            originalDescSet.apply(target, NULL_ON_PROP_VALUE);
        }
        if (typeof newValue === 'function') {
            target[eventNameSymbol] = newValue;
            target.addEventListener(eventName, wrapFn, false);
        }
        else {
            target[eventNameSymbol] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null
    desc.get = function () {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return null;
        }
        var listener = target[eventNameSymbol];
        if (listener) {
            return listener;
        }
        else if (originalDescGet) {
            // result will be null when use inline event attribute,
            // such as <button onclick="func();">OK</button>
            // because the onclick function is internal raw uncompiled handler
            // the onclick will be evaluated when first time event was triggered or
            // the property is accessed, https://github.com/angular/zone.js/issues/525
            // so we should use original native get to retrieve the handler
            var value = originalDescGet && originalDescGet.call(this);
            if (value) {
                desc.set.call(this, value);
                if (typeof target[REMOVE_ATTRIBUTE] === 'function') {
                    target.removeAttribute(prop);
                }
                return value;
            }
        }
        return null;
    };
    ObjectDefineProperty(obj, prop, desc);
    obj[onPropPatchedSymbol] = true;
}
function patchOnProperties(obj, properties, prototype) {
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i], prototype);
        }
    }
    else {
        var onProperties = [];
        for (var prop in obj) {
            if (prop.substr(0, 2) == 'on') {
                onProperties.push(prop);
            }
        }
        for (var j = 0; j < onProperties.length; j++) {
            patchProperty(obj, onProperties[j], prototype);
        }
    }
}
var originalInstanceKey = zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    var OriginalClass = _global[className];
    if (!OriginalClass)
        return;
    // keep original class in global
    _global[zoneSymbol(className)] = OriginalClass;
    _global[className] = function () {
        var a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default:
                throw new Error('Arg list too long.');
        }
    };
    // attach original delegate to patched function
    attachOriginToPatched(_global[className], OriginalClass);
    var instance = new OriginalClass(function () { });
    var prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                ObjectDefineProperty(_global[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = wrapWithCurrentZone(fn, className + '.' + prop);
                            // keep callback in wrapped function so we can
                            // use it in Function.prototype.toString to return
                            // the native one.
                            attachOriginToPatched(this[originalInstanceKey][prop], fn);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global[className][prop] = OriginalClass[prop];
        }
    }
}
function copySymbolProperties(src, dest) {
    if (typeof Object.getOwnPropertySymbols !== 'function') {
        return;
    }
    var symbols = Object.getOwnPropertySymbols(src);
    symbols.forEach(function (symbol) {
        var desc = Object.getOwnPropertyDescriptor(src, symbol);
        Object.defineProperty(dest, symbol, {
            get: function () {
                return src[symbol];
            },
            set: function (value) {
                if (desc && (!desc.writable || typeof desc.set !== 'function')) {
                    // if src[symbol] is not writable or not have a setter, just return
                    return;
                }
                src[symbol] = value;
            },
            enumerable: desc ? desc.enumerable : true,
            configurable: desc ? desc.configurable : true
        });
    });
}
var shouldCopySymbolProperties = false;

function patchMethod(target, name, patchFn) {
    var proto = target;
    while (proto && !proto.hasOwnProperty(name)) {
        proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    var delegateName = zoneSymbol(name);
    var delegate = null;
    if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        // check whether proto[name] is writable
        // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob
        var desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
        if (isPropertyWritable(desc)) {
            var patchDelegate_1 = patchFn(delegate, delegateName, name);
            proto[name] = function () {
                return patchDelegate_1(this, arguments);
            };
            attachOriginToPatched(proto[name], delegate);
            if (shouldCopySymbolProperties) {
                copySymbolProperties(delegate, proto[name]);
            }
        }
    }
    return delegate;
}
// TODO: @JiaLiPassion, support cancel task later if necessary
function patchMacroTask(obj, funcName, metaCreator) {
    var setNative = null;
    function scheduleTask(task) {
        var data = task.data;
        data.args[data.cbIdx] = function () {
            task.invoke.apply(this, arguments);
        };
        setNative.apply(data.target, data.args);
        return task;
    }
    setNative = patchMethod(obj, funcName, function (delegate) { return function (self, args) {
        var meta = metaCreator(self, args);
        if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === 'function') {
            return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
        }
        else {
            // cause an error by calling it directly.
            return delegate.apply(self, args);
        }
    }; });
}

function attachOriginToPatched(patched, original) {
    patched[zoneSymbol('OriginalDelegate')] = original;
}
var isDetectedIEOrEdge = false;
var ieOrEdge = false;
function isIE() {
    try {
        var ua = internalWindow.navigator.userAgent;
        if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1) {
            return true;
        }
    }
    catch (error) {
    }
    return false;
}
function isIEOrEdge() {
    if (isDetectedIEOrEdge) {
        return ieOrEdge;
    }
    isDetectedIEOrEdge = true;
    try {
        var ua = internalWindow.navigator.userAgent;
        if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
            ieOrEdge = true;
        }
    }
    catch (error) {
    }
    return ieOrEdge;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// override Function.prototype.toString to make zone.js patched function
// look like native function
Zone.__load_patch('toString', function (global) {
    // patch Func.prototype.toString to let them look like native
    var originalFunctionToString = Function.prototype.toString;
    var ORIGINAL_DELEGATE_SYMBOL = zoneSymbol('OriginalDelegate');
    var PROMISE_SYMBOL = zoneSymbol('Promise');
    var ERROR_SYMBOL = zoneSymbol('Error');
    var newFunctionToString = function toString() {
        if (typeof this === 'function') {
            var originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
            if (originalDelegate) {
                if (typeof originalDelegate === 'function') {
                    return originalFunctionToString.call(originalDelegate);
                }
                else {
                    return Object.prototype.toString.call(originalDelegate);
                }
            }
            if (this === Promise) {
                var nativePromise = global[PROMISE_SYMBOL];
                if (nativePromise) {
                    return originalFunctionToString.call(nativePromise);
                }
            }
            if (this === Error) {
                var nativeError = global[ERROR_SYMBOL];
                if (nativeError) {
                    return originalFunctionToString.call(nativeError);
                }
            }
        }
        return originalFunctionToString.call(this);
    };
    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString;
    // patch Object.prototype.toString to let them look like native
    var originalObjectToString = Object.prototype.toString;
    var PROMISE_OBJECT_TO_STRING = '[object Promise]';
    Object.prototype.toString = function () {
        if (this instanceof Promise) {
            return PROMISE_OBJECT_TO_STRING;
        }
        return originalObjectToString.call(this);
    };
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
var passiveSupported = false;
if (typeof window !== 'undefined') {
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () {
                passiveSupported = true;
            }
        });
        window.addEventListener('test', options, options);
        window.removeEventListener('test', options, options);
    }
    catch (err) {
        passiveSupported = false;
    }
}
// an identifier to tell ZoneTask do not create a new invoke closure
var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
    useG: true
};
var zoneSymbolEventNames$1 = {};
var globalSources = {};
var EVENT_NAME_SYMBOL_REGX = /^__zone_symbol__(\w+)(true|false)$/;
var IMMEDIATE_PROPAGATION_SYMBOL = ('__zone_symbol__propagationStopped');
function patchEventTarget(_global, apis, patchOptions) {
    var ADD_EVENT_LISTENER = (patchOptions && patchOptions.add) || ADD_EVENT_LISTENER_STR;
    var REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.rm) || REMOVE_EVENT_LISTENER_STR;
    var LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listeners) || 'eventListeners';
    var REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.rmAll) || 'removeAllListeners';
    var zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
    var ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
    var PREPEND_EVENT_LISTENER = 'prependListener';
    var PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
    var invokeTask = function (task, target, event) {
        // for better performance, check isRemoved which is set
        // by removeEventListener
        if (task.isRemoved) {
            return;
        }
        var delegate = task.callback;
        if (typeof delegate === 'object' && delegate.handleEvent) {
            // create the bind version of handleEvent when invoke
            task.callback = function (event) { return delegate.handleEvent(event); };
            task.originalDelegate = delegate;
        }
        // invoke static task.invoke
        task.invoke(task, target, [event]);
        var options = task.options;
        if (options && typeof options === 'object' && options.once) {
            // if options.once is true, after invoke once remove listener here
            // only browser need to do this, nodejs eventEmitter will cal removeListener
            // inside EventEmitter.once
            var delegate_1 = task.originalDelegate ? task.originalDelegate : task.callback;
            target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate_1, options);
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = false
    var globalZoneAwareCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = true
    var globalZoneAwareCaptureCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    function patchEventTargetMethods(obj, patchOptions) {
        if (!obj) {
            return false;
        }
        var useGlobalCallback = true;
        if (patchOptions && patchOptions.useG !== undefined) {
            useGlobalCallback = patchOptions.useG;
        }
        var validateHandler = patchOptions && patchOptions.vh;
        var checkDuplicate = true;
        if (patchOptions && patchOptions.chkDup !== undefined) {
            checkDuplicate = patchOptions.chkDup;
        }
        var returnTarget = false;
        if (patchOptions && patchOptions.rt !== undefined) {
            returnTarget = patchOptions.rt;
        }
        var proto = obj;
        while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
            proto = ObjectGetPrototypeOf(proto);
        }
        if (!proto && obj[ADD_EVENT_LISTENER]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = obj;
        }
        if (!proto) {
            return false;
        }
        if (proto[zoneSymbolAddEventListener]) {
            return false;
        }
        var eventNameToString = patchOptions && patchOptions.eventNameToString;
        // a shared global taskData to pass data for scheduleEventTask
        // so we do not need to create a new object just for pass some data
        var taskData = {};
        var nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
        var nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] =
            proto[REMOVE_EVENT_LISTENER];
        var nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] =
            proto[LISTENERS_EVENT_LISTENER];
        var nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
        var nativePrependEventListener;
        if (patchOptions && patchOptions.prepend) {
            nativePrependEventListener = proto[zoneSymbol(patchOptions.prepend)] =
                proto[patchOptions.prepend];
        }
        function checkIsPassive(task) {
            if (!passiveSupported && typeof taskData.options !== 'boolean' &&
                typeof taskData.options !== 'undefined' && taskData.options !== null) {
                // options is a non-null non-undefined object
                // passive is not supported
                // don't pass options as object
                // just pass capture as a boolean
                task.options = !!taskData.options.capture;
                taskData.options = task.options;
            }
        }
        var customScheduleGlobal = function (task) {
            // if there is already a task for the eventName + capture,
            // just return, because we use the shared globalZoneAwareCallback here.
            if (taskData.isExisting) {
                return;
            }
            checkIsPassive(task);
            return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
        };
        var customCancelGlobal = function (task) {
            // if task is not marked as isRemoved, this call is directly
            // from Zone.prototype.cancelTask, we should remove the task
            // from tasksList of target first
            if (!task.isRemoved) {
                var symbolEventNames = zoneSymbolEventNames$1[task.eventName];
                var symbolEventName = void 0;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = symbolEventName && task.target[symbolEventName];
                if (existingTasks) {
                    for (var i = 0; i < existingTasks.length; i++) {
                        var existingTask = existingTasks[i];
                        if (existingTask === task) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            task.isRemoved = true;
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                task.allRemoved = true;
                                task.target[symbolEventName] = null;
                            }
                            break;
                        }
                    }
                }
            }
            // if all tasks for the eventName + capture have gone,
            // we will really remove the global event callback,
            // if not, return
            if (!task.allRemoved) {
                return;
            }
            return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
        };
        var customScheduleNonGlobal = function (task) {
            checkIsPassive(task);
            return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customSchedulePrepend = function (task) {
            return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customCancelNonGlobal = function (task) {
            return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
        };
        var customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
        var customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
        var compareTaskCallbackVsDelegate = function (task, delegate) {
            var typeOfDelegate = typeof delegate;
            return (typeOfDelegate === 'function' && task.callback === delegate) ||
                (typeOfDelegate === 'object' && task.originalDelegate === delegate);
        };
        var compare = (patchOptions && patchOptions.diff) ? patchOptions.diff : compareTaskCallbackVsDelegate;
        var blackListedEvents = Zone[Zone.__symbol__('BLACK_LISTED_EVENTS')];
        var makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget, prepend) {
            if (returnTarget === void 0) { returnTarget = false; }
            if (prepend === void 0) { prepend = false; }
            return function () {
                var target = this || _global;
                var eventName = arguments[0];
                var delegate = arguments[1];
                if (!delegate) {
                    return nativeListener.apply(this, arguments);
                }
                if (isNode && eventName === 'uncaughtException') {
                    // don't patch uncaughtException of nodejs to prevent endless loop
                    return nativeListener.apply(this, arguments);
                }
                // don't create the bind delegate function for handleEvent
                // case here to improve addEventListener performance
                // we will create the bind delegate when invoke
                var isHandleEvent = false;
                if (typeof delegate !== 'function') {
                    if (!delegate.handleEvent) {
                        return nativeListener.apply(this, arguments);
                    }
                    isHandleEvent = true;
                }
                if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                    return;
                }
                var options = arguments[2];
                if (blackListedEvents) {
                    // check black list
                    for (var i = 0; i < blackListedEvents.length; i++) {
                        if (eventName === blackListedEvents[i]) {
                            return nativeListener.apply(this, arguments);
                        }
                    }
                }
                var capture;
                var once = false;
                if (options === undefined) {
                    capture = false;
                }
                else if (options === true) {
                    capture = true;
                }
                else if (options === false) {
                    capture = false;
                }
                else {
                    capture = options ? !!options.capture : false;
                    once = options ? !!options.once : false;
                }
                var zone = Zone.current;
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                var symbolEventName;
                if (!symbolEventNames) {
                    // the code is duplicate, but I just want to get some better performance
                    var falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
                    var trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
                    var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
                    var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
                    zoneSymbolEventNames$1[eventName] = {};
                    zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
                    zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
                    symbolEventName = capture ? symbolCapture : symbol;
                }
                else {
                    symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = target[symbolEventName];
                var isExisting = false;
                if (existingTasks) {
                    // already have task registered
                    isExisting = true;
                    if (checkDuplicate) {
                        for (var i = 0; i < existingTasks.length; i++) {
                            if (compare(existingTasks[i], delegate)) {
                                // same callback, same capture, same event name, just return
                                return;
                            }
                        }
                    }
                }
                else {
                    existingTasks = target[symbolEventName] = [];
                }
                var source;
                var constructorName = target.constructor['name'];
                var targetSource = globalSources[constructorName];
                if (targetSource) {
                    source = targetSource[eventName];
                }
                if (!source) {
                    source = constructorName + addSource +
                        (eventNameToString ? eventNameToString(eventName) : eventName);
                }
                // do not create a new object as task.data to pass those things
                // just use the global shared one
                taskData.options = options;
                if (once) {
                    // if addEventListener with once options, we don't pass it to
                    // native addEventListener, instead we keep the once setting
                    // and handle ourselves.
                    taskData.options.once = false;
                }
                taskData.target = target;
                taskData.capture = capture;
                taskData.eventName = eventName;
                taskData.isExisting = isExisting;
                var data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : undefined;
                // keep taskData into data to allow onScheduleEventTask to access the task information
                if (data) {
                    data.taskData = taskData;
                }
                var task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                // should clear taskData.target to avoid memory leak
                // issue, https://github.com/angular/angular/issues/20442
                taskData.target = null;
                // need to clear up taskData because it is a global object
                if (data) {
                    data.taskData = null;
                }
                // have to save those information to task in case
                // application may call task.zone.cancelTask() directly
                if (once) {
                    options.once = true;
                }
                if (!(!passiveSupported && typeof task.options === 'boolean')) {
                    // if not support passive, and we pass an option object
                    // to addEventListener, we should save the options to task
                    task.options = options;
                }
                task.target = target;
                task.capture = capture;
                task.eventName = eventName;
                if (isHandleEvent) {
                    // save original delegate for compare to check duplicate
                    task.originalDelegate = delegate;
                }
                if (!prepend) {
                    existingTasks.push(task);
                }
                else {
                    existingTasks.unshift(task);
                }
                if (returnTarget) {
                    return target;
                }
            };
        };
        proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
        if (nativePrependEventListener) {
            proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
        }
        proto[REMOVE_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var options = arguments[2];
            var capture;
            if (options === undefined) {
                capture = false;
            }
            else if (options === true) {
                capture = true;
            }
            else if (options === false) {
                capture = false;
            }
            else {
                capture = options ? !!options.capture : false;
            }
            var delegate = arguments[1];
            if (!delegate) {
                return nativeRemoveEventListener.apply(this, arguments);
            }
            if (validateHandler &&
                !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                return;
            }
            var symbolEventNames = zoneSymbolEventNames$1[eventName];
            var symbolEventName;
            if (symbolEventNames) {
                symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
            }
            var existingTasks = symbolEventName && target[symbolEventName];
            if (existingTasks) {
                for (var i = 0; i < existingTasks.length; i++) {
                    var existingTask = existingTasks[i];
                    if (compare(existingTask, delegate)) {
                        existingTasks.splice(i, 1);
                        // set isRemoved to data for faster invokeTask check
                        existingTask.isRemoved = true;
                        if (existingTasks.length === 0) {
                            // all tasks for the eventName + capture have gone,
                            // remove globalZoneAwareCallback and remove the task cache from target
                            existingTask.allRemoved = true;
                            target[symbolEventName] = null;
                        }
                        existingTask.zone.cancelTask(existingTask);
                        if (returnTarget) {
                            return target;
                        }
                        return;
                    }
                }
            }
            // issue 930, didn't find the event name or callback
            // from zone kept existingTasks, the callback maybe
            // added outside of zone, we need to call native removeEventListener
            // to try to remove it.
            return nativeRemoveEventListener.apply(this, arguments);
        };
        proto[LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var listeners = [];
            var tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                listeners.push(delegate);
            }
            return listeners;
        };
        proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            if (!eventName) {
                var keys = Object.keys(target);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                    var evtName = match && match[1];
                    // in nodejs EventEmitter, removeListener event is
                    // used for monitoring the removeListener call,
                    // so just keep removeListener eventListener until
                    // all other eventListeners are removed
                    if (evtName && evtName !== 'removeListener') {
                        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                    }
                }
                // remove removeListener listener finally
                this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
            }
            else {
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                if (symbolEventNames) {
                    var symbolEventName = symbolEventNames[FALSE_STR];
                    var symbolCaptureEventName = symbolEventNames[TRUE_STR];
                    var tasks = target[symbolEventName];
                    var captureTasks = target[symbolCaptureEventName];
                    if (tasks) {
                        var removeTasks = tasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                    if (captureTasks) {
                        var removeTasks = captureTasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                }
            }
            if (returnTarget) {
                return this;
            }
        };
        // for native toString patch
        attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
        attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
        if (nativeRemoveAllListeners) {
            attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
        }
        if (nativeListeners) {
            attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
        }
        return true;
    }
    var results = [];
    for (var i = 0; i < apis.length; i++) {
        results[i] = patchEventTargetMethods(apis[i], patchOptions);
    }
    return results;
}
function findEventTasks(target, eventName) {
    var foundTasks = [];
    for (var prop in target) {
        var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
        var evtName = match && match[1];
        if (evtName && (!eventName || evtName === eventName)) {
            var tasks = target[prop];
            if (tasks) {
                for (var i = 0; i < tasks.length; i++) {
                    foundTasks.push(tasks[i]);
                }
            }
        }
    }
    return foundTasks;
}
function patchEventPrototype(global, api) {
    var Event = global['Event'];
    if (Event && Event.prototype) {
        api.patchMethod(Event.prototype, 'stopImmediatePropagation', function (delegate) { return function (self, args) {
            self[IMMEDIATE_PROPAGATION_SYMBOL] = true;
            // we need to call the native stopImmediatePropagation
            // in case in some hybrid application, some part of
            // application will be controlled by zone, some are not
            delegate && delegate.apply(self, args);
        }; });
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function patchCallbacks(api, target, targetName, method, callbacks) {
    var symbol = Zone.__symbol__(method);
    if (target[symbol]) {
        return;
    }
    var nativeDelegate = target[symbol] = target[method];
    target[method] = function (name, opts, options) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                var source = targetName + "." + method + "::" + callback;
                var prototype = opts.prototype;
                if (prototype.hasOwnProperty(callback)) {
                    var descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);
                        api._redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else if (prototype[callback]) {
                        prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
                    }
                }
                else if (prototype[callback]) {
                    prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
                }
            });
        }
        return nativeDelegate.call(target, name, opts, options);
    };
    api.attachOriginToPatched(target[method], nativeDelegate);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
var zoneSymbol$1 = Zone.__symbol__;
var _defineProperty = Object[zoneSymbol$1('defineProperty')] = Object.defineProperty;
var _getOwnPropertyDescriptor = Object[zoneSymbol$1('getOwnPropertyDescriptor')] =
    Object.getOwnPropertyDescriptor;
var _create = Object.create;
var unconfigurablesKey = zoneSymbol$1('unconfigurables');
function propertyPatch() {
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
        }
        var originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        return obj;
    };
    Object.create = function (obj, proto) {
        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function (prop) {
                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
        }
        return _create(obj, proto);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        var desc = _getOwnPropertyDescriptor(obj, prop);
        if (desc && isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}
function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}
function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    // issue-927, if the desc is frozen, don't try to change the desc
    if (!Object.isFrozen(desc)) {
        desc.configurable = true;
    }
    if (!desc.configurable) {
        // issue-927, if the obj is frozen, don't try to set the desc to obj
        if (!obj[unconfigurablesKey] && !Object.isFrozen(obj)) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        if (obj[unconfigurablesKey]) {
            obj[unconfigurablesKey][prop] = true;
        }
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (error) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
            // retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (error) {
                var descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (error) {
                    descJson = desc.toString();
                }
                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error);
            }
        }
        else {
            throw error;
        }
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {globalThis}
 */
var globalEventHandlersEventNames = [
    'abort',
    'animationcancel',
    'animationend',
    'animationiteration',
    'auxclick',
    'beforeinput',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'compositionstart',
    'compositionupdate',
    'compositionend',
    'cuechange',
    'click',
    'close',
    'contextmenu',
    'curechange',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragexit',
    'dragleave',
    'dragover',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'focusin',
    'focusout',
    'gotpointercapture',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadstart',
    'loadeddata',
    'loadedmetadata',
    'lostpointercapture',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'orientationchange',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointerlockchange',
    'mozpointerlockchange',
    'webkitpointerlockerchange',
    'pointerlockerror',
    'mozpointerlockerror',
    'webkitpointerlockerror',
    'pointermove',
    'pointout',
    'pointerover',
    'pointerup',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'show',
    'sort',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'volumechange',
    'touchcancel',
    'touchmove',
    'touchstart',
    'touchend',
    'transitioncancel',
    'transitionend',
    'waiting',
    'wheel'
];
var documentEventNames = [
    'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'freeze', 'fullscreenchange',
    'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
    'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange',
    'visibilitychange', 'resume'
];
var windowEventNames = [
    'absolutedeviceorientation',
    'afterinput',
    'afterprint',
    'appinstalled',
    'beforeinstallprompt',
    'beforeprint',
    'beforeunload',
    'devicelight',
    'devicemotion',
    'deviceorientation',
    'deviceorientationabsolute',
    'deviceproximity',
    'hashchange',
    'languagechange',
    'message',
    'mozbeforepaint',
    'offline',
    'online',
    'paint',
    'pageshow',
    'pagehide',
    'popstate',
    'rejectionhandled',
    'storage',
    'unhandledrejection',
    'unload',
    'userproximity',
    'vrdisplyconnected',
    'vrdisplaydisconnected',
    'vrdisplaypresentchange'
];
var htmlElementEventNames = [
    'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
    'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
    'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
];
var mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
var ieElementEventNames = [
    'activate',
    'afterupdate',
    'ariarequest',
    'beforeactivate',
    'beforedeactivate',
    'beforeeditfocus',
    'beforeupdate',
    'cellchange',
    'controlselect',
    'dataavailable',
    'datasetchanged',
    'datasetcomplete',
    'errorupdate',
    'filterchange',
    'layoutcomplete',
    'losecapture',
    'move',
    'moveend',
    'movestart',
    'propertychange',
    'resizeend',
    'resizestart',
    'rowenter',
    'rowexit',
    'rowsdelete',
    'rowsinserted',
    'command',
    'compassneedscalibration',
    'deactivate',
    'help',
    'mscontentzoom',
    'msmanipulationstatechanged',
    'msgesturechange',
    'msgesturedoubletap',
    'msgestureend',
    'msgesturehold',
    'msgesturestart',
    'msgesturetap',
    'msgotpointercapture',
    'msinertiastart',
    'mslostpointercapture',
    'mspointercancel',
    'mspointerdown',
    'mspointerenter',
    'mspointerhover',
    'mspointerleave',
    'mspointermove',
    'mspointerout',
    'mspointerover',
    'mspointerup',
    'pointerout',
    'mssitemodejumplistitemremoved',
    'msthumbnailclick',
    'stop',
    'storagecommit'
];
var webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
var formEventNames = ['autocomplete', 'autocompleteerror'];
var detailEventNames = ['toggle'];
var frameEventNames = ['load'];
var frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
var marqueeEventNames = ['bounce', 'finish', 'start'];
var XMLHttpRequestEventNames = [
    'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
    'readystatechange'
];
var IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
var websocketEventNames = ['close', 'error', 'open', 'message'];
var workerEventNames = ['error', 'message'];
var eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties || ignoreProperties.length === 0) {
        return onProperties;
    }
    var tip = ignoreProperties.filter(function (ip) { return ip.target === target; });
    if (!tip || tip.length === 0) {
        return onProperties;
    }
    var targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter(function (op) { return targetIgnoreProperties.indexOf(op) === -1; });
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    // check whether target is available, sometimes target will be undefined
    // because different browser or some 3rd party plugin.
    if (!target) {
        return;
    }
    var filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    patchOnProperties(target, filteredProperties, prototype);
}
function propertyDescriptorPatch(api, _global) {
    if (isNode && !isMix) {
        return;
    }
    if (Zone[api.symbol('patchEvents')]) {
        // events are already been patched by legacy patch.
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    var ignoreProperties = _global['__Zone_ignore_on_properties'];
    // for browsers that we can patch the descriptor:  Chrome & Firefox
    if (isBrowser) {
        var internalWindow = window;
        var ignoreErrorProperties = isIE ? [{ target: internalWindow, ignoreProperties: ['error'] }] : [];
        // in IE/Edge, onProp not exist in window object, but in WindowPrototype
        // so we need to pass WindowPrototype to check onProp exist or not
        patchFilteredProperties(internalWindow, eventNames.concat(['messageerror']), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow));
        patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);
        if (typeof internalWindow['SVGElement'] !== 'undefined') {
            patchFilteredProperties(internalWindow['SVGElement'].prototype, eventNames, ignoreProperties);
        }
        patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
        patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
        patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
        patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
        patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
        patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
        patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
        var HTMLMarqueeElement_1 = internalWindow['HTMLMarqueeElement'];
        if (HTMLMarqueeElement_1) {
            patchFilteredProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames, ignoreProperties);
        }
        var Worker_1 = internalWindow['Worker'];
        if (Worker_1) {
            patchFilteredProperties(Worker_1.prototype, workerEventNames, ignoreProperties);
        }
    }
    var XMLHttpRequest = _global['XMLHttpRequest'];
    if (XMLHttpRequest) {
        // XMLHttpRequest is not available in ServiceWorker, so we need to check here
        patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
    }
    var XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
    if (XMLHttpRequestEventTarget) {
        patchFilteredProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames, ignoreProperties);
    }
    if (typeof IDBIndex !== 'undefined') {
        patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
        patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
        patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
        patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
        patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
        patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
    }
    if (supportsWebSocket) {
        patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('util', function (global, Zone, api) {
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
    api.patchMacroTask = patchMacroTask;
    // In earlier version of zone.js (<0.9.0), we use env name `__zone_symbol__BLACK_LISTED_EVENTS` to
    // define which events will not be patched by `Zone.js`.
    // In newer version (>=0.9.0), we change the env name to `__zone_symbol__UNPATCHED_EVENTS` to keep
    // the name consistent with angular repo.
    // The  `__zone_symbol__BLACK_LISTED_EVENTS` is deprecated, but it is still be supported for
    // backwards compatibility.
    var SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');
    var SYMBOL_UNPATCHED_EVENTS = Zone.__symbol__('UNPATCHED_EVENTS');
    if (global[SYMBOL_UNPATCHED_EVENTS]) {
        global[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_UNPATCHED_EVENTS];
    }
    if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
        Zone[SYMBOL_BLACK_LISTED_EVENTS] = Zone[SYMBOL_UNPATCHED_EVENTS] =
            global[SYMBOL_BLACK_LISTED_EVENTS];
    }
    api.patchEventPrototype = patchEventPrototype;
    api.patchEventTarget = patchEventTarget;
    api.isIEOrEdge = isIEOrEdge;
    api.ObjectDefineProperty = ObjectDefineProperty;
    api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
    api.ObjectCreate = ObjectCreate;
    api.ArraySlice = ArraySlice;
    api.patchClass = patchClass;
    api.wrapWithCurrentZone = wrapWithCurrentZone;
    api.filterProperties = filterProperties;
    api.attachOriginToPatched = attachOriginToPatched;
    api._redefineProperty = _redefineProperty;
    api.patchCallbacks = patchCallbacks;
    api.getGlobalObjects = function () { return ({
        globalSources: globalSources,
        zoneSymbolEventNames: zoneSymbolEventNames$1,
        eventNames: eventNames,
        isBrowser: isBrowser,
        isMix: isMix,
        isNode: isNode,
        TRUE_STR: TRUE_STR,
        FALSE_STR: FALSE_STR,
        ZONE_SYMBOL_PREFIX: ZONE_SYMBOL_PREFIX,
        ADD_EVENT_LISTENER_STR: ADD_EVENT_LISTENER_STR,
        REMOVE_EVENT_LISTENER_STR: REMOVE_EVENT_LISTENER_STR
    }); };
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function eventTargetLegacyPatch(_global, api) {
    var _a = api.getGlobalObjects(), eventNames = _a.eventNames, globalSources = _a.globalSources, zoneSymbolEventNames = _a.zoneSymbolEventNames, TRUE_STR = _a.TRUE_STR, FALSE_STR = _a.FALSE_STR, ZONE_SYMBOL_PREFIX = _a.ZONE_SYMBOL_PREFIX;
    var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
    var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket'
        .split(',');
    var EVENT_TARGET = 'EventTarget';
    var apis = [];
    var isWtf = _global['wtf'];
    var WTF_ISSUE_555_ARRAY = WTF_ISSUE_555.split(',');
    if (isWtf) {
        // Workaround for: https://github.com/google/tracing-framework/issues/555
        apis = WTF_ISSUE_555_ARRAY.map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
    }
    else if (_global[EVENT_TARGET]) {
        apis.push(EVENT_TARGET);
    }
    else {
        // Note: EventTarget is not available in all browsers,
        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
        apis = NO_EVENT_TARGET;
    }
    var isDisableIECheck = _global['__Zone_disable_IE_check'] || false;
    var isEnableCrossContextCheck = _global['__Zone_enable_cross_context_check'] || false;
    var ieOrEdge = api.isIEOrEdge();
    var ADD_EVENT_LISTENER_SOURCE = '.addEventListener:';
    var FUNCTION_WRAPPER = '[object FunctionWrapper]';
    var BROWSER_TOOLS = 'function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }';
    //  predefine all __zone_symbol__ + eventName + true/false string
    for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        var falseEventName = eventName + FALSE_STR;
        var trueEventName = eventName + TRUE_STR;
        var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
        var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
        zoneSymbolEventNames[eventName] = {};
        zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
        zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
    }
    //  predefine all task.source string
    for (var i = 0; i < WTF_ISSUE_555.length; i++) {
        var target = WTF_ISSUE_555_ARRAY[i];
        var targets = globalSources[target] = {};
        for (var j = 0; j < eventNames.length; j++) {
            var eventName = eventNames[j];
            targets[eventName] = target + ADD_EVENT_LISTENER_SOURCE + eventName;
        }
    }
    var checkIEAndCrossContext = function (nativeDelegate, delegate, target, args) {
        if (!isDisableIECheck && ieOrEdge) {
            if (isEnableCrossContextCheck) {
                try {
                    var testString = delegate.toString();
                    if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                        nativeDelegate.apply(target, args);
                        return false;
                    }
                }
                catch (error) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
            else {
                var testString = delegate.toString();
                if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
        }
        else if (isEnableCrossContextCheck) {
            try {
                delegate.toString();
            }
            catch (error) {
                nativeDelegate.apply(target, args);
                return false;
            }
        }
        return true;
    };
    var apiTypes = [];
    for (var i = 0; i < apis.length; i++) {
        var type = _global[apis[i]];
        apiTypes.push(type && type.prototype);
    }
    // vh is validateHandler to check event handler
    // is valid or not(for security check)
    api.patchEventTarget(_global, apiTypes, { vh: checkIEAndCrossContext });
    Zone[api.symbol('patchEventTarget')] = !!_global[EVENT_TARGET];
    return true;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// we have to patch the instance since the proto is non-configurable
function apply(api, _global) {
    var _a = api.getGlobalObjects(), ADD_EVENT_LISTENER_STR = _a.ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR = _a.REMOVE_EVENT_LISTENER_STR;
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        api.patchEventTarget(_global, [WS.prototype]);
    }
    _global.WebSocket = function (x, y) {
        var socket = arguments.length > 1 ? new WS(x, y) : new WS(x);
        var proxySocket;
        var proxySocketProto;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = api.ObjectGetOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = api.ObjectCreate(socket);
            // socket have own property descriptor 'onopen', 'onmessage', 'onclose', 'onerror'
            // but proxySocket not, so we will keep socket as prototype and pass it to
            // patchOnProperties method
            proxySocketProto = socket;
            [ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR, 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    var args = api.ArraySlice.call(arguments);
                    if (propName === ADD_EVENT_LISTENER_STR || propName === REMOVE_EVENT_LISTENER_STR) {
                        var eventName = args.length > 0 ? args[0] : undefined;
                        if (eventName) {
                            var propertySymbol = Zone.__symbol__('ON_PROPERTY' + eventName);
                            socket[propertySymbol] = proxySocket[propertySymbol];
                        }
                    }
                    return socket[propName].apply(socket, args);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        api.patchOnProperties(proxySocket, ['close', 'error', 'message', 'open'], proxySocketProto);
        return proxySocket;
    };
    var globalWebSocket = _global['WebSocket'];
    for (var prop in WS) {
        globalWebSocket[prop] = WS[prop];
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {globalThis}
 */
function propertyDescriptorLegacyPatch(api, _global) {
    var _a = api.getGlobalObjects(), isNode = _a.isNode, isMix = _a.isMix;
    if (isNode && !isMix) {
        return;
    }
    if (!canPatchViaPropertyDescriptor(api, _global)) {
        var supportsWebSocket = typeof WebSocket !== 'undefined';
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents(api);
        api.patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            apply(api, _global);
        }
        Zone[api.symbol('patchEvents')] = true;
    }
}
function canPatchViaPropertyDescriptor(api, _global) {
    var _a = api.getGlobalObjects(), isBrowser = _a.isBrowser, isMix = _a.isMix;
    if ((isBrowser || isMix) &&
        !api.ObjectGetOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = api.ObjectGetOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
        // try to use onclick to detect whether we can patch via propertyDescriptor
        // because XMLHttpRequest is not available in service worker
        if (desc) {
            api.ObjectDefineProperty(Element.prototype, 'onclick', {
                enumerable: true,
                configurable: true,
                get: function () {
                    return true;
                }
            });
            var div = document.createElement('div');
            var result = !!div.onclick;
            api.ObjectDefineProperty(Element.prototype, 'onclick', desc);
            return result;
        }
    }
    var XMLHttpRequest = _global['XMLHttpRequest'];
    if (!XMLHttpRequest) {
        // XMLHttpRequest is not available in service worker
        return false;
    }
    var ON_READY_STATE_CHANGE = 'onreadystatechange';
    var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
    var xhrDesc = api.ObjectGetOwnPropertyDescriptor(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE);
    // add enumerable and configurable here because in opera
    // by default XMLHttpRequest.prototype.onreadystatechange is undefined
    // without adding enumerable and configurable will cause onreadystatechange
    // non-configurable
    // and if XMLHttpRequest.prototype.onreadystatechange is undefined,
    // we should set a real desc instead a fake one
    if (xhrDesc) {
        api.ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return true;
            }
        });
        var req = new XMLHttpRequest();
        var result = !!req.onreadystatechange;
        // restore original desc
        api.ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, xhrDesc || {});
        return result;
    }
    else {
        var SYMBOL_FAKE_ONREADYSTATECHANGE_1 = api.symbol('fake');
        api.ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return this[SYMBOL_FAKE_ONREADYSTATECHANGE_1];
            },
            set: function (value) {
                this[SYMBOL_FAKE_ONREADYSTATECHANGE_1] = value;
            }
        });
        var req = new XMLHttpRequest();
        var detectFunc = function () { };
        req.onreadystatechange = detectFunc;
        var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
        req.onreadystatechange = null;
        return result;
    }
}
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents(api) {
    var eventNames = api.getGlobalObjects().eventNames;
    var unboundKey = api.symbol('unbound');
    var _loop_1 = function (i) {
        var property = eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = api.wrapWithCurrentZone(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < eventNames.length; i++) {
        _loop_1(i);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function registerElementPatch(_global, api) {
    var _a = api.getGlobalObjects(), isBrowser = _a.isBrowser, isMix = _a.isMix;
    if ((!isBrowser && !isMix) || !('registerElement' in _global.document)) {
        return;
    }
    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
    api.patchCallbacks(api, document, 'Document', 'registerElement', callbacks);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
(function (_global) {
    _global['__zone_symbol__legacyPatch'] = function () {
        var Zone = _global['Zone'];
        Zone.__load_patch('registerElement', function (global, Zone, api) {
            registerElementPatch(global, api);
        });
        Zone.__load_patch('EventTargetLegacy', function (global, Zone, api) {
            eventTargetLegacyPatch(global, api);
            propertyDescriptorLegacyPatch(api, global);
        });
    };
})(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
var taskSymbol = zoneSymbol('zoneTask');
function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    var tasksByHandleId = {};
    function scheduleTask(task) {
        var data = task.data;
        function timer() {
            try {
                task.invoke.apply(this, arguments);
            }
            finally {
                // issue-934, task will be cancelled
                // even it is a periodic task such as
                // setInterval
                if (!(task.data && task.data.isPeriodic)) {
                    if (typeof data.handleId === 'number') {
                        // in non-nodejs env, we remove timerId
                        // from local cache
                        delete tasksByHandleId[data.handleId];
                    }
                    else if (data.handleId) {
                        // Node returns complex objects as handleIds
                        // we remove task reference from timer object
                        data.handleId[taskSymbol] = null;
                    }
                }
            }
        }
        data.args[0] = timer;
        data.handleId = setNative.apply(window, data.args);
        return task;
    }
    function clearTask(task) {
        return clearNative(task.data.handleId);
    }
    setNative =
        patchMethod(window, setName, function (delegate) { return function (self, args) {
            if (typeof args[0] === 'function') {
                var options = {
                    isPeriodic: nameSuffix === 'Interval',
                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 :
                        undefined,
                    args: args
                };
                var task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
                if (!task) {
                    return task;
                }
                // Node.js must additionally support the ref and unref functions.
                var handle = task.data.handleId;
                if (typeof handle === 'number') {
                    // for non nodejs env, we save handleId: task
                    // mapping in local cache for clearTimeout
                    tasksByHandleId[handle] = task;
                }
                else if (handle) {
                    // for nodejs env, we save task
                    // reference in timerId Object for clearTimeout
                    handle[taskSymbol] = task;
                }
                // check whether handle is null, because some polyfill or browser
                // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                    typeof handle.unref === 'function') {
                    task.ref = handle.ref.bind(handle);
                    task.unref = handle.unref.bind(handle);
                }
                if (typeof handle === 'number' || handle) {
                    return handle;
                }
                return task;
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        }; });
    clearNative =
        patchMethod(window, cancelName, function (delegate) { return function (self, args) {
            var id = args[0];
            var task;
            if (typeof id === 'number') {
                // non nodejs env.
                task = tasksByHandleId[id];
            }
            else {
                // nodejs env.
                task = id && id[taskSymbol];
                // other environments.
                if (!task) {
                    task = id;
                }
            }
            if (task && typeof task.type === 'string') {
                if (task.state !== 'notScheduled' &&
                    (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                    if (typeof id === 'number') {
                        delete tasksByHandleId[id];
                    }
                    else if (id) {
                        id[taskSymbol] = null;
                    }
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        }; });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function patchCustomElements(_global, api) {
    var _a = api.getGlobalObjects(), isBrowser = _a.isBrowser, isMix = _a.isMix;
    if ((!isBrowser && !isMix) || !_global['customElements'] || !('customElements' in _global)) {
        return;
    }
    var callbacks = ['connectedCallback', 'disconnectedCallback', 'adoptedCallback', 'attributeChangedCallback'];
    api.patchCallbacks(api, _global.customElements, 'customElements', 'define', callbacks);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function eventTargetPatch(_global, api) {
    if (Zone[api.symbol('patchEventTarget')]) {
        // EventTarget is already patched.
        return;
    }
    var _a = api.getGlobalObjects(), eventNames = _a.eventNames, zoneSymbolEventNames = _a.zoneSymbolEventNames, TRUE_STR = _a.TRUE_STR, FALSE_STR = _a.FALSE_STR, ZONE_SYMBOL_PREFIX = _a.ZONE_SYMBOL_PREFIX;
    //  predefine all __zone_symbol__ + eventName + true/false string
    for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        var falseEventName = eventName + FALSE_STR;
        var trueEventName = eventName + TRUE_STR;
        var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
        var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
        zoneSymbolEventNames[eventName] = {};
        zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
        zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
    }
    var EVENT_TARGET = _global['EventTarget'];
    if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
        return;
    }
    api.patchEventTarget(_global, [EVENT_TARGET && EVENT_TARGET.prototype]);
    return true;
}
function patchEvent$1(global, api) {
    api.patchEventPrototype(global, api);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
Zone.__load_patch('legacy', function (global) {
    var legacyPatch = global[Zone.__symbol__('legacyPatch')];
    if (legacyPatch) {
        legacyPatch();
    }
});
Zone.__load_patch('timers', function (global) {
    var set = 'set';
    var clear = 'clear';
    patchTimer(global, set, clear, 'Timeout');
    patchTimer(global, set, clear, 'Interval');
    patchTimer(global, set, clear, 'Immediate');
});
Zone.__load_patch('requestAnimationFrame', function (global) {
    patchTimer(global, 'request', 'cancel', 'AnimationFrame');
    patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
    patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
});
Zone.__load_patch('blocking', function (global, Zone) {
    var blockingMethods = ['alert', 'prompt', 'confirm'];
    for (var i = 0; i < blockingMethods.length; i++) {
        var name_1 = blockingMethods[i];
        patchMethod(global, name_1, function (delegate, symbol, name) {
            return function (s, args) {
                return Zone.current.run(delegate, global, args, name);
            };
        });
    }
});
Zone.__load_patch('EventTarget', function (global, Zone, api) {
    patchEvent$1(global, api);
    eventTargetPatch(global, api);
    // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
    var XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
        api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
    }
    patchClass('MutationObserver');
    patchClass('WebKitMutationObserver');
    patchClass('IntersectionObserver');
    patchClass('FileReader');
});
Zone.__load_patch('on_property', function (global, Zone, api) {
    propertyDescriptorPatch(api, global);
    propertyPatch();
});
Zone.__load_patch('customElements', function (global, Zone, api) {
    patchCustomElements(global, api);
});
Zone.__load_patch('XHR', function (global, Zone) {
    // Treat XMLHttpRequest as a macrotask.
    patchXHR(global);
    var XHR_TASK = zoneSymbol('xhrTask');
    var XHR_SYNC = zoneSymbol('xhrSync');
    var XHR_LISTENER = zoneSymbol('xhrListener');
    var XHR_SCHEDULED = zoneSymbol('xhrScheduled');
    var XHR_URL = zoneSymbol('xhrURL');
    var XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol('xhrErrorBeforeScheduled');
    function patchXHR(window) {
        var XMLHttpRequest = window['XMLHttpRequest'];
        if (!XMLHttpRequest) {
            // XMLHttpRequest is not available in service worker
            return;
        }
        var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
        function findPendingTask(target) {
            return target[XHR_TASK];
        }
        var oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
        var oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        if (!oriAddListener) {
            var XMLHttpRequestEventTarget_1 = window['XMLHttpRequestEventTarget'];
            if (XMLHttpRequestEventTarget_1) {
                var XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget_1.prototype;
                oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
        }
        var READY_STATE_CHANGE = 'readystatechange';
        var SCHEDULED = 'scheduled';
        function scheduleTask(task) {
            var data = task.data;
            var target = data.target;
            target[XHR_SCHEDULED] = false;
            target[XHR_ERROR_BEFORE_SCHEDULED] = false;
            // remove existing event listener
            var listener = target[XHR_LISTENER];
            if (!oriAddListener) {
                oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
            if (listener) {
                oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
            }
            var newListener = target[XHR_LISTENER] = function () {
                if (target.readyState === target.DONE) {
                    // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                    // readyState=4 multiple times, so we need to check task state here
                    if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
                        // check whether the xhr has registered onload listener
                        // if that is the case, the task should invoke after all
                        // onload listeners finish.
                        var loadTasks = target['__zone_symbol__loadfalse'];
                        if (loadTasks && loadTasks.length > 0) {
                            var oriInvoke_1 = task.invoke;
                            task.invoke = function () {
                                // need to load the tasks again, because in other
                                // load listener, they may remove themselves
                                var loadTasks = target['__zone_symbol__loadfalse'];
                                for (var i = 0; i < loadTasks.length; i++) {
                                    if (loadTasks[i] === task) {
                                        loadTasks.splice(i, 1);
                                    }
                                }
                                if (!data.aborted && task.state === SCHEDULED) {
                                    oriInvoke_1.call(task);
                                }
                            };
                            loadTasks.push(task);
                        }
                        else {
                            task.invoke();
                        }
                    }
                    else if (!data.aborted && target[XHR_SCHEDULED] === false) {
                        // error occurs when xhr.send()
                        target[XHR_ERROR_BEFORE_SCHEDULED] = true;
                    }
                }
            };
            oriAddListener.call(target, READY_STATE_CHANGE, newListener);
            var storedTask = target[XHR_TASK];
            if (!storedTask) {
                target[XHR_TASK] = task;
            }
            sendNative.apply(target, data.args);
            target[XHR_SCHEDULED] = true;
            return task;
        }
        function placeholderCallback() { }
        function clearTask(task) {
            var data = task.data;
            // Note - ideally, we would call data.target.removeEventListener here, but it's too late
            // to prevent it from firing. So instead, we store info for the event listener.
            data.aborted = true;
            return abortNative.apply(data.target, data.args);
        }
        var openNative = patchMethod(XMLHttpRequestPrototype, 'open', function () { return function (self, args) {
            self[XHR_SYNC] = args[2] == false;
            self[XHR_URL] = args[1];
            return openNative.apply(self, args);
        }; });
        var XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
        var fetchTaskAborting = zoneSymbol('fetchTaskAborting');
        var fetchTaskScheduling = zoneSymbol('fetchTaskScheduling');
        var sendNative = patchMethod(XMLHttpRequestPrototype, 'send', function () { return function (self, args) {
            if (Zone.current[fetchTaskScheduling] === true) {
                // a fetch is scheduling, so we are using xhr to polyfill fetch
                // and because we already schedule macroTask for fetch, we should
                // not schedule a macroTask for xhr again
                return sendNative.apply(self, args);
            }
            if (self[XHR_SYNC]) {
                // if the XHR is sync there is no task to schedule, just execute the code.
                return sendNative.apply(self, args);
            }
            else {
                var options = { target: self, url: self[XHR_URL], isPeriodic: false, args: args, aborted: false };
                var task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
                if (self && self[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted &&
                    task.state === SCHEDULED) {
                    // xhr request throw error when send
                    // we should invoke task instead of leaving a scheduled
                    // pending macroTask
                    task.invoke();
                }
            }
        }; });
        var abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', function () { return function (self, args) {
            var task = findPendingTask(self);
            if (task && typeof task.type == 'string') {
                // If the XHR has already completed, do nothing.
                // If the XHR has already been aborted, do nothing.
                // Fix #569, call abort multiple times before done will cause
                // macroTask task count be negative number
                if (task.cancelFn == null || (task.data && task.data.aborted)) {
                    return;
                }
                task.zone.cancelTask(task);
            }
            else if (Zone.current[fetchTaskAborting] === true) {
                // the abort is called from fetch polyfill, we need to call native abort of XHR.
                return abortNative.apply(self, args);
            }
            // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
            // task
            // to cancel. Do nothing.
        }; });
    }
});
Zone.__load_patch('geolocation', function (global) {
    /// GEO_LOCATION
    if (global['navigator'] && global['navigator'].geolocation) {
        patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
    }
});
Zone.__load_patch('PromiseRejectionEvent', function (global, Zone) {
    // handle unhandled promise rejection
    function findPromiseRejectionHandler(evtName) {
        return function (e) {
            var eventTasks = findEventTasks(global, evtName);
            eventTasks.forEach(function (eventTask) {
                // windows has added unhandledrejection event listener
                // trigger the event listener
                var PromiseRejectionEvent = global['PromiseRejectionEvent'];
                if (PromiseRejectionEvent) {
                    var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                    eventTask.invoke(evt);
                }
            });
        };
    }
    if (global['PromiseRejectionEvent']) {
        Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
            findPromiseRejectionHandler('unhandledrejection');
        Zone[zoneSymbol('rejectionHandledHandler')] =
            findPromiseRejectionHandler('rejectionhandled');
    }
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

})));


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
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
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/advanced_actions_dialog/advanced_actions_dialog.css":
/*!*********************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/advanced_actions_dialog.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.new-action-form > * {\n  width: 100%;\n}\n\n.new-action-form {\n  display: flex;\n  flex-direction: column;\n}\n\n.form-text-align {\n  padding: 0 1em;\n}\n\nmd-icon {\n  font-family: 'Material Icons' !important;\n}\n\n.material-icons.blue {\n  color: #3F87F2;\n}\n\n.image-val-action {\n  min-width: 360px;\n  max-height: 100%;\n}\n\n.align-center {\n  display: flex;\n  justify-content: center;\n  margin: 5px;\n}\n\n.margin-5 {\n  margin: 5px;\n}\n\n.phone-canvas-widget {\n  z-index: 1;\n}\n\n.phone-canvas-widget-2 {\n  z-index: 2;\n}\n\n.padding-10 {\n  padding: 10px;\n}\n\n.width-50 {\n  width: 50px;\n}\n\n.width-90 {\n  width: 90px;\n}\n\n.width-300 {\n  width: 300px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWR2YW5jZWRfYWN0aW9uc19kaWFsb2cvYWR2YW5jZWRfYWN0aW9uc19kaWFsb2cuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSx3Q0FBd0M7QUFDMUM7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsWUFBWTtBQUNkIiwiZmlsZSI6InNyYy9hcHAvYWR2YW5jZWRfYWN0aW9uc19kaWFsb2cvYWR2YW5jZWRfYWN0aW9uc19kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5uZXctYWN0aW9uLWZvcm0gPiAqIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5uZXctYWN0aW9uLWZvcm0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uZm9ybS10ZXh0LWFsaWduIHtcbiAgcGFkZGluZzogMCAxZW07XG59XG5cbm1kLWljb24ge1xuICBmb250LWZhbWlseTogJ01hdGVyaWFsIEljb25zJyAhaW1wb3J0YW50O1xufVxuXG4ubWF0ZXJpYWwtaWNvbnMuYmx1ZSB7XG4gIGNvbG9yOiAjM0Y4N0YyO1xufVxuXG4uaW1hZ2UtdmFsLWFjdGlvbiB7XG4gIG1pbi13aWR0aDogMzYwcHg7XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG59XG5cbi5hbGlnbi1jZW50ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luOiA1cHg7XG59XG5cbi5tYXJnaW4tNSB7XG4gIG1hcmdpbjogNXB4O1xufVxuXG4ucGhvbmUtY2FudmFzLXdpZGdldCB7XG4gIHotaW5kZXg6IDE7XG59XG5cbi5waG9uZS1jYW52YXMtd2lkZ2V0LTIge1xuICB6LWluZGV4OiAyO1xufVxuXG4ucGFkZGluZy0xMCB7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi53aWR0aC01MCB7XG4gIHdpZHRoOiA1MHB4O1xufVxuXG4ud2lkdGgtOTAge1xuICB3aWR0aDogOTBweDtcbn1cblxuLndpZHRoLTMwMCB7XG4gIHdpZHRoOiAzMDBweDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/advanced_actions_dialog/advanced_actions_dialog.ts":
/*!********************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/advanced_actions_dialog.ts ***!
  \********************************************************************/
/*! exports provided: AdvancedActionDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvancedActionDialogComponent", function() { return AdvancedActionDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/actions */ "./src/app/constants/actions.ts");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/rect */ "./src/app/constants/rect.ts");
/* harmony import */ var _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/screen_validation_constants */ "./src/app/constants/screen_validation_constants.ts");
/* harmony import */ var _constants_shape__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/shape */ "./src/app/constants/shape.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/control_message_service */ "./src/app/services/control_message_service.ts");
/* harmony import */ var _script_action_info_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./script_action_info_dialog */ "./src/app/advanced_actions_dialog/script_action_info_dialog.ts");
/* harmony import */ var _snippet_action_info_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./snippet_action_info_dialog */ "./src/app/advanced_actions_dialog/snippet_action_info_dialog.ts");
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
        this.CONTENT_MATCH_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["CONTENT_MATCH_TYPES"];
        this.PACKAGE_NAMES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["PACKAGE_NAMES"];
        this.STRATEGY_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["CLICK_STRATEGY_TYPES"];
        this.STOP_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["STOP_TYPES"];
        this.ACTIONS = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"];
        this.ICON_IMAGE_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ICON_IMAGE_TYPES"];
        this.methodNames = [];
        this.isWaitingForMethods = false;
        this.selectedActionType = '';
        this.isNewAction = true;
        this.screenshotImg = new Image();
        this.screenshotScaledWidth = 0;
        this.screenshotScaledHeight = 0;
        this.selectedRegions = [];
        this.regionShapeSelected = '';
        this.advancedActionTypeList = [
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].COMMAND_LINE_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CLICK_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].INPUT_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].REBOOT_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SNIPPET_VALIDATION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCRIPT_EXECUTION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].LOGCAT_VALIDATION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CONDITION_VALIDATION_ACTION,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION,
        ];
        this.validationActionTypeList = [
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.type,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.type,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION.type,
            _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CONDITION_CLICK_ACTION.type,
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
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].COMMAND_LINE_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].COMMAND_LINE_ACTION.type,
            commandLine: '',
            commandlineExecutionTimeoutSec: 5,
            expectedReturnCode: 0,
            delayAfterActionMs: 100,
            isAdbCommand: false,
            needShellOutput: false,
        };
        this.inputActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].INPUT_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].INPUT_ACTION.type,
            isSingleChar: false,
            keyCode: 0,
            inputString: '',
        };
        this.rebootActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].REBOOT_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].REBOOT_ACTION.type,
            onlyReconnectToDevice: false,
            reconnectTimeInSec: 30,
        };
        this.clickActionDetails = {
            name: '',
            // backend will generate details name
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CLICK_ACTION.type,
            isByElement: true,
            strategy: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StrategyType"].TEXT,
            selector: '',
        };
        this.snippetValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SNIPPET_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SNIPPET_VALIDATION_ACTION.type,
            packageName: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["PackageName"].EMPTY_STRING,
            methodName: '',
            argumentsSeparatedByComma: '',
            commandlineExecutionTimeoutSec: 5,
            matchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContentMatchType"].EQUALS,
            textPattern: '',
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StopType"].STOP_TEST_IF_FALSE,
            executeSnippetOnly: false,
        };
        this.scriptExecutionActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCRIPT_EXECUTION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCRIPT_EXECUTION_ACTION.type,
            delayAfterActionMs: 1000,
            actionDescription: '',
            arguments: '',
            scriptCodeContent: '',
            commandlineExecutionTimeoutSec: 5,
        };
        this.imageDiffActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.type,
            diffScoreThreshold: 0.99,
            includeRegion: true,
            refImageUuid: '',
            regions: [],
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StopType"].STOP_TEST_IF_FALSE,
        };
        this.logcatValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].LOGCAT_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].LOGCAT_VALIDATION_ACTION.type,
            actionType: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].LOGCAT_VALIDATION_ACTION.actionType,
            commandLine: '',
            commandlineExecutionTimeoutSec: 5,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            logcatOnly: false,
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StopType"].STOP_TEST_IF_FALSE,
        };
        this.globalVarValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.type,
            actionType: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.actionType,
            expression: '',
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StopType"].STOP_TEST_IF_FALSE,
        };
        this.mlImageValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.type,
            actionType: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.actionType,
            iconImageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["IconImageType"].BLUE_DOT,
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StopType"].STOP_TEST_IF_FALSE,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            selectedText: '',
            selectedType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ElementSelectorType"].RESOURCE_ID,
            selectedBound: new _constants_rect__WEBPACK_IMPORTED_MODULE_7__["Bounds"](0, 0, 0, 0),
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ScreenContentSearchType"].STRICT,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContextStorageType"].TEXT_BASED,
        };
        this.fetchActionDetails = {
            name: '',
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.type,
            strategy: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StrategyType"].POSITION,
            selector: '',
            globalVariableName: '',
            attributeType: '',
            isExportField: true,
            bounds: undefined,
        };
        this.conditionValidationAction = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CONDITION_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CONDITION_VALIDATION_ACTION.type,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StopType"].STOP_TEST_IF_FALSE,
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
        };
        this.screenContentValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.type,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StopType"].STOP_TEST_IF_FALSE,
            selectedText: '',
            selectedType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ElementSelectorType"].RESOURCE_ID,
            selectedBound: new _constants_rect__WEBPACK_IMPORTED_MODULE_7__["Bounds"](0, 0, 0, 0),
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ScreenContentSearchType"].STRICT,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContextStorageType"].TEXT_BASED,
        };
        this.scrollScreenContentValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.type,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StopType"].STOP_TEST_IF_FALSE,
            selectedText: '',
            selectedType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ElementSelectorType"].RESOURCE_ID,
            selectedBound: new _constants_rect__WEBPACK_IMPORTED_MODULE_7__["Bounds"](0, 0, 0, 0),
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ScreenContentSearchType"].STRICT,
            scrollOrientation: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["DirectionType"].UP,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContextStorageType"].TEXT_BASED,
            scrollMaxNumber: 30,
        };
        this.loopScreenContentValidationActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.type,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StopType"].STOP_TEST_IF_FALSE,
            selectedText: '',
            selectedType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ElementSelectorType"].RESOURCE_ID,
            selectedBound: new _constants_rect__WEBPACK_IMPORTED_MODULE_7__["Bounds"](0, 0, 0, 0),
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ScreenContentSearchType"].STRICT,
            waitUntilDisappear: false,
            timeout: 0,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContextStorageType"].TEXT_BASED,
        };
        this.conditionClickActionDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.shortName,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.type,
            textValidator: {
                contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContentMatchType"].EQUALS,
                patternValue: '',
            },
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StopType"].STOP_TEST_IF_FALSE,
            selectedText: '',
            selectedType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ElementSelectorType"].RESOURCE_ID,
            selectedBound: new _constants_rect__WEBPACK_IMPORTED_MODULE_7__["Bounds"](0, 0, 0, 0),
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ScreenContentSearchType"].STRICT,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContextStorageType"].TEXT_BASED,
        };
        this.validationRequestDetails = {
            actionType: '',
            contentData: '',
            selectedBounds: undefined,
            contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContentMatchType"].EQUALS,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ContextStorageType"].TEXT_BASED,
            elementSelectorType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ElementSelectorType"].DISPLAY_TEXT,
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ScreenContentSearchType"].AROUND,
            scrollDirectionType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["DirectionType"].UP,
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["StopType"].STOP_TEST_IF_FALSE,
            timeout: 60,
            waitUntilDisappear: false
        };
        this.doubleTapPowerButtonDetails = {
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION.shortName,
            actionType: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION.type,
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION.type,
        };
        /** Handle on-destroy Subject, used to unsubscribe. */
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
    }
    AdvancedActionDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.data) {
            this.isNewAction = false;
            // Set details for the selected action.
            switch (this.data.actionType) {
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].COMMAND_LINE_ACTION.actionType:
                    this.commandLineActionDetails = this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].COMMAND_LINE_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].INPUT_ACTION.actionType:
                    this.inputActionDetails = this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].INPUT_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CLICK_ACTION.actionType:
                    this.clickActionDetails = this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CLICK_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].REBOOT_ACTION.actionType:
                    this.rebootActionDetails = this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].REBOOT_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SNIPPET_VALIDATION_ACTION.actionType:
                    this.snippetValidationActionDetails =
                        this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SNIPPET_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCRIPT_EXECUTION_ACTION.actionType:
                    this.scriptExecutionActionDetails =
                        this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCRIPT_EXECUTION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.actionType:
                    this.imageDiffActionDetails = this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].LOGCAT_VALIDATION_ACTION.actionType:
                    this.logcatValidationActionDetails =
                        this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].LOGCAT_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.actionType:
                    this.globalVarValidationActionDetails =
                        this.data;
                    this.selectedActionType =
                        _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.actionType:
                    this.fetchActionDetails = this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.actionType:
                    this.screenContentValidationActionDetails =
                        this.data;
                    this.convertToValidationRequest(this.screenContentValidationActionDetails);
                    this.selectedActionType =
                        _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.actionType:
                    this.scrollScreenContentValidationActionDetails =
                        this.data;
                    this.convertToValidationRequest(this.scrollScreenContentValidationActionDetails);
                    this.selectedActionType =
                        _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION.actionType:
                    this.loopScreenContentValidationActionDetails =
                        this.data;
                    this.convertToValidationRequest(this.loopScreenContentValidationActionDetails);
                    this.selectedActionType =
                        _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CONDITION_CLICK_ACTION.actionType:
                    this.conditionClickActionDetails =
                        this.data;
                    this.convertToValidationRequest(this.conditionClickActionDetails);
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CONDITION_CLICK_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.actionType:
                    this.mlImageValidationActionDetails =
                        this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CONDITION_VALIDATION_ACTION.actionType:
                    this.conditionValidationAction =
                        this.data;
                    this.conditionValidationAction.query = JSON.parse(JSON.stringify(this.conditionValidationAction.query), function (k, v) {
                        return v === 'true' ? true : v === 'false' ? false : v;
                    });
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CONDITION_VALIDATION_ACTION.type;
                    break;
                case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION.actionType:
                    this.doubleTapPowerButtonDetails =
                        this.data;
                    this.selectedActionType = _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION.type;
                    break;
                default:
                    break;
            }
        }
        this.backendManagerService.getScaledScreenDimensions()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.screenshotScaledWidth = data.width;
            _this.screenshotScaledHeight = data.height;
        });
    };
    AdvancedActionDialogComponent.prototype.ngOnDestroy = function () {
        // Unsubscribes all pending subscriptions.
        this.destroyed.next();
    };
    AdvancedActionDialogComponent.prototype.saveAction = function () {
        var _this = this;
        var actionData = this.commandLineActionDetails;
        switch (this.selectedActionType) {
            // Save details for regular actions.
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].COMMAND_LINE_ACTION.type:
                actionData = this.commandLineActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CLICK_ACTION.type:
                actionData = this.clickActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].INPUT_ACTION.type:
                actionData = this.inputActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].REBOOT_ACTION.type:
                actionData = this.rebootActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SNIPPET_VALIDATION_ACTION.type:
                actionData = this.snippetValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCRIPT_EXECUTION_ACTION.type:
                actionData = this.scriptExecutionActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].LOGCAT_VALIDATION_ACTION.type:
                actionData = this.logcatValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.type:
                actionData = this.imageDiffActionDetails;
                this.saveImageDiffAction(actionData);
                return;
            // Save details for validations.
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.type:
                actionData = this.globalVarValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.type:
                actionData = this.mlImageValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.type:
                actionData = this.fetchActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.type:
                actionData = this.screenContentValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.type:
                actionData = this.scrollScreenContentValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION.type:
                actionData = this.loopScreenContentValidationActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CONDITION_CLICK_ACTION.type:
                actionData = this.conditionClickActionDetails;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CONDITION_VALIDATION_ACTION.type:
                actionData = this.conditionValidationAction;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].DOUBLE_TAP_POWER_BUTTON_ACTION.type:
                actionData = this.doubleTapPowerButtonDetails;
                break;
            default:
                break;
        }
        if (this.isNewAction) {
            this.backendManagerService.addActionToWorkflow(actionData)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
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
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
                    .subscribe(function () {
                    _this.controlMessageService.sendRefreshWorkflowMsg();
                    _this.closeDialog(true);
                });
            }
            else {
                this.backendManagerService.updateActionMetadata(actionData)
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
                    .subscribe(function () {
                    _this.controlMessageService.sendRefreshWorkflowMsg();
                    _this.closeDialog(true);
                });
            }
        }
    };
    AdvancedActionDialogComponent.prototype.convertToValidationRequest = function (action) {
        switch (action.actionType) {
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.actionType:
                this.validationRequestDetails.actionType =
                    _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ValidationActionType"].SCREEN_CONTENT_VALIDATION_ACTION;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.actionType:
                this.validationRequestDetails.actionType =
                    _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ValidationActionType"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION.actionType:
                this.validationRequestDetails.actionType =
                    _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ValidationActionType"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION;
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].CONDITION_CLICK_ACTION.actionType:
                this.validationRequestDetails.actionType =
                    _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_8__["ValidationActionType"].CONDITION_CLICK_ACTION;
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
        if (this.selectedActionType === _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.type) {
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
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
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
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SNIPPET_VALIDATION_ACTION.type:
                this.dialog.open(_snippet_action_info_dialog__WEBPACK_IMPORTED_MODULE_13__["SnippetActionInfoDialogComponent"], {
                    width: _constants_constants__WEBPACK_IMPORTED_MODULE_6__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
                });
                break;
            case _constants_actions__WEBPACK_IMPORTED_MODULE_5__["ACTIONS"].SCRIPT_EXECUTION_ACTION.type:
                this.dialog.open(_script_action_info_dialog__WEBPACK_IMPORTED_MODULE_12__["ScriptActionInfoDialogComponent"], {
                    width: _constants_constants__WEBPACK_IMPORTED_MODULE_6__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
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
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
                _this.imageDiffActionDetails.refImageUuid = data.uuid;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["concatMap"])(function (data) { return _this.backendManagerService.getScaledRegions(_this.selectedRegions); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
                _this.imageDiffActionDetails.regions = data;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["concatMap"])(function (data) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["iif"])(function () { return _this.isNewAction; }, _this.backendManagerService.addActionToWorkflow(actionData), _this.backendManagerService.updateActionMetadata(actionData));
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
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
                    this.selectedRegions.push(new _constants_shape__WEBPACK_IMPORTED_MODULE_9__["Rectangle"](ShapeType.RECTANGULAR, originX, originY, event.deltaX, event.deltaY));
                    break;
                case 'Circle':
                    var centerX = event.srcEvent.offsetX - (event.deltaX / 2);
                    var centerY = event.srcEvent.offsetY - (event.deltaY / 2);
                    ctx.arc(centerX, centerY, event.deltaX / 2, 0, Math.PI * 2);
                    this.selectedRegions.push(new _constants_shape__WEBPACK_IMPORTED_MODULE_9__["Circle"](ShapeType.CIRCULAR, centerX, centerY, event.deltaX / 2));
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
            if (lastSelectedRegion instanceof _constants_shape__WEBPACK_IMPORTED_MODULE_9__["Circle"]) {
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
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_10__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_11__["ControlMessageService"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('screenshot', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], AdvancedActionDialogComponent.prototype, "screenshot", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('regionCanvas', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], AdvancedActionDialogComponent.prototype, "regionCanvas", void 0);
    AdvancedActionDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'advanced-actions-dialog',
            template: __webpack_require__(/*! raw-loader!./advanced_actions_dialog.ng.html */ "./node_modules/raw-loader/index.js!./src/app/advanced_actions_dialog/advanced_actions_dialog.ng.html"),
            styles: [__webpack_require__(/*! ./advanced_actions_dialog.css */ "./src/app/advanced_actions_dialog/advanced_actions_dialog.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_10__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_11__["ControlMessageService"], Object])
    ], AdvancedActionDialogComponent);
    return AdvancedActionDialogComponent;
}());



/***/ }),

/***/ "./src/app/advanced_actions_dialog/advanced_actions_dialog_module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/advanced_actions_dialog_module.ts ***!
  \***************************************************************************/
/*! exports provided: AdvancedActionsDialogModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvancedActionsDialogModule", function() { return AdvancedActionsDialogModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/esm5/button-toggle.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var angular2_query_builder__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! angular2-query-builder */ "./node_modules/angular2-query-builder/dist/index.js");
/* harmony import */ var _screen_validation_flow_screen_validation_flow_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../screen_validation_flow/screen_validation_flow_module */ "./src/app/screen_validation_flow/screen_validation_flow_module.ts");
/* harmony import */ var _advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./advanced_actions_dialog */ "./src/app/advanced_actions_dialog/advanced_actions_dialog.ts");
/* harmony import */ var _script_action_info_dialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./script_action_info_dialog */ "./src/app/advanced_actions_dialog/script_action_info_dialog.ts");
/* harmony import */ var _snippet_action_info_dialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./snippet_action_info_dialog */ "./src/app/advanced_actions_dialog/snippet_action_info_dialog.ts");
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























var AdvancedActionsDialogModule = /** @class */ (function () {
    function AdvancedActionsDialogModule() {
    }
    AdvancedActionsDialogModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_20__["AdvancedActionDialogComponent"],
                _snippet_action_info_dialog__WEBPACK_IMPORTED_MODULE_22__["SnippetActionInfoDialogComponent"],
                _script_action_info_dialog__WEBPACK_IMPORTED_MODULE_21__["ScriptActionInfoDialogComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["BrowserAnimationsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_5__["MatButtonToggleModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__["MatCheckboxModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_8__["MatChipsModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_14__["MatRadioModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MatOptionModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_15__["MatSelectModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_13__["MatProgressBarModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                angular2_query_builder__WEBPACK_IMPORTED_MODULE_18__["QueryBuilderModule"],
                _screen_validation_flow_screen_validation_flow_module__WEBPACK_IMPORTED_MODULE_19__["ScreenValidationFlowModule"],
            ],
            exports: [_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_20__["AdvancedActionDialogComponent"]],
        })
    ], AdvancedActionsDialogModule);
    return AdvancedActionsDialogModule;
}());



/***/ }),

/***/ "./src/app/advanced_actions_dialog/script_action_info_dialog.css":
/*!***********************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/script_action_info_dialog.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.info-table {\n    width: 100%;\n    display: table;\n    border-collapse: collapse;\n    border-spacing: 0;\n}\n\n.info-table tr {\n    border-bottom: 1px solid rgba(0,0,0,0.12);\n}\n\n.info-table td:nth-child(2) {\n    border-left: 1px solid rgba(0,0,0,0.12);\n    max-width: 400px;\n}\n\n.info-table td:nth-child(1) {\n    min-width: 150px;\n}\n\n.foot-note {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWR2YW5jZWRfYWN0aW9uc19kaWFsb2cvc2NyaXB0X2FjdGlvbl9pbmZvX2RpYWxvZy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7SUFDSSxXQUFXO0lBQ1gsY0FBYztJQUNkLHlCQUF5QjtJQUN6QixpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSx5Q0FBeUM7QUFDN0M7O0FBRUE7SUFDSSx1Q0FBdUM7SUFDdkMsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLG1CQUFtQjtBQUN2QiIsImZpbGUiOiJzcmMvYXBwL2FkdmFuY2VkX2FjdGlvbnNfZGlhbG9nL3NjcmlwdF9hY3Rpb25faW5mb19kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5pbmZvLXRhYmxlIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICAgIGJvcmRlci1zcGFjaW5nOiAwO1xufVxuLmluZm8tdGFibGUgdHIge1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMTIpO1xufVxuXG4uaW5mby10YWJsZSB0ZDpudGgtY2hpbGQoMikge1xuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgcmdiYSgwLDAsMCwwLjEyKTtcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuXG4uaW5mby10YWJsZSB0ZDpudGgtY2hpbGQoMSkge1xuICAgIG1pbi13aWR0aDogMTUwcHg7XG59XG5cbi5mb290LW5vdGUge1xuICAgIG1hcmdpbi10b3A6IDE1cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/advanced_actions_dialog/script_action_info_dialog.ts":
/*!**********************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/script_action_info_dialog.ts ***!
  \**********************************************************************/
/*! exports provided: ScriptActionInfoDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptActionInfoDialogComponent", function() { return ScriptActionInfoDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
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
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] }
    ]; };
    ScriptActionInfoDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'script_action_info_dialog',
            template: __webpack_require__(/*! raw-loader!./script_action_info_dialog.ng.html */ "./node_modules/raw-loader/index.js!./src/app/advanced_actions_dialog/script_action_info_dialog.ng.html"),
            styles: [__webpack_require__(/*! ./script_action_info_dialog.css */ "./src/app/advanced_actions_dialog/script_action_info_dialog.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], ScriptActionInfoDialogComponent);
    return ScriptActionInfoDialogComponent;
}());



/***/ }),

/***/ "./src/app/advanced_actions_dialog/snippet_action_info_dialog.css":
/*!************************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/snippet_action_info_dialog.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.info-table {\n  width: 100%;\n  display: table;\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.info-table tr {\n  border-bottom: 1px solid rgba(0,0,0,0.12);\n}\n\n.info-table td:nth-child(2) {\n  border-left: 1px solid rgba(0,0,0,0.12);\n  max-width: 400px;\n}\n\n.info-table td:nth-child(1) {\n\n  min-width: 150px;\n}\n\n.foot-note {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWR2YW5jZWRfYWN0aW9uc19kaWFsb2cvc25pcHBldF9hY3Rpb25faW5mb19kaWFsb2cuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0VBQ0UsV0FBVztFQUNYLGNBQWM7RUFDZCx5QkFBeUI7RUFDekIsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsdUNBQXVDO0VBQ3ZDLGdCQUFnQjtBQUNsQjs7QUFFQTs7RUFFRSxnQkFBZ0I7QUFDbEI7O0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCIiwiZmlsZSI6InNyYy9hcHAvYWR2YW5jZWRfYWN0aW9uc19kaWFsb2cvc25pcHBldF9hY3Rpb25faW5mb19kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5pbmZvLXRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IHRhYmxlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBib3JkZXItc3BhY2luZzogMDtcbn1cbi5pbmZvLXRhYmxlIHRyIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4xMik7XG59XG5cbi5pbmZvLXRhYmxlIHRkOm50aC1jaGlsZCgyKSB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgcmdiYSgwLDAsMCwwLjEyKTtcbiAgbWF4LXdpZHRoOiA0MDBweDtcbn1cblxuLmluZm8tdGFibGUgdGQ6bnRoLWNoaWxkKDEpIHtcblxuICBtaW4td2lkdGg6IDE1MHB4O1xufVxuLmZvb3Qtbm90ZSB7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/advanced_actions_dialog/snippet_action_info_dialog.ts":
/*!***********************************************************************!*\
  !*** ./src/app/advanced_actions_dialog/snippet_action_info_dialog.ts ***!
  \***********************************************************************/
/*! exports provided: SnippetActionInfoDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnippetActionInfoDialogComponent", function() { return SnippetActionInfoDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
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
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] }
    ]; };
    SnippetActionInfoDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'snippet_action_info_dialog',
            template: __webpack_require__(/*! raw-loader!./snippet_action_info_dialog.ng.html */ "./node_modules/raw-loader/index.js!./src/app/advanced_actions_dialog/snippet_action_info_dialog.ng.html"),
            styles: [__webpack_require__(/*! ./snippet_action_info_dialog.css */ "./src/app/advanced_actions_dialog/snippet_action_info_dialog.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], SnippetActionInfoDialogComponent);
    return SnippetActionInfoDialogComponent;
}());



/***/ }),

/***/ "./src/app/app.css":
/*!*************************!*\
  !*** ./src/app/app.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.bloc {\n  height: 100%;\n}\n\n.explanations {\n  padding: 15px;\n}\n\n.panel {\n  font-size: 100px;\n  font-weight: bold;\n  color: #cccccc;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  overflow: hidden;\n}\n\n.panel > p {\n  margin: 0;\n}\n\nbutton {\n  margin-bottom: 10px;\n}\n\n.example-sidenav-fab-container {\n  width: 500px;\n  height: 300px;\n  border: 1px solid rgba(0, 0, 0, 0.5);\n}\n\n.example-sidenav-fab-container md-sidenav {\n  max-width: 200px;\n}\n\n.example-sidenav-fab-container .mat-sidenav-content,\n.example-sidenav-fab-container md-sidenav {\n  display: flex;\n  overflow: visible;\n}\n\n.example-scrolling-content {\n  overflow: auto;\n  height: 100%;\n}\n\n.example-fab.mat-mini-fab {\n  position: absolute;\n  right: 20px;\n  bottom: 10px;\n}\n\n.main-container {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  height: 100%;\n}\n\n.main-body {\n  flex:1;\n  display: flex;\n}\n\n.sidevar-container {\n  flex:1;\n}\n\n.record-btn {\n  position: relative;\n  bottom: 50px;\n  left: 30px;\n  z-index: 2;\n}\n\n.main-col-container{\n  display: flex;\n}\n\n.main-col-middle{\n  display: 1;\n  width:700px;\n  background-color: #f5f5f5;\n}\n\n.main-col-right{\n  min-width: 300px;\n  background-color: #f5f5f5;\n}\n\n.main-container .main-toolbar {\n  background-color: #28a6da;\n}\n\n.device-prepare-overlay{\n  background-color:gray;\n  width: 100%;\n  height: 100%;\n  opacity: 0.5;\n  z-index: 99;\n  position: absolute;\n  top: 0px;\n}\n\n.device-prepare-overlay-progressbar {\n  width: 400px;\n   left: 45%;\n  top: 50%;\n}\n\n.handle-row {\n  width: 15px;\n  top: 50%;\n  left: -2px;\n  transform: translateX(-50%) rotate(270deg);\n  cursor: col-resize;;\n}\n\n.handle-column {\n  height: 15px;\n  left: 50%;\n  top: -4px;\n  cursor: row-resize;\n}\n\n.uicd-column-splitter{\n\n  background-color: #e5e5e5;\n  cursor: col-resize;\n  width: 8px;\n}\n\n.uicd-column-breaker {\n  cursor: column-resize;\n  background-color: #e5e5e5;\n  width: 3px;\n}\n\n.uicd-row-splitter{\n  background-color: #e5e5e5;\n  cursor: row-resize;\n  height: 8px;\n}\n\n.handle {\n  outline: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none;\n  z-index: 9999;\n  height: 5px;\n  display: block;\n  padding: 0;\n  margin: 0;\n  position: relative;\n  line-height: 0;\n}\n\n.footer-div {\n  background-color: #f5f5f5;\n  position: relative;\n}\n\n.footer-content {\n  position: absolute;\n  left: 50%;\n}\n\n.mat-tab-header {\n  background-color: #f5f5f5;\n}\n\n.toolbar-icon {\n  padding: 0 14px;\n}\n\n.toolbar-spacer {\n  flex: 1 1 auto;\n}\n\n.test-case-wrapper {\n  display: flex;\n  height: 100%;\n}\n\n.log-area-wrapper {\n  display: flex;\n  height: 500px;\n  width: 100%;\n}\n\n.recorder-area-wrapper {\n  display: flex;\n  height: 500px;\n}\n\n.workspace-log-splitter {\n  overflow: hidden !important;\n}\n\n.split-body {\n  display: flex;\n  overflow: auto;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtFQUNFLGNBQWM7RUFDZCxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2QsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFDQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBOztFQUVFLGFBQWE7RUFDYixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsWUFBWTtBQUNkOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxNQUFNO0VBQ04sYUFBYTtBQUNmOztBQUNBO0VBQ0UsTUFBTTtBQUNSOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixVQUFVO0VBQ1YsVUFBVTtBQUNaOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsVUFBVTtFQUNWLFdBQVc7RUFDWCx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLFdBQVc7RUFDWCxZQUFZO0VBQ1osWUFBWTtFQUNaLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsUUFBUTtBQUNWOztBQUVBO0VBQ0UsWUFBWTtHQUNYLFNBQVM7RUFDVixRQUFRO0FBQ1Y7O0FBQ0E7RUFDRSxXQUFXO0VBQ1gsUUFBUTtFQUNSLFVBQVU7RUFDViwwQ0FBMEM7RUFDMUMsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFNBQVM7RUFDVCxTQUFTO0VBQ1Qsa0JBQWtCO0FBQ3BCOztBQUVBOztFQUVFLHlCQUF5QjtFQUN6QixrQkFBa0I7RUFDbEIsVUFBVTtBQUNaOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLHlCQUF5QjtFQUN6QixVQUFVO0FBQ1o7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7RUFDYix5QkFBeUI7RUFDekIsc0JBQWlCO0dBQWpCLHFCQUFpQjtPQUFqQixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLFdBQVc7RUFDWCxjQUFjO0VBQ2QsVUFBVTtFQUNWLFNBQVM7RUFDVCxrQkFBa0I7RUFDbEIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztBQUNYOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsYUFBYTtBQUNmOztBQUVBO0VBQ0UsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7QUFDaEIiLCJmaWxlIjoic3JjL2FwcC9hcHAuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5ibG9jIHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uZXhwbGFuYXRpb25zIHtcbiAgcGFkZGluZzogMTVweDtcbn1cblxuLnBhbmVsIHtcbiAgZm9udC1zaXplOiAxMDBweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiAjY2NjY2NjO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4ucGFuZWwgPiBwIHtcbiAgbWFyZ2luOiAwO1xufVxuYnV0dG9uIHtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLmV4YW1wbGUtc2lkZW5hdi1mYWItY29udGFpbmVyIHtcbiAgd2lkdGg6IDUwMHB4O1xuICBoZWlnaHQ6IDMwMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuNSk7XG59XG5cbi5leGFtcGxlLXNpZGVuYXYtZmFiLWNvbnRhaW5lciBtZC1zaWRlbmF2IHtcbiAgbWF4LXdpZHRoOiAyMDBweDtcbn1cblxuLmV4YW1wbGUtc2lkZW5hdi1mYWItY29udGFpbmVyIC5tYXQtc2lkZW5hdi1jb250ZW50LFxuLmV4YW1wbGUtc2lkZW5hdi1mYWItY29udGFpbmVyIG1kLXNpZGVuYXYge1xuICBkaXNwbGF5OiBmbGV4O1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbn1cblxuLmV4YW1wbGUtc2Nyb2xsaW5nLWNvbnRlbnQge1xuICBvdmVyZmxvdzogYXV0bztcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uZXhhbXBsZS1mYWIubWF0LW1pbmktZmFiIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMjBweDtcbiAgYm90dG9tOiAxMHB4O1xufVxuXG4ubWFpbi1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4ubWFpbi1ib2R5IHtcbiAgZmxleDoxO1xuICBkaXNwbGF5OiBmbGV4O1xufVxuLnNpZGV2YXItY29udGFpbmVyIHtcbiAgZmxleDoxO1xufVxuXG4ucmVjb3JkLWJ0biB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm90dG9tOiA1MHB4O1xuICBsZWZ0OiAzMHB4O1xuICB6LWluZGV4OiAyO1xufVxuXG4ubWFpbi1jb2wtY29udGFpbmVye1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4ubWFpbi1jb2wtbWlkZGxle1xuICBkaXNwbGF5OiAxO1xuICB3aWR0aDo3MDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcbn1cblxuLm1haW4tY29sLXJpZ2h0e1xuICBtaW4td2lkdGg6IDMwMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xufVxuXG4ubWFpbi1jb250YWluZXIgLm1haW4tdG9vbGJhciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyOGE2ZGE7XG59XG5cbi5kZXZpY2UtcHJlcGFyZS1vdmVybGF5e1xuICBiYWNrZ3JvdW5kLWNvbG9yOmdyYXk7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9wYWNpdHk6IDAuNTtcbiAgei1pbmRleDogOTk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwcHg7XG59XG5cbi5kZXZpY2UtcHJlcGFyZS1vdmVybGF5LXByb2dyZXNzYmFyIHtcbiAgd2lkdGg6IDQwMHB4O1xuICAgbGVmdDogNDUlO1xuICB0b3A6IDUwJTtcbn1cbi5oYW5kbGUtcm93IHtcbiAgd2lkdGg6IDE1cHg7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiAtMnB4O1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKDI3MGRlZyk7XG4gIGN1cnNvcjogY29sLXJlc2l6ZTs7XG59XG5cbi5oYW5kbGUtY29sdW1uIHtcbiAgaGVpZ2h0OiAxNXB4O1xuICBsZWZ0OiA1MCU7XG4gIHRvcDogLTRweDtcbiAgY3Vyc29yOiByb3ctcmVzaXplO1xufVxuXG4udWljZC1jb2x1bW4tc3BsaXR0ZXJ7XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZTVlNTtcbiAgY3Vyc29yOiBjb2wtcmVzaXplO1xuICB3aWR0aDogOHB4O1xufVxuXG4udWljZC1jb2x1bW4tYnJlYWtlciB7XG4gIGN1cnNvcjogY29sdW1uLXJlc2l6ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZTVlNTtcbiAgd2lkdGg6IDNweDtcbn1cblxuLnVpY2Qtcm93LXNwbGl0dGVye1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTVlNWU1O1xuICBjdXJzb3I6IHJvdy1yZXNpemU7XG4gIGhlaWdodDogOHB4O1xufVxuXG4uaGFuZGxlIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHotaW5kZXg6IDk5OTk7XG4gIGhlaWdodDogNXB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxpbmUtaGVpZ2h0OiAwO1xufVxuXG4uZm9vdGVyLWRpdiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmZvb3Rlci1jb250ZW50IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA1MCU7XG59XG5cbi5tYXQtdGFiLWhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XG59XG5cbi50b29sYmFyLWljb24ge1xuICBwYWRkaW5nOiAwIDE0cHg7XG59XG5cbi50b29sYmFyLXNwYWNlciB7XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuXG4udGVzdC1jYXNlLXdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5sb2ctYXJlYS13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiA1MDBweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5yZWNvcmRlci1hcmVhLXdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDUwMHB4O1xufVxuXG4ud29ya3NwYWNlLWxvZy1zcGxpdHRlciB7XG4gIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDtcbn1cblxuLnNwbGl0LWJvZHkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBvdmVyZmxvdzogYXV0bztcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.ts":
/*!************************!*\
  !*** ./src/app/app.ts ***!
  \************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _popup_dialogs_choose_device_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./popup_dialogs/choose_device_dialog */ "./src/app/popup_dialogs/choose_device_dialog.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/control_message_service */ "./src/app/services/control_message_service.ts");
/* harmony import */ var _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/devices_manager_service */ "./src/app/services/devices_manager_service.ts");
/* harmony import */ var _services_log_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/log_service */ "./src/app/services/log_service.ts");
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
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // if have inited devices, don't show dialog
        this.backendManagerService.getInitedDevices()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (msg) {
            return msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_5__["MessageTypes"].REFRESH_OVERLAY;
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
        this.devicesManagerService.setInitedDevices(data.deviceStatusList.map(function (item) { return new _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_9__["DeviceInfo"](JSON.stringify(item)); }));
        this.devicesManagerService.updateCurrentDevice(this.devicesManagerService.getInitedDevices()[0].deviceId);
    };
    AppComponent.prototype.openDevicePickerDialog = function () {
        var _this = this;
        var dialog = this.dialog.open(_popup_dialogs_choose_device_dialog__WEBPACK_IMPORTED_MODULE_6__["ChooseDeviceDialogComponent"], {
            height: _constants_constants__WEBPACK_IMPORTED_MODULE_5__["POPUP_DIALOG_DEFAULT_DIMENSION"].height,
            width: _constants_constants__WEBPACK_IMPORTED_MODULE_5__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
        });
        dialog.afterClosed()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (selection) { return _this.selectAndInitDevices(selection); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.initDeviceManagerService(data);
            //   this.devicePrepareLoading = false;
        });
    };
    AppComponent.prototype.selectAndInitDevices = function (selection) {
        if (!selection)
            return rxjs__WEBPACK_IMPORTED_MODULE_3__["EMPTY"];
        this.devicePrepareLoading = true;
        return this.backendManagerService
            .initDevicesFromListV2(selection.join(), true)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1));
    };
    AppComponent.prototype.softRestart = function () {
        var _this = this;
        this.backendManagerService.softRestart()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            _this.devicePrepareLoading = true;
            return err.statusText;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
            .subscribe(function () { });
        // After call the softRestart, backend service will be restarted, we need
        // use validateUicdBackendConnection api with retryWhen operator to check
        // whether backend is ready to serve the frontend request. Normally the
        // backend will be back online in 2-3 seconds.
        var retryCnt = 0;
        this.backendManagerService.validateUicdBackendConnection()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["delay"])(2000), // wait 2 seconds, otherwise
        // validateUicdBackendConnection might be handled
        // faster than softRestart request.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["retryWhen"])(function (errors) { return errors.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["delay"])(2000), // retry every 2 seconds
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(10), // retry 10 times
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function () {
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
        this.showUiTree = (e.index === _constants_constants__WEBPACK_IMPORTED_MODULE_5__["BottomMenuTabs"].UI_VIEWER);
    };
    AppComponent.prototype.versionInfo = function () {
        this.backendManagerService.getVersionInfo()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
            .subscribe(function (versionInfo) {
            window.alert("UIConductor Backend Version: " + versionInfo.backendVersion + "\n          '\nXmlDumper APK Version: " + versionInfo.xmlDumperVersion);
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        // Unsubscribes all pending subscriptions.
        this.destroyed.next();
    };
    AppComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
        { type: _services_log_service__WEBPACK_IMPORTED_MODULE_10__["LogService"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_8__["ControlMessageService"] },
        { type: _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_9__["DevicesManagerService"] }
    ]; };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.ng.html */ "./node_modules/raw-loader/index.js!./src/app/app.ng.html"),
            styles: [__webpack_require__(/*! ./app.css */ "./src/app/app.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _services_log_service__WEBPACK_IMPORTED_MODULE_10__["LogService"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_8__["ControlMessageService"],
            _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_9__["DevicesManagerService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app_module.ts":
/*!*******************************!*\
  !*** ./src/app/app_module.ts ***!
  \*******************************/
/*! exports provided: UicdHammerConfig, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UicdHammerConfig", function() { return UicdHammerConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm5/grid-list.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/esm5/sidenav.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/esm5/stepper.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var angular_split__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! angular-split */ "./node_modules/angular-split/fesm5/angular-split.js");
/* harmony import */ var _advanced_actions_dialog_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./advanced_actions_dialog/advanced_actions_dialog */ "./src/app/advanced_actions_dialog/advanced_actions_dialog.ts");
/* harmony import */ var _advanced_actions_dialog_advanced_actions_dialog_module__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./advanced_actions_dialog/advanced_actions_dialog_module */ "./src/app/advanced_actions_dialog/advanced_actions_dialog_module.ts");
/* harmony import */ var _advanced_actions_dialog_script_action_info_dialog__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./advanced_actions_dialog/script_action_info_dialog */ "./src/app/advanced_actions_dialog/script_action_info_dialog.ts");
/* harmony import */ var _advanced_actions_dialog_snippet_action_info_dialog__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./advanced_actions_dialog/snippet_action_info_dialog */ "./src/app/advanced_actions_dialog/snippet_action_info_dialog.ts");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./app */ "./src/app/app.ts");
/* harmony import */ var _device_manager_device_manager_module__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./device_manager/device_manager_module */ "./src/app/device_manager/device_manager_module.ts");
/* harmony import */ var _log_panel_log_panel_module__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./log_panel/log_panel_module */ "./src/app/log_panel/log_panel_module.ts");
/* harmony import */ var _popup_dialogs_choose_device_dialog__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./popup_dialogs/choose_device_dialog */ "./src/app/popup_dialogs/choose_device_dialog.ts");
/* harmony import */ var _popup_dialogs_dialogs_module__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./popup_dialogs/dialogs_module */ "./src/app/popup_dialogs/dialogs_module.ts");
/* harmony import */ var _popup_dialogs_global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./popup_dialogs/global_var_setting_dialog */ "./src/app/popup_dialogs/global_var_setting_dialog.ts");
/* harmony import */ var _popup_dialogs_history_dialog__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./popup_dialogs/history_dialog */ "./src/app/popup_dialogs/history_dialog.ts");
/* harmony import */ var _popup_dialogs_replay_details_dialog__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./popup_dialogs/replay_details_dialog */ "./src/app/popup_dialogs/replay_details_dialog.ts");
/* harmony import */ var _screen_cast_screen_cast_module__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./screen_cast/screen_cast_module */ "./src/app/screen_cast/screen_cast_module.ts");
/* harmony import */ var _screen_validation_flow_screen_validation_flow__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./screen_validation_flow/screen_validation_flow */ "./src/app/screen_validation_flow/screen_validation_flow.ts");
/* harmony import */ var _screen_validation_flow_screen_validation_flow_module__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./screen_validation_flow/screen_validation_flow_module */ "./src/app/screen_validation_flow/screen_validation_flow_module.ts");
/* harmony import */ var _screen_validation_flow_validation_info__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./screen_validation_flow/validation_info */ "./src/app/screen_validation_flow/validation_info.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./services/control_message_service */ "./src/app/services/control_message_service.ts");
/* harmony import */ var _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./services/devices_manager_service */ "./src/app/services/devices_manager_service.ts");
/* harmony import */ var _services_log_service__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./services/log_service */ "./src/app/services/log_service.ts");
/* harmony import */ var _services_minicap_service__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./services/minicap_service */ "./src/app/services/minicap_service.ts");
/* harmony import */ var _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./services/test_case_manager_service */ "./src/app/services/test_case_manager_service.ts");
/* harmony import */ var _test_explorer_test_explorer_module__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./test_explorer/test_explorer_module */ "./src/app/test_explorer/test_explorer_module.ts");
/* harmony import */ var _ui_tree_viewer_ui_tree_viewer_module__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./ui_tree_viewer/ui_tree_viewer_module */ "./src/app/ui_tree_viewer/ui_tree_viewer_module.ts");
/* harmony import */ var _workflow_editor_workflow_editor_module__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./workflow_editor/workflow_editor_module */ "./src/app/workflow_editor/workflow_editor_module.ts");
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

// taze: Hammer, hammerjs from //third_party/javascript/typings/hammerjs:hammerjs





















































/** Uicd Cumstomized hammer config, to make the swipe smooth. */
var UicdHammerConfig = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](UicdHammerConfig, _super);
    function UicdHammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = {
            // override hammerjs default configuration
            'pan': { threshold: 5 },
        };
        return _this;
    }
    UicdHammerConfig = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
    ], UicdHammerConfig);
    return UicdHammerConfig;
}(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__["HammerGestureConfig"]));

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
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
                _screen_cast_screen_cast_module__WEBPACK_IMPORTED_MODULE_41__["ScreenCastModule"],
                _screen_validation_flow_screen_validation_flow_module__WEBPACK_IMPORTED_MODULE_43__["ScreenValidationFlowModule"],
                _ui_tree_viewer_ui_tree_viewer_module__WEBPACK_IMPORTED_MODULE_52__["UiTreeViewerModule"],
                _test_explorer_test_explorer_module__WEBPACK_IMPORTED_MODULE_51__["TestExplorerModule"],
                _workflow_editor_workflow_editor_module__WEBPACK_IMPORTED_MODULE_53__["WorkflowEditorModule"],
            ],
            providers: [
                { provide: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__["HAMMER_GESTURE_CONFIG"], useClass: UicdHammerConfig },
                _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_45__["BackendManagerService"],
                _services_control_message_service__WEBPACK_IMPORTED_MODULE_46__["ControlMessageService"],
                _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_47__["DevicesManagerService"],
                _services_log_service__WEBPACK_IMPORTED_MODULE_48__["LogService"],
                _services_minicap_service__WEBPACK_IMPORTED_MODULE_49__["MinicapService"],
                _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_50__["TestCaseManagerService"],
            ],
            bootstrap: [_app__WEBPACK_IMPORTED_MODULE_33__["AppComponent"]],
            entryComponents: [
                _popup_dialogs_choose_device_dialog__WEBPACK_IMPORTED_MODULE_36__["ChooseDeviceDialogComponent"],
                _screen_validation_flow_screen_validation_flow__WEBPACK_IMPORTED_MODULE_42__["ScreenValidationFlowComponent"],
                _screen_validation_flow_validation_info__WEBPACK_IMPORTED_MODULE_44__["ValidationInfoDialogComponent"],
                _advanced_actions_dialog_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_29__["AdvancedActionDialogComponent"],
                _popup_dialogs_replay_details_dialog__WEBPACK_IMPORTED_MODULE_40__["ReplayDetailsDialog"],
                _advanced_actions_dialog_snippet_action_info_dialog__WEBPACK_IMPORTED_MODULE_32__["SnippetActionInfoDialogComponent"],
                _advanced_actions_dialog_script_action_info_dialog__WEBPACK_IMPORTED_MODULE_31__["ScriptActionInfoDialogComponent"],
                _popup_dialogs_history_dialog__WEBPACK_IMPORTED_MODULE_39__["HistoryDialog"],
                _popup_dialogs_global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_38__["GlobalVariableSettingDialog"],
            ],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/constants/actions.ts":
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
};
/** Function to generate ActionModel from JSON data which backend returns. */
function actionModelFromJson(jsonData, index) {
    var actionModel = JSON.parse(jsonData);
    actionModel.actionIndex = index;
    return actionModel;
}
/** Workflow model for frontend */
var WorkflowModel = /** @class */ (function () {
    function WorkflowModel(jsonData) {
        var obj = JSON.parse(jsonData);
        this.actionId = obj['actionId'];
        this.name = obj['name'];
        this.childrenActions = obj['childrenActions'].map(function (item, index) {
            return actionModelFromJson(JSON.stringify(item), index);
        });
    }
    WorkflowModel.ctorParameters = function () { return [
        { type: String }
    ]; };
    return WorkflowModel;
}());



/***/ }),

/***/ "./src/app/constants/constants.ts":
/*!****************************************!*\
  !*** ./src/app/constants/constants.ts ***!
  \****************************************/
/*! exports provided: BACKEND_BASE_URL, LONGCLICK_DURATION_MS, SNACKBAR_DURATION_MS, DEFAULT_WORKFLOW_NAME, DEFAULT_PROJECT_ID_PREFIX, DEFAULT_PROJECT_NAME_PREFIX, DeviceStatus, BottomMenuTabs, ImportType, KeyCodes, MessageTypes, POPUP_DIALOG_DEFAULT_DIMENSION, ActionColor, TestStatusMsg, CanvasOverlayColor, SwipeDirection, RotateDirection */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportType", function() { return ImportType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCodes", function() { return KeyCodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageTypes", function() { return MessageTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POPUP_DIALOG_DEFAULT_DIMENSION", function() { return POPUP_DIALOG_DEFAULT_DIMENSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionColor", function() { return ActionColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestStatusMsg", function() { return TestStatusMsg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasOverlayColor", function() { return CanvasOverlayColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwipeDirection", function() { return SwipeDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RotateDirection", function() { return RotateDirection; });
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


/***/ }),

/***/ "./src/app/constants/jstree.ts":
/*!*************************************!*\
  !*** ./src/app/constants/jstree.ts ***!
  \*************************************/
/*! exports provided: JsTreeNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsTreeNode", function() { return JsTreeNode; });
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
    JsTreeNode.ctorParameters = function () { return [
        { type: String },
        { type: String },
        null
    ]; };
    return JsTreeNode;
}());



/***/ }),

/***/ "./src/app/constants/rect.ts":
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
 * Rectangle class to convert the format between rect need by frontend canvas
 * and one generated by the android xml dumper.
 */
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
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
    Rect.ctorParameters = function () { return [
        { type: Number },
        { type: Number },
        { type: Number },
        { type: Number }
    ]; };
    return Rect;
}());

/** Uses (x1,y1)(x2,y2) to represent a rectangle area, matches the backend */
var Bounds = /** @class */ (function () {
    function Bounds(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    /** Converts to [startX,startY][endX,endY] string format */
    Bounds.prototype.toBoundsStr = function () {
        return "[" + this.x1 + "," + this.y1 + "][" + this.x2 + "," + this.y2 + "]";
    };
    Bounds.ctorParameters = function () { return [
        { type: Number },
        { type: Number },
        { type: Number },
        { type: Number }
    ]; };
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
    Point.ctorParameters = function () { return [
        { type: Number },
        { type: Number }
    ]; };
    return Point;
}());



/***/ }),

/***/ "./src/app/constants/screen_validation_constants.ts":
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
    SpecialClickType[SpecialClickType["DOUBLE_CLICK"] = 0] = "DOUBLE_CLICK";
    SpecialClickType[SpecialClickType["LONG_CLICK"] = 1] = "LONG_CLICK";
    SpecialClickType[SpecialClickType["ZOOM_IN"] = 2] = "ZOOM_IN";
    SpecialClickType[SpecialClickType["ZOOM_OUT"] = 3] = "ZOOM_OUT";
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
    { value: SpecialClickType.LONG_CLICK, displayText: 'Long Click' },
    { value: SpecialClickType.DOUBLE_CLICK, displayText: 'Double Click' },
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
})(StrategyType || (StrategyType = {}));
/** Model for different strategy to select screen content */
var CLICK_STRATEGY_TYPES = [
    { value: StrategyType.TEXT, displayText: 'Text' },
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

/***/ "./src/app/constants/shape.ts":
/*!************************************!*\
  !*** ./src/app/constants/shape.ts ***!
  \************************************/
/*! exports provided: Circle, Rectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return Circle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return Rectangle; });
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
 * Circle class that implements Shape and maps to Circular class in the backend.
 */
var Circle = /** @class */ (function () {
    function Circle(type, centerX, centerY, radius) {
        this.type = type;
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }
    Circle.ctorParameters = function () { return [
        { type: String },
        { type: Number },
        { type: Number },
        { type: Number }
    ]; };
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
    Rectangle.ctorParameters = function () { return [
        { type: String },
        { type: Number },
        { type: Number },
        { type: Number },
        { type: Number }
    ]; };
    return Rectangle;
}());



/***/ }),

/***/ "./src/app/device_manager/device_manager.css":
/*!***************************************************!*\
  !*** ./src/app/device_manager/device_manager.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.currentDevice {\n    float: right;\n    padding: 10px;\n    font-size: 15px;\n}\n\n.star-icon {\n    padding: 15px;\n}\n\ntable {\n  width: 100%;\n}\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGV2aWNlX21hbmFnZXIvZGV2aWNlX21hbmFnZXIuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7QUFDYiIsImZpbGUiOiJzcmMvYXBwL2RldmljZV9tYW5hZ2VyL2RldmljZV9tYW5hZ2VyLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4uY3VycmVudERldmljZSB7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgZm9udC1zaXplOiAxNXB4O1xufVxuXG4uc3Rhci1pY29uIHtcbiAgICBwYWRkaW5nOiAxNXB4O1xufVxuXG50YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4iXX0= */"

/***/ }),

/***/ "./src/app/device_manager/device_manager.ts":
/*!**************************************************!*\
  !*** ./src/app/device_manager/device_manager.ts ***!
  \**************************************************/
/*! exports provided: DeviceManager, DeviceRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceManager", function() { return DeviceManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceRow", function() { return DeviceRow; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
/* harmony import */ var _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/devices_manager_service */ "./src/app/services/devices_manager_service.ts");
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
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this.displayedColumns = ['position', 'device_serial', 'status', 'selected'];
        this.selectedPlayMode = 'SINGLE';
        this.currentDevice =
            this.devicesManagerService.getCurrentDeviceSubject().asObservable();
        this.dataSource =
            this.devicesManagerService.getInitedDevicesSubject()
                .asObservable()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (initedDevices) { return initedDevices.map(function (device, index) { return new DeviceRow(device, index + 1); }); }));
    }
    DeviceManager.prototype.ngOnInit = function () { };
    DeviceManager.prototype.changePlayMode = function (event) {
        this.backendManagerService.setPlayMode(event.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroyed))
            .subscribe();
    };
    DeviceManager.prototype.initDevice = function (deviceId) {
        this.backendManagerService.selectedDeviceChanged(deviceId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroyed))
            .subscribe();
        this.devicesManagerService.updateCurrentDevice(deviceId);
    };
    DeviceManager.prototype.ngOnDestroy = function () {
        // Unsubscribe all pending subscriptions.
        this.destroyed.next();
    };
    DeviceManager.ctorParameters = function () { return [
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_5__["BackendManagerService"] },
        { type: _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_6__["DevicesManagerService"] }
    ]; };
    DeviceManager = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-device-manager',
            template: __webpack_require__(/*! raw-loader!./device_manager.ng.html */ "./node_modules/raw-loader/index.js!./src/app/device_manager/device_manager.ng.html"),
            styles: [__webpack_require__(/*! ./device_manager.css */ "./src/app/device_manager/device_manager.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_backend_manager_service__WEBPACK_IMPORTED_MODULE_5__["BackendManagerService"],
            _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_6__["DevicesManagerService"]])
    ], DeviceManager);
    return DeviceManager;
}());

/**
 * DeviceRow interface is used to construct mat-table source in template.
 */
var DeviceRow = /** @class */ (function () {
    function DeviceRow(device, position) {
        this.position = position;
        this.status = _constants_constants__WEBPACK_IMPORTED_MODULE_4__["DeviceStatus"].READY_TO_CONNECT;
        this.deviceSerial = device.deviceId;
    }
    DeviceRow.ctorParameters = function () { return [
        { type: _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_6__["DeviceInfo"] },
        { type: Number }
    ]; };
    return DeviceRow;
}());



/***/ }),

/***/ "./src/app/device_manager/device_manager_module.ts":
/*!*********************************************************!*\
  !*** ./src/app/device_manager/device_manager_module.ts ***!
  \*********************************************************/
/*! exports provided: DeviceManagerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceManagerModule", function() { return DeviceManagerModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _device_manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./device_manager */ "./src/app/device_manager/device_manager.ts");
/* harmony import */ var _tv_remote__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tv_remote */ "./src/app/device_manager/tv_remote.ts");
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










var DeviceManagerModule = /** @class */ (function () {
    function DeviceManagerModule() {
    }
    DeviceManagerModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
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

/***/ "./src/app/device_manager/tv_remote.ts":
/*!*********************************************!*\
  !*** ./src/app/device_manager/tv_remote.ts ***!
  \*********************************************/
/*! exports provided: TvRemote */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TvRemote", function() { return TvRemote; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
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
 * TvRemote component containing buttons to remotely control an android TV.
 */
var TvRemote = /** @class */ (function () {
    function TvRemote(backendManagerService) {
        this.backendManagerService = backendManagerService;
        // To give access to KeyCodes enum in template.
        this.keyCodes = _constants_constants__WEBPACK_IMPORTED_MODULE_4__["KeyCodes"];
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
    }
    TvRemote.prototype.sendKeyEvent = function (keyCode) {
        console.log('key pressed' + keyCode.toString());
        return this.backendManagerService.pressKey(keyCode)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroyed))
            .subscribe();
    };
    TvRemote.prototype.ngOnDestroy = function () {
        // Unsubscribes all pending subscriptions.
        this.destroyed.next();
    };
    TvRemote.ctorParameters = function () { return [
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_5__["BackendManagerService"] }
    ]; };
    TvRemote = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tv-remote',
            template: __webpack_require__(/*! raw-loader!./tv_remote.ng.html */ "./node_modules/raw-loader/index.js!./src/app/device_manager/tv_remote.ng.html"),
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_backend_manager_service__WEBPACK_IMPORTED_MODULE_5__["BackendManagerService"]])
    ], TvRemote);
    return TvRemote;
}());



/***/ }),

/***/ "./src/app/log_panel/log_panel.ts":
/*!****************************************!*\
  !*** ./src/app/log_panel/log_panel.ts ***!
  \****************************************/
/*! exports provided: LogPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogPanelComponent", function() { return LogPanelComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_log_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/log_service */ "./src/app/services/log_service.ts");
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
 * Log component to display the log information from both backend log/frontend
 * events.
 */
var LogPanelComponent = /** @class */ (function () {
    function LogPanelComponent(logService) {
        this.logService = logService;
        // Get the log observable, filter out the empty entry and accumulate values by
        // the scan(), limit to last 1000 entries.
        this.showingLogs = this.logService.getMessages().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (item) { return item.text.length > 0; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (item) {
            return new Date().toLocaleString('en-US', { hour12: false }) + ': ' +
                item.text;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["scan"])(function (acc, value) { return [value].concat(acc).slice(-LogPanelComponent_1.logMaxSize); }, []));
    }
    LogPanelComponent_1 = LogPanelComponent;
    var LogPanelComponent_1;
    LogPanelComponent.logMaxSize = 1000;
    LogPanelComponent.ctorParameters = function () { return [
        { type: _services_log_service__WEBPACK_IMPORTED_MODULE_3__["LogService"] }
    ]; };
    LogPanelComponent = LogPanelComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({ selector: 'log-panel', template: __webpack_require__(/*! raw-loader!./log_panel.ng.html */ "./node_modules/raw-loader/index.js!./src/app/log_panel/log_panel.ng.html") }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_log_service__WEBPACK_IMPORTED_MODULE_3__["LogService"]])
    ], LogPanelComponent);
    return LogPanelComponent;
}());



/***/ }),

/***/ "./src/app/log_panel/log_panel_module.ts":
/*!***********************************************!*\
  !*** ./src/app/log_panel/log_panel_module.ts ***!
  \***********************************************/
/*! exports provided: LogPanelModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogPanelModule", function() { return LogPanelModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _log_panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./log_panel */ "./src/app/log_panel/log_panel.ts");
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






var LogPanelModule = /** @class */ (function () {
    function LogPanelModule() {
    }
    LogPanelModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
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

/***/ "./src/app/popup_dialogs/choose_device_dialog.css":
/*!********************************************************!*\
  !*** ./src/app/popup_dialogs/choose_device_dialog.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.device-card{\n  margin-bottom: 20px;\n}\n\n.device-card-title {\n  font-size: 15px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9wdXBfZGlhbG9ncy9jaG9vc2VfZGV2aWNlX2RpYWxvZy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCIiwiZmlsZSI6InNyYy9hcHAvcG9wdXBfZGlhbG9ncy9jaG9vc2VfZGV2aWNlX2RpYWxvZy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLmRldmljZS1jYXJke1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4uZGV2aWNlLWNhcmQtdGl0bGUge1xuICBmb250LXNpemU6IDE1cHg7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/popup_dialogs/choose_device_dialog.ts":
/*!*******************************************************!*\
  !*** ./src/app/popup_dialogs/choose_device_dialog.ts ***!
  \*******************************************************/
/*! exports provided: ChooseDeviceDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChooseDeviceDialogComponent", function() { return ChooseDeviceDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/devices_manager_service */ "./src/app/services/devices_manager_service.ts");
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
 * The init Dialog for user to select devices.
 */
var ChooseDeviceDialogComponent = /** @class */ (function () {
    function ChooseDeviceDialogComponent(dialogRef, devicesManagerService) {
        this.dialogRef = dialogRef;
        this.devicesManagerService = devicesManagerService;
        this.devices = [];
        this.slotOptions = [];
        /** Handle on-destroy Subject, used to unsubscribe. */
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
    }
    ChooseDeviceDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get device list
        this.devicesManagerService.getDevicesList()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            if (data instanceof Array) {
                _this.devices = data.map(function (item, index) {
                    _this.slotOptions.push({ index: index + 1, disabled: false });
                    return new _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_5__["DeviceInfo"](item);
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
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_5__["DevicesManagerService"] }
    ]; };
    ChooseDeviceDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-choose-device-dialog',
            template: __webpack_require__(/*! raw-loader!./choose_device_dialog.ng.html */ "./node_modules/raw-loader/index.js!./src/app/popup_dialogs/choose_device_dialog.ng.html"),
            styles: [__webpack_require__(/*! ./choose_device_dialog.css */ "./src/app/popup_dialogs/choose_device_dialog.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_5__["DevicesManagerService"]])
    ], ChooseDeviceDialogComponent);
    return ChooseDeviceDialogComponent;
}());



/***/ }),

/***/ "./src/app/popup_dialogs/dialogs_module.ts":
/*!*************************************************!*\
  !*** ./src/app/popup_dialogs/dialogs_module.ts ***!
  \*************************************************/
/*! exports provided: DialogsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogsModule", function() { return DialogsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm5/grid-list.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _choose_device_dialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./choose_device_dialog */ "./src/app/popup_dialogs/choose_device_dialog.ts");
/* harmony import */ var _global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./global_var_setting_dialog */ "./src/app/popup_dialogs/global_var_setting_dialog.ts");
/* harmony import */ var _history_dialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./history_dialog */ "./src/app/popup_dialogs/history_dialog.ts");
/* harmony import */ var _replay_details_dialog__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./replay_details_dialog */ "./src/app/popup_dialogs/replay_details_dialog.ts");
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





















var DialogsModule = /** @class */ (function () {
    function DialogsModule() {
    }
    DialogsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _choose_device_dialog__WEBPACK_IMPORTED_MODULE_17__["ChooseDeviceDialogComponent"],
                _global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_18__["GlobalVariableSettingDialog"],
                _history_dialog__WEBPACK_IMPORTED_MODULE_19__["HistoryDialog"],
                _replay_details_dialog__WEBPACK_IMPORTED_MODULE_20__["ReplayDetailsDialog"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__["BrowserAnimationsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__["MatCheckboxModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_8__["MatChipsModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__["MatGridListModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MatOptionModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_13__["MatSelectModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_14__["MatTableModule"],
            ],
            exports: [
                _choose_device_dialog__WEBPACK_IMPORTED_MODULE_17__["ChooseDeviceDialogComponent"],
                _global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_18__["GlobalVariableSettingDialog"],
                _history_dialog__WEBPACK_IMPORTED_MODULE_19__["HistoryDialog"],
                _replay_details_dialog__WEBPACK_IMPORTED_MODULE_20__["ReplayDetailsDialog"],
            ],
        })
    ], DialogsModule);
    return DialogsModule;
}());



/***/ }),

/***/ "./src/app/popup_dialogs/global_var_setting_dialog.css":
/*!*************************************************************!*\
  !*** ./src/app/popup_dialogs/global_var_setting_dialog.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.variable-example-text {\n  font-size:15px;\n  color: #3f51b5;\n  display: block;\n}\n\n.global-var-input {\n  margin-top: 20px;\n  min-width: 600px;\n}\n\n.global-var-info {\n  border-bottom: gray;\n  border-bottom-width: 1px;\n  border-bottom-style: dashed;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9wdXBfZGlhbG9ncy9nbG9iYWxfdmFyX3NldHRpbmdfZGlhbG9nLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtFQUNFLGNBQWM7RUFDZCxjQUFjO0VBQ2QsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsd0JBQXdCO0VBQ3hCLDJCQUEyQjtBQUM3QiIsImZpbGUiOiJzcmMvYXBwL3BvcHVwX2RpYWxvZ3MvZ2xvYmFsX3Zhcl9zZXR0aW5nX2RpYWxvZy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLnZhcmlhYmxlLWV4YW1wbGUtdGV4dCB7XG4gIGZvbnQtc2l6ZToxNXB4O1xuICBjb2xvcjogIzNmNTFiNTtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5nbG9iYWwtdmFyLWlucHV0IHtcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgbWluLXdpZHRoOiA2MDBweDtcbn1cblxuLmdsb2JhbC12YXItaW5mbyB7XG4gIGJvcmRlci1ib3R0b206IGdyYXk7XG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDFweDtcbiAgYm9yZGVyLWJvdHRvbS1zdHlsZTogZGFzaGVkO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/popup_dialogs/global_var_setting_dialog.ts":
/*!************************************************************!*\
  !*** ./src/app/popup_dialogs/global_var_setting_dialog.ts ***!
  \************************************************************/
/*! exports provided: GlobalVariableSettingDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalVariableSettingDialog", function() { return GlobalVariableSettingDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
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





/** Dialog allows user to override the backend global variables */
var GlobalVariableSettingDialog = /** @class */ (function () {
    function GlobalVariableSettingDialog(backendManagerService) {
        this.backendManagerService = backendManagerService;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this.globalVariableStr = '';
    }
    GlobalVariableSettingDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.backendManagerService.getUserPresetGlobalVariable()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            if (data) {
                _this.globalVariableStr = data.globalVariableStr;
            }
        });
    };
    GlobalVariableSettingDialog.prototype.setGlobalVariable = function () {
        this.backendManagerService
            .setUserPresetGlobalVariable(this.globalVariableStr)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroyed))
            .subscribe(function () { });
    };
    GlobalVariableSettingDialog.prototype.ngOnDestroy = function () {
        this.destroyed.next();
    };
    GlobalVariableSettingDialog.ctorParameters = function () { return [
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_4__["BackendManagerService"] }
    ]; };
    GlobalVariableSettingDialog = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'global-var-setting-dialog',
            template: __webpack_require__(/*! raw-loader!./global_var_setting_dialog.ng.html */ "./node_modules/raw-loader/index.js!./src/app/popup_dialogs/global_var_setting_dialog.ng.html"),
            styles: [__webpack_require__(/*! ./global_var_setting_dialog.css */ "./src/app/popup_dialogs/global_var_setting_dialog.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_backend_manager_service__WEBPACK_IMPORTED_MODULE_4__["BackendManagerService"]])
    ], GlobalVariableSettingDialog);
    return GlobalVariableSettingDialog;
}());



/***/ }),

/***/ "./src/app/popup_dialogs/history_dialog.css":
/*!**************************************************!*\
  !*** ./src/app/popup_dialogs/history_dialog.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.testTable {\n  width: 100%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9wdXBfZGlhbG9ncy9oaXN0b3J5X2RpYWxvZy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7RUFDRSxXQUFXO0FBQ2IiLCJmaWxlIjoic3JjL2FwcC9wb3B1cF9kaWFsb2dzL2hpc3RvcnlfZGlhbG9nLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4udGVzdFRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/popup_dialogs/history_dialog.ts":
/*!*************************************************!*\
  !*** ./src/app/popup_dialogs/history_dialog.ts ***!
  \*************************************************/
/*! exports provided: HistoryDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryDialog", function() { return HistoryDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/test_case_manager_service */ "./src/app/services/test_case_manager_service.ts");
/* harmony import */ var _replay_details_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./replay_details_dialog */ "./src/app/popup_dialogs/replay_details_dialog.ts");
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








/** Testcase execution history results and details. */
var HistoryDialog = /** @class */ (function () {
    function HistoryDialog(dialog, testCaseManagerService) {
        this.dialog = dialog;
        this.testCaseManagerService = testCaseManagerService;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        this.dataSource = [];
        this.displayedColumns = ['details', 'uuid', 'testUuid', 'name', 'result', 'runDate', 'author'];
    }
    HistoryDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.testCaseManagerService.fetchTestHistory()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.dataSource = data.testHistoryEntities;
        });
    };
    HistoryDialog.prototype.showDetails = function (details) {
        var data = JSON.parse(details);
        this.dialog.open(_replay_details_dialog__WEBPACK_IMPORTED_MODULE_7__["ReplayDetailsDialog"], { width: _constants_constants__WEBPACK_IMPORTED_MODULE_5__["POPUP_DIALOG_DEFAULT_DIMENSION"].width, data: data });
    };
    HistoryDialog.prototype.ngOnDestroy = function () {
        this.destroyed.next();
    };
    HistoryDialog.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
        { type: _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_6__["TestCaseManagerService"] }
    ]; };
    HistoryDialog = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'history-dialog',
            template: __webpack_require__(/*! raw-loader!./history_dialog.ng.html */ "./node_modules/raw-loader/index.js!./src/app/popup_dialogs/history_dialog.ng.html"),
            styles: [__webpack_require__(/*! ./history_dialog.css */ "./src/app/popup_dialogs/history_dialog.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_6__["TestCaseManagerService"]])
    ], HistoryDialog);
    return HistoryDialog;
}());



/***/ }),

/***/ "./src/app/popup_dialogs/replay_details_dialog.css":
/*!*********************************************************!*\
  !*** ./src/app/popup_dialogs/replay_details_dialog.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.test-status-pass {\n  color: green;\n}\n\n.test-status-fail {\n  color: OrangeRed;\n}\n\n.test-status-cancelled {\n  color: OrangeRed;\n}\n\n:host ::ng-deep .skipped-status {\n  color:Orange;\n}\n\n:host ::ng-deep .skipped-content {\n  text-decoration: line-through;\n}\n\n:host ::ng-deep .exit-current-compound_status {\n  color:Chocolate;\n}\n\n:host ::ng-deep .failed-status {\n  color:OrangeRed;\n}\n\n:host ::ng-deep .pass-status {\n  color:green;\n}\n\n:host ::ng-deep .content-bold {\n font-weight: bold;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9wdXBfZGlhbG9ncy9yZXBsYXlfZGV0YWlsc19kaWFsb2cuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7Q0FDQyxpQkFBaUI7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9wb3B1cF9kaWFsb2dzL3JlcGxheV9kZXRhaWxzX2RpYWxvZy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLnRlc3Qtc3RhdHVzLXBhc3Mge1xuICBjb2xvcjogZ3JlZW47XG59XG5cbi50ZXN0LXN0YXR1cy1mYWlsIHtcbiAgY29sb3I6IE9yYW5nZVJlZDtcbn1cblxuLnRlc3Qtc3RhdHVzLWNhbmNlbGxlZCB7XG4gIGNvbG9yOiBPcmFuZ2VSZWQ7XG59XG5cbjpob3N0IDo6bmctZGVlcCAuc2tpcHBlZC1zdGF0dXMge1xuICBjb2xvcjpPcmFuZ2U7XG59XG5cbjpob3N0IDo6bmctZGVlcCAuc2tpcHBlZC1jb250ZW50IHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XG59XG5cbjpob3N0IDo6bmctZGVlcCAuZXhpdC1jdXJyZW50LWNvbXBvdW5kX3N0YXR1cyB7XG4gIGNvbG9yOkNob2NvbGF0ZTtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIC5mYWlsZWQtc3RhdHVzIHtcbiAgY29sb3I6T3JhbmdlUmVkO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgLnBhc3Mtc3RhdHVzIHtcbiAgY29sb3I6Z3JlZW47XG59XG5cbjpob3N0IDo6bmctZGVlcCAuY29udGVudC1ib2xkIHtcbiBmb250LXdlaWdodDogYm9sZDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/popup_dialogs/replay_details_dialog.ts":
/*!********************************************************!*\
  !*** ./src/app/popup_dialogs/replay_details_dialog.ts ***!
  \********************************************************/
/*! exports provided: ReplayDetailsDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReplayDetailsDialog", function() { return ReplayDetailsDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _constants_jstree__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/jstree */ "./src/app/constants/jstree.ts");
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
        var jsNode = new _constants_jstree__WEBPACK_IMPORTED_MODULE_5__["JsTreeNode"](this.getNodeTitle(node.playStatus, node.content), Object(uuid__WEBPACK_IMPORTED_MODULE_3__["v4"])());
        jsNode.icon = 'fa fa-mouse-pointer';
        if (node.childrenResult && node.childrenResult.length > 0) {
            jsNode.children =
                node.childrenResult.map(this.constructTreeData.bind(this));
        }
        if (node.outputType === 'SCREENSHOT' || node.outputType === 'LOGCAT' ||
            node.outputType === 'IMG_VALIDATION') {
            this.outputList.push({
                outputType: node.outputType,
                path: _constants_constants__WEBPACK_IMPORTED_MODULE_4__["BACKEND_BASE_URL"] + '/getSavedResource?path=' + node.externalFilePath
            });
        }
        return jsNode;
    };
    ReplayDetailsDialog.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('jsTree', { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ReplayDetailsDialog.prototype, "jsTreeEl", void 0);
    ReplayDetailsDialog = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-replay-details-dialog',
            template: __webpack_require__(/*! raw-loader!./replay_details_dialog.ng.html */ "./node_modules/raw-loader/index.js!./src/app/popup_dialogs/replay_details_dialog.ng.html"),
            styles: [__webpack_require__(/*! ./replay_details_dialog.css */ "./src/app/popup_dialogs/replay_details_dialog.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], ReplayDetailsDialog);
    return ReplayDetailsDialog;
}());



/***/ }),

/***/ "./src/app/screen_cast/screen_cast.css":
/*!*********************************************!*\
  !*** ./src/app/screen_cast/screen_cast.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.demo-tab-group {\n  border: 1px solid #e8e8e8;\n}\n\n.demo-tab-content {\n  padding: 16px;\n}\n\n.phone-canvas-widget {\n  background-color: white;\n  z-index: 0;\n}\n\n.canvas-wrapper {\n  padding-top: 10px;\n  width: 360px;\n  min-width: 360px;\n  max-height: 100% !important;\n}\n\n.phone-canvas-widget2 {\n  background-color: #11000000;\n  z-index: 9;\n}\n\n.phone-sidenav {\n  display: flex;\n  flex-direction: column;\n}\n\n.devices_selector {\n  position: absolute;\n  top: 720px;\n  left:100px;\n}\n\n.spinner {\n  position: absolute;\n  z-index: 999;\n  left: 35%;\n  top: 35%;\n}\n\n.canvas-overlay{\n  background-color: aquamarine;\n  width: 100%;\n  height: 100%;\n}\n\n.btn-container{\n  padding: 15px 10px 15px 10px;\n  background-color: whitesmoke;\n}\n\n.control-nav {\n  flex-direction: column;\n}\n\n.uicd-row-breaker {\n  background-color: #e5e5e5;\n  height: 3px;\n}\n\n.tab-group{\n  background-color: whitesmoke;\n}\n\n.clearfix {\n  clear: both;\n}\n\n.screen-widget-root {\n  position: relative;\n}\n\n.phone-overlay-wrapper {\n  background-color: rgba(0, 0, 255, 0);\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  /* absolute position implies no width and height */\n  width: 100%;\n  height: 100%\n}\n\n.recorder-main {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2NyZWVuX2Nhc3Qvc2NyZWVuX2Nhc3QuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLFNBQVM7RUFDVCxRQUFRO0FBQ1Y7O0FBRUE7RUFDRSw0QkFBNEI7RUFDNUIsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLDRCQUE0QjtFQUM1Qiw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsV0FBVztBQUNiOztBQUVBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usb0NBQW9DO0VBQ3BDLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsUUFBUTtFQUNSLGtEQUFrRDtFQUNsRCxXQUFXO0VBQ1g7QUFDRjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckIiLCJmaWxlIjoic3JjL2FwcC9zY3JlZW5fY2FzdC9zY3JlZW5fY2FzdC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLmRlbW8tdGFiLWdyb3VwIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2U4ZThlODtcbn1cblxuLmRlbW8tdGFiLWNvbnRlbnQge1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4ucGhvbmUtY2FudmFzLXdpZGdldCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB6LWluZGV4OiAwO1xufVxuXG4uY2FudmFzLXdyYXBwZXIge1xuICBwYWRkaW5nLXRvcDogMTBweDtcbiAgd2lkdGg6IDM2MHB4O1xuICBtaW4td2lkdGg6IDM2MHB4O1xuICBtYXgtaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XG59XG5cbi5waG9uZS1jYW52YXMtd2lkZ2V0MiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxMTAwMDAwMDtcbiAgei1pbmRleDogOTtcbn1cblxuLnBob25lLXNpZGVuYXYge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLmRldmljZXNfc2VsZWN0b3Ige1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNzIwcHg7XG4gIGxlZnQ6MTAwcHg7XG59XG5cbi5zcGlubmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiA5OTk7XG4gIGxlZnQ6IDM1JTtcbiAgdG9wOiAzNSU7XG59XG5cbi5jYW52YXMtb3ZlcmxheXtcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YW1hcmluZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmJ0bi1jb250YWluZXJ7XG4gIHBhZGRpbmc6IDE1cHggMTBweCAxNXB4IDEwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XG59XG5cbi5jb250cm9sLW5hdiB7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi51aWNkLXJvdy1icmVha2VyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZTVlNTtcbiAgaGVpZ2h0OiAzcHg7XG59XG5cbi50YWItZ3JvdXB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XG59XG5cbi5jbGVhcmZpeCB7XG4gIGNsZWFyOiBib3RoO1xufVxuXG4uc2NyZWVuLXdpZGdldC1yb290IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ucGhvbmUtb3ZlcmxheS13cmFwcGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAyNTUsIDApO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDBweDtcbiAgdG9wOiAwcHg7XG4gIC8qIGFic29sdXRlIHBvc2l0aW9uIGltcGxpZXMgbm8gd2lkdGggYW5kIGhlaWdodCAqL1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlXG59XG5cbi5yZWNvcmRlci1tYWluIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/screen_cast/screen_cast.ts":
/*!********************************************!*\
  !*** ./src/app/screen_cast/screen_cast.ts ***!
  \********************************************/
/*! exports provided: ScreenCastComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenCastComponent", function() { return ScreenCastComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/rect */ "./src/app/constants/rect.ts");
/* harmony import */ var _screen_validation_flow_screen_validation_flow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../screen_validation_flow/screen_validation_flow */ "./src/app/screen_validation_flow/screen_validation_flow.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/control_message_service */ "./src/app/services/control_message_service.ts");
/* harmony import */ var _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/devices_manager_service */ "./src/app/services/devices_manager_service.ts");
/* harmony import */ var _services_minicap_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/minicap_service */ "./src/app/services/minicap_service.ts");
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
 * The component for streaming the device's screen to frontend.
 */
var ScreenCastComponent = /** @class */ (function () {
    function ScreenCastComponent(dialog, minicapService, backendManagerService, controlMessageService, devicesManagerService) {
        this.dialog = dialog;
        this.minicapService = minicapService;
        this.backendManagerService = backendManagerService;
        this.controlMessageService = controlMessageService;
        this.devicesManagerService = devicesManagerService;
        this.currentStream = null;
        this.canvasWidth = 360;
        this.canvasHeight = 640;
        this.inspectMode = false;
        this.loading = false;
        this.swipeDirection = _constants_constants__WEBPACK_IMPORTED_MODULE_5__["SwipeDirection"];
        this.rotateDirection = _constants_constants__WEBPACK_IMPORTED_MODULE_5__["RotateDirection"];
        this.dragCoordinates = [];
        this.timeOfLastPan = 0;
        this.PAN_THRESHOLD_MS = 500;
        this.PAN_DISTANCE_THRESHOLD = 80;
        this.inDragMode = false;
        /** Handle on-destroy Subject, used to unsubscribe. */
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
    }
    ScreenCastComponent.prototype.clearOverlayCanvas = function (ctx) {
        ctx.canvas.width = this.canvasWidth;
        ctx.canvas.height = this.canvasHeight;
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
        var oriRect = _constants_rect__WEBPACK_IMPORTED_MODULE_6__["Rect"].createFromCoordinatesStr(coordinates);
        var srcRect = this.devicesManagerService.getDevicePhysicalScreenSize();
        var targetRect = new _constants_rect__WEBPACK_IMPORTED_MODULE_6__["Rect"](0, 0, this.canvasWidth, this.canvasHeight);
        var rectToDraw = oriRect.scaleToTargetSurface(srcRect, targetRect);
        ctx.rect(rectToDraw.x, rectToDraw.y, rectToDraw.width, rectToDraw.height);
        ctx.fillStyle = color;
        ctx.fill();
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
            .subscribe(function (output) {
            var blob = new Blob([output], { type: 'image/jpeg' });
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
        this.controlMessageService.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_5__["MessageTypes"].REFRESH_XML, extra: 'from screen cast' });
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
            var dialogRef = this.dialog.open(_screen_validation_flow_screen_validation_flow__WEBPACK_IMPORTED_MODULE_7__["ScreenValidationFlowComponent"], { data: { bounds: selectedRect.toBounds() }, width: '1000px' });
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
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
            .subscribe(function () { });
    };
    ScreenCastComponent.prototype.pan = function (event) {
        var _this = this;
        if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
            return;
        }
        var startPoint = new _constants_rect__WEBPACK_IMPORTED_MODULE_6__["Point"](event.srcEvent.offsetX - event.deltaX, event.srcEvent.offsetY - event.deltaY);
        if (this.isControlPressed(event.srcEvent)) {
            this.selectRectArea(new _constants_rect__WEBPACK_IMPORTED_MODULE_6__["Rect"](startPoint.x, startPoint.y, event.deltaX, event.deltaY), event.isFinal);
        }
        else {
            if (this.inDragMode) {
                this.performDrag(new _constants_rect__WEBPACK_IMPORTED_MODULE_6__["Point"](event.srcEvent.offsetX, event.srcEvent.offsetY), event.isFinal);
            }
            else if (event.isFinal) {
                // This is a swipe event.
                var endPoint = new _constants_rect__WEBPACK_IMPORTED_MODULE_6__["Point"](event.srcEvent.offsetX, event.srcEvent.offsetY);
                this.drawLineOnHoveredCanvas(startPoint, endPoint);
                this.backendManagerService
                    .swipe(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
                    .subscribe(function () {
                    _this.sendRefreshWorkflowMsg();
                    _this.sendRefreshXmlMsg();
                });
                // Clear the on screen swipe hint, we could add in the swipe subscribe,
                // but due to the animation the swipe will take more than 500ms to
                // return.
                Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(250).subscribe(function () {
                    _this.clearOverlayCanvas(_this.getOverlayHoveredCanvasCtx());
                });
            }
        }
    };
    ScreenCastComponent.prototype.press = function (event) {
        var _this = this;
        if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
            return;
        }
        var point = new _constants_rect__WEBPACK_IMPORTED_MODULE_6__["Point"](event.offsetX, event.offsetY);
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
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
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
            .longClick(point.x, point.y, _constants_constants__WEBPACK_IMPORTED_MODULE_5__["LONGCLICK_DURATION_MS"])
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
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
            return;
        }
        if (this.inspectMode) {
            // send message to tree component and select that component
            var screenCoordinate = new _constants_rect__WEBPACK_IMPORTED_MODULE_6__["Rect"](event.offsetX, event.offsetY, 0, 0);
            var srcRect = new _constants_rect__WEBPACK_IMPORTED_MODULE_6__["Rect"](0, 0, this.canvasWidth, this.canvasHeight);
            var targetRect = this.devicesManagerService.getDevicePhysicalScreenSize();
            var deviceCoordinate = screenCoordinate.scaleToTargetSurface(srcRect, targetRect);
            this.controlMessageService.sendMessage({
                messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_5__["MessageTypes"].INSPECT_CLICKED_NODE,
                extra: JSON.stringify(deviceCoordinate),
            });
        }
        else {
            if (this.isControlPressed(event)) {
                console.log('tap control on');
                return;
            }
            this.backendManagerService.tap(event.offsetX, event.offsetY)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
                .subscribe(function () {
                _this.sendRefreshWorkflowMsg();
                _this.sendRefreshXmlMsg();
            });
        }
    };
    ScreenCastComponent.prototype.quickSwipe = function (direction) {
        var _this = this;
        if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
            return;
        }
        this.backendManagerService.quickSwipe(direction)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.sendRefreshWorkflowMsg();
            _this.sendRefreshXmlMsg();
        });
    };
    ScreenCastComponent.prototype.rotateScreen = function (direction) {
        var _this = this;
        if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
            return;
        }
        this.loading = true;
        this.backendManagerService.rotateScreen(direction)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
            .subscribe(function (returnInfo) {
            console.log(returnInfo);
            _this.loading = false;
            _this.sendRefreshWorkflowMsg();
            _this.sendRefreshXmlMsg();
        });
    };
    ScreenCastComponent.prototype.power = function () {
        this.performKeyPressAction(_constants_constants__WEBPACK_IMPORTED_MODULE_5__["KeyCodes"].KEYCODE_POWER);
    };
    ScreenCastComponent.prototype.volumeUp = function () {
        this.performKeyPressAction(_constants_constants__WEBPACK_IMPORTED_MODULE_5__["KeyCodes"].KEYCODE_VOLUME_UP);
    };
    ScreenCastComponent.prototype.volumeDown = function () {
        this.performKeyPressAction(_constants_constants__WEBPACK_IMPORTED_MODULE_5__["KeyCodes"].KEYCODE_VOLUME_DOWN);
    };
    ScreenCastComponent.prototype.back = function () {
        this.performKeyPressAction(_constants_constants__WEBPACK_IMPORTED_MODULE_5__["KeyCodes"].KEYCODE_BACK);
    };
    ScreenCastComponent.prototype.home = function () {
        this.performKeyPressAction(_constants_constants__WEBPACK_IMPORTED_MODULE_5__["KeyCodes"].KEYCODE_HOME);
    };
    ScreenCastComponent.prototype.overview = function () {
        this.performKeyPressAction(_constants_constants__WEBPACK_IMPORTED_MODULE_5__["KeyCodes"].KEYCODE_OVERVIEW);
    };
    ScreenCastComponent.prototype.performKeyPressAction = function (keyCode) {
        var _this = this;
        if (this.inspectMode || !this.devicesManagerService.getCurrentDevice()) {
            return;
        }
        this.backendManagerService.pressKey(keyCode)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.sendRefreshWorkflowMsg();
        });
    };
    ScreenCastComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.devicesManagerService.getCurrentDeviceSubject()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
            .subscribe(function (d) {
            _this.initFEMiniCap(d.minicapPort);
        });
        this.controlMessageService.getControlMessageSubject()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (msg) {
            return msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_5__["MessageTypes"].NODE_HOVERED ||
                msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_5__["MessageTypes"].NODE_SELECTED ||
                msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_5__["MessageTypes"].CLEAR_CANVAS ||
                msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_5__["MessageTypes"].SET_INSPECT_MODE;
        }))
            .subscribe(function (msg) {
            if (msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_5__["MessageTypes"].CLEAR_CANVAS) {
                _this.clearOverlayCanvas(_this.getOverlayHoveredCanvasCtx());
                if (msg.extra.toLowerCase() === 'all') {
                    _this.clearOverlayCanvas(_this.getOverlaySelectedCanvasCtx());
                }
            }
            else if (msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_5__["MessageTypes"].NODE_SELECTED) {
                _this.highlightScreenElement(msg.extra, _constants_constants__WEBPACK_IMPORTED_MODULE_5__["CanvasOverlayColor"].SELECTED, _this.getOverlaySelectedCanvasCtx());
            }
            else if (msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_5__["MessageTypes"].NODE_HOVERED) {
                _this.highlightScreenElement(msg.extra, _constants_constants__WEBPACK_IMPORTED_MODULE_5__["CanvasOverlayColor"].HOVER, _this.getOverlayHoveredCanvasCtx());
            }
            else if (msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_5__["MessageTypes"].SET_INSPECT_MODE) {
                _this.inspectMode = msg.extra.toLowerCase() === 'true';
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
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
        { type: _services_minicap_service__WEBPACK_IMPORTED_MODULE_11__["MinicapService"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_9__["ControlMessageService"] },
        { type: _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_10__["DevicesManagerService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('phoneScreen', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ScreenCastComponent.prototype, "phoneScreen", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('overlayHovered', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ScreenCastComponent.prototype, "overlayHovered", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('overlaySelected', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ScreenCastComponent.prototype, "overlaySelected", void 0);
    ScreenCastComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'screen-cast',
            template: __webpack_require__(/*! raw-loader!./screen_cast.ng.html */ "./node_modules/raw-loader/index.js!./src/app/screen_cast/screen_cast.ng.html"),
            styles: [__webpack_require__(/*! ./screen_cast.css */ "./src/app/screen_cast/screen_cast.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _services_minicap_service__WEBPACK_IMPORTED_MODULE_11__["MinicapService"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_9__["ControlMessageService"],
            _services_devices_manager_service__WEBPACK_IMPORTED_MODULE_10__["DevicesManagerService"]])
    ], ScreenCastComponent);
    return ScreenCastComponent;
}());



/***/ }),

/***/ "./src/app/screen_cast/screen_cast_module.ts":
/*!***************************************************!*\
  !*** ./src/app/screen_cast/screen_cast_module.ts ***!
  \***************************************************/
/*! exports provided: ScreenCastModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenCastModule", function() { return ScreenCastModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _screen_cast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./screen_cast */ "./src/app/screen_cast/screen_cast.ts");
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










var ScreenCastModule = /** @class */ (function () {
    function ScreenCastModule() {
    }
    ScreenCastModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
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

/***/ "./src/app/screen_validation_flow/fetch_content_form.css":
/*!***************************************************************!*\
  !*** ./src/app/screen_validation_flow/fetch_content_form.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.form-container {\n  display: flex;\n  flex-direction: column;\n  min-width: 600px;\n  overflow:auto;\n  max-height: 600px;\n  flex:1;\n  -webkit-padding-before: 0%;\n          padding-block-start: 0%\n}\n\n.selected-content {\n  font-size: 14px;\n  display: flex;\n  height: 15px;\n  max-height: 100px;\n  vertical-align: top;\n}\n\n.selected-content-span {\n  font-size:12px;\n  color: #3f51b5;\n  flex:1;\n  height: 100;\n  display: flex;\n  overflow-y: auto;\n  }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2NyZWVuX3ZhbGlkYXRpb25fZmxvdy9mZXRjaF9jb250ZW50X2Zvcm0uY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixNQUFNO0VBQ04sMEJBQXNCO1VBQXRCO0FBQ0Y7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGNBQWM7RUFDZCxNQUFNO0VBQ04sV0FBVztFQUNYLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIiLCJmaWxlIjoic3JjL2FwcC9zY3JlZW5fdmFsaWRhdGlvbl9mbG93L2ZldGNoX2NvbnRlbnRfZm9ybS5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLmZvcm0tY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgbWluLXdpZHRoOiA2MDBweDtcbiAgb3ZlcmZsb3c6YXV0bztcbiAgbWF4LWhlaWdodDogNjAwcHg7XG4gIGZsZXg6MTtcbiAgcGFkZGluZy1ibG9jay1zdGFydDogMCVcbn1cblxuLnNlbGVjdGVkLWNvbnRlbnQge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMTVweDtcbiAgbWF4LWhlaWdodDogMTAwcHg7XG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XG59XG5cbi5zZWxlY3RlZC1jb250ZW50LXNwYW4ge1xuICBmb250LXNpemU6MTJweDtcbiAgY29sb3I6ICMzZjUxYjU7XG4gIGZsZXg6MTtcbiAgaGVpZ2h0OiAxMDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/screen_validation_flow/fetch_content_form.ts":
/*!**************************************************************!*\
  !*** ./src/app/screen_validation_flow/fetch_content_form.ts ***!
  \**************************************************************/
/*! exports provided: FetchContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchContentComponent", function() { return FetchContentComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/actions */ "./src/app/constants/actions.ts");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/rect */ "./src/app/constants/rect.ts");
/* harmony import */ var _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/screen_validation_constants */ "./src/app/constants/screen_validation_constants.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
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








/** Fetch the screen content */
var FetchContentComponent = /** @class */ (function () {
    function FetchContentComponent(backendManagerService) {
        this.backendManagerService = backendManagerService;
        this.STRATEGY_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_6__["FETCH_CONTENT_STRATEGY_TYPES"];
        this.currentSelectedText = '';
        this.showButtons = true;
        /** Handle on-destroy Subject, used to unsubscribe. */
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this.fetchActionDetails = {
            name: '',
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_4__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.type,
            strategy: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_6__["StrategyType"].POSITION,
            selector: '',
            globalVariableName: '',
            attributeType: '',
            isExportField: true,
            bounds: undefined,
        };
        this.fetchActionDetailsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.screenContentSummary = {
            displayText: '',
            resourceId: '',
            checked: false,
        };
        this.actionAdded = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.previousPage = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["delay"])(0), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroyed))
            .subscribe(function (screenContentSummary) {
            _this.screenContentSummary = screenContentSummary;
            _this.currentSelectedText = _this.screenContentSummary.displayText;
            _this.updateSelector(_constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_6__["StrategyType"].POSITION);
        });
    };
    Object.defineProperty(FetchContentComponent.prototype, "selectedBounds", {
        set: function (selectedBounds) {
            this.fetchActionDetails.bounds = selectedBounds;
            this.fetchContentData();
        },
        enumerable: true,
        configurable: true
    });
    FetchContentComponent.prototype.selectorChanged = function (event) {
        this.updateSelector(event.value);
    };
    FetchContentComponent.prototype.updateSelector = function (strategy) {
        switch (strategy) {
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_6__["StrategyType"].POSITION:
                if (this.fetchActionDetails.bounds) {
                    // If fetchActionDetails comes from json.parse, it won't have
                    // toBoundsStr function on bounds field.
                    var bounds = new _constants_rect__WEBPACK_IMPORTED_MODULE_5__["Bounds"](this.fetchActionDetails.bounds.x1, this.fetchActionDetails.bounds.x2, this.fetchActionDetails.bounds.y1, this.fetchActionDetails.bounds.y2);
                    this.fetchActionDetails.selector = bounds.toBoundsStr();
                }
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_6__["StrategyType"].RESOURCEID:
                this.fetchActionDetails.selector = this.screenContentSummary.resourceId;
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_6__["StrategyType"].XPATH:
                this.fetchActionDetails.selector = ''; // XPath is provided by user.
                break;
            default:
                break;
        }
    };
    FetchContentComponent.prototype.showAttributeInput = function () {
        return this.fetchActionDetails.strategy === _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_6__["StrategyType"].XPATH;
    };
    FetchContentComponent.prototype.closePopup = function () {
        var _this = this;
        this.backendManagerService.addActionToWorkflow(this.fetchActionDetails)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroyed))
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
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__["BackendManagerService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], FetchContentComponent.prototype, "showButtons", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], FetchContentComponent.prototype, "fetchActionDetails", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], FetchContentComponent.prototype, "fetchActionDetailsChange", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _constants_rect__WEBPACK_IMPORTED_MODULE_5__["Bounds"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_constants_rect__WEBPACK_IMPORTED_MODULE_5__["Bounds"]])
    ], FetchContentComponent.prototype, "selectedBounds", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], FetchContentComponent.prototype, "actionAdded", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], FetchContentComponent.prototype, "previousPage", void 0);
    FetchContentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'fetch-content-form',
            template: __webpack_require__(/*! raw-loader!./fetch_content_form.ng.html */ "./node_modules/raw-loader/index.js!./src/app/screen_validation_flow/fetch_content_form.ng.html"),
            styles: [__webpack_require__(/*! ./fetch_content_form.css */ "./src/app/screen_validation_flow/fetch_content_form.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__["BackendManagerService"]])
    ], FetchContentComponent);
    return FetchContentComponent;
}());



/***/ }),

/***/ "./src/app/screen_validation_flow/screen_validation_flow.css":
/*!*******************************************************************!*\
  !*** ./src/app/screen_validation_flow/screen_validation_flow.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n\n.info-text {\n  color: #3f51b5;\n}\n\n\n.step-two-form {\n  margin-left: 20px;\n}\n\n\n.summary-container {\n  display:flex;\n  flex-direction: column;\n}\n\n\n.summary-table {\n  border-collapse: collapse;\n  border-spacing: 0;\n  display: table;\n  width: 100%;\n}\n\n\n.summary-table tr {\n  border-bottom: 1px solid rgba(0,0,0,.12);\n}\n\n\n.summary-table td:nth-child(2) {\n  color: #3f51b5;\n}\n\n\n.validation-flow-step {\n  height: 280px;\n  margin-top: 30px;\n  margin-bottom: 30px;\n}\n\n\n.validation-stepper {\n  color: #666;\n  height: 500px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2NyZWVuX3ZhbGlkYXRpb25fZmxvdy9zY3JlZW5fdmFsaWRhdGlvbl9mbG93LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7O0FBR0Y7RUFDRSxjQUFjO0FBQ2hCOzs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7O0FBRUE7RUFDRSxZQUFZO0VBQ1osc0JBQXNCO0FBQ3hCOzs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixpQkFBaUI7RUFDakIsY0FBYztFQUNkLFdBQVc7QUFDYjs7O0FBRUE7RUFDRSx3Q0FBd0M7QUFDMUM7OztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtBQUNyQjs7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtBQUNmIiwiZmlsZSI6InNyYy9hcHAvc2NyZWVuX3ZhbGlkYXRpb25fZmxvdy9zY3JlZW5fdmFsaWRhdGlvbl9mbG93LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5cbi5pbmZvLXRleHQge1xuICBjb2xvcjogIzNmNTFiNTtcbn1cblxuLnN0ZXAtdHdvLWZvcm0ge1xuICBtYXJnaW4tbGVmdDogMjBweDtcbn1cblxuLnN1bW1hcnktY29udGFpbmVyIHtcbiAgZGlzcGxheTpmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uc3VtbWFyeS10YWJsZSB7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIGJvcmRlci1zcGFjaW5nOiAwO1xuICBkaXNwbGF5OiB0YWJsZTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5zdW1tYXJ5LXRhYmxlIHRyIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwwLDAsLjEyKTtcbn1cblxuLnN1bW1hcnktdGFibGUgdGQ6bnRoLWNoaWxkKDIpIHtcbiAgY29sb3I6ICMzZjUxYjU7XG59XG5cbi52YWxpZGF0aW9uLWZsb3ctc3RlcCB7XG4gIGhlaWdodDogMjgwcHg7XG4gIG1hcmdpbi10b3A6IDMwcHg7XG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XG59XG5cbi52YWxpZGF0aW9uLXN0ZXBwZXIge1xuICBjb2xvcjogIzY2NjtcbiAgaGVpZ2h0OiA1MDBweDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/screen_validation_flow/screen_validation_flow.ts":
/*!******************************************************************!*\
  !*** ./src/app/screen_validation_flow/screen_validation_flow.ts ***!
  \******************************************************************/
/*! exports provided: ScreenValidationFlowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenValidationFlowComponent", function() { return ScreenValidationFlowComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/rect */ "./src/app/constants/rect.ts");
/* harmony import */ var _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/screen_validation_constants */ "./src/app/constants/screen_validation_constants.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/control_message_service */ "./src/app/services/control_message_service.ts");
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
        this.VALIDATION_GROUPS = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["VALIDATION_GROUPS"];
        this.VALIDATION_ACTIONS = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["VALIDATION_ACTIONS"];
        this.SPECIAL_CLICK_ACTIONS = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["SPECIAL_CLICK_ACTIONS"];
        this.DIRECTIONS = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["DIRECTIONS"];
        this.elementSelectorTypes = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["ELEMENT_SELECTOR_TYPES"];
        this.selectedBounds = new _constants_rect__WEBPACK_IMPORTED_MODULE_4__["Bounds"](0, 0, 0, 0);
        this.selectedDirection = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["DirectionType"].DOWN;
        this.selectedElementSelectorType = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["ElementSelectorType"].DISPLAY_TEXT;
        this.selectedValidationGroup = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["ValidationGroupType"].SCREEN_CONTENT_VALIDATION;
        this.selectedSpecialClick = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["SpecialClickType"].DOUBLE_CLICK;
        this.selectedValidationAction = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["ValidationActionType"].SCREEN_CONTENT_VALIDATION_ACTION;
        this.selectedBounds = data.bounds;
    }
    ScreenValidationFlowComponent.prototype.closePopup = function () {
        this.dialogRef.close();
    };
    Object.defineProperty(ScreenValidationFlowComponent.prototype, "selectedActionType", {
        get: function () {
            return this.selectedValidationAction;
        },
        enumerable: true,
        configurable: true
    });
    ScreenValidationFlowComponent.prototype.getNextButtonText = function () {
        if (this.selectedValidationGroup === _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["ValidationGroupType"].SPECIAL_CLICK) {
            return 'Add Action';
        }
        return 'Next';
    };
    ScreenValidationFlowComponent.prototype.nextPage = function (stepper) {
        if (this.selectedValidationGroup === _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["ValidationGroupType"].SPECIAL_CLICK) {
            this.specialClick();
            return;
        }
        stepper.next();
    };
    ScreenValidationFlowComponent.prototype.showDirection = function () {
        return this.selectedValidationGroup ===
            _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["ValidationGroupType"].SCREEN_CONTENT_VALIDATION &&
            this.selectedValidationAction ===
                _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["ValidationActionType"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION;
    };
    ScreenValidationFlowComponent.prototype.showFetchContentAction = function () {
        return this.selectedValidationGroup ===
            _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["ValidationGroupType"].FETCH_SCREEN_CONTENT;
    };
    ScreenValidationFlowComponent.prototype.showSpecialActions = function () {
        return this.selectedValidationGroup === _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["ValidationGroupType"].SPECIAL_CLICK;
    };
    ScreenValidationFlowComponent.prototype.showValidationActions = function () {
        return this.selectedValidationGroup ===
            _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["ValidationGroupType"].SCREEN_CONTENT_VALIDATION;
    };
    ScreenValidationFlowComponent.prototype.specialClick = function () {
        var _this = this;
        var observable = null;
        switch (this.selectedSpecialClick) {
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["SpecialClickType"].DOUBLE_CLICK:
                observable = this.backendManagerService.doubleClick((this.selectedBounds.x1 + this.selectedBounds.x2) / 2, (this.selectedBounds.y1 + this.selectedBounds.y2) / 2);
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["SpecialClickType"].LONG_CLICK:
                observable = this.backendManagerService.longClick((this.selectedBounds.x1 + this.selectedBounds.x2) / 2, (this.selectedBounds.y1 + this.selectedBounds.y2) / 2, this.LONGCLICK_DURATION_MS);
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["SpecialClickType"].ZOOM_IN:
                observable = this.backendManagerService.zoom(this.selectedBounds.x1, this.selectedBounds.y1, this.selectedBounds.x2, this.selectedBounds.y2, true);
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_5__["SpecialClickType"].ZOOM_OUT:
                observable = this.backendManagerService.zoom(this.selectedBounds.x1, this.selectedBounds.y1, this.selectedBounds.x2, this.selectedBounds.y2, false);
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
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_6__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_7__["ControlMessageService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    ScreenValidationFlowComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'screen-validation-flow',
            template: __webpack_require__(/*! raw-loader!./screen_validation_flow.ng.html */ "./node_modules/raw-loader/index.js!./src/app/screen_validation_flow/screen_validation_flow.ng.html"),
            styles: [__webpack_require__(/*! ./screen_validation_flow.css */ "./src/app/screen_validation_flow/screen_validation_flow.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_6__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_7__["ControlMessageService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"], Object])
    ], ScreenValidationFlowComponent);
    return ScreenValidationFlowComponent;
}());



/***/ }),

/***/ "./src/app/screen_validation_flow/screen_validation_flow_module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/screen_validation_flow/screen_validation_flow_module.ts ***!
  \*************************************************************************/
/*! exports provided: ScreenValidationFlowModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenValidationFlowModule", function() { return ScreenValidationFlowModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/esm5/stepper.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _screen_validation_flow_screen_validation_flow__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../screen_validation_flow/screen_validation_flow */ "./src/app/screen_validation_flow/screen_validation_flow.ts");
/* harmony import */ var _fetch_content_form__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./fetch_content_form */ "./src/app/screen_validation_flow/fetch_content_form.ts");
/* harmony import */ var _validation_details__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./validation_details */ "./src/app/screen_validation_flow/validation_details.ts");
/* harmony import */ var _validation_info__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./validation_info */ "./src/app/screen_validation_flow/validation_info.ts");
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




















var ScreenValidationFlowModule = /** @class */ (function () {
    function ScreenValidationFlowModule() {
    }
    ScreenValidationFlowModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
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

/***/ "./src/app/screen_validation_flow/validation_details.css":
/*!***************************************************************!*\
  !*** ./src/app/screen_validation_flow/validation_details.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n\n.input-highlight {\n  color:#3f51b5;\n}\n\n\n.mat-select-panel {\n  opacity: 0;\n  background: white;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2NyZWVuX3ZhbGlkYXRpb25fZmxvdy92YWxpZGF0aW9uX2RldGFpbHMuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOzs7QUFHRjtFQUNFLGFBQWE7QUFDZjs7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvc2NyZWVuX3ZhbGlkYXRpb25fZmxvdy92YWxpZGF0aW9uX2RldGFpbHMuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cblxuLmlucHV0LWhpZ2hsaWdodCB7XG4gIGNvbG9yOiMzZjUxYjU7XG59XG5cbi5tYXQtc2VsZWN0LXBhbmVsIHtcbiAgb3BhY2l0eTogMDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/screen_validation_flow/validation_details.ts":
/*!**************************************************************!*\
  !*** ./src/app/screen_validation_flow/validation_details.ts ***!
  \**************************************************************/
/*! exports provided: ValidationDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationDetailsComponent", function() { return ValidationDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/rect */ "./src/app/constants/rect.ts");
/* harmony import */ var _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/screen_validation_constants */ "./src/app/constants/screen_validation_constants.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
/* harmony import */ var _validation_info__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./validation_info */ "./src/app/screen_validation_flow/validation_info.ts");
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










/** Fetch the screen content */
var ValidationDetailsComponent = /** @class */ (function () {
    function ValidationDetailsComponent(backendManagerService, dialog) {
        this.backendManagerService = backendManagerService;
        this.dialog = dialog;
        this.CONTENT_MATCH_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["CONTENT_MATCH_TYPES"];
        this.ELEMENT_SELECTOR_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ELEMENT_SELECTOR_TYPES"];
        this.SCREEN_CONTENT_SEARCH_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["SCREEN_CONTENT_SEARCH_TYPES"];
        this.STOP_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["STOP_TYPES"];
        this.WAIT_UNTIL_TYPES = _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["WAIT_UNTIL_TYPES"];
        this.showButtons = true;
        /** Handle on-destroy Subject, used to unsubscribe. */
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        this.validationActionDetails = {
            actionType: '',
            contentData: '',
            selectedBounds: undefined,
            contentMatchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ContentMatchType"].EQUALS,
            contextStorageType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ContextStorageType"].TEXT_BASED,
            elementSelectorType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ElementSelectorType"]
                .DISPLAY_TEXT,
            screenContentSearchType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ScreenContentSearchType"]
                .FULLSCREEN,
            scrollDirectionType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["DirectionType"].UP,
            stopType: _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["StopType"].STOP_TEST_IF_FALSE,
            timeout: 60,
            waitUntilDisappear: false,
            scrollMaxNumber: 30,
        };
        this.validationActionDetailsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.actionAdded = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.previousPage = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["delay"])(0), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationDetailsComponent.prototype, "selectedActionType", {
        set: function (actionType) {
            this.validationActionDetails.actionType = actionType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationDetailsComponent.prototype, "scrollDirectionType", {
        set: function (scrollDirectionType) {
            this.validationActionDetails.scrollDirectionType = scrollDirectionType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationDetailsComponent.prototype, "selectedWaitUntilType", {
        get: function () {
            if (this.validationActionDetails.waitUntilDisappear) {
                return _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["WaitUntilType"].WAIT_UNTIL_DISAPPEAR;
            }
            return _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["WaitUntilType"].WAIT_UNTIL_APPEAR;
        },
        /**
         * WaitUntilType and MatchNodeContext doesn't align with backend definition,
         * use the set/get function to convert between boolean and enum
         */
        set: function (value) {
            if (value ===
                _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["WaitUntilType"].WAIT_UNTIL_DISAPPEAR) {
                this.validationActionDetails.waitUntilDisappear = true;
                return;
            }
            this.validationActionDetails.waitUntilDisappear = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationDetailsComponent.prototype, "matchNodeContext", {
        get: function () {
            return this.validationActionDetails.contextStorageType ===
                _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ContextStorageType"].CONTEXT_BASED;
        },
        set: function (value) {
            if (value) {
                this.validationActionDetails.contextStorageType =
                    _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ContextStorageType"].CONTEXT_BASED;
                return;
            }
            this.validationActionDetails.contextStorageType =
                _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ContextStorageType"].TEXT_BASED;
        },
        enumerable: true,
        configurable: true
    });
    ValidationDetailsComponent.prototype.isConditionalClick = function () {
        return this.validationActionDetails.actionType ===
            _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ValidationActionType"].CONDITION_CLICK_ACTION;
    };
    ValidationDetailsComponent.prototype.isLoopValidation = function () {
        return this.validationActionDetails.actionType ===
            _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ValidationActionType"]
                .LOOP_SCREEN_CONTENT_VALIDATION_ACTION;
    };
    ValidationDetailsComponent.prototype.isScrollValidation = function () {
        return this.validationActionDetails.actionType ===
            _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ValidationActionType"]
                .SCROLL_SCREEN_CONTENT_VALIDATION_ACTION;
    };
    ValidationDetailsComponent.prototype.openValidationDetailsInfoDlg = function () {
        this.dialog.open(_validation_info__WEBPACK_IMPORTED_MODULE_9__["ValidationInfoDialogComponent"], {
            width: _constants_constants__WEBPACK_IMPORTED_MODULE_5__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
        });
    };
    ValidationDetailsComponent.prototype.updateContentData = function () {
        if (!this.screenContentSummary) {
            return;
        }
        switch (this.validationActionDetails.elementSelectorType) {
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ElementSelectorType"].DISPLAY_TEXT:
                this.validationActionDetails.contentData =
                    this.screenContentSummary.displayText;
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ElementSelectorType"].RESOURCE_ID:
                this.validationActionDetails.contentData =
                    this.screenContentSummary.resourceId;
                break;
            case _constants_screen_validation_constants__WEBPACK_IMPORTED_MODULE_7__["ElementSelectorType"].CHECK:
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
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
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__["BackendManagerService"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ValidationDetailsComponent.prototype, "showButtons", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ValidationDetailsComponent.prototype, "validationActionDetails", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ValidationDetailsComponent.prototype, "validationActionDetailsChange", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _constants_rect__WEBPACK_IMPORTED_MODULE_6__["Bounds"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_constants_rect__WEBPACK_IMPORTED_MODULE_6__["Bounds"]])
    ], ValidationDetailsComponent.prototype, "selectedBounds", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [String])
    ], ValidationDetailsComponent.prototype, "selectedActionType", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Number])
    ], ValidationDetailsComponent.prototype, "scrollDirectionType", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ValidationDetailsComponent.prototype, "actionAdded", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ValidationDetailsComponent.prototype, "previousPage", void 0);
    ValidationDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'validation-details',
            template: __webpack_require__(/*! raw-loader!./validation_details.ng.html */ "./node_modules/raw-loader/index.js!./src/app/screen_validation_flow/validation_details.ng.html"),
            styles: [__webpack_require__(/*! ./validation_details.css */ "./src/app/screen_validation_flow/validation_details.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_backend_manager_service__WEBPACK_IMPORTED_MODULE_8__["BackendManagerService"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], ValidationDetailsComponent);
    return ValidationDetailsComponent;
}());



/***/ }),

/***/ "./src/app/screen_validation_flow/validation_info.css":
/*!************************************************************!*\
  !*** ./src/app/screen_validation_flow/validation_info.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.info-table {\n  width: 100%;\n  display: table;\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.info-table tr {\n  border-bottom: 1px solid rgba(0,0,0,0.12);\n}\n\n.info-table td:nth-child(2) {\n  border-left: 1px solid rgba(0,0,0,0.12);\n  max-width: 400px;\n}\n\n.info-table td:nth-child(1) {\n\n  min-width: 150px;\n}\n\n.foot-note {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2NyZWVuX3ZhbGlkYXRpb25fZmxvdy92YWxpZGF0aW9uX2luZm8uY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0VBQ0UsV0FBVztFQUNYLGNBQWM7RUFDZCx5QkFBeUI7RUFDekIsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsdUNBQXVDO0VBQ3ZDLGdCQUFnQjtBQUNsQjs7QUFFQTs7RUFFRSxnQkFBZ0I7QUFDbEI7O0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCIiwiZmlsZSI6InNyYy9hcHAvc2NyZWVuX3ZhbGlkYXRpb25fZmxvdy92YWxpZGF0aW9uX2luZm8uY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5pbmZvLXRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IHRhYmxlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBib3JkZXItc3BhY2luZzogMDtcbn1cbi5pbmZvLXRhYmxlIHRyIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4xMik7XG59XG5cbi5pbmZvLXRhYmxlIHRkOm50aC1jaGlsZCgyKSB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgcmdiYSgwLDAsMCwwLjEyKTtcbiAgbWF4LXdpZHRoOiA0MDBweDtcbn1cblxuLmluZm8tdGFibGUgdGQ6bnRoLWNoaWxkKDEpIHtcblxuICBtaW4td2lkdGg6IDE1MHB4O1xufVxuLmZvb3Qtbm90ZSB7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/screen_validation_flow/validation_info.ts":
/*!***********************************************************!*\
  !*** ./src/app/screen_validation_flow/validation_info.ts ***!
  \***********************************************************/
/*! exports provided: ValidationInfoDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationInfoDialogComponent", function() { return ValidationInfoDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
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



/** Displays the instruction for validation related actions */
var ValidationInfoDialogComponent = /** @class */ (function () {
    function ValidationInfoDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    ValidationInfoDialogComponent.prototype.onOkClick = function () {
        this.dialogRef.close();
    };
    ValidationInfoDialogComponent.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] }
    ]; };
    ValidationInfoDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'validation-info-dialog',
            template: __webpack_require__(/*! raw-loader!./validation_info.ng.html */ "./node_modules/raw-loader/index.js!./src/app/screen_validation_flow/validation_info.ng.html"),
            styles: [__webpack_require__(/*! ./validation_info.css */ "./src/app/screen_validation_flow/validation_info.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], ValidationInfoDialogComponent);
    return ValidationInfoDialogComponent;
}());



/***/ }),

/***/ "./src/app/services/backend_manager_service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/backend_manager_service.ts ***!
  \*****************************************************/
/*! exports provided: BackendManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackendManagerService", function() { return BackendManagerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
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
    /** Copies the given action with a new uuid */
    BackendManagerService.prototype.copyAction = function (uuid) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/copyAction', { params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('uuidStr', uuid) });
    };
    /** Creates a new workspace */
    BackendManagerService.prototype.createNewWorkSpace = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/createNewWorkSpace');
    };
    /** Deep copy project */
    BackendManagerService.prototype.deepCopyProject = function (projectDeepCopyRequest) {
        return this.http.post(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/deepCopyProjectTree', projectDeepCopyRequest, this.OPTIONS);
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
    BackendManagerService.prototype.removeLastAction = function () {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/removeLastAction');
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
    BackendManagerService.prototype.tap = function (x, y) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/tap', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
                .set('x', Math.floor(x).toString())
                .set('y', Math.floor(y).toString())
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
     * Fetches the methods availabe in the snippet validation action for the
     * selected package.
     * @param packageName name of the package of which the methods needs to
     *     fetched
     */
    BackendManagerService.prototype.getAllAvailableSnippetMethods = function (packageName) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/getAllAvailableSnippetMethods', {
            params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('packageName', packageName),
        });
    };
    BackendManagerService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    BackendManagerService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], BackendManagerService);
    return BackendManagerService;
}());



/***/ }),

/***/ "./src/app/services/control_message_service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/control_message_service.ts ***!
  \*****************************************************/
/*! exports provided: ControlMessageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlMessageService", function() { return ControlMessageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
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
    ControlMessageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], ControlMessageService);
    return ControlMessageService;
}());



/***/ }),

/***/ "./src/app/services/devices_manager_service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/devices_manager_service.ts ***!
  \*****************************************************/
/*! exports provided: DeviceInfo, DevicesManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceInfo", function() { return DeviceInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevicesManagerService", function() { return DevicesManagerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/rect */ "./src/app/constants/rect.ts");
/* harmony import */ var _backend_manager_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./backend_manager_service */ "./src/app/services/backend_manager_service.ts");
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





/** Maintains the connected device details information */
var DeviceInfo = /** @class */ (function () {
    function DeviceInfo(jsonData) {
        var obj = JSON.parse(jsonData);
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
    DeviceInfo.ctorParameters = function () { return [
        { type: String }
    ]; };
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
    DevicesManagerService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_backend_manager_service__WEBPACK_IMPORTED_MODULE_4__["BackendManagerService"]])
    ], DevicesManagerService);
    return DevicesManagerService;
}());



/***/ }),

/***/ "./src/app/services/log_service.ts":
/*!*****************************************!*\
  !*** ./src/app/services/log_service.ts ***!
  \*****************************************/
/*! exports provided: LogService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogService", function() { return LogService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs_webSocket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/webSocket */ "./node_modules/rxjs/_esm5/webSocket/index.js");
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
    LogService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LogService);
    return LogService;
}());



/***/ }),

/***/ "./src/app/services/minicap_service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/minicap_service.ts ***!
  \*********************************************/
/*! exports provided: MinicapService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinicapService", function() { return MinicapService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs_webSocket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/webSocket */ "./node_modules/rxjs/_esm5/webSocket/index.js");
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
    MinicapService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], MinicapService);
    return MinicapService;
}());



/***/ }),

/***/ "./src/app/services/test_case_manager_service.ts":
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _constants_jstree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/jstree */ "./src/app/constants/jstree.ts");
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
     * Send request to backend to deep copy the action with the given actionId.
     * Return the created action with new uuid and all its children action are
     * also with new uuid.
     */
    TestCaseManagerService.prototype.importTestCaseByActionId = function (actionId) {
        return this.http.get(_constants_constants__WEBPACK_IMPORTED_MODULE_3__["BACKEND_BASE_URL"] + '/importTestCaseByActionId', { params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().set('actionId', actionId) });
    };
    TestCaseManagerService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    TestCaseManagerService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({ providedIn: 'root' }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
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

/***/ "./src/app/test_explorer/action_edit_dialog.css":
/*!******************************************************!*\
  !*** ./src/app/test_explorer/action_edit_dialog.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.example-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.example-container > * {\n  width: 100%;\n}\n\n.createdByLabel {\n  color: darkred;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVzdF9leHBsb3Jlci9hY3Rpb25fZWRpdF9kaWFsb2cuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGNBQWM7QUFDaEIiLCJmaWxlIjoic3JjL2FwcC90ZXN0X2V4cGxvcmVyL2FjdGlvbl9lZGl0X2RpYWxvZy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLmV4YW1wbGUtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmV4YW1wbGUtY29udGFpbmVyID4gKiB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uY3JlYXRlZEJ5TGFiZWwge1xuICBjb2xvcjogZGFya3JlZDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/test_explorer/action_edit_dialog.ts":
/*!*****************************************************!*\
  !*** ./src/app/test_explorer/action_edit_dialog.ts ***!
  \*****************************************************/
/*! exports provided: ActionEditDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionEditDialog", function() { return ActionEditDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _advanced_actions_dialog_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../advanced_actions_dialog/advanced_actions_dialog */ "./src/app/advanced_actions_dialog/advanced_actions_dialog.ts");
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/actions */ "./src/app/constants/actions.ts");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _constants_jstree__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/jstree */ "./src/app/constants/jstree.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/control_message_service */ "./src/app/services/control_message_service.ts");
/* harmony import */ var _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../services/test_case_manager_service */ "./src/app/services/test_case_manager_service.ts");
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
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_4__["ReplaySubject"](1);
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.actionData = data;
            if (_this.actionData.name == null ||
                _this.actionData.name.includes(_constants_constants__WEBPACK_IMPORTED_MODULE_8__["DEFAULT_WORKFLOW_NAME"])) {
                _this.isNewWorkflow = true;
                _this.actionData.name = '';
            }
            if (_this.data.isCopyAction) {
                _this.isNewWorkflow = true;
            }
            _this.showEditDetails = _this.hasEditDetails();
        });
        this.backendManagerService.getCurrentUser()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.currentUser = data.name;
        });
        this.testCaseManagerService.getTestCasesList()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            var root = JSON.parse(data.treeDetails);
            _this.folderList = retrieveFolders(root);
            if (_this.folderList.length > 0) {
                _this.saveToFolderId =
                    _this.folderList[_this.folderList.length - 1].id;
            }
        });
        this.backendManagerService.getPlayMode()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.playMode = data;
        });
    };
    ActionEditDialog.prototype.hasEditDetails = function () {
        if (!this.actionData.actionType) {
            return false;
        }
        if (this.actionData.actionType === _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CLICK_ACTION.actionType) {
            return this.actionData.isByElement === true;
        }
        return ActionEditDialog_1.ADVANCED_ACTIONS.includes(this.actionData.actionType);
    };
    ActionEditDialog.prototype.isCompoundAction = function () {
        return this.actionData.actionType === _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].COMPOUND_ACTION.actionType;
    };
    ActionEditDialog.prototype.isClickAction = function () {
        return this.actionData.actionType === _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CLICK_ACTION.actionType;
    };
    ActionEditDialog.prototype.isImageDiffValidationAction = function () {
        return this.actionData.actionType ===
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.actionType;
    };
    ActionEditDialog.prototype.isMLImageValidation = function () {
        return this.actionData.actionType ===
            _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.actionType;
    };
    ActionEditDialog.prototype.isMultiPlayMode = function () {
        return this.playMode === 'MULTIDEVICE';
    };
    ActionEditDialog.prototype.editAction = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_advanced_actions_dialog_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_6__["AdvancedActionDialogComponent"], { width: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["POPUP_DIALOG_DEFAULT_DIMENSION"].width, data: this.actionData });
        dialogRef.afterClosed().subscribe(function (isSaved) {
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
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
                .subscribe();
        }
        this.backendManagerService.removeAction(this.data.index)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
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
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
                .subscribe(function () {
                var node = new _constants_jstree__WEBPACK_IMPORTED_MODULE_9__["JsTreeNode"](_this.actionData.name, _this.data.uuid, false);
                node.additionalData = [_this.data.uuid];
                var newNode = { parentId: _this.saveToFolderId, node: node };
                _this.controlMessageService.sendMessage({
                    messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].ADD_NODE_TO_TREE,
                    extra: JSON.stringify(newNode)
                });
                _this.closeDialog();
            });
        }
        else {
            this.backendManagerService.updateActionMetadata(this.actionData)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
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
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].COMMAND_LINE_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CLICK_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].INPUT_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].REBOOT_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SNIPPET_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCRIPT_EXECUTION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].IMAGE_DIFF_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOGCAT_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].GLOBAL_VARIABLE_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].ML_IMAGE_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].FETCH_SCREEN_CONTENT_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CONTENT_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].LOOP_SCREEN_CONTENT_VALIDATION_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CONDITION_CLICK_ACTION.actionType,
        _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].CONDITION_VALIDATION_ACTION.actionType,
    ];
    ActionEditDialog.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_10__["BackendManagerService"] },
        { type: _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_12__["TestCaseManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_11__["ControlMessageService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    ActionEditDialog = ActionEditDialog_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'action-edit-dialog',
            template: __webpack_require__(/*! raw-loader!./action_edit_dialog.ng.html */ "./node_modules/raw-loader/index.js!./src/app/test_explorer/action_edit_dialog.ng.html"),
            styles: [__webpack_require__(/*! ./action_edit_dialog.css */ "./src/app/test_explorer/action_edit_dialog.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](6, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_10__["BackendManagerService"],
            _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_12__["TestCaseManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_11__["ControlMessageService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"], Object])
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

/***/ "./src/app/test_explorer/import_dialog.css":
/*!*************************************************!*\
  !*** ./src/app/test_explorer/import_dialog.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.inputField {\n  width: 100% !important;\n}\n\n.tree {\n  margin-top: 20px;\n}\n\n.mat-icon-button {\n  float: right;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVzdF9leHBsb3Jlci9pbXBvcnRfZGlhbG9nLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFlBQVk7QUFDZCIsImZpbGUiOiJzcmMvYXBwL3Rlc3RfZXhwbG9yZXIvaW1wb3J0X2RpYWxvZy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLmlucHV0RmllbGQge1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufVxuXG4udHJlZSB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbi5tYXQtaWNvbi1idXR0b24ge1xuICBmbG9hdDogcmlnaHQ7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/test_explorer/import_dialog.ts":
/*!************************************************!*\
  !*** ./src/app/test_explorer/import_dialog.ts ***!
  \************************************************/
/*! exports provided: ImportDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportDialog", function() { return ImportDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _constants_jstree__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/jstree */ "./src/app/constants/jstree.ts");
/* harmony import */ var _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/test_case_manager_service */ "./src/app/services/test_case_manager_service.ts");
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

// taze: $, JQuery from //third_party/javascript/typings/jquery:jquery_without_externs
// taze: jstree from //third_party/javascript/typings/jstree:jstree








/**
 * Dialog for importing test cases by username or uuid from backend into
 * current users workspace.
 */
var ImportDialog = /** @class */ (function () {
    function ImportDialog(dialogRef, testCaseManagerService, snackBar) {
        this.dialogRef = dialogRef;
        this.testCaseManagerService = testCaseManagerService;
        this.snackBar = snackBar;
        this.uuidImportText = '';
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_4__["ReplaySubject"](1);
    }
    ImportDialog.prototype.ngOnInit = function () {
    };
    ImportDialog.prototype.importTestCase = function () {
        var _this = this;
        if (this.uuidImportText !== '') {
            this.testCaseManagerService.importTestCaseByActionId(this.uuidImportText)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function (error) {
                _this.snackBar.open("Test case doesn't exist", 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_6__["SNACKBAR_DURATION_MS"] });
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(null);
            }))
                .subscribe(function (metadata) {
                if (metadata && metadata.actionId) {
                    var copy = new _constants_jstree__WEBPACK_IMPORTED_MODULE_7__["JsTreeNode"](metadata.name, metadata.actionId, false);
                    copy.additionalData = [metadata.actionId];
                    _this.dialogRef.close([copy]);
                }
            });
        }
    };
    ImportDialog.prototype.ngOnDestroy = function () {
        // Unsubscribe all pending subscriptions.
        this.destroyed.next();
    };
    ImportDialog.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_8__["TestCaseManagerService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] }
    ]; };
    ImportDialog = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-import-dialog',
            template: __webpack_require__(/*! raw-loader!./import_dialog.ng.html */ "./node_modules/raw-loader/index.js!./src/app/test_explorer/import_dialog.ng.html"),
            styles: [__webpack_require__(/*! ./import_dialog.css */ "./src/app/test_explorer/import_dialog.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_8__["TestCaseManagerService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"]])
    ], ImportDialog);
    return ImportDialog;
}());



/***/ }),

/***/ "./src/app/test_explorer/import_project_dialog.css":
/*!*********************************************************!*\
  !*** ./src/app/test_explorer/import_project_dialog.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.inputField {\n    width: 100%;\n}\n\n.waitingOverlay {\n  background-color:gray;\n  width: 100%;\n  height: 100%;\n  opacity: 0.5;\n  z-index: 99;\n  top: 0px;\n  margin-top: 20px;\n}\n\n.hiddenInput {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVzdF9leHBsb3Jlci9pbXBvcnRfcHJvamVjdF9kaWFsb2cuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0lBQ0ksV0FBVztBQUNmOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLFdBQVc7RUFDWCxZQUFZO0VBQ1osWUFBWTtFQUNaLFdBQVc7RUFDWCxRQUFRO0VBQ1IsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtBQUNmIiwiZmlsZSI6InNyYy9hcHAvdGVzdF9leHBsb3Jlci9pbXBvcnRfcHJvamVjdF9kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5pbnB1dEZpZWxkIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLndhaXRpbmdPdmVybGF5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjpncmF5O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvcGFjaXR5OiAwLjU7XG4gIHotaW5kZXg6IDk5O1xuICB0b3A6IDBweDtcbiAgbWFyZ2luLXRvcDogMjBweDtcbn1cblxuLmhpZGRlbklucHV0IHtcbiAgZGlzcGxheTogbm9uZTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/test_explorer/import_project_dialog.ts":
/*!********************************************************!*\
  !*** ./src/app/test_explorer/import_project_dialog.ts ***!
  \********************************************************/
/*! exports provided: ImportProjectDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportProjectDialog", function() { return ImportProjectDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/control_message_service */ "./src/app/services/control_message_service.ts");
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

// taze: $, JQuery from //third_party/javascript/typings/jquery:jquery_without_externs
// taze: jstree from //third_party/javascript/typings/jstree:jstree








/**
 * Dialog for importing project by username into a new project.
 */
var ImportProjectDialog = /** @class */ (function () {
    function ImportProjectDialog(dialogRef, backendManagerService, controlMessageService, snackBar) {
        this.dialogRef = dialogRef;
        this.backendManagerService = backendManagerService;
        this.controlMessageService = controlMessageService;
        this.snackBar = snackBar;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_4__["ReplaySubject"](1);
        this.IMPORT_ZIP = 'From zip file';
        this.IMPORT_USER = 'From user';
        this.importTypes = [this.IMPORT_ZIP, this.IMPORT_USER];
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.projectList = data.projectList;
        });
    };
    ImportProjectDialog.prototype.importProject = function () {
        if (this.targetProjectName.length < 3) {
            this.snackBar.open("Project name length need to be greater than 3.", 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_6__["SNACKBAR_DURATION_MS"] });
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (response) {
            if (response.success) {
                var projectDeepCopyRequest = {
                    srcProjectId: _this.selectedProject.projectId,
                    targetProjectId: response.projectList[0].projectId,
                };
                return _this.backendManagerService.deepCopyProject(projectDeepCopyRequest);
            }
            else {
                _this.controlMessageService.sendHideOverlayMsg();
                _this.snackBar.open("Failed to create project, please make sure this name \n                      doesn't already exist.", 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_6__["SNACKBAR_DURATION_MS"] });
                _this.showOverlay = false;
                return rxjs__WEBPACK_IMPORTED_MODULE_4__["EMPTY"];
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.showOverlay = false;
            _this.snackBar.open("Project copied, please select new project in the list.", 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_6__["SNACKBAR_DURATION_MS"] });
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.snackBar.open('Project successfully imported', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_6__["SNACKBAR_DURATION_MS"] });
            _this.dismissDialog();
        }, function () {
            _this.showOverlay = false;
            _this.snackBar.open('Error while importing the project from zip file', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_6__["SNACKBAR_DURATION_MS"] });
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
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_8__["ControlMessageService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] }
    ]; };
    ImportProjectDialog = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-import-project-dialog',
            template: __webpack_require__(/*! raw-loader!./import_project_dialog.ng.html */ "./node_modules/raw-loader/index.js!./src/app/test_explorer/import_project_dialog.ng.html"),
            styles: [__webpack_require__(/*! ./import_project_dialog.css */ "./src/app/test_explorer/import_project_dialog.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_7__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_8__["ControlMessageService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"]])
    ], ImportProjectDialog);
    return ImportProjectDialog;
}());



/***/ }),

/***/ "./src/app/test_explorer/new_project_dialog.css":
/*!******************************************************!*\
  !*** ./src/app/test_explorer/new_project_dialog.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.error-message {\n    color: red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVzdF9leHBsb3Jlci9uZXdfcHJvamVjdF9kaWFsb2cuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0lBQ0ksVUFBVTtBQUNkIiwiZmlsZSI6InNyYy9hcHAvdGVzdF9leHBsb3Jlci9uZXdfcHJvamVjdF9kaWFsb2cuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5lcnJvci1tZXNzYWdlIHtcbiAgICBjb2xvcjogcmVkO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/test_explorer/new_project_dialog.ts":
/*!*****************************************************!*\
  !*** ./src/app/test_explorer/new_project_dialog.ts ***!
  \*****************************************************/
/*! exports provided: NewProjectDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewProjectDialog", function() { return NewProjectDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
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






/** The dialog when creating a new project. */
var NewProjectDialog = /** @class */ (function () {
    function NewProjectDialog(dialogRef, backendManagerService) {
        this.dialogRef = dialogRef;
        this.backendManagerService = backendManagerService;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        this.projectName = '';
        this.result = '';
    }
    NewProjectDialog.prototype.dismissDialog = function () {
        this.dialogRef.close(this.newCreatedProject);
    };
    NewProjectDialog.prototype.saveNewProject = function () {
        var _this = this;
        this.backendManagerService.createProject(this.projectName)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroyed))
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
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_5__["BackendManagerService"] }
    ]; };
    NewProjectDialog = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'new-project-dialog',
            template: __webpack_require__(/*! raw-loader!./new_project_dialog.ng.html */ "./node_modules/raw-loader/index.js!./src/app/test_explorer/new_project_dialog.ng.html"),
            styles: [__webpack_require__(/*! ./new_project_dialog.css */ "./src/app/test_explorer/new_project_dialog.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_5__["BackendManagerService"]])
    ], NewProjectDialog);
    return NewProjectDialog;
}());



/***/ }),

/***/ "./src/app/test_explorer/test_explorer.css":
/*!*************************************************!*\
  !*** ./src/app/test_explorer/test_explorer.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.action-list-tree {\n  height: 100%;\n}\n\n.test-case-header {\n  background-color: #f5f5f5;\n  margin: 0px;\n}\n\n.test-case-title {\n  font-size: 18px;\n  display: inline-flex;\n  padding-left: 15px;\n  padding-bottom: 5px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.workspaceButton {\n  float: right;\n  display: inline-flex;\n  margin-top: 8px;\n  margin-bottom: 8px;\n  margin-right: 2px;\n}\n\nli {\n  overflow: hidden;\n  background: #f5f5f5;\n  list-style: none;\n  white-space:nowrap;\n  margin-right: 10px;\n  display: inline-flex;\n  line-height: 30px;\n  text-align: center;\n}\n\nli a {\n    opacity: 0;\n    color: #f5f5f5;\n    max-width: 0;\n    display: inline-flex;\n    text-decoration: none;\n    transition: max-width 1s ease-out .1s, opacity 1s ease-out .1s, color;\n    padding-left: 2px;\n}\n\nli a:hover {\n    color: black;\n}\n\nli:hover a {\n    opacity: 1;\n    max-width: 150px;\n    transition: max-width 1s ease-out .1s, opacity 1s ease-out .1s, color .2s;\n}\n\n.fa-lg {\n  line-height: 30px;\n}\n\n.mat-raised-button {\n  float:right;\n  margin-top: 5px;\n  margin-right: 5px;\n}\n\n.trash-hover:hover{\n  background-color: #ff6666;\n}\n\n.project-button{\n  padding-left:6px;\n}\n\n.trash-align{\n  padding: 0;\n  min-width: 32px;\n  box-shadow:none;\n  float: left;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVzdF9leHBsb3Jlci90ZXN0X2V4cGxvcmVyLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixvQkFBb0I7RUFDcEIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLG9CQUFvQjtFQUNwQixpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLGNBQWM7SUFDZCxZQUFZO0lBQ1osb0JBQW9CO0lBQ3BCLHFCQUFxQjtJQUNyQixxRUFBcUU7SUFDckUsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFVBQVU7SUFDVixnQkFBZ0I7SUFDaEIseUVBQXlFO0FBQzdFOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsV0FBVztFQUNYLGVBQWU7RUFDZixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsZUFBZTtFQUNmLGVBQWU7RUFDZixXQUFXO0FBQ2IiLCJmaWxlIjoic3JjL2FwcC90ZXN0X2V4cGxvcmVyL3Rlc3RfZXhwbG9yZXIuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5hY3Rpb24tbGlzdC10cmVlIHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4udGVzdC1jYXNlLWhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XG4gIG1hcmdpbjogMHB4O1xufVxuXG4udGVzdC1jYXNlLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4ud29ya3NwYWNlQnV0dG9uIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIG1hcmdpbi1yaWdodDogMnB4O1xufVxuXG5saSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHdoaXRlLXNwYWNlOm5vd3JhcDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxubGkgYSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICBjb2xvcjogI2Y1ZjVmNTtcbiAgICBtYXgtd2lkdGg6IDA7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIHRyYW5zaXRpb246IG1heC13aWR0aCAxcyBlYXNlLW91dCAuMXMsIG9wYWNpdHkgMXMgZWFzZS1vdXQgLjFzLCBjb2xvcjtcbiAgICBwYWRkaW5nLWxlZnQ6IDJweDtcbn1cblxubGkgYTpob3ZlciB7XG4gICAgY29sb3I6IGJsYWNrO1xufVxuXG5saTpob3ZlciBhIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIG1heC13aWR0aDogMTUwcHg7XG4gICAgdHJhbnNpdGlvbjogbWF4LXdpZHRoIDFzIGVhc2Utb3V0IC4xcywgb3BhY2l0eSAxcyBlYXNlLW91dCAuMXMsIGNvbG9yIC4ycztcbn1cblxuLmZhLWxnIHtcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XG59XG5cbi5tYXQtcmFpc2VkLWJ1dHRvbiB7XG4gIGZsb2F0OnJpZ2h0O1xuICBtYXJnaW4tdG9wOiA1cHg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xufVxuXG4udHJhc2gtaG92ZXI6aG92ZXJ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjY2NjY7XG59XG5cbi5wcm9qZWN0LWJ1dHRvbntcbiAgcGFkZGluZy1sZWZ0OjZweDtcbn1cblxuLnRyYXNoLWFsaWdue1xuICBwYWRkaW5nOiAwO1xuICBtaW4td2lkdGg6IDMycHg7XG4gIGJveC1zaGFkb3c6bm9uZTtcbiAgZmxvYXQ6IGxlZnQ7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/test_explorer/test_explorer.ts":
/*!************************************************!*\
  !*** ./src/app/test_explorer/test_explorer.ts ***!
  \************************************************/
/*! exports provided: TestExplorer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestExplorer", function() { return TestExplorer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _constants_jstree__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/jstree */ "./src/app/constants/jstree.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/control_message_service */ "./src/app/services/control_message_service.ts");
/* harmony import */ var _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/test_case_manager_service */ "./src/app/services/test_case_manager_service.ts");
/* harmony import */ var _action_edit_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./action_edit_dialog */ "./src/app/test_explorer/action_edit_dialog.ts");
/* harmony import */ var _import_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./import_dialog */ "./src/app/test_explorer/import_dialog.ts");
/* harmony import */ var _import_project_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./import_project_dialog */ "./src/app/test_explorer/import_project_dialog.ts");
/* harmony import */ var _new_project_dialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./new_project_dialog */ "./src/app/test_explorer/new_project_dialog.ts");
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
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
        this.treeUUID = '';
        this.searchStr = '';
        this.selectedProject = {
            projectName: '',
            projectId: '',
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
            'copyTo': {
                'action': this.copyAction.bind(this),
                'label': 'CopyTo',
                'icon': 'fa fa-files-o'
            },
            'moveTo': {
                'action': this.moveAction.bind(this),
                'label': 'MoveTo',
                'icon': 'fa fa-paper-plane-o'
            },
            'export': {
                'action': this.exportAction.bind(this),
                'label': 'Export',
                'icon': 'fa fa-cloud-download'
            }
        };
    }
    TestExplorer.prototype.ngOnInit = function () {
        var _this = this;
        this.backendManagerService.getCurrentUser()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.currentUser = data.name;
            _this.defaultProjectId = _constants_constants__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_PROJECT_ID_PREFIX"] + _this.currentUser;
            _this.defaultProjectName =
                _constants_constants__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_PROJECT_NAME_PREFIX"] + _this.currentUser;
            _this.selectedProject.projectId = _this.defaultProjectId;
            _this.selectedProject.projectName = _this.defaultProjectName;
            _this.initiateProject();
        });
        this.controlMessageService.getControlMessageSubject()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["filter"])(function (msg) { return (msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].ADD_NODE_TO_TREE) ||
            (msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].REFRESH_TEST_CASE_TREE); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            if (data.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].ADD_NODE_TO_TREE) {
                var newNode = JSON.parse(data.extra);
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            if (data.uuid) {
                _this.treeUUID = data.uuid;
            }
            if (data.treeDetails) {
                _this.updateDataTree(Object(_services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_11__["convertToJsTreeFormat"])(JSON.parse(data.treeDetails)), isNewWorkspace);
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
        var data = Object(_services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_11__["reconstructJsTreeData"])(modelData, '#');
        this.getJsTreeInstance()['settings'].core.data = data;
        var jsonData = Object(_services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_11__["convertToJsonTreeFormat"])(data);
        console.log('saveTreeToBackend');
        this.testCaseManagerService
            .updateTestCaseTree(jsonData, this.treeUUID, this.selectedProject.projectId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe();
    };
    TestExplorer.prototype.saveEmptyTreeToBackend = function () {
        var _this = this;
        // Need directly call the save to backend, otherwise update won't pick up
        // the latest jsTree data from ['_model'].data, pass in the empty treeUUID,
        // backend will generate a new UUID for the tree.
        this.testCaseManagerService
            .updateTestCaseTree(Object(_services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_11__["emptyTreeExample"])(), /* treeUUID */ '', this.selectedProject.projectId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function () {
            _this.updateDataTree(Object(_services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_11__["convertToJsTreeFormat"])(Object(_services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_11__["emptyTreeExample"])()), false);
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
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(_this.destroyed))
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
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
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
            this.snackBar.open('Open operation cannot be performed on a folder!', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["SNACKBAR_DURATION_MS"] });
            return;
        }
        var uuid = this.getUUIDFromNode(currentNode);
        this.backendManagerService.loadWorkflow(uuid)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    TestExplorer.prototype.addAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        if (currentNode.original.isFolder) {
            this.snackBar.open('Add operation cannot be performed on a folder!', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["SNACKBAR_DURATION_MS"] });
            return;
        }
        var uuid = this.getUUIDFromNode(currentNode);
        this.backendManagerService.addActionByUUID(uuid)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    TestExplorer.prototype.editAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        this.ngZone.run(function () {
            var dialogRef = _this.dialog.open(_action_edit_dialog__WEBPACK_IMPORTED_MODULE_12__["ActionEditDialog"], { width: '800px', data: { uuid: _this.getUUIDFromNode(currentNode) } });
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
            this.snackBar.open('New Folder operation can only be performed on a folder!', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["SNACKBAR_DURATION_MS"] });
            return;
        }
        this.createFolder(currentNode.id, 'New Folder');
    };
    TestExplorer.prototype.createFolder = function (parentId, name) {
        var newNode = new _constants_jstree__WEBPACK_IMPORTED_MODULE_8__["JsTreeNode"](name, Object(uuid__WEBPACK_IMPORTED_MODULE_4__["v4"])());
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
            this.snackBar.open('New Folder operation can only be performed on a folder!', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["SNACKBAR_DURATION_MS"] });
            return;
        }
        this.ngZone.run(function () {
            var dialogRef = _this.dialog.open(_import_dialog__WEBPACK_IMPORTED_MODULE_13__["ImportDialog"], { width: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["POPUP_DIALOG_DEFAULT_DIMENSION"].width, data: {} });
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
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(_this.destroyed))
                        .subscribe(function (data) {
                        data.name = node.text;
                        _this.backendManagerService.updateActionMetadata(data)
                            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(_this.destroyed))
                            .subscribe();
                    });
                }
                node.original.text = node.text;
                _this.saveTreeToBackend();
            }
        });
    };
    TestExplorer.prototype.copyAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        if (currentNode.original.isFolder) {
            this.snackBar.open('CopyTo operation cannot be performed on a folder!', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["SNACKBAR_DURATION_MS"] });
            return;
        }
        var uuid = this.getUUIDFromNode(currentNode);
        this.backendManagerService.copyAction(uuid)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.ngZone.run(function () {
                var dialogRef = _this.dialog.open(_action_edit_dialog__WEBPACK_IMPORTED_MODULE_12__["ActionEditDialog"], {
                    width: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
                    data: {
                        uuid: data.actionId,
                        isCopyAction: true,
                        isSaveWorkflow: true,
                    },
                });
                dialogRef.afterClosed().subscribe(function (dialogData) {
                    if (dialogData && !dialogData.hasOwnProperty('deleted')) {
                        var newName = dialogData.name;
                        if (dialogData.name === currentNode.text) {
                            newName = currentNode.text + ' (Copy)';
                            dialogData.metadata.name = newName;
                            _this.backendManagerService
                                .updateActionMetadata(dialogData.metadata)
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(_this.destroyed))
                                .subscribe();
                        }
                        var newNode = new _constants_jstree__WEBPACK_IMPORTED_MODULE_8__["JsTreeNode"](newName, dialogData.actionId, false);
                        newNode.additionalData = [dialogData.actionId];
                        _this.jsTree.jstree('create_node', dialogData.parentId, newNode);
                    }
                });
            });
        });
    };
    TestExplorer.prototype.moveAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        if (currentNode.original.isFolder) {
            this.snackBar.open('CopyTo operation cannot be performed on a folder!', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["SNACKBAR_DURATION_MS"] });
            return;
        }
        var uuid = this.getUUIDFromNode(currentNode);
        this.ngZone.run(function () {
            var dialogRef = _this.dialog.open(_action_edit_dialog__WEBPACK_IMPORTED_MODULE_12__["ActionEditDialog"], {
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
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(_this.destroyed))
                        .subscribe();
                    node.original.text = data.name;
                    _this.jsTree.jstree('rename_node', node, data.name);
                });
            });
        });
    };
    TestExplorer.prototype.downloadTest = function (uuid, filename) {
        this.backendManagerService.exportTestCase(uuid).subscribe(function (data) {
            var formatted = JSON.stringify(data, null, 2);
            var exportData = new Blob([formatted + '\n'], { type: 'application/octet-stream' });
            saveAs(exportData, filename);
        });
    };
    TestExplorer.prototype.downloadRefImgs = function (uuidStr) {
        var _this = this;
        this.backendManagerService.exportRefImagesForWorkflow(uuidStr)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
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
    TestExplorer.prototype.exportAction = function (nodeRef) {
        var currentNode = this.getCurrentNode(nodeRef);
        if (currentNode.original.isFolder) {
            this.snackBar.open('Export operation cannot be performed on a folder!', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["SNACKBAR_DURATION_MS"] });
            return;
        }
        var uuid = this.getUUIDFromNode(currentNode);
        this.downloadTest(uuid, currentNode.text);
        this.downloadRefImgs(uuid);
    };
    TestExplorer.prototype.exportCurrentProject = function () {
        var exportProjectReq = {
            projectId: this.selectedProject.projectId,
            projectName: this.selectedProject.projectName,
            zipFileName: '',
        };
        this.backendManagerService.exportCurrentProject(exportProjectReq);
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
        var dialogConfig = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogConfig"]();
        dialogConfig.width = _constants_constants__WEBPACK_IMPORTED_MODULE_7__["POPUP_DIALOG_DEFAULT_DIMENSION"].width;
        var dialogRef = this.dialog.open(_new_project_dialog__WEBPACK_IMPORTED_MODULE_15__["NewProjectDialog"], dialogConfig);
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                _this.selectedProject = data;
                _this.controlMessageService.sendRefreshTestCaseTreeMsg();
            }
        });
    };
    TestExplorer.prototype.openImportProjectDialog = function () {
        var dialogConfig = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogConfig"]();
        dialogConfig.width = _constants_constants__WEBPACK_IMPORTED_MODULE_7__["POPUP_DIALOG_DEFAULT_DIMENSION"].width;
        this.dialog.open(_import_project_dialog__WEBPACK_IMPORTED_MODULE_14__["ImportProjectDialog"], dialogConfig);
    };
    TestExplorer.prototype.getProjectList = function () {
        var _this = this;
        this.backendManagerService.getProjectList()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.projectList = data.projectList;
        });
    };
    TestExplorer.prototype.selectProject = function (project) {
        var _this = this;
        this.backendManagerService.setCurrentProject(project.projectId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
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
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
                .subscribe(function (data) {
                if (data.success) {
                    _this.getProjectList();
                }
            });
            this.testCaseManagerService.deleteTestCaseTree(project.projectId)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (data) {
            var defaultProjectId = _this.defaultProjectId;
            if (data.success && data.projectList.length > 0) {
                defaultProjectId = data.projectList[0].projectId;
            }
            return _this.backendManagerService.setCurrentProject(defaultProjectId);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.projectList = data.projectList;
            _this.selectedProject.projectId = data.projectList[0].projectId;
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
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
        { type: _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_11__["TestCaseManagerService"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_9__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_10__["ControlMessageService"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('jsTree', { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], TestExplorer.prototype, "jsTreeEl", void 0);
    TestExplorer = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'test-explorer',
            template: __webpack_require__(/*! raw-loader!./test_explorer.ng.html */ "./node_modules/raw-loader/index.js!./src/app/test_explorer/test_explorer.ng.html"),
            styles: [__webpack_require__(/*! ./test_explorer.css */ "./src/app/test_explorer/test_explorer.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _services_test_case_manager_service__WEBPACK_IMPORTED_MODULE_11__["TestCaseManagerService"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_9__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_10__["ControlMessageService"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], TestExplorer);
    return TestExplorer;
}());



/***/ }),

/***/ "./src/app/test_explorer/test_explorer_module.ts":
/*!*******************************************************!*\
  !*** ./src/app/test_explorer/test_explorer_module.ts ***!
  \*******************************************************/
/*! exports provided: TestExplorerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestExplorerModule", function() { return TestExplorerModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _action_edit_dialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./action_edit_dialog */ "./src/app/test_explorer/action_edit_dialog.ts");
/* harmony import */ var _import_dialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./import_dialog */ "./src/app/test_explorer/import_dialog.ts");
/* harmony import */ var _import_project_dialog__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./import_project_dialog */ "./src/app/test_explorer/import_project_dialog.ts");
/* harmony import */ var _new_project_dialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./new_project_dialog */ "./src/app/test_explorer/new_project_dialog.ts");
/* harmony import */ var _test_explorer__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./test_explorer */ "./src/app/test_explorer/test_explorer.ts");
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























var TestExplorerModule = /** @class */ (function () {
    function TestExplorerModule() {
    }
    TestExplorerModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["BrowserAnimationsModule"],
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
            exports: [_test_explorer__WEBPACK_IMPORTED_MODULE_22__["TestExplorer"]],
            declarations: [
                _test_explorer__WEBPACK_IMPORTED_MODULE_22__["TestExplorer"], _action_edit_dialog__WEBPACK_IMPORTED_MODULE_18__["ActionEditDialog"], _import_dialog__WEBPACK_IMPORTED_MODULE_19__["ImportDialog"], _import_project_dialog__WEBPACK_IMPORTED_MODULE_20__["ImportProjectDialog"],
                _new_project_dialog__WEBPACK_IMPORTED_MODULE_21__["NewProjectDialog"]
            ],
            entryComponents: [_action_edit_dialog__WEBPACK_IMPORTED_MODULE_18__["ActionEditDialog"], _import_dialog__WEBPACK_IMPORTED_MODULE_19__["ImportDialog"], _import_project_dialog__WEBPACK_IMPORTED_MODULE_20__["ImportProjectDialog"], _new_project_dialog__WEBPACK_IMPORTED_MODULE_21__["NewProjectDialog"]]
        })
    ], TestExplorerModule);
    return TestExplorerModule;
}());



/***/ }),

/***/ "./src/app/ui_tree_viewer/copy_xml_dialog.css":
/*!****************************************************!*\
  !*** ./src/app/ui_tree_viewer/copy_xml_dialog.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.xmlData {\n    margin-top: 25px;\n    padding: 5px;\n    border: 1px dashed black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdWlfdHJlZV92aWV3ZXIvY29weV94bWxfZGlhbG9nLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRjtJQUNJLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osd0JBQXdCO0FBQzVCIiwiZmlsZSI6InNyYy9hcHAvdWlfdHJlZV92aWV3ZXIvY29weV94bWxfZGlhbG9nLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4ueG1sRGF0YSB7XG4gICAgbWFyZ2luLXRvcDogMjVweDtcbiAgICBwYWRkaW5nOiA1cHg7XG4gICAgYm9yZGVyOiAxcHggZGFzaGVkIGJsYWNrO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/ui_tree_viewer/copy_xml_dialog.ts":
/*!***************************************************!*\
  !*** ./src/app/ui_tree_viewer/copy_xml_dialog.ts ***!
  \***************************************************/
/*! exports provided: CopyXmlDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CopyXmlDialog", function() { return CopyXmlDialog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
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



/** Simple dialog for showing raw xml string */
var CopyXmlDialog = /** @class */ (function () {
    function CopyXmlDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    CopyXmlDialog.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    CopyXmlDialog = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-copy-xml-dialog',
            template: __webpack_require__(/*! raw-loader!./copy_xml_dialog.ng.html */ "./node_modules/raw-loader/index.js!./src/app/ui_tree_viewer/copy_xml_dialog.ng.html"),
            styles: [__webpack_require__(/*! ./copy_xml_dialog.css */ "./src/app/ui_tree_viewer/copy_xml_dialog.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], String])
    ], CopyXmlDialog);
    return CopyXmlDialog;
}());



/***/ }),

/***/ "./src/app/ui_tree_viewer/ui_tree_viewer.css":
/*!***************************************************!*\
  !*** ./src/app/ui_tree_viewer/ui_tree_viewer.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.attributeList {\n  text-align: left;\n  float: left;\n  overflow: auto;\n}\n\n.treeArea{\n  float: left;\n  overflow-y: auto;\n}\n\n.attributeItem {\n  width: 100%;\n  padding: 0px 5px 0px 0px;\n  border: 0.5px solid grey;\n}\n\n.attributeTitle {\n  display: inline-block;\n  width: 13rem;\n  padding: 5px;\n  background-color: whitesmoke;\n}\n\n.attributeValue {\n  display: inline-block;\n  padding: 5px 5px 5px 5px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdWlfdHJlZV92aWV3ZXIvdWlfdHJlZV92aWV3ZXIuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztFQWNFOztBQUVGO0VBQ0UsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCx3QkFBd0I7RUFDeEIsd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLFlBQVk7RUFDWixZQUFZO0VBQ1osNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLHdCQUF3QjtBQUMxQiIsImZpbGUiOiJzcmMvYXBwL3VpX3RyZWVfdmlld2VyL3VpX3RyZWVfdmlld2VyLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4uYXR0cmlidXRlTGlzdCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGZsb2F0OiBsZWZ0O1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLnRyZWVBcmVhe1xuICBmbG9hdDogbGVmdDtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuLmF0dHJpYnV0ZUl0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMHB4IDVweCAwcHggMHB4O1xuICBib3JkZXI6IDAuNXB4IHNvbGlkIGdyZXk7XG59XG5cbi5hdHRyaWJ1dGVUaXRsZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDEzcmVtO1xuICBwYWRkaW5nOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XG59XG5cbi5hdHRyaWJ1dGVWYWx1ZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcGFkZGluZzogNXB4IDVweCA1cHggNXB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/ui_tree_viewer/ui_tree_viewer.ts":
/*!**************************************************!*\
  !*** ./src/app/ui_tree_viewer/ui_tree_viewer.ts ***!
  \**************************************************/
/*! exports provided: UiTreeViewer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiTreeViewer", function() { return UiTreeViewer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _constants_jstree__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/jstree */ "./src/app/constants/jstree.ts");
/* harmony import */ var _constants_rect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../constants/rect */ "./src/app/constants/rect.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/control_message_service */ "./src/app/services/control_message_service.ts");
/* harmony import */ var _copy_xml_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./copy_xml_dialog */ "./src/app/ui_tree_viewer/copy_xml_dialog.ts");
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
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"](1);
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["filter"])(function (msg) {
            return msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].INSPECT_CLICKED_NODE;
        }))
            .subscribe(function (msg) {
            var coor = JSON.parse(msg.extra);
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
                _this.sendDrawMessage(_constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].NODE_HOVERED, action.node.original.attributes);
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
                _this.controlMessageService.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].CLEAR_CANVAS, extra: '' });
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
                    _this.sendDrawMessage(_constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].NODE_SELECTED, action.node.original.attributes);
                }
            }
        });
    };
    UiTreeViewer.prototype.buildSearchCompleteEvent = function () {
        var _this = this;
        this.jsTree.on('search.jstree', function () {
            if (!_this.searchSuccess) {
                _this.snackBar.open('No matches found', 'OK', { duration: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["SNACKBAR_DURATION_MS"] });
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
        this.controlMessageService.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].CLEAR_CANVAS, extra: 'all' });
        this.nodeBounds = [];
        this.searchTypes = ['ALL'];
        this.backendManagerService.fetchXML()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroyed))
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
        var id = Object(uuid__WEBPACK_IMPORTED_MODULE_4__["v4"])();
        var node = new _constants_jstree__WEBPACK_IMPORTED_MODULE_8__["JsTreeNode"](text, id);
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
                    this.nodeBounds.push({ id: id, bound: _constants_rect__WEBPACK_IMPORTED_MODULE_9__["Rect"].createFromCoordinatesStr(value) });
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
            this.controlMessageService.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].CLEAR_CANVAS, extra: 'all' });
        }
    };
    UiTreeViewer.prototype.toggleInspectDevice = function (e) {
        this.controlMessageService.sendMessage({
            messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].SET_INSPECT_MODE,
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
        this.dialog.open(_copy_xml_dialog__WEBPACK_IMPORTED_MODULE_12__["CopyXmlDialog"], {
            width: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
            height: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["POPUP_DIALOG_DEFAULT_DIMENSION"].height,
            data: this.rawXML
        });
    };
    UiTreeViewer.prototype.searchTree = function () {
        this.jsTree.jstree('deselect_all');
        this.jsTree.jstree('search', this.searchStr);
    };
    UiTreeViewer.prototype.ngOnDestroy = function () {
        this.controlMessageService.sendMessage({ messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].CLEAR_CANVAS, extra: 'all' });
        this.controlMessageService.sendMessage({
            messageType: _constants_constants__WEBPACK_IMPORTED_MODULE_7__["MessageTypes"].SET_INSPECT_MODE,
            extra: 'false',
        });
        this.destroyed.next();
    };
    UiTreeViewer.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_10__["BackendManagerService"] },
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_11__["ControlMessageService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('jsTree', { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], UiTreeViewer.prototype, "jsTreeEl", void 0);
    UiTreeViewer = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'ui-tree-viewer',
            template: __webpack_require__(/*! raw-loader!./ui_tree_viewer.ng.html */ "./node_modules/raw-loader/index.js!./src/app/ui_tree_viewer/ui_tree_viewer.ng.html"),
            styles: [__webpack_require__(/*! ./ui_tree_viewer.css */ "./src/app/ui_tree_viewer/ui_tree_viewer.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_10__["BackendManagerService"],
            _services_control_message_service__WEBPACK_IMPORTED_MODULE_11__["ControlMessageService"]])
    ], UiTreeViewer);
    return UiTreeViewer;
}());



/***/ }),

/***/ "./src/app/ui_tree_viewer/ui_tree_viewer_module.ts":
/*!*********************************************************!*\
  !*** ./src/app/ui_tree_viewer/ui_tree_viewer_module.ts ***!
  \*********************************************************/
/*! exports provided: UiTreeViewerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiTreeViewerModule", function() { return UiTreeViewerModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/esm5/slide-toggle.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _copy_xml_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./copy_xml_dialog */ "./src/app/ui_tree_viewer/copy_xml_dialog.ts");
/* harmony import */ var _ui_tree_viewer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ui_tree_viewer */ "./src/app/ui_tree_viewer/ui_tree_viewer.ts");
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
















var UiTreeViewerModule = /** @class */ (function () {
    function UiTreeViewerModule() {
    }
    UiTreeViewerModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_13__["BrowserAnimationsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_9__["MatSelectModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__["MatSnackBarModule"],
                _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_10__["MatSlideToggleModule"],
            ],
            exports: [_ui_tree_viewer__WEBPACK_IMPORTED_MODULE_15__["UiTreeViewer"]],
            declarations: [_ui_tree_viewer__WEBPACK_IMPORTED_MODULE_15__["UiTreeViewer"], _copy_xml_dialog__WEBPACK_IMPORTED_MODULE_14__["CopyXmlDialog"]],
            entryComponents: [_copy_xml_dialog__WEBPACK_IMPORTED_MODULE_14__["CopyXmlDialog"]]
        })
    ], UiTreeViewerModule);
    return UiTreeViewerModule;
}());



/***/ }),

/***/ "./src/app/workflow_editor/workflow_editor.css":
/*!*****************************************************!*\
  !*** ./src/app/workflow_editor/workflow_editor.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google LLC\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.links line {\n  stroke: #999;\n  stroke-opacity: 0.6;\n}\n\n.list-group-item {\n  display: block;\n  width: 20%;\n  float: left;\n  color: white;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding: 10px 15px;\n  border: 1px solid #ddd;\n}\n\n.control-area {\n  padding: 15px;\n}\n\n.control-area button {\n  min-width: 140px;\n  margin-bottom: 10px;\n  margin-left: 5px;\n}\n\n.center-icon-img {\n  padding-right:5px;\n  padding-bottom:2px\n}\n\n.expand-icon {\n  display: inline-flex;\n  float:right;\n}\n\n.link-style {\n  color: rgb(89, 0, 255);\n  text-decoration: underline;\n}\n\n.play-speed-text-label {\n  margin-left: 20px;\n}\n\n.play-speed-value-label {\n  font-weight: bold;\n}\n\n.breadcrumb {\n  display: inline-block;\n  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.35);\n  overflow: hidden;\n  border-radius: 5px;\n  counter-reset: flag;\n  margin-left:20px;\n}\n\n.breadcrumb a {\n  text-decoration: none;\n  outline: none;\n  display: block;\n  float: left;\n  font-size: 12px;\n  line-height: 36px;\n  color: white;\n  padding: 0 10px 0 30px;\n  background: #666;\n  background: linear-gradient(#666, #333);\n  position: relative;\n}\n\n.breadcrumb a:first-child {\n  border-radius: 5px 0 0 5px; /*to match with the parent's radius*/\n}\n\n.breadcrumb a:first-child:before {\n  content: '';\n  display: none;\n}\n\n.breadcrumb a:last-child {\n  border-radius: 0 5px 5px 0;\n  padding-right: 20px;\n}\n\n.breadcrumb a:first-child:hover {\n  color: black;\n  background: white;\n  cursor: none;\n}\n\n.breadcrumb a:first-child:hover:after {\n  color: black;\n  background: white;\n  cursor: none;\n}\n\n/*hover/active styles*/\n\n.breadcrumb a.active, .breadcrumb a:hover{\n  background: #333;\n  background: linear-gradient(#333, #000);\n  cursor: pointer;\n}\n\n.breadcrumb a.active:after, .breadcrumb a:hover:after {\n  background: #333;\n  background: linear-gradient(135deg, #333, #000);\n}\n\n.breadcrumb a:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  right: -18px; /*half of square's length*/\n  width: 36px;\n  height: 36px;\n  transform: scale(0.707) rotate(45deg);\n  z-index: 1;\n  background: #666;\n  background: linear-gradient(135deg, #666, #333);\n  /*stylish arrow design using box shadow*/\n  box-shadow:\n      2px -2px 0 2px rgba(0, 0, 0, 0.4),\n      3px -3px 0 2px rgba(255, 255, 255, 0.1);\n  border-radius: 0 5px 0 50px;\n}\n\n.breadcrumb a:last-child:after {\n  content: none;\n}\n\n.breadcrumb a:before {\n  content: counter(flag);\n  counter-increment: flag;\n  border-radius: 100%;\n  width: 14px;\n  height: 20px;\n  line-height: 20px;\n  margin: 8px 0 5px;\n  position: absolute;\n  font-weight: bold;\n  color: black;\n  padding-left: 6px;\n}\n\n.flat a, .flat a:after {\n  background: white;\n  color: black;\n  transition: all 0.5s;\n}\n\n.flat a:before {\n  background: white;\n  box-shadow: 0 0 0 1px #ccc;\n}\n\n.flat a:hover, .flat a.active, .flat a:last-child,\n.flat a:hover:after, .flat a.active:after{\n  background: #28a6da;\n  color: white;\n}\n\n.current-action-name-label {\n  margin-left:40px;\n}\n\n.panel-heading {\n  margin-left:20px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd29ya2Zsb3dfZWRpdG9yL3dvcmtmbG93X2VkaXRvci5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7O0FBRUY7RUFDRSxZQUFZO0VBQ1osbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsY0FBYztFQUNkLFVBQVU7RUFDVixXQUFXO0VBQ1gsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQjtBQUNGOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QiwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsNENBQTRDO0VBQzVDLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2IsY0FBYztFQUNkLFdBQVc7RUFDWCxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLHVDQUF1QztFQUN2QyxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSwwQkFBMEIsRUFBRSxvQ0FBb0M7QUFDbEU7O0FBQ0E7RUFDRSxXQUFXO0VBQ1gsYUFBYTtBQUNmOztBQUNBO0VBQ0UsMEJBQTBCO0VBQzFCLG1CQUFtQjtBQUNyQjs7QUFDQTtFQUNFLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixZQUFZO0FBQ2Q7O0FBRUEsc0JBQXNCOztBQUN0QjtFQUNFLGdCQUFnQjtFQUNoQix1Q0FBdUM7RUFDdkMsZUFBZTtBQUNqQjs7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQiwrQ0FBK0M7QUFDakQ7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixZQUFZLEVBQUUsMEJBQTBCO0VBQ3hDLFdBQVc7RUFDWCxZQUFZO0VBQ1oscUNBQXFDO0VBQ3JDLFVBQVU7RUFDVixnQkFBZ0I7RUFDaEIsK0NBQStDO0VBQy9DLHdDQUF3QztFQUN4Qzs7NkNBRTJDO0VBQzNDLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLG9CQUFvQjtBQUN0Qjs7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQiwwQkFBMEI7QUFDNUI7O0FBQ0E7O0VBRUUsbUJBQW1CO0VBQ25CLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJzcmMvYXBwL3dvcmtmbG93X2VkaXRvci93b3JrZmxvd19lZGl0b3IuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi5saW5rcyBsaW5lIHtcbiAgc3Ryb2tlOiAjOTk5O1xuICBzdHJva2Utb3BhY2l0eTogMC42O1xufVxuXG4ubGlzdC1ncm91cC1pdGVtIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAyMCU7XG4gIGZsb2F0OiBsZWZ0O1xuICBjb2xvcjogd2hpdGU7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBwYWRkaW5nOiAxMHB4IDE1cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG59XG5cbi5jb250cm9sLWFyZWEge1xuICBwYWRkaW5nOiAxNXB4O1xufVxuLmNvbnRyb2wtYXJlYSBidXR0b24ge1xuICBtaW4td2lkdGg6IDE0MHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG4uY2VudGVyLWljb24taW1nIHtcbiAgcGFkZGluZy1yaWdodDo1cHg7XG4gIHBhZGRpbmctYm90dG9tOjJweFxufVxuXG4uZXhwYW5kLWljb24ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgZmxvYXQ6cmlnaHQ7XG59XG5cbi5saW5rLXN0eWxlIHtcbiAgY29sb3I6IHJnYig4OSwgMCwgMjU1KTtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5cbi5wbGF5LXNwZWVkLXRleHQtbGFiZWwge1xuICBtYXJnaW4tbGVmdDogMjBweDtcbn1cblxuLnBsYXktc3BlZWQtdmFsdWUtbGFiZWwge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJyZWFkY3J1bWIge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGJveC1zaGFkb3c6IDAgMCAxNXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMzUpO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGNvdW50ZXItcmVzZXQ6IGZsYWc7XG4gIG1hcmdpbi1sZWZ0OjIwcHg7XG59XG5cbi5icmVhZGNydW1iIGEge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmbG9hdDogbGVmdDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBsaW5lLWhlaWdodDogMzZweDtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAwIDEwcHggMCAzMHB4O1xuICBiYWNrZ3JvdW5kOiAjNjY2O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoIzY2NiwgIzMzMyk7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmJyZWFkY3J1bWIgYTpmaXJzdC1jaGlsZCB7XG4gIGJvcmRlci1yYWRpdXM6IDVweCAwIDAgNXB4OyAvKnRvIG1hdGNoIHdpdGggdGhlIHBhcmVudCdzIHJhZGl1cyovXG59XG4uYnJlYWRjcnVtYiBhOmZpcnN0LWNoaWxkOmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcnO1xuICBkaXNwbGF5OiBub25lO1xufVxuLmJyZWFkY3J1bWIgYTpsYXN0LWNoaWxkIHtcbiAgYm9yZGVyLXJhZGl1czogMCA1cHggNXB4IDA7XG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG59XG4uYnJlYWRjcnVtYiBhOmZpcnN0LWNoaWxkOmhvdmVyIHtcbiAgY29sb3I6IGJsYWNrO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgY3Vyc29yOiBub25lO1xufVxuXG4uYnJlYWRjcnVtYiBhOmZpcnN0LWNoaWxkOmhvdmVyOmFmdGVyIHtcbiAgY29sb3I6IGJsYWNrO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgY3Vyc29yOiBub25lO1xufVxuXG4vKmhvdmVyL2FjdGl2ZSBzdHlsZXMqL1xuLmJyZWFkY3J1bWIgYS5hY3RpdmUsIC5icmVhZGNydW1iIGE6aG92ZXJ7XG4gIGJhY2tncm91bmQ6ICMzMzM7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjMzMzLCAjMDAwKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmJyZWFkY3J1bWIgYS5hY3RpdmU6YWZ0ZXIsIC5icmVhZGNydW1iIGE6aG92ZXI6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kOiAjMzMzO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMzMzLCAjMDAwKTtcbn1cblxuLmJyZWFkY3J1bWIgYTphZnRlciB7XG4gIGNvbnRlbnQ6ICcnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IC0xOHB4OyAvKmhhbGYgb2Ygc3F1YXJlJ3MgbGVuZ3RoKi9cbiAgd2lkdGg6IDM2cHg7XG4gIGhlaWdodDogMzZweDtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjcwNykgcm90YXRlKDQ1ZGVnKTtcbiAgei1pbmRleDogMTtcbiAgYmFja2dyb3VuZDogIzY2NjtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2NiwgIzMzMyk7XG4gIC8qc3R5bGlzaCBhcnJvdyBkZXNpZ24gdXNpbmcgYm94IHNoYWRvdyovXG4gIGJveC1zaGFkb3c6XG4gICAgICAycHggLTJweCAwIDJweCByZ2JhKDAsIDAsIDAsIDAuNCksXG4gICAgICAzcHggLTNweCAwIDJweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gIGJvcmRlci1yYWRpdXM6IDAgNXB4IDAgNTBweDtcbn1cblxuLmJyZWFkY3J1bWIgYTpsYXN0LWNoaWxkOmFmdGVyIHtcbiAgY29udGVudDogbm9uZTtcbn1cblxuLmJyZWFkY3J1bWIgYTpiZWZvcmUge1xuICBjb250ZW50OiBjb3VudGVyKGZsYWcpO1xuICBjb3VudGVyLWluY3JlbWVudDogZmxhZztcbiAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgd2lkdGg6IDE0cHg7XG4gIGhlaWdodDogMjBweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIG1hcmdpbjogOHB4IDAgNXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogYmxhY2s7XG4gIHBhZGRpbmctbGVmdDogNnB4O1xufVxuXG4uZmxhdCBhLCAuZmxhdCBhOmFmdGVyIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGNvbG9yOiBibGFjaztcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXM7XG59XG4uZmxhdCBhOmJlZm9yZSB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3gtc2hhZG93OiAwIDAgMCAxcHggI2NjYztcbn1cbi5mbGF0IGE6aG92ZXIsIC5mbGF0IGEuYWN0aXZlLCAuZmxhdCBhOmxhc3QtY2hpbGQsXG4uZmxhdCBhOmhvdmVyOmFmdGVyLCAuZmxhdCBhLmFjdGl2ZTphZnRlcntcbiAgYmFja2dyb3VuZDogIzI4YTZkYTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uY3VycmVudC1hY3Rpb24tbmFtZS1sYWJlbCB7XG4gIG1hcmdpbi1sZWZ0OjQwcHg7XG59XG5cbi5wYW5lbC1oZWFkaW5nIHtcbiAgbWFyZ2luLWxlZnQ6MjBweDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/workflow_editor/workflow_editor.ts":
/*!****************************************************!*\
  !*** ./src/app/workflow_editor/workflow_editor.ts ***!
  \****************************************************/
/*! exports provided: WorkflowEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkflowEditorComponent", function() { return WorkflowEditorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _advanced_actions_dialog_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../advanced_actions_dialog/advanced_actions_dialog */ "./src/app/advanced_actions_dialog/advanced_actions_dialog.ts");
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/actions */ "./src/app/constants/actions.ts");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants/constants */ "./src/app/constants/constants.ts");
/* harmony import */ var _popup_dialogs_global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../popup_dialogs/global_var_setting_dialog */ "./src/app/popup_dialogs/global_var_setting_dialog.ts");
/* harmony import */ var _popup_dialogs_history_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../popup_dialogs/history_dialog */ "./src/app/popup_dialogs/history_dialog.ts");
/* harmony import */ var _popup_dialogs_replay_details_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../popup_dialogs/replay_details_dialog */ "./src/app/popup_dialogs/replay_details_dialog.ts");
/* harmony import */ var _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../services/backend_manager_service */ "./src/app/services/backend_manager_service.ts");
/* harmony import */ var _services_control_message_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../services/control_message_service */ "./src/app/services/control_message_service.ts");
/* harmony import */ var _services_log_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../services/log_service */ "./src/app/services/log_service.ts");
/* harmony import */ var _test_explorer_action_edit_dialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../test_explorer/action_edit_dialog */ "./src/app/test_explorer/action_edit_dialog.ts");
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
        this.isReplaying = false;
        this.workflowModel = { actionId: '', name: '', childrenActions: [] };
        /** Handle on-destroy Subject, used to unsubscribe. */
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_4__["ReplaySubject"](1);
        this.pathStack = [];
        this.pathIndexStack = [];
        this.playSpeedFactor = 1.0;
        /**
         * Indicates the actions which is currently playing. Stack stores all parent
         * compound actions
         */
        this.currentPlayActionPath = '';
        this.controlMessageService.getControlMessageSubject()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (msg) {
            return msg.messageType === _constants_constants__WEBPACK_IMPORTED_MODULE_8__["MessageTypes"].REFRESH_WORKFLOW;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(function () { return _this.backendManagerService.getCurrentWorkflow(); }))
            .subscribe(function (data) {
            _this.workflowModel = new _constants_actions__WEBPACK_IMPORTED_MODULE_7__["WorkflowModel"](JSON.stringify(data));
            if (_this.pathStack.length <= 1) {
                _this.pathStack = [Object(_constants_actions__WEBPACK_IMPORTED_MODULE_7__["actionModelFromJson"])(JSON.stringify(data), 0)];
                _this.pathIndexStack = [0];
            }
        });
        // Highlight the playing action by check the action id in log messages
        this.logService.getMessages()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
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
        this.dialog.open(_advanced_actions_dialog_advanced_actions_dialog__WEBPACK_IMPORTED_MODULE_6__["AdvancedActionDialogComponent"], {
            width: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
        });
    };
    WorkflowEditorComponent.prototype.addScreenShot = function () {
        var _this = this;
        var action = {
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CAP_ACTION.type,
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].SCREEN_CAP_ACTION.shortName
        };
        this.backendManagerService.addActionToWorkflow(action)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
            .subscribe(function () {
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    WorkflowEditorComponent.prototype.addWait = function () {
        var _this = this;
        var action = {
            type: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].WAIT_ACTION.type,
            name: _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"].WAIT_ACTION.shortName,
        };
        this.backendManagerService.addActionToWorkflow(action)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
            .subscribe(function () {
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    WorkflowEditorComponent.prototype.clearRecord = function () {
        var _this = this;
        this.backendManagerService.createNewWorkSpace().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(function () {
            _this.pathStack = [];
            _this.pathIndexStack = [];
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    WorkflowEditorComponent.prototype.onDropSuccess = function () {
        var _this = this;
        var reorderActions = this.workflowModel.childrenActions.map(function (action) { return action.actionId; });
        this.backendManagerService.reorderActions(reorderActions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
            .subscribe(function () {
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    WorkflowEditorComponent.prototype.openHistoryDialog = function () {
        this.dialog.open(_popup_dialogs_history_dialog__WEBPACK_IMPORTED_MODULE_10__["HistoryDialog"], { width: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["POPUP_DIALOG_DEFAULT_DIMENSION"].width });
    };
    WorkflowEditorComponent.prototype.openSaveWorkflowDialog = function () {
        var _this = this;
        if (this.workflowModel.name === '' ||
            this.workflowModel.name.includes(_constants_constants__WEBPACK_IMPORTED_MODULE_8__["DEFAULT_WORKFLOW_NAME"])) { // New workflow
            var dialogRef = this.dialog.open(_test_explorer_action_edit_dialog__WEBPACK_IMPORTED_MODULE_15__["ActionEditDialog"], {
                width: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["POPUP_DIALOG_DEFAULT_DIMENSION"].width,
                data: { uuid: this.workflowModel.actionId, isSaveWorkflow: true }
            });
            dialogRef.afterClosed().subscribe(function (data) {
                _this.controlMessageService.sendRefreshWorkflowMsg();
            });
        }
        else {
            this.backendManagerService.saveCurrentWorkflowWithoutMetadata()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
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
        var dialogConfig = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogConfig"]();
        dialogConfig.width = _constants_constants__WEBPACK_IMPORTED_MODULE_8__["POPUP_DIALOG_DEFAULT_DIMENSION"].width;
        dialogConfig.data = { 'uuid': id, 'index': index };
        var dialogRef = this.dialog.open(_test_explorer_action_edit_dialog__WEBPACK_IMPORTED_MODULE_15__["ActionEditDialog"], dialogConfig);
        dialogRef.afterClosed()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (data) { return data && data.hasOwnProperty('playWorkflowRequested'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(function () {
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
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
                .subscribe(function () {
                _this.isReplaying = false;
                _this.logService.log(_constants_constants__WEBPACK_IMPORTED_MODULE_8__["TestStatusMsg"].TEST_END_CANCELLED);
            });
            return false;
        }
        this.isReplaying = true;
        this.logService.log(_constants_constants__WEBPACK_IMPORTED_MODULE_8__["TestStatusMsg"].TEST_START);
        return true;
    };
    WorkflowEditorComponent.prototype.finishPlay = function (data) {
        this.isReplaying = false;
        this.controlMessageService.sendRefreshWorkflowMsg();
        this.logService.log(_constants_constants__WEBPACK_IMPORTED_MODULE_8__["TestStatusMsg"].TEST_END);
        this.dialog.open(_popup_dialogs_replay_details_dialog__WEBPACK_IMPORTED_MODULE_11__["ReplayDetailsDialog"], { width: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["POPUP_DIALOG_DEFAULT_DIMENSION"].width, data: data });
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
            .subscribe(function (data) {
            _this.finishPlay(data);
        });
    };
    WorkflowEditorComponent.prototype.removeLast = function () {
        var _this = this;
        this.backendManagerService.removeLastAction().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(function () {
            _this.controlMessageService.sendRefreshWorkflowMsg();
        });
    };
    WorkflowEditorComponent.prototype.getTextByType = function (actionModel) {
        if (actionModel.actionType in _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"]) {
            return _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"][actionModel.actionType].shortName;
        }
        return 'UNKNOWN';
    };
    WorkflowEditorComponent.prototype.getColorByType = function (actionModel) {
        if (actionModel.actionType in _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"]) {
            return _constants_actions__WEBPACK_IMPORTED_MODULE_7__["ACTIONS"][actionModel.actionType].color;
        }
        return _constants_constants__WEBPACK_IMPORTED_MODULE_8__["ActionColor"].BLACK;
    };
    WorkflowEditorComponent.prototype.getBackgroundColor = function (actionModel) {
        if (!this.isReplaying) {
            return this.getColorByType(actionModel);
        }
        if (this.needHighLightCurrentAction(actionModel.actionIndex)) {
            return _constants_constants__WEBPACK_IMPORTED_MODULE_8__["ActionColor"].BLUE;
        }
        return _constants_constants__WEBPACK_IMPORTED_MODULE_8__["ActionColor"].GRAY;
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
        this.pathStack = this.pathStack.concat([action]);
        this.pathIndexStack = this.pathIndexStack.concat([action.actionIndex]);
        event.stopPropagation();
        this.backendManagerService.loadWorkflow(action.actionId).subscribe(function (data) {
            _this.workflowModel = new _constants_actions__WEBPACK_IMPORTED_MODULE_7__["WorkflowModel"](JSON.stringify(data));
        });
    };
    WorkflowEditorComponent.prototype.goBackFromExpandedCompoundAction = function (action) {
        var _this = this;
        this.logService.log('Go back to:' + action.name);
        var index = this.pathStack.findIndex(function (x) { return x.actionId === action.actionId; });
        this.pathStack = this.pathStack.slice(0, index + 1);
        this.pathIndexStack = this.pathIndexStack.slice(0, index + 1);
        this.backendManagerService.loadWorkflow(action.actionId).subscribe(function (data) {
            _this.workflowModel = new _constants_actions__WEBPACK_IMPORTED_MODULE_7__["WorkflowModel"](JSON.stringify(data));
        });
    };
    WorkflowEditorComponent.prototype.openGlobalVarSettings = function () {
        this.dialog.open(_popup_dialogs_global_var_setting_dialog__WEBPACK_IMPORTED_MODULE_9__["GlobalVariableSettingDialog"], { width: _constants_constants__WEBPACK_IMPORTED_MODULE_8__["POPUP_DIALOG_DEFAULT_DIMENSION"].width });
    };
    WorkflowEditorComponent.prototype.onSpeedSliderChange = function (event) {
        if (this.isReplaying) {
            this.backendManagerService.setPlaySpeedFactor(event.value)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroyed))
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
        { type: _services_control_message_service__WEBPACK_IMPORTED_MODULE_13__["ControlMessageService"] },
        { type: _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_12__["BackendManagerService"] },
        { type: _services_log_service__WEBPACK_IMPORTED_MODULE_14__["LogService"] },
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] },
        { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] }
    ]; };
    WorkflowEditorComponent = WorkflowEditorComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'workflow-editor',
            template: __webpack_require__(/*! raw-loader!./workflow_editor.ng.html */ "./node_modules/raw-loader/index.js!./src/app/workflow_editor/workflow_editor.ng.html"),
            styles: [__webpack_require__(/*! ./workflow_editor.css */ "./src/app/workflow_editor/workflow_editor.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_control_message_service__WEBPACK_IMPORTED_MODULE_13__["ControlMessageService"],
            _services_backend_manager_service__WEBPACK_IMPORTED_MODULE_12__["BackendManagerService"],
            _services_log_service__WEBPACK_IMPORTED_MODULE_14__["LogService"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"]])
    ], WorkflowEditorComponent);
    return WorkflowEditorComponent;
}());



/***/ }),

/***/ "./src/app/workflow_editor/workflow_editor_module.ts":
/*!***********************************************************!*\
  !*** ./src/app/workflow_editor/workflow_editor_module.ts ***!
  \***********************************************************/
/*! exports provided: WorkflowEditorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkflowEditorModule", function() { return WorkflowEditorModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/esm5/slider.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm5/tree.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var ng2_dnd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng2-dnd */ "./node_modules/ng2-dnd/ng2-dnd.es5.js");
/* harmony import */ var _workflow_editor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./workflow_editor */ "./src/app/workflow_editor/workflow_editor.ts");
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














var WorkflowEditorModule = /** @class */ (function () {
    function WorkflowEditorModule() {
    }
    WorkflowEditorModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
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

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
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

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfills_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills.ts */ "./src/polyfills.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/app_module */ "./src/app/app_module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
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






if (_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_4__["AppModule"]).catch(function (err) { return console.log(err); });


/***/ }),

/***/ "./src/polyfills.ts":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js/dist/zone */ "./node_modules/zone.js/dist/zone.js");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__);
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

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /usr/local/google/home/sophiez/uicd-opensource-11222019061046/frontend/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map