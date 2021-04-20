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
import com.google.uicd.backend.core.exceptions.UicdDeviceHttpConnectionResetException;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayStatus;
import com.google.uicd.backend.core.utils.UicdSnippetClientDriver;
import com.google.uicd.backend.core.xmlparser.TextValidator;
import java.time.Duration;
import java.util.Optional;

/** Snippet (RPC call) Action with validation fields */
public class SnippetValidationAction extends ValidationAction {
  private String packageName;
  private String method;
  private String arguments;
  private long commandlineExecutionTimeoutSec;
  private boolean executeSnippetOnly;
  private String executionResult;

  public SnippetValidationAction() {}

  public SnippetValidationAction(
      String packageName,
      String method,
      String arguments,
      long commandlineExecutionTimeoutSec,
      boolean executeSnippetOnly) {
    this.packageName = packageName;
    this.method = method;
    this.arguments = arguments;
    this.commandlineExecutionTimeoutSec = commandlineExecutionTimeoutSec;
    this.executeSnippetOnly = executeSnippetOnly;
    this.setName(this.getClass().getSimpleName());
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateAction(baseAction);

    if (baseAction instanceof SnippetValidationAction) {
      SnippetValidationAction otherAction = (SnippetValidationAction) baseAction;
      this.method = otherAction.method;
      this.arguments = otherAction.arguments;
      this.packageName = otherAction.packageName;
      this.commandlineExecutionTimeoutSec = otherAction.commandlineExecutionTimeoutSec;
      this.executeSnippetOnly = otherAction.executeSnippetOnly;

      textValidator =
          new TextValidator(
              otherAction.textValidator.getPatternValue(),
              otherAction.textValidator.getContentMatchType());
    }
  }

  @Override
  public String getDisplay() {
    return String.format(
        "Uicd Snippet Validation Action call %s:%s(%s) with commandlineExecutionTimeoutSec %d ms.",
        packageName, method, arguments, commandlineExecutionTimeoutSec);
  }

  @Override
  public boolean validateRaw(ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver) {
    /**
     * Validate the "executionResult" field of the response message according to the validator
     * setting.
     */
    textValidator =
        new TextValidator(
            actionContext.expandUicdGlobalVariable(
                textValidator.getPatternValue(), androidDeviceDriver.getDeviceId()),
            textValidator.getContentMatchType());
    return textValidator.isMatch(executionResult);
  }

  @Override
  protected ActionExecutionResult genActionExecutionResults(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    ActionExecutionResult actionExecutionResult = new ActionExecutionResult();
    String logContent = this.getDisplay();
    if (!executeSnippetOnly) {
      logContent +=
          String.format(
              " Looking for executionResult: %s, found: %s, validation executionResult: %b, "
                  + "stopType: %s",
              this.textValidator.getValidatorDetails(),
              executionResult,
              this.validationResult,
              this.stopType);
    }
    actionExecutionResult.setRegularOutput(logContent);
    actionExecutionResult.setActionId(this.getActionId().toString());
    actionExecutionResult.setPlayStatus(actionContext.getTopPlayStatus());
    return actionExecutionResult;
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdDeviceHttpConnectionResetException {
    /** Call the Snippet Service to execute the RPC request. */
    UicdSnippetClientDriver uicdSnippetClientDriver =
        new UicdSnippetClientDriver(
            packageName,
            androidDeviceDriver.getDeviceId(),
            androidDeviceDriver.getDevice().getSnippetClientHostPort(),
            Duration.ofSeconds(commandlineExecutionTimeoutSec).toMillis());
    try {
      uicdSnippetClientDriver.startAppAndConnect();
      Optional<String> response = uicdSnippetClientDriver.sendRpcRequest(method, arguments);
      if (response.isPresent()) {
        executionResult = response.get();
        logger.info("RPC call returned: " + executionResult);

        /** Do the validation if the "executeSnippetOnly" is not connected. */
        if (!executeSnippetOnly) {
          /** The returned type of this method call is not void. */
          validationResult =
              (executionResult != null) ? validate(actionContext, androidDeviceDriver) : false;
          if (!validationResult) {
            actionContext.updateTopPlayStatus(PlayStatus.FAIL);
          }
        }
      } else {
        actionContext.updateTopPlayStatus(PlayStatus.FAIL);
        logger.warning("An error happened during the RPC call.");
      }
    } catch (UicdExternalCommandException e) {
      logger.warning(e.getMessage());
    }

    try {
      uicdSnippetClientDriver.disconnect();
    } catch (UicdExternalCommandException e) {
      logger.warning(e.getMessage());
    }
    return 0;
  }
}
