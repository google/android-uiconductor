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

package com.google.uicd.backend.recorder.db;

import com.google.uicd.backend.core.db.ActionEntity;
import com.google.uicd.backend.core.db.ActionStorageManager;
import com.google.uicd.backend.core.uicdactions.BaseAction;
import com.google.uicd.backend.recorder.repositories.ActionRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/** Implements the logic to save and load action to/from database */
@Service
public class DbActionStorageManager extends ActionStorageManager {
  @Autowired private ActionRepository actionRepository;

  /** Serializes and saves action list into (db/filesystem) */
  @Override
  public boolean saveActions(List<BaseAction> actions) {
    List<ActionEntity> actionEntities =
        actions.stream()
            .map(
                action -> {
                  loadRefImgIfImgDiffValAction(action);
                  cachedMap.put(action.getActionId().toString(), action);
                  return new ActionEntity(action);
                })
            .collect(Collectors.toList());
    actionRepository.saveAll(actionEntities);
    return true;
  }

  /** Gets list of action data from database by actionIds and converts to the Action objects */
  @Override
  public List<BaseAction> getBaseActionsFromStorage(List<String> actionIdList) {
    List<ActionEntity> actionEntities = actionRepository.findByUuidIn(actionIdList);
    return actionEntities.stream()
        .map(actionEntity -> BaseAction.fromJson(actionEntity.getDetails()))
        .filter(item -> item != null)
        .collect(Collectors.toList());
  }
}
