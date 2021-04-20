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

import java.io.IOException;
import java.util.concurrent.TimeUnit;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import org.eclipse.jetty.websocket.api.Session;

public class TailLogThread extends Thread {

  private static Logger logger = LogManager.getLogManager().getLogger("uicd");

  public TailLogThread(Session session) {
    this.session = session;
  }

  private Session session;

  @Override
  public void run() {
    try {
      while (true) {
        String value = null;
        try {
          value = LogUtil.logs.poll(1000, TimeUnit.MILLISECONDS);
        } catch (InterruptedException e) {
          logger.warning(e.getMessage());
        }
        if (value == null) {
          continue;
        }

        if (session.isOpen()) {
          session.getRemote().sendString(value);
        } else {
          return;
        }
      }
    } catch (IOException e) {
      logger.warning(e.getMessage());
    }
  }
}
