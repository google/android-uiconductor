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

package com.google.uicd.backend.core.utils;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/** Helper functions executing a command */
public class CommandLineUtil {
  private static final int EXECUTE_COMMAND_LINE_TIME_OUT_IN_SECONDS = 10;
  private static final int LOGGER_MAX_SIZE = 50;
  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");

  public Process execute(String commandLine, List<String> output, boolean waitFor)
      throws UicdExternalCommandException {
    return execute(commandLine, output, waitFor, EXECUTE_COMMAND_LINE_TIME_OUT_IN_SECONDS);
  }

  public Process execute(
      String commandLine, List<String> output, boolean waitFor, boolean showDetailLogging)
      throws UicdExternalCommandException {
    return execute(
        commandLine, output, waitFor, EXECUTE_COMMAND_LINE_TIME_OUT_IN_SECONDS, showDetailLogging);
  }

  public Process execute(
      String commandLine, List<String> output, boolean waitFor, int timeout)
      throws UicdExternalCommandException {
    timeout = (timeout == 0 ? EXECUTE_COMMAND_LINE_TIME_OUT_IN_SECONDS : timeout);
    return execute(commandLine, output, waitFor, timeout, /* showDetailLogging= */ false);
  }

  public Process execute(
      String commandLine,
      List<String> output,
      boolean waitFor,
      int timeout,
      boolean showDetailLogging)
      throws UicdExternalCommandException {
    Process p;
    try {
      // Note that we should not just directly execute the commandLine, sometimes the parameter will
      // not pass to the shell correctly.
      List<String> args = new ArrayList<>();

      if (HostInfoUtil.isMac() || HostInfoUtil.isUnix()) {
        args.add("/bin/sh");
        args.add("-c");
        args.add(commandLine);
      }

      if (HostInfoUtil.isWindows()) {
        // Use scanner to prevent empty string in the args list.
        Scanner scanner = new Scanner(commandLine);
        while (scanner.hasNext()) {
          args.add(scanner.next());
        }
      }

      String[] cmd = new String[args.size()];
      cmd = args.toArray(cmd);

      logger.info("Execute shell command: " + String.join(" ", cmd));
      p = new ProcessBuilder(cmd).start();

      if (waitFor) {
        p.waitFor(timeout, TimeUnit.SECONDS);

        BufferedReader stdInput =
            new BufferedReader(new InputStreamReader(p.getInputStream(), UTF_8));

        BufferedReader stdError =
            new BufferedReader(new InputStreamReader(p.getErrorStream(), UTF_8));

        while (stdInput.ready()) {
          String line = stdInput.readLine();
          output.add(line);
        }
        // If output is too long, then front end will freeze
        int maxLineCount = Math.min(output.size(), LOGGER_MAX_SIZE);
        if (showDetailLogging) {
          logger.info("Standard output of command:");
          for (int i = 0; i < maxLineCount; i++) {
            logger.info(output.get(i));
          }
          // We want the backend to print out all of the output
          for (int i = LOGGER_MAX_SIZE; i < output.size(); i++) {
            System.out.println(output.get(i));
          }
        }

        if (stdError.ready()) {
          logger.info("Error output of command:");
        }
        while (stdError.ready()) {
          logger.warning(stdError.readLine());
        }
      }

    } catch (Exception e) {
      logger.warning("Exception occurred: " + e.getMessage());
      throw new UicdExternalCommandException("Failed to execute command:" + commandLine);
    }

    return p;
  }
}
