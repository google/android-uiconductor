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

/** Indicates different strategy of save the matching context */
public enum ContextStorageType {
  POSITION_BASED("positionBased"),
  CONTEXT_BASED("contextBased"),
  TEXT_BASED("textBased"),
  ID_BASED("idBased"),
  UNKNOWN("unknown");

  ContextStorageType(String contextStorageTypeStr) {
    this.contextStorageTypeStr = contextStorageTypeStr;
  }

  private final String contextStorageTypeStr;

  @JsonCreator
  public static ContextStorageType fromString(String value) {
    for (ContextStorageType contextStorageType : ContextStorageType.values()) {
      if (contextStorageType.contextStorageTypeStr.equalsIgnoreCase(value)
          || contextStorageType.toString().equalsIgnoreCase(value)) {
        return contextStorageType;
      }
    }
    return ContextStorageType.UNKNOWN;
  }

  public String getElementSelectorType() {
    return contextStorageTypeStr;
  }
}
