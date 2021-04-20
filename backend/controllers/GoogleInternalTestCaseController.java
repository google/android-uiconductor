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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.constants.ActionType;
import com.google.uicd.backend.core.constants.JsonFlag;
import com.google.uicd.backend.core.db.ActionStorageManager;
import com.google.uicd.backend.core.exceptions.UicdActionException;
import com.google.uicd.backend.core.uicdactions.BaseAction;
import com.google.uicd.backend.core.uicdactions.CompoundAction;
import com.google.uicd.backend.recorder.services.ProjectManager;
import com.google.uicd.backend.recorder.services.TestCaseTreeManager;
import com.google.uicd.backend.recorder.services.TestCasesImportExportManager;
import com.google.uicd.backend.recorder.services.TestHistoryManager;
import com.google.uicd.backend.recorder.workflowmgr.WorkflowManager;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.concurrent.Callable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** TestCaseContoller. */
@ComponentScan("com.google.uicd.backend.*")
@RestController
public class GoogleInternalTestCaseController {
  @Autowired TestCaseTreeManager testCaseTreeManager;
  @Autowired WorkflowManager workflowManager;
  @Autowired ActionStorageManager actionStorageManager;
  @Autowired TestHistoryManager testHistoryManager;
  @Autowired TestCasesImportExportManager testCasesImportExportManager;
  @Autowired ProjectManager projectManager;

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/importTestCaseFromGoogle3", method = RequestMethod.GET)
  public Callable<String> importTestCaseFromGoogle3(
      @RequestParam(value = "citcClient") String citcClient,
      @RequestParam(value = "path") String path) {
    return () -> {
      String filePath = generateCitcPath(citcClient, path);
      String testInJson = "";
      try (BufferedReader bufferedReader = new BufferedReader(new FileReader(filePath))) {
        StringBuilder stringBuilder = new StringBuilder();
        String line = bufferedReader.readLine();

        while (line != null) {
          stringBuilder.append(line);
          stringBuilder.append(System.lineSeparator());
          line = bufferedReader.readLine();
        }
        testInJson = stringBuilder.toString();
      } catch (Exception e) {
        throw new Exception(e);
      }

      BaseAction baseAction = BaseAction.fromJson(testInJson);
      actionStorageManager.saveAction(baseAction);
      updateGoogle3Path(baseAction, path);
      return baseAction.toJson(JsonFlag.FRONTEND);
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/exportTestCaseFromGoogle3", method = RequestMethod.GET)
  public void exportTestCaseFromGoogle3(
      @RequestParam(value = "citcClient") String citcClient,
      @RequestParam(value = "path") String path,
      @RequestParam(value = "uuid") String uuid)
      throws IOException, UicdActionException {
    try {
      // save the current action if the user already hasn't
      workflowManager.saveCurrentWorkflowWithoutMetadata();
      BaseAction baseAction = actionStorageManager.getActionByUUID(uuid);
      updateGoogle3Path(baseAction, path);
      String filePath = generateCitcPath(citcClient, path);
      FileWriter fileWriter = new FileWriter(filePath);
      Gson gson = new GsonBuilder().setPrettyPrinting().create();
      JsonParser jsonParser = new JsonParser();
      JsonElement jsonElement = jsonParser.parse(baseAction.toJson(JsonFlag.EXPORT));
      fileWriter.write(gson.toJson(jsonElement));
      fileWriter.close();
    } catch (UicdActionException | IOException e) {
      throw e;
    }
  }

  private void updateGoogle3Path(BaseAction baseAction, String path) {
    if (baseAction.getActionType().equals(ActionType.COMPOUND_ACTION)) {
      CompoundAction compoundAction = (CompoundAction) baseAction;
      compoundAction.getAdditionalData().setFilePath(path);
      actionStorageManager.saveAction(compoundAction);
    }
  }

  private static String google3Path(String path) {
    String google3 = "google3/";
    if (path.contains(google3)) {
      return path.substring(path.indexOf(google3) + google3.length());
    } else if (path.startsWith("//")) {
      return path.substring(2);
    }
    return path;
  }

  private static String generateCitcPath(String citcClient, String path) {
    String currentUser = UicdConfig.getInstance().getCurrentUser();
    return "/google/src/cloud/" + currentUser + "/" + citcClient + "/google3/" + google3Path(path);
  }
}
