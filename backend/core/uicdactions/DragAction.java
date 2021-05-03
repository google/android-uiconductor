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
import com.google.common.collect.Iterables;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.xmlparser.NodeContext;
import com.google.uicd.backend.core.xmlparser.Position;
import com.google.uicd.backend.core.xmlparser.XmlHelper;
import java.awt.Point;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/** DragAction */
public class DragAction extends BaseAction {

  private static final Duration DELAY_AFTER_TOUCH = Duration.ofSeconds(1);
  private static final Duration DELAY_BETWEEN_DRAG_POINTS = Duration.ofMillis(500);
  private static final int NUM_POINTS_FOR_EACH_DRAG = 3;

  public List<Point> dragPoints;
  public NodeContext nodeContext;

  public NodeContext getNodeContext() {
    return nodeContext;
  }

  public NodeContext getEndPointNodeContext() {
    return endPointNodeContext;
  }

  private NodeContext endPointNodeContext;
  @JsonIgnore private final PositionHelper positionHelper;

  public DragAction() {
    this.positionHelper = new PositionHelper();
    this.setDelayAfterActionMs(2000);
  }

  public DragAction(NodeContext nodeContext, List<Point> dragPoints) {
    this();
    this.nodeContext = nodeContext;
    this.dragPoints = dragPoints;
    this.setName(this.getDisplay());
  }

  public static DragAction createNodeContextBasedDragAction(
      AndroidDeviceDriver androidDeviceDriver, Position startPos, Position endPos) {
    DragAction dragAction = new DragAction();
    List<String> xmlLists = androidDeviceDriver.fetchCurrentXML();
    NodeContext startNodeContext =
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
    dragAction.nodeContext = startNodeContext;
    dragAction.endPointNodeContext = endNodeContext;
    return dragAction;
  }

  @Override
  public String getDisplay() {
    if (nodeContext != null && endPointNodeContext != null) {
      return String.format(
          "Drag from %s to %s", nodeContext.getFirstText(), endPointNodeContext.getFirstText());
    } else if (dragPoints != null) {
      return String.format("Drag: %d points", dragPoints.size() - 1); // do not count start point
    } else {
      return "Drag Action";
    }
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);
  }

  private static List<Position> positionsAlongLine(Position startPt, Position endPt, int numPts) {
    ArrayList<Position> positions = new ArrayList<>();
    double xIncrement = (endPt.x - startPt.x) / numPts;
    double yIncrement = (endPt.y - startPt.y) / numPts;
    for (int i = 0; i < numPts; i++) {
      positions.add(
          new Position((int) (startPt.x + (xIncrement * i)), (int) (startPt.y + (yIncrement * i))));
    }
    positions.add(new Position(endPt));
    return positions;
  }

  private List<Position> getDragPath(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    List<Position> dragPath = new ArrayList<>();
    if (nodeContext == null && dragPoints.isEmpty()) {
      return dragPath;
    }
    if (dragPoints != null) {
      dragPath =
          this.dragPoints.stream().map(p -> new Position(p.x, p.y)).collect(Collectors.toList());
    }
    if (nodeContext != null) {
      Position posStart =
          positionHelper.getPositionFromScreen(androidDeviceDriver, nodeContext, actionContext);
      if (dragPath.size() >= 2) {
        dragPath.set(0, posStart);
      } else {
        dragPath.add(posStart);
      }
    }
    if (endPointNodeContext != null) {
      Position posEnd =
          positionHelper.getPositionFromScreen(
              androidDeviceDriver, endPointNodeContext, actionContext);
      if (dragPath.size() >= 2) {
        dragPath.set(dragPath.size() - 1, posEnd);
      } else {
        dragPath.add(posEnd);
      }
    }

    // To solve the "escape" problem, we return dragPath directly. "escape" problem is when drag
    // icon1 slowly approaching icon2 to create a folder, icon2 will move away.
    if (endPointNodeContext != null) {
      return dragPath;
    }
    List<Position> incrementPath = new ArrayList<>();
    for (int i = 1; i < dragPath.size(); i++) {
      if (dragPath.get(i - 1).equals(dragPath.get(i))) {
        continue;
      }
      incrementPath.addAll(
          positionsAlongLine(dragPath.get(i - 1), dragPath.get(i), NUM_POINTS_FOR_EACH_DRAG));
    }
    return incrementPath;
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    List<Position> incrementPath = getDragPath(androidDeviceDriver, actionContext);
    if (incrementPath.isEmpty()) {
      logger.info("Drag path is empty. Skip Drag action.");
      return 0;
    }
    try {
      Position startPos = incrementPath.get(0);
      androidDeviceDriver.dragStart(startPos);
      for (Position pos : incrementPath.subList(0, incrementPath.size() - 1)) {
        Thread.sleep(DELAY_AFTER_TOUCH.toMillis());
        logger.info(String.format("Dragging to: (x:%d, y:%d)", (int) pos.x, (int) pos.y));
        androidDeviceDriver.dragMove(pos);
      }
      Position endPos = Iterables.getLast(incrementPath);
      Thread.sleep(DELAY_BETWEEN_DRAG_POINTS.toMillis());
      logger.info(String.format("Dragging end: (x:%d, y:%d)", (int) endPos.x, (int) endPos.y));
      androidDeviceDriver.dragMove(endPos);
      androidDeviceDriver.dragStop(endPos);
    } catch (InterruptedException e) {
      logger.warning("Error during drag operation: " + e.getMessage());
    }
    return 0;
  }
}
