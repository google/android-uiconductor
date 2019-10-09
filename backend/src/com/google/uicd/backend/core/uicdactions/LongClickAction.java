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

import com.google.wireless.qa.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.wireless.qa.uicd.backend.core.xmlparser.NodeContext;
import com.google.wireless.qa.uicd.backend.core.xmlparser.Position;
import com.google.wireless.qa.uicd.backend.core.xmlparser.XmlHelper;
import java.util.List;

/**
 * LongClickAction
 */
public class LongClickAction extends BaseAction {

  // need by the jackson
  public LongClickAction() {
  }

  public LongClickAction(NodeContext nodeContext, int duration) {
    this.nodeContext = nodeContext;
    this.duration = duration;
    if (nodeContext != null) {
      this.setName(nodeContext.getDisplayEstimate());
    }
  }

  public NodeContext nodeContext;
  private boolean isRawXY = false;
  private int duration = 2000;

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
      androidDeviceDriver.longClickDevice(
          (int) nodeContext.getClickedPos().x, (int) nodeContext.getClickedPos().y, this.duration);
      return 0;
    }
    List<String> xmls = androidDeviceDriver.fetchCurrentXML();
    Position pos = XmlHelper
        .getPosFromContextXML(xmls, this.nodeContext, androidDeviceDriver.getWidthRatio(),
            androidDeviceDriver.getHeightRatio());
    androidDeviceDriver.longClickDevice((int) pos.x, (int) pos.y, this.duration);
    return 0;
  }

}
