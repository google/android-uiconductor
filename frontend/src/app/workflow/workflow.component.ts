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

import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Sanitizer, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';

import {BackendManagerService} from '../_services/backend-manager/backend-manager.service';
import {MessageService} from '../_services/index';
import {TCMService} from '../_services/testcase-manager/testcase-manager.service';
import {NewActionDialogComponent} from '../actions-plus/new-action-dialog/new-action-dialog.component';
import {ACTIONS} from '../constants/actions';
import {MESSAGE_TYPES} from '../constants/messageTypes';
import {HistoryDialogComponent} from '../history-dialog/history-dialog.component';
import {LogService} from '../log.service';
import {ReplayDetailsComponent} from '../replay-details-dialog/replay-details-dialog.component';
import {ActionEditDialog} from '../test-case-list-editor/action-edit-dialog.component';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class WorkflowComponent implements OnInit, OnDestroy, AfterViewInit {
  SNACKBAR_DURATION_MS = 2000;
  name: string;
  message: any;
  workflowUUID;
  subscription: Subscription;
  isReplaying = false;
  nodeDic = {};
  actionList = [];
  currentWorkflowName = 'none';
  currentWorkflowObj = {};
  currentReplayAction = -1;
  lastReplayAction = -1;

  @Input() playingLogs: any[];
  @Input() initedDevices: any[];

  private parentNativeElement: any;
  logHandleIdx = 0;

  constructor(
      private cd: ChangeDetectorRef, element: ElementRef,
      private logService: LogService, private messageService: MessageService,
      public dialog: MatDialog, private tcmService: TCMService,
      private backendManagerService: BackendManagerService,
      public snackBar: MatSnackBar) {
    this.parentNativeElement = element.nativeElement;
    const that = this;
    this.subscription =
        this.messageService.getMessage(MESSAGE_TYPES.refreshWorkflow)
            .subscribe(message => {
              this.message = message;
              console.log('workflow message', message);
              this.refreshView();
            });
  }

  private getchLatestLog(): void {
    if (this.playingLogs && this.playingLogs.length > this.logHandleIdx &&
        this.playingLogs[this.logHandleIdx]) {
      const res = this.playingLogs[this.logHandleIdx].split(' ');
      if (res.includes('UUID:')) {
        if (res[res.length - 1] in this.nodeDic) {
          this.refreshView();
        }
      }
      this.logHandleIdx++;
    }
    this.subscribeLog();
  }

  private subscribeLog(): void {
    Observable.timer(300).subscribe(() => this.getchLatestLog());
  }

  ngOnInit() {
    this.clearRecord();
    this.subscribeLog();
    this.logService.connect();
    this.logService.outputStream.subscribe((output: any) => {
      let startAction = false;
      let endAction = false;
      if (output.indexOf('Start Action') >= 0) {
        startAction = true;
      } else if (output.indexOf('End Action') >= 0) {
        endAction = true;
      }
      if (startAction || endAction) {
        const actionId = output.substring(output.indexOf('UUID') + 6);
        for (let i = 0; i < this.actionList.length; i++) {
          if (actionId === this.actionList[i].actionId) {
            if (startAction) {
              if (this.lastReplayAction === i - 1) {
                this.lastReplayAction = i;
                this.currentReplayAction = i;
              }
            } else {
              this.currentReplayAction = -1;
            }
          }
        }
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {}

  getTextByType(d) {
    if (d.actionType in ACTIONS) {
      return ACTIONS[d.actionType].shortName;
    }
    return 'UNKNOWN';
  }

  getColorByType(d) {
    if (d.actionType in ACTIONS) {
      return ACTIONS[d.actionType].color;
    }
    return 'black';
  }

  openHistory() {
    const data = {title: 'History'};
    const dialogRef =
        this.dialog.open(HistoryDialogComponent, {width: '800px', data: data});
  }

  addActionPlus(event) {
    const data = {title: 'Add Advanced Action'};
    const dialogRef = this.dialog.open(
        NewActionDialogComponent, {width: '800px', data: data});
  }

  clearRecord() {
    this.tcmService.setCurrentWorkflowName('none');
    this.backendManagerService.createNewWorkSpace().subscribe(data => {
      this.workflowUUID = data['actionId'];
      this.currentWorkflowObj = data;
      this.refreshView();
    });
  }

  refreshView() {
    this.backendManagerService.getCurrentWorkflow().subscribe(data => {
      this.workflowUUID = data['actionId'];
      this.currentWorkflowObj = data;
      this.currentWorkflowName = this.tcmService.getCurrentWorkflowName();
      this.actionList = this.parseWorkflowFromJson(data);
      console.log(this.actionList);
    });
  }

  parseWorkflowFromJson(json) {
    const workflowData = [];
    for (let index = 0; index < json.childrenActions.length; index++) {
      const action = json.childrenActions[index];
      workflowData.push({
        'actionId': action.actionId,
        'actionType': action.actionType,
        'name': action.name,
      });
    }
    return workflowData;
  }

  playCurrentWorkflow() {
    if (this.initedDevices.length == 0) {
      return;
    }
    if (this.isReplaying) {
      this.backendManagerService.cancelCurrentWorkflow().subscribe(data => {
        this.messageService.sendMessage(
            MESSAGE_TYPES.testEnd,
            '================ Test End (Cancelled) ========');
        this.messageService.sendMessage(
            MESSAGE_TYPES.setInspectMode, this.isReplaying);
        console.log(data);
      });
    } else {
      this.currentReplayAction = -1;
      this.lastReplayAction = -1;
      this.isReplaying = true;
      this.messageService.sendMessage(
          MESSAGE_TYPES.testStart,
          '================ Test Start ==================');
      this.messageService.sendMessage(
          MESSAGE_TYPES.setInspectMode, this.isReplaying);
      this.backendManagerService.playCurrentWorkflow().subscribe(data => {
        console.log(data);
        this.isReplaying = false;
        this.messageService.sendMessage(
            MESSAGE_TYPES.testEnd,
            '================ Test End ====================');
        this.messageService.sendMessage(
            MESSAGE_TYPES.setInspectMode, this.isReplaying);
        this.dialog.open(ReplayDetailsComponent, {data: data, width: '900px'});
        this.refreshView();
      });
    }
  }

  removeLast() {
    this.backendManagerService.removeLastAction().subscribe(data => {
      console.log(data);
      this.refreshView();
    });
  }

  addActionToWorkflow(actions) {
    this.backendManagerService.addActionToWorkflow(actions).subscribe(
        sentData => this.refreshView());
  }

  takeScreenshot() {
    const action = {};
    action['actionType'] = 'SCREEN_CAP_ACTION';
    action['type'] = ACTIONS.SCREEN_CAP_ACTION.type;
    this.addActionToWorkflow([action]);
  }

  saveCurrentWorkflow() {
    const data = {'uuid': this.workflowUUID};
    data['saveWorkflow'] = true;

    if (this.currentWorkflowName === 'none') {
      this.dialog.open(ActionEditDialog, {width: '800px', data: data});
    } else {
      this.backendManagerService.getActionDetails(this.workflowUUID)
          .subscribe(
              data => {this.backendManagerService.saveCurrentWorkflow(data)
                           .subscribe(data => {
                             this.snackBar.open(
                                 'Workflow Saved!', '',
                                 {duration: this.SNACKBAR_DURATION_MS});
                           })});
    }
  }

  onDropSuccess(event) {
    // update order of actions
    const newSequence = [];
    for (let i = 0; i < this.actionList.length; i++) {
      newSequence.push(this.actionList[i].actionId);
    }
    this.currentWorkflowObj['childrenIdList'] = newSequence;
    this.backendManagerService.updateActionMetadata(this.currentWorkflowObj)
        .subscribe(data => console.log(data));
  }

  openActionEditDialog(event) {
    // second class define is the action uuid
    const id = event.target.className.split(' ')[1];
    const afterClose =
        this.dialog.open(ActionEditDialog, {width: '800px', data: {'uuid': id}})
            .afterClosed();
    afterClose.subscribe(data => {
      if (data !== undefined && data['playWorkflowRequested'] === true) {
        this.currentReplayAction = -1;
        this.isReplaying = true;
        this.backendManagerService.playCurrentWorkflowFromAction(id).subscribe(
            tdata => {
              console.log(tdata);
              this.isReplaying = false;
              this.dialog.open(
                  ReplayDetailsComponent, {data: tdata, width: '900px'});
              this.refreshView();
            });
      }
      this.refreshView();
    });
  }

  getBackgroundColor(item) {
    if (!this.isReplaying) {
      return this.getColorByType(this.actionList[item]);
    }
    if (item === this.currentReplayAction) {
      return 'blue';
    }
    return 'gray';
  }
}
