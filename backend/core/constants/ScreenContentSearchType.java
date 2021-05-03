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

/** ScreenContentSearchType */
public enum ScreenContentSearchType {
  STRICT("Strict"),
  AROUND("Around"),
  FULLSCREEN("FullScreen"),
  NEARBY_CONTEXT("NearbyContext"),
  FULLSCREEN_CONTEXT("FullScreenContext"),
  UNKNOWN("Unknown");

  ScreenContentSearchType(String screenContentSearchType) {
    this.screenContentSearchType = screenContentSearchType;
  }

  private final String screenContentSearchType;

  @JsonCreator
  public static ScreenContentSearchType fromString(String value) {
    for (ScreenContentSearchType screenContentSearchType : ScreenContentSearchType.values()) {
      if (screenContentSearchType.screenContentSearchType.equalsIgnoreCase(value)
          || screenContentSearchType.toString().equalsIgnoreCase(value)) {
        return screenContentSearchType;
      }
    }
    return ScreenContentSearchType.UNKNOWN;
  }

  public String getSearchContentType() {
    return screenContentSearchType;
  }
}
