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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {GetUserPresetGlobalVariableResponse} from '../constants/interfaces';
import {BackendManagerService} from '../services/backend_manager_service';

/** Dialog allows user to override the backend global variables */
@Component({
  selector: 'global-var-setting-dialog',
  templateUrl: './global_var_setting_dialog.ng.html',
  styleUrls: ['./global_var_setting_dialog.css']
})
export class GlobalVariableSettingDialog implements OnInit, OnDestroy {
  private readonly destroyed = new ReplaySubject<void>(1);
  globalVariableStr = '';

  constructor(private readonly backendManagerService: BackendManagerService) {}

  ngOnInit() {
    this.backendManagerService.getUserPresetGlobalVariable()
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe((data: GetUserPresetGlobalVariableResponse) => {
          if (data) {
            this.globalVariableStr = data.globalVariableStr;
          }
        });
  }

  setGlobalVariable() {
    this.backendManagerService
        .setUserPresetGlobalVariable(this.globalVariableStr)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(() => {});
  }

  ngOnDestroy() {
    this.destroyed.next();
  }
}
