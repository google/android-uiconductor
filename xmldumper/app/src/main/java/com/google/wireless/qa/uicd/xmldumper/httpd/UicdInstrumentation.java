package com.google.wireless.qa.uicd.xmldumper.httpd;

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
