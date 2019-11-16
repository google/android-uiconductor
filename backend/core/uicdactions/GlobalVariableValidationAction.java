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

package com.google.uicd.backend.core.uicdactions;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;
import static com.google.common.base.Strings.nullToEmpty;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.utils.UicdTypeConverter;
import org.apache.commons.jexl3.JexlBuilder;
import org.apache.commons.jexl3.JexlContext;
import org.apache.commons.jexl3.JexlEngine;
import org.apache.commons.jexl3.JexlExpression;
import org.apache.commons.jexl3.MapContext;

/**
 * GlobalVariableValidationAction validate the expression provided by user. It provides the
 * flexibility for user to do advanced operations. One example will be use command line action to
 * run external command, based on the return value we want to decided whether should retry or not.
 */
@JsonAutoDetect(
    fieldVisibility = ANY,
    getterVisibility = NONE,
    setterVisibility = NONE,
    isGetterVisibility = NONE)
public class GlobalVariableValidationAction extends ValidationAction {

  private static final String TYPE_CONVERTER_OBJ_KEYWORD = "uicdTypeConverter";
  protected String expression;

  @JsonIgnore String displayStr;

  @Override
  public String getDisplay() {
    return "Global Variable Validation Action " + nullToEmpty(this.expression);
  }

  @Override
  boolean validateRaw(ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver) {
    // Create or retrieve an engine
    JexlEngine jexl = new JexlBuilder().create();

    // Create an expression
    JexlExpression e = jexl.createExpression(expression);

    JexlContext jc = new MapContext();

    // To use advanced expression, need a converter to do the trick, the expression will be like
    // "uicdTypeConverter.toInt($uicd_var1) + uicdTypeConverter.toInt($uicd_var2)";
    if (expression.contains(TYPE_CONVERTER_OBJ_KEYWORD)) {
      jc.set(TYPE_CONVERTER_OBJ_KEYWORD, new UicdTypeConverter());
    }
    // Create a context and add data
    // jc.set("$uicd_var1", new String("adbcd"));
    // Set the displayStr so that we can see the result in the test details.
    displayStr = expandUicdGlobalVariableToJexl(expression, jc, actionContext);

    // Now evaluate the expression, getting the result
    boolean ret = false;
    try {
      Object o = e.evaluate(jc);
      ret = Boolean.parseBoolean(o.toString());
    } catch (Exception ex) {
      System.out.println(ex.getMessage());
    }
    displayStr = String.format("%s|validation result:%s", displayStr, ret);
    return ret;
  }

  private String expandUicdGlobalVariableToJexl(
      String jexlExp, JexlContext jc, ActionContext actionContext) {
    StringBuilder sb = new StringBuilder();
    // target could have multiple "$uicd_", we need replace all of them
    for (String key : actionContext.getGlobalVariableMap().getRawMap().keySet()) {
      if (jexlExp.contains(key)) {
        jc.set(key, actionContext.getGlobalVariableMap().getRawValue(key));
        sb.append(
            String.format("%s:%s|", key, actionContext.getGlobalVariableMap().getRawValue(key)));
      }
    }
    return sb.toString();
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateAction(baseAction);

    if (baseAction instanceof GlobalVariableValidationAction) {
      GlobalVariableValidationAction otherAction = (GlobalVariableValidationAction) baseAction;
      this.expression = otherAction.expression;
    }
  }
}
