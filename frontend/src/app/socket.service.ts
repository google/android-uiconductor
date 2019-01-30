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
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

export class SocketService {
  connect(url: string, input: Observable<any>): Observable<any> {
    return new Observable<any>(observer => {
      const socket = new WebSocket(url)
    let inputSubscription: Subscription

      socket.onopen = () => {
      inputSubscription =
          input.subscribe(data => {socket.send(JSON.stringify(data))})
      }

      socket.onmessage = message => {
      observer.next(message.data);
      }

      socket.onerror = error => {
      observer.error(error)
      }

      socket.onclose = () => {
      observer.complete()
      }

      return () => {
      if (inputSubscription) inputSubscription.unsubscribe()

        if (socket) socket.close()
      }
    })
  }
}
