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

import {Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

import {BackendManagerService} from '../_services/backend-manager/backend-manager.service';
import {MessageService} from '../_services/index';
import {MESSAGE_TYPES} from '../constants/messageTypes';

@Component({
  selector: 'app-fetch-content-dialog',
  templateUrl: './fetch-content-dialog.component.html',
  styleUrls: ['./fetch-content-dialog.component.css']
})

export class FetchContentDialogComponent implements OnInit, OnChanges {
  @Input() inputData: any;

  constructor(
      public dialogRef: MatDialogRef<FetchContentDialogComponent>,
      private dialog: MatDialog,
      private backendManagerService: BackendManagerService,
      private messageService: MessageService) {}

  ngOnInit() {
    this.initDataModel();
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(
        MESSAGE_TYPES.refreshWorkflow, 'message from recorder!');
  }

  initDataModel() {
    this.inputData['model']['attributeVisible'] = false;
    this.inputData['model']['globalVariableName'] = '';
    this.inputData['model']['strategy'] = 'POSITION';
    this.inputData['model']['selector'] =
        this.getBoundsStr(this.inputData['bounds']);
  }

  ngOnChanges() {
    this.initDataModel();
  }

  strategyChanged(strategy) {
    if (strategy === 'POSITION') {
      this.inputData['model']['selector'] =
          this.getBoundsStr(this.inputData['bounds']);
      this.inputData['model']['attributeVisible'] = false;
    } else if (strategy === 'RESOURCEID') {
      this.inputData['model']['selector'] = this.inputData['resourceId'];
      this.inputData['model']['attributeVisible'] = false;
    } else if (strategy === 'XPATH') {
      this.inputData['model']['selector'] = '';
      this.inputData['model']['attributeVisible'] = true;
    }
    console.log(strategy);
  }

  // Convert the bounds object to string([x1, y1],[x2, y2]), it will be used in
  // the backend and frontend display.
  getBoundsStr(bounds) {
    if (bounds == null) {
      console.error('Bounds is null. Something wrong in the backend.');
      return '';
    }
    return '[' + bounds.x1 + ',' + bounds.y1 + '],[' + bounds.x2 + ',' +
        bounds.y2 + ']';
  }
}
