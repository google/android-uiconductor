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

import {HttpClientModule} from '@angular/common/http';
import {Injectable, NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatOptionModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularSplitModule} from 'angular-split';

import {AdvancedActionDialogComponent} from './advanced_actions_dialog/advanced_actions_dialog';
import {AdvancedActionsDialogModule} from './advanced_actions_dialog/advanced_actions_dialog_module';
import {ScriptActionInfoDialogComponent} from './advanced_actions_dialog/script_action_info_dialog';
import {SnippetActionInfoDialogComponent} from './advanced_actions_dialog/snippet_action_info_dialog';
import {AppComponent} from './app';
import {DeviceManagerModule} from './device_manager/device_manager_module';
import {LogPanelModule} from './log_panel/log_panel_module';
import {ChooseDeviceDialogComponent} from './popup_dialogs/choose_device_dialog';
import {DialogsModule} from './popup_dialogs/dialogs_module';
import {GlobalVariableSettingDialog} from './popup_dialogs/global_var_setting_dialog';
import {HistoryDialog} from './popup_dialogs/history_dialog';
import {PythonDebuggerSimpleDialog} from './popup_dialogs/python_debugger_simple_dialog';
import {ReplayDetailsDialog} from './popup_dialogs/replay_details_dialog';
import {ScreenCastModule} from './screen_cast/screen_cast_module';
import {ScreenValidationFlowComponent} from './screen_validation_flow/screen_validation_flow';
import {ScreenValidationFlowModule} from './screen_validation_flow/screen_validation_flow_module';
import {ValidationInfoDialogComponent} from './screen_validation_flow/validation_info';
import {BackendManagerService} from './services/backend_manager_service';
import {ControlMessageService} from './services/control_message_service';
import {DevicesManagerService} from './services/devices_manager_service';
import {LogService} from './services/log_service';
import {MinicapService} from './services/minicap_service';
import {TestCaseManagerService} from './services/test_case_manager_service';
import {TestExplorerModule} from './test_explorer/test_explorer_module';
import {UiTreeViewerModule} from './ui_tree_viewer/ui_tree_viewer_module';
import {WorkflowEditorModule} from './workflow_editor/workflow_editor_module';

/** Uicd Cumstomized hammer config, to make the swipe smooth. */
@Injectable()
export class UicdHammerConfig extends HammerGestureConfig {
  overrides = {
    // override hammerjs default configuration
    'pan': {threshold: 5},
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AdvancedActionsDialogModule,
    AngularSplitModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DeviceManagerModule,
    DialogsModule,
    LogPanelModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    ScreenCastModule,
    ScreenValidationFlowModule,
    UiTreeViewerModule,
    TestExplorerModule,
    WorkflowEditorModule,
  ],
  providers: [
    {provide: HAMMER_GESTURE_CONFIG, useClass: UicdHammerConfig},
    BackendManagerService,
    ControlMessageService,
    DevicesManagerService,
    LogService,
    MinicapService,
    TestCaseManagerService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ChooseDeviceDialogComponent,
    ScreenValidationFlowComponent,
    ValidationInfoDialogComponent,
    AdvancedActionDialogComponent,
    ReplayDetailsDialog,
    SnippetActionInfoDialogComponent,
    ScriptActionInfoDialogComponent,
    HistoryDialog,
    GlobalVariableSettingDialog,
    PythonDebuggerSimpleDialog,
  ],
})
export class AppModule {
}
