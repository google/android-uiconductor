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

package com.google.uicd.backend.recorder.coverter.roboscript;

import com.google.uicd.backend.core.uicdactions.BaseAction;
import com.google.uicd.backend.recorder.coverter.ActionConverter;
import com.google.uicd.backend.recorder.coverter.pyuiautomator.EmptyPyConverter;

/** Defines the factory which construct the converter based on the action type */
public class RoboConverterFactory {
  private RoboConverterFactory() {}

  public static ActionConverter getConverter(BaseAction action) {
    switch (action.getActionType()) {
      case CLICK_ACTION:
        return new ClickActionRoboConverter();
      case INPUT_ACTION:
        return new InputActionRoboConverter();
      case COMPOUND_ACTION:
        return new CompoundActionRoboConverter();
      default:
        return new EmptyPyConverter();
    }
  }
}
