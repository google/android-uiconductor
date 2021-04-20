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

import {AfterViewInit, Component, Inject, OnDestroy, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReplaySubject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

import {ACTIONS, ActionSummaryMetaData} from '../constants/actions';
import {BackendManagerService} from '../services/backend_manager_service';
import {ControlMessageService} from '../services/control_message_service';

import {PythonEditorSimpleComponent} from './python_editor_simple';

/** Advanced Action model for pythonscriptaction */
export interface PythonScriptActionDetails extends ActionSummaryMetaData {
  script: string;
  expectedReturnCode?: number;
}

/**
 * Pdb debugger component for python in UICD
 */

@Component({
  selector: 'python-debugger-simple-dialog',
  templateUrl: './python_debugger_simple_dialog.ng.html',
  styleUrls: ['./python_debugger_simple_dialog.css']
})
export class PythonDebuggerSimpleDialog implements AfterViewInit, OnDestroy {
  @ViewChild(PythonEditorSimpleComponent)
  private readonly pythonEditorSimpleComponent!: PythonEditorSimpleComponent;
  static readonly logMaxSize = 1000;
  private readonly destroyed = new ReplaySubject<void>(1);
  constructor(
      private readonly backendManagerService: BackendManagerService,
      private readonly controlMessageService: ControlMessageService,
      private readonly dialogRef: MatDialogRef<PythonDebuggerSimpleDialog>,
      @Inject(MAT_DIALOG_DATA) public actionData: PythonScriptActionDetails) {
    if (this.actionData) {  // from action edit dialog
      this.pythonScript = this.actionData.script;
    }
  }

  pythonScript = '';
  pdbDebuggerOption = '';
  breakPointMap = new Map<number, string[]>();

  ngAfterViewInit() {
    // Without assert, compiler will give compile error
    // see go/strict-prop-init-fix for more details
    this.pythonEditorSimpleComponent.setTextToEditor(this.pythonScript);
  }

  ngOnDestroy(): void {}

  saveAction() {
    this.pythonScript = this.pythonEditorSimpleComponent.getTextFromEditor();
    if (this.actionData) {
      this.actionData.script = this.pythonScript;
      this.backendManagerService.updateActionMetadata(this.actionData)
          .pipe(
              take(1),
              takeUntil(this.destroyed),
              )
          .subscribe(() => {
            this.controlMessageService.sendRefreshWorkflowMsg();
            this.dialogRef.close();
          });
      return;
    }
    this.actionData = {
      name: ACTIONS.PYTHON_SCRIPT_ACTION.shortName,
      type: ACTIONS.PYTHON_SCRIPT_ACTION.type,
      script: this.pythonScript,
      expectedReturnCode: 0,
    };

    this.backendManagerService.addActionToWorkflow(this.actionData)
        .pipe(
            take(1),
            takeUntil(this.destroyed),
            )
        .subscribe(() => {
          this.controlMessageService.sendRefreshWorkflowMsg();
          this.dialogRef.close();
        });
  }
}
