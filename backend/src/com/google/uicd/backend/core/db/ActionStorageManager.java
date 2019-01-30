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

import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterables;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.exceptions.UicdActionException;
import com.google.uicd.backend.core.exceptions.UicdDBException;
import com.google.uicd.backend.core.exceptions.UicdExcpetion;
import com.google.uicd.backend.core.uicdactions.BaseAction;
import com.google.uicd.backend.core.uicdactions.CompoundAction;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import java.sql.Connection;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/**
 * ActionStorageManager is a helper class the manage high level API for action storage. In current
 * design, since we have compound actions, it is like a tree structure, we need store the "tree" in
 * the database in a flatten way. Using this class we can easily convert back and forward.
 */
public class ActionStorageManager {

  public ActionStorageManager(boolean withDBConnection) {
    this.withDBConnection = withDBConnection;
    if (withDBConnection) {
      this.init();
    }
  }

  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");
  private final Map<String, BaseAction> cachedMap = new HashMap<>();
  private final boolean withDBConnection;
  private ActionDAO actionDAO;

  public boolean saveAction(BaseAction action) {
    return saveActions(ImmutableList.of(action), false);
  }

  public boolean saveAction(BaseAction action, boolean cacheOnly) {
    return saveActions(ImmutableList.of(action), cacheOnly);
  }

  public boolean saveActions(List<BaseAction> actions) {
    return saveActions(actions, false);
  }

  public boolean saveActions(List<BaseAction> actions, boolean cacheOnly) {
    if (!withDBConnection || cacheOnly) {
      for (BaseAction action : actions) {
        cachedMap.put(action.getActionId().toString(), action);
      }
      return true;
    }
    List<ActionEntity> actionEntities = new ArrayList<>();
    List<String> actionIds = new ArrayList<>();
    for (BaseAction action : actions) {
      actionIds.add(action.getActionId().toString());
    }

    List<String> uuidNotInDb = actionDAO.getIdsNotInDatabase(actionIds);
    for (BaseAction action : actions) {
      if (uuidNotInDb.contains(action.getActionId().toString())) {
        action.setCreatedBy(UicdConfig.getInstance().getCurrentUser());
      }
      ActionEntity actionEntity = new ActionEntity(action);
      actionEntities.add(actionEntity);
      actionIds.add(actionEntity.getUuid());
      cachedMap.put(action.getActionId().toString(), action);
    }

    List<ActionEntity> updateEntities = new ArrayList<>();
    List<ActionEntity> createEntities = new ArrayList<>();

    for (ActionEntity actionEntity : actionEntities) {
      if (uuidNotInDb.contains(actionEntity.getUuid())) {
        createEntities.add(actionEntity);
      } else {
        updateEntities.add(actionEntity);
      }
    }

    // Create actions not in db, update existing actions
    return actionDAO.updateActions(updateEntities) && actionDAO.saveActions(createEntities);
  }

  public boolean saveAllActionsInMap(Map<String, BaseAction> actionMap) {
    for (BaseAction action : actionMap.values()) {
      if (action.isDirty()) {
        saveAction(action);
      }
    }
    return true;
  }

  public void saveDescentActionsInMap(String startUUID) {
    if (!cachedMap.containsKey(startUUID)) {
      return;
    }

    // Save root action
    BaseAction action = cachedMap.get(startUUID);
    saveAction(action);
    Deque<BaseAction> baseActionDeque = new ArrayDeque<>();
    baseActionDeque.add(action);

    while (!baseActionDeque.isEmpty()) {
      List<BaseAction> baseActions = new ArrayList<>();
      List<BaseAction> compoundActions = new ArrayList<>();

      while (!baseActionDeque.isEmpty()) {
        CompoundAction compoundAction = (CompoundAction) baseActionDeque.pop();
        for (BaseAction child : compoundAction.childrenActions) {
          if (child instanceof CompoundAction) {
            compoundActions.add(child);
          } else {
            baseActions.add(child);
          }
        }
      }

      // Save action leaves
      saveActions(baseActions);

      for (BaseAction compondAction : compoundActions) {
        baseActionDeque.push(compondAction);
      }
    }
  }

  public BaseAction loadMapFromString(String actionDetails) throws UicdActionException{
    BaseAction action = BaseAction.fromJson(actionDetails);
    if (action == null) {
      throw new UicdActionException("Failed to load Action.");
    }
    setAllChildrenToMap(action);
    return action;
  }

  private void setAllChildrenToMap(BaseAction action) {
    if (!cachedMap.containsKey(action.getActionId().toString())) {
      cachedMap.put(action.getActionId().toString(), action);
      if (action instanceof CompoundAction) {
        CompoundAction compoundAction = (CompoundAction) action;
        for (BaseAction child : compoundAction.childrenActions) {
          setAllChildrenToMap(child);
        }
      }
    }
  }

  private BaseAction getBaseActionFromDb(String uuidStr) throws UicdDBException {
    return Iterables.getOnlyElement(getBaseActionsFromDb(ImmutableList.of(uuidStr)));
  }

  private List<BaseAction> getBaseActionsFromDb(List<String> ids) throws UicdDBException {
    if (!withDBConnection) {
      throw new UicdDBException("Should not be called without underlying DB");
    }
    Set<String> uniqueActionIds = new HashSet<>(ids);
    List<ActionEntity> actionEntities = actionDAO.getActionByUuid(uniqueActionIds);
    if (actionEntities.size() != uniqueActionIds.size()) {
      List<String> actionEntityIds =
          actionEntities.stream()
              .map((actionEntity) -> actionEntity.getUuid())
              .collect(Collectors.toList());
      ids.removeAll(actionEntityIds);
      throw new UicdDBException("Cannot find some actions: " + String.join(", ", ids));
    } else {
      // Older actions did not have a createdBy property
      List<BaseAction> result = new ArrayList<>();
      for (ActionEntity actionEntity : actionEntities) {
        String actionDetailsJson = addCreatedByToDetails(actionEntity);
        result.add(BaseAction.fromJson(actionDetailsJson));
      }
      return result;
    }
  }

  private String addCreatedByToDetails(ActionEntity actionEntity) {
    String details = actionEntity.getDetails().substring(0, actionEntity.getDetails().length() - 1);
    String createdByJson = String.format(",\"createdBy\":\"%s\"}", actionEntity.getCreatedBy());
    return details.concat(createdByJson);
  }

  public BaseAction updateActionMetadata(String jsonStr) {
    BaseAction baseActionFromFrontend = BaseAction.fromJson(jsonStr);
    String uuid = baseActionFromFrontend.getActionId().toString();
    BaseAction action = cachedMap.get(uuid);
    action.updateAction(baseActionFromFrontend);
    saveAction(action);
    return action;
  }

  public BaseAction getActionByUUID(String uuid) throws UicdActionException {
    if (!withDBConnection) {
      throw new UicdActionException("Action not found in cache with no DB fallback!");
    }
    if (cachedMap.containsKey(uuid)) {
      return cachedMap.get(uuid);
    }
    Deque<BaseAction> baseActionDeque = new ArrayDeque<>();

    // Put the root action to the queue
    BaseAction action = null;
    try {
      action = getBaseActionFromDb(uuid);
    } catch (UicdDBException e) {
      logger.severe("Cannot load root action.");
    }
    action.setName(action.getDisplay());
    if (action instanceof CompoundAction) {
      baseActionDeque.push(action);
    }
    cachedMap.put(uuid, action);

    // Level traversal until no compound action on the leaf
    while (!baseActionDeque.isEmpty()) {
      List<BaseAction> preLayerActions = new ArrayList<>();
      List<String> ids = new ArrayList<>();
      while (!baseActionDeque.isEmpty()) {
        BaseAction baseAction = baseActionDeque.pop();
        preLayerActions.add(baseAction);
        CompoundAction compoundAction = (CompoundAction) baseAction;
        ids.addAll(compoundAction.childrenIdList);
      }

      try {
        if (!ids.isEmpty()) {
          // Batch fetch actions
          for (BaseAction baseAction : getBaseActionsFromDb(ids)) {
            cachedMap.put(baseAction.getActionId().toString(), baseAction);
          }
        }
      } catch (UicdDBException e) {
        logger.severe(e.getMessage());
      }

      // Update actions
      for (BaseAction baseAction : preLayerActions) {
        if (baseAction instanceof CompoundAction) {
          CompoundAction compoundAction = (CompoundAction) baseAction;

          List<BaseAction> newChildrenActions = new ArrayList<>();
          List<String> newChildrenIdList = new ArrayList<>();
          for (String actionId : compoundAction.childrenIdList) {
            if (cachedMap.get(actionId) != null) {
              newChildrenIdList.add(actionId);
              newChildrenActions.add(cachedMap.get(actionId));
              if (cachedMap.get(actionId) instanceof CompoundAction) {
                baseActionDeque.add(cachedMap.get(actionId));
              }
            }
          }
          compoundAction.childrenIdList = newChildrenIdList;
          compoundAction.childrenActions = newChildrenActions;
        }
      }
    }
    return cachedMap.get(uuid);
  }

  public List<ActionEntity> getActionByName(String name, String type) {
    return actionDAO.getActionByName(name, type);
  }

  //assume that the action is a compound action
  public void deleteAction(String uuid) throws UicdActionException {
    BaseAction action = getActionByUUID(uuid);
    cachedMap.remove(uuid);
    if (withDBConnection) {
      actionDAO.deleteAction(uuid);
    }
    if (action instanceof CompoundAction) {
      CompoundAction compoundAction = (CompoundAction) action;
      for (BaseAction actionToBeDeleted : compoundAction.childrenActions) {
        deleteAction(actionToBeDeleted.getActionId().toString());
      }
    }
  }

  private void init() {
    Connection connection = null;
    try {
      connection = UicdConfig.getInstance().getDBConnection();
    } catch (UicdExcpetion e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    actionDAO = new ActionDAO(connection);
  }
}
