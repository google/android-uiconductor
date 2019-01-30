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

package com.google.uicd.backend.recorder.db;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import java.io.IOException;
import java.time.Instant;
import java.util.List;

public class TestCaseTreeEntity {

  private String uuid;
  private String userId;
  private String projectId;
  private String groupId;
  private String treeDetails;
  private String createdBy;
  private Instant createdAt;

  public static String listToJson(List<TestCaseTreeEntity> testcaseList) {
    String jsonDataString = "";
    ObjectMapper mapper = new ObjectMapper();
    try {
      jsonDataString = mapper.writeValueAsString(testcaseList);
    } catch (JsonProcessingException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return jsonDataString;
  }

  public static TestCaseTreeEntity fromJson(String jsonDataString) {
    TestCaseTreeEntity testCaseTreeEntity = new TestCaseTreeEntity();
    ObjectMapper mapper = new ObjectMapper();
    try {
      testCaseTreeEntity = mapper.readValue(jsonDataString, testCaseTreeEntity.getClass());
    } catch (IOException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }

    return testCaseTreeEntity;
  }

  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  public String getUserId() {
    return userId;
  }

  public void setUser_id(String userId) {
    this.userId = userId;
  }

  public String getProjectId() {
    return projectId;
  }

  public void setProject_id(String projectId) {
    this.projectId = projectId;
  }

  public String getGroupId() {
    return groupId;
  }

  public void setGroup_id(String groupId) {
    this.groupId = groupId;
  }

  public String getTreeDetails() {
    return treeDetails;
  }

  public void setTree_details(String treeDetails) {
    this.treeDetails = treeDetails;
  }

  public String getCreatedBy() {
    return UicdConfig.getInstance().getCurrentUser();
  }

  public void setCreated_by(String createdBy) {
    this.createdBy = createdBy;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public void setCreated_at(Instant createdAt) {
    this.createdAt = createdAt;
  }

  public String toJson() {
    String jsonDataString = "";
    ObjectMapper mapper = new ObjectMapper();
    try {
      jsonDataString = mapper.writeValueAsString(this);
    } catch (JsonProcessingException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return jsonDataString;
  }
}
