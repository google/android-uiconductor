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

package com.google.uicd.backend.controllers.requests;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.auto.value.AutoValue;
import java.util.Optional;

/** Container of the update testcase tree Request */
@AutoValue
@JsonDeserialize(builder = AutoValue_UpdateTestCaseTreeRequest.Builder.class)
public abstract class UpdateTestCaseTreeRequest {

  public abstract Optional<String> getUuid();

  public abstract Optional<String> getUserId();

  public abstract Optional<String> getProjectId();

  public abstract Optional<String> getGroupId();

  public abstract String getTreeDetails();

  public static UpdateTestCaseTreeRequest.Builder builder() {
    return UpdateTestCaseTreeRequest.Builder.builder();
  }

  public abstract UpdateTestCaseTreeRequest.Builder toBuilder();

  /** Builder class for UpdateTestCaseTreeRequest */
  @AutoValue.Builder
  public abstract static class Builder {

    @JsonCreator
    public static UpdateTestCaseTreeRequest.Builder builder() {
      return new AutoValue_UpdateTestCaseTreeRequest.Builder().userId("").projectId("").groupId("");
    }

    public abstract UpdateTestCaseTreeRequest build();

    @JsonProperty("uuid")
    public abstract Builder uuid(String value);

    @JsonProperty("userid")
    public abstract Builder userId(String value);

    @JsonProperty("projectId")
    public abstract Builder projectId(String value);

    @JsonProperty("groupId")
    public abstract Builder groupId(String value);

    @JsonProperty("treeDetails")
    public abstract Builder treeDetails(String value);
  }
}
