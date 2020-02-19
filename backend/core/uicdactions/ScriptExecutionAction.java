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

import static java.nio.charset.StandardCharsets.UTF_8;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.uicd.backend.core.config.ScriptConfig;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdDeviceHttpConnectionResetException;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.utils.ADBCommandLineUtil;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/** ScriptExecutionAction for running customized scripts on the device */
public class ScriptExecutionAction extends BaseAction {
  /** Constants for representing the status of the script execution. */
  private enum ScriptExecutionStatus {
    STATUS_NOT_STARTED_YET,
    STATUS_SCRIPT_SAVED,
    STATUS_SCRIPT_EXECUTED,
    STATUS_ALL_DONE,
    UNKNOWN,
  }
  /**
   * For both apks installed on the device, we assume they are installed in the internal memory
   * instead of SD cards. That's why all these paths are under the subfolder '/0'.
   */
  private static final String SCRIPT_DIRECTORY_PATH = "/storage/emulated/0/sl4a/scripts/";

  private static final String PYTHON_FOR_ANDROID_EXECUTION_PATH =
      "/data/user/0/com.googlecode.pythonforandroid/files/python/bin/python";
  private static final String PUSH_CMD = "adb push %s %s";
  private static final String EXECUTE_CMD = "adb shell \"%s %s %s %s\"";
  private static final String REMOVE_CMD = "adb shell \"rm %s\"";
  private static final String SCRIPT_FILE_TEMPORARY_NAME = "python_script.py";

  private String scriptCodeContent;
  private int commandlineExecutionTimeoutSec;
  private String arguments;

  @JsonIgnore
  private ScriptExecutionStatus executionStatus = ScriptExecutionStatus.STATUS_NOT_STARTED_YET;

  public ScriptExecutionAction() {}

  public ScriptExecutionAction(
      String scriptCodeContent, int commandlineExecutionTimeoutSec, String arguments) {
    this.scriptCodeContent = scriptCodeContent;
    this.commandlineExecutionTimeoutSec = commandlineExecutionTimeoutSec;
    this.arguments = arguments;
    this.setName(this.getClass().getSimpleName());
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);

    if (baseAction instanceof ScriptExecutionAction) {
      ScriptExecutionAction otherAction = (ScriptExecutionAction) baseAction;
      this.scriptCodeContent = otherAction.scriptCodeContent;
      this.commandlineExecutionTimeoutSec = otherAction.commandlineExecutionTimeoutSec;
      this.arguments = otherAction.arguments;
    }
  }

  @Override
  public String getDisplay() {
    return String.format("Execute python script on device.");
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdDeviceHttpConnectionResetException {
    String scriptFileLocalPath =
        Paths.get(
                UicdConfig.getInstance().getTestOutputFolder(),
                actionContext.getExecutionId().toString(),
                getActionId().toString(),
                SCRIPT_FILE_TEMPORARY_NAME)
            .toString();
    if (saveScriptFile(scriptFileLocalPath)) {
      try {
        // Save the local script file to the SL4A script folder on the Android device
        ADBCommandLineUtil.executeAdb(
            String.format(PUSH_CMD, scriptFileLocalPath, SCRIPT_DIRECTORY_PATH),
            androidDeviceDriver.getDeviceId());
        executionStatus = ScriptExecutionStatus.STATUS_SCRIPT_SAVED;
        // Execute the script with all the environment settings
        List<String> responseList = new ArrayList<>();
        ADBCommandLineUtil.executeAdb(
            String.format(
                EXECUTE_CMD,
                ScriptConfig.pythonConfigMapToString(),
                PYTHON_FOR_ANDROID_EXECUTION_PATH,
                SCRIPT_DIRECTORY_PATH + SCRIPT_FILE_TEMPORARY_NAME,
                arguments),
            androidDeviceDriver.getDeviceId(),
            responseList,
            commandlineExecutionTimeoutSec);
        executionStatus = ScriptExecutionStatus.STATUS_SCRIPT_EXECUTED;
        // Remove the temporary script file on the Android device
        ADBCommandLineUtil.executeAdb(
            String.format(REMOVE_CMD, SCRIPT_DIRECTORY_PATH + SCRIPT_FILE_TEMPORARY_NAME),
            androidDeviceDriver.getDeviceId());
        executionStatus = ScriptExecutionStatus.STATUS_ALL_DONE;
      } catch (UicdExternalCommandException e) {
        actionContext.setFailStatus(androidDeviceDriver.getDeviceId());
        this.playStatus = ActionContext.PlayStatus.FAIL;
        logger.warning("Failed to execute the script.");
      }
    }
    return 0;
  }

  @Override
  protected ActionExecutionResult genActionExecutionResults(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    ActionExecutionResult actionExecutionResult =
        super.genActionExecutionResults(androidDeviceDriver, actionContext);
    String logContent;
    switch (executionStatus) {
      case STATUS_ALL_DONE:
        logContent = "The script action has been successfully executed.";
        break;
      case STATUS_SCRIPT_EXECUTED:
        logContent = "The script has been executed but the file cannot be removed from the device.";
        break;
      case STATUS_SCRIPT_SAVED:
        logContent =
            "The script has been saved under the SL4A script folder on the device "
                + "but failed to be executed";
        break;
      case STATUS_NOT_STARTED_YET:
        logContent = "The script action failed at the early beginning.";
        break;
      default:
        logContent = "The script action ran into some unknown error.";
        break;
    }

    actionExecutionResult.setRegularOutput(logContent);
    actionExecutionResult.setActionId(this.getActionId().toString());
    actionExecutionResult.setPlayStatus(this.playStatus);
    return actionExecutionResult;
  }

  private boolean saveScriptFile(String scriptFileLocalPath) {
    try {
      File scriptFile = new File(scriptFileLocalPath);
      if (!scriptFile.getParentFile().exists()) {
        if (!scriptFile.getParentFile().mkdirs()) {
          logger.warning(
              String.format(
                  "Fail to make a new directory under %s.", scriptFile.getParentFile().toString()));
          return false;
        }
      }
      try (final PrintWriter printWriter = new PrintWriter(scriptFile, UTF_8.name())) {
        printWriter.write(scriptCodeContent);
      }
    } catch (IOException e) {
      logger.warning("Failed to save the script file " + scriptFileLocalPath);
      return false;
    }
    return true;
  }
}
