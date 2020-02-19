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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Objects;

/**
 * Represents a position in UI streaming
 */
@JsonAutoDetect(fieldVisibility = ANY, getterVisibility = NONE, setterVisibility = NONE)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Position {

  public Position() {
  }
  public Position(double x, double y) {
    this.x = x;
    this.y = y;
  }

  public Position(Position pos) {
    this.x = pos.x;
    this.y = pos.y;
  }

  public int confidentLevel = 2;
  public double x;
  public double y;

  public double getDistance(Position pos) {
    double xDiff = this.x - pos.x;
    double yDiff = this.y - pos.y;
    return Math.hypot(xDiff, yDiff);
  }

  public Position getOffSetPosition(Position pos) {
    return new Position(this.x - pos.x, this.y - pos.y);
  }

  public boolean isValidPos() {
    return x > 0 && y > 0;
  }

  @Override
  public String toString() {
    return "(x:" + x + "," + y + ")";
  }

  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof Position)) {
      return false;
    }
    Position pos = (Position) obj;
    return Double.compare(this.x, pos.x) == 0 && Double.compare(this.y, pos.y) == 0;
  }

  @Override
  public int hashCode() {
    return Objects.hash(x, y);
  }
}
