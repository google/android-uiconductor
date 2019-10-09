// Copyright 2019 Google LLC
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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.uicd.backend.core.uicdactions.BaseAction;
import java.util.List;

/**
 * CompoundActionDBIgnoreFields for the compound action we will only store the reference of the
 * children action in the database.
 *
 * @author tccyp@google.com
 */
public abstract class CompoundActionDBIgnoreFields {

  @JsonIgnore
  public List<BaseAction> childrenActions;
}
