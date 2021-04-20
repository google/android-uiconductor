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

package com.google.uicd.backend.core.constants;

import java.util.Arrays;
import java.util.List;

/**
 * Uicd Constant for XML parser
 */
public class UicdConstant {

  public static final String PROPERTY_NAME_RESOURCE_ID = "resource-id";
  public static final String PROPERTY_NAME_TEXT = "text";
  public static final String PROPERTY_NAME_CLASS = "class";
  public static final String PROPERTY_NAME_CONTENT_DESCRIPTION = "content-desc";
  public static final String PROPERTY_NAME_CHECKED = "checked";
  public static final String PROPERTY_NAME_BOUNDS = "bounds";
  public static final String PROPERTY_NAME_CLICKABLE = "clickable";
  public static final String PROPERTY_NAME_ENABLED = "enabled";

  public static final List<String> TOGGLE_BUTTONS = Arrays.asList(
      new String[]{"android.widget.CheckBox", "android.widget.Switch",
          "android.widget.SwitchCompat", "android.widget.ToggleButton"});

  /**
   * startX, startY, endX, endY of scroll up, down, left, right, it is percentage of the screen
   * resolution. Need times screen width and height to get the real x,y
   */
   public static final double[][] SCROLL_SEARCH_SWIPE_MATRIX = {
    {0.5, 0.4, 0.5, 0.6},
    {0.5, 0.6, 0.5, 0.4},
    {0.2, 0.5, 0.8, 0.5},
    {0.8, 0.5, 0.2, 0.5}
  };

  // Will be replaced by "<CL number>" or "<CL number> - Beta" by release script
  public static final String UICD_VERSION = "{DEV}";
}
