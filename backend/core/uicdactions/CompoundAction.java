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

import static com.google.common.base.Strings.isNullOrEmpty;
import static java.util.stream.Collectors.toList;

import com.google.uicd.backend.core.constants.ActionType;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.exceptions.UicdDeviceException;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayMode;
import com.google.uicd.backend.core.uicdactions.ActionContext.PlayStatus;
import com.google.uicd.backend.core.utils.AdditionalData;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/** CompoundAction is a collection of actions, a DAG with single entry point */
public class CompoundAction extends BaseAction implements Cloneable {

  // childrenActions will only contain children that are not
  // compound action themselves or are of the type
  // image diff validation
  public List<BaseAction> childrenActions = new ArrayList<>();
  public List<String> childrenIdList = new ArrayList<>();
  private int repeatTime = 1;
  private boolean failAtTheEnd = false;
  private boolean forceDeviceOnChildren = false;
  private boolean runAlwaysRecursive = false;
  private final AdditionalData additionalData = new AdditionalData();
  private boolean isTopLevelWorkflow = false;

  @Override
  public String getName() {
    if (isNullOrEmpty(this.name)) {
      setName("Default_Workflow_" + getActionId().toString().substring(0, 4));
    }
    return this.name;
  }

  @Override
  public String getDisplay() {
    if (repeatTime == 1) {
      return getName();
    } else {
      return String.format("%s: Repeat %d times", getName(), repeatTime);
    }
  }

  @Override
  public ActionExecutionResult playWithDelay(
      List<AndroidDeviceDriver> deviceDrivers, ActionContext actionContext)
      throws UicdDeviceException {
    int deviceIndex =
        actionContext.getPlayMode() == PlayMode.SINGLE
            ? actionContext.getCurrentDeviceIndex()
            : getDeviceIndex();
    return this.playWithDelay(deviceDrivers, actionContext, deviceIndex);
  }

  @Override
  public ActionExecutionResult playWithDelay(
      List<AndroidDeviceDriver> deviceDrivers, ActionContext actionContext, int deviceIndex)
      throws UicdDeviceException {
    ActionExecutionResult actionExecutionResult = new ActionExecutionResult();
    actionExecutionResult.setSequenceIndex(actionContext.getNextActionSequenceIndex());
    actionExecutionResult.setRegularOutput(this.getDisplay());
    actionExecutionResult.setOutputType(ActionExecutionResult.OutputType.COMPOUND);
    actionExecutionResult.setActionId(this.getActionId().toString());
    actionExecutionResult.setExecutionId(actionContext.getExecutionId().toString());
    logActionStart(actionContext);

    // If user is doing "play from here", we pass in the offset index.
    if (actionContext.getCurrentPlayingPath().isEmpty()
        && actionContext.getCurrentPlayActionIndex() > 0) {
      actionContext.getCurrentPlayingPath().add(0);
    } else {
      actionContext.getCurrentPlayingPath().add(actionContext.getCurrentPlayActionIndex());
      actionContext.setCurrentPlayActionIndex(0);
    }
    actionContext.pushPlayStatus(PlayStatus.READY, this.runAlways);
    for (int i = 0; i < repeatTime; i++) {
      for (BaseAction action : childrenActions) {
        // Update currently playing action ID.
        actionContext.setCurrentPlayingAction(action.getActionId(), action.getDisplay());

        // For the compound action, we are still using the abstract deviceDriver, since for multi
        // device case, compound action might need control different device
        if (actionContext.playbackStopRequested()) {
          ActionExecutionResult childResult = new ActionExecutionResult();
          childResult.setRegularOutput(action.getDisplay());
          childResult.setSequenceIndex(actionContext.getNextActionSequenceIndex());
          childResult.setActionId(action.getActionId().toString());
          childResult.setPlayStatus(PlayStatus.CANCELLED);
          actionExecutionResult.addChildResult(childResult);
          actionContext.updateTopPlayStatus(PlayStatus.CANCELLED);
        } else {
          ActionExecutionResult childResult;
          if (actionContext.getPlayMode() == PlayMode.MULTIDEVICE) {
            if (isForceDeviceOnChildren()) {
              // use Single play mode for this subtree to force specific device
              actionContext.setPlayMode(PlayMode.SINGLE);
              childResult = action.playWithDelay(deviceDrivers, actionContext, deviceIndex);
              actionContext.setPlayMode(PlayMode.MULTIDEVICE);
            } else {
              // otherwise child action has to figure out the index by itself.
              childResult = action.playWithDelay(deviceDrivers, actionContext);
            }
          } else {
            childResult = action.playWithDelay(deviceDrivers, actionContext, deviceIndex);
          }
          actionExecutionResult.addChildResult(childResult);
        }
      }
      // wait for single repeat
      waitAfter(actionContext);
    }
    PlayStatus playStatus = actionContext.popPlayStatus();

    actionContext.setCurrentPlayActionIndex(actionContext.getCurrentPlayingPath().getLast());
    actionContext.getCurrentPlayingPath().removeLast();

    logActionEnd(actionContext);
    for (ActionExecutionResult childRes : actionExecutionResult.getChildrenResult()) {
      if (childRes.getPlayStatus() == ActionContext.PlayStatus.FAIL) {
        actionExecutionResult.setPlayStatus(ActionContext.PlayStatus.FAIL);
      }
    }

    actionExecutionResult.setPlayStatus(playStatus);
    if (playStatus == PlayStatus.READY) {
      actionExecutionResult.setPlayStatus(PlayStatus.PASS);
    }
    return actionExecutionResult;
  }

  public void removeAction(String uuidStr) {
    if (!childrenActions.removeIf(action -> action.getActionId().toString().equals(uuidStr))) {
      logger.warning("Error! Trying to remove action that is not in sequence: " + uuidStr);
    }
    if (!childrenIdList.removeIf(uuid -> uuid.equals(uuidStr))) {
      logger.warning("Error! Trying to remove action that is not in sequence - " + uuidStr);
    }
  }

  public void removeByIndex(int index) {
    this.childrenActions.remove(index);
    this.childrenIdList.remove(index);
  }

  @Override
  public void updateAction(BaseAction baseAction) {
    boolean oldRunAlwaysValue = this.runAlways;
    super.updateCommonFields(baseAction);

    if (baseAction instanceof CompoundAction) {
      CompoundAction otherAction = (CompoundAction) baseAction;
      this.repeatTime = otherAction.repeatTime;
      this.failAtTheEnd = otherAction.failAtTheEnd;
      this.forceDeviceOnChildren = otherAction.isForceDeviceOnChildren();
      this.isTopLevelWorkflow = otherAction.isTopLevelWorkflow;
      // only set children's value when it is changed, otherwise it could override the child's value
      // set by user manually.
      boolean runAlwaysChanged =
          otherAction.runAlways != oldRunAlwaysValue
              || otherAction.runAlwaysRecursive != this.runAlwaysRecursive;
      this.runAlwaysRecursive = otherAction.runAlwaysRecursive;
      this.runAlways = otherAction.runAlways;
      if (runAlwaysChanged && this.runAlwaysRecursive) {
        setRunAlwaysForChildren(this.runAlways, this.runAlwaysRecursive);
      }
    }
  }

  private void setRunAlwaysForChildren(boolean isRunWays, boolean recursive) {
    for (BaseAction childAction : childrenActions) {
      if (childAction != null) {
        // Only change the regular action to runAlways, for the compound children action, we should
        // keep the runAlways unchecked. Just like a regular filesystem, compoundAction is similar
        // to folder.
        if (childAction instanceof CompoundAction) {
          if (recursive) {
            CompoundAction childCompound = (CompoundAction) childAction;
            childCompound.runAlwaysRecursive = recursive;
            if (recursive) {
              childCompound.setRunAlwaysForChildren(isRunWays, recursive);
            }
          }
        } else {
          childAction.runAlways = isRunWays;
        }
      }
    }
  }

  // Prevent user from adding action to itself, uicd won't crash, but will have some low level
  // error, which is annoying. Use this, also can make sure the workflow is a "tree" instead of
  // graph.
  private boolean checkCycling(String parentId, BaseAction child) {
    if (parentId.equals(child.getActionId().toString())) {
      return true;
    }
    if (child instanceof CompoundAction) {
      CompoundAction compoundChild = (CompoundAction) child;
      for (BaseAction grandchild : compoundChild.childrenActions) {
        if (checkCycling(parentId, grandchild)) {
          return true;
        }
      }
    }
    return false;
  }

  public void addAction(BaseAction action) {
    if (checkCycling(this.getActionId().toString(), action)) {
      logger.warning(
          String.format("Cycling reference. Can not add child Action: %s", action.getActionId()));
      return;
    }
    if (action.getName().isEmpty()) {
      action.setName(action.getDisplay());
    }
    childrenActions.add(action);
    childrenIdList.add(action.getActionId().toString());
  }

  @Override
  protected int play(AndroidDeviceDriver androidDeviceDriver, ActionContext actionContext) {
    /*
     * Compound action is a special action that already override playwithdelay, itself doesn't
     * have any real action to
     * play. Leave the play as empty.
     */
    return 0;
  }

  @Override
  public Object clone() throws CloneNotSupportedException {
    CompoundAction newAction = (CompoundAction) super.clone();
    newAction.setActionId(UUID.randomUUID());
    newAction.childrenActions = new ArrayList<>(this.childrenActions);
    newAction.childrenIdList = new ArrayList<>(this.childrenIdList);
    return newAction;
  }

  /**
   * Returns a clone of the Compound Action instance with all children present in childrenActions<>
   * field except those that are either Compound Action themselves or an instance of
   * ImageDiffValidationAction
   */
  public Object cloneWithoutCompoundChildrenChildren() throws CloneNotSupportedException {
    CompoundAction newAction = (CompoundAction) super.clone();
    List<ActionType> deepcopyFilterList =
        Arrays.asList(ActionType.COMPOUND_ACTION, ActionType.IMAGE_DIFF_VALIDATION_ACTION);
    List<BaseAction> filteredActionChildren =
        this.childrenActions.stream()
            .filter(x -> x != null)
            .filter(childAction -> !deepcopyFilterList.contains(childAction.getActionType()))
            .collect(toList());
    newAction.childrenActions = filteredActionChildren;
    newAction.childrenIdList = new ArrayList<>(this.childrenIdList);
    return newAction;
  }

  public AdditionalData getAdditionalData() {
    return this.additionalData;
  }

  public boolean isForceDeviceOnChildren() {
    return forceDeviceOnChildren;
  }

  public int getRepeatTime() {
    return repeatTime;
  }

  public boolean isTopLevelWorkflow() {
    return isTopLevelWorkflow;
  }

  public void setTopLevelWorkflow(boolean topLevelWorkflow) {
    isTopLevelWorkflow = topLevelWorkflow;
  }
}
