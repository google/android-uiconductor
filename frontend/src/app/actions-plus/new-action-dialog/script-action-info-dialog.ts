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

import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'script-action-info-dialog',
  templateUrl: 'script-action-info-dialog.html',
  styleUrls: ['script-action-info-dialog.css']
})
export class ScriptActionInfoDialogComponent {
  constructor(
      public dialogRef: MatDialogRef<ScriptActionInfoDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

  onOkClick(): void {
    this.dialogRef.close();
  }
};
