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
"""UiSelector class for uicd-uiautomator, stands for selector class in uiautomator.

  It supports locator modification method.
"""
from .constant import DirectionType


class LocatorType():
  """Locator type for UiSelector.
  """
  PARENT = "PARENT"
  OFFSET = "OFFSET"
  ATTRIBUTE = "ATTRIBUTE"
  CUSTOM_MATCHER = "CUSTOM_MATCHER"
  SIBLING = "SIBLING"
  CHILD = "CHILD"
  DIRECTION = "DIRECTION"
  INDEX = "INDEX"


class UiSelector():
  """UiSelector class for python_uiautomator, stands for selector class in uiautomator.

  Attributes:
    locator: a tuple which contains the series of locator commands to help
    identify the UiObject.
  """

  def __init__(self, locator=None):
    self.locator = locator if locator else []

  def attributes(self, attrib_key, attrib_value, match_option=None):
    """Adds attributes symbol to locator of current UiSelector.

    Note this locator would select nodes whose attrib_key=attrib_value.

    Args:
      attrib_key: the key of the attribute.
      attrib_value: the value of the attribute
      match_option: the option for advanced matching.

    Returns:
      New UiSelector with "(attrib_key: attrib_value)" appended in locator.
    """
    self.locator.append(
        (LocatorType.ATTRIBUTE, match_option, attrib_key, attrib_value))
    return UiSelector(self.locator)

  def all_children(self):
    """Adds all children to locator of current UiSelector.

    Returns:
      New UiSelector with "(Location.CHILD, -1)" appended in locator.
      Use -1 to indicate need add all children to the filtered list without
      all_children, the filter logic will include the root node itself.
    """
    return self.child(-1)

  def child(self, child_index):
    """Adds child to locator of current UiSelector.

    Args:
      child_index: index of the child.
    Returns:
      New UiSelector with "(Location.CHILD,child_index)" appended in locator.
    """
    self.locator.append((LocatorType.CHILD, child_index))
    return UiSelector(self.locator)

  def custom_matcher(self, fn):
    """Adds custom matcher to locator of current UiSelector.

    User can define a match function. for example:
    UiSelector().custom_matcher(lambda n: n.get("text") == 'Phone')

    Args:
      fn: the match function provided by user.
    Returns:
      New UiSelector with "(Location.CUSTOM_MATCHER,"")" appended in locator.
    """
    self.locator.append((LocatorType.CUSTOM_MATCHER, fn))
    return UiSelector(self.locator)

  def parent(self):
    """Adds parent symbol to locator of current UiSelector.

    Returns:
      New UiSelector with "PARENT" appended in locator.
    """
    self.locator.append((LocatorType.PARENT, ""))
    return UiSelector(self.locator)

  def sibling(self):
    """Adds sibling to locator of current UiSelector.

    Note this finds the first sibling of the UiObject specified by previous
    locators.

    Returns:
      New UiSelector with "(Location.SIBLING,"")" appended in locator.
    """
    self.locator.append((LocatorType.SIBLING, ""))
    return UiSelector(self.locator)

  def index(self, index):
    """Adds index to locator of current UiSelector.

    Gets the indexth UiObject that matches its UiSelector.

    Args:
      index: Index of the UiObject that you want to find.

    Returns:
      New UiSelector with "(Location.INDEX,"")" appended in locator.
    """
    self.locator.append((LocatorType.INDEX, index))
    return UiSelector(self.locator)

  def text(self, value, match_option=None):
    """Adds text locator to locator of current UiSelector.

    For this locator our framework will search in 'text' field.

    Args:
      value: the text we are looking for.
      match_option: the match option for the text

    Returns:
      New UiSelector with "(TEXT: key)" appended in locator.
    """
    return self.attributes("text", value, match_option)

  def content_desc(self, value, match_option=None):
    """Adds text locator to locator of current UiSelector.

    For this locator our framework will search in 'content-desc' field.

    Args:
      value: the text we are looking for.
      match_option: the match option for the text

    Returns:
      New UiSelector with "(DESCRIPTION: key)" appended in locator.
    """
    return self.attributes("content-desc", value, match_option)

  def resource_id(self, value, match_option=None):
    """Adds text locator to locator of current UiSelector.

    For this locator our framework will search in 'resource_id' field.

    Args:
      value: the text we are looking for.
      match_option: the match option for the text

    Returns:
      New UiSelector with "(resource-id: key)" appended in locator.
    """
    return self.attributes("resource-id", value, match_option)

  def left(self):
    """Adds left direction symbol locator of current UiSelector.

    Returns:
      New UiSelector with "(Location.DIRECTION, DirectionType.LEFT)" appended in
      locator.
    """
    self.locator.append((LocatorType.DIRECTION, DirectionType.LEFT))
    return UiSelector(self.locator)

  def right(self):
    """Adds right direction symbol locator of current UiSelector.

    Returns:
      New UiSelector with "(Location.DIRECTION, DirectionType.RIGHT)" appended
      in
      locator.
    """
    self.locator.append((LocatorType.DIRECTION, DirectionType.RIGHT))
    return UiSelector(self.locator)

  def up(self):
    """Adds up direction symbol locator of current UiSelector.

    Returns:
      New UiSelector with "(Location.DIRECTION, DirectionType.UP)" appended in
      locator.
    """
    self.locator.append((LocatorType.DIRECTION, DirectionType.UP))
    return UiSelector(self.locator)

  def down(self):
    """Adds down direction symbol locator of current UiSelector.

    Returns:
      New UiSelector with "(Location.DIRECTION, DirectionType.DOWN)" appended in
      locator.
    """
    self.locator.append((LocatorType.DIRECTION, DirectionType.DOWN))
    return UiSelector(self.locator)
