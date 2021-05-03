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

// taze: $, JQuery from //third_party/javascript/typings/jquery:jquery_without_externs
// taze: jstree from //third_party/javascript/typings/jstree:jstree

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {of, ReplaySubject} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {SNACKBAR_DURATION_MS} from '../constants/constants';
import {TestCaseManagerService} from '../services/test_case_manager_service';

/**
 * ExportDialogData represents config that can be passed to
 * ExportDialog.
 */
export interface ExportDialogData {
  actionId: string;
  google3Path: string;
}

/**
 * Dialog for exporting test cases to Google3
 */
@Component({
  selector: 'app-export-google3-dialog',
  templateUrl: './export_google3_dialog.ng.html',
  styleUrls: ['./export_google3_dialog.css']
})
export class ExportGoogle3Dialog implements OnInit, OnDestroy {
  citcClient = '';
  filePath = '';
  uuid = '';
  private readonly destroyed = new ReplaySubject<void>(1);

  constructor(
      public dialog: MatDialog,
      private readonly dialogRef: MatDialogRef<ExportGoogle3Dialog>,
      private readonly testCaseManagerService: TestCaseManagerService,
      private readonly snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: ExportDialogData) {}

  ngOnInit() {
    this.filePath = this.data.google3Path;
  }

  exportTest() {
    if (this.citcClient !== '' && this.filePath !== '') {
      this.testCaseManagerService
          .exportTestCaseFromGoogle3(
              this.citcClient, this.filePath, this.data.actionId)
          .pipe(catchError(error => {
            this.snackBar.open(
                `Make sure that prodaccess is present and the path exists`,
                'OK', {duration: SNACKBAR_DURATION_MS});
            return of(null);
          }))
          .subscribe(metadata => {
            this.snackBar.open(
                `Exported Test Case Successfully`, 'OK',
                {duration: SNACKBAR_DURATION_MS});
            this.dialogRef.close([]);
          });
    }
  }

  ngOnDestroy() {
    // Unsubscribe all pending subscriptions.
    this.destroyed.next();
  }
}
