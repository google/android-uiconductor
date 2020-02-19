// Copyright 2019 Google LLC
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

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.google.uicd.backend.core.constants.ContentMatchType;
import java.util.Arrays;
import java.util.List;

/** TextValidator Base class for the validation related class */
@JsonAutoDetect(fieldVisibility = ANY, getterVisibility = NONE, setterVisibility = NONE)
public class TextValidator {

  public TextValidator() {}

  public TextValidator(String patternValue, ContentMatchType contentMatchType) {
    this.setPatternValue(patternValue);
    this.contentMatchType = contentMatchType;
  }

  private ContentMatchType contentMatchType;
  private String patternValue;

  public String getValidatorDetails() {
    return "Type:" + contentMatchType + ", pattern value:" + getPatternValue();
  }

  public boolean isMatch(String srcValue) {
    List<String> srcValues = Arrays.asList(srcValue);
    return isMatch(srcValues);
  }

  public boolean isMatch(List<String> srcValues) {
    if (srcValues.isEmpty()) {
      return false;
    }
    switch (contentMatchType) {
      case EQUALS:
        return getPatternValue().equalsIgnoreCase(srcValues.get(0));
      case EQUALS_CASE_SENSITIVE:
        return getPatternValue().equals(srcValues.get(0));
      case CONTAINS:
        return srcValues
            .stream()
            .anyMatch(str -> str.trim().toLowerCase().contains(getPatternValue().toLowerCase()));
      case IS_ANY_OF:
        // patternValue should be list of string, to make it simple, the input will be string
        // separated by comma
        List<String> myList = Arrays.asList(getPatternValue().split(","));
        return myList.stream().anyMatch(str -> str.trim().equalsIgnoreCase(srcValues.get(0)));
      case REGEX:
        return srcValues.get(0).matches(getPatternValue());
      case UDM:
        return false;
      default:
        return false;
    }
  }

  public String getPatternValue() {
    return patternValue;
  }

  public void setPatternValue(String patternValue) {
    this.patternValue = patternValue;
  }

  public ContentMatchType getContentMatchType() {
    return contentMatchType;
  }
}
