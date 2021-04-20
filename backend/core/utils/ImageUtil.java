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

import com.google.common.io.BaseEncoding;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import javax.imageio.ImageIO;

/** Helper class for saving image screenshot, decoding BASE64 image data and image matching. */
public class ImageUtil {
  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");

  /**
   * Decodes the BASE64 image data and saves it into a .png file.
   *
   * @param imageData: image data in BASE64 string format
   * @param imagePath: path to save the image after decoding
   */
  public static void decodeAndSaveImageData(String imageData, String imagePath) throws IOException {
    try {
      byte[] decodedBytes = BaseEncoding.base64().decode(imageData);
      BufferedImage image = ImageIO.read(new ByteArrayInputStream(decodedBytes));
      if (image == null) {
        logger.warning("Error while saving image data to file: Buffered image is null.");
        return;
      }
      File imageFile = new File(imagePath);
      createParentDirectory(imageFile);
      ImageIO.write(image, "png", imageFile);
    } catch (IOException e) {
      logger.warning("Error while saving image data to file: " + e.getMessage());
    }
  }

  /**
   * Creates a parent directory for the provided path.
   *
   * @param file File for which the parent directory is to be created.
   * @throws IOException If the parent directory is not successfully created.
   */
  public static void createParentDirectory(File file) throws IOException {
    if (!file.getParentFile().exists()) {
      if (!file.getParentFile().mkdirs()) {
        throw new IOException(
            String.format("Fail to make a new directory under %s.", file.getParentFile()));
      }
    }
  }

  /**
   * Calls adb command to save the current phone screenshot to local output directory.
   *
   * @param deviceId: contains the device context information
   * @param imagePath: path to save the screenshot image
   */
  public static void saveScreenshotToLocal(String deviceId, String imagePath) {
    File file = new File(imagePath);
    try {
      createParentDirectory(file);
    } catch (IOException e) {
      logger.warning(e.getMessage());
    }
    // adb shell screencap -p /sdcard/screencap.png && adb pull /sdcard/screencap.png
    String commandLine =
        String.join(
            " ",
            "adb shell screencap -p /sdcard/uicdscreenshot.png && adb pull"
                + " /sdcard/uicdscreenshot.png",
            imagePath);
    try {
      ADBCommandLineUtil adbCommandLineUtil = new ADBCommandLineUtil();
      adbCommandLineUtil.executeAdb(commandLine, deviceId, /* waitfor */ true);
    } catch (UicdExternalCommandException e) {
      logger.warning("Error while saving screenshot to file: " + e.getMessage());
    }
  }

  /**
   * Resize {@code bufferedImage} to dimensions {@code width} by {@code height}.
   *
   * @param img Image to resize.
   * @param width Target width for resizing.
   * @param height Target height for resizing.
   * @return Resized buffered image.
   */
  public static BufferedImage resize(BufferedImage img, int width, int height) {
    Image tmp = img.getScaledInstance(width, height, Image.SCALE_SMOOTH);
    BufferedImage resized = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
    Graphics2D g2d = resized.createGraphics();
    g2d.drawImage(tmp, 0, 0, null);
    g2d.dispose();
    return resized;
  }

  /** Scales given pixel to target range. */
  public static int scaleToTargetPx(int inputX, int srcRange, int targetRange) {
    int scaledPx = (int) ((double) inputX / srcRange * targetRange);
    scaledPx = Math.max(0, scaledPx);
    scaledPx = Math.min(targetRange - 1, scaledPx);
    return scaledPx;
  }
}
