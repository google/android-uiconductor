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

import com.google.auto.value.AutoValue;
import com.google.common.base.Splitter;
import java.util.List;

/**
 * AdbForward
 */
@AutoValue
public abstract class AdbForward {

  public abstract String serialNumber();
  public abstract int port();
  public abstract String localAbstract();
  public abstract boolean isForward();

  public static AdbForward create(String serialNumber, int port, String localAbstract) {
    return new AutoValue_AdbForward(serialNumber, port, localAbstract, true);
  }

  public static AdbForward create(String str) {
    // proper input should look like:
    // 64b2b4d9 tcp:555 localabstract:xxx
    List<String> s = Splitter.on(' ').splitToList(str);
    boolean isForward = true;
    String serialNumber = "";
    String localAbstract = "";
    int port = 0;

    if (s.size() != 3) {
      isForward = false;
    } else {
      serialNumber = s.get(0);
      List<String> portStr = Splitter.on(':').splitToList(s.get(1));
      if (portStr.size() != 2) {
        isForward = false;
      } else {
        port = Integer.parseInt(portStr.get(1));
        List<String> localAbstractStr = Splitter.on(':').splitToList(s.get(2));
        if (localAbstractStr.size() != 2) {
          isForward = false;
        } else {
          localAbstract = localAbstractStr.get(1);
        }
      }
    }
    return new AutoValue_AdbForward(serialNumber, port, localAbstract, isForward);
  }
}
