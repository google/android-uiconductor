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

package com.google.uicd.backend.recorder.coverter.pyuiautomator;

import com.google.uicd.backend.core.uicdactions.InputAction;
import com.google.uicd.backend.recorder.coverter.ActionConverter;

/** Implements the logic to convert input action to python related code */
public class InputActionPyConverter implements ActionConverter<InputAction, PyConvertContext> {
  private static final String INPUT_TEMPLATE = "d.input_str('%s')";
  private static final String INPUT_KEY_CODE_TEMPLATE = "d.input_code(%d)";
  private static final String CLICK_HOME_TEMPLATE = "d.home()";
  private static final String CLICK_BACK_TEMPLATE = "d.back()";

  @Override
  public boolean canConvert(InputAction action, PyConvertContext context) {
    return true;
  }

  @Override
  public void convert(InputAction action, PyConvertContext context) {
    if (action.isSingleChar()) {
      // Most common action, make it more easy to read
      if (action.keyCode == 3) {
        context.appendToContent(String.format(CLICK_HOME_TEMPLATE, action.getDeviceIndex()));
      } else if (action.keyCode == 4) {
        context.appendToContent(String.format(CLICK_BACK_TEMPLATE, action.getDeviceIndex()));
      } else {
        context.appendToContent(String.format(INPUT_KEY_CODE_TEMPLATE, action.keyCode));
      }

    } else {
      context.appendToContent(
          String.format(INPUT_TEMPLATE, action.getDeviceIndex(), action.getInputString()));
    }
  }
}
