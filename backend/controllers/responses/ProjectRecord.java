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

package com.google.uicd.backend.controllers.responses;

import com.google.auto.value.AutoValue;
import com.google.uicd.backend.recorder.db.ProjectEntity;
import java.time.Instant;

/**
 * Wrapper for Project response record. Contains the exactly same fields as ProjectEntity,
 * unfortunately, ProjectEntity is for the database and database is using the SnakeCaseStrategy
 * as @JsonNaming, but frontend is using camelCase.
 */
@AutoValue
public abstract class ProjectRecord {
  public abstract String getProjectId();

  public abstract String getUserId();

  public abstract String getGroupId();

  public abstract String getProjectName();

  public abstract String createdBy();

  public abstract String getShareWith();

  public abstract Instant getCreatedAt();

  public static ProjectRecord create(
      String projectId,
      String userId,
      String groupId,
      String projectName,
      String createdBy,
      String shareWith,
      Instant createdAt) {
    return new AutoValue_ProjectRecord(
        projectId,
        userId,
        groupId,
        projectName,
        createdBy,
        shareWith == null ? "" : shareWith, // new field in db, default is null, need handle here.
        createdAt);
  }

  public static ProjectRecord createdFromProjectEntity(ProjectEntity projectEntity) {
    return create(
        projectEntity.getProjectId(),
        projectEntity.getUserId(),
        projectEntity.getGroupId(),
        projectEntity.getProjectName(),
        projectEntity.getCreatedBy(),
        projectEntity.getShareWith(),
        projectEntity.getCreatedAt());
  }
}
