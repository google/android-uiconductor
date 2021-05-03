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

package com.google.uicd.backend.recorder.websocket.minicap.jetty;

import java.util.logging.LogManager;
import java.util.logging.Logger;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.websocket.server.WebSocketHandler;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

/** Minicap Server based on Jetty */
public class MinicapJettyServer {
  private static Logger logger = LogManager.getLogManager().getLogger("uicd");
  private Server server = null;
  private int port = 0;
  private String deviceId;

  MinicapJettyServer(int port, String deviceId) {
    this.port = port;
    this.deviceId = deviceId;
    server = new Server(port);
  }

  public int getPort() {
    return port;
  }

  public String getDeviceId() {
    return deviceId;
  }

  public Server getServer() {
    return server;
  }

  public void runServer() {
    if (server.isStarted()) {
      return;
    }

    System.out.println("server port: " + port);
    WebSocketHandler wsHandler =
        new WebSocketHandler() {
          @Override
          public void configure(WebSocketServletFactory factory) {
            factory.register(MinicapWebSocketHandler.class);
          }
        };
    server.setHandler(wsHandler);

    try {
      server.start();
      server.join();
    } catch (Exception e) {
      logger.warning(e.getMessage());
    }
  }

  public void stopServer() {
    try {
      server.stop();
    } catch (Exception e) {
      logger.warning(e.getMessage());
    }
  }
}
