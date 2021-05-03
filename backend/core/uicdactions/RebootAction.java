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

import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.devicesdriver.DeviceCallbackHandler;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import java.util.ArrayList;
import java.util.List;

/** RebootAction */
public class RebootAction extends BaseAction {

  private boolean onlyReconnectToDevice = false;
  private int reconnectTimeInSec = 30;

  public RebootAction() {
    setName(getDisplay());
  }

  @Override
  public String getDisplay() {
    return "Reboot device";
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);
    if (baseAction instanceof RebootAction) {
      RebootAction otherAction = (RebootAction) baseAction;
      onlyReconnectToDevice = otherAction.onlyReconnectToDevice;
    }
  }

  @Override
  protected int play(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) throws UicdException {
    List<String> output = new ArrayList<>();
    if (!onlyReconnectToDevice) {
      adbCommandLineUtil.executeReboot(androidDeviceDriver.getDeviceId(), output);
    }
    if (androidDeviceDriver.xmlDumperProcess != null) {
      androidDeviceDriver.xmlDumperProcess.destroy();
      androidDeviceDriver.xmlDumperProcess = null;
    }

    androidDeviceDriver.isMinicapStarted = false;

    androidDeviceDriver.isXmlDumperStarted = false;
    // For reboot action, we want to wait enough time to make sure xmldumper/minicap starts.
    try {
      Thread.sleep(reconnectTimeInSec * 1000);
    } catch (InterruptedException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    androidDeviceDriver.startXmlDumperServer();
    logger.info("Reboot Done. DeviceId:" + androidDeviceDriver.getDeviceId());
    DeviceCallbackHandler.getInstance().applyDeviceCallback(androidDeviceDriver);
    return 0;
  }
}
