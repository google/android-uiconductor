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

import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {EMPTY, ReplaySubject} from 'rxjs';
import {catchError, delay, filter, retryWhen, switchMap, take, takeUntil, tap} from 'rxjs/operators';

import {BottomMenuTabs, MessageTypes, POPUP_DIALOG_DEFAULT_DIMENSION} from './constants/constants';
import {InitDevicesResponse} from './constants/interfaces';
import {ChooseDeviceDialogComponent} from './popup_dialogs/choose_device_dialog';
import {BackendManagerService} from './services/backend_manager_service';
import {ControlMessage, ControlMessageService} from './services/control_message_service';
import {DeviceInfo, DevicesManagerService} from './services/devices_manager_service';
import {LogService} from './services/log_service';

/**
 * AppComponent from frontend
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.ng.html',
  styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  devicePrepareLoading = false;
  showUiTree = false;

  constructor(
      private readonly dialog: MatDialog,
      private readonly logService: LogService,
      private readonly backendManagerService: BackendManagerService,
      private readonly controlMessageService: ControlMessageService,
      private readonly devicesManagerService: DevicesManagerService) {}

  readonly title = 'frontend';
  direction = 'horizontal';

  /** Handle on-destroy Subject, used to unsubscribe. */
  private readonly destroyed = new ReplaySubject<void>(1);

  ngOnInit() {
    // if have inited devices, don't show dialog
    this.backendManagerService.getInitedDevices()
        .pipe(
            take(1),
            takeUntil(this.destroyed),
            )
        .subscribe(data => {
          if (data.deviceStatusList.length === 0) {
            // open device picker dialog
            this.openDevicePickerDialog();
          } else {
            this.initDeviceManagerService(data);
          }
        });

    this.controlMessageService.getControlMessageSubject()
        .pipe(
            takeUntil(this.destroyed),
            filter(
                (msg: ControlMessage) =>
                    msg.messageType === MessageTypes.REFRESH_OVERLAY),
            )
        .subscribe((msg: ControlMessage) => {
          if (msg.extra.toLowerCase() === 'hide') {
            this.devicePrepareLoading = false;
          } else {
            this.devicePrepareLoading = true;
          }
        });
  }

  initDeviceManagerService(data: InitDevicesResponse) {
    if (!data.deviceStatusList) {
      return;
    }
    this.devicesManagerService.setInitedDevices(data.deviceStatusList.map(
        item => new DeviceInfo(JSON.stringify(item))));
    this.devicesManagerService.updateCurrentDevice(
        this.devicesManagerService.getInitedDevices()[0].deviceId);
  }

  openDevicePickerDialog() {
    const dialog = this.dialog.open(ChooseDeviceDialogComponent, {
      height: POPUP_DIALOG_DEFAULT_DIMENSION.height,
      width: POPUP_DIALOG_DEFAULT_DIMENSION.width,
    });

    dialog.afterClosed()
        .pipe(
            switchMap(
                (selection: string[]) => this.selectAndInitDevices(selection)),
            takeUntil(this.destroyed))
        .subscribe((data: InitDevicesResponse) => {
          this.initDeviceManagerService(data);
          //   this.devicePrepareLoading = false;
        });
  }

  selectAndInitDevices(selection: string[]) {
    if (!selection) return EMPTY;
    this.devicePrepareLoading = true;
    return this.backendManagerService
        .initDevicesFromListV2(selection.join(), true)
        .pipe(take(1));
  }

  softRestart() {
    this.backendManagerService.softRestart()
        .pipe(
            catchError((err: HttpErrorResponse) => {
              this.devicePrepareLoading = true;
              return err.statusText;
            }),
            take(1),
            takeUntil(this.destroyed),
            )
        .subscribe(() => {});

    // After call the softRestart, backend service will be restarted, we need
    // use validateUicdBackendConnection api with retryWhen operator to check
    // whether backend is ready to serve the frontend request. Normally the
    // backend will be back online in 2-3 seconds.
    let retryCnt = 0;
    this.backendManagerService.validateUicdBackendConnection()
        .pipe(
            delay(2000),  // wait 2 seconds, otherwise
                          // validateUicdBackendConnection might be handled
                          // faster than softRestart request.
            retryWhen(
                errors => errors.pipe(
                    delay(2000),  // retry every 2 seconds
                    take(10),     // retry 10 times
                    tap(() => {
                      retryCnt++;
                      this.logService.log(
                          `Trying to connect to the backend... attempt ${
                              retryCnt}/10.`);
                      if (retryCnt === 10) {
                        this.logService.log(
                            'Retried 10 times, can not connect to backend service.');
                      }
                    }),
                    )))
        .subscribe(() => {
          this.logService.log('Connected to the backend successfully!');
          window.location.reload();
        });
  }

  tabChange(e: MatTabChangeEvent) {
    this.showUiTree = (e.index === BottomMenuTabs.UI_VIEWER);
    this.controlMessageService.sendMessage(
        {messageType: MessageTypes.CLEAR_CANVAS, extra: ''});
  }

  versionInfo() {
    this.backendManagerService.getVersionInfo()
        .pipe(
            take(1),
            takeUntil(this.destroyed),
            )
        .subscribe(versionInfo => {
          window.alert(
              `UIConductor Backend Version: ${versionInfo.backendVersion}
          '\nXmlDumper APK Version: ${versionInfo.xmlDumperVersion}`);
        });
  }

  ngOnDestroy() {
    // Unsubscribes all pending subscriptions.
    this.destroyed.next();
  }
}
