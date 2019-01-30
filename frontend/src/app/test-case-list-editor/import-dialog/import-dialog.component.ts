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
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {MatChipInputEvent} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {UUID} from 'angular2-uuid';
import {BehaviorSubject, Observable} from 'rxjs';

import {BackendManagerService} from '../../_services/backend-manager/backend-manager.service';
import {TCMService} from '../../_services/testcase-manager/testcase-manager.service';

// action edit dialog
@Component({
  selector: 'import-dialog',
  templateUrl: 'import-dialog.html',
  styleUrls: ['./import-dialog.css'],
})
export class ImportDialog implements OnInit {
  @ViewChild('testCaseTree') testCaseTree: ElementRef;
  IMPORT_TYPES = {UUID_TYPE: 0, USERNAME_TYPE: 1, TESTNAME_TYPE: 2};

  importType = this.IMPORT_TYPES.UUID_TYPE;
  preserveStructureToggle = false;
  isLoading = false;
  treeDisplay = 'none';
  uuidImportText: string;
  usernameText: string;
  testCaseNameText: string;
  actionTitle: string;
  actionType: string;
  testcaseDetails = [];
  previousUsername = '';
  previousTestcaseName = '';
  xmlDataTree: any;
  SNACKBAR_DURATION_MS = 2000;

  // Flag for disabling/enabling search for test case by name feature
  enableSearchByTestcaseName = false;

  constructor(
      public dialog: MatDialog, private tcmService: TCMService,
      private snackBar: MatSnackBar,
      private backendManagerService: BackendManagerService,
      public dialogRef: MatDialogRef<ImportDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    this.data = data;
  }

  ngOnInit() {
    this.setupDataTree();
  }

  setupDataTree() {
    const jsTreeObj: any = $(this.testCaseTree.nativeElement);
    this.xmlDataTree = jsTreeObj.jstree({plugins: ['checkbox', 'wholerow']});
    this.buildSelectEvent();
  }

  updateDataTree(treeData) {
    this.xmlDataTree.jstree(true).settings.core.data = treeData;
    this.xmlDataTree.jstree(true).refresh();
  }

  buildSelectEvent() {
    this.xmlDataTree.on('select_node.jstree', function(e, data) {
      const nodeSelected = data.node;
      if (nodeSelected['original'] && !nodeSelected['original']['isFolder']) {
        // display test case details
        this.backendManagerService
            .getActionDetails(nodeSelected['original']['additionalData'][0])
            .subscribe((actionData) => {
              this.actionTitle = actionData['name'];
              this.actionType = actionData['actionType'];
              this.testcaseDetails = actionData['childrenActions'];
            });
      }
    }.bind(this));
  }

  validateSearchInput(inputText: string, previousText: string) {
    if (!inputText || inputText === '') {
      return;
    }
    if (inputText === previousText) {
      return;
    }
    let continueFetching = true;
    const testCasesSelected =
        (this.xmlDataTree.jstree(true).get_checked().length > 0);
    if (testCasesSelected) {
      // alert user that their currently selected cases will be lost
      // check if they want to proceed
      continueFetching = confirm('Warning, Test Cases will be lost. Continue?');
    }
    return continueFetching;
  }

  fetchUserTests() {
    if (this.validateSearchInput(this.usernameText, this.previousUsername)) {
      this.previousUsername = this.usernameText;
      this.backendManagerService.fetchTestcaseTreeByUsername(this.usernameText)
          .subscribe((data) => {
            if (data[0] && data[0]['treeDetails']) {
              const tmpTree = JSON.parse(data[0]['treeDetails']);
              let treeData = this.tcmService.convertToJsTreeFormat(tmpTree);
              this.updateDataTree(treeData);
              // Reset previous search input (applies to test case name search
              // bar which is currently disabled)
              this.previousTestcaseName = '';
            } else {
              this.snackBar.open(
                  'Test Case does not exist', 'OK',
                  {duration: this.SNACKBAR_DURATION_MS});
            }
          });
    }
  }

  formatAction(testcase) {
    return {
      'text': testcase['name'] + ' | Created By: ' + testcase['createdBy'],
      'id': testcase['uuid'],
      'icon': 'fa fa-file-code-o',
      'isFolder': false,
      'additionalData': [testcase['uuid']]
    };
  }

  // This feature is currently disabled. To enable change, set
  // enableSearchByTestcaseName to true.
  fetchTestcaseByName() {
    if (this.validateSearchInput(
            this.testCaseNameText, this.previousTestcaseName)) {
      this.previousTestcaseName = this.testCaseNameText;
      this.backendManagerService.fetchTestcaseByName(this.testCaseNameText)
          .subscribe(testcases => {
            // make tree using these test cases
            let testcaseTree = [];
            for (let testcase of <Array<any>>testcases) {
              const testcaseNode = this.formatAction(testcase);
              testcaseTree.push(testcaseNode);
            }
            this.updateDataTree(testcaseTree);
            // Reset previous search input
            this.previousUsername = '';
          });
    }
  }

  selectAll() {
    this.xmlDataTree.jstree(true).check_all();
  }

  deselectAll() {
    this.xmlDataTree.jstree(true).uncheck_all();
  }

  preserveStructure() {
    this.preserveStructureToggle = !(this.preserveStructureToggle);
  }

  onRadioChange(event) {
    this.treeDisplay =
        (event.value === this.IMPORT_TYPES.UUID_TYPE ? 'none' : 'block');
  }

  cancel() {
    this.dialogRef.close();
  }

  copyNode(nodeId) {
    return new Promise(function(resolve, reject) {
      this.backendManagerService.copyAction(nodeId)
          .catch((error) => {
            console.log('Test Case does not exist:', error);
            return new BehaviorSubject(error).asObservable();
          })
          .subscribe(actionData => {
            if (!actionData.error) {
              const childNode = {
                'text': actionData['name'],
                'icon': 'fa fa-file-code-o',
                'id': UUID.UUID(),
                'state': {'opened': true},
                'isFolder': false,
                'additionalData': [actionData['actionId']],
                'children': []
              };
              resolve(childNode);
            }
            resolve(false);
          });
    }.bind(this));
  }

  getParentNode(childNode) {
    const parentNode = this.xmlDataTree.jstree(true).get_node(childNode.parent);
    return {
      'text': parentNode.text,
      'icon': parentNode.icon,
      'id': UUID.UUID(),
      'state': {'opened': true},
      'isFolder': true,
      'children': []
    };
  }

  import() {
    this.isLoading = true;
    if (this.importType === this.IMPORT_TYPES.UUID_TYPE) {
    if (this.uuidImportText && this.uuidImportText !== '') {
      this.backendManagerService.copyAction(this.uuidImportText)
          .catch(error => {
            this.snackBar.open(
                'Test Case does not exist', 'OK',
                {duration: this.SNACKBAR_DURATION_MS});
            return new BehaviorSubject(error).asObservable();
          })
          .subscribe(actionData => {
            if (!actionData.error) {
              const data = {'uuid': actionData['actionId']};
              this.dialogRef.close(data);
            } else {
              this.isLoading = false;
            }
          });
    } else {
      this.snackBar.open(
          'Please Enter a UUID', 'OK', {duration: this.SNACKBAR_DURATION_MS});
      this.isLoading = false;
    }
    } else {
    // check if preserve state is on
    // make an array with all uuids that were checked
    let testCasesSelected = this.xmlDataTree.jstree(true).get_checked(true);
    if (testCasesSelected && testCasesSelected.length > 0) {
      this.createTestCaseArray(testCasesSelected);
    } else {
      this.snackBar.open(
          'Please Select a Test Case', 'OK',
          {duration: this.SNACKBAR_DURATION_MS});
      this.isLoading = false;
    }
    }
  }

  async createTestCaseArray(testCasesSelected) {
    let data = {};
    let nodeArray = {};
    for(let testcase of testCasesSelected) {
    // Check if it's a test case
    if (testcase['original'] && !testcase['original'].isFolder &&
        testcase['original']['additionalData']) {
      const id = testcase['original']['additionalData'][0];
      const nodeCopy = await this.copyNode(id);
      // Populate node array
      if (this.preserveStructureToggle) {
        const parentId = testcase.parent;
        if (!(parentId in nodeArray)) {
          nodeArray[parentId] = this.getParentNode(testcase);
        }
        if (nodeCopy) {
          nodeArray[parentId].children.push(nodeCopy);
        }
      } else if (nodeCopy) {
        nodeArray[id] = nodeCopy;
      }
    }
    }
    data['nodeArray'] = nodeArray;
    this.dialogRef.close(data);
  }
}
