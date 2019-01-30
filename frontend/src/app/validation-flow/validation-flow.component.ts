// Copyright 2019 Google Inc.
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

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatStepper} from '@angular/material';
import {MatSnackBar} from '@angular/material';

import {BackendManagerService} from '../_services/backend-manager/backend-manager.service';
import {ACTIONS} from '../constants/actions';

/**
 * ValidationFlowComponent
 */
@Component({
  selector: 'app-validation-flow',
  templateUrl: 'validation-flow.component.html',
  styleUrls: ['validation-flow.component.css']
})
export class ValidationFlowComponent implements OnInit {
  LONGCLICK_DURATION_MS = 2000;
  SNACKBAR_DURATION_MS = 2000;
  LAST_STEP_INDEX = 2;
  validationDetailsData = {};
  imageValidationOption = false;
  // Default scrollDirection (Down), since backend is using int,
  // we have to provide int for backward compatibility
  scrollDirection = 2;
  nextButtonText = 'Next';
  constructor(
      public dialogRef: MatDialogRef<ValidationFlowComponent>,
      private backendManagerService: BackendManagerService,
      public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this['actionType'] = 'ScreenContentValidation';
    this['validationSubType'] = 'SCREEN_CONTENT_VALIDATION_ACTION';
    this['specialClickSubType'] = 'LongClick';
    this.validationDetailsData['model'] = {};
    if (this.data.imageData != null) {
      this.validationDetailsData['imageData'] = this.data.imageData;
    }
    if (this.data.options != null) {
      this.validationDetailsData['options'] = this.data.options;
    }
    this.backendManagerService.getImageValidationOption().subscribe(
        response => {
          this.imageValidationOption = response['imageValidationOption'];
        });
  }

  addNewAction() {
    // TODO: Use some standard angular form validation to check the form.
    if (!this.checkFormContent()) {
      return;
    }
    let observable = null;
    switch (this['actionType']) {
      case 'FetchScreenContent':
        observable = this.addFetchScreenContentAction();
        break;
      case 'ScreenContentValidation':
        if (this['validationSubType'] === 'IMAGE_MATCHING_VALIDATION_ACTION') {
          observable = this.addImageValidationAction();
        } else {
          observable = this.addValidationAction();
        }
        break;
      case 'SpecialClick':
        if (this['specialClickSubType'] === 'ImageMatchThenClick') {
          observable = this.addImageSpecialClickAction();
        } else {
          observable = this.addSpecialClickAction();
        }
        break;
    }

    if (observable !== null) {
      observable.subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open(
            'New action added to workflow.', 'OK',
            {duration: this.SNACKBAR_DURATION_MS});
      });
    }
  }

  addSpecialClickAction() {
    let observable = null;
    if (this['specialClickSubType'] === 'LongClick') {
      observable = this.backendManagerService.longClick(
          Math.trunc((this.data.options.startX + this.data.options.endX) / 2),
          Math.trunc((this.data.options.startY + this.data.options.endY) / 2),
          this.LONGCLICK_DURATION_MS);
    } else if (this['specialClickSubType'] === 'DoubleClick') {
      observable = this.backendManagerService.doubleClick(
          Math.trunc((this.data.options.startX + this.data.options.endX) / 2),
          Math.trunc((this.data.options.startY + this.data.options.endY) / 2));
    } else if (this['specialClickSubType'] === 'ZoomIn') {
      observable = this.backendManagerService.zoom(
          this.data.options.startX, this.data.options.startY,
          this.data.options.endX, this.data.options.endY, true);
    } else if (this['specialClickSubType'] === 'ZoomOut') {
      observable = this.backendManagerService.zoom(
          this.data.options.startX, this.data.options.startY,
          this.data.options.endX, this.data.options.endY, false);
    }
    return observable;
  }

  addImageSpecialClickAction() {
    let dataDictionary = {};
    dataDictionary['textPosition'] =
        this.getVariableFromDetailsModel('textPosition');
    dataDictionary['imageData'] =
        this.validationDetailsData['imageData'].split(',')[1];
    dataDictionary['threshold'] =
        String(this.getVariableFromDetailsModel('threshold'));
    dataDictionary['clickType'] = this.getVariableFromDetailsModel('clickType');
    let bounds = this.validationDetailsData['options'];
    if (bounds != null) {
      for (const key in bounds) {
        if (bounds.hasOwnProperty(key)) {
          dataDictionary[key] = String(bounds[key]);
        }
      }
    }
    return this.backendManagerService.imageValidationClick(dataDictionary);
  }

  addFetchScreenContentAction() {
    const actionData = {};
    actionData['actionType'] = 'FETCH_SCREEN_CONTENT_ACTION';
    actionData['type'] = 'FetchScreenContentAction';
    actionData['strategy'] = this.getVariableFromDetailsModel('strategy');
    actionData['selector'] = this.getVariableFromDetailsModel('selector');
    actionData['globalVariableName'] =
        this.getVariableFromDetailsModel('globalVariableName').trim();
    actionData['attributeType'] =
        this.getVariableFromDetailsModel('attributeType');
    actionData['isExportField'] =
        this.getVariableFromDetailsModel('isExportField');
    actionData['bounds'] = this.validationDetailsData['bounds'];

    return this.backendManagerService.addActionToWorkflow([actionData]);
  }

  addValidationAction() {
    const selectedType = this.validationDetailsData['model']['selectItem'];
    const selectedContentObj = this.validationDetailsData['model'].vList.find(
        x => x.type === selectedType);

    const params = new URLSearchParams();
    const bounds = this.validationDetailsData['bounds'];
    // set x1, x2, y1, y2 in bounds to params
    if (bounds != null) {
      for (const key in bounds) {
        if (bounds.hasOwnProperty(key)) {
          params.set(key, bounds[key]);
        }
      }
    }
    params.set('elementType', selectedContentObj.type);
    params.set('value', encodeURIComponent(selectedContentObj.value));
    params.set(
        'isLoopValidation',
        ('LOOP_SCREEN_CONTENT_VALIDATION_ACTION' === this['validationSubType'])
            .toString());
    params.set(
        'isScrollValidation',
        ('SCROLL_SCREEN_CONTENT_VALIDATION_ACTION' ===
         this['validationSubType'])
            .toString());
    params.set('scrollDirection', this.scrollDirection.toString());
    params.set(
        'isConditionClick',
        ('CONDITION_CLICK_ACTION' === this['validationSubType']).toString());
    params.set('textMatchType', this.getVariableFromDetailsModel('matchType'));
    params.set(
        'stopType', this.getVariableFromDetailsModel('selectedStopType'));
    params.set(
        'contentStorageType',
        this.getVariableFromDetailsModel('isMatchNodeContext') ?
            'contextbased' :
            'default');

    // TODO: change textPosition to boundsSearchType to be consistent
    // with backend
    params.set(
        'textPosition', this.getVariableFromDetailsModel('textPosition'));
    params.set('timeout', this.getVariableFromDetailsModel('timeout'));
    params.set(
        'isWaitUntilDisappear',
        this.getVariableFromDetailsModel('waitUntil') === 'WaitUntilDisappear' ?
            'true' :
            'false');
    return this.backendManagerService.addValidationStep(params);
  }

  addImageValidationAction() {
    let dataDictionary = {};
    dataDictionary['stopType'] =
        this.getVariableFromDetailsModel('selectedStopType');
    dataDictionary['textPosition'] =
        this.getVariableFromDetailsModel('textPosition');
    dataDictionary['imageData'] =
        this.validationDetailsData['imageData'].split(',')[1];
    dataDictionary['threshold'] =
        String(this.getVariableFromDetailsModel('threshold'));
    let bounds = this.validationDetailsData['options'];
    if (bounds != null) {
      for (const key in bounds) {
        if (bounds.hasOwnProperty(key)) {
          dataDictionary[key] = String(bounds[key]);
        }
      }
    }
    return this.backendManagerService.addImageValidationStep(dataDictionary);
  }

  getVariableFromDetailsModel(key) {
    if (this.validationDetailsData == null ||
        this.validationDetailsData['model'] == null ||
        this.validationDetailsData['model'][key] == null) {
      return '';
    }
    return this.validationDetailsData['model'][key];
  }

  checkFormContent() {
    if (this['actionType'] === 'FetchScreenContent') {
      const globalVariableName =
          this.getVariableFromDetailsModel('globalVariableName').trim();
      if (globalVariableName.length === 0 ||
          !globalVariableName.startsWith('$uicd_')) {
        this.snackBar.open(
            'Global variable name should start with "$uicd_"!', 'OK',
            {duration: this.SNACKBAR_DURATION_MS});
        return false;
      }
    }
    return true;
  }

  firstPageNext(stepper: MatStepper) {
    this.validationDetailsData['validationSubType'] = this['validationSubType'];
    this.validationDetailsData['specialClickSubType'] =
        this['specialClickSubType'];
    if ((this['actionType'] === 'ScreenContentValidation' &&
         this['validationSubType'] != 'IMAGE_MATCHING_VALIDATION_ACTION') ||
        this['actionType'] === 'FetchScreenContent') {
      this.backendManagerService
          .getContentFromScreen(
              this.data.options.startX, this.data.options.startY,
              this.data.options.endX, this.data.options.endY)
          .subscribe(function(data) {
            this.setValidationDetailsData(data);
            stepper.next();
          }.bind(this));
    } else if (
        (this['actionType'] === 'ScreenContentValidation' &&
         this['validationSubType'] === 'IMAGE_MATCHING_VALIDATION_ACTION') ||
        (this['actionType'] === 'SpecialClick' &&
         this['specialClickSubType'] === 'ImageMatchThenClick')) {
      stepper.next();
    } else {
      this.addNewAction();
    }
  }

  setValidationDetailsData(data) {
    // need create a new obj and update to validationDetailsData, so that the
    // form on the second step will get update
    const obj = {};

    // For scroll validation, set default search range to FullScreen
    if (this['validationSubType'] ===
        'SCROLL_SCREEN_CONTENT_VALIDATION_ACTION') {
      this.validationDetailsData['model']['textPosition'] = 'FullScreen';
    }
    Object.assign(obj, this.validationDetailsData, data);
    this.validationDetailsData = obj;
    this.validationDetailsData['validationSubType'] = this['validationSubType'];
  }

  cleanData() {
    this.validationDetailsData['validationSubType'] = null;
    this.validationDetailsData['specialClickSubType'] = null;
  }

  selectedActionTypeChanged(selectedActionType) {
    if (selectedActionType === 'SpecialClick') {
      this.selectedSpecialClickSubTypeChanged(this['specialClickSubType']);
    } else {
      this.nextButtonText = 'Next';
    }
  }

  selectedSpecialClickSubTypeChanged(specialClickSubType) {
    if (specialClickSubType === 'ImageMatchThenClick') {
      this.nextButtonText = 'Next';
    } else {
      this.nextButtonText = 'Add Action';
    }
  }
}
