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

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class MessageService {
  messageTypes: {};

  constructor() {
    // cannot call createMessage(),
    // needs to be done this way to initialize messageType
    const msgSrc = new BehaviorSubject('Default Message');
    this.messageTypes = {
      'default': {messageSource: msgSrc, currentMessage: msgSrc.asObservable()}
    };
  }

  private createMessage(type: number, msg) {
    const msgSrc = new BehaviorSubject(msg);
    // create new type/msgObj pair
    this.messageTypes[type] = {
      messageSource: msgSrc,
      currentMessage: msgSrc.asObservable()
    };
  }
  // This will handle both creating and sending a message
  sendMessage(type: number, msg) {
    if (!(type in this.messageTypes)) {
      this.createMessage(type, msg);
    } else {
      // change message
      this.messageTypes[type].messageSource.next(msg);
    }
  }

  clearMessage(type: number) {
    if (type in this.messageTypes) {
      this.messageTypes[type].messageSource.next();
    }
  }

  getMessage(type: number): Observable<{}> {
    if (!(type in this.messageTypes)) {
      this.createMessage(type, '');
    }
    return this.messageTypes[type].currentMessage;
  }
}
