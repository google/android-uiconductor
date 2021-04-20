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

package com.google.uicd.backend.core.xmlparser;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Streams;
import java.io.IOException;
import java.util.stream.Collectors;

/** Helps deserialization by figuring out if the JSON object is Query or QueryField */
public class IPredicateDeserializer extends JsonDeserializer<IPredicate> {
  public static final String FIELD = "field";
  public static final String OPERATOR = "operator";
  public static final String VALUE = "value";
  public static final String CONDITION = "condition";
  public static final String RULES = "rules";

  @Override
  public IPredicate deserialize(
      JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
    ObjectMapper objectMapper = (ObjectMapper) jsonParser.getCodec();
    JsonNode node = jsonParser.getCodec().readTree(jsonParser);
    if (node.has(FIELD)) {
      return new QueryField(
          node.get(FIELD).asText(), node.get(OPERATOR).asText(), node.get(VALUE).asText());
    }
    return new Query(
        node.get(CONDITION).asText(),
        Streams.stream(node.withArray(RULES).elements())
            .map(
                child -> {
                  try {
                    return objectMapper.treeToValue(child, IPredicate.class);
                  } catch (JsonProcessingException e) {
                    // There is no open source compatible way of throwing
                    // checked exceptions in streams. Following advice from
                    // http://shortn/_8Azgkm5zQn
                    throw new IllegalStateException(e);
                  }
                })
            .collect(Collectors.toList()));
  }
}
