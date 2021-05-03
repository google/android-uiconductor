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

import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.utils.ADBCommandLineUtil;
import io.netty.util.internal.ConcurrentSet;
import java.nio.ByteBuffer;
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import org.eclipse.jetty.websocket.api.Session;

/** MinicapServerManager */
public class MinicapServerManager {

  public static HashMap<Integer, BlockingQueue<byte[]>> portQueueMapping = new HashMap<>();
  public static HashMap<Integer, ConcurrentSet<Session>> portSessionMapping = new HashMap<>();
  public static HashMap<Integer, Thread> portSendImgThreadMapping = new HashMap<>();
  private static List<MinicapJettyServer> serverList = new ArrayList<>();
  private static MinicapServerManager instance = null;
  private static Logger logger = LogManager.getLogManager().getLogger("uicd");
  private static final Duration IMG_POLL_TIMEOUT = Duration.ofSeconds(3);
  private static final Duration WAIT_FOR_IMG_QUEUE = Duration.ofSeconds(1);
  private final ADBCommandLineUtil adbCommandLineUtil;

  protected MinicapServerManager() {
    this.adbCommandLineUtil = new ADBCommandLineUtil();
  }

  public static MinicapServerManager getInstance() {
    if (instance == null) {
      instance = new MinicapServerManager();
    }
    return instance;
  }

  public MinicapJettyServer createNewServer(int port, String deviceId) {
    MinicapJettyServer minicapJettyServer = new MinicapJettyServer(port, deviceId);
    serverList.add(minicapJettyServer);
    return minicapJettyServer;
  }

  public void runServer(MinicapJettyServer server) {
    new Thread() {
      @Override
      public void run() {
        server.runServer();
      }
    }.start();
  }

  public void stopServer(MinicapJettyServer server) {
    server.stopServer();
  }

  public void sendImage(MinicapJettyServer server) {
    Integer port = server.getPort();
    BlockingQueue<byte[]> imgdataQueue = portQueueMapping.get(port);
    Thread sendImgThread =
        new Thread() {
          @Override
          public void run() {
            byte[] buffer = {};
            while (!isInterrupted()) {
              try {
                byte[] candidate = {};

                if (imgdataQueue != null) {
                  byte[] currentImg =
                      imgdataQueue.poll(IMG_POLL_TIMEOUT.toMillis(), TimeUnit.MILLISECONDS);
                  if (currentImg == null) {
                    candidate = buffer.clone();
                  } else {
                    candidate = currentImg;
                    buffer = candidate.clone();
                  }
                } else {
                  Thread.sleep(WAIT_FOR_IMG_QUEUE.toMillis());
                  continue;
                }

                // not ready
                if (port == null) {
                  return;
                }

                // Send the new img to all open WebSocket sessions
                ConcurrentSet<Session> sessions = portSessionMapping.get(port);

                if (sessions == null) {
                  continue;
                }

                for (Session session : sessions) {
                  if (!session.isOpen()) {
                    portSessionMapping.get(port).remove(session);
                  } else {
                    session.getRemote().sendBytes(ByteBuffer.wrap(candidate));
                  }
                }
              } catch (Throwable e) {
                // Let the owning Thread know it's been interrupted, so it can clean up
                interrupt();
                logger.info("No data from minicap.");
              }
            }

            logger.info(String.format("Thread id(%s) killed.", this.getId()));
          }
        };
    sendImgThread.start();
    portSendImgThreadMapping.put(port, sendImgThread);
  }

  public void stopMinicapOnPort(String deivceId, int minicapWebServerPort) {
    portSendImgThreadMapping.get(minicapWebServerPort).interrupt();
    portSendImgThreadMapping.remove(minicapWebServerPort);

    Optional<MinicapJettyServer> minicapJettyServer =
        serverList.stream().filter(s -> s.getPort() == minicapWebServerPort).findFirst();
    if (minicapJettyServer.isPresent()) {
      stopServer(minicapJettyServer.get());
      // Stop minicap on the device
      killMinicap(deivceId);
    }
  }

  public void clearAll() {
    for (Map.Entry<Integer, Thread> entry : portSendImgThreadMapping.entrySet()) {
      entry.getValue().interrupt();
    }

    for (MinicapJettyServer server : serverList) {
      stopServer(server);
      killMinicap(server.getDeviceId());
    }
    portQueueMapping.clear();
    portSessionMapping.clear();
  }

  private void killMinicap(String deviceId) {
    try {
      adbCommandLineUtil.executeAdb("shell pkill minicap", deviceId, true /* waitFor */);
    } catch (UicdExternalCommandException e) {
      logger.info(e.getMessage());
    }
  }
}
