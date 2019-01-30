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

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BACKEND_BASE_URL} from '../../constants/device';

@Injectable()
export class BackendManagerService {
  constructor(private http: HttpClient) {}

  baseUrl = BACKEND_BASE_URL;

  addActionByUuid(uuid) {
    return this.http.get(this.baseUrl + '/addActionByUUID', {
      params: new HttpParams().set('uuidStr', uuid),
    });
  }

  addActionToWorkflow(actions) {
    const fullUrl = this.baseUrl + '/addActionToWorkflow';
    const jsonStrings = [];
    for (let i = 0; i < actions.length; i++) {
      jsonStrings.push(JSON.stringify(actions[i]));
    }
    return this.http.post(
        this.baseUrl + '/addActionToWorkflow', jsonStrings.join(','));
  }

  addDragAction(xList, yList) {
    return this.http.get(
        this.baseUrl + '/addDragAction',
        {params: new HttpParams().set('xList', xList).set('yList', yList)});
  }

  addScreenCapAction(actions) {
    return this.http.post(this.baseUrl + '/batchPlay', actions.join(','));
  }

  addValidationStep(params) {
    return this.http.get(
        this.baseUrl + '/addValidationStep' +
        '?' + params.toString());
  }

  // dataDictionary is a dictionary containing the parameters the Image Matching
  // Validation requires. This includes following keys:
  // stopType: the stop condition of this test step.
  // textPosition: the bounds search type of the content (image), among
  // Full Screen, Around and Strict.
  // imageData: the template image data derived in the front-end
  // in BASE64 string format.
  // threshold: the threshold to compare with the confidence of
  // the matching results of two images in order to determine the existence.
  // startX, startY, endX and endY: the original bounds coordinates of four
  // corners.
  addImageValidationStep(dataDictionary) {
    return this.http.post(
        this.baseUrl + '/addImageMatchingValidationStep',
        JSON.stringify(dataDictionary));
  }

  copyAction(uuid) {
    return this.http.get(this.baseUrl + '/copyAction', {
      params: new HttpParams().set('uuidStr', uuid),
    });
  }

  cancelCurrentWorkflow() {
    return this.http.get(this.baseUrl + '/cancelCurrentWorkflow');
  }

  createNewWorkSpace() {
    return this.http.get(this.baseUrl + '/createNewWorkSpace');
  }

  doubleClick(x, y) {
    return this.http.get(this.baseUrl + '/doubleclick', {
      params: new HttpParams()
                  .set('x', Math.floor(x).toString())
                  .set('y', Math.floor(y).toString())
    });
  }

  dragMove(x, y) {
    return this.http.get(this.baseUrl + '/dragMove', {
      params: new HttpParams()
                  .set('x', Math.floor(x).toString())
                  .set('y', Math.floor(y).toString())
    });
  }

  dragStart(x, y) {
    return this.http.get(this.baseUrl + '/dragStart', {
      params: new HttpParams()
                  .set('x', Math.floor(x).toString())
                  .set('y', Math.floor(y).toString())
    });
  }

  dragStop(x, y) {
    return this.http.get(this.baseUrl + '/dragStop', {
      params: new HttpParams()
                  .set('x', Math.floor(x).toString())
                  .set('y', Math.floor(y).toString())
    });
  }

  exportTestCase(uuid) {
    return this.http.get(this.baseUrl + '/exportTestCase', {
      params: new HttpParams().set('uuidStr', uuid),
    });
  }

  fetchTestcaseHistory() {
    return this.http.get(this.baseUrl + '/fetchTestcaseHistory');
  }

  fetchTestcaseTreeByUsername(username: string) {
    return this.http.get(this.baseUrl + '/fetchTestcaseTreeByUsername', {
      params: new HttpParams().set('username', username),
    });
  }

  fetchTestcaseByName(testcaseName: string) {
    return this.http.get(this.baseUrl + '/fetchTestcaseByName', {
      params: new HttpParams().set('testcaseName', testcaseName),
    });
  }

  fetchXML() {
    return this.http.get(this.baseUrl + '/fetchCurrentXML');
  }

  getActionDetails(uuid) {
    return this.http.get(this.baseUrl + '/getActionDetails', {
      params: new HttpParams().set('uuidStr', uuid),
    });
  }

  getAllAvailableSnippetMethods(packageName) {
    return this.http.get(this.baseUrl + '/getAllAvailableSnippetMethods', {
      params: new HttpParams().set('packageName', packageName),
    });
  }

  getContentFromScreen(startX, startY, endX, endY) {
    return this.http.get(this.baseUrl + '/getContentFromScreen', {
      params: new HttpParams()
                  .set('startX', Math.floor(startX).toString())
                  .set('startY', Math.floor(startY).toString())
                  .set('endX', Math.floor(endX).toString())
                  .set('endY', Math.floor(endY).toString())
    });
  }

  getCurrentUser() {
    return this.http.get(this.baseUrl + '/getCurrentUser');
  }

  getCurrentWorkflow() {
    return this.http.get(this.baseUrl + '/getCurrentWorkflow');
  }

  getDeviceList() {
    return this.http.get(this.baseUrl + '/getDevicesList');
  }

  getDeviceRatios() {
    return this.http.get(this.baseUrl + '/getDeviceRatios');
  }

  getInitializedDevices() {
    return this.http.get(this.baseUrl + '/getInitedDevices');
  }

  getImageValidationOption() {
    return this.http.get(this.baseUrl + '/getImageValidationOption');
  }

  getPorts(deviceId) {
    return this.http.get(this.baseUrl + '/getPorts', {
      params: new HttpParams().set('deviceId', deviceId),
    });
  }

  hasInitializedDevices() {
    return this.http.get(this.baseUrl + '/hasInitedDevices');
  }

  // dataDictionary is a dictionary containing the parameters the Image Matching
  // Then Click requires. This includes following keys:
  // textPosition: the bounds search type of the content (image), among Full
  // Screen, Around and Strict.
  // imageData: the template image data derived in the front-end
  // in BASE64 string format.
  // threshold: the threshold to compare with the confidence of the matching
  // results of two images in order to determine the existence.
  // clickType: the type of click action if the two images match,
  // including click and double click.
  // startX, startY, endX and endY: the original bounds coordinates of four
  // corners.
  imageValidationClick(dataDictionary) {
    return this.http.post(
        this.baseUrl + '/imageValidationClick', JSON.stringify(dataDictionary));
  }

  initDevice(deviceId) {
    return this.http.get(this.baseUrl + '/initDevice', {
      params: new HttpParams().set('deviceId', deviceId),
    });
  }

  initDevices(deviceId) {
    return this.http.get(this.baseUrl + '/initDevicesList', {
      params: new HttpParams().set('deviceId', deviceId),
    });
  }

  initMinicap(deviceId) {
    return this.http.get(this.baseUrl + '/initMiniCap', {
      params: new HttpParams().set('deviceId', deviceId),
    });
  }

  loadWorkflow(uuid) {
    return this.http.get(this.baseUrl + '/loadWorkflow', {
      params: new HttpParams().set('uuidStr', uuid),
    });
  }

  longClick(x, y, duration) {
    return this.http.get(this.baseUrl + '/longclick', {
      params: new HttpParams()
                  .set('x', Math.floor(x).toString())
                  .set('y', Math.floor(y).toString())
                  .set('duration', duration)
    });
  }

  playAction(uuid) {
    return this.http.post(this.baseUrl + '/playAction', uuid);
  }

  playAll(actions) {
    return this.http.post(this.baseUrl + '/batchPlay', actions.join(','));
  }

  playCurrentWorkflow() {
    return this.http.get(this.baseUrl + '/playCurrentWorkflow');
  }

  playCurrentWorkflowFromAction(uuid) {
    return this.http.post(
        this.baseUrl + '/playCurrentWorkflowFromAction', uuid);
  }

  pressKey(keyCode) {
    return this.http.get(this.baseUrl + '/pressKey', {
      params: new HttpParams().set('keyCode', keyCode),
    });
  }

  quickSwipe(direction) {
    return this.http.get(this.baseUrl + '/quickSwipe', {
      params: new HttpParams().set('dir', direction),
    });
  }

  removeAction(uuid) {
    return this.http.post(this.baseUrl + '/removeAction', uuid);
  }

  removeLastAction() {
    return this.http.get(this.baseUrl + '/removeLastAction');
  }

  rotateScreen(direction) {
    return this.http.get(this.baseUrl + '/screenRotate', {
      params: new HttpParams().set('dir', direction),
    });
  }

  saveCurrentWorkflow(workflow) {
    return this.http.post(
        this.baseUrl + '/saveCurrentWorkflow', JSON.stringify(workflow));
  }

  selectedDeviceChanged(deviceId) {
    return this.http.get(this.baseUrl + '/selectedDeviceChanged', {
      params: new HttpParams().set('deviceId', deviceId),
    });
  }

  setPlayMode(mode) {
    return this.http.get(this.baseUrl + '/setPlayMode', {
      params: new HttpParams().set('playMode', mode),
    });
  }

  softRestart() {
    return this.http.get(this.baseUrl + '/softRestart');
  }

  swipe(startX, startY, endX, endY) {
    return this.http.get(this.baseUrl + '/swipe', {
      params: new HttpParams()
                  .set('startX', Math.floor(startX).toString())
                  .set('startY', Math.floor(startY).toString())
                  .set('endX', Math.floor(endX).toString())
                  .set('endY', Math.floor(endY).toString())
    });
  }

  tap(x, y) {
    return this.http.get(this.baseUrl + '/tap', {
      params: new HttpParams()
                  .set('x', Math.floor(x).toString())
                  .set('y', Math.floor(y).toString())
    });
  }

  validateUicdBackendConnection() {
    return this.http.get(this.baseUrl + '/validateUicdBackendConnection');
  }

  // currently unused
  turnOnOffScreen() {
    return this.http.get(this.baseUrl + '/turnOnOffScreen');
  }

  updateActionMetadata(newWorkflow) {
    return this.http.post(
        this.baseUrl + '/updateActionMetadata', JSON.stringify(newWorkflow));
  }

  zoom(startX, startY, endX, endY, isZoomIn) {
    return this.http.get(this.baseUrl + '/zoom', {
      params: new HttpParams()
                  .set('x1', Math.floor(startX).toString())
                  .set('y1', Math.floor(startY).toString())
                  .set('x2', Math.floor(endX).toString())
                  .set('y2', Math.floor(endY).toString())
                  .set('isZoomIn', isZoomIn)
    });
  }
}
