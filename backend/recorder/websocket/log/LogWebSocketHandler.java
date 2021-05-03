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

package com.google.uicd.backend.recorder.websocket.log;

import java.io.InputStream;
import java.time.Duration;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

/** LogWebSocketHandler */
@WebSocket
public class LogWebSocketHandler {

  private static Logger logger = LogManager.getLogManager().getLogger("uicd");
  private Process process;
  private InputStream inputStream;
  private static final Duration IDLE_TIMEOUT = Duration.ofDays(1);

  @OnWebSocketClose
  public void onClose(int statusCode, String reason) {
    try {
      if (inputStream != null) {
        inputStream.close();
      }
    } catch (Exception e) {
      logger.warning(e.getMessage());
    }
    if (process != null) {
      process.destroy();
    }
  }

  @OnWebSocketError
  public void onError(Throwable t) {
    logger.severe(t.getMessage());
  }

  @OnWebSocketConnect
  public void onConnect(Session session) {
    logger.info("New session connect to log server.");
    session.setIdleTimeout(IDLE_TIMEOUT.toMillis());

    // start new thread to handle log
    TailLogThread thread = new TailLogThread(session);
    thread.start();
  }

  @OnWebSocketMessage
  public void onMessage(String message) {
    logger.info(message);
  }
}
