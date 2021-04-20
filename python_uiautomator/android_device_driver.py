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
"""XmlDumper server class for uicd.

  This class does the following things:
  1. check&install&start xml dumper server on Device
  2. fetches current xml.
"""
import json
import logging
import sys
import time
from .adb import Adb
from .constant import DEFAULT_APK_DUMPER_VERSION
from .constant import DEFAULT_DUMPER_PORT

# pylint: disable=g-import-not-at-top
if sys.version_info[0] <= 2:
  import httplib
else:
  import http.client


# pylint: enable=g-import-not-at-top


class AndroidDeviceDriver(object):
  """Built-in Android Device Driver for python in uicd.

  Attributes:
    runner_prefix: runner prefix for server initializer
    adb: adb command wrapper for adb commands
    uicd_base_folder: uicd base folder for xml apk if needed
    xml_dumper_port: port where xml dumper server is running
    device_dumper_port: port where xml dumper server is running on device
    drag_in_process: if a drag move is in progress
    xml_dumper_version: version of xml dumper
    use_xml_dumper: if we will get xml via dumper apk or adb
  """
  XML_DUMPER_PACKAGE_PREFIX = "com.google.uicd.xmldumper"
  MINIMUM_API_LEVEL_FOR_PERMISSION_GRANT_FLAG = 23
  UICD_DEP_FOLDER_PATH = "deps"
  XML_DUMPER_APK_FOLDER_NAME = "xmldumper_apks"
  PACKAGE_NOT_FOUND = "package not found"
  DUMP_XML_ENDPOINT = "/action/dump"
  LOCALHOST = "localhost"
  DRAG_START_ENDPOINT = "/action/touch/down"
  DRAG_MOVE_ENDPOINT = "/action/touch/move"
  DRAG_STOP_ENDPOINT = "/action/touch/up"
  MOTION_EVENT_ENDPOINT = "/action/touch/motion"

  _XML_DUMPER_RESTART_DELAY_IN_SEC = 2

  def __init__(self,
               uicd_base_folder,
               adb_path=None,
               serial=None,
               xml_dumper_port=DEFAULT_DUMPER_PORT,
               device_dumper_port=DEFAULT_DUMPER_PORT,
               xml_dumper_version=DEFAULT_APK_DUMPER_VERSION,
               runner_prefix="androidx",
               use_xml_dumper=True):
    self.runner_prefix = runner_prefix
    self.adb = Adb(adb_path, serial)
    self.uicd_base_folder = uicd_base_folder
    self.xml_dumper_port = xml_dumper_port
    self.device_dumper_port = device_dumper_port
    self.drag_in_process = False
    self.xml_dumper_version = xml_dumper_version
    self.use_xml_dumper = use_xml_dumper

  def start_xml_dumper_server(self):
    """Starts xml dumper server on device if not initialized yet.

    Returns:
      A subprocess.Popen instance which contains the xml dumper server starting
      command.

    Raises:
      OSError: if adb is not found in $ANDROID_HOME path or $ANDROID_HOME is not
      set.
    """
    logging.info("start_xml_dumper_server")
    version = self.get_xml_dumper_version()
    if version == self.PACKAGE_NOT_FOUND:
      api_level = self.adb.exec_adb_cmd(
          "shell getprop ro.build.version.sdk").communicate()[0].decode("utf-8")
      self.install_xml_dumper_server_apk(api_level)
    version = self.get_xml_dumper_version()
    self.adb.forward(self.xml_dumper_port, self.device_dumper_port)
    start_xml_dumper_prefix = "shell am instrument -w -e debug false -e class "
    dumper_server_apk = "'{package_prefix}.DumperServerInstrumentation#startServer'".format(
        package_prefix=self.XML_DUMPER_PACKAGE_PREFIX)
    dumper_runner = "{runner_prefix}.test.runner.AndroidJUnitRunner &".format(
        runner_prefix=self.runner_prefix)
    if self.compare_xml_dumper_apk_version(version, DEFAULT_APK_DUMPER_VERSION):
      dumper_test_apk = " {test_prefix}/".format(
          test_prefix=self.XML_DUMPER_PACKAGE_PREFIX)
    else:
      dumper_test_apk = " {test_prefix}.test/".format(
          test_prefix=self.XML_DUMPER_PACKAGE_PREFIX)

    start_xml_dumper_server_command = start_xml_dumper_prefix + dumper_server_apk + dumper_test_apk + dumper_runner
    self.adb.exec_adb_cmd(start_xml_dumper_server_command)

  def stop_xml_dumper_server(self):
    """Stops xml dumper server on device.

    Returns:
      A subprocess.Popen instance which contains the xml dumper server starting
      command.
    """
    self.adb.exec_adb_cmd("shell am force-stop {xmldumper_prefix}".format(
        xmldumper_prefix=self.XML_DUMPER_PACKAGE_PREFIX)).wait()
    self.adb.exec_adb_cmd(
        "shell am force-stop {xmldumper_prefix}.test".format(
            xmldumper_prefix=self.XML_DUMPER_PACKAGE_PREFIX)).wait()

  def restart_xml_dumper_server(self):
    """Restart the xml dumper server on device.

    Returns:
      A subprocess.Popen instance which contains the xml dumper server starting
      command.

    Raises:
      OSError: if adb is not found in $ANDROID_HOME path or $ANDROID_HOME is not
      set.
    """
    self.stop_xml_dumper_server()
    self.start_xml_dumper_server()
    time.sleep(self._XML_DUMPER_RESTART_DELAY_IN_SEC)

  def install_xml_dumper_server_apk(self, api_level):
    """Install xml dumper server apk on the device.

    Args:
      api_level: Api level from adb.

    Raises:
      OSError: if adb is not found in $ANDROID_HOME path or $ANDROID_HOME is not
      set.
    """
    if self.uicd_base_folder is None:
      raise EnvironmentError(
          "UICD base folder is not set. Can't find xml dumper packages")
    if int(api_level) > self.MINIMUM_API_LEVEL_FOR_PERMISSION_GRANT_FLAG:
      install_cmd = "install -r -d -t -g "
    else:
      install_cmd = "install -r -d -t "
    install_path = "{install_cmd}{base}/{dep}/{apk}".format(
        install_cmd=install_cmd,
        base=self.uicd_base_folder,
        dep=self.UICD_DEP_FOLDER_PATH,
        apk=self.XML_DUMPER_APK_FOLDER_NAME)
    install_cmd1 = "{install_path}/uicd-xmldumper-server-v{version}.apk".format(
        install_path=install_path, version=self.xml_dumper_version)
    if not self.compare_xml_dumper_apk_version(self.xml_dumper_version,
                                               DEFAULT_APK_DUMPER_VERSION):
      install_cmd2 = "{install_path}/uicd-xmldumper-server-test-v{version}.apk".format(
          install_path=install_path, version=self.xml_dumper_version)
      self.adb.exec_adb_cmd(install_cmd2).wait()
    self.adb.exec_adb_cmd(install_cmd1).wait()

  def compare_xml_dumper_apk_version(self, current_version, target_version):
    """Compares xml dumper apk version against each other.

    Args:
      current_version: Version string in form of "1.0.0".
      target_version: Target Version string in form of "1.0.0".

    Returns:
      True if version1 is larger than or equal to target version,
      otherwise false.
    """
    version_number1 = int(current_version.split(".")[0]) * 100 + int(
        current_version.split(
            ".")[1]) * 10 + int(current_version.split(".")[2])
    version_number2 = int(target_version.split(".")[0]) * 100 + int(
        target_version.split(
            ".")[1]) * 10 + int(target_version.split(".")[2])
    return int(version_number1) >= int(version_number2)

  def get_xml_dumper_version(self):
    """Function to check for xml_dumper_version.

    Returns:
      A string of version info, 1.0.0

    Raises:
      OSError: if adb is not found in $ANDROID_HOME path or $ANDROID_HOME is not
      set.
    """
    get_dumper_version_cmd = "shell dumpsys package %s | grep versionName" % (
        self.XML_DUMPER_PACKAGE_PREFIX)
    output = self.adb.exec_adb_cmd(get_dumper_version_cmd).communicate(
    )[0].decode("utf-8").strip().splitlines()
    if output:
      # installed dumper Version from adb will be something like this:
      # "versionName=1.0.0"
      return output[0].split("=")[1]
    else:
      return self.PACKAGE_NOT_FOUND

  def fetch_current_xml(self):
    """Function to fecth current xml with retry.

    If xml dumper server haven't started, the first attempt will fail
    and restart the server.

    Returns:
      A json string of xml info.

    Raises:
      OSError: Requrest is invalid.
    """
    if self.use_xml_dumper:
      for attempt in range(3):
        try:
          if attempt > 0:
            self.restart_xml_dumper_server()
          return self.__fetch_xml__(self.xml_dumper_port)
        except EnvironmentError as e:
          # first retry, may caused by the
          if attempt > 0:
            logging.info("Failed to connect to the xmldumper server, retrying")
          if attempt == 2:
            raise e
    else:
      return self.adb.get_xml_dump_adb()

  def __fetch_xml__(self, xml_dumper_port):
    """Function to fecth current xml.

    Args:
      xml_dumper_port: Port where xml dumper server is running on.

    Returns:
      A json string of xml info.

    Raises:
      OSError: Requrest is invalid.
    """
    if xml_dumper_port:
      response = self.get_request(xml_dumper_port, self.DUMP_XML_ENDPOINT)
    else:
      response = self.get_request(self.xml_dumper_port, self.DUMP_XML_ENDPOINT)
    if response.status == 200:
      if sys.version_info[0] > 2:
        encoding = response.headers.get_content_charset("utf-8")
        return response.read().decode(encoding)
      else:
        return response.read().decode("utf-8")
    else:
      raise EnvironmentError("Error: Unexpected response {}".format(response))

  def drag_start(self, x, y):
    """Function to invoke drag start.

    Args:
      x: x coordinate to be dragged.
      y: y coordinate to be dragged.

    Returns:
      Nothing.

    Raises:
      OSError: If request fails.
    """
    coordinate_dict = {"x": x, "y": y}
    data_string = json.dumps(coordinate_dict)
    data_dict = {"params": data_string}
    json_data = json.dumps(data_dict)
    response = self.post_request(self.xml_dumper_port, self.DRAG_START_ENDPOINT,
                                 json_data)
    if response.status == 200:
      self.drag_in_process = True
    else:
      raise EnvironmentError("Error: Unexpected response {}".format(response))

  def drag_move(self, x, y):
    """Function to invoke drag move.

    Args:
      x: x coordinate to be dragged.
      y: y coordinate to be dragged.

    Returns:
      Nothing.

    Raises:
      OSError: If invalid response is received.
    """
    if not self.drag_in_process:
      return
    coordinate_dict = {"x": x, "y": y}
    data_string = json.dumps(coordinate_dict)
    data_dict = {"params": data_string}
    json_data = json.dumps(data_dict)
    response = self.post_request(self.xml_dumper_port, self.DRAG_MOVE_ENDPOINT,
                                 json_data)
    if response.status != 200:
      raise EnvironmentError("Error: Unexpected response {}".format(response))

  def drag_stop(self, x, y):
    """Function to invoke drag move.

    Args:
      x: x coordinate to be dragged.
      y: y coordinate to be dragged.

    Returns:
      Nothing.

    Raises:
      OSError: If invalid response is received.
    """
    if not self.drag_in_process:
      return
    coordinate_dict = {"x": x, "y": y}
    data_string = json.dumps(coordinate_dict)
    data_dict = {"params": data_string}
    json_data = json.dumps(data_dict)
    response = self.post_request(self.xml_dumper_port, self.DRAG_STOP_ENDPOINT,
                                 json_data)
    if response.status == 200:
      self.drag_in_process = False
    else:
      raise EnvironmentError("Error: Unexpected response {}".format(response))

  def send_motion_event(self, point, motion_event):
    """Function to inject motion event.

    Args:
      point: point of where the motion event will happen.
      motion_event: motion event of the action.

    Returns:
      Nothing.

    Raises:
      OSError: If invalid response is received.
    """

    coordinate_dict = {
        "x": point.x,
        "y": point.y,
        "action": motion_event,
        "duration": 0
    }
    data_string = json.dumps(coordinate_dict)
    data_dict = {"params": data_string}
    json_data = json.dumps(data_dict)
    response = self.post_request(self.xml_dumper_port,
                                 self.MOTION_EVENT_ENDPOINT, json_data)
    if response.status != 200:
      raise EnvironmentError("Error: Unexpected response {}".format(response))

  def get_request(self, port, end_point):
    """Function to perform get request.

    Args:
      port: port number of xml dumper.
      end_point: end point of request URI.

    Returns:
      Response object.
    """
    if sys.version_info[0] > 2:
      conn = http.client.HTTPConnection(self.LOCALHOST, port)
    else:
      conn = httplib.HTTPConnection(self.LOCALHOST, port)
    conn.request("GET", end_point)
    return conn.getresponse()

  def post_request(self, port, end_point, json_data):
    """Function to perform json post request.

    Args:
      port: port number of xml dumper.
      end_point: end point of request URI.
      json_data: json data for request param.

    Returns:
      Response object.
    """
    if sys.version_info[0] > 2:
      conn = http.client.HTTPConnection(self.LOCALHOST, port)
    else:
      conn = httplib.HTTPConnection(self.LOCALHOST, port)
    headers = {"Content-type": "application/json"}
    conn.request("POST", end_point, json_data, headers)
    return conn.getresponse()

  def swipe(self, x1, y1, x2, y2):
    """Function to invoke custom swipe.

    Args:
      x1: x coordinate for start position.
      y1: y cooridnate for start position.
      x2: x coordinate for end position.
      y2: y cooridnate for end position.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    cmd = "shell input swipe {x1} {y1} {x2} {y2}".format(
        x1=str(x1), y1=str(y1), x2=str(x2), y2=str(y2))
    self.adb.exec_adb_cmd(cmd).wait()

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
    cmd = "shell input tap {x} {y}".format(x=str(x), y=str(y))
    self.adb.exec_adb_cmd(cmd).wait()
