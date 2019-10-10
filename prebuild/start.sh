#!/bin/bash
#
# Copyright 2019 Google Inc.
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

clean_up() {
  pkill -f 'uicd-service'
}

launch_backend() {
  echo "================================= Launch Backend ================================================"
  # test adb
  adb devices
  java -Xmx1024m -jar uicd-service-0.1.0.jar &
  sleep 10
}
launch_frontend() {
  echo "================================= Launch Frontend ================================================"
  if [[ "$OSTYPE" == "linux-gnu" ]]; then
    google-chrome --disable-web-security --chrome-frame --user-data-dir="$PWD" --app="file://$PWD/dist/index.html"
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    osascript mac_chrome.scpt
  fi;
}

clean_up
if [ "$1" == "be" ]; then
    launch_backend
else
    launch_backend
    launch_frontend
fi

echo "Prepare for exit and clean up..."
trap clean_up 0

# exit until manually kill
# infinity does not work for Mac..
sleep 2147483647;