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
import {EMPTY, ReplaySubject} from 'rxjs';
import {switchMap, take, takeUntil} from 'rxjs/operators';

import {IMPORT_COPY_TYPES, SNACKBAR_DURATION_MS} from '../constants/constants';
import {ProjectCopyRequest, ProjectListResponse, ProjectRecord} from '../constants/interfaces';
import {BackendManagerService} from '../services/backend_manager_service';
import {ControlMessageService} from '../services/control_message_service';

/**
 * Dialog for importing project by username into a new project.
 */
@Component({
  selector: 'app-import-project-dialog',
  templateUrl: './import_project_dialog.ng.html',
  styleUrls: ['./import_project_dialog.css']
})
export class ImportProjectDialog implements OnInit, OnDestroy {
  private readonly destroyed = new ReplaySubject<void>(1);
  readonly IMPORT_ZIP = 'From zip file';
  readonly IMPORT_USER = 'From user';
  readonly importTypes = [this.IMPORT_ZIP, this.IMPORT_USER];
  readonly IMPORT_COPY_TYPES = IMPORT_COPY_TYPES;
  importedZipFileName = '';
  selectedImportType = '';
  usernameImportText = '';
  projectList: ProjectRecord[] = [];
  selectedProject: ProjectRecord = {
    projectName: '',
    projectId: '',
  };
  targetProjectName = '';
  showOverlay = false;
  importedFile: File|null = null;

  constructor(
      public dialog: MatDialog,
      private readonly dialogRef: MatDialogRef<ImportProjectDialog>,
      private readonly backendManagerService: BackendManagerService,
      private readonly controlMessageService: ControlMessageService,
      private readonly snackBar: MatSnackBar, private readonly ngZone: NgZone) {
  }

  ngOnInit() {}

  fetchProjectListByUsername() {
    this.backendManagerService.getProjectListByUsername(this.usernameImportText)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          this.projectList = data.projectList;
        });
  }

  importProject() {
    if (this.targetProjectName.length < 3) {
      this.snackBar.open(
          `Project name length need to be greater than 3.`, 'OK',
          {duration: SNACKBAR_DURATION_MS});
    }

    if (this.selectedImportType === this.IMPORT_ZIP) {
      this.importProjectFromZip();
      return;
    }

    this.importProjectFromUser();
  }

  importProjectFromUser() {
    this.showOverlay = true;
    this.backendManagerService.createProject(this.targetProjectName)
        .pipe(
            switchMap((response: ProjectListResponse) => {
              if (response.success) {
                const projectCopyRequest: ProjectCopyRequest = {
                  srcProjectId: this.selectedProject.projectId,
                  targetProjectId: response.projectList[0].projectId
                };
                return this.backendManagerService.copyProject(
                    projectCopyRequest);
              } else {
                this.controlMessageService.sendHideOverlayMsg();
                this.snackBar.open(
                    `Failed to create project, please make sure this name 
                      doesn\'t already exist.`,
                    'OK', {duration: SNACKBAR_DURATION_MS});
                this.showOverlay = false;
                return EMPTY;
              }
            }),
            take(1), takeUntil(this.destroyed))
        .subscribe(() => {
          this.showOverlay = false;
          this.snackBar.open(
              `Project copied, please select new project in the list.`, 'OK',
              {duration: SNACKBAR_DURATION_MS});
          this.dismissDialog();
        });
  }

  importProjectFromZip() {
    if (!this.importedFile) {
      return;
    }
    this.showOverlay = true;
    this.backendManagerService
        .unzipAndImport(this.targetProjectName, this.importedFile)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(
            () => {
              this.snackBar.open(
                  'Project successfully imported', 'OK',
                  {duration: SNACKBAR_DURATION_MS});
              this.dismissDialog();
            },
            () => {
              this.showOverlay = false;
              this.snackBar.open(
                  'Error while importing the project from zip file', 'OK',
                  {duration: SNACKBAR_DURATION_MS});
            });
  }

  importFileSelected(event: Event) {
    if (!event.target) {
      return;
    }
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files) {
      return;
    }
    this.importedFile = fileInput.files[0];
  }

  dismissDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    // Unsubscribe all pending subscriptions.
    this.destroyed.next();
  }
}
