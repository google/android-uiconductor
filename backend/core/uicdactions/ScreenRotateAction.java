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

package com.google.uicd.backend.core.uicdactions;

import com.google.uicd.backend.core.constants.DeviceOrientation;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdException;

/** ScreenRotateAction to rotate the device screen */
public class ScreenRotateAction extends BaseAction {

  private DeviceOrientation deviceOrientation;

  public ScreenRotateAction() {}

  public ScreenRotateAction(String deviceOrientation) {
    this.deviceOrientation = DeviceOrientation.fromOrientationCode(deviceOrientation);
    this.setName(this.deviceOrientation.name().toLowerCase());
  }

  @Override
  public String getDisplay() {
    return String.valueOf(deviceOrientation.name().toLowerCase());
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);
    if (baseAction instanceof ScreenRotateAction) {
      ScreenRotateAction otherAction = (ScreenRotateAction) baseAction;
      this.deviceOrientation = otherAction.deviceOrientation;
    }
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdException {
    androidDeviceDriver.rotateDevice(deviceOrientation);
    return 0;
  }
}
