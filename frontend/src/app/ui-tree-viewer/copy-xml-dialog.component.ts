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

import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'copy-xml-dialog',
  templateUrl: 'copy-xml-dialog.html',
  styleUrls: ['./copy-xml-dialog.css'],
})

export class CopyXmlDialog implements OnInit {
  copied = false;

  constructor(
      public dialog: MatDialog, public dialogRef: MatDialogRef<CopyXmlDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    this.data = data;
  }

  ngOnInit() {}

  copyXml() {
    let copyElement = document.createElement('textarea');
    copyElement.style.position = 'fixed';
    copyElement.style.opacity = '0';
    copyElement.textContent = this.data['xml'];
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    body.removeChild(copyElement);
    this.copied = true;
  }
}