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

package com.google.uicd.backend.core.db;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.constants.ActionType;
import com.google.uicd.backend.core.constants.JsonFlag;
import com.google.uicd.backend.core.uicdactions.BaseAction;
import com.google.uicd.backend.core.uicdactions.CompoundAction;
import java.time.Instant;
import java.util.logging.Logger;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/** Container of Action object for database */
@Entity
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@Table(name = "yui_testcase")
public class ActionEntity {

  private static final int MAX_NAME_LENGTH = 100;
  private static final Logger logger = Logger.getLogger("uicd");

  public ActionEntity() {}

  public ActionEntity(BaseAction baseAction) {
    this(baseAction, false);
  }
  public ActionEntity(BaseAction baseAction, boolean rawExport) {
    this.uuid = baseAction.getActionId().toString();
    if (rawExport) {
      this.details = baseAction.toJson(JsonFlag.EXPORT);
    } else {
      try {
        if (baseAction.getActionType() == ActionType.COMPOUND_ACTION) {
          CompoundAction compoundAction = (CompoundAction) baseAction;
          baseAction = (BaseAction) compoundAction.cloneWithoutCompoundChildrenChildren();
        }
      } catch (CloneNotSupportedException e) {
        logger.warning(e.getMessage());
      }
      this.details = baseAction.toJson(JsonFlag.BACKEND);
    }

    this.type = baseAction.getActionTypeString();
    // The name field in the db is 100 characters, if user put super long name, it will crash the
    // save logic
    this.name =
        baseAction.getName().substring(0, Math.min(baseAction.getName().length(), MAX_NAME_LENGTH));
    this.createdBy = UicdConfig.getInstance().getCurrentUser();
    this.createdAt = Instant.now();
    this.tag = "";
    this.description = baseAction.getActionDescription();
  }

  public ActionEntity(ActionEntity actionEntity) {
    this.uuid = actionEntity.uuid;
    this.details = actionEntity.details;
    this.name = actionEntity.name;
    this.type = actionEntity.type;
    this.tag = actionEntity.tag;
    this.description = actionEntity.description;
    this.createdBy = UicdConfig.getInstance().getCurrentUser();
    this.createdAt = Instant.now();
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

  @Id private String uuid;

  @Column(length = 500000)
  private String details;

  private String name;
  private String type;
  private String tag;

  @Column(length = 50000)
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
