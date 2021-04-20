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

import com.google.common.base.Ascii;

/** Defines the type of region user can select */
public enum RegionType {

  // go/keep-sorted start
  CIRCULAR("CIRCULAR"),
  RECTANGULAR("RECTANGULAR"),
  UNKNOWN("Unknown");
  // go/keep-sorted end

  RegionType(String regionType) {
    this.regionType = regionType;
  }

  private final String regionType;

  public static RegionType fromString(String value) {
    for (RegionType regionType : RegionType.values()) {
      if (Ascii.equalsIgnoreCase(regionType.regionType, value)
          || Ascii.equalsIgnoreCase(regionType.toString(), value)) {
        return regionType;
      }
    }
    return RegionType.UNKNOWN;
  }

  public String getRegionType() {
    return regionType;
  }
}
