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

/** Indicates different strategy of selecting UI element */
public enum ElementSelectorType {
  RESOURCE_ID("resourceid"),
  DISPLAY_TEXT("displayText"),
  CHECK("checked"),
  UNKNOWN("Unknown");

  ElementSelectorType(String elementSelectorTypeStr) {
    this.elementSelectorTypeStr = elementSelectorTypeStr;
  }

  private final String elementSelectorTypeStr;

  @JsonCreator
  public static ElementSelectorType fromString(String value) {
    for (ElementSelectorType elementSelectorType : ElementSelectorType.values()) {
      if (elementSelectorType.elementSelectorTypeStr.equalsIgnoreCase(value)
          || elementSelectorType.toString().equals(value)) {
        return elementSelectorType;
      }
    }
    return ElementSelectorType.UNKNOWN;
  }

}
