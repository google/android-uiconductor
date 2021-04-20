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
"""This module offers general convenience and utility functions for dealing with element locations."""
import re


def get_element_bounds(element):
  """Get element bounds.

  Args:
    element: XML element dump from UI.

  Returns:
    element bounds [x1, y1, x2, y2], return [-1, -1, -1, -1] when bounds can't
    be found.
  """
  bounds = element.get("bounds")
  if bounds is None:
    return [-1, -1, -1, -1]
  return list(map(int, re.sub("[^0-9]", " ", bounds).split()))


def is_left(element1, element2):
  """Is element2 on the left of element1.

  Args:
    element1: XML element1 dump from UI.
    element2: XML element2 dump from UI.

  Returns:
    Whether element2 is on the left of element1.
  """
  [e1_x1, e1_y1, e1_x2, e1_y2] = get_element_bounds(element1)
  [e2_x1, e2_y1, e2_x2, e2_y2] = get_element_bounds(element2)
  if [e1_x1, e1_y1, e1_x2, e1_y2
     ] == [-1, -1, -1, -1] or [e2_x1, e2_y1, e2_x2, e2_y2] == [-1, -1, -1, -1]:
    return False
  if e2_x2 <= e1_x1 and not (e2_y1 >= e1_y2 or e2_y2 <= e1_y1):
    return True
  return False


def is_right(element1, element2):
  """Is element2 on the right of element1.

  Args:
    element1: XML element1 dump from UI.
    element2: XML element2 dump from UI.

  Returns:
    Whether element2 is on the right of element1.
  """
  [e1_x1, e1_y1, e1_x2, e1_y2] = get_element_bounds(element1)
  [e2_x1, e2_y1, e2_x2, e2_y2] = get_element_bounds(element2)
  if [e1_x1, e1_y1, e1_x2, e1_y2
     ] == [-1, -1, -1, -1] or [e2_x1, e2_y1, e2_x2, e2_y2] == [-1, -1, -1, -1]:
    return False
  if e1_x2 <= e2_x1 and not (e2_y1 >= e1_y2 or e2_y2 <= e1_y1):
    return True
  return False


def is_up(element1, element2):
  """Is element2 on the up of element1.

  Args:
    element1: XML element1 dump from UI.
    element2: XML element2 dump from UI.

  Returns:
    Whether element2 is on the up of element1.
  """
  [e1_x1, e1_y1, e1_x2, e1_y2] = get_element_bounds(element1)
  [e2_x1, e2_y1, e2_x2, e2_y2] = get_element_bounds(element2)
  if [e1_x1, e1_y1, e1_x2, e1_y2
     ] == [-1, -1, -1, -1] or [e2_x1, e2_y1, e2_x2, e2_y2] == [-1, -1, -1, -1]:
    return False
  if e2_y2 <= e1_y1 and not (e2_x1 >= e1_x2 or e2_x2 <= e1_x1):
    return True
  return False


def is_down(element1, element2):
  """Is element2 on the down of element1.

  Args:
    element1: XML element1 dump from UI.
    element2: XML element2 dump from UI.

  Returns:
    Whether element2 is on the down of element1.
  """
  [e1_x1, e1_y1, e1_x2, e1_y2] = get_element_bounds(element1)
  [e2_x1, e2_y1, e2_x2, e2_y2] = get_element_bounds(element2)
  if [e1_x1, e1_y1, e1_x2, e1_y2
     ] == [-1, -1, -1, -1] or [e2_x1, e2_y1, e2_x2, e2_y2] == [-1, -1, -1, -1]:
    return False
  if e1_y2 <= e2_y1 and not (e2_x1 >= e1_x2 or e2_x2 <= e1_x1):
    return True
  return False
