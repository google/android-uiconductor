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


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.google.uicd.backend.core.uicdactions.ActionExecutionResult;
import java.util.List;

/**
 * BaseActionDBIgnoreFields Ignore the actionExecution results when we store action the database.
 *
 * @author tccyp@google.com
 */
@SuppressWarnings("UnusedVariable")
public abstract class BaseActionDBIgnoreFields {

  @JsonIgnore
  protected List<ActionExecutionResult> actionExecutionResults;

  @JsonInclude(value = Include.CUSTOM, valueFilter = IsDirtyFilter.class)
  private boolean isDirty;

  @JsonInclude(value = Include.CUSTOM, valueFilter = DelayAfterActionMsFilter.class)
  private int delayAfterActionMs;

  @JsonInclude(Include.NON_DEFAULT)
  private String actionDescription;

  @JsonInclude(Include.NON_DEFAULT)
  private int deviceIndex;

  @JsonInclude(Include.NON_DEFAULT)
  protected boolean runAlways;

  @JsonInclude(Include.NON_DEFAULT)
  private String shareWith;
}

