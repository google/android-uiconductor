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

package com.google.uicd.backend.controllers;

import com.google.uicd.backend.controllers.requests.PythonDebuggerRequest;
import com.google.uicd.backend.controllers.responses.PythonDebuggerLineIndexResponse;
import com.google.uicd.backend.controllers.responses.PythonDebuggerResponse;
import com.google.uicd.backend.core.constants.PdbDebuggerActionCode;
import com.google.uicd.backend.core.globalvariables.UicdGlobalVariableMap;
import com.google.uicd.backend.recorder.pdbdebugger.PdbDebuggerManager;
import com.google.uicd.backend.recorder.workflowmgr.WorkflowManager;
import java.util.concurrent.Callable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** Handles all the pdb debugger related requests from frontend. */
@ComponentScan("com.google.uicd.backend.*")
@EnableAutoConfiguration
@RestController
public class PdbDebuggerController {
  @Autowired WorkflowManager workflowManager;
  @Autowired PdbDebuggerManager pdbDebuggerManager;
  private static final String UICD_XML_DUMPER_PORT = "$uicd_xml_dumper_port";

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/runPdbDebugger", method = RequestMethod.POST)
  public Callable<PythonDebuggerResponse> runPdbDebugger(
      @RequestBody PythonDebuggerRequest pythonDebuggerRequest) {
    UicdGlobalVariableMap uicdGlobalVariableMap = new UicdGlobalVariableMap();
    uicdGlobalVariableMap.fillRawMapByJsonOrPlainStr(
        workflowManager.getGlobalVariableMapInPlainString());
    return () ->
        PythonDebuggerResponse.create(
            pdbDebuggerManager.startPythonProcess(
                pythonDebuggerRequest.getPythonScript(),
                uicdGlobalVariableMap,
                pythonDebuggerRequest.getBreakLines()),
            pdbDebuggerManager.getCurrentLineIndex());
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/pdbDebuggerBreak")
  public Callable<PythonDebuggerResponse> pdbDebuggerBreak(
      @RequestParam(value = "breakLines") String breakLines) {
    return () ->
        PythonDebuggerResponse.create(
            pdbDebuggerManager.executeAction(PdbDebuggerActionCode.BREAK, breakLines),
            pdbDebuggerManager.getCurrentLineIndex());
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/pdbDebuggerContinue")
  public Callable<PythonDebuggerResponse> pdbDebuggerContinue() {
    return () ->
        PythonDebuggerResponse.create(
            pdbDebuggerManager.executeAction(PdbDebuggerActionCode.CONTINUE, ""),
            pdbDebuggerManager.getCurrentLineIndex());
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/pdbDebuggerStepIn")
  public Callable<PythonDebuggerResponse> pdbDebuggerStepIn() {
    return () ->
        PythonDebuggerResponse.create(
            pdbDebuggerManager.executeAction(PdbDebuggerActionCode.STEP_IN, ""),
            pdbDebuggerManager.getCurrentLineIndex());
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/pdbDebuggerNext")
  public Callable<PythonDebuggerResponse> pdbDebuggerNext() {
    return () ->
        PythonDebuggerResponse.create(
            pdbDebuggerManager.executeAction(PdbDebuggerActionCode.NEXT, ""),
            pdbDebuggerManager.getCurrentLineIndex());
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/getPdbDebuggerCurrentLine")
  public Callable<PythonDebuggerLineIndexResponse> getPdbDebuggerCurrentLine() {
    return () -> PythonDebuggerLineIndexResponse.create(pdbDebuggerManager.getCurrentLineIndex());
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/pdbDebuggerClear")
  public Callable<PythonDebuggerResponse> pdbDebuggerClear(
      @RequestParam(value = "breakLines") String breakLines) {
    return () ->
        PythonDebuggerResponse.create(
            pdbDebuggerManager.executeAction(PdbDebuggerActionCode.CLEAR, breakLines),
            pdbDebuggerManager.getCurrentLineIndex());
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/stopPdbDebugger")
  public Callable<PythonDebuggerResponse> stopPdbDebugger() {
    pdbDebuggerManager.stopPdbDebugger();
    return () -> PythonDebuggerResponse.create("Pdb Debugger has stopped.", -1);
  }
}
