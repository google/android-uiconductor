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

package com.google.uicd.backend.core.globalvariables;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.google.auto.value.AutoValue;
import com.google.common.base.Splitter;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.utils.JsonUtil;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/**
 * UicdGlobalVariableMap Store all the global value of uicd in this map, using this map to
 * communicate" between different step. And also using this one to pass value to outside system.
 */
/** Jackson auto detect. */
@JsonAutoDetect(
    fieldVisibility = ANY,
    getterVisibility = NONE,
    setterVisibility = NONE,
    isGetterVisibility = NONE)
public class UicdGlobalVariableMap {
  @JsonIgnore protected Logger logger = LogManager.getLogManager().getLogger("uicd");
  public static final List<String> PARAM_KEYWORD_LIST =
      new ArrayList<>(Arrays.asList("$nuwa_", "$uicd_"));
  public static final String UICD_VAR_PREFIX = "$uicd_";

  // For the shell output there is no '$' before the keyword, otherwise it will conflict with logic
  // of global variable. It will treat this line as global variable and try to replace it. Most of
  // the case should be fine.
  public static final List<String> SHELL_OUTPUT_KEYWORD_LIST =
      new ArrayList<>(Arrays.asList("nuwa_shell_output", "uicd_shell_output"));

  public static final String OCR_ENABLE_KEYWORD = "OCR_ENABLED";

  private static final String DEVICEID_PARAM_KEYWORD = "deviceid";
  private static final String ADB_PATH_PARAM_KEYWORD = "adb_path";
  private static final String OUTPUT_PATH_KEYWORD = "output_path";
  private static final String INPUT_PATH_KEYWORD = "input_path";

  private static final String KEY_VALUE_SPLITTER = "=";
  private static final String VARIABLE_SPLITTER = "[,|\\r?\\n]";

  // Used by MH driver
  public static final String UICD_GLOBAL_KEY_SPONGE_LINK = "$uicd_sponge_link";
  public static final String UICD_GLOBAL_KEY_SPONGE_ID = "$uicd_sponge_id";

  // There are a few reserved variables in UIConductor, need initialize here. However since there
  // are some old workflows still using our old name "nuwa", we need support both so that won't
  // break the workflow.
  public UicdGlobalVariableMap() {
    PARAM_KEYWORD_LIST.stream().forEach(s -> initReservedVariables(s));
  }

  private final HashMap<String, UicdGlobalVariableValue> varMap = new HashMap<>();

  public void initReservedVariables(String prefix) {
    varMap.put(
        prefix + ADB_PATH_PARAM_KEYWORD,
        UicdGlobalVariableValue.create(UicdConfig.getInstance().getAdbShellPath(), true));
    varMap.put(
        prefix + OUTPUT_PATH_KEYWORD,
        UicdGlobalVariableValue.create(UicdConfig.getInstance().getTestOutputFolder(), true));
    varMap.put(
        prefix + INPUT_PATH_KEYWORD,
        UicdGlobalVariableValue.create(UicdConfig.getInstance().getTestInputFolder(), true));

    // By default enable OCR, user can turn off by set the global variable later.
    varMap.put(OCR_ENABLE_KEYWORD, UicdGlobalVariableValue.create("true", true));
  }

  public void addVariable(String key, String value) {
    addVariable(key, value, false);
  }

  public void addVariable(String key, String value, boolean isExportFiled) {
    if (!key.startsWith(UICD_VAR_PREFIX)) {
      key = UICD_VAR_PREFIX + key;
    }
    varMap.put(key, UicdGlobalVariableValue.create(value, isExportFiled));
  }

  public String getRawValue(String key) {
    return varMap.get(key).value();
  }

  public String toJson() {
    return JsonUtil.toJson(this);
  }

  public HashMap<String, UicdGlobalVariableValue> fromJson(String jsonStr) {
    TypeReference<HashMap<String, UicdGlobalVariableValue>> typeRef =
        new TypeReference<HashMap<String, UicdGlobalVariableValue>>() {};
    return JsonUtil.fromJson(jsonStr, typeRef);
  }

  public void fillRawMapByJsonOrPlainStr(String jsonStr) {
    if (jsonStr.isEmpty()) {
      return;
    }
    HashMap<String, UicdGlobalVariableValue> otherMap = fromJson(jsonStr);
    if (otherMap != null) { // Try json format first.
      varMap.putAll(otherMap);
    } else {
      logger.info("Try to parse as plain string format:" + jsonStr);
      fromStringFormat(jsonStr);
    }
  }

  public HashMap<String, UicdGlobalVariableValue> getRawMap() {
    return varMap;
  }

  public static boolean containsGlobalVariableKeyWord(String str) {
    return PARAM_KEYWORD_LIST.stream().anyMatch(s -> str.contains(s));
  }

  public static boolean containsShellOutputKeyWord(String str) {
    return SHELL_OUTPUT_KEYWORD_LIST.stream().anyMatch(s -> str.contains(s));
  }

  public static String getUicdDeviceidParamKeyword(String prefix) {
    return prefix + DEVICEID_PARAM_KEYWORD;
  }

  private void fromStringFormat(String globalVarStr) {
    Iterable<String> valueArr = Splitter.onPattern(VARIABLE_SPLITTER).split(globalVarStr);
    for (String str : valueArr) {
      List<String> keyValueArr = Splitter.onPattern(KEY_VALUE_SPLITTER).splitToList(str);
      if (keyValueArr.size() != 2) {
        continue;
      }
      String key = keyValueArr.get(0).trim();
      if (varMap.containsKey(key) && varMap.get(key).exportField()) {
        continue;
      }
      varMap.put(key, UicdGlobalVariableValue.create(keyValueArr.get(1).trim(), false));
    }
  }

  /** Defines the uicd global variable value */
  @JsonAutoDetect(
      fieldVisibility = ANY,
      getterVisibility = NONE,
      setterVisibility = NONE,
      isGetterVisibility = NONE)
  @AutoValue
  public abstract static class UicdGlobalVariableValue {

    abstract String value();

    abstract boolean exportField();

    @JsonCreator
    static UicdGlobalVariableValue create(
        @JsonProperty("value") String value, @JsonProperty("exportField") boolean exportField) {
      return new AutoValue_UicdGlobalVariableMap_UicdGlobalVariableValue(value, exportField);
    }
  }
}
