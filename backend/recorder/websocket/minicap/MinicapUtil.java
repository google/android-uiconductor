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

package com.google.uicd.backend.recorder.websocket.minicap;

import com.google.common.base.Ascii;
import com.google.common.primitives.Ints;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.devicesdriver.Device;
import com.google.uicd.backend.core.devicesdriver.DeviceDimension;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.utils.ADBCommandLineUtil;
import com.google.uicd.backend.core.utils.CommandLineUtil;
import com.google.uicd.backend.recorder.websocket.minicap.jetty.MinicapJettyServer;
import com.google.uicd.backend.recorder.websocket.minicap.jetty.MinicapServerManager;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
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
  private static final String TMP_DIR_ON_DEVICE = "/data/local/tmp";

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
    ADBCommandLineUtil adbCommandLineUtil = new ADBCommandLineUtil();
    try {
      adbCommandLineUtil.executeAdb(
          String.format("adb shell \"mkdir %s 2>/dev/null || true\"", MINICAP_TMP_DIR_ON_DEVICE),
          device.getDeviceId());
      String minicapStaticFilePath =
          Paths.get(minicapBasePath, "libs", device.getAbi(), "minicap").toString();

      // Push static file
      adbCommandLineUtil.executeAdb(
          String.format("adb push %s %s", minicapStaticFilePath, MINICAP_TMP_DIR_ON_DEVICE),
          device.getDeviceId());

      // Push minicap.so
      adbCommandLineUtil.executeAdb(
          String.format(
              "adb push %s %s",
              getMinicapFilePath(device, minicapBasePath), MINICAP_TMP_DIR_ON_DEVICE),
          device.getDeviceId());
    } catch (UicdExternalCommandException e) {
      logger.warning("Failed to push minicap files." + e.getMessage());
    }
  }

  private static void pushScrcpyFileToDevice(Device device) {
    ADBCommandLineUtil adbCommandLineUtil = new ADBCommandLineUtil();
    try {
      String scrcpyApkPath =
          Paths.get(UicdConfig.getInstance().getDepsFolder(), "scrcpy", "scrcpy-server.apk")
              .toString();
      // Push static file
      adbCommandLineUtil.executeAdb(
          String.format("adb push %s %s", scrcpyApkPath, TMP_DIR_ON_DEVICE), device.getDeviceId());

    } catch (UicdExternalCommandException e) {
      logger.warning("Failed to push scrcpy files." + e.getMessage());
    }
  }

  private static void grantMinicapPermission(Device device) {
    ADBCommandLineUtil adbCommandLineUtil = new ADBCommandLineUtil();
    try {
      adbCommandLineUtil.executeAdb(
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

    List<String> androidRBuildIdKeyWordList = Arrays.asList("MASTER", "SP1A");
    boolean isAndroidSBranch =
        androidRBuildIdKeyWordList.stream()
            .parallel()
            .anyMatch(x -> Ascii.toUpperCase(buildId).contains(x));
    // 30 (Android R) is the max version minicap currently supports.
    if (sdkIntVersion == null || sdkIntVersion > 30 || (sdkIntVersion == 30 && isAndroidSBranch)) {
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

    if (UicdConfig.getInstance().isEnableMinicap()) {
      pushMinicapFiles(androidDeviceDriver.getDevice());
      grantMinicapPermission(androidDeviceDriver.getDevice());
    } else {
      pushScrcpyFileToDevice(androidDeviceDriver.getDevice());
    }

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
    CommandLineUtil commandLineUtil = new CommandLineUtil();
    if (UicdConfig.getInstance().isEnableMinicap()) {

      String stopMinicapCmd =
          String.format(
              "adb -s %s shell ps | grep minicap | awk '{print $2}' | xargs adb -s %s shell kill",
              deviceId, deviceId);

      try {
        commandLineUtil.execute(stopMinicapCmd, new ArrayList<>(), true);
      } catch (UicdExternalCommandException e) {
        logger.warning("Can not stop minicap.");
      }
    } else {
      String stopScrcpyCmd =
          String.format(
              "adb -s %s shell ps -A -f | grep scrcpy | awk '{print $2}' | xargs adb -s %s shell"
                  + " kill",
              deviceId, deviceId);

      try {
        commandLineUtil.execute(stopScrcpyCmd, new ArrayList<>(), true);
      } catch (UicdExternalCommandException e) {
        logger.warning("Can not stop scrcpy.");
      }
    }
  }

  public static void deviceCallbackOperation(AndroidDeviceDriver driver) {
    MinicapServerManager.getInstance()
        .stopMinicapOnPort(driver.getDeviceId(), driver.getDevice().getMinicapWebServerPort());
    MinicapUtil.startMinicap(driver, 0);
  }
}
