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

import com.google.common.base.Splitter;
import java.util.List;

/**
 * Helper class for processing string
 */
public class StringUtil {

  public static String getPartFromString(String source, String separator, int partIndex) {
    return getPartFromString(source, separator, partIndex, "");
  }

  public static String getPartFromString(String source, String separator,
      int partIndex, String defaultValue) {
    List<String> strings = Splitter.on(separator).splitToList(source);
    return partIndex >= strings.size() || partIndex < 0 ? defaultValue : strings.get(partIndex);
  }
}
