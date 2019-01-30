// Copyright 2018 Google LLC
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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.uicd.backend.core.constants.ContentMatchType;
import com.google.uicd.backend.core.constants.ScreenContentSearchType;
import com.google.uicd.backend.core.constants.StopType;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdDeviceHttpConnectionResetException;
import com.google.uicd.backend.core.exceptions.UicdXMLFormatException;
import com.google.uicd.backend.core.uicdactions.jsondbignores.BaseSantinizer.ScreenContentValidationActionSantinizer;
import com.google.uicd.backend.core.xmlparser.Bounds;
import com.google.uicd.backend.core.xmlparser.NodeContext;
import com.google.uicd.backend.core.xmlparser.TextValidator;
import com.google.uicd.backend.core.xmlparser.XmlHelper;
import com.google.uicd.backend.core.xmlparser.XmlParser;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Optional;

/** ScreenContentValidationAction */
@JsonDeserialize(converter = ScreenContentValidationActionSantinizer.class)
public class ScreenContentValidationAction extends ValidationAction {

  public static final String VALIDATE_TYPE_RESOURCE_ID = "resourceid";
  public static final String VALIDATE_TYPE_TEXT = "displayText";
  public static final String VALIDATE_TYPE_CHECKED = "checked";
  protected String selectedText;
  protected String selectedType;
  @JsonIgnore protected NodeContext foundNodeContext;
  @JsonIgnore protected String validateInfo;
  private Bounds selectedBound;
  // advanced search
  protected NodeContext savedNodeContext;
  private ScreenContentSearchType screenContentSearchType;

  public ScreenContentValidationAction() {}

  public ScreenContentValidationAction(
      Bounds selectedBound,
      String type,
      String value,
      String textMatchType,
      String boundsSearchType,
      NodeContext nodeContext,
      StopType stopType) {
    this.selectedBound = selectedBound;
    this.selectedType = type;
    this.stopType = stopType;
    this.screenContentSearchType = ScreenContentSearchType.fromString(boundsSearchType);
    this.setName(this.getClass().getSimpleName());
    try {
      this.selectedText = URLDecoder.decode(value, "UTF-8");
      if (nodeContext == null) {
        // text only mode
        TextValidator textValidator =
            new TextValidator(this.selectedText, ContentMatchType.fromString(textMatchType));
        this.setTextValidator(textValidator);
      } else {
        this.savedNodeContext = nodeContext;
      }

    } catch (UnsupportedEncodingException e) {
      logger.warning(e.getMessage());
    }
  }

  protected void clear() {
    foundNodeContext = new NodeContext();
  }

  @Override
  public String getDisplay() {
    return String.format("Screen Validate:(%s)", selectedText)
        + String.format("Stop Type:" + this.stopType);
  }

  public NodeContext getContextFromBounds(AndroidDeviceDriver androidDeviceDriver)
      throws UicdXMLFormatException, UicdDeviceHttpConnectionResetException {
    List<String> xmls = androidDeviceDriver.fetchCurrentXML();
    Bounds bounds = selectedBound.getBoundsFromSearchType(screenContentSearchType);
    return XmlHelper.getContextFromBound(
        xmls, bounds, androidDeviceDriver.getWidthRatio(), androidDeviceDriver.getHeightRatio());
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateBaseAction(baseAction);

    if (baseAction instanceof ScreenContentValidationAction) {
      ScreenContentValidationAction otherAction = (ScreenContentValidationAction) baseAction;
      this.selectedText = otherAction.selectedText;
      this.selectedType = otherAction.selectedType;
      this.stopType = otherAction.stopType;
      this.screenContentSearchType = otherAction.screenContentSearchType;
      this.textValidator.setPatternValue(this.selectedText);
    }
  }

  public Bounds getSelectedBound() {
    return selectedBound;
  }

  public void setSelectedBound(Bounds selectedBound) {
    this.selectedBound = selectedBound;
  }

  public String getSelectedText() {
    return selectedText;
  }

  public void setSelectedText(String selectedText) {
    this.selectedText = selectedText;
  }

  // TODO  need change the content from nearby
  @Override
  public boolean validateRaw(ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver)
      throws UicdDeviceHttpConnectionResetException {
    List<String> xmls = androidDeviceDriver.fetchCurrentXML();
    String targetText =
        actionContext.expandUicdGlobalVariable(
            this.selectedText, androidDeviceDriver.getDeviceId());
    if (this.textValidator == null) {
      createDefaultTextValidator();
    }
    // Create a copy of textValidator, so that it won't change the original one,
    // we should only "expand the variable when the actionContext exists.
    TextValidator localTextValidator =
        new TextValidator(
            actionContext.expandUicdGlobalVariable(
                this.textValidator.getPatternValue(), androidDeviceDriver.getDeviceId()),
            this.textValidator.getContentMatchType());
    // first we validate content
    if (savedNodeContext == null) {

      XmlParser xmlParser =
          new XmlParser(
              xmls, androidDeviceDriver.getWidthRatio(), androidDeviceDriver.getHeightRatio());
      Optional<NodeContext> candidateNode = Optional.empty();
      int distanceThreshold = getDistanceThreshold(androidDeviceDriver);
      if (selectedType.equalsIgnoreCase(VALIDATE_TYPE_RESOURCE_ID)) {
        candidateNode =
            xmlParser.findNodeContextByResourceIdAndBounds(
                localTextValidator, this.selectedBound, distanceThreshold);

      } else if (selectedType.equalsIgnoreCase(VALIDATE_TYPE_TEXT)) {

        candidateNode =
            xmlParser.findNodeContextByTextValidatorAndBounds(
                localTextValidator, this.selectedBound, distanceThreshold);
      }

      if (!candidateNode.isPresent()) {
        return false;

      } else {
        foundNodeContext = candidateNode.get();
      }

    } else {
      foundNodeContext =
          XmlHelper.getMatchNodeContent(
              xmls,
              this.savedNodeContext,
              androidDeviceDriver.getWidthRatio(),
              androidDeviceDriver.getHeightRatio());

      if (foundNodeContext == null) {
        return false;
      }

      if (savedNodeContext.getLeafNodeContext() != null) {
        if (foundNodeContext.getLeafNodeContext() == null) {
          return false;
        }
        if (!savedNodeContext
            .getLeafNodeContext()
            .getFirstText()
            .equalsIgnoreCase(foundNodeContext.getLeafNodeContext().getFirstText())) {
          return false;
        }
      }
      if (selectedType.equalsIgnoreCase(VALIDATE_TYPE_CHECKED)) {
        if (foundNodeContext.findNodeByCheckStatus(Boolean.parseBoolean(targetText)) == null) {
          return false;
        }
      } else if (foundNodeContext.findNodeByText(targetText) == null) {
        return false;
      }
    }

    // simple mode,  we can also verify the location
    if (savedNodeContext == null) {
      int distanceThreshold = getDistanceThreshold(androidDeviceDriver);
      if (foundNodeContext.getBounds().getCenter().getDistance(selectedBound.getCenter())
          > distanceThreshold) {
        return false;
      }
    }

    return true;
  }

  private int getDistanceThreshold(AndroidDeviceDriver androidDeviceDriver) {
    int distanceThreshold = 0;
    if (screenContentSearchType == ScreenContentSearchType.AROUND) {
      distanceThreshold = (int) (300 / androidDeviceDriver.getHeightRatio());
    } else if (screenContentSearchType == ScreenContentSearchType.STRICT) {
      distanceThreshold = (int) (100 / androidDeviceDriver.getHeightRatio());
    } else {
      distanceThreshold = (int) (10000 / androidDeviceDriver.getHeightRatio());
    }
    return distanceThreshold;
  }

  @Override
  protected ActionExecutionResult genActionExecutionResults(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    ActionExecutionResult actionExecutionResult = new ActionExecutionResult();

    String targetText;
    if (savedNodeContext != null) {
      targetText = savedNodeContext.getDisplayEstimate();
    } else {
      targetText = selectedText;
    }

    String foundsText = "";
    String logContent = "";

    if (selectedType.equalsIgnoreCase(VALIDATE_TYPE_RESOURCE_ID)) {
      foundsText = foundNodeContext == null ? "unknown" : foundNodeContext.getResourceId();
    } else {
      foundsText = foundNodeContext == null ? "unknown" : foundNodeContext.getDisplayEstimate();
    }
    logContent =
        String.format(
            "Validation Result: %b. StopType: %s. Looking for %s: %s of %s, found node: %s,",
            this.validationResult,
            this.stopType,
            selectedType,
            selectedText,
            targetText,
            foundsText);
    actionExecutionResult.setRegularOutput(logContent);
    actionExecutionResult.setActionId(this.getActionId().toString());
    actionExecutionResult.setPlayStatus(this.playStatus);
    return actionExecutionResult;
  }

  private boolean validateTextInTree(NodeContext nodeContext) {
    String xmlText = "";
    switch (selectedType) {
      case "resourceId":
        xmlText = nodeContext.getResourceId();
        break;
      case "checked":
        xmlText = Boolean.toString(nodeContext.isChecked());
        break;
      case "displayText":
        xmlText = nodeContext.getDisplayEstimate();
        break;
      default:
        // fall through
    }
    if (this.getTextValidator().isMatch(xmlText)) {
      return true;
    }

    for (NodeContext child : nodeContext.getChildren()) {
      if (validateTextInTree(child)) {
        return true;
      }
    }
    return false;
  }

  private void createDefaultTextValidator() {
    TextValidator textValidator =
        new TextValidator(this.selectedText, ContentMatchType.fromString("Equals"));
    this.setTextValidator(textValidator);
  }
}
