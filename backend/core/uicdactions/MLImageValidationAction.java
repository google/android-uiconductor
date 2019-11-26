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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.constants.IconImageType;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.utils.CommandLineUtil;
import com.google.uicd.backend.core.utils.ImageUtil;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/** Validation used for pre-trained image-based icons. */
public class MLImageValidationAction extends ScreenContentValidationAction {

  public IconImageType iconImageType;
  @JsonIgnore private String screenCapPath;

  private static final String PYTHON3 = "python3";
  private static final String COMMAND_LINE_SPACE = " ";

  private static final String SCRIPTS_FOLDER_NAME = "scripts";
  private static final String PREDICTION_SCRIPT = "test_model.py";
  private static final String PRIVATE_KEY_JSON = "image_validation_bucket_key.json";
  private static final String WEIGHTS_FILE_EXTENSION = ".hdf5";

  // Required for deserialization.
  public MLImageValidationAction() {}

  public MLImageValidationAction(ValidationReqDetails validationReqDetails) {
    super(validationReqDetails);
    this.iconImageType = validationReqDetails.getIconImageType();
  }

  public void setScreenCapPath(ActionContext actionContext) {
    screenCapPath = actionContext.getScreenCapFullPath();
  }

  @Override
  public String getDisplay() {
    return "Validate Image";
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdException {
    this.clear();
    setScreenCapPath(actionContext);
    ImageUtil.saveScreenshotToLocal(androidDeviceDriver.getDeviceId(), screenCapPath);
    this.validationResult = validate(actionContext, androidDeviceDriver);
    return 0;
  }

  @Override
  protected boolean validateRaw(
      ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver) {
    try {
      List<Double> predictionValues = getPredictionValues(iconImageType.toString());
      // Icon image is said to be found on the screen iff the first value is greater.
      return predictionValues.get(0) > predictionValues.get(1);
    } catch (UicdException e) {
      logger.warning(e.getMessage());
      return false;
    }
  }

  @Override
  protected ActionExecutionResult genActionExecutionResults(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    ActionExecutionResult actionExecutionResult =
        super.genActionExecutionResults(androidDeviceDriver, actionContext);
    try {
      // Save screenshot output to action execution result.
      actionExecutionResult.setImgValidationScreenCapOutput(
          URLEncoder.encode(screenCapPath, "UTF-8"), this.getDisplay());
    } catch (UnsupportedEncodingException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return actionExecutionResult;
  }

  /**
   * Returns prediction values for the given icon image type.
   *
   * @param iconImageTypeString Icon image whose weights file is to be found in cloud storage.
   * @return Length 2 list with two numbers, both between 0 and 1. First number is the probability
   *     for containing the icon, and second number is the probability for not.
   */
  private List<Double> getPredictionValues(String iconImageTypeString) throws UicdException {
    List<String> output = new ArrayList<>();
    try {
      String commandLine =
          String.join(
              COMMAND_LINE_SPACE,
              PYTHON3,
              getPredictionScriptFilePath(),
              getWeightsFileName(iconImageTypeString),
              screenCapPath,
              getCloudCredentialsPath());
      CommandLineUtil.execute(commandLine, output, true);
    } catch (UicdExternalCommandException e) {
      logger.warning(e.getMessage());
    }
    try {
      return output.stream().map(e -> Double.parseDouble(e)).collect(Collectors.toList());
    } catch (Error e) {
      throw new UicdException(
          "Prediction output must be of length 2 array with two numbers, both between 0 and 1");
    }
  }

  private static String getPredictionScriptFilePath() {
    return Paths.get(
            UicdConfig.getInstance().getBaseFolder(), SCRIPTS_FOLDER_NAME, PREDICTION_SCRIPT)
        .toString();
  }

  private static String getCloudCredentialsPath() {
    return Paths.get(UicdConfig.getInstance().getBaseFolder(), PRIVATE_KEY_JSON).toString();
  }

  private static String getWeightsFileName(String iconImageTypeString) {
    return iconImageTypeString + WEIGHTS_FILE_EXTENSION;
  }
}
