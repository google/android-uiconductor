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

package com.google.uicd.backend.core.uicdactions;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Joiner;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.constants.ActionType;
import com.google.uicd.backend.core.constants.JsonFlag;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdDeviceException;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayStatus;
import com.google.uicd.backend.core.uicdactions.jsondbignores.BaseActionDBIgnoreFields;
import com.google.uicd.backend.core.uicdactions.jsondbignores.ClickActionIgnoreFields;
import com.google.uicd.backend.core.uicdactions.jsondbignores.CompoundActionDBIgnoreFields;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/** Jackson auto detect. */
@JsonAutoDetect(
    fieldVisibility = ANY,
    getterVisibility = NONE,
    setterVisibility = NONE,
    isGetterVisibility = NONE)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
  @JsonSubTypes.Type(value = ClickAction.class, name = "ClickAction"),
  @JsonSubTypes.Type(value = CommandLineAction.class, name = "CommandLineAction"),
  @JsonSubTypes.Type(value = CompoundAction.class, name = "CompoundAction"),
  @JsonSubTypes.Type(value = ImageDiffValidationAction.class, name = "ImageDiffValidationAction"),
  @JsonSubTypes.Type(value = InputAction.class, name = "InputAction"),
  @JsonSubTypes.Type(value = LogcatValidationAction.class, name = "LogcatValidationAction"),
  @JsonSubTypes.Type(value = ScreenCapAction.class, name = "ScreenCapAction"),
  @JsonSubTypes.Type(
      value = ScreenContentValidationAction.class,
      name = "ScreenContentValidationAction"),
  @JsonSubTypes.Type(
      value = LoopScreenContentValidationAction.class,
      name = "LoopScreenContentValidationAction"),
  @JsonSubTypes.Type(
      value = ScrollScreenContentValidationAction.class,
      name = "ScrollScreenContentValidationAction"),
  @JsonSubTypes.Type(value = ConditionClickAction.class, name = "ConditionClickAction"),
  @JsonSubTypes.Type(value = SwipeAction.class, name = "SwipeAction"),
  @JsonSubTypes.Type(value = LongClickAction.class, name = "LongClickAction"),
  @JsonSubTypes.Type(value = RebootAction.class, name = "RebootAction"),
  @JsonSubTypes.Type(value = ZoomAction.class, name = "ZoomAction"),
  @JsonSubTypes.Type(value = DragAction.class, name = "DragAction"),
  @JsonSubTypes.Type(
      value = GlobalVariableValidationAction.class,
      name = "GlobalVariableValidationAction"),
  @JsonSubTypes.Type(value = FetchScreenContentAction.class, name = "FetchScreenContentAction"),
  @JsonSubTypes.Type(value = ScreenRotateAction.class, name = "ScreenRotateAction"),
  @JsonSubTypes.Type(value = SnippetValidationAction.class, name = "SnippetValidationAction"),
  @JsonSubTypes.Type(value = ScriptExecutionAction.class, name = "ScriptExecutionAction"),
  @JsonSubTypes.Type(value = MLImageValidationAction.class, name = "MLImageValidationAction"),
  @JsonSubTypes.Type(value = DoubleTapPowerButtonAction.class, name = "DoubleTapPowerButtonAction"),
  @JsonSubTypes.Type(value = WaitAction.class, name = "WaitAction"),
  @JsonSubTypes.Type(value = ConditionValidationAction.class, name = "ConditionValidationAction"),
})
/**
 * BaseAction class In uicd every test step is one action. This is the base class for all actions
 *
 * @author tccyp@google.com
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public abstract class BaseAction {

  public BaseAction() {
    this.setActionType(ActionType.fromString(this.getClass().getSimpleName()));
  }

  protected PlayStatus playStatus = PlayStatus.READY;
  // User specified name for the current action.
  protected String name = "";
  // Unique Id for current action
  private UUID actionId = UUID.randomUUID();
  // Action real type
  private ActionType actionType;
  // User defined description for the action, plain text field
  private String actionDescription = "";
  // Default delay time after the action 1500ms
  private int delayAfterActionMs = 1500;
  // Only used in the multi-device mode, to indicate which device should execute the action
  private int deviceIndex = 0;
  // Use this field to indicate whether the action has been modified, if not we don't need save to
  // the DB later.
  private boolean isDirty = true;

  private static final Duration SLEEP_TIME_UNIT = Duration.ofMillis(500);

  private String createdBy = UicdConfig.getInstance().getCurrentUser();

  protected boolean runAlways = false;

  @JsonIgnore protected Logger logger = LogManager.getLogManager().getLogger("uicd");

  // Print a log statement after this many sleeps of SLEEP_TIME_UNIT, as long as the remaining
  // sleep time is more than MIN_SLEEP_TIME_TO_LOG.
  private static final int SLEEP_LOGGING_ITERATION = 10;
  private static final Duration MIN_SLEEP_TIME_TO_LOG = Duration.ofSeconds(5);

  public static BaseAction fromJson(String jsonDataString) {
    List<BaseAction> baseActions = actionsFromJson(jsonDataString);
    if (baseActions.size() != 1) {
      System.err.println("Warning: single object expected from JSON string: " + jsonDataString);
    }
    if (baseActions.isEmpty()) {
      return null;
    }
    return baseActions.get(0);
  }

  public static List<BaseAction> actionsFromJson(String jsonDataString) {
    ObjectMapper mapper = new ObjectMapper();
    try {
      // if incoming JSON string is a single object, convert to array
      if (!jsonDataString.startsWith("[")) {
        jsonDataString = "[" + jsonDataString + "]";
      }
      return mapper.readValue(jsonDataString, new TypeReference<List<BaseAction>>() {});
    } catch (Exception e) {
      System.err.println("Error while parsing json: " + e.getMessage());
    }
    return new ArrayList<>();
  }

  public abstract String getDisplay();

  public String getActionType() {
    return actionType.getActionName();
  }

  public String getName() {
    return name == null ? "Base Action" : name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public UUID getActionId() {
    return actionId;
  }

  public void setActionId(UUID actionId) {
    this.actionId = actionId;
  }

  public void setActionType(ActionType actionType) {
    this.actionType = actionType;
  }

  public String getActionDescription() {
    return actionDescription;
  }

  public void setActionDescription(String actionDescription) {
    this.actionDescription = actionDescription;
  }

  public int getDelayAfterActionMs() {
    return delayAfterActionMs;
  }

  public void setDelayAfterActionMs(int delayAfterActionMs) {
    this.delayAfterActionMs = delayAfterActionMs;
  }

  public int getDeviceIndex() {
    return deviceIndex;
  }

  public void setDeviceIndex(int deviceIndex) {
    this.deviceIndex = deviceIndex;
  }

  public boolean isDirty() {
    return isDirty;
  }

  public void setDirty(boolean dirty) {
    isDirty = dirty;
  }

  public String getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(String username) {
    createdBy = username;
  }

  public ActionExecutionResult playWithDelay(
      List<AndroidDeviceDriver> deviceDrivers, ActionContext actionContext)
      throws UicdDeviceException {
    return playWithDelay(deviceDrivers, actionContext, deviceIndex);
  }

  public ActionExecutionResult playWithDelay(
      List<AndroidDeviceDriver> deviceDrivers, ActionContext actionContext, int dIndex)
      throws UicdDeviceException {
    AndroidDeviceDriver androidDeviceDriver =
        getAndroidDeviceDriver(deviceDrivers, actionContext, dIndex);
    logActionStart(actionContext);
    if (needSkipAction(androidDeviceDriver, actionContext)) {
      playStatus = PlayStatus.SKIPPED;
    } else {
      try {
        play(androidDeviceDriver, actionContext);
      } catch (Exception e) {
        logger.warning("Error while playing action: " + e.getMessage());
      }
      waitAfter(actionContext);
    }

    logActionEnd(actionContext);
    if (playStatus == ActionContext.PlayStatus.READY) {
      playStatus = ActionContext.PlayStatus.PASS;
    }
    return genActionExecutionResults(androidDeviceDriver, actionContext);
  }

  public abstract void updateAction(BaseAction baseAction);

  public String toJson(JsonFlag whoNeedsJson) {
    String jsonDataString = "";
    ObjectMapper mapper = new ObjectMapper();
    switch (whoNeedsJson) {
      case BACKEND:
        mapper.addMixIn(BaseAction.class, BaseActionDBIgnoreFields.class);
        mapper.addMixIn(CompoundAction.class, CompoundActionDBIgnoreFields.class);
        break;
      case FRONTEND:
        mapper.addMixIn(ClickAction.class, ClickActionIgnoreFields.class);
        break;
      case EXPORT:
        mapper.addMixIn(BaseAction.class, BaseActionDBIgnoreFields.class);
        break;
      default:
        // continue below
    }

    try {
      jsonDataString = mapper.writeValueAsString(this);
    } catch (JsonProcessingException e) {
      System.err.println("Error while converting to json: " + e.getMessage());
    }
    return jsonDataString;
  }

  void logActionStart(ActionContext actionContext) {
    logger.info("Start Action, UUID: " + this.getActionId());
    logger.info(this.getActionType() + ": " + this.getDisplay());
    actionContext.getCurrentPlayingPath().add(actionContext.getCurrentPlayActionIndex());
    logger.info(
        "Start Action Path: " + Joiner.on("->").join(actionContext.getCurrentPlayingPath()));
    actionContext.getCurrentPlayingPath().removeLast();
  }

  void logActionEnd(ActionContext actionContext) {
    logger.info("End Action, UUID: " + this.getActionId());
    actionContext.getCurrentPlayingPath().add(actionContext.getCurrentPlayActionIndex());
    actionContext.increaseCurrentPlayActionIndex();
    logger.info("End Action Path: " + Joiner.on("->").join(actionContext.getCurrentPlayingPath()));
    actionContext.getCurrentPlayingPath().removeLast();
  }

  protected ActionExecutionResult genActionExecutionResults(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    ActionExecutionResult actionExecutionResult = new ActionExecutionResult();
    actionExecutionResult.setRegularOutput(this.getActionType() + ": " + this.getDisplay());
    actionExecutionResult.setSequenceIndex(actionContext.getNextActionSequenceIndex());
    actionExecutionResult.setActionId(this.actionId.toString());
    actionExecutionResult.setPlayStatus(this.playStatus);
    return actionExecutionResult;
  }

  public void updateCommonFields(BaseAction baseAction) {
    this.setName(baseAction.getName());
    this.setActionDescription(baseAction.getActionDescription());
    this.setDelayAfterActionMs(baseAction.getDelayAfterActionMs());
    this.setDeviceIndex(baseAction.getDeviceIndex());
    this.runAlways = baseAction.runAlways;
  }

  protected abstract int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext)
      throws UicdException;

  protected boolean needSkipAction(
      AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    if (runAlways) {
      return false;
    }
    if (playStatus == PlayStatus.SKIPPED) {
      return true;
    }
    return !actionContext.canRunAction(androidDeviceDriver.getDeviceId());
  }

  protected void waitAfter(ActionContext actionContext) {
    try {
      long remainingWaitTime =
          (long) (getDelayAfterActionMs() / actionContext.getPlaySpeedFactor());
      int numSleepsDone = 0;
      while (remainingWaitTime > 0) {
        if ((numSleepsDone++ % SLEEP_LOGGING_ITERATION == 0)
            && (remainingWaitTime > MIN_SLEEP_TIME_TO_LOG.toMillis())) {
          logger.info(String.format("Waiting for %d ms.", remainingWaitTime));
        }
        long currentSleepTime = Math.min(SLEEP_TIME_UNIT.toMillis(), remainingWaitTime);
        Thread.sleep(currentSleepTime);
        // stop early if workflow is cancelled
        if (actionContext.playbackStopRequested()) {
          return;
        }
        remainingWaitTime -= currentSleepTime;
      }
    } catch (InterruptedException e) {
      System.err.println("Error while sleeping: " + e.getMessage());
    }
  }

  private AndroidDeviceDriver getAndroidDeviceDriver(
      List<AndroidDeviceDriver> deviceDrivers, ActionContext actionContext, int deviceIndex)
      throws UicdDeviceException {
    switch (actionContext.getPlayMode()) {
      case SINGLE:
      case MULTIDEVICE:
        if (deviceIndex >= deviceDrivers.size()) {
          throw new UicdDeviceException("Driver list doesn't have device: " + deviceIndex);
        }
        return deviceDrivers.get(deviceIndex);
      case PLAYALL:
        throw new UicdDeviceException("PLAYALL mode should be handled in the top level.");
    }
    return null;
  }
}
