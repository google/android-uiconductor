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

import {Component, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReplaySubject} from 'rxjs';
import {concatMap, filter, take, takeUntil} from 'rxjs/operators';
import {AdvancedActionDialogComponent} from '../advanced_actions_dialog/advanced_actions_dialog';
import {ActionModel, actionModelFromJson, ACTIONS, ActionSummaryMetaData, WorkflowModel} from '../constants/actions';
import {ActionColor, DEFAULT_WORKFLOW_NAME, MessageTypes, POPUP_DIALOG_DEFAULT_DIMENSION, TestStatusMsg} from '../constants/constants';
import {PlayActionRequest, PlayActionResponse} from '../constants/interfaces';
import {GlobalVariableSettingDialog} from '../popup_dialogs/global_var_setting_dialog';
import {HistoryDialog} from '../popup_dialogs/history_dialog';
import {ReplayDetailsDialog} from '../popup_dialogs/replay_details_dialog';
import {BackendManagerService} from '../services/backend_manager_service';
import {ControlMessage, ControlMessageService} from '../services/control_message_service';
import {LogService, Message} from '../services/log_service';
import {ActionEditDialog} from '../test_explorer/action_edit_dialog';


/** Container of slider change event */
export interface SliderChangeEvent {
  value: number;
}

/** The workflow editor component. */
@Component({
  selector: 'workflow-editor',
  templateUrl: 'workflow_editor.ng.html',
  styleUrls: ['./workflow_editor.css'],
})
export class WorkflowEditorComponent implements OnDestroy {
  readonly START_ACTION_STATUS_KEYWORD = 'Start Action Path:';
  readonly END_ACTION_STATUS_KEYWORD = 'End Action Path:';
  readonly PLAYACTION_STATUS_SPLITTER = '->';
  isReplaying = false;
  workflowModel: WorkflowModel = {actionId: '', name: '', childrenActions: []};
  /** Handle on-destroy Subject, used to unsubscribe. */
  private readonly destroyed = new ReplaySubject<void>(1);
  pathStack: ActionModel[] = [];
  pathIndexStack: number[] = [];

  playSpeedFactor = 1.0;
  static SNACKBAR_DURATION_MS = 2000;

  /**
   * Indicates the actions which is currently playing. Stack stores all parent
   * compound actions
   */
  currentPlayActionPath: string = '';

  constructor(
      private readonly controlMessageService: ControlMessageService,
      private readonly backendManagerService: BackendManagerService,
      private readonly logService: LogService,
      private readonly dialog: MatDialog,
      private readonly snackBar: MatSnackBar,
  ) {
    this.controlMessageService.getControlMessageSubject()
        .pipe(
            takeUntil(this.destroyed),
            filter(
                (msg: ControlMessage) =>
                    msg.messageType === MessageTypes.REFRESH_WORKFLOW),
            concatMap(() => this.backendManagerService.getCurrentWorkflow()))
        .subscribe(data => {
          this.workflowModel = new WorkflowModel(JSON.stringify(data));
          if (this.pathStack.length <= 1) {
            this.pathStack = [actionModelFromJson(JSON.stringify(data), 0)];
            this.pathIndexStack = [0];
          }
        });

    // Highlight the playing action by check the action id in log messages
    this.logService.getMessages()
        .pipe(
            takeUntil(this.destroyed),
            )
        .subscribe((data: Message) => {
          this.highlightAction(data.text);
        });

    // Sync the current workflow with backend
    this.controlMessageService.sendRefreshWorkflowMsg();
  }

  /*
   * Currently the highlight logic is based on the log information, originally,
   * it searches the actionId in the log, and highlight, it works for most
   * cases, however it won't work when we have multiple compound action in same
   * workflow(will highlight both). We are using index path to track the
   * progress. for example in the log, it will show 1->0->2, which indicates the
   * index of child in compound action at each level.
   */
  highlightAction(logContent: string) {
    if (logContent.includes(this.START_ACTION_STATUS_KEYWORD)) {
      this.currentPlayActionPath =
          logContent.replace(this.START_ACTION_STATUS_KEYWORD, '').trim();
    } else if (logContent.includes(this.END_ACTION_STATUS_KEYWORD)) {
      // remove the last level trace, i.e. in the log we see <END> 1->2->3
      // we want to backtrace remove the last section.
      const indexArr =
          this.currentPlayActionPath.split(this.PLAYACTION_STATUS_SPLITTER);
      if (indexArr.length > 1) {
        indexArr.pop();
        this.currentPlayActionPath =
            indexArr.join(this.PLAYACTION_STATUS_SPLITTER);
      } else {
        this.currentPlayActionPath = '';
      }
    }
  }

  addActionPlus() {
    this.dialog.open(AdvancedActionDialogComponent, {
      width: POPUP_DIALOG_DEFAULT_DIMENSION.width,
    });
  }

  addScreenShot() {
    const action: ActionSummaryMetaData = {
      type: ACTIONS.SCREEN_CAP_ACTION.type,
      name: ACTIONS.SCREEN_CAP_ACTION.shortName
    };
    this.backendManagerService.addActionToWorkflow(action)
        .pipe(take(1))
        .subscribe(() => {
          this.controlMessageService.sendRefreshWorkflowMsg();
        });
  }

  addWait() {
    const action: ActionSummaryMetaData = {
      type: ACTIONS.WAIT_ACTION.type,
      name: ACTIONS.WAIT_ACTION.shortName,
    };
    this.backendManagerService.addActionToWorkflow(action)
        .pipe(take(1))
        .subscribe(() => {
          this.controlMessageService.sendRefreshWorkflowMsg();
        });
  }

  clearRecord() {
    this.backendManagerService.createNewWorkSpace().pipe(take(1)).subscribe(
        () => {
          this.pathStack = [];
          this.pathIndexStack = [];
          this.controlMessageService.sendRefreshWorkflowMsg();
        });
  }

  onDropSuccess() {
    const reorderActions: string[] =
        this.workflowModel.childrenActions.map(action => action.actionId);
    this.backendManagerService.reorderActions(reorderActions)
        .pipe(take(1))
        .subscribe(() => {
          this.controlMessageService.sendRefreshWorkflowMsg();
        });
  }

  openHistoryDialog() {
    this.dialog.open(
        HistoryDialog, {width: POPUP_DIALOG_DEFAULT_DIMENSION.width});
  }

  openSaveWorkflowDialog() {
    if (this.workflowModel.name === '' ||
        this.workflowModel.name.includes(
            DEFAULT_WORKFLOW_NAME)) {  // New workflow
      const dialogRef = this.dialog.open(ActionEditDialog, {
        width: POPUP_DIALOG_DEFAULT_DIMENSION.width,
        data: {uuid: this.workflowModel.actionId, isSaveWorkflow: true}
      });
      dialogRef.afterClosed().subscribe(data => {
        this.controlMessageService.sendRefreshWorkflowMsg();
      });
    } else {
      this.backendManagerService.saveCurrentWorkflowWithoutMetadata()
          .pipe(take(1), takeUntil(this.destroyed))
          .subscribe(response => {
            if (response === true) {
              this.snackBar.open(
                  'Current workflow saved!', 'OK',
                  {duration: WorkflowEditorComponent.SNACKBAR_DURATION_MS});
            } else {
              this.snackBar.open(
                  'Error: Current workflow failed to save!', 'OK',
                  {duration: WorkflowEditorComponent.SNACKBAR_DURATION_MS});
            }
          });
    }
  }

  openActionEditDialog(id: string, index: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = POPUP_DIALOG_DEFAULT_DIMENSION.width;
    dialogConfig.data = {'uuid': id, 'index': index};
    const dialogRef = this.dialog.open(ActionEditDialog, dialogConfig);
    dialogRef.afterClosed()
        .pipe(
            filter(
                data => data && data.hasOwnProperty('playWorkflowRequested')),
            concatMap(() => {
              this.preparePlay();
              const playActionRequest: PlayActionRequest = {
                actionId: id,
                playSpeedFactor: this.playSpeedFactor,
              };
              return this.backendManagerService.playCurrentWorkflowFromAction(
                  playActionRequest);
            }))
        .subscribe(data => {
          this.finishPlay(data);
        });
  }

  preparePlay(): boolean {
    if (this.isReplaying) {
      this.backendManagerService.cancelCurrentWorkflow()
          .pipe(take(1))
          .subscribe(() => {
            this.isReplaying = false;
            this.logService.log(TestStatusMsg.TEST_END_CANCELLED);
          });
      return false;
    }
    this.isReplaying = true;
    this.logService.log(TestStatusMsg.TEST_START);
    return true;
  }

  finishPlay(data: PlayActionResponse) {
    this.isReplaying = false;
    this.controlMessageService.sendRefreshWorkflowMsg();
    this.logService.log(TestStatusMsg.TEST_END);
    this.dialog.open(
        ReplayDetailsDialog,
        {width: POPUP_DIALOG_DEFAULT_DIMENSION.width, data});
  }

  playCurrentWorkflow() {
    if (!this.preparePlay()) {
      return;
    }
    const playActionRequest: PlayActionRequest = {
      actionId: this.workflowModel.actionId,
      playSpeedFactor: this.playSpeedFactor,
    };
    this.backendManagerService.playAction(playActionRequest)
        .pipe(
            take(1),
            takeUntil(this.destroyed),
            )
        .subscribe((data) => {
          this.finishPlay(data);
        });
  }

  removeLast() {
    this.backendManagerService.removeLastAction().pipe(take(1)).subscribe(
        () => {
          this.controlMessageService.sendRefreshWorkflowMsg();
        });
  }

  getTextByType(actionModel: ActionModel) {
    if (actionModel.actionType in ACTIONS) {
      return ACTIONS[actionModel.actionType].shortName;
    }
    return 'UNKNOWN';
  }

  getColorByType(actionModel: ActionModel) {
    if (actionModel.actionType in ACTIONS) {
      return ACTIONS[actionModel.actionType].color;
    }
    return ActionColor.BLACK;
  }

  getBackgroundColor(actionModel: ActionModel) {
    if (!this.isReplaying) {
      return this.getColorByType(actionModel);
    }
    if (this.needHighLightCurrentAction(actionModel.actionIndex)) {
      return ActionColor.BLUE;
    }
    return ActionColor.GRAY;
  }

  needHighLightCurrentAction(actionIndex: number) {
    const pathList = this.pathIndexStack.slice(0);

    pathList.push(actionIndex);
    const pathStr = pathList.join(this.PLAYACTION_STATUS_SPLITTER);
    // Current path could be 1->6  or 1->6->4, both cases we want to hight light
    // 7th element. Can not just do startsWith, since we could something like
    // 1->61->2 in the path. It will highlight both 6th and 61th.
    if (this.currentPlayActionPath === pathStr ||
        this.currentPlayActionPath.startsWith(
            pathStr + this.PLAYACTION_STATUS_SPLITTER)) {
      return true;
    }
    return false;
  }

  expandCompoundAction(action: ActionModel, event: MouseEvent) {
    this.logService.log('Expand Compound Action: ' + action.name);
    this.pathStack = [...this.pathStack, action];
    this.pathIndexStack = [...this.pathIndexStack, action.actionIndex];
    event.stopPropagation();
    this.backendManagerService.loadWorkflow(action.actionId).subscribe(data => {
      this.workflowModel = new WorkflowModel(JSON.stringify(data));
    });
  }

  goBackFromExpandedCompoundAction(action: ActionModel) {
    this.logService.log('Go back to:' + action.name);
    const index = this.pathStack.findIndex(x => x.actionId === action.actionId);
    this.pathStack = this.pathStack.slice(0, index + 1);
    this.pathIndexStack = this.pathIndexStack.slice(0, index + 1);
    this.backendManagerService.loadWorkflow(action.actionId).subscribe(data => {
      this.workflowModel = new WorkflowModel(JSON.stringify(data));
    });
  }

  openGlobalVarSettings() {
    this.dialog.open(
        GlobalVariableSettingDialog,
        {width: POPUP_DIALOG_DEFAULT_DIMENSION.width});
  }

  onSpeedSliderChange(event: SliderChangeEvent) {
    if (this.isReplaying) {
      this.backendManagerService.setPlaySpeedFactor(event.value)
          .pipe(take(1), takeUntil(this.destroyed))
          .subscribe();
    }
  }

  ngOnDestroy() {
    // Unsubscribes all pending subscriptions.
    this.destroyed.next();
  }
}
