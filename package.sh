#!/bin/bash -eu
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


root_dir=`pwd`
rm -rf release
mkdir release
cd release
release_dir=`pwd`

mkdir -p deps/xmldumper_apks
mkdir -p uicdcli

# build uicd xmldumper server
cd $root_dir/xmldumper
./gradlew assembleDebug

cp app/build/outputs/apk/debug/app-debug.apk $release_dir/deps/xmldumper_apks/uicd-xmldumper-server-v3.1.2.apk

# build backend jar
cd $root_dir/backend

mvn clean
mvn package

cp -f target/uicd-service-*.jar $release_dir

# build frontend
cd $root_dir/frontend
npm install
ng build --base-href "localhost"
cp -r dist $release_dir

# Build UICD CLI
cd $root_dir/backend/core
mvn install
cd $root_dir/backend/commandline
mvn package
cp $root_dir/backend/commandline/target/commandline-0.1.0-jar-with-dependencies.jar $release_dir/uicdcli/uicd-commandline.jar
cp $root_dir/backend/commandline/uicdcli.sh $release_dir/uicdcli

# Build Python UIAutomator
pushd $(mktemp -d)
cp -r $root_dir/python_uiautomator .
cp $root_dir/backend/scripts/python_uiautomator_setup.py ./setup.py
tar -zcvf $release_dir/pyuiautomator.tar.gz .
popd

# uicd start.sh
cp $root_dir/misc/start_sample.sh $release_dir/start.sh
chmod a+x $release_dir/start.sh

# nuwacfg
cd $release_dir
chmod -R a+rw .
echo -e "username=$(whoami)\nuicdbasepath=$PWD\nxmldumperversion=3.1.2\nmysqlconnectionstr=<mysqlconnectionstr>\nuicd_local_mode=false\n" > ./uicd.cfg

echo "Finished build UIConductor"



