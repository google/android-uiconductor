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

import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatSnackBar} from '@angular/material/snack-bar';
// to backend.
import {v4 as uuid} from 'uuid';
import {ReplaySubject} from 'rxjs';
import {filter, take, takeUntil} from 'rxjs/operators';

import {MessageTypes, POPUP_DIALOG_DEFAULT_DIMENSION, SNACKBAR_DURATION_MS} from '../constants/constants';
import {JsTreeAction, JsTreeInternalNode, JsTreeNode, NodeAttribute} from '../constants/jstree';
import {Rect} from '../constants/rect';
import {BackendManagerService} from '../services/backend_manager_service';
import {ControlMessage, ControlMessageService} from '../services/control_message_service';

import {CopyXmlDialog} from './copy_xml_dialog';

const ICON_CLASSES: {[key: string]: string} = {
  'hierarchy': 'fa fa-sitemap',
  'FrameLayout': 'fa fa-object-group',
  'ViewGroup': 'fa fa-users',
  'TextView': 'fa fa-file-text',
  'LinearLayout': 'fa fa-bars',
  'RelativeLayout': 'fa fa-object-ungroup',
  'GridLayout': 'fa fa-th',
  'View': 'fa fa-window-maximize',
  'ImageView': 'fa fa-picture-o',
  'default': 'fa fa-folder'
};

interface BoundElement {
  id: string;
  bound: Rect;
}

declare var $: any;
/**
 * Component responsible for drawing and interacting with UI tree XML of device
 * screen.
 */
@Component({
  selector: 'ui-tree-viewer',
  templateUrl: './ui_tree_viewer.ng.html',
  styleUrls: ['./ui_tree_viewer.css']
})
export class UiTreeViewer implements OnInit, OnDestroy {
  @ViewChild('jsTree', {static: true}) jsTreeEl!: ElementRef;
  readonly destroyed = new ReplaySubject<void>(1);
  readonly domParser = new DOMParser();
  jsTree!: any;
  searchStr = '';
  rawXML = '';
  searchType = 'ALL';
  searchTypes = ['ALL'];
  searchSuccess = false;
  showAttributes = true;
  highlightMode = false;
  attributes: NodeAttribute[] = [];
  nodeBounds: BoundElement[] = [];
  constructor(
      private readonly dialog: MatDialog,
      private readonly snackBar: MatSnackBar,
      private readonly backendManagerService: BackendManagerService,
      private readonly controlMessageService: ControlMessageService,
  ) {}

  ngOnInit() {
    this.setupDataTree();

    this.controlMessageService.getControlMessageSubject()
        .pipe(
            takeUntil(this.destroyed),
            filter(
                (msg: ControlMessage) =>
                    msg.messageType === MessageTypes.INSPECT_CLICKED_NODE))
        .subscribe((msg: ControlMessage) => {
          const coor: Rect = JSON.parse(msg.extra);
          const smallestContainingNode =
              this.nodeBounds.filter(el => el.bound.contains(coor))
                  .reduce((prev, curr) => {
                    if (prev.bound.area() > curr.bound.area()) {
                      return curr;
                    }
                    return prev;
                  });
          if (smallestContainingNode) {
            this.jsTree.jstree('deselect_all');
            this.focusNode(smallestContainingNode.id);
          }
        });

    this.fetchXML();
  }

  setupDataTree() {
    const jsTreeObj: any = $(this.jsTreeEl.nativeElement);
    this.jsTree = jsTreeObj.jstree({
      'core': {
        'themes': {
          'dots': false,
        },
        'data': {},
      },
      'search': {
        'case_insensitive': true,
        'search_callback': this.jsTreeSearchCB.bind(this),
      },
      'plugins': ['search', 'wholerow'],
    });

    this.buildSelectEvent();
    this.buildSearchCompleteEvent();
    this.buildHoverEvent();
    this.buildDehoverEvent();
  }

  buildHoverEvent() {
    this.jsTree.on('hover_node.jstree', (e: unknown, action: JsTreeAction) => {
      if (this.highlightMode) {
        this.sendDrawMessage(
            MessageTypes.NODE_HOVERED, action.node.original.attributes);
      }
    });
  }

  sendDrawMessage(messageType: MessageTypes, attributes?: NodeAttribute[]) {
    if (attributes) {
      const coordinates = attributes.find(el => el.name === 'bounds');
      if (coordinates && coordinates.value) {
        this.controlMessageService.sendMessage(
            {messageType, extra: coordinates.value});
      }
    }
  }

  buildDehoverEvent() {
    this.jsTree.on(
        'dehover_node.jstree', (e: unknown, action: JsTreeAction) => {
          if (this.highlightMode) {
            this.controlMessageService.sendMessage(
                {messageType: MessageTypes.CLEAR_CANVAS, extra: ''});
          }
        });
  }

  buildSelectEvent() {
    this.jsTree.on('select_node.jstree', (e: unknown, action: JsTreeAction) => {
      const attr = action.node.original.attributes;
      if (attr != null) {
        this.attributes = attr;
        if (this.highlightMode) {
          this.sendDrawMessage(
              MessageTypes.NODE_SELECTED, action.node.original.attributes);
        }
      }
    });
  }

  buildSearchCompleteEvent() {
    this.jsTree.on('search.jstree', () => {
      if (!this.searchSuccess) {
        this.snackBar.open(
            'No matches found', 'OK', {duration: SNACKBAR_DURATION_MS});
      }
      this.searchSuccess = false;
    });
  }

  getJsTreeInstance(): any {
    // jstree(true) returns an existing instance instead of creating a new
    // instance.
    return this.jsTree.jstree(true);
  }

  updateDataTree(jsTreeNode: JsTreeNode[]) {
    // 'settings' is an internal field that contains some desired jstree
    // properties.
    this.getJsTreeInstance()['settings'].core.data = jsTreeNode;
    this.getJsTreeInstance().refresh(
        /* skip_loading */ false, /* forget_state */ true);
  }

  fetchXML() {
    this.controlMessageService.sendMessage(
        {messageType: MessageTypes.CLEAR_CANVAS, extra: 'all'});
    this.nodeBounds = [];
    this.searchTypes = ['ALL'];
    this.backendManagerService.fetchXML()
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          const treeData: JsTreeNode[] = [];
          this.rawXML = data.join();
          for (const line of data) {
            const domObj = this.domParser.parseFromString(line, 'text/xml');
            const obj = domObj.getElementsByTagName('hierarchy');
            treeData.push(this.convertXMLToJSTreeNode(obj[0]));
          }
          this.updateDataTree(treeData);
        });
  }

  /*
   * Example XML(for reference):
   * <hierarchy>
   * <node index="0" text="" class="android.widget.FrameLayout"
   * package="com.android.systemui" content-desc="" checkable="false"
   * checked="false" clickable="false" enabled="true" focusable="false"
   * focused="false" scrollable="false" long-clickable="false" password="false"
   * selected="false" bounds="[0,0][1080,2028]" resource-id="">
   *   <node index="0" text="" class="android.view.View"
   *   package="com.android.systemui" content-desc="" checkable="false"
   *   checked="false" clickable="false" enabled="true" focusable="false"
   *   focused="false" scrollable="false" long-clickable="false"
   *   password="false" selected="false" bounds="[0,0][1080,2028]"
   *   resource-id="com.android.systemui:id/scrim_behind"/>
   * </node>
   * </hierarchy>
   */
  convertXMLToJSTreeNode(xmlNode: Element): JsTreeNode {
    let text = xmlNode.className;
    if (text === '') {
      text = xmlNode.tagName;
    }
    text = text.replace(/.+\..+\./, '');
    const id = uuid();
    const node = new JsTreeNode(text, id);
    if (ICON_CLASSES.hasOwnProperty(text)) {
      node.icon = ICON_CLASSES[text];
    }

    node.attributes = [];
    for (const attr in xmlNode.attributes) {
      if (!isNaN(Number(attr))) {
        const name = xmlNode.attributes[attr]['name'];
        const value = xmlNode.attributes[attr]['value'];
        node.attributes.push({name, value});
        if (this.searchTypes.indexOf(name) < 0) {
          this.searchTypes.push(name);
        }

        if (name === 'bounds') {
          this.nodeBounds.push(
              {id, bound: Rect.createFromCoordinatesStr(value)});
        }
      }
    }

    xmlNode.childNodes.forEach(child => {
      node.children.push(this.convertXMLToJSTreeNode(child as Element));
    });
    return node;
  }

  focusNode(nodeId: string) {
    this.jsTree.jstree('select_node', nodeId);
    this.getJsTreeInstance()
        .get_node(nodeId, true)
        .children('jstree-anchor')
        .focus();
  }

  jsTreeSearchCB(text: string, node: JsTreeInternalNode) {
    const lowerCaseText = text.toLowerCase();
    if (node.original.attributes) {
      for (const attr of node.original.attributes) {
        if (this.searchType !== 'ALL' && this.searchType !== attr.name) {
          continue;
        }

        if (!attr.value || !attr.value.toLowerCase().includes(lowerCaseText)) {
          continue;
        }

        this.searchSuccess = true;
        this.focusNode(node.id);
      }
    }
  }

  toggleHighlight(e: MatSlideToggleChange) {
    this.highlightMode = e.checked;
    if (!this.highlightMode) {
      this.controlMessageService.sendMessage(
          {messageType: MessageTypes.CLEAR_CANVAS, extra: 'all'});
    }
  }

  toggleInspectDevice(e: MatSlideToggleChange) {
    this.controlMessageService.sendMessage({
      messageType: MessageTypes.SET_INSPECT_MODE,
      extra: e.checked.toString()
    });
  }

  toggleAttributes(e: MatSlideToggleChange) {
    this.showAttributes = e.checked;
  }

  expandAll() {
    this.jsTree.jstree('open_all');
  }

  closeAll() {
    this.jsTree.jstree('close_all');
  }

  showXML() {
    this.dialog.open(CopyXmlDialog, {
      width: POPUP_DIALOG_DEFAULT_DIMENSION.width,
      height: POPUP_DIALOG_DEFAULT_DIMENSION.height,
      data: this.rawXML
    });
  }

  searchTree() {
    this.jsTree.jstree('deselect_all');
    this.jsTree.jstree('search', this.searchStr);
  }

  ngOnDestroy() {
    this.controlMessageService.sendMessage(
        {messageType: MessageTypes.CLEAR_CANVAS, extra: 'all'});
    this.controlMessageService.sendMessage({
      messageType: MessageTypes.SET_INSPECT_MODE,
      extra: 'false',
    });

    this.destroyed.next();
  }
}
