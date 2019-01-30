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

package com.google.uicd.backend.app;

import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.devicesdriver.DevicesDriverManager;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import com.google.uicd.backend.recorder.websocket.minicap.jetty.MinicapServerManager;
import javax.sql.DataSource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@SpringBootApplication
@ComponentScan({"com.google.uicd.backend.*"})
public class Application {
  private static String[] args;
  private static ConfigurableApplicationContext context;

  @Bean
  public DataSource dataSource() {
   // final DriverManagerDataSource dataSource = new DriverManagerDataSource("jdbc:mysql://localhost:3308/uicddb?autoReconnect=true&user=root&password=uicdawesome");
    final DriverManagerDataSource dataSource = new DriverManagerDataSource();
    dataSource.setDriverClassName("com.mysql.jdbc.Driver");
    dataSource.setUrl("jdbc:mysql://localhost:3308/uicddb?autoReconnect=true&useUnicode=true&characterEncoding=utf-8");
    dataSource.setUsername("root");
    dataSource.setPassword("uicdawesome");

    return dataSource;
  }

  public static void main(String[] args) {
    // To initialized the logger for spring.
    // Have to init here, otherwise, in other class we won't able to get logger.
    UicdCoreDelegator.getInstance();
    Application.context = SpringApplication.run(Application.class, args);
    Application.args = args;
  }

  public static void restart() {
    MinicapServerManager.getInstance().clearAll();
    UicdConfig.reset();
    DevicesDriverManager.reset();

    Application.context.close();
    Application.context = SpringApplication.run(Application.class, args);
  }
}
