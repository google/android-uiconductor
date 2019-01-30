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

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {BackendManagerService} from '../_services/backend-manager/backend-manager.service';
import {MessageService} from '../_services/index';
import {AdbService} from '../adb.service';
import {KEY_CODES} from '../constants/keycodes';
import {MESSAGE_TYPES} from '../constants/messageTypes';

@Component({
  selector: 'app-tv-remote-dialog',
  templateUrl: './tv-remote-dialog.component.html',
  styleUrls: ['./tv-remote-dialog.component.css']
})
export class TvRemoteDialogComponent implements OnInit {
  constructor(
      private adbservice: AdbService,
      private backendManagerService: BackendManagerService,
      private messageService: MessageService) {}

  ngOnInit() {}

  sendMessage(text) {
    this.messageService.sendMessage(MESSAGE_TYPES.refreshWorkflow, text);
  }

  /**
   * Executes and stores a specific key event in the tree.
   *
   * @param keyCodeName A key from keyCodes to abstract away the actual value
   */
  sendKeyEvent(keyCode) {
    this.backendManagerService.pressKey(keyCode).subscribe(
        () => this.sendMessage('test'));
    this.backendManagerService.getCurrentWorkflow().subscribe(
        () => this.sendMessage('test'));
  }

  dPadLeft() {
    console.log('Left pressed!');
    this.sendKeyEvent(KEY_CODES.KEYCODE_DPAD_LEFT);
  }

  dPadRight() {
    console.log('Right pressed!');
    this.sendKeyEvent(KEY_CODES.KEYCODE_DPAD_RIGHT);
  }

  dPadUp() {
    console.log('Up pressed!');
    this.sendKeyEvent(KEY_CODES.KEYCODE_DPAD_UP);
  }

  dPadDown() {
    console.log('Down pressed!');
    this.sendKeyEvent(KEY_CODES.KEYCODE_DPAD_DOWN);
  }

  back() {
    console.log('Back pressed!');
    this.sendKeyEvent(KEY_CODES.KEYCODE_BACK);
  }

  home() {
    console.log('Home pressed!');
    this.sendKeyEvent(KEY_CODES.KEYCODE_HOME);
  }

  dPadCenter() {
    console.log('dPadCenter pressed!');
    this.sendKeyEvent(KEY_CODES.KEYCODE_DPAD_CENTER);
  }

  playPause() {
    console.log('Play/Pause pressed!');
    this.sendKeyEvent(KEY_CODES.KEYCODE_MEDIA_PLAY_PAUSE);
  }
}
