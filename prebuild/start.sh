#!/bin/bash

CONFIG_VARS="username=$(whoami)\nuicdbasepath=$PWD/backend/\nmysqlport=3308\nxmldumperversion=2.0.0\nreference_image_storage=gcs\nuicd_local_mode=false\n"
TAR_X20_DIR="/google/data/rw/teams/nuwa/release"
AUTO_UPDATE=true

clean_up() {
  kill -9 "$(lsof -t -i:3308)"
  # kill backend
  pkill -f 'uicd'
  # kill db proxy
  pkill -9 'cloud_sql_proxy'
}

db_connection() {
  echo "================================= DB Connection ================================================"

  # Adding the environment variable for GCS storage access.
  export GOOGLE_APPLICATION_CREDENTIALS="$PWD/yuiautomator-459f60939320.json"

  if [[ "$OSTYPE" == "linux-gnu" ]]; then
    proxy=./proxy/cloud_sql_proxy
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    proxy=./proxy/cloud_sql_proxy_mac
  fi;
  $proxy -instances=yuiautomator:us-west1:yuiautomator=tcp:3308 \
                  -credential_file="./yuiautomator-459f60939320.json" &
}

launch_backend() {
  echo "================================= Launch Backend ================================================"
  cd backend

  # test adb
  adb devices
  java -Xmx1024m -jar uicd-service-0.1.0.jar &
  sleep 10
  cd ..
}

launch_frontend() {
  echo "================================= Launch Frontend ================================================"
  if [[ "$OSTYPE" == "linux-gnu" ]]; then
    google-chrome --disable-web-security --chrome-frame --window-size=800,1080 --window-position=580,240 --user-data-dir="$PWD" --app="file://$PWD/dist/index.html"
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    osascript mac_chrome.scpt
  fi;
}

fetch_release() {
  if [[ "$1" = true ]] && ([[ ! -f INFO ]] || [[ "$(diff /google/data/rw/teams/nuwa/release/INFO INFO)" != "" ]]); then
    echo "Downloading latest version from X20 dir: $TAR_X20_DIR"
    cp -f $TAR_X20_DIR"/INFO" .
    cp -f $TAR_X20_DIR"/uicd.tar.gz" .
  fi;
}

set_local_mode_config_flags() {
  CONFIG_VARS="username=$(whoami)\nuicdbasepath=$PWD/backend/\nmysqlport=3308\nxmldumperversion=2.0.0\nreference_image_storage=gcs\nuicd_local_mode=true\n"
}

print_help() {
  echo " "
  echo "arguments:"
  echo "help                      show brief help"
  echo "no-update                 do not fetch the latest prod release"
  echo "beta                      fetch the latest beta release"
  echo "local                     Use UICD in local mode"
}

echo "Prepare for exit clean up..."
trap clean_up 0

if [[ "$OSTYPE" == "linux-gnu" ]]; then

  while [[ $# -gt 0 ]]; do
  case "$1" in
      "no-update")
        AUTO_UPDATE=false
        shift
        ;;
      "beta")
        TAR_X20_DIR="/google/data/rw/teams/nuwa/release/beta"
        shift
        ;;
      "local")
        set_local_mode_config_flags
        shift
        ;;
      "help")
        print_help
        exit 0
        ;;
      *)
        echo "Unknown flag $1"
        exit 1
        ;;
    esac
  done

  fetch_release $AUTO_UPDATE

  if [[ -f uicd.tar.gz ]];
  then
    tar -xvzf uicd.tar.gz;
    rm uicd.tar.gz;
  fi;
  chmod -R a+rw .
  echo -e "$CONFIG_VARS" > ./backend/uicd.cfg;
  clean_up
  db_connection
  launch_backend
  launch_frontend
elif [[ "$OSTYPE" == "darwin"* ]]; then
  echo "mac"
  if [[ -f uicd.tar.gz ]];
  then
    tar -xvzf uicd.tar.gz;
    rm uicd.tar.gz;
  else
    echo "We can't auto update for you, please keep an eye on https://x20.corp.google.com/teams/nuwa/release to get the latest version."
  fi;

  echo -e "$CONFIG_VARS" > ./backend/uicd.cfg;

  clean_up
  db_connection
  launch_backend
  launch_frontend
fi;

# exit until manually kill
# infinity does not work for Mac..
sleep 2147483647;
