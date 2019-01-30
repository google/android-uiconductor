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
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.constants.ScreenContentSearchType;
import com.google.uicd.backend.core.constants.StopType;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdImageException;
import com.google.uicd.backend.core.utils.ImageUtil;
import com.google.uicd.backend.core.xmlparser.Bounds;

/**
 * Implements a new Validation Action class for screen image validation and determine the pass
 * results according to the stop type.
 */
public class ImageMatchingValidationAction extends ValidationAction {
  /** Constants for file paths. */
  private static final String SCREENSHOT_PATH = "/image/screenshot.png";

  private static final String TEMPLATE_PATH = "/image/template.png";

  private Bounds selectedBounds;
  private ScreenContentSearchType screenContentSearchType;
  private String imageData;
  private double threshold;
  @JsonIgnore private String imagePath;
  @JsonIgnore private String templatePath;
  @JsonIgnore private double confidenceTM;
  @JsonIgnore private double confidenceSIFT;

  public ImageMatchingValidationAction() {}

  public ImageMatchingValidationAction(
      String boundsSearchType,
      StopType stopType,
      String imageData,
      Bounds selectedBounds,
      double threshold) {
    this.stopType = stopType;
    this.screenContentSearchType = ScreenContentSearchType.fromString(boundsSearchType);
    this.setName(this.getClass().getSimpleName());
    this.imageData = imageData;
    this.selectedBounds = selectedBounds;
    this.threshold = threshold;
  }

  @Override
  protected void clear() {}

  @Override
  public String getDisplay() {
    return String.format(
        "Image Validate with Stop Type: %s and Search Type: %s",
        this.stopType.toString(), this.screenContentSearchType.getSearchContentType());
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateBaseAction(baseAction);

    if (baseAction instanceof ImageMatchingValidationAction) {
      ImageMatchingValidationAction otherAction = (ImageMatchingValidationAction) baseAction;
      this.stopType = otherAction.stopType;
      this.screenContentSearchType = otherAction.screenContentSearchType;
      this.threshold = otherAction.threshold;
    }
  }

  public Bounds getSelectedBounds() {
    return selectedBounds;
  }

  public void setSelectedBounds(Bounds selectedBounds) {
    this.selectedBounds = selectedBounds;
  }

  @Override
  public boolean validateRaw(ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver) {
    /**
     * Get current screenshot of the phone screen and save under the output folder. Decode template
     * image data and save.
     */
    String actionRelativePath = actionContext.getExecutionId() + "/" + getActionId();
    String testOutputAbsolutePath = UicdConfig.getInstance().getTestOutputFolder();
    String imageFilePath = actionRelativePath + SCREENSHOT_PATH;
    this.imagePath = testOutputAbsolutePath + "/" + imageFilePath;
    ImageUtil.saveScreenshotToLocal(androidDeviceDriver.getDeviceId(), imagePath);

    imageFilePath = actionRelativePath + TEMPLATE_PATH;
    this.templatePath = testOutputAbsolutePath + "/" + imageFilePath;
    ImageUtil.decodeAndSaveImageData(imageData, templatePath);

    /**
     * Get the boundary of search area from boundsSearchType. Generate those arguments the image
     * matching algorithm needs.
     */
    Bounds bounds = selectedBounds.getBoundsFromSearchType(screenContentSearchType);
    int[] coordinates =
        new int[] {
          (int) bounds.getY1(), (int) bounds.getY2(), (int) bounds.getX1(), (int) bounds.getX2()
        };
    String dependencyPath = UicdConfig.getInstance().getDepsFolder();

    try {
      double[][] imageMatchResult =
          ImageUtil.imageMatch(
              this.imagePath,
              this.templatePath,
              androidDeviceDriver.getWidthRatio(),
              androidDeviceDriver.getHeightRatio(),
              coordinates,
              dependencyPath);
      this.confidenceTM = imageMatchResult[0][0];
      this.confidenceSIFT = imageMatchResult[1][0];
    } catch (UicdImageException e) {
      logger.warning(e.getMessage());
    }
    // The size of good matching points list from SIFT is important in determining matching results.
    if (confidenceSIFT == -1) {
      logger.info(
          "SIFT cannot detect enough (more than 1) good matching points "
              + "so the matching result is failure.");
      return false;
    }
    // The confidence value from SIFT tends to be lower than that from Template Matching.
    // We can use the confidence value of Template Matching as a complement to SIFT.
    if (confidenceTM < threshold && confidenceSIFT < threshold) {
      logger.info(
          String.format(
              "Confidence of template matching and SIFT: %f and %f. "
                  + "Fail to reach threshold: %f",
              confidenceTM, confidenceSIFT, threshold));
      return false;
    }
    return true;
  }

  @Override
  protected ActionExecutionResult genActionExecutionResults(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    ActionExecutionResult actionExecutionResult = new ActionExecutionResult();
    String logContent =
        String.format(
            "%s image matching validation. Confidence of template matching: %f, "
                + "confidence of SIFT: %f, threshold: %f, stopType: %s",
            screenContentSearchType.getSearchContentType(),
            confidenceTM,
            confidenceSIFT,
            threshold,
            stopType.toString());

    actionExecutionResult.setRegularOutput(logContent);
    actionExecutionResult.setActionId(this.getActionId().toString());
    actionExecutionResult.setPlayStatus(this.playStatus);
    return actionExecutionResult;
  }
}
