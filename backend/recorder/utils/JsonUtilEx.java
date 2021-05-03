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

package com.google.uicd.backend.recorder.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.io.IOException;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/**
 * Helper class for Json, for saving the java 8 time object, we need depend on the
 * jackson2-datatype-jsr310, however internal is not available, so we can not put the util in the
 * core package.
 */
public class JsonUtilEx {
  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");

  public static String toJson(Object value) {
    return toJson(value, false);
  }

  public static String toJson(Object value, boolean outputWithFormat) {
    String jsonDataString = "";
    ObjectMapper mapper = new ObjectMapper();
    JavaTimeModule module = new JavaTimeModule();
    mapper.registerModule(module);
    try {
      if (outputWithFormat) {
        jsonDataString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(value);
      } else {
        jsonDataString = mapper.writeValueAsString(value);
      }
    } catch (JsonProcessingException e) {
      logger.warning("Error while converting to json: " + e.getMessage());
    }
    return jsonDataString;
  }

  public static <T extends Object> T fromJson(String jsonDataString, TypeReference<T> typeRef) {
    ObjectMapper mapper = new ObjectMapper();
    T obj = null;
    try {
      JavaTimeModule module = new JavaTimeModule();
      mapper.registerModule(module);
      obj = mapper.readValue(jsonDataString, typeRef);
    } catch (IOException e) {
      logger.warning("Error while converting from json: " + e.getMessage());
    }
    return obj;
  }
}
