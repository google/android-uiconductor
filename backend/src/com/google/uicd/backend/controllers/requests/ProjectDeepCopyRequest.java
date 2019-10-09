// Copyright 2019 Google LLC
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

package com.google.wireless.qa.uicd.backend.controllers.requests;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.auto.value.AutoValue;

/** Container of the project deep copy request */
@AutoValue
@JsonDeserialize(builder = AutoValue_ProjectDeepCopyRequest.Builder.class)
public abstract class ProjectDeepCopyRequest {
  public abstract String getSrcProjectId();

  public abstract String getTargetProjectId();

  public static ProjectDeepCopyRequest.Builder builder() {
    return ProjectDeepCopyRequest.Builder.builder();
  }

  public abstract ProjectDeepCopyRequest.Builder toBuilder();
  /** Builder class for ProjectDeepCopyRequest */
  @AutoValue.Builder
  public abstract static class Builder {

    @JsonCreator
    public static ProjectDeepCopyRequest.Builder builder() {
      return new AutoValue_ProjectDeepCopyRequest.Builder();
    }

    public abstract ProjectDeepCopyRequest build();

    @JsonProperty("srcProjectId")
    public abstract ProjectDeepCopyRequest.Builder srcProjectId(String value);

    @JsonProperty("targetProjectId")
    public abstract ProjectDeepCopyRequest.Builder targetProjectId(String value);
  }
}
