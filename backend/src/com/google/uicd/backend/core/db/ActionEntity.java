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

package com.google.uicd.backend.core.db;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.constants.JsonFlag;
import com.google.uicd.backend.core.uicdactions.BaseAction;
import java.time.Instant;

/**
 * ActionEntity Object
 */
public class ActionEntity {

  public ActionEntity() {

  }
  public ActionEntity(BaseAction baseAction) {
    this.uuid = baseAction.getActionId().toString();
    this.details = baseAction.toJson(JsonFlag.BACKEND);
    this.type = baseAction.getActionType();
    this.name = baseAction.getName();
    this.createdBy = UicdConfig.getInstance().getCurrentUser();
    this.tag = "";
    this.description = baseAction.getActionDescription();
  }

  public ActionEntity(String uuid, String details, String name, String type, String description) {
    this.uuid = uuid;
    this.details = details;
    this.name = name;
    this.type = type;
    this.tag = "";
    this.description = description;
    this.createdBy = UicdConfig.getInstance().getCurrentUser();
  }
  private String uuid;
  @JsonIgnore
  private String details;
  private String name;
  private String type;
  private String tag;
  private String description;
  private String createdBy;
  private Instant createdAt;

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
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

  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  public String getDetails() {
    return details;
  }

  public void setDetails(String contentBlob) {
    this.details = contentBlob;
  }

  public String getTag() {
    return tag;
  }

  public void setTag(String tag) {
    this.tag = tag;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
