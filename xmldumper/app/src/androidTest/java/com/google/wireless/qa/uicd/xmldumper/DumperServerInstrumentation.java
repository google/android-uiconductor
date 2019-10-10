package com.google.wireless.qa.uicd.xmldumper;

import static androidx.test.platform.app.InstrumentationRegistry.getInstrumentation;

import android.os.SystemClock;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import com.google.wireless.qa.uicd.xmldumper.httpd.UicdInstrumentation;
import org.junit.Test;
import org.junit.runner.RunWith;

/**
 * Instrumented test, which will execute on an Android device.
 *
 * This class is the entry point for UICD action execution.
 */
@RunWith(AndroidJUnit4.class)
public class DumperServerInstrumentation {
  private static final int DEFAULT_PORT = 6790;
  private static final int PING_SERVER_MS = 1000;

  // Starts the server on the device
  @Test
  public void startServer() throws InterruptedException {
    UicdInstrumentation uicdInstrumentation =
        UicdInstrumentation.getInstance(
            getInstrumentation().getContext(), DEFAULT_PORT);
    uicdInstrumentation.startServer();

    while (!uicdInstrumentation.isStopServer()) {
      SystemClock.sleep(PING_SERVER_MS);
    }
  }
}
