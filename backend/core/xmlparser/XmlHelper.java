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

import com.google.uicd.backend.core.exceptions.UicdXMLFormatException;
import java.io.StringReader;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Queue;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

/** Helper class to access xmlparser */
public class XmlHelper {

  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");
  /**
   * Return NodeContext given the Position of a click action
   *
   * @param xmls UI xml string
   * @param pos position of a click action in UI streaming
   * @param xRatio x-resolution of real cell phone / x-resolution of streaming in UI
   * @param yRatio y-resolution of real cell phone / y-resolution of streaming in UI
   * @param ignoreDupResourceId whether to remove the duplicate resourceid (in the setting view), we
   *     should always remove it, however to make sure the old logic still work, when the flag is
   *     false, will use the exactly the old logic.
   */
  public static NodeContext getContextFromPos(
      List<String> xmls, Position pos, double xRatio, double yRatio, boolean ignoreDupResourceId) {
    XmlParser xmlParser = new XmlParser(xmls, xRatio, yRatio);
    Optional<NodeContext> smallestNode =
        xmlParser.findSmallestNode(xmlParser.getNodeContextsList(), pos, xRatio, yRatio);
    Optional<NodeContext> rootNode = xmlParser.findLowestMeaningfulNode(smallestNode);
    if (!rootNode.isPresent() || rootNode.get().getCountVal() == 0) {
      return NodeContext.createRawClickNodeContext(pos);
    }
    Optional<NodeContext> clickedNode = xmlParser.findLowestClickableNode(smallestNode);
    if (clickedNode.isPresent()) {
      clickedNode
          .get()
          .setRelativePos(clickedNode.get().getBounds().getCenter().getOffSetPosition(pos));
    }

    rootNode.get().setLeafNodeContext(clickedNode.get());
    rootNode.get().setRelativePos(rootNode.get().getBounds().getCenter().getOffSetPosition(pos));
    rootNode.get().setClickedPos(pos);
    if (ignoreDupResourceId) {
      removeNotUniqueResourceId(rootNode.get(), xmlParser);
      removeNotUniqueResourceId(rootNode.get().getLeafNodeContext(), xmlParser);
    }
    return rootNode.get();
  }

  public static NodeContext getContextFromPos(
      List<String> xmls, Position pos, double xRatio, double yRatio) {
    return getContextFromPos(xmls, pos, xRatio, yRatio, false);
  }

  /**
   * Return NodeContext given a Bounds
   *
   * @param xmls UI xml string
   * @param selectBounds the Bonds user selected from UI streaming
   * @param xRatio x-resolution of real cell phone / x-resolution of streaming in UI
   * @param yRatio y-resolution of real cell phone / y-resolution of streaming in UI
   */
  public static NodeContext getContextFromBound(
      List<String> xmls, Bounds selectBounds, double xRatio, double yRatio) {

    return getContextFromPos(xmls, selectBounds.getCenter(), xRatio, yRatio);
  }

  private static void setUniqueResourceIdFlag(XmlParser xmlParser, NodeContext nodeContext) {
    nodeContext.setUniqueResourceId(xmlParser.isUniqueResourceId(nodeContext.getResourceId()));
    for (NodeContext child : nodeContext.getChildren()) {
      setUniqueResourceIdFlag(xmlParser, child);
    }
  }

  public static NodeContext getMatchNodeContent(
      List<String> xmls, NodeContext savedRootNode, double xRatio, double yRatio) {
    XmlParser xmlParser = new XmlParser(xmls, xRatio, yRatio);
    setUniqueResourceIdFlag(xmlParser, savedRootNode);

    NodeContext candidateNodeContext = null;
    MatchResult matchResult;

    for (NodeContext nodeContext : xmlParser.getNodeContextsList()) {
      matchResult = savedRootNode.matchNode(nodeContext);
      logger.finer(nodeContext.toJsonStr());
      logger.finer(matchResult.toString());
      if (matchResult.getFinalResult() == MatchLevel.FULL_MATCH) {
        candidateNodeContext = nodeContext;
        break;
      }
      if (matchResult.getFinalResult() == MatchLevel.HIGH_MATCH) {
        candidateNodeContext = nodeContext;
      }
    }

    if (candidateNodeContext != null && savedRootNode.getLeafNodeContext() != null) {
      Optional<NodeContext> matchedLeafNode =
          xmlParser.findSmallestNode(
              xmlParser.getNodeContextsList(),
              candidateNodeContext.getBounds().getCenterWithOffset(savedRootNode.getRelativePos()),
              xRatio,
              yRatio);
      candidateNodeContext.setLeafNodeContext(matchedLeafNode.get());
    }
    return candidateNodeContext;
  }
  /**
   * Return a Position in UI streaming given a NodeContext
   *
   * @param xmlParser instance of xmlparser
   * @param savedRootNode saved NodeContext of a click action
   */
  public static Position getPosFromContext(XmlParser xmlParser, NodeContext savedRootNode) {

    // We want to make sure the resource id is unique in the new xml. There is a legacy bug that the
    // flag is always true;
    setUniqueResourceIdFlag(xmlParser, savedRootNode);
    // there is no context saved, click raw position
    if (savedRootNode.getIsRawXYPosition()) {
      return savedRootNode.getClickedPos();
    }

    NodeContext candidateNodeContext = null;
    MatchResult matchResult;

    for (NodeContext nodeContext : xmlParser.getNodeContextsList()) {
      matchResult = savedRootNode.matchNode(nodeContext);
      logger.config(nodeContext.toJsonStr());
      logger.config(matchResult.toString());
      if (matchResult.getFinalResult() == MatchLevel.FULL_MATCH) {

        candidateNodeContext = nodeContext;
        break;
      }
      if (matchResult.getFinalResult() == MatchLevel.HIGH_MATCH) {
        candidateNodeContext = nodeContext;
      }
    }

    if (candidateNodeContext != null) {
      candidateNodeContext.setRelativePos(savedRootNode.getRelativePos());

      // Try to match leaf
      Optional<NodeContext> matchedLeafNodeContext =
          findMatchedLeafNodeContext(candidateNodeContext, savedRootNode);

      if (matchedLeafNodeContext.isPresent()) {
        matchedLeafNodeContext
            .get()
            .setRelativePos(savedRootNode.getLeafNodeContext().getRelativePos());
        candidateNodeContext.setLeafNodeContext(matchedLeafNodeContext.get());
      }

      if (leafContextContentMatches(
          matchedLeafNodeContext.orElse(null), savedRootNode.getLeafNodeContext())) {
        return getFinalClickedPosition(candidateNodeContext);
      }
    }

    // Didn't find the nodeContext, try to find by text only
    candidateNodeContext = getNodeByTextOnly(xmlParser, savedRootNode);
    if (candidateNodeContext != null) {
      Position pos = candidateNodeContext.getBounds().getCenter();
      pos.confidentLevel = 1;
      return pos;
    }
    Position pos = new Position(0, 0);
    pos.confidentLevel = 0;
    return pos;
  }

  private static boolean leafContextContentMatches(
      NodeContext candiateLeafNodeContext, NodeContext savedLeafNodeContext) {
    if (candiateLeafNodeContext == null && savedLeafNodeContext == null) {
      return true;
    }

    // Same times save leaf node doesn't have much useful information (text/contentDesc), in this
    // case since we already found the "parent node", use parent node to get position.
    String candidateLeafContent =
        candiateLeafNodeContext == null ? "" : candiateLeafNodeContext.getFirstText();
    String savedLeafContent =
        savedLeafNodeContext == null ? "" : savedLeafNodeContext.getFirstText();

    return candidateLeafContent.trim().equalsIgnoreCase(savedLeafContent.trim());
  }

  private static NodeContext getNodeByTextOnly(XmlParser xmlParser, NodeContext savedRootNode) {
    String targetText = "";

    if (savedRootNode.getLeafNodeContext() != null) {
      targetText = savedRootNode.getLeafNodeContext().getFirstTextBottomUp();
    }
    if (targetText.isEmpty()) {
      targetText = savedRootNode.getFirstTextBottomUp();
    }
    return xmlParser.findNodeContextByText(targetText);
  }

  public static Position getPosFromContextXML(
      List<String> xmls, NodeContext saveRootNodeContext, double xRatio, double yRatio) {
    XmlParser xmlParser = new XmlParser(xmls, xRatio, yRatio);
    return getPosFromContext(xmlParser, saveRootNodeContext);
  }

  // BFS to get all the descent node under root (include root also)
  private static List<NodeContext> getAllDescentNode(NodeContext root) {
    List<NodeContext> retList = new ArrayList<>();
    Queue<NodeContext> queue = new ArrayDeque<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
      NodeContext cur = queue.poll();
      retList.add(cur);
      for (NodeContext child : cur.getChildren()) {
        queue.offer(child);
      }
    }
    return retList;
  }

  public static Position getFinalClickedPosition(NodeContext candidateNodeContext) {

    Position pos = getPosFromSingleNodeContext(candidateNodeContext);
    NodeContext leafNode = candidateNodeContext.getLeafNodeContext();
    if (leafNode == null || leafNode.getBounds() == null) {
      return pos;
    }

    return getPosFromSingleNodeContext(leafNode);
  }

  // Find the smallest clickable Node When savedRootNode is not the smallest one, and return the pos
  // relative to it.
  public static Optional<NodeContext> findMatchedLeafNodeContext(
      NodeContext candidateNodeContext, NodeContext savedRootNode) {
    if (savedRootNode.isClickedCurrentNode() || savedRootNode.getLeafNodeContext() == null) {
      return Optional.empty();
    }

    MatchResult matchResult;
    NodeContext leafClickedNodeContext = null;
    int fullMatchedCnt = 0;

    for (NodeContext nodeContext : getAllDescentNode(candidateNodeContext)) {
      matchResult = savedRootNode.getLeafNodeContext().matchNode(nodeContext);
      if (matchResult.getFinalResult() == MatchLevel.FULL_MATCH) {
        leafClickedNodeContext = nodeContext;
        fullMatchedCnt++;
      }
      if (matchResult.getFinalResult() == MatchLevel.HIGH_MATCH
          && fullMatchedCnt == 0) { // && matchResult.score > maxScore) {
        leafClickedNodeContext = nodeContext;
      }
    }

    // More than one child matched, or doesn't have leaf node.
    if (fullMatchedCnt > 1
        || leafClickedNodeContext == null
        || leafClickedNodeContext.getBounds() == null) {
      return Optional.empty();
    }

    Position pos = getPosFromSingleNodeContext(candidateNodeContext);
    if (leafClickedNodeContext.getBounds().isInCurrentBounds(pos)) {
      return Optional.of(leafClickedNodeContext);
    }
    return Optional.empty();
  }

  public static String getAttrByXpath(List<String> xmls, String xPathExp, String attributeName) {
    Node node = getNodeByXpathInAllLayers(xmls, xPathExp);
    if (node != null) {
      return node.getAttributes().getNamedItem(attributeName).getNodeValue();
    }
    return "";
  }

  public static Position getPosByXpath(
      List<String> xmls, String xPathExp, double xRatio, double yRatio) {
    Node node = getNodeByXpathInAllLayers(xmls, xPathExp);
    if (node != null) {
      String boundsStr = node.getAttributes().getNamedItem("bounds").getNodeValue();
      try {
        return Bounds.createBoundsFromString(boundsStr, xRatio, yRatio).getCenter();
      } catch (UicdXMLFormatException e) {
        logger.warning("Failed to get node by xpath." + e.getMessage());
      }
    }
    return new Position();
  }

  private static Node getNodeByXpathInAllLayers(List<String> xmls, String xPathExp) {
    for (String xml : xmls) {
      try {
        Node node = getNodeByXpath(xml, xPathExp);
        if (node != null) {
          return node;
        }
      } catch (Exception e) {
        logger.warning("Failed to get node by xpath." + e.getMessage());
      }
    }
    return null;
  }

  /* Using org.w3c.dom to fetch the node by xpath, in the xmlparser, we are using org.dom4j, however
   * the xpath feature in dom4j depends on org.jaxen, was not able to get it work with dom4j. Will
   * consolidate two xml library when we refactor XmlHelper and XmlParser.
   */
  private static Node getNodeByXpath(String xml, String xPathString) throws Exception {
    DocumentBuilder builder;
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    Document doc = null;

    try {
      builder = factory.newDocumentBuilder();
      doc = builder.parse(new InputSource(new StringReader(xml)));
    } catch (Exception e) {
      logger.warning("Failed to parse xml." + e.getMessage());
    }
    XPath xpathCompiler = XPathFactory.newInstance().newXPath();

    NodeList nodes =
        (NodeList) xpathCompiler.compile(xPathString).evaluate(doc, XPathConstants.NODESET);
    if (nodes.getLength() == 0) {
      return null;
    }
    return nodes.item(0);
  }

  private static Position getPosFromSingleNodeContext(NodeContext nodeContext) {
    return nodeContext.getBounds().getCenter().getOffSetPosition(nodeContext.getRelativePos());
  }

  private static void removeNotUniqueResourceId(NodeContext nodeContext, XmlParser xmlParser) {
    if (nodeContext == null) {
      return;
    }
    if (!xmlParser.isUniqueResourceId(nodeContext.getResourceId())) {
      nodeContext.setResourceId("");
    }
  }
}
