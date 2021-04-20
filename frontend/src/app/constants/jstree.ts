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

/** Data format for jstree events(action parameter) */
export interface JsTreeAction {
  node: JsTreeInternalNode;
  event?: {type?: string};
}

/** Single node data coming from jstree._model.data */
export interface JsTreeInternalNode {
  text: string;
  id: string;
  children: string[];
  original: JsTreeNode;
}
/** Tree data coming from jstree._model.data */
export interface JsTreeInternal {
  [index: string]: JsTreeInternalNode;
}

/** JSON data coming from backend. */
export declare interface TreeNode {
  value: string;
  id: string;
  emitLoadNextLevel: boolean;
  additionalData?: string[];
  children?: TreeNode[];
}

/** Declared state of a jstree node. */
export interface JsTreeState {
  opened?: boolean;
  disabled?: boolean;
  selected?: boolean;
}

/** Key value interface for extracting xml node information */
export interface NodeAttribute {
  name: string;
  value?: string;
}

/** Interface used to pass new node data to test_explorer */
export interface NodeParentPair {
  parentId: string;
  node: JsTreeNode;
}

/** Object expected by jstree library. */
export class JsTreeNode {
  icon: string = 'fa fa-folder';
  state: JsTreeState = {'opened': true};
  children: JsTreeNode[] = [];
  additionalData?: string[];
  attributes?: NodeAttribute[];

  constructor(
      public text: string, readonly id: string, public isFolder = true) {
    if (!isFolder) {
      this.icon = 'fa fa-file-code-o';
    }
  }
}
