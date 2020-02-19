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

/** Icon images trained for validation. */
public enum IconImageType {
  BLUE_DOT("BLUE_DOT"),
  UNKNOWN("Unknown");

  private final String iconImageType;

  IconImageType(String iconImageType) {
    this.iconImageType = iconImageType;
  }

  @JsonCreator
  public static IconImageType fromString(String value) {
    for (IconImageType iconImageType : IconImageType.values()) {
      if (iconImageType.iconImageType.equalsIgnoreCase(value)
          || iconImageType.toString().equalsIgnoreCase(value)) {
        return iconImageType;
      }
    }
    return IconImageType.UNKNOWN;
  }
}
