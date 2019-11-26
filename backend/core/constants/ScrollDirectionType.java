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

package com.google.uicd.backend.core.constants;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * other enum, need have a Santinizer to make sure old action still works
 */
public enum ScrollDirectionType {
  UNKNOWN, // frontend start the direction from 1, existing test case in db also store "UP" as 1.
  UP,
  DOWN,
  LEFT,
  RIGHT;

  @JsonValue
  public int toValue() {
    return ordinal();
  }

  @JsonCreator
  public static ScrollDirectionType fromInt(int val) {
    ScrollDirectionType[] values = values();
    return values[val];
  }
}
