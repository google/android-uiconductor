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

import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.db.ActionStorageManager;
import com.google.uicd.backend.core.devicesdriver.DevicesDriverManager;
import com.google.uicd.backend.core.exceptions.UicdActionException;
import com.google.uicd.backend.core.exceptions.UicdDeviceException;
import com.google.uicd.backend.core.exceptions.UicdExcpetion;
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
  private static final String LOG_FILENAME_PREFIX = "UicdCLIlog";

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

      int totalCnt = 0;
      int passedCnt = 0;
      for (String fileName : getFilenamesWithFullPathFromPath(inputFilePath)) {
        // user mode, re-direct the output to log file..
        if (!argsObj.isScreenOutputMode()) {
          setRedirectOutputToFile(logFolder);
        }

        ActionExecutionResult actionExecutionResult =
            playActionFromFile(fileName, argsObj.getDevicesIdList(), argsObj.getPlayMode());

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
      }

      printTestResultSummary(totalCnt, passedCnt);
    } catch (IOException | UicdExcpetion | ParseException e) {
      System.out.println("ERROR! Exception encountered: " +  e.getMessage());
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
      String fullPath, List<String> deviceIdList, String playMode)
      throws IOException, UicdExternalCommandException, UicdDeviceException, UicdActionException {

    ActionStorageManager actionStorageManager = new ActionStorageManager(false);
    String jsonContent = new String(Files.readAllBytes(Paths.get(fullPath)));
    BaseAction action = actionStorageManager.loadMapFromString(jsonContent);

    if (action == null) {
      System.out.println(String.format("File(%s) is not a valid Uicd recorded file.", fullPath));
      ActionExecutionResult actionExecutionResult = new ActionExecutionResult();
      actionExecutionResult.setPlayStatus(PlayStatus.SKIPPED);
      return actionExecutionResult;
    }
    DevicesDriverManager devicesDriverManager = new DevicesDriverManager();
    devicesDriverManager.initDevicesList(deviceIdList);
    devicesDriverManager.startMultiXmldumperServer(deviceIdList, true);

    ActionContext actionContext = new ActionContext();
    actionContext.setPlayMode(playMode.isEmpty() ? PlayMode.SINGLE : PlayMode.valueOf(playMode));
    ActionPlayer actionPlayer =
        new ActionPlayer(devicesDriverManager.getXmldumperDriverList(), actionContext);
    actionPlayer.initDevicesDisplayScale();
    ActionExecutionResult actionExecutionResult = actionPlayer.playAction(action);
    devicesDriverManager.stopMultiXmldumperServer(deviceIdList);
    return actionExecutionResult;
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
    return ANSI_RED + str + ANSI_RESET;
  }

  private static String getGreenOutput(String str) {
    return ANSI_GREEN + str + ANSI_RESET;
  }

  private static String getYellowOutput(String str) {
    return ANSI_YELLOW + str + ANSI_YELLOW;
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
}
