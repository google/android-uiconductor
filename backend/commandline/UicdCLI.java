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

import static java.nio.charset.StandardCharsets.UTF_8;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.db.ActionEntity;
import com.google.uicd.backend.core.db.ActionStorageManager;
import com.google.uicd.backend.core.db.FileSystemActionStorageManager;
import com.google.uicd.backend.core.devicesdriver.DevicesDriverManager;
import com.google.uicd.backend.core.exceptions.UicdActionException;
import com.google.uicd.backend.core.exceptions.UicdDeviceException;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.uicdactions.ActionContext;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayMode;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayStatus;
import com.google.uicd.backend.core.uicdactions.ActionExecutionResult;
import com.google.uicd.backend.core.uicdactions.ActionPlayer;
import com.google.uicd.backend.core.uicdactions.BaseAction;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.FileHandler;
import java.util.logging.Handler;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;
import org.apache.commons.cli.ParseException;

/** UicdCLI The command line interface for executing recorded test case. */
public class UicdCLI {

  private static final String ANSI_RESET = "\u001B[0m";
  private static final String ANSI_RED = "\u001B[31m";
  private static final String ANSI_GREEN = "\u001B[32m";
  private static final String ANSI_YELLOW = "\u001B[33m";
  private static final String LOG_FOLDER_NAME = "log";
  private static final String RESULT_FOLDER_NAME = "result";
  private static final String LOG_FILENAME_PREFIX = "UicdCLIlog";

  private static final boolean HAS_CONSOLE = System.console() != null;

  public static void main(String[] args) {
    try {
      UicdCLIArgs argsObj = new UicdCLIArgs(args);
      String outputFolder = argsObj.getOutputPath();
      String inputFilePath = argsObj.getInputFilePath();
      if (!argsObj.getConfigPath().isEmpty()) {
        UicdConfig.getInstance().loadFromConfigFile(argsObj.getConfigPath());
      }
      if (outputFolder.isEmpty()) {
        outputFolder = UicdConfig.getInstance().getTestOutputFolder();
      }
      if (inputFilePath.isEmpty()
          || outputFolder.isEmpty()
          || argsObj.getDevicesIdList().isEmpty()) {
        argsObj.printHelp();
        System.out.println(
            "Please check parameters! Please provide all following params: input,output,devices.");
        return;
      }

      // Call getInstance to init the logger.
      UicdCoreDelegator.getInstance();

      System.out.println("Uicd Test Start...");
      Path logFolder = Paths.get(outputFolder, LOG_FOLDER_NAME);
      if (Files.notExists(logFolder)) {
        Files.createDirectories(logFolder);
      }
      Path resultFolder = Paths.get(outputFolder, RESULT_FOLDER_NAME);
      if (Files.notExists(resultFolder)) {
        Files.createDirectories(resultFolder);
      }
      int totalCnt = 0;
      int passedCnt = 0;
      for (String fileName : getFilenamesWithFullPathFromPath(inputFilePath)) {
        // user mode, re-direct the output to log file..
        if (!argsObj.isScreenOutputMode()) {
          setRedirectOutputToFile(logFolder);
        }

        ActionExecutionResult actionExecutionResult =
            playActionFromFile(
                fileName,
                argsObj.getDevicesIdList(),
                argsObj.getPlayMode(),
                argsObj.getGlobalVariables());

        // Valid uicd test case
        if (actionExecutionResult.getPlayStatus() != PlayStatus.SKIPPED) {
          totalCnt++;
        }
        if (actionExecutionResult.getPlayStatus() == PlayStatus.PASS) {
          passedCnt++;
        }
        System.out.println(
            String.format(
                "Test(%s) finished. \n Result: %s",
                fileName, getColorStatusStr(actionExecutionResult.getPlayStatus())));
        // We need to maintain the subdir for result json files for each test to avoid conflicts.
        // example:
        // input path is "tests/" and containing file structure is:
        //   tests/sub_dir1/dummytest1
        //   tests/sub_dir2/dummytest2
        //   tests/dummytest3
        // output path "output/result/" file structure should be :
        //   output/result/sub_dir1/dummytest1/action_execution_result
        //   output/result/sub_dir2/dummytest2/action_execution_result
        //   output/result/dummytest3/action_execution_result
        String subDirPath =
            getRelativePath(
                new File(inputFilePath).getAbsolutePath(), new File(fileName).getAbsolutePath());
        Path testResultDir = Paths.get(resultFolder.toString(), subDirPath);
        if (Files.notExists(testResultDir)) {
          Files.createDirectories(testResultDir);
        }
        writeContentsToFile(
            Paths.get(testResultDir.toString(), "action_execution_result").toString(),
            actionExecutionResult.toJson());
      }

      printTestResultSummary(totalCnt, passedCnt);
    } catch (IOException | UicdException | ParseException e) {
      System.out.println("ERROR! Exception encountered: " + e.getMessage());
    }
  }

  private static void printTestResultSummary(int totalCnt, int passedCnt) {
    System.out.println("======================Uicd tests final result=========================");
    System.out.println(
        String.format(
            "Runs: (%d), Failures: (%s), Passed: (%s).",
            totalCnt,
            getRedOutput(Integer.toString(totalCnt - passedCnt)),
            getGreenOutput(Integer.toString(passedCnt))));
  }

  private static List<String> getFilenamesWithFullPathFromPath(String inputPath) {
    List<String> fileList = new ArrayList<>();
    File file = new File(inputPath);
    if (file.isFile()) {
      fileList.add(file.toString());
    } else if (file.isDirectory()) {
      for (File f : file.listFiles()) {
        if (f.isDirectory()) {
          fileList.addAll(getFilenamesWithFullPathFromPath(f.getAbsolutePath()));
        } else {
          fileList.add(f.getAbsolutePath());
        }
      }
    }
    return fileList;
  }

  private static ActionExecutionResult playActionFromFile(
      String fullPath,
      List<String> deviceIdList,
      String playMode,
      Map<String, String> globalVariablesMap)
      throws IOException, UicdExternalCommandException, UicdDeviceException, UicdActionException {

    ActionStorageManager actionStorageManager = new FileSystemActionStorageManager();
    String jsonContent = new String(Files.readAllBytes(Paths.get(fullPath)), UTF_8);
    BaseAction action = tryGetActionByStr(actionStorageManager, jsonContent);

    if (action == null) {
      System.out.println(String.format("File(%s) is not a valid Uicd recorded file.", fullPath));
      ActionExecutionResult actionExecutionResult = new ActionExecutionResult();
      actionExecutionResult.setPlayStatus(PlayStatus.SKIPPED);
      return actionExecutionResult;
    }
    DevicesDriverManager devicesDriverManager = DevicesDriverManager.getInstance();
    devicesDriverManager.initDevicesList(deviceIdList);
    devicesDriverManager.startMultiXmlDumperServer(deviceIdList, true);

    ActionContext actionContext = new ActionContext();
    actionContext.setPlayMode(playMode.isEmpty() ? PlayMode.SINGLE : PlayMode.valueOf(playMode));
    actionContext.setRootActionName(action.getName());
    globalVariablesMap.forEach((k, v) -> actionContext.getGlobalVariableMap().addVariable(k, v));
    ActionPlayer actionPlayer =
        new ActionPlayer(devicesDriverManager.getXmlDumperDriverList(), actionContext);
    actionPlayer.initDevicesDisplayScale();
    ActionExecutionResult actionExecutionResult = actionPlayer.playAction(action);
    devicesDriverManager.stopMultiXmlDumperServer(deviceIdList);
    return actionExecutionResult;
  }

  private static BaseAction tryGetActionByStr(
      ActionStorageManager actionStorageManager, String jsonContent) throws UicdActionException {
    // Currently we have two ways to export test cases. export single test case which is a
    // serialization of a Action object or export by project which is an ActionEntity Object.
    // ActionEntity is a wrapper of Action object. Unfortunately Jackson somehow can construct
    // Action object using ActionsEntity Json but with incorrect Information. The following logic
    // will handle both cases.
    ActionEntity actionEntity = null;
    try {
      actionEntity = fromJsonEx(jsonContent, new TypeReference<ActionEntity>() {});
      jsonContent = actionEntity.getDetails();
    } catch (UicdActionException e) {
      System.out.println("Input file is ordinary export file, skip ActionEntity loading");
    }
    return actionStorageManager.loadMapFromString(jsonContent);
  }

  private static void setRedirectOutputToFile(Path logFolder) throws IOException {
    Path logFilePath =
        Paths.get(logFolder.toString(), LOG_FILENAME_PREFIX + new Date().getTime() + ".txt");
    System.out.println("Starting print to file...\n" + logFilePath.toString());
    Handler fh = new FileHandler(logFilePath.toString());
    fh.setFormatter(new SimpleFormatter());

    // Remove the output in the console.
    LogManager.getLogManager().reset();
    Logger.getLogger("uicd").addHandler(fh);
  }

  private static String getRedOutput(String str) {
    return HAS_CONSOLE ? ANSI_RED + str + ANSI_RESET : str;
  }

  private static String getGreenOutput(String str) {
    return HAS_CONSOLE ? ANSI_GREEN + str + ANSI_RESET : str;
  }

  private static String getYellowOutput(String str) {
    return HAS_CONSOLE ? ANSI_YELLOW + str + ANSI_YELLOW : str;
  }

  private static String getColorStatusStr(PlayStatus playStatus) {
    if (playStatus == PlayStatus.FAIL) {
      return getRedOutput(playStatus.toString());
    } else if (playStatus == PlayStatus.PASS) {
      return getGreenOutput(playStatus.toString());
    } else {
      return getYellowOutput(playStatus.toString());
    }
  }

  private static String getRelativePath(String parentPath, String fullPath) {
    if (fullPath.startsWith(parentPath)) {
      return fullPath.substring(parentPath.length());
    }
    return "";
  }

  private static void writeContentsToFile(String filepath, String contents) throws IOException {
    System.out.println("Writing contents to: " + filepath);
    Files.createDirectories(Paths.get(new File(filepath).getParent()));
    Files.write(Paths.get(filepath), contents.getBytes(UTF_8));
  }

  // Todo(tccyp): change to JsonUtilEx.fromJson.
  private static <T extends Object> T fromJsonEx(String jsonDataString, TypeReference<T> typeRef)
      throws UicdActionException {
    ObjectMapper mapper = new ObjectMapper();
    T obj = null;
    try {
      JavaTimeModule module = new JavaTimeModule();
      mapper.registerModule(module);
      obj = mapper.readValue(jsonDataString, typeRef);
    } catch (IOException e) {
      throw new UicdActionException("Cannot be converted to Json");
    }
    return obj;
  }
}
