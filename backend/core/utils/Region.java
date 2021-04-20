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


import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

/** The shape of selected region on the UI for comparison */
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
  @JsonSubTypes.Type(value = Circular.class, name = "CIRCULAR"),
  @JsonSubTypes.Type(value = Rectangular.class, name = "RECTANGULAR")
})
public abstract class Region {

  public Region() {
    this.setType(RegionType.fromString(this.getClass().getSimpleName()));
  }

  private RegionType type;

  // Checks if given pixel coordinates are within the bounds of current region
  public abstract boolean checkIfWithinBounds(int x, int y);

  // Returns the dimensions for the rectangle that bounds the current region
  public abstract Rectangular getBoundingBox();

  // Removes the offset of the region and return origin based dimensions
  public abstract Region getOffsetRemovedRegion();

  public abstract Region copy();

  // Adds offset to the region
  public abstract Region addOffset(int x, int y);

  public abstract Region getScaledRegion(
      int hostScrnWidth, int hostScrnHeight, int devPhyWidth, int devPhyHeight);

  public RegionType getType() {
    return type;
  }

  public void setType(RegionType type) {
    this.type = type;
  }
}
