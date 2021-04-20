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

import io.netty.util.internal.ConcurrentSet;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.eclipse.jetty.websocket.common.WebSocketSession;

/** MinicapWebSocketHandler */
@WebSocket
public class MinicapWebSocketHandler {

  @OnWebSocketClose
  public void onClose(int statusCode, String reason) {
    System.out.println("Close: statusCode=" + statusCode + ", reason=" + reason);
  }

  @OnWebSocketError
  public void onError(Throwable t) {
    System.out.println("Error: " + t.getMessage());
  }

  @OnWebSocketConnect
  public void onConnect(Session session) {
    Integer port = ((WebSocketSession) session).getRequestURI().getPort();
    if (MinicapServerManager.portSessionMapping.get(port) == null) {
      MinicapServerManager.portSessionMapping.put(port, new ConcurrentSet<>());
    }
    MinicapServerManager.portSessionMapping.get(port).add(session);
    System.out.println("New session opened");
  }

  @OnWebSocketMessage
  public void onMessage(String message) {
    System.out.println("received msg " + message);
  }
}
