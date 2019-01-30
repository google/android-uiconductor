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

import {LEFT_ARROW} from '@angular/cdk/keycodes';
import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {AdbService} from '../adb.service';

@Component({
  selector: 'app-choose-device-dialog',
  templateUrl: './choose-device-dialog.component.html',
  styleUrls: ['./choose-device-dialog.component.css']
})
export class ChooseDeviceDialogComponent implements OnInit {
  devices = [];
  slotOptions = [];

  constructor(
      public dialogRef: MatDialogRef<ChooseDeviceDialogComponent>,
      private adbService: AdbService) {}

  ngOnInit() {
    // get device list
    this.adbService.getDevicesList().subscribe(data => {
      const deviceInfos = Object.keys(data).map(i => data[i]);
      for (let i = 0; i < deviceInfos.length; i++) {
        const deviceInfo = JSON.parse(deviceInfos[i]);
        this.devices.push({
          'serial': deviceInfo['serial'],
          'product': deviceInfo['product'],
          'model': deviceInfo['model'],
          'device': deviceInfo['device'],
          'slot': -1,
        });

        this.slotOptions.push({'id': i + 1, 'disabled': false});
      }

      if (deviceInfos.length === 1) {
        this.devices[0]['slot'] = 1;
      }
    });
  }

  confirmSelection() {
    let selectedDevices = new Array(this.devices.length);

    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i]['slot'] !== -1) {
        selectedDevices[this.devices[i]['slot'] - 1] =
            this.devices[i]['serial'];
      }
    }

    selectedDevices = selectedDevices.filter((n) => n !== undefined);
    this.dialogRef.close(selectedDevices);
  }

  updateAvailableSlot(event) {
    for (let i = 0; i < this.slotOptions.length; i++) {
      this.slotOptions[i]['disabled'] = false;
    }

    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i]['slot'] !== -1) {
        this.slotOptions[this.devices[i]['slot'] - 1]['disabled'] = true;
      }
    }
  }
}
