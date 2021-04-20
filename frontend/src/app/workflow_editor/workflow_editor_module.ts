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
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DndModule} from 'ng2-dnd';

import {WorkflowEditorComponent} from './workflow_editor';

@NgModule({
  declarations: [
    WorkflowEditorComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    DndModule.forRoot(),
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  exports: [
    WorkflowEditorComponent,
  ],
})
export class WorkflowEditorModule {
}
