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

package com.google.uicd.backend.core.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Static class to manage and generate the running environment configurations in the shell command
 * format.
 */
public class ScriptConfig {
  private static final Map<String, List<String>> pythonConfigMap = new HashMap<>();

  /**
   * These configurations are based on logcat records when running the SL4A application on the
   * connected device. We believe it dynamically fetches all the dependency names from a certain
   * path on the device. We can refer to this project file for further details.
   * https://github.com/damonkohler/sl4a/blob/d3c17dca978cbeee545e12ea240a9dbf2a6999e9/android/Common/src/com/googlecode/android_scripting/interpreter/InterpreterConfiguration.java
   * Line 178
   */
  static {
    List<String> variableValueList = new ArrayList<>();
    variableValueList.add("/system/framework/services.jar");
    variableValueList.add("/system/framework/ethernet-service.jar");
    variableValueList.add("/system/framework/wifi-service.jar");
    variableValueList.add("/system/framework/com.android.location.provider.jar");
    pythonConfigMap.put("SYSTEMSERVERCLASSPATH", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/sbin");
    variableValueList.add("/system/sbin");
    variableValueList.add("/system/bin");
    variableValueList.add("/system/xbin");
    variableValueList.add("/vendor/bin");
    variableValueList.add("/vendor/xbin");
    pythonConfigMap.put("PATH", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/storage/emulated/0/com.googlecode.pythonforandroid/extras/python");
    variableValueList.add("/data/user/0/com.googlecode.pythonforandroid/files/python/lib");
    variableValueList.add(
        "/data/user/0/com.googlecode.pythonforandroid/files/python/lib/python2.7/site-packages");
    variableValueList.add(
        "/data/user/0/com.googlecode.pythonforandroid/files/python/lib/python2.7/lib-dynload");
    pythonConfigMap.put("PYTHONPATH", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/data");
    pythonConfigMap.put("ANDROID_DATA", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("10");
    pythonConfigMap.put("ANDROID_SOCKET_zygote_secondary", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/data/user/0/com.googlecode.pythonforandroid/files/python");
    pythonConfigMap.put("PYTHONHOME", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/mnt/asec");
    pythonConfigMap.put("ASEC_MOUNTPOINT", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("40250");
    pythonConfigMap.put("AP_PORT", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/sdcard");
    pythonConfigMap.put("EXTERNAL_STORAGE", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("1");
    pythonConfigMap.put("ANDROID_BOOTLOGO", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add(
        "/data/user/0/com.googlecode.pythonforandroid/files/python/lib/python2.7/lib-dynload");
    pythonConfigMap.put("PYTHON_EGG_CACHE", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/system/app");
    pythonConfigMap.put("ANDROID_ASSETS", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("127.0.0.1");
    pythonConfigMap.put("AP_HOST", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/storage/emulated/0/com.googlecode.pythonforandroid/extras/");
    pythonConfigMap.put("PY4A_EXTRAS", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/storage");
    pythonConfigMap.put("ANDROID_STORAGE", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/storage/emulated/0/com.googlecode.pythonforandroid/extras/python/tmp");
    pythonConfigMap.put("TEMP", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/data/user/0/com.googlecode.pythonforandroid/files/python/lib");
    pythonConfigMap.put("LD_LIBRARY_PATH", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/system");
    pythonConfigMap.put("ANDROID_ROOT", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/data/cache");
    pythonConfigMap.put("DOWNLOAD_CACHE", variableValueList);

    variableValueList = new ArrayList<>();
    variableValueList.add("/system/framework/core-oj.jar");
    variableValueList.add("/system/framework/core-libart.jar");
    variableValueList.add("/system/framework/conscrypt.jar");
    variableValueList.add("/system/framework/okhttp.jar");
    variableValueList.add("/system/framework/bouncycastle.jar");
    variableValueList.add("/system/framework/apache-xml.jar");
    variableValueList.add("/system/framework/legacy-test.jar");
    variableValueList.add("/system/framework/ext.jar");
    variableValueList.add("/system/framework/framework.jar");
    variableValueList.add("/system/framework/telephony-common.jar");
    variableValueList.add("/system/framework/voip-common.jar");
    variableValueList.add("/system/framework/ims-common.jar");
    variableValueList.add("/system/framework/org.apache.http.legacy.boot.jar");
    variableValueList.add("/system/framework/android.hidl.base-V1.0-java.jar");
    variableValueList.add("/system/framework/android.hidl.manager-V1.0-java.jar");
    variableValueList.add("/system/framework/com.google.vr.platform.jar");
    pythonConfigMap.put("BOOTCLASSPATH", variableValueList);
  }

  /** Generate the running config setting in the format that shell commands require. */
  public static String pythonConfigMapToString() {
    StringBuilder stringBuilder = new StringBuilder();
    if (pythonConfigMap != null) {
      for (String key : pythonConfigMap.keySet()) {
        stringBuilder.append(key);
        stringBuilder.append("=");
        stringBuilder.append(String.join(":", pythonConfigMap.get(key)));
        stringBuilder.append(" ");
      }
    }
    return stringBuilder.toString();
  }
}
