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

package com.google.uicd.xmldumper.core;

import static androidx.test.platform.app.InstrumentationRegistry.getInstrumentation;

import android.app.UiAutomation;
import android.graphics.Point;
import android.os.SystemClock;
import android.view.InputDevice;
import android.view.MotionEvent;
import android.view.MotionEvent.PointerCoords;
import android.view.MotionEvent.PointerProperties;
import androidx.test.uiautomator.Configurator;
import androidx.test.uiautomator.UiDevice;
import androidx.test.uiautomator.UiObject;
import androidx.test.uiautomator.UiSelector;


/** Handler to perform complex ui actions such as zoom, touchDown, touchMove, touchUp */
public class ComplexUiActionHandler {

  private static final int ZOOM_STEPS = 20;
  /*
   * For low level actions such as touchUp, touchDown, touchMove, currently UiAutomator doesn't
   * provide public interface. The only way is to call injectInputEvent.
   */
  public static void touchDown(UiAutomation uiAutomation, int x, int y) {
    long eventTimeInMs = SystemClock.uptimeMillis();
    MotionEvent event = getMotionEvent(eventTimeInMs, eventTimeInMs, MotionEvent.ACTION_DOWN, x, y);
    uiAutomation.injectInputEvent(event, true);
  }

  public static void touchMove(UiAutomation uiAutomation, int x, int y) {
    long eventTimeInMs = SystemClock.uptimeMillis();
    MotionEvent event = getMotionEvent(eventTimeInMs, eventTimeInMs, MotionEvent.ACTION_MOVE, x, y);
    uiAutomation.injectInputEvent(event, true);
  }

  public static void touchUp(UiAutomation uiAutomation, int x, int y) {
    long eventTimeInMs = SystemClock.uptimeMillis();
    MotionEvent event = getMotionEvent(eventTimeInMs, eventTimeInMs, MotionEvent.ACTION_UP, x, y);
    uiAutomation.injectInputEvent(event, true);
  }

  public static void zoom(Point startPoint1, Point startPoint2, Point endPoint1, Point endPoint2) {
    UiDevice uiDevice = UiDevice.getInstance(getInstrumentation());
    UiObject uiObject = uiDevice.findObject(new UiSelector());
    uiObject.performTwoPointerGesture(startPoint1, startPoint2, endPoint1, endPoint2, ZOOM_STEPS);
  }

  public static void injectMotionEvent(
      UiAutomation uiAutomation,
      int x,
      int y,
      int action,
      long duration) {
    long eventTimeInMs = SystemClock.uptimeMillis();
    MotionEvent event = getMotionEvent(
          eventTimeInMs, eventTimeInMs + duration, action, x, y);
    uiAutomation.injectInputEvent(event, true);
  }

  /** Helper function to obtain a MotionEvent. */
  private static MotionEvent getMotionEvent(long downTime, long eventTime, int action,
      float x, float y) {

    PointerProperties properties = new PointerProperties();
    properties.id = 0;
    properties.toolType = Configurator.getInstance().getToolType();

    PointerCoords coords = new PointerCoords();
    coords.pressure = 1;
    coords.size = 1;
    coords.x = x;
    coords.y = y;

    return MotionEvent.obtain(downTime, eventTime, action, 1,
        new PointerProperties[] { properties }, new PointerCoords[] { coords },
        0, 0, 1.0f, 1.0f, 0, 0, InputDevice.SOURCE_TOUCHSCREEN, 0);
  }

}
