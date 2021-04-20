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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ReplaySubject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

import {POPUP_DIALOG_DEFAULT_DIMENSION} from '../constants/constants';
import {PlayActionResponse, TestHistoryEntity} from '../constants/interfaces';
import {TestCaseManagerService} from '../services/test_case_manager_service';

import {ReplayDetailsDialog} from './replay_details_dialog';

/** Testcase execution history results and details. */
@Component({
  selector: 'history-dialog',
  templateUrl: './history_dialog.ng.html',
  styleUrls: ['./history_dialog.css']
})
export class HistoryDialog implements OnInit, OnDestroy {
  private readonly destroyed = new ReplaySubject<void>(1);
  dataSource: TestHistoryEntity[] = [];
  displayedColumns: string[] = [
    'details', 'executionId', 'testUuid', 'name', 'result', 'runDate', 'author'
  ];

  constructor(
      private readonly dialog: MatDialog,
      private readonly testCaseManagerService: TestCaseManagerService) {}

  ngOnInit() {
    this.testCaseManagerService.fetchTestHistory()
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          this.dataSource = data.testHistoryEntities;
        });
  }

  showDetails(details: string) {
    // tslint:disable:no-any no-unnecessary-type-assertion
    const data: PlayActionResponse = JSON.parse(details) as any;
    // tslint:enable:no-any no-unnecessary-type-assertion
    this.dialog.open(
        ReplayDetailsDialog,
        {width: POPUP_DIALOG_DEFAULT_DIMENSION.width, data});
  }

  formatDate(inputDate: string) {
    return new Date(inputDate);
  }

  ngOnDestroy() {
    this.destroyed.next();
  }
}
