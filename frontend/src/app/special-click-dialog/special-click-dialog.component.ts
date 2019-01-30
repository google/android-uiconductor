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

import {Component, Input, OnChanges} from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-special-click-dialog',
  templateUrl: 'special-click-dialog.component.html',
  styleUrls: ['./special-click-dialog.component.css'],
})
export class SpecialClickDialog implements OnChanges {
  @Input() inputData: any;

  constructor(public dialog: MatDialog) {}

  setModelDefaultValue() {
    this.inputData['model'] = this.convertValidationDlgData(this.inputData);
    this.inputData['model']['textPosition'] = 'Around';
    this.inputData['model']['threshold'] = 0.7;
    this.inputData['model']['clickType'] = 'Click';

    if (this.inputData['model']['imageData'] != null &&
        this.inputData['model']['specialClickSubType'] ===
            'ImageMatchThenClick') {
      var canvas = (<HTMLCanvasElement>document.getElementById('snapshot'));
      var ctx = canvas.getContext('2d');
      var image = new Image();
      image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
      };
      image.src = this.inputData['model']['imageData'];
    }
  }

  ngOnChanges() {
    this.setModelDefaultValue();
  }

  convertValidationDlgData(validationData) {
    const model = {};
    if (validationData !== null) {
      if (validationData['specialClickSubType'] != null) {
        model['specialClickSubType'] = validationData['specialClickSubType'];
      }
      if (validationData['imageData'] != null) {
        model['imageData'] = validationData['imageData'];
      }
    }
    return model;
  }
}
