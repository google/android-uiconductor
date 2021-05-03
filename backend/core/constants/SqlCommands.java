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

package com.google.uicd.backend.core.constants;

/** Database operation commands. */
public class SqlCommands {
  public static final String INSERT_NEW_PROJECT =
      "INSERT INTO uicd_project (project_id, user_id, group_id, project_name, created_by,"
          + " created_at) VALUES (?, ?, ?, ?, ?, ?);";
  public static final String SELECT_ALL_PROJECT_DATA_BY_USER_ID =
      "SELECT * FROM uicd_project WHERE user_id = ?";
  public static final String DELETE_PROJECT_BY_PROJECT_ID =
      "DELETE FROM uicd_project WHERE project_id = ?";
}
