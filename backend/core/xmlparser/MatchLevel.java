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

package com.google.uicd.backend.core.xmlparser;

/**
 * MatchLevel
 * Content Match level
 */
public enum MatchLevel {
  UNKNOWN(0), NOT_MATCH(1), LOW_MATCH(2), HIGH_MATCH(3), FULL_MATCH(4);

  MatchLevel(int i) {
    val = i;
  }
  private final int val;

  public static MatchLevel fromVal(int i) {
    switch (i) {
      case 1:
        return NOT_MATCH;
      case 2:
        return LOW_MATCH;
      case 3:
        return HIGH_MATCH;
      case 4:
        return FULL_MATCH;
      case 0:
      default:
        return UNKNOWN;
    }
  }

  public static MatchLevel getLowerLevel(MatchLevel matchLevel) {
    int val = Math.max(matchLevel.getVal() - 1, 1);
    return fromVal(val);
  }

  public static MatchLevel getHigherLevel(MatchLevel matchLevel) {
    int val = Math.min(matchLevel.getVal() + 1, 4);
    return fromVal(val);
  }

  public int getVal() {
    return val;
  }
}
