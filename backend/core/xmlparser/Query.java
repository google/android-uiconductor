// Copyright 2020 Google LLC
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

package com.google.uicd.backend.core.xmlparser;

import java.util.List;

/** Query represents a nestable condition that can be matched with XML tree */
public class Query implements IPredicate {
  public static final String AND = "and";
  public static final String OR = "or";

  public String condition;
  public List<IPredicate> rules;

  Query(String condition, List<IPredicate> rules) {
    this.condition = condition;
    this.rules = rules;
  }

  @Override
  public boolean eval(NodeContext nodeContext) {
    for (IPredicate rule : rules) {
      boolean result = rule.eval(nodeContext);
      if (condition.equals(OR) && result) {
        return true;
      }
      if (condition.equals(AND) && !result) {
        return false;
      }
    }
    return condition.equals(AND);
  }
}
