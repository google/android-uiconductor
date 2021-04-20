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

import {ImportCopyType} from './constants';
import {Bounds} from './rect';

/** Define all interfaces used in frontend */
export interface Action {
  actionType: string;
  type: string;
  isByElement: boolean;
  arguments: string;
  stopType?: string;
}

/** CurrentUserResponse represents backend response for getCurrentUser */
export interface CurrentUserResponse {
  name: string;
}

/** Defines Screen content summary, used in the screen validation flow */
export interface ScreenContentSummary {
  displayText: string;
  resourceId: string;
  checked: boolean;
}

/** Defines exported data properties */
export interface ExportedTestCaseData {
  isTopLevelWorkflow?: boolean;
  additionalData:
      {version: string; filePath: string; globalVariableStr: string};
}

/** Response indicates devices already inititialzed in backend */
export interface InitDevicesResponse {
  deviceStatusList: string[];
}

/** Response indicates devices already inititialzed in backend */
export interface VersionInfoResponse {
  backendVersion: string;
  xmlDumperVersion: string;
}

/** Response indicates success/failure status of each individual step */
export interface PlayActionResponse {
  actionId: string;
  outputType: string;
  externalFilePath: string;
  content: string;
  sequenceIndex: number;
  playStatus: string;
  validationDetails: string;
  childrenResult: PlayActionResponse[];
}

/** Defines backend entities for fetchTestHistory endpoint */
export interface TestHistoryEntity {
  createdAt: {nano: number; epochSecond: number;};
  createdBy: string;
  uuid: string;
  executionId: string;
  testDetails: string;
  testMsg: string;
  testcaseUuid: string;
  testResult: string;
}

/** Defines backend response for fetchTestHistory endpoint */
export interface TestHistoryResponse {
  testHistoryEntities: TestHistoryEntity[];
}

/** Defines play action request */
export interface PlayActionRequest {
  actionId?: string;
  playSpeedFactor: number;
}

/** Defines backend response for getUserPresetGlobalVariable endpoint */
export interface GetUserPresetGlobalVariableResponse {
  globalVariableStr: string;
}

/** Response contains the screenshot in the form of string */
export interface ImageResponse {
  image: string;
}

/** Response contains the scaled dimensions in the form of string */
export interface ScaledScreenDimensionsResponse {
  width: number;
  height: number;
}

/** Response contains the screenshot in the form of string */
export interface UuidResponse {
  uuid: string;
}

/** Response contains the image uuid and images in the form of string */
export interface UuidToBase64ImgResponse {
  [index: string]: string;
}

/**
 * Response contains wrapper for the image uuid and images in the form of
 * string
 */
export interface ImagesResponse {
  uuidTobase64Img: UuidToBase64ImgResponse;
}

/** Defintes the export project request details */
export interface ExportImportProjectRequest {
  projectId: string;
  projectName: string;
  zipFileName: string;
}

/** Defines backend response for Project queries. */
export interface ProjectListResponse {
  projectList: ProjectRecord[];
  success: boolean;
}

/** Defined the unit of Project for frontend use. */
export interface ProjectRecord {
  createdAt?: {nano: number; epochSecond: number;};
  createdBy?: string;
  userId?: string;
  projectName: string;
  projectId: string;
  shareWith?: string;
}

/** Query interface for ConditionValidationAction */
export interface Query {
  condition: string;
  rules: Array<QueryField|Query>;
}

/** QueryField represents an assertion on an xml property */
export interface QueryField {
  field: string;
  operator: string;
  value: string;
}

/**
 * UpdateTestCaseTreeRequest declares JSON response from backend call
 * updateTestCaseTree.
 */
export declare interface UpdateTestCaseTreeRequest {
  uuid?: string;
  treeDetails: string;
  projectId: string;
}

/** Defined the request interface to copy the project. */
export interface ProjectCopyRequest {
  srcProjectId: string;
  targetProjectId: string;
}

/** Defined the response record from ocr engine. */
export interface OcrRecord {
  text: string;
  bounds: Bounds;
}

/** Defined the response details from ocr engine. */
export interface OcrDetailsResponse {
  boundsStringMapping: OcrRecord[];
}

/** Defined the request details from python debugger. */
export interface PythonDebuggerRequest {
  pythonScript: string;
  breakLines: string;
}

/** Defined the response details from python debugger. */
export interface PythonDebuggerResponse {
  result: string;
  currentLineIndex: number;
}
