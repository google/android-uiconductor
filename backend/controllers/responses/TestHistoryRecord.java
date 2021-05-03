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
import com.google.uicd.backend.recorder.db.TestHistoryEntity;
import java.time.Instant;
import javax.annotation.Nullable;

/**
 * Wrapper for TestCaseHistory response record. Contains the exactly same fields as
 * TestHistoryEntity, unfortunately, TestHistoryEntity is for the baseend database and database is
 * using the SnakeCaseStrategy as @JsonNaming, but frontend is using camelCase.
 */
@AutoValue
public abstract class TestHistoryRecord {
  public abstract String getUuid();

  public abstract String getTestcaseUuid();

  @Nullable
  public abstract String getExecutionId();

  @Nullable
  public abstract String getProjectId();

  @Nullable
  public abstract String getUserId();

  @Nullable
  public abstract String getGroupId();

  @Nullable
  public abstract String getTestDetails();

  @Nullable
  public abstract String getTestName();

  @Nullable
  public abstract String getTestResult();

  public abstract String getCreatedBy();

  public abstract Instant getCreatedAt();

  public static TestHistoryRecord create(
      String uuid,
      String testcaseUuid,
      @Nullable String executionId,
      @Nullable String projectId,
      @Nullable String userId,
      @Nullable String groupId,
      String testDetails,
      String testName,
      String testResult,
      String createdBy,
      Instant createAt) {
    return new AutoValue_TestHistoryRecord(
        uuid,
        testcaseUuid,
        executionId,
        projectId,
        userId,
        groupId,
        testDetails,
        testName,
        testResult,
        createdBy,
        createAt);
  }

  public static TestHistoryRecord createFromTestHistoryEntity(TestHistoryEntity testHistoryEntity) {
    return create(
        testHistoryEntity.getUuid(),
        testHistoryEntity.getTestcaseUuid(),
        testHistoryEntity.getExecutionId(),
        testHistoryEntity.getProjectId(),
        testHistoryEntity.getUserId(),
        testHistoryEntity.getGroupId(),
        testHistoryEntity.getTestDetails(),
        testHistoryEntity.getTestName(),
        testHistoryEntity.getTestResult(),
        testHistoryEntity.getCreatedBy(),
        testHistoryEntity.getCreatedAt());
  }
}
