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

import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {MessageTypes} from '../constants/constants';

/**
 * ControlMessage, use this data structure to pass data between frontend
 * component.
 */
export interface ControlMessage {
  messageType: MessageTypes;
  extra: string;
}

/**
 * ControlMessageService, use this service to make communication between
 * frontend component.
 */
@Injectable()
export class ControlMessageService {
  private readonly controlMessageSubject = new ReplaySubject<ControlMessage>(1);

  /** Get subject of control message. */
  getControlMessageSubject() {
    return this.controlMessageSubject;
  }

  sendMessage(controlMessage: ControlMessage) {
    this.controlMessageSubject.next(controlMessage);
  }

  sendRefreshWorkflowMsg() {
    this.sendMessage({messageType: MessageTypes.REFRESH_WORKFLOW, extra: ''});
  }

  sendShowOverlayMsg() {
    this.sendMessage(
        {messageType: MessageTypes.REFRESH_OVERLAY, extra: 'show'});
  }

  sendHideOverlayMsg() {
    this.sendMessage(
        {messageType: MessageTypes.REFRESH_OVERLAY, extra: 'hide'});
  }

  sendRefreshTestCaseTreeMsg() {
    this.sendMessage(
        {messageType: MessageTypes.REFRESH_TEST_CASE_TREE, extra: ''});
  }
}
