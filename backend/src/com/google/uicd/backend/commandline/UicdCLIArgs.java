// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.uicd.backend.commandline;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;

/** UicdCLIArgs The command args class for UicdCLI. */
public class UicdCLIArgs {

  private final CommandLine commandLine;
  Options options;

  public UicdCLIArgs(String[] args) throws ParseException {
    options = new Options();
    options.addOption("i", "input", true, "Input File/Folder Path");
    options.addOption("o", "output", true, "Output Folder");
    options.addOption(
        "d", "devices", true, "Devices Serial Number (Separated by comma if more than one)");
    options.addOption("c", "config", true, "Config File Path");
    options.addOption("s", "screen", false, "Input File/Folder Path");
    options.addOption("m", "mode", true, "Play Mode (SINGLE|MULTIDEVICE|PLAYALL)");
    CommandLineParser parser = new DefaultParser();
    commandLine = parser.parse(options, args);
  }

  public String getInputFilePath() {
    String inputFilePath = commandLine.getOptionValue("i");
    return (inputFilePath == null) ? "" : inputFilePath;
  }

  public String getOutputPath() {
    String outputPath = commandLine.getOptionValue("o");
    return (outputPath == null) ? "" : outputPath;
  }

  public String getConfigPath() {
    String configPath = commandLine.getOptionValue("c");
    return (configPath == null) ? "" : configPath;
  }

  public List<String> getDevicesIdList() {
    String devicesIdList = commandLine.getOptionValue("d");
    return (devicesIdList == null) ? new ArrayList<>() : Arrays.asList(devicesIdList.split(","));
  }

  public String getPlayMode() {
    String playMode = commandLine.getOptionValue("m");
    return (playMode == null) ? "" : playMode;
  }

  public boolean isScreenOutputMode() {
    return commandLine.getOptionValue("s") != null;
  }

  public void printHelp() {
    HelpFormatter formatter = new HelpFormatter();
    formatter.printHelp("uicdCLI", options, true);
  }
}
