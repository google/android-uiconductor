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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReplaySubject} from 'rxjs';


/** Dialog allows user to override the backend global variables */
@Component({
  selector: 'python-editor-simple',
  templateUrl: './python_editor_simple.ng.html',
  styleUrls: ['./python_editor_simple.css']
})
export class PythonEditorSimpleComponent implements OnInit, OnDestroy {
  private readonly destroyed = new ReplaySubject<void>(1);

  pythonScript = '';

  ngOnInit(): void {}

  setTextToEditor(text: string) {
    this.pythonScript = text;
  }

  getTextFromEditor(): string {
    return this.pythonScript;
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }
}
