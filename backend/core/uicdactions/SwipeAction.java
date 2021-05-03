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
import com.google.uicd.backend.core.xmlparser.XmlHelper;
import java.util.List;

/** SwipeAction has two modes, straight x,y or context based one. */
public class SwipeAction extends BaseAction {

  private int startX;
  private int startY;
  private int endX;
  private int endY;

  public NodeContext getStartPointNodeContext() {
    return startPointNodeContext;
  }

  public NodeContext getEndPointNodeContext() {
    return endPointNodeContext;
  }

  private NodeContext startPointNodeContext;
  private NodeContext endPointNodeContext;
  @JsonIgnore private final PositionHelper positionHelper;

  public SwipeAction() {
    this.positionHelper = new PositionHelper();
  }

  public SwipeAction(int startX, int startY, int endX, int endY) {
    this();
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.setName(SwipeAction.getDirection(new Position(startX, startY), new Position(endX, endY)));
    this.setDelayAfterActionMs(2000);
  }

  public static SwipeAction createNodeContextBasedSwipeAction(
      AndroidDeviceDriver androidDeviceDriver, Position startPos, Position endPos) {
    SwipeAction swipeAction = new SwipeAction();
    List<String> xmlLists = androidDeviceDriver.fetchCurrentXML();
    NodeContext startPointNodeContext =
        XmlHelper.getContextFromPos(
            xmlLists,
            startPos,
            androidDeviceDriver.getWidthRatio(),
            androidDeviceDriver.getHeightRatio());
    NodeContext endNodeContext =
        XmlHelper.getContextFromPos(
            xmlLists,
            endPos,
            androidDeviceDriver.getWidthRatio(),
            androidDeviceDriver.getHeightRatio());
    swipeAction.startPointNodeContext = startPointNodeContext;
    swipeAction.endPointNodeContext = endNodeContext;
    swipeAction.name = SwipeAction.getDirection(startPos, endPos);
    return swipeAction;
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
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    Position startPos = new Position(this.startX, this.startY);
    Position endPos = new Position(this.endX, this.endY);

    startPos.updateIfValidPos(
        positionHelper.getPositionFromScreen(
            androidDeviceDriver, startPointNodeContext, actionContext));
    endPos.updateIfValidPos(
        positionHelper.getPositionFromScreen(
            androidDeviceDriver, endPointNodeContext, actionContext));
    androidDeviceDriver.swipeDevice(startPos, endPos);
    return 0;
  }

  private static String getDirection(Position startPos, Position endPos) {
    if (Math.abs(startPos.x - endPos.x) > Math.abs(startPos.y - endPos.y)) {
      if (startPos.x > endPos.x) {
        return "left";
      } else {
        return "right";
      }
    } else {
      if (startPos.y > endPos.y) {
        return "up";
      } else {
        return "down";
      }
    }
  }
}
