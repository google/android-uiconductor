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

import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

import {BACKEND_BASE_URL} from '../constants/device';

@Component({
  selector: 'replay-details-dialog',
  templateUrl: './replay-details-dialog.component.html',
  styleUrls: ['./replay-details-dialog.component.css']
})
export class ReplayDetailsComponent implements OnInit {
  @ViewChild('dataTree') dataTree: ElementRef;
  tree: any;
  outputList = [];
  testStatusColor;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.data = data;
    this.testStatusColor = this.getTestResultCssClass(data.playStatus);
  }
  getResourceBasePath = BACKEND_BASE_URL + '/getSavedResource?path=';
  ngOnInit() {
    const treeData = this.getDefaultData();
    this.setupDataTree(treeData);
    const childData = this.contructNodeFromData(this.data);
    treeData['children'].push(childData);
    this.updateDataTree(treeData);
  }

  setupDataTree(data) {
    const jsTreeObj: any = $(this.dataTree.nativeElement);
    this.tree =
        jsTreeObj.jstree({'core': {'data': data}, plugins: ['wholerow']});
  }

  updateDataTree(treeData) {
    this.tree.jstree(true).settings.core.data = treeData;
    this.tree.jstree(true).refresh();
  }

  getDefaultData() {
    return {
      'text': 'Test Details',
      'id': 1,
      'icon': 'fa fa-folder',
      'state': {opened: true},
      'children': []
    };
  }

  getTestResultCssClass(playStatus) {
    switch (playStatus) {
      case 'PASS':
        return 'test-status-pass';
      case 'FAIL':
        return 'test-status-fail';
      case 'CANCELLED':
        return 'test-status-cancelled';
    }
    return '';
  }

  getNodeDisplayText(playStatus, content) {
    switch (playStatus) {
      case 'SKIPPED':
        return '<span class="skipped_status">(SKIPPED) </span><span class="skipped_content">' +
            content + '</span>';
      case 'FAIL':
        return '<span class="failed_status">(FAIL) </span><span class="content_bold">' +
            content + '</span>';
      case 'EXIT_CURRENT_COMPOUND':
        return '<span class="exit_current_compound_status">(Exit Current Compound) </span><span class="content_bold">' +
            content + '</span>';
      default:
        if (content.includes('Validation')) {
          return '<span class="pass_status">(PASS) </span><span>' + content +
              '</span>';
        } else {
          return content;
        }
    }
  }

  contructNodeFromData(obj) {
    const topChildren = {};
    topChildren['text'] = this.getNodeDisplayText(obj.playStatus, obj.content);
    topChildren['id'] = obj.uuid;
    topChildren['state'] = {opened: true};
    topChildren['icon'] = this.getIconByActionType(obj.actionType);
    topChildren['children'] = [];
    if (obj.childrenResult.length > 0) {
      obj.childrenResult.forEach(element => {
        topChildren['children'].push(this.contructNodeFromData(element));
      });
    }

    if (obj.outputType === 'SCREENSHOT' || obj.outputType === 'LOGCAT') {
      const displayObj = {};
      displayObj['type'] = obj.outputType;
      displayObj['path'] = this.getResourceBasePath + obj.externalFilePath;
      this.outputList.push(displayObj);
    }
    return topChildren;
  }

  getIconByActionType(actionType) {
    return 'fa fa-mouse-pointer';
  }
}
