// Copyright 2018 Google LLC
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

package com.google.uicd.backend.core.globalvariables;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.google.auto.value.AutoValue;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.utils.JsonUtil;
import java.util.HashMap;

/**
 * UicdGlobalVariableMap Store all the global value of uicd in this map, using this map to
 * communicate" between different step. And also using this one to pass value to outside system.
 *
 */
/** Jackson auto detect. */
@JsonAutoDetect(
    fieldVisibility = ANY,
    getterVisibility = NONE,
    setterVisibility = NONE,
    isGetterVisibility = NONE)
public class UicdGlobalVariableMap {

  public static final String UICD_PARAM_KEYWORD = "$uicd_";
  public static final String UICD_SHELL_OUTPUT_KEYWORD = "uicd_shell_output:";
  public static final String UICD_DEVICEID_PARAM_KEYWORD = UICD_PARAM_KEYWORD + "deviceid";
  public static final String UICD_ADB_PATH_PARAM_KEYWORD = UICD_PARAM_KEYWORD + "adb_path";
  public static final String UICD_OUTPUT_PATH_KEYWORD = UICD_PARAM_KEYWORD + "output_path";
  public static final String UICD_INPUT_PATH_KEYWORD = UICD_PARAM_KEYWORD + "input_path";
  public static final String UICD_GLOBAL_KEY_SPONGE_LINK = "$uicd_sponge_link";
  public static final String UICD_GLOBAL_KEY_SPONGE_ID = "$uicd_sponge_id";

  public UicdGlobalVariableMap() {
    initReservedVariables();
  }
  private final HashMap<String, UicdGlobalVariableValue> varMap = new HashMap<>();
  public void initReservedVariables() {
    varMap.put(
        UICD_ADB_PATH_PARAM_KEYWORD,
        UicdGlobalVariableValue.create(UicdConfig.getInstance().getAdbShellPath(), false));
    varMap.put(
        UICD_OUTPUT_PATH_KEYWORD,
        UicdGlobalVariableValue.create(UicdConfig.getInstance().getTestOutputFolder(), false));
    varMap.put(
        UICD_INPUT_PATH_KEYWORD,
        UicdGlobalVariableValue.create(UicdConfig.getInstance().getTestInputFolder(), false));
  }

  public void addVariable(String key, String value) {
    addVariable(key, value, false);
  }

  public void addVariable(String key, String value, boolean isExportFiled) {
    varMap.put(key, UicdGlobalVariableValue.create(value, isExportFiled));
  }

  public String getRawValue(String key) {
    return varMap.get(key).value();
  }

  public boolean isExportField(String key) {
    return varMap.get(key).exportField();
  }

  public void updateFromJson(String json) {}

  public String toJson() {
    return JsonUtil.toJson(this);
  }

  public HashMap<String, UicdGlobalVariableValue> fromJson(String jsonStr) {
    TypeReference<HashMap<String, UicdGlobalVariableValue>> typeRef
        = new TypeReference<HashMap<String, UicdGlobalVariableValue>>() {};
    return JsonUtil.fromJson(jsonStr, typeRef);
  }

  public void fillRawMapByJson(String jsonStr) {
    HashMap<String, UicdGlobalVariableValue> otherMap = fromJson(jsonStr);
    for (String key : otherMap.keySet()) {
      varMap.put(key, otherMap.get(key));
    }
  }

  public HashMap<String, UicdGlobalVariableValue> getRawMap() {
    return varMap;
  }

  @JsonAutoDetect(
      fieldVisibility = ANY,
      getterVisibility = NONE,
      setterVisibility = NONE,
      isGetterVisibility = NONE)
  @AutoValue
  abstract static class UicdGlobalVariableValue {

    abstract String value();

    abstract boolean exportField();

    @JsonCreator
    static UicdGlobalVariableValue create(
        @JsonProperty("value") String value, @JsonProperty("exportField") boolean exportField) {
      return new AutoValue_UicdGlobalVariableMap_UicdGlobalVariableValue(value, exportField);
    }
  }

}
