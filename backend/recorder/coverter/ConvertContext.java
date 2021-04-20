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

package com.google.uicd.backend.recorder.coverter;

/** Defines the base class of convert context */
public class ConvertContext {

  private StringBuilder contentStrBuilder = new StringBuilder();

  private StringBuilder converterDetailsLogBuilder = new StringBuilder();

  public void appendToContent(String str) {
    contentStrBuilder.append(str + System.lineSeparator());
  }

  public String getConvertedContent() {
    return contentStrBuilder.toString();
  }

  public void appendToDetailsLog(String str) {
    converterDetailsLogBuilder.append(str);
  }

  // Ideally we should pass in deviceManager, since it is a generate anyway, to make it simple we
  // only support single device case for now. Always use current deviceWidth and Height
  public int deviceWidth;

  public int deviceHeight;
}
