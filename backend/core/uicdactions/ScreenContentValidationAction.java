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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.uicd.backend.core.constants.ContentMatchType;
import com.google.uicd.backend.core.constants.ContextStorageType;
import com.google.uicd.backend.core.constants.ElementSelectorType;
import com.google.uicd.backend.core.constants.ScreenContentSearchType;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdDeviceHttpConnectionResetException;
import com.google.uicd.backend.core.uicdactions.jsondbignores.BaseSantinizer.ScreenContentValidationActionSantinizer;
import com.google.uicd.backend.core.xmlparser.Bounds;
import com.google.uicd.backend.core.xmlparser.NodeContext;
import com.google.uicd.backend.core.xmlparser.Position;
import com.google.uicd.backend.core.xmlparser.TextValidator;
import com.google.uicd.backend.core.xmlparser.XmlHelper;
import com.google.uicd.backend.core.xmlparser.XmlParser;
import java.util.List;
import java.util.Optional;

/** ScreenContentValidationAction */
@JsonDeserialize(converter = ScreenContentValidationActionSantinizer.class)
public class ScreenContentValidationAction extends ValidationAction {

  protected boolean isOcrMode;
  // node context for advanced search
  protected NodeContext savedNodeContext;

  @JsonIgnore protected NodeContext foundNodeContext;
  @JsonIgnore protected PositionHelper positionHelper;
  @JsonIgnore protected String validateInfo;

  protected ContextStorageType contextStorageType = ContextStorageType.CONTEXT_BASED;
  private ScreenContentSearchType screenContentSearchType;
  private String selectedText;
  private ElementSelectorType selectedType;
  private Bounds selectedBound;

  public ScreenContentValidationAction() {
    this.positionHelper = new PositionHelper();
  }

  public ScreenContentValidationAction(ValidationReqDetails validationReqDetails) {
    this.selectedBound = validationReqDetails.getSelectedBounds();
    this.selectedType = validationReqDetails.getElementSelectorType();
    this.stopType = validationReqDetails.getStopType();
    this.screenContentSearchType = validationReqDetails.getScreenContentSearchType();
    this.setName(this.getClass().getSimpleName());
    this.selectedText = validationReqDetails.getContentData();
    this.contextStorageType = validationReqDetails.getContextStorageType();
    this.isOcrMode = validationReqDetails.isOcrMode();
    if (validationReqDetails.getNodeContext().isPresent()) {
      this.savedNodeContext = validationReqDetails.getNodeContext().get();
    }
    if (validationReqDetails.getContextStorageType() == ContextStorageType.TEXT_BASED) {
      TextValidator textValidator =
          new TextValidator(this.selectedText, validationReqDetails.getContentMatchType());
      this.setTextValidator(textValidator);
    }
    this.positionHelper = new PositionHelper();
  }

  @Override
  protected void clear() {
    super.clear();
    foundNodeContext = new NodeContext();
  }

  @Override
  public String getDisplay() {
    return String.format("Screen Validate:(%s)", selectedText)
        + String.format("Stop Type:" + this.stopType);
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateAction(baseAction);

    if (baseAction instanceof ScreenContentValidationAction) {
      ScreenContentValidationAction otherAction = (ScreenContentValidationAction) baseAction;
      this.selectedText = otherAction.selectedText;
      this.selectedType = otherAction.selectedType;
      this.stopType = otherAction.stopType;
      this.screenContentSearchType = otherAction.screenContentSearchType;
      this.textValidator = otherAction.textValidator;
      this.contextStorageType = otherAction.contextStorageType;
      this.isOcrMode = otherAction.isOcrMode;
    }
  }

  public Bounds getSelectedBound() {
    return selectedBound;
  }

  public String getSelectedText() {
    return selectedText;
  }

  private boolean validateBasedOnOCR(
      String targetText, ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver) {
    Position pos =
        positionHelper.getPositionFromScreenByORC(targetText, androidDeviceDriver, actionContext);
    if (pos.isValidPos()) {
      validateInfo =
          String.format("Found targetText: %s at Position %s", targetText, pos);
    } else {
      validateInfo = "Can not find text by OCR";
    }

    return pos.isValidPos();
  }

  @Override
  protected boolean validateRaw(
      ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver)
      throws UicdDeviceHttpConnectionResetException {

    String targetText =
        actionContext.expandUicdGlobalVariable(
            this.selectedText, androidDeviceDriver.getDeviceId());

    if (isOcrMode) {
      logger.info("Using ocr mode: searching for text: " + targetText);
      return validateBasedOnOCR(targetText, actionContext, androidDeviceDriver);
    }
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
    List<String> xmls = androidDeviceDriver.fetchCurrentXML();
    actionContext.setLastXmlDump(xmls);
    // first we validate content
    if (savedNodeContext == null || this.contextStorageType != ContextStorageType.CONTEXT_BASED) {
      XmlParser xmlParser =
          new XmlParser(
              xmls, androidDeviceDriver.getWidthRatio(), androidDeviceDriver.getHeightRatio());
      Optional<NodeContext> candidateNode = Optional.empty();
      int distanceThreshold = getDistanceThreshold(androidDeviceDriver);
      if (selectedType == ElementSelectorType.RESOURCE_ID) {
        candidateNode =
            xmlParser.findNodeContextByResourceIdAndBounds(
                localTextValidator, this.selectedBound, distanceThreshold);

      } else if (selectedType == ElementSelectorType.DISPLAY_TEXT) {

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
      if (selectedType == ElementSelectorType.CHECK) {
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

    if (selectedType == ElementSelectorType.RESOURCE_ID) {
      foundsText = foundNodeContext == null ? "unknown" : foundNodeContext.getResourceId();
    } else {
      foundsText = foundNodeContext == null ? "unknown" : foundNodeContext.getDisplayEstimate();
    }
    String logContent = setValidationLogContent(actionExecutionResult, targetText, foundsText);
    actionExecutionResult.setPlayStatus(actionContext.getTopPlayStatus());
    logger.info(logContent);
    return actionExecutionResult;
  }

  protected String setValidationLogContent(ActionExecutionResult actionExecutionResult,
      String targetText, String foundsText) {
    String logContent;
    if (isOcrMode) {
      logContent =
          String.format(
              "Validation Result: %b. %s %s",
              this.validationResult, getStopTypeStr(), this.validateInfo);
    } else {
      logContent =
          String.format(
              "Validation Result: %b.%s Looking for %s: %s, found node: %s,",
              this.validationResult,
              getStopTypeStr(),
              selectedType,
              targetText,
              foundsText);
    }

    actionExecutionResult.setRegularOutput(logContent);
    actionExecutionResult.setActionId(this.getActionId().toString());
    return logContent;
  }

  protected String getStopTypeStr() {
    return String.format("StopType: %s. ", this.stopType);
  }

  private void createDefaultTextValidator() {
    TextValidator textValidator =
        new TextValidator(this.selectedText, ContentMatchType.fromString("Equals"));
    this.setTextValidator(textValidator);
  }

  public ElementSelectorType getSelectedType() {
    return selectedType;
  }

  public NodeContext getSavedNodeContext() {
    return savedNodeContext;
  }

  public ScreenContentSearchType getScreenContentSearchType() {
    return screenContentSearchType;
  }
}
