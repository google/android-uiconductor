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

import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import * as lodash from 'lodash';
import {Observable} from 'rxjs/Observable';
import {forkJoin} from 'rxjs/observable/forkJoin';

import {BackendManagerService} from './_services/backend-manager/backend-manager.service';
import {MessageService} from './_services/message.service';
import {ChooseDeviceDialogComponent} from './choose-device-dialog/choose-device-dialog.component';
import {DEVICE_STATUS} from './constants/device';
import {MESSAGE_TYPES} from './constants/messageTypes';
import {SlotDataSource} from './device-manager/device-manager.component';
import {Device} from './device-manager/device-manager.component';
import {DeviceService} from './device.service';

// Split config
interface IConfig {
  columns: Array<{
    visible: boolean,
    size: number,  // Percentage of column height
    rows: Array<
        {visible: boolean, size: number, type: string, isScrollable: string}>
  }>;
  disabled: boolean;
}

const defaultConfig: IConfig = {
  columns: [
    {
      visible: true,
      size: 23,
      rows: [
        {visible: true, size: 80, type: 'recorder', isScrollable: 'auto'},
        {visible: true, size: 20, type: 'device_manager', isScrollable: 'auto'},
      ],
    },
    {
      visible: true,
      size: 57,
      rows: [
        {visible: true, size: 65, type: 'workflow', isScrollable: 'auto'},
        {visible: true, size: 35, type: 'log_area', isScrollable: 'hidden'},
      ],
    },
    {
      visible: true,
      size: 20,
      rows: [
        {visible: true, size: 100, type: 'action_list', isScrollable: 'auto'},
      ],
    }
  ],
  disabled: false
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // disable the animation on the tab
  @HostBinding('@.disabled') title = 'Uicd';
  UI_VIEWER_TAB_ID = 1;
  results: string[];
  selectedDevice: string[];
  initedDevices = [];
  devicePrepareLoading = false;
  playingLogs = [];
  slotsInfo = [];
  localStorageName = 'angular-split-ws';
  config: IConfig = null;
  currentBindDevice: Device;
  inUiViewer = false;
  splitAreaHeight: number;
  treeTopBarState: boolean;
  hideTopBar: boolean;

  constructor(
      public dialog: MatDialog, private deviceService: DeviceService,
      private backendManagerService: BackendManagerService,
      private messageService: MessageService) {}

  @ViewChild('deviceManager') deviceManager: ElementRef;
  @ViewChild('uiViewer') uiViewer: ElementRef;

  ngOnInit() {
    // Init layout settings
    this.resetConfig();

    // observe bind device
    this.deviceService.currentDeviceInfo.subscribe(
        device => this.currentBindDevice = device);

    this.initedDevices = [];
    // if have inited devices, don't show dialog
    this.backendManagerService.hasInitializedDevices().subscribe(data => {
      if (!data['hasInitedDevices']) {
        // open device picker dialog
        this.openDevicePickerDialog();
      } else {
        this.initedDevices = [];
        this.backendManagerService.getInitializedDevices().subscribe(info => {
          const deviceInfo = info['devices'].split(',');
          for (let i = 0; i < deviceInfo.length; i++) {
            if (deviceInfo[i]) {
              this.initedDevices.push({'serial': deviceInfo[i], 'index': i});
            }
          }
          // Init devices (start execution server and minicap server)
          this.initDevices();
        });
      }
    });
  }

  softRestart() {
    this.backendManagerService.softRestart()
        .catch((err: Response) => {
          this.devicePrepareLoading = true;
          return err.statusText;
        })
        .finally(() => {
          // Wait for spring ready
          this.backendManagerService.validateUicdBackendConnection()
              .retryWhen(xmlHttpRequest => {
                return xmlHttpRequest
                    .flatMap((xmlHttpRequest: any) => {
                      if (xmlHttpRequest.status === 0) {
                        // unreachable
                        return Observable.of(xmlHttpRequest.status).delay(2000);
                      }
                      return Observable.throw({xmlHttpRequest: 'No retry'});
                    })
                    .take(10)
                    .concat(Observable.throw({
                      xmlHttpRequest:
                          'Sorry, there was an error (after 10 retries)'
                    }));
              })
              .subscribe(() => {
                // Reload page
                window.location.reload();
                this.devicePrepareLoading = false;
              });
        })
        .subscribe(() => {});
  }

  openDevicePickerDialog() {
    const dialog = this.dialog.open(ChooseDeviceDialogComponent, {
      height: '600px',
      width: '800px',
    });

    dialog.afterClosed().subscribe(selection => {
      if (selection) {
        this.devicePrepareLoading = true;
        this.initedDevices = [];
        this.selectedDevice = selection;
        console.log(this.selectedDevice);
        for (let i = 0; i < selection.length; i++) {
          const deviceId = selection[i];
          this.initedDevices.push({'serial': deviceId, 'index': i});
        }

        this.backendManagerService.initDevices(selection.join())
            .subscribe(data => {
              console.log('backend initDevicesList done');

              // Init devices (start execution server and minicap server)
              this.initDevices();
            });
      } else {
        // User clicked 'Cancel' or clicked outside the dialog
      }
    });
  }

  initDevices() {
    let observables = [];
    for (let i = 0; i < this.initedDevices.length; i++) {
      const deviceId = this.initedDevices[i]['serial'];
      observables.push(
          this.backendManagerService.getPorts(deviceId)
              .concatMap(data => {
                this.initedDevices[i]['port'] = data['server_port'].toString();
                return this.backendManagerService.initMinicap(deviceId);
              })
              .concatMap(data => {
                this.initedDevices[i]['canvasWidth'] = data['width'];
                this.initedDevices[i]['canvasHeight'] = data['height'];
                return this.backendManagerService.initDevice(deviceId);
              })
              .map(data => {
                this.initedDevices[i]['status'] =
                    DEVICE_STATUS.READY_TO_CONNECT;
                console.log('Done for ' + deviceId);
                console.log(this.initedDevices[i]);
              }));
    }

    forkJoin(observables).subscribe(() => {
      this.initDeviceSlotTable();
      this.devicePrepareLoading = false;

      // set default bind device
      if (this.initedDevices.length > 0) {
        // set bind device based on device id
        this.currentBindDevice = this.initedDevices[0];
        this.deviceService.updateDevice(this.currentBindDevice);
      } else {
        console.log('device not available.');
        return;
      }
    });
  }

  initDeviceSlotTable() {
    // Init device table slot
    this.slotsInfo = [];
    for (let i = 0; i < this.initedDevices.length; i++) {
      this.slotsInfo.push({
        position: i + 1,
        device_serial: this.initedDevices[i]['serial'],
        status: DEVICE_STATUS.READY_TO_CONNECT,
      });
    }
    console.log(this.initedDevices);
    this.deviceManager['dataSource'] = new SlotDataSource(this.slotsInfo);
  }

  resetConfig() {
    this.config = lodash.cloneDeep(defaultConfig);
    localStorage.removeItem(this.localStorageName);
  }

  onDragEnd(columnIndex: number, e: {gutterNum: number, sizes: Array<number>}) {
    console.log('columnindex', columnIndex);
    console.log('sizesArray', e.sizes);
    // Column dragged
    if (columnIndex === -1) {
      // Set size for all visible columns
      this.config.columns.filter(c => c.visible === true)
          .forEach((column, index) => column.size = e.sizes[index]);
      const WIDTH_THRESHOLD = 35;            // in %
      const middleColumnWidth = e.sizes[1];  // in%
      this.treeTopBarState = !(middleColumnWidth <= WIDTH_THRESHOLD);
    } else {  // Row dragged
      if (columnIndex === 1) {
        // make split area in Ui Viewer relative to this split
        this.splitAreaHeight = e.sizes[1] - (e.sizes[1] / 3);  // in %
        const HEIGHT_THRESHOLD = 30;                           // in %
        const bottomRowHeight = e.sizes[1];                    // in %
        this.hideTopBar = bottomRowHeight <= HEIGHT_THRESHOLD;
      }
      // Set size for all visible rows from specified column
      this.config.columns[columnIndex]
          .rows.filter(r => r.visible === true)
          .forEach((row, index) => row.size = e.sizes[index]);
    }

    this.saveLocalStorage();
  }

  toggleDisabled() {
    this.config.disabled = !this.config.disabled;

    this.saveLocalStorage();
  }

  refreshColumnVisibility() {
    // Refresh columns visibility based on inside rows visibilities (If no row >
    // hide column)
    this.config.columns.forEach((column, index) => {
      column.visible = column.rows.some(row => row.visible === true);
    });

    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem(this.localStorageName, JSON.stringify(this.config));
  }

  tabChanged(event) {
    // the mat-tab component assigns an index on the tabs in the order
    // they are displayed with the initial one starting at 0
    if (event.index === this.UI_VIEWER_TAB_ID) {
      this.inUiViewer = true;
      // only hide the scroll bar in the log area when in the ui viewer
      this.config.columns[1].rows[1].isScrollable = 'hidden';
      // Default height for area in Ui Viewer
      if (!this.splitAreaHeight) {
        const BOTTOM_ROW_START_HEIGHT = 35;  // in %
        const ADJUSTING_RATIO = 1.7;
        this.splitAreaHeight = BOTTOM_ROW_START_HEIGHT / ADJUSTING_RATIO;
      }
      // Give it a default state if no split has been dragged
      if (!this.treeTopBarState) {
        this.treeTopBarState = true;
      }
      if (!this.hideTopBar) {
        this.hideTopBar = false;
      }
    } else {
      this.inUiViewer = false;
      this.config.columns[1].rows[1].isScrollable = 'auto';
      // When in Log, disable inspect mode and clear highlighted items
      this.messageService.sendMessage(MESSAGE_TYPES.clearCanvas, 'both');
      if (this.uiViewer['inInspect']) {
        this.messageService.sendMessage(MESSAGE_TYPES.setInspectMode, false);
        this.uiViewer['inInspect'] = false;
        this.uiViewer['toggleInspectColor'] = this.uiViewer['deactivatedColor'];
      }
    }
  }
}
