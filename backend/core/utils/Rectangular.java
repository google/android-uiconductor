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

package com.google.uicd.backend.core.utils;

import com.fasterxml.jackson.annotation.JsonIgnore;

/** The rectangular shape of selected region on the UI for comparison */
public class Rectangular extends Region {

  // Origin represents top left vertex of the rectangle
  private int originX;
  private int originY;
  private int width;
  private int height;

  public Rectangular() {}

  public Rectangular(int originX, int originY, int width, int height) {
    this.originX = originX;
    this.originY = originY;
    this.width = width;
    this.height = height;
  }

  public int getOriginX() {
    return originX;
  }

  public void setOriginX(int originX) {
    this.originX = originX;
  }

  public int getOriginY() {
    return originY;
  }

  public void setOriginY(int originY) {
    this.originY = originY;
  }

  public int getWidth() {
    return width;
  }

  public void setWidth(int width) {
    this.width = width;
  }

  public int getHeight() {
    return height;
  }

  public void setHeight(int height) {
    this.height = height;
  }

  @Override
  public boolean checkIfWithinBounds(int x, int y) {
    return x >= originX && y >= originY && x <= originX + width && y <= originY + height;
  }

  @JsonIgnore
  @Override
  public Rectangular getBoundingBox() {
    return this;
  }

  @JsonIgnore
  @Override
  public Region getOffsetRemovedRegion() {
    return new Rectangular(0, 0, width, height);
  }

  @JsonIgnore
  @Override
  public Region copy() {
    return new Rectangular(originX, originY, width, height);
  }

  @JsonIgnore
  @Override
  public Region addOffset(int x, int y) {
    return new Rectangular(originX + x, originY + y, width, height);
  }

  @JsonIgnore
  @Override
  public Region getScaledRegion(
      int hostScrnWidth, int hostScrnHeight, int devPhyWidth, int devPhyHeight) {
    int widthEndX = originX + width;
    int heightEndY = originY + height;
    int scaledWidthEndX = ImageUtil.scaleToTargetPx(widthEndX, hostScrnWidth, devPhyWidth);
    int scaledOriginX = ImageUtil.scaleToTargetPx(originX, hostScrnWidth, devPhyWidth);
    int scaledWidth = Math.abs(scaledWidthEndX - scaledOriginX);
    int scaledHeightEndY = ImageUtil.scaleToTargetPx(heightEndY, hostScrnHeight, devPhyHeight);
    int scaledOriginY = ImageUtil.scaleToTargetPx(originY, hostScrnHeight, devPhyHeight);
    int scaledHeight = Math.abs(scaledHeightEndY - scaledOriginY);
    return new Rectangular(scaledOriginX, scaledOriginY, scaledWidth, scaledHeight);
  }
}
