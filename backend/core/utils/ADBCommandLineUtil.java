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

package com.google.uicd.backend.core.utils;

import com.google.common.base.Splitter;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/** Helper functions executing adb command */
public class ADBCommandLineUtil {

  private static final String DEFAULT_SCREEN_SIZE = "1080x1920";
  // There are up to 3 ports we need allocate for each device when we run Uicd.
  // dumperHostPort, minicapHostPort, minicapWebServerPort. It will be stored in Device object.
  private static final int NUM_DYNAMIC_PORTS = 4;
  private static final int MINIMUM_API_LEVEL_FOR_PERMISSION_GRANT_FLAG = 23;
  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");

  public static Process executeReboot(String deviceId, List<String> output)
      throws UicdExternalCommandException {
    String adbShellPath = UicdConfig.getInstance().getAdbShellPath();
    String adbPrefix = String.format("%s -s %s ", adbShellPath, deviceId);
    String commandStr = adbPrefix + "reboot &&" + adbPrefix + " wait-for-device";
    return CommandLineUtil.execute(commandStr, output, true, 120);
  }

  public static String constructAdbCommand(String commandLine, String deviceId) {
    String adbShellPath = UicdConfig.getInstance().getAdbShellPath();
    String adbPrefix = String.format("%s -s %s ", adbShellPath, deviceId);

    if (deviceId.isEmpty()) {
      adbPrefix = adbShellPath;
    }
    if (!commandLine.startsWith("adb")) {
      commandLine = adbPrefix + " " + commandLine;
    } else {
      commandLine = commandLine.replace("adb", adbPrefix);
    }

    return commandLine;
  }

  public static String constructAdbLogcatCommand(String commandLine, String deviceId) {
    String adbPrefix =
        String.format("%s -s %s ", UicdConfig.getInstance().getAdbShellPath(), deviceId);

    if (commandLine.contains("logcat") && !commandLine.contains("logcat -d")) {
      commandLine = commandLine.replace("logcat", "logcat -d");
    }
    if (commandLine.contains("adb")) {
      return commandLine.replace("adb", adbPrefix);
    } else {
      return adbPrefix + commandLine;
    }
  }

  public static Process executeAdbLogcatCommand(
      String commandLine, String deviceId, List<String> output, int timeout)
      throws UicdExternalCommandException {
    String adbLogcatCmd = constructAdbLogcatCommand(commandLine, deviceId);
    return CommandLineUtil.execute(adbLogcatCmd, output, true, timeout);
  }

  public static Process executeAdb(String commandLine, String deviceId, boolean waitFor)
      throws UicdExternalCommandException {
    String cmd = constructAdbCommand(commandLine, deviceId);
    List<String> output = new ArrayList<>();
    return CommandLineUtil.execute(cmd, output, waitFor);
  }

  public static Process executeAdb(
      String commandLine, String deviceId, List<String> output, boolean showDetailsLogging)
      throws UicdExternalCommandException {
    String cmd = constructAdbCommand(commandLine, deviceId);
    return CommandLineUtil.execute(cmd, output, true, showDetailsLogging);
  }

  public static Process executeAdb(
      String commandLine, String deviceId, List<String> output, int timeout)
      throws UicdExternalCommandException {
    String cmd = constructAdbCommand(commandLine, deviceId);
    return CommandLineUtil.execute(cmd, output, true, timeout);
  }

  public static Process executeAdb(String commandLine, String deviceId)
      throws UicdExternalCommandException {
    List<String> output = new ArrayList<>();
    return executeAdb(commandLine, deviceId, output);
  }

  public static Process executeAdb(String commandLine, String deviceId, List<String> output)
      throws UicdExternalCommandException {
    String cmd = constructAdbCommand(commandLine, deviceId);
    return CommandLineUtil.execute(cmd, output, true);
  }

  public static Process startXmlDumperServer(String deviceId, int hostPort, int devicePort)
      throws UicdExternalCommandException {

    // We already did the port forward in the initDevice, however for some action (RebootAction)
    // need redo the port forward again after device reboot.
    String forwardCmd = "forward tcp:%d tcp:%d";
    executeAdb(String.format(forwardCmd, hostPort, devicePort), deviceId);

    String xmldumperPackagePrefix = UicdConfig.getInstance().getXmldumperPackagePrefix();
    String targetXmldumperVersion = UicdConfig.getInstance().getXmlDumperApkVersion();
    String runnerPrefix = "android.support";
    if (compareVersion(targetXmldumperVersion, "2.0.0") >= 0) {
      runnerPrefix = "androidx";
    }
    String startXmlDumperServerCmd =
        String.format(
            "shell am instrument -w -e debug false -e class "
                + "'%s.DumperServerInstrumentation#startServer' %s.test/"
                + "%s.test.runner.AndroidJUnitRunner",
            xmldumperPackagePrefix, xmldumperPackagePrefix, runnerPrefix);
    // don't wait for the instrument command
    return executeAdb(startXmlDumperServerCmd, deviceId, false);
  }

  // Version of xml dumper, version is in the "1.0.1" format
  private static int compareVersion(String version1, String version2) {
    return Integer.compare(versionToInt(version1), versionToInt(version2));
  }

  // To make it simple, the version can only be single digit.
  private static int versionToInt(String version) {
    if (version.isEmpty()) {
      return 0;
    }
    if (version.startsWith("v")) {
      version = version.substring(1);
    }
    List<String> strs = Splitter.on('.').splitToList(version);
    int versionNum = 0;
    for (String s : strs) {
      versionNum *= 10;
      versionNum += Integer.parseInt(s);
    }
    return versionNum;
  }

  public static Optional<String> getXmlDumperApkVersion(String deviceId) {
    String getDumperVersionCmd =
        String.format(
            "shell dumpsys package %s | grep versionName",
            UicdConfig.getInstance().getXmldumperPackagePrefix());
    List<String> dumperVersionOutputList = new ArrayList<>();
    try {
      executeAdb(getDumperVersionCmd, deviceId, dumperVersionOutputList);
    } catch (UicdExternalCommandException e) {
      return Optional.empty();
    }
    if (!dumperVersionOutputList.isEmpty()) {
      // installed dumper Version from adb will be something like this: "versionName=1.0.0"
      List<String> items = Splitter.on('=').splitToList(dumperVersionOutputList.get(0));
      if (items.size() == 2) {
        return Optional.of(items.get(1));
      }
    }
    return Optional.empty();
  }

  public static void updateXmlDumperApk(String deviceId, int apiLevel)
      throws UicdExternalCommandException {
    // if already installed, skip install apks
    String listPackageAdbCmd = "shell pm list packages";
    List<String> packageList = new ArrayList<>();
    // During the frontend loading, we don't want to see the all the package names on the output
    // dialog on the frontend.
    executeAdb(listPackageAdbCmd, deviceId, packageList, false);

    String xmldumperPackagePrefix = UicdConfig.getInstance().getXmldumperPackagePrefix();
    if (packageList.contains(xmldumperPackagePrefix)) {
      Optional<String> dumperApkVersion = getXmlDumperApkVersion(deviceId);
      if (!UicdConfig.getInstance().getXmlDumperApkVersion().isEmpty()
          && dumperApkVersion.isPresent()
          && compareVersion(
                  UicdConfig.getInstance().getXmlDumperApkVersion(), dumperApkVersion.get())
              > 0) {
        logger.info("Found newer version of uicd xmldumper. Updating uicd xmldumper...");
        String uninstallCmd1 = String.format("uninstall %s", xmldumperPackagePrefix);
        String uninstallCmd2 = String.format("uninstall %s.test", xmldumperPackagePrefix);
        executeAdb(uninstallCmd1, deviceId);
        executeAdb(uninstallCmd2, deviceId);
        installXmlDumperApk(deviceId, apiLevel);
      } else {
        logger.info("XML Dumper apk already installed, skip install step.");
      }
    } else {
      logger.info("Cannot find uicd dumper apk, installing...");
      installXmlDumperApk(deviceId, apiLevel);
    }
  }

  private static void installXmlDumperApk(String deviceId, int apiLevel)
      throws UicdExternalCommandException {
    // parameters for adb install
    // -r replace existing application
    // -d allow version code downgrade
    // -t allow test packages
    // -g grant permission
    String installCmd = "install -r -d -t ";
    if (apiLevel >= MINIMUM_API_LEVEL_FOR_PERMISSION_GRANT_FLAG) {
      installCmd += "-g ";
    }
    String startDumperAdbCmd1 =
        installCmd
            + Paths.get(
                UicdConfig.getInstance().getXmlDumperAPKPath().toString(),
                String.format(
                    "uicd-xmldumper-server-test-v%s.apk",
                    UicdConfig.getInstance().getXmlDumperApkVersion()));

    String startDumperAdbCmd2 =
        installCmd
            + Paths.get(
                UicdConfig.getInstance().getXmlDumperAPKPath().toString(),
                String.format(
                    "uicd-xmldumper-server-v%s.apk",
                    UicdConfig.getInstance().getXmlDumperApkVersion()));
    executeAdb(startDumperAdbCmd1, deviceId);
    executeAdb(startDumperAdbCmd2, deviceId);
  }

  public static void turnOffAutoRotation(String deviceId) throws UicdExternalCommandException {
    String turnOffCmd = "shell settings put system accelerometer_rotation 0";
    executeAdb(turnOffCmd, deviceId, true);
  }

  public static List<String> getDevicesList() throws UicdExternalCommandException {
    List<String> commandLineOut = new ArrayList<>();
    CommandLineUtil.execute(
        String.format("%s devices -l", UicdConfig.getInstance().getAdbShellPath()),
        commandLineOut,
        true /* waitFor */);
    return commandLineOut;
  }

  /* get screen size of the devices */
  public static String getDeviceScreenSize(String deviceId) throws UicdExternalCommandException {
    List<String> ret = new ArrayList<>();
    executeAdb("shell wm size", deviceId, ret);

    if (ret.isEmpty()) {
      return "";
    }

    String sizeString = ret.get(0);
    for (String str : ret) {
      if (str.startsWith("Override size:")) {
        sizeString = str;
      }
    }
    return StringUtil.getPartFromString(sizeString, ":", 1, DEFAULT_SCREEN_SIZE);
  }

  // If more than one device is connected, some machines will show "error: unknown host service";
  // need to provide a deviceId to prevent this. There will be one pitfall, allocating ports is
  // not an atomic operation. There is a small chance of a race condition in MH. However, we
  // don't have a easy way to solve it for now, it would require changes on the mobileharness side.
  public static int getFirstAvailablePortSlot(String deviceId, int startIndex, int deviceCount)
      throws UicdExternalCommandException {
    List<String> output = new ArrayList<>();
    HashSet<Integer> existingPort = new HashSet<>();
    String adbCommand = "forward --list";
    executeAdb(adbCommand, deviceId, output);
    // Sample output is like this:
    // HT664020XXXX tcp:6790 tcp:6790
    // 706KPKN00XXXX tcp:6793 tcp:6790
    for (String s : output) {
      List<String> items = Splitter.on(' ').splitToList(s);
      if (items.size() == 3) {
        int port = Integer.parseInt(items.get(1).replace("tcp:", ""));
        existingPort.add(port);
      }
    }
    // Find a slot that can fit X devices, where X is deviceCount. In total, we need 3*deviceCount
    // ports. Only search up to startIndex + 10000.
    int availableCnt = 0;
    for (int i = startIndex; i < startIndex + 10000; i++) {
      if (!existingPort.contains(i)) {
        availableCnt++;
      } else {
        availableCnt = 0;
      }
      if (availableCnt == deviceCount * NUM_DYNAMIC_PORTS) {
        return i - availableCnt + 1;
      }
    }
    logger.severe("Can not allocate ports for adb forwarding.");
    throw new UicdExternalCommandException("Can not allocate ports for adb forwarding.");
  }

  // Similar to adb forward, it only works on some machines when we provide the serial number.
  public static void removePortForwarding(String deviceId, int port) {
    String adbCommand = String.format("forward --remove tcp:%d", port);
    try {
      executeAdb(adbCommand, deviceId);
    } catch (UicdExternalCommandException e) {
      logger.severe(e.getMessage());
    }
  }

  public static void forceStopXmlDumperOnDevice(String deviceId) {
    String xmldumperPackagePrefix = UicdConfig.getInstance().getXmldumperPackagePrefix();
    String adbCommand1 = String.format("shell am force-stop %s", xmldumperPackagePrefix);
    String adbCommand2 = String.format("shell am force-stop %s.test", xmldumperPackagePrefix);
    try {
      executeAdb(adbCommand1, deviceId);
      executeAdb(adbCommand2, deviceId);
    } catch (UicdExternalCommandException e) {
      logger.severe(e.getMessage());
    }
  }

  /* get product name */
  public static String getDeviceProperty(String deviceId, String propertyName)
      throws UicdExternalCommandException {
    List<String> ret = new ArrayList<>();
    String command = String.format("shell getprop %s", propertyName);
    executeAdb(command, deviceId, ret);
    return ret.isEmpty() ? "" : ret.get(0);
  }

  public static int getDeviceApiLevel(String deviceId) throws UicdExternalCommandException {
    return Integer.parseInt(getDeviceProperty(deviceId, "ro.build.version.sdk"));
  }

  public static String getDeviceProductName(String deviceId) throws UicdExternalCommandException {
    return getDeviceProperty(deviceId, "ro.build.product");
  }
}
