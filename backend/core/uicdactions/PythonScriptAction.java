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

import static java.nio.charset.StandardCharsets.UTF_8;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.io.Files;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.globalvariables.UicdGlobalVariableShellUpdateUtil;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayStatus;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

/** Handles python related operations */
public final class PythonScriptAction extends BaseAction implements IValidatorAction {

  private static final int TIME_OUT_SEC = 600;
  private static final String RESULT_KEY = "$uicd_python_action_internal_result";
  public String script;
  public String expectedReturnCode;
  @JsonIgnore private String exitValue;
  private boolean isPathProvided;
  private String path;

  public PythonScriptAction() {}

  public PythonScriptAction(String filepath) {
    this.expectedReturnCode = "0";
    this.path = filepath;
    this.isPathProvided = true;
  }

  public PythonScriptAction(String name, String script, String expectedReturnCode) {
    /*Constructor*/
    this.script = script;
    this.expectedReturnCode = expectedReturnCode;
    setName(name);
  }

  @Override
  public String getDisplay() {
    return "Python Script";
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdExternalCommandException {
    List<String> output = new ArrayList<>();
    String commandLine = "";
    String globalVar = actionContext.getGlobalVariableMap().toJson();
    if (this.isPathProvided) {
      commandLine =
          String.format(
              "python %s %s",
              this.path, Base64.getEncoder().encodeToString(globalVar.getBytes(UTF_8)));
    } else {
      String path = Paths.get(UicdConfig.getInstance().getBaseFolder(), "pyscripts").toString();
      File directory = new File(path);
      if (!directory.exists()) {
        directory.mkdirs();
      }
      Timestamp time = new Timestamp(System.currentTimeMillis());
      String timeStamp = time.toString().replace(" ", "");
      String filePath = Paths.get(path, "script_" + timeStamp + ".py").toString();
      File pythonScript = new File(filePath);
      try {
        Files.asCharSink(pythonScript, Charset.defaultCharset()).write(this.script);
      } catch (IOException e) {
        logger.info(e.getMessage());
      }
      commandLine =
          String.format(
              "python %s %s",
              filePath, Base64.getEncoder().encodeToString(globalVar.getBytes(UTF_8)));
    }
    Process process = commandLineUtil.execute(commandLine, output, true, TIME_OUT_SEC);
    logger.info("Executed command: " + commandLine);
    exitValue = String.valueOf(process.exitValue());
    UicdGlobalVariableShellUpdateUtil.updateGlobalVariableMap(
        output, actionContext.getGlobalVariableMap());

    try {
      String result = actionContext.getGlobalVariableMap().getRawValue(RESULT_KEY);
      if (result.equals("true")) {
        actionContext.updateTopPlayStatus(PlayStatus.PASS);
      } else {
        actionContext.updateTopPlayStatus(PlayStatus.FAIL);
      }
    } catch (NullPointerException e) {
      logger.info("Internal python execution result not set.");
    }

    boolean isValid = validate(actionContext, androidDeviceDriver);
    if (!isValid) {
      actionContext.updateTopPlayStatus(PlayStatus.FAIL);
    }
    return 0;
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);
    if (baseAction instanceof PythonScriptAction) {
      PythonScriptAction otherAction = (PythonScriptAction) baseAction;
      this.script = otherAction.script;
      this.expectedReturnCode = otherAction.expectedReturnCode;
    }
  }

  @Override
  public boolean validate(ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver) {
    return expectedReturnCode == null
        || expectedReturnCode.length() == 0
        || this.exitValue.equals(expectedReturnCode);
  }
}
