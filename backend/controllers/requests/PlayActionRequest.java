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

/** Contains playAction request details */
@AutoValue
@JsonDeserialize(builder = AutoValue_PlayActionRequest.Builder.class)
public abstract class PlayActionRequest {
  public abstract String getActionId();
  public abstract double getPlaySpeedFactor();

  public static PlayActionRequest.Builder builder() {
    return PlayActionRequest.Builder.builder();
  }

  public abstract PlayActionRequest.Builder toBuilder();

  /** Builder class for PlayActionRequest */
  @AutoValue.Builder
  public abstract static class Builder {

    @JsonCreator
    public static Builder builder() {
      return new AutoValue_PlayActionRequest.Builder()
          .actionId("").playSpeedFactor(1.0);
    }

    public abstract PlayActionRequest build();

    @JsonProperty("actionId")
    public abstract Builder actionId(String value);

    @JsonProperty("playSpeedFactor")
    public abstract Builder playSpeedFactor(double value);
  }
}
