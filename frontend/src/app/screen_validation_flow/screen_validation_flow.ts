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
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatStepper} from '@angular/material/stepper';

import {Bounds} from '../constants/rect';
import {DIRECTIONS, DirectionType, ELEMENT_SELECTOR_TYPES, ElementSelectorType, SPECIAL_CLICK_ACTIONS, SpecialClickType, VALIDATION_ACTIONS, VALIDATION_GROUPS, ValidationActionType, ValidationDetails, ValidationGroupType} from '../constants/screen_validation_constants';
import {BackendManagerService} from '../services/backend_manager_service';
import {ControlMessageService} from '../services/control_message_service';



/** Allows user to create screen related validation action */
@Component({
  selector: 'screen-validation-flow',
  templateUrl: 'screen_validation_flow.ng.html',
  styleUrls: ['screen_validation_flow.css']
})
export class ScreenValidationFlowComponent {
  LONGCLICK_DURATION_MS = 2000;
  SNACKBAR_DURATION_MS = 2000;
  readonly VALIDATION_GROUPS = VALIDATION_GROUPS;
  readonly VALIDATION_ACTIONS = VALIDATION_ACTIONS;
  readonly SPECIAL_CLICK_ACTIONS = SPECIAL_CLICK_ACTIONS;
  readonly DIRECTIONS = DIRECTIONS;

  readonly elementSelectorTypes = ELEMENT_SELECTOR_TYPES;
  selectedBounds = new Bounds(0, 0, 0, 0);

  selectedDirection: DirectionType = DirectionType.DOWN;
  selectedElementSelectorType = ElementSelectorType.DISPLAY_TEXT;
  selectedValidationGroup: ValidationGroupType =
      ValidationGroupType.SCREEN_CONTENT_VALIDATION;

  selectedSpecialClick: SpecialClickType = SpecialClickType.DOUBLE_CLICK;

  selectedValidationAction: ValidationActionType =
      ValidationActionType.SCREEN_CONTENT_VALIDATION_ACTION;


  constructor(
      public dialogRef: MatDialogRef<ScreenValidationFlowComponent>,
      private readonly backendManagerService: BackendManagerService,
      private readonly controlMessageService: ControlMessageService,
      private readonly snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: ValidationDetails) {
    this.selectedBounds = data.bounds;
  }

  closePopup() {
    this.dialogRef.close();
  }

  get selectedActionType() {
    return this.selectedValidationAction;
  }

  getNextButtonText() {
    if (this.selectedValidationGroup === ValidationGroupType.SPECIAL_CLICK) {
      return 'Add Action';
    }
    return 'Next';
  }

  nextPage(stepper: MatStepper) {
    if (this.selectedValidationGroup === ValidationGroupType.SPECIAL_CLICK) {
      this.specialClick();
      return;
    }
    stepper.next();
  }

  showDirection() {
    return this.selectedValidationGroup ===
        ValidationGroupType.SCREEN_CONTENT_VALIDATION &&
        this.selectedValidationAction ===
        ValidationActionType.SCROLL_SCREEN_CONTENT_VALIDATION_ACTION;
  }

  showFetchContentAction() {
    return this.selectedValidationGroup ===
        ValidationGroupType.FETCH_SCREEN_CONTENT;
  }

  showSpecialActions() {
    return this.selectedValidationGroup === ValidationGroupType.SPECIAL_CLICK;
  }

  showValidationActions() {
    return this.selectedValidationGroup ===
        ValidationGroupType.SCREEN_CONTENT_VALIDATION;
  }

  specialClick() {
    let observable = null;
    switch (this.selectedSpecialClick) {
      case SpecialClickType.CLICK_WITH_CONTEXT:
        observable = this.backendManagerService.tap(
            (this.selectedBounds.x1 + this.selectedBounds.x2) / 2,
            (this.selectedBounds.y1 + this.selectedBounds.y2) / 2, false);
        break;
      case SpecialClickType.DOUBLE_CLICK:
        observable = this.backendManagerService.doubleClick(
            (this.selectedBounds.x1 + this.selectedBounds.x2) / 2,
            (this.selectedBounds.y1 + this.selectedBounds.y2) / 2);
        break;
      case SpecialClickType.LONG_CLICK:
        observable = this.backendManagerService.longClick(
            (this.selectedBounds.x1 + this.selectedBounds.x2) / 2,
            (this.selectedBounds.y1 + this.selectedBounds.y2) / 2,
            this.LONGCLICK_DURATION_MS);
        break;
      case SpecialClickType.ZOOM_IN:
        observable = this.backendManagerService.zoom(
            this.selectedBounds.x1, this.selectedBounds.y1,
            this.selectedBounds.x2, this.selectedBounds.y2, true);
        break;
      case SpecialClickType.ZOOM_OUT:
        observable = this.backendManagerService.zoom(
            this.selectedBounds.x1, this.selectedBounds.y1,
            this.selectedBounds.x2, this.selectedBounds.y2, false);
        break;
      case SpecialClickType.DRAG_WITH_CONTEXT:
        observable = this.backendManagerService.dragWithStartEndContext(
            this.selectedBounds.x1, this.selectedBounds.y1,
            this.selectedBounds.x2, this.selectedBounds.y2);
        break;
      case SpecialClickType.SWIPE_WITH_CONTEXT:
        observable = this.backendManagerService.swipeWithStartEndContext(
            this.selectedBounds.x1, this.selectedBounds.y1,
            this.selectedBounds.x2, this.selectedBounds.y2);
        break;
      default:
        break;
    }
    if (!observable) {
      return;
    }
    observable.subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open(
          'New action added to workflow.', 'OK',
          {duration: this.SNACKBAR_DURATION_MS});
      this.controlMessageService.sendRefreshWorkflowMsg();
    });
  }

  previousPage(stepper: MatStepper) {
    stepper.previous();
  }
}
