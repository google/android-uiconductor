# uicdcli script. requires the uicd-commandline.jar
# sample command: ./uicdcli.sh -d <device_serial_no> -i <test_cases_path>
java -jar -Dfile.encoding=UTF-8 ./uicd-commandline.jar "$@"