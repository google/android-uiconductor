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

/**
 * Uicd enum for pdbDebugger action code
 */
public enum PdbDebuggerActionCode {
  // go/keep-sorted start
  BREAK("BREAK"),
  CLEAR("CLEAR"),
  CONTINUE("CONTINUE"),
  NEXT("NEXT"),
  RUN("RUN"),
  STEP_IN("STEP_IN"),
  STOP("STOP"),
  UNKNOWN("UNKNOWN");
  // go/keep-sorted end

  PdbDebuggerActionCode(String actionCode) {
    this.actionCode = actionCode;
  }

  private final String actionCode;

  @JsonCreator
  public static PdbDebuggerActionCode fromString(String value) {
    for (PdbDebuggerActionCode pdbDebuggerActionCode : PdbDebuggerActionCode.values()) {
      if (pdbDebuggerActionCode.actionCode.equalsIgnoreCase(value)
          || pdbDebuggerActionCode.toString().equalsIgnoreCase(value)) {
        return pdbDebuggerActionCode;
      }
    }
    return PdbDebuggerActionCode.UNKNOWN;
  }

  public String getActionCode() {
    return actionCode;
  }
}

