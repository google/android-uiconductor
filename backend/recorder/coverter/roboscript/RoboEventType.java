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

/** All supported Robo script event types that can be recorded by a user */
public enum RoboEventType {
  VIEW_CLICKED,
  // VIEW_LONG_CLICKED,
  // LIST_ITEM_CLICKED,
  // VIEW_TEXT_CHANGED,
  PRESSED_BACK,
  // Recorded in Android Studio on emulators API 28. Do not use!
  PRESSED_BACK_EMULATOR_28,
  // PRESSED_EDITOR_ACTION,
  VIEW_SWIPED,
  // DELAYED_MESSAGE_POSTED,
  // PERMISSIONS_REQUEST,
  ENTER_TEXT,
  POINT_TAP_ACTION,
  // ELEMENT_IGNORED,
  // ALL_ELEMENTS_IGNORED,
  ADB_SHELL_COMMAND,
  // WAIT_FOR_ELEMENT,
  // The subsequent event types are used only for Robo recording its own actions.
  LAUNCH_APP,
  GO_HOME,
  // TIME_PASSED,
  // This is a placeholder for all monkey actions until we decide to record/replay these actions.
  // MONKEY_ACTION,
}