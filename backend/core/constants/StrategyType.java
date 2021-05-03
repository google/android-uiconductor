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

/**
 * StrategyType, id and xpath should match the types here:
 * https://github.com/appium/appium-uiautomator2-server/blob/master/app/src/main/java/io/appium/uiautomator2/model/internal/NativeAndroidBySelector.java
 */
public enum StrategyType {
  POSITION("Position"),
  RESOURCEID("id"),
  XPATH("XPath"),
  TEXT("text"),
  TEXT_EQUALS("text_equals"),
  UNKNOWN("Unknown");

  StrategyType(String strategyTypeName) {
    this.strategyTypeName = strategyTypeName;
  }

  private final String strategyTypeName;

  @JsonCreator
  public static StrategyType fromString(String value) {
    for (StrategyType strategyType : StrategyType.values()) {
      if (strategyType.strategyTypeName.toLowerCase().equalsIgnoreCase(value.toLowerCase())
          || strategyType.toString().equalsIgnoreCase(value)) {
        return strategyType;
      }
    }
    return StrategyType.UNKNOWN;
  }

  public String getStrategyTypeName() {
    return strategyTypeName;
  }
}
