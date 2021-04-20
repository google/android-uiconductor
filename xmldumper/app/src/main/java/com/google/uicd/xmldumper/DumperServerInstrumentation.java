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

package com.google.uicd.xmldumper;

import static androidx.test.platform.app.InstrumentationRegistry.getInstrumentation;

import android.os.SystemClock;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import com.google.uicd.xmldumper.httpd.UicdInstrumentation;
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
