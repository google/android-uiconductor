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

package com.google.uicd.backend.core.uicdactions.jsondbignores;

import com.fasterxml.jackson.databind.util.StdConverter;
import com.google.uicd.backend.core.constants.StopType;
import com.google.uicd.backend.core.uicdactions.ConditionClickAction;
import com.google.uicd.backend.core.uicdactions.LoopScreenContentValidationAction;
import com.google.uicd.backend.core.uicdactions.ScreenContentValidationAction;
import com.google.uicd.backend.core.uicdactions.ScrollScreenContentValidationAction;
import com.google.uicd.backend.core.uicdactions.ValidationAction;

/**
 * BaseSantinizer for Validation Action
 *
 * @author tccyp@google.com
 */
public class BaseSantinizer<T extends ValidationAction> extends StdConverter<T, T> {

  @Override
  public T convert(T validationAction) {
    if (validationAction == null || validationAction.getStopType() != null) {
      return validationAction;
    }

    validationAction.setStopType(
        validationAction.getStopWhenFalse()
            ? StopType.STOP_TEST_IF_FALSE
            : StopType.STOP_TEST_IF_TRUE);
    return validationAction;
  }

  // Old data has no StopType field. Initialize StopType from "stopWhenFalse".

  /** ConditionClickActionSantinizer */
  public static class ConditionClickActionSantinizer extends BaseSantinizer<ConditionClickAction> {}

  /** LoopScreenContentValidationActionSantinizer */
  public static class LoopScreenContentValidationActionSantinizer
      extends BaseSantinizer<LoopScreenContentValidationAction> {}

  /** ScreenContentValidationActionSantinizer */
  public static class ScreenContentValidationActionSantinizer
      extends BaseSantinizer<ScreenContentValidationAction> {}

  /** ScrollScreenContentValidationActionSantinizer */
  public static class ScrollScreenContentValidationActionSantinizer
      extends BaseSantinizer<ScrollScreenContentValidationAction> {}
}
