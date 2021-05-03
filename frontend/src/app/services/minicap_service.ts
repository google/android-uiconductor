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
import {EMPTY, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {webSocket} from 'rxjs/webSocket';

const MINICAP_WEBSOCKET_URL = 'ws://localhost:';

/**
 * MinicapService to get the log information form the backend through websocket
 */
@Injectable()
export class MinicapService {
  private messages: Observable<string> = EMPTY;

  connect(port: number): Observable<string> {
    const fullURL = `${MINICAP_WEBSOCKET_URL}${port}`;
    console.log('minicap service connected! port number:' + fullURL);
    this.messages = webSocket({url: fullURL, deserializer: msg => msg})
                        .asObservable()
                        .pipe(map((response: MessageEvent) => {
                          return response.data;
                        }));
    return this.messages;
  }
}
