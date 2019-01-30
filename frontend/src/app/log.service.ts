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

import 'rxjs/add/operator/share';

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {QueueingSubject} from 'queueing-subject';
import {Observable} from 'rxjs/Observable';

import {SocketService} from './socket.service';

@Injectable()
export class LogService {
  private inputStream: QueueingSubject<any>;
  public outputStream: Observable<any>;

  constructor(private socketFactory: SocketService) {}

  public connect() {
    if (this.outputStream) return this.outputStream;

    // Using share() causes a single websocket to be created when the first
    // observer subscribes. This socket is shared with subsequent observers
    // and closed when the observer count falls to zero.
    return this.outputStream =
               this.socketFactory
                   .connect(
                       'ws://localhost:8888/log',
                       this.inputStream = new QueueingSubject<any>())
                   .share();
  }

  public disconnect() {
    this.outputStream = null;
  }
}
