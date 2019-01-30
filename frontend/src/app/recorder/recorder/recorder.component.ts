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

import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import {Subscription} from 'rxjs/Subscription';

import {BackendManagerService} from '../../_services/backend-manager/backend-manager.service';
import {MessageService} from '../../_services/index';
import {AdbService} from '../../adb.service';
import {KEY_CODES} from '../../constants/keycodes';
import {MESSAGE_TYPES} from '../../constants/messageTypes';
import {Device} from '../../device-manager/device-manager.component';
import {DeviceService} from '../../device.service';
import {MinicapService} from '../../minicap.service';
import {TvRemoteDialogComponent} from '../../tv-remote-dialog/tv-remote-dialog.component';
import {ValidationFlowComponent} from '../../validation-flow/validation-flow.component';

const KEYBOARD_CONSTANTS = {
  SHIFT_KEY: 16,
  CTRL_KEY: 17,
};

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit {
  @ViewChild('phone') phone: ElementRef;
  @ViewChild('overlayHovered') overlayHovered: ElementRef;
  @ViewChild('overlaySelected') overlaySelected: ElementRef;


  @Input() initedDevices: any[];

  displayedColumns = ['position', 'device_serial', 'status'];
  slotsInfo = [];

  private socketSubscription: Subscription;

  loading = false;
  conntected = true;
  selectedPlayMode = 'SINGLE';
  canvasWidth = 360;
  canvasHeight = 640;
  startHolding = false;
  dragCoordinatesX = [];
  dragCoordinatesY = [];
  timeOfLastPan = 0;
  PAN_THRESHOLD = 500;
  currentBindDevice: Device;
  deviceBounds: Observable<any>;
  inInspectMode = false;


  constructor(
      private adbservice: AdbService, public dialog: MatDialog,
      private messageService: MessageService,
      private minicapService: MinicapService,
      private deviceService: DeviceService,
      private backendManagerService: BackendManagerService) {}

  playModes = [
    {name: 'SINGLE', display: 'Single'},
    {name: 'MULTIDEVICE', display: 'Multi Device'},
    {name: 'PLAYALL', display: 'Play All'},
  ];

  ngOnInit() {
    // Observe bind device
    this.deviceService.currentDeviceInfo.subscribe(device => {
      this.currentBindDevice = device;
      // disconnect old minicap
      this.minicapService.disconnect();
      if (this.socketSubscription) {
        this.socketSubscription.unsubscribe();
      }

      if (this.currentBindDevice['port'] != null &&
          this.currentBindDevice['canvasWidth'] !== 0 &&
          this.currentBindDevice['canvasHeight'] !== 0) {
        this.canvasWidth = this.currentBindDevice['canvasWidth'];
        this.canvasHeight = this.currentBindDevice['canvasHeight'];
        this.initFEMiniCap(this.currentBindDevice['port']);
      } else {
        console.log('missing config to init FE minicap.');
      }
    });
  }

  ngAfterContentInit() {
    // listen for message from tree viewer component in order
    // to draw on the screen
    this.messageService.getMessage(MESSAGE_TYPES.nodeSelected)
        .subscribe((message) => {
          if (message['coordinates']) {
            const coordinates = message['coordinates'];
            //#00008055: navy with 55% transparency
            // must be written in hex in order to pass transparency
            this.highlightScreenElement(
                <string>coordinates, '#00008055', this.overlaySelected,
                message['deviceRatios']);
          }
        });
    this.messageService.getMessage(MESSAGE_TYPES.nodeHovered)
        .subscribe((message) => {
          if (message['coordinates']) {
            const coordinates = message['coordinates'];
            //#68b4e855: light blue with 55% transparency
            // must be written in hex in order to pass transparency
            this.highlightScreenElement(
                <string>coordinates, '#68b4e855', this.overlayHovered,
                message['deviceRatios']);
          }
        });
    this.messageService.getMessage(MESSAGE_TYPES.setInspectMode)
        .subscribe((state) => {
          // gets called at the beginning for some reason,
          // which gives it the default value no message
          if (state !== 'No message') {
            this.inInspectMode = <boolean>state;
          }
        });
    this.messageService.getMessage(MESSAGE_TYPES.clearCanvas)
        .subscribe((message) => {
          if (message != null) {
            this.clearOverlayCanvas(this.overlayHovered);
            if (message === 'both') {
              this.clearOverlayCanvas(this.overlaySelected);
            }
          }
        });
  }

  highlightScreenElement(
      coordinates: string, color: string, overlay, deviceRatios) {
    let deviceCoordinates = this.convertCoordinates(coordinates, deviceRatios);
    // draw on screen
    this.clearOverlayCanvas(overlay);
    const ctx = overlay.nativeElement.getContext('2d');
    ctx.rect(
        deviceCoordinates.startX, deviceCoordinates.startY,
        deviceCoordinates.endX - deviceCoordinates.startX,
        deviceCoordinates.endY - deviceCoordinates.startY);
    ctx.fillStyle = color;
    ctx.fill();
  }

  convertCoordinates(coordinates: string, deviceRatios) {
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
      if (deviceRatios) {
        startX = startX / deviceRatios.width;
        startY = startY / deviceRatios.height;
        endX = endX / deviceRatios.width;
        endY = endY / deviceRatios.height;
      }
      return {'startX': startX, 'startY': startY, 'endX': endX, 'endY': endY};
    }
  }

  sendRefreshWorkflowMessage(): void {
    // send message to subscribers via observable subject
    // workflow component listens for messages to know when to
    // refresh the workflow
    this.messageService.sendMessage(
        MESSAGE_TYPES.refreshWorkflow, 'from recorder');
  }

  sendRefreshXmlMessage() {
    this.messageService.sendMessage(MESSAGE_TYPES.refreshXml, 'from recorder');
  }

  tap(event) {
    if (this.initedDevices.length == 0) {
      return;
    }
    if (this.inInspectMode) {
      // send message to tree component and select that component
      const coordinates = {
        'offsetX': event.srcEvent.offsetX,
        'offsetY': event.srcEvent.offsetY
      };
      this.messageService.sendMessage(
          MESSAGE_TYPES.inspectClickedNode, coordinates);
    } else {
      if (event.srcEvent.ctrlKey) {
        console.log('tap control on');
        return;
      }
      this.backendManagerService
          .tap(event.srcEvent.offsetX, event.srcEvent.offsetY)
          .subscribe(() => {
            this.sendRefreshWorkflowMessage();
            this.sendRefreshXmlMessage();
          });
    }
  }

  isControlPressed(event) {
    if (this.inInspectMode || this.initedDevices.length == 0) {
      return;
    }
    if (window.navigator.userAgent.indexOf('Mac') !== -1) {
      if (event.srcEvent.metaKey) {
        return true;
      }
    } else if (event.srcEvent.ctrlKey) {
      return true;
    }
  }

  press(event) {
    if (this.inInspectMode || this.initedDevices.length == 0) {
      return;
    }
    console.log(
        'start press at (' + event.srcEvent.offsetX + ',' +
        event.srcEvent.offsetY + ')');
    if (!this.isControlPressed(event)) {
      this.startHolding = true;
      this.timeOfLastPan = new Date().getTime();
      this.dragCoordinatesX.push(event.srcEvent.offsetX);
      this.dragCoordinatesY.push(event.srcEvent.offsetY);
      this.backendManagerService
          .dragStart(event.srcEvent.offsetX, event.srcEvent.offsetY)
          .subscribe(() => {
            this.sendRefreshWorkflowMessage();
            this.sendRefreshXmlMessage();
          });
    }
  }

  pan(event) {
    if (this.inInspectMode || this.initedDevices.length == 0) {
      return;
    }
    if (this.isControlPressed(event)) {
      this.clearOverlayCanvas(this.overlayHovered);
      const ctx = this.overlayHovered.nativeElement.getContext('2d');
      const startX = event.srcEvent.offsetX - event.deltaX;
      const startY = event.srcEvent.offsetY - event.deltaY;
      ctx.rect(startX, startY, event.deltaX, event.deltaY);
      ctx.strokeStyle = 'red';
      ctx.stroke();
    } else {
      if (!this.startHolding) {
        return;
      }

      // handle drag, add new drag point if held in same position for longer
      // than threshold
      const timeNow = new Date().getTime();
      if (timeNow - this.timeOfLastPan > this.PAN_THRESHOLD) {
        console.log(
            'Adding new drag point: (' + event.srcEvent.offsetX + ',' +
            event.srcEvent.offsetY + ')');
        this.dragCoordinatesX.push(event.srcEvent.offsetX);
        this.dragCoordinatesY.push(event.srcEvent.offsetY);
      }

      // draw lines for all drag points so far
      this.clearOverlayCanvas(this.overlayHovered);
      const ctx = this.overlayHovered.nativeElement.getContext('2d');
      ctx.strokeStyle = 'red';
      ctx.moveTo(this.dragCoordinatesX[0], this.dragCoordinatesY[0]);
      for (let i = 1; i < this.dragCoordinatesX.length; i++) {
        ctx.lineTo(this.dragCoordinatesX[i], this.dragCoordinatesY[i]);
      }
      ctx.lineTo(event.srcEvent.offsetX, event.srcEvent.offsetY);
      ctx.stroke();

      this.timeOfLastPan = timeNow;
      this.backendManagerService
          .dragMove(event.srcEvent.offsetX, event.srcEvent.offsetY)
          .subscribe(() => {
            this.sendRefreshWorkflowMessage();
            this.sendRefreshXmlMessage();
          });
    }
  }

  panend(event) {
    if (this.inInspectMode || this.initedDevices.length == 0) {
      return;
    }
    const options = {
      startX: event.srcEvent.offsetX - event.deltaX,
      startY: event.srcEvent.offsetY - event.deltaY,
      endX: event.srcEvent.offsetX,
      endY: event.srcEvent.offsetY,
    };

    console.log(
        'end pan from (' + options.startX + ', ' + options.startY + ') to (' +
        options.endX + ', ' + options.endY + ')');
    if (this.isControlPressed(event)) {
      this.clearOverlayCanvas(this.overlayHovered);
      const data = {};
      const canvas = (<HTMLCanvasElement>document.getElementById('canvas'));
      const imageData = this.screenshotToBase64(canvas, options);
      const dialogRef = this.dialog.open(
          ValidationFlowComponent,
          {data: {options: options, imageData: imageData}, width: '1000px'});
      dialogRef.afterClosed().subscribe(result => {
        // have to clear the canvas again here somehow.
        this.clearOverlayCanvas(this.overlayHovered);
        this.sendRefreshWorkflowMessage();
        this.sendRefreshXmlMessage();
      });
      return;
    } else {
      if (this.startHolding) {
        this.startHolding = false;
        this.backendManagerService
            .dragStop(event.srcEvent.offsetX, event.srcEvent.offsetY)
            .subscribe(() => {
              this.sendRefreshWorkflowMessage();
              this.sendRefreshXmlMessage();
            });
      }
      this.clearOverlayCanvas(this.overlayHovered);
      if (this.dragCoordinatesX.length <= 1) {
        if (options.startX === options.endX &&
            options.startY === options.endY) {
          console.log('Interpreted as long click');
          this.backendManagerService.longClick(options.endX, options.endY, 2000)
              .subscribe(() => {
                this.sendRefreshWorkflowMessage();
                this.sendRefreshXmlMessage();
              });
        } else {
          console.log('Interpreted as swipe');
          this.backendManagerService
              .swipe(options.startX, options.startY, options.endX, options.endY)
              .subscribe(() => {
                this.sendRefreshWorkflowMessage();
                this.sendRefreshXmlMessage();
              });
        }
      } else {
        console.log('Interpreted as end of drag');
        this.dragCoordinatesX.push(event.srcEvent.offsetX);
        this.dragCoordinatesY.push(event.srcEvent.offsetY);
        this.backendManagerService
            .addDragAction(this.dragCoordinatesX, this.dragCoordinatesY)
            .subscribe(() => {
              this.sendRefreshWorkflowMessage();
              this.sendRefreshXmlMessage();
            });
      }
      this.dragCoordinatesX = [];
      this.dragCoordinatesY = [];
    }
  }

  screenshotToBase64(canvas, options) {
    const canvasTmp = <HTMLCanvasElement>document.createElement('CANVAS');
    const ctxTmp = canvasTmp.getContext('2d');
    const width = options.endX - options.startX;
    const height = options.endY - options.startY;
    canvasTmp.width = width;
    canvasTmp.height = height;
    ctxTmp.drawImage(
        canvas, options.startX, options.startY, width, height, 0, 0, width,
        height);
    const imageData = canvasTmp.toDataURL();
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(canvasTmp);
    body.removeChild(canvasTmp);
    return imageData;
  }

  clearOverlayCanvas(overlay) {
    const ctx = overlay.nativeElement.getContext('2d');
    ctx.canvas.width = this.canvasWidth;
    ctx.canvas.height = this.canvasHeight;
  }

  onKey(event) {
    if (this.inInspectMode || this.initedDevices.length === 0) {
      return;
    }
    console.log(event);
    let code = event.keyCode;

    // ignore control
    if (code === KEYBOARD_CONSTANTS.CTRL_KEY && event.type === 'keyup') {
      this.clearOverlayCanvas(this.overlayHovered);
      return;
    }
    // ignore shift
    if (code === KEYBOARD_CONSTANTS.SHIFT_KEY) {
      return;
    }
    if (event.shiftKey) {
      code += 1000;
    }
    this.backendManagerService.pressKey(code).subscribe(() => {
      this.sendRefreshWorkflowMessage();
      this.sendRefreshXmlMessage();
    });
  }

  quickSwipe(dir) {
    if (this.inInspectMode || this.initedDevices.length === 0) {
      return;
    }
    this.backendManagerService.quickSwipe(dir).subscribe(() => {
      this.sendRefreshWorkflowMessage();
      this.sendRefreshXmlMessage();
    });
  }

  rotateScreen(dir) {
    if (this.inInspectMode || this.initedDevices.length === 0) {
      return;
    }
    this.loading = true;
    this.backendManagerService.rotateScreen(dir).subscribe(returnInfo => {
      console.log(returnInfo);
      this.loading = false;
      this.sendRefreshWorkflowMessage();
      this.sendRefreshXmlMessage();
    });
  }

  initFEMiniCap(port) {
    const BLANK_IMG =
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

    const canvas = (<HTMLCanvasElement>document.getElementById('canvas'));
    const g = canvas.getContext('2d');
    this.minicapService.connect(port);

    window['tmimg'] = new Image();
    this.socketSubscription =
        this.minicapService.outputStream.subscribe((output: any) => {
          let blob = new Blob([output], {type: 'image/jpeg'});
          const URL = window.URL;
          let img = new Image();
          // let img =  window['tmimg'];
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            // update overlay canvases
            this.canvasWidth = img.width;
            this.canvasHeight = img.height;
            g.drawImage(img, 0, 0);
            // need revokeObjectURL, otherwise will be memory leak.
            URL.revokeObjectURL(u);
            img.onload = null;
            img.src = BLANK_IMG;
            img = null;
            u = null;
            blob = null;
          };
          let u = URL.createObjectURL(blob);
          img.src = u;
        });
  }

  tvRemoteDialogButtonClick() {
    if (this.inInspectMode || this.initedDevices.length === 0) {
      return;
    }
    this.dialog.open(TvRemoteDialogComponent, {width: '450px'});
  }

  volumeDown() {
    if (this.inInspectMode || this.initedDevices.length === 0) {
      return;
    }
    this.backendManagerService.pressKey(KEY_CODES.KEYCODE_VOLUME_DOWN)
        .subscribe(() => this.sendRefreshWorkflowMessage());
  }

  volumeUp() {
    if (this.inInspectMode || this.initedDevices.length === 0) {
      return;
    }
    this.backendManagerService.pressKey(KEY_CODES.KEYCODE_VOLUME_UP)
        .subscribe(() => this.sendRefreshWorkflowMessage());
  }

  power() {
    if (this.inInspectMode || this.initedDevices.length === 0) {
      return;
    }
    this.backendManagerService.pressKey(KEY_CODES.KEYCODE_POWER)
        .subscribe(() => {
          this.sendRefreshWorkflowMessage();
          this.sendRefreshXmlMessage();
        });
  }

  home() {
    if (this.inInspectMode || this.initedDevices.length === 0) {
      return;
    }
    this.backendManagerService.pressKey(KEY_CODES.KEYCODE_HOME)
        .subscribe(() => this.sendRefreshWorkflowMessage());
  }

  back() {
    if (this.inInspectMode || this.initedDevices.length === 0) {
      return;
    }
    this.backendManagerService.pressKey(KEY_CODES.KEYCODE_BACK)
        .subscribe(() => this.sendRefreshWorkflowMessage());
  }

  overview() {
    if (this.inInspectMode || this.initedDevices.length === 0) {
      return;
    }
    this.backendManagerService.pressKey(KEY_CODES.KEYCODE_OVERVIEW)
        .subscribe(() => this.sendRefreshWorkflowMessage());
  }
}