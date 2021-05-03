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

package com.google.uicd.backend.core.uicdactions;

import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;

/** InputAction For keyboard input */
public class InputAction extends BaseAction {

  public int keyCode;
  // in the future we want to support input as string.
  private String inputString;
  private boolean isSingleChar = true;
  // need by the jackson
  public InputAction() {}

  public InputAction(int keyCode) {
    this.keyCode = keyCode;
    setVirtualKeyName(keyCode);
  }

  public InputAction(String content) {
    this.inputString = content;
    isSingleChar = false;
    this.setName(content);
  }

  @Override
  public String getDisplay() {
    if (isSingleChar) {
      setVirtualKeyName(keyCode);
      return getName();
    } else {
      return inputString;
    }
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    super.updateCommonFields(baseAction);
    if (baseAction instanceof InputAction) {
      InputAction otherAction = (InputAction) baseAction;
      this.isSingleChar = otherAction.isSingleChar;
      this.keyCode = otherAction.keyCode;
      this.inputString = otherAction.inputString;
    }
  }

  public String getInputString() {
    return inputString;
  }

  public void setInputString(String inputString) {
    this.inputString = inputString;
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    if (isSingleChar) {
      // if add the new inputAction on UI manually instead of typing.
      // it is using a different path, the json deserialize correctly the keyCode will be 0.
      if (keyCode == 0) {
        keyCode = Integer.parseInt(inputString);
      }
      androidDeviceDriver.inputKeyCode(keyCode);
    } else {
      androidDeviceDriver.inputString(
          actionContext.expandUicdGlobalVariable(inputString, androidDeviceDriver.getDeviceId()));
    }
    return 0;
  }

  private void setVirtualKeyName(int keyCode) {
    switch(keyCode) {
      case 3:
        this.setName("Home Button");
        break;
      case 4:
        this.setName("Back Button");
        break;
      case 19:
        this.setName("Up Button");
        break;
      case 20:
        this.setName("Down Button");
        break;
      case 21:
        this.setName("Left Button");
        break;
      case 22:
        this.setName("Right Button");
        break;
      case 23:
        this.setName("Center Button");
        break;
      case 24:
        this.setName("Volume Up Button");
        break;
      case 25:
        this.setName("Volume Down Button");
        break;
      case 26:
        this.setName("Power Button");
        break;
      case 27:
        this.setName("Play/Pause Button");
        break;
      case 187:
        this.setName("Overview Button");
        break;
      default:
        this.setName(String.format("%d key", keyCode));
    }
  }

  public boolean isSingleChar() {
    return isSingleChar;
  }
}
