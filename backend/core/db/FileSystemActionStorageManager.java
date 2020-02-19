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

package com.google.uicd.backend.core.db;

import com.google.uicd.backend.core.exceptions.UicdActionException;
import com.google.uicd.backend.core.uicdactions.BaseAction;
import java.util.List;

/** Implements the logic to save and load action to/from filesystem */
public class FileSystemActionStorageManager extends ActionStorageManager {

  @Override
  public List<BaseAction> getBaseActionsFromStorage(List<String> actionIdList)
      throws UicdActionException {
    throw new UicdActionException("Not implemented!");
  }

  @Override
  public boolean saveActions(List<BaseAction> actions) throws UicdActionException {
    throw new UicdActionException("Not implemented!");
  }
}
