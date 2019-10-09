// Copyright 2019 Google LLC
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

/**
 * SwipeAction
 */
public class SwipeAction extends BaseAction {

  public SwipeAction() {
  }

  public SwipeAction(int startX, int startY, int endX, int endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.setName(this.getDisplay());
    this.setDelayAfterActionMs(2000);
  }

  public int startX;
  public int startY;
  public int endX;
  public int endY;

  @Override
  public String getDisplay() {
    return getDirection();
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    androidDeviceDriver.swipeDevice(this.startX, this.startY, this.endX, this.endY);
    return 0;
  }

  private String getDirection() {
    if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
      if (startX > endX) {
        return "left";
      } else {
        return "right";
      }
    } else {
      if (startY > endY) {
        return "up";
      } else {
        return "down";
      }
    }
  }
}
