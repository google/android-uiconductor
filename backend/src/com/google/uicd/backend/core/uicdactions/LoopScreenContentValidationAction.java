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
import com.google.uicd.backend.core.constants.StopType;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdExcpetion;
import com.google.uicd.backend.core.uicdactions.jsondbignores.BaseSantinizer.LoopScreenContentValidationActionSantinizer;
import com.google.uicd.backend.core.xmlparser.Bounds;
import com.google.uicd.backend.core.xmlparser.NodeContext;

/** ScreenContentValidationAction */
@JsonDeserialize(converter = LoopScreenContentValidationActionSantinizer.class)
public class LoopScreenContentValidationAction extends ScreenContentValidationAction {

  private static final int SLEEP_MILLS = 1000;
  // Default value for fastpair with a simulator. Usually it takes 1 minute.
  public int timeout = 60;

  // Old actions does not have this field, which should be initialized as false.
  public boolean waitUntilDisappear;

  public LoopScreenContentValidationAction() {}

  public LoopScreenContentValidationAction(
      Bounds selectedBound,
      String type,
      String value,
      String textMatchType,
      String boundsSearchType,
      NodeContext nodeContext,
      StopType stopType,
      int timeout,
      boolean waitUntilDisappear) {
    super(selectedBound, type, value, textMatchType, boundsSearchType, nodeContext, stopType);
    this.timeout = timeout;
    this.waitUntilDisappear = waitUntilDisappear;
  }

  @Override
  public int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdExcpetion {
    this.clear();
    try {
      for (int cnt = 0; cnt < timeout; cnt++) {
        if (waitUntilDisappear != validateRaw(actionContext, androidDeviceDriver)) {
          // The raw result of loop validation action
          this.validationResult = true;
          break;
        }
        Thread.sleep(SLEEP_MILLS);
      }

      this.validationResult =
          this.isStopWhenFalse() ? this.validationResult : !this.validationResult;

      if (!this.validationResult) {
        if (isStopCurrentLevel()) {
          actionContext.removeStatus(androidDeviceDriver.getDeviceId());
          this.playStatus = ActionContext.PlayStatus.SKIPPED;
        } else {
          actionContext.setFailStatus(androidDeviceDriver.getDeviceId());
          this.playStatus = ActionContext.PlayStatus.FAIL;
        }
      }
    } catch (InterruptedException e) {
      throw new UicdExcpetion(e.getMessage());
    }
    return 0;
  }

}
