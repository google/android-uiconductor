// Copyright 2019 Google LLC
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

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReplaySubject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

import {AdvancedActionDialogComponent, ClickActionDetails, ImageDiffActionDetails} from '../advanced_actions_dialog/advanced_actions_dialog';
import {ACTIONS, ActionSummaryMetaData} from '../constants/actions';
import {DEFAULT_WORKFLOW_NAME, MessageTypes, POPUP_DIALOG_DEFAULT_DIMENSION} from '../constants/constants';
import {PlayActionRequest} from '../constants/interfaces';
import {JsTreeNode, NodeParentPair, TreeNode} from '../constants/jstree';
import {BackendManagerService} from '../services/backend_manager_service';
import {ControlMessageService} from '../services/control_message_service';
import {TestCaseManagerService} from '../services/test_case_manager_service';

/**
 * ActionEditDialogData represents config that can be passed to
 * ActionEditDialog.
 */
export interface ActionEditDialogData {
  uuid: string;
  index: string;
  isMoveAction?: boolean;
  isCopyAction?: boolean;
  isSaveWorkflow?: boolean;
  isByElement?: boolean;
}

/**
 * ActionEditDialog is a dialog that can be used to create new actions or edit
 * current actions.
 */
@Component({
  selector: 'action-edit-dialog',
  templateUrl: './action_edit_dialog.ng.html',
  styleUrls: ['./action_edit_dialog.css']
})
export class ActionEditDialog implements OnInit, OnDestroy {
  private readonly destroyed = new ReplaySubject<void>(1);
  actionData: ActionSummaryMetaData = {
    type: 'no_type',
    name: 'empty_action',
  };
  currentUser!: string;
  folderList: Folder[] = [];
  saveToFolderId: string = '';
  playMode!: string;
  isNewWorkflow = false;
  showEditDetails = false;
  static SNACKBAR_DURATION_MS = 2000;
  static ADVANCED_ACTIONS = [
    ACTIONS.COMMAND_LINE_ACTION.actionType,
    ACTIONS.CLICK_ACTION.actionType,
    ACTIONS.INPUT_ACTION.actionType,
    ACTIONS.REBOOT_ACTION.actionType,
    ACTIONS.SNIPPET_VALIDATION_ACTION.actionType,
    ACTIONS.SCRIPT_EXECUTION_ACTION.actionType,
    ACTIONS.IMAGE_DIFF_VALIDATION_ACTION.actionType,
    ACTIONS.LOGCAT_VALIDATION_ACTION.actionType,
    ACTIONS.GLOBAL_VARIABLE_VALIDATION_ACTION.actionType,
    ACTIONS.ML_IMAGE_VALIDATION_ACTION.actionType,
    ACTIONS.FETCH_SCREEN_CONTENT_ACTION.actionType,
    ACTIONS.SCREEN_CONTENT_VALIDATION_ACTION.actionType,
    ACTIONS.SCROLL_SCREEN_CONTENT_VALIDATION_ACTION.actionType,
    ACTIONS.LOOP_SCREEN_CONTENT_VALIDATION_ACTION.actionType,
    ACTIONS.CONDITION_CLICK_ACTION.actionType,
    ACTIONS.CONDITION_VALIDATION_ACTION.actionType,
  ];

  constructor(
      public dialogRef: MatDialogRef<ActionEditDialog>,
      private readonly dialog: MatDialog,
      private readonly backendManagerService: BackendManagerService,
      private readonly testCaseManagerService: TestCaseManagerService,
      private readonly controlMessageService: ControlMessageService,
      private readonly snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: ActionEditDialogData) {}

  ngOnInit() {
    this.backendManagerService.getActionDetails(this.data.uuid)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          this.actionData = data;
          if (this.actionData.name == null ||
              this.actionData.name.includes(DEFAULT_WORKFLOW_NAME)) {
            this.isNewWorkflow = true;
            this.actionData.name = '';
          }
          if (this.data.isCopyAction) {
            this.isNewWorkflow = true;
          }
          this.showEditDetails = this.hasEditDetails();
        });

    this.backendManagerService.getCurrentUser()
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          this.currentUser = data.name;
        });
    this.testCaseManagerService.getTestCasesList()
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          const root: TreeNode = JSON.parse(data.treeDetails);
          this.folderList = retrieveFolders(root);
          if (this.folderList.length > 0) {
            this.saveToFolderId =
                this.folderList[this.folderList.length - 1].id;
          }
        });

    this.backendManagerService.getPlayMode()
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          this.playMode = data;
        });
  }

  hasEditDetails(): boolean {
    if (!this.actionData.actionType) {
      return false;
    }
    if (this.actionData.actionType === ACTIONS.CLICK_ACTION.actionType) {
      return (this.actionData as ClickActionDetails).isByElement === true;
    }
    return ActionEditDialog.ADVANCED_ACTIONS.includes(
        this.actionData.actionType);
  }

  isCompoundAction() {
    return this.actionData.actionType === ACTIONS.COMPOUND_ACTION.actionType;
  }

  isClickAction() {
    return this.actionData.actionType === ACTIONS.CLICK_ACTION.actionType;
  }

  isImageDiffValidationAction() {
    return this.actionData.actionType ===
        ACTIONS.IMAGE_DIFF_VALIDATION_ACTION.actionType;
  }

  isMLImageValidation() {
    return this.actionData.actionType ===
        ACTIONS.ML_IMAGE_VALIDATION_ACTION.actionType;
  }

  isMultiPlayMode() {
    return this.playMode === 'MULTIDEVICE';
  }

  editAction() {
    const dialogRef = this.dialog.open(
        AdvancedActionDialogComponent,
        {width: POPUP_DIALOG_DEFAULT_DIMENSION.width, data: this.actionData});
    dialogRef.afterClosed().subscribe((isSaved: boolean) => {
      if (isSaved) {
        this.closeDialog();
      }
    });
  }

  cancelDialog() {
    this.dialogRef.close();
  }

  deleteAction() {
    if (!confirm('Are you sure you wish to delete this?')) {
      return;
    }
    if (this.isImageDiffValidationAction()) {
      const imageDiffActionDetails = this.actionData as ImageDiffActionDetails;
      this.backendManagerService
          .deleteImage(imageDiffActionDetails.refImageUuid)
          .pipe(take(1), takeUntil(this.destroyed))
          .subscribe();
    }
    this.backendManagerService.removeAction(this.data.index)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          this.controlMessageService.sendRefreshWorkflowMsg();
          this.dialogRef.close({deleted: true});
        });
  }

  playAction() {
    const playActionRequest: PlayActionRequest = {
      actionId: this.data.uuid,
      playSpeedFactor: 1,
    };
    this.backendManagerService.playAction(playActionRequest)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          this.dialogRef.close();
        });
  }

  playWorkflowFromCurrentAction() {
    this.dialogRef.close({playWorkflowRequested: true});
  }

  saveAction() {
    if (!this.actionData.name) {
      this.snackBar.open(
          'The action name can\'t be empty', 'OK',
          {duration: ActionEditDialog.SNACKBAR_DURATION_MS});
      return;
    }
    if (this.data.isSaveWorkflow && !this.data.isMoveAction &&
        !this.data.isCopyAction) {
      this.backendManagerService.saveCurrentWorkflow(this.actionData)
          .pipe(take(1), takeUntil(this.destroyed))
          .subscribe(() => {
            const node =
                new JsTreeNode(this.actionData.name, this.data.uuid, false);
            node.additionalData = [this.data.uuid];

            const newNode:
                NodeParentPair = {parentId: this.saveToFolderId, node};
            this.controlMessageService.sendMessage({
              messageType: MessageTypes.ADD_NODE_TO_TREE,
              extra: JSON.stringify(newNode)
            });
            this.closeDialog();
          });
    } else {
      this.backendManagerService.updateActionMetadata(this.actionData)
          .pipe(take(1), takeUntil(this.destroyed))
          .subscribe(() => {
            this.closeDialog();
          });
    }
  }

  closeDialog() {
    this.dialogRef.close({
      parentId: this.saveToFolderId,
      name: this.actionData.name,
      actionId: this.actionData.actionId,
      metadata: this.actionData,
    });
  }

  ngOnDestroy() {
    // Unsubscribe all pending subscriptions.
    this.destroyed.next();
  }
}

interface Folder {
  id: string;
  value: string;
}

function retrieveFolders(node: TreeNode): Folder[] {
  let folders: Folder[] = [];
  if (node.children && node.children.length > 0) {
    for (const n of node.children) {
      folders = folders.concat(retrieveFolders(n));
    }
  }
  if (node.id !== '#' && !node.hasOwnProperty('additionalData')) {
    // only add the folder, use unshift to make the order similar to the order
    // on the tree
    folders.unshift({id: node.id, value: node.value});
  }
  return folders;
}
