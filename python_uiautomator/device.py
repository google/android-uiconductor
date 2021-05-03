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
"""UICD's python tool to execute actions on python script."""
import re
import time

from .android_device_driver import AndroidDeviceDriver
from .constant import DOUBLE_CLICK_POWER_EVENT_TEMPLATE
from .constant import DOUBLE_TAP_EVENT_TEMPLATE
from .constant import INPUT_ACTION_SWITCHER
from .constant import InputActions
from .constant import MotionEvent
from .constant import SWIPE_MATRIX
from .ui_object import UiObject
from .ui_selector import UiSelector
from .uicd_python_util import UICDPythonUtil
from .xml_parser import XmlParser



class Device(object):
  """Device wrapper class for python in uicd.

  Attributes:
    adb_path: adb path.
    xml_dumper_port: port where xml dumper server is running.
    base_folder: base folder for xml apk if needed.
    android_device_driver: AndroidDeviceDriver for xml fetching.
    api_level: API level of current device.
    model: model of current device.
    dimension_x: x dimension value.
    dimension_y: y dimension value.
  """

  def __init__(self, device_serial, xml_dumper_port):
    uicd_util = UICDPythonUtil()
    self.android_device_driver = AndroidDeviceDriver(
        uicd_util.get_base_folder(), uicd_util.get_adb_path(), device_serial,
        xml_dumper_port)
    dump_sys_result = self.android_device_driver.adb.exec_adb_cmd(
        "shell dumpsys window displays").communicate()[0].decode("utf-8")
    # This handles the case when dumpsys didn't generate any result
    if not dump_sys_result:
      raise EnvironmentError(
          "shell dumpsys window displays result is empty, check your device.")
    # This regex is for matching pattern init=48x96 so
    # that we can fetch device dimension value.
    regex = re.compile("init=[0-9]+x[0-9]+")
    match = regex.findall(dump_sys_result)
    [self.dimension_x, self.dimension_y
    ] = list(map(int,
                 re.sub("[^0-9]", " ", match[0]).split()))
    self.api_level = self.android_device_driver.adb.exec_adb_cmd(
        "shell getprop ro.build.version.sdk").communicate()[0].decode(
            "utf-8").strip()
    self.model = self.android_device_driver.adb.exec_adb_cmd(
        "shell getprop ro.product.model").communicate()[0].decode(
            "utf-8").strip()
    self.xml_dumper_port = xml_dumper_port

  @classmethod
  def create_device_by_slot(cls, slot):
    """Creates device instance by device slot.

    Caller need to make sure uicd_util has device and port information first.

    Args:
      slot: the virtual slot the device is in.

    Returns:
      A instance of a device.
    """
    uicd_util = UICDPythonUtil()
    device_serial = uicd_util.get_device_serial(slot)
    xml_dumper_port = uicd_util.get_xml_dumper_port(slot)
    if device_serial is None or xml_dumper_port is None:
      raise TypeError

    return cls(device_serial, xml_dumper_port)

  @classmethod
  def create_device_by_serial(cls, device_serial):
    """Creates device instance by serial.

    Args:
      device_serial: device serial number

    Returns:
      A instance of a device.
    """
    uicd_util = UICDPythonUtil()
    return cls(device_serial,
               uicd_util.get_xml_dumper_port_for_device(device_serial))

  @classmethod
  def create_device_by_serial_and_port(cls, device_serial, xml_dumper_port):
    """Creates device instance by serial and xml dumper port.

    Args:
      device_serial: device serial number
      xml_dumper_port: xml port for the dumper

    Returns:
      A instance of a device.
    """
    return cls(device_serial, xml_dumper_port)

  def set_xml_fetch_method(self, use_xml_dumper):
    """Sets if xml would be fetched via dumper or adb uiautomator dump.

    Please only use this function when you can't install any apk on your device.
    Some other functionalities (like drag) are tied to xml dumper apk and using
    this will slow down the uiautomation process.

    Passing True means xml would be fetched via dumper.
    False means xml would be fetched via adb.

    Args:
      use_xml_dumper: True or False.
    """
    self.android_device_driver.use_xml_dumper = use_xml_dumper

  def fetch_current_xml(self):
    """Function to fetch current xml.

    Returns:
      A json string of xml info.

    Raises:
      OSError: Request is invalid.
    """
    return self.android_device_driver.fetch_current_xml()

  def text(self, value, match_option=None):
    """Function to invoke UiObject by text.

    Args:
      value: key for which the text should match.
      match_option: option for advanced matching.

    Returns:
      A UiObject with .text(value).
    """
    return self.attributes("text", value, match_option)

  def content_desc(self, value, match_option=None):
    """Function to invoke UiObject by description.

    Args:
      value: key for which the text should match.
      match_option: option for advanced matching.

    Returns:
      A UiObject with .description(value).
    """
    return self.attributes("content-desc", value, match_option)

  def resource_id(self, value, match_option=None):
    """Function to invoke UiObject by description.

    Args:
      value: key for which the text should match.
      match_option: option for advanced matching.

    Returns:
      A UiObject with .resource_id(value).
    """
    return self.attributes("resource-id", value, match_option)

  def attributes(self, attrib_key, attrib_value, match_option=None):
    """Function to invoke UiObject by description.

    Args:
      attrib_key: key for which the value should match.
      attrib_value: value for matching option
      match_option: option for advanced matching.

    Returns:
      A UiObject with .description(key).
    """
    selector = UiSelector()
    selector.attributes(attrib_key, attrib_value, match_option)
    return UiObject(selector, self.android_device_driver)

  def home(self):
    """Function to invoke home button.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    self.input_key_event(InputActions.HOME)

  def click(self, x, y):
    """Function to invoke click on certain place button.

    Args:
      x: x coordinate for click position.
      y: y cooridnate for click position.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    # adb click 0,0 will have a weird behavior
    if x <= 0 and y <= 0:
      return
    cmd = "shell input tap {x} {y}".format(x=x, y=y)
    self.android_device_driver.adb.exec_adb_cmd(cmd).wait()

  def long_click(self, x, y, duration=2000):
    """Function to invoke long click on certain place button.

    2000ms by default.

    Args:
      x: x coordinate for click position.
      y: y cooridnate for click position.
      duration: duration of long click.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    self.android_device_driver.adb.exec_adb_cmd(
        "shell input swipe {x} {y} {x} {y} {duration}".format(
            x=x, y=y, duration=duration)).wait()

  def rotate_portrait(self):
    """Turns the phone in portrait mode.

      Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    self.android_device_driver.adb.exec_adb_cmd(
        "shell content insert --uri content://settings/system --bind name:s:user_rotation --bind value:i:0"
    ).wait()

  def rotate_landscape(self):
    """Turns the phone in landscape mode.

      Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    self.android_device_driver.adb.exec_adb_cmd(
        "shell content insert --uri content://settings/system --bind name:s:user_rotation --bind value:i:1"
    ).wait()

  def unfreeze_rotation(self):
    """Enables the sensors and unfreezes the device rotation at its current rotation state.

      Returns:
      Nothing
    """
    self.android_device_driver.adb.exec_adb_cmd(
        "shell content insert --uri content://settings/system --bind name:s:accelerometer_rotation --bind value:i:1"
    ).wait()

  def freeze_rotation(self):
    """Disables the sensors and freezes the device rotation at its current rotation state.

      Returns:
      Nothing
    """
    self.android_device_driver.adb.exec_adb_cmd(
        "shell content insert --uri content://settings/system --bind name:s:accelerometer_rotation --bind value:i:0"
    ).wait()

  def open_settings(self):
    """Opens the settings of the phone.

      Returns:
      Nothing
    """
    self.android_device_driver.adb.exec_adb_cmd(
        "shell am start -a android.settings.SETTINGS").wait()

  def open_quick_settings(self):
    """Opens the quick settings of the phone.

      Returns:
      Nothing
    """
    self.android_device_driver.adb.exec_adb_cmd(
        "shell cmd statusbar expand-settings").wait()

  def open_notifications(self):
    """Opens the notifications of the phone.

      Returns:
      Nothing
    """
    self.android_device_driver.adb.exec_adb_cmd(
        "shell cmd statusbar expand-notifications").wait()

  def close_notifications(self):
    """Closes the notifications of the phone.

      Returns:
      Nothing
    """
    self.android_device_driver.adb.exec_adb_cmd(
        "shell cmd statusbar collapse").wait()

  def overview(self):
    """Function to invoke overview button.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    self.input_key_event(InputActions.OVERVIEW)

  def back(self):
    """Function to invoke back button.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    self.input_key_event(InputActions.BACK)

  def input_key_event(self, key, custom_key=None):
    """Function to invoke a given input key on device.

    Args:
      key: key event, value in InputActions.
      custom_key: custom key number if used InputActions.CUSTOM

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """

    key_event = INPUT_ACTION_SWITCHER.get(key)
    if key_event == "-1":
      key_event = custom_key
    self.android_device_driver.adb.exec_adb_cmd("shell input keyevent " +
                                                key_event).wait()

  def input_text(self, text):
    """Function to invoke back button.

    Args:
      text: text to be inputted.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    self.android_device_driver.adb.exec_adb_cmd("shell input text " +
                                                text).wait()

  def swipe_up(self):
    """Function to invoke swipe up.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    self.swipe_sub(SWIPE_MATRIX[0])

  def swipe_down(self):
    """Function to invoke swipe down.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    self.swipe_sub(SWIPE_MATRIX[1])

  def swipe_left(self):
    """Function to invoke swipe left.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    self.swipe_sub(SWIPE_MATRIX[2])

  def swipe_right(self):
    """Function to invoke swipe right.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    self.swipe_sub(SWIPE_MATRIX[3])

  def swipe_custom(self, x1, y1, x2, y2):
    """Function to invoke custom swipe.

    Args:
      x1: x coordinate for start position.
      y1: y cooridnate for start position.
      x2: x coordinate for end position.
      y2: y cooridnate for end position.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    self.android_device_driver.swipe(x1, y1, x2, y2)

  def swipe_custom_ratio(self, start_pos_x_ratio, start_pos_y_ratio,
                         end_pos_x_ratio, end_pos_y_ratio):
    """Function to invoke custom swipe.

    Args:
      start_pos_x_ratio: x ratio of screen for start position.
      start_pos_y_ratio: y ratio of screen for start position.
      end_pos_x_ratio: x ratio of screen for end position.
      end_pos_y_ratio: y ratio of screen for end position.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.

    Raises:
      OSError: If invalid ratio is provided to this action.
    """
    invalid_ratio_tuple = [
        start_pos_x_ratio > 1, start_pos_y_ratio > 1, end_pos_x_ratio > 1,
        end_pos_y_ratio > 1, start_pos_x_ratio < 0, end_pos_x_ratio < 0,
        start_pos_y_ratio < 0, end_pos_y_ratio < 0
    ]
    if any(invalid_ratio_tuple):
      raise EnvironmentError(
          "Trying to swipe with invalid ratio, Ratio needs to be within 0 - 1.")
    self.swipe_sub([
        start_pos_x_ratio, start_pos_y_ratio, start_pos_x_ratio,
        start_pos_y_ratio
    ])

  def swipe_sub(self, swipe_matrix):
    """Function to invoke swipe.

    Args:
      swipe_matrix: swipe matrix for swipe action.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    self.android_device_driver.swipe(swipe_matrix[0] * self.dimension_x,
                                     swipe_matrix[1] * self.dimension_y,
                                     swipe_matrix[2] * self.dimension_x,
                                     swipe_matrix[3] * self.dimension_y)

  def drag(self, points, steps=None, durations=None):
    """Function to invoke drag.

    Args:
      points: drag point route, first point is drag start point, the last point
        is drop point.
      steps: steps for each drag points movement, by default 10 step for each
        movement.
      durations: duration for each drag points movement, by default 0.1 second
        for each movement.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.

    Raises:
      OSError: If less than 2 points provided to drag action.
    """
    if durations is None:
      durations = [0.1] * (len(points) - 1)

    if steps is None:
      steps = [10] * (len(points) - 1)

    if len(points) < 2:
      raise EnvironmentError("Need at least 2 points")

    if len(durations) + 1 != len(points):
      raise EnvironmentError(
          "Durations size should be one less than points size.")

    if len(steps) + 1 != len(points):
      raise EnvironmentError("Steps size should be one less than points size.")

    self.android_device_driver.drag_start(points[0].x, points[0].y)
    time.sleep(0.5)
    for i in range(len(points) - 1):
      startx = points[i].x
      starty = points[i].y
      endx = points[i + 1].x
      endy = points[i + 1].y
      disx = (endx - startx) / steps[i]
      disy = (endy - starty) / steps[i]
      for j in range(steps[i]):
        self.android_device_driver.drag_move(startx + disx * j,
                                             starty + disy * j)
        time.sleep(durations[i])

    self.android_device_driver.drag_stop(points[-1].x, points[-1].y)

  def multi_touch(self, points):
    """Function to invoke multi touch.

    Args:
      points: points of multi touch action

    Returns:
      Nothing.

    Raises:
      OSError: If invalid response is received.
    """
    if len(points) < 2:
      raise EnvironmentError("Need at least 2 points")

    self.android_device_driver.send_motion_event(points[0],
                                                 MotionEvent.ACTION_DOWN)

    medium_points = points[1:-1]
    for point in medium_points:
      self.android_device_driver.send_motion_event(
          point, MotionEvent.ACTION_POINTER_DOWN)

    self.android_device_driver.send_motion_event(points[-1],
                                                 MotionEvent.ACTION_POINTER_UP)

  def wait_for(self, selector, timeout=3, refresh_rate=0.5, retry=0):
    """Function to wait for a selector to show up.

    Args:
      selector: selectors to wait for.
      timeout: how long to wait for in seconds.
      refresh_rate: the frequency of refresh in seconds.
      retry: the amount of times this action will get repeated.

    Returns:
      True/false, if the element described by the selector is found.
    """
    time_counter = 0
    retry_counter = 0
    while retry_counter <= retry:
      while time_counter <= timeout:
        time.sleep(refresh_rate)
        time_counter = time_counter + refresh_rate
        xml = self.android_device_driver.fetch_current_xml()
        parser = XmlParser(xml)
        exist = parser.find_first_element_by_selector(selector)
        if exist is not None:
          return True
      retry_counter = retry_counter + 1
    return False

  def info(self):
    """Function to get basic device info.

    Returns:
      dict of info, with dimensions, api_level and deviceModel as key.
    """
    return {
        "dimension_x": self.dimension_x,
        "dimension_y": self.dimension_y,
        "api_level": self.api_level,
        "device_model": self.model,
    }

  def double_click_power(self):
    """Performs double click power button.

      Note: This action only works on rooted devices.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    get_power_event_cmd = ("getevent -pl 2>&1 | sed -n "
                           "'/^add/{h}/KEY_POWER/{x;s/[^/]*//p}'")
    input_event = self.adb.exec_adb_cmd(
        "shell '{cmd}'".format(cmd=get_power_event_cmd)).communicate()[0]

    self.android_device_driver.adb.exec_adb_cmd("shell '{cmd}'".format(
        cmd=DOUBLE_CLICK_POWER_EVENT_TEMPLATE.format(input_event=input_event)))

  def double_click(self, x, y):
    """Performs double tap.

      Note: This action only works on rooted devices.

    Args:
      x: The x coordinate of a point to perform double click.
      y: The y coordinate of a point to perform double click.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    get_touch_event_cmd = ("getevent -pl 2>&1 | sed -n "
                           "'/^add/{h}/ABS_MT_TOUCH/{x;s/[^/]*//p}'")
    input_event = self.adb.exec_adb_cmd(
        "shell '{cmd}'".format(cmd=get_touch_event_cmd)).communicate()[0]

    self.android_device_driver.adb.exec_adb_cmd("shell '{cmd}'".format(
        cmd=DOUBLE_TAP_EVENT_TEMPLATE.format(
            input_event=input_event, x=x, y=y)))

  def adb(self, command):
    """Performs an adb command.

    Args:
      command: The adb command
    """

    self.android_device_driver.adb.raw_cmd(command)

  def logcat(self, limit=1000):
    """Performs adb logcat command.

      Note this can be very slow and only provides adb logcat command output.
      If u actually want to use logcat please write adb commands yourself.

    Args:
      limit: The limit of output array.

    Returns:
      List of logcat.
    """
    result, counter = [], 0

    output = self.android_device_driver.adb.raw_cmd("logcat")
    for stdout_line in iter(output.stdout.readline, ""):
      counter += 1
      result.append(stdout_line)
      if counter == limit:
        break
    output.stdout.close()
    return result

  def find_element(self, attrib_key, attrib_value, match_option=None):
    """Find element by attribute.

    Args:
      attrib_key: key for which the value should match.
      attrib_value: value for matching option
      match_option: option for advanced matching.

    Returns:
      An Uiobject match the condition. None if no UiObject matches the
      condition.
    """
    selector = UiSelector()
    selector.attributes(attrib_key, attrib_value, match_option)
    return UiObject(selector, self.android_device_driver) if UiObject(
        selector, self.android_device_driver).verify_exist() else None

  def find_element_by_selector(self, selector):
    """Find element by selector.

    Args:
      selector: target selector.

    Returns:
      An Uiobject match the selector. None if no UiObject matches the selector.
    """
    return UiObject(selector, self.android_device_driver) if UiObject(
        selector, self.android_device_driver).verify_exist() else None

  def has_element(self, attrib_key, attrib_value, match_option=None):
    """Check whether element is on the screen.

    Args:
      attrib_key: key for which the value should match.
      attrib_value: value for matching option
      match_option: option for advanced matching.

    Returns:
      Whether current screen contains the target element.
    """
    selector = UiSelector()
    selector.attributes(attrib_key, attrib_value, match_option)
    return UiObject(selector, self.android_device_driver).verify_exist()

  def has_text(self, text, match_option=None):
    """Function to invoke UiObject by description.

    Args:
      text: key for which the value should match.
      match_option: option for advanced matching.

    Returns:
      Whether current screen contains the target text.
    """
    selector_text = UiSelector().attributes("text", text, match_option)
    selector_content_desc = UiSelector().attributes("content-desc", text,
                                                    match_option)

    return UiObject(
        selector_text, self.android_device_driver).verify_exist() or UiObject(
            selector_content_desc, self.android_device_driver).verify_exist()

  def sleep(self, sleep_time):
    """Invokes sleep function.

    Args:
      sleep_time: time for sleep, in ms.

    Returns:
      None.
    """
    time.sleep(sleep_time)
