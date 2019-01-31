cd#!/bin/bash -eu
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



cd ..
root_dir=`pwd`
mkdir release
cd release
release_dir=`pwd`

mkdir -p deps/xmldumper
mkdir -p backend
mkdir -p uicdcli

# build uicd xmldumper server
cd ../xmldumper
./gradlew assembleDebug assembleAndroidTest

cp app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk $release_dir/deps/xmldumper/uicd-xmldumper-server-test-v1.0.1.apk
cp app/build/outputs/apk/debug/app-debug.apk $release_dir/deps/xmldumper/uicd-xmldumper-server-v1.0.1.apk

# build backend jar
cd $root_dir/backend

mvn clean
mvn package

cp -f target/uicd-service-*.jar $release_dir/backend

# build frontend
cd $root_dir/frontend
npm install
ng build  --bh "localhost"
cp -r dist $release_dir

# build uicd CLI
cd $root_dir/backend/src/com/google/uicd/backend/core
mvn install
cd $root_dir/backend/src/com/google/uicd/backend/commandline
mvn package
cp $root_dir/backend/src/com/google/uicd/backend/commandline/target/uicd-commandline-0.1.0-jar-with-dependencies.jar $release_dir/uicdcli/uicd-commandline.jar
cp $root_dir/backend/src/com/google/uicd/backend/commandline/uicdcli.sh $release_dir/uicdcli

# uicd sh


# nuwacfg
cd release_dir
chmod -R a+rw .
echo -e "username=$(whoami)\nuicddatapath=$PWD/backend/\nxmldumperversion=1.0.1\nmysqlconnectionstr=<mysqlconnectionstr>\n" > ./release/uicd.cfg