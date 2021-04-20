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

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.uicd.backend.core.constants.ScrollDirectionType;
import com.google.uicd.backend.core.constants.UicdConstant;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.uicdactions.jsondbignores.BaseSantinizer.ScrollScreenContentValidationActionSantinizer;

/** ScrollScreenContentValidationAction */
@JsonDeserialize(converter = ScrollScreenContentValidationActionSantinizer.class)
public class ScrollScreenContentValidationAction extends ScreenContentValidationAction {

  private static final int SLEEP_MILLS = 500;
  private ScrollDirectionType scrollOrientation = ScrollDirectionType.DOWN;
  private int scrollMaxNumber = 30;

  public ScrollScreenContentValidationAction() {}

  public ScrollScreenContentValidationAction(ValidationReqDetails validationReqDetails) {
    super(validationReqDetails);
    this.scrollOrientation = validationReqDetails.getScrollDirectionType();
    this.scrollMaxNumber = validationReqDetails.getScrollMaxNumber();
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateAction(baseAction);

    if (baseAction instanceof ScrollScreenContentValidationAction) {
      ScrollScreenContentValidationAction action = (ScrollScreenContentValidationAction) baseAction;
      this.scrollOrientation = action.scrollOrientation;
      this.scrollMaxNumber = action.scrollMaxNumber;
    }
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdException {
    this.clear();

    try {
      for (int i = 0; i < scrollMaxNumber; i++) {
        // Stop validation attempts if user has cancelled the test; outer code will take care
        // of setting test status to CANCELLED.
        if (actionContext.playbackStopRequested()) {
          return 0;
        }
        this.validationResult = validate(actionContext, androidDeviceDriver);
        if (this.validationResult) {
          break;
        }
        int hostScreenWidth = androidDeviceDriver.getHostScreenWidth();
        int hostScreenHeight = androidDeviceDriver.getHostScreenHeight();
        double[] swipeMatrix =
            UicdConstant.SCROLL_SEARCH_SWIPE_MATRIX[scrollOrientation.ordinal() - 1];
        androidDeviceDriver.swipeDevice(
            (int) (swipeMatrix[0] * hostScreenWidth),
            (int) (swipeMatrix[1] * hostScreenHeight),
            (int) (swipeMatrix[2] * hostScreenWidth),
            (int) (swipeMatrix[3] * hostScreenHeight));

        // Sometimes validation fails when the screen is still scrolling.
        Thread.sleep(SLEEP_MILLS);
      }
      updatePlayStatus(actionContext, this.validationResult, androidDeviceDriver);
    } catch (InterruptedException e) {
      throw new UicdException(e.getMessage());
    }
    return 0;
  }

  /** Default is scroll down */
  public ScrollDirectionType getScrollOrientation() {
    return scrollOrientation;
  }
}
