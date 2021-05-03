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

package com.google.uicd.backend.recorder.pdbdebugger;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.time.Duration;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/** Java thread to communicate with pdb debugger process. */
public class PdbDebuggerProcessListenerThread extends Thread {

  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");

  private final Process process;
  private InputStream processError = null;
  private InputStream processOutput = null;
  private String outputString;
  private static final Duration WAIT_PERIOD = Duration.ofMillis(100);
  private CopyOnWriteArrayList<String> outputList;

  /** Listener thread for pdb debugger process. */
  public PdbDebuggerProcessListenerThread(
      CopyOnWriteArrayList<String> outputList, Process process) {
    this.outputList = outputList;
    this.process = process;
  }

  @Override
  public void run() {
    try {
      while (this.process.isAlive()) {
        this.processOutput = this.process.getInputStream();
        this.processError = this.process.getErrorStream();
        while (this.processOutput.available() == 0 && this.processError.available() == 0) {
          try {
            Thread.sleep(WAIT_PERIOD.toMillis());
          } catch (InterruptedException e) {
            logger.warning(e.getMessage());
          }
        }
        BufferedReader outputReader =
            new BufferedReader(new InputStreamReader(this.processOutput, Charset.defaultCharset()));
        while (outputReader.ready()) {
          outputString = outputReader.readLine();
          this.outputList.add(outputString);
        }
        outputReader.close();
        outputReader =
            new BufferedReader(new InputStreamReader(this.processError, Charset.defaultCharset()));
        while (outputReader.ready()) {
          outputString = outputReader.readLine();
          this.outputList.add(outputString);
        }
        outputReader.close();
      }
    } catch (Exception e) {
      logger.warning(e.getMessage());
    }
  }
}
