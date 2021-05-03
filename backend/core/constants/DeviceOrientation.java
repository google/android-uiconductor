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

/** Device orientation */
public enum DeviceOrientation {
  PORTRAIT("0"),
  LANDSCAPE("1");

  DeviceOrientation(String orientation) {
    this.orientation = orientation;
  }
  private final String orientation;

  public static DeviceOrientation fromOrientationCode(String orientation) {
    for (DeviceOrientation deviceOrientation : DeviceOrientation.values()) {
      if (deviceOrientation.getOrientation().equals(orientation)) {
        return deviceOrientation;
      }
    }
    return DeviceOrientation.PORTRAIT;
  }

  public String getOrientation() {
    return this.orientation;
  }
}
