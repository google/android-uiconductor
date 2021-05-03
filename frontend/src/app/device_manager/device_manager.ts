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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {Observable, ReplaySubject} from 'rxjs';
import {map, take, takeUntil} from 'rxjs/operators';
import {DeviceStatus} from '../constants/constants';
import {BackendManagerService} from '../services/backend_manager_service';
import {DeviceInfo, DevicesManagerService} from '../services/devices_manager_service';

/**
 * DeviceManager component displays options for execution modes(single, multi
 * device or mirroring) and which devices to use and tv controller component.
 */
@Component({
  selector: 'app-device-manager',
  templateUrl: './device_manager.ng.html',
  styleUrls: ['./device_manager.css']
})
export class DeviceManager implements OnInit, OnDestroy {
  readonly playModes: PlayMode[] = [
    {name: 'SINGLE', display: 'Single'},
    {name: 'MULTIDEVICE', display: 'Multi Device'},
    {name: 'PLAYALL', display: 'Play All'},
  ];

  private readonly destroyed = new ReplaySubject<void>(1);
  readonly currentDevice: Observable<DeviceInfo>;
  readonly dataSource: Observable<DeviceRow[]>;
  readonly displayedColumns =
      ['position', 'device_serial', 'status', 'selected'];

  selectedPlayMode: string = 'SINGLE';

  constructor(
      private readonly backendManagerService: BackendManagerService,
      private readonly devicesManagerService: DevicesManagerService) {
    this.currentDevice =
        this.devicesManagerService.getCurrentDeviceSubject().asObservable();
    this.dataSource =
        this.devicesManagerService.getInitedDevicesSubject()
            .asObservable()
            .pipe(
                map(initedDevices => initedDevices.map(
                        (device, index) => new DeviceRow(device, index + 1))));
  }

  ngOnInit() {}

  changePlayMode(event: MatSelectChange) {
    this.backendManagerService.setPlayMode(event.value)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe();
  }

  initDevice(deviceId: string) {
    this.backendManagerService.selectedDeviceChanged(deviceId)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe();
    this.devicesManagerService.updateCurrentDevice(deviceId);
  }

  ngOnDestroy() {
    // Unsubscribe all pending subscriptions.
    this.destroyed.next();
  }
}

/**
 * PlayMode interface is used for displaying execution options in the device
 * manager template.
 */
export interface PlayMode {
  name: string;
  display: string;
}

/**
 * DeviceRow interface is used to construct mat-table source in template.
 */
export class DeviceRow {
  deviceSerial: string;
  status: number = DeviceStatus.READY_TO_CONNECT;

  constructor(device: DeviceInfo, public position: number) {
    this.deviceSerial = device.deviceId;
  }
}
