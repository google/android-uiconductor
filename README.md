# Android UIConductor

Android UIConductor is a platform that allow users to create E2E testing workflow very easily.

## Screen Shot
![uicddemo](https://user-images.githubusercontent.com/2557786/52313064-ef029080-2961-11e9-9e69-1e770b85b614.gif)


## Requirement
- Linux (Mac and Windows should also work, but need write the pakcage and start script for each platform)
- Jdk 8+
- Android SDK 28
- adb installed and setup correctly in the env
- a local/remote MySql Database
- Angular CLI: 1.7.4 (Currently the higher verison of Angular CLI might not work. we are working ont the migration)
- Node: 10.15.0


## Installation
1. Create an empty database schema called "uicddb"
2. Execute backend/src/com/google/uicd/backend/recorder/db/initdb.sql to init the database schema.
3. Set the ANDROID_HOME to your SDK location   (you can skip step3 and step4 if you want to use the prebuild one)
4. run ./package.sh to build everything into the release folder
5. Set the db connection string in the release/uicd.cfg to something like this:
   jdbc:mysql://localhost:3306/uicddb?autoReconnect=true&user=root&password=admin&useUnicode=true&characterEncoding=utf-8
   Please make sure change the username and password to your own username and password.


## Basic Usage
1. cd release
2. ./start.sh to start the application.
Please make sure the following things before run start.sh
  a) adb devices devices in the right state
  b) no password or lock pattern for the devices.

## License

Android UIConductor is licensed under the open-source [Apache 2.0 license](LICENSE).

## Contributing

Please [see the guidelines for contributing](CONTRIBUTING.md) before creating
pull requests.
