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
import com.google.uicd.backend.core.xmlparser.NodeContext;
import com.google.uicd.backend.core.xmlparser.Position;

/** LongClickAction */
public class LongClickAction extends BaseAction {

  // need by the jackson
  public LongClickAction() {
    this.positionHelper = new PositionHelper();
  }

  public LongClickAction(NodeContext nodeContext, int duration) {
    this();
    this.nodeContext = nodeContext;
    this.duration = duration;
    if (nodeContext != null) {
      this.setName(nodeContext.getDisplayEstimate());
    }
  }

  public NodeContext getNodeContext() {
    return nodeContext;
  }

  public NodeContext nodeContext;
  private boolean isRawXY = false;
  private int duration = 2000;

  @JsonIgnore
  PositionHelper positionHelper;
  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);
    if (baseAction instanceof LongClickAction) {
      LongClickAction otherAction = (LongClickAction) baseAction;
      this.isRawXY = otherAction.isRawXY;
      this.duration = otherAction.duration;
    }
  }

  @Override
  public String getDisplay() {
    if (isRawXY) {
      return String.valueOf(nodeContext.getClickedPos().toString());
    } else {
      return String.format("%s, %s", this.getName(), nodeContext.getClickedPos().toString());
    }
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    if (isRawXY) {
      androidDeviceDriver.longClickDevice(nodeContext.getClickedPos(), this.duration);
      return 0;
    }
    Position pos =
        positionHelper.getPositionFromScreen(androidDeviceDriver, nodeContext, actionContext);
    androidDeviceDriver.longClickDevice(pos, this.duration);
    return 0;
  }
}
