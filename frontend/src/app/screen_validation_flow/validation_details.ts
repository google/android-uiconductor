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
import {MatDialog} from '@angular/material/dialog';
import {ReplaySubject} from 'rxjs';
import {delay, take, takeUntil} from 'rxjs/operators';
import {POPUP_DIALOG_DEFAULT_DIMENSION} from '../constants/constants';
import {ScreenContentSummary} from '../constants/interfaces';
import {Bounds} from '../constants/rect';
import * as ScreenValidationConstants from '../constants/screen_validation_constants';
import {BackendManagerService} from '../services/backend_manager_service';
import {ValidationInfoDialogComponent} from './validation_info';


/** Fetch the screen content */
@Component({
  selector: 'validation-details',
  templateUrl: './validation_details.ng.html',
  styleUrls: ['./validation_details.css']
})
export class ValidationDetailsComponent implements OnDestroy {
  readonly CONTENT_MATCH_TYPES = ScreenValidationConstants.CONTENT_MATCH_TYPES;
  readonly ELEMENT_SELECTOR_TYPES =
      ScreenValidationConstants.ELEMENT_SELECTOR_TYPES;
  readonly SCREEN_CONTENT_SEARCH_TYPES =
      ScreenValidationConstants.SCREEN_CONTENT_SEARCH_TYPES;
  readonly STOP_TYPES = ScreenValidationConstants.STOP_TYPES;
  readonly WAIT_UNTIL_TYPES = ScreenValidationConstants.WAIT_UNTIL_TYPES;
  screenContentSummary!: ScreenContentSummary;
  @Input() showButtons = true;

  /** Handle on-destroy Subject, used to unsubscribe. */
  private readonly destroyed = new ReplaySubject<void>(1);

  @Input()
  validationActionDetails:
      ScreenValidationConstants.ValidationRequestDetails = {
    actionType: '',
    contentData: '',
    selectedBounds: undefined,
    contentMatchType: ScreenValidationConstants.ContentMatchType.EQUALS,
    contextStorageType: ScreenValidationConstants.ContextStorageType.TEXT_BASED,
    elementSelectorType: ScreenValidationConstants.ElementSelectorType
                           .DISPLAY_TEXT,
    screenContentSearchType: ScreenValidationConstants.ScreenContentSearchType
                               .FULLSCREEN,
    scrollDirectionType: ScreenValidationConstants.DirectionType.UP,
    stopType: ScreenValidationConstants.StopType.STOP_TEST_IF_FALSE,
    timeout: 60,
    waitUntilDisappear: false,
    scrollMaxNumber: 30,
    ocrMode: false,
  };
  @Output()
  validationActionDetailsChange =
      new EventEmitter<ScreenValidationConstants.ValidationRequestDetails>();

  constructor(
      private readonly backendManagerService: BackendManagerService,
      private readonly dialog: MatDialog) {}

  fetchContentData() {
    if (!this.validationActionDetails.selectedBounds) {
      return;
    }
    // Need add delay(0) here to avoid the "Expression has changed after it was
    // checked" issue.
    this.backendManagerService
        .getContentFromScreen(this.validationActionDetails.selectedBounds)
        .pipe(take(1), delay(0), takeUntil(this.destroyed))
        .subscribe((screenContentSummary: ScreenContentSummary) => {
          this.screenContentSummary = screenContentSummary;
          this.updateContentData();
        });
  }

  @Input()
  set selectedBounds(selectedBounds: Bounds) {
    this.validationActionDetails.selectedBounds = selectedBounds;
    this.fetchContentData();
  }

  @Input()
  set selectedActionType(actionType: string) {
    this.validationActionDetails.actionType = actionType;
  }

  @Input()
  set scrollDirectionType(scrollDirectionType:
                              ScreenValidationConstants.DirectionType) {
    this.validationActionDetails.scrollDirectionType = scrollDirectionType;
  }

  @Output() actionAdded = new EventEmitter<boolean>();

  @Output() previousPage = new EventEmitter<boolean>();

  /**
   * WaitUntilType and MatchNodeContext doesn't align with backend definition,
   * use the set/get function to convert between boolean and enum
   */
  set selectedWaitUntilType(value: ScreenValidationConstants.WaitUntilType) {
    if (value ===
        ScreenValidationConstants.WaitUntilType.WAIT_UNTIL_DISAPPEAR) {
      this.validationActionDetails.waitUntilDisappear = true;
      return;
    }
    this.validationActionDetails.waitUntilDisappear = false;
  }

  get selectedWaitUntilType() {
    if (this.validationActionDetails.waitUntilDisappear) {
      return ScreenValidationConstants.WaitUntilType.WAIT_UNTIL_DISAPPEAR;
    }
    return ScreenValidationConstants.WaitUntilType.WAIT_UNTIL_APPEAR;
  }

  set matchNodeContext(value: boolean) {
    if (value) {
      this.validationActionDetails.contextStorageType =
          ScreenValidationConstants.ContextStorageType.CONTEXT_BASED;
      return;
    }
    this.validationActionDetails.contextStorageType =
        ScreenValidationConstants.ContextStorageType.TEXT_BASED;
  }

  get matchNodeContext() {
    return this.validationActionDetails.contextStorageType ===
        ScreenValidationConstants.ContextStorageType.CONTEXT_BASED;
  }

  isConditionalClick() {
    return this.validationActionDetails.actionType ===
        ScreenValidationConstants.ValidationActionType.CONDITION_CLICK_ACTION;
  }

  isLoopValidation() {
    return this.validationActionDetails.actionType ===
        ScreenValidationConstants.ValidationActionType
            .LOOP_SCREEN_CONTENT_VALIDATION_ACTION;
  }

  isScrollValidation() {
    return this.validationActionDetails.actionType ===
        ScreenValidationConstants.ValidationActionType
            .SCROLL_SCREEN_CONTENT_VALIDATION_ACTION;
  }

  openValidationDetailsInfoDlg() {
    this.dialog.open(ValidationInfoDialogComponent, {
      width: POPUP_DIALOG_DEFAULT_DIMENSION.width,
    });
  }

  updateContentData() {
    if (!this.screenContentSummary) {
      return;
    }
    switch (this.validationActionDetails.elementSelectorType) {
      case ScreenValidationConstants.ElementSelectorType.DISPLAY_TEXT:
        this.validationActionDetails.contentData =
            this.screenContentSummary.displayText;
        break;
      case ScreenValidationConstants.ElementSelectorType.RESOURCE_ID:
        this.validationActionDetails.contentData =
            this.screenContentSummary.resourceId;
        break;
      case ScreenValidationConstants.ElementSelectorType.CHECK:
        this.validationActionDetails.contentData =
            (String)(this.screenContentSummary.checked);
        break;
      default:
        break;
    }
  }

  emitUpdate() {
    this.validationActionDetailsChange.emit(this.validationActionDetails);
  }

  closePopup() {
    this.backendManagerService.addValidationStep(this.validationActionDetails)
        .pipe(take(1), takeUntil(this.destroyed))
        .subscribe(() => {
          this.actionAdded.emit();
        });
  }

  previousPageClicked() {
    this.previousPage.emit();
  }

  ngOnDestroy() {
    // Unsubscribes all pending subscriptions.
    this.destroyed.next();
  }
}
