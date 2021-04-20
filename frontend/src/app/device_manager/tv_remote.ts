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

import {Component, OnDestroy} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {KeyCodes} from '../constants/constants';
import {BackendManagerService} from '../services/backend_manager_service';

/**
 * TvRemote component containing buttons to remotely control an android TV.
 */
@Component({
  selector: 'tv-remote',
  templateUrl: './tv_remote.ng.html',
})
export class TvRemote implements OnDestroy {
  // To give access to KeyCodes enum in template.
  readonly keyCodes = KeyCodes;

  private readonly destroyed = new ReplaySubject<void>(1);

  constructor(private readonly backendManagerService: BackendManagerService) {}

  sendKeyEvent(keyCode: KeyCodes) {
    console.log('key pressed' + keyCode.toString());
    return this.backendManagerService.pressKey(keyCode)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe();
  }

  ngOnDestroy() {
    // Unsubscribes all pending subscriptions.
    this.destroyed.next();
  }
}
