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

package com.google.uicd.backend.core.devicesdriver;

import java.util.function.Consumer;

/**
 * Handles registration and execution of a callback for a given device driver.
 */
public class DeviceCallbackHandler {

  private static DeviceCallbackHandler instance = null;
  private Consumer<AndroidDeviceDriver> deviceCallBack = null;

  private DeviceCallbackHandler() {
  }

  public static DeviceCallbackHandler getInstance() {
    if (instance == null) {
      instance = new DeviceCallbackHandler();
    }
    return instance;
  }

  public void applyDeviceCallback(AndroidDeviceDriver androidDeviceDriver) {
    if (this.deviceCallBack != null) {
      deviceCallBack.accept(androidDeviceDriver);
    }
  }

  public void setDeviceCallBack(Consumer<AndroidDeviceDriver> deviceCallBack) {
    this.deviceCallBack = deviceCallBack;
  }
}
