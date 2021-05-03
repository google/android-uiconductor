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

package com.google.uicd.backend.core.constants;

import com.fasterxml.jackson.annotation.JsonCreator;

/** Uicd StopType enum for Validation Action */
public enum StopType {
  STOP_TEST_IF_FALSE("StopTestIfFalse"),
  STOP_TEST_IF_TRUE("StopTestIfTrue"),
  STOP_CURRENT_COMPOUND_IF_FALSE("StopCurrentCompoundIfFalse"),
  STOP_CURRENT_COMPOUND_IF_TRUE("StopCurrentCompoundIfTrue"),
  UNKNOWN("Unknown");

  StopType(String stopTypeStr) {
    this.stopTypeStr = stopTypeStr;
  }

  private final String stopTypeStr;

  @JsonCreator
  public static StopType fromString(String value) {
    for (StopType stopType : StopType.values()) {
      if (stopType.stopTypeStr.equalsIgnoreCase(value)
          || stopType.toString().equalsIgnoreCase(value)) {
        return stopType;
      }
    }
    return StopType.UNKNOWN;
  }
}
