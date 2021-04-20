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

import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {of, ReplaySubject} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {IMPORT_COPY_TYPES, POPUP_DIALOG_DEFAULT_DIMENSION, SNACKBAR_DURATION_MS} from '../constants/constants';
import {JsTreeNode} from '../constants/jstree';
import {HardAndSoftInfoDialogComponent} from '../popup_dialogs/hard_soft_import_action_info_dialog';
import {TestCaseManagerService} from '../services/test_case_manager_service';

/**
 * Dialog for importing test cases by username or uuid from backend into
 * current users workspace.
 */
@Component({
  selector: 'app-import-dialog',
  templateUrl: './import_dialog.ng.html',
  styleUrls: ['./import_dialog.css']
})
export class ImportDialog implements OnInit, OnDestroy {
  uuidImportText = '';
  readonly IMPORT_COPY_TYPES = IMPORT_COPY_TYPES;
  readonly IMPORT_UUID = 'From uuid';
  readonly IMPORT_GOOGLE3 = 'From google3';
  readonly importTypes = [this.IMPORT_UUID, this.IMPORT_GOOGLE3];
  selectedUserImportType = '';
  selectedImportType = '';
  citcClient = '';
  filePath = '';
  private readonly destroyed = new ReplaySubject<void>(1);

  constructor(
      public dialog: MatDialog,
      private readonly dialogRef: MatDialogRef<ImportDialog>,
      private readonly testCaseManagerService: TestCaseManagerService,
      private readonly snackBar: MatSnackBar, private readonly ngZone: NgZone) {
  }

  ngOnInit() {
  }

  importTest() {
    if (this.selectedImportType === this.IMPORT_UUID) {
      this.importTestByUUID();
    } else {
      this.importTestFromGoogle3();
    }
  }

  importTestByUUID() {
    if (this.uuidImportText !== '') {
      this.testCaseManagerService
          .importTestCaseByActionId(
              this.uuidImportText, this.selectedUserImportType)
          .pipe(catchError(error => {
            this.snackBar.open(
                `Test case doesn't exist`, 'OK',
                {duration: SNACKBAR_DURATION_MS});
            return of(null);
          }))
          .subscribe(metadata => {
            if (metadata && metadata.actionId) {
              const copy =
                  new JsTreeNode(metadata.name, metadata.actionId, false);
              copy.additionalData = [metadata.actionId];
              this.dialogRef.close([copy]);
            } else {
              this.snackBar.open(
                  `You do not have permission; You can make a Hard Copy Instead`,
                  'OK', {duration: SNACKBAR_DURATION_MS});
            }
          });
    }
  }

  importTestFromGoogle3() {
    if (this.citcClient !== '' && this.filePath !== '') {
      this.testCaseManagerService
          .importTestCaseFromGoogle3(this.citcClient, this.filePath)
          .pipe(catchError(error => {
            this.snackBar.open(
                `Make sure that prodaccess is present and the path exists`,
                'OK', {duration: SNACKBAR_DURATION_MS});
            return of(null);
          }))
          .subscribe(metadata => {
            if (metadata && metadata.actionId) {
              const copy =
                  new JsTreeNode(metadata.name, metadata.actionId, false);
              copy.additionalData = [metadata.actionId];
              this.dialogRef.close([copy]);
            } else {
              this.snackBar.open(
                  `Imported Test Case Successfully`, 'OK',
                  {duration: SNACKBAR_DURATION_MS});
              this.dialogRef.close([]);
            }
          });
    }
  }

  openActionInfoDialog() {
    this.ngZone.run(() => {
      this.dialog.open(HardAndSoftInfoDialogComponent, {
        width: POPUP_DIALOG_DEFAULT_DIMENSION.width,
      });
    });
  }
  ngOnDestroy() {
    // Unsubscribe all pending subscriptions.
    this.destroyed.next();
  }
}
