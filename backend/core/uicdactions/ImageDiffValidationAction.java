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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.annotations.VisibleForTesting;
import com.google.common.collect.ImmutableMap;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.utils.ImageDiffUtil;
import com.google.uicd.backend.core.utils.ImageUtil;
import com.google.uicd.backend.core.utils.Region;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.imageio.ImageIO;

/**
 * The pixel diffing validation action that compares current image with the reference image and
 * tries to match user selected regions on reference image with all possible positions on the
 * current image
 */
public class ImageDiffValidationAction extends ValidationAction {

  private String refImageUuid;
  private double diffScoreThreshold = 0.99;

  @JsonIgnore private static final int MAX_EUCLIDEAN_DISTANCE = 30;

  @JsonIgnore private byte[] refImage;

  @JsonIgnore private String screenCapPath;

  @VisibleForTesting protected boolean includeRegion;

  @VisibleForTesting protected List<Region> regions = new ArrayList<>();

  public byte[] getRefImage() {
    return refImage;
  }

  public void setRefImage(byte[] refImage) {
    this.refImage = refImage;
  }

  public String getRefImageUuid() {
    return refImageUuid;
  }

  public void setScreenCapPath(ActionContext actionContext) {
    screenCapPath = actionContext.getScreenCapFullPath();
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateAction(baseAction);
    ImageDiffValidationAction imgDiffValidAction = (ImageDiffValidationAction) baseAction;
    diffScoreThreshold = imgDiffValidAction.diffScoreThreshold;
    includeRegion = imgDiffValidAction.includeRegion;
    refImageUuid = imgDiffValidAction.refImageUuid;
    regions = imgDiffValidAction.regions;
  }

  @Override
  boolean validateRaw(ActionContext actionContext, AndroidDeviceDriver androidDeviceDriver) {
    setScreenCapPath(actionContext);
    try (InputStream in = new ByteArrayInputStream(refImage)) {
      ImageUtil.saveScreenshotToLocal(androidDeviceDriver.getDeviceId(), screenCapPath);
      BufferedImage curImg = ImageIO.read(new File(screenCapPath));
      if (refImage == null) {
        logger.info("The image diff validation did not run as reference image is unavailable");
        return false;
      }

      BufferedImage refImg = ImageIO.read(in);
      BufferedImage resizedImg = curImg;
      if (curImg.getWidth() != refImg.getWidth() || curImg.getHeight() != refImg.getHeight()) {
        resizedImg =
            ImageUtil.resize(
                curImg, /* width= */ refImg.getWidth(), /* height= */ refImg.getHeight());
      }
      return compareImages(refImg, resizedImg);
    } catch (UicdException | IOException e) {
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
      actionExecutionResult.setScreenCapOutput(
          URLEncoder.encode(screenCapPath, "UTF-8"), this.getDisplay());
    } catch (UnsupportedEncodingException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return actionExecutionResult;
  }

  /**
   * Compares the given two images to see if they match.
   *
   * <p>Splits the reference image into sub image and maps with the internal regions bounded by
   * them. Fetches the indices of the pixels that need to be ignored for comparison in the sub
   * images. Matches sub images with all possible positions on the current image.
   *
   * @param refImg reference image
   * @param curImg current image under test
   * @return whether validation succeeded
   */
  private boolean compareImages(BufferedImage refImg, BufferedImage curImg) throws UicdException {
    Map<BufferedImage, List<Region>> imgToBoundedRegions = ImmutableMap.of(refImg, regions);
    for (Map.Entry<BufferedImage, List<Region>> entry : imgToBoundedRegions.entrySet()) {
      Set<Integer> pixelsToIgnore =
          ImageDiffUtil.getPixelsToIgnore(entry.getKey(), entry.getValue(), includeRegion);
      if (!tryMatchAllPossiblePositons(entry.getKey(), curImg, pixelsToIgnore)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Tries all possible positions of given image on reference image to compare.
   *
   * <p>Matches sub images with all possible positions on the current image. Calculates diffScore
   * for each position on current image and returns true if the score is acceptable
   *
   * @param subImg sub image of the reference image
   * @param curImg current image under test
   * @param pixelsToIgnore pixel indices of the subimage that needs to be ignored
   * @return whether at least one possible subimage position matches the current image
   */
  @VisibleForTesting
  protected boolean tryMatchAllPossiblePositons(
      BufferedImage subImg, BufferedImage curImg, Set<Integer> pixelsToIgnore)
      throws UicdException {
    int[] subImgPixels =
        subImg.getRGB(
            0, 0, subImg.getWidth(), subImg.getHeight(), null, /*offset*/ 0, subImg.getWidth());
    for (int row = 0; row + subImg.getWidth() <= curImg.getWidth(); row++) {
      for (int col = 0; col + subImg.getHeight() <= curImg.getHeight(); col++) {
        int[] curImgPixels =
            curImg.getRGB(
                row,
                col,
                subImg.getWidth(),
                subImg.getHeight(),
                null, /*offset*/
                0,
                subImg.getWidth());
        if (ImageDiffUtil.checkDiffScore(
            subImgPixels,
            curImgPixels,
            MAX_EUCLIDEAN_DISTANCE,
            diffScoreThreshold,
            pixelsToIgnore)) {
          return true;
        }
      }
    }
    return false;
  }
}
