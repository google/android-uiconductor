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

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.uicd.backend.core.constants.UicdConstant;
import com.google.uicd.backend.core.constants.StopType;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdExcpetion;
import com.google.uicd.backend.core.uicdactions.jsondbignores.BaseSantinizer.ScrollScreenContentValidationActionSantinizer;
import com.google.uicd.backend.core.xmlparser.Bounds;
import com.google.uicd.backend.core.xmlparser.NodeContext;

/** ScrollScreenContentValidationAction */
@JsonDeserialize(converter = ScrollScreenContentValidationActionSantinizer.class)
public class ScrollScreenContentValidationAction extends ScreenContentValidationAction {

  private static final int SLEEP_MILLS = 500;
  /** Default is scroll down */
  int scrollOrientation = 2;

  public ScrollScreenContentValidationAction() {}

  public ScrollScreenContentValidationAction(
      Bounds selectedBound,
      String type,
      String value,
      String textMatchType,
      String boundsSearchType,
      NodeContext nodeContext,
      StopType stopType,
      int scrollOrientation) {
    super(selectedBound, type, value, textMatchType, boundsSearchType, nodeContext, stopType);
    this.scrollOrientation = scrollOrientation;
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdExcpetion {
    this.clear();

    try {
      for (int step = UicdConstant.SCROLL_SEARCH_STEPS; step > 0; step--) {
        this.validationResult = validate(actionContext, androidDeviceDriver);
        if (this.validationResult) {
          break;
        }
        androidDeviceDriver.swipeDevice(
            UicdConstant.SCROLL_SEARCH_SWIPE_COORDINATES[scrollOrientation - 1][0],
            UicdConstant.SCROLL_SEARCH_SWIPE_COORDINATES[scrollOrientation - 1][1],
            UicdConstant.SCROLL_SEARCH_SWIPE_COORDINATES[scrollOrientation - 1][2],
            UicdConstant.SCROLL_SEARCH_SWIPE_COORDINATES[scrollOrientation - 1][3]);

        // Sometimes validation fails when the screen is still scrolling.
        Thread.sleep(SLEEP_MILLS);
      }
      if (!this.validationResult) {
        actionContext.setFailStatus(androidDeviceDriver.getDeviceId());
        this.playStatus = ActionContext.PlayStatus.FAIL;
      }

      if (isStopCurrentLevel() && !this.validationResult) {
        actionContext.removeStatus(androidDeviceDriver.getDeviceId());
        this.playStatus = ActionContext.PlayStatus.SKIPPED;
      }
    } catch (InterruptedException e) {
      throw new UicdExcpetion(e.getMessage());
    }
    return 0;
  }
}
