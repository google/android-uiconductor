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

package com.google.uicd.backend.core.xmlparser;

import com.fasterxml.jackson.databind.util.StdConverter;

/**
 * NodeContextSanitizer
 * additional step for set the realLeaf.
 */
public class NodeContextSanitizer extends StdConverter<NodeContext, NodeContext> {
  @Override
  public NodeContext convert(NodeContext nodeContext) {

    if (nodeContext == null) {
      return null;
    }
    if (nodeContext.getLeafNodeContext() == null) {
      return nodeContext;
    }
    NodeContext realLeaf =
        nodeContext.findNodeByUUID(nodeContext.getLeafNodeContext().getTmpUUID());
    nodeContext.setLeafNodeContext(realLeaf);
    return nodeContext;
  }
}