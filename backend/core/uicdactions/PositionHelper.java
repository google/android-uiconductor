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

import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.globalvariables.UicdGlobalVariableMap;
import com.google.uicd.backend.core.utils.ImageUtil;
import com.google.uicd.backend.core.utils.OCRUtil;
import com.google.uicd.backend.core.xmlparser.Bounds;
import com.google.uicd.backend.core.xmlparser.NodeContext;
import com.google.uicd.backend.core.xmlparser.Position;
import com.google.uicd.backend.core.xmlparser.XmlHelper;
import java.util.List;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/**
 * Get the position based on the screen information. Currently we have two engines: XML dumper and
 * OCR based on tesseract, this is a help class which provides an abstract layer from the action
 * module.
 */
public class PositionHelper {
  private static final String ORC_SCREEN_CAP_PREFIX = "orc_screen_cap_";
  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");
  private final OCRUtil ocrUtil;

  public PositionHelper() {
    this.ocrUtil = new OCRUtil();
  }

  /**
   * Find the position by orc engine based on the target text.
   *
   * <p> Current tesseract is the default engine for ORC. The position returned by this function is
   * real physical x/y.
   *
   * @param targetText the target text user want to click on the screen
   * @param androidDeviceDriver android device driver
   * @param actionContext current action context
   * @return the center position of the target
   */
  public Position getPositionFromScreenByORC(
      String targetText, AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    Position pos = new Position();
    boolean ocrEnabled =
        Boolean.parseBoolean(
            actionContext
                .getGlobalVariableMap()
                .getRawValue(UicdGlobalVariableMap.OCR_ENABLE_KEYWORD));
    if (!ocrEnabled) {
      logger.info("OCR feature is not enabled, skipped.");
      return pos;
    }
    String screenCapPath = actionContext.getScreenCapFullPath(ORC_SCREEN_CAP_PREFIX);
    ImageUtil.saveScreenshotToLocal(androidDeviceDriver.getDeviceId(), screenCapPath);
    List<Bounds> bounds = ocrUtil.getBoundsOfText(targetText, screenCapPath);
    if (!bounds.isEmpty()) {
      pos = bounds.get(0).getCenter();
      pos.isPhysicalPos = true;
    }
    return pos;
  }

  /**
   * Find the position based on the node context.
   *
   * <p> Use the xml dumper first to find the element, if can not find, fallback to the
   * ORC(tesseract) engine.
   *
   * @param androidDeviceDriver android device driver
   * @param nodeContext the target context user want to click on the screen
   * @param actionContext current action context
   * @return the center position of the target (real physical x/y)
   */
  public Position getPositionFromScreen(
      AndroidDeviceDriver androidDeviceDriver,
      NodeContext nodeContext,
      ActionContext actionContext) {
    if (nodeContext == null) {
      return new Position();
    }
    List<String> xmls = androidDeviceDriver.fetchCurrentXML();
    actionContext.setLastXmlDump(xmls);
    Position pos =
        XmlHelper.getPosFromContextXML(
            xmls,
            nodeContext,
            androidDeviceDriver.getWidthRatio(),
            androidDeviceDriver.getHeightRatio());

    if (pos.isValidPos()) {
      logger.info(String.format("Position from xml engine: (x:%f, y:%f)", pos.x, pos.y));
      return pos;
    } else {
      String targetText = nodeContext.getLeafNodeContext().getText();
      pos = getPositionFromScreenByORC(targetText, androidDeviceDriver, actionContext);
      logger.info("Target text: " + targetText);
      logger.info(String.format("Position from ocr engine: (x:%f, y:%f)", pos.x, pos.y));
      return pos;
    }
  }
}
