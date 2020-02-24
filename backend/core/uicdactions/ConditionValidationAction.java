// Copyright 2020 Google LLC
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
import com.google.uicd.backend.core.exceptions.UicdDeviceHttpConnectionResetException;
import com.google.uicd.backend.core.xmlparser.NodeContext;
import com.google.uicd.backend.core.xmlparser.Query;
import com.google.uicd.backend.core.xmlparser.XmlParser;
import java.util.List;
import java.util.Optional;

/** Nested condition validation action for XML nodes */
public class ConditionValidationAction extends ValidationAction {
  private Query query;

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateAction(baseAction);

    if (baseAction instanceof ConditionValidationAction) {
      ConditionValidationAction otherAction = (ConditionValidationAction) baseAction;
      this.query = otherAction.query;
    }
  }

  @Override
  public String getDisplay() {
    return String.format("ConditionValidate:(%s)", this.stopType);
  }

  @Override
  boolean validateRaw(ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver)
      throws UicdDeviceHttpConnectionResetException {
    List<String> xmls = androidDeviceDriver.fetchCurrentXML();
    XmlParser xmlParser =
        new XmlParser(
            xmls, androidDeviceDriver.getWidthRatio(), androidDeviceDriver.getHeightRatio());
    Optional<NodeContext> candidateNode = xmlParser.findNodeContextByQuery(this.query);
    return candidateNode.isPresent();
  }
}
