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

import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

import {MessageTypes} from '../constants/constants';
import {OcrDetailsResponse, OcrRecord} from '../constants/interfaces';
import {Bounds, Rect} from '../constants/rect';
import {BackendManagerService} from '../services/backend_manager_service';
import {ControlMessageService} from '../services/control_message_service';

/** OCR viewer component */
@Component({
  selector: 'app-ocr-viewer',
  templateUrl: './ocr_viewer.ng.html',
  styleUrls: ['./ocr_viewer.css'],
  encapsulation: ViewEncapsulation.None
})
export class OCRViewerComponent implements OnDestroy {
  readonly destroyed = new ReplaySubject<void>(1);
  records: OcrRecord[] = [];
  orcLoading = false;
  textOrderDesc = true;
  positionOrderDesc = true;
  constructor(
      private readonly backendManagerService: BackendManagerService,
      private readonly controlMessageService: ControlMessageService) {}
  showOCRDetails() {
    this.orcLoading = true;
    this.records = [];
    this.backendManagerService.getOcrDetails()
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe((data: OcrDetailsResponse) => {
          this.orcLoading = false;
          this.updatePhoneScreen(data);
        });
  }

  updatePhoneScreen(data: OcrDetailsResponse) {
    const rectArr: Rect[] = [];
    for (const entry of data.boundsStringMapping) {
      rectArr.push(Rect.fromBounds(entry.bounds));
      const bounds = new Bounds(
          entry.bounds.x1, entry.bounds.y1, entry.bounds.x2, entry.bounds.y2);
      this.records.push({text: entry.text, bounds});
    }
    this.controlMessageService.sendMessage(
        {messageType: MessageTypes.HIGHLIGHT_OCR, extra: rectArr.join('|')});
  }

  onRecordClicked(item: OcrRecord) {
    this.controlMessageService.sendMessage({
      messageType: MessageTypes.NODE_HOVERED,
      extra: item.bounds.toString()
    });
  }

  orderByText() {
    this.records.sort((a, b) => a.text.localeCompare(b.text));
    if (this.textOrderDesc) {
      this.records.reverse();
    }
    this.textOrderDesc = !this.textOrderDesc;
  }

  orderByPosition() {
    this.records.sort((a, b) => a.bounds.compare(b.bounds));
    if (this.positionOrderDesc) {
      this.records.reverse();
    }
    this.positionOrderDesc = !this.positionOrderDesc;
  }


  ngOnDestroy() {
    this.controlMessageService.sendMessage(
        {messageType: MessageTypes.CLEAR_CANVAS, extra: 'all'});
    this.destroyed.next();
  }
}
