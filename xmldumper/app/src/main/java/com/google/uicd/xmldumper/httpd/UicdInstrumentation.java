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

package com.google.uicd.xmldumper.httpd;

import android.content.Context;
import android.os.Looper;
import android.util.Log;
import java.io.IOException;

/** Uicd Instrumentation */
public class UicdInstrumentation {
  private static String TAG = UicdInstrumentation.class.getSimpleName();
  public static UicdInstrumentation instance;
  private int serverPort;
  private static Context context;
  private HttpdThread serverThread;

  private UicdInstrumentation(int serverPort) {
    // in use
    if (!isValidPort(serverPort)) {
      throw new RuntimeException(("Invalid port: " + serverPort));
    }
    this.serverPort = serverPort;
  }

  private static boolean isValidPort(int port) {
    return port >= 1024 && port <= 65535;
  }

  public static synchronized UicdInstrumentation getInstance(
      Context activityContext, int serverPort) {
    if (instance == null) {
      context = activityContext;
      instance = new UicdInstrumentation(serverPort);
    }
    return instance;
  }

  public boolean isStopServer() {
    return serverThread == null;
  }

  public void startServer() throws InterruptedException {
    if (serverThread != null && serverThread.isAlive()) {
      return;
    }

    if (serverThread != null) {
      stopServer();
    }

    serverThread = new HttpdThread(this.serverPort);
    serverThread.start();
    Log.i(TAG, "UICD action execution server started.");
  }

  public void stopServer() {
    try {
      stopServerThread();
      Log.e(TAG, "Stopping running UICD action execution server.");
    } finally {
      instance = null;
    }
  }

  private void stopServerThread() {
    if (serverThread == null) {
      return;
    }
    if (!serverThread.isAlive()) {
      serverThread = null;
      return;
    }
    serverThread.stopLooping();
    serverThread.interrupt();
    try {
      serverThread.join();
    } catch (InterruptedException ignored) {
      Log.e(TAG, "UICD action execution server stopped.");
    }
    serverThread = null;
  }

  /** Httpd Thread */
  public class HttpdThread extends Thread {
    private final ExecutionServer server;
    private Looper looper;

    public HttpdThread(int serverPort) {
      this.server = new ExecutionServer(serverPort);
      looper = Looper.myLooper();
    }

    @Override
    public void run() {
      Looper.prepare();
      looper = Looper.myLooper();
      startServer();
      Looper.loop();
    }

    @Override
    public void interrupt() {
      server.stop();
      super.interrupt();
    }

    public void startServer() {
      try {
        this.server.start(Integer.MAX_VALUE, true);
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    public void stopLooping() {
      if (looper == null) {
        return;
      }
      looper.quit();
    }
  }
}
