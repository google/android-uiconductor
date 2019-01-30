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

import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';

import {MessageService} from '../_services/index';
import {MESSAGE_TYPES} from '../constants/messageTypes';
import {LogService} from '../log.service';

@Component({
  selector: 'log-panel',
  templateUrl: './log-panel.component.html',
  styleUrls: ['./log-panel.component.css']
})
export class LogPanelComponent implements OnInit {
  private startTestSubscriber: Subscription;
  private endTestSubscriber: Subscription;
  @Input() playingLogs: any[];
  showingLogs = [];

  constructor(
      private logService: LogService, private messageService: MessageService) {
    this.startTestSubscriber =
        this.messageService.getMessage(MESSAGE_TYPES.testStart)
            .subscribe(message => {
              this.showingLogs.unshift('');
              this.showingLogs.unshift('');
              this.showingLogs.unshift(message);
            });
    this.endTestSubscriber =
        this.messageService.getMessage(MESSAGE_TYPES.testEnd)
            .subscribe(message => {
              this.showingLogs.unshift(message);
              this.showingLogs.unshift('');
              this.showingLogs.unshift('');
            });
  }

  ngOnInit() {
    this.logService.connect();
    this.logService.outputStream.subscribe((output) => {
      console.log(output);
      if (output.indexOf('UUID:') < 0) {
        this.showingLogs.unshift(
            new Date().toLocaleString('en-US', {hour12: false}) + ': ' +
            output);
      }
      this.playingLogs.unshift(output);
    });
  }

}
