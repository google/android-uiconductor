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

package com.google.uicd.backend.core.xmlparser;

/**
 * Describes how well two NodeContexts match each other
 */
public class MatchResult {

  public MatchLevel resourceIdMatchResult = MatchLevel.UNKNOWN;
  public MatchLevel textAndContentMatchResult = MatchLevel.UNKNOWN;
  public MatchLevel childrenMatchResult = MatchLevel.UNKNOWN;
  public MatchLevel sizeMatchResult = MatchLevel.UNKNOWN;

  public int matchNodeCnt = 0;

  public static MatchLevel matchTwoString(String src, String target) {
    if (src == null && target == null) {
      return MatchLevel.UNKNOWN;
    }

    if (src.length() == 0 && target.length() == 0) {
      return MatchLevel.UNKNOWN;
    }

    // one has id or text, the other one doesn't
    // we should give a low score, but should higher than "not_match" since could be old version the
    // id/text is missing.
    if (src == null || target == null) {
      return MatchLevel.LOW_MATCH;
    }

    if (src.length() == 0 || target.length() == 0) {
      return MatchLevel.LOW_MATCH;
    }

    if (src.trim().equals(target.trim())) {
      return MatchLevel.FULL_MATCH;
    }
    return MatchLevel.NOT_MATCH;
  }

  public MatchLevel getFinalResult() {
    MatchLevel textChildrenResult =
        combineMatchLevel(childrenMatchResult, textAndContentMatchResult);
    MatchLevel contentMatchResult = combineMatchLevel(textChildrenResult, resourceIdMatchResult);
    if (sizeMatchResult == MatchLevel.FULL_MATCH) {
      return contentMatchResult;
    } else {
      return MatchLevel.getLowerLevel(contentMatchResult);
    }
  }

  private MatchLevel combineMatchLevel(MatchLevel m1, MatchLevel m2) {
    if (m1 == MatchLevel.UNKNOWN) {
      return m2;
    }

    if (m2 == MatchLevel.UNKNOWN) {
      return m1;
    }

    return MatchLevel.fromVal((m1.getVal() + m2.getVal()) / 2);
  }
}
