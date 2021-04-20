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


import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {MatRadioChange} from '@angular/material/radio';
import {ReplaySubject} from 'rxjs';
import {delay, take, takeUntil} from 'rxjs/operators';

import {ACTIONS, ActionSummaryMetaData} from '../constants/actions';
import {ScreenContentSummary} from '../constants/interfaces';
import {Bounds} from '../constants/rect';
import {FETCH_CONTENT_STRATEGY_TYPES, StrategyType} from '../constants/screen_validation_constants';
import {BackendManagerService} from '../services/backend_manager_service';

/** Action details for fetching content from device */
export interface FetchContentActionDetails extends ActionSummaryMetaData {
  strategy: StrategyType;
  selector: string;
  globalVariableName: string;
  attributeType: string;
  isExportField: boolean;
  bounds?: Bounds;
}

/** Fetch the screen content */
@Component({
  selector: 'fetch-content-form',
  templateUrl: './fetch_content_form.ng.html',
  styleUrls: ['./fetch_content_form.css']
})
export class FetchContentComponent implements OnDestroy {
  readonly STRATEGY_TYPES = FETCH_CONTENT_STRATEGY_TYPES;
  currentSelectedText = '';
  @Input() showButtons = true;

  /** Handle on-destroy Subject, used to unsubscribe. */
  private readonly destroyed = new ReplaySubject<void>(1);

  @Input()
  fetchActionDetails: FetchContentActionDetails = {
    name: '',
    type: ACTIONS.FETCH_SCREEN_CONTENT_ACTION.type,
    strategy: StrategyType.POSITION,
    selector: '',
    globalVariableName: '',
    attributeType: '',
    isExportField: true,
    bounds: undefined,
  };
  @Output()
  fetchActionDetailsChange = new EventEmitter<FetchContentActionDetails>();

  screenContentSummary: ScreenContentSummary = {
    displayText: '',
    resourceId: '',
    checked: false,
  };

  constructor(private readonly backendManagerService: BackendManagerService) {}

  fetchContentData() {
    if (!this.fetchActionDetails.bounds) {
      return;
    }
    // Need add delay(0) here to avoid the "Expression has changed after it was
    // checked" issue.
    this.backendManagerService
        .getContentFromScreen(this.fetchActionDetails.bounds)
        .pipe(take(1), delay(0), takeUntil(this.destroyed))
        .subscribe((screenContentSummary: ScreenContentSummary) => {
          this.screenContentSummary = screenContentSummary;
          this.currentSelectedText = this.screenContentSummary.displayText;
          this.updateSelector(StrategyType.POSITION);
        });
  }

  @Input()
  set selectedBounds(selectedBounds: Bounds) {
    this.fetchActionDetails.bounds = selectedBounds;
    this.fetchContentData();
  }

  selectorChanged(event: MatRadioChange) {
    this.updateSelector(event.value);
  }

  updateSelector(strategy: StrategyType) {
    switch (strategy) {
      case StrategyType.POSITION:
        if (this.fetchActionDetails.bounds) {
          // If fetchActionDetails comes from json.parse, it won't have
          // toBoundsStr function on bounds field.
          const bounds = new Bounds(
              this.fetchActionDetails.bounds.x1,
              this.fetchActionDetails.bounds.x2,
              this.fetchActionDetails.bounds.y1,
              this.fetchActionDetails.bounds.y2);
          this.fetchActionDetails.selector = bounds.toBoundsStr();
        }
        break;
      case StrategyType.RESOURCEID:
        this.fetchActionDetails.selector = this.screenContentSummary.resourceId;
        break;
      case StrategyType.XPATH:
        this.fetchActionDetails.selector = '';  // XPath is provided by user.
        break;
      default:
        break;
    }
  }

  @Output() actionAdded = new EventEmitter<boolean>();

  @Output() previousPage = new EventEmitter<boolean>();

  showAttributeInput() {
    return this.fetchActionDetails.strategy === StrategyType.XPATH;
  }

  closePopup() {
    this.backendManagerService.addActionToWorkflow(this.fetchActionDetails)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(() => {
          this.actionAdded.emit();
        });
  }

  emitUpdate() {
    this.fetchActionDetailsChange.emit(this.fetchActionDetails);
  }

  previousPageClicked() {
    this.previousPage.emit();
  }

  ngOnDestroy() {
    // Unsubscribes all pending subscriptions.
    this.destroyed.next();
  }
}
