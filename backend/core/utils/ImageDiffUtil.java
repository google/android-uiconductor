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

package com.google.uicd.backend.core.utils;

import com.google.uicd.backend.core.exceptions.UicdException;
import java.awt.image.BufferedImage;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/** The util class for ImageDiffValidationAction */
public class ImageDiffUtil {

  /**
   * Calculates diffScore of two images represent in the form of array.
   *
   * <p>Diffscore is basically how much the two images being comapared differ from each other and
   * ranges from 0 to 1. 1 means the images perfectly match with each other. algorithm:
   * https://docs.google.com/document/d/16oPRHkTedZutgn8-ogYJ44ZDjzCNSdA0C9oTtn3ICBU/edit#heading=h.umitxit5acfi
   *
   * @param refImgPixels reference Image in the form of array
   * @param curImgPixels current Image in the form of array
   * @param maxEuclideanPixelDistance the threshold distance that decide whether the pixel matches
   * @param pixelsToIgnore set of pixel indices that needs to be ignore during the match
   * @return the diff score
   */
  public static boolean checkDiffScore(
      int[] refImgPixels,
      int[] curImgPixels,
      double maxEuclideanPixelDistance,
      double diffScoreThreshold,
      Set<Integer> pixelsToIgnore)
      throws UicdException {
    if (refImgPixels.length != curImgPixels.length) {
      throw new UicdException("Image sizes do not match.");
    }
    int diffPixCount = 0;

    for (int i = 0; i < refImgPixels.length; i++) {
      if (!pixelsToIgnore.contains(i)) {
        if (calculateEuclideanDistance(refImgPixels[i], curImgPixels[i])
            > maxEuclideanPixelDistance) {
          diffPixCount++;
        }
      }
    }
    return getDiffScore(diffPixCount, refImgPixels.length - pixelsToIgnore.size())
        >= diffScoreThreshold;
  }

  private static double getDiffScore(int diffPixCount, int totalPixConsideredCount) {
    return 1.0 - ((double) diffPixCount / totalPixConsideredCount);
  }

  private static double calculateEuclideanDistance(int p1, int p2) {
    int mask = 0xFF;
    // Each pixel holds the RGB values (8 bits each) which can be extracted by shifting the values.
    // First 8 bits: blue, next 8 bits: green, last 8 bits: red.
    int[] rgb1 = new int[3];
    int[] rgb2 = new int[3];
    for (int i = 0; i < 3; i++) {
      // shift 0, 8 and 16 bits and retrieve last 8 bits to fetch R, G & B values separately
      rgb1[i] = (p1 >>> (8 * i)) & mask;
      rgb2[i] = (p2 >>> (8 * i)) & mask;
    }

    double distance = 0;

    for (int i = 0; i < 3; i++) {
      distance += Math.pow(rgb1[i] - rgb2[i], 2.0);
    }
    return Math.sqrt(distance);
  }

  /**
   * Provides a set of pixel indices within an image that is supposed to be ignored depending on the
   * includeRegion flag.
   *
   * @param image image under test
   * @param regions regions bounded by the image
   * @param includeRegion boolean denoting whether to ignore pixels inside the bounded region or
   *     outside
   * @return the set of indices of pixels to ignore
   */
  public static Set<Integer> getPixelsToIgnore(
      BufferedImage image, List<Region> regions, boolean includeRegion) {
    Set<Integer> pixelsToIgnore = new HashSet<>();
    for (int row = 0; row < image.getWidth(); row++) {
      for (int col = 0; col < image.getHeight(); col++) {
        for (Region region : regions) {
          if (region.checkIfWithinBounds(row, col)) {
            if (!includeRegion) {
              pixelsToIgnore.add((row * image.getWidth()) + col);
            }
          } else {
            if (includeRegion) {
              pixelsToIgnore.add((row * image.getWidth()) + col);
            }
          }
        }
      }
    }
    return pixelsToIgnore;
  }
}
