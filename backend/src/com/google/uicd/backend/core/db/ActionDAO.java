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
import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Iterables;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

/**
 * Action DAO, basic CRUD operation for uicd action table.
 */
public class ActionDAO {

  private static final int MAX_NAME_LENGTH = 50;

  private static final String SELECT_COLUMNS =
      "uuid, type, name, tag, description, "
          + "cast(details as char(10000000) character set utf8) as details, created_by, created_at";

  public ActionDAO(Connection connection) {
    this.jdbcTemplate = new JdbcTemplate(new SingleConnectionDataSource(connection, false));
    this.connection = connection;
  }

  private final JdbcTemplate jdbcTemplate;
  private final Connection connection;

  public ActionEntity getActionByUUID(String uuid) {
    try {
      return Iterables.getOnlyElement(getActionByUuid(ImmutableSet.of(uuid)));
    } catch (Exception e) {
      // TODO: we don't want this exception show on the backend log, sometimes it is normal
      // find a better way to handle the exception.
    }
    return null;
  }

  public List<ActionEntity> getActionByUuid(Set<String> ids) {
    List<ActionEntity> result = null;
    if (ids.isEmpty()) {
      return null;
    }
    StringBuilder inClause = new StringBuilder("(");
    ids.forEach(id -> inClause.append("\"").append(id).append("\","));
    inClause.setLength(inClause.length() - 1);
    inClause.append(")");
    String sql = "SELECT " + SELECT_COLUMNS + " FROM uicd_testcase WHERE uuid in " + inClause;

    try {
      result = jdbcTemplate.query(sql, new ActionRowMapper());
    } catch (Exception e) {
      // TODO: we don't want this exception show on the backend log, sometimes it is normal
      // find a better way to handle the exception.
    }
    return result;
  }

  public List<ActionEntity> getActionByType(String type) {
    List<ActionEntity> results = new ArrayList<>();
    String sql = "SELECT " + SELECT_COLUMNS + " FROM uicd_testcase WHERE type = ?";
    try {
      results = jdbcTemplate.query(sql, new Object[]{type}, new ActionRowMapper());
    } catch (Exception e) {
      // TODO: we don't want this exception show on the backend log, sometimes it is normal
      // find a better way to handle the exception.
    }
    return results;
  }
  // TODO: These 3 methods are very similar in functionality, find way to shorten duplicate code
  public List<ActionEntity> getActionByName(String name, String type) {
    List<ActionEntity> results = new ArrayList<>();
    String sql = "SELECT " + SELECT_COLUMNS + " FROM uicd_testcase WHERE name = ? && type = ?";
    try {
      results = jdbcTemplate.query(sql, new Object[] {name, type}, new ActionRowMapper());
    } catch (Exception e) {
      // TODO: we don't want this exception show on the backend log, sometimes it is normal
      // find a better way to handle the exception.
    }
    return results;
  }

  public List<ActionEntity> getAllActions() {
    String sql = "SELECT " + SELECT_COLUMNS + " FROM uicd_testcase";
    return jdbcTemplate.query(sql, new ActionRowMapper());
  }

  public boolean saveAction(ActionEntity actionEntity) {
    try {
      return saveActions(ImmutableList.of(actionEntity));
    } catch (Exception e) {
      // TODO: we don't want this exception show on the backend log, sometimes it is normal
      // find a better way to handle the exception.
    }
    return false;
  }

  public boolean saveActions(List<ActionEntity> actionEntities) {
    String sql =
        "INSERT INTO uicd_testcase (uuid, details, type, name, tag, description, "
            + "created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    try {
      PreparedStatement ps = connection.prepareStatement(sql);
      for (ActionEntity actionEntity : actionEntities) {
        ps.setString(1, actionEntity.getUuid());
        ps.setString(2, actionEntity.getDetails());
        ps.setString(3, actionEntity.getType());
        ps.setString(
            4,
            actionEntity.getName().length() > MAX_NAME_LENGTH
                ? actionEntity.getName().substring(0, MAX_NAME_LENGTH)
                : actionEntity.getName());
        ps.setString(5, actionEntity.getTag());
        ps.setString(6, actionEntity.getDescription());
        ps.setString(7, actionEntity.getCreatedBy());
        ps.setTimestamp(8, new Timestamp(new java.util.Date().getTime()));
        ps.addBatch();
      }

      return getBatchExecuteResult(ps.executeBatch());
    } catch (SQLException e) {
      UicdCoreDelegator.getInstance().logException(e);
      return false;
    }
  }

  public boolean updateAction(ActionEntity actionEntity) {
    try {
      return updateActions(ImmutableList.of(actionEntity));
    } catch (Exception e) {
      // TODO: we don't want this exception show on the backend log, sometimes it is normal
      // find a better way to handle the exception.
    }
    return false;
  }

  public boolean updateActions(List<ActionEntity> actionEntities) {
    String sql =
        "update uicd_testcase set name = ?, details = ?, type = ?, tag = ?, "
            + "description = ? where uuid = ? ";
    try {
      PreparedStatement ps = connection.prepareStatement(sql);
      for (ActionEntity actionEntity : actionEntities) {
        ps.setString(
            1,
            actionEntity.getName().length() > MAX_NAME_LENGTH
                ? actionEntity.getName().substring(0, MAX_NAME_LENGTH)
                : actionEntity.getName());
        ps.setString(2, actionEntity.getDetails());
        ps.setString(3, actionEntity.getType());
        ps.setString(4, actionEntity.getTag());
        ps.setString(5, actionEntity.getDescription());
        ps.setString(6, actionEntity.getUuid());
        ps.addBatch();
      }

      return getBatchExecuteResult(ps.executeBatch());
    } catch (SQLException e) {
      UicdCoreDelegator.getInstance().logException(e);
      return false;
    }
  }

  public boolean deleteAction(String uuid) {
    try {
      jdbcTemplate.update(
          "DELETE FROM uicd_testcase WHERE uuid = ? ",
          uuid);
    } catch (Exception e) {
      UicdCoreDelegator.getInstance().logException(e);
      return false;
    }
    return true;
  }

  public List<String> getIdsNotInDatabase(List<String> uuids) {
    List<String> idsNotInDb = new ArrayList<>();
    if (uuids.isEmpty()) {
      return idsNotInDb;
    }
    StringBuilder sqlBuilder =
        new StringBuilder("select distinct tmp.uuid from ")
            .append("(select \"")
            .append(uuids.get(0))
            .append("\" as uuid");
    for (int i = 1; i < uuids.size(); i++) {
      sqlBuilder.append(" union select \"").append(uuids.get(i)).append("\"");
    }
    sqlBuilder.append(
        ") tmp left join uicd_testcase on tmp.uuid = uicd_testcase.uuid"
            + " where uicd_testcase.uuid is null;");
    try {
      idsNotInDb = jdbcTemplate.queryForList(sqlBuilder.toString(), String.class);
    } catch (Exception e) {
      UicdCoreDelegator.getInstance().logException(e);
      return new ArrayList<>();
    }
    return idsNotInDb;
  }

  public boolean getBatchExecuteResult(int[] result) {
    for (int i = 0; i < result.length; i++) {
      //  0 or greater, the command was processed successfully
      if (result[i] < 0) {
        return false;
      }
    }
    return true;
  }
}
