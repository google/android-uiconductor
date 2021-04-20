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
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatOptionModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScreenValidationFlowComponent} from '../screen_validation_flow/screen_validation_flow';
import {FetchContentComponent} from './fetch_content_form';
import {ValidationDetailsComponent} from './validation_details';
import {ValidationInfoDialogComponent} from './validation_info';


@NgModule({
  declarations: [
    FetchContentComponent,
    ScreenValidationFlowComponent,
    ValidationDetailsComponent,
    ValidationInfoDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatStepperModule,
    ReactiveFormsModule,
  ],
  exports: [
    FetchContentComponent,
    ScreenValidationFlowComponent,
    ValidationDetailsComponent,
    ValidationInfoDialogComponent,
  ],
})
export class ScreenValidationFlowModule {
}
