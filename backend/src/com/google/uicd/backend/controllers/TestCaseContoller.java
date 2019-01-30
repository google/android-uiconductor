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

package com.google.uicd.backend.controllers;

import com.google.common.io.ByteStreams;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.db.ActionEntity;
import com.google.uicd.backend.recorder.db.TestCaseHistoryDAO;
import com.google.uicd.backend.recorder.db.TestCaseHistoryEntity;
import com.google.uicd.backend.recorder.db.TestCaseTreeDAO;
import com.google.uicd.backend.recorder.db.TestCaseTreeEntity;
import com.google.uicd.backend.recorder.services.TestCaseManager;
import com.google.uicd.backend.recorder.workflowmgr.WorkflowManager;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.nio.file.Paths;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@ComponentScan("com.google.wireless.android.testtools.uicd.com.google.uicd.backend.core.db")
@ComponentScan("com.google.wireless.android.testtools.uicd.com.google.uicd.backend.recorder.workflowmgr")
@RestController
public class TestCaseContoller {
  private Logger logger = LogManager.getLogManager().getLogger("uicd");
  private static final String DONE = "{\"status\":\"done\"}";
  @Autowired TestCaseTreeDAO testCaseTreeDAO;
  @Autowired TestCaseHistoryDAO testCaseHistoryDAO;
  @Autowired TestCaseManager testCaseManager;
  @Autowired WorkflowManager workflowManager;

  @CrossOrigin(origins = "*")
  @RequestMapping("/testcase")
  public String testcase() {
    return DONE;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/fetchTestcaseTree")
  public Callable<String> fetchTestcaseTree() {
    return () -> {
      TestCaseTreeEntity testCaseTreeEntity = testCaseTreeDAO.getFirstTreeDetails();
      return testCaseTreeEntity.toJson();
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/fetchTestcaseTreeByUsername")
  public Callable<String> fetchTestcaseTreeByUsername(String username) {
    return () -> {
      return TestCaseTreeEntity.listToJson(testCaseTreeDAO.getTestCaseTreeByUsername(username));
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/fetchTestcaseByName")
  public Callable<List<ActionEntity>> fetchTestcaseByName(String testcaseName) {
    return () -> {
      return workflowManager.getActionByName(testcaseName, "CompoundAction");
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/fetchTestcaseHistory")
  public Callable<String> fetchTestcaseHistory() {
    return () -> {
      List<TestCaseHistoryEntity> testcaseHistoryList =
          testCaseHistoryDAO.getTestCaseTreeByUsername();
      return TestCaseHistoryEntity.listToJson(testcaseHistoryList);
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/batchPlay", method = RequestMethod.POST)
  public Callable<String> batchPlay(@RequestBody String testcasesListStr) {
    return () -> {
      String[] testcasesList = testcasesListStr.split(",");
      for (String workflowId : testcasesList) {
        workflowManager.playAction(workflowId);
      }
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/updateTestCaseTree", method = RequestMethod.POST)
  public Callable<String> updateTestCaseTree(@RequestBody String testcaseTreeStr) {
    return () -> {
      testCaseManager.updateTestCaseTree(testcaseTreeStr);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @GetMapping("/getSavedResource")
  public ResponseEntity<byte[]> getSavedResource(@RequestParam(value = "path") String path) {
    String baseDir = UicdConfig.getInstance().getTestOutputFolder();
    HttpStatus httpStatus = HttpStatus.OK;
    byte[] media = new byte[0];
    try (InputStream in =
        new FileInputStream(Paths.get(baseDir, URLDecoder.decode(path, "UTF-8")).toString())) {
      media = ByteStreams.toByteArray(in);
    } catch (IOException e) {
      httpStatus = HttpStatus.NOT_FOUND;
      logger.warning("Cannot fetch image: " + path);
    }
    HttpHeaders headers = new HttpHeaders();
    headers.setCacheControl(CacheControl.noCache().getHeaderValue());
    headers.setContentType(MediaType.IMAGE_JPEG);
    return new ResponseEntity<>(media, headers, httpStatus);
  }

}
