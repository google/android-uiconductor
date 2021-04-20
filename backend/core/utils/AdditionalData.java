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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/** The class for storing additional data belonging to workflow. */
@JsonIgnoreProperties(ignoreUnknown = true)
public class AdditionalData {
  private String version = "1";
  private String globalVariableStr = "";

  @JsonInclude(Include.NON_EMPTY)
  private String filePath = "";

  public String getFilePath() {
    return filePath;
  }

  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }

  public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }

  public String getGlobalVariableStr() {
    return globalVariableStr;
  }

  public void setGlobalVariableStr(String globalVariableStr) {
    this.globalVariableStr = globalVariableStr;
  }
}
