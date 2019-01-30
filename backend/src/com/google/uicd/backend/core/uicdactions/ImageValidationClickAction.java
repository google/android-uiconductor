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
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdDeviceHttpConnectionResetException;
import com.google.uicd.backend.core.exceptions.UicdImageException;
import com.google.uicd.backend.core.utils.ImageUtil;
import com.google.uicd.backend.core.xmlparser.Bounds;

/**
 * Implements a new Click Action class for screen image validation and add a follow-up action of
 * click if the searching content exists. This class has many functions similar to
 * ImageMatchingValidationAction.java. TODO: Refactor this and ImageMatchingValidationAction.java
 * into helper class for code reuse.
 */
public class ImageValidationClickAction extends BaseAction {
  /** Constants for file paths. */
  private static final String SCREENSHOT_PATH = "/image/screenshot.png";

  private static final String TEMPLATE_PATH = "/image/template.png";

  private Bounds selectedBounds;
  private ScreenContentSearchType screenContentSearchType;
  private String imageData;
  private double threshold;
  private boolean isDoubleClick;
  @JsonIgnore private String imagePath;
  @JsonIgnore private String templatePath;
  @JsonIgnore private double confidenceTM;
  @JsonIgnore private double confidenceSIFT;

  public ImageValidationClickAction() {}

  public ImageValidationClickAction(
      String boundsSearchType,
      String imageData,
      Bounds selectedBounds,
      double threshold,
      boolean isDoubleClick) {
    this.screenContentSearchType = ScreenContentSearchType.fromString(boundsSearchType);
    this.imageData = imageData;
    this.setName(this.getClass().getSimpleName());
    this.selectedBounds = selectedBounds;
    this.threshold = threshold;
    this.isDoubleClick = isDoubleClick;
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateBaseAction(baseAction);

    if (baseAction instanceof ImageValidationClickAction) {
      ImageValidationClickAction otherAction = (ImageValidationClickAction) baseAction;
      this.screenContentSearchType = otherAction.screenContentSearchType;
      this.threshold = otherAction.threshold;
      this.isDoubleClick = otherAction.isDoubleClick;
    }
  }

  @Override
  public String getDisplay() {
    return String.format(
        "Image match with Search Type: %s. Click if they match.",
        this.screenContentSearchType.getSearchContentType());
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdDeviceHttpConnectionResetException {
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
      double middlePointTemplateMatchingX = imageMatchResult[0][1];
      double middlePointTemplateMatchingY = imageMatchResult[0][2];
      this.confidenceSIFT = imageMatchResult[1][0];
      double middlePointSIFTX = imageMatchResult[1][1];
      double middlePointSIFTY = imageMatchResult[1][2];

      // The size of good matching points list from SIFT is important in determining matching
      // results.
      if (confidenceSIFT == -1) {
        logger.info(
            "SIFT cannot detect enough (more than 1) good matching points "
                + "so the result is failure and no click operation.");
        return 0;
      }
      /**
       * Click the center of matching area if the confidence satisfies the threshold. Use the SIFT
       * result for priority due to accuracy. The confidence value from SIFT tends to be lower than
       * that from Template Matching. We can use the confidence value of Template Matching as a
       * complement to SIFT.
       */
      if (confidenceSIFT >= threshold) {
        logger.info(
            String.format(
                "Click position from SIFT result: (%f, %f)", middlePointSIFTX, middlePointSIFTY));
        androidDeviceDriver.clickDevice(
            (int) middlePointSIFTX, (int) middlePointSIFTY, isDoubleClick);
      } else if (confidenceTM >= threshold) {
        logger.info(
            String.format(
                "Click position from Template Matching result: (%f, %f)",
                middlePointTemplateMatchingX, middlePointTemplateMatchingY));
        androidDeviceDriver.clickDevice(
            (int) middlePointTemplateMatchingX, (int) middlePointTemplateMatchingY, isDoubleClick);
      }
    } catch (UicdImageException e) {
      logger.warning(e.getMessage());
    }
    return 0;
  }
}
