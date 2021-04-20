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
import {MatDialogRef} from '@angular/material/dialog';
import {ReplaySubject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {DeviceInfo, DevicesManagerService} from '../services/devices_manager_service';

/**
 * Devices slot status, use this interface to make sure one device can be only
 * in one slot.
 */
export interface SlotStatus {
  index: number;
  disabled: boolean;
}

/**
 * The init Dialog for user to select devices.
 */
@Component({
  selector: 'app-choose-device-dialog',
  templateUrl: './choose_device_dialog.ng.html',
  styleUrls: ['./choose_device_dialog.css'],
})
export class ChooseDeviceDialogComponent implements OnInit, OnDestroy {
  devices: DeviceInfo[] = [];
  slotOptions: SlotStatus[] = [];

  /** Handle on-destroy Subject, used to unsubscribe. */
  private readonly destroyed = new ReplaySubject<void>(1);

  constructor(
      private readonly dialogRef:
          MatDialogRef<ChooseDeviceDialogComponent, string[]>,
      private readonly devicesManagerService: DevicesManagerService) {}

  ngOnInit() {
    // get device list
    this.devicesManagerService.getDevicesList()
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(data => {
          if (data instanceof Array) {
            this.devices = data.map((item, index) => {
              this.slotOptions.push({index: index + 1, disabled: false});
              return new DeviceInfo(item);
            });
            if (this.devices.length === 1) {
              this.devices[0].slot = 1;
            }
          } else {
            console.error('Should get a return array from backend.');
          }
        });
  }

  confirmSelection() {
    this.dialogRef.close(this.devices.filter(d => d.slot !== -1)
                             .sort((a, b) => a.slot - b.slot)
                             .map(d => d.serial));
  }

  updateAvailableSlot(event: Event) {
    for (let i = 0; i < this.slotOptions.length; i++) {
      this.slotOptions[i].disabled = false;
    }

    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].slot !== -1) {
        this.slotOptions[this.devices[i].slot - 1].disabled = true;
      }
    }
  }

  ngOnDestroy() {
    // Unsubscribes all pending subscriptions.
    this.destroyed.next();
  }
}
