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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatOptionModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QueryBuilderModule} from 'angular2-query-builder';

import {DialogsModule} from '../popup_dialogs/dialogs_module';
import {ScreenValidationFlowModule} from '../screen_validation_flow/screen_validation_flow_module';

import {AdvancedActionDialogComponent} from './advanced_actions_dialog';
import {ScriptActionInfoDialogComponent} from './script_action_info_dialog';
import {SnippetActionInfoDialogComponent} from './snippet_action_info_dialog';


@NgModule({
  declarations: [
    AdvancedActionDialogComponent,
    SnippetActionInfoDialogComponent,
    ScriptActionInfoDialogComponent,
  ],
  imports: [
    BrowserModule,         BrowserAnimationsModule,
    CommonModule,          DialogsModule,
    FormsModule,           MatButtonModule,
    MatButtonToggleModule, MatCardModule,
    MatCheckboxModule,     MatChipsModule,
    MatDialogModule,       MatIconModule,
    MatInputModule,        MatRadioModule,
    MatOptionModule,       MatSelectModule,
    MatProgressBarModule,  QueryBuilderModule,
    ReactiveFormsModule,   ScreenValidationFlowModule,
  ],
  exports: [AdvancedActionDialogComponent],
})
export class AdvancedActionsDialogModule {
}
