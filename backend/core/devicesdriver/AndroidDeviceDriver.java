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

package com.google.uicd.backend.core.devicesdriver;

import static com.google.uicd.backend.core.utils.ADBCommands.CHANGE_EVENT_FILE_MODE;
import static com.google.uicd.backend.core.utils.ADBCommands.DOUBLE_CLICK_TEMPLATE;
import static com.google.uicd.backend.core.utils.ADBCommands.EXECUTE_COMMAND_LINE_TIME_OUT_IN_SECONDS;
import static com.google.uicd.backend.core.utils.ADBCommands.GET_TOUCH_EVENT_CMD;
import static com.google.uicd.backend.core.utils.ADBCommands.ROOT_ACCESS_CMD;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Ascii;
import com.google.common.base.Splitter;
import com.google.common.util.concurrent.Uninterruptibles;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.constants.DeviceOrientation;
import com.google.uicd.backend.core.constants.StrategyType;
import com.google.uicd.backend.core.exceptions.UicdDeviceHttpConnectionResetException;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.utils.ADBCommandLineUtil;
import com.google.uicd.backend.core.utils.HttpProxyUtils;
import com.google.uicd.backend.core.utils.ImageUtil;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import com.google.uicd.backend.core.xmlparser.Position;
import com.google.uicd.backend.core.xmlparser.XmlHelper;
import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/** AndroidDeviceDriver */
public class AndroidDeviceDriver {

  private static final int NUM_XML_DUMP_RETRIES = 3;

  private int hostScreenWidth = 360;
  private int hostScreenHeight = 640;
  private static final Duration TIME_TO_START_XML_DUMPER_SERVER = Duration.ofSeconds(5);

  protected Logger logger = LogManager.getLogManager().getLogger("uicd");

  private final ADBCommandLineUtil adbCommandLineUtil;

  public AndroidDeviceDriver(Device device) {
    this.device = device;
    this.adbCommandLineUtil = new ADBCommandLineUtil();
  }

  public void setHostScreenWidth(int hostScreenWidth) {
    this.hostScreenWidth = hostScreenWidth;
  }

  public void setHostScreenHeight(int hostScreenHeight) {
    this.hostScreenHeight = hostScreenHeight;
  }

  private static final String HTTP_LOCALHOST = "http://localhost:";
  private static final String DUMP_XML_ENDPOINT = "/action/dump";
  private static final String DUMP_XML_WITH_CLASSNAME_QUERYSTRING = "?withclassname=true";
  private static final String TOUCH_DOWN_ENDPOINT = "/action/touch/down";
  private static final String TOUCH_MOVE_ENDPOINT = "/action/touch/move";
  private static final String TOUCH_UP_ENDPOINT = "/action/touch/up";
  private static final String ZOOM_ENDPOINT = "/action/zoom";

  private static final Set<String> TV_DEVICE_TYPES =
      new HashSet<>(
          Arrays.asList(
              "fugu", "elfin", "adt3", "deadpool", "Sabrina", "sdk_goog3_atv", "cf_x86_tv"));
  private static final Set<String> AUTO_DEVICE_TYPES =
      new HashSet<>(Arrays.asList("bat_land", "bat", "hawk"));
  private static final Set<String> WEARABLE_DEVICE_TYPES = new HashSet<>(Arrays.asList());

  public boolean isMinicapStarted = false;
  public boolean isXmlDumperStarted = false;
  public boolean isRestartMinicap = false;
  private boolean dragInProgress = false;
  public Process xmlDumperProcess = null;
  private Device device;

  public String getDeviceId() {
    return device.getDeviceId();
  }

  public String clickDevice(Position pos) throws UicdDeviceHttpConnectionResetException {
    return clickDevice(pos, false);
  }

  public String clickDevice(Position pos, boolean isDoubleClick)
      throws UicdDeviceHttpConnectionResetException {
    // If click step is optional but user didn't use conditional click, the XML engine will return
    // (0,0). "adb shell input tap 0 0" will click something in certain screen and could break the
    // workflow.
    if (!pos.isValidPos()) {
      logger.info("Skip click at (0,0)");
      return "";
    }
    Position physicalPos = pos;
    if (!pos.isPhysicalPos) {
      physicalPos.x = ImageUtil.scaleToTargetPx((int) pos.x, hostScreenWidth, device.getWidth());
      physicalPos.y = ImageUtil.scaleToTargetPx((int) pos.y, hostScreenHeight, device.getHeight());
    }

    logger.info("Click device at: " + physicalPos.x + ", " + physicalPos.y);
    if (isDoubleClick) {
      doubleClickWithAdb(physicalPos);
    } else {
      clickDeviceWithAdb(physicalPos);
    }
    return "";
  }

  private void doubleClickWithAdb(Position pos) {
    try {
      List<String> output = new ArrayList<>();
      adbCommandLineUtil.executeAdb(
          GET_TOUCH_EVENT_CMD,
          this.getDeviceId(),
          output,
          (int) EXECUTE_COMMAND_LINE_TIME_OUT_IN_SECONDS.getSeconds());
      String event = output.get(0);
      adbCommandLineUtil.executeAdb(ROOT_ACCESS_CMD, this.getDeviceId());
      adbCommandLineUtil.executeAdb(
          String.format(CHANGE_EVENT_FILE_MODE, event), this.getDeviceId());
      adbCommandLineUtil.executeAdb(
          String.format(
              DOUBLE_CLICK_TEMPLATE.replace("%s", event),
              (int) pos.x,
              (int) pos.y,
              (int) pos.x,
              (int) pos.y),
          this.getDeviceId());
    } catch (UicdExternalCommandException | IndexOutOfBoundsException e) {
      logger.info("Fail to execute adb input." + e.getMessage());
    }
  }

  private void clickDeviceWithAdb(Position pos) {
    try {
      adbCommandLineUtil.executeAdb(
          String.format("adb shell input tap %d %d", (int) pos.x, (int) pos.y), this.getDeviceId());
    } catch (UicdExternalCommandException e) {
      logger.info("Fail to execute adb input." + e.getMessage());
    }
  }

  public String getElementAttributeBySelector(
      List<String> xmls, StrategyType strategy, String selector, String attributeName) {
    String xpath = getXpathBySelector(strategy, selector);
    return XmlHelper.getAttrByXpath(xmls, xpath, attributeName);
  }

  public Position getPosByElment(
      List<String> xmls, StrategyType strategy, String selector, double xRatio, double yRatio)
      throws UicdDeviceHttpConnectionResetException {
    String xpath = getXpathBySelector(strategy, selector);
    return XmlHelper.getPosByXpath(xmls, xpath, xRatio, yRatio);
  }

  private String getXpathBySelector(StrategyType strategy, String selector) {
    if (strategy == StrategyType.TEXT) {
      selector =
          String.format(
              "//*[contains(@text,'%s')] | //*[contains(@content-desc,'%s')]", selector, selector);
    } else if (strategy == StrategyType.TEXT_EQUALS) {
      selector = String.format("//*[@text='%s'] | //*[@content-desc='%s']", selector, selector);
    } else if (strategy == StrategyType.RESOURCEID) {
      selector = String.format("//*[@resource-id='%s']", selector);
    }
    return selector;
  }

  public void longClickDevice(Position pos, int duration) {
    if (!pos.isValidPos()) {
      logger.info("Skip click at (0,0)");
      return;
    }
    int deviceX = (int) pos.x;
    int deviceY = (int) pos.y;
    if (!pos.isPhysicalPos) {
      deviceX = ImageUtil.scaleToTargetPx((int) pos.x, hostScreenWidth, device.getWidth());
      deviceY = ImageUtil.scaleToTargetPx((int) pos.y, hostScreenHeight, device.getHeight());
    }
    logger.info("Long click real device: " + deviceX + ", " + deviceY + " " + duration + " ms.");
    try {
      adbCommandLineUtil.executeAdb(
          String.format(
              "adb shell input swipe %d %d %d %d %d", deviceX, deviceY, deviceX, deviceY, duration),
          this.getDeviceId());
    } catch (UicdExternalCommandException e) {
      logger.info("Fail to execute adb input." + e.getMessage());
    }
  }

  public String dragStart(Position pos) {
    dragInProgress = true;
    int deviceX = (int) pos.x;
    int deviceY = (int) pos.y;
    if (!pos.isPhysicalPos) {
      deviceX = ImageUtil.scaleToTargetPx((int) pos.x, hostScreenWidth, device.getWidth());
      deviceY = ImageUtil.scaleToTargetPx((int) pos.y, hostScreenHeight, device.getHeight());
    }
    HashMap<String, String> coordinationMap = new HashMap<>();
    coordinationMap.put("x", String.valueOf(deviceX));
    coordinationMap.put("y", String.valueOf(deviceY));
    HashMap<String, String> clickArgsMap = new HashMap<>();
    try {
      clickArgsMap.put("params", new ObjectMapper().writeValueAsString(coordinationMap));
    } catch (JsonProcessingException e) {
      logger.info(e.getMessage());
    }
    return sendPostRequestWithRetries(TOUCH_DOWN_ENDPOINT, clickArgsMap);
  }

  public String dragMove(Position pos) {
    if (!dragInProgress) {
      return "";
    }
    int deviceX = (int) pos.x;
    int deviceY = (int) pos.y;
    if (!pos.isPhysicalPos) {
      deviceX = ImageUtil.scaleToTargetPx((int) pos.x, hostScreenWidth, device.getWidth());
      deviceY = ImageUtil.scaleToTargetPx((int) pos.y, hostScreenHeight, device.getHeight());
    }
    HashMap<String, String> coordinationMap = new HashMap<>();
    coordinationMap.put("x", String.valueOf(deviceX));
    coordinationMap.put("y", String.valueOf(deviceY));
    HashMap<String, String> clickArgsMap = new HashMap<>();
    try {
      clickArgsMap.put("params", new ObjectMapper().writeValueAsString(coordinationMap));
    } catch (JsonProcessingException e) {
      logger.info(e.getMessage());
    }
    return sendPostRequestWithRetries(TOUCH_MOVE_ENDPOINT, clickArgsMap);
  }

  public String dragStop(Position pos) {
    dragInProgress = false;
    int deviceX = (int) pos.x;
    int deviceY = (int) pos.y;
    if (!pos.isPhysicalPos) {
      deviceX = ImageUtil.scaleToTargetPx((int) pos.x, hostScreenWidth, device.getWidth());
      deviceY = ImageUtil.scaleToTargetPx((int) pos.y, hostScreenHeight, device.getHeight());
    }
    HashMap<String, String> coordinationMap = new HashMap<>();
    coordinationMap.put("x", String.valueOf(deviceX));
    coordinationMap.put("y", String.valueOf(deviceY));
    HashMap<String, String> clickArgsMap = new HashMap<>();
    try {
      clickArgsMap.put("params", new ObjectMapper().writeValueAsString(coordinationMap));
    } catch (JsonProcessingException e) {
      logger.info(e.getMessage());
    }
    return sendPostRequestWithRetries(TOUCH_UP_ENDPOINT, clickArgsMap);
  }

  public String zoomDevice(
      int hostScreenStartX,
      int hostScreenStartY,
      int hostScreenEndX,
      int hostScreenEndY,
      boolean isZoomIn) {
    int deviceStartX =
        ImageUtil.scaleToTargetPx(hostScreenStartX, hostScreenWidth, device.getWidth());
    int deviceStartY =
        ImageUtil.scaleToTargetPx(hostScreenStartY, hostScreenHeight, device.getHeight());
    int deviceEndX = ImageUtil.scaleToTargetPx(hostScreenEndX, hostScreenWidth, device.getWidth());
    int deviceEndY =
        ImageUtil.scaleToTargetPx(hostScreenEndY, hostScreenHeight, device.getHeight());

    Position startP1 =
        new Position((deviceStartX + deviceEndX) / 2, (deviceStartY + deviceEndY) / 2);
    Position startP2 = new Position(startP1);
    Position endP1 = new Position(deviceStartX, deviceStartY);
    Position endP2 = new Position(deviceEndX, deviceEndY);
    if (!isZoomIn) {
      swapPosition(startP1, endP1);
      swapPosition(startP2, endP2);
    }
    HashMap<String, String> coordinationMap = new HashMap<>();
    coordinationMap.put("startX1", String.valueOf(startP1.x));
    coordinationMap.put("startY1", String.valueOf(startP1.y));
    coordinationMap.put("startX2", String.valueOf(startP2.x));
    coordinationMap.put("startY2", String.valueOf(startP2.y));
    coordinationMap.put("endX1", String.valueOf(endP1.x));
    coordinationMap.put("endY1", String.valueOf(endP1.y));
    coordinationMap.put("endX2", String.valueOf(endP2.x));
    coordinationMap.put("endY2", String.valueOf(endP2.y));
    HashMap<String, String> clickArgsMap = new HashMap<>();
    try {
      clickArgsMap.put("params", new ObjectMapper().writeValueAsString(coordinationMap));
    } catch (JsonProcessingException e) {
      logger.info(e.getMessage());
    }

    return sendPostRequestWithRetries(ZOOM_ENDPOINT, clickArgsMap);
  }

  public void swipeDevice(Position startPos, Position endPos) {
    swipeDevice((int) startPos.x, (int) startPos.y, (int) endPos.x, (int) endPos.y);
  }

  public void swipeDevice(
      int hostScreenStartX, int hostScreenStartY, int hostScreenEndX, int hostScreenEndY) {
    int deviceStartX =
        ImageUtil.scaleToTargetPx(hostScreenStartX, hostScreenWidth, device.getWidth());
    int deviceStartY =
        ImageUtil.scaleToTargetPx(hostScreenStartY, hostScreenHeight, device.getHeight());
    int deviceEndX = ImageUtil.scaleToTargetPx(hostScreenEndX, hostScreenWidth, device.getWidth());
    int deviceEndY =
        ImageUtil.scaleToTargetPx(hostScreenEndY, hostScreenHeight, device.getHeight());

    deviceEndY = Math.min(device.getHeight(), deviceEndY);
    deviceStartY = Math.min(device.getHeight() - 5, deviceStartY);

    try {
      adbCommandLineUtil.executeAdb(
          String.format(
              "adb shell input swipe %d %d %d %d",
              deviceStartX, deviceStartY, deviceEndX, deviceEndY),
          this.getDeviceId());
    } catch (UicdExternalCommandException e) {
      logger.info("Fail to execute adb input." + e.getMessage());
    }
  }

  public List<String> fetchCurrentXML() {
    return fetchCurrentXML(false);
  }

  public List<String> fetchCurrentXML(boolean withClassName) {
    logger.info("fetchCurrentXML is called");
    List<String> xmls = new ArrayList<>();
    if (UicdConfig.getInstance().isDisableXMLDumper()) {
      logger.info(
          "Can not fetchCurrentXML since xml dumper is disabled, please check the uicd config.");
      return xmls;
    }
    String queryString = withClassName ? DUMP_XML_WITH_CLASSNAME_QUERYSTRING : "";
    String rawResponse = sendGetRequestWithRetries(DUMP_XML_ENDPOINT + queryString);
    ObjectMapper mapper = new ObjectMapper();
    Map<String, Object> map;

    try {
      map = mapper.readValue(rawResponse, new TypeReference<Map<String, Object>>() {});
      @SuppressWarnings("unchecked") // safe covariant cast
      Map<String, String> xmlMap = (Map<String, String>) map.get("value");
      xmls = combineXmls(xmlMap);
    } catch (ClassCastException | IOException e) {
      logger.info(System.err.toString());
    }
    return xmls;
  }

  /**
   * The xml need to be sorted, so that our matching logic will work for the multilayer
   *
   * <p>Sample: { "width":1440, "height":2621, "xml_count": 4, "value": { "xml0": "...", "xml1":
   * "...", ... } }
   */
  public List<String> combineXmls(Map<String, String> xmlMap) {
    return xmlMap.entrySet().stream()
        .sorted(Map.Entry.comparingByKey())
        .map(x -> x.getValue())
        .collect(Collectors.toList());
  }

  private static final String CHARS_NEEDING_ESCAPE = "\\()<>|;&*\\~\"\'$ ";

  private static String sanitizeAdbInput(String s) {
    StringBuilder retString = new StringBuilder();
    for (int i = 0; i < s.length(); i++) {
      char currentChar = s.charAt(i);
      if (CHARS_NEEDING_ESCAPE.indexOf(currentChar) > -1) {
        retString.append("\\");
      }
      retString.append(currentChar);
    }
    return retString.toString();
  }

  public void inputString(String content) {
    try {
      adbCommandLineUtil.executeAdb(
          String.format("adb shell input text '%s'", sanitizeAdbInput(content)),
          this.getDeviceId());
    } catch (UicdExternalCommandException e) {
      logger.info("Fail to execute adb input." + e.getMessage());
    }
  }

  public void inputKeyCode(int c) {
    int convertedKeyCode = covertCharToKeyCode(c);
    try {
      adbCommandLineUtil.executeAdb(
          String.format("adb shell input keyevent %d", convertedKeyCode), this.getDeviceId());
    } catch (UicdExternalCommandException e) {
      logger.info("Fail to execute adb input." + e.getMessage());
    }
  }

  public double getWidthRatio() {
    return 1.0 * device.getWidth() / hostScreenWidth;
  }

  public double getHeightRatio() {
    return 1.0 * device.getHeight() / hostScreenHeight;
  }

  public Device getDevice() {
    return device;
  }

  public void setDevice(Device device) {
    this.device = device;
  }

  public void resetStatus() {
    this.xmlDumperProcess = null;
    this.isXmlDumperStarted = false;
    this.isMinicapStarted = false;
  }

  private String getXmlDumperUrl() {
    return HTTP_LOCALHOST + device.getXmlDumperHostPort();
  }

  private int covertCharToKeyCode(int c) {
    if (c >= 48 && c <= 57) {
      return c - 41;
    } else if (c >= 65 && c <= 90) {
      return c - 36;
    } else if (c == 32) {
      return 62;
    } else if (c == 8) {
      return 67;
    } else if (c == 13) {
      return 66;
    } else if (c == 190) {
      // .
      return 56;
    } else if (c > 1000) {
      c -= 1000;
      // @
      if (c == 50) {
        return 77;
      }
      // #
      if (c == 51) {
        return 18;
      }
    }

    // for default one, such as home button, back.
    return c;
  }

  public DeviceDimension setScaleByDeviceType() {
    int originalWidth = device.getWidth();
    int originalHeight = device.getHeight();
    String deviceType = device.getProduct();
    float scale = 0.5f;
    switch (device.getOrientation()) {
      case PORTRAIT:
        scale = 360.0f / originalWidth;
        break;
      case LANDSCAPE:
        scale = 360.0f / originalHeight;
        break;
    }

    Set<String> tvAndWearableSet = new HashSet<>();
    tvAndWearableSet.addAll(TV_DEVICE_TYPES);
    tvAndWearableSet.addAll(WEARABLE_DEVICE_TYPES);
    if (tvAndWearableSet.stream()
            .anyMatch(d -> Ascii.toLowerCase(deviceType).contains(Ascii.toLowerCase(d)))) {
      scale = 0.5f;
    }

    if (AUTO_DEVICE_TYPES.stream()
            .anyMatch(d -> Ascii.toLowerCase(deviceType).contains(Ascii.toLowerCase(d)))) {
      // Current Android auto resolution: 1024x600
      scale = 0.75f;
    }

    int displayWidth = getDisplayWidth(originalWidth, scale);
    int displayHeight = getDisplayHeight(originalHeight, scale);

    setHostScreenWidth(displayWidth);
    setHostScreenHeight(displayHeight);
    return DeviceDimension.create(displayWidth, displayHeight, scale);
  }

  public void stopMinicapServer() {
    isMinicapStarted = false;
    adbCommandLineUtil.removePortForwarding(device.getDeviceId(), device.getMinicapHostPort());
  }

  public void stopXmlDumperServer() {
    if (xmlDumperProcess != null) {
      xmlDumperProcess.destroy();
      xmlDumperProcess = null;
    }
    isXmlDumperStarted = false;
    adbCommandLineUtil.removePortForwarding(device.getDeviceId(), device.getXmlDumperHostPort());
    adbCommandLineUtil.forceStopXmlDumperOnDevice(device.getDeviceId());
  }

  public void startXmlDumperServer() throws UicdExternalCommandException {
    xmlDumperProcess =
        adbCommandLineUtil.startXmlDumperServer(
            getDeviceId(), device.getXmlDumperHostPort(), device.getXmlDumperDevicePort());

    // Sleep 5 seconds to make sure
    Uninterruptibles.sleepUninterruptibly(TIME_TO_START_XML_DUMPER_SERVER);
    isXmlDumperStarted = true;
  }

  private int getDisplayWidth(int originalWidth, float scale) {
    return (int) (originalWidth * scale);
  }

  private int getDisplayHeight(int originalHeight, float scale) {
    return (int) (originalHeight * scale);
  }

  public void rotateDevice(DeviceOrientation deviceOrientation)
      throws UicdExternalCommandException {
    if (!device.getOrientation().equals(deviceOrientation)) {
      if (UicdConfig.getInstance().isEnableMinicap()) {
        UicdCoreDelegator.getInstance().tryStopMinicap(getDeviceId());
      }
      String disableAutoRotateCmd = "adb shell settings put system accelerometer_rotation 0";
      String executeCmd =
          "shell settings put system user_rotation " + deviceOrientation.getOrientation();

      adbCommandLineUtil.executeAdb(disableAutoRotateCmd, getDeviceId(), true);
      adbCommandLineUtil.executeAdb(executeCmd, getDeviceId(), true);

      device.setOrientation(deviceOrientation);
      // minicap restart relies on dimensions being already rotated
      refreshScreenDimension();

      // only need restart in the minicap mode, for the scrcpy, there is no need to do that.
      if (UicdConfig.getInstance().isEnableMinicap()) {
        isRestartMinicap = true;
        isMinicapStarted = false;
        UicdCoreDelegator.getInstance()
            .tryRestartMinicap(
                getDeviceId(), Integer.parseInt(deviceOrientation.getOrientation()) * 90);
      }
    }
  }

  public void refreshScreenDimension() {
    String screenDimension = null;
    try {
      screenDimension = adbCommandLineUtil.getDeviceScreenSize(device.getDeviceId());
    } catch (UicdExternalCommandException e) {
      logger.warning(e.getMessage());
      return;
    }
    List<String> strs = Splitter.on('x').splitToList(screenDimension);
    switch (device.getOrientation()) {
      case PORTRAIT:
        device.setWidth(Integer.parseInt(strs.get(0).trim()));
        device.setHeight(Integer.parseInt(strs.get(1).trim()));
        break;
      case LANDSCAPE:
        device.setWidth(Integer.parseInt(strs.get(1).trim()));
        device.setHeight(Integer.parseInt(strs.get(0).trim()));
        break;
    }
    setScaleByDeviceType();
  }

  private String sendGetRequestWithRetries(String urlEndPoint) {
    for (int i = 0; i < NUM_XML_DUMP_RETRIES; i++) {
      logger.info("Sending getRequest attempt: " + i);
      try {
        return HttpProxyUtils.getRequestAsString(getXmlDumperUrl() + urlEndPoint);
      } catch (UicdDeviceHttpConnectionResetException e) {
        logger.severe(e.getMessage());
      }
      stopXmlDumperServer();
      try {
        startXmlDumperServer();
      } catch (UicdExternalCommandException e) {
        logger.severe(e.getMessage());
      }
    }
    return "";
  }

  private String sendPostRequestWithRetries(String urlEndPoint, String contentMap) {
    for (int i = 0; i < NUM_XML_DUMP_RETRIES; i++) {
      try {
        return HttpProxyUtils.postRequestAsString(getXmlDumperUrl() + urlEndPoint, contentMap);
      } catch (UicdDeviceHttpConnectionResetException e) {
        logger.severe(e.getMessage());
      }
      stopXmlDumperServer();
      try {
        startXmlDumperServer();
      } catch (UicdExternalCommandException e) {
        logger.severe(e.getMessage());
      }
    }
    return "";
  }

  private <V> String sendPostRequestWithRetries(String urlEndPoint, HashMap<String, V> contentMap) {
    try {
      return sendPostRequestWithRetries(
          urlEndPoint, new ObjectMapper().writeValueAsString(contentMap));
    } catch (JsonProcessingException e) {
      logger.severe(e.getMessage());
    }
    return "";
  }

  private void swapPosition(Position p1, Position p2) {
    double tmpX = p1.x;
    double tmpY = p1.y;
    p1.x = p2.x;
    p1.y = p2.y;
    p2.x = tmpX;
    p2.y = tmpY;
  }

  public int getHostScreenWidth() {
    return hostScreenWidth;
  }

  public int getHostScreenHeight() {
    return hostScreenHeight;
  }
}
