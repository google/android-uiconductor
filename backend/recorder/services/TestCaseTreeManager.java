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

package com.google.uicd.backend.recorder.services;

import com.google.uicd.backend.controllers.requests.UpdateTestCaseTreeRequest;
import com.google.uicd.backend.controllers.responses.TestCaseTreeResponse;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.recorder.db.DbTestCaseTreeStorageManager;
import com.google.uicd.backend.recorder.db.TestCaseTreeEntity;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

/** Implements test case tree related api. */
@Service
public class TestCaseTreeManager {

  protected Logger logger = LogManager.getLogManager().getLogger("uicd");
  @Autowired private ApplicationContext applicationContext;
  @Autowired private ProjectManager projectManager;
  @Autowired private DbTestCaseTreeStorageManager testCaseTreeStorageManager;

  /** Gets the testcase tree details based on username. */
  public TestCaseTreeResponse getDefaultTreeByUsername(String username) throws UicdException {
    Optional<TestCaseTreeEntity> testCaseTreeEntityOptional;
    if (projectManager.getCurrentProject() != null) {
      testCaseTreeEntityOptional =
          testCaseTreeStorageManager.getFirstTreeByProjectId(
              projectManager.getCurrentProject().getProjectId());
    } else {
      testCaseTreeEntityOptional = testCaseTreeStorageManager.getFirstTreeByUsername(username);
    }
    if (!testCaseTreeEntityOptional.isPresent()) {
      logger.severe(
          String.format(
              "Can not load the testcase tree for user: %s, please check database connection.",
              username));
      return TestCaseTreeResponse.create("", "");
    }
    TestCaseTreeEntity testCaseTreeEntity = testCaseTreeEntityOptional.get();
    return TestCaseTreeResponse.create(
        testCaseTreeEntity.getUuid(), testCaseTreeEntity.getTreeDetails());
  }

  /**
   * Gets the testcase tree details based on projectId. If not yet exist, will be created using the
   * given projectId.
   */
  public TestCaseTreeResponse getTreeByProjectId(String projectId) throws UicdException {
    Optional<TestCaseTreeEntity> testCaseTreeEntityOptional =
        testCaseTreeStorageManager.getFirstTreeByProjectId(projectId);
    if (!testCaseTreeEntityOptional.isPresent()) {
      logger.info(
          String.format(
              "Requested test case tree for project with id %s doesn't exist. Will be created",
              projectId));
      return TestCaseTreeResponse.create("", "");
    }
    TestCaseTreeEntity testCaseTreeEntity = testCaseTreeEntityOptional.get();
    return TestCaseTreeResponse.create(
        testCaseTreeEntity.getUuid(), testCaseTreeEntity.getTreeDetails());
  }

  public void updateTestCaseTree(UpdateTestCaseTreeRequest testcaseTreeStr) throws UicdException {
    testCaseTreeStorageManager.update(testcaseTreeStr);
  }

  public void createEmptyTreeForNewProject(String projectId) throws UicdException {
    TestCaseTreeEntity testCaseTreeEntity = new TestCaseTreeEntity();
    testCaseTreeEntity.setUuid(UUID.randomUUID().toString());
    testCaseTreeEntity.setProjectId(projectId);
    testCaseTreeEntity.setUserId(UicdConfig.getInstance().getCurrentUser());
    testCaseTreeEntity.setCreatedBy(UicdConfig.getInstance().getCurrentUser());
    testCaseTreeEntity.setCreatedAt(Instant.now());
    // Empty test case tree
    testCaseTreeEntity.setTreeDetails(
        "{\"value\":\"MyWorkspace\",\"id\":\"1\",\"emitLoadNextLevel\":false,\"children\":[]}");
    testCaseTreeEntity.setGroupId("");
    testCaseTreeStorageManager.save(testCaseTreeEntity);
  }

  public void deleteTreeByProjectId(String projectId) throws UicdException {
    testCaseTreeStorageManager.deleteTreeByProjectId(projectId);
  }
}
