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

package com.google.uicd.backend.recorder.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class TestHistoryRowMapper implements RowMapper<TestCaseHistoryEntity> {

  @Override
  public TestCaseHistoryEntity mapRow(ResultSet rs, int rowNum) {
    TestCaseHistoryEntity testCaseHistoryEntity = new TestCaseHistoryEntity();
    try {
      testCaseHistoryEntity.setUuid(rs.getString("uuid"));
      testCaseHistoryEntity.setTestcaseUuid(rs.getString("testcase_uuid"));
      testCaseHistoryEntity.setUserId(rs.getString("user_id"));
      testCaseHistoryEntity.setProjectId(rs.getString("project_id"));
      testCaseHistoryEntity.setGroupId(rs.getString("group_id"));
      testCaseHistoryEntity.setTestResult(rs.getString("test_result"));
      testCaseHistoryEntity.setTestMsg(rs.getString("test_msg"));
      testCaseHistoryEntity.setTestDetails(rs.getString("test_details"));
      testCaseHistoryEntity.setCreatedBy(rs.getString("created_by"));
      testCaseHistoryEntity.setCreatedAt(rs.getTimestamp("created_at").toInstant());
    } catch (SQLException e) {
      // do nothing
    }
    return testCaseHistoryEntity;
  }
}
