// Copyright 2019 Google LLC
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

import com.google.uicd.backend.core.exceptions.UicdDeviceHttpConnectionResetException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import org.apache.http.Consts;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.fluent.Response;
import org.apache.http.entity.StringEntity;

/**
 * Helper class for Http request
 */
public class HttpProxyUtils {
  public static final int DEFAULT_HTTP_REQUEST_TIMEOUT = 5000;

  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");
  private static final List<String> CONNECTION_RESET_KEYWORDS_LIST =
      Arrays.asList("Connection refused", "Connection reset", "Internal Server Error");

  public static String getRequestAsString(String url)
      throws UicdDeviceHttpConnectionResetException {
    return getRequestAsString(url, DEFAULT_HTTP_REQUEST_TIMEOUT);
  }

  private static String getRequestAsString(String url, int timeoutMs)
      throws UicdDeviceHttpConnectionResetException {
    logger.config("get request to xmldumper:" + url);
    String ret = "";
    try {
      ret = Request.Get(url)
          .connectTimeout(timeoutMs)
          .socketTimeout(timeoutMs)
          .execute().returnContent().asString(Consts.UTF_8);
    } catch (IOException e) {
      logger.warning(e.getMessage());
      if (CONNECTION_RESET_KEYWORDS_LIST.stream().parallel().anyMatch(e.getMessage()::contains)) {
        throw new UicdDeviceHttpConnectionResetException(e.getMessage());
      }
    }
    return ret;
  }

  public static String postRequestAsString(String url, String request)
      throws UicdDeviceHttpConnectionResetException {
    logger.config("post request to xmldumper:" + url);
    String ret = "";
    Response response = null;
    try {
      response = Request.Post(url)
          .body(new StringEntity(request))
          .execute();
      ret = response.returnContent().asString(Consts.UTF_8);
    } catch (IOException e) {
      logger.severe(e.getMessage());
      // See comments in getRequestAsString
      if (CONNECTION_RESET_KEYWORDS_LIST.stream().parallel().anyMatch(e.getMessage()::contains)) {
        throw new UicdDeviceHttpConnectionResetException(e.getMessage());
      }
    }
    logger.config("return from xmldumper:" + ret);
    return ret;
  }
}
