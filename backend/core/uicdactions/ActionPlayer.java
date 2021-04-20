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

package com.google.uicd.backend.core.uicdactions;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.stream.Collectors.toList;

import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdDeviceException;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayMode;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayStatus;
import com.google.uicd.backend.core.uicdactions.ActionExecutionResult.OutputType;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/** Handles logic of playing back actions. */
public class ActionPlayer {

  private static final String FAILED_STEP_XML_DUMP_FILE_NAME = "FailedStepXmlDump.xml";
  private static final String UICD_XML_DUMPER_PORT = "$uicd_xml_dumper_port";
  public static final String UICD_CURRENT_EXECUTION_ID = "$uicd_current_execution_id";
  private final ActionContext actionContext;
  private final List<AndroidDeviceDriver> androidDeviceDriverList;
  private final PlayMode playMode;

  private static final Logger logger = Logger.getLogger("uicd");

  public ActionPlayer(
      List<AndroidDeviceDriver> androidDeviceDriverList, ActionContext actionContext) {
    this.actionContext = actionContext;
    this.playMode = actionContext.getPlayMode();
    this.androidDeviceDriverList = androidDeviceDriverList;
  }

  public ActionExecutionResult playSingleDevice(
      BaseAction baseAction, ActionContext actionContext, int dIndex) {
    ActionExecutionResult executionResult = new ActionExecutionResult();
    try {
      executionResult = baseAction.playWithDelay(androidDeviceDriverList, actionContext, dIndex);
    } catch (UicdDeviceException e) {
      logger.warning(e.getMessage());
    }
    return executionResult;
  }

  public ActionExecutionResult playAction(BaseAction baseAction) throws UicdDeviceException {
    logger.info("Start play uicd action.");
    ActionExecutionResult actionExecutionResult = new ActionExecutionResult();
    actionContext
        .getGlobalVariableMap()
        .addVariable(UICD_CURRENT_EXECUTION_ID, actionContext.getExecutionId().toString(), true);
    if (!androidDeviceDriverList.isEmpty()) {
      List<String> xmlHostPortList =
          androidDeviceDriverList.stream()
              .map(
                  d ->
                      String.format("%s:%d", d.getDeviceId(), d.getDevice().getXmlDumperHostPort()))
              .collect(Collectors.toList());
      if (!xmlHostPortList.isEmpty()) {
        actionContext
            .getGlobalVariableMap()
            .addVariable(UICD_XML_DUMPER_PORT, String.join(";", xmlHostPortList));
      }
    }
    if (playMode == PlayMode.SINGLE || playMode == PlayMode.MULTIDEVICE) {

      actionExecutionResult = baseAction.playWithDelay(androidDeviceDriverList, actionContext);
      if (actionExecutionResult.getPlayStatus() == PlayStatus.FAIL) {
        writeFailedDumpXmlToFile();
      }
    } else if (playMode == PlayMode.PLAYALL) {
      playActionOnAllDevices(baseAction, actionExecutionResult);
    }
    return actionExecutionResult;
  }

  private void writeFailedDumpXmlToFile() {
    String failedXmlDumpFileFullPath =
        actionContext.getOutputFileFullPath(
            actionContext.getRootActionName() + "_" + FAILED_STEP_XML_DUMP_FILE_NAME);

    List<String> lastXmlDump = actionContext.getFailedStepXmlDump();
    if (lastXmlDump != null && !lastXmlDump.isEmpty()) {
      String outputContent = String.join(System.lineSeparator(), lastXmlDump);
      try {
        Files.write(Paths.get(failedXmlDumpFileFullPath), outputContent.getBytes(UTF_8));
      } catch (IOException e) {
        logger.warning(
            String.format(
                "Can not write xmldmper output to file: %s. Detail error: %s",
                failedXmlDumpFileFullPath, e.getMessage()));
      }
    }
  }

  private void playActionOnAllDevices(
      BaseAction baseAction, ActionExecutionResult actionExecutionResult) {
    actionExecutionResult.setOutputType(OutputType.ALLDEVICES);

    List<CompletableFuture<ActionExecutionResult>> relevanceFutures = new ArrayList<>();
    for (int dIndex = 0; dIndex < androidDeviceDriverList.size(); dIndex++) {

      actionContext.setCurrentDeviceIndex(dIndex);
      actionContext.setPlayMode(PlayMode.SINGLE);
      final ActionContext currentActionContext;
      if (dIndex == 0) {
        currentActionContext = actionContext;
      } else {
        currentActionContext = ActionContext.makeCopy(actionContext);
      }
      // Variable used in lambda expression should be final or effectively final
      int idx = dIndex;
      relevanceFutures.add(
          CompletableFuture.supplyAsync(
                  () -> playSingleDevice(baseAction, currentActionContext, idx))
              .handle(
                  (result, ex) -> {
                    if (result != null) {
                      return result;
                    } else {
                      logger.warning(
                          "Play All Mode: Some device failed. Please check devices manually.");
                      return null;
                    }
                  }));
    }

    List<ActionExecutionResult> childrenExecutionResults =
        relevanceFutures.stream().map(CompletableFuture::join).collect(toList());

    mergeChildActionExecutionResult(childrenExecutionResults, actionExecutionResult);
  }

  private void mergeChildActionExecutionResult(
      List<ActionExecutionResult> actionExecutionResults,
      ActionExecutionResult actionExecutionResult) {
    PlayStatus playStatus = PlayStatus.PASS;
    if (!actionExecutionResults.isEmpty()) {
      actionExecutionResult.setRegularOutput(
          "PlayAll Mode: " + actionExecutionResults.get(0).getContent());
    }
    for (ActionExecutionResult childResult : actionExecutionResults) {
      // Make CANCELLED status higher priority over a FAIL status.
      // If user click cancel button on the frontend, it should always show cancel.
      if (childResult.getPlayStatus() == PlayStatus.CANCELLED) {
        playStatus = childResult.getPlayStatus();
        break;
      }
      if (childResult.getPlayStatus() == PlayStatus.FAIL) {
        playStatus = childResult.getPlayStatus();
      }
    }
    actionExecutionResults.forEach(actionExecutionResult::addChildResult);
    actionExecutionResult.setPlayStatus(playStatus);
  }

  // used only by mobileharness driver
  public void initDevicesDisplayScale() {
    for (AndroidDeviceDriver driver : androidDeviceDriverList) {
      driver.setScaleByDeviceType();
    }
  }
}
