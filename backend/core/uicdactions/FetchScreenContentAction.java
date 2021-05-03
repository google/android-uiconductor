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

import com.google.uicd.backend.core.constants.ContentMatchType;
import com.google.uicd.backend.core.constants.StrategyType;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.globalvariables.UicdGlobalVariableMap;
import com.google.uicd.backend.core.xmlparser.Bounds;
import com.google.uicd.backend.core.xmlparser.NodeContext;
import com.google.uicd.backend.core.xmlparser.TextValidator;
import com.google.uicd.backend.core.xmlparser.XmlHelper;
import com.google.uicd.backend.core.xmlparser.XmlParser;
import java.util.List;
import java.util.Optional;

/**
 * FetchScreenContentAction Action to fetch content from screen and save to the global variable map.
 */
public class FetchScreenContentAction extends BaseAction {

  private static final int DISTANCE_THRESHOLD = 100;
  private StrategyType strategy;
  private String selector;
  private String globalVariableName;
  private String attributeType;
  private Bounds bounds;
  private boolean isExportField;

  @Override
  public String getDisplay() {
    return String.format("Set %s", globalVariableName);
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);
    if (baseAction instanceof FetchScreenContentAction) {
      FetchScreenContentAction otherAction = (FetchScreenContentAction) baseAction;
      this.strategy = otherAction.strategy;
      this.selector = otherAction.selector;
      this.globalVariableName = otherAction.globalVariableName;
      this.attributeType = otherAction.attributeType;
    }
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    String screenContent = "";
    if (strategy == StrategyType.XPATH) {
      screenContent =
          androidDeviceDriver.getElementAttributeBySelector(
              androidDeviceDriver.fetchCurrentXML(true), strategy, selector, attributeType);
    } else {
      List<String> xmls = androidDeviceDriver.fetchCurrentXML();
      Optional<NodeContext> nodeContext = Optional.empty();
      if (strategy == StrategyType.RESOURCEID) {
        XmlParser xmlParser =
            new XmlParser(
                xmls, androidDeviceDriver.getWidthRatio(), androidDeviceDriver.getHeightRatio());

        // Ideally FetchScreenContentAction should be the same as ScreenContentValidationAction,
        // user can specify different mode of matching(equals, contains etc). however it will be
        // a little bit challege to implement the UI and it is also too complicated for user.
        // only support basic equals for now.
        TextValidator localTextValidator = new TextValidator(selector, ContentMatchType.EQUALS);
        nodeContext =
            xmlParser.findNodeContextByResourceIdAndBounds(
                localTextValidator, bounds, DISTANCE_THRESHOLD);
      } else if (strategy == StrategyType.POSITION) {
        nodeContext =
            Optional.ofNullable(
                XmlHelper.getContextFromBound(
                        xmls,
                        bounds,
                        androidDeviceDriver.getWidthRatio(),
                        androidDeviceDriver.getHeightRatio())
                    .getLeafNodeContext());
      }
      if (!nodeContext.isPresent()) {
        logger.warning(String.format("Cannot find nodeContext in Bounds(%s)", selector));
      } else {
        // We don't need get by type, since the text on UI popup is actually from getFirstText.
        // Using uicd's engine, we don't need worry about where display text is from.
        screenContent = nodeContext.get().getFirstText();
      }
    }
    if (globalVariableName.isEmpty()
        || !UicdGlobalVariableMap.containsGlobalVariableKeyWord(globalVariableName)) {
      logger.warning(
          String.format(
              "Variable name should be not empty and start with %s",
              String.join(" or ", UicdGlobalVariableMap.PARAM_KEYWORD_LIST)));
    } else if (screenContent.isEmpty()) {
      logger.warning("screenContent is empty!");
    } else {
      actionContext
          .getGlobalVariableMap()
          .addVariable(globalVariableName, screenContent, isExportField);
      logger.info(String.format("Set globalVariable(%s=%s)", globalVariableName, screenContent));
    }
    return 0;
  }
}
