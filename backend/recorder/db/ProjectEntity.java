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
import java.time.Instant;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/** Contains entity of project. For each user projectName is non-duplicated. */
@Entity
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@Table(name = "uicd_projects")
public class ProjectEntity {

  @Id private String projectId;
  private String userId;
  private String groupId;
  private String projectName;

  private String shareWith;
  private String createdBy;
  private Instant createdAt;

  public ProjectEntity() {}

  public ProjectEntity(
      String projectId,
      String userId,
      String groupId,
      String projectName,
      String createdBy,
      Instant createdAt) {
    this.projectId = projectId;
    this.userId = userId;
    this.groupId = groupId;
    this.projectName = projectName;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.shareWith = "";
  }

  public String getProjectId() {
    return projectId;
  }

  public void setProjectId(String projectId) {
    this.projectId = projectId;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getGroupId() {
    return groupId;
  }

  public void setGroupId(String groupId) {
    this.groupId = groupId;
  }

  public String getProjectName() {
    return projectName;
  }

  public void setProjectName(String projectName) {
    this.projectName = projectName;
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

  public String getShareWith() {
    return shareWith;
  }

  public void setShareWith(String shareWith) {
    this.shareWith = shareWith;
  }
}
