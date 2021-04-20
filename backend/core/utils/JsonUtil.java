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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/** Helper class for Json */
public class JsonUtil {
  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");

  public static String toJson(Object value) {
    String jsonDataString = "";
    ObjectMapper mapper = new ObjectMapper();
    try {
      jsonDataString = mapper.writeValueAsString(value);
    } catch (JsonProcessingException e) {
      logger.warning("Error while converting to json: " + e.getMessage());
    }
    return jsonDataString;
  }

  public static <T extends Object> T fromJson(String jsonDataString, TypeReference<T> typeRef) {
    ObjectMapper mapper = new ObjectMapper();
    T obj = null;
    try {
      obj = mapper.readValue(jsonDataString, typeRef);
    } catch (IOException e) {
      logger.warning("Error while converting from json: " + e.getMessage());
    }

    return obj;
  }
}
