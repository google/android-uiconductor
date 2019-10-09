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

import com.google.common.collect.Iterables;
import com.google.wireless.qa.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.wireless.qa.uicd.backend.core.xmlparser.NodeContext;
import com.google.wireless.qa.uicd.backend.core.xmlparser.Position;
import com.google.wireless.qa.uicd.backend.core.xmlparser.XmlHelper;
import java.awt.Point;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

/** DragAction */
public class DragAction extends BaseAction {

  private static final Duration DELAY_AFTER_TOUCH = Duration.ofSeconds(1);
  private static final Duration DELAY_BETWEEN_DRAG_POINTS = Duration.ofMillis(500);
  private static final int NUM_POINTS_FOR_EACH_DRAG = 3;

  public DragAction() {}

  public DragAction(NodeContext nodeContext, List<Point> dragPoints) {
    this.nodeContext = nodeContext;
    this.dragPoints = dragPoints;
    this.setName(this.getDisplay());
    this.setDelayAfterActionMs(2000);
  }

  public List<Point> dragPoints;
  public NodeContext nodeContext;

  @Override
  public String getDisplay() {
    return String.format("Drag: %d points", dragPoints.size() - 1); // do not count start point
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);
  }

  private List<Point> pointsAlongLine(Point startPt, Point endPt, int numPts) {
    ArrayList<Point> points = new ArrayList<>();
    float xIncrement = (endPt.x - startPt.x) / numPts;
    float yIncrement = (endPt.y - startPt.y) / numPts;
    for (int i = 0; i < numPts; i++) {
      points.add(
          new Point((int) (startPt.x + (xIncrement * i)), (int) (startPt.y + (yIncrement * i))));
    }
    points.add(new Point(endPt));
    return points;
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    Position pos =
        XmlHelper.getPosFromContextXML(
            androidDeviceDriver.fetchCurrentXML(),
            this.nodeContext,
            androidDeviceDriver.getWidthRatio(),
            androidDeviceDriver.getHeightRatio());
    logger.info(String.format("Position from xml engine: (x:%f, y:%f)", pos.x, pos.y));
    androidDeviceDriver.dragStart((int) pos.x, (int) pos.y);
    try {
      Thread.sleep(DELAY_AFTER_TOUCH.toMillis());
    } catch (InterruptedException e) {
      logger.warning("Error during drag operation: " + e.getMessage());
    }
    try {
      for (int i = 1; i < dragPoints.size(); i++) {
        if (dragPoints.get(i - 1).equals(dragPoints.get(i))) {
          continue;
        }
        logger.info(
            String.format("Dragging to: (x:%d, y:%d)", dragPoints.get(i).x, dragPoints.get(i).y));
        for (Point point :
            pointsAlongLine(dragPoints.get(i - 1), dragPoints.get(i), NUM_POINTS_FOR_EACH_DRAG)) {
          androidDeviceDriver.dragMove(point.x, point.y);
          // Delay is needed to provide a pause between movements.
          Thread.sleep(DELAY_BETWEEN_DRAG_POINTS.toMillis());
          androidDeviceDriver.dragMove(point.x, point.y);
        }
      }
      Thread.sleep(DELAY_BETWEEN_DRAG_POINTS.toMillis());
      Point endPoint = Iterables.getLast(dragPoints);
      logger.info(String.format("Dragging end: (x:%d, y:%d)", endPoint.x, endPoint.y));
      androidDeviceDriver.dragStop(endPoint.x, endPoint.y);
    } catch (InterruptedException e) {
      logger.warning("Error during drag operation: " + e.getMessage());
    }

    return 0;
  }
}
