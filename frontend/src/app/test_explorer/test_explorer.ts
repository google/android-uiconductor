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
// taze: saveAs from //third_party/javascript/typings/file_saver:file_saver

import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
// to backend.
import {v4 as uuid} from 'uuid';
import {ReplaySubject} from 'rxjs';
import {filter, switchMap, take, takeUntil} from 'rxjs/operators';
import {DEFAULT_PROJECT_ID_PREFIX, DEFAULT_PROJECT_NAME_PREFIX, MessageTypes, POPUP_DIALOG_DEFAULT_DIMENSION, SNACKBAR_DURATION_MS} from '../constants/constants';
import {ExportImportProjectRequest, ProjectListResponse, ProjectRecord, UuidToBase64ImgResponse} from '../constants/interfaces';
import {JsTreeAction, JsTreeInternalNode, JsTreeNode, NodeParentPair} from '../constants/jstree';
import {BackendManagerService} from '../services/backend_manager_service';
import {ControlMessageService} from '../services/control_message_service';
import {convertToJsonTreeFormat, convertToJsTreeFormat, emptyTreeExample, reconstructJsTreeData, TestCaseManagerService} from '../services/test_case_manager_service';
import {ActionEditDialog} from './action_edit_dialog';
import {ImportDialog} from './import_dialog';
import {ImportProjectDialog} from './import_project_dialog';
import {NewProjectDialog} from './new_project_dialog';



declare var $: any;
declare var saveAs: any;
/**
 * Test case explorer component responsible for drawing test case tree.
 */
@Component({
  selector: 'test-explorer',
  templateUrl: './test_explorer.ng.html',
  styleUrls: ['./test_explorer.css']
})
export class TestExplorer implements OnInit, OnDestroy {
  @ViewChild('jsTree', {static: true}) jsTreeEl!: ElementRef;
  jsTree!: any;
  private readonly destroyed = new ReplaySubject<void>(1);
  treeUUID: string = '';
  searchStr = '';
  selectedProject: ProjectRecord = {
    projectName: '',
    projectId: '',
  };
  defaultProjectId: string = '';
  defaultProjectName: string = '';
  projectList: ProjectRecord[] = [];
  currentUser: string = '';

  menuItems = {
    'open': {
      'action': this.openLoadAction.bind(this),
      'label': 'Open',
      'icon': 'fa fa-share-alt-square',
    },
    'add': {
      'action': this.addAction.bind(this),
      'label': 'Add',
      'icon': 'fa fa-plug',
    },
    'newFolder': {
      'action': this.newFolderAction.bind(this),
      'label': 'New Folder',
      'icon': 'fa fa-folder-open-o',
    },
    'play': {
      'action': this.playAll.bind(this),
      'label': 'Play',
      'icon': 'fa fa-play',
    },
    'edit': {
      'action': this.editAction.bind(this),
      'label': 'Edit',
      'icon': 'fa fa-pencil-square-o'
    },
    'delete': {
      'action': this.deleteAction.bind(this),
      'label': 'Delete',
      'icon': 'fa fa-trash',
    },
    'import': {
      'action': this.importAction.bind(this),
      'label': 'Import',
      'icon': 'fa fa-envelope-open',
    },
    'rename': {
      'action': this.renameAction.bind(this),
      'label': 'Rename',
      'icon': 'fa fa-tag'
    },
    'copyTo': {
      'action': this.copyAction.bind(this),
      'label': 'CopyTo',
      'icon': 'fa fa-files-o'
    },
    'moveTo': {
      'action': this.moveAction.bind(this),
      'label': 'MoveTo',
      'icon': 'fa fa-paper-plane-o'
    },
    'export': {
      'action': this.exportAction.bind(this),
      'label': 'Export',
      'icon': 'fa fa-cloud-download'
    }
  };

  constructor(
      public dialog: MatDialog,
      private readonly testCaseManagerService: TestCaseManagerService,
      private readonly backendManagerService: BackendManagerService,
      private readonly controlMessageService: ControlMessageService,
      private readonly snackBar: MatSnackBar, private readonly ngZone: NgZone) {
  }

  ngOnInit() {
    this.backendManagerService.getCurrentUser()
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          this.currentUser = data.name;
          this.defaultProjectId = DEFAULT_PROJECT_ID_PREFIX + this.currentUser;
          this.defaultProjectName =
              DEFAULT_PROJECT_NAME_PREFIX + this.currentUser;
          this.selectedProject.projectId = this.defaultProjectId;
          this.selectedProject.projectName = this.defaultProjectName;
          this.initiateProject();
        });
    this.controlMessageService.getControlMessageSubject()
        .pipe(
            filter(
                msg => (msg.messageType === MessageTypes.ADD_NODE_TO_TREE) ||
                    (msg.messageType === MessageTypes.REFRESH_TEST_CASE_TREE)),
            takeUntil(this.destroyed))
        .subscribe(data => {
          if (data.messageType === MessageTypes.ADD_NODE_TO_TREE) {
            const newNode: NodeParentPair = JSON.parse(data.extra);
            this.jsTree.jstree('create_node', newNode.parentId, newNode.node);
          } else {
            this.refreshTree(false);
          }
        });
  }

  setupDataTree() {
    const jsTreeObj: any = $(this.jsTreeEl.nativeElement);
    this.jsTree = jsTreeObj.jstree({
      'core': {
        'themes': {
          'dots': false,
        },
        'data': {},
        'check_callback': this.isValidCB,
      },
      'search': {
        'case_insensitive': true,
        'show_only_matches': true,
      },
      'plugins': ['wholerow', 'dnd', 'contextmenu', 'sort', 'search'],
      'contextmenu': {items: this.menuItems},
    });
    this.refreshTree(false);
    this.addEventHooks();
  }

  /**
   * Before call {@code refreshTree}, {@code this.selectedProject.projectId}
   * need to be the correct one.
   */
  refreshTree(isNewWorkspace: boolean) {
    this.testCaseManagerService
        .getTestCasesListByProjectId(this.selectedProject.projectId)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          if (data.uuid) {
            this.treeUUID = data.uuid;
          }
          if (data.treeDetails) {
            this.updateDataTree(
                convertToJsTreeFormat(JSON.parse(data.treeDetails)),
                isNewWorkspace);
          } else {
            this.saveEmptyTreeToBackend();
          }
        });
  }
  searchTree() {
    this.jsTree.jstree('search', this.searchStr);
  }

  saveTreeToBackend() {
    // _model holds the jstree internal state. It is the only place(that I can
    // find) that holds the data object with original json passed and is up to
    // date.
    const modelData = this.getJsTreeInstance()['_model'].data;
    const data = reconstructJsTreeData(modelData, '#');
    this.getJsTreeInstance()['settings'].core.data = data;
    const jsonData = convertToJsonTreeFormat(data);
    console.log('saveTreeToBackend');
    this.testCaseManagerService
        .updateTestCaseTree(
            jsonData, this.treeUUID, this.selectedProject.projectId)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe();
  }

  saveEmptyTreeToBackend() {
    // Need directly call the save to backend, otherwise update won't pick up
    // the latest jsTree data from ['_model'].data, pass in the empty treeUUID,
    // backend will generate a new UUID for the tree.
    this.testCaseManagerService
        .updateTestCaseTree(
            emptyTreeExample(), /* treeUUID */ '',
            this.selectedProject.projectId)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(() => {
          this.updateDataTree(convertToJsTreeFormat(emptyTreeExample()), false);
          this.refreshTree(false);
        });
  }

  addEventHooks() {
    this.jsTree.on(
        'move_node.jstree create_node.jstree delete_node.jstree refresh.jstree, rename_node.jstree',
        this.saveTreeToBackend.bind(this));
    this.jsTree.on('select_node.jstree', (e: unknown, action: JsTreeAction) => {
      const node = action.node;
      if (!node.original.isFolder && action.event &&
          action.event.type !== 'contextmenu') {
        if (!confirm('Do you wish to load this test case?')) {
          return;
        }
        const uuid = this.getUUIDFromNode(node);
        this.backendManagerService.loadWorkflow(uuid)
            .pipe(take(1), takeUntil(this.destroyed))
            .subscribe(data => {
              this.controlMessageService.sendRefreshWorkflowMsg();
            });
      }
    });
  }

  getJsTreeInstance(): any {
    // jstree(true) returns an existing instance instead of creating a new
    // instance.
    return this.jsTree.jstree(true);
  }

  // tslint:disable:no-any no typing info available for jstree.
  isValidCB(
      op: string, nodeDragged: unknown, parentNode: unknown,
      currentPosition: unknown, more: CheckMore): boolean {
    // tslint:enable:no-any
    if (op === 'move_node' && more && more.dnd && more.ref &&
        more.ref.original && !more.ref.original.isFolder) {
      return false;
    }
    return true;
  }

  updateDataTree(jsTreeNode: JsTreeNode, isNewWorkspace: boolean) {
    // 'settings' is an internal field that contains some desired jstree
    // properties.
    this.getJsTreeInstance()['settings'].core.data = jsTreeNode;
    this.getJsTreeInstance().refresh(
        /* skip_loading */ false, /* forget_state */ true);
    if (isNewWorkspace) {
      this.backendManagerService.createNewWorkSpace()
          .pipe(take(1), takeUntil(this.destroyed))
          .subscribe(() => {
            this.controlMessageService.sendRefreshWorkflowMsg();
          });
    }
  }

  getUUIDFromNode(node: JsTreeInternalNode) {
    let uuid = node.id;
    // if it has additional data that means that it is an action,
    // rather than just a folder, so it's additional data
    // is the uuid needed to retrieve those actions
    // from the database
    if (node.original.additionalData &&
        node.original.additionalData.length > 0) {
      uuid = node.original.additionalData[0];
    }
    return uuid;
  }

  getCurrentNode(nodeRef: unknown): JsTreeInternalNode {
    const nodes = this.getJsTreeInstance().get_selected(nodeRef);
    if (nodes.length > 0) {
      return nodes[0];
    }
    throw new Error('cannot get selected node reference.');
  }

  openLoadAction(nodeRef: unknown) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (currentNode.original.isFolder) {
      this.snackBar.open(
          'Open operation cannot be performed on a folder!', 'OK',
          {duration: SNACKBAR_DURATION_MS});
      return;
    }
    const uuid = this.getUUIDFromNode(currentNode);
    this.backendManagerService.loadWorkflow(uuid)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          this.controlMessageService.sendRefreshWorkflowMsg();
        });
  }

  addAction(nodeRef: unknown) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (currentNode.original.isFolder) {
      this.snackBar.open(
          'Add operation cannot be performed on a folder!', 'OK',
          {duration: SNACKBAR_DURATION_MS});
      return;
    }
    const uuid = this.getUUIDFromNode(currentNode);
    this.backendManagerService.addActionByUUID(uuid)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          this.controlMessageService.sendRefreshWorkflowMsg();
        });
  }

  editAction(nodeRef: unknown) {
    const currentNode = this.getCurrentNode(nodeRef);
    this.ngZone.run(() => {
      const dialogRef = this.dialog.open(
          ActionEditDialog,
          {width: '800px', data: {uuid: this.getUUIDFromNode(currentNode)}});
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          if (data.deleted) {
            this.jsTree.jstree('delete_node', currentNode);
          } else if (data.name !== currentNode.text) {
            currentNode.original.text = data.name;
            this.jsTree.jstree('rename_node', currentNode, data.name);
          }
        }
      });
    });
  }

  newFolderAction(nodeRef: unknown) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (!currentNode.original.isFolder) {
      this.snackBar.open(
          'New Folder operation can only be performed on a folder!', 'OK',
          {duration: SNACKBAR_DURATION_MS});
      return;
    }
    this.createFolder(currentNode.id, 'New Folder');
  }

  createFolder(parentId: string, name: string) {
    const newNode = new JsTreeNode(name, uuid() as string);
    this.jsTree.jstree('create_node', parentId, newNode);
  }

  playAll(nodeRef: unknown) {
  }

  deleteAction(nodeRef: unknown) {
    if (confirm('Are you sure you wish to delete this?')) {
      this.jsTree.jstree('delete_node', this.getCurrentNode(nodeRef));
    }
  }

  importAction(nodeRef: unknown) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (!currentNode.original.isFolder) {
      this.snackBar.open(
          'New Folder operation can only be performed on a folder!', 'OK',
          {duration: SNACKBAR_DURATION_MS});
      return;
    }

    this.ngZone.run(() => {
      const dialogRef = this.dialog.open(
          ImportDialog,
          {width: POPUP_DIALOG_DEFAULT_DIMENSION.width, data: {}});
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          for (const node of data) {
            this.jsTree.jstree('create_node', currentNode.id, node);
          }
        }
      });
    });
  }

  renameAction(nodeRef: unknown) {
    const currentNode = this.getCurrentNode(nodeRef);
    const uuid = this.getUUIDFromNode(currentNode);
    this.jsTree.jstree(
        'edit', currentNode, null,
        (node: JsTreeInternalNode, status: boolean) => {
          if (status && node) {
            if (!node.original.isFolder) {
              this.backendManagerService.getActionDetails(uuid)
                  .pipe(take(1), takeUntil(this.destroyed))
                  .subscribe(data => {
                    data.name = node.text;
                    this.backendManagerService.updateActionMetadata(data)
                        .pipe(take(1), takeUntil(this.destroyed))
                        .subscribe();
                  });
            }
            node.original.text = node.text;
            this.saveTreeToBackend();
          }
        });
  }

  copyAction(nodeRef: unknown) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (currentNode.original.isFolder) {
      this.snackBar.open(
          'CopyTo operation cannot be performed on a folder!', 'OK',
          {duration: SNACKBAR_DURATION_MS});
      return;
    }
    const uuid = this.getUUIDFromNode(currentNode);
    this.backendManagerService.copyAction(uuid)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          this.ngZone.run(() => {
            const dialogRef = this.dialog.open(ActionEditDialog, {
              width: POPUP_DIALOG_DEFAULT_DIMENSION.width,
              data: {
                uuid: data.actionId,
                isCopyAction: true,
                isSaveWorkflow: true,
              },
            });
            dialogRef.afterClosed().subscribe(dialogData => {
              if (dialogData && !dialogData.hasOwnProperty('deleted')) {
                let newName = dialogData.name;
                if (dialogData.name === currentNode.text) {
                  newName = currentNode.text + ' (Copy)';
                  dialogData.metadata.name = newName;
                  this.backendManagerService
                      .updateActionMetadata(dialogData.metadata)
                      .pipe(take(1), takeUntil(this.destroyed))
                      .subscribe();
                }
                const newNode =
                    new JsTreeNode(newName, dialogData.actionId, false);
                newNode.additionalData = [dialogData.actionId];
                this.jsTree.jstree('create_node', dialogData.parentId, newNode);
              }
            });
          });
        });
  }

  moveAction(nodeRef: unknown) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (currentNode.original.isFolder) {
      this.snackBar.open(
          'CopyTo operation cannot be performed on a folder!', 'OK',
          {duration: SNACKBAR_DURATION_MS});
      return;
    }
    const uuid = this.getUUIDFromNode(currentNode);

    this.ngZone.run(() => {
      const dialogRef = this.dialog.open(ActionEditDialog, {
        width: '800px',
        data: {
          uuid,
          isSaveWorkflow: true,
          isMoveAction: true,
        },
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (!data) {
          return;
        }
        this.jsTree.jstree(
            'move_node', currentNode, data.parentId, 'last',
            (node: JsTreeInternalNode, parentNode: JsTreeInternalNode,
             position: unknown) => {
              if (node.text === data.name) {
                return;
              }
              this.backendManagerService.updateActionMetadata(data.metadata)
                  .pipe(take(1), takeUntil(this.destroyed))
                  .subscribe();
              node.original.text = data.name;
              this.jsTree.jstree('rename_node', node, data.name);
            });
      });
    });
  }

  downloadTest(uuid: string, filename: string) {
    this.backendManagerService.exportTestCase(uuid).subscribe(data => {
      const formatted = JSON.stringify(data, null, 2);
      const exportData =
          new Blob([formatted + '\n'], {type: 'application/octet-stream'});
      saveAs(exportData, filename);
    });
  }

  downloadRefImgs(uuidStr: string) {
    this.backendManagerService.exportRefImagesForWorkflow(uuidStr)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          const uuidStrToBase64: UuidToBase64ImgResponse = data.uuidTobase64Img;
          this.exportRefImgs(uuidStrToBase64);
        });
  }

  exportRefImgs(uuidStrToBase64: UuidToBase64ImgResponse) {
    for (const uuid of Object.keys(uuidStrToBase64)) {
      const imgBase64Str = uuidStrToBase64[uuid];
      const blobData = this.convertBase64ToBlobData(imgBase64Str);
      const blob = new Blob(blobData, {type: 'image/png'});
      saveAs(blob, uuid);
    }
  }

  convertBase64ToBlobData(imgBase64Str: string) {
    const sliceSize = 512;
    const byteCharacters = atob(imgBase64Str);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const byteCharactersSlice =
          byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbersSlice = new Array(byteCharactersSlice.length);
      for (let i = 0; i < byteCharactersSlice.length; i++) {
        byteNumbersSlice[i] = byteCharactersSlice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbersSlice);
      byteArrays.push(byteArray);
    }
    return byteArrays;
  }

  exportAction(nodeRef: unknown) {
    const currentNode = this.getCurrentNode(nodeRef);
    if (currentNode.original.isFolder) {
      this.snackBar.open(
          'Export operation cannot be performed on a folder!', 'OK',
          {duration: SNACKBAR_DURATION_MS});
      return;
    }

    const uuid = this.getUUIDFromNode(currentNode);
    this.downloadTest(uuid, currentNode.text);
    this.downloadRefImgs(uuid);
  }

  exportCurrentProject() {
    const exportProjectReq: ExportImportProjectRequest = {
      projectId: this.selectedProject.projectId,
      projectName: this.selectedProject.projectName,
      zipFileName: '',
    };
    this.backendManagerService.exportCurrentProject(exportProjectReq);
  }

  getAllActionId(node: JsTreeNode, actionIdList: string[]) {
    if (node.additionalData && node.additionalData.length > 0) {
      const uuid = node.additionalData[0];
      actionIdList.push(uuid);
    }
    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        this.getAllActionId(node.children[i], actionIdList);
      }
    }
  }

  openNewProjectDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = POPUP_DIALOG_DEFAULT_DIMENSION.width;
    const dialogRef = this.dialog.open(NewProjectDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.selectedProject = data;
        this.controlMessageService.sendRefreshTestCaseTreeMsg();
      }
    });
  }

  openImportProjectDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = POPUP_DIALOG_DEFAULT_DIMENSION.width;
    this.dialog.open(ImportProjectDialog, dialogConfig);
  }

  getProjectList() {
    this.backendManagerService.getProjectList()
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe((data: ProjectListResponse) => {
          this.projectList = data.projectList;
        });
  }

  selectProject(project: ProjectRecord) {
    this.backendManagerService.setCurrentProject(project.projectId)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe((data: ProjectListResponse) => {
          if (data.success) {
            this.selectedProject = data.projectList[0];
            this.refreshTree(true);
          }
        });
  }

  deleteProject(project: ProjectRecord, event: MouseEvent) {
    event.stopPropagation();
    if (this.selectedProject.projectId === project.projectId) {
      alert('You cannot delete the current project');
      return;
    }
    if (confirm(
            'Are you sure you want to delete project ' + project.projectName +
            '?')) {
      this.backendManagerService.deleteProject(project.projectId)
          .pipe(take(1), takeUntil(this.destroyed))
          .subscribe((data: ProjectListResponse) => {
            if (data.success) {
              this.getProjectList();
            }
          });
      this.testCaseManagerService.deleteTestCaseTree(project.projectId)
          .pipe(take(1), takeUntil(this.destroyed))
          .subscribe();
    }
  }

  /**
   * Initialize project. Set to the default one with name {@code
   * this.defaultProjectName}. If the default one doesn't exist, it will be
   * created with projectId is a UUID.
   */
  initiateProject() {
    console.log('init project');
    this.backendManagerService.getProjectList()
        .pipe(
            switchMap((data: ProjectListResponse) => {
              let defaultProjectId = this.defaultProjectId;
              if (data.success && data.projectList.length > 0) {
                defaultProjectId = data.projectList[0].projectId;
              }
              return this.backendManagerService.setCurrentProject(
                  defaultProjectId);
            }),
            take(1),
            takeUntil(this.destroyed),
            )
        .subscribe((data: ProjectListResponse) => {
          this.projectList = data.projectList;
          this.selectedProject.projectId = data.projectList[0].projectId;
          this.setupDataTree();
        });
  }

  ngOnDestroy() {
    // Unsubscribe all pending subscriptions.
    this.destroyed.next();
    if (this.jsTree) {
      this.jsTree.off();
    }
  }
}

interface CheckMore {
  dnd?: boolean;
  ref?: {original?: {isFolder?: boolean}};
}
