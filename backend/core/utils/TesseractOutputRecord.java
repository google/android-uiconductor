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
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * tsv format will have the following header
 * level page_num block_num par_num line_num word_num left top width height conf text
 */
@AutoValue
public abstract class TesseractOutputRecord {

  private static final int PAGENUM_INDEX = 1;
  private static final int BLOCKNUM_INDEX = 2;
  private static final int PARNUM_INDEX = 3;
  private static final int LINENUM_INDEX = 4;

  private static final int LEFT_INDEX = 6;
  private static final int TOP_INDEX = 7;
  private static final int WIDTH_INDEX = 8;
  private static final int HEIGHT_INDEX = 9;
  private static final int TEXT_INDEX = 11;
  private static final int TOTAL_COL_COUNT = 12;
  private static final String COMMA_SEPARATOR = ",";

  public abstract int pageNum();
  public abstract int blockNum();
  public abstract int parNum();
  public abstract int lineNum();
  public abstract int left();
  public abstract int top();
  public abstract int width();
  public abstract int height();
  public abstract String text();

  public static TesseractOutputRecord create(String line) {
    List<String> splitLine = Splitter.on('\t').splitToList(line);
    if (splitLine.size() != TOTAL_COL_COUNT) {
      return null;
    }
    try {
      int pageNum = Integer.parseInt(splitLine.get(PAGENUM_INDEX));
      int blockNum = Integer.parseInt(splitLine.get(BLOCKNUM_INDEX));
      int parNum = Integer.parseInt(splitLine.get(PARNUM_INDEX));
      int lineNum = Integer.parseInt(splitLine.get(LINENUM_INDEX));

      int left = Integer.parseInt(splitLine.get(LEFT_INDEX));
      int top = Integer.parseInt(splitLine.get(TOP_INDEX));
      int width = Integer.parseInt(splitLine.get(WIDTH_INDEX));
      int height = Integer.parseInt(splitLine.get(HEIGHT_INDEX));
      String text = splitLine.get(TEXT_INDEX);
      return new AutoValue_TesseractOutputRecord(
          pageNum, blockNum, parNum, lineNum, left, top, width, height, text);
    } catch (NumberFormatException ex) {
      return null;
    }
  }

  public String getLogicBlockKey() {
     List<Integer> arr = Arrays.asList(pageNum(), blockNum(), parNum(), lineNum());
     return arr.stream().map(String::valueOf).collect(Collectors.joining(COMMA_SEPARATOR));
  }
}
