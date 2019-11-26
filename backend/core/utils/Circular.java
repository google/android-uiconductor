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

package com.google.uicd.backend.core.utils;

import com.fasterxml.jackson.annotation.JsonIgnore;

/** The circular shape of selected region on the UI for comparison */
public class Circular extends Region {

  private int centerX;
  private int centerY;
  private int radius;

  public Circular() {}

  public Circular(int centerX, int centerY, int radius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
  }

  public int getCenterX() {
    return centerX;
  }

  public void setCenterX(int centerX) {
    this.centerX = centerX;
  }

  public int getCenterY() {
    return centerY;
  }

  public void setCenterY(int centerY) {
    this.centerY = centerY;
  }

  public int getRadius() {
    return radius;
  }

  public void setRadius(int radius) {
    this.radius = radius;
  }

  @Override
  public boolean checkIfWithinBounds(int x, int y) {
    return Math.hypot(x - centerX, y - centerY) < radius;
  }

  @JsonIgnore
  @Override
  public Rectangular getBoundingBox() {
    return new Rectangular(centerX - radius, centerY - radius, radius * 2, radius * 2);
  }

  @JsonIgnore
  @Override
  public Region getOffsetRemovedRegion() {
    return new Circular(radius, radius, radius);
  }

  @JsonIgnore
  @Override
  public Region copy() {
    return new Circular(centerX, centerY, radius);
  }

  @JsonIgnore
  @Override
  public Region addOffset(int x, int y) {
    return new Circular(centerX + x, centerY + y, radius);
  }

  @JsonIgnore
  @Override
  public Region getScaledRegion(
      int hostScrnWidth, int hostScrnHeight, int devPhyWidth, int devPhyHeight) {
    int radiusEndX = centerX + radius;
    int scaledRadiusEndX = ImageUtil.scaleToTargetPx(radiusEndX, hostScrnWidth, devPhyWidth);
    int scaledCenterX = ImageUtil.scaleToTargetPx(centerX, hostScrnWidth, devPhyWidth);
    int scaledRadius = Math.abs(scaledRadiusEndX - scaledCenterX);
    int scaledCenterY = ImageUtil.scaleToTargetPx(centerY, hostScrnHeight, devPhyHeight);
    return new Circular(scaledCenterX, scaledCenterY, scaledRadius);
  }
}
