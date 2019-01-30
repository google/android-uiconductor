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

import {DataSource} from '@angular/cdk/collections';
import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BackendManagerService} from '../_services/backend-manager/backend-manager.service';
import {MessageService} from '../_services/index';
import {DEVICE_STATUS} from '../constants/device';
import {MESSAGE_TYPES} from '../constants/messageTypes';
import {DeviceService} from '../device.service';

@Component({
  selector: 'app-device-manager',
  templateUrl: './device-manager.component.html',
  styleUrls: ['./device-manager.component.css']
})
export class DeviceManagerComponent implements OnInit, OnChanges {
  @Input() initedDevices: any[];

  displayedColumns = ['position', 'device_serial', 'status', 'selected'];
  dataSource: SlotDataSource;
  slotsInfo = [];
  playModes = [
    {name: 'SINGLE', display: 'Single'},
    {name: 'MULTIDEVICE', display: 'Multi Device'},
    {name: 'PLAYALL', display: 'Play All'},
  ];
  selectedPlayMode = 'SINGLE';
  bindDevice: Device;

  constructor(
      private backendManagerService: BackendManagerService,
      private messageService: MessageService,
      private deviceService: DeviceService) {}

  ngOnInit() {
    this.deviceService.currentDeviceInfo.subscribe(
        device => this.bindDevice = device);
  }

  ngOnChanges() {
    console.log('Device slot updated.');
    console.log(this.initedDevices);
    this.slotsInfo = [];
    for (let i = 0; i < this.initedDevices.length; i++) {
      this.slotsInfo.push({
        position: i + 1,
        device_serial: this.initedDevices[i]['serial'],
        status: DEVICE_STATUS.NO_DEVICE,
      });
    }
    this.dataSource = new SlotDataSource(this.slotsInfo);
  }

  savePlayMode(event) {
    console.log(event.value);
    this.backendManagerService.setPlayMode(event.value)
        .subscribe(data => console.log(data));
  }

  initDevice(deviceIndex) {
    this.deviceService.updateDevice(this.initedDevices[deviceIndex]);
    this.backendManagerService
        .selectedDeviceChanged(this.initedDevices[deviceIndex]['serial'])
        .subscribe(retData => console.log(retData));
    this.sendMessage();
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    // workflow component listens for messages to know when to
    // refresh the workflow
    this.messageService.sendMessage(
        MESSAGE_TYPES.refreshWorkflow, 'Device Changed');
  }
}

export interface Slot {
  position: number;
  device_serial: string;
  status: number;
}

export class SlotDataSource extends DataSource<any> {
  constructor(private data: Slot[]) {
    super();
  }

  connect(): Observable<Slot[]> {
    return Observable.of(this.data);
  }

  disconnect() {}
}

export class Device {
  deviceId: string;
  port: string;
  canvasWidth: number;
  canvasHeight: number;
  status: number;
}
