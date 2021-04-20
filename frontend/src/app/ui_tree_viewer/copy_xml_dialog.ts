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

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

/** Simple dialog for showing raw xml string */
@Component({
  selector: 'app-copy-xml-dialog',
  templateUrl: './copy_xml_dialog.ng.html',
  styleUrls: ['./copy_xml_dialog.css']
})
export class CopyXmlDialog {
  constructor(
      readonly dialogRef: MatDialogRef<CopyXmlDialog>,
      @Inject(MAT_DIALOG_DATA) readonly data: string) {}
}
