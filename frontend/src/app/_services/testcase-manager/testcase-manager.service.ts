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

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BACKEND_BASE_URL} from '../../constants/device';

@Injectable()
export class TCMService {
  constructor(private http: HttpClient) {}

  baseUrl = BACKEND_BASE_URL;
  // reference to the treeComponent, so that we can also modifiy the tree from
  // other place. Todo: check whether there is a better solution.
  treeComponent;
  treeUUID = '';
  currentWorkflowName = 'none';
  ROOT_ID = '#';

  setTreeComponent(treeComponent) {
    this.treeComponent = treeComponent;
  }

  getCurrentWorkflowName() {
    return this.currentWorkflowName;
  }
  setCurrentWorkflowName(name) {
    this.currentWorkflowName = name;
  }

  saveJstreeModel() {
    const data = this.treeComponent.jstree(true)._model.data;
    const updatedTreeData = this.reconstructJstreeData(data, this.ROOT_ID);
    this.treeComponent.jstree(true).settings.core.data = updatedTreeData;
    const jsonTree = this.convertToJsonTreeFormat(updatedTreeData);
    this.updateTestCasesTree(jsonTree, this.treeUUID);
  }

  createFolder(name, id) {
    return {
      'text': name ? name : 'Empty Node',
      'icon': 'fa fa-folder',
      'id': id,
      'state': {'opened': true},
      'isFolder': true,
      'children': []
    };
  }

  reconstructJstreeData(data, nodeId) {
    let treeData;
    if (data[nodeId].original) {
      treeData = data[nodeId].original;
    } else {
      treeData = this.createFolder(data[nodeId]['text'], data[nodeId]['id']);
    }
    // children element got taken out of original, so add it back in
    treeData['children'] = [];
    if (data[nodeId].children) {
      for (let childID of data[nodeId].children) {
        const childNode = this.reconstructJstreeData(data, childID);
        treeData['children'].push(childNode);
      }
    }
    return treeData;
  }

  updateTestCasesTree(jsonTree, uuid) {
    const testEntityObj = {};
    testEntityObj['uuid'] = uuid;
    testEntityObj['treeDetails'] = JSON.stringify(jsonTree);
    const fullUrl = this.baseUrl + '/updateTestCaseTree';
    this.http.post(fullUrl, JSON.stringify(testEntityObj)).subscribe(data => {
      console.log(data);
    });
  }

  getTestCasesEmptyTree() {
    const sampleTree = {
      value: 'MyWorkspace',
      id: 1,
      emitLoadNextLevel: false,
      children: [
        {
          value: 'TestSuite1',
          id: 2,
          children: [

          ]
        },
        {
          value: 'TestSuite2',
          id: 3,
          children: [

          ]
        }
      ]
    };
    return sampleTree;
  }

  getTestCasesList() {
    const fullUrl = this.baseUrl + '/fetchTestcaseTree';
    return this.http.get(fullUrl);
  }

  getCurrentTreeModel() {
    return this.treeComponent.jstree(true).settings.core.data;
  }

  convertToJsTreeFormat(jsonTree) {
    const data = this.createFolder(jsonTree.value, jsonTree.id);
    if ('additionalData' in jsonTree && jsonTree['additionalData']) {
      data['additionalData'] = jsonTree['additionalData'];
      data['isFolder'] = false;
      // make this equal to false for no icon
      data['icon'] = 'fa fa-file-code-o';
    }
    if (jsonTree.children) {
      for (let child of jsonTree.children) {
        data.children.push(this.convertToJsTreeFormat(child));
      }
    }
    return data;
  }

  convertToJsonTreeFormat(jsTreeData) {
    const sampleTree = {
      value: jsTreeData.text,
      id: jsTreeData.id,
      emitLoadNextLevel: false,
      children: []
    };
    if ('additionalData' in jsTreeData && jsTreeData['additionalData']) {
      sampleTree['additionalData'] = jsTreeData['additionalData'];
    }
    if (jsTreeData.children) {
      for (let child of jsTreeData.children) {
        sampleTree.children.push(this.convertToJsonTreeFormat(child));
      }
    }
    return sampleTree;
  }

  getChildrenFolder(obj, folderNameList) {
    if (obj.children) {
      obj.children.forEach(child => {
        this.getChildrenFolder(child, folderNameList);
      }, this);
      // Do not add root folder to folder list or test cases
      if (obj.isFolder && obj.id != this.ROOT_ID) {
        folderNameList.push({value: obj.text, id: obj.id});
      }
    }
    return;
  }

  getFolderList() {
    const treeModel = this.getCurrentTreeModel();
    const foldList = [];
    this.getChildrenFolder(treeModel, foldList);
    return foldList;
  }
}
