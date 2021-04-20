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

package com.google.uicd.backend.recorder.coverter.roboscript;

import com.google.uicd.backend.core.constants.StrategyType;
import com.google.uicd.backend.core.uicdactions.ClickAction;
import com.google.uicd.backend.core.utils.ImageUtil;
import com.google.uicd.backend.recorder.coverter.ActionConverter;

/** Implements the convert logic for click action to RoboScript */
public class ClickActionRoboConverter implements ActionConverter<ClickAction, RoboConvertContext> {
  private static final int HOST_SCREEN_WIDTH = 360;
  private static final int HOST_SCREEN_HEIGHT = 640;

  @Override
  public boolean canConvert(ClickAction action, RoboConvertContext context) {
    if (action.isRawXYClick() || action.isByElement()) {
      return true;
    }
    context.appendToDetailsLog("Click based NodeContext, can not convert. ");
    return false;
  }

  @Override
  public void convert(ClickAction action, RoboConvertContext context) {
    if (!canConvert(action, context)) {
      return;
    }
    RoboAction roboAction = new RoboAction();
    roboAction.eventType = RoboEventType.VIEW_CLICKED;
    RoboElementDescriptor roboElementDescriptor = new RoboElementDescriptor();
    if (action.isByElement()) {
      if (action.getStrategy() == StrategyType.RESOURCEID) {
        roboElementDescriptor.resourceId = action.getSelector();
        roboAction.elementDescriptors.add(roboElementDescriptor);
      } else if (action.getStrategy() == StrategyType.TEXT) {
        roboElementDescriptor.text = action.getSelector();
        roboAction.elementDescriptors.add(roboElementDescriptor);
      } else if (action.getStrategy() == StrategyType.XPATH) {
        context.appendToDetailsLog("Not support xpath, can not convert. ");
        return;
      }
    } else if (action.isRawXYClick()) {
      roboAction.pointTapXCoordinate =
          ImageUtil.scaleToTargetPx(
              (int) action.getNodeContext().getClickedPos().x,
              HOST_SCREEN_WIDTH,
              context.deviceWidth);
      roboAction.pointTapYCoordinate =
          ImageUtil.scaleToTargetPx(
              (int) action.getNodeContext().getClickedPos().y,
              HOST_SCREEN_HEIGHT,
              context.deviceHeight);
    }
    context.addRoboAcction(roboAction);
    return;
  }
}
