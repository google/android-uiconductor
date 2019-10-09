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

package com.google.wireless.qa.uicd.backend.core.uicdactions;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.wireless.qa.uicd.backend.core.constants.StopType;
import com.google.wireless.qa.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.wireless.qa.uicd.backend.core.exceptions.UicdException;
import com.google.wireless.qa.uicd.backend.core.uicdactions.ActionContext.PlayStatus;
import com.google.wireless.qa.uicd.backend.core.uicdactions.jsondbignores.BaseSantinizer.ConditionClickActionSantinizer;
import com.google.wireless.qa.uicd.backend.core.xmlparser.Bounds;
import com.google.wireless.qa.uicd.backend.core.xmlparser.NodeContext;
import com.google.wireless.qa.uicd.backend.core.xmlparser.Position;

/** ConditionClickAction */
@JsonDeserialize(converter = ConditionClickActionSantinizer.class)
public class ConditionClickAction extends ScreenContentValidationAction {
  // need by the jackson to deserialize
  public ConditionClickAction() {}

  public ConditionClickAction(
      Bounds selectedBound,
      String type,
      String value,
      String textMatchType,
      String boundsSearchType,
      NodeContext nodeContext,
      StopType stopType) {
    super(selectedBound, type, value, textMatchType, boundsSearchType, nodeContext, stopType);
  }

  public ConditionClickAction(ValidationReqDetails validationReqDetails) {
    super(validationReqDetails);
  }

  @Override
  public int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdException {
    super.play(androidDeviceDriver, actionContext);

    if (this.playStatus != PlayStatus.FAIL) {
      Position pos = this.foundNodeContext.getBounds().getCenter();

      // If we match by the node context, our saved nodeContext could be a big area. Center is not
      // accurate enough.
      if (this.savedNodeContext != null) {
        pos = pos.getOffSetPosition(savedNodeContext.getRelativePos());
      }
      androidDeviceDriver.clickDevice((int) pos.x, (int) pos.y);
    }

    actionContext.removeStatus(androidDeviceDriver.getDeviceId());
    this.playStatus = PlayStatus.READY;

    return 0;
  }
}
