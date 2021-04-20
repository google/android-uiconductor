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
import com.google.uicd.backend.core.exceptions.UicdDeviceHttpConnectionResetException;

/**
 * ZoomAction
 */
public class ZoomAction extends BaseAction {

  // need by the jackson
  public ZoomAction() {
  }
  public ZoomAction(int x1, int y1, int x2, int y2, boolean isZoomIn) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.isZoomIn = isZoomIn;
    this.setName(this.getDisplay());
  }
  private boolean isZoomIn = false;
  private int x1 = -1;
  private int y1 = -1;
  private int x2 = -1;
  private int y2 = -1;

  @Override
  public String getDisplay() {
    if (isZoomIn) {
      return "Zoom In";
    } else {
      return "Zoom Out";
    }
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);
    if (baseAction instanceof ZoomAction) {
      ZoomAction otherAction = (ZoomAction) baseAction;
      this.isZoomIn = otherAction.isZoomIn;
    }
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdDeviceHttpConnectionResetException {
    androidDeviceDriver.zoomDevice(x1, y1, x2, y2, isZoomIn);
    return 0;
  }
}
