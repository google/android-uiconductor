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

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/**
 * UicdGlobalVariableShellUpdateUtil the helper function for updating globalvariable through shell
 * output.
 */
public class UicdGlobalVariableShellUpdateUtil {
  @JsonIgnore
  protected static Logger logger = LogManager.getLogManager().getLogger("uicd");

  public static void updateGlobalVariableMap(
      List<String> output, UicdGlobalVariableMap uicdGlobalVariableMap){
    // Process output from command line. We are looking for a str in the standard output like this:
    // 'uicd_shell_output:{"$uicd_var1": {"value": "app uicd", "exportFiled": false}}"
    StringBuilder sb = new StringBuilder();
    for (String s : output) {
      logger.info(s);
      if (UicdGlobalVariableMap.containsShellOutputKeyWord(s)) {
        String jsonContent = s;
        for (String keyWord : UicdGlobalVariableMap.SHELL_OUTPUT_KEYWORD_LIST) {
          jsonContent = s.replace(keyWord, "");
          // remove colon at the beginning of jsonContent
          if (jsonContent.startsWith(":")) {
            jsonContent = jsonContent.substring(1);
          }
        }
        // only allow keys that start with "$uicd" in the map.
        if (UicdGlobalVariableMap.containsGlobalVariableKeyWord(jsonContent)) {
          sb.append(jsonContent);
        } else {
          logger.warning(
              String.format("Keys should start with $uicd, instead found %s", jsonContent));
        }
      }
    }
    if (sb.length() > 0) {
      uicdGlobalVariableMap.fillRawMapByJsonOrPlainStr(sb.toString());
    }
  }

  private UicdGlobalVariableShellUpdateUtil() {}
}
