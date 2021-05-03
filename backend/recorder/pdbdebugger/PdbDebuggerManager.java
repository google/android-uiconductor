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

package com.google.uicd.backend.recorder.pdbdebugger;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.io.Files;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.constants.PdbDebuggerActionCode;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.devicesdriver.DevicesDriverManager;
import com.google.uicd.backend.core.globalvariables.UicdGlobalVariableMap;
import com.google.uicd.backend.core.utils.CommandLineUtil;
import java.io.BufferedWriter;
import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.Charset;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import javax.annotation.PostConstruct;
import org.springframework.stereotype.Service;

/** Manager for pdb debugger service for UICD. */
@Service
public class PdbDebuggerManager {
  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");
  private Process process;
  private InputStream inputStream;
  private Boolean scriptRunning;
  private final CommandLineUtil commandLineUtil = new CommandLineUtil();
  private OutputStream processInput = null;
  private PdbDebuggerProcessListenerThread thread;
  private static final Duration WAIT_PERIOD = Duration.ofMillis(200);
  private static final int RETRY_NUMBER = 25;
  private CopyOnWriteArrayList<String> outputList;
  private DevicesDriverManager devicesDriverManager;
  private static final String UICD_XML_DUMPER_PORT = "$uicd_xml_dumper_port";
  private int currentLine = -1;
  private int breakPointIndex = 0;
  private HashMap<Integer, Integer> breakPointMap = new HashMap<Integer, Integer>();

  @PostConstruct
  private void init() {
    devicesDriverManager = DevicesDriverManager.getInstance();
  }

  /** This function starts a python process and pdb debugger. */
  public String startPythonProcess(
      String pythonScript, UicdGlobalVariableMap uicdGlobalVariableMap, String breakLines) {
    /* Make sure process is clean at the start. */
    this.stopPdbDebugger();
    List<String> output = new ArrayList<>();
    List<String> result = new ArrayList<>();
    List<AndroidDeviceDriver> androidDeviceDriverList =
        devicesDriverManager.getXmlDumperDriverList();
    List<String> xmlHostPortList =
        androidDeviceDriverList.stream()
            .map(d -> String.format("%s:%d", d.getDeviceId(), d.getDevice().getXmlDumperHostPort()))
            .collect(Collectors.toList());
    if (xmlHostPortList.size() > 0) {
      uicdGlobalVariableMap.addVariable(UICD_XML_DUMPER_PORT, String.join(";", xmlHostPortList));
    }
    String globalVariableJson = uicdGlobalVariableMap.toJson();

    String path = UicdConfig.getInstance().getBaseFolder() + "pyscripts/";
    File directory = new File(path);
    if (!directory.exists()) {
      directory.mkdirs();
    }
    String timeStamp = Long.toString(System.currentTimeMillis());
    File pythonScriptFile = new File(path + "script_" + timeStamp + ".py");
    try {
      Files.asCharSink(pythonScriptFile, Charset.defaultCharset()).write(pythonScript);
      String pythonCommand =
          String.format(
              "python3 -m pdb %sscript_%s.py %s",
              path,
              timeStamp,
              Base64.getEncoder().encodeToString(globalVariableJson.getBytes(UTF_8)));
      this.process = commandLineUtil.execute(pythonCommand, output, false);
      this.scriptRunning = true;
      this.outputList = new CopyOnWriteArrayList<>();
      this.thread = new PdbDebuggerProcessListenerThread(this.outputList, this.process);
      this.thread.start();
      result.add(this.waitAndFetchCurrentOutput());
      // case with break points
      if (breakLines.length() > 0) {
        result.add(this.executeAction(PdbDebuggerActionCode.BREAK, breakLines));
      }
      // auto continue
      result.add(this.executeAction(PdbDebuggerActionCode.CONTINUE, ""));
      this.updateCurrentLine(result);
      return String.join(System.lineSeparator(), result);
    } catch (Exception e) {
      logger.info(e.getMessage());
      return e.getMessage();
    }
  }

  /** This function sends command to update the current line. */
  private void updateCurrentLine(List<String> result) {
    Pattern pythonPattern = Pattern.compile("\\.py\\(\\d+\\)");
    for (String outputString : result) {
      Matcher pythonMatcher = pythonPattern.matcher(outputString);
      if (pythonMatcher.find()) {
        String target = pythonMatcher.group();
        Pattern digit = Pattern.compile("\\d+");
        Matcher number = digit.matcher(target);
        if (number.find()) {
          this.currentLine = Integer.parseInt(number.group());
        }
      }
    }
  }

  /* Returns the current line if a pdb debugger program is running, -1 if not. */
  public int getCurrentLineIndex() {
    if (!this.process.isAlive()) {
      this.currentLine = -1;
    }
    return this.currentLine;
  }

  /** This function sends command to a running process. */
  private void sendCommandToProcess(String command) {
    try {
      this.processInput = this.process.getOutputStream();
      BufferedWriter bf =
          new BufferedWriter(new OutputStreamWriter(this.processInput, Charset.defaultCharset()));
      bf.write(command);
      bf.flush();
      logger.info("Executed command: " + command);
    } catch (Exception e) {
      System.err.println("Error while executing command: " + e.getMessage());
    }
  }

  /** This function generates the corresponding commandlines for python debugger. */
  private List<String> generateCommandLine(PdbDebuggerActionCode actionCode, String breakLines) {
    List<String> commandList = new ArrayList<>();
    switch (actionCode) {
      case RUN:
      case BREAK:
        String[] breakPointArray = breakLines.split(",");
        for (String breakPoint : breakPointArray) {
          this.breakPointIndex += 1;
          this.breakPointMap.put(Integer.parseInt(breakPoint), this.breakPointIndex);
          commandList.add("b " + breakPoint + System.lineSeparator());
        }
        break;
      case STEP_IN:
        commandList.add("s" + System.lineSeparator());
        break;
      case NEXT:
        commandList.add("n" + System.lineSeparator());
        break;
      case CONTINUE:
        commandList.add("c" + System.lineSeparator());
        break;
      case CLEAR:
        // this case break point should come 1 by 1
        int breakPointIndex = this.breakPointMap.remove(Integer.parseInt(breakLines));
        commandList.add("cl " + String.valueOf(breakPointIndex) + System.lineSeparator());
      case UNKNOWN:
        commandList.add("Default");
    }
    return commandList;
  }

  /** This function executes the function action. */
  public String executeAction(PdbDebuggerActionCode actionCode, String breakLines) {
    List<String> commandList = generateCommandLine(actionCode, breakLines);
    List<String> output = new ArrayList<>();
    for (String s : commandList) {
      // invalid requests here
      if (s.equals("Default")) {
        return ("Invalid request");
      } else {
        this.outputList.clear();
        this.sendCommandToProcess(s);
        output.add(this.waitAndFetchCurrentOutput());
      }
    }
    this.updateCurrentLine(output);
    return String.join(System.lineSeparator(), output);
  }

  private String waitAndFetchCurrentOutput() {
    int retry = 0;
    while (this.outputList.size() == 0 && retry < RETRY_NUMBER) {
      try {
        Thread.sleep(WAIT_PERIOD.toMillis());
        retry = retry + 1;
      } catch (Exception e) {
        logger.warning(e.getMessage());
      }
    }
    return String.join(System.lineSeparator(), this.outputList);
  }

  public void stopPdbDebugger() {
    if ((this.process != null && this.process.isAlive())
        || (this.thread != null && this.thread.isAlive())) {
      if (this.process != null) {
        this.process.destroy();
      }
      if (this.thread != null) {
        this.thread.interrupt();
      }
      this.currentLine = -1;
      this.breakPointIndex = 0;
      this.breakPointMap.clear();
    }
  }
}
