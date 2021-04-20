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
import {merge, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {webSocket} from 'rxjs/webSocket';

const LOG_WEBSOCKET_URL = 'ws://localhost:8888/log';

/**
 * Message type, the message flow that used by communicate between frontend
 * widget and backend/frontend
 */
export interface Message {
  type: string;
  text: string;
}

/** LogService to get the log information form the backend through websocket */
@Injectable()
export class LogService {
  private readonly wsMessages: Observable<Message>;
  private readonly frontendSubject = new Subject<Message>();

  constructor() {
    this.wsMessages =
        webSocket({url: LOG_WEBSOCKET_URL, deserializer: msg => msg})
            .asObservable()
            .pipe(map((response: MessageEvent): Message => {
              return {type: response.type, text: response.data};
            }));
  }

  getMessages(): Observable<Message> {
    return merge(this.wsMessages, this.frontendSubject.asObservable());
  }

  log(msg: string) {
    this.frontendSubject.next({type: 'FrontendMsg', text: msg});
  }
}
