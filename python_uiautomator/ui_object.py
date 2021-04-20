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
"""UiObject is the class that stores the UiObject for automation.

  It contains xml info and a selector for a certain component.
"""
from .constant import DirectionType
from .xml_parser import XmlParser


class UiObject():
  """UiObject class for python_uiautomator, stands for UiObject class in uiautomator.

  Attributes:
    selector: corresponding UiSelector of the current UiObject.
    android_device_driver: android_device_driver for android device.
  """

  def __init__(self, selector, android_device_driver):
    self.selector = selector
    self.android_device_driver = android_device_driver

  def attributes(self, attrib_key, attrib_value, match_option=None):
    """Adds attributes locator with attrib_key=attrib_value to selector of current UiObject.

    Note: attributes("text", "Chrome") would add a requirement of text=Chrome to
    the current UiObject.

    Args:
      attrib_key: the key of the attribute.
      attrib_value: the value of the attribute
      match_option: the option for advanced matching

    Returns:
      New UiObject with attributes selector appended in selector.
    """
    new_selector = self.selector.attributes(attrib_key, attrib_value,
                                            match_option)
    return UiObject(new_selector, self.android_device_driver)

  def click(self):
    """Performs click action on element specified by current UiObject.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    parser = XmlParser(self.android_device_driver.fetch_current_xml())
    point = parser.get_position_by_selector(self.selector)
    self.android_device_driver.click(point.x, point.y)

  def swipe(self, direction=DirectionType.RIGHT):
    """Performs click action on element specified by current UiObject.

    Note this action will swipe from the center of current UiObject to its edge
    according to the given direction.

    Args:
      direction: DirectionType which provides on which way to swipe,
      DirectionType.RIGHT is default value.

    Returns:
      Nothing, Subprocess.Popen.wait() should resolve automatically.
    """
    parser = XmlParser(self.android_device_driver.fetch_current_xml())
    point = parser.get_position_by_selector(self.selector)
    if point.x <= 0 and point.y <= 0:
      return
    bounds = parser.get_bounds_by_selector(self.selector)
    dest_x, dest_y = 0, 0
    if direction == DirectionType.UP:
      dest_x, dest_y = point.x, bounds[1]
    elif direction == DirectionType.DOWN:
      dest_x, dest_y = point.x, bounds[3]
    elif direction == DirectionType.LEFT:
      dest_x, dest_y = bounds[0], point.y
    elif direction == DirectionType.RIGHT:
      dest_x, dest_y = bounds[2], point.y

    self.android_device_driver.swipe(point.x, point.y, dest_x, dest_y)

  def child(self, child_index):
    """Adds child to selector of current UiObject.

    User can select nth child based on the parent:

    Args:
      child_index: index of the child.
    Returns:
      New UiObject contains one extra children selector.
    """
    new_selector = self.selector.child(child_index)
    return UiObject(new_selector, self.android_device_driver)

  def index(self, index):
    """Gets the indexth UiObject that matches its UiSelector.

    User can select nth child based on the parent:

    Args:
      index: index of the UiObject.
    Returns:
      New UiObject contains one extra index selector.
    """
    new_selector = self.selector.index(index)
    return UiObject(new_selector, self.android_device_driver)

  def custom_matcher(self, fn):
    """Adds custom matcher to selector of current UiObject.

    User can define a match function. for example:
    UiSelector().custom_matcher(lambda n: n.get("text") == 'Phone')

    Args:
      fn: the match function provided by user.
    Returns:
      New UiObject contains one extra custom_matcher selector.
    """
    new_selector = self.selector.custom_matcher(fn)
    return UiObject(new_selector, self.android_device_driver)

  def parent(self):
    """Adds parent symbol to selector of current UiObject.

    Returns:
      New UiObject with "PARENT" appended in UiSelector's locator.
    """
    parent_selector = self.selector.parent()
    return UiObject(parent_selector, self.android_device_driver)

  def sibling(self):
    """Adds sibling to selector of current UiObject.

    Returns:
      New UiObject contains one extra sibling selector.
    """
    new_selector = self.selector.sibling()
    return UiObject(new_selector, self.android_device_driver)

  def text(self, value, match_option=None):
    """Adds text locator to selector of current UiObject.

    For this locator our framework will search in 'text' and field.

    Args:
      value: the text we are looking for.
      match_option: the match option for the text

    Returns:
      New UiObject with "Text" appended in UiSelector's locator.
    """
    return self.attributes("text", value, match_option)

  def get_attributes(self):
    """Get the attribute list of the selected UiObject.

    Returns:
      List of (name, value) pairs for attributes.
    """
    parser = XmlParser(self.android_device_driver.fetch_current_xml())
    node = parser.find_first_element_by_selector(self.selector)
    return node.items()

  def verify(self, key, value):
    """Verify is selected key, value pair exists the selected UiObject.

    Match is case insensitive.

    Args:
      key: the key for verification
      value: the desired value under key.

    Returns:
      True if exists, else false.
    """
    parser = XmlParser(self.android_device_driver.fetch_current_xml())
    node = parser.find_first_element_by_selector(self.selector)
    if key in node.keys():
      if node.get(key).lower() == value.lower():
        return True
    return False

  def content_desc(self, value, match_option=None):
    """Adds description locator to selector of current UiObject.

    For this locator our framework will search in 'content-desc' field.

    Args:
      value: the text we are looking for.
      match_option: the match option for the text

    Returns:
      New UiObject with "content-desc" appended in UiSelector's locator.
    """
    return self.attributes("content-desc", value, match_option)

  def resource_id(self, value, match_option=None):
    """Adds resource_id locator to selector of current UiObject.

    For this locator our framework will search in 'resource-id' field.

    Args:
      value: the text we are looking for.
      match_option: the match option for the text

    Returns:
      New UiObject with "resource_id" appended in UiSelector's locator.
    """
    return self.attributes("resource-id", value, match_option)

  def verify_exist(self):
    """Verify whether the element specified by the current UiObject exists.

    Returns:
      True if the element exists, false otherwise.
    """
    parser = XmlParser(self.android_device_driver.fetch_current_xml())
    node = parser.find_first_element_by_selector(self.selector)
    if node is None:
      return False
    else:
      return True

  def left(self):
    """Adds left symbol to selector of current UiObject.

    Returns:
      New UiObject with "(Location.DIRECTION, DirectionType.LEFT)" appended in
      UiSelector's locator.
    """
    left_selector = self.selector.left()
    return UiObject(left_selector, self.android_device_driver)

  def right(self):
    """Adds right symbol to selector of current UiObject.

    Returns:
      New UiObject with "(Location.DIRECTION, DirectionType.RIGHT)" appended in
      UiSelector's locator.
    """
    right_selector = self.selector.right()
    return UiObject(right_selector, self.android_device_driver)

  def up(self):
    """Adds up symbol to selector of current UiObject.

    Returns:
      New UiObject with "(Location.DIRECTION, DirectionType.UP)" appended in
      UiSelector's locator.
    """
    up_selector = self.selector.up()
    return UiObject(up_selector, self.android_device_driver)

  def down(self):
    """Adds down symbol to selector of current UiObject.

    Returns:
      New UiObject with "(Location.DIRECTION, DirectionType.DOWN)" appended in
      UiSelector's locator.
    """
    down_selector = self.selector.down()
    return UiObject(down_selector, self.android_device_driver)

  def get_bounds(self):
    """Gets the bounds of UIElement specified by current UiObject.

    Returns:
      The bounds of current UIElement [X1, Y1, X2, Y2]
    """
    parser = XmlParser(self.android_device_driver.fetch_current_xml())
    return parser.get_bounds_by_selector(self.selector)

  def get_center_pos(self):
    """Gets center position of UIElement specified by current UiObject.

    Returns:
      The center position of current UIElement [X1, Y1]
    """
    parser = XmlParser(self.android_device_driver.fetch_current_xml())
    return parser.get_position_by_selector(self.selector)

