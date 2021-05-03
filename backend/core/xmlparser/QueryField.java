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

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

/** QueryField represents single atomic predicate that can be evaluated on a NodeContext */
@JsonAutoDetect(
    fieldVisibility = ANY,
    getterVisibility = NONE,
    setterVisibility = NONE,
    isGetterVisibility = NONE)
public class QueryField implements IPredicate {
  public static final String EQUALS = "=";
  public static final String NOT_EQUALS = "!=";
  public static final String CONTAINS = "contains";

  private String field;
  private final String operator;
  private String value;

  QueryField(String field, String operator, String value) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  QueryField makeCopy() {
    return new QueryField(this.field, this.operator, this.value);
  }

  private boolean evalString(String realValue) {
    switch (operator) {
      case EQUALS:
        return value.equals(realValue);
      case NOT_EQUALS:
        return !value.equals(realValue);
      case CONTAINS:
        return realValue.contains(value);
      default:
        return false;
    }
  }

  private boolean evalBoolean(boolean realValue) {
    return Boolean.parseBoolean(value) == realValue;
  }

  @Override
  public boolean eval(NodeContext nodeContext) {
    switch (field) {
      case "text":
        return evalString(nodeContext.getText());
      case "class":
        return evalString(nodeContext.getClassName());
      case "contentDesc":
        return evalString(nodeContext.getContentDesc());
      case "resourceId":
        return evalString(nodeContext.getResourceId());
      case "checkable":
        return evalBoolean(nodeContext.isCheckableNode());
      case "checked":
        return evalBoolean(nodeContext.isChecked());
      case "clickable":
        return evalBoolean(nodeContext.isClickableNode());
      case "enabled":
        return evalBoolean(nodeContext.isEnabled());
      default:
        return false;
    }
  }

  public String getField() {
    return field;
  }

  public String getValue() {
    return value;
  }

  public void setField(String field) {
    this.field = field;
  }

  public void setValue(String value) {
    this.value = value;
  }
}
