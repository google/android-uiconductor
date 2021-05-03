#!/usr/bin/python
#
# Copyright 2021 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Lint as: python3
"""XmlParser class for uicd-uiautomator.

  It supports xml parsing functionality.
"""
import collections
import json
import logging
import re
import sys
import xml.etree.ElementTree as ET
from .constant import DirectionType
from .constant import MatchOption
from .constant import PARSER_DICT_FILLER_VALUE
from .point import Point
from .ui_selector import LocatorType
from .utils import get_element_bounds
from .utils import is_down
from .utils import is_left
from .utils import is_right
from .utils import is_up


class XmlParser():
  """XmlParser for python-uiautomator.

  Attributes:
    parent_map: a map which contains node's parent info.
    xml_trees: the parsed xml_tree which contains all xml info.
  """

  def __init__(self, dumped_xml):
    self.parent_map = {}
    ui_json = json.loads(dumped_xml)
    xml_trees = []
    for i in range(0, int(ui_json["xml_count"])):
      tree = ET.fromstring(ui_json["value"]["xml" + str(i)].encode("utf-8"))
      xml_trees.append(tree)
      parent_map = {}
      for p in tree.iter():
        for c in p:
          parent_map.update({c: p})
      self.parent_map.update(parent_map)
    self.xml_trees = xml_trees

  def find_first_element_by_selector(self, selector):
    """Find the first element based on the selector.

    Args:
      selector: UiSelector which needs to be parsed to an element.

    Returns:
      The first xmlNode element that matches the selector.
    """
    elements = self.find_elments_by_selector(selector)
    if len(elements) <= 0:
      return None
    if sys.version_info[0] <= 2:
      return elements.keys()[0]
    else:
      return list(elements.keys())[0]

  def find_elments_by_selector(self, selector):
    """Find the elments based on the selector.

    Args:
      selector: UiSelector which needs to be parsed to an element.

    Returns:
      OrderedDict of xmlNode that match the selector.
    """

    target_node_dict = collections.OrderedDict()
    filtered_target_node_dict = collections.OrderedDict()
    for xml_root in self.xml_trees:
      for el in xml_root.iter():
        target_node_dict[el] = PARSER_DICT_FILLER_VALUE

    # start parsing locator
    for loc in selector.locator:
      loc_key = loc[0]
      loc_value = loc[1]
      for node in target_node_dict:
        if loc_key == LocatorType.ATTRIBUTE:
          match_option = loc[1]
          attrib_key = loc[2]
          attrib_value = loc[3]
          if match_option is None:
            xpath = ".//*[@{attrib_key}='{attrib_value}']".format(
                attrib_key=attrib_key, attrib_value=attrib_value)
            if node.get(attrib_key) == attrib_value:
              filtered_target_node_dict[node] = PARSER_DICT_FILLER_VALUE
            nodes = node.findall(xpath)
            for filtered_node in nodes:
              filtered_target_node_dict[
                  filtered_node] = PARSER_DICT_FILLER_VALUE
          else:
            if match_option == MatchOption.START_WITH:
              regex = re.compile("^" + attrib_value.lower() + ".*")
            elif match_option == MatchOption.END_WITH:
              regex = re.compile(".*" + attrib_value.lower() + "$")
            elif match_option == MatchOption.CONTAINS:
              regex = re.compile(".*" + attrib_value.lower() + ".*")
            elif match_option == MatchOption.REGEX:
              regex = re.compile(attrib_value)
            filtered_target_node_dict.update(
                self.find_node_with_regex(node, regex, attrib_key))
        elif loc_key == LocatorType.PARENT:
          filtered_node = self.parent_map.get(node)
          if filtered_node is not None:
            filtered_target_node_dict[filtered_node] = PARSER_DICT_FILLER_VALUE
        elif loc_key == LocatorType.CUSTOM_MATCHER:
          if loc_value(node):
            filtered_target_node_dict[node] = PARSER_DICT_FILLER_VALUE
        elif loc_key == LocatorType.CHILD:
          if int(loc_value) == -1:
            for child in node.iter():
              filtered_target_node_dict[child] = PARSER_DICT_FILLER_VALUE
          else:
            filtered_target_node_dict[self.get_child(
                node, int(loc_value))] = PARSER_DICT_FILLER_VALUE
        elif loc_key == LocatorType.SIBLING:
          filtered_target_node_dict[self.get_sibling(
              node)] = PARSER_DICT_FILLER_VALUE
        elif loc_key == LocatorType.DIRECTION:
          for xml_root in self.xml_trees:
            for el in xml_root.iter():
              if loc_value == DirectionType.LEFT and is_left(node, el):
                filtered_target_node_dict[el] = PARSER_DICT_FILLER_VALUE
              elif loc_value == DirectionType.RIGHT and is_right(node, el):
                filtered_target_node_dict[el] = PARSER_DICT_FILLER_VALUE
              elif loc_value == DirectionType.UP and is_up(node, el):
                filtered_target_node_dict[el] = PARSER_DICT_FILLER_VALUE
              elif loc_value == DirectionType.DOWN and is_down(node, el):
                filtered_target_node_dict[el] = PARSER_DICT_FILLER_VALUE
        elif loc_key == LocatorType.INDEX:
          if len(target_node_dict) < int(loc_value):
            logging.warning("Trying to access an index thats out of bounds")
          else:
            # dict.keys in python3 returns KeysView instead of a iterable, hence
            # a wrapping is needed here.
            if sys.version_info[0] <= 2:
              indexed_node = target_node_dict.keys()[int(loc_value) - 1]
            else:
              indexed_node = list(target_node_dict.keys())[int(loc_value) - 1]
            filtered_target_node_dict[indexed_node] = PARSER_DICT_FILLER_VALUE

      target_node_dict = filtered_target_node_dict
      filtered_target_node_dict = collections.OrderedDict()

    return target_node_dict

  def find_node_with_regex(self, node, regex, key):
    """Gets matched node set with given regex.

    Args:
      node: UiSelector which needs to be parsed to an element.
      regex: regex expression
      key: the field that will be searched

    Returns:
      OrderedDict of xmlNode that match the regex expression.
    """
    filtered_target_node_set = collections.OrderedDict()
    nodes = node.findall(".//*[@{}]".format(key))
    # Also include itself for the chain operations

    if node.get(key) is not None:
      nodes.append(node)
    for target_node in nodes:
      text = target_node.get(key).lower()
      if regex.match(text):
        filtered_target_node_set[target_node] = PARSER_DICT_FILLER_VALUE
    return filtered_target_node_set

  def get_child(self, node, n):
    """Gets the nth child of a given target_node.

    Args:
      node: UiSelector which needs to be parsed to an element.
      n: child index

    Returns:
      The nth child of the current node if it has one.
    """
    if len(node) < n + 1:
      return None
    return node[n]

  def get_sibling(self, node):
    """Gets the sibling of a given node.

    Args:
      node: target node.

    Returns:
      The sibling of the given node if it has one.
    """
    parent = self.parent_map.get(node)
    found_current = False
    for child in parent:
      if found_current:
        return child
      if child == node:
        found_current = True
    return None

  def get_position_by_selector(self, selector):
    """Gets the element by the selector and return the center position.

    Args:
      selector: UiSelector which needs to be parsed to an element.

    Returns:
      The center of the first node that matches the selector
    """
    [x1, y1, x2, y2] = self.get_bounds_by_selector(selector)
    return Point(int((x1 + x2) / 2), int((y1 + y2) / 2))

  def get_bounds_by_selector(self, selector):
    """Gets the element by the selector and return the bounds.

    Args:
      selector: UiSelector which needs to be parsed to an element.

    Returns:
      The bound list of the first node that matches the selector
    """
    element = self.find_first_element_by_selector(selector)
    # get coordinates and return
    return get_element_bounds(element)

  def get_nodes_count_by_selector(self, selector):
    """Gets the amount of nodes specified by the given selector.

    Args:
      selector: UiSelector which needs to be parsed to an element.

    Returns:
      The amount of nodes that matches the selector
    """
    return len(self.find_elments_by_selector(selector))
