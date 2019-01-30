// Copyright 2018 Google LLC
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

package com.google.uicd.xmldumper.core;

import static com.google.uicd.xmldumper.utils.AndroidPlatformReflectionUtils.getField;
import static com.google.uicd.xmldumper.utils.AndroidPlatformReflectionUtils.invoke;
import static com.google.uicd.xmldumper.utils.AndroidPlatformReflectionUtils.method;

import android.graphics.Point;
import android.support.test.InstrumentationRegistry;
import android.support.test.uiautomator.UiAutomatorBridge;
import android.support.test.uiautomator.UiDevice;
import android.support.test.uiautomator.UiObject;
import android.support.test.uiautomator.UiSelector;

/** Handler to perform complex ui actions such as zoom, touchDown, touchMove, touchUp */
public class ComplexUiActionHandler {

  private static final String CLASS_INTERACTION_CONTROLLER =
      "android.support.test.uiautomator.InteractionController";
  private static final String CLASS_UI_AUTOMATOR_BRIDGE =
      "android.support.test.uiautomator.UiAutomatorBridge";
  private static final String FIELD_UI_AUTOMATOR_BRIDGE = "mUiAutomationBridge";
  private static final String FIELD_INTERACTION_CONTROLLER = "mInteractionController";
  private static final String METHOD_TOUCH_DOWN = "touchDown";
  private static final String METHOD_TOUCH_MOVE = "touchMove";
  private static final String METHOD_TOUCH_UP = "touchUp";
  private static final int ZOOM_STEPS = 20;

  /*
   * For low level actions such as touchUp, touchDown, touchMove, currently UiAutomator doesn't
   * provide public interface. The only way is using methods in uiautomatorBridge through
   * reflection.
   */
  public static UiAutomatorBridge getUiAutomatorBridge() {
    UiAutomatorBridge uiAutomatorBridge = (UiAutomatorBridge)
        getField(UiDevice.class, FIELD_UI_AUTOMATOR_BRIDGE,
            UiDevice.getInstance(InstrumentationRegistry.getInstrumentation()));
    return uiAutomatorBridge;
  }

  public static void touchDown(UiAutomatorBridge uiAutomatorBridge, int x, int y) {
    touchEvent(uiAutomatorBridge, x, y, METHOD_TOUCH_DOWN);
  }

  public static void touchMove(UiAutomatorBridge uiAutomatorBridge, int x, int y) {
    touchEvent(uiAutomatorBridge, x, y, METHOD_TOUCH_MOVE);
  }

  public static void touchUp(UiAutomatorBridge uiAutomatorBridge, int x, int y) {
    touchEvent(uiAutomatorBridge, x, y, METHOD_TOUCH_UP);
  }

  public static void zoom(Point startPoint1, Point startPoint2, Point endPoint1, Point endPoint2) {
    UiDevice uiDevice = UiDevice.getInstance(InstrumentationRegistry.getInstrumentation());
    UiObject uiObject = uiDevice.findObject(new UiSelector());
    uiObject.performTwoPointerGesture(startPoint1, startPoint2, endPoint1, endPoint2, ZOOM_STEPS);
  }

  private static void touchEvent(UiAutomatorBridge uiAutomatorBridge, int x, int y, String event) {
    Object interactionController = getField(CLASS_UI_AUTOMATOR_BRIDGE, FIELD_INTERACTION_CONTROLLER,
        uiAutomatorBridge);
    invoke(method(
        CLASS_INTERACTION_CONTROLLER, event, int.class, int.class), interactionController, x, y);
  }
}
