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

package com.google.uicd.backend.core.utils;

import com.google.common.io.BaseEncoding;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.exceptions.UicdImageException;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import javax.imageio.ImageIO;
import org.opencv.calib3d.Calib3d;
import org.opencv.core.Core;
import org.opencv.core.Core.MinMaxLocResult;
import org.opencv.core.CvType;
import org.opencv.core.DMatch;
import org.opencv.core.Mat;
import org.opencv.core.MatOfDMatch;
import org.opencv.core.MatOfKeyPoint;
import org.opencv.core.MatOfPoint2f;
import org.opencv.core.Point;
import org.opencv.core.Size;
import org.opencv.features2d.DescriptorMatcher;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.xfeatures2d.SIFT;

/** Helper class for saving image screenshot, decoding BASE64 image data and image matching. */
public class ImageUtil {
  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");
  private static final double FILTER_RATIO = 0.59;
  private static final double[] ERROR_RESULT = new double[] {-1, -1, -1};
  private static final double RANSAC_THRESHOLD = 5.0;
  private static final int PIXEL_MINIMUM_THRESHOLD = 5;
  private static final double[] BLUE_GREEN_RED_WEIGHT = new double[] {0.114, 0.587, 0.299};
  private static final String OPENCV_DEPENDENCY_FILE_NAME = "libopencv_java340.so";

  /**
   * Decodes the BASE64 image data and saves it into a .png file.
   *
   * @param imageData: image data in BASE64 string format
   * @param imagePath: path to save the image after decoding
   */
  public static void decodeAndSaveImageData(String imageData, String imagePath) {
    try {
      byte[] decodedBytes = BaseEncoding.base64().decode(imageData);
      BufferedImage image = ImageIO.read(new ByteArrayInputStream(decodedBytes));
      if (image == null) {
        logger.warning("Error while saving image data to file: Buffered image is null.");
        return;
      }
      File imageFile = new File(imagePath);
      if (!imageFile.getParentFile().exists()) {
        if (!imageFile.getParentFile().mkdirs()) {
          logger.warning(
              String.format(
                  "Fail to make a new directory under %s.", imageFile.getParentFile().toString()));
          return;
        }
      }
      ImageIO.write(image, "png", imageFile);
    } catch (IOException e) {
      logger.warning("Error while saving image data to file: " + e.getMessage());
    }
  }

  /**
   * Calls adb command to save the current phone screenshot to local output directory.
   *
   * @param deviceId: contains the device context information
   * @param imagePath: path to save the screenshot image
   */
  public static void saveScreenshotToLocal(String deviceId, String imagePath) {
    String commandLine = "adb exec-out screencap -p > ";
    File file = new File(imagePath);
    if (!file.getParentFile().exists()) {
      if (!file.getParentFile().mkdirs()) {
        logger.warning(
            String.format(
                "Fail to make a new directory under %s.", file.getParentFile().toString()));
        return;
      }
    }
    commandLine += imagePath;
    try {
      ADBCommandLineUtil.executeAdb(commandLine, deviceId);
    } catch (UicdExternalCommandException e) {
      logger.warning("Error while saving screenshot to file: " + e.getMessage());
    }
  }

  /**
   * Matches two images in a certain search range with both Template Matching and SIFT methods.
   *
   * @param sourcePath: path of the source image
   * @param targetPath: path of the target image
   * @param widthRatio: width ratio of actual phone screen to Uicd screen
   * @param heightRatio: height ratio of actual phone screen to Uicd screen
   * @param coordinates: coordinates of the search range of the source image
   * @param dependencyPath: OpenCV dependency .so file absolute path
   * @return confidence, x and y of both Template Matching and SIFT results
   */
  public static double[][] imageMatch(
      String sourcePath,
      String targetPath,
      double widthRatio,
      double heightRatio,
      int[] coordinates,
      String dependencyPath)
      throws UicdImageException {
    /**
     * Google3 java loader initializes all necessary native dependencies automatically. It works for
     * Mobile Harness because Mobile Harness will not copy the .so file but use Google3 dependency
     * instead. But for other environments, it will load our uploaded file before using OpenCV.
     */
    if (new File(dependencyPath + "/" + OPENCV_DEPENDENCY_FILE_NAME).exists()) {
      System.load(dependencyPath + "/" + OPENCV_DEPENDENCY_FILE_NAME);
    }

    /** Read image and template, check the path and size */
    Mat sourceImage;
    Mat targetImage;
    try {
      sourceImage = Imgcodecs.imread(sourcePath);
      targetImage = Imgcodecs.imread(targetPath);
    } catch (java.lang.UnsatisfiedLinkError e) {
      throw new UicdImageException("The native dependency library of OpenCV Java is missing!");
    }

    if (sourceImage == null
        || targetImage == null
        || sourceImage.rows() == 0
        || sourceImage.cols() == 0
        || targetImage.rows() == 0
        || targetImage.cols() == 0) {
      logger.warning("Invalid image path.");
      throw new UicdImageException("The paths of images for matching are invalid.");
    }

    if (targetImage.rows() > sourceImage.rows() || targetImage.cols() > sourceImage.cols()) {
      logger.warning("Template size is larger than image size.");
      throw new UicdImageException("Template size is larger than image size.");
    }

    /** Resize the source image corresponding to the true size */
    Mat sourceResize = new Mat();
    Imgproc.resize(
        sourceImage,
        sourceResize,
        new Size(sourceImage.cols() / widthRatio, sourceImage.rows() / heightRatio));

    /**
     * Extract certain range of the source image. The coordinates come with the order y1, y2, x1 and
     * x2.
     */
    sourceResize =
        sourceResize.submat(coordinates[0], coordinates[1], coordinates[2], coordinates[3]);

    /** Convert to gray scale image for matching */
    Mat sourceGray = new Mat(sourceResize.rows(), sourceResize.cols(), sourceResize.type());
    Imgproc.cvtColor(sourceResize, sourceGray, Imgproc.COLOR_BGR2GRAY);

    Mat targetGray = new Mat(targetImage.rows(), targetImage.cols(), targetImage.type());
    Imgproc.cvtColor(targetImage, targetGray, Imgproc.COLOR_BGR2GRAY);

    double[][] res = new double[2][3];
    res[0] = templateMatch(sourceGray, targetGray);
    res[0][1] = (res[0][1] + coordinates[2]);
    res[0][2] = (res[0][2] + coordinates[0]);
    res[1] = siftMatch(sourceGray, targetGray);
    res[1][1] = (res[1][1] + coordinates[2]);
    res[1][2] = (res[1][2] + coordinates[0]);
    return res;
  }

  private static double[] templateMatch(Mat src, Mat trg) {
    /** Template matching using CCOEFF_NORMALIZED version */
    Mat result = new Mat(src.rows() - trg.rows() + 1, src.cols() - trg.cols() + 1, CvType.CV_32FC1);
    Imgproc.matchTemplate(src, trg, result, Imgproc.TM_CCOEFF_NORMED);

    /** Locate the best match */
    MinMaxLocResult mmr = Core.minMaxLoc(result);

    double[] valAndLoc = new double[3];
    valAndLoc[0] = mmr.maxVal;
    valAndLoc[1] = mmr.maxLoc.x + trg.cols() / 2;
    valAndLoc[2] = mmr.maxLoc.y + trg.rows() / 2;
    return valAndLoc;
  }

  private static double[] siftMatch(Mat src, Mat trg) throws UicdImageException {
    /**
     * Initialize the SIFT 1st argument is number of features 2nd one is number of Octave layers 3rd
     * one is the contrast threshold 4th one is the edge contrast threshold 5th one is the sigma
     * (deviation) All is set according to recommendation settings
     */
    SIFT sift = SIFT.create(0, 4, 0.04, 10, 1.6);

    /** Detect all the key points for image and template respectively, compute */
    MatOfKeyPoint keypointSource = new MatOfKeyPoint();
    Mat descriptorsSource = new Mat(src.rows(), src.cols(), src.type());
    sift.detectAndCompute(src, new Mat(), keypointSource, descriptorsSource);

    MatOfKeyPoint keypointTarget = new MatOfKeyPoint();
    Mat descriptorsTarget = new Mat(trg.rows(), trg.cols(), trg.type());
    sift.detectAndCompute(trg, new Mat(), keypointTarget, descriptorsTarget);

    /**
     * Make sure the number of features in both image and template image is greater or equal to
     * number of nearest neighbours in knn match
     */
    if (keypointSource.toArray().length < 2 || keypointTarget.toArray().length < 2) {
      logger.warning("No enough key points for KNN matching.");
      throw new UicdImageException("No enough key points for KNN matching.");
    }

    DescriptorMatcher matcher = DescriptorMatcher.create(DescriptorMatcher.FLANNBASED);
    List<MatOfDMatch> matches = new ArrayList<>();
    matcher.knnMatch(descriptorsTarget, descriptorsSource, matches, 2);

    /** Filter out key points which are too close */
    List<DMatch> goodMatchesList = new ArrayList<>();
    matches.forEach(
        match -> {
          DMatch[] dmatches = match.toArray();
          DMatch match1 = dmatches[0];
          DMatch match2 = dmatches[1];

          if (match1.distance < match2.distance * FILTER_RATIO) {
            goodMatchesList.add(match1);
          }
        });

    /** Remove duplicate matching points */
    List<DMatch> goodDiffMatchesList = new ArrayList<>();
    List<Point> goodDiffPointList = new ArrayList<>();
    for (DMatch match : goodMatchesList) {
      Point goodPoint = keypointSource.toArray()[match.trainIdx].pt;
      if (!goodDiffPointList.contains(goodPoint)) {
        goodDiffMatchesList.add(match);
        goodDiffPointList.add(goodPoint);
      }
    }

    /** Extract matching area according to matching points */
    if (goodDiffMatchesList.isEmpty()) {
      logger.warning("No matching points.");
      return ERROR_RESULT;
    } else if (goodDiffMatchesList.size() == 1) {
      logger.warning("Only one matching point. Not enough confidence.");
      return ERROR_RESULT;
    } else if (goodDiffMatchesList.size() <= 3) {
      return handleTwoOrThreeGoodPoints(
          src, trg, keypointSource, keypointTarget, goodDiffMatchesList);
    } else {
      return matchWithManyGoodPoints(src, trg, keypointSource, keypointTarget, goodDiffMatchesList);
    }
  }

  private static double[] handleTwoOrThreeGoodPoints(
      Mat image,
      Mat template,
      MatOfKeyPoint keypointImage,
      MatOfKeyPoint keypointTemplate,
      List<DMatch> goodMatchesList) {
    Point pointTemplate1 = keypointTemplate.toArray()[goodMatchesList.get(0).queryIdx].pt;
    Point pointImage1 = keypointImage.toArray()[goodMatchesList.get(0).trainIdx].pt;
    Point pointTemplate2;
    Point pointImage2;
    if (goodMatchesList.size() == 2) {
      pointTemplate2 = keypointTemplate.toArray()[goodMatchesList.get(1).queryIdx].pt;
      pointImage2 = keypointImage.toArray()[goodMatchesList.get(1).trainIdx].pt;
    } else {
      /**
       * For three matching points, we use the first point, and the middle point of the rest two
       * points to calculate the rectangle area with the sam method as two points scenario
       */
      pointTemplate2 =
          new Point(
              (keypointTemplate.toArray()[goodMatchesList.get(1).queryIdx].pt.x
                      + keypointTemplate.toArray()[goodMatchesList.get(2).queryIdx].pt.x)
                  / 2,
              (keypointTemplate.toArray()[goodMatchesList.get(1).queryIdx].pt.y
                      + keypointTemplate.toArray()[goodMatchesList.get(2).queryIdx].pt.y)
                  / 2);
      pointImage2 =
          new Point(
              (keypointImage.toArray()[goodMatchesList.get(1).trainIdx].pt.x
                      + keypointImage.toArray()[goodMatchesList.get(2).trainIdx].pt.x)
                  / 2,
              (keypointImage.toArray()[goodMatchesList.get(1).trainIdx].pt.y
                      + keypointImage.toArray()[goodMatchesList.get(2).trainIdx].pt.y)
                  / 2);
    }
    return matchWithTwoGoodPoints(
        image, template, pointImage1, pointImage2, pointTemplate1, pointTemplate2);
  }

  private static double[] matchWithTwoGoodPoints(
      Mat image,
      Mat template,
      Point pointImage1,
      Point pointImage2,
      Point pointTemplate1,
      Point pointTemplate2) {
    /** Calculate the middle point */
    int middlePointX = (int) ((pointImage1.x + pointImage2.x) / 2);
    int middlePointY = (int) ((pointImage1.y + pointImage2.y) / 2);

    /** Cannot derive the rectangle area if x or y is the same for two points */
    if (pointTemplate1.x == pointTemplate2.x
        || pointTemplate1.y == pointTemplate2.y
        || pointImage1.x == pointImage2.x
        || pointImage1.y == pointImage2.y) {
      logger.warning("No rectangle area.");
      return ERROR_RESULT;
    }

    /** Calculate all related points and scales of changes in rectangle area */
    int colsImage = image.cols();
    int rowsImage = image.rows();
    int colsTemplate = template.cols();
    int rowsTemplate = template.rows();
    double xScale =
        Math.abs(1.0 * (pointImage2.x - pointImage1.x) / (pointTemplate2.x - pointTemplate1.x));
    double yScale =
        Math.abs(1.0 * (pointImage2.y - pointImage1.y) / (pointTemplate2.y - pointTemplate1.y));

    int templateMiddlePointX = (int) ((pointTemplate1.x + pointTemplate2.x) / 2);
    int templateMiddlePointY = (int) ((pointTemplate1.y + pointTemplate2.y) / 2);
    middlePointX = middlePointX - (int) ((templateMiddlePointX - colsTemplate / 2) * xScale);
    middlePointY = middlePointY - (int) ((templateMiddlePointY - rowsTemplate / 2) * yScale);
    middlePointX = Math.max(middlePointX, 0);
    middlePointX = Math.min(middlePointX, colsImage - 1);
    middlePointY = Math.max(middlePointY, 0);
    middlePointY = Math.min(middlePointY, rowsImage - 1);

    /** Calculate the left/right & top/bottom points of the recognition rectangle area */
    int xMin = (int) Math.max(middlePointX - (colsTemplate * xScale) / 2, 0);
    int xMax = (int) Math.min(middlePointX + (colsTemplate * xScale) / 2, colsImage - 1);
    int yMin = (int) Math.max(middlePointY - (rowsTemplate * yScale) / 2, 0);
    int yMax = (int) Math.min(middlePointY + (rowsTemplate * yScale) / 2, rowsImage - 1);

    if (targetErrorCheck(xMin, xMax, yMin, yMax, colsTemplate, rowsTemplate)) {
      return ERROR_RESULT;
    }
    Mat targetImage = image.submat(yMin, yMax, xMin, xMax);
    Mat resizeImage = new Mat();
    Imgproc.resize(targetImage, resizeImage, new Size(colsTemplate, rowsTemplate));
    double confidence = calSiftConfidence(template, resizeImage, false);

    double[] valAndLoc = new double[3];
    valAndLoc[0] = confidence;
    valAndLoc[1] = middlePointX;
    valAndLoc[2] = middlePointY;
    return valAndLoc;
  }

  private static double[] matchWithManyGoodPoints(
      Mat image,
      Mat template,
      MatOfKeyPoint keypointImage,
      MatOfKeyPoint keypointTemplate,
      List<DMatch> goodMatchesList) {
    /** Store the corresponding key points into lists and transform them into matrices */
    List<Point> pointImageList = new ArrayList<>();
    List<Point> pointTemplateList = new ArrayList<>();
    for (DMatch match : goodMatchesList) {
      pointImageList.add(keypointImage.toArray()[match.trainIdx].pt);
      pointTemplateList.add(keypointTemplate.toArray()[match.queryIdx].pt);
    }
    MatOfPoint2f pointImageMat = new MatOfPoint2f();
    MatOfPoint2f pointTemplateMat = new MatOfPoint2f();
    pointImageMat.fromList(pointImageList);
    pointTemplateMat.fromList(pointTemplateList);

    /** Find the mapping matrix for these two key point matrices */
    Mat homography =
        Calib3d.findHomography(pointTemplateMat, pointImageMat, Calib3d.RANSAC, RANSAC_THRESHOLD);

    /** Compute the coordination of the points of rectangle area after matrix mapping */
    List<Point> sourceList = new ArrayList<>();
    /** Keep an eye on the order you put those 4 points */
    sourceList.add(new Point(0, 0));
    sourceList.add(new Point(0, template.rows() - 1));
    sourceList.add(new Point(template.cols() - 1, template.rows() - 1));
    sourceList.add(new Point(template.cols() - 1, 0));
    MatOfPoint2f src = new MatOfPoint2f();
    src.fromList(sourceList);
    MatOfPoint2f dst = new MatOfPoint2f();
    Core.perspectiveTransform(src, dst, homography);

    /** Derive the new top left, top right, bottom left and bottom right coordination */
    Point[] pypts = dst.toArray();
    Point leftTop = pypts[0];
    Point bottomRight = pypts[2];
    int middlePointX = (int) ((leftTop.x + bottomRight.x) / 2);
    int middlePointY = (int) ((leftTop.y + bottomRight.y) / 2);
    int xMin = (int) Math.min(leftTop.x, bottomRight.x);
    int xMax = (int) Math.max(leftTop.x, bottomRight.x);
    int yMin = (int) Math.min(leftTop.y, bottomRight.y);
    int yMax = (int) Math.max(leftTop.y, bottomRight.y);

    /** Check the boundary condition */
    xMin = Math.max(xMin, 0);
    xMax = Math.max(xMax, 0);
    xMin = Math.min(xMin, image.cols() - 1);
    xMax = Math.min(xMax, image.cols() - 1);
    yMin = Math.max(yMin, 0);
    yMax = Math.max(yMax, 0);
    yMin = Math.min(yMin, image.rows() - 1);
    yMax = Math.min(yMax, image.rows() - 1);
    if (targetErrorCheck(xMin, xMax, yMin, yMax, template.cols(), template.rows())) {
      return ERROR_RESULT;
    }

    /** Resize the recognized area and compute the confidence */
    Mat targetImage = image.submat(yMin, yMax, xMin, xMax);
    Mat resizeImage = new Mat();
    Imgproc.resize(targetImage, resizeImage, new Size(template.cols(), template.rows()));
    double confidence = calSiftConfidence(template, resizeImage, false);

    double[] valAndLoc = new double[3];
    valAndLoc[0] = confidence;
    valAndLoc[1] = middlePointX;
    valAndLoc[2] = middlePointY;
    return valAndLoc;
  }

  private static boolean targetErrorCheck(
      int xMin, int xMax, int yMin, int yMax, int cols, int rows) {
    int targetWidth = xMax - xMin;
    int targetHeight = yMax - yMin;
    if (targetWidth < PIXEL_MINIMUM_THRESHOLD || targetHeight < PIXEL_MINIMUM_THRESHOLD) {
      logger.warning("Error: target area width or height < 5 pixels.");
      return true;
    }
    if (targetWidth < 0.2 * cols
        || targetWidth > 5 * cols
        || targetHeight < 0.2 * rows
        || targetHeight > 5 * rows) {
      logger.warning("Target area is 5 times larger or 0.2 times smaller than template image.");
      return true;
    }
    return false;
  }

  private static double calSiftConfidence(Mat template, Mat imageResize, boolean isRGB) {
    double confidence =
        isRGB
            ? calRgbConfidence(template, imageResize)
            : calCcoeffConfidence(template, imageResize);
    confidence = (1 + confidence) / 2;
    return confidence;
  }

  private static double calRgbConfidence(Mat template, Mat imageResize) {
    List<Mat> templateBgr = new ArrayList<>();
    List<Mat> imageBgr = new ArrayList<>();
    Core.split(template, templateBgr);
    Core.split(imageResize, imageBgr);

    double confidence = 0;
    double[] bgrConfidence = new double[3];
    for (int i = 0; i < 3; i++) {
      bgrConfidence[i] = calCcoeffConfidence(templateBgr.get(i), imageBgr.get(i));
      confidence += bgrConfidence[i] * BLUE_GREEN_RED_WEIGHT[i];
    }
    return confidence;
  }

  private static double calCcoeffConfidence(Mat template, Mat imageResize) {
    Mat result =
        new Mat(
            template.rows() - imageResize.rows() + 1,
            template.cols() - imageResize.cols() + 1,
            CvType.CV_32FC1);
    Imgproc.matchTemplate(template, imageResize, result, Imgproc.TM_CCOEFF_NORMED);
    MinMaxLocResult mmr = Core.minMaxLoc(result);
    return mmr.maxVal;
  }
}
