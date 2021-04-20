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

"""This class is for adb command execution.

This class is built-in adb command wrapper which handles adb commands such
as adb command or adb forward.
All adb related action should go through this class.
"""

import json
import os
import re
import subprocess


class Adb(object):
  """Built-in adb wrapper for uicd in python.

  Attributes:
    __adb_cmd: adb command line prefix
    default_serial: serial number of connected android device
    adb_server_host: adb server host port
    adb_server_port: adb server port
    adb_host_port_options: tuple for extra host port option if required, default
      is empty
  """

  def __init__(self,
               adb_path=None,
               serial=None,
               adb_server_host=None,
               adb_server_port=None):
    self.__adb_cmd = adb_path
    self.default_serial = serial if serial else os.environ.get(
        "ANDROID_SERIAL", None)
    self.adb_server_host = str(
        adb_server_host if adb_server_host else "localhost")
    self.adb_server_port = str(adb_server_port if adb_server_port else "5037")
    self.adb_host_port_options = []
    if self.adb_server_host not in ["localhost", "127.0.0.1"]:
      self.adb_host_port_options += ["-H", self.adb_server_host]
    if self.adb_server_port != "5037":
      self.adb_host_port_options += ["-P", self.adb_server_port]

  def adb(self):
    """Generates prefix to execute adb command.

    Returns:
      Adb command prefix, would generate one if not initialized.

    Raises:
      OSError: if adb is not found in $ANDROID_HOME path or $ANDROID_HOME is not
      set.
    """
    if self.__adb_cmd is None:
      if "ANDROID_HOME" in os.environ:
        filename = "adb.exe" if os.name == "nt" else "adb"
        adb_cmd = os.path.join(os.environ["ANDROID_HOME"], "platform-tools",
                               filename)
        if not os.path.exists(adb_cmd):
          raise EnvironmentError("Adb not found in $ANDROID_HOME path: %s." %
                                 os.environ["ANDROID_HOME"])
      else:
        raise EnvironmentError("$ANDROID_HOME environment not set.")
      self.__adb_cmd = adb_cmd
    return self.__adb_cmd

  def exec_adb_cmd(self, *args):
    """Execute adb command, add -s serial by default.

    Args:
      *args: The adb commandline that needs to be executed.

    Returns:
      Subprocess.Popen object from the adb command.
    """
    serial = self.device_serial()
    if serial:
      if " " in serial:
        serial = "'%s'" % serial
      return self.raw_cmd(*["-s", serial] + list(args))
    else:
      return self.raw_cmd(*args)

  def raw_cmd(self, *args):
    """Execute adb command. return the subprocess.Popen object.

    Args:
      *args: The adb commandline that needs to be executed.

    Returns:
      Subprocess.Popen object from the adb command.
    """
    cmd_line = [self.adb()] + self.adb_host_port_options + list(args)
    if os.name != "nt":
      cmd_line = [" ".join(cmd_line)]
    return subprocess.Popen(
        cmd_line, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

  def device_serial(self):
    """Generates device serial number.

    Returns:
      Device serial number if initialized, otherwise find the device number from
      connected device.

    Raises:
      OSError: If more than 1 device is attached or no device is attached when
      default android serial is not set.
    """
    if not self.default_serial:
      devices = self.devices()
      if devices:
        if len(devices) == 1:
          self.default_serial = list(devices.keys())[0]
        else:
          raise EnvironmentError(
              "Multiple devices attached but default android serial not set.")
      else:
        raise EnvironmentError("Device not attached.")
    return self.default_serial

  def devices(self):
    """Generates a dict of attached devices.

    Returns:
      A dict of device attached in the form of {device serial: device name}

    Raises:
      OSError: If adb is not working.
    """
    out = self.raw_cmd("devices").communicate()[0].decode("utf-8")
    match = "List of devices attached"
    index = out.find(match)
    if index < 0:
      raise EnvironmentError("adb is not working.")
    return dict([
        s.split("\t")
        for s in out[index + len(match):].strip().splitlines()
        if s.strip()
    ])

  def forward(self, local_port, device_port, rebind=True):
    """Executes an adb port forwarding command.

    Args:
      local_port: The local port for port forwarding command.
      device_port: The device port for port forwarding command.
      rebind: If --no-rebind flag is needed.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    cmd = ["forward"]
    if not rebind:
      cmd.append("--no-rebind")
    cmd += ["tcp:%s" % local_port, "tcp:%s" % device_port]
    return self.exec_adb_cmd(*cmd).wait()

  def forward_list(self):
    """Executes adb forward --list command.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.

    Raises:
      OSError: Adb version is too low for this command.
    """
    version = self.version()
    if int(version[1]) <= 1 and int(version[2]) <= 0 and int(version[3]) < 31:
      raise EnvironmentError("Adb version too low.")
    lines = self.raw_cmd(
        "forward",
        "--list").communicate()[0].decode("utf-8").strip().splitlines()
    return [line.strip().split() for line in lines]

  def version(self):
    """Gets the current adb version.

    Returns:
      A string tuple for adb version info.
    """
    match = re.search(
        r"(\d+)\.(\d+)\.(\d+)",
        self.raw_cmd("version").communicate()[0].decode("utf-8"))
    return [match.group(i) for i in range(4)]

  def get_xml_dump_adb(self):
    """Execute adb command to fetch for xml.

    Returns:
      xml string of current screen.
    """
    serial = self.device_serial()
    if serial:
      if " " in serial:
        serial = "'%s'" % serial
    adb_cmd = self.adb()
    cmd_line = (
        "{adb1} -s {s1} shell uiautomator dump && {adb2} -s {s2} shell cat "
        "/sdcard/window_dump.xml").format(
            s1=serial, s2=serial, adb1=adb_cmd, adb2=adb_cmd)
    command = subprocess.Popen(
        cmd_line, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    xml = command.communicate()[0].decode("utf-8")
    json_dict = {
        "xml_count": 1,
        "value": {"xml0": xml}
    }
    return json.dumps(json_dict)
