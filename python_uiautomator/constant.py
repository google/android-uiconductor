#!/usr/bin/python
#
# Copyright 2021 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Lint as: python3
"""Constants for PyUIAutomator."""


class InputActions():
  """Built-in Android Device Input Actions for python in uicd."""
  ENTER = "enter"
  DELETE = "delete"
  VOLUME_UP = "volume_up"
  VOLUME_DOWN = "volume_down"
  POWER = "power"
  BACK = "back"
  MENU = "menu"
  CUSTOM = "custom"
  HOME = "home"
  OVERVIEW = "overview"


class MatchOption():
  """Text matching options for UiSelector."""
  START_WITH = "start_with"
  END_WITH = "end_with"
  CONTAINS = "contains"
  REGEX = "regex"


class DirectionType():
  """Direction types."""
  LEFT = "LEFT"
  RIGHT = "RIGHT"
  UP = "UP"
  DOWN = "DOWN"


DEFAULT_DUMPER_PORT = 6790

DEFAULT_APK_DUMPER_VERSION = "3.1.0"

# Using 1 as discarded value for OrderedDict so it looks like OrderedSet
PARSER_DICT_FILLER_VALUE = 1

# Event templates are from `adb shell getevent` recording.
DOUBLE_CLICK_POWER_EVENT_TEMPLATE = """
  sendevent {input_event} 0001 116 00000001;
  sendevent {input_event} 0000 0000 00000000;
  sendevent {input_event} 0001 116 00000000;
  sendevent {input_event} 0000 0000 00000000;
  sendevent {input_event} 0001 116 00000001;
  sendevent {input_event} 0000 0000 00000000;
  sendevent {input_event} 0001 116 00000000;
  sendevent {input_event} 0000 0000 00000000;
"""

DOUBLE_TAP_EVENT_TEMPLATE = """
  sendevent {input_event} 1 330 1;
  sendevent {input_event} 3 57 296;
  sendevent {input_event} 3 53 {x};
  sendevent {input_event} 3 54 {y};
  sendevent {input_event} 3 48 00000009;
  sendevent {input_event} 3 49 00000006;
  sendevent {input_event} 3 58 40;
  sendevent {input_event} 0 0 00000000;
  sendevent {input_event} 3 58 00000000;
  sendevent {input_event} 3 57 4294967295;
  sendevent {input_event} 1 330 0;
  sendevent {input_event} 0 0 00000000;
  sendevent {input_event} 1 330 1;
  sendevent {input_event} 3 57 297;
  sendevent {input_event} 3 53 {x};
  sendevent {input_event} 3 54 {y};
  sendevent {input_event} 3 48 8;
  sendevent {input_event} 3 49 00000005;
  sendevent {input_event} 3 58 40;
  sendevent {input_event} 0 0 00000000;
  sendevent {input_event} 3 58 00000000;
  sendevent {input_event} 3 57 4294967295;
  sendevent {input_event} 1 330 0;
  sendevent {input_event} 0 0 00000000;
"""

INPUT_ACTION_SWITCHER = {
        InputActions.VOLUME_UP: "24",
        InputActions.VOLUME_DOWN: "25",
        InputActions.ENTER: "66",
        InputActions.DELETE: "67",
        InputActions.POWER: "26",
        InputActions.BACK: "4",
        InputActions.MENU: "1",
        InputActions.HOME: "3",
        InputActions.OVERVIEW: "187",
        InputActions.CUSTOM: "-1",
    }


# Swipe matrix that contains values for general swipe actions towards
# a certain direction, 0-3 corresponds to swipe up, down, left, right.
# The reason that this is done this way opposing to
# ScreenContentValidationAction, is because we use different reference point, in
# ScreenContentValidationAction the phone is the reference point, while here
# gesture is the reference point.
SWIPE_MATRIX = [
    [0.5, 0.6, 0.5, 0.4],
    [0.5, 0.4, 0.5, 0.6],
    [0.8, 0.5, 0.2, 0.5],
    [0.2, 0.5, 0.8, 0.5]
]


class MotionEvent():
  ACTION_DOWN = 0
  ACTION_POINTER_DOWN = 5
  ACTION_POINTER_UP = 6
