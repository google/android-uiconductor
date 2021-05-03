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

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;
import static java.nio.charset.StandardCharsets.UTF_8;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.exceptions.UicdHostException;
import com.google.uicd.backend.core.xmlparser.TextValidator;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

/** LogcatValidationAction */
@JsonAutoDetect(
    fieldVisibility = ANY,
    getterVisibility = NONE,
    setterVisibility = NONE,
    isGetterVisibility = NONE)
public class LogcatValidationAction extends ValidationAction {

  public String commandLine;

  public Integer commandlineExecutionTimeoutSec;

  @JsonIgnore protected String logFilePath;

  // when logcatOnly is true, we don't do validation
  private boolean logcatOnly;
  @JsonIgnore private List<String> logcatOutput = new ArrayList<>();

  @Override
  public String getDisplay() {
    return "Logcat Validation Action";
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateAction(baseAction);
    LogcatValidationAction logcatAction = (LogcatValidationAction) baseAction;
    this.commandLine = logcatAction.commandLine;
    this.stopType = logcatAction.getStopType();
    this.commandlineExecutionTimeoutSec = logcatAction.commandlineExecutionTimeoutSec;
    this.logcatOnly = logcatAction.logcatOnly;
    this.setTextValidator(
        new TextValidator(
            logcatAction.textValidator.getPatternValue(),
            logcatAction.textValidator.getContentMatchType()));
  }

  @Override
  public boolean validateRaw(ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver) {
    List<String> outputs = getLogcatOutput();
    // Need create a tmp validator so that the global variable won't affect the original one.
    TextValidator tmpTextValidator =
        new TextValidator(
            actionContext.expandUicdGlobalVariable(
                textValidator.getPatternValue(), androidDeviceDriver.getDeviceId()),
            textValidator.getContentMatchType());
    for (String line : outputs) {
      if (tmpTextValidator.isMatch(line)) {
        return true;
      }
    }
    return false;
  }

  public List<String> getLogcatOutput() {
    return logcatOutput;
  }

  public void setLogcatOutput(List<String> logcatOutput) {
    this.logcatOutput = logcatOutput;
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdException {
    this.logcatOutput.clear();
    saveLogToLocalFile(actionContext, androidDeviceDriver);
    if (!logcatOnly) {
      validationResult = validate(actionContext, androidDeviceDriver);
      updatePlayStatus(actionContext, this.validationResult, androidDeviceDriver);
    }
    return 0;
  }

  @Override
  protected ActionExecutionResult genActionExecutionResults(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    ActionExecutionResult actionExecutionResult = new ActionExecutionResult();
    try {
      // logFilePath will be null if play() has not been called yet
      if (logFilePath != null) {
        if (logcatOnly) {
          actionExecutionResult.setLogOutput(
              URLEncoder.encode(logFilePath, "UTF-8"), this.getDisplay());
        } else {
          actionExecutionResult.setLogOutput(
              URLEncoder.encode(logFilePath, "UTF-8"), this.getDisplay());

          String logContent =
              String.format(
                  "Looking for text: %s, found %s, validation result %b, stopWhenFalse: %s",
                  this.textValidator.getValidatorDetails(),
                  String.join("\n", getLogcatOutput()),
                  this.validationResult,
                  this.stopType);
          actionExecutionResult.setLogcatValidationOutput(logContent, logFilePath, logContent);
        }
      }
    } catch (UnsupportedEncodingException e) {
      logger.warning(e.getMessage());
    }
    actionExecutionResult.setActionId(this.getActionId().toString());
    actionExecutionResult.setPlayStatus(actionContext.getTopPlayStatus());
    return actionExecutionResult;
  }

  private boolean saveLogToLocalFile(
      ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver)
      throws UicdExternalCommandException, UicdHostException {
    logFilePath = actionContext.getExecutionId() + "/" + getActionId() + "/logcat/output.txt";

    String targetCommandLine =
        actionContext.expandUicdGlobalVariable(this.commandLine, androidDeviceDriver.getDeviceId());
    adbCommandLineUtil.executeAdbLogcatCommand(
        targetCommandLine,
        androidDeviceDriver.getDeviceId(),
        logcatOutput,
        commandlineExecutionTimeoutSec);

    // write output to file ?
    // SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");
    // Timestamp timestamp = new Timestamp(System.currentTimeMillis());
    String logFileFullPath = UicdConfig.getInstance().getTestOutputFolder() + logFilePath;
    File file = new File(logFileFullPath);
    file.getParentFile().mkdirs();
    try (Writer writer = Files.newBufferedWriter(file.toPath(), UTF_8)) {
      for (String s : logcatOutput) {
        writer.write(s);
      }
    } catch (IOException e) {
      throw new UicdHostException("Failed to write the log to local file system.");
    }
    return false;
  }
}
