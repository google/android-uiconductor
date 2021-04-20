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
import com.google.uicd.backend.recorder.coverter.ActionConverter;

/** Defines EmptyPyConverter which is just a place holder */
public class EmptyPyConverter implements ActionConverter<BaseAction, PyConvertContext> {

  @Override
  public boolean canConvert(BaseAction action, PyConvertContext context) {
    return false;
  }

  @Override
  public void convert(BaseAction action, PyConvertContext context) {
    // Just act as place holder.
    return;
  }
}
