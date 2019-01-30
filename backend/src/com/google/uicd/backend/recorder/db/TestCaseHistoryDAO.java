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

import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class TestCaseHistoryDAO {

  @Autowired private JdbcTemplate jdbcTemplate;

  private static Logger logger = LogManager.getLogManager().getLogger("uicd");

  public boolean saveTestExecution(TestCaseHistoryEntity testCaseHistoryEntity) {
    String sql =
        "INSERT INTO uicd_test_history (uuid, testcase_uuid, user_id, project_id, group_id, "
            + "test_result,"
            + "test_msg,test_details, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "
            + "?)";
    try {
      jdbcTemplate.update(
          conn -> {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, testCaseHistoryEntity.getUuid());
            ps.setString(2, testCaseHistoryEntity.getTestcaseUuid());
            ps.setString(3, testCaseHistoryEntity.getUserId());
            ps.setString(4, testCaseHistoryEntity.getProjectId());
            ps.setString(5, testCaseHistoryEntity.getGroupId());
            ps.setString(6, testCaseHistoryEntity.getTestResult());
            ps.setString(7, testCaseHistoryEntity.getTestMsg());
            ps.setString(8, testCaseHistoryEntity.getTestDetails());
            ps.setString(9, testCaseHistoryEntity.getCreatedBy());
            ps.setTimestamp(10, new Timestamp((new java.util.Date().getTime())));
            return ps;
          });

    } catch (Exception e) {
      logger.warning(e.getMessage());
      return false;
    }
    return true;
  }

  public List<TestCaseHistoryEntity> getAllActions() {
    String sql = "SELECT * FROM uicd_test_history";
    return jdbcTemplate.query(sql, new TestHistoryRowMapper());
  }

  public List<TestCaseHistoryEntity> getTestCaseTreeByUsername() {
    String username = UicdConfig.getInstance().getCurrentUser();
    List<TestCaseHistoryEntity> results = new ArrayList<>();
    String sql =
        "SELECT * FROM uicd_test_history WHERE created_by = ? ORDER BY created_at DESC "
            + "Limit 50";
    try {
      results = jdbcTemplate.query(sql, new Object[] {username}, new TestHistoryRowMapper());
    } catch (Exception e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return results;
  }

  public boolean deleteAction(String uuid) {
    try {
      jdbcTemplate.update("DELETE FROM uicd_test_history WHERE uuid = ?", uuid);
    } catch (Exception e) {
      UicdCoreDelegator.getInstance().logException(e);
      return false;
    }
    return true;
  }
}
