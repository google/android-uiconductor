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
import {MatDialogRef} from '@angular/material/dialog';

/** Displays the instruction for validation related actions */
@Component({
  selector: 'validation-info-dialog',
  templateUrl: 'validation_info.ng.html',
  styleUrls: ['validation_info.css']
})
export class ValidationInfoDialogComponent {
  constructor(
      public dialogRef: MatDialogRef<ValidationInfoDialogComponent>,
  ) {}

  onOkClick(): void {
    this.dialogRef.close();
  }
}
