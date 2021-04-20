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

import static java.util.stream.Collectors.joining;

import com.google.auto.value.AutoValue;
import com.google.common.base.Splitter;
import java.util.List;

/**
 * UIDetector will print data in "left top right bottom text" sequence.
 */
@AutoValue
public abstract class UIDetectorOutputRecord {

  private static final int LEFT_INDEX = 0;
  private static final int TOP_INDEX = 1;
  private static final int RIGHT_INDEX = 2;
  private static final int BOTTOM_INDEX = 3;
  private static final int TEXT_INDEX = 4;
  private static final int TOTAL_COL_COUNT = 5;
  private static final String COMMA_SEPARATOR = ",";

  public abstract int left();
  public abstract int top();
  public abstract int right();
  public abstract int bottom();
  public abstract String text();

  public static UIDetectorOutputRecord create(String line) {
    List<String> splitLine = Splitter.on(COMMA_SEPARATOR).splitToList(line);
    if (splitLine.size() < TOTAL_COL_COUNT) {
      return null;
    }
    try {
      int left = Integer.parseInt(splitLine.get(LEFT_INDEX));
      int top = Integer.parseInt(splitLine.get(TOP_INDEX));
      int right = Integer.parseInt(splitLine.get(RIGHT_INDEX));
      int bottom = Integer.parseInt(splitLine.get(BOTTOM_INDEX));
      String text = splitLine.stream().skip(TEXT_INDEX).collect(joining(COMMA_SEPARATOR));
      return new AutoValue_UIDetectorOutputRecord(
          left, top, right, bottom, text);
    } catch (NumberFormatException ex) {
      return null;
    }
  }
}
