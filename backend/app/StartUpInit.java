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

import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import com.google.uicd.backend.recorder.websocket.log.LogUtil;
import com.google.uicd.backend.recorder.websocket.log.LogWebSocketHandler;
import com.google.uicd.backend.recorder.websocket.minicap.MinicapUtil;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.websocket.server.WebSocketHandler;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;
import org.springframework.stereotype.Component;

@Component
public class StartUpInit {
  protected Logger logger = LogManager.getLogManager().getLogger("uicd");
  private static Thread logServerThread;
  private static Server logServer;

  @PostConstruct
  public void init() {
    UicdCoreDelegator.getInstance().setLoggerConsumer(LogUtil::writeToLog);
    UicdCoreDelegator.getInstance().setRestartMinicapConsumer(MinicapUtil::restartMinicap);
    UicdCoreDelegator.getInstance().setStopMinicapConsumer(MinicapUtil::stopMinicap);
    initLogServer();
  }

  private void initLogServer() {
    if (logServerThread != null && logServerThread.isAlive()) {
      logServerThread.interrupt();
    }

    if (logServer != null && logServer.isStarted()) {
      try {
        logServer.stop();
      } catch (Exception e) {
        logger.warning(e.getMessage());
      }
    }

    logServerThread =
        new Thread(
            () -> {
              logServer = new Server(8888);

              WebSocketHandler wsHandler =
                  new WebSocketHandler() {
                    @Override
                    public void configure(WebSocketServletFactory factory) {
                      factory.register(LogWebSocketHandler.class);
                    }
                  };
              logServer.setHandler(wsHandler);

              try {
                logServer.start();
                logServer.join();
              } catch (Exception e) {
                logger.warning(e.getMessage());
              }
            });
    logServerThread.start();
  }
}
