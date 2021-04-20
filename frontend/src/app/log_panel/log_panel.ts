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

import {Component} from '@angular/core';
import {filter, map, scan} from 'rxjs/operators';
import {LogService, Message} from '../services/log_service';

/**
 * Log component to display the log information from both backend log/frontend
 * events.
 */
@Component({selector: 'log-panel', templateUrl: './log_panel.ng.html'})
export class LogPanelComponent {
  static readonly logMaxSize = 1000;
  constructor(private readonly logService: LogService) {}

  // Get the log observable, filter out the empty entry and accumulate values by
  // the scan(), limit to last 1000 entries.
  showingLogs = this.logService.getMessages().pipe(
      filter((item: Message) => item.text.length > 0), map((item: Message) => {
        return new Date().toLocaleString('en-US', {hour12: false}) + ': ' +
            item.text;
      }),
      scan(
          (acc: string[], value: string) => [value, ...acc].slice(
              -LogPanelComponent.logMaxSize),
          []));
}
