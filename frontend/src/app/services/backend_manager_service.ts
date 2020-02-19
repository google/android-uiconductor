// Copyright 2019 Google LLC
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

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActionSummaryMetaData} from '../constants/actions';
import {BACKEND_BASE_URL, KeyCodes, RotateDirection, SwipeDirection} from '../constants/constants';
import {CurrentUserResponse, ExportImportProjectRequest, GetUserPresetGlobalVariableResponse, ImageResponse, ImagesResponse, InitDevicesResponse, PlayActionRequest, PlayActionResponse, ProjectDeepCopyRequest, ProjectListResponse, ScaledScreenDimensionsResponse, ScreenContentSummary, UuidResponse, VersionInfoResponse} from '../constants/interfaces';
import {Bounds, Point} from '../constants/rect';
import {ValidationRequestDetails} from '../constants/screen_validation_constants';
import {Shape} from '../constants/shape';


/** Communicates to the UIConductor Java backend */
@Injectable()
export class BackendManagerService {
  readonly OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private readonly http: HttpClient) {}

  /** Adds the given action to current workflow */
  addActionByUUID(uuid: string) {
    return this.http.get(
        BACKEND_BASE_URL + '/addActionByUUID',
        {params: new HttpParams().set('uuidStr', uuid)});
  }

  /** Adds action to current workflow */
  addActionToWorkflow(action: ActionSummaryMetaData) {
    return this.http.post(BACKEND_BASE_URL + '/addActionToWorkflow', action);
  }

  /** Add validation action to current workflow */
  addValidationStep(action: ValidationRequestDetails) {
    return this.http.post(BACKEND_BASE_URL + '/addValidationStep', action);
  }

  /** Adds drag Action */
  addDragAction(pointsList: Point[]) {
    return this.http.get(BACKEND_BASE_URL + '/addDragAction', {
      params: new HttpParams()
                  .set(
                      'xList',
                      pointsList.map(p => Math.floor(p.x).toString()).join(','))
                  .set(
                      'yList',
                      pointsList.map(p => Math.floor(p.y).toString()).join(','))
    });
  }

  /** Stops playing current workflow */
  cancelCurrentWorkflow() {
    return this.http.get(BACKEND_BASE_URL + '/cancelCurrentWorkflow');
  }

  /** Copies the given action with a new uuid */
  copyAction(uuid: string): Observable<ActionSummaryMetaData> {
    return this.http.get<ActionSummaryMetaData>(
        BACKEND_BASE_URL + '/copyAction',
        {params: new HttpParams().set('uuidStr', uuid)});
  }

  /** Creates a new workspace */
  createNewWorkSpace() {
    return this.http.get(BACKEND_BASE_URL + '/createNewWorkSpace');
  }

  /** Deep copy project */
  deepCopyProject(projectDeepCopyRequest: ProjectDeepCopyRequest) {
    return this.http.post(
        BACKEND_BASE_URL + '/deepCopyProjectTree', projectDeepCopyRequest,
        this.OPTIONS);
  }

  /** Performs double click on current device */
  doubleClick(x: number, y: number) {
    return this.http.get(BACKEND_BASE_URL + '/doubleclick', {
      params: new HttpParams()
                  .set('x', Math.floor(x).toString())
                  .set('y', Math.floor(y).toString())
    });
  }

  /** Performs dragMove click on current device */
  dragMove(x: number, y: number) {
    return this.http.get(BACKEND_BASE_URL + '/dragMove', {
      params: new HttpParams()
                  .set('x', Math.floor(x).toString())
                  .set('y', Math.floor(y).toString())
    });
  }

  /** Performs dragStart on current device */
  dragStart(x: number, y: number) {
    return this.http.get(BACKEND_BASE_URL + '/dragStart', {
      params: new HttpParams()
                  .set('x', Math.floor(x).toString())
                  .set('y', Math.floor(y).toString())
    });
  }

  /** Performs dragStop on current device */
  dragStop(x: number, y: number) {
    return this.http.get(BACKEND_BASE_URL + '/dragStop', {
      params: new HttpParams()
                  .set('x', Math.floor(x).toString())
                  .set('y', Math.floor(y).toString())
    });
  }

  /** Returns raw json test information for given test */
  exportTestCase(uuid: string): Observable<unknown> {
    return this.http.get(BACKEND_BASE_URL + '/exportTestCase', {
      params: new HttpParams().set('uuidStr', uuid),
    });
  }

  /**
   * Returns dictionary of reference image uuids to reference image in form of
   * base64 string
   */
  exportRefImagesForWorkflow(uuid: string): Observable<ImagesResponse> {
    return this.http.get<ImagesResponse>(
        BACKEND_BASE_URL + '/exportRefImagesForWorkflow', {
          params: new HttpParams().set('uuidStr', uuid),
        });
  }

  /**
   * Exports the given project as a zip file
   */
  exportCurrentProject(exportImportProjectReq: ExportImportProjectRequest) {
    const url = BACKEND_BASE_URL + '/exportProjectToZip?' +
        new HttpParams()
            .set('projectId', exportImportProjectReq.projectId)
            .set('projectName', exportImportProjectReq.projectName)
            .toString();
    window.open(url);
  }

  /** Upload zip file and import */
  unzipAndImport(projectName: string, file: File): Observable<unknown> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('projectName', projectName);
    const headers = new HttpHeaders({'Accept': 'application/zip'});
    return this.http.post(
        BACKEND_BASE_URL + '/unzipAndImport', formData, {headers});
  }

  /**
   * Gets the content details from the select area.
   * (DisplayText|ResourceID|checked)
   */
  getContentFromScreen(bounds: Bounds): Observable<ScreenContentSummary> {
    return this.http.get<ScreenContentSummary>(
        BACKEND_BASE_URL + '/getContentFromScreen', {
          params: new HttpParams()
                      .set('startX', Math.floor(bounds.x1).toString())
                      .set('startY', Math.floor(bounds.y1).toString())
                      .set('endX', Math.floor(bounds.x2).toString())
                      .set('endY', Math.floor(bounds.y2).toString())
        });
  }

  /**
   * Gets the global variable from backend in plain string format to make it
   * simple. It doesn't include the resevered internal variables (e.g. adb
   * path, input path output path). Expected return will be something
   * similar to: $uicd_var1=abc,$uicd_var2=123.
   */
  getUserPresetGlobalVariable():
      Observable<GetUserPresetGlobalVariableResponse> {
    return this.http.get<GetUserPresetGlobalVariableResponse>(
        BACKEND_BASE_URL + '/getUserPresetGlobalVariable');
  }

  /**
   * Set the global variable from backend in plain string format.
   * simple. Expected input should be in the following format:
   * $uicd_var1=abc,$uicd_var2=123.
   */
  setUserPresetGlobalVariable(globalVariableStr: string) {
    return this.http.post(
        BACKEND_BASE_URL + '/setUserPresetGlobalVariable', globalVariableStr);
  }

  /** Fetches the current XML representation of the device screen */
  fetchXML(): Observable<string[]> {
    return this.http.get<string[]>(BACKEND_BASE_URL + '/fetchCurrentXML');
  }

  /** Gets current workflow in json format */
  getCurrentWorkflow(): Observable<unknown> {
    return this.http.get(BACKEND_BASE_URL + '/getCurrentWorkflow');
  }

  /** Gets action details. */
  getActionDetails(uuid: string): Observable<ActionSummaryMetaData> {
    return this.http.get<ActionSummaryMetaData>(
        BACKEND_BASE_URL + '/getActionDetails',
        {params: new HttpParams().set('uuidStr', uuid)});
  }

  /** Gets current user of UICD */
  getCurrentUser(): Observable<CurrentUserResponse> {
    return this.http.get<CurrentUserResponse>(
        BACKEND_BASE_URL + '/getCurrentUser');
  }

  /** Gets adb connected devices from backend */
  getDevicesList() {
    return this.http.get(BACKEND_BASE_URL + '/getDevicesList');
  }

  /** Gets devices that already initialized in backend */
  getInitedDevices(): Observable<InitDevicesResponse> {
    return this.http.get<InitDevicesResponse>(
        BACKEND_BASE_URL + '/getInitializedDevicesDetails');
  }

  /** Gets current play mode */
  getPlayMode(): Observable<string> {
    return this.http.get<string>(BACKEND_BASE_URL + '/getPlayMode');
  }

  /** Gets xmldumper version and uicd backend version */
  getVersionInfo(): Observable<VersionInfoResponse> {
    return this.http.get<VersionInfoResponse>(
        BACKEND_BASE_URL + '/getVersionInfo');
  }

  /**
   * Checks whether backend already initialized the device to avoid
   * reinitialized devices when user refresh the frontend
   */
  hasInitializedDevices(): Observable<unknown> {
    return this.http.get(BACKEND_BASE_URL + '/hasInitedDevices');
  }

  /**
   * Initializes single device in backend, backend will start the xmldumper
   * server on the device
   * @param deviceId
   */
  initDevice(deviceId: string): Observable<unknown> {
    return this.http.get(BACKEND_BASE_URL + '/initDevice', {
      params: new HttpParams().set('deviceId', deviceId),
    });
  }

  /**
   * Initialize device list in backend, backend will start the xmldumper
   * server on the device
   * @param deviceIdList device id list separater by comma.
   * @param isCleanInit whether need a clean init.
   */
  initDevicesFromListV2(deviceIdList: string, isCleanInit: boolean):
      Observable<InitDevicesResponse> {
    return this.http.get<InitDevicesResponse>(
        BACKEND_BASE_URL + '/initDevicesFromListV2', {
          params: new HttpParams()
                      .set('devicesIdList', deviceIdList)
                      .set('isCleanInit', isCleanInit.toString()),
        });
  }

  /** Changes the current workflow in backend. */
  loadWorkflow(uuid: string) {
    return this.http.get(BACKEND_BASE_URL + '/loadWorkflow', {
      params: new HttpParams().set('uuidStr', uuid),
    });
  }

  /**
   * Performs long click on current device
   */
  longClick(x: number, y: number, duration: number) {
    return this.http.get(BACKEND_BASE_URL + '/longclick', {
      params: new HttpParams()
                  .set('x', Math.floor(x).toString())
                  .set('y', Math.floor(y).toString())
                  .set('duration', duration.toString())
    });
  }

  /**
   * Sends given keyCode to the backend and will click the button on the
   * current selected device
   * @param keyCode which key to click.
   */
  pressKey(keyCode: KeyCodes): Observable<unknown> {
    return this.http.get(BACKEND_BASE_URL + '/pressKey', {
      params: new HttpParams().set('keyCode', keyCode.toString()),
    });
  }

  /** Plays current workflow */
  playCurrentWorkflow(): Observable<PlayActionResponse> {
    return this.http.get<PlayActionResponse>(
        BACKEND_BASE_URL + '/playCurrentWorkflow');
  }

  /** Plays the current workflow starting from given action */
  playCurrentWorkflowFromAction(playActionRequest: PlayActionRequest):
      Observable<PlayActionResponse> {
    return this.http.post<PlayActionResponse>(
        BACKEND_BASE_URL + '/playCurrentWorkflowFromAction', playActionRequest,
        this.OPTIONS);
  }

  /** Plays the given action. */
  playAction(playActionRequest: PlayActionRequest):
      Observable<PlayActionResponse> {
    return this.http.post<PlayActionResponse>(
        BACKEND_BASE_URL + '/playAction', playActionRequest, this.OPTIONS);
  }

  /** Removes the action with given uuid */
  removeAction(index: string) {
    return this.http.post(BACKEND_BASE_URL + '/removeAction', index);
  }

  /** Removes last action in current workflow */
  removeLastAction() {
    return this.http.get(BACKEND_BASE_URL + '/removeLastAction');
  }

  /**
   * Reorders the current workflow compound's children Action based on the
   * actionIdList on backend
   */
  reorderActions(actionIdList: string[]) {
    return this.http.post(
        BACKEND_BASE_URL + '/reorderActions', JSON.stringify(actionIdList),
        this.OPTIONS);
  }

  /**
   * Saves the given workflow to backend
   * @workflow workflow description
   */
  saveCurrentWorkflow(workflow: ActionSummaryMetaData) {
    return this.http.post(
        BACKEND_BASE_URL + '/saveCurrentWorkflow', JSON.stringify(workflow));
  }

  /**
   * Saves the current workflow to backend
   */
  saveCurrentWorkflowWithoutMetadata() {
    return this.http.post(
        BACKEND_BASE_URL + '/saveCurrentWorkflowWithoutMetadata', null);
  }

  /**
   * Sets different play configurations
   * @param mode SINGLE|MULTI|PLAYALL
   */
  setPlayMode(mode: string): Observable<unknown> {
    return this.http.get(BACKEND_BASE_URL + '/setPlayMode', {
      params: new HttpParams().set('playMode', mode),
    });
  }

  /**
   * Sets play speed factor
   * @param playSpeedFactor. >= 0.1, backend have the logic to make sure it
   * greater than 0.1
   */
  setPlaySpeedFactor(playSpeedFactor: number) {
    return this.http.post(
        BACKEND_BASE_URL + '/setPlaySpeedFactor', playSpeedFactor);
  }

  /**
   * Changes the current device used for test
   * @param deviceId serial of the device to be used in the test
   */
  selectedDeviceChanged(deviceId: string): Observable<unknown> {
    return this.http.get(BACKEND_BASE_URL + '/selectedDeviceChanged', {
      params: new HttpParams().set('deviceId', deviceId),
    });
  }

  /** Restart backend spring service */
  softRestart() {
    return this.http.get(BACKEND_BASE_URL + '/softRestart');
  }

  /** Performs swipe action */
  swipe(startX: number, startY: number, endX: number, endY: number) {
    return this.http.get(BACKEND_BASE_URL + '/swipe', {
      params: new HttpParams()
                  .set('startX', Math.floor(startX).toString())
                  .set('startY', Math.floor(startY).toString())
                  .set('endX', Math.floor(endX).toString())
                  .set('endY', Math.floor(endY).toString())
    });
  }

  /**
   * Sends the tap command to backend, (x,y) is at frontend scale(logic
   * point), and backend will covert to physical point(store the logic
   * point).
   */
  tap(x: number, y: number) {
    return this.http.get(BACKEND_BASE_URL + '/tap', {
      params: new HttpParams()
                  .set('x', Math.floor(x).toString())
                  .set('y', Math.floor(y).toString())
    });
  }

  /** Validates the backend status */
  validateUicdBackendConnection() {
    return this.http.get(BACKEND_BASE_URL + '/validateUicdBackendConnection');
  }

  /** Performs Zoom action on current devices */
  zoom(x1: number, y1: number, x2: number, y2: number, isZoomIn: boolean) {
    return this.http.get(BACKEND_BASE_URL + '/zoom', {
      params: new HttpParams()
                  .set('x1', Math.floor(x1).toString())
                  .set('y1', Math.floor(y1).toString())
                  .set('x2', Math.floor(x2).toString())
                  .set('y2', Math.floor(y2).toString())
                  .set('isZoomIn', String(isZoomIn))
    });
  }

  /**
   * Updates the workflow with the same uuid.
   * @param workflow new workflow description.
   */
  updateActionMetadata(workflow: ActionSummaryMetaData) {
    return this.http.post(
        BACKEND_BASE_URL + '/updateActionMetadata', JSON.stringify(workflow));
  }

  /** Updates the validation action. */
  updateValidationAction(uuidStr: string, req: ValidationRequestDetails) {
    return this.http.post(
        BACKEND_BASE_URL + '/updateValidationAction', JSON.stringify(req),
        {params: new HttpParams().set('uuidStr', uuidStr)});
  }

  /**
   * Performs Swipe action on current device following given direction.
   */
  quickSwipe(direction: SwipeDirection): Observable<unknown> {
    return this.http.get(BACKEND_BASE_URL + '/quickSwipe', {
      params: new HttpParams().set('dir', direction),
    });
  }

  /**
   * Performs Swipe action on current device following given direction.
   */
  rotateScreen(direction: RotateDirection): Observable<unknown> {
    return this.http.get(BACKEND_BASE_URL + '/screenRotate', {
      params: new HttpParams().set('dir', direction),
    });
  }

  /** Takes the screenshot of the current screen of selected device */
  takeScreenshot(): Observable<ImageResponse> {
    return this.http.get<ImageResponse>(BACKEND_BASE_URL + '/takeScreenshot');
  }

  /** Gets the scaled dimensions of the screenshot */
  getScaledScreenDimensions(): Observable<ScaledScreenDimensionsResponse> {
    return this.http.get<ScaledScreenDimensionsResponse>(
        BACKEND_BASE_URL + '/getScaledScreenDimensions');
  }

  /** Adds Image to image database */
  addImage(imgBase64Str: string): Observable<UuidResponse> {
    return this.http.post<UuidResponse>(
        BACKEND_BASE_URL + '/addImage', imgBase64Str);
  }

  /**
   * Gets scaled regions from the backend so that can be saved in the
   * action
   */
  getScaledRegions(regionsSelected: Shape[]): Observable<Shape[]> {
    return this.http.post<Shape[]>(
        BACKEND_BASE_URL + '/getScaledRegions',
        JSON.stringify(regionsSelected));
  }

  /**
   * Gets scaled regions from the backend so that can be saved in the
   * action
   */
  deleteImage(refImgUuid: string): Observable<void> {
    return this.http.post<void>(`${BACKEND_BASE_URL}/deleteImage`, refImgUuid);
  }

  /**
   * Creates new project.
   */
  createProject(projectName: string): Observable<ProjectListResponse> {
    return this.http.post<ProjectListResponse>(
        BACKEND_BASE_URL + '/createProject', projectName);
  }

  /**
   * Deletes project.
   */
  deleteProject(projectId: string): Observable<ProjectListResponse> {
    return this.http.post<ProjectListResponse>(
        BACKEND_BASE_URL + '/deleteProjectByProjectId', projectId);
  }

  /**
   * Gets project list that contains all the projects of current user.
   */
  getProjectList(): Observable<ProjectListResponse> {
    return this.http.get<ProjectListResponse>(
        BACKEND_BASE_URL + '/getProjectList');
  }

  /**
   * Gets project list that contains all the projects of the given user.
   */
  getProjectListByUsername(username: string): Observable<ProjectListResponse> {
    return this.http.get<ProjectListResponse>(
        BACKEND_BASE_URL + '/getProjectListByUsername', {
          params: new HttpParams().set('username', username),
        });
  }

  /**
   * Sets current project after user selects from project list.
   */
  setCurrentProject(projectName: string): Observable<ProjectListResponse> {
    return this.http.post<ProjectListResponse>(
        BACKEND_BASE_URL + '/setCurrentProject', projectName);
  }

  /**
   * Fetches the methods availabe in the snippet validation action for the
   * selected package.
   * @param packageName name of the package of which the methods needs to
   *     fetched
   */
  getAllAvailableSnippetMethods(packageName: string) {
    return this.http.get(BACKEND_BASE_URL + '/getAllAvailableSnippetMethods', {
      params: new HttpParams().set('packageName', packageName),
    });
  }
}
