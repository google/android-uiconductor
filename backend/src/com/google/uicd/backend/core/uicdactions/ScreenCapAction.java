// Copyright 2018 Google LLC
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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdExcpetion;
import com.google.uicd.backend.core.utils.ADBCommandLineUtil;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * ScreenCapAction
 */
public class ScreenCapAction extends BaseAction {

  public ScreenCapAction() {
    setName("Screenshot");
  }

  @JsonIgnore
  private String screenCapPath;

  @Override
  public String getDisplay() {
    return "Take Screenshot";
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateBaseAction(baseAction);
  }

  @Override
  protected int play(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) throws UicdExcpetion {
    String command1 = "shell screencap /sdcard/screen.png";

    screenCapPath = actionContext.getExecutionId() + "/" + getActionId() + "/"
        + actionContext.getCurrentActionSequenceIndex() + "/screenshot/" + "dump.png";
    String screenCapFullPath = Paths
        .get(UicdConfig.getInstance().getTestOutputFolder(), screenCapPath).toString();

    File file = new File(screenCapFullPath);
    file.getParentFile().mkdirs();

    String command2 = "pull /sdcard/screen.png " + screenCapFullPath;

    List<String> output = new ArrayList<>();
    ADBCommandLineUtil.executeAdb(command1, androidDeviceDriver.getDeviceId(), output);
    ADBCommandLineUtil.executeAdb(command2, androidDeviceDriver.getDeviceId(), output);
    return 0;
  }

  @Override
  protected ActionExecutionResult genActionExecutionResults(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    ActionExecutionResult actionExecutionResult =
        super.genActionExecutionResults(androidDeviceDriver, actionContext);
    try {
      // screenCapPath will be null if play() has not been called yet
      if (screenCapPath != null) {
        actionExecutionResult.setScreenCapOutput(
            URLEncoder.encode(screenCapPath, "UTF-8"), this.getDisplay());
      }
    } catch (UnsupportedEncodingException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    actionExecutionResult.setPlayStatus(this.playStatus);
    return actionExecutionResult;
  }

}
