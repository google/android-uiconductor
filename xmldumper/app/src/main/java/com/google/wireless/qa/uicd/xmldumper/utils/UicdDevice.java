package com.google.wireless.qa.uicd.xmldumper.utils;

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
public abstract class UicdDevice {
  private static String TAG = UicdDevice.class.getSimpleName();

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
    Set<AccessibilityNodeInfo> roots = new HashSet();
    // Start with the active window, which seems to sometimes be missing from the list returned
    // by the UiAutomation.
    UiAutomation uiAutomation = getUiAutomation();

    AccessibilityNodeInfo activeRoot = uiAutomation.getRootInActiveWindow();
    if (activeRoot != null) {
      roots.add(activeRoot);
    }

    // Support multi-window searches for API level 21 and up.
    for (AccessibilityWindowInfo window : uiAutomation.getWindows()) {
      AccessibilityNodeInfo root = window.getRoot();
      Log.i(TAG, String.format("Getting Layer: %d", window.getLayer()));
      if (root == null) {
        Log.w(TAG, String.format("Skipping null root node for window: %s", window.toString()));
        continue;
      }
      roots.add(root);
    }

    return roots;
  }
}
