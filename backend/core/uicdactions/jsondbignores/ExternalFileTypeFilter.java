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

import com.google.uicd.backend.core.uicdactions.ActionExecutionResult.ExternalFileType;

/**
 * Sets the filter for ExternalFileTypeFilter in ActionExecutionResult, if an action has this value
 * then it will not be loaded in Sponge.
 */
@SuppressWarnings("EqualsHashCode")
public class ExternalFileTypeFilter {

  @Override
  public boolean equals(Object object) {
    if (object == null) {
      return false;
    }
    if (!(object instanceof ExternalFileType)) {
      return false;
    }
    return ((ExternalFileType) object) == ExternalFileType.NA;
  }
}
