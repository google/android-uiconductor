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

package com.google.uicd.backend.core.uicdactions;

import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayStatus;
import com.google.uicd.backend.core.utils.JsonUtil;
import com.google.uicd.backend.core.xmlparser.IPredicate;
import com.google.uicd.backend.core.xmlparser.NodeContext;
import com.google.uicd.backend.core.xmlparser.Query;
import com.google.uicd.backend.core.xmlparser.QueryField;
import com.google.uicd.backend.core.xmlparser.XmlParser;
import java.util.List;
import java.util.Optional;

/** Nested condition validation action for XML nodes */
public class ConditionValidationAction extends ValidationAction {
  private Query query;
  private boolean clickAfterValidation;

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateAction(baseAction);

    if (baseAction instanceof ConditionValidationAction) {
      ConditionValidationAction otherAction = (ConditionValidationAction) baseAction;
      this.query = otherAction.query;
      this.clickAfterValidation = otherAction.clickAfterValidation;
    }
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdException {
    // If clickAfterValidation is true, actually it is more like a advance condition click, we need
    // override the play action here.
    if (!clickAfterValidation) {
      return super.play(androidDeviceDriver, actionContext);
    } else {
      Optional<NodeContext> candidateNode = findNodeByCondition(actionContext, androidDeviceDriver);
      if (!candidateNode.isPresent()) {
        actionContext.updateTopPlayStatus(PlayStatus.SKIPPED);
        return 0;
      } else {
        androidDeviceDriver.clickDevice(candidateNode.get().getBounds().getCenter());
        actionContext.updateTopPlayStatus(PlayStatus.PASS);
      }
    }
    return 0;
  }


  @Override
  public String getDisplay() {
    return String.format("ConditionValidate:(%s)", this.stopType);
  }

  @Override
  boolean validateRaw(ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver) {
    Optional<NodeContext> candidateNode = findNodeByCondition(actionContext, androidDeviceDriver);
    return candidateNode.isPresent();
  }

  private Optional<NodeContext> findNodeByCondition(ActionContext actionContext,
      AndroidDeviceDriver androidDeviceDriver) {
    List<String> xmls = androidDeviceDriver.fetchCurrentXML();
    actionContext.setLastXmlDump(xmls);
    XmlParser xmlParser =
        new XmlParser(
            xmls, androidDeviceDriver.getWidthRatio(), androidDeviceDriver.getHeightRatio());
    Query expendedQuery = this.query.makeCopy();
    for (IPredicate predicate : expendedQuery.rules) {
      if (predicate instanceof QueryField) {
        QueryField queryField = (QueryField) predicate;
        queryField.setValue(
            actionContext.expandUicdGlobalVariable(
                queryField.getValue(), androidDeviceDriver.getDeviceId()));

        queryField.setField(
            actionContext.expandUicdGlobalVariable(
                queryField.getField(), androidDeviceDriver.getDeviceId()));
      }
    }
    return xmlParser.findNodeContextByQuery(expendedQuery);
  }

  @Override
  protected ActionExecutionResult genActionExecutionResults(AndroidDeviceDriver androidDeviceDriver,
      ActionContext actionContext) {
    ActionExecutionResult actionExecutionResult =
        super.genActionExecutionResults(androidDeviceDriver, actionContext);
    String logContent =
        String.format(
            "Validation Result: %b. %s Looking for %s, Can not find on xml.",
            this.validationResult,
            stopType,
            JsonUtil.toJson(this.query));

    actionExecutionResult.setRegularOutput(logContent);
    return actionExecutionResult;
  }

}
