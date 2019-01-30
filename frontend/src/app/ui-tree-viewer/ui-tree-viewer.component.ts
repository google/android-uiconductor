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

import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {UUID} from 'angular2-uuid';

import {BackendManagerService} from '../_services/backend-manager/backend-manager.service';
import {MessageService} from '../_services/message.service';
import {MESSAGE_TYPES} from '../constants/messageTypes';
import {Device} from '../device-manager/device-manager.component';
import {DeviceService} from '../device.service';

import {CopyXmlDialog} from './copy-xml-dialog.component';

@Component({
  selector: 'ui-tree-viewer',
  templateUrl: './ui-tree-viewer.component.html',
  styleUrls: ['./ui-tree-viewer.component.css']
})
export class UiTreeViewerComponent implements OnInit {
  @ViewChild('dataTree') dataTree: ElementRef;
  @Input() inUiViewerTab: boolean;
  @Input() splitAreaHeight: number;   // in vh units
  @Input() treeTopBarState: boolean;  // True: show top bar, false hide it
  @Input() hideTopBar: boolean;
  DISPLAY_ON = 'block';
  DISPLAY_OFF = 'none';
  showAttributes = this.DISPLAY_ON;
  treeAreaWidth = 100;
  deviceRatios: any;
  deviceXml: any;
  attributeList: Array<{}>;
  xmlDataTree: any;
  boundsArray = [];
  searchAttributes = ['All'];
  iconClasses = {};
  searchText = '';
  canHighlight = true;
  inInspect = false;
  searchNodeFound = false;
  selectedSearchAttr = 'All';
  activatedColor = 'deepskyblue';
  deactivatedColor = 'lightgrey';
  toggleStateColor = this.activatedColor;
  toggleInspectColor = this.deactivatedColor;
  toggleAttributeColor = this.activatedColor;
  SNACKBAR_DURATION_MS = 2000;

  constructor(
      public dialog: MatDialog, private snackBar: MatSnackBar,
      private deviceService: DeviceService,
      private backendManagerService: BackendManagerService,
      private messageService: MessageService) {}

  ngOnInit() {}

  getDeviceRatios() {
    this.backendManagerService.getDeviceRatios().subscribe(
        (ratios) => {
          this.deviceRatios = ratios;
        },
        error => {
          console.log('Error, could not connect to device:', error);
        });
  }

  ngAfterContentInit() {
    // icon classes from font awesome
    this.iconClasses = {
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
    this.setupDataTree();
    // fetch xml whenever a device is connected
    this.deviceService.currentDeviceInfo.subscribe(device => {
      if (device['deviceId']) {
        this.fetchXML();
      }
    });
    this.messageService.getMessage(MESSAGE_TYPES.inspectClickedNode)
        .subscribe((coordinates) => {
          if (coordinates) {
            // find best node at that position
            const possibleNodes = this.findAllNodesContainsPoint(coordinates);
            const xmlNode = this.getSmallestBoundArea(possibleNodes);
            if (xmlNode != null) {
              this.xmlDataTree.jstree('deselect_all');
              this.focusNode(xmlNode['id']);
            }
          }
        });
    // Refresh xml tree when a new action enters workflow and ui viewer tab is
    // selected
    this.messageService.getMessage(MESSAGE_TYPES.refreshXml)
        .subscribe(() => {
          if (this.inUiViewerTab) {
            // need to give the screen time to load,
            // otherwise it will just grab the same xml
            setTimeout(function() {
              this.fetchXML();
            }.bind(this), 1000);
          }
        });
  }

  getSmallestBoundArea(possibleNodes) {
    if (possibleNodes.length > 0) {
      let smallestNode = possibleNodes[0];
      for (let index = 1; index < possibleNodes.length; index++) {
        smallestNode = this.getSmallerArea(smallestNode, possibleNodes[index]);
      }
      return smallestNode;
    }
    return null;
  }

  getSmallerArea(firstNode, secondNode) {
    // endX - startX = width, endY - startY = height, width * height
    const firstNodeArea =
        (firstNode['bounds']['endX'] - firstNode['bounds']['startX']) *
        (firstNode['bounds']['endY'] - firstNode['bounds']['startY']);
    const secondNodeArea =
        (secondNode['bounds']['endX'] - secondNode['bounds']['startX']) *
        (secondNode['bounds']['endY'] - secondNode['bounds']['startY']);
    if (secondNodeArea < firstNodeArea) {
      return secondNode;
    }
    return firstNode;
  }

  findAllNodesContainsPoint(currentPosition) {
    let possibleNodes = [];
    for (let bound of this.boundsArray) {
      const withinBounds =
          this.isWithinBounds(currentPosition, bound['bounds']);
      if (withinBounds) {
        possibleNodes.push(bound);
      }
    }
    return possibleNodes;
  }

  isWithinBounds(currentPosition, deviceBounds) {
    // if x,y are between the bounds
    // i.e -> startX < offsetX < endX & startY < offSetY < endY
    if (currentPosition != undefined && deviceBounds != undefined) {
      if ((deviceBounds.startX < currentPosition.offsetX &&
           currentPosition.offsetX < deviceBounds.endX) &&
          (deviceBounds.startY < currentPosition.offsetY &&
           currentPosition.offsetY < deviceBounds.endY)) {
        return true;
      }
    }
    return false;
  }

  getIconName(name: string): string {
    if (name in this.iconClasses) {
      return this.iconClasses[name];
    }
    return this.iconClasses['default'];
  }

  /*
  XMLTreeObject = {
    'text': class name, --if it doesn't have class name, use tagName, text that
  will be displayed in tree
    'identifier': used to find and highlight this node during Inspect mode,
    'icon': class of icon as string or '/filepath' of
  image, 'attributes': list of attributes like bounds, checkable, etc,
    'children': childNodes
  }
  */
  createXMLTreeObject(xmlElement) {
    let treeAttributes = [];
    for (let attr in xmlElement.attributes) {
      if (!isNaN(parseInt(attr))) {
        let attrName = xmlElement.attributes[attr]['name'];
        // Capitalize first letter of attribute
        attrName = attrName.charAt(0).toUpperCase() + attrName.slice(1);
        const attrValue = xmlElement.attributes[attr]['value'];
        const treeAttr = {'title': attrName, 'value': attrValue};
        treeAttributes.push(treeAttr);
        // Add to list of possible search values if it has not been added yet
        if (this.searchAttributes.indexOf(attrName) < 0) {
          this.searchAttributes.push(attrName);
        }
      }
    }
    // get relevant data from element and it's children
    let objName = xmlElement.className;
    const identifier = UUID.UUID();
    // add elements to boundsArray
    const bounds = this.convertBounds(xmlElement.getAttribute('bounds'));
    this.boundsArray.push({'id': identifier, 'bounds': bounds});
    if (objName == '') {
      objName = xmlElement.tagName;
    }
    objName = objName.replace(/.+\..+\./, '');
    const iconName = this.getIconName(objName);
    const nodeObj =
        this.createNodeObj(objName, identifier, iconName, treeAttributes);
    for (const childNode of xmlElement.childNodes) {
      const childNodeObj = this.createXMLTreeObject(childNode);
      nodeObj.children.push(childNodeObj);
    }
    return nodeObj;
  }

  createNodeObj(
      objName: string, identifier: string, iconName: string,
      treeAttributes: Array<{}>) {
    return {
      'text': objName,
      'id': identifier,
      'icon': iconName,
      'attributes': treeAttributes,
      'children': []
    };
  }

  fetchXML() {
    // Must get device ratios before fetching everytime
    // because there are situations where the fetchXML function is called
    // before the ratios can be gathered
    this.getDeviceRatios();
    this.messageService.sendMessage(MESSAGE_TYPES.clearCanvas, 'both');
    // clear bounds array
    this.boundsArray = [];
    this.searchAttributes = ['All'];
    this.backendManagerService.fetchXML().subscribe(
        (deviceXmlList) => {
          const XMLTreeObj = [];
          this.deviceXml = deviceXmlList;
          for (const xmlData of <Array<string>>deviceXmlList) {
            const domObj =
                (new DOMParser()).parseFromString(xmlData, 'text/xml');
            // this will contain all the xml for the device in a typscript
            // object format
            const hierarchyNodeObj = domObj.getElementsByTagName('hierarchy');
            // need to turn the node object into JSON in order to use in js tree
            if (hierarchyNodeObj.length > 0) {
              const treeObj = this.createXMLTreeObject(hierarchyNodeObj[0]);
              XMLTreeObj.push(treeObj);
            }
          }
          this.updateDataTree(XMLTreeObj);
        },
        error => {
          console.log('Error, could not connect to device:', error);
        });
  }

  setupDataTree() {
    const jsTreeObj: any = $(this.dataTree.nativeElement);
    this.xmlDataTree = jsTreeObj.jstree({
      'core': {'data': {}},
      'search': {
        'case_insensitive': true,
        'search_callback': this.searchXmlTree.bind(this)
      },
      plugins: ['search', 'wholerow']
    });
    this.buildSelectEvent();
    this.buildHoverEvent();
    this.buildDehoverEvent();
    this.buildSearchCompleteEvent();
  }

  updateDataTree(treeData) {
    this.xmlDataTree.jstree(true).settings.core.data = treeData;
    this.xmlDataTree.jstree(true).refresh();
  }

  buildSelectEvent() {
    this.xmlDataTree.on('select_node.jstree', function(e, data) {
      const attributes = data.node.original.attributes;
      if (attributes != null) {
        this.attributeList = attributes;
      }
      // alert canvas to draw rectangle around element selected
      if (this.messageService !== undefined && this.canHighlight &&
          attributes) {
        const coordinates = this.getBoundsAttribute(attributes);
        if (coordinates != '') {
          const message = {
            'coordinates': coordinates,
            'deviceRatios': this.deviceRatios
          };
          this.messageService.sendMessage(MESSAGE_TYPES.nodeSelected, message);
        }
      }
      // make tree area smaller to adjust for displaying attributes
      if (this.showAttributes == this.DISPLAY_ON) {
        this.treeAreaWidth = 60;
      }
    }.bind(this));
  }

  buildHoverEvent() {
    this.xmlDataTree.on('hover_node.jstree', function(e, data) {
      // alert canvas to draw rectangle around element selected
      if (this.messageService != undefined && this.canHighlight &&
          data.node.original.attributes) {
        const coordinates =
            this.getBoundsAttribute(data.node.original.attributes);
        if (coordinates != '') {
          const message = {
            'coordinates': coordinates,
            'deviceRatios': this.deviceRatios
          };
          this.messageService.sendMessage(MESSAGE_TYPES.nodeHovered, message);
        }
      }
    }.bind(this));
  }

  buildDehoverEvent() {
    this.xmlDataTree.on('dehover_node.jstree', function(e, data) {
      // clear canvas
      if (this.messageService != undefined && this.canHighlight) {
        this.messageService.sendMessage(MESSAGE_TYPES.clearCanvas, '');
      }
    }.bind(this));
  }

  buildSearchCompleteEvent() {
    this.xmlDataTree.on('search.jstree', function() {
      if (!this.searchNodeFound) {
        this.snackBar.open(
            'No matches found.', 'OK', {duration: this.SNACKBAR_DURATION_MS});
      } else {
        this.searchNodeFound = false;
      }
    }.bind(this));
  }

  getBoundsAttribute(attributes) {
    for (let attr of attributes) {
      if (attr['title'] === 'Bounds') {
        return attr['value'];
      }
    }
    return '';
  }

  focusNode(nodeID) {
    this.xmlDataTree.jstree('select_node', nodeID);
    // bring node into focus
    if (this.xmlDataTree.jstree(true).get_node(nodeID, true)) {
      this.xmlDataTree.jstree(true)
          .get_node(nodeID, true)
          .children('.jstree-anchor')
          .focus();
    }
  }

  searchXmlTree(text, node) {
    const attributes = node.original.attributes;
    const lowerCaseText = text.toLowerCase();
    let indices = [];
    if (this.selectedSearchAttr === 'All') {
      const allOffset = 1;
      indices =
          Array.from(Array(this.searchAttributes.length - allOffset).keys());
    } else {
      const classNameIndex =
          this.getAttrIndex(attributes, this.selectedSearchAttr);
      if (classNameIndex !== -1) {
        indices.push(classNameIndex);
      }
    }
    for (let index of indices) {
      if (attributes[index] &&
          attributes[index]['value'].toLowerCase().includes(lowerCaseText)) {
        this.focusNode(node['id']);
        this.searchNodeFound = true;
      }
    }
  }

  getAttrIndex(attributes, attrName) {
    for (let index = 0; index < attributes.length; index++) {
      if (attributes[index]['title'] === attrName) {
        return index;
      }
    }
    return -1;
  }

  convertBounds(coordinates: string) {
    // comes in as [startX,startY][endX,endY] in a string
    // get actual values and convert them using the ratio
    if (coordinates != null) {
      // returns array in form of:
      //["", "startX", "startY", "", "endX", "endY", "" ]
      const coordinatesArray = coordinates.split(/[\[\],]/);
      // convert the string values to numbers
      let startX = parseFloat(coordinatesArray[1]);
      let startY = parseFloat(coordinatesArray[2]);
      let endX = parseFloat(coordinatesArray[4]);
      let endY = parseFloat(coordinatesArray[5]);
      // adjust to screen size, Might be getting the ratio incorrectly at the
      // backend
      if (this.deviceRatios) {
        startX = startX / this.deviceRatios.width;
        startY = startY / this.deviceRatios.height;
        endX = endX / this.deviceRatios.width;
        endY = endY / this.deviceRatios.height;
      }
      const actualCoordinates =
          {'startX': startX, 'startY': startY, 'endX': endX, 'endY': endY};
      return actualCoordinates;
    }
    return coordinates;
  }

  toggleHighlight() {
    this.canHighlight = !(this.canHighlight);
    if (!this.canHighlight) {
      // clear both canvas
      this.messageService.sendMessage(MESSAGE_TYPES.clearCanvas, 'both');
      this.toggleStateColor = this.deactivatedColor;
    } else {
      this.toggleStateColor = this.activatedColor;
    }
  }

  toggleInspectMode() {
    this.inInspect = !(this.inInspect);
    this.messageService.sendMessage(
        MESSAGE_TYPES.setInspectMode, this.inInspect);
    if (this.inInspect) {
      this.toggleInspectColor = this.activatedColor;
    } else {
      this.messageService.sendMessage(MESSAGE_TYPES.clearCanvas, 'both');
      this.xmlDataTree.jstree('deselect_all');
      this.toggleInspectColor = this.deactivatedColor;
    }
  }

  expandAll() {
    this.xmlDataTree.jstree('open_all');
  }

  closeAll() {
    this.xmlDataTree.jstree('close_all');
  }

  showAll() {
    this.xmlDataTree.jstree('show_all');
  }

  hideAll() {
    this.xmlDataTree.jstree('hide_all');
  }

  searchTree() {
    this.xmlDataTree.jstree('deselect_all');
    this.xmlDataTree.jstree('search', this.searchText);
  }

  showXml() {
    if (!this.deviceXml) {
      this.snackBar.open(
          'No XML Available', 'OK', {duration: this.SNACKBAR_DURATION_MS});
      return;
    }
    let xmlString = '';
    for (let xml of this.deviceXml) {
      xmlString += xml;
    }
    const data = {'xml': xmlString};
    this.dialog.open(
        CopyXmlDialog, {width: '800px', height: '800px', data: data});
  }

  showAttr() {
    if (this.showAttributes == this.DISPLAY_OFF) {
      this.showAttributes = 'block';
      this.treeAreaWidth = 60;
      this.toggleAttributeColor = this.activatedColor;
    } else {
      this.showAttributes = 'none';
      this.treeAreaWidth = 100;
      this.toggleAttributeColor = this.deactivatedColor;
    }
  }
}
