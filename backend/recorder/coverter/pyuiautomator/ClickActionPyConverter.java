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

import com.google.uicd.backend.core.uicdactions.ClickAction;
import com.google.uicd.backend.recorder.coverter.ActionConverter;

/** Implements the logic to convert clickaction to python related code */
public class ClickActionPyConverter implements ActionConverter<ClickAction, PyConvertContext> {
  private static final String RESOURCE_ID_CLICK_TEMPLATE = "d.res_id('%s').click()";
  private static final String TEXT_CLICK_TEMPLATE = "d.text('%s').click()";
  private static final String XPATH_CLICK_TEMPLATE = "d.xpath('%s').click()";
  private static final String RAW_XY_CLICK_TEMPLATE = "d.raw_xy(%d, %d).click()";

  @Override
  public boolean canConvert(ClickAction action, PyConvertContext context) {
    if (action.isRawXYClick() || action.isByElement()) {
      return true;
    }
    context.appendToDetailsLog("Click based NodeContext, can not convert. ");
    return false;
  }

  @Override
  public void convert(ClickAction action, PyConvertContext context) {
    if (!canConvert(action, context)) {
      return;
    }
    if (action.isByElement()) {
      String template = "";
      switch (action.getStrategy()) {
        case RESOURCEID:
          template = RESOURCE_ID_CLICK_TEMPLATE;
          break;
        case TEXT:
          template = TEXT_CLICK_TEMPLATE;
          break;
        case XPATH:
          template = XPATH_CLICK_TEMPLATE;
          break;
      }
      context.appendToContent(String.format(template, action.getSelector()));
    } else if (action.isRawXYClick()) {
      context.appendToContent(String.format(RAW_XY_CLICK_TEMPLATE, action.getSelector()));
    }
    return;
  }
}
