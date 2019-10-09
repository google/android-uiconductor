// Copyright 2019 Google LLC
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

package com.google.wireless.qa.uicd.backend.controllers;

import com.google.common.io.ByteStreams;
import com.google.wireless.qa.uicd.backend.controllers.requests.ProjectDeepCopyRequest;
import com.google.wireless.qa.uicd.backend.controllers.requests.UpdateTestCaseTreeRequest;
import com.google.wireless.qa.uicd.backend.controllers.responses.ProjectRecord;
import com.google.wireless.qa.uicd.backend.controllers.responses.ProjectResponse;
import com.google.wireless.qa.uicd.backend.controllers.responses.TestCaseTreeResponse;
import com.google.wireless.qa.uicd.backend.controllers.responses.TestHistoryResponse;
import com.google.wireless.qa.uicd.backend.core.config.UicdConfig;
import com.google.wireless.qa.uicd.backend.core.constants.JsonFlag;
import com.google.wireless.qa.uicd.backend.core.db.ActionStorageManager;
import com.google.wireless.qa.uicd.backend.core.exceptions.UicdException;
import com.google.wireless.qa.uicd.backend.recorder.services.ProjectManager;
import com.google.wireless.qa.uicd.backend.recorder.services.TestCaseTreeManager;
import com.google.wireless.qa.uicd.backend.recorder.services.TestCasesImportExportManager;
import com.google.wireless.qa.uicd.backend.recorder.services.TestHistoryManager;
import com.google.wireless.qa.uicd.backend.recorder.workflowmgr.WorkflowManager;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.concurrent.Callable;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import net.lingala.zip4j.ZipFile;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
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
import org.springframework.web.multipart.MultipartFile;

/** TestCaseContoller. */
@ComponentScan("com.google.wireless.qa.uicd.backend.*")
@RestController
public class TestCaseController {
  private Logger logger = LogManager.getLogManager().getLogger("uicd");
  private static final String DONE = "{\"status\":\"done\"}";
  @Autowired TestCaseTreeManager testCaseTreeManager;
  @Autowired WorkflowManager workflowManager;
  @Autowired ActionStorageManager actionStorageManager;
  @Autowired TestHistoryManager testHistoryManager;
  @Autowired TestCasesImportExportManager testCasesImportExportManager;
  @Autowired ProjectManager projectManager;

  @CrossOrigin(origins = "*")
  @RequestMapping("/testcase")
  public String testcase() {
    return DONE;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/fetchTestcaseTree")
  public Callable<TestCaseTreeResponse> fetchTestcaseTree() {
    return () ->
        testCaseTreeManager.getDefaultTreeByUsername(UicdConfig.getInstance().getCurrentUser());
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/deepCopyProjectTree", method = RequestMethod.POST)
  public Callable<String> createProjectAndDeepCopy(
      @RequestBody ProjectDeepCopyRequest projectDeepCopyRequest) {
    return () -> {
      testCasesImportExportManager.deepCopyTree(
          projectDeepCopyRequest.getSrcProjectId(), projectDeepCopyRequest.getTargetProjectId());
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/fetchTestcaseTreeByUsername")
  public Callable<TestCaseTreeResponse> fetchTestcaseTreeByUsername(String username) {
    return () -> testCaseTreeManager.getDefaultTreeByUsername(username);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/fetchTestcaseTreeByProjectId")
  public Callable<TestCaseTreeResponse> fetchTestcaseTreeByProjectId(String projectId) {
    return () -> testCaseTreeManager.getTreeByProjectId(projectId);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/fetchTestHistory")
  public Callable<TestHistoryResponse> fetchTestHistory() {
    return () -> testHistoryManager.getTop50TestHistory();
  }

  @CrossOrigin(origins = "*")
  @GetMapping("/getSavedResource")
  public ResponseEntity<byte[]> getSavedResource(@RequestParam(value = "path") String path) {
    HttpStatus httpStatus = HttpStatus.OK;
    byte[] media = new byte[0];
    try (InputStream in =
        new FileInputStream(Paths.get(URLDecoder.decode(path, "UTF-8")).toString())) {
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

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/updateTestCaseTree", method = RequestMethod.POST)
  public Callable<String> updateTestCaseTree(
      @RequestBody UpdateTestCaseTreeRequest updateTestCaseTreeRequest) {
    return () -> {
      testCaseTreeManager.updateTestCaseTree(updateTestCaseTreeRequest);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/exportProjectToZip", method = RequestMethod.GET)
  public ResponseEntity<Resource> exportProjectToZip(
      @RequestParam(value = "projectId") String projectId,
      @RequestParam(value = "projectName") String projectName) throws IOException, UicdException{
    ZipFile file = testCasesImportExportManager.zipAndExport(projectId, projectName, "");
    HttpHeaders header = new HttpHeaders();
    header.add(HttpHeaders.CONTENT_DISPOSITION,
        String.format("attachment; filename=%s.zip", projectName));
    header.add("Cache-Control", "no-cache, no-store, must-revalidate");
    header.add("Pragma", "no-cache");
    header.add("Expires", "0");

    ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(file.getFile().toPath()));

    return ResponseEntity.ok()
        .headers(header)
        .contentLength(file.getFile().length())
        .contentType(MediaType.parseMediaType("application/octet-stream"))
        .body(resource);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/unzipAndImport", method = RequestMethod.POST)
  public Callable<String> unzipAndImport(
      @RequestParam("file") MultipartFile file,
      @RequestParam("projectName") String projectName) {
    return () -> {
      ProjectResponse projectResponse =
           projectManager.createProject(projectName);
      if (projectResponse.isSuccess()) {
        File tempFile = File.createTempFile(projectName, ".zip");
        tempFile.deleteOnExit();
        try (FileOutputStream out = new FileOutputStream(tempFile)) {
          IOUtils.copy(file.getInputStream(), out);
        }
        ProjectRecord projectRecord = projectResponse.getProjectList().get(0);
        testCasesImportExportManager.unzipAndImport(
            tempFile, projectRecord.getProjectId());
      }
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/deleteTree", method = RequestMethod.POST)
  public Callable<String> deleteTree(@RequestBody String projectId) {
    return () -> {
      testCaseTreeManager.deleteTreeByProjectId(projectId);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/importTestCaseByActionId", method = RequestMethod.GET)
  public Callable<String> importTestCaseByActionId(
      @RequestParam(value = "actionId") String actionId) {
    return () -> {
      try {
        String newActionId = testCasesImportExportManager.deepImportAction(actionId);
        return actionStorageManager.getActionByUUID(newActionId).toJson(JsonFlag.FRONTEND);
      } catch (UicdException e) {
        return "";
      }
    };
  }
}
