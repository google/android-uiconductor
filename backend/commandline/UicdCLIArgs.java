// Copyright 2021 Google LLC
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

import com.google.common.base.Splitter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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
  private static final String GLOBAL_VAR_SYMBOL = "$";
  private static final String COMMA_SEPARATOR = ",";
  private static final String EQUALS_SPLITTER = "=";
  private static final String INPUT_OPTION_SHORT_NAME = "i";
  private static final String OUTPUT_OPTION_SHORT_NAME = "o";
  private static final String DEVICES_OPTION_SHORT_NAME = "d";
  private static final String CONFIG_OPTION_SHORT_NAME = "c";
  // Details of the output will be hidden unless the user specifies -s as an argument
  private static final String SCREEN_OPTION_SHORT_NAME = "s";
  private static final String MODE_OPTION_SHORT_NAME = "m";
  private static final String GLOBAL_VARIABLE_OPTION_SHORT_NAME = "g";

  public UicdCLIArgs(String[] args) throws ParseException {
    options = new Options();
    options.addOption(INPUT_OPTION_SHORT_NAME, "input", true, "Input File/Folder Path");
    options.addOption(OUTPUT_OPTION_SHORT_NAME, "output", true, "Output Folder");
    options.addOption(
        DEVICES_OPTION_SHORT_NAME,
        "devices",
        true,
        "Devices Serial Number (Separated by comma if more than one)");
    options.addOption(CONFIG_OPTION_SHORT_NAME, "config", true, "Config File Path");
    options.addOption(SCREEN_OPTION_SHORT_NAME, "screen", false, "Input File/Folder Path");
    options.addOption(
        MODE_OPTION_SHORT_NAME, "mode", true, "Play Mode (SINGLE|MULTIDEVICE|PLAYALL)");
    options.addOption(
        GLOBAL_VARIABLE_OPTION_SHORT_NAME,
        "global_variable",
        true,
        "Global variable (uicd_key1=value1, uicd_key2=value2)");
    CommandLineParser parser = new DefaultParser();
    commandLine = parser.parse(options, args);
  }

  public String getInputFilePath() {
    return commandLine.getOptionValue(INPUT_OPTION_SHORT_NAME, "").trim();
  }

  public String getOutputPath() {
    return commandLine.getOptionValue(OUTPUT_OPTION_SHORT_NAME, "").trim();
  }

  public String getConfigPath() {
    return commandLine.getOptionValue(CONFIG_OPTION_SHORT_NAME, "").trim();
  }

  public List<String> getDevicesIdList() {
    String devicesIdList = commandLine.getOptionValue(DEVICES_OPTION_SHORT_NAME);
    return (devicesIdList == null)
        ? new ArrayList<>()
        : Arrays.asList(devicesIdList.trim().split(COMMA_SEPARATOR));
  }

  public String getPlayMode() {
    return commandLine.getOptionValue(MODE_OPTION_SHORT_NAME, "").trim();
  }

  public boolean isScreenOutputMode() {
    return commandLine.hasOption(SCREEN_OPTION_SHORT_NAME);
  }

  public Map<String, String> getGlobalVariables() {
    Map<String, String> globalVarsMap = new HashMap<>();
    String globalVars = commandLine.getOptionValue(GLOBAL_VARIABLE_OPTION_SHORT_NAME, "");
    if (!globalVars.isEmpty()) {
      for (String str : Splitter.on(COMMA_SEPARATOR).splitToList(globalVars)) {
        List<String> keyValue = Splitter.on(EQUALS_SPLITTER).splitToList(str.trim());
        if (keyValue.size() < 2
            || keyValue.get(0).trim().length() == 0
            || keyValue.get(1).trim().length() == 0) {
          System.out.println("Ui Conductor global variable definition error");
          continue;
        }
        globalVarsMap.put(
            // As $ cannot be passed through command line option
            GLOBAL_VAR_SYMBOL + keyValue.get(0).trim(),
            keyValue.stream().skip(1).collect(Collectors.joining(EQUALS_SPLITTER)).trim());
      }
    }
    return globalVarsMap;
  }

  public void printHelp() {
    HelpFormatter formatter = new HelpFormatter();
    formatter.printHelp("uicdCLI", options, true);
  }
}
