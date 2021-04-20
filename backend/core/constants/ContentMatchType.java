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

/**
 * ContentMatchType, different type of content matching, used in screen content validation and log
 * content validation.
 */
public enum ContentMatchType {
  EQUALS("Equals"),
  EQUALS_CASE_SENSITIVE("EqualsCaseSensitive"),
  CONTAINS("Contains"),
  IS_ANY_OF("IsAnyOf"),
  REGEX("RegEx"),
  UDM("UserDefineMatch"),
  UNKNOWN("Unknown");

  ContentMatchType(String contentMatchTypeName) {
    this.contentMatchTypeName = contentMatchTypeName;
  }

  private final String contentMatchTypeName;

  @JsonCreator
  public static ContentMatchType fromString(String value) {
    for (ContentMatchType contentMatchType : ContentMatchType.values()) {
      if (contentMatchType.contentMatchTypeName.equalsIgnoreCase(value)
          || contentMatchType.toString().equalsIgnoreCase(value)) {
        return contentMatchType;
      }
    }
    return ContentMatchType.UNKNOWN;
  }

  public String getContentMatchType() {
    return contentMatchTypeName;
  }
}
