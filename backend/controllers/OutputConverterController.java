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

import com.google.uicd.backend.recorder.coverter.pyuiautomator.UicdPyConverter;
import com.google.uicd.backend.recorder.coverter.roboscript.UicdRoboConverter;
import com.google.uicd.backend.recorder.workflowmgr.WorkflowManager;
import java.util.concurrent.Callable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Handles all the pdb debugger related requests from frontend. */
@ComponentScan("com.google.uicd.backend.*")
@EnableAutoConfiguration
@RestController
public class OutputConverterController {

  @Autowired
  WorkflowManager workflowManager;

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/exportToPython")
  public Callable<String> exportToPython() {
    return () -> UicdPyConverter.convert(workflowManager.getWorkspaceCompoundAction());
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/exportToRoboScript")
  public Callable<String> exportToRoboScript() {
    return () -> UicdRoboConverter.convert(workflowManager.getWorkspaceCompoundAction());
  }
}
