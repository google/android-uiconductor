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

import com.google.common.annotations.VisibleForTesting;
import com.google.common.base.Ascii;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.constants.OCREngineType;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.xmlparser.Bounds;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/**
 * The class holds all OCR related utils, using tesseract algorithm to do text processing in images.
 * A sample usage of tesseract: tesseract --tessdata-dir /usr/xyz/tessdata input.png stdout tsv
 * Other language: tesseract --tessdata-dir /usr/xyz/tessdata chinese.png stdout -l chi_sim tsv
 */
public class OCRUtil {
  private static final String TAG = "OCRUtil";

  private static final String UICD_PLUGINS_FOLDER = "uicd-plugins";

  private static final String UI_DETECTOR_FOLDER = "ui-detector";
  private static final String UI_DETECTOR_BINARY = "uicd_uidetector_proxy.par";
  private static final String UI_DETETCOR_DATAPATH_TAG = "--infile";

  private static final String TESSERACT_DATAPATH_TAG = "--tessdata-dir";
  private static final String TESSERACT_FOLDER = "tesseract";
  private static final String TESSERACT_DATA_FOLDER = "tessdata";
  private static final String TESSERACT_BINARY = "tesseract";
  private static final String TESSERACT_LIB = "lib";
  // To make it simple, instead of output to a file, directly write to stdout.
  private static final String OUTPUT_FILE_NAME = "stdout";

  /*
   * tsv format will have the following header
   * level page_num block_num par_num line_num word_num left top width height conf text
   */
  private static final String OUTPUT_FILE_TYPE = "tsv";
  private static final String CMD_SEPARATOR = " ";
  private static final String SET_LIB_PATH_CMD = "LD_LIBRARY_PATH=%s";
  private static final int TIME_OUT_SEC = 15;
  protected static Logger logger = LogManager.getLogManager().getLogger("uicd");

  private final CommandLineUtil commandLineUtil;

  private final OCREngineType ocrEngineType;

  /** Default Constructor. */
  public OCRUtil() {
    this.commandLineUtil = new CommandLineUtil();
    ocrEngineType = UicdConfig.getInstance().getOrcEngineType();
  }

  /** Constructor for testing only. */
  @VisibleForTesting
  OCRUtil(CommandLineUtil commandLineUtil) {
    this.commandLineUtil = commandLineUtil;
    ocrEngineType = OCREngineType.TESSERACT;
  }

  /** Gets all the existing bounds and text in the given image. */
  public Map<Bounds, String> getAllTextFromScreen(String imagePath) {
    Map<String, List<Bounds>> stringBoundsMapping = processImage(imagePath);
    Map<Bounds, String> boundsStringMapping = new HashMap<>();
    for (Map.Entry<String, List<Bounds>> entry : stringBoundsMapping.entrySet()) {
      for (Bounds bounds : entry.getValue()) {
        boundsStringMapping.put(bounds, entry.getKey());
      }
    }
    return boundsStringMapping;
  }
  /**
   * Gets all the existing bounds in the given image.
   *
   * <p>If text exist as a single line, the bounds will be return directly.
   *
   * <p>If text doesn't exist as a single line, all the bounds that contains the given text will be
   * return. The first one is the best match.
   *
   * <p>Otherwise a empty list will be return.
   */
  public List<Bounds> getBoundsOfText(String text, String imagePath) {
    List<Bounds> allBounds = new ArrayList<>();
    Map<String, List<Bounds>> resultMap = processImage(imagePath);
    text = text.replaceAll("\\s", "");
    int minLenMatched = Integer.MAX_VALUE;
    for (String key : resultMap.keySet()) {
      if (Ascii.toLowerCase(key).contains(Ascii.toLowerCase(text))) {
        if (key.length() < minLenMatched) {
          allBounds.addAll(0, resultMap.get(key));
          minLenMatched = key.length();
        } else {
          allBounds.addAll(resultMap.get(key));
        }
      }
    }
    return allBounds;
  }

  /**
   * Gets information from the screenshot image.
   *
   * @param imagePath the tmp path for the dump image
   */
  private Map<String, List<Bounds>> processImage(String imagePath) {
    switch (ocrEngineType) {
      case TESSERACT:
        return processImageWithTesseract(imagePath);
      case UIDETECTOR:
        return processImageWithUIDetector(imagePath);
      case DISABLE:
    }
    return new HashMap<>();
  }

  /**
   * Gets information from the screenshot image based on UIDetector Engine.
   *
   * @param imagePath the tmp path for the dump image
   */
  private Map<String, List<Bounds>> processImageWithUIDetector(String imagePath) {
    List<String> cmdParts = new ArrayList<>();
    String uiDetectorBinaryPath =
        Paths.get(
                UicdConfig.getInstance().getTestInputFolder(),
                UICD_PLUGINS_FOLDER,
                UI_DETECTOR_FOLDER,
                UI_DETECTOR_BINARY)
            .toString();
    cmdParts.add(uiDetectorBinaryPath);
    cmdParts.add(UI_DETETCOR_DATAPATH_TAG);
    cmdParts.add(imagePath);
    String uiDetectorCmd = String.join(CMD_SEPARATOR, cmdParts);

    try {
      List<String> resultList = new ArrayList<>();
      commandLineUtil.execute(uiDetectorCmd, resultList, true, TIME_OUT_SEC);
      return getTextAndBoundsFromUIDetectorRecords(resultList);
    } catch (UicdExternalCommandException e) {
      logger.severe(TAG + ": " + e.getMessage());
    }
    return new HashMap<>();
  }

  private static Map<String, List<Bounds>> getTextAndBoundsFromUIDetectorRecords(
      List<String> resultList) {
    Map<String, List<Bounds>> textToBoundsMap = new HashMap<>();
    List<UIDetectorOutputRecord> records =
        resultList.stream()
            .map(UIDetectorOutputRecord::create)
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
    records.stream()
        .filter(x -> !x.text().isEmpty())
        .forEach(
            t -> {
              textToBoundsMap
                  .computeIfAbsent(t.text(), k -> new ArrayList<>())
                  .add(new Bounds(t.left(), t.top(), t.right(), t.bottom()));
            });
    return textToBoundsMap;
  }
  /**
   * Gets information from the image generated from the adb dump.
   *
   * @param imagePath the tmp path for the dump image
   */
  private Map<String, List<Bounds>> processImageWithTesseract(String imagePath) {
    List<String> cmdParts = new ArrayList<>();
    String tesseractBasePath =
        Paths.get(
                UicdConfig.getInstance().getTestInputFolder(),
                UICD_PLUGINS_FOLDER,
                TESSERACT_FOLDER)
            .toString();
    String setLibPathCmd =
        String.format(SET_LIB_PATH_CMD, Paths.get(tesseractBasePath, TESSERACT_LIB));
    String tesseractBinaryPath = Paths.get(tesseractBasePath, TESSERACT_BINARY).toString();
    String tesseractDataPath = Paths.get(tesseractBasePath, TESSERACT_DATA_FOLDER).toString();
    cmdParts.add(setLibPathCmd);
    cmdParts.add(tesseractBinaryPath);
    cmdParts.add(TESSERACT_DATAPATH_TAG);
    cmdParts.add(tesseractDataPath);
    cmdParts.add(imagePath);
    cmdParts.add(OUTPUT_FILE_NAME);
    cmdParts.add(OUTPUT_FILE_TYPE);
    String tesseractCmd = String.join(CMD_SEPARATOR, cmdParts);

    try {
      List<String> tessResultList = new ArrayList<>();
      commandLineUtil.execute(tesseractCmd, tessResultList, true);
      return getTextAndBoundsFromTessRecords(tessResultList);
    } catch (UicdExternalCommandException e) {
      logger.severe(TAG + ": " + e.getMessage());
    }
    return new HashMap<>();
  }

  /**
   * Converts the tesseract tsv output to internal map. The tesseract output format is something
   * like following(tab separated): level page_num block_num par_num line_num word_num left top
   * width height conf text 1 1 0 0 0 0 0 0 1440 2960 -1 2 1 1 0 0 0 549 406 338 47 -1 3 1 1 1 0 0
   * 549 406 338 47 -1 4 1 1 1 1 0 549 406 338 47 -1 5 1 1 1 1 1 549 406 122 36 96 Search 5 1 1 1 1
   * 2 678 407 209 46 96 settings ...
   *
   * @param tessResultList standard output for the tesseract commandline
   */
  private static Map<String, List<Bounds>> getTextAndBoundsFromTessRecords(
      List<String> tessResultList) {
    Map<String, List<Bounds>> textToBoundsMap = new HashMap<>();
    List<TesseractOutputRecord> tessRecords =
        tessResultList.stream()
            .map(TesseractOutputRecord::create)
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
    Collection<List<TesseractOutputRecord>> tessRecordsCollections =
        tessRecords.stream().collect(Collectors.groupingBy(t -> t.getLogicBlockKey())).values();

    // First put each word into the map, since sometimes if we group by block will be too big, and
    // the center is not what we want. i.e. in the setting page, the block is the whole 5 icons.
    tessRecords.stream()
        .filter(Objects::nonNull)
        .filter(x -> !x.text().isEmpty())
        .forEach(
            t -> {
              textToBoundsMap
                  .computeIfAbsent(t.text(), k -> new ArrayList<>())
                  .add(new Bounds(t.left(), t.top(), t.left() + t.width(), t.top() + t.height()));
            });

    for (List<TesseractOutputRecord> logicGroup : tessRecordsCollections) {
      mergeAndUpdateResultMap(logicGroup, textToBoundsMap);
    }
    return textToBoundsMap;
  }

  /**
   * Merges the result map by the logic group.
   *
   * @param logicGroup tesseract output logic group
   * @param textToBoundsMap text to bounds mapping
   */
  private static void mergeAndUpdateResultMap(
      List<TesseractOutputRecord> logicGroup, Map<String, List<Bounds>> textToBoundsMap) {
    int x1 = Integer.MAX_VALUE;
    int y1 = Integer.MAX_VALUE;
    int x2 = Integer.MIN_VALUE;
    int y2 = Integer.MIN_VALUE;
    StringBuilder sb = new StringBuilder();
    for (TesseractOutputRecord record : logicGroup) {
      x1 = Math.min(record.left(), x1);
      y1 = Math.min(record.top(), y1);
      x2 = Math.max(record.left() + record.width(), x2);
      y2 = Math.max(record.top() + record.height(), y2);
      sb.append(record.text());
    }
    String fullText = sb.toString().trim();
    textToBoundsMap
        .computeIfAbsent(fullText, k -> new ArrayList<>())
        .add(new Bounds(x1, y1, x2, y2));
  }
}
