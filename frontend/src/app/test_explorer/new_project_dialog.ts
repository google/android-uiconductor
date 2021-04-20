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

import {Component, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ReplaySubject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

import {ProjectListResponse, ProjectRecord} from '../constants/interfaces';
import {BackendManagerService} from '../services/backend_manager_service';

/** The dialog when creating a new project. */
@Component({
  selector: 'new-project-dialog',
  templateUrl: './new_project_dialog.ng.html',
  styleUrls: ['./new_project_dialog.css'],
})
export class NewProjectDialog implements OnDestroy {
  private readonly destroyed = new ReplaySubject<void>(1);
  projectName = '';
  result = '';
  newCreatedProject!: ProjectRecord;

  constructor(
      public dialogRef: MatDialogRef<NewProjectDialog>,
      private readonly backendManagerService: BackendManagerService) {}

  dismissDialog() {
    this.dialogRef.close(this.newCreatedProject);
  }

  saveNewProject() {
    this.backendManagerService.createProject(this.projectName)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe((response: ProjectListResponse) => {
          if (response.success) {
            this.newCreatedProject = response.projectList[0];
            this.dismissDialog();
          } else {
            this.result =
                'Failed to create project, please make sure this name doesn\'t already exist.';
          }
        });
  }

  ngOnDestroy() {
    this.destroyed.next();
  }
}
