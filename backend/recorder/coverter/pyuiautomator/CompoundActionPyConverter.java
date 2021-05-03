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

import com.google.uicd.backend.core.uicdactions.BaseAction;
import com.google.uicd.backend.core.uicdactions.CompoundAction;
import com.google.uicd.backend.recorder.coverter.ActionConverter;

/** Defines the Compound Action py Converter */
public class CompoundActionPyConverter
    implements ActionConverter<CompoundAction, PyConvertContext> {

  @Override
  public boolean canConvert(CompoundAction action, PyConvertContext context) {
    return true;
  }

  @Override
  public void convert(CompoundAction action, PyConvertContext context) {
    for (BaseAction baseAction : action.childrenActions) {
      ActionConverter actionConverter = PyConverterFactory.getConverter(baseAction);
      actionConverter.convert(baseAction, context);
    }
  }
}
