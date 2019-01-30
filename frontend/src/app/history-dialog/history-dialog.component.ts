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

import {Component, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {MatTableDataSource} from '@angular/material';
import {MatTableModule} from '@angular/material/table';

import {BackendManagerService} from '../_services/backend-manager/backend-manager.service';
import {MessageService} from '../_services/index';
import {MESSAGE_TYPES} from '../constants/messageTypes';
import {ReplayDetailsComponent} from '../replay-details-dialog/replay-details-dialog.component';

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.css']
})
export class HistoryDialogComponent implements OnInit {
  displayedColumns = [
    'uuidlink', 'uuid', 'testcaseUuid', 'testMsg', 'testResult', 'createdAt',
    'createdBy'
  ];
  dataSource = new MatTableDataSource();
  selectedItem = {};
  testIdList = '';
  testResultDetailsMap = {};
  baseUrl = 'http://localhost:8080';
  constructor(
      public dialogRef: MatDialogRef<HistoryDialogComponent>,
      private dialog: MatDialog, private messageService: MessageService,
      private backendManagerService: BackendManagerService) {}

  batchPlay() {
    const splitted = this.testIdList.split('\n');
    console.log(splitted);
    if (splitted.length == 1) {
      this.backendManagerService.playAction(splitted[0])
          .subscribe(
              data => {
                this.dialog.open(
                    HistoryDialogComponent, {width: '800px', data: data});
              },
              err => {
                this.messageService.sendMessage(
                    MESSAGE_TYPES.testEnd, JSON.stringify(err));
              });
    } else {
      this.backendManagerService.playAll(splitted).subscribe(
          data => {
            this.dialog.open(
                HistoryDialogComponent, {width: '800px', data: data});
          },
          err => {
            this.messageService.sendMessage(
                MESSAGE_TYPES.testEnd, JSON.stringify(err));
          });
    }
  }

  rowClicked(uuid) {
    console.log(uuid);
    const dialogRef = this.dialog.open(
        ReplayDetailsComponent,
        {data: JSON.parse(this.testResultDetailsMap[uuid]), width: '900px'});
  }

  ngOnInit() {
    this.backendManagerService.fetchTestcaseHistory().subscribe(data => {
      const arrData = <Array<any>>data;
      console.log(arrData);
      arrData.map(testResult => {
        this.testResultDetailsMap[testResult.uuid] = testResult.testDetails;
      });
      this.dataSource.data = arrData;
    });
  }

  onSelected() {
    console.log(this.selectedItem);
    this.dialogRef.close();
  }
}
