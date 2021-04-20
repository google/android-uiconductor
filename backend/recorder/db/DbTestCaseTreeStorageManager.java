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

package com.google.uicd.backend.recorder.db;

import com.google.uicd.backend.controllers.requests.UpdateTestCaseTreeRequest;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.recorder.repositories.TestCaseTreeRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/** Implements the logic to save and load test case tree to/from database. */
@Service
public class DbTestCaseTreeStorageManager {

  @Autowired TestCaseTreeRepository testCaseTreeRepository;

  public void update(UpdateTestCaseTreeRequest updateTestCaseTreeRequest) throws UicdException {
    TestCaseTreeEntity testCaseTreeEntity =
        TestCaseTreeEntity.fromUpdateTestCaseTreeRequest(updateTestCaseTreeRequest);

    if (testCaseTreeEntity.getUuid().isEmpty()) {
      testCaseTreeEntity.setUuid(UUID.randomUUID().toString());
    }
    save(testCaseTreeEntity);
  }

  public Optional<TestCaseTreeEntity> getFirstTreeByUsername(String username) {
    List<TestCaseTreeEntity> testCaseTreeEntities =
        testCaseTreeRepository.findByCreatedBy(UicdConfig.getInstance().getCurrentUser());
    if (testCaseTreeEntities.isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(testCaseTreeEntities.get(0));
  }

  public Optional<TestCaseTreeEntity> getFirstTreeByProjectId(String projectId) {
    List<TestCaseTreeEntity> testCaseTreeEntities =
        testCaseTreeRepository.findByProjectId(projectId);
    if (testCaseTreeEntities.isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(testCaseTreeEntities.get(0));
  }

  public void save(TestCaseTreeEntity testCaseTreeEntity) {
    testCaseTreeRepository.save(testCaseTreeEntity);
  }

  public void deleteTreeByProjectId(String projectId) throws UicdException {
    Optional<TestCaseTreeEntity> testCaseTreeEntity = getFirstTreeByProjectId(projectId);
    if (testCaseTreeEntity.isPresent()) {
      testCaseTreeRepository.delete(testCaseTreeEntity.get());
    } else {
      throw new UicdException(
          String.format(
              "Failed to delete project with projectId: %s, as it doesn't exist", projectId));
    }
  }
}
