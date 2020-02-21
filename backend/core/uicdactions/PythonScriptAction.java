// Copyright 2020 Google LLC
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
import com.google.common.io.Files;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


/**
 *
 */
final class PythonScriptAction extends BaseAction implements IValidatorAction{

  public PythonScriptAction() {}

  public PythonScriptAction(
      String name, String script, String dependency, String expectedReturnCode) {
    /*Constructor*/
    this.script = script;
    this.dependency = dependency;
    this.expectedReturnCode = expectedReturnCode;
    setName(name);
  }

  public String script;
  public String dependency;
  public String expectedReturnCode;
  @JsonIgnore private String exitValue;

  @Override
  public String getDisplay() {
    return "Python Script";
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdExternalCommandException {
    List<String> output = new ArrayList<>();
    String deviceId = androidDeviceDriver.getDeviceId();
    String path = UicdConfig.getInstance().getBaseFolder() + "pyscripts/";
    File directory = new File(path);
    if (!directory.exists()){
      directory.mkdirs();
    }
    Timestamp time = new Timestamp(System.currentTimeMillis());
    String timeStamp = time.toString().replace(" ", "");
    File pythonScript = new File(path + "script_" + timeStamp + ".py");
    try {
      Files.asCharSink(pythonScript, Charset.defaultCharset()).write(this.script);
    } catch (IOException e) {
      logger.info(e.getMessage());
    }
    String commandLine = "python3 " + path + "script_" + timeStamp + ".py";
    Process process = commandLineUtil.execute(commandLine, output, true);
    exitValue = String.valueOf(process.exitValue());
    boolean isValid = validate(actionContext, androidDeviceDriver);
    if (!isValid) {
      actionContext.setFailStatus(deviceId);
      this.playStatus = ActionContext.PlayStatus.FAIL;
    }
    return 0;
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);
    if (baseAction instanceof PythonScriptAction) {
      PythonScriptAction otherAction = (PythonScriptAction) baseAction;
      this.script = otherAction.script;
      this.dependency = otherAction.dependency;
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
