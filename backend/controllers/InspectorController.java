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

import com.google.uicd.backend.controllers.responses.OcrDetailsResponse;
import com.google.uicd.backend.recorder.services.InspectorManager;
import java.util.concurrent.Callable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/** Handles all the project related requests from frontend. */
@ComponentScan("com.google.uicd.backend.*")
@RestController
public class InspectorController {

  @Autowired InspectorManager inspectorManager;

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/getOcrDetails", method = RequestMethod.GET)
  public Callable<OcrDetailsResponse> getOcrDetails() {
    return () -> OcrDetailsResponse.create(inspectorManager.getOCRDetails());
  }
}
