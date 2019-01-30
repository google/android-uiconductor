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

import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {MatChipInputEvent} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';

import {BackendManagerService} from '../../_services/backend-manager/backend-manager.service';
import {MessageService} from '../../_services/index';
import {TCMService} from '../../_services/testcase-manager/testcase-manager.service';
import {MESSAGE_TYPES} from '../../constants/messageTypes';

import {ScriptActionInfoDialogComponent} from './script-action-info-dialog';
import {SnippetActionInfoDialogComponent} from './snippet-action-info-dialog';

@Component({
  selector: 'app-new-action-dialog',
  templateUrl: './new-action-dialog.component.html',
  styleUrls: ['./new-action-dialog.component.css'],
})
export class NewActionDialogComponent implements OnInit {
  selectedActionType;

  isAdbCommand = false;
  _formBuilder: FormBuilder;
  saveToFolderId = '';
  isSaveWorkflow = false;
  isNewAction = true;
  isWaitingForMethodList = false;
  methodList = [];

  constructor(
      public dialog: MatDialog, private messageService: MessageService,
      private tcmService: TCMService,
      public dialogRef: MatDialogRef<NewActionDialogComponent>,
      private backendManagerService: BackendManagerService,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    this.setDefaultValue();
  }

  // name need match the name of java class.
  actionsTypes = [
    {
      name: 'CommandLineAction',
      display: 'Command Line Action',
      enum_name: 'COMMAND_LINE_ACTION'
    },
    {
      name: 'LogcatValidationAction',
      display: 'Logcat Validation Action',
      enum_name: 'LOGCAT_VALIDATION_ACTION'
    },
    {name: 'InputAction', display: 'Input Action', enum_name: 'INPUT_ACTION'},
    {
      name: 'RebootAction',
      display: 'Reboot Action',
      enum_name: 'REBOOT_ACTION'
    },
    {
      name: 'ClickAction',
      display: 'Advanced Click Action',
      enum_name: 'CLICK_ACTION'
    },
    {
      name: 'GlobalVariableValidationAction',
      display: 'Global Variable Validation Action',
      enum_name: 'GLOBAL_VARIABLE_VALIDATION_ACTION'
    },
    {
      name: 'UicdSnippetValidationAction',
      display: 'Uicd Snippet Validation Action',
      enum_name: 'UICD_SNIPPET_VALIDATION_ACTION'
    },
    {
      name: 'ScriptExecutionAction',
      display: 'Script Execution Action',
      enum_name: 'SCRIPT_EXECUTION_ACTION'
    },
  ];
  selectedStopType = 'StopTestIfFalse';
  stopTypes = [
    {name: 'StopTestIfFalse', display: 'Stop Test if False'},
    {name: 'StopTestIfTrue', display: 'Stop Test if True'},
    {
      name: 'StopCurrentCompoundIfFalse',
      display: 'Stop current compound if False'
    },
    {
      name: 'StopCurrentCompoundIfTrue',
      display: 'Stop current compound if True'
    },

  ];

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  setDefaultValue() {
    if (!this.data.hasOwnProperty('commandlineExecutionTimeoutSec')) {
      this.data['commandlineExecutionTimeoutSec'] =
          '5';  // CommandLineAction and ScriptExecutionAction
    }
    if (!this.data.hasOwnProperty('isSingleChar')) {
      this.data['isSingleChar'] = false;  // InputActionn
    }
    if (!this.data.hasOwnProperty('onlyReconnectToDevice')) {
      this.data['onlyReconnectToDevice'] = false;  // RebootAction
    }
    if (!this.data.hasOwnProperty('reconnectTimeInSec')) {
      this.data['reconnectTimeInSec'] = 30;  // RebootAction
    }
    if (!this.data.hasOwnProperty('textValidator')) {
      this.data['textValidator'] = {};  // LogcatValidationAction
    }
    if (!this.data.hasOwnProperty('name')) {
      this.data['name'] = 'New Action';
    }
    if (!this.data.hasOwnProperty('timeout')) {
      this.data['timeout'] = 5000;
    }
    if (!this.data.hasOwnProperty('delayAfterActionMs')) {
      this.data['delayAfterActionMs'] =
          '100';  // CommandLineAction and ScriptExecutionAction
    }
    if (this.data.hasOwnProperty('actionType')) {
      this.selectedActionType = this.data['actionType'];
      this.isNewAction = false;
    }
  }

  getActionClassName(enumName) {
    const actionElem =
        this.actionsTypes.find(elem => elem.enum_name === enumName);
    return actionElem.name;
  }

  saveAction(): void {
    console.log(this);
    this.data['actionType'] = this.selectedActionType;
    this.data['type'] = this.getActionClassName(this.selectedActionType);
    if (this.data['type'] === 'ClickAction') {
      this.data['isByElement'] = true;
    }
    if (this.data['type'] === 'UicdSnippetValidationAction') {
      this.data['arguments'] = this.data['arguments'] === undefined ?
          '[]' :
          '[' + this.data['arguments'] + ']';
    }
    if (this.data['type'] === 'ScriptExecutionAction') {
      if (this.data['arguments'] === undefined) {
        this.data['arguments'] = '';
      }
    }
    this.data['stopType'] = this.selectedStopType;
    if (!this.isNewAction) {
      this.backendManagerService.updateActionMetadata(this.data).subscribe(
          data => {
            console.log(data);
          });
    } else {
      this.backendManagerService.addActionToWorkflow([this.data])
          .subscribe(data => {
            this.sendMessage();
            console.log(data);
          });
    }
    this.dialogRef.close();
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(
        MESSAGE_TYPES.refreshWorkflow, 'message from recorder!');
  }

  selectedPackageChanged(selectedPackage) {
    if (selectedPackage !== undefined) {
      this.isWaitingForMethodList = true;
      this.backendManagerService.getAllAvailableSnippetMethods(selectedPackage)
          .subscribe(data => {
            this.methodList = [];
            for (const methodData of <Array<string>>data) {
              let methodStart = methodData.indexOf(' ') + 1;
              let methodEnd = methodData.indexOf('(');
              this.methodList.push({
                name: methodData.substring(methodStart, methodEnd),
                display: methodData
              });
            }
            this.isWaitingForMethodList = false;
          });
    }
  }

  methodSelected(selectedMethodValue) {
    for (const entry of this.methodList) {
      if (entry['name'] == selectedMethodValue) {
        if (entry['display'].indexOf('returns void') >= 0) {
          this.data['executeSnippetOnly'] = true;
          break;
        }
      }
    }
  }

  openSnippetActionInfoDlg() {
    const dialogRef = this.dialog.open(SnippetActionInfoDialogComponent, {
      width: '800px',
    });
  }

  openScriptActionInfoDlg() {
    const dialogRef = this.dialog.open(ScriptActionInfoDialogComponent, {
      width: '800px',
    });
  }
}
