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

package com.google.uicd.backend.app;

import com.google.uicd.backend.core.config.UicdConfig;
import java.nio.file.Paths;
import java.util.Properties;

/** Get the datasource properties based on the localmode or remote mode (H2|MySQL) */
public class DataSourceConfig {
  private static final String DB_FOLDER_NAME = "localh2db";
  private static final String DB_NAME = "uicddb";

  public static Properties getDBProperties() {
    boolean isLocalMode = UicdConfig.getInstance().isLocalMode();
    Properties properties = new Properties();
    if (isLocalMode) {
      String h2ConnectionStr =
          String.format(
              "jdbc:h2:file:%s;DB_CLOSE_ON_EXIT=TRUE;AUTO_RECONNECT=TRUE",
              Paths.get(UicdConfig.getInstance().getBaseFolder(), DB_FOLDER_NAME, DB_NAME)
                  .toString());

      properties.put("spring.datasource.url", h2ConnectionStr);
      properties.put("spring.datasource.driverClassName", "org.h2.Driver");
      properties.put("spring.datasource.username", "sa");
      properties.put("spring.datasource.password", "");
      properties.put("spring.jpa.database-platform", "org.hibernate.dialect.H2Dialect");
      properties.put("spring.jpa.hibernate.ddl-auto", "update");
    } else {
      properties.put("spring.datasource.url", UicdConfig.getInstance().getDBConnStr());
      properties.put("spring.datasource.driverClassName", "com.mysql.jdbc.Driver");
      properties.put("spring.datasource.username", "root");
      properties.put("spring.datasource.password", "admin");
      properties.put("spring.jpa.database-platform", "org.hibernate.dialect.MySQLDialect");
      properties.put("spring.jpa.hibernate.ddl-auto", "none");
    }
    return properties;
  }
}
