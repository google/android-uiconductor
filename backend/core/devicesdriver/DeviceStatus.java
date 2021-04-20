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

package com.google.uicd.backend.core.devicesdriver;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.google.auto.value.AutoValue;

/** DeviceStatus for pass device details information to frontend, such as device minicap port etc */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@AutoValue
public abstract class DeviceStatus {
  public static DeviceStatus create(
      String deviceId,
      int minicapPort,
      int index,
      String status,
      int physicalWidth,
      int physicalHeight) {
    return new AutoValue_DeviceStatus(
        deviceId, minicapPort, index, status, physicalWidth, physicalHeight);
  }

  public abstract String deviceId();

  public abstract int minicapPort();

  public abstract int index();

  public abstract String status();

  public abstract int physicalWidth();

  public abstract int physicalHeight();
}
