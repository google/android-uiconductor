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

/** Shape class is the parent of Rect and Circle. */
export interface Shape {}

/**
 * Circle class that implements Shape and maps to Circular class in the backend.
 */
export class Circle implements Shape {
  constructor(
      public type: string, public centerX: number, public centerY: number,
      public radius: number) {}
}

/**
 * Rectangle class that implements Shape and maps to Rectangular class in the
 * backend.
 */
export class Rectangle implements Shape {
  constructor(
      public type: string, public originX: number, public originY: number,
      public width: number, public height: number) {}
}
