// Copyright 2020 Google LLC
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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {of, ReplaySubject} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {SNACKBAR_DURATION_MS} from '../constants/constants';
import {JsTreeNode} from '../constants/jstree';
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
  private readonly destroyed = new ReplaySubject<void>(1);

  constructor(
      private readonly dialogRef: MatDialogRef<ImportDialog>,
      private readonly testCaseManagerService: TestCaseManagerService,
      private readonly snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  importTestCase() {
    if (this.uuidImportText !== '') {
      this.testCaseManagerService.importTestCaseByActionId(this.uuidImportText)
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
            }
          });
    }
  }

  ngOnDestroy() {
    // Unsubscribe all pending subscriptions.
    this.destroyed.next();
  }
}
