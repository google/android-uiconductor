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

import com.google.common.collect.Iterables;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.exceptions.UicdDeviceException;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.utils.ADBCommandLineUtil;
import com.google.uicd.backend.core.utils.JsonUtil;
import java.io.IOException;
import java.net.ServerSocket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/** DevicesDriverManager, for managing devices and starting xmldumper service on devices. */
public class DevicesDriverManager {
  private static final Object lock = new Object();
  protected Logger logger = LogManager.getLogManager().getLogger("uicd");
  private static DevicesDriverManager instance;
  private final HashMap<String, AndroidDeviceDriver> androidDriverLinkedMap = new LinkedHashMap<>();
  public HashSet<String> initXmlDumperDevices = new HashSet<>();
  private int selectedDeviceIndex = 0;
  private final ADBCommandLineUtil adbCommandLineUtil;

  // Returns a random free port
  private static int getNewPort() throws UicdExternalCommandException {
    int localPort;
    try (ServerSocket s = new ServerSocket(0)) {
      localPort = s.getLocalPort();
    } catch (IOException e) {
      throw new UicdExternalCommandException("failed to find a free port: " + e);
    }
    return localPort;
  }

  public static DevicesDriverManager getInstance() {
    if (instance == null) {
      instance = new DevicesDriverManager();
    }
    return instance;
  }
  public DevicesDriverManager() {
    this.adbCommandLineUtil = new ADBCommandLineUtil();
  }

  public Device getDevice(String deviceId) {
    return androidDriverLinkedMap.get(deviceId).getDevice();
  }

  public void stopXmlDumperServer(String deviceId) throws UicdExternalCommandException {
    if (!androidDriverLinkedMap.containsKey(deviceId)) {
      return;
    }
    androidDriverLinkedMap.get(deviceId).stopXmlDumperServer();
    initXmlDumperDevices.remove(deviceId);
  }

  // This function is used by Mobileharness driver.
  public void stopMultiXmlDumperServer(List<String> deviceIds) {
    try {
      for (String deviceId : deviceIds) {
        stopXmlDumperServer(deviceId);
      }
    } catch (UicdExternalCommandException e) {
      logger.info("Error in stop xmldumper server: " + e.getMessage());
    }
  }

  public Optional<String> getXmlDumperVersion(String deviceId) {
    return adbCommandLineUtil.getXmlDumperApkVersion(deviceId);
  }

  public void startXmlDumperServer(String deviceId, boolean isUpdateApk)
      throws UicdExternalCommandException {
    AndroidDeviceDriver androidDeviceDriver = androidDriverLinkedMap.get(deviceId);
    if (UicdConfig.getInstance().isDisableXMLDumper()) {
      logger.info("xml dumper disabled, skip install and start.");
      return;
    }
    if (isUpdateApk) {
      adbCommandLineUtil.updateXmlDumperApk(
          androidDeviceDriver.getDeviceId(), androidDeviceDriver.getDevice().getApiLevel());
    }
    androidDeviceDriver.startXmlDumperServer();
  }

  public void turnOffAutoRotation(String deviceId) throws UicdExternalCommandException {
    adbCommandLineUtil.turnOffAutoRotation(deviceId);
  }

  // Used by Mobile Harness Nuwa driver. In MH, we are still using AndroidNuwa as driver.
  public void startMultiXmlDumperServer(List<String> deviceIds, boolean isUpdateApk)
      throws UicdExternalCommandException {
    logger.info("Start startMultiXmlDumperServer...");
    for (String deviceId : deviceIds) {
      startXmlDumperServer(deviceId, isUpdateApk);
    }
    logger.info("Finish startMultiXmlDumperServer...");
  }

  // Used by Mobile Harness Nuwa driver. In MH, we are still using AndroidNuwa as driver.
  public void startMultiXmlDumperServer(List<String> deviceIds)
      throws UicdExternalCommandException {
    startMultiXmlDumperServer(deviceIds, false);
  }

  public AndroidDeviceDriver getSelectedAndroidDeviceDriver() {
    return getXmlDumperDriverList().get(selectedDeviceIndex);
  }

  public Device getMasterDevice() {
    return getXmlDumperDriverList().get(selectedDeviceIndex).getDevice();
  }

  public void initDevicesList(List<String> deviceIds) throws UicdExternalCommandException {
    // We are trying to access the same resource(adb forward port), added lock to prevent race
    // condition.
    synchronized (lock) {
      initDevicesList(deviceIds, true);
    }
  }

  // In local mode, we always reuse the ports. Since testing could stopped by the user
  // at any time, there is no good way to clean up the ports for now.
  // We don't have this issue on Mobile Harness, since we need clean up the port after each run.
  public void initDevicesList(List<String> deviceIds, boolean autoAllocate)
      throws UicdExternalCommandException {
    logger.info("Start initDeviceList...");
    if (deviceIds.isEmpty()) {
      logger.warning("Devices list is empty returning.");
      return;
    }
    // Reset Xmldumper Mapping
    initXmlDumperDevices.clear();
    androidDriverLinkedMap.clear();

    int deviceIndex = 0;
    for (String deviceId : deviceIds) {
      logger.info("Init " + deviceId);
      String screenSizeStr = adbCommandLineUtil.getDeviceScreenSize(deviceId);
      String productName = adbCommandLineUtil.getDeviceProductName(deviceId);
      int apiLevel = adbCommandLineUtil.getDeviceApiLevel(deviceId);
      ArrayList<String> adbOutput = new ArrayList<>();
      adbCommandLineUtil.executeAdb(
          "adb shell dumpsys input | grep 'SurfaceOrientation' | awk '{ print $2 }'",
          deviceId,
          adbOutput);
      String orientation = Iterables.getFirst(adbOutput, "0");
      Device device =
          new Device(
              deviceId,
              screenSizeStr,
              productName,
              deviceIndex,
              apiLevel,
              orientation);
      // initProperties requires an external adb call. instead of calling it inside the constructor,
      //  call it separately.
      device.initProperties();

      // Allocate the port here to fix the multithread issue. We should forward all ports in
      // initDevicesList. However minicap is a little bit complicate. Currently in the CLI and
      // Mobileharness, we don't need minicap, and the multithread issue only happened in MH.
      // set the port forward here, so that the port is occupied immediately, other thread will
      // get the current port.
      String forwardCmd = "forward tcp:%d tcp:%d";
      // find a random port here for xmlDumperHostPort
      int freePort;
      // In some cases we want to fixed ports instead of random generated ports, e.g. when we do the
      // port forwarding through ssh for minicap/xmldumper
      int adbForwardStartPort = UicdConfig.getInstance().getAdbForwardStartPort();
      if (adbForwardStartPort <= 0) {
        synchronized (this) {
          freePort = getNewPort();
          adbCommandLineUtil.executeAdb(
              String.format(forwardCmd, freePort, device.getXmlDumperDevicePort()), deviceId);
        }
        device.setXmlDumperHostPort(freePort);
        device.setMinicapHostPort(getNewPort());
        device.setMinicapWebServerPort(getNewPort());
        device.setSnippetClientHostPort(getNewPort());
      } else {
        // To make it simple, 10 ports for each device, should only run in local mode.
        int deviceOffset = deviceIndex * 10;
        device.setXmlDumperHostPort(adbForwardStartPort + deviceOffset);
        device.setMinicapHostPort(adbForwardStartPort + deviceOffset + 1);
        device.setMinicapWebServerPort(adbForwardStartPort + deviceOffset + 2);
        device.setSnippetClientHostPort(adbForwardStartPort + deviceOffset + 3);
      }
      logger.info(device.toString());
      AndroidDeviceDriver androidDeviceDriver = new AndroidDeviceDriver(device);
      androidDriverLinkedMap.put(deviceId, androidDeviceDriver);
      deviceIndex++;
      androidDeviceDriver.refreshScreenDimension();
    }
    logger.info("Finish initDeviceList...");
  }

  public AndroidDeviceDriver getAndroidDriverByDeviceId(String deviceId)
      throws UicdDeviceException {
    if (!androidDriverLinkedMap.containsKey(deviceId)) {
      throw new UicdDeviceException("Can not find dirver for device:" + deviceId);
    }
    return androidDriverLinkedMap.get(deviceId);
  }

  public int getSelectedDeviceIndex() {
    return selectedDeviceIndex;
  }

  public void setSelectedDeviceIndex(int selectedDeviceIndex) {
    this.selectedDeviceIndex = selectedDeviceIndex;
  }

  public void setSelectedDeviceByDeviceId(String deviceId) throws UicdDeviceException {
    this.selectedDeviceIndex =
        this.getAndroidDriverByDeviceId(deviceId).getDevice().getDeviceIndex();
  }

  public List<AndroidDeviceDriver> getXmlDumperDriverList() {
    return new ArrayList<>(this.getAndroidDriverLinkedMap().values());
  }

  public List<String> getDeviceList() {
    return new ArrayList<>(this.getAndroidDriverLinkedMap().keySet());
  }

  public HashMap<String, AndroidDeviceDriver> getAndroidDriverLinkedMap() {
    return androidDriverLinkedMap;
  }

  public void reset() {
    for (AndroidDeviceDriver androidDeviceDriver : instance.androidDriverLinkedMap.values()) {
      killXmlDumperServer(androidDeviceDriver);
    }
    instance = new DevicesDriverManager();
  }

  public void killXmlDumperServer(AndroidDeviceDriver androidDeviceDriver) {
    try {
      Device device = androidDeviceDriver.getDevice();
      String deviceId = device.getDeviceId();
      adbCommandLineUtil.executeAdb(
          "forward --remove tcp:" + device.getXmlDumperHostPort(), deviceId, true /* waitFor */);
      adbCommandLineUtil.executeAdb(
          String.format("shell killall %s", UicdConfig.getInstance().getXmldumperPackagePrefix()),
          deviceId,
          true /* waitFor */);
    } catch (UicdExternalCommandException e) {
      DevicesDriverManager.getInstance().logger.info(e.getMessage());
    }
  }

  /**
   * Get the devices status
   * @return Devices status in Json format.
   * [{"deviceId":"873YXXXXX","minicapPort":1717,"status":""}]
   */
  public static String getDevicesStatus() {
    return JsonUtil.toJson(getDevicesStatusDetails());
  }

  /** Returns devices status details in the DevicesStatusResponse format */
  public static List<DeviceStatus> getDevicesStatusDetails() {
    return instance.androidDriverLinkedMap.values().stream()
            .map(d -> d.getDevice().getDeviceStatus()).collect(Collectors.toList());

  }
}
