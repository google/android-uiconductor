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

package com.google.uicd.backend.recorder.services;

import com.google.uicd.backend.controllers.responses.TestHistoryRecord;
import com.google.uicd.backend.controllers.responses.TestHistoryResponse;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.recorder.db.DbTestHistoryStorageManager;
import com.google.uicd.backend.recorder.db.TestHistoryEntity;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

/** Defines the interface to save and load test history to/from database or file system. */
@Service
public class TestHistoryManager {
  protected Logger logger = LogManager.getLogManager().getLogger("uicd");
  @Autowired private ApplicationContext applicationContext;
  @Autowired private DbTestHistoryStorageManager testHistoryStorageManager;

  /** Saves the testHistoryEntity to database and filesystem */
  public void save(TestHistoryEntity testHistoryEntity) throws UicdException {
    testHistoryStorageManager.save(testHistoryEntity);
  }

  /** Gets most recent 50 test history records, this api only used in the frontend. */
  public TestHistoryResponse getTop50TestHistory() throws UicdException {
    return TestHistoryResponse.create(
        testHistoryStorageManager.getTop50TestHistory().stream()
            .map(item -> TestHistoryRecord.createFromTestHistoryEntity(item))
            .collect(Collectors.toList()));
  }
}
