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

import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {DialogsModule} from '../popup_dialogs/dialogs_module';
import {HardAndSoftInfoDialogComponent} from '../popup_dialogs/hard_soft_import_action_info_dialog';

import {ActionEditDialog} from './action_edit_dialog';
import {ExportGoogle3Dialog} from './export_google3_dialog';
import {ImportDialog} from './import_dialog';
import {ImportProjectDialog} from './import_project_dialog';
import {NewProjectDialog} from './new_project_dialog';
import {ShareWithProjectDialog} from './share_with_project_dialog';
import {TestExplorer} from './test_explorer';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DialogsModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatRadioModule,
  ],
  exports: [TestExplorer],
  declarations: [
    TestExplorer, ActionEditDialog, ExportGoogle3Dialog, ImportDialog,
    ImportProjectDialog, NewProjectDialog, ShareWithProjectDialog
  ],
  entryComponents: [
    ActionEditDialog, HardAndSoftInfoDialogComponent, ExportGoogle3Dialog,
    ImportDialog, ImportProjectDialog, NewProjectDialog, ShareWithProjectDialog
  ]
})
export class TestExplorerModule {
}
