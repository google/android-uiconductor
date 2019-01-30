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
import {MatSnackBar} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {UUID} from 'angular2-uuid';
import * as FileSaver from 'file-saver';
import {Subscription} from 'rxjs/Subscription';

import {BackendManagerService} from '../_services/backend-manager/backend-manager.service';
import {MessageService} from '../_services/index';
import {TCMService} from '../_services/testcase-manager/testcase-manager.service';
import {MESSAGE_TYPES} from '../constants/messageTypes';
import {HistoryDialogComponent} from '../history-dialog/history-dialog.component';
import {ReplayDetailsComponent} from '../replay-details-dialog/replay-details-dialog.component';
import {ActionEditDialog} from '../test-case-list-editor/action-edit-dialog.component';
import {ImportDialog} from '../test-case-list-editor/import-dialog/import-dialog.component';

@Component({
  selector: 'app-test-case-list',
  templateUrl: 'test-case-list.component.html',
  styleUrls: ['./test-case-list.component.css'],
})
export class TestCaseList {
  subscription: Subscription;
  message: any;
  xmlDataTree: any;

  menuItems = {
    'open': {
      'action': this.openLoadAction.bind(this),
      'label': 'Open',
      'icon': 'fa fa-share-alt-square'
    },
    'add': {
      'action': this.addAction.bind(this),
      'label': 'Add',
      'icon': 'fa fa-plug'
    },
    'newFolder': {
      'action': this.newFolderAction.bind(this),
      'label': 'New Folder',
      'icon': 'fa fa-folder-open-o'
    },
    'play': {
      'action': this.playAll.bind(this),
      'label': 'Play',
      'icon': 'fa fa-play'
    },
    'edit': {
      'action': this.editAction.bind(this),
      'label': 'Edit',
      'icon': 'fa fa-pencil-square-o'
    },
    'delete': {
      'action': this.deleteAction.bind(this),
      'label': 'Delete',
      'icon': 'fa fa-trash'
    },
    'import': {
      'action': this.importAction.bind(this),
      'label': 'Import',
      'icon': 'fa fa-envelope-open'
    },
    'rename': {
      'action': this.renameAction.bind(this),
      'label': 'Rename',
      'icon': 'fa fa-tag'
    },
    'copyTo': {
      'action': this.copyTo.bind(this),
      'label': 'CopyTo',
      'icon': 'fa fa-files-o'
    },
    'moveTo': {
      'action': this.moveTo.bind(this),
      'label': 'MoveTo',
      'icon': 'fa fa-paper-plane-o'
    },
    'export': {
      'action': this.exportAction.bind(this),
      'label': 'Export',
      'icon': 'fa fa-cloud-download'
    },
    'exportAll': {
      'action': this.exportAll.bind(this),
      'label': 'Export All',
      'icon': 'fa fa-cloud-download'
    },
  };

  @ViewChild('actionTree') actionTree: ElementRef;
  SNACKBAR_DURATION_MS = 2000;

  constructor(
      private messageService: MessageService, private tcmService: TCMService,
      public dialog: MatDialog, private snackBar: MatSnackBar,
      private backendManagerService: BackendManagerService) {
    this.subscription =
        this.messageService.getMessage(MESSAGE_TYPES.refreshWorkflow)
            .subscribe(message => {
              this.message = message;
              console.log('from action list', message);
            });
  }

  ngOnInit() {
    this.setupDataTree();
    this.tcmService.getTestCasesList().subscribe(data => {
      if (data['uuid']) {
        this.tcmService.treeUUID = data['uuid'];
      }

      if (data['treeDetails']) {
        const tmpTree = JSON.parse(data['treeDetails']);
        const treeData = this.tcmService.convertToJsTreeFormat(tmpTree);
        this.updateDataTree(treeData);
      } else {
        const tree = this.tcmService.getTestCasesEmptyTree();
        const treeData = this.tcmService.convertToJsTreeFormat(tree);
        this.updateDataTree(treeData);
      }
      this.tcmService.setTreeComponent(this.xmlDataTree);
    });
  }

  setupDataTree() {
    const jsTreeObj: any = $(this.actionTree.nativeElement);
    this.xmlDataTree = jsTreeObj.jstree({
      'core': {
        // this allows modification to tree, such as rename, move, etc
        'check_callback': this.isValidDrop,
        'data': {}
      },
      'plugins': ['contextmenu', 'wholerow', 'dnd'],
      'contextmenu': {items: this.menuItems},
    });
    this.buildSelectEvent();
    this.buildCreateNodeEvent();
    this.buildDeleteNodeEvent();
    this.buildRefreshEvent();
    this.buildMoveEvent();
  }

  updateDataTree(treeData) {
    this.xmlDataTree.jstree(true).settings.core.data = treeData;
    this.xmlDataTree.jstree(true).refresh();
  }

  isValidDrop(
      op, nodeDragged, parentNode, currentPosition, additionalInformation) {
    if (op === 'move_node' && additionalInformation &&
        additionalInformation.dnd &&
        !additionalInformation.ref['original']['isFolder']) {
      return false;
    }
    return true;
  }

  buildSelectEvent() {
    this.xmlDataTree.on('select_node.jstree', function(e, action) {
      const nodeSelected = action.node;
      if (!nodeSelected.original.isFolder &&
          action.event.type !== 'contextmenu') {
        const uuid = this.getUUID(nodeSelected);
        this.backendManagerService.loadWorkflow(uuid).subscribe(data => {
          this.sendMessage();
        });
        this.tcmService.setCurrentWorkflowName(nodeSelected.text);
      }
    }.bind(this));
  }

  buildCreateNodeEvent() {
    this.xmlDataTree.on('create_node.jstree', function(e, nodeCreated) {
      if (nodeCreated.node) {
        this.saveTree();
      }
    }.bind(this));
  }

  buildDeleteNodeEvent() {
    this.xmlDataTree.on('delete_node.jstree', function(e, nodeDeleted) {
      if (nodeDeleted) {
        this.saveTree();
      }
    }.bind(this));
  }

  buildRefreshEvent() {
    this.xmlDataTree.on('refresh.jstree', function() {
      this.saveTree();
    }.bind(this));
  }

  buildMoveEvent() {
    this.xmlDataTree.on('move_node.jstree', function() {
      this.saveTree();
    }.bind(this));
  }

  saveTree() {
    this.tcmService.saveJstreeModel();
  }

  getCurrentNode(nodeRef) {
    const nodes = this.xmlDataTree.jstree(true).get_selected(nodeRef);
    if (nodes.length > 0) {
      return nodes[0];
    }
    return null;
  }

  getUUID(currentNode) {
    let uuid = currentNode.id;
    // if it has additional data that means that it is an action,
    // rather than just a folder, so it's additional data
    // is the uuid needed to retrieve those actions
    // from the database
    if (currentNode['original']['additionalData'] &&
        currentNode['original']['additionalData'].length > 0) {
      uuid = currentNode['original']['additionalData'][0];
    }
    return uuid;
  }

  getAllChildrenTestList(node, actionIds, nodeNames) {
    if (this.xmlDataTree.jstree(true).is_leaf(node)) {
      actionIds.push(this.getUUID(node));
      nodeNames.push(node.text);
    } else if (node.children) {
      for (const nodeID of node.children) {
        const child = this.xmlDataTree.jstree('get_node', nodeID);
        this.getAllChildrenTestList(child, actionIds, nodeNames);
      }
    }
  }

  openLoadAction(nodeRef) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (!currentNode || currentNode.original.isFolder) {
      const msg = 'Open operation cannot be performed on a folder!';
      this.snackBar.open(msg, 'OK', {duration: this.SNACKBAR_DURATION_MS});
      return;
    }
    const uuid = this.getUUID(currentNode);
    this.backendManagerService.loadWorkflow(uuid).subscribe(data => {
      this.sendMessage();
    });
    this.tcmService.setCurrentWorkflowName(currentNode.text);
  }

  addAction(nodeRef) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (!currentNode || currentNode.original.isFolder) {
      const msg = 'Add operation cannot be performed on a folder!';
      this.snackBar.open(msg, 'OK', {duration: this.SNACKBAR_DURATION_MS});
      return;
    }
    const uuid = this.getUUID(currentNode);
    this.backendManagerService.addActionByUuid(uuid).subscribe(data => {
      this.sendMessage();
      console.log(data);
    });
  }

  createFolder(parentId, name) {
    const newNode = this.tcmService.createFolder(name, UUID.UUID());
    const node = this.xmlDataTree.jstree('create_node', parentId, newNode);
    this.xmlDataTree.jstree('edit', node, null, function(nodeCreated, status) {
      if (status) {
        nodeCreated.original['text'] = nodeCreated['text'];
        nodeCreated.original['id'] = nodeCreated.id;
        this.saveTree();
      }
    }.bind(this));
  }

  newFolderAction(nodeRef) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (!currentNode || !currentNode.original.isFolder) {
      const msg = 'New Folder operation can only be performed on a folder!';
      this.snackBar.open(msg, 'OK', {duration: this.SNACKBAR_DURATION_MS});
      return;
    }
    this.createFolder(currentNode.id, 'New Folder');
  }

  playAll(nodeRef) {
    const node = this.getCurrentNode(nodeRef);
    const actionIds = [];
    this.getAllChildrenTestList(node, actionIds, []);
    if (actionIds.length == 1) {
      this.openLoadAction(nodeRef);
      this.backendManagerService.playAction(actionIds[0]).subscribe(data => {
        this.dialog.open(ReplayDetailsComponent, {data: data, width: '900px'});
      });
    } else {
      this.backendManagerService.playAll(actionIds).subscribe(data => {
        this.dialog.open(HistoryDialogComponent, {width: '800px', data: data});
      });
    }
  }

  editAction(nodeRef) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (!currentNode || currentNode.original.isFolder) {
      const msg = 'Edit operation cannot be performed on a folder!';
      this.snackBar.open(msg, 'OK', {duration: this.SNACKBAR_DURATION_MS});
      return;
    }
    const uuid = this.getUUID(currentNode);
    const data = {'uuid': uuid, 'isNewAction': false};
    const dialogRef =
        this.dialog.open(ActionEditDialog, {width: '800px', data: data});

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        if (data['deleted']) {
          this.xmlDataTree.jstree('delete_node', this.getCurrentNode(nodeRef));
        } else if (currentNode['text'] !== data['name']) {
          currentNode['original']['text'] = data['name'];
          this.xmlDataTree.jstree('rename_node', currentNode, data['name']);
          this.saveTree();
        }
      }
    });
  }

  deleteAction(nodeRef) {
    if (confirm('Are you sure you wish to delete this?')) {
      this.xmlDataTree.jstree('delete_node', this.getCurrentNode(nodeRef));
    }
  }

  importAction(nodeRef) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (!currentNode || !currentNode.original.isFolder) {
      const msg = 'Import operation can only be performed on a folder!';
      this.snackBar.open(msg, 'OK', {duration: this.SNACKBAR_DURATION_MS});
      return;
    }
    let dialogRef =
        this.dialog.open(ImportDialog, {width: '800px', height: '600px'});
    dialogRef.afterClosed().subscribe(async function(data) {
      if (data) {
        let treeData = this.xmlDataTree.jstree(true).settings.core.data;
        if (data['uuid'] && data['uuid'] !== '') {
          const parentFolder =
              this.findExistingTestCaseFolder(data['uuid'], treeData);
          if (parentFolder === '') {
            this.addNodeByNodeId(data['uuid'], currentNode);
          } else {
            const msg = 'Test Case Already Exists in ' + parentFolder;
            this.snackBar.open(
                msg, 'OK', {duration: this.SNACKBAR_DURATION_MS});
          }
        } else if (data['nodeArray']) {
          this.addTestCaseToNode(currentNode.id, treeData, data['nodeArray']);
          this.xmlDataTree.jstree(true).refresh();
        }
      }
    }.bind(this));
  }

  addTestCaseToNode(nodeId, treeData, nodeArray) {
    if (treeData.id != nodeId && treeData.children &&
        treeData.children.length > 0) {
      for (let child of treeData.children) {
        this.addTestCaseToNode(nodeId, child, nodeArray);
      }
    } else if (treeData.id == nodeId) {
      for (let key in nodeArray) {
        treeData.children.push(nodeArray[key]);
      }
    }
  }

  findExistingTestCaseFolder(treeNodeData, uuid) {
    if (!treeNodeData.isFolder && treeNodeData.additionalData &&
        treeNodeData.additionalData[0] == uuid) {
      const node = this.xmlDataTree.jstree('get_node', treeNodeData.id);
      const parent = this.xmlDataTree.jstree('get_node', node.parent);
      return parent.text;
    }
    if (treeNodeData.children && treeNodeData.children.length > 0) {
      for (let childNode of treeNodeData.children) {
        const folder = this.findExistingTestCaseFolder(childNode, uuid);
        if (folder !== '') {
          return folder;
        }
      }
    }
    return '';
  }

  addNodeByNodeId(uuid, node) {
    this.backendManagerService.getActionDetails(uuid).subscribe(data => {
      this.createNewNode(uuid, node, data['name']);
    });
  }

  createNewNode(uuid, parentNode, name) {
    let newNode = {
      'icon': 'fa fa-file-code-o',
      'text': name,
      'id': UUID.UUID(),
      'state': {'opened': true},
      'isFolder': false,
      'additionalData': [uuid],
      'children': []
    };
    this.xmlDataTree.jstree('create_node', parentNode.id, newNode);
  }

  renameAction(nodeRef) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (!currentNode) {
      return;
    }
    const uuid = this.getUUID(currentNode);
    this.xmlDataTree.jstree('edit', currentNode, null, function(node, status) {
      if (status && node) {
        if (!currentNode['original'].isFolder) {
          this.backendManagerService.getActionDetails(uuid).subscribe(
              metadata => {
                metadata['name'] = node['text'];
                // need to subscribe otherwise it won't actually change data
                this.backendManagerService.updateActionMetadata(metadata)
                    .subscribe(info => console.log('meta', info));
              });
        }
        node.original['text'] = node['text'];
        this.saveTree();
      }
    }.bind(this));
  }

  copyTo(nodeRef) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (!currentNode || currentNode.original.isFolder) {
      const msg = 'CopyTo operation cannot be performed on a folder!';
      this.snackBar.open(msg, 'OK', {duration: this.SNACKBAR_DURATION_MS});
      return;
    }
    const uuid = this.getUUID(currentNode);
    this.backendManagerService.copyAction(uuid).subscribe(data => {
      const dialogRef = this.dialog.open(ActionEditDialog, {
        width: '800px',
        data: {
          'uuid': data['actionId'],
          'isCopyAction': true,
          'saveWorkflow': true
        }
      });
      console.log(data);
      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          this.xmlDataTree.jstree(
              'copy_node', currentNode, data['parentId'], 'last',
              function(node, parent, position) {
                const originalCopy = Object.assign({}, currentNode['original']);
                node['original'] = originalCopy;
                // when copied new id is generated for this node to avoid issues
                node['original']['id'] = node['id'];
                // need to make additonal data a copy instead of reference
                // so that it does not change original node's value
                node['original']['additionalData'] = Object.assign(
                    [], currentNode['original']['additionalData']);
                node['original']['additionalData'][0] = data['actionId'];
                let newName = data['name'];
                if (node['text'] === data['name']) {
                  newName += '(Copy)';
                  data['metadata']['name'] = newName;
                }
                // updates name on database
                this.backendManagerService
                    .updateActionMetadata(data['metadata'])
                    .subscribe(console.log);
                node['original']['text'] = newName;
                this.xmlDataTree.jstree('rename_node', node, newName);
                this.saveTree();
              }.bind(this));
        }
      });
    });
  }

  moveTo(nodeRef) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (!currentNode || currentNode.original.isFolder) {
      const msg = 'MoveTo operation cannot be performed on a folder!';
      this.snackBar.open(msg, 'OK', {duration: this.SNACKBAR_DURATION_MS});
      return;
    }
    const uuid = this.getUUID(currentNode);
    const dialogRef = this.dialog.open(ActionEditDialog, {
      width: '800px',
      data: {'uuid': uuid, 'isMoveAction': true, 'saveWorkflow': true}
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.xmlDataTree.jstree(
            'move_node', currentNode, data['parentId'], 'last',
            function(node, parent, position) {
              if (node['text'] !== data['name']) {
                // updates name on database
                this.backendManagerService
                    .updateActionMetadata(data['metadata'])
                    .subscribe(console.log);
                node['original']['text'] = data['name'];
                this.xmlDataTree.jstree('rename_node', node, data['name']);
              }
            }.bind(this));
      }
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  export(uuid, fileName) {
    this.backendManagerService.exportTestCase(uuid).subscribe(data => {
      const byteChars = JSON.stringify(data, null, 2);
      const exportData =
          new Blob([byteChars + '\n'], {type: 'application/octet-stream'});
      // export name is displayName
      FileSaver.saveAs(exportData, fileName);
    });
  }

  exportAction(nodeRef) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (!currentNode || currentNode.original.isFolder) {
      const msg = 'Export operation cannot be performed on a folder!';
      this.snackBar.open(msg, 'OK', {duration: this.SNACKBAR_DURATION_MS});
      return;
    }
    const fileName = currentNode.text;
    const uuid = this.getUUID(currentNode);
    this.export(uuid, fileName);
  }

  async exportAll(nodeRef) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (this.xmlDataTree.jstree(true).is_leaf(currentNode) || !currentNode) {
      return;
    }
    const actionIds = [];
    const nodeNames = [];
    this.getAllChildrenTestList(currentNode, actionIds, nodeNames);
    for (let i = 0; i < actionIds.length; i++) {
      this.export(actionIds[i], nodeNames[i]);
      await this.sleep(5000);
    }
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(
        MESSAGE_TYPES.refreshWorkflow, 'testcaseSelected');
  }
}
