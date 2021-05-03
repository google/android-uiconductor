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

package com.google.uicd.backend.app;

import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.devicesdriver.DevicesDriverManager;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import com.google.uicd.backend.recorder.websocket.minicap.jetty.MinicapServerManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"com.google.uicd.backend.*"})
@EntityScan({
  "com.google.uicd.backend.core.db",
  "com.google.uicd.backend.recorder.db"
})
@EnableJpaRepositories("com.google.uicd.backend.recorder.repositories")
public class Application {
  private static String[] args;
  private static ConfigurableApplicationContext context;

  public static void main(String[] args) {
    // To initialized the logger for spring.
    // Have to init here, otherwise, in other class we won't able to get logger.
    UicdCoreDelegator.getInstance();
    if (loadFromConfigFile()) {
      return;
    }
    SpringApplication application = new SpringApplication(Application.class);
    application.setDefaultProperties(DataSourceConfig.getDBProperties());
    Application.context = application.run(args);
    Application.args = args;
  }

  private static boolean loadFromConfigFile() {
    try {
      UicdConfig.getInstance().loadFromConfigFile("./uicd.cfg");
    } catch (UicdException e) {
      System.out.println("Can not find uicd.cfg");
      return true;
    }
    return false;
  }

  public static void restart() {
    MinicapServerManager.getInstance().clearAll();
    UicdConfig.reset();
    DevicesDriverManager.getInstance().reset();

    Application.context.close();
    if (loadFromConfigFile()) {
      return;
    }
    SpringApplication application = new SpringApplication(Application.class);
    application.setDefaultProperties(DataSourceConfig.getDBProperties());
    Application.context = application.run(args);
  }
}
