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

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.uicd.backend.core.constants.UicdConstant;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import org.w3c.dom.Element;

/**
 * The context of a clickable Node on which a user performs a action It is not the smallest
 * clickable Node when it does not contain enough information
 */
@JsonAutoDetect(
  fieldVisibility = ANY,
  getterVisibility = NONE,
  setterVisibility = NONE,
  isGetterVisibility = NONE
)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "uuid", scope = NodeContext.class)
@JsonDeserialize(converter = NodeContextSanitizer.class)
public class NodeContext {

  public NodeContext() {
    uuid = UUID.randomUUID().toString();
  }
  public NodeContext(String tmpUUID) {
    uuid = UUID.randomUUID().toString();
    this.tmpUUID = tmpUUID;
  }
  private String uuid = "";

  @JsonInclude(Include.NON_DEFAULT)
  private String displayText = "";

  private static final String REGULAR_EXPRESSION_DELIMITING = "[\\s,.|/]+";
  private boolean isUniqueResourceId;

  private List<NodeContext> children = new ArrayList<>();

  //fields from the xml

  @JsonInclude(Include.NON_DEFAULT)
  private String className = "";

  @JsonInclude(Include.NON_DEFAULT)
  private String resourceId = "";

  @JsonInclude(Include.NON_DEFAULT)
  private String text = "";

  @JsonInclude(Include.NON_DEFAULT)
  private String contentDesc = "";

  private boolean checked;
  private boolean isCheckableNode;
  private boolean isClickableNode;
  private boolean enabled;
  private Bounds bounds;
  private Position clickedPos;
  private Position relativePos;
  private boolean isRawXYPosition;
  private boolean isClickedCurrentNode;

  public List<NodeContext> getChildrenNodeContext() {
    return children;
  }

  // Only use xmlLayerIndex when recording an action to make sure we are recording the correct click
  // position. Otherwise, saveNodeContext can possibly save something in the wrong layer.
  private int xmlLayerIndex;

  @JsonDeserialize(using = LeafNodeDeserializer.class)
  private NodeContext leafNodeContext;
  private String firstText = "";

  @JsonIgnore private int depthVal = -1; // cached value

  @JsonIgnore private int countVal = -1; // cached value

  @JsonIgnore private NodeContext parentNode;

  @JsonIgnore private String tmpUUID;

  public static NodeContext createRawClickNodeContext(Position pos) {
    NodeContext nodeContext = new NodeContext();
    nodeContext.setIsRawXYPosition(true);
    nodeContext.setBounds(new Bounds(pos.x, pos.y, pos.x, pos.y));
    nodeContext.setClickedPos(pos);
    nodeContext.setRelativePos(pos);
    return nodeContext;
  }

  /**
   * Return a description about a Node
   */
  @JsonProperty("displayText")
  public String getDisplayEstimate() {
    NodeContext leafNodeContext = getLeafNodeContext();
    if (leafNodeContext != null) {
      String displayString = leafNodeContext.getFirstText();
      if (!displayString.isEmpty()) {
        return displayString;
      }
    }
    return getFirstText();
  }

  public void fromXmlNode(Element node, Bounds bounds) {
    fromXmlNode(node, bounds, new Position(0, 0), new Position(0, 0));
  }

  public void fromXmlNode(Element node, Bounds bounds, Position clickedPos, Position relativePos) {
    if (node.hasAttribute(UicdConstant.PROPERTY_NAME_RESOURCE_ID)) {
      setResourceId(node.getAttribute(UicdConstant.PROPERTY_NAME_RESOURCE_ID));
    }

    if (node.hasAttribute(UicdConstant.PROPERTY_NAME_TEXT)) {
      setText(node.getAttribute(UicdConstant.PROPERTY_NAME_TEXT));
    }

    if (node.hasAttribute(UicdConstant.PROPERTY_NAME_CLASS)) {
      setClassName(node.getAttribute(UicdConstant.PROPERTY_NAME_CLASS));
    }

    if (node.hasAttribute(UicdConstant.PROPERTY_NAME_CONTENT_DESCRIPTION)) {
      setContentDesc(node.getAttribute(UicdConstant.PROPERTY_NAME_CONTENT_DESCRIPTION));
    }

    if (node.hasAttribute(UicdConstant.PROPERTY_NAME_CHECKED)) {
      setChecked(Boolean.parseBoolean(node.getAttribute(UicdConstant.PROPERTY_NAME_CHECKED)));
      setCheckableNode(true);
    }

    if (node.hasAttribute(UicdConstant.PROPERTY_NAME_CLICKABLE)) {
      setClickableNode(
          Boolean.parseBoolean(node.getAttribute(UicdConstant.PROPERTY_NAME_CLICKABLE)));
    }

    if (node.hasAttribute(UicdConstant.PROPERTY_NAME_ENABLED)) {
      setEnabled(Boolean.parseBoolean(node.getAttribute(UicdConstant.PROPERTY_NAME_ENABLED)));
    }

    this.setBounds(bounds);
    this.setClickedPos(clickedPos);
    this.setRelativePos(relativePos);
    setChildren(new ArrayList<>());
  }

  /**
   * Compute the score for two string arrays, which describes their similarity
   */
  public double getStrArrayScore(String[] array1, String[] array2) {
    if (array1.length == 0 || array2.length == 0) {
      return 0;
    }

    Set<String> setArr1 = new HashSet<>();
    Set<String> setArr2 = new HashSet<>();

    for (String str : array1) {
      setArr1.add(str.trim());
    }

    Collections.addAll(setArr2, array2);

    Set<String> intersectListSet = new HashSet<>(setArr1);
    intersectListSet.retainAll(setArr2);
    return intersectListSet.size() / Math.max(setArr1.size(), setArr2.size()) * 1.0;
  }

  public boolean isSameField(String field1, String otherField) {
    if (field1 == null || otherField == null) {
      return false;
    }

    if (field1.isEmpty() || otherField.isEmpty()) {
      return false;
    }

    if (field1.trim().equals(otherField.trim())) {
      return true;
    }
    return false;
  }

  /*
   * isKeyNode
   * key node is the node that has either unique resource-id or text/content
   */
  public boolean isKeyNode() {
    if (isUniqueResourceId) {
      return true;
    } else if (!text.isEmpty()) {
      return true;
    } else if (!contentDesc.isEmpty()) {
      return true;
    }
    return false;
  }

  /*
   * getDepthVal
   * use this function to determine that how many levels in the tree has meaningful node we can use.
   */
  public int getDepthVal() {
    if (depthVal >= 0) {
      return depthVal;
    }
    int dVal = 0;
    if (this.isKeyNode()) {
      dVal += 1;
    }
    int maxChildDepthVal = 0;
    for (NodeContext child : this.children) {
      if (child != null) {
        maxChildDepthVal = Math.max(maxChildDepthVal, child.getDepthVal());
      }
    }
    dVal += maxChildDepthVal;
    depthVal = dVal;
    return dVal;
  }

  /*
   * getCountVal
   * use this function to determine that how many meaningful node we have in current tree.
   */
  public int getCountVal() {
    if (countVal >= 0) {
      return countVal;
    }
    int cVal = 0;
    if (this.isKeyNode()) {
      cVal += 1;
    }
    for (NodeContext child : this.children) {
      cVal += child.getCountVal();
    }
    countVal = cVal;
    return cVal;
  }

  public boolean isSimilarField(String field1, String otherField) {
    if (field1.isEmpty() || otherField.isEmpty()) {
      return false;
    }
    return getStrArrayScore(
        field1.split(REGULAR_EXPRESSION_DELIMITING),
        otherField.split(REGULAR_EXPRESSION_DELIMITING))
        > 0.8;
  }

  /**
   * Returns true if either root node or any of its children evaluates
   * correct with given query.
   * Example:
   * Query:
   * {
   *   "condition": "and",
   *   "rules": [
   *     {"field": "resourceId", "operator": "=", "value": "com.android.sample:SampleId"},
   *     {"field": "text", "operator": "=", "value": "Sample Text"},
   *   ],
   * }
   * NodeContext:
   *  resourceId = "com.android.sample:SampleId"
   *  text = "Sample Text"
   *  children = null
   * matches: true
   * If any of the fields were to be changed this would return false, also if any of the children
   * matches the query this would return true.
   */
  public boolean matchQuery(Query query) {
    boolean result = query.eval(this);
    if (result) {
      return true;
    }
    for (NodeContext child : this.children) {
      if (child.matchQuery(query)) {
        return true;
      }
    }
    return false;
  }

  public MatchResult matchNode(NodeContext nodeContext) {

    MatchResult matchResult = new MatchResult();

    // first case, has unique resource id
    if (this.isUniqueResourceId) {
      // if resource id matches, it is a full match
      if (this.resourceId.equals(nodeContext.resourceId)) {
        matchResult.resourceIdMatchResult = MatchLevel.FULL_MATCH;
        matchResult.matchNodeCnt += this.getCountVal();
        return matchResult;
      } else { // resource id doesn't match, want to check the test, just in case resid changed
        matchResult.resourceIdMatchResult = MatchLevel.NOT_MATCH;
      }
    }

    // second case, compare root text
    if (this.isKeyNode()) {
      if (this.isContentAndTextMatch(nodeContext)) {
        matchResult.matchNodeCnt += 1;
        matchResult.textAndContentMatchResult = MatchLevel.FULL_MATCH;
      }
    } else {
      // third case, only one text filed, we only need compare the display text
      if (this.getCountVal() == 1) {
        if (this.isContentAndTextMatch(nodeContext)) {
          matchResult.matchNodeCnt += 1;
          matchResult.textAndContentMatchResult = MatchLevel.HIGH_MATCH;
        }
      }

      int childrenMatchCnt = 0;
      for (int i = 0; i < children.size(); i++) {
        NodeContext srcChildNode = children.get(i);
        if (srcChildNode.getCountVal() == 0) { // ignore those no-text node
          continue;
        }
        for (int j = 0; j < nodeContext.getChildren().size(); j++) {
          NodeContext targetChildNode = nodeContext.children.get(j);
          if (targetChildNode.getCountVal() == 0) {
            continue;
          }
          MatchResult childMatchResult = srcChildNode.matchNode(targetChildNode);
          childrenMatchCnt += childMatchResult.matchNodeCnt;
        }
      }
      matchResult.matchNodeCnt += childrenMatchCnt;
      int maxChildCnt =
          Math.max(this.getCountVal(), nodeContext.getCountVal())
              - (this.isKeyNode() ? 1 : 0); // exclude itself

      if (maxChildCnt == 0) { // nothing to match
        matchResult.childrenMatchResult = MatchLevel.UNKNOWN;
      } else if (childrenMatchCnt == maxChildCnt) {
        matchResult.childrenMatchResult = MatchLevel.FULL_MATCH;
      } else if (childrenMatchCnt > maxChildCnt / 2) {
        matchResult.childrenMatchResult = MatchLevel.HIGH_MATCH;
      } else if (childrenMatchCnt > 0) {
        matchResult.childrenMatchResult = MatchLevel.LOW_MATCH;
      } else {
        matchResult.childrenMatchResult = MatchLevel.UNKNOWN;
      }
    }
    // In some cases, parent node has same text as child node, we need do additional size match
    // if the size is off by 30%, downgrade the rating
    if (this.getBounds().isSimilarSize(nodeContext.getBounds())) {
      matchResult.sizeMatchResult = MatchLevel.FULL_MATCH;
    } else {
      matchResult.sizeMatchResult = MatchLevel.LOW_MATCH;
    }
    return matchResult;
  }

  public void addChild(NodeContext nodeContext) {
    this.children.add(nodeContext);
  }

  public boolean getIsRawXYPosition() {
    return isRawXYPosition;
  }

  public void setIsRawXYPosition(boolean rawXYPosition) {
    this.isRawXYPosition = rawXYPosition;
  }

  public String getResourceId() {
    return resourceId;
  }

  public void setResourceId(String resourceId) {
    this.resourceId = resourceId;
  }

  public boolean isChecked() {
    return checked;
  }

  public void setChecked(boolean checked) {
    this.checked = checked;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public String toJsonStr() {
    String jsonStr = "";
    try {
      jsonStr = new ObjectMapper().writeValueAsString(this);
    } catch (JsonProcessingException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return jsonStr;
  }

  public boolean isUniqueResourceId() {
    return isUniqueResourceId;
  }

  public void setUniqueResourceId(boolean uniqueResourceId) {
    isUniqueResourceId = uniqueResourceId;
  }

  public List<NodeContext> getChildren() {
    return children;
  }

  public void setChildren(List<NodeContext> children) {
    for (NodeContext child : children) {
      child.setParentNode(this);
    }
    this.children = children;
  }

  public String getClassName() {
    return className;
  }

  public void setClassName(String className) {
    this.className = className;
  }

  public String getContentDesc() {
    return contentDesc;
  }

  public void setContentDesc(String contentDesc) {
    this.contentDesc = contentDesc;
  }

  public Position getClickedPos() {
    return clickedPos;
  }

  public void setClickedPos(Position clickedPos) {
    this.clickedPos = clickedPos;
  }

  public Position getRelativePos() {
    return relativePos;
  }

  public void setRelativePos(Position relativePos) {
    this.relativePos = relativePos;
  }

  public boolean isCheckableNode() {
    return isCheckableNode;
  }

  public void setCheckableNode(boolean checkableNode) {
    isCheckableNode = checkableNode;
  }

  public Bounds getBounds() {
    return bounds;
  }

  public void setBounds(Bounds bounds) {
    this.bounds = bounds;
  }

  public boolean isClickedCurrentNode() {
    return isClickedCurrentNode;
  }

  public void setClickedCurrentNode(boolean clickedCurrentNode) {
    isClickedCurrentNode = clickedCurrentNode;
  }

  public NodeContext getLeafNodeContext() {
    return leafNodeContext;
  }

  public void setLeafNodeContext(NodeContext leafNodeContext) {
    this.leafNodeContext = leafNodeContext;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  /*
   * try to match the text and contentDesc, sometime on different version, the "text" is in the
   * text field, but in different version, text might in the contextDesc field.
   */
  public boolean isContentAndTextMatch(NodeContext nodeContext) {
    if (text.isEmpty() && contentDesc.isEmpty()) {
      return false;
    }

    // ensure same text can be found within both node context trees
    // still doesn't technically guarantee a perfect match, but provides more confidence
    boolean displayEstimateFound = nodeContext.findNodeByText(getDisplayEstimate()) != null;

    // text is empty or same as contentDesc, only need validate contentDesc field
    if (text.isEmpty() || text.equalsIgnoreCase(contentDesc)) {
      return (contentDesc.equalsIgnoreCase(nodeContext.text)
              || contentDesc.equalsIgnoreCase(nodeContext.contentDesc))
          && displayEstimateFound;
    } else if (contentDesc.isEmpty()) {
      return (text.equalsIgnoreCase(nodeContext.text)
              || text.equalsIgnoreCase(nodeContext.contentDesc))
          && displayEstimateFound;
    } else {
      return text.equalsIgnoreCase(nodeContext.text)
          && contentDesc.equalsIgnoreCase(nodeContext.contentDesc)
          && displayEstimateFound;
    }
  }

  public String getFirstTextBottomUp() {
    NodeContext cur = this;
    while (cur != null) {
      if (cur.getCountVal() >= 1) {
        return getFirstText();
      }
      cur = cur.parentNode;
    }
    return "";
  }

  public String getFirstText() {
    if (!firstText.isEmpty()) {
      return firstText;
    }
    if (!text.isEmpty()) {
      firstText = text;
      return text;
    } else if (!contentDesc.isEmpty()) {
      firstText = contentDesc;
      return contentDesc;
    } else {
      for (NodeContext child : getChildren()) {
        String childDisplayString = child.getDisplayEstimate();
        if (!childDisplayString.isEmpty()) {
          firstText = childDisplayString;
          return childDisplayString;
        }
      }
    }
    return "";
  }

  public NodeContext findNodeByUUID(String uuid) {
    if (this.uuid.equals(uuid)) {
      return this;
    }
    NodeContext ret = null;
    for (NodeContext child : this.children) {
      ret = child.findNodeByUUID(uuid);
      if (ret != null) {
        return ret;
      }
    }
    return null;
  }

  public NodeContext findNodeByText(String targetText) {
    if (this.text.equalsIgnoreCase(targetText) || this.contentDesc.equalsIgnoreCase(targetText)) {
      return this;
    } else {
      NodeContext ret = null;

      for (NodeContext child : this.children) {
        ret = child.findNodeByText(targetText);
        if (ret != null) {
          return ret;
        }
      }
    }
    return null;
  }

  public NodeContext findNodeByCheckStatus(boolean checked) {
    if (UicdConstant.TOGGLE_BUTTONS.contains(className) && this.checked == checked) {
      return this;
    }

    NodeContext ret;
    for (NodeContext child : this.children) {
      ret = child.findNodeByCheckStatus(checked);
      if (ret != null) {
        return ret;
      }
    }

    return null;
  }

  public NodeContext findNodeByResId(String targetResId) {
    if (this.resourceId.equals(targetResId)) {
      return this;
    } else {
      NodeContext ret = null;
      for (NodeContext child : this.children) {
        ret = child.findNodeByResId(targetResId);
        if (ret != null) {
          return ret;
        }
      }
    }
    return null;
  }

  public String getDisplayText() {
    return displayText;
  }

  public void setDisplayText(String displayText) {
    this.displayText = displayText;
  }

  public NodeContext getParentNode() {
    return parentNode;
  }

  public void setParentNode(NodeContext parentNode) {
    this.parentNode = parentNode;
  }

  public boolean isClickableNode() {
    return isClickableNode;
  }

  public void setClickableNode(boolean clickableNode) {
    isClickableNode = clickableNode;
  }

  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  public String getTmpUUID() {
    return tmpUUID;
  }

  public void setXmlLayerIndex(int xmlLayerIndex) {
    this.xmlLayerIndex = xmlLayerIndex;
  }

  public int getXmlLayerIndex() {
    return xmlLayerIndex;
  }
}
