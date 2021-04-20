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

package com.google.uicd.backend.core.uicdactions;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.auto.value.AutoValue;
import com.google.uicd.backend.core.constants.ActionType;
import com.google.uicd.backend.core.constants.ContentMatchType;
import com.google.uicd.backend.core.constants.ContextStorageType;
import com.google.uicd.backend.core.constants.ElementSelectorType;
import com.google.uicd.backend.core.constants.IconImageType;
import com.google.uicd.backend.core.constants.ScreenContentSearchType;
import com.google.uicd.backend.core.constants.ScrollDirectionType;
import com.google.uicd.backend.core.constants.StopType;
import com.google.uicd.backend.core.uicdactions.jsonhelper.UicdDurationToIntSerializer;
import com.google.uicd.backend.core.uicdactions.jsonhelper.UicdIntToDurationDeserializer;
import com.google.uicd.backend.core.utils.JsonUtil;
import com.google.uicd.backend.core.xmlparser.Bounds;
import com.google.uicd.backend.core.xmlparser.NodeContext;
import java.time.Duration;
import java.util.Optional;

/** Contains details information of a validation action */
@AutoValue
@JsonDeserialize(builder = ValidationReqDetails.Builder.class)
public abstract class ValidationReqDetails {

  @JsonProperty("actionType")
  public abstract ActionType getActionType();

  @JsonProperty("contentData")
  public abstract String getContentData();

  @JsonProperty("contentMatchType")
  public abstract ContentMatchType getContentMatchType();

  @JsonProperty("contextStorageType")
  public abstract ContextStorageType getContextStorageType();

  @JsonProperty("elementSelectorType")
  public abstract ElementSelectorType getElementSelectorType();

  @JsonProperty("iconImageType")
  public abstract IconImageType getIconImageType();

  @JsonProperty("nodeContext")
  public abstract Optional<NodeContext> getNodeContext();

  @JsonProperty("screenContentSearchType")
  public abstract ScreenContentSearchType getScreenContentSearchType();

  @JsonProperty("scrollDirectionType")
  public abstract ScrollDirectionType getScrollDirectionType();

  @JsonProperty("scrollMaxNumber")
  public abstract int getScrollMaxNumber();

  @JsonProperty("selectedBounds")
  public abstract Bounds getSelectedBounds();

  @JsonProperty("stopType")
  public abstract StopType getStopType();

  @JsonProperty("ocrMode")
  public abstract boolean isOcrMode();

  @JsonProperty("waitUntilDisappear")
  public abstract boolean isWaitUntilDisappear();

  // Since we also need the json to communicate with frontend we serialize to int and use millis
  // as implicit unit to make it simple the json format
  @JsonSerialize(using = UicdDurationToIntSerializer.class)
  @JsonProperty("timeout")
  public abstract Duration getTimeout();

  public static Builder builder() {
    return Builder.builder();
  }

  public abstract Builder toBuilder();

  public ValidationReqDetails withNodeContext(NodeContext nodeContext) {
    return toBuilder().nodeContext(nodeContext).build();
  }
  /** Helps to create the ValidationReqDetails instance */
  @AutoValue.Builder
  public abstract static class Builder {

    @JsonCreator
    public static Builder builder() {
      return new AutoValue_ValidationReqDetails.Builder()
          // go/keep-sorted start
          .contentData("Unknown")
          .contentMatchType(ContentMatchType.UNKNOWN)
          .contextStorageType(ContextStorageType.UNKNOWN)
          .elementSelectorType(ElementSelectorType.UNKNOWN)
          .iconImageType(IconImageType.UNKNOWN)
          .ocrMode(false)
          .screenContentSearchType(ScreenContentSearchType.UNKNOWN)
          .scrollDirectionType(ScrollDirectionType.UNKNOWN)
          .scrollMaxNumber(30)
          .selectedBounds(new Bounds())
          .timeout(Duration.ofSeconds(1))
          .waitUntilDisappear(false);
      // go/keep-sorted end
    }

    @JsonProperty("actionType")
    public abstract Builder actionType(ActionType value);

    @JsonProperty("contentData")
    public abstract Builder contentData(String value);

    @JsonProperty("contentMatchType")
    public abstract Builder contentMatchType(ContentMatchType value);

    @JsonProperty("contextStorageType")
    public abstract Builder contextStorageType(ContextStorageType value);

    @JsonProperty("elementSelectorType")
    public abstract Builder elementSelectorType(ElementSelectorType value);

    @JsonProperty("iconImageType")
    public abstract Builder iconImageType(IconImageType iconImageType);

    @JsonProperty("nodeContext")
    public abstract Builder nodeContext(NodeContext value);

    @JsonProperty("screenContentSearchType")
    public abstract Builder screenContentSearchType(ScreenContentSearchType value);

    @JsonProperty("scrollDirectionType")
    public abstract Builder scrollDirectionType(ScrollDirectionType value);

    @JsonProperty("selectedBounds")
    public abstract Builder selectedBounds(Bounds value);

    @JsonProperty("scrollMaxNumber")
    public abstract Builder scrollMaxNumber(int scrollMaxNumber);

    @JsonProperty("stopType")
    public abstract Builder stopType(StopType value);

    @JsonProperty("waitUntilDisappear")
    public abstract Builder waitUntilDisappear(boolean value);

    @JsonProperty("ocrMode")
    public abstract Builder ocrMode(boolean value);

    @JsonDeserialize(using = UicdIntToDurationDeserializer.class)
    @JsonProperty("timeout")
    public abstract Builder timeout(Duration value);

    public abstract ValidationReqDetails build();
  }

  public String toJson() {
    return JsonUtil.toJson(this);
  }

  public ValidationAction toAction() {
    switch (this.getActionType()) {
      case LOOP_SCREEN_CONTENT_VALIDATION_ACTION:
        return new LoopScreenContentValidationAction(this);
      case CONDITION_CLICK_ACTION:
        return new ConditionClickAction(this);
      case SCROLL_SCREEN_CONTENT_VALIDATION_ACTION:
        return new ScrollScreenContentValidationAction(this);
      case SCREEN_CONTENT_VALIDATION_ACTION:
        return new ScreenContentValidationAction(this);
      case ML_IMAGE_VALIDATION_ACTION:
        return new MLImageValidationAction(this);
      default:
        return null;
    }
  }

  public static ValidationReqDetails fromJson(String jsonStr) {
    return JsonUtil.fromJson(jsonStr, new TypeReference<ValidationReqDetails>() {});
  }
}
