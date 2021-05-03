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
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserModule} from '@angular/platform-browser';

import {DeviceManager} from './device_manager';
import {TvRemote} from './tv_remote';

@NgModule({
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    BrowserModule,
    MatTableModule,
  ],
  declarations: [DeviceManager, TvRemote],
  exports: [DeviceManager, TvRemote],
})
export class DeviceManagerModule {
}
