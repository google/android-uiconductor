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

/**
 * A container for test case run results.
 */
public class TestCaseTreeRowMapper implements RowMapper<TestCaseTreeEntity> {

  @Override
  public TestCaseTreeEntity mapRow(ResultSet rs, int rowNum) {
    TestCaseTreeEntity testCaseTreeEntity = new TestCaseTreeEntity();
    try {
      testCaseTreeEntity.setUuid(rs.getString("uuid"));
      testCaseTreeEntity.setUser_id(rs.getString("user_id"));
      testCaseTreeEntity.setProject_id(rs.getString("project_id"));
      testCaseTreeEntity.setGroup_id(rs.getString("group_id"));
      testCaseTreeEntity.setTree_details(rs.getString("tree_details"));
      testCaseTreeEntity.setCreated_by(rs.getString("created_by"));
      testCaseTreeEntity.setCreated_at(rs.getTimestamp("created_at").toInstant());
    } catch (SQLException e) {
      // do nothing
    }
    return testCaseTreeEntity;
  }
}
