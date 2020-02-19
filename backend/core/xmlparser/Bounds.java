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

package com.google.uicd.backend.core.xmlparser;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.base.Splitter;
import com.google.uicd.backend.core.constants.ScreenContentSearchType;
import com.google.uicd.backend.core.exceptions.UicdXMLFormatException;
import java.util.List;
import java.util.Objects;

/**
 * Represent a Bonds in UI xml string, with the coordinates of top left and bottom right
 */
@JsonAutoDetect(fieldVisibility = ANY, getterVisibility = NONE, setterVisibility = NONE,
    isGetterVisibility = NONE)
public class Bounds {

  private static final double AREA_EPSILON = 0.01;
  private static final double SIMILAR_SIZE_THRESHOLD = 0.3;
  private static final double BOUNDS_AROUND_RANGE_RATIO = 0.2;
  // The minimum width of element on screen is the battery image in status bar which is 21px, so we
  // set minimum height and width to 20px to include it.
  private static final double VALID_BOUNDS_MIN_HEIGHT_PX = 20;
  private static final double VALID_BOUNDS_MIN_WIDTH_PX = 20;

  public Bounds() {
  }
  public Bounds(double x1, double y1, double x2, double y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  private static final int PC_SCREEN_WIDTH_PX = 360;
  private static final int PC_SCREEN_HEIGHT_PX = 640;
  @JsonIgnore public int totalTextChildrenCnt;
  private double x1;
  private double y1;
  private double x2;
  private double y2;

  public static Bounds getFullScreenBounds() {
    return new Bounds(0, 0, PC_SCREEN_WIDTH_PX, PC_SCREEN_HEIGHT_PX);
  }

  /**
   * Return Bounds instance from bounds string
   *
   * @param boundsString [x1, y1],[x2, y2]
   * @param xRatio x-resolution of real cell phone / x-resolution of streaming in UI
   * @param yRatio y-resolution of real cell phone / y-resolution of streaming in UI
   */
  public static Bounds createBoundsFromString(String boundsString, double xRatio, double yRatio)
      throws UicdXMLFormatException {
    Bounds bounds = new Bounds(0, 0, 0, 0);
    String cornerAddr = boundsString.replaceAll("]\\[", ",");
    cornerAddr = cornerAddr.replace("[", "");
    cornerAddr = cornerAddr.replaceAll("]", "");
    List<String> matches = Splitter.on(',').splitToList(cornerAddr);

    if (matches.size() != 4) {
      throw new UicdXMLFormatException("Error Bounds String: " + boundsString);
    }

    bounds.x1 = Integer.parseInt(matches.get(0)) / xRatio;
    bounds.y1 = Integer.parseInt(matches.get(1)) / yRatio;
    bounds.x2 = Integer.parseInt(matches.get(2)) / xRatio;
    bounds.y2 = Integer.parseInt(matches.get(3)) / yRatio;
    return bounds;
  }

  /**
   */
  public Bounds getNearByBounds(double ratio) {
    double xx1 = Math.max(this.getCenter().x - this.getWidth() / 2.0 * (1.0 + ratio), 0.0);
    double xx2 = Math
        .min(this.getCenter().x + this.getWidth() / 2.0 * (1.0 + ratio), PC_SCREEN_WIDTH_PX);
    double yy1 = Math.max(this.getCenter().y - this.getHeight() / 2.0 * (1.0 + ratio), 0.0);
    double yy2 = Math
        .min(this.getCenter().y + this.getHeight() / 2.0 * (1.0 + ratio), PC_SCREEN_HEIGHT_PX);
    return new Bounds(xx1, yy1, xx2, yy2);
  }

  public Position getRelativePos(Position pos) {
    Position center = getCenter();
    return new Position(center.x - pos.x, center.y - pos.y);
  }

  public Position getCenter() {
    return new Position((x2 + x1) / 2, (y1 + y2) / 2);
  }

  public Position getCenterWithOffset(Position pos) {
    return new Position((x2 + x1) / 2 - pos.x, (y2 + y1) / 2 - pos.y);
  }

  public boolean contains(Bounds bounds) {
    if (x1 > bounds.x1 || y1 > bounds.y1) {
      return false;
    }

    if (x2 < bounds.x2 || y2 < bounds.y2) {
      return false;
    }

    return true;
  }

  public boolean isInCurrentBounds(Position pos) {
    return pos.x >= x1 && pos.x <= x2 && pos.y >= y1 && pos.y <= y2;
  }

  public boolean isOverlap(Bounds bounds) {
    if (x1 > bounds.x2 || x2 < bounds.x1) {
      return false;
    }

    if (y1 > bounds.y2 || y2 < bounds.y1) {
      return false;
    }

    return true;
  }

  public double getWidth() {
    return Math.abs(x1 - x2);
  }

  public double getHeight() {
    return Math.abs(y1 - y2);
  }

  public double getX1() {
    return x1;
  }

  public double getY1() {
    return y1;
  }

  public double getX2() {
    return x2;
  }

  public double getY2() {
    return y2;
  }

  public double areaSize() {
    return Math.abs(x1 - x2) * Math.abs(y1 - y2);
  }

  public boolean isSimilarSize(Bounds bounds) {
    if (bounds.areaSize() < AREA_EPSILON) {
      return this.areaSize() < AREA_EPSILON;
    }
    return (Math.abs(bounds.areaSize() - areaSize()) / areaSize()) < SIMILAR_SIZE_THRESHOLD;
  }

  @Override
  public boolean equals(Object obj) {
    if (obj instanceof Bounds) {
      Bounds other = (Bounds) obj;
      return Double.compare(this.x1, other.x1) == 0
          && Double.compare(this.x2, other.x2) == 0
          && Double.compare(this.y1, other.y1) == 0
          && Double.compare(this.y2, other.y2) == 0;
    } else {
      return false;
    }
  }

  /** Check whether a bounds is too small. */
  public boolean isValidBoundsOnScreen(double xRatio, double yRatio) {
    double width = getWidth();
    double height = getHeight();
    boolean notTooSmall =
        width * xRatio >= VALID_BOUNDS_MIN_WIDTH_PX
            && height * yRatio >= VALID_BOUNDS_MIN_HEIGHT_PX;
    boolean notTooThin = (width > height ? width / height : height / width) < 20;
    return notTooSmall && notTooThin;
  }

  @Override
  public String toString() {
    return "bounds:[" + x1 + "," + y1 + "][" + x2 + "," + y2 + "], center:" + getCenter();
  }

  @Override
  public int hashCode() {
    return Objects.hash(x1, y1, x2, y2);
  }

  public Bounds getBoundsFromSearchType(ScreenContentSearchType screenContentSearchType) {
    if (screenContentSearchType == ScreenContentSearchType.AROUND
        || screenContentSearchType == ScreenContentSearchType.NEARBY_CONTEXT) {
      return getNearByBounds(BOUNDS_AROUND_RANGE_RATIO);
    } else if (screenContentSearchType == ScreenContentSearchType.FULLSCREEN
        || screenContentSearchType == ScreenContentSearchType.FULLSCREEN_CONTEXT) {
      return Bounds.getFullScreenBounds();
    } else {
      /** screenContentSearchType == ScreenContentSearchType.STRICT Do nothing */
      return new Bounds(x1, y1, x2, y2);
    }
  }

  public boolean onEdge() {
    return this.x1 == 0 || this.x2 == 0 || this.y1 == 0 || this.y2 == 0;
  }
}
