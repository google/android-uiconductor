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

import com.google.uicd.backend.core.config.UicdConfig;
import java.util.HashMap;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.logging.Handler;
import java.util.logging.LogRecord;
import java.util.logging.Logger;

/** UicdCoreDelegator The interface layer for uicd's core module. */
public class UicdCoreDelegator extends Handler {
  private final Logger logger = Logger.getLogger("uicd");
  private final HashMap<Long, Consumer<String>> loggerConsumerMap = new HashMap<>();

  protected UicdCoreDelegator() {
    // Exists only to defeat instantiation.
    logger.setLevel(UicdConfig.getInstance().getLogLevel());
    this.setLevel(UicdConfig.getInstance().getLogLevel());
    logger.addHandler(this);
  }

  @Override
  public synchronized void publish(LogRecord logRecord) {
    Consumer<String> loggerConsumer = loggerConsumerMap.get(Thread.currentThread().getId());
    // Similar to the usage of uicdBasePathThreadMap in uicd/core/config/UicdConfig.java, we should
    // get the consumer from the main thread when logging through the local app.
    if (loggerConsumer == null && !loggerConsumerMap.isEmpty()) {
      loggerConsumer = loggerConsumerMap.values().stream().findFirst().get();
    }
    if (loggerConsumer != null) {
      loggerConsumer.accept(logRecord.getMessage());
    } else {
      System.out.println(logRecord.getMessage());
    }
  }

  @Override
  public void flush() {
    // override method, do nothing
  }

  @Override
  public void close() {
    // override method, do nothing
  }

  private static UicdCoreDelegator instance = null;
  private BiConsumer<String, Integer> restartMinicap = null;
  private Consumer<String> stopMinicap = null;

  public static synchronized UicdCoreDelegator getInstance() {
    if (instance == null) {
      instance = new UicdCoreDelegator();
    }
    return instance;
  }

  public void logException(Throwable e) {
    System.err.println(e.getMessage());
  }

  public synchronized void setLoggerConsumer(Consumer<String> loggerConsumer) {
    loggerConsumerMap.put(Thread.currentThread().getId(), loggerConsumer);
  }

  public void setRestartMinicapConsumer(BiConsumer<String, Integer> restartMinicap) {
    this.restartMinicap = restartMinicap;
  }

  public void setStopMinicapConsumer(Consumer<String> stopMinicap) {
    this.stopMinicap = stopMinicap;
  }

  public void tryStopMinicap(String deviceId) {
    if (stopMinicap != null) {
      stopMinicap.accept(deviceId);
    }
  }

  // This method will be only called in the local mode (when we have frontend and minicap). On the
  // mobileharness continuous run, the BiConsumer is null, restartMinicap will be skipped.
  public void tryRestartMinicap(String deviceId, int rotate) {
    if (restartMinicap != null) {
      restartMinicap.accept(deviceId, rotate);
    }
  }

  public Logger getLogger() {
    return logger;
  }
}
