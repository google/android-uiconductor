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

package com.google.uicd.backend.controllers.responses;

import com.google.auto.value.AutoValue;
import com.google.uicd.backend.core.devicesdriver.DeviceStatus;
import java.util.List;

/** Contains details information of connected devices */
@AutoValue
public abstract class DevicesStatusResponse {
  public abstract List<DeviceStatus> getDeviceStatusList();

  public static DevicesStatusResponse create(List<DeviceStatus> deviceStatusList) {
    return new AutoValue_DevicesStatusResponse(deviceStatusList);
  }

}
