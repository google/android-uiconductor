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
import java.time.Instant;
import java.util.List;

public class TestCaseHistoryEntity {
  private String uuid;
  private String testcaseUuid;
  private String userId;
  private String projectId;
  private String groupId;
  private String testResult;
  private String testMsg;
  private String testDetails;
  private String createdBy;
  private Instant createdAt;
  public static String listToJson(List<TestCaseHistoryEntity> historyList) {
    String jsonDataString = "";
    ObjectMapper mapper = new ObjectMapper();
    try {
      jsonDataString = mapper.writeValueAsString(historyList);
    } catch (JsonProcessingException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return jsonDataString;
  }
  public String getUuid() {
    return uuid;
  }
  public void setUuid(String uuid) {
    this.uuid = uuid;
  }
  public String getTestcaseUuid() {
    return testcaseUuid;
  }
  public void setTestcaseUuid(String testcaseUuid) {
    this.testcaseUuid = testcaseUuid;
  }
  public String getUserId() {
    return userId;
  }
  public void setUserId(String userId) {
    this.userId = userId;
  }
  public String getProjectId() {
    return projectId;
  }
  public void setProjectId(String projectId) {
    this.projectId = projectId;
  }
  public String getGroupId() {
    return groupId;
  }
  public void setGroupId(String groupId) {
    this.groupId = groupId;
  }
  public String getTestDetails() {
    return testDetails;
  }
  public void setTestDetails(String testDetails) {
    this.testDetails = testDetails;
  }
  public String getCreatedBy() {
    return UicdConfig.getInstance().getCurrentUser();
  }
  public void setCreatedBy(String createdBy) {
    this.createdBy = createdBy;
  }
  public Instant getCreatedAt() {
    return createdAt;
  }
  public void setCreatedAt(Instant createdAt) {
    this.createdAt = createdAt;
  }
  public String getTestResult() {
    return testResult;
  }
  public void setTestResult(String testResult) {
    this.testResult = testResult;
  }
  public String getTestMsg() {
    return testMsg;
  }
  public void setTestMsg(String testMsg) {
    this.testMsg = testMsg;
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
