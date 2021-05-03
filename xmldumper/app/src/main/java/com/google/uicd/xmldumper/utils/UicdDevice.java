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

package com.google.uicd.xmldumper.utils;

import static androidx.test.platform.app.InstrumentationRegistry.getInstrumentation;

import android.annotation.TargetApi;
import android.app.UiAutomation;
import android.os.Build.VERSION_CODES;
import android.util.Log;
import android.view.accessibility.AccessibilityNodeInfo;
import android.view.accessibility.AccessibilityWindowInfo;
import java.util.HashSet;
import java.util.Set;

/** Uicd Device */
public class UicdDevice {
  private static final String TAG = UicdDevice.class.getSimpleName();

  private static UiAutomation uiAutomation = null;

  private static UiAutomation getUiAutomation() {
    if (uiAutomation == null) {
      uiAutomation = getInstrumentation().getUiAutomation();
    }
    return uiAutomation;
  }

  /** Returns a list containing the root {@link AccessibilityNodeInfo}s for each active window */
  @TargetApi(VERSION_CODES.LOLLIPOP)
  public static Set<AccessibilityNodeInfo> getWindowRoots() {
    Set<AccessibilityNodeInfo> roots = new HashSet<>();

    AccessibilityNodeInfo activeRoot = getUiAutomation().getRootInActiveWindow();
    if (activeRoot != null) {
      roots.add(activeRoot);
    }

    // Support multi-window searches for API level 21 and up.
    for (AccessibilityWindowInfo window : uiAutomation.getWindows()) {
      AccessibilityNodeInfo root = window.getRoot();
      Log.i(TAG, String.format("Getting Layer: %d", window.getLayer()));
      if (root == null) {
        Log.w(TAG, String.format("Skipping null root node for window: %s", window));
        continue;
      }
      roots.add(root);
    }

    return roots;
  }

  private UicdDevice() {}
}
