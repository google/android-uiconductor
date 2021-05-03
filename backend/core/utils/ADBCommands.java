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

package com.google.uicd.backend.core.utils;

import java.time.Duration;

/** ADB command line commands. */
public class ADBCommands {
  /**
   * Related adb operations to perform double click on screen or double tap on power button.
   *
   * <p>The action is done through "sendevent" command. After get corresponding event, send it back
   * with specific parameters to conduct different actions. Before writing events to device, the
   * event file need to be in proper mode.The operation sequence can be obtained by command "adb
   * shell getevent -l", then by replacing the keys in sequence with its value, we get the events
   * that we can send back.
   */
  public static final Duration EXECUTE_COMMAND_LINE_TIME_OUT_IN_SECONDS = Duration.ofSeconds(5);

  public static final String ROOT_ACCESS_CMD = "root";
  public static final String CHANGE_EVENT_FILE_MODE = "shell chmod 777 %s";
  public static final String GET_TOUCH_EVENT_CMD =
      "shell \"getevent -pl 2>&1 | sed -n '/^add/{h}/ABS_MT_TOUCH/{x;s/[^/]*//p}'\"";
  public static final String GET_POWER_BUTTON_EVENT_CMD =
      "shell \"getevent -pl 2>&1 | sed -n '/^add/{h}/KEY_POWER/{x;s/[^/]*//p}'\"";
  public static final String DOUBLE_CLICK_TEMPLATE =
      "shell 'sendevent %s 1 330 1;sendevent %s 3 57 296;sendevent %s 3 53 %d;sendevent %s"
          + " 3 54 %d ;sendevent %s 3 48 00000009;sendevent %s 3 49 00000006;sendevent %s 3 58"
          + " 40;sendevent %s 0 0 00000000;sendevent %s 3 58 00000000;sendevent %s 3 57"
          + " 4294967295;sendevent %s 1 330 0;sendevent %s 0 0 00000000;sendevent %s 1 330"
          + " 1;sendevent %s 3 57 297;sendevent %s 3 53 %d;sendevent %s 3 54 %d;sendevent %s 3"
          + " 48 8;sendevent %s 3 49 00000005;sendevent %s 3 58 40;sendevent %s 0 0"
          + " 00000000;sendevent %s 3 58 00000000;sendevent %s 3 57 4294967295;sendevent %s 1"
          + " 330 0;sendevent %s 0 0 00000000;'";
  public static final String DOUBLE_TAP_POWER_BUTTON_CMD =
      "shell 'sendevent %s 0001 116 00000001;sendevent %s 0000 0000 00000000;sendevent %s 0001"
          + " 116 00000000;sendevent %s 0000 0000 00000000;sendevent %s 0001 116"
          + " 00000001;sendevent %s 0000 0000 00000000;sendevent %s 0001 116 00000000;sendevent %s"
          + " 0000 0000 00000000;'";

  private ADBCommands() {}
}
