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

package com.google.uicd.backend.core.devicesdriver;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.base.Splitter;
import com.google.uicd.backend.core.constants.DeviceOrientation;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.utils.ADBCommandLineUtil;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/** Uicd Device, store the device information. */
public class Device {
  protected Logger logger = LogManager.getLogManager().getLogger("uicd");

  public Device() {}

  public Device(
      String deviceId,
      int width,
      int height,
      String productName,
      int xmlDumperHostPort,
      int minicapHostPort,
      int minicapWebServerPort,
      int snippetClientHostPort,
      int deviceIndex,
      int apiLevel,
      String orientation) {
    this.init(
        deviceId,
        width,
        height,
        productName,
        xmlDumperHostPort,
        minicapHostPort,
        minicapWebServerPort,
        snippetClientHostPort,
        deviceIndex,
        apiLevel,
        orientation);
  }

  public Device(
      String deviceId,
      String screenDimension,
      String productName,
      int xmlDumperHostPort,
      int minicapHostPort,
      int minicapWebServerPort,
      int snippetClientHostPort,
      int deviceIndex,
      int apiLevel,
      String orientation) {
    List<String> strs = Splitter.on('x').splitToList(screenDimension);
    int width = Integer.parseInt(strs.get(0).trim());
    int height = Integer.parseInt(strs.get(1).trim());
    this.init(
        deviceId,
        width,
        height,
        productName,
        xmlDumperHostPort,
        minicapHostPort,
        minicapWebServerPort,
        snippetClientHostPort,
        deviceIndex,
        apiLevel,
        orientation);
  }

  private static final String BUILD_VERSION_RELEASE_KEY = "ro.build.version.release";
  private static final String BUILD_VERSION_SDK_KEY = "ro.build.version.sdk";
  private static final String PRODUCT_CPU_ABI_KEY = "ro.product.cpu.abi";
  private static final String BUILD_ID_KEY = "ro.build.id";
  private final int minicapDevicePort = 1717;
  private final int xmlDumperDevicePort = 6790;

  private int minicapHostPort = 1717;
  private int minicapWebServerPort = 9002;
  private int xmlDumperHostPort = 6790;
  private int snippetClientHostPort = 44200;
  private String deviceId;
  private int apiLevel;

  private int deviceIndex;

  private int width;
  private int height;
  private String product;
  private String model;
  private String device;
  private DeviceOrientation orientation = DeviceOrientation.PORTRAIT;

  private final Map<String, String> properties = new HashMap<>();

  public void initProperties() {
    List<String> output = new ArrayList<>();
    try {
      ADBCommandLineUtil.executeAdb("adb shell getprop ", this.deviceId, output);
    } catch (UicdExternalCommandException e) {
      logger.warning("Failed to run adb shell getprop. " + e.getMessage());
    }
    // Adb shell getprop will return something like this:
    // [ro.build.version.release]: [P]
    // [ro.build.version.sdk]: [27]
    // [ro.product.cpu.abi]: [arm64-v8a]
    // [ro.build.id]: [AAAA.180513.001]
    for (String str : output) {
      str = str.replaceAll("[\\[\\]]", "");
      List<String> items = Splitter.on(':').splitToList(str);
      if (items.size() == 2) {
        properties.put(items.get(0).trim(), items.get(1).trim());
      }
    }
  }

  public String getReleaseVersion() {
    return properties.get(BUILD_VERSION_RELEASE_KEY);
  }

  public String getSdkVersion() {
    return properties.get(BUILD_VERSION_SDK_KEY);
  }

  public String getAbi() {
    return properties.get(PRODUCT_CPU_ABI_KEY);
  }

  public String getBuildId() {
    return properties.get(BUILD_ID_KEY);
  }

  public void setDeviceId(String deviceId) {
    this.deviceId = deviceId;
  }

  public void setProduct(String product) {
    this.product = product;
  }

  public void setModel(String model) {
    this.model = model;
  }

  public void setDevice(String device) {
    this.device = device;
  }

  @Override
  public String toString() {
    return String.format(
        "deviceId: %s | minicapHostPort: %d | minicapWebServerPort: %d | xmlDumperHostPort: %d",
        deviceId, minicapHostPort, minicapWebServerPort, xmlDumperHostPort);
  }

  public int getMinicapDevicePort() {
    return minicapDevicePort;
  }

  public int getMinicapHostPort() {
    return minicapHostPort;
  }

  public int getMinicapWebServerPort() {
    return minicapWebServerPort;
  }

  public int getXmlDumperDevicePort() {
    return xmlDumperDevicePort;
  }

  public int getXmlDumperHostPort() {
    return xmlDumperHostPort;
  }

  public int getSnippetClientHostPort() {
    return snippetClientHostPort;
  }

  public String getDeviceId() {
    return deviceId;
  }

  public int getWidth() {
    return width;
  }

  public int getHeight() {
    return height;
  }

  public void setWidth(int width) {
    this.width = width;
  }

  public void setHeight(int height) {
    this.height = height;
  }

  public String getProduct() {
    return product;
  }

  public int getApiLevel() {
    return apiLevel;
  }

  private void init(
      String deviceId,
      int width,
      int height,
      String productName,
      int xmlDumperHostPort,
      int minicapHostPort,
      int minicapWebServerPort,
      int snippetClientHostPort,
      int deviceIndex,
      int apiLevel,
      String orientation) {

    this.deviceId = deviceId;
    this.width = width;
    this.height = height;
    this.product = productName;
    this.xmlDumperHostPort = xmlDumperHostPort;
    this.minicapHostPort = minicapHostPort;
    this.minicapWebServerPort = minicapWebServerPort;
    this.snippetClientHostPort = snippetClientHostPort;
    this.deviceIndex = deviceIndex;
    this.apiLevel = apiLevel;
    setOrientation(DeviceOrientation.fromOrientationCode(orientation));
  }

  public String toJson() {
    ObjectMapper objectMapper = new ObjectMapper();
    ObjectNode node = objectMapper.createObjectNode();
    node.put("serial", this.deviceId);
    node.put("product", this.product);
    node.put("model", this.model);
    node.put("device", this.device);

    return node.toString();
  }

  // Information need for frontend to connect backend service.
  public DeviceStatus getDeviceStatus() {
    return DeviceStatus.create(
        this.deviceId, this.minicapWebServerPort, this.deviceIndex, "", this.width, this.height);
  }

  public static List<Device> getDevicesListFromString(List<String> commandLineOut) {
    List<Device> devices = new ArrayList<>();
    for (String s : commandLineOut) {
      if (s.isEmpty() || s.contains("List of devices attached") || s.contains("daemon")) {
        continue;
      }
      Device device = new Device();
      Scanner scanner = new Scanner(s);
      device.setDeviceId(scanner.next());

      while (scanner.hasNext()) {
        String str = scanner.next();
        if (str.startsWith("product:")) {
          device.setProduct(str);
        } else if (str.startsWith("model:")) {
          device.setModel(str);
        } else if (str.startsWith("device:")) {
          device.setDevice(str);
        }
      }
      devices.add(device);
    }
    return devices;
  }

  public int getDeviceIndex() {
    return deviceIndex;
  }

  public void setOrientation(DeviceOrientation direction) {
    this.orientation = direction;
  }

  public DeviceOrientation getOrientation() {
    return orientation;
  }
}
