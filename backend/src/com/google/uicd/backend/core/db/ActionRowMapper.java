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

import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

/**
 * ActionRowMapper
 */
public class ActionRowMapper implements RowMapper<ActionEntity> {

  @Override
  public ActionEntity mapRow(ResultSet rs, int rowNum) {
    ActionEntity actionEntity = new ActionEntity();
    try {
      actionEntity.setUuid(rs.getString("uuid"));
      actionEntity.setDetails(rs.getString("details"));
      actionEntity.setType(rs.getString("type"));
      actionEntity.setName(rs.getString("name"));
      actionEntity.setTag(rs.getString("tag"));
      actionEntity.setDescription(rs.getString("description"));
      actionEntity.setCreatedBy(rs.getString("created_by"));
      actionEntity.setCreatedAt(rs.getTimestamp("created_at").toInstant());
    } catch (SQLException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return actionEntity;
  }

}
