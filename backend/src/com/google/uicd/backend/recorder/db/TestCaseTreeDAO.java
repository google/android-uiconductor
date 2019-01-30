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
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Service;

/**
 * A DAO to access the test case database.
 */
@Service
public class TestCaseTreeDAO {

  @Autowired private JdbcTemplate jdbcTemplate;

  public boolean saveTestTree(TestCaseTreeEntity testCaseTreeEntity) {
    String sql =
        "INSERT INTO uicd_testcases_tree (uuid,  user_id, project_id, group_id, tree_details, "
            + "created_by, created_at) "
            + "VALUES (?, ?, ?, ?, ?, ?, ?)";
    try {
      jdbcTemplate.update(
          new PreparedStatementCreator() {
            public PreparedStatement createPreparedStatement(Connection conn) throws SQLException {
              PreparedStatement ps = conn.prepareStatement(sql);
              ps.setString(1, testCaseTreeEntity.getUuid());
              ps.setString(2, testCaseTreeEntity.getUserId());
              ps.setString(3, testCaseTreeEntity.getProjectId());
              ps.setString(4, testCaseTreeEntity.getGroupId());
              ps.setString(5, testCaseTreeEntity.getTreeDetails());
              ps.setString(6, testCaseTreeEntity.getCreatedBy());
              ps.setTimestamp(7, new Timestamp((new java.util.Date().getTime())));
              return ps;
            }
          });

    } catch (Exception e) {
      UicdCoreDelegator.getInstance().logException(e);
      return false;
    }
    return true;
  }

  // for now we only have one tree for user, later we can have the concept of "project"
  public TestCaseTreeEntity getFirstTreeDetails() {
    List<TestCaseTreeEntity> treeList =
        getTestCaseTreeByUsername(UicdConfig.getInstance().getCurrentUser());
    if (treeList.isEmpty()) {
      return new TestCaseTreeEntity();
    }

    return treeList.get(0);
  }

  public List<TestCaseTreeEntity> getAllTestCaseTree() {
    String sql = "SELECT * FROM uicd_testcases_tree";
    return jdbcTemplate.query(sql, new TestCaseTreeRowMapper());
  }

  public List<TestCaseTreeEntity> getTestCaseTreeByUsername(String username) {
    List<TestCaseTreeEntity> results = new ArrayList<>();
    String sql = "SELECT * FROM uicd_testcases_tree WHERE created_by = ?";
    try {
      results = jdbcTemplate.query(sql, new Object[] {username}, new TestCaseTreeRowMapper());
    } catch (Exception e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return results;
  }

  public boolean updateTestCaseTree(TestCaseTreeEntity testCaseTreeEntity) {
    Object[] params = {testCaseTreeEntity.getTreeDetails(), testCaseTreeEntity.getUuid()};
    String sql = "update uicd_testcases_tree set tree_details = ? where uuid = ?";
    try {
      jdbcTemplate.update(sql, params);
    } catch (Exception e) {
      UicdCoreDelegator.getInstance().logException(e);
      return false;
    }
    return true;
  }

  public boolean deleteTestCaseTree(String uuid) {
    try {
      jdbcTemplate.update("DELETE FROM uicd_testcases_tree WHERE uuid = ?", uuid);
    } catch (Exception e) {
      UicdCoreDelegator.getInstance().logException(e);
      return false;
    }
    return true;
  }
}
