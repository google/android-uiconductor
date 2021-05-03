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

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.google.uicd.backend.controllers.requests.UpdateTestCaseTreeRequest;
import com.google.uicd.backend.core.config.UicdConfig;
import java.time.Instant;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/** Container of test cases tree for database */
@Entity
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@Table(name = "yui_testcases_tree")
public class TestCaseTreeEntity {

  @Id private String uuid;
  private String userId;
  private String projectId;
  private String groupId;

  @Column(length = 5000000)
  private String treeDetails;

  private String createdBy;
  private Instant createdAt;

  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
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

  public String getTreeDetails() {
    return treeDetails;
  }

  public void setTreeDetails(String treeDetails) {
    this.treeDetails = treeDetails;
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

  public static TestCaseTreeEntity fromUpdateTestCaseTreeRequest(
      UpdateTestCaseTreeRequest updateTestCaseTreeRequest) {
    TestCaseTreeEntity testCaseTreeEntity = new TestCaseTreeEntity();
    testCaseTreeEntity.setUuid(updateTestCaseTreeRequest.getUuid().orElse(""));
    testCaseTreeEntity.setUserId(updateTestCaseTreeRequest.getUserId().orElse(""));
    testCaseTreeEntity.setGroupId(updateTestCaseTreeRequest.getGroupId().orElse(""));
    testCaseTreeEntity.setProjectId(updateTestCaseTreeRequest.getProjectId().orElse(""));
    testCaseTreeEntity.setTreeDetails(updateTestCaseTreeRequest.getTreeDetails());
    testCaseTreeEntity.setCreatedBy(UicdConfig.getInstance().getCurrentUser());
    testCaseTreeEntity.setCreatedAt(Instant.now());
    return testCaseTreeEntity;
  }
}
