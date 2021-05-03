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

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {ActionSummaryMetaData} from '../constants/actions';
import {BACKEND_BASE_URL} from '../constants/constants';
import {TestHistoryResponse, UpdateTestCaseTreeRequest} from '../constants/interfaces';
import {JsTreeInternal, JsTreeNode, TreeNode} from '../constants/jstree';

/**
 * TestcaseManager offers functionality to handle test case operations and
 * transmits them to backend.
 */
@Injectable({providedIn: 'root'})
export class TestCaseManagerService {
  readonly OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private readonly http: HttpClient) {}

  getTestCasesListByUsername(username: string):
      Observable<TestCaseListResponse[]> {
    return this.http.get<TestCaseListResponse[]>(
        BACKEND_BASE_URL + '/fetchTestcaseTreeByUsername',
        {params: new HttpParams().set('username', username)});
  }

  getTestCasesList(): Observable<TestCaseListResponse> {
    return this.http.get<TestCaseListResponse>(
        BACKEND_BASE_URL + '/fetchTestcaseTree');
  }

  getTestCasesListByProjectId(projectId: string):
      Observable<TestCaseListResponse> {
    return this.http.get<TestCaseListResponse>(
        BACKEND_BASE_URL + '/fetchTestcaseTreeByProjectId',
        {params: new HttpParams().set('projectId', projectId)});
  }

  fetchTestHistory(): Observable<TestHistoryResponse> {
    return this.http.get<TestHistoryResponse>(
        BACKEND_BASE_URL + '/fetchTestHistory');
  }

  updateTestCaseTree(node: TreeNode, treeUUID: string, projectId: string) {
    const req: UpdateTestCaseTreeRequest = {
      uuid: treeUUID,
      treeDetails: JSON.stringify(node),
      projectId,
    };
    return this.http.post(
        BACKEND_BASE_URL + '/updateTestCaseTree', req, this.OPTIONS);
  }

  deleteTestCaseTree(projectId: string) {
    return this.http.post(BACKEND_BASE_URL + '/deleteTree', projectId);
  }

  /**
   * Send request to backend to copy the action with the given actionId.
   * Return the created action
   */
  importTestCaseByActionId(actionId: string, userPreferredCopyType: string):
      Observable<ActionSummaryMetaData> {
    return this.http.get<ActionSummaryMetaData>(
        BACKEND_BASE_URL + '/importTestCaseByActionId', {
          params: new HttpParams()
                      .set('actionId', actionId)
                      .set('copyRequest', userPreferredCopyType)
        });
  }

  /** Send request to backend to import a test from Google3 */
  importTestCaseFromGoogle3(citcClient: string, path: string):
      Observable<ActionSummaryMetaData> {
    return this.http.get<ActionSummaryMetaData>(
        BACKEND_BASE_URL + '/importTestCaseFromGoogle3', {
          params:
              new HttpParams().set('citcClient', citcClient).set('path', path)
        });
  }

  /** Send request to backend to export the test to Google3 */
  exportTestCaseFromGoogle3(citcClient: string, path: string, uuid: string):
      Observable<ActionSummaryMetaData> {
    return this.http.get<ActionSummaryMetaData>(
        BACKEND_BASE_URL + '/exportTestCaseFromGoogle3', {
          params: new HttpParams()
                      .set('citcClient', citcClient)
                      .set('path', path)
                      .set('uuid', uuid)
        });
  }
}

/**
 * convertToJsTreeFormat converts given tree in the backend json format to
 * a format that can be set in jsTree.
 * @param node root node.
 */
export function convertToJsTreeFormat(node: TreeNode): JsTreeNode {
  const jsTreeNode: JsTreeNode = {
    text: node.value,
    icon: 'fa fa-folder',
    id: node.id,
    state: {'opened': true},
    isFolder: true,
    children: [],
  };

  if (node.additionalData && node.additionalData.length > 0) {
    jsTreeNode.additionalData = node.additionalData;
    jsTreeNode.isFolder = false;
    jsTreeNode.icon = 'fa fa-file-code-o';
  }

  if (node.children) {
    jsTreeNode.children =
        node.children.map(child => convertToJsTreeFormat(child));
  }

  return jsTreeNode;
}

/**
 * reconstructJsTreeData retrieves tree in JSTreeNode format given internal
 * _model data format.
 * @param data internal _model.data from jsTree
 * @id id of the root node of the tree
 */
export function reconstructJsTreeData(
    data: JsTreeInternal, id: string): JsTreeNode {
  let jsTreeNode: JsTreeNode;
  if (data[id].original) {
    jsTreeNode = data[id].original;
    jsTreeNode.children = [];
  } else {
    jsTreeNode = new JsTreeNode(data[id].text, data[id].id);
  }

  if (data[id].children) {
    jsTreeNode.children = data[id].children.map(
        (child: string) => reconstructJsTreeData(data, child));
  }

  return jsTreeNode;
}

/**
 * converToJsonTreeFormat converts a JsTree node format to object format
 * expected by backend calls.
 * @param jsTreeNode root node of jsTree.
 */
export function convertToJsonTreeFormat(jsTreeNode: JsTreeNode): TreeNode {
  const node: TreeNode = {
    value: jsTreeNode.text,
    id: jsTreeNode.id,
    emitLoadNextLevel: false,
    children: [],
  };
  if (jsTreeNode.additionalData) {
    node.additionalData = jsTreeNode.additionalData;
  }
  if (jsTreeNode.children) {
    node.children = jsTreeNode.children.map(convertToJsonTreeFormat);
  }

  return node;
}

/**
 * TestCaseListResponse declares JSON response from backend call
 * getTestCasesList.
 */
export declare interface TestCaseListResponse {
  uuid?: string;
  treeDetails: string;
  [index: string]: unknown;
}

/** The empty test case tree example that will be create for a new project. */
export function emptyTreeExample(): TreeNode {
  return {
    value: 'MyWorkspace',
    id: '1',
    emitLoadNextLevel: false,
    children: []
  };
}
