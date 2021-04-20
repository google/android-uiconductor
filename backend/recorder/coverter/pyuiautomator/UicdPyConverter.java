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

package com.google.uicd.backend.recorder.coverter.pyuiautomator;

import com.google.uicd.backend.core.uicdactions.CompoundAction;

/** Implments the main convert logic for Uicd to Python */
public class UicdPyConverter {
  private static final String PY_COMMON_TEMPLATE =
      "from python_uiautomator.device import Device \n\nd = Device('', 'adb')\n\n";

  public static String convert(CompoundAction workflow) {
    PyConvertContext convertContext = new PyConvertContext();
    convertContext.appendToContent(PY_COMMON_TEMPLATE);
    CompoundActionPyConverter compoundActionPyConverter = new CompoundActionPyConverter();
    compoundActionPyConverter.convert(workflow, convertContext);
    return convertContext.getConvertedContent();
  }
}
