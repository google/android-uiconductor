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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.utils.ImageUtil;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/** ScreenCapAction */
public class ScreenCapAction extends BaseAction {

  @JsonIgnore private String screenCapPath = "";

  public ScreenCapAction() {
    setName("Screenshot");
  }

  public void setScreenCapPath(ActionContext actionContext) {
    screenCapPath = actionContext.getScreenCapFullPath();
  }

  @Override
  public String getDisplay() {
    return name;
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdException {
    setScreenCapPath(actionContext);
    ImageUtil.saveScreenshotToLocal(androidDeviceDriver.getDeviceId(), screenCapPath);
    return 0;
  }

  @Override
  protected ActionExecutionResult genActionExecutionResults(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    // If current action is skiped, the genActionExecutionResults will still get called, since we
    // didn't call play(), will have the screencapPath from last time, which is incorrect.
    setScreenCapPath(actionContext);
    ActionExecutionResult actionExecutionResult =
        super.genActionExecutionResults(androidDeviceDriver, actionContext);
    try {
      // Save screenshot output to action execution result.
      actionExecutionResult.setScreenCapOutput(
          URLEncoder.encode(screenCapPath, "UTF-8"), this.getDisplay());
    } catch (UnsupportedEncodingException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return actionExecutionResult;
  }
}
