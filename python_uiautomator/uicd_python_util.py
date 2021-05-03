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
"""Util file to uicd related operations."""
import base64
import json
import logging
import socket
import sys
from .adb import Adb
from .constant import DEFAULT_DUMPER_PORT


class Borg:
  """Borg class for Singleton."""
  _shared_state = {}

  def __init__(self):
    self.__dict__ = self._shared_state


class UICDPythonUtil(Borg):
  """Util for working with global variable in UICD.

    Provide functions for get/set global variables from/to UICD
  """
  VALUE = "value"
  VAR_MAP = "varMap"
  RESULT_KEY = "$uicd_python_action_internal_result"
  EXPORT_FIELD = "exportField"
  PORT_KEYWORD = "$uicd_xml_dumper_port"
  ADB_PATH_KEYWORD = "$uicd_adb_path"
  INPUT_PATH_KEYWORD = "$uicd_input_path"
  __adb_path__ = "adb"
  __device_xml_dumper_port__ = DEFAULT_DUMPER_PORT
  __base_folder__ = ""
  __device_port_info__ = []
  __opened_ports__ = []

  def __init__(self):
    Borg.__init__(self)
    self.is_changed = False
    self.init_env()

  def get_adb_path(self):
    """Gets the adb command path.

    Returns:
      Path to Adb.
    """
    # If adb path is set by UICD global variable, return this global variable,
    # otherwise return default value.
    return self.get_variable(self.ADB_PATH_KEYWORD) or self.__adb_path__

  def get_base_folder(self):
    """Gets the device serial number of a device at a given slot.

    Returns:
      Base folder of current library.
    """
    return self.__base_folder__

  def convert(self, input_data):
    """Converts the current input dict to ascii encoding.

    Args:
      input_data: input of what needs to be converted.

    Returns:
      Base folder of current library.
    """
    if isinstance(input_data, dict):
      return {
          self.convert(key): self.convert(value)
          for key, value in input_data.iteritems()
      }
    elif isinstance(input_data, unicode):  # pylint: disable=undefined-variable
      return input_data.encode("ascii", "ignore")
    else:
      return input_data

  def init_env(self, cfg_json=None):
    """Init the env config by the input from UICD output.

    Args:
      cfg_json: the slot of initialized device in UICD.
    """
    if cfg_json is None and len(sys.argv) > 1:
      cfg_json = base64.b64decode(sys.argv[1])
    # Will not return here if cfg_json is set in previous line.
    if cfg_json is None:
      # No cfg_json is provided, falling back to basic initialization
      return

    # cfg_json won't be null here, but it can be an invalid json, so we need
    # this check here to filter out cases where an invalid json is passed in
    # as sys.argv[1] here.
    try:
      global_var_json = json.loads(cfg_json)

      if self.VAR_MAP in global_var_json:
        if sys.version_info[0] > 2:
          self.global_var_dict = global_var_json[self.VAR_MAP]
        else:
          self.global_var_dict = self.convert(global_var_json[self.VAR_MAP])
        if self.PORT_KEYWORD in self.global_var_dict:
          self.__device_port_info__ = \
            self.global_var_dict[self.PORT_KEYWORD][self.VALUE].split(";")

        if self.INPUT_PATH_KEYWORD in self.global_var_dict:
          self.__base_folder__ = self.global_var_dict[self.INPUT_PATH_KEYWORD][
              self.VALUE][:-6]
    except json.JSONDecodeError:
      # Will fall back to default initialization if this is executed
      logging.warning(
          "Cannot parse sys param, using default setting for initialization.")
      return

  def teardown_test(self):
    """Clean up the allocated port in python uiautomator lib."""
    adb = Adb(self.__adb_path__)
    for port in self.__opened_ports__:
      adb.exec_adb_cmd("forward --remove tcp:{port}".format(port=port))
    self.__opened_ports__ = []

  def get_device_serial(self, slot=0):
    """Gets the device serial number of a device at a given slot.

    Args:
      slot: the slot of initialized device in UICD.

    Returns:
      A string of device serial number.
    """
    if len(self.__device_port_info__) <= slot and \
        self.__device_port_info__[slot].split(":"):
      return None
    # Android Virtual Device (cuttlefish) has device_port_info like
    # "localhost:xxxxx:yyyyy", where xxxxx is the cuttlefish port forwarding
    # number and yyyyy is xml dumper port number.
    # Therefore, we return the device info by removing xml dumper port number.
    device_info = self.__device_port_info__[slot].split(":")
    device_info.pop()
    return ":".join(device_info)

  def get_xml_dumper_port(self, slot=0):
    """Gets the xml dumper port of a device at a given slot.

    Args:
      slot: the slot of initialized device in UICD.

    Returns:
      A string of xml dumper port.
    """
    if len(self.__device_port_info__) <= slot and \
        self.__device_port_info__[slot].split(":"):
      return None
    # Android Virtual Device (cuttlefish) has device_port_info like
    # "localhost:xxxxx:yyyyy", where xxxxx is the cuttlefish port forwarding
    # number and yyyyy is xml dumper port number.
    # Therefore, we return the last item in the splitted list.
    return self.__device_port_info__[slot].split(":")[-1]

  @staticmethod
  def get_free_tcp_port():
    """Gets free port from the host.

    Returns:
      A string of xml dumper port.
    """
    tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp.bind(("", 0))
    arr_port = tcp.getsockname()
    tcp.close()
    return arr_port[1]

  def get_xml_dumper_port_for_device(self, device_serial):
    """Gets the xml dumper port of a device by serial number.

    Args:
      device_serial: the target device serial number.

    Returns:
      A string of xml dumper port.
    """
    for item in self.__device_port_info__:
      device_port_arr = item.split(":")
      if len(device_port_arr) == 2 and device_port_arr[0] == device_serial:
        return int(device_port_arr[1])

    free_port = self.get_free_tcp_port()
    self.__device_port_info__.append("{device_serial}:{free_port}".format(
        device_serial=device_serial, free_port=free_port))
    self.__opened_ports__.append(free_port)
    return free_port

  def get_variable(self, key):
    """Loads a global variable with a given key.

    Args:
      key: the key of global variable we are looking for.

    Returns:
      Value string of the global variable
    """
    result = None
    try:
      result = self.global_var_dict[key][self.VALUE]
    except AttributeError:
      logging.warning(
          "Trying to get uninitialized variable.")
    return result

  def set_variable(self, key, val):
    """Saves a global variable with a given key.

    Args:
      key: the key of global variable we are looking for.
      val: the value of global variable we need to save.
    """
    if key in self.global_var_dict:
      self.global_var_dict[key][self.VALUE] = val
    else:
      self.global_var_dict[key] = {self.VALUE: val, self.EXPORT_FIELD: False}
    self.is_changed = True

  def save_uicd_global_variable(self):
    """Saves updated global variable info to UICD backend."""
    if self.is_changed:
      print("uicd_shell_output:" + json.dumps(self.global_var_dict))

  def assert_true(self, boolean, error_message):
    """Function to be invoked to handle the result of boolean.

       If its false, it will call fail_test() and print out the error_message.

    Args:
      boolean: boolean which you want to assert.
      error_message: the error message you want to log.
    """
    if not boolean:
      print(error_message)
      self.fail_test()

  def fail_test(self):
    """Function to be invoked to force a test failure to UICD.

       Updates $uicd_python_action_internal_result global variable value.
       Will always pass False.
    """
    self.global_var_dict[self.RESULT_KEY] = {
        self.VALUE: False,
        self.EXPORT_FIELD: False
    }
    self.is_changed = True
    self.save_uicd_global_variable()
    sys.exit()
