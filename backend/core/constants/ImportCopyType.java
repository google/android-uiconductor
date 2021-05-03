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

package com.google.uicd.backend.core.constants;

import com.fasterxml.jackson.annotation.JsonCreator;

/** JsonFlag */
public enum ImportCopyType {
  SOFTCOPY("1"),
  HARDCOPY("2");

  ImportCopyType(String importTypeName) {
    this.importTypeName = importTypeName;
  }

  private final String importTypeName;

  @JsonCreator
  public static ImportCopyType fromString(String value) {
    for (ImportCopyType importType : ImportCopyType.values()) {
      if (importType.importTypeName.equalsIgnoreCase(value)
          || importType.toString().equalsIgnoreCase(value)) {
        return importType;
      }
    }
    return ImportCopyType.HARDCOPY;
  }

  public String getImportType() {
    return importTypeName;
  }
}
