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

import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReplaySubject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {ProjectRecord} from '../constants/interfaces';
import {BackendManagerService} from '../services/backend_manager_service';

/** The dialog when creating a new project. */
@Component({
  selector: 'share_with_project_dialog',
  templateUrl: './share_with_project_dialog.ng.html',
  styleUrls: ['./share_with_project_dialog.css'],
})
export class ShareWithProjectDialog implements OnDestroy {
  private readonly destroyed = new ReplaySubject<void>(1);
  userList = '';

  constructor(
      public dialogRef: MatDialogRef<ShareWithProjectDialog>,
      private readonly backendManagerService: BackendManagerService,
      @Inject(MAT_DIALOG_DATA) public data: ProjectRecord) {
    this.userList = data.shareWith || '';
  }

  dismissDialog() {
    this.dialogRef.close();
  }

  saveNewProject() {
    this.backendManagerService.addShareWithUserListToProject(this.userList)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(() => {
          this.dismissDialog();
        });
  }

  ngOnDestroy() {
    this.destroyed.next();
  }
}
