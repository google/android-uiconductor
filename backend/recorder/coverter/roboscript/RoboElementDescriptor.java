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

package com.google.uicd.backend.recorder.coverter.roboscript;

/** Defines the ElementDescriptor for RoboScript. {@link ElmentDescriptor} */
public class RoboElementDescriptor {
  /** Fully qualified class name of the element. */
  public String className;

  /**
   * Represents the element's position in its RecyclerView (if any). The default value of {@code
   * ABSENT_POSITION} signifies that there is no RecyclerView container.
   */
  public int recyclerViewChildPosition = -1;

  /**
   * Position of this element in an adapter's data set. The value of {@code ABSENT_POSITION}
   * signifies that the child position is unknown (e.g., since its parent is not an {@code
   * AdapterView}).
   */
  public int adapterViewChildPosition = -1;

  /**
   * Position of this element in a {@code GroupView}. The value of {@code ABSENT_POSITION}
   * signifies that the child position is unknown (e.g., since its parent is not a {@code
   * GroupView}) or irrelevant (e.g., if its parent is an {@code AdapterView}, in which case the
   * relevant position is {@code adapterViewChildPosition}).
   */
  public int groupViewChildPosition = -1;

  public String resourceId;
  public String resourceIdRegex;
  public String contentDescription;
  public String contentDescriptionRegex;
  public String text;
  public String textRegex;
}
