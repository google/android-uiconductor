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

// taze: $, JQuery from //third_party/javascript/typings/jquery:jquery_without_externs
// taze: jstree from //third_party/javascript/typings/jstree:jstree

import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {v4 as uuid} from 'uuid';

import {BACKEND_BASE_URL} from '../constants/constants';
import {PlayActionResponse} from '../constants/interfaces';
import {JsTreeNode} from '../constants/jstree';

declare var $: any;
/** Pop-up dialog showing test result information. */
@Component({
  selector: 'app-replay-details-dialog',
  templateUrl: './replay_details_dialog.ng.html',
  styleUrls: ['./replay_details_dialog.css']
})
export class ReplayDetailsDialog implements OnInit {
  @ViewChild('jsTree', {static: true}) jsTreeEl!: ElementRef;
  jsTree!: any;
  testResult = 'SKIPPED';
  testStatusColor = 'RED';
  outputList: Array<{outputType: string, path: string}> = [];

  constructor(@Inject(MAT_DIALOG_DATA) readonly data: PlayActionResponse) {}

  ngOnInit() {
    this.testStatusColor = this.getTestStatusCss(this.data.playStatus);
    const treeData = this.constructTreeData(this.data);
    this.setupDataTree(treeData);
  }

  getTestStatusCss(playStatus: string): string {
    switch (playStatus) {
      case 'PASS':
        return 'test-status-pass';
      case 'FAIL':
        return 'test-status-fail';
      case 'CANCELLED':
        return 'test-status-cancelled';
      default:
        return '';
    }
  }

  setupDataTree(data: unknown) {
    const jsTreeObj: any = $(this.jsTreeEl.nativeElement);
    this.jsTree = jsTreeObj.jstree({
      'core': {
        'themes': {
          'dots': false,
        },
        'data': data,
        'plugins': ['wholerow'],
      }
    });
  }

  getNodeTitle(playStatus: string, content: string): string {
    switch (playStatus) {
      case 'SKIPPED':
        return '<span class="skipped-status">(SKIPPED) </span><span class="skipped-content">' +
            content + '</span>';
      case 'FAIL':
        return '<span class="failed-status">(FAIL) </span><span class="content-bold">' +
            content + '</span>';
      case 'EXIT_CURRENT_COMPOUND':
        return '<span class="exit-current-compound-status">(Exit Current Compound) </span><span class="content-bold">' +
            content + '</span>';
      default:
        if (content.includes('Validation')) {
          return '<span class="pass-status">(PASS) </span><span>' + content +
              '</span>';
        } else {
          return content;
        }
    }
  }

  constructTreeData(node: PlayActionResponse): JsTreeNode {
    const jsNode = new JsTreeNode(
        this.getNodeTitle(node.playStatus, node.content), uuid());
    jsNode.icon = 'fa fa-mouse-pointer';
    if (node.childrenResult && node.childrenResult.length > 0) {
      jsNode.children =
          node.childrenResult.map(this.constructTreeData.bind(this));
    }

    if (node.outputType === 'SCREENSHOT' || node.outputType === 'LOGCAT' ||
        node.outputType === 'IMG_VALIDATION') {
      this.outputList.push({
        outputType: node.outputType,
        path:
            BACKEND_BASE_URL + '/getSavedResource?path=' + node.externalFilePath
      });
    }
    return jsNode;
  }
}
