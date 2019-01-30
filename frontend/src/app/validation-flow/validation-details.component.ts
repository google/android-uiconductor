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

import {Component, ElementRef, Inject, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';

import {BackendManagerService} from '../_services/backend-manager/backend-manager.service';
import {MessageService} from '../_services/index';

@Component({
  selector: 'app-validation-details',
  templateUrl: 'validation-details.component.html',
  styleUrls: ['./validation-details.component.css'],
})
export class ValidationDetailsComponent implements OnChanges {
  stopTypes = [
    {name: 'StopTestIfFalse', display: 'Stop All If False'},
    {name: 'StopTestIfTrue', display: 'Stop All If True'},
    {
      name: 'StopCurrentCompoundIfFalse',
      display: 'Stop Current Compound If False'
    },
    {
      name: 'StopCurrentCompoundIfTrue',
      display: 'Stop Current Compound If True'
    },
  ];
  @Input() inputData: any;

  constructor(
      private backendManagerService: BackendManagerService,
      private messageService: MessageService, public dialog: MatDialog) {}

  setModelDefaultValue() {
    this.inputData['model'] = this.convertValidationDlgData(this.inputData);
    if (this.inputData['model']['vList'] == null) {
      return;
    }
    let defaultSelector = '';
    for (let i = 0; i < this.inputData['model']['vList'].length; i++) {
      if (i === 0 ||
          this.inputData['model']['vList'][i].type === 'displayText') {
        defaultSelector = this.inputData['model']['vList'][i].type;
      }
    }
    this.inputData['model']['selectItem'] = defaultSelector;
    if (this.inputData['imageData'] != null &&
        this.inputData['validationSubType'] ===
            'IMAGE_MATCHING_VALIDATION_ACTION') {
      var canvas = (<HTMLCanvasElement>document.getElementById('snapshot'));
      var ctx = canvas.getContext('2d');
      var image = new Image();
      image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
      };
      image.src = this.inputData['imageData'];
    }
    this.inputData['model']['timeout'] = 60;
    this.inputData['model']['waitUntil'] = 'WaitUntilAppear';
  }

  ngOnChanges() {
    this.setModelDefaultValue();
  }

  convertValidationDlgData(validationData) {
    const vList = [];
    let selectBounds = {};
    // TODO: If nothing returned from the backend, we need some error
    // meesage dialog.
    if (validationData !== null) {
      if ('resourceId' in validationData) {
        vList.push(
            {'type': 'resourceId', 'value': validationData['resourceId']});
      }
      if ('displayText' in validationData) {
        vList.push(
            {'type': 'displayText', 'value': validationData['displayText']});
      }
      if ('checked' in validationData) {
        vList.push({'type': 'checked', 'value': validationData['checked']});
      }
      if (validationData.hasOwnProperty('leafNodeContext') &&
          validationData.leafNodeContext.hasOwnProperty('bounds')) {
        selectBounds = validationData.leafNodeContext.bounds;
      } else {
        selectBounds = validationData.bounds;
      }
      if (validationData['validationSubType'] != null) {
        this.inputData['validationSubType'] =
            validationData['validationSubType'];
      }
      if (validationData['imageData'] != null) {
        this.inputData['imageData'] = validationData['imageData'];
      }
    }
    const model = {'vList': vList, 'bounds': selectBounds};
    model['selectItem'] = '';
    model['isMatchNodeContext'] = false;
    model['matchType'] = 'Equals';
    if (validationData.hasOwnProperty('model') &&
        validationData.model.hasOwnProperty('textPosition')) {
      model['textPosition'] = validationData.model.textPosition;
    } else {
      model['textPosition'] = 'Around';
    }
    model['selectedStopType'] = 'StopTestIfFalse';
    model['threshold'] = 0.7;
    model['validationSubType'] = validationData.validationSubType;
    return model;
  }

  openValidationDetailsInfoDlg() {
    const dialogRef = this.dialog.open(ValidationDetailsInfoDialogComponent, {
      width: '800px',
    });
  }
}


@Component({
  selector: 'app-validation-details-info-dialog',
  templateUrl: 'validation-details-info-dialog.html',
  styleUrls: ['validation-details-info-dialog.css']
})
export class ValidationDetailsInfoDialogComponent {
  constructor(
      public dialogRef: MatDialogRef<ValidationDetailsInfoDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

  onOkClick(): void {
    this.dialogRef.close();
  }
}
