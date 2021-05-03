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
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.uicdactions.jsondbignores.BaseSantinizer.LoopScreenContentValidationActionSantinizer;

/** ScreenContentValidationAction */
@JsonDeserialize(converter = LoopScreenContentValidationActionSantinizer.class)
public class LoopScreenContentValidationAction extends ScreenContentValidationAction {

  private static final int SLEEP_MILLS = 1000;
  // Default value for fastpair with a simulator. Usually it takes 1 minute.
  public int timeout = 60;

  // Old actions does not have this field, which should be initialized as false.
  public boolean waitUntilDisappear;

  public LoopScreenContentValidationAction() {}

  public LoopScreenContentValidationAction(ValidationReqDetails validationReqDetails) {
    super(validationReqDetails);
    this.timeout = (int) validationReqDetails.getTimeout().getSeconds();
    this.waitUntilDisappear = validationReqDetails.isWaitUntilDisappear();
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateAction(baseAction);

    if (baseAction instanceof LoopScreenContentValidationAction) {
      LoopScreenContentValidationAction action = (LoopScreenContentValidationAction) baseAction;
      this.timeout = action.timeout;
      this.waitUntilDisappear = action.waitUntilDisappear;
    }
  }

  @Override
  public int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdException {
    this.clear();
    try {
      for (int cnt = 0; cnt < timeout; cnt++) {
        // Stop validation attempts if user has cancelled the test; outer code will take care
        // of setting test status to CANCELLED.
        if (actionContext.playbackStopRequested()) {
          return 0;
        }
        if (waitUntilDisappear != validateRaw(actionContext, androidDeviceDriver)) {
          // The raw result of loop validation action
          this.validationResult = true;
          break;
        }
        Thread.sleep(SLEEP_MILLS);
      }

      this.validationResult =
          this.isStopWhenFalse() ? this.validationResult : !this.validationResult;

      updatePlayStatus(actionContext, this.validationResult, androidDeviceDriver);
    } catch (InterruptedException e) {
      throw new UicdException(e.getMessage());
    }
    return 0;
  }

}
