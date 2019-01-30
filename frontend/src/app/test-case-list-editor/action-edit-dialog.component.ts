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

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {MatChipInputEvent} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {UUID} from 'angular2-uuid';

import {BackendManagerService} from '../_services/backend-manager/backend-manager.service';
import {MessageService} from '../_services/index';
import {TCMService} from '../_services/testcase-manager/testcase-manager.service';
import {NewActionDialogComponent} from '../actions-plus/new-action-dialog/new-action-dialog.component';
import {MESSAGE_TYPES} from '../constants/messageTypes';
import {ValidationFlowComponent} from '../validation-flow/validation-flow.component';

// action edit dialog
@Component({
  selector: 'action-edit-dialog',
  templateUrl: 'action-edit-dialog.html',
  styleUrls: ['./action-edit-dialog.css'],
})
export class ActionEditDialog implements OnInit {
  actionData = {};
  saveToFolderId = '';
  isSaveWorkflow = false;
  isNewWorkflow = false;
  isMoveAction = false;
  nodeIdInTree = '';
  currentUser: string;
  SNACKBAR_DURATION_MS = 2000;
  constructor(
      public dialog: MatDialog, private messageService: MessageService,
      private tcmService: TCMService,
      public dialogRef: MatDialogRef<ActionEditDialog>,
      private backendManagerService: BackendManagerService,
      private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    this.data = data;
    this.actionData['name'] = new FormControl('', [Validators.required]);
  }

  folderList = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  showEditDetails = false;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  ngOnInit() {
    this.isMoveAction = this.data['isMoveAction'];
    this.nodeIdInTree = this.data['nodeId'];
    if (this.data.hasOwnProperty('saveWorkflow')) {
      this.isSaveWorkflow = this.data['saveWorkflow'];
    }
    this.backendManagerService.getCurrentUser().subscribe(username => {
      this.currentUser = username['name'];
    });
    this.backendManagerService.getActionDetails(this.data['uuid'])
        .subscribe(data => {
          this.actionData = data;
          this.isNewWorkflow =
              this.data['isCopyAction'] || this.actionData['name'] == null;
          this.showEditDetails = this.hasEditDetails();
        });
    this.folderList = this.tcmService.getFolderList();
    if (this.folderList.length > 0) {
      this.saveToFolderId = this.folderList[0].id;
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add action
    if ((value || '').trim()) {
      this.data.nextActionList.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(action: any): void {
    const index = this.data.nextActionList.indexOf(action);

    if (index >= 0) {
      this.data.nextActionList.splice(index, 1);
    }
  }
  hasEditDetails() {
    const actionsUseNewActionDialog = [
      'COMMAND_LINE_ACTION', 'LOGCAT_VALIDATION_ACTION', 'INPUT_ACTION',
      'GLOBAL_VARIABLE_VALIDATION_ACTION', 'CLICK_ACTION'
    ];
    if (this.actionData['actionType'] === 'CLICK_ACTION') {
      return this.data.hasOwnProperty('isByElement') &&
          this.data['isByElement'];
    }
    return actionsUseNewActionDialog.includes(this.actionData['actionType']);
  }

  editAction() {
    const dialogRef = this.dialog.open(
        NewActionDialogComponent, {width: '750px', data: this.actionData});
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  deleteAction(): void {
    if (!confirm('Are you sure you wish to delete this?')) {
      return;
    }
    this.backendManagerService.removeAction(this.data['uuid'])
        .subscribe(data => {
          if (data) {
            this.dialogRef.close({'deleted': true});
          }
        });
  }

  playAction(): void {
    this.backendManagerService.playAction(this.data['uuid']).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }

  playWorkflowFromCurrentAction() {
    this.dialogRef.close({playWorkflowRequested: true});
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(
        MESSAGE_TYPES.refreshWorkflow, 'message from recorder!');
  }

  saveAction(): void {
    if (!this.actionData['name']) {
      this.snackBar.open(
          'The action name can\'t be empty', 'OK',
          {duration: this.SNACKBAR_DURATION_MS});
      return;
    }
    if (this.isSaveWorkflow === true && !this.data['isMoveAction'] &&
        !this.data['isCopyAction']) {
      this.backendManagerService.saveCurrentWorkflow(this.actionData)
          .subscribe(data => {
            const treeRef = this.tcmService.treeComponent;
            const newNode = {
              'text': this.actionData['name'],
              'icon': 'fa fa-file-code-o',
              'id': UUID.UUID(),
              'state': {'opened': true},
              'isFolder': false,
              'additionalData': [this.actionData['actionId']],
              'children': []
            };
            treeRef.jstree('create_node', this.saveToFolderId, newNode);
            this.tcmService.saveJstreeModel();
            this.tcmService.setCurrentWorkflowName(this.actionData['name']);
            this.sendMessage();
          });
    } else {
      this.backendManagerService.updateActionMetadata(this.actionData)
          .subscribe(data => {
            console.log(data);
          });
    }
    const data = {
      'parentId': this.saveToFolderId,
      'name': this.actionData['name'],
      'actionId': this.actionData['actionId'],
      'metadata': this.actionData
    };
    this.dialogRef.close(data);
  }

  isCompoundAction() {
    return this.actionData['actionType'] === 'COMPOUND_ACTION';
  }
}
