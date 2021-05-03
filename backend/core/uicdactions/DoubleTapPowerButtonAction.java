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

import static com.google.uicd.backend.core.utils.ADBCommands.CHANGE_EVENT_FILE_MODE;
import static com.google.uicd.backend.core.utils.ADBCommands.DOUBLE_TAP_POWER_BUTTON_CMD;
import static com.google.uicd.backend.core.utils.ADBCommands.EXECUTE_COMMAND_LINE_TIME_OUT_IN_SECONDS;
import static com.google.uicd.backend.core.utils.ADBCommands.GET_POWER_BUTTON_EVENT_CMD;
import static com.google.uicd.backend.core.utils.ADBCommands.ROOT_ACCESS_CMD;

import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import java.util.ArrayList;
import java.util.List;

/** The Action that open camera through quick tap on power button twice. */
public class DoubleTapPowerButtonAction extends BaseAction {

  public DoubleTapPowerButtonAction() {}

  @Override
  public String getDisplay() {
    return "Double Tap Power Button";
  }

  @Override
  public void updateAction(BaseAction baseAction) {}

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdException {
    try {
      List<String> output = new ArrayList<>();
      String deviceId = androidDeviceDriver.getDeviceId();
      adbCommandLineUtil.executeAdb(
          GET_POWER_BUTTON_EVENT_CMD,
          deviceId,
          output,
          (int) EXECUTE_COMMAND_LINE_TIME_OUT_IN_SECONDS.getSeconds());
      String event = output.get(0);
      adbCommandLineUtil.executeAdb(ROOT_ACCESS_CMD, deviceId);
      adbCommandLineUtil.executeAdb(String.format(CHANGE_EVENT_FILE_MODE, event), deviceId);
      adbCommandLineUtil.executeAdb(DOUBLE_TAP_POWER_BUTTON_CMD.replace("%s", event), deviceId);
    } catch (UicdExternalCommandException | IndexOutOfBoundsException e) {
      logger.info("Fail to execute adb input." + e.getMessage());
    }
    return 0;
  }
}
