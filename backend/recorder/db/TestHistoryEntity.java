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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.google.uicd.backend.core.utils.JsonUtil;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import java.time.Instant;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/** Container of test history object for database */
@Entity
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@Table(name = "yui_test_history")
public class TestHistoryEntity {
  @Id
  private String uuid;
  private String testcaseUuid;
  private String userId;
  private String projectId;
  private String executionId;
  private String groupId;
  private String testResult;
  private String testName;
  private String testMsg;

  @Column(length = 1000000)
  private String testDetails;

  private String createdBy;
  private Instant createdAt = Instant.now();

  public static String listToJson(List<TestHistoryEntity> historyList) {
    return JsonUtil.toJson(historyList);
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
    return createdBy;
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

  public String getTestName() {
    return testName;
  }

  public void setTestName(String testName) {
    this.testName = testName;
  }

  public String getExecutionId() {
    return executionId;
  }

  public void setExecutionId(String executionId) {
    this.executionId = executionId;
  }
}
