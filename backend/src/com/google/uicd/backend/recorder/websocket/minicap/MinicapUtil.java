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

package com.google.wireless.qa.uicd.backend.recorder.websocket.minicap;

import com.google.common.base.Ascii;
import com.google.common.primitives.Ints;
import com.google.wireless.qa.uicd.backend.core.config.UicdConfig;
import com.google.wireless.qa.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.wireless.qa.uicd.backend.core.devicesdriver.Device;
import com.google.wireless.qa.uicd.backend.core.devicesdriver.DeviceDimension;
import com.google.wireless.qa.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.wireless.qa.uicd.backend.core.utils.ADBCommandLineUtil;
import com.google.wireless.qa.uicd.backend.core.utils.CommandLineUtil;
import com.google.wireless.qa.uicd.backend.recorder.websocket.minicap.jetty.MinicapJettyServer;
import com.google.wireless.qa.uicd.backend.recorder.websocket.minicap.jetty.MinicapServerManager;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.logging.LogManager;
import java.util.logging.Logger;

public class MinicapUtil {
  private static Logger logger = LogManager.getLogManager().getLogger("uicd");
  public static HashMap<AndroidDeviceDriver, MinicapService> deviceMinicapMapping = new HashMap<>();
  public static HashMap<AndroidDeviceDriver, MinicapJettyServer> deviceMinicapServerMapping =
      new HashMap<>();
  // The path to minicap on the device. It has to be linux format, don't use paths.get().
  private static final String MINICAP_TMP_DIR_ON_DEVICE = "/data/local/tmp/minicap-devel";

  public static String restartMinicap(String deviceId, int rotate) {
    String ret = "";
    Optional<AndroidDeviceDriver> androidDeviceDriver =
        deviceMinicapServerMapping.keySet().stream()
            .filter(p -> p.getDeviceId().equals(deviceId))
            .findFirst();
    if (!androidDeviceDriver.isPresent()) {
      logger.warning("Failed to restart minicap, cannot find the device driver.");
      return ret;
    }
    // "BiConsumer" in the UicdCoreDelegator doesn't like "exception", handling here.
    startMinicap(androidDeviceDriver.get(), rotate);
    return ret;
  }

  private static void pushMinicapFiles(Device device) {
    String minicapBasePath =
        Paths.get(UicdConfig.getInstance().getDepsFolder(), "minicap").toString();

    try {
      ADBCommandLineUtil.executeAdb(
          String.format("adb shell \"mkdir %s 2>/dev/null || true\"", MINICAP_TMP_DIR_ON_DEVICE),
          device.getDeviceId());
      String minicapStaticFilePath =
          Paths.get(minicapBasePath, "libs", device.getAbi(), "minicap").toString();

      // Push static file
      ADBCommandLineUtil.executeAdb(
          String.format("adb push %s %s", minicapStaticFilePath, MINICAP_TMP_DIR_ON_DEVICE),
          device.getDeviceId());

      // Push minicap.so
      ADBCommandLineUtil.executeAdb(
          String.format(
              "adb push %s %s",
              getMinicapFilePath(device, minicapBasePath), MINICAP_TMP_DIR_ON_DEVICE),
          device.getDeviceId());
    } catch (UicdExternalCommandException e) {
      logger.warning("Failed to push minicap files." + e.getMessage());
    }
  }

  private static void grantMinicapPermission(Device device) {
    try {
      ADBCommandLineUtil.executeAdb(
          String.format("shell chmod -R 777 %s", MINICAP_TMP_DIR_ON_DEVICE), device.getDeviceId());
    } catch (UicdExternalCommandException e) {
      logger.warning("Failed to grant permission for minicap files." + e.getMessage());
    }
  }

  private static String getMinicapFilePath(Device device, String minicapBasePath) {
    String minicapVersionSuffix = device.getSdkVersion();
    String abi = device.getAbi();
    String buildId = device.getBuildId();
    Integer sdkIntVersion = Ints.tryParse(minicapVersionSuffix);

    // For PPR1, the standard minicap.so for android-28 doesn't work. Keep this logic here since
    // there are still some devices in PPR1.
    if (Ascii.toUpperCase(buildId).contains("PPR1")
        || Ascii.toUpperCase(device.getReleaseVersion()).equals("9")) {
      minicapVersionSuffix = "28-ppr1";
    }

    // 29 (Android Q) is the max version minicap currently supports.
    if (sdkIntVersion == null
        || sdkIntVersion > 28
        || Ascii.toUpperCase(device.getReleaseVersion()).equals("R")) {
      minicapVersionSuffix = "master";
    }

    return Paths.get(
            minicapBasePath,
            "jni",
            "minicap-shared",
            "aosp",
            "libs",
            "android-" + minicapVersionSuffix,
            abi,
            "minicap.so")
        .toString();
  }

  public static String startMinicap(AndroidDeviceDriver androidDeviceDriver, int rotate) {
    String deviceId = androidDeviceDriver.getDeviceId();

    DeviceDimension displayDimension = androidDeviceDriver.setScaleByDeviceType();
    if (androidDeviceDriver.isMinicapStarted) {
      return "{\"width\":"
          + displayDimension.width()
          + ",\"height\":"
          + displayDimension.height()
          + "}";
    }

    int hostPort = androidDeviceDriver.getDevice().getMinicapHostPort();
    int serverPort = androidDeviceDriver.getDevice().getMinicapWebServerPort();
    System.out.println(
        "Starting minicap for "
            + deviceId
            + " hostport: "
            + hostPort
            + " webserverport: "
            + serverPort);

    List<String> ret = new ArrayList<>();
    pushMinicapFiles(androidDeviceDriver.getDevice());
    grantMinicapPermission(androidDeviceDriver.getDevice());

    MinicapJettyServer minicapServer = deviceMinicapServerMapping.get(androidDeviceDriver);

    if (minicapServer == null) {
      minicapServer = MinicapServerManager.getInstance().createNewServer(serverPort, deviceId);
      deviceMinicapServerMapping.put(androidDeviceDriver, minicapServer);
      MinicapServerManager.getInstance().runServer(minicapServer);
    }
    // Get the new rotated dimensions
    int originalWidth = androidDeviceDriver.getDevice().getWidth();
    int originalHeight = androidDeviceDriver.getDevice().getHeight();
    if (androidDeviceDriver.isRestartMinicap) {
      MinicapService minicapService = deviceMinicapMapping.get(androidDeviceDriver);
      minicapService.reStart(originalWidth, originalHeight, displayDimension.scale(), rotate);
    } else {
      BlockingQueue<byte[]> imgdataQueue = new LinkedBlockingQueue<byte[]>();
      Integer port = minicapServer.getPort();
      MinicapService minicapService = new MinicapService(deviceId, imgdataQueue);
      minicapService.reStart(originalWidth, originalHeight, displayDimension.scale(), rotate);
      deviceMinicapMapping.put(androidDeviceDriver, minicapService);
      MinicapServerManager.portQueueMapping.put(port, imgdataQueue);
      MinicapServerManager.getInstance().sendImage(minicapServer);
    }

    androidDeviceDriver.isMinicapStarted = true;
    if (rotate == 90) {
      return "{\"width\":"
          + displayDimension.height()
          + ",\"height\":"
          + displayDimension.width()
          + ",\"status\":\"done\", \"command result\":\""
          + String.join(" ", ret)
          + "\"}";
    } else {
      return "{\"width\":"
          + displayDimension.width()
          + ",\"height\":"
          + displayDimension.height()
          + ",\"status\":\"done\", \"command result\":\""
          + String.join(" ", ret)
          + "\"}";
    }
  }

  public static void stopMinicap(String deviceId) {
    String stopMinicapCmd =
        String.format(
            "adb -s %s shell ps | grep minicap | awk '{print $2}' | xargs adb -s %s shell kill",
            deviceId, deviceId);

    try {
      CommandLineUtil.execute(stopMinicapCmd, new ArrayList<>(), true);
    } catch (UicdExternalCommandException e) {
      logger.warning("Can not stop minicap.");
    }
  }

  public static void deviceCallbackOperation(AndroidDeviceDriver driver) {
    MinicapServerManager.getInstance()
        .stopMinicapOnPort(driver.getDeviceId(), driver.getDevice().getMinicapWebServerPort());
    MinicapUtil.startMinicap(driver, 0);
  }
}
