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

import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatOptionModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularSplitModule} from 'angular-split';
import * as Hammer from 'hammerjs';
import * as $ from 'jquery';
import {DndModule} from 'ng2-dnd';
import {QueueingSubject} from 'queueing-subject';

import {BackendManagerService} from './_services/backend-manager/backend-manager.service'
import {MessageService} from './_services/index';
import {TCMService} from './_services/testcase-manager/testcase-manager.service';
import {NewActionDialogComponent} from './actions-plus/new-action-dialog/new-action-dialog.component';
import {ScriptActionInfoDialogComponent} from './actions-plus/new-action-dialog/script-action-info-dialog';
import {SnippetActionInfoDialogComponent} from './actions-plus/new-action-dialog/snippet-action-info-dialog';
import {AdbService} from './adb.service';
import {AppComponent} from './app.component';
import {ChooseDeviceDialogComponent} from './choose-device-dialog/choose-device-dialog.component';
import {DeviceManagerComponent} from './device-manager/device-manager.component';
import {DeviceService} from './device.service';
import {FetchContentDialogComponent} from './fetch-content-dialog/fetch-content-dialog.component';
import {HistoryDialogComponent} from './history-dialog/history-dialog.component';
import {LogPanelComponent} from './log-panel/log-panel.component';
import {LogService} from './log.service';
import {MinicapService} from './minicap.service';
import {RecorderComponent} from './recorder/recorder/recorder.component';
import {ReplayDetailsComponent} from './replay-details-dialog/replay-details-dialog.component';
import {SocketService} from './socket.service';
import {SpecialClickDialog} from './special-click-dialog/special-click-dialog.component';
import {ActionEditDialog} from './test-case-list-editor/action-edit-dialog.component';
import {ImportDialog} from './test-case-list-editor/import-dialog/import-dialog.component';
import {TestCaseList} from './test-case-list-editor/test-case-list.component';
import {TvRemoteDialogComponent} from './tv-remote-dialog/tv-remote-dialog.component';
import {CopyXmlDialog} from './ui-tree-viewer/copy-xml-dialog.component';
import {UiTreeViewerComponent} from './ui-tree-viewer/ui-tree-viewer.component';
import {ValidationDetailsComponent, ValidationDetailsInfoDialogComponent} from './validation-flow/validation-details.component';
import {ValidationFlowComponent} from './validation-flow/validation-flow.component';
import {WorkflowComponent} from './workflow/workflow.component';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    // override hammerjs default configuration
    'pan': {threshold: 5},
    'swipe': {
      velocity: 0.3,
      threshold: 0,
      direction: Hammer.DIRECTION_ALL
      // direction: 31 // /!\ ugly hack to allow swipe in all direction
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    RecorderComponent,
    WorkflowComponent,
    ValidationFlowComponent,
    ActionEditDialog,
    ImportDialog,
    ReplayDetailsComponent,
    TestCaseList,
    ChooseDeviceDialogComponent,
    LogPanelComponent,
    NewActionDialogComponent,
    HistoryDialogComponent,
    TvRemoteDialogComponent,
    DeviceManagerComponent,
    FetchContentDialogComponent,
    ValidationDetailsComponent,
    ValidationDetailsInfoDialogComponent,
    UiTreeViewerComponent,
    CopyXmlDialog,
    SpecialClickDialog,
    SnippetActionInfoDialogComponent,
    ScriptActionInfoDialogComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatGridListModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatTooltipModule,
    MatInputModule,
    MatRadioModule,
    MatSidenavModule,
    HttpClientModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatStepperModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    DndModule.forRoot(),
    MatTableModule,
    FlexLayoutModule,
    AngularSplitModule,
  ],
  providers: [
    {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig}, MessageService,
    AdbService, MinicapService, SocketService, LogService, TCMService,
    DeviceService, BackendManagerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ActionEditDialog,
    ChooseDeviceDialogComponent,
    ImportDialog,
    LogPanelComponent,
    NewActionDialogComponent,
    ReplayDetailsComponent,
    HistoryDialogComponent,
    TvRemoteDialogComponent,
    FetchContentDialogComponent,
    ValidationFlowComponent,
    ValidationDetailsComponent,
    UiTreeViewerComponent,
    CopyXmlDialog,
    ValidationDetailsInfoDialogComponent,
    SnippetActionInfoDialogComponent,
    ScriptActionInfoDialogComponent,
  ],
})
export class AppModule {
}
