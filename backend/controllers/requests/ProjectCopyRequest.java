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

/** Container of the project deep copy request */
@AutoValue
@JsonDeserialize(builder = AutoValue_ProjectCopyRequest.Builder.class)
public abstract class ProjectCopyRequest {
  public abstract String getSrcProjectId();

  public abstract String getTargetProjectId();

  public static ProjectCopyRequest.Builder builder() {
    return ProjectCopyRequest.Builder.builder();
  }

  public abstract ProjectCopyRequest.Builder toBuilder();
  /** Builder class for ProjectDeepCopyRequest */
  @AutoValue.Builder
  public abstract static class Builder {

    @JsonCreator
    public static ProjectCopyRequest.Builder builder() {
      return new AutoValue_ProjectCopyRequest.Builder();
    }

    public abstract ProjectCopyRequest build();

    @JsonProperty("srcProjectId")
    public abstract ProjectCopyRequest.Builder srcProjectId(String value);

    @JsonProperty("targetProjectId")
    public abstract ProjectCopyRequest.Builder targetProjectId(String value);
  }
}
