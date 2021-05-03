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

import static com.google.common.base.Strings.isNullOrEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.globalvariables.UicdGlobalVariableShellUpdateUtil;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayStatus;
import java.util.ArrayList;
import java.util.List;

/** CommandLineAction For command or adb command input */
public class CommandLineAction extends BaseAction implements IValidatorAction {

  public String commandLine;
  public boolean isAdbCommand;
  public String expectedReturnCode;
  public Integer commandlineExecutionTimeoutSec;
  public boolean needShellOutput;
  private String uicdVariableName;
  @JsonIgnore private String exitValue;


  public CommandLineAction() {}

  public CommandLineAction(
      boolean isAdbCommand,
      String commandLine,
      String expectedReturnCode,
      Integer commandlineExecutionTimeoutSec,
      boolean needShellOutput,
      String uicdVariableName) {
    this.isAdbCommand = isAdbCommand;
    this.commandLine = commandLine;
    this.expectedReturnCode = expectedReturnCode;
    this.commandlineExecutionTimeoutSec = commandlineExecutionTimeoutSec;
    this.needShellOutput = needShellOutput;
    this.uicdVariableName = uicdVariableName;
    setName(commandLine);
  }

  @Override
  public String getDisplay() {
    return commandLine == null ? "None" : this.commandLine;
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);
    CommandLineAction commandLineAction = (CommandLineAction) baseAction;
    this.commandLine = commandLineAction.commandLine;
    this.expectedReturnCode = commandLineAction.expectedReturnCode;
    this.commandlineExecutionTimeoutSec = commandLineAction.commandlineExecutionTimeoutSec;
    this.needShellOutput = commandLineAction.needShellOutput;
    this.isAdbCommand = commandLineAction.isAdbCommand;
    this.uicdVariableName = commandLineAction.uicdVariableName;
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdExternalCommandException {
    List<String> output = new ArrayList<>();
    String deviceId = androidDeviceDriver.getDeviceId();
    String commandLine = actionContext.expandUicdGlobalVariable(this.commandLine, deviceId);

    if (isAdbCommand) {
      adbCommandLineUtil.executeAdb(commandLine, deviceId, output, commandlineExecutionTimeoutSec);
    } else {
      Process process =
          commandLineUtil.execute(commandLine, output, true, commandlineExecutionTimeoutSec);
      exitValue = String.valueOf(process.exitValue());
      boolean isValid = validate(actionContext, androidDeviceDriver);
      if (!isValid) {
        actionContext.updateTopPlayStatus(PlayStatus.FAIL);
      }
    }

    if (!isNullOrEmpty(uicdVariableName) && !output.isEmpty()) {
      actionContext.getGlobalVariableMap().addVariable(uicdVariableName, output.get(0), true);
    } else if (needShellOutput) {
      UicdGlobalVariableShellUpdateUtil.updateGlobalVariableMap
          (output, actionContext.getGlobalVariableMap());
    }
    return 0;
  }

  @Override
  protected ActionExecutionResult genActionExecutionResults(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    ActionExecutionResult actionExecutionResult = new ActionExecutionResult();
    String displayWithParameters =
        actionContext.expandUicdGlobalVariable(this.commandLine, androidDeviceDriver.getDeviceId());
    actionExecutionResult.setRegularOutput(displayWithParameters);
    actionExecutionResult.setActionId(this.getActionId().toString());
    actionExecutionResult.setPlayStatus(actionContext.getTopPlayStatus());
    return actionExecutionResult;
  }

  @Override
  public boolean validate(ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver) {
    return expectedReturnCode == null
        || expectedReturnCode.length() == 0
        || this.exitValue.equals(expectedReturnCode);
  }
}
