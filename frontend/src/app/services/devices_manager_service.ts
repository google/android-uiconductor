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

import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {Rect} from '../constants/rect';
import {BackendManagerService} from './backend_manager_service';



/** Maintains the connected device details information */
export class DeviceInfo {
  serial: string;
  deviceId: string;
  product: string;
  model: string;
  device: string;
  minicapPort: number;
  slot: number;
  physicalWidth: number;
  physicalHeight: number;
  constructor(jsonData: string) {
    // tslint:disable:no-any no-unnecessary-type-assertion
    const obj = JSON.parse(jsonData) as any;
    // tslint:enable:no-any no-unnecessary-type-assertion
    this.serial = obj['serial'];
    /**
     * backend are returning two different names, can not change backend before
     * the frontend full merged. keep this two for now.
     */
    this.deviceId = obj['deviceId'];
    this.product = obj['product'];
    this.model = obj['model'];
    this.device = obj['device'];
    this.minicapPort = obj['minicapPort'];
    this.physicalWidth = obj['physicalWidth'];
    this.physicalHeight = obj['physicalHeight'];
    this.slot = -1;
  }
}

/** Manages the connected devices */
@Injectable()
export class DevicesManagerService {
  private initedDevices: DeviceInfo[] = [];
  private currentDevice: DeviceInfo|undefined;
  private readonly currentDeviceSubject = new ReplaySubject<DeviceInfo>(1);
  private readonly initedDevicesSubject = new ReplaySubject<DeviceInfo[]>(1);

  constructor(private readonly backendManagerService: BackendManagerService) {}

  /** Gets adb connected devices from backend */
  getDevicesList() {
    return this.backendManagerService.getDevicesList();
  }

  /**
   * Gets subject of current device, when current device changed, we need update
   * the screen streaming component etc.
   */
  getCurrentDeviceSubject() {
    return this.currentDeviceSubject;
  }

  /** Gets subject of currently initalized devices */
  getInitedDevicesSubject() {
    return this.initedDevicesSubject;
  }

  /** Gets devices list that already connected to uicd */
  getInitedDevices(): DeviceInfo[] {
    return this.initedDevices;
  }

  /** Gets current selected device */
  getCurrentDevice(): DeviceInfo|undefined {
    return this.currentDevice;
  }

  /** Gets current selected device physical screen size in the rect format */
  getDevicePhysicalScreenSize(): Rect {
    if (this.currentDevice === undefined) {
      return new Rect(0, 0, 0, 0);
    }
    return new Rect(
        0, 0, this.currentDevice.physicalWidth,
        this.currentDevice.physicalHeight);
  }

  /**
   * Sets devices list that already connected to uicd
   * @param DeviceInfo[]
   */
  setInitedDevices(devicesInfo: DeviceInfo[]) {
    this.initedDevices = devicesInfo;
    this.initedDevicesSubject.next(devicesInfo);
  }

  updateCurrentDevice(deviceId: string) {
    if (this.initedDevices.length <= 0) {
      return;
    }
    this.currentDevice =
        this.initedDevices.find((d: DeviceInfo) => d.deviceId === deviceId);
    if (this.currentDevice === undefined) {
      this.currentDevice = this.initedDevices[0];
    }
    this.emitUpdateCurrentDeviceEvent();
  }

  emitUpdateCurrentDeviceEvent() {
    this.currentDeviceSubject.next(this.currentDevice);
  }
}
