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

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatOptionModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularSplitModule} from 'angular-split';

import {ChooseDeviceDialogComponent} from './choose_device_dialog';
import {GlobalVariableSettingDialog} from './global_var_setting_dialog';
import {HardAndSoftInfoDialogComponent} from './hard_soft_import_action_info_dialog';
import {HistoryDialog} from './history_dialog';
import {PythonDebuggerSimpleDialog} from './python_debugger_simple_dialog';
import {PythonEditorSimpleComponent} from './python_editor_simple';

import {ReplayDetailsDialog} from './replay_details_dialog';

@NgModule({
  declarations: [
    ChooseDeviceDialogComponent,
    GlobalVariableSettingDialog,
    HardAndSoftInfoDialogComponent,
    HistoryDialog,
    PythonDebuggerSimpleDialog,
    PythonEditorSimpleComponent,
    ReplayDetailsDialog,
  ],
  imports: [
    AngularSplitModule,  BrowserModule,     BrowserAnimationsModule,
    CommonModule,        FlexLayoutModule,  FormsModule,
    ReactiveFormsModule, MatButtonModule,   MatCardModule,
    MatCheckboxModule,   MatChipsModule,    MatDialogModule,
    MatInputModule,      MatGridListModule, MatOptionModule,
    MatSelectModule,     MatTableModule,    MatTooltipModule,
    MatRadioModule,
  ],
  exports: [
    ChooseDeviceDialogComponent,
    GlobalVariableSettingDialog,
    HardAndSoftInfoDialogComponent,
    HistoryDialog,
    PythonDebuggerSimpleDialog,
    PythonEditorSimpleComponent,
    ReplayDetailsDialog,
  ],
})
export class DialogsModule {
}
