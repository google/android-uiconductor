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
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ScreenCastComponent} from './screen_cast';

@NgModule({
  declarations: [
    ScreenCastComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    ScreenCastComponent,
  ],
})
export class ScreenCastModule {
}
