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
import com.google.uicd.backend.core.constants.StopType;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdDeviceHttpConnectionResetException;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayStatus;
import com.google.uicd.backend.core.xmlparser.TextValidator;

/** Base class of all the validation related actions */
public abstract class ValidationAction extends BaseAction implements IValidatorAction {

  protected TextValidator textValidator;
  protected boolean stopWhenFalse;
  protected StopType stopType;

  @JsonIgnore protected boolean validationResult = false;

  protected void clear() {
    this.validationResult = false;
  }

  @Override
  public String getDisplay() {
    return "ValidationAction";
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);

    if (baseAction instanceof ValidationAction) {
      ValidationAction otherAction = (ValidationAction) baseAction;
      this.setTextValidator(otherAction.getTextValidator());
      this.setStopWhenFalse(otherAction.isStopWhenFalse());
      this.setStopType(otherAction.getStopType());
    }
  }

  public TextValidator getTextValidator() {
    return textValidator;
  }

  public void setTextValidator(TextValidator textValidator) {
    this.textValidator = textValidator;
  }

  public boolean isStopWhenFalse() {
    return stopType == StopType.STOP_TEST_IF_FALSE
        || stopType == StopType.STOP_CURRENT_COMPOUND_IF_FALSE;
  }

  public void setStopWhenFalse(boolean stopWhenFalse) {
    this.stopWhenFalse = stopWhenFalse;
  }

  public StopType getStopType() {
    return stopType;
  }

  public void setStopType(StopType stopType) {
    this.stopType = stopType;
  }

  // Added field "stopType". stopWhenFalse is only used when parsing old actions from DB
  @Deprecated
  public boolean getStopWhenFalse() {
    return stopWhenFalse;
  }

  public boolean getValidationResult() {
    return validationResult;
  }

  public boolean isStopCurrentLevel() {
    return stopType == StopType.STOP_CURRENT_COMPOUND_IF_FALSE
        || stopType == StopType.STOP_CURRENT_COMPOUND_IF_TRUE;
  }

  @Override
  public boolean validate(ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver)
      throws UicdDeviceHttpConnectionResetException {
    return this.isStopWhenFalse()
        ? validateRaw(actionContext, androidDeviceDriver)
        : !validateRaw(actionContext, androidDeviceDriver);
  }

  abstract boolean validateRaw(ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver)
      throws UicdDeviceHttpConnectionResetException;

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdException {
    this.clear();
    this.validationResult = validate(actionContext, androidDeviceDriver);
    updatePlayStatus(actionContext, this.validationResult, androidDeviceDriver);
    return 0;
  }

  protected void updatePlayStatus(
      ActionContext actionContext,
      boolean validationResult,
      AndroidDeviceDriver androidDeviceDriver) {
    if (!validationResult) {
      if (isStopCurrentLevel()) {
        actionContext.updateTopPlayStatus(PlayStatus.EXIT_CURRENT_COMPOUND);
        actionContext.updateParentPlayStatus(PlayStatus.EXIT_CURRENT_COMPOUND);
      } else {
        // Set the global Pass/Fail status.
        actionContext.setFailStatusRecordXmlAndScreen(androidDeviceDriver.getDeviceId());
      }
    }
  }

  @Override
  protected ActionExecutionResult genActionExecutionResults(AndroidDeviceDriver androidDeviceDriver,
      ActionContext actionContext) {
    ActionExecutionResult actionExecutionResult =
        super.genActionExecutionResults(androidDeviceDriver, actionContext);
    String logContent =
        String.format(
            "Validation Result: %b.%s Looking for %s: %s, Can not find on xml.",
            this.validationResult,
            stopType,
            textValidator.getContentMatchType(),
            textValidator.getPatternValue());

    actionExecutionResult.setRegularOutput(logContent);
    return actionExecutionResult;
  }
}
