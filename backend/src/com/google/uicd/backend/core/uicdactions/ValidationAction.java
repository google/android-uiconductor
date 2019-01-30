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
import com.google.uicd.backend.core.constants.StopType;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdDeviceHttpConnectionResetException;
import com.google.uicd.backend.core.exceptions.UicdExcpetion;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayStatus;
import com.google.uicd.backend.core.xmlparser.TextValidator;

/** ValidationAction */
public abstract class ValidationAction extends BaseAction implements IValidatorAction {

  protected TextValidator textValidator;
  protected boolean stopWhenFalse;
  protected StopType stopType;

  @JsonIgnore protected boolean validationResult = false;

  protected void clear() {}

  @Override
  public String getDisplay() {
    return "ValidationAction";
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateBaseAction(baseAction);

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
    return stopType == StopType.StopTestIfFalse || stopType == StopType.StopCurrentCompoundIfFalse;
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
    return stopType == StopType.StopCurrentCompoundIfFalse
        || stopType == StopType.StopCurrentCompoundIfTrue;
  }

  @Override
  public boolean validate(ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver)
      throws UicdDeviceHttpConnectionResetException {
    return this.isStopWhenFalse()
        ? validateRaw(actionContext, androidDeviceDriver)
        : !validateRaw(actionContext, androidDeviceDriver);
  }

  abstract boolean validateRaw(
      ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver)
      throws UicdDeviceHttpConnectionResetException;

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdExcpetion {
    this.clear();
    this.validationResult = validate(actionContext, androidDeviceDriver);
    if (!this.validationResult) {
      if (isStopCurrentLevel()) {
        // TODO(b/112010063): Move playStatus outside the action itself, it will not work
        // properly with multithreading.
        this.playStatus = PlayStatus.EXIT_CURRENT_COMPOUND;
      } else {
        // Set the global Pass/Fail status.
        actionContext.setFailStatus(androidDeviceDriver.getDeviceId());
        this.playStatus = ActionContext.PlayStatus.FAIL;
      }
    }
    return 0;
  }
}
