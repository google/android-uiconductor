webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_services/backend-manager/backend-manager.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendManagerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_device__ = __webpack_require__("./src/app/constants/device.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BackendManagerService = /** @class */ (function () {
    function BackendManagerService(http) {
        this.http = http;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_2__constants_device__["a" /* BACKEND_BASE_URL */];
    }
    BackendManagerService.prototype.addActionByUuid = function (uuid) {
        return this.http.get(this.baseUrl + '/addActionByUUID', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('uuidStr', uuid),
        });
    };
    BackendManagerService.prototype.addActionToWorkflow = function (actions) {
        var fullUrl = this.baseUrl + '/addActionToWorkflow';
        var jsonStrings = [];
        for (var i = 0; i < actions.length; i++) {
            jsonStrings.push(JSON.stringify(actions[i]));
        }
        return this.http.post(this.baseUrl + '/addActionToWorkflow', jsonStrings.join(','));
    };
    BackendManagerService.prototype.addDragAction = function (xList, yList) {
        return this.http.get(this.baseUrl + '/addDragAction', { params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('xList', xList).set('yList', yList) });
    };
    BackendManagerService.prototype.addScreenCapAction = function (actions) {
        return this.http.post(this.baseUrl + '/batchPlay', actions.join(','));
    };
    BackendManagerService.prototype.addValidationStep = function (params) {
        return this.http.get(this.baseUrl + '/addValidationStep' +
            '?' + params.toString());
    };
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
    BackendManagerService.prototype.addImageValidationStep = function (dataDictionary) {
        return this.http.post(this.baseUrl + '/addImageMatchingValidationStep', JSON.stringify(dataDictionary));
    };
    BackendManagerService.prototype.copyAction = function (uuid) {
        return this.http.get(this.baseUrl + '/copyAction', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('uuidStr', uuid),
        });
    };
    BackendManagerService.prototype.cancelCurrentWorkflow = function () {
        return this.http.get(this.baseUrl + '/cancelCurrentWorkflow');
    };
    BackendManagerService.prototype.createNewWorkSpace = function () {
        return this.http.get(this.baseUrl + '/createNewWorkSpace');
    };
    BackendManagerService.prototype.doubleClick = function (x, y) {
        return this.http.get(this.baseUrl + '/doubleclick', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
                .set('x', Math.floor(x).toString())
                .set('y', Math.floor(y).toString())
        });
    };
    BackendManagerService.prototype.dragMove = function (x, y) {
        return this.http.get(this.baseUrl + '/dragMove', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
                .set('x', Math.floor(x).toString())
                .set('y', Math.floor(y).toString())
        });
    };
    BackendManagerService.prototype.dragStart = function (x, y) {
        return this.http.get(this.baseUrl + '/dragStart', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
                .set('x', Math.floor(x).toString())
                .set('y', Math.floor(y).toString())
        });
    };
    BackendManagerService.prototype.dragStop = function (x, y) {
        return this.http.get(this.baseUrl + '/dragStop', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
                .set('x', Math.floor(x).toString())
                .set('y', Math.floor(y).toString())
        });
    };
    BackendManagerService.prototype.exportTestCase = function (uuid) {
        return this.http.get(this.baseUrl + '/exportTestCase', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('uuidStr', uuid),
        });
    };
    BackendManagerService.prototype.fetchTestcaseHistory = function () {
        return this.http.get(this.baseUrl + '/fetchTestcaseHistory');
    };
    BackendManagerService.prototype.fetchTestcaseTreeByUsername = function (username) {
        return this.http.get(this.baseUrl + '/fetchTestcaseTreeByUsername', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('username', username),
        });
    };
    BackendManagerService.prototype.fetchTestcaseByName = function (testcaseName) {
        return this.http.get(this.baseUrl + '/fetchTestcaseByName', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('testcaseName', testcaseName),
        });
    };
    BackendManagerService.prototype.fetchXML = function () {
        return this.http.get(this.baseUrl + '/fetchCurrentXML');
    };
    BackendManagerService.prototype.getActionDetails = function (uuid) {
        return this.http.get(this.baseUrl + '/getActionDetails', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('uuidStr', uuid),
        });
    };
    BackendManagerService.prototype.getAllAvailableSnippetMethods = function (packageName) {
        return this.http.get(this.baseUrl + '/getAllAvailableSnippetMethods', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('packageName', packageName),
        });
    };
    BackendManagerService.prototype.getContentFromScreen = function (startX, startY, endX, endY) {
        return this.http.get(this.baseUrl + '/getContentFromScreen', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
                .set('startX', Math.floor(startX).toString())
                .set('startY', Math.floor(startY).toString())
                .set('endX', Math.floor(endX).toString())
                .set('endY', Math.floor(endY).toString())
        });
    };
    BackendManagerService.prototype.getCurrentUser = function () {
        return this.http.get(this.baseUrl + '/getCurrentUser');
    };
    BackendManagerService.prototype.getCurrentWorkflow = function () {
        return this.http.get(this.baseUrl + '/getCurrentWorkflow');
    };
    BackendManagerService.prototype.getDeviceList = function () {
        return this.http.get(this.baseUrl + '/getDevicesList');
    };
    BackendManagerService.prototype.getDeviceRatios = function () {
        return this.http.get(this.baseUrl + '/getDeviceRatios');
    };
    BackendManagerService.prototype.getInitializedDevices = function () {
        return this.http.get(this.baseUrl + '/getInitedDevices');
    };
    BackendManagerService.prototype.getImageValidationOption = function () {
        return this.http.get(this.baseUrl + '/getImageValidationOption');
    };
    BackendManagerService.prototype.getPorts = function (deviceId) {
        return this.http.get(this.baseUrl + '/getPorts', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('deviceId', deviceId),
        });
    };
    BackendManagerService.prototype.hasInitializedDevices = function () {
        return this.http.get(this.baseUrl + '/hasInitedDevices');
    };
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
    BackendManagerService.prototype.imageValidationClick = function (dataDictionary) {
        return this.http.post(this.baseUrl + '/imageValidationClick', JSON.stringify(dataDictionary));
    };
    BackendManagerService.prototype.initDevice = function (deviceId) {
        return this.http.get(this.baseUrl + '/initDevice', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('deviceId', deviceId),
        });
    };
    BackendManagerService.prototype.initDevices = function (deviceId) {
        return this.http.get(this.baseUrl + '/initDevicesList', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('deviceId', deviceId),
        });
    };
    BackendManagerService.prototype.initMinicap = function (deviceId) {
        return this.http.get(this.baseUrl + '/initMiniCap', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('deviceId', deviceId),
        });
    };
    BackendManagerService.prototype.loadWorkflow = function (uuid) {
        return this.http.get(this.baseUrl + '/loadWorkflow', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('uuidStr', uuid),
        });
    };
    BackendManagerService.prototype.longClick = function (x, y, duration) {
        return this.http.get(this.baseUrl + '/longclick', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
                .set('x', Math.floor(x).toString())
                .set('y', Math.floor(y).toString())
                .set('duration', duration)
        });
    };
    BackendManagerService.prototype.playAction = function (uuid) {
        return this.http.post(this.baseUrl + '/playAction', uuid);
    };
    BackendManagerService.prototype.playAll = function (actions) {
        return this.http.post(this.baseUrl + '/batchPlay', actions.join(','));
    };
    BackendManagerService.prototype.playCurrentWorkflow = function () {
        return this.http.get(this.baseUrl + '/playCurrentWorkflow');
    };
    BackendManagerService.prototype.playCurrentWorkflowFromAction = function (uuid) {
        return this.http.post(this.baseUrl + '/playCurrentWorkflowFromAction', uuid);
    };
    BackendManagerService.prototype.pressKey = function (keyCode) {
        return this.http.get(this.baseUrl + '/pressKey', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('keyCode', keyCode),
        });
    };
    BackendManagerService.prototype.quickSwipe = function (direction) {
        return this.http.get(this.baseUrl + '/quickSwipe', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('dir', direction),
        });
    };
    BackendManagerService.prototype.removeAction = function (uuid) {
        return this.http.post(this.baseUrl + '/removeAction', uuid);
    };
    BackendManagerService.prototype.removeLastAction = function () {
        return this.http.get(this.baseUrl + '/removeLastAction');
    };
    BackendManagerService.prototype.rotateScreen = function (direction) {
        return this.http.get(this.baseUrl + '/screenRotate', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('dir', direction),
        });
    };
    BackendManagerService.prototype.saveCurrentWorkflow = function (workflow) {
        return this.http.post(this.baseUrl + '/saveCurrentWorkflow', JSON.stringify(workflow));
    };
    BackendManagerService.prototype.selectedDeviceChanged = function (deviceId) {
        return this.http.get(this.baseUrl + '/selectedDeviceChanged', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('deviceId', deviceId),
        });
    };
    BackendManagerService.prototype.setPlayMode = function (mode) {
        return this.http.get(this.baseUrl + '/setPlayMode', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]().set('playMode', mode),
        });
    };
    BackendManagerService.prototype.softRestart = function () {
        return this.http.get(this.baseUrl + '/softRestart');
    };
    BackendManagerService.prototype.swipe = function (startX, startY, endX, endY) {
        return this.http.get(this.baseUrl + '/swipe', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
                .set('startX', Math.floor(startX).toString())
                .set('startY', Math.floor(startY).toString())
                .set('endX', Math.floor(endX).toString())
                .set('endY', Math.floor(endY).toString())
        });
    };
    BackendManagerService.prototype.tap = function (x, y) {
        return this.http.get(this.baseUrl + '/tap', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
                .set('x', Math.floor(x).toString())
                .set('y', Math.floor(y).toString())
        });
    };
    BackendManagerService.prototype.validateUicdBackendConnection = function () {
        return this.http.get(this.baseUrl + '/validateUicdBackendConnection');
    };
    // currently unused
    BackendManagerService.prototype.turnOnOffScreen = function () {
        return this.http.get(this.baseUrl + '/turnOnOffScreen');
    };
    BackendManagerService.prototype.updateActionMetadata = function (newWorkflow) {
        return this.http.post(this.baseUrl + '/updateActionMetadata', JSON.stringify(newWorkflow));
    };
    BackendManagerService.prototype.zoom = function (startX, startY, endX, endY, isZoomIn) {
        return this.http.get(this.baseUrl + '/zoom', {
            params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
                .set('x1', Math.floor(startX).toString())
                .set('y1', Math.floor(startY).toString())
                .set('x2', Math.floor(endX).toString())
                .set('y2', Math.floor(endY).toString())
                .set('isZoomIn', isZoomIn)
        });
    };
    BackendManagerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], BackendManagerService);
    return BackendManagerService;
}());



/***/ }),

/***/ "./src/app/_services/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__message_service__ = __webpack_require__("./src/app/_services/message.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__message_service__["a"]; });
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



/***/ }),

/***/ "./src/app/_services/message.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("./node_modules/rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessageService = /** @class */ (function () {
    function MessageService() {
        // cannot call createMessage(),
        // needs to be done this way to initialize messageType
        var msgSrc = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"]('Default Message');
        this.messageTypes = {
            'default': { messageSource: msgSrc, currentMessage: msgSrc.asObservable() }
        };
    }
    MessageService.prototype.createMessage = function (type, msg) {
        var msgSrc = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](msg);
        // create new type/msgObj pair
        this.messageTypes[type] = {
            messageSource: msgSrc,
            currentMessage: msgSrc.asObservable()
        };
    };
    // This will handle both creating and sending a message
    MessageService.prototype.sendMessage = function (type, msg) {
        if (!(type in this.messageTypes)) {
            this.createMessage(type, msg);
        }
        else {
            // change message
            this.messageTypes[type].messageSource.next(msg);
        }
    };
    MessageService.prototype.clearMessage = function (type) {
        if (type in this.messageTypes) {
            this.messageTypes[type].messageSource.next();
        }
    };
    MessageService.prototype.getMessage = function (type) {
        if (!(type in this.messageTypes)) {
            this.createMessage(type, '');
        }
        return this.messageTypes[type].currentMessage;
    };
    MessageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], MessageService);
    return MessageService;
}());



/***/ }),

/***/ "./src/app/_services/testcase-manager/testcase-manager.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TCMService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_device__ = __webpack_require__("./src/app/constants/device.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TCMService = /** @class */ (function () {
    function TCMService(http) {
        this.http = http;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_2__constants_device__["a" /* BACKEND_BASE_URL */];
        this.treeUUID = '';
        this.currentWorkflowName = 'none';
        this.ROOT_ID = '#';
    }
    TCMService.prototype.setTreeComponent = function (treeComponent) {
        this.treeComponent = treeComponent;
    };
    TCMService.prototype.getCurrentWorkflowName = function () {
        return this.currentWorkflowName;
    };
    TCMService.prototype.setCurrentWorkflowName = function (name) {
        this.currentWorkflowName = name;
    };
    TCMService.prototype.saveJstreeModel = function () {
        var data = this.treeComponent.jstree(true)._model.data;
        var updatedTreeData = this.reconstructJstreeData(data, this.ROOT_ID);
        this.treeComponent.jstree(true).settings.core.data = updatedTreeData;
        var jsonTree = this.convertToJsonTreeFormat(updatedTreeData);
        this.updateTestCasesTree(jsonTree, this.treeUUID);
    };
    TCMService.prototype.createFolder = function (name, id) {
        return {
            'text': name ? name : 'Empty Node',
            'icon': 'fa fa-folder',
            'id': id,
            'state': { 'opened': true },
            'isFolder': true,
            'children': []
        };
    };
    TCMService.prototype.reconstructJstreeData = function (data, nodeId) {
        var treeData;
        if (data[nodeId].original) {
            treeData = data[nodeId].original;
        }
        else {
            treeData = this.createFolder(data[nodeId]['text'], data[nodeId]['id']);
        }
        // children element got taken out of original, so add it back in
        treeData['children'] = [];
        if (data[nodeId].children) {
            for (var _i = 0, _a = data[nodeId].children; _i < _a.length; _i++) {
                var childID = _a[_i];
                var childNode = this.reconstructJstreeData(data, childID);
                treeData['children'].push(childNode);
            }
        }
        return treeData;
    };
    TCMService.prototype.updateTestCasesTree = function (jsonTree, uuid) {
        var testEntityObj = {};
        testEntityObj['uuid'] = uuid;
        testEntityObj['treeDetails'] = JSON.stringify(jsonTree);
        var fullUrl = this.baseUrl + '/updateTestCaseTree';
        this.http.post(fullUrl, JSON.stringify(testEntityObj)).subscribe(function (data) {
            console.log(data);
        });
    };
    TCMService.prototype.getTestCasesEmptyTree = function () {
        var sampleTree = {
            value: 'MyWorkspace',
            id: 1,
            emitLoadNextLevel: false,
            children: [
                {
                    value: 'TestSuite1',
                    id: 2,
                    children: []
                },
                {
                    value: 'TestSuite2',
                    id: 3,
                    children: []
                }
            ]
        };
        return sampleTree;
    };
    TCMService.prototype.getTestCasesList = function () {
        var fullUrl = this.baseUrl + '/fetchTestcaseTree';
        return this.http.get(fullUrl);
    };
    TCMService.prototype.getCurrentTreeModel = function () {
        return this.treeComponent.jstree(true).settings.core.data;
    };
    TCMService.prototype.convertToJsTreeFormat = function (jsonTree) {
        var data = this.createFolder(jsonTree.value, jsonTree.id);
        if ('additionalData' in jsonTree && jsonTree['additionalData']) {
            data['additionalData'] = jsonTree['additionalData'];
            data['isFolder'] = false;
            // make this equal to false for no icon
            data['icon'] = 'fa fa-file-code-o';
        }
        if (jsonTree.children) {
            for (var _i = 0, _a = jsonTree.children; _i < _a.length; _i++) {
                var child = _a[_i];
                data.children.push(this.convertToJsTreeFormat(child));
            }
        }
        return data;
    };
    TCMService.prototype.convertToJsonTreeFormat = function (jsTreeData) {
        var sampleTree = {
            value: jsTreeData.text,
            id: jsTreeData.id,
            emitLoadNextLevel: false,
            children: []
        };
        if ('additionalData' in jsTreeData && jsTreeData['additionalData']) {
            sampleTree['additionalData'] = jsTreeData['additionalData'];
        }
        if (jsTreeData.children) {
            for (var _i = 0, _a = jsTreeData.children; _i < _a.length; _i++) {
                var child = _a[_i];
                sampleTree.children.push(this.convertToJsonTreeFormat(child));
            }
        }
        return sampleTree;
    };
    TCMService.prototype.getChildrenFolder = function (obj, folderNameList) {
        var _this = this;
        if (obj.children) {
            obj.children.forEach(function (child) {
                _this.getChildrenFolder(child, folderNameList);
            }, this);
            // Do not add root folder to folder list or test cases
            if (obj.isFolder && obj.id != this.ROOT_ID) {
                folderNameList.push({ value: obj.text, id: obj.id });
            }
        }
        return;
    };
    TCMService.prototype.getFolderList = function () {
        var treeModel = this.getCurrentTreeModel();
        var foldList = [];
        this.getChildrenFolder(treeModel, foldList);
        return foldList;
    };
    TCMService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], TCMService);
    return TCMService;
}());



/***/ }),

/***/ "./src/app/actions-plus/new-action-dialog/new-action-dialog.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.new-action-form > * {\n  width: 100%;\n}\n\n.new-action-form {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.form-text-align {\n  padding: 0 1em;\n}\n"

/***/ }),

/***/ "./src/app/actions-plus/new-action-dialog/new-action-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<p>Advanced Action</p>\n<div class=\"new-action-form\">\n  <mat-form-field>\n    <mat-select [(value)]=\"selectedActionType\" [disabled]=\"data['actionType'] != null\">\n      <mat-option *ngFor=\"let action of actionsTypes\" [value]=\"action.enum_name\">\n        {{ action.display }}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n  <div [ngSwitch]=\"selectedActionType\">\n    <div *ngSwitchCase=\"'COMMAND_LINE_ACTION'\">\n      <div class='new-action-form'>\n        <mat-form-field>\n          <input matInput [(ngModel)]=\"data.name\" placeholder=\"Name\">\n        </mat-form-field>\n        <mat-form-field>\n          <input matInput [(ngModel)]=\"data.delayAfterActionMs\" placeholder=\"Delay After Action (ms)\" type=\"number\">\n        </mat-form-field>\n        <!-- action tag is not support by the backend yet -->\n        <!-- <mat-form-field>\n          <input matInput [(ngModel)]=\"data.actionTag\" placeholder=\"Tag\">\n        </mat-form-field> -->\n        <mat-form-field>\n          <textarea matInput [(ngModel)]=\"data.actionDescription\" placeholder=\"Description\"></textarea>\n        </mat-form-field>\n        <mat-form-field>\n          <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"data.commandLine\" placeholder=\"Command Line\"></textarea>\n        </mat-form-field>\n        <mat-form-field>\n          <input matInput [(ngModel)]=\"data.expectedReturnCode\" placeholder=\"Expected Return Code\">\n        </mat-form-field>\n        <mat-form-field>\n          <input matInput [(ngModel)]=\"data.commandlineExecutionTimeoutSec\" placeholder=\"Command Timeout (sec)\" type=\"number\">\n        </mat-form-field>\n        <mat-checkbox [(ngModel)]=\"data.isAdbCommand\">ADB command</mat-checkbox>\n        <mat-checkbox [(ngModel)]=\"data.needShellOutput\">Need Shell Output</mat-checkbox>\n      </div>\n    </div>\n    <div *ngSwitchCase=\"'LOGCAT_VALIDATION_ACTION'\">\n      Logcat Validation Action\n      <div class='new-action-form'>\n       <mat-form-field>\n          <input matInput [(ngModel)]=\"data.name\" placeholder=\"Name\">\n        </mat-form-field>\n        <mat-form-field>\n          <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"data.commandLine\" placeholder=\"Command Line\"></textarea>\n        </mat-form-field>\n        <mat-form-field>\n          <mat-select placeholder=\"Match Type\"  [(ngModel)]=\"data.textValidator.contentMatchType\">\n            <mat-option value=\"EQUALS\">Equals</mat-option>\n            <mat-option value=\"CONTAINS\">Contains</mat-option>\n            <mat-option value=\"REGEX\">Regular expression</mat-option>\n            <mat-option value=\"IS_ANY_OF\">IsAnyOf</mat-option>\n            <mat-option value=\"UDM\">UserDefineMatch</mat-option>\n            <mat-option value=\"UNKNOWN\">Unknown</mat-option>\n          </mat-select>\n        </mat-form-field>\n        <mat-form-field>\n          <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"data.textValidator.patternValue\" placeholder=\"Text Pattern\"></textarea>\n        </mat-form-field>\n        <mat-form-field>\n          <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"selectedStopType\">\n            <mat-option *ngFor=\"let sType of stopTypes\" [value]=\"sType.name\">{{ sType.display }}</mat-option>\n          </mat-select>\n        </mat-form-field>\n        <mat-checkbox placeholder=\"Logcat Only\" [(ngModel)]=\"data.logcatOnly\">Logcat Only(No Validation)</mat-checkbox>\n      </div>\n    </div>\n    <div *ngSwitchCase=\"'INPUT_ACTION'\">\n      Input Action\n      <div class='new-action-form'>\n      <div [hidden]='data.isSingleChar'>\n        <mat-form-field>\n          <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"data.inputString\" placeholder=\"Input String\"></textarea>\n        </mat-form-field>\n      </div>\n      <div [hidden]='!data.isSingleChar'>\n        <mat-form-field>\n            <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"data.keyCode\" placeholder=\"Key Code\"></textarea>\n          </mat-form-field>\n      </div>\n      <mat-checkbox [(ngModel)]=\"data.isSingleChar\">Raw Key Code</mat-checkbox>\n      </div>\n    </div>\n    <div *ngSwitchCase=\"'REBOOT_ACTION'\">\n      <div class='new-action-form'>\n      <mat-checkbox [(ngModel)]=\"data.onlyReconnectToDevice\">Skip Reboot, Reconnect to Device Only</mat-checkbox>\n      Time to wait (in seconds) after reboot before reconnecting:<textarea rows=\"1\" cols=\"10\" matInput [(ngModel)]=\"data.reconnectTimeInSec\">30</textarea>\n      <br></div>\n    </div>\n    <div *ngSwitchCase=\"'CLICK_ACTION'\">\n      Click by Element Info\n      <div class='new-action-form'>\n          <mat-form-field>\n              <mat-select placeholder=\"Strategy\"  [(ngModel)]=\"data.strategy\">\n                <mat-option value=\"RESOURCEID\">Resource Id</mat-option>\n                <mat-option value=\"TEXT\">Text</mat-option>\n                <mat-option value=\"XPATH\">Xpath</mat-option>\n              </mat-select>\n            </mat-form-field>\n        <mat-form-field>\n          <input matInput [(ngModel)]=\"data.selector\" placeholder=\"Selector\">\n        </mat-form-field>\n      </div>\n    </div>\n    <div *ngSwitchCase=\"'GLOBAL_VARIABLE_VALIDATION_ACTION'\">\n      Uicd Global Variable Expression Validation Action\n      <div class='new-action-form'>\n        <mat-form-field>\n          <input matInput [(ngModel)]=\"data.name\" placeholder=\"Name\">\n        </mat-form-field>\n        <mat-form-field>\n          <input matInput [(ngModel)]=\"data.expression\" placeholder=\"Expression\">\n        </mat-form-field>\n        <mat-form-field>\n            <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"selectedStopType\">\n              <mat-option *ngFor=\"let sType of stopTypes\" [value]=\"sType.name\">{{ sType.display }}</mat-option>\n            </mat-select>\n          </mat-form-field>\n      </div>\n    </div>\n    <div *ngSwitchCase=\"'UICD_SNIPPET_VALIDATION_ACTION'\">\n        <div class=\"row\">\n          <span class=\"form-text-align\">Execute On-Device Snippet</span>\n          <button mat-mini-fab color=\"primary\" (click)=\"openSnippetActionInfoDlg()\" matTooltip=\"Show Info\" matTooltipPosition=\"left\" matTooltipShowDelay=\"500\">\n            <i class=\"fa fa-info\"></i>\n          </button>\n        </div>\n        <div class='new-action-form'>\n          <mat-form-field>\n            <input matInput placeholder=\"Action Name\" [(ngModel)]=\"data.name\">\n          </mat-form-field>\n          <mat-form-field>\n            <mat-select placeholder=\"Package Name\"  [(ngModel)]=\"data.packageName\" (change)=\"selectedPackageChanged($event.value)\">\n              <!-- The list of packages is hard-coded currently and needs to be updated manually.-->\n              <mat-option value=\"com.google.android.mobly.snippet.bundled\">com.google.android.mobly.snippet.bundled</mat-option>\n            </mat-select>\n          </mat-form-field>\n          <mat-progress-bar *ngIf=\"isWaitingForMethodList\" mode=\"indeterminate\"></mat-progress-bar>\n          <mat-form-field>\n            <mat-select placeholder=\"Method Name\"  [(ngModel)]=\"data.method\" (change)=\"methodSelected($event.value)\">\n              <mat-option *ngFor=\"let method of methodList\" [value]=\"method.name\">{{ method.display }}</mat-option>\n            </mat-select>\n          </mat-form-field>\n          <mat-form-field>\n            <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"data.arguments\" placeholder=\"Arguments Separated By ','\"></textarea>\n          </mat-form-field>\n          <mat-form-field>\n            <input matInput [(ngModel)]=\"data.timeout\" placeholder=\"Timeout Limit (ms)\">\n          </mat-form-field>\n          <mat-form-field>\n            <mat-select placeholder=\"Match Type\"  [(ngModel)]=\"data.textValidator.contentMatchType\">\n              <mat-option value=\"EQUALS\">Equals</mat-option>\n              <mat-option value=\"CONTAINS\">Contains</mat-option>\n              <mat-option value=\"REGEX\">Regular expression</mat-option>\n              <mat-option value=\"IS_ANY_OF\">IsAnyOf</mat-option>\n              <mat-option value=\"UDM\">UserDefineMatch</mat-option>\n              <mat-option value=\"UNKNOWN\">Unknown</mat-option>\n            </mat-select>\n          </mat-form-field>\n          <mat-form-field>\n            <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"data.textValidator.patternValue\" placeholder=\"Text Pattern\"></textarea>\n          </mat-form-field>\n          <mat-form-field>\n            <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"selectedStopType\">\n              <mat-option *ngFor=\"let sType of stopTypes\" [value]=\"sType.name\">{{ sType.display }}</mat-option>\n            </mat-select>\n          </mat-form-field>\n          <mat-checkbox placeholder=\"Execute Snippet Only (No Validation)\" [(ngModel)]=\"data.executeSnippetOnly\">Snippet Service Only(No Validation)</mat-checkbox>\n        </div>\n      </div>\n      <div *ngSwitchCase=\"'SCRIPT_EXECUTION_ACTION'\">\n        <div class = \"row\">\n          <span class=\"form-text-align\">Execute Python 2.7 Scripts on the Android Device</span>\n          <button mat-mini-fab color=\"primary\" (click)=\"openScriptActionInfoDlg()\" matTooltip=\"Show Info\" matTooltipPosition=\"left\" matTooltipShowDelay=\"500\">\n            <i class=\"fa fa-info\"></i>\n          </button>\n        </div>\n        <div class='new-action-form'>\n          <mat-form-field>\n            <input matInput placeholder=\"Action Name\" [(ngModel)]=\"data.name\">\n          </mat-form-field>\n          <mat-form-field>\n            <input matInput [(ngModel)]=\"data.delayAfterActionMs\" placeholder=\"Delay After Action (ms)\" type=\"number\">\n          </mat-form-field>\n          <mat-form-field>\n            <textarea matInput [(ngModel)]=\"data.actionDescription\" placeholder=\"Description\"></textarea>\n          </mat-form-field>\n          <mat-form-field>\n            <textarea rows=\"4\" cols=\"500\" matInput [(ngModel)]=\"data.arguments\" placeholder=\"Script Arguments (separated by spaces)\"></textarea>\n          </mat-form-field>\n          <mat-form-field>\n            <textarea rows=\"8\" cols=\"500\" matInput [(ngModel)]=\"data.scriptCodeContent\" placeholder=\"Script Code Content\"></textarea>\n          </mat-form-field>\n          <mat-form-field>\n            <!-- Reuse the command line execution timeout variable name for reusing the data field though it is not a commnad line action.\n            We can fix it later to let every action requiring such execution timeout use the general executionTimeoutSec. Please refer to cl/213658685 for details.  -->\n            <input matInput [(ngModel)]=\"data.commandlineExecutionTimeoutSec\" placeholder=\"Script Timeout (sec)\" type=\"number\">\n          </mat-form-field>\n        </div>\n      </div>\n    <div *ngSwitchDefault>N/A</div>\n  </div>\n  <div>\n    <button mat-raised-button (click)=\"saveAction()\">Save Action</button>\n    <button mat-raised-button (click)=\"onNoClick()\">Cancel</button>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/actions-plus/new-action-dialog/new-action-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewActionDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_index__ = __webpack_require__("./src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_testcase_manager_testcase_manager_service__ = __webpack_require__("./src/app/_services/testcase-manager/testcase-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__ = __webpack_require__("./src/app/constants/messageTypes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__script_action_info_dialog__ = __webpack_require__("./src/app/actions-plus/new-action-dialog/script-action-info-dialog.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__snippet_action_info_dialog__ = __webpack_require__("./src/app/actions-plus/new-action-dialog/snippet-action-info-dialog.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var NewActionDialogComponent = /** @class */ (function () {
    function NewActionDialogComponent(dialog, messageService, tcmService, dialogRef, backendManagerService, data) {
        this.dialog = dialog;
        this.messageService = messageService;
        this.tcmService = tcmService;
        this.dialogRef = dialogRef;
        this.backendManagerService = backendManagerService;
        this.data = data;
        this.isAdbCommand = false;
        this.saveToFolderId = '';
        this.isSaveWorkflow = false;
        this.isNewAction = true;
        this.isWaitingForMethodList = false;
        this.methodList = [];
        // name need match the name of java class.
        this.actionsTypes = [
            {
                name: 'CommandLineAction',
                display: 'Command Line Action',
                enum_name: 'COMMAND_LINE_ACTION'
            },
            {
                name: 'LogcatValidationAction',
                display: 'Logcat Validation Action',
                enum_name: 'LOGCAT_VALIDATION_ACTION'
            },
            { name: 'InputAction', display: 'Input Action', enum_name: 'INPUT_ACTION' },
            {
                name: 'RebootAction',
                display: 'Reboot Action',
                enum_name: 'REBOOT_ACTION'
            },
            {
                name: 'ClickAction',
                display: 'Advanced Click Action',
                enum_name: 'CLICK_ACTION'
            },
            {
                name: 'GlobalVariableValidationAction',
                display: 'Global Variable Validation Action',
                enum_name: 'GLOBAL_VARIABLE_VALIDATION_ACTION'
            },
            {
                name: 'UicdSnippetValidationAction',
                display: 'Uicd Snippet Validation Action',
                enum_name: 'UICD_SNIPPET_VALIDATION_ACTION'
            },
            {
                name: 'ScriptExecutionAction',
                display: 'Script Execution Action',
                enum_name: 'SCRIPT_EXECUTION_ACTION'
            },
        ];
        this.selectedStopType = 'StopTestIfFalse';
        this.stopTypes = [
            { name: 'StopTestIfFalse', display: 'Stop Test if False' },
            { name: 'StopTestIfTrue', display: 'Stop Test if True' },
            {
                name: 'StopCurrentCompoundIfFalse',
                display: 'Stop current compound if False'
            },
            {
                name: 'StopCurrentCompoundIfTrue',
                display: 'Stop current compound if True'
            },
        ];
        this.setDefaultValue();
    }
    NewActionDialogComponent.prototype.ngOnInit = function () { };
    NewActionDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    NewActionDialogComponent.prototype.setDefaultValue = function () {
        if (!this.data.hasOwnProperty('commandlineExecutionTimeoutSec')) {
            this.data['commandlineExecutionTimeoutSec'] =
                '5'; // CommandLineAction and ScriptExecutionAction
        }
        if (!this.data.hasOwnProperty('isSingleChar')) {
            this.data['isSingleChar'] = false; // InputActionn
        }
        if (!this.data.hasOwnProperty('onlyReconnectToDevice')) {
            this.data['onlyReconnectToDevice'] = false; // RebootAction
        }
        if (!this.data.hasOwnProperty('reconnectTimeInSec')) {
            this.data['reconnectTimeInSec'] = 30; // RebootAction
        }
        if (!this.data.hasOwnProperty('textValidator')) {
            this.data['textValidator'] = {}; // LogcatValidationAction
        }
        if (!this.data.hasOwnProperty('name')) {
            this.data['name'] = 'New Action';
        }
        if (!this.data.hasOwnProperty('timeout')) {
            this.data['timeout'] = 5000;
        }
        if (!this.data.hasOwnProperty('delayAfterActionMs')) {
            this.data['delayAfterActionMs'] =
                '100'; // CommandLineAction and ScriptExecutionAction
        }
        if (this.data.hasOwnProperty('actionType')) {
            this.selectedActionType = this.data['actionType'];
            this.isNewAction = false;
        }
    };
    NewActionDialogComponent.prototype.getActionClassName = function (enumName) {
        var actionElem = this.actionsTypes.find(function (elem) { return elem.enum_name === enumName; });
        return actionElem.name;
    };
    NewActionDialogComponent.prototype.saveAction = function () {
        var _this = this;
        console.log(this);
        this.data['actionType'] = this.selectedActionType;
        this.data['type'] = this.getActionClassName(this.selectedActionType);
        if (this.data['type'] === 'ClickAction') {
            this.data['isByElement'] = true;
        }
        if (this.data['type'] === 'UicdSnippetValidationAction') {
            this.data['arguments'] = this.data['arguments'] === undefined ?
                '[]' :
                '[' + this.data['arguments'] + ']';
        }
        if (this.data['type'] === 'ScriptExecutionAction') {
            if (this.data['arguments'] === undefined) {
                this.data['arguments'] = '';
            }
        }
        this.data['stopType'] = this.selectedStopType;
        if (!this.isNewAction) {
            this.backendManagerService.updateActionMetadata(this.data).subscribe(function (data) {
                console.log(data);
            });
        }
        else {
            this.backendManagerService.addActionToWorkflow([this.data])
                .subscribe(function (data) {
                _this.sendMessage();
                console.log(data);
            });
        }
        this.dialogRef.close();
    };
    NewActionDialogComponent.prototype.sendMessage = function () {
        // send message to subscribers via observable subject
        this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__["a" /* MESSAGE_TYPES */].refreshWorkflow, 'message from recorder!');
    };
    NewActionDialogComponent.prototype.selectedPackageChanged = function (selectedPackage) {
        var _this = this;
        if (selectedPackage !== undefined) {
            this.isWaitingForMethodList = true;
            this.backendManagerService.getAllAvailableSnippetMethods(selectedPackage)
                .subscribe(function (data) {
                _this.methodList = [];
                for (var _i = 0, _a = data; _i < _a.length; _i++) {
                    var methodData = _a[_i];
                    var methodStart = methodData.indexOf(' ') + 1;
                    var methodEnd = methodData.indexOf('(');
                    _this.methodList.push({
                        name: methodData.substring(methodStart, methodEnd),
                        display: methodData
                    });
                }
                _this.isWaitingForMethodList = false;
            });
        }
    };
    NewActionDialogComponent.prototype.methodSelected = function (selectedMethodValue) {
        for (var _i = 0, _a = this.methodList; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry['name'] == selectedMethodValue) {
                if (entry['display'].indexOf('returns void') >= 0) {
                    this.data['executeSnippetOnly'] = true;
                    break;
                }
            }
        }
    };
    NewActionDialogComponent.prototype.openSnippetActionInfoDlg = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_7__snippet_action_info_dialog__["a" /* SnippetActionInfoDialogComponent */], {
            width: '800px',
        });
    };
    NewActionDialogComponent.prototype.openScriptActionInfoDlg = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_6__script_action_info_dialog__["a" /* ScriptActionInfoDialogComponent */], {
            width: '800px',
        });
    };
    NewActionDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-new-action-dialog',
            template: __webpack_require__("./src/app/actions-plus/new-action-dialog/new-action-dialog.component.html"),
            styles: [__webpack_require__("./src/app/actions-plus/new-action-dialog/new-action-dialog.component.css")],
        }),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_3__services_index__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_4__services_testcase_manager_testcase_manager_service__["a" /* TCMService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogRef */],
            __WEBPACK_IMPORTED_MODULE_2__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */], Object])
    ], NewActionDialogComponent);
    return NewActionDialogComponent;
}());



/***/ }),

/***/ "./src/app/actions-plus/new-action-dialog/script-action-info-dialog.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.info-table {\n    width: 100%;\n    display: table;\n    border-collapse: collapse;\n    border-spacing: 0;\n}\n\n.info-table tr {\n    border-bottom: 1px solid rgba(0,0,0,0.12);\n}\n\n.info-table td:nth-child(2) {\n    border-left: 1px solid rgba(0,0,0,0.12);\n    max-width: 400px;\n}\n\n.info-table td:nth-child(1) {\n    min-width: 150px;\n}\n\n.foot-note {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}"

/***/ }),

/***/ "./src/app/actions-plus/new-action-dialog/script-action-info-dialog.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n    <h2>Script Configuration Details</h2>\n    <table class='info-table'>\n        <thead>\n            <tr>\n                <th>Field Name</th>\n                <th>Description & Examples</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>Script Argument List</td>\n                <td>This field specifies arguments to run the Python script with. Arguments can be configured in two ways:\n                    1. List the arguments in order, for example: '1,2,3 Android Uicd'. To use them in the script, reference them as follows:<br>\n                    <b>import sys<br>\n                    str = sys.argv[2] # this will give you 'Uicd'<br>\n                    print str<br>\n                    </b>\n                    2. List the arguments with explicit names, for example: '--systemVersion=Oreo' and reference the name directly in the script as follows:<br>\n                    <b>import argparse<br>\n                    parser = argparse.ArgumentParser(description='manual to this script')<br>\n                    parser.add_argument('--systemVersion', type=str, default = None)<br>\n                    args = parser.parse_args()<br>\n                    print args.systemVersion<br>\n                    </b>\n                </td>\n            </tr>\n            <tr>\n                <td>Script Code Content</td>\n                <td>This field contains the code content of the script. Note that you should import the 'android' library first, as this provides APIs to interact with the connected device.\n                    Refer to this <a href=\"http://www.mithril.com.au/android/doc/\">link</a> for more information on the available APIs. \n                    Please note that the script should conform to Python2 syntax. The following is an example Python script to trigger a notification on the screen:<br>\n                    <b>import android<br>\n                    droid = android.Android()<br>\n                    droid.makeToast('Hello, Android!')<br>\n                    </b>\n                </td>\n            </tr>\n        </tbody>\n    </table>  \n    <div class=\"foot-note\" >*More details can be found in go/uicd-userguide</div>\n    <button mat-raised-button color=\"primary\" (click)=\"onOkClick()\">OK</button>\n</div>\n"

/***/ }),

/***/ "./src/app/actions-plus/new-action-dialog/script-action-info-dialog.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScriptActionInfoDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ScriptActionInfoDialogComponent = /** @class */ (function () {
    function ScriptActionInfoDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ScriptActionInfoDialogComponent.prototype.onOkClick = function () {
        this.dialogRef.close();
    };
    ScriptActionInfoDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'script-action-info-dialog',
            template: __webpack_require__("./src/app/actions-plus/new-action-dialog/script-action-info-dialog.html"),
            styles: [__webpack_require__("./src/app/actions-plus/new-action-dialog/script-action-info-dialog.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogRef */], Object])
    ], ScriptActionInfoDialogComponent);
    return ScriptActionInfoDialogComponent;
}());

;


/***/ }),

/***/ "./src/app/actions-plus/new-action-dialog/snippet-action-info-dialog.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.info-table {\n  width: 100%;\n  display: table;\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.info-table tr {\n  border-bottom: 1px solid rgba(0,0,0,0.12);\n}\n\n.info-table td:nth-child(2) {\n  border-left: 1px solid rgba(0,0,0,0.12);\n  max-width: 400px;\n}\n\n.info-table td:nth-child(1) {\n\n  min-width: 150px;\n}\n\n.foot-note {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}"

/***/ }),

/***/ "./src/app/actions-plus/new-action-dialog/snippet-action-info-dialog.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n    <h2>On-Device Snippet Details</h2>\n    <table class='info-table'>\n        <thead>\n            <tr>\n                <th>Field Name</th>\n                <th>Description</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>Package Name</td>\n                <td>This field specifies the snippet package in the APK that has been installed onto the connected device.\n                    Once selected, Uicd will fetch all the methods under that package and list them in the Method Name box.\n                    Note: If the package cannot be found, the method list will be empty.\n                </td>\n            </tr>\n            <tr>\n                <td>Method Name</td>\n                <td>Each method name entry contains the method name, the arguments list it requires, and the type of the return value.</td>\n            </tr>\n            <tr>\n                <td>Arguments</td>\n                <td>You should enter the corresponding arguments that the selected snippet call requires here.\n                    The arguments should be separated by ',' and every one of them is kept in the correct format of the variable type.\n                    For example, the input of method <b>wifiConnectSimple(String, String)</b> can be <b>GoogleGuest, null</b>.\n                </td>\n            </tr>\n            <tr>\n                <td>Timeout Limit</td>\n                <td>This field is to set how long to wait (in milliseconds) for the snippet to complete and return.\n                </td>\n            </tr>\n            <tr>\n                <td>Snippet Service Only (No validation)</td>\n                <td>This field is to set whether you want to validate the return value or not. If the snippet you select returns null, this box will be automatically selected.\n                    Note that if you uncheck this box for snippets that do not return a value, it will cause the action to fail.\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"foot-note\" >*More details can be found in go/uicd-userguide</div>\n    <button mat-raised-button color=\"primary\" (click)=\"onOkClick()\">OK</button>\n</div>\n"

/***/ }),

/***/ "./src/app/actions-plus/new-action-dialog/snippet-action-info-dialog.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SnippetActionInfoDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var SnippetActionInfoDialogComponent = /** @class */ (function () {
    function SnippetActionInfoDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    SnippetActionInfoDialogComponent.prototype.onOkClick = function () {
        this.dialogRef.close();
    };
    SnippetActionInfoDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'snippet-action-info-dialog',
            template: __webpack_require__("./src/app/actions-plus/new-action-dialog/snippet-action-info-dialog.html"),
            styles: [__webpack_require__("./src/app/actions-plus/new-action-dialog/snippet-action-info-dialog.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogRef */], Object])
    ], SnippetActionInfoDialogComponent);
    return SnippetActionInfoDialogComponent;
}());

;


/***/ }),

/***/ "./src/app/adb.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdbService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_device__ = __webpack_require__("./src/app/constants/device.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdbService = /** @class */ (function () {
    function AdbService(http) {
        this.http = http;
    }
    AdbService.prototype.getDevicesList = function () {
        var fullUrl = __WEBPACK_IMPORTED_MODULE_2__constants_device__["a" /* BACKEND_BASE_URL */] + '/getDevicesList';
        return this.http.get(fullUrl);
    };
    AdbService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], AdbService);
    return AdbService;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.example-sidenav-fab-container {\n  width: 500px;\n  height: 300px;\n  border: 1px solid rgba(0, 0, 0, 0.5);\n}\n\n.example-sidenav-fab-container md-sidenav {\n  max-width: 200px;\n}\n\n.example-sidenav-fab-container .mat-sidenav-content,\n.example-sidenav-fab-container md-sidenav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  overflow: visible;\n}\n\n.example-scrolling-content {\n  overflow: auto;\n  height: 100%;\n}\n\n.example-fab.mat-mini-fab {\n  position: absolute;\n  right: 20px;\n  bottom: 10px;\n}\n\n.main-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  height: 100%;\n}\n\n.main-body {\n  -webkit-box-flex:1;\n      -ms-flex:1;\n          flex:1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  /* flex-direction: row; */\n}\n\n.sidevar-container {\n  -webkit-box-flex:1;\n      -ms-flex:1;\n          flex:1;\n  /* width: 100%; */\n}\n\n.record-btn {\n  position: relative;\n  bottom: 50px;\n  left: 30px;\n  z-index: 2;\n}\n\n.main-col-container{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.main-col-middle{\n  display: 1;\n  width:700px;\n  background-color: #f5f5f5;\n}\n\n.main-col-right{\n  min-width: 300px;\n  background-color: #f5f5f5;\n}\n\n.main-container .main-toolbar {\n  background-color: #28a6da;\n}\n\n.device-prepare-overlay{\n  background-color:gray;\n  width: 100%;\n  height: 100%;\n  opacity: 0.5;\n  z-index: 99;\n  position: absolute;\n  top: 0px;\n}\n\n.device-prepare-overlay-progressbar {\n  width: 400px;\n   left: 45%;\n  top: 50%;\n}\n\n.handle-row {\n  width: 15px;\n  top: 50%;\n  left: -2px;\n  -webkit-transform: translateX(-50%) rotate(270deg);\n          transform: translateX(-50%) rotate(270deg);\n  cursor: col-resize;;\n}\n\n.handle-column {\n  height: 15px;\n  left: 50%;\n  top: -4px;\n  cursor: row-resize;\n}\n\n.uicd-column-splitter{\n\n  background-color: #e5e5e5;\n  cursor: col-resize;\n  width: 8px;\n}\n\n.uicd-column-breaker {\n  cursor: column-resize;\n  background-color: #e5e5e5;\n  width: 3px;\n}\n\n.uicd-row-splitter{\n  background-color: #e5e5e5;\n  cursor: row-resize;\n  height: 8px;\n}\n\n.handle {\n  outline: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none;\n  z-index: 9999;\n  height: 5px;\n  display: block;\n  padding: 0;\n  margin: 0;\n  position: relative;\n  line-height: 0;\n}\n\n.footer-div {\n  background-color: #f5f5f5;\n  position: relative;\n}\n\n.footer-content {\n  position: absolute;\n  left: 50%;\n}\n\n.mat-tab-header {\n  background-color: #f5f5f5;\n}\n\n.toolbar-icon {\n  padding: 0 14px;\n}\n\n.toolbar-spacer {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n\n.test-case-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 100%;\n}\n\n.log-area-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 500px;\n  width: 100%;\n}\n\n.recorder-area-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 500px;\n}\n\n.workspace-log-splitter {\n  overflow: hidden !important;\n}\n"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"main-container\" fxLayout='column'>\n  <mat-toolbar color=\"primary\" class='main-toolbar' fxFlex=\"50px\">\n    <button mat-icon-button>\n      <mat-icon matTooltip=\"Reinitialize devices\" (click)=\"openDevicePickerDialog()\">menu</mat-icon>\n    </button>\n    <span>UI Conductor</span>\n    <span class=\"toolbar-spacer\"></span>\n    <button mat-icon-button class=\"toolbar-icon\">\n      <mat-icon matTooltip=\"Restart Uicd\" (click)=\"softRestart()\">refresh</mat-icon>\n    </button>\n    <button mat-icon-button class=\"toolbar-icon\">\n      <mat-icon>info</mat-icon>\n    </button>\n  </mat-toolbar>\n\n  <div class=\"device-prepare-overlay\" *ngIf=\"devicePrepareLoading\">\n    <mat-progress-bar mode=\"indeterminate\" class=\"device-prepare-overlay-progressbar\">\n   </mat-progress-bar>\n </div>\n  <div class=\"main-body\" fxLayout='row wrap'>\n    <split *ngIf=\"config\" direction=\"horizontal\" [disabled]=\"config.disabled\" (dragEnd)=\"onDragEnd(-1, $event)\">\n      <ng-template ngFor let-column [ngForOf]=\"config.columns\" let-icol=\"index\">\n        <split-area *ngIf=\"column.visible\" [order]=\"icol\" [size]=\"column.size\">\n          <split direction=\"vertical\" [disabled]=\"config.disabled\" (dragEnd)=\"onDragEnd(icol, $event)\">\n            <ng-template ngFor let-row [ngForOf]=\"column.rows\" let-irow=\"index\">\n              <split-area *ngIf=\"row.visible\" [order]=\"irow\" [size]=\"row.size\" [style.overflow]=\"row.isScrollable\" >\n                <div [ngSwitch]=\"row.type\" class=\"bloc recorder-area-wrapper\">\n                  <div *ngSwitchCase=\"'recorder'\" class=\"panel recorder-area-wrapper\">\n                    <app-recorder [(initedDevices)]=\"initedDevices\"></app-recorder>\n                  </div>\n                  <div *ngSwitchCase=\"'workflow'\" class=\"panel\">\n                    <app-workflow [(playingLogs)]=\"playingLogs\" [(initedDevices)]=\"initedDevices\"></app-workflow>\n                  </div>\n                  <div *ngSwitchCase=\"'log_area'\" class=\"panel log-area-wrapper\">\n                    <mat-tab-group class=\"main-col-middle\" fxFlexFill (selectedTabChange)=\"tabChanged($event)\">\n                      <mat-tab label=\"Log\" class=\"md-no-animation\">\n                        <log-panel class=\"log-panel\" [(playingLogs)]=\"playingLogs\">\n                        </log-panel>\n                      </mat-tab>\n                      <mat-tab label=\"UI Viewer\">\n                        <ui-tree-viewer #uiViewer [inUiViewerTab]=\"inUiViewer\" [splitAreaHeight]=\"splitAreaHeight\" [treeTopBarState]=\"treeTopBarState\" [hideTopBar]=\"hideTopBar\"></ui-tree-viewer>\n                      </mat-tab>\n                    </mat-tab-group>\n                  </div>\n                  <div *ngSwitchCase=\"'action_list'\" class=\"panel test-case-wrapper\">\n                    <app-test-case-list fxFlexFill></app-test-case-list>\n                  </div>\n                  <div *ngSwitchCase=\"'device_manager'\" class=\"panel\">\n                    <app-device-manager [(initedDevices)]=\"initedDevices\" #deviceManager></app-device-manager>\n                  </div>\n                  <div *ngSwitchDefault class=\"panel\">\n                    <p>{{ row | json }}</p>\n                  </div>\n                </div>\n              </split-area>\n            </ng-template>\n          </split>\n        </split-area>\n      </ng-template>\n    </split>\n  </div>\n  <div class=\"footer-div\" fxFlex=\"25px\">\n    <span class=\"footer-content\">UI Conductor @Google</span>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_observable_forkJoin__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/forkJoin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_message_service__ = __webpack_require__("./src/app/_services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__choose_device_dialog_choose_device_dialog_component__ = __webpack_require__("./src/app/choose-device-dialog/choose-device-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constants_device__ = __webpack_require__("./src/app/constants/device.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__constants_messageTypes__ = __webpack_require__("./src/app/constants/messageTypes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__device_manager_device_manager_component__ = __webpack_require__("./src/app/device-manager/device-manager.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__device_service__ = __webpack_require__("./src/app/device.service.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var defaultConfig = {
    columns: [
        {
            visible: true,
            size: 23,
            rows: [
                { visible: true, size: 80, type: 'recorder', isScrollable: 'auto' },
                { visible: true, size: 20, type: 'device_manager', isScrollable: 'auto' },
            ],
        },
        {
            visible: true,
            size: 57,
            rows: [
                { visible: true, size: 65, type: 'workflow', isScrollable: 'auto' },
                { visible: true, size: 35, type: 'log_area', isScrollable: 'hidden' },
            ],
        },
        {
            visible: true,
            size: 20,
            rows: [
                { visible: true, size: 100, type: 'action_list', isScrollable: 'auto' },
            ],
        }
    ],
    disabled: false
};
var AppComponent = /** @class */ (function () {
    function AppComponent(dialog, deviceService, backendManagerService, messageService) {
        this.dialog = dialog;
        this.deviceService = deviceService;
        this.backendManagerService = backendManagerService;
        this.messageService = messageService;
        // disable the animation on the tab
        this.title = 'Uicd';
        this.UI_VIEWER_TAB_ID = 1;
        this.initedDevices = [];
        this.devicePrepareLoading = false;
        this.playingLogs = [];
        this.slotsInfo = [];
        this.localStorageName = 'angular-split-ws';
        this.config = null;
        this.inUiViewer = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Init layout settings
        this.resetConfig();
        // observe bind device
        this.deviceService.currentDeviceInfo.subscribe(function (device) { return _this.currentBindDevice = device; });
        this.initedDevices = [];
        // if have inited devices, don't show dialog
        this.backendManagerService.hasInitializedDevices().subscribe(function (data) {
            if (!data['hasInitedDevices']) {
                // open device picker dialog
                _this.openDevicePickerDialog();
            }
            else {
                _this.initedDevices = [];
                _this.backendManagerService.getInitializedDevices().subscribe(function (info) {
                    var deviceInfo = info['devices'].split(',');
                    for (var i = 0; i < deviceInfo.length; i++) {
                        if (deviceInfo[i]) {
                            _this.initedDevices.push({ 'serial': deviceInfo[i], 'index': i });
                        }
                    }
                    // Init devices (start execution server and minicap server)
                    _this.initDevices();
                });
            }
        });
    };
    AppComponent.prototype.softRestart = function () {
        var _this = this;
        this.backendManagerService.softRestart()
            .catch(function (err) {
            _this.devicePrepareLoading = true;
            return err.statusText;
        })
            .finally(function () {
            // Wait for spring ready
            _this.backendManagerService.validateUicdBackendConnection()
                .retryWhen(function (xmlHttpRequest) {
                return xmlHttpRequest
                    .flatMap(function (xmlHttpRequest) {
                    if (xmlHttpRequest.status === 0) {
                        // unreachable
                        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].of(xmlHttpRequest.status).delay(2000);
                    }
                    return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].throw({ xmlHttpRequest: 'No retry' });
                })
                    .take(10)
                    .concat(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].throw({
                    xmlHttpRequest: 'Sorry, there was an error (after 10 retries)'
                }));
            })
                .subscribe(function () {
                // Reload page
                window.location.reload();
                _this.devicePrepareLoading = false;
            });
        })
            .subscribe(function () { });
    };
    AppComponent.prototype.openDevicePickerDialog = function () {
        var _this = this;
        var dialog = this.dialog.open(__WEBPACK_IMPORTED_MODULE_7__choose_device_dialog_choose_device_dialog_component__["a" /* ChooseDeviceDialogComponent */], {
            height: '600px',
            width: '800px',
        });
        dialog.afterClosed().subscribe(function (selection) {
            if (selection) {
                _this.devicePrepareLoading = true;
                _this.initedDevices = [];
                _this.selectedDevice = selection;
                console.log(_this.selectedDevice);
                for (var i = 0; i < selection.length; i++) {
                    var deviceId = selection[i];
                    _this.initedDevices.push({ 'serial': deviceId, 'index': i });
                }
                _this.backendManagerService.initDevices(selection.join())
                    .subscribe(function (data) {
                    console.log('backend initDevicesList done');
                    // Init devices (start execution server and minicap server)
                    _this.initDevices();
                });
            }
            else {
                // User clicked 'Cancel' or clicked outside the dialog
            }
        });
    };
    AppComponent.prototype.initDevices = function () {
        var _this = this;
        var observables = [];
        var _loop_1 = function (i) {
            var deviceId = this_1.initedDevices[i]['serial'];
            observables.push(this_1.backendManagerService.getPorts(deviceId)
                .concatMap(function (data) {
                _this.initedDevices[i]['port'] = data['server_port'].toString();
                return _this.backendManagerService.initMinicap(deviceId);
            })
                .concatMap(function (data) {
                _this.initedDevices[i]['canvasWidth'] = data['width'];
                _this.initedDevices[i]['canvasHeight'] = data['height'];
                return _this.backendManagerService.initDevice(deviceId);
            })
                .map(function (data) {
                _this.initedDevices[i]['status'] =
                    __WEBPACK_IMPORTED_MODULE_8__constants_device__["b" /* DEVICE_STATUS */].READY_TO_CONNECT;
                console.log('Done for ' + deviceId);
                console.log(_this.initedDevices[i]);
            }));
        };
        var this_1 = this;
        for (var i = 0; i < this.initedDevices.length; i++) {
            _loop_1(i);
        }
        Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_observable_forkJoin__["a" /* forkJoin */])(observables).subscribe(function () {
            _this.initDeviceSlotTable();
            _this.devicePrepareLoading = false;
            // set default bind device
            if (_this.initedDevices.length > 0) {
                // set bind device based on device id
                _this.currentBindDevice = _this.initedDevices[0];
                _this.deviceService.updateDevice(_this.currentBindDevice);
            }
            else {
                console.log('device not available.');
                return;
            }
        });
    };
    AppComponent.prototype.initDeviceSlotTable = function () {
        // Init device table slot
        this.slotsInfo = [];
        for (var i = 0; i < this.initedDevices.length; i++) {
            this.slotsInfo.push({
                position: i + 1,
                device_serial: this.initedDevices[i]['serial'],
                status: __WEBPACK_IMPORTED_MODULE_8__constants_device__["b" /* DEVICE_STATUS */].READY_TO_CONNECT,
            });
        }
        console.log(this.initedDevices);
        this.deviceManager['dataSource'] = new __WEBPACK_IMPORTED_MODULE_10__device_manager_device_manager_component__["b" /* SlotDataSource */](this.slotsInfo);
    };
    AppComponent.prototype.resetConfig = function () {
        this.config = __WEBPACK_IMPORTED_MODULE_2_lodash__["cloneDeep"](defaultConfig);
        localStorage.removeItem(this.localStorageName);
    };
    AppComponent.prototype.onDragEnd = function (columnIndex, e) {
        console.log('columnindex', columnIndex);
        console.log('sizesArray', e.sizes);
        // Column dragged
        if (columnIndex === -1) {
            // Set size for all visible columns
            this.config.columns.filter(function (c) { return c.visible === true; })
                .forEach(function (column, index) { return column.size = e.sizes[index]; });
            var WIDTH_THRESHOLD = 35; // in %
            var middleColumnWidth = e.sizes[1]; // in%
            this.treeTopBarState = !(middleColumnWidth <= WIDTH_THRESHOLD);
        }
        else { // Row dragged
            if (columnIndex === 1) {
                // make split area in Ui Viewer relative to this split
                this.splitAreaHeight = e.sizes[1] - (e.sizes[1] / 3); // in %
                var HEIGHT_THRESHOLD = 30; // in %
                var bottomRowHeight = e.sizes[1]; // in %
                this.hideTopBar = bottomRowHeight <= HEIGHT_THRESHOLD;
            }
            // Set size for all visible rows from specified column
            this.config.columns[columnIndex]
                .rows.filter(function (r) { return r.visible === true; })
                .forEach(function (row, index) { return row.size = e.sizes[index]; });
        }
        this.saveLocalStorage();
    };
    AppComponent.prototype.toggleDisabled = function () {
        this.config.disabled = !this.config.disabled;
        this.saveLocalStorage();
    };
    AppComponent.prototype.refreshColumnVisibility = function () {
        // Refresh columns visibility based on inside rows visibilities (If no row >
        // hide column)
        this.config.columns.forEach(function (column, index) {
            column.visible = column.rows.some(function (row) { return row.visible === true; });
        });
        this.saveLocalStorage();
    };
    AppComponent.prototype.saveLocalStorage = function () {
        localStorage.setItem(this.localStorageName, JSON.stringify(this.config));
    };
    AppComponent.prototype.tabChanged = function (event) {
        // the mat-tab component assigns an index on the tabs in the order
        // they are displayed with the initial one starting at 0
        if (event.index === this.UI_VIEWER_TAB_ID) {
            this.inUiViewer = true;
            // only hide the scroll bar in the log area when in the ui viewer
            this.config.columns[1].rows[1].isScrollable = 'hidden';
            // Default height for area in Ui Viewer
            if (!this.splitAreaHeight) {
                var BOTTOM_ROW_START_HEIGHT = 35; // in %
                var ADJUSTING_RATIO = 1.7;
                this.splitAreaHeight = BOTTOM_ROW_START_HEIGHT / ADJUSTING_RATIO;
            }
            // Give it a default state if no split has been dragged
            if (!this.treeTopBarState) {
                this.treeTopBarState = true;
            }
            if (!this.hideTopBar) {
                this.hideTopBar = false;
            }
        }
        else {
            this.inUiViewer = false;
            this.config.columns[1].rows[1].isScrollable = 'auto';
            // When in Log, disable inspect mode and clear highlighted items
            this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_9__constants_messageTypes__["a" /* MESSAGE_TYPES */].clearCanvas, 'both');
            if (this.uiViewer['inInspect']) {
                this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_9__constants_messageTypes__["a" /* MESSAGE_TYPES */].setInspectMode, false);
                this.uiViewer['inInspect'] = false;
                this.uiViewer['toggleInspectColor'] = this.uiViewer['deactivatedColor'];
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostBinding */])('@.disabled'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('deviceManager'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], AppComponent.prototype, "deviceManager", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('uiViewer'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], AppComponent.prototype, "uiViewer", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_11__device_service__["a" /* DeviceService */],
            __WEBPACK_IMPORTED_MODULE_5__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */],
            __WEBPACK_IMPORTED_MODULE_6__services_message_service__["a" /* MessageService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MyHammerConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__ = __webpack_require__("./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular_split__ = __webpack_require__("./node_modules/angular-split/esm5/angular-split.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_hammerjs__ = __webpack_require__("./node_modules/hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_dnd__ = __webpack_require__("./node_modules/ng2-dnd/ng2-dnd.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_index__ = __webpack_require__("./src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_testcase_manager_testcase_manager_service__ = __webpack_require__("./src/app/_services/testcase-manager/testcase-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__actions_plus_new_action_dialog_new_action_dialog_component__ = __webpack_require__("./src/app/actions-plus/new-action-dialog/new-action-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__actions_plus_new_action_dialog_script_action_info_dialog__ = __webpack_require__("./src/app/actions-plus/new-action-dialog/script-action-info-dialog.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__actions_plus_new_action_dialog_snippet_action_info_dialog__ = __webpack_require__("./src/app/actions-plus/new-action-dialog/snippet-action-info-dialog.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__adb_service__ = __webpack_require__("./src/app/adb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__choose_device_dialog_choose_device_dialog_component__ = __webpack_require__("./src/app/choose-device-dialog/choose-device-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__device_manager_device_manager_component__ = __webpack_require__("./src/app/device-manager/device-manager.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__device_service__ = __webpack_require__("./src/app/device.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__fetch_content_dialog_fetch_content_dialog_component__ = __webpack_require__("./src/app/fetch-content-dialog/fetch-content-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__history_dialog_history_dialog_component__ = __webpack_require__("./src/app/history-dialog/history-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__log_panel_log_panel_component__ = __webpack_require__("./src/app/log-panel/log-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__log_service__ = __webpack_require__("./src/app/log.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__minicap_service__ = __webpack_require__("./src/app/minicap.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__recorder_recorder_recorder_component__ = __webpack_require__("./src/app/recorder/recorder/recorder.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__replay_details_dialog_replay_details_dialog_component__ = __webpack_require__("./src/app/replay-details-dialog/replay-details-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__socket_service__ = __webpack_require__("./src/app/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__special_click_dialog_special_click_dialog_component__ = __webpack_require__("./src/app/special-click-dialog/special-click-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__test_case_list_editor_action_edit_dialog_component__ = __webpack_require__("./src/app/test-case-list-editor/action-edit-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__test_case_list_editor_import_dialog_import_dialog_component__ = __webpack_require__("./src/app/test-case-list-editor/import-dialog/import-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__test_case_list_editor_test_case_list_component__ = __webpack_require__("./src/app/test-case-list-editor/test-case-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__tv_remote_dialog_tv_remote_dialog_component__ = __webpack_require__("./src/app/tv-remote-dialog/tv-remote-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ui_tree_viewer_copy_xml_dialog_component__ = __webpack_require__("./src/app/ui-tree-viewer/copy-xml-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ui_tree_viewer_ui_tree_viewer_component__ = __webpack_require__("./src/app/ui-tree-viewer/ui-tree-viewer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__validation_flow_validation_details_component__ = __webpack_require__("./src/app/validation-flow/validation-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__validation_flow_validation_flow_component__ = __webpack_require__("./src/app/validation-flow/validation-flow.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__workflow_workflow_component__ = __webpack_require__("./src/app/workflow/workflow.component.ts");
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








































var MyHammerConfig = /** @class */ (function (_super) {
    __extends(MyHammerConfig, _super);
    function MyHammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = {
            // override hammerjs default configuration
            'pan': { threshold: 5 },
            'swipe': {
                velocity: 0.3,
                threshold: 0,
                direction: __WEBPACK_IMPORTED_MODULE_8_hammerjs__["DIRECTION_ALL"]
                // direction: 31 // /!\ ugly hack to allow swipe in all direction
            }
        };
        return _this;
    }
    return MyHammerConfig;
}(__WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["e" /* HammerGestureConfig */]));

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_26__recorder_recorder_recorder_component__["a" /* RecorderComponent */],
                __WEBPACK_IMPORTED_MODULE_38__workflow_workflow_component__["a" /* WorkflowComponent */],
                __WEBPACK_IMPORTED_MODULE_37__validation_flow_validation_flow_component__["a" /* ValidationFlowComponent */],
                __WEBPACK_IMPORTED_MODULE_30__test_case_list_editor_action_edit_dialog_component__["a" /* ActionEditDialog */],
                __WEBPACK_IMPORTED_MODULE_31__test_case_list_editor_import_dialog_import_dialog_component__["a" /* ImportDialog */],
                __WEBPACK_IMPORTED_MODULE_27__replay_details_dialog_replay_details_dialog_component__["a" /* ReplayDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_32__test_case_list_editor_test_case_list_component__["a" /* TestCaseList */],
                __WEBPACK_IMPORTED_MODULE_18__choose_device_dialog_choose_device_dialog_component__["a" /* ChooseDeviceDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_23__log_panel_log_panel_component__["a" /* LogPanelComponent */],
                __WEBPACK_IMPORTED_MODULE_13__actions_plus_new_action_dialog_new_action_dialog_component__["a" /* NewActionDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_22__history_dialog_history_dialog_component__["a" /* HistoryDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_33__tv_remote_dialog_tv_remote_dialog_component__["a" /* TvRemoteDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_19__device_manager_device_manager_component__["a" /* DeviceManagerComponent */],
                __WEBPACK_IMPORTED_MODULE_21__fetch_content_dialog_fetch_content_dialog_component__["a" /* FetchContentDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_36__validation_flow_validation_details_component__["a" /* ValidationDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_36__validation_flow_validation_details_component__["b" /* ValidationDetailsInfoDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_35__ui_tree_viewer_ui_tree_viewer_component__["a" /* UiTreeViewerComponent */],
                __WEBPACK_IMPORTED_MODULE_34__ui_tree_viewer_copy_xml_dialog_component__["a" /* CopyXmlDialog */],
                __WEBPACK_IMPORTED_MODULE_29__special_click_dialog_special_click_dialog_component__["a" /* SpecialClickDialog */],
                __WEBPACK_IMPORTED_MODULE_15__actions_plus_new_action_dialog_snippet_action_info_dialog__["a" /* SnippetActionInfoDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_14__actions_plus_new_action_dialog_script_action_info_dialog__["a" /* ScriptActionInfoDialogComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["e" /* MatChipsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["d" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["m" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["l" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["z" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["j" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["y" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["A" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["k" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["q" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["s" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["n" /* MatOptionModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["r" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["g" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["v" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["u" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["o" /* MatProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["p" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_9_ng2_dnd__["a" /* DndModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["x" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["a" /* FlexLayoutModule */],
                __WEBPACK_IMPORTED_MODULE_7_angular_split__["a" /* AngularSplitModule */],
            ],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["d" /* HAMMER_GESTURE_CONFIG */], useClass: MyHammerConfig }, __WEBPACK_IMPORTED_MODULE_11__services_index__["a" /* MessageService */],
                __WEBPACK_IMPORTED_MODULE_16__adb_service__["a" /* AdbService */], __WEBPACK_IMPORTED_MODULE_25__minicap_service__["a" /* MinicapService */], __WEBPACK_IMPORTED_MODULE_28__socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_24__log_service__["a" /* LogService */], __WEBPACK_IMPORTED_MODULE_12__services_testcase_manager_testcase_manager_service__["a" /* TCMService */],
                __WEBPACK_IMPORTED_MODULE_20__device_service__["a" /* DeviceService */], __WEBPACK_IMPORTED_MODULE_10__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* AppComponent */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_30__test_case_list_editor_action_edit_dialog_component__["a" /* ActionEditDialog */],
                __WEBPACK_IMPORTED_MODULE_18__choose_device_dialog_choose_device_dialog_component__["a" /* ChooseDeviceDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_31__test_case_list_editor_import_dialog_import_dialog_component__["a" /* ImportDialog */],
                __WEBPACK_IMPORTED_MODULE_23__log_panel_log_panel_component__["a" /* LogPanelComponent */],
                __WEBPACK_IMPORTED_MODULE_13__actions_plus_new_action_dialog_new_action_dialog_component__["a" /* NewActionDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_27__replay_details_dialog_replay_details_dialog_component__["a" /* ReplayDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_22__history_dialog_history_dialog_component__["a" /* HistoryDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_33__tv_remote_dialog_tv_remote_dialog_component__["a" /* TvRemoteDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_21__fetch_content_dialog_fetch_content_dialog_component__["a" /* FetchContentDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_37__validation_flow_validation_flow_component__["a" /* ValidationFlowComponent */],
                __WEBPACK_IMPORTED_MODULE_36__validation_flow_validation_details_component__["a" /* ValidationDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_35__ui_tree_viewer_ui_tree_viewer_component__["a" /* UiTreeViewerComponent */],
                __WEBPACK_IMPORTED_MODULE_34__ui_tree_viewer_copy_xml_dialog_component__["a" /* CopyXmlDialog */],
                __WEBPACK_IMPORTED_MODULE_36__validation_flow_validation_details_component__["b" /* ValidationDetailsInfoDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_15__actions_plus_new_action_dialog_snippet_action_info_dialog__["a" /* SnippetActionInfoDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_14__actions_plus_new_action_dialog_script_action_info_dialog__["a" /* ScriptActionInfoDialogComponent */],
            ],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/choose-device-dialog/choose-device-dialog.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n"

/***/ }),

/***/ "./src/app/choose-device-dialog/choose-device-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h1 mat-dialog-title>Choose Your Device:</h1>\n<mat-dialog-content>\n  <div fxLayout=\"row wrap\" fxLayoutGap=\"20px\">\n    <div *ngFor=\"let device of devices\" fxFlex=\"30\">\n\n      <mat-card style=\"margin-bottom: 20px\">\n        <mat-card-title style=\"font-size: 15px;\">{{device.serial}}</mat-card-title>\n        <mat-card-content>\n          <ul>\n            <li>{{device.product}}</li>\n            <li>{{device.model}}</li>\n            <li>{{device.device}}</li>\n          </ul>\n\n          <mat-form-field>\n            <mat-select placeholder=\"Device Slot\" [(ngModel)]=\"device['slot']\" (ngModelChange)=\"updateAvailableSlot($event)\">\n              <mat-option [value]=\"-1\"></mat-option>\n              <mat-option *ngFor=\"let option of slotOptions\" [value]=\"option.id\" [disabled]=\"option.disabled\">\n                Slot {{ option.id }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n        </mat-card-content>\n      </mat-card>\n    </div>\n  </div>\n</mat-dialog-content>\n\n<mat-dialog-actions>\n  <button mat-button (click)=\"confirmSelection()\" color=\"primary\" [mat-dialog-close]=\"true\" cdkFocusInitial>\n    Initialize\n  </button>\n  <button mat-button mat-dialog-close>\n    Cancel\n  </button>\n</mat-dialog-actions>\n"

/***/ }),

/***/ "./src/app/choose-device-dialog/choose-device-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseDeviceDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__adb_service__ = __webpack_require__("./src/app/adb.service.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChooseDeviceDialogComponent = /** @class */ (function () {
    function ChooseDeviceDialogComponent(dialogRef, adbService) {
        this.dialogRef = dialogRef;
        this.adbService = adbService;
        this.devices = [];
        this.slotOptions = [];
    }
    ChooseDeviceDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get device list
        this.adbService.getDevicesList().subscribe(function (data) {
            var deviceInfos = Object.keys(data).map(function (i) { return data[i]; });
            for (var i = 0; i < deviceInfos.length; i++) {
                var deviceInfo = JSON.parse(deviceInfos[i]);
                _this.devices.push({
                    'serial': deviceInfo['serial'],
                    'product': deviceInfo['product'],
                    'model': deviceInfo['model'],
                    'device': deviceInfo['device'],
                    'slot': -1,
                });
                _this.slotOptions.push({ 'id': i + 1, 'disabled': false });
            }
            if (deviceInfos.length === 1) {
                _this.devices[0]['slot'] = 1;
            }
        });
    };
    ChooseDeviceDialogComponent.prototype.confirmSelection = function () {
        var selectedDevices = new Array(this.devices.length);
        for (var i = 0; i < this.devices.length; i++) {
            if (this.devices[i]['slot'] !== -1) {
                selectedDevices[this.devices[i]['slot'] - 1] =
                    this.devices[i]['serial'];
            }
        }
        selectedDevices = selectedDevices.filter(function (n) { return n !== undefined; });
        this.dialogRef.close(selectedDevices);
    };
    ChooseDeviceDialogComponent.prototype.updateAvailableSlot = function (event) {
        for (var i = 0; i < this.slotOptions.length; i++) {
            this.slotOptions[i]['disabled'] = false;
        }
        for (var i = 0; i < this.devices.length; i++) {
            if (this.devices[i]['slot'] !== -1) {
                this.slotOptions[this.devices[i]['slot'] - 1]['disabled'] = true;
            }
        }
    };
    ChooseDeviceDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-choose-device-dialog',
            template: __webpack_require__("./src/app/choose-device-dialog/choose-device-dialog.component.html"),
            styles: [__webpack_require__("./src/app/choose-device-dialog/choose-device-dialog.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogRef */],
            __WEBPACK_IMPORTED_MODULE_2__adb_service__["a" /* AdbService */]])
    ], ChooseDeviceDialogComponent);
    return ChooseDeviceDialogComponent;
}());



/***/ }),

/***/ "./src/app/constants/actions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ACTIONS; });
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
var ACTIONS = {
    CLICK_ACTION: { type: 'ClickAction', shortName: 'CLICK', color: 'tomato' },
    COMMAND_LINE_ACTION: { type: 'CommandLineAction', shortName: 'CMD', color: 'dodgerblue' },
    COMPOUND_ACTION: { type: 'CompoundAction', shortName: 'CPD', color: 'darkorange' },
    INPUT_ACTION: { type: 'InputAction', shortName: 'INPUT', color: 'limegreen' },
    LOGCAT_VALIDATION_ACTION: {
        type: 'LogcatValidationAction',
        shortName: 'LOGVAL',
        color: 'darkorange'
    },
    SCREEN_CAP_ACTION: { type: 'ScreenCapAction', shortName: 'SCREEN', color: 'darkorange' },
    SCREEN_CONTENT_VALIDATION_ACTION: {
        type: 'ScreenContentValidationAction',
        shortName: 'VERIFY',
        color: 'dodgerblue'
    },
    SCROLL_SCREEN_CONTENT_VALIDATION_ACTION: {
        type: 'ScrollScreenContentValidationAction',
        shortName: 'VERIFY',
        color: 'dodgerblue'
    },
    LOOP_SCREEN_CONTENT_VALIDATION_ACTION: {
        type: 'LoopScreenContentValidationAction',
        shortName: 'VERIFY',
        color: 'dodgerblue'
    },
    IMAGE_MATCHING_VALIDATION_ACTION: {
        type: 'ImageMatchingValidationAction',
        shortName: 'VERIFY',
        color: 'dodgerblue'
    },
    GLOBAL_VARIABLE_VALIDATION_ACTION: {
        type: 'GlobalVariableValidationAction',
        shortName: 'VERIFY',
        color: 'dodgerblue'
    },
    SCREEN_ROTATE_ACTION: { type: 'ScreenRotateAction', shortName: 'ROTATE', color: 'limegreen' },
    FETCH_SCREEN_CONTENT_ACTION: {
        type: 'FetchScreenContentAction',
        shortName: 'FETCH',
        color: 'dodgerblue'
    },
    SWIPE_ACTION: { type: 'SwipeAction', shortName: 'SWIPE', color: 'deepskyblue' },
    LONG_CLICK_ACTION: { type: 'LongClickAction', shortName: 'LCLICK', color: 'skyblue' },
    REBOOT_ACTION: { type: 'RebootAction', shortName: 'REBOOT', color: 'skyblue' },
    ZOOM_ACTION: { type: 'ZoomAction', shortName: 'ZOOM', color: 'limegreen' },
    CONDITION_CLICK_ACTION: { type: 'ConditionClickAction', shortName: 'CCLICK', color: 'limegreen' },
    DRAG_ACTION: { type: 'DragAction', shortName: 'DRAG', color: 'skyblue' },
    IMAGE_VALIDATION_CLICK_ACTION: {
        type: 'ImageValidationClickAction',
        shortName: 'IVCLICK',
        color: 'skyblue'
    },
    UICD_SNIPPET_VALIDATION_ACTION: {
        type: 'UicdSnippetValidationAction',
        shortName: 'SNIPPET',
        color: 'dodgerblue'
    },
    SCRIPT_EXECUTION_ACTION: { type: 'ScriptExecutionAction', shortName: 'SCRIPT', color: 'limegreen' },
};


/***/ }),

/***/ "./src/app/constants/device.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DEVICE_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BACKEND_BASE_URL; });
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
var DEVICE_STATUS = {
    NO_DEVICE: 0,
    READY_TO_CONNECT: 1,
    CONNECTED: 2,
    CONNECTING: 3,
};
var BACKEND_BASE_URL = 'http://localhost:8089';


/***/ }),

/***/ "./src/app/constants/keycodes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KEY_CODES; });
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
var KEY_CODES = {
    KEYCODE_HOME: 3,
    KEYCODE_BACK: 4,
    KEYCODE_DPAD_UP: 19,
    KEYCODE_DPAD_DOWN: 20,
    KEYCODE_DPAD_LEFT: 21,
    KEYCODE_DPAD_RIGHT: 22,
    KEYCODE_DPAD_CENTER: 23,
    KEYCODE_VOLUME_UP: 24,
    KEYCODE_VOLUME_DOWN: 25,
    KEYCODE_POWER: 26,
    KEYCODE_MEDIA_PLAY_PAUSE: 85,
    KEYCODE_OVERVIEW: 187,
};


/***/ }),

/***/ "./src/app/constants/messageTypes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MESSAGE_TYPES; });
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
var MESSAGE_TYPES = {
    refreshWorkflow: 0,
    nodeSelected: 1,
    nodeHovered: 2,
    clearCanvas: 3,
    inspectClickedNode: 4,
    setInspectMode: 5,
    testStart: 6,
    testEnd: 7,
    refreshXml: 8
};


/***/ }),

/***/ "./src/app/device-manager/device-manager.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.currentDevice {\n    float: right;\n    padding: 10px;\n    font-size: 15px;\n}\n\n.star-icon {\n    padding: 15px;\n}\n"

/***/ }),

/***/ "./src/app/device-manager/device-manager.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n  <mat-tab-group class=\"tab-group\" fxFlexFill>\n    <mat-tab label=\"Devices\" fxLayout=\"column\" fxFlexFill class=\"md-no-animation\">\n      <mat-form-field>\n        <mat-select placeholder=\"Play Mode:\" [(ngModel)]=\"selectedPlayMode\" (change)=\"savePlayMode($event)\">\n          <mat-option *ngFor=\"let pMode of playModes\" [value]=\"pMode.name\">{{ pMode.display }}</mat-option>\n        </mat-select>\n      </mat-form-field>\n      <div class=\"currentDevice\" *ngIf=\"bindDevice.serial\">\n        <b>Current Device: </b> {{bindDevice.serial}}\n      </div>\n      <div>\n        <mat-table #table [dataSource]=\"dataSource\">\n          <ng-container matColumnDef=\"position\">\n            <mat-header-cell *matHeaderCellDef> Slot. </mat-header-cell>\n            <mat-cell *matCellDef=\"let element\"> {{element.position}} </mat-cell>\n          </ng-container>\n\n          <ng-container matColumnDef=\"device_serial\">\n            <mat-header-cell *matHeaderCellDef> Device Serial </mat-header-cell>\n            <mat-cell *matCellDef=\"let element\">\n              <div *ngIf=\"element.status===2;\">\n                *\n              </div>\n              {{element.device_serial}}\n            </mat-cell>\n          </ng-container>\n\n          <ng-container matColumnDef=\"status\">\n            <mat-header-cell *matHeaderCellDef> </mat-header-cell>\n            <mat-cell *matCellDef=\"let element\" fxLayout=\"row\">\n              <div [ngSwitch]=\"element.status\">\n                <div *ngSwitchCase=\"0\">\n                  No available device on this slot.\n                </div>\n\n                <div *ngSwitchCase=\"1\">\n                  <button mat-raised-button (click)=\"initDevice(element.position-1)\">\n                    Ready\n                  </button>\n                </div>\n\n                <div *ngSwitchCase=\"2\">\n                  <button mat-raised-button (click)=\"initDevice(element.position-1)\">\n                    Connected\n                  </button>\n                </div>\n\n                <div *ngSwitchCase=\"3\">\n                  Connecting...\n                </div>\n\n                <div *ngSwitchDefault>\n                  UNKNOWN\n                </div>\n              </div>\n            </mat-cell>\n          </ng-container>\n\n          <ng-container matColumnDef=\"selected\">\n            <mat-header-cell *matHeaderCellDef> Selected </mat-header-cell>\n            <mat-cell *matCellDef=\"let element\">\n              <div class=\"star-icon\" *ngIf=\"element.device_serial === bindDevice.serial\">\n                <i class=\"fa fa-star\" aria-hidden=\"true\"></i>\n              </div>\n            </mat-cell>\n          </ng-container>\n\n          <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n          <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n        </mat-table>\n      </div>\n    </mat-tab>\n    <mat-tab label=\"TV Remote\">\n      <app-tv-remote-dialog></app-tv-remote-dialog>\n    </mat-tab>\n  </mat-tab-group>\n\n</div>\n"

/***/ }),

/***/ "./src/app/device-manager/device-manager.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceManagerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SlotDataSource; });
/* unused harmony export Device */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_cdk_collections__ = __webpack_require__("./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_index__ = __webpack_require__("./src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_device__ = __webpack_require__("./src/app/constants/device.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_messageTypes__ = __webpack_require__("./src/app/constants/messageTypes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__device_service__ = __webpack_require__("./src/app/device.service.ts");
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DeviceManagerComponent = /** @class */ (function () {
    function DeviceManagerComponent(backendManagerService, messageService, deviceService) {
        this.backendManagerService = backendManagerService;
        this.messageService = messageService;
        this.deviceService = deviceService;
        this.displayedColumns = ['position', 'device_serial', 'status', 'selected'];
        this.slotsInfo = [];
        this.playModes = [
            { name: 'SINGLE', display: 'Single' },
            { name: 'MULTIDEVICE', display: 'Multi Device' },
            { name: 'PLAYALL', display: 'Play All' },
        ];
        this.selectedPlayMode = 'SINGLE';
    }
    DeviceManagerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.deviceService.currentDeviceInfo.subscribe(function (device) { return _this.bindDevice = device; });
    };
    DeviceManagerComponent.prototype.ngOnChanges = function () {
        console.log('Device slot updated.');
        console.log(this.initedDevices);
        this.slotsInfo = [];
        for (var i = 0; i < this.initedDevices.length; i++) {
            this.slotsInfo.push({
                position: i + 1,
                device_serial: this.initedDevices[i]['serial'],
                status: __WEBPACK_IMPORTED_MODULE_5__constants_device__["b" /* DEVICE_STATUS */].NO_DEVICE,
            });
        }
        this.dataSource = new SlotDataSource(this.slotsInfo);
    };
    DeviceManagerComponent.prototype.savePlayMode = function (event) {
        console.log(event.value);
        this.backendManagerService.setPlayMode(event.value)
            .subscribe(function (data) { return console.log(data); });
    };
    DeviceManagerComponent.prototype.initDevice = function (deviceIndex) {
        this.deviceService.updateDevice(this.initedDevices[deviceIndex]);
        this.backendManagerService
            .selectedDeviceChanged(this.initedDevices[deviceIndex]['serial'])
            .subscribe(function (retData) { return console.log(retData); });
        this.sendMessage();
    };
    DeviceManagerComponent.prototype.sendMessage = function () {
        // send message to subscribers via observable subject
        // workflow component listens for messages to know when to
        // refresh the workflow
        this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_6__constants_messageTypes__["a" /* MESSAGE_TYPES */].refreshWorkflow, 'Device Changed');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* Input */])(),
        __metadata("design:type", Array)
    ], DeviceManagerComponent.prototype, "initedDevices", void 0);
    DeviceManagerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'app-device-manager',
            template: __webpack_require__("./src/app/device-manager/device-manager.component.html"),
            styles: [__webpack_require__("./src/app/device-manager/device-manager.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */],
            __WEBPACK_IMPORTED_MODULE_4__services_index__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_7__device_service__["a" /* DeviceService */]])
    ], DeviceManagerComponent);
    return DeviceManagerComponent;
}());

var SlotDataSource = /** @class */ (function (_super) {
    __extends(SlotDataSource, _super);
    function SlotDataSource(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        return _this;
    }
    SlotDataSource.prototype.connect = function () {
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of(this.data);
    };
    SlotDataSource.prototype.disconnect = function () { };
    return SlotDataSource;
}(__WEBPACK_IMPORTED_MODULE_0__angular_cdk_collections__["a" /* DataSource */]));

var Device = /** @class */ (function () {
    function Device() {
    }
    return Device;
}());



/***/ }),

/***/ "./src/app/device.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_device__ = __webpack_require__("./src/app/constants/device.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DeviceService = /** @class */ (function () {
    function DeviceService() {
        this.deviceSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]({
            deviceId: null,
            port: null,
            canvasWidth: 0,
            canvasHeight: 0,
            status: __WEBPACK_IMPORTED_MODULE_2__constants_device__["b" /* DEVICE_STATUS */].NO_DEVICE,
        });
        this.currentDeviceInfo = this.deviceSource.asObservable();
    }
    DeviceService.prototype.updateDevice = function (device) {
        this.deviceSource.next(device);
    };
    DeviceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DeviceService);
    return DeviceService;
}());



/***/ }),

/***/ "./src/app/fetch-content-dialog/fetch-content-dialog.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.form-container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    min-width: 600px;\n}\n\n.form-container > * {\n    width: 100%;\n}\n\n.selected-content {\n  font-size: 20px;\n}\n\n.selected-content-span {\n  font-size: 20px;\n  color: #3f51b5;\n}\n"

/***/ }),

/***/ "./src/app/fetch-content-dialog/fetch-content-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"form-container\">\n  <h3 >Fetch content from screen</h3>\n  <div class=\"selected-content\">Selected content: <span class=\"selected-content-span\">{{this.inputData.displayText}}</span></div>\n  <div>\n      <b>Selected By:</b>\n  </div>\n  <mat-radio-group [(ngModel)]=\"inputData.model.strategy\" (change)=\"strategyChanged($event.value)\">\n      <mat-radio-button value=\"POSITION\" selected>Position</mat-radio-button>\n      <mat-radio-button value=\"RESOURCEID\">ResourceId</mat-radio-button>\n      <mat-radio-button value=\"XPATH\">XPath</mat-radio-button>\n    </mat-radio-group>\n  <mat-form-field>\n      <input matInput [(ngModel)]=\"inputData.model.selector\" placeholder=\"Selector\"  required>\n  </mat-form-field>\n\n  <div *ngIf=\"inputData.model.attributeVisible\">\n    <mat-form-field>\n      <input matInput [(ngModel)]=\"inputData.model.attributeType\" placeholder=\"XML Attribute Type\">\n    </mat-form-field>\n  </div>\n  <b>Selected content: {{this.inputData.displayText}}</b>\n  <mat-form-field >\n\n    <input matInput [(ngModel)]=\"inputData.model.globalVariableName\" placeholder=\"Variable Name (Must start with '$uicd_')\" required>\n  </mat-form-field>\n\n  <mat-checkbox [(ngModel)]=\"inputData.model.isExportField\">Export Field</mat-checkbox>\n\n</div>\n"

/***/ }),

/***/ "./src/app/fetch-content-dialog/fetch-content-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FetchContentDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_index__ = __webpack_require__("./src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_messageTypes__ = __webpack_require__("./src/app/constants/messageTypes.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FetchContentDialogComponent = /** @class */ (function () {
    function FetchContentDialogComponent(dialogRef, dialog, backendManagerService, messageService) {
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.backendManagerService = backendManagerService;
        this.messageService = messageService;
    }
    FetchContentDialogComponent.prototype.ngOnInit = function () {
        this.initDataModel();
    };
    FetchContentDialogComponent.prototype.sendMessage = function () {
        // send message to subscribers via observable subject
        this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_4__constants_messageTypes__["a" /* MESSAGE_TYPES */].refreshWorkflow, 'message from recorder!');
    };
    FetchContentDialogComponent.prototype.initDataModel = function () {
        this.inputData['model']['attributeVisible'] = false;
        this.inputData['model']['globalVariableName'] = '';
        this.inputData['model']['strategy'] = 'POSITION';
        this.inputData['model']['selector'] =
            this.getBoundsStr(this.inputData['bounds']);
    };
    FetchContentDialogComponent.prototype.ngOnChanges = function () {
        this.initDataModel();
    };
    FetchContentDialogComponent.prototype.strategyChanged = function (strategy) {
        if (strategy === 'POSITION') {
            this.inputData['model']['selector'] =
                this.getBoundsStr(this.inputData['bounds']);
            this.inputData['model']['attributeVisible'] = false;
        }
        else if (strategy === 'RESOURCEID') {
            this.inputData['model']['selector'] = this.inputData['resourceId'];
            this.inputData['model']['attributeVisible'] = false;
        }
        else if (strategy === 'XPATH') {
            this.inputData['model']['selector'] = '';
            this.inputData['model']['attributeVisible'] = true;
        }
        console.log(strategy);
    };
    // Convert the bounds object to string([x1, y1],[x2, y2]), it will be used in
    // the backend and frontend display.
    FetchContentDialogComponent.prototype.getBoundsStr = function (bounds) {
        if (bounds == null) {
            console.error('Bounds is null. Something wrong in the backend.');
            return '';
        }
        return '[' + bounds.x1 + ',' + bounds.y1 + '],[' + bounds.x2 + ',' +
            bounds.y2 + ']';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], FetchContentDialogComponent.prototype, "inputData", void 0);
    FetchContentDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-fetch-content-dialog',
            template: __webpack_require__("./src/app/fetch-content-dialog/fetch-content-dialog.component.html"),
            styles: [__webpack_require__("./src/app/fetch-content-dialog/fetch-content-dialog.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogRef */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */],
            __WEBPACK_IMPORTED_MODULE_2__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */],
            __WEBPACK_IMPORTED_MODULE_3__services_index__["a" /* MessageService */]])
    ], FetchContentDialogComponent);
    return FetchContentDialogComponent;
}());



/***/ }),

/***/ "./src/app/history-dialog/history-dialog.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.example-form {\n  min-width: 150px;\n  max-width: 800px;\n  min-height: 100px;\n  width: 100%;\n}\n\n.example-full-width {\n  width: 100%;\n  height: 100%;\n}\n\n.details-table {\n  overflow: scroll;\n  max-height: 600px;\n}"

/***/ }),

/***/ "./src/app/history-dialog/history-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n  <h2>History dialog</h2>\n\n  <div>\n    <h3> Batch replay</h3>\n    <form class=\"example-form\">\n\n      <mat-form-field class=\"example-full-width md-block\">\n        <textarea  [(ngModel)]=\"testIdList\" matInput style=\"width:100%; min-height:100px;\" name='testidlist'  minRows=\"6\" placeholder=\"Put all test id, one line for each:\"  ></textarea>\n      </mat-form-field>\n    </form>\n\n    <button mat-raised-button (click)=\"batchPlay()\">Play</button>\n  </div>\n  <h3> History Details</h3>\n  <mat-table #table [dataSource]=\"dataSource\" class=\"details-table\">\n\n    <!-- Position Column -->\n    <ng-container matColumnDef=\"uuidlink\">\n      <mat-header-cell *matHeaderCellDef> UUID Link </mat-header-cell>\n      <mat-cell *matCellDef=\"let element\">\n        <button mat-raised-button color=\"primary\" (click)=\"rowClicked(element.uuid)\">Details</button>\n      </mat-cell>\n    </ng-container>\n\n    <ng-container matColumnDef=\"uuid\">\n      <mat-header-cell *matHeaderCellDef> UUID </mat-header-cell>\n      <mat-cell *matCellDef=\"let element\"> {{element.uuid}}\n    </mat-cell>\n    </ng-container>\n\n    <ng-container matColumnDef=\"testcaseUuid\">\n      <mat-header-cell *matHeaderCellDef> Test Case UUID </mat-header-cell>\n      <mat-cell *matCellDef=\"let element\"> {{element.testcaseUuid}}\n    </mat-cell>\n    </ng-container>\n\n    <!-- Name Column -->\n    <ng-container matColumnDef=\"testMsg\">\n      <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>\n      <mat-cell *matCellDef=\"let element\"> {{element.testMsg}} </mat-cell>\n    </ng-container>\n\n    <!-- Weight Column -->\n    <ng-container matColumnDef=\"testResult\">\n      <mat-header-cell *matHeaderCellDef> Result </mat-header-cell>\n      <mat-cell *matCellDef=\"let element\"> {{element.testResult}} </mat-cell>\n    </ng-container>\n\n    <!-- Symbol Column -->\n    <ng-container matColumnDef=\"createdAt\">\n      <mat-header-cell *matHeaderCellDef> Created At </mat-header-cell>\n      <mat-cell *matCellDef=\"let element\"> {{element.createdAt.epochSecond * 1000 | date:'yyyy-MM-dd HH:mm:ss'}} </mat-cell>\n    </ng-container>\n\n    <ng-container matColumnDef=\"createdBy\">\n      <mat-header-cell *matHeaderCellDef> Create By </mat-header-cell>\n      <mat-cell *matCellDef=\"let element\"> {{element.createdBy}} </mat-cell>\n    </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n  </mat-table>\n\n</div>\n"

/***/ }),

/***/ "./src/app/history-dialog/history-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_index__ = __webpack_require__("./src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_messageTypes__ = __webpack_require__("./src/app/constants/messageTypes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__replay_details_dialog_replay_details_dialog_component__ = __webpack_require__("./src/app/replay-details-dialog/replay-details-dialog.component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HistoryDialogComponent = /** @class */ (function () {
    function HistoryDialogComponent(dialogRef, dialog, messageService, backendManagerService) {
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.messageService = messageService;
        this.backendManagerService = backendManagerService;
        this.displayedColumns = [
            'uuidlink', 'uuid', 'testcaseUuid', 'testMsg', 'testResult', 'createdAt',
            'createdBy'
        ];
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["w" /* MatTableDataSource */]();
        this.selectedItem = {};
        this.testIdList = '';
        this.testResultDetailsMap = {};
        this.baseUrl = 'http://localhost:8080';
    }
    HistoryDialogComponent_1 = HistoryDialogComponent;
    HistoryDialogComponent.prototype.batchPlay = function () {
        var _this = this;
        var splitted = this.testIdList.split('\n');
        console.log(splitted);
        if (splitted.length == 1) {
            this.backendManagerService.playAction(splitted[0])
                .subscribe(function (data) {
                _this.dialog.open(HistoryDialogComponent_1, { width: '800px', data: data });
            }, function (err) {
                _this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_4__constants_messageTypes__["a" /* MESSAGE_TYPES */].testEnd, JSON.stringify(err));
            });
        }
        else {
            this.backendManagerService.playAll(splitted).subscribe(function (data) {
                _this.dialog.open(HistoryDialogComponent_1, { width: '800px', data: data });
            }, function (err) {
                _this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_4__constants_messageTypes__["a" /* MESSAGE_TYPES */].testEnd, JSON.stringify(err));
            });
        }
    };
    HistoryDialogComponent.prototype.rowClicked = function (uuid) {
        console.log(uuid);
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_5__replay_details_dialog_replay_details_dialog_component__["a" /* ReplayDetailsComponent */], { data: JSON.parse(this.testResultDetailsMap[uuid]), width: '900px' });
    };
    HistoryDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.backendManagerService.fetchTestcaseHistory().subscribe(function (data) {
            var arrData = data;
            console.log(arrData);
            arrData.map(function (testResult) {
                _this.testResultDetailsMap[testResult.uuid] = testResult.testDetails;
            });
            _this.dataSource.data = arrData;
        });
    };
    HistoryDialogComponent.prototype.onSelected = function () {
        console.log(this.selectedItem);
        this.dialogRef.close();
    };
    var HistoryDialogComponent_1;
    HistoryDialogComponent = HistoryDialogComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-history-dialog',
            template: __webpack_require__("./src/app/history-dialog/history-dialog.component.html"),
            styles: [__webpack_require__("./src/app/history-dialog/history-dialog.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogRef */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_3__services_index__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_2__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */]])
    ], HistoryDialogComponent);
    return HistoryDialogComponent;
}());



/***/ }),

/***/ "./src/app/log-panel/log-panel.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.log-panel {\n  background-color: white;\n}\n"

/***/ }),

/***/ "./src/app/log-panel/log-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div id=\"\" class=\"log-panel\" fxFlexFill>\n  <ul>\n    <li *ngFor=\"let item of showingLogs\">{{item}}</li>\n  </ul>\n</div>\n"

/***/ }),

/***/ "./src/app/log-panel/log-panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogPanelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__("./src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_messageTypes__ = __webpack_require__("./src/app/constants/messageTypes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__log_service__ = __webpack_require__("./src/app/log.service.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LogPanelComponent = /** @class */ (function () {
    function LogPanelComponent(logService, messageService) {
        var _this = this;
        this.logService = logService;
        this.messageService = messageService;
        this.showingLogs = [];
        this.startTestSubscriber =
            this.messageService.getMessage(__WEBPACK_IMPORTED_MODULE_2__constants_messageTypes__["a" /* MESSAGE_TYPES */].testStart)
                .subscribe(function (message) {
                _this.showingLogs.unshift('');
                _this.showingLogs.unshift('');
                _this.showingLogs.unshift(message);
            });
        this.endTestSubscriber =
            this.messageService.getMessage(__WEBPACK_IMPORTED_MODULE_2__constants_messageTypes__["a" /* MESSAGE_TYPES */].testEnd)
                .subscribe(function (message) {
                _this.showingLogs.unshift(message);
                _this.showingLogs.unshift('');
                _this.showingLogs.unshift('');
            });
    }
    LogPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.logService.connect();
        this.logService.outputStream.subscribe(function (output) {
            console.log(output);
            if (output.indexOf('UUID:') < 0) {
                _this.showingLogs.unshift(new Date().toLocaleString('en-US', { hour12: false }) + ': ' +
                    output);
            }
            _this.playingLogs.unshift(output);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Array)
    ], LogPanelComponent.prototype, "playingLogs", void 0);
    LogPanelComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'log-panel',
            template: __webpack_require__("./src/app/log-panel/log-panel.component.html"),
            styles: [__webpack_require__("./src/app/log-panel/log-panel.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__log_service__["a" /* LogService */], __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* MessageService */]])
    ], LogPanelComponent);
    return LogPanelComponent;
}());



/***/ }),

/***/ "./src/app/log.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_share__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/share.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_queueing_subject__ = __webpack_require__("./node_modules/queueing-subject/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_queueing_subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_queueing_subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__socket_service__ = __webpack_require__("./src/app/socket.service.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LogService = /** @class */ (function () {
    function LogService(socketFactory) {
        this.socketFactory = socketFactory;
    }
    LogService.prototype.connect = function () {
        if (this.outputStream)
            return this.outputStream;
        // Using share() causes a single websocket to be created when the first
        // observer subscribes. This socket is shared with subsequent observers
        // and closed when the observer count falls to zero.
        return this.outputStream =
            this.socketFactory
                .connect('ws://localhost:8888/log', this.inputStream = new __WEBPACK_IMPORTED_MODULE_2_queueing_subject__["QueueingSubject"]())
                .share();
    };
    LogService.prototype.disconnect = function () {
        this.outputStream = null;
    };
    LogService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__socket_service__["a" /* SocketService */]])
    ], LogService);
    return LogService;
}());



/***/ }),

/***/ "./src/app/minicap.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MinicapService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_share__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/share.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_queueing_subject__ = __webpack_require__("./node_modules/queueing-subject/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_queueing_subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_queueing_subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__socket_service__ = __webpack_require__("./src/app/socket.service.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MinicapService = /** @class */ (function () {
    function MinicapService(socketFactory) {
        this.socketFactory = socketFactory;
    }
    MinicapService.prototype.connect = function (port) {
        if (this.outputStream)
            return this.outputStream;
        // Using share() causes a single websocket to be created when the first
        // observer subscribes. This socket is shared with subsequent observers
        // and closed when the observer count falls to zero.
        return this.outputStream =
            this.socketFactory
                .connect('ws://localhost:' + port, this.inputStream = new __WEBPACK_IMPORTED_MODULE_2_queueing_subject__["QueueingSubject"]())
                .share();
    };
    MinicapService.prototype.disconnect = function () {
        this.outputStream = null;
    };
    MinicapService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__socket_service__["a" /* SocketService */]])
    ], MinicapService);
    return MinicapService;
}());



/***/ }),

/***/ "./src/app/recorder/recorder/recorder.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.demo-tab-group {\n  border: 1px solid #e8e8e8;\n}\n\n.demo-tab-content {\n  padding: 16px;\n}\n\n.phone-canvas-widget {\n  background-color: white;\n  /* position: absolute; */\n  z-index: 0;\n}\n\n.canvas-wrapper {\n  padding-top: 10px;\n  width: 360px;\n  min-width: 360px;\n  max-height: 100% !important;\n}\n\n.phone-canvas-widget2 {\n  /* width: 320px;\n  height: 640px; */\n  background-color: #11000000;\n  /* position: absolute; */\n  z-index: 9;\n}\n\n.phone-sidenav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.devices_selector {\n  position: absolute;\n  top: 720px;\n  left:100px;\n}\n\n.spinner {\n  position: absolute;\n  z-index: 999;\n  left: 35%;\n  top: 35%;\n}\n\n.canvas-overlay{\n  background-color: aquamarine;\n  width: 100%;\n  height: 100%;\n\n}\n\n.btn-container{\n  padding: 15px 10px 15px 10px;\n  background-color: whitesmoke;\n}\n\n.control-nav {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.uicd-row-breaker {\n  background-color: #e5e5e5;\n  height: 3px;\n}\n\n.tab-group{\n  background-color: whitesmoke;\n}\n\n.clearfix {\n  clear: both;\n}\n\n.parent {\n  position: relative;\n}\n\n.phone-overlay-wrapper {\n  background-color: rgba(0, 0, 255, 0);\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  /* absolute position implies no width and height */\n  width: 100%;\n  height: 100%\n}\n\n.recorder-main {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n"

/***/ }),

/***/ "./src/app/recorder/recorder/recorder.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n  <div class=\"phone-sidenav\">\n    <div fxLayout='column'>\n      <div style=\"padding-left:10px;\">\n        <div *ngIf=\"loading\">\n          <mat-spinner class=\"spinner\"></mat-spinner>\n        </div>\n        <div>\n          <div fxLayout='row' class=\"recorder-main\" fxFlexFill>\n            <div fxFlex=\"60px\" fxLayoutGap=\"15px\" fxFlexFill fxLayout='column' class='btn-container'>\n              <button mat-mini-fab color=\"primary\" (click)=\"quickSwipe('left')\" matTooltip=\"Swipe Left\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-arrow-left\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"quickSwipe('right')\" matTooltip=\"Swipe Right\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-arrow-right\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"quickSwipe('up')\" matTooltip=\"Swipe Up\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-arrow-up\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"quickSwipe('down')\" matTooltip=\"Swipe Down\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-arrow-down\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"rotateScreen('0')\" matTooltip=\"Portrait Mode\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                P\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"rotateScreen('1')\" matTooltip=\"Landscape Mode\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                L\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"power()\" matTooltip=\"Power\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-power-off\"></i>\n              </button>\n\n              <button mat-mini-fab color=\"primary\" (click)=\"volumeUp()\" matTooltip=\"Volume Up\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-volume-up\"></i>\n              </button>\n\n              <button mat-mini-fab color=\"primary\" (click)=\"volumeDown()\" matTooltip=\"Volume Down\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-volume-down\"></i>\n              </button>\n              <button mat-mini-fab color=\"primary\" (click)=\"back()\" matTooltip=\"Back\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-chevron-left\"></i>\n              </button>\n\n              <button mat-mini-fab color=\"primary\" (click)=\"home()\" matTooltip=\"Home\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-home\"></i>\n              </button>\n\n              <button mat-mini-fab color=\"primary\" (click)=\"overview()\" matTooltip=\"Overview\" matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n                <i class=\"fa fa-square\"></i>\n              </button>\n            </div>\n            <div fxFlex=\"1\" class=\"canvas-wrapper\" fxLayoutGap=\"10px\">\n              <div class=\"parent\" (tap)=\"tap($event)\" (keyup)=\"onKey($event)\" (press)=\"press($event)\" (pressup)=\"panend($event)\" (pan)=\"pan($event)\"\n                (panend)=\"panend($event)\" tabindex=\"0\">\n                <div class=\"phone-wrapper\">\n                  <canvas id=\"canvas\" class=\"phone-canvas-widget\" #phone tabindex=\"1\" width=\"{{canvasWidth}}px\" height=\"{{canvasHeight}}px\">\n                  </canvas>\n                </div>\n                <!-- This canvas will handle drawing the hovered tree nodes -->\n                <div class=\"phone-overlay-wrapper\">\n                  <canvas id=\"canvas2\" class=\"phone-canvas-widget2\" #overlayHovered tabindex=\"1\" [width]=\"canvasWidth\" [height]=\"canvasHeight\">\n                  </canvas>\n                </div>\n                <!-- This canvas will handle the selected tree nodes -->\n                <div class=\"phone-overlay-wrapper\">\n                    <canvas id=\"canvas2\" class=\"phone-canvas-widget2\" #overlaySelected tabindex=\"1\" [width]=\"canvasWidth\" [height]=\"canvasHeight\">\n                    </canvas>\n                </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/recorder/recorder/recorder.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecorderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_index__ = __webpack_require__("./src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__adb_service__ = __webpack_require__("./src/app/adb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_keycodes__ = __webpack_require__("./src/app/constants/keycodes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_messageTypes__ = __webpack_require__("./src/app/constants/messageTypes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__device_service__ = __webpack_require__("./src/app/device.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__minicap_service__ = __webpack_require__("./src/app/minicap.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tv_remote_dialog_tv_remote_dialog_component__ = __webpack_require__("./src/app/tv-remote-dialog/tv-remote-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__validation_flow_validation_flow_component__ = __webpack_require__("./src/app/validation-flow/validation-flow.component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var KEYBOARD_CONSTANTS = {
    SHIFT_KEY: 16,
    CTRL_KEY: 17,
};
var RecorderComponent = /** @class */ (function () {
    function RecorderComponent(adbservice, dialog, messageService, minicapService, deviceService, backendManagerService) {
        this.adbservice = adbservice;
        this.dialog = dialog;
        this.messageService = messageService;
        this.minicapService = minicapService;
        this.deviceService = deviceService;
        this.backendManagerService = backendManagerService;
        this.displayedColumns = ['position', 'device_serial', 'status'];
        this.slotsInfo = [];
        this.loading = false;
        this.conntected = true;
        this.selectedPlayMode = 'SINGLE';
        this.canvasWidth = 360;
        this.canvasHeight = 640;
        this.startHolding = false;
        this.dragCoordinatesX = [];
        this.dragCoordinatesY = [];
        this.timeOfLastPan = 0;
        this.PAN_THRESHOLD = 500;
        this.inInspectMode = false;
        this.playModes = [
            { name: 'SINGLE', display: 'Single' },
            { name: 'MULTIDEVICE', display: 'Multi Device' },
            { name: 'PLAYALL', display: 'Play All' },
        ];
    }
    RecorderComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Observe bind device
        this.deviceService.currentDeviceInfo.subscribe(function (device) {
            _this.currentBindDevice = device;
            // disconnect old minicap
            _this.minicapService.disconnect();
            if (_this.socketSubscription) {
                _this.socketSubscription.unsubscribe();
            }
            if (_this.currentBindDevice['port'] != null &&
                _this.currentBindDevice['canvasWidth'] !== 0 &&
                _this.currentBindDevice['canvasHeight'] !== 0) {
                _this.canvasWidth = _this.currentBindDevice['canvasWidth'];
                _this.canvasHeight = _this.currentBindDevice['canvasHeight'];
                _this.initFEMiniCap(_this.currentBindDevice['port']);
            }
            else {
                console.log('missing config to init FE minicap.');
            }
        });
    };
    RecorderComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // listen for message from tree viewer component in order
        // to draw on the screen
        this.messageService.getMessage(__WEBPACK_IMPORTED_MODULE_6__constants_messageTypes__["a" /* MESSAGE_TYPES */].nodeSelected)
            .subscribe(function (message) {
            if (message['coordinates']) {
                var coordinates = message['coordinates'];
                //#00008055: navy with 55% transparency
                // must be written in hex in order to pass transparency
                _this.highlightScreenElement(coordinates, '#00008055', _this.overlaySelected, message['deviceRatios']);
            }
        });
        this.messageService.getMessage(__WEBPACK_IMPORTED_MODULE_6__constants_messageTypes__["a" /* MESSAGE_TYPES */].nodeHovered)
            .subscribe(function (message) {
            if (message['coordinates']) {
                var coordinates = message['coordinates'];
                //#68b4e855: light blue with 55% transparency
                // must be written in hex in order to pass transparency
                _this.highlightScreenElement(coordinates, '#68b4e855', _this.overlayHovered, message['deviceRatios']);
            }
        });
        this.messageService.getMessage(__WEBPACK_IMPORTED_MODULE_6__constants_messageTypes__["a" /* MESSAGE_TYPES */].setInspectMode)
            .subscribe(function (state) {
            // gets called at the beginning for some reason,
            // which gives it the default value no message
            if (state !== 'No message') {
                _this.inInspectMode = state;
            }
        });
        this.messageService.getMessage(__WEBPACK_IMPORTED_MODULE_6__constants_messageTypes__["a" /* MESSAGE_TYPES */].clearCanvas)
            .subscribe(function (message) {
            if (message != null) {
                _this.clearOverlayCanvas(_this.overlayHovered);
                if (message === 'both') {
                    _this.clearOverlayCanvas(_this.overlaySelected);
                }
            }
        });
    };
    RecorderComponent.prototype.highlightScreenElement = function (coordinates, color, overlay, deviceRatios) {
        var deviceCoordinates = this.convertCoordinates(coordinates, deviceRatios);
        // draw on screen
        this.clearOverlayCanvas(overlay);
        var ctx = overlay.nativeElement.getContext('2d');
        ctx.rect(deviceCoordinates.startX, deviceCoordinates.startY, deviceCoordinates.endX - deviceCoordinates.startX, deviceCoordinates.endY - deviceCoordinates.startY);
        ctx.fillStyle = color;
        ctx.fill();
    };
    RecorderComponent.prototype.convertCoordinates = function (coordinates, deviceRatios) {
        // comes in as [startX,startY][endX,endY] in a string
        // get actual values and convert them using the ratio
        if (coordinates != null) {
            // returns array in form of:
            //["", "startX", "startY", "", "endX", "endY", "" ]
            var coordinatesArray = coordinates.split(/[\[\],]/);
            // convert the string values to numbers
            var startX = parseFloat(coordinatesArray[1]);
            var startY = parseFloat(coordinatesArray[2]);
            var endX = parseFloat(coordinatesArray[4]);
            var endY = parseFloat(coordinatesArray[5]);
            // adjust to screen size, Might be getting the ratio incorrectly at the
            // backend
            if (deviceRatios) {
                startX = startX / deviceRatios.width;
                startY = startY / deviceRatios.height;
                endX = endX / deviceRatios.width;
                endY = endY / deviceRatios.height;
            }
            return { 'startX': startX, 'startY': startY, 'endX': endX, 'endY': endY };
        }
    };
    RecorderComponent.prototype.sendRefreshWorkflowMessage = function () {
        // send message to subscribers via observable subject
        // workflow component listens for messages to know when to
        // refresh the workflow
        this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_6__constants_messageTypes__["a" /* MESSAGE_TYPES */].refreshWorkflow, 'from recorder');
    };
    RecorderComponent.prototype.sendRefreshXmlMessage = function () {
        this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_6__constants_messageTypes__["a" /* MESSAGE_TYPES */].refreshXml, 'from recorder');
    };
    RecorderComponent.prototype.tap = function (event) {
        var _this = this;
        if (this.initedDevices.length == 0) {
            return;
        }
        if (this.inInspectMode) {
            // send message to tree component and select that component
            var coordinates = {
                'offsetX': event.srcEvent.offsetX,
                'offsetY': event.srcEvent.offsetY
            };
            this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_6__constants_messageTypes__["a" /* MESSAGE_TYPES */].inspectClickedNode, coordinates);
        }
        else {
            if (event.srcEvent.ctrlKey) {
                console.log('tap control on');
                return;
            }
            this.backendManagerService
                .tap(event.srcEvent.offsetX, event.srcEvent.offsetY)
                .subscribe(function () {
                _this.sendRefreshWorkflowMessage();
                _this.sendRefreshXmlMessage();
            });
        }
    };
    RecorderComponent.prototype.isControlPressed = function (event) {
        if (this.inInspectMode || this.initedDevices.length == 0) {
            return;
        }
        if (window.navigator.userAgent.indexOf('Mac') !== -1) {
            if (event.srcEvent.metaKey) {
                return true;
            }
        }
        else if (event.srcEvent.ctrlKey) {
            return true;
        }
    };
    RecorderComponent.prototype.press = function (event) {
        var _this = this;
        if (this.inInspectMode || this.initedDevices.length == 0) {
            return;
        }
        console.log('start press at (' + event.srcEvent.offsetX + ',' +
            event.srcEvent.offsetY + ')');
        if (!this.isControlPressed(event)) {
            this.startHolding = true;
            this.timeOfLastPan = new Date().getTime();
            this.dragCoordinatesX.push(event.srcEvent.offsetX);
            this.dragCoordinatesY.push(event.srcEvent.offsetY);
            this.backendManagerService
                .dragStart(event.srcEvent.offsetX, event.srcEvent.offsetY)
                .subscribe(function () {
                _this.sendRefreshWorkflowMessage();
                _this.sendRefreshXmlMessage();
            });
        }
    };
    RecorderComponent.prototype.pan = function (event) {
        var _this = this;
        if (this.inInspectMode || this.initedDevices.length == 0) {
            return;
        }
        if (this.isControlPressed(event)) {
            this.clearOverlayCanvas(this.overlayHovered);
            var ctx = this.overlayHovered.nativeElement.getContext('2d');
            var startX = event.srcEvent.offsetX - event.deltaX;
            var startY = event.srcEvent.offsetY - event.deltaY;
            ctx.rect(startX, startY, event.deltaX, event.deltaY);
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }
        else {
            if (!this.startHolding) {
                return;
            }
            // handle drag, add new drag point if held in same position for longer
            // than threshold
            var timeNow = new Date().getTime();
            if (timeNow - this.timeOfLastPan > this.PAN_THRESHOLD) {
                console.log('Adding new drag point: (' + event.srcEvent.offsetX + ',' +
                    event.srcEvent.offsetY + ')');
                this.dragCoordinatesX.push(event.srcEvent.offsetX);
                this.dragCoordinatesY.push(event.srcEvent.offsetY);
            }
            // draw lines for all drag points so far
            this.clearOverlayCanvas(this.overlayHovered);
            var ctx = this.overlayHovered.nativeElement.getContext('2d');
            ctx.strokeStyle = 'red';
            ctx.moveTo(this.dragCoordinatesX[0], this.dragCoordinatesY[0]);
            for (var i = 1; i < this.dragCoordinatesX.length; i++) {
                ctx.lineTo(this.dragCoordinatesX[i], this.dragCoordinatesY[i]);
            }
            ctx.lineTo(event.srcEvent.offsetX, event.srcEvent.offsetY);
            ctx.stroke();
            this.timeOfLastPan = timeNow;
            this.backendManagerService
                .dragMove(event.srcEvent.offsetX, event.srcEvent.offsetY)
                .subscribe(function () {
                _this.sendRefreshWorkflowMessage();
                _this.sendRefreshXmlMessage();
            });
        }
    };
    RecorderComponent.prototype.panend = function (event) {
        var _this = this;
        if (this.inInspectMode || this.initedDevices.length == 0) {
            return;
        }
        var options = {
            startX: event.srcEvent.offsetX - event.deltaX,
            startY: event.srcEvent.offsetY - event.deltaY,
            endX: event.srcEvent.offsetX,
            endY: event.srcEvent.offsetY,
        };
        console.log('end pan from (' + options.startX + ', ' + options.startY + ') to (' +
            options.endX + ', ' + options.endY + ')');
        if (this.isControlPressed(event)) {
            this.clearOverlayCanvas(this.overlayHovered);
            var data = {};
            var canvas = document.getElementById('canvas');
            var imageData = this.screenshotToBase64(canvas, options);
            var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_10__validation_flow_validation_flow_component__["a" /* ValidationFlowComponent */], { data: { options: options, imageData: imageData }, width: '1000px' });
            dialogRef.afterClosed().subscribe(function (result) {
                // have to clear the canvas again here somehow.
                _this.clearOverlayCanvas(_this.overlayHovered);
                _this.sendRefreshWorkflowMessage();
                _this.sendRefreshXmlMessage();
            });
            return;
        }
        else {
            if (this.startHolding) {
                this.startHolding = false;
                this.backendManagerService
                    .dragStop(event.srcEvent.offsetX, event.srcEvent.offsetY)
                    .subscribe(function () {
                    _this.sendRefreshWorkflowMessage();
                    _this.sendRefreshXmlMessage();
                });
            }
            this.clearOverlayCanvas(this.overlayHovered);
            if (this.dragCoordinatesX.length <= 1) {
                if (options.startX === options.endX &&
                    options.startY === options.endY) {
                    console.log('Interpreted as long click');
                    this.backendManagerService.longClick(options.endX, options.endY, 2000)
                        .subscribe(function () {
                        _this.sendRefreshWorkflowMessage();
                        _this.sendRefreshXmlMessage();
                    });
                }
                else {
                    console.log('Interpreted as swipe');
                    this.backendManagerService
                        .swipe(options.startX, options.startY, options.endX, options.endY)
                        .subscribe(function () {
                        _this.sendRefreshWorkflowMessage();
                        _this.sendRefreshXmlMessage();
                    });
                }
            }
            else {
                console.log('Interpreted as end of drag');
                this.dragCoordinatesX.push(event.srcEvent.offsetX);
                this.dragCoordinatesY.push(event.srcEvent.offsetY);
                this.backendManagerService
                    .addDragAction(this.dragCoordinatesX, this.dragCoordinatesY)
                    .subscribe(function () {
                    _this.sendRefreshWorkflowMessage();
                    _this.sendRefreshXmlMessage();
                });
            }
            this.dragCoordinatesX = [];
            this.dragCoordinatesY = [];
        }
    };
    RecorderComponent.prototype.screenshotToBase64 = function (canvas, options) {
        var canvasTmp = document.createElement('CANVAS');
        var ctxTmp = canvasTmp.getContext('2d');
        var width = options.endX - options.startX;
        var height = options.endY - options.startY;
        canvasTmp.width = width;
        canvasTmp.height = height;
        ctxTmp.drawImage(canvas, options.startX, options.startY, width, height, 0, 0, width, height);
        var imageData = canvasTmp.toDataURL();
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(canvasTmp);
        body.removeChild(canvasTmp);
        return imageData;
    };
    RecorderComponent.prototype.clearOverlayCanvas = function (overlay) {
        var ctx = overlay.nativeElement.getContext('2d');
        ctx.canvas.width = this.canvasWidth;
        ctx.canvas.height = this.canvasHeight;
    };
    RecorderComponent.prototype.onKey = function (event) {
        var _this = this;
        if (this.inInspectMode || this.initedDevices.length === 0) {
            return;
        }
        console.log(event);
        var code = event.keyCode;
        // ignore control
        if (code === KEYBOARD_CONSTANTS.CTRL_KEY && event.type === 'keyup') {
            this.clearOverlayCanvas(this.overlayHovered);
            return;
        }
        // ignore shift
        if (code === KEYBOARD_CONSTANTS.SHIFT_KEY) {
            return;
        }
        if (event.shiftKey) {
            code += 1000;
        }
        this.backendManagerService.pressKey(code).subscribe(function () {
            _this.sendRefreshWorkflowMessage();
            _this.sendRefreshXmlMessage();
        });
    };
    RecorderComponent.prototype.quickSwipe = function (dir) {
        var _this = this;
        if (this.inInspectMode || this.initedDevices.length === 0) {
            return;
        }
        this.backendManagerService.quickSwipe(dir).subscribe(function () {
            _this.sendRefreshWorkflowMessage();
            _this.sendRefreshXmlMessage();
        });
    };
    RecorderComponent.prototype.rotateScreen = function (dir) {
        var _this = this;
        if (this.inInspectMode || this.initedDevices.length === 0) {
            return;
        }
        this.loading = true;
        this.backendManagerService.rotateScreen(dir).subscribe(function (returnInfo) {
            console.log(returnInfo);
            _this.loading = false;
            _this.sendRefreshWorkflowMessage();
            _this.sendRefreshXmlMessage();
        });
    };
    RecorderComponent.prototype.initFEMiniCap = function (port) {
        var _this = this;
        var BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        var canvas = document.getElementById('canvas');
        var g = canvas.getContext('2d');
        this.minicapService.connect(port);
        window['tmimg'] = new Image();
        this.socketSubscription =
            this.minicapService.outputStream.subscribe(function (output) {
                var blob = new Blob([output], { type: 'image/jpeg' });
                var URL = window.URL;
                var img = new Image();
                // let img =  window['tmimg'];
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    // update overlay canvases
                    _this.canvasWidth = img.width;
                    _this.canvasHeight = img.height;
                    g.drawImage(img, 0, 0);
                    // need revokeObjectURL, otherwise will be memory leak.
                    URL.revokeObjectURL(u);
                    img.onload = null;
                    img.src = BLANK_IMG;
                    img = null;
                    u = null;
                    blob = null;
                };
                var u = URL.createObjectURL(blob);
                img.src = u;
            });
    };
    RecorderComponent.prototype.tvRemoteDialogButtonClick = function () {
        if (this.inInspectMode || this.initedDevices.length === 0) {
            return;
        }
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_9__tv_remote_dialog_tv_remote_dialog_component__["a" /* TvRemoteDialogComponent */], { width: '450px' });
    };
    RecorderComponent.prototype.volumeDown = function () {
        var _this = this;
        if (this.inInspectMode || this.initedDevices.length === 0) {
            return;
        }
        this.backendManagerService.pressKey(__WEBPACK_IMPORTED_MODULE_5__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_VOLUME_DOWN)
            .subscribe(function () { return _this.sendRefreshWorkflowMessage(); });
    };
    RecorderComponent.prototype.volumeUp = function () {
        var _this = this;
        if (this.inInspectMode || this.initedDevices.length === 0) {
            return;
        }
        this.backendManagerService.pressKey(__WEBPACK_IMPORTED_MODULE_5__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_VOLUME_UP)
            .subscribe(function () { return _this.sendRefreshWorkflowMessage(); });
    };
    RecorderComponent.prototype.power = function () {
        var _this = this;
        if (this.inInspectMode || this.initedDevices.length === 0) {
            return;
        }
        this.backendManagerService.pressKey(__WEBPACK_IMPORTED_MODULE_5__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_POWER)
            .subscribe(function () {
            _this.sendRefreshWorkflowMessage();
            _this.sendRefreshXmlMessage();
        });
    };
    RecorderComponent.prototype.home = function () {
        var _this = this;
        if (this.inInspectMode || this.initedDevices.length === 0) {
            return;
        }
        this.backendManagerService.pressKey(__WEBPACK_IMPORTED_MODULE_5__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_HOME)
            .subscribe(function () { return _this.sendRefreshWorkflowMessage(); });
    };
    RecorderComponent.prototype.back = function () {
        var _this = this;
        if (this.inInspectMode || this.initedDevices.length === 0) {
            return;
        }
        this.backendManagerService.pressKey(__WEBPACK_IMPORTED_MODULE_5__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_BACK)
            .subscribe(function () { return _this.sendRefreshWorkflowMessage(); });
    };
    RecorderComponent.prototype.overview = function () {
        var _this = this;
        if (this.inInspectMode || this.initedDevices.length === 0) {
            return;
        }
        this.backendManagerService.pressKey(__WEBPACK_IMPORTED_MODULE_5__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_OVERVIEW)
            .subscribe(function () { return _this.sendRefreshWorkflowMessage(); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('phone'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], RecorderComponent.prototype, "phone", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('overlayHovered'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], RecorderComponent.prototype, "overlayHovered", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('overlaySelected'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], RecorderComponent.prototype, "overlaySelected", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Array)
    ], RecorderComponent.prototype, "initedDevices", void 0);
    RecorderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-recorder',
            template: __webpack_require__("./src/app/recorder/recorder/recorder.component.html"),
            styles: [__webpack_require__("./src/app/recorder/recorder/recorder.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__adb_service__["a" /* AdbService */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */],
            __WEBPACK_IMPORTED_MODULE_3__services_index__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_8__minicap_service__["a" /* MinicapService */],
            __WEBPACK_IMPORTED_MODULE_7__device_service__["a" /* DeviceService */],
            __WEBPACK_IMPORTED_MODULE_2__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */]])
    ], RecorderComponent);
    return RecorderComponent;
}());



/***/ }),

/***/ "./src/app/replay-details-dialog/replay-details-dialog.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.details-result {\n  overflow-y: auto;\n  max-height: 450px;\n}\n\n.test-status-pass {\n  color: green;\n}\n\n.test-status-fail {\n  color: OrangeRed;\n}\n\n.test-status-cancelled {\n  color: OrangeRed;\n}\n\n:host ::ng-deep .skipped_status {\n  color:Orange;\n}\n\n:host ::ng-deep .skipped_content {\n  text-decoration: line-through;\n}\n\n:host ::ng-deep .exit_current_compound_status {\n  color:Chocolate;\n}\n\n:host ::ng-deep .failed_status {\n  color:OrangeRed;\n}\n\n:host ::ng-deep .pass_status {\n  color:green;\n}\n\n:host ::ng-deep .content_bold {\n font-weight: bold;\n}\n"

/***/ }),

/***/ "./src/app/replay-details-dialog/replay-details-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n  <h3>Test Result: <span [class]=\"testStatusColor\">{{data.playStatus}}</span></h3>\n  <div class=\"details-result\">\n      <div #dataTree></div>\n  </div>\n  <div class=\"details-result\">\n    <mat-grid-list cols=\"3\" rowHeight=\"300px\">\n      <mat-grid-tile *ngFor=\"let tile of outputList\">\n        <img height=\"300px\" [src]=\"tile.path\" alt=\"Description\" />\n      </mat-grid-tile>\n    </mat-grid-list>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/replay-details-dialog/replay-details-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReplayDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_device__ = __webpack_require__("./src/app/constants/device.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var ReplayDetailsComponent = /** @class */ (function () {
    function ReplayDetailsComponent(data) {
        this.data = data;
        this.outputList = [];
        this.getResourceBasePath = __WEBPACK_IMPORTED_MODULE_2__constants_device__["a" /* BACKEND_BASE_URL */] + '/getSavedResource?path=';
        this.data = data;
        this.testStatusColor = this.getTestResultCssClass(data.playStatus);
    }
    ReplayDetailsComponent.prototype.ngOnInit = function () {
        var treeData = this.getDefaultData();
        this.setupDataTree(treeData);
        var childData = this.contructNodeFromData(this.data);
        treeData['children'].push(childData);
        this.updateDataTree(treeData);
    };
    ReplayDetailsComponent.prototype.setupDataTree = function (data) {
        var jsTreeObj = $(this.dataTree.nativeElement);
        this.tree =
            jsTreeObj.jstree({ 'core': { 'data': data }, plugins: ['wholerow'] });
    };
    ReplayDetailsComponent.prototype.updateDataTree = function (treeData) {
        this.tree.jstree(true).settings.core.data = treeData;
        this.tree.jstree(true).refresh();
    };
    ReplayDetailsComponent.prototype.getDefaultData = function () {
        return {
            'text': 'Test Details',
            'id': 1,
            'icon': 'fa fa-folder',
            'state': { opened: true },
            'children': []
        };
    };
    ReplayDetailsComponent.prototype.getTestResultCssClass = function (playStatus) {
        switch (playStatus) {
            case 'PASS':
                return 'test-status-pass';
            case 'FAIL':
                return 'test-status-fail';
            case 'CANCELLED':
                return 'test-status-cancelled';
        }
        return '';
    };
    ReplayDetailsComponent.prototype.getNodeDisplayText = function (playStatus, content) {
        switch (playStatus) {
            case 'SKIPPED':
                return '<span class="skipped_status">(SKIPPED) </span><span class="skipped_content">' +
                    content + '</span>';
            case 'FAIL':
                return '<span class="failed_status">(FAIL) </span><span class="content_bold">' +
                    content + '</span>';
            case 'EXIT_CURRENT_COMPOUND':
                return '<span class="exit_current_compound_status">(Exit Current Compound) </span><span class="content_bold">' +
                    content + '</span>';
            default:
                if (content.includes('Validation')) {
                    return '<span class="pass_status">(PASS) </span><span>' + content +
                        '</span>';
                }
                else {
                    return content;
                }
        }
    };
    ReplayDetailsComponent.prototype.contructNodeFromData = function (obj) {
        var _this = this;
        var topChildren = {};
        topChildren['text'] = this.getNodeDisplayText(obj.playStatus, obj.content);
        topChildren['id'] = obj.uuid;
        topChildren['state'] = { opened: true };
        topChildren['icon'] = this.getIconByActionType(obj.actionType);
        topChildren['children'] = [];
        if (obj.childrenResult.length > 0) {
            obj.childrenResult.forEach(function (element) {
                topChildren['children'].push(_this.contructNodeFromData(element));
            });
        }
        if (obj.outputType === 'SCREENSHOT' || obj.outputType === 'LOGCAT') {
            var displayObj = {};
            displayObj['type'] = obj.outputType;
            displayObj['path'] = this.getResourceBasePath + obj.externalFilePath;
            this.outputList.push(displayObj);
        }
        return topChildren;
    };
    ReplayDetailsComponent.prototype.getIconByActionType = function (actionType) {
        return 'fa fa-mouse-pointer';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('dataTree'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ReplayDetailsComponent.prototype, "dataTree", void 0);
    ReplayDetailsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'replay-details-dialog',
            template: __webpack_require__("./src/app/replay-details-dialog/replay-details-dialog.component.html"),
            styles: [__webpack_require__("./src/app/replay-details-dialog/replay-details-dialog.component.css")]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [Object])
    ], ReplayDetailsComponent);
    return ReplayDetailsComponent;
}());



/***/ }),

/***/ "./src/app/socket.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
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

var SocketService = /** @class */ (function () {
    function SocketService() {
    }
    SocketService.prototype.connect = function (url, input) {
        return new __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["a" /* Observable */](function (observer) {
            var socket = new WebSocket(url);
            var inputSubscription;
            socket.onopen = function () {
                inputSubscription =
                    input.subscribe(function (data) { socket.send(JSON.stringify(data)); });
            };
            socket.onmessage = function (message) {
                observer.next(message.data);
            };
            socket.onerror = function (error) {
                observer.error(error);
            };
            socket.onclose = function () {
                observer.complete();
            };
            return function () {
                if (inputSubscription)
                    inputSubscription.unsubscribe();
                if (socket)
                    socket.close();
            };
        });
    };
    return SocketService;
}());



/***/ }),

/***/ "./src/app/special-click-dialog/special-click-dialog.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n"

/***/ }),

/***/ "./src/app/special-click-dialog/special-click-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"row\">Image Matching Then Click Action Details</div>\n<div>\n    <canvas id=\"snapshot\" width=\"50\" height=\"50\">\n    </canvas>\n</div>\n\n<div>\n  <mat-form-field>\n    <mat-select placeholder=\"Search Range\"  [(ngModel)]=\"inputData.model.textPosition\">\n      <mat-option value=\"FullScreen\">FullScreen</mat-option>\n      <mat-option value=\"Strict\">Strict</mat-option>\n      <mat-option value=\"Around\">Around</mat-option>\n    </mat-select>\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput placeholder=\"Matching Threshold (0.0-1)\" [(ngModel)]=\"inputData.model.threshold\">\n  </mat-form-field>\n</div>\n\n<div class=\"row\">\n  <mat-form-field>\n    <mat-select placeholder=\"Click Type\" [(ngModel)]=\"inputData.model.clickType\">\n        <mat-option value=\"Click\">Click</mat-option>\n        <mat-option value=\"DoubleClick\">Double Click</mat-option>\n    </mat-select>\n  </mat-form-field>\n</div>"

/***/ }),

/***/ "./src/app/special-click-dialog/special-click-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecialClickDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SpecialClickDialog = /** @class */ (function () {
    function SpecialClickDialog(dialog) {
        this.dialog = dialog;
    }
    SpecialClickDialog.prototype.setModelDefaultValue = function () {
        this.inputData['model'] = this.convertValidationDlgData(this.inputData);
        this.inputData['model']['textPosition'] = 'Around';
        this.inputData['model']['threshold'] = 0.7;
        this.inputData['model']['clickType'] = 'Click';
        if (this.inputData['model']['imageData'] != null &&
            this.inputData['model']['specialClickSubType'] ===
                'ImageMatchThenClick') {
            var canvas = document.getElementById('snapshot');
            var ctx = canvas.getContext('2d');
            var image = new Image();
            image.onload = function () {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
            };
            image.src = this.inputData['model']['imageData'];
        }
    };
    SpecialClickDialog.prototype.ngOnChanges = function () {
        this.setModelDefaultValue();
    };
    SpecialClickDialog.prototype.convertValidationDlgData = function (validationData) {
        var model = {};
        if (validationData !== null) {
            if (validationData['specialClickSubType'] != null) {
                model['specialClickSubType'] = validationData['specialClickSubType'];
            }
            if (validationData['imageData'] != null) {
                model['imageData'] = validationData['imageData'];
            }
        }
        return model;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], SpecialClickDialog.prototype, "inputData", void 0);
    SpecialClickDialog = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-special-click-dialog',
            template: __webpack_require__("./src/app/special-click-dialog/special-click-dialog.component.html"),
            styles: [__webpack_require__("./src/app/special-click-dialog/special-click-dialog.component.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */]])
    ], SpecialClickDialog);
    return SpecialClickDialog;
}());



/***/ }),

/***/ "./src/app/test-case-list-editor/action-edit-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionEditDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_cdk_keycodes__ = __webpack_require__("./node_modules/@angular/cdk/esm5/keycodes.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_uuid__ = __webpack_require__("./node_modules/angular2-uuid/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_index__ = __webpack_require__("./src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_testcase_manager_testcase_manager_service__ = __webpack_require__("./src/app/_services/testcase-manager/testcase-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_plus_new_action_dialog_new_action_dialog_component__ = __webpack_require__("./src/app/actions-plus/new-action-dialog/new-action-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__constants_messageTypes__ = __webpack_require__("./src/app/constants/messageTypes.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};











// action edit dialog
var ActionEditDialog = /** @class */ (function () {
    function ActionEditDialog(dialog, messageService, tcmService, dialogRef, backendManagerService, snackBar, data) {
        this.dialog = dialog;
        this.messageService = messageService;
        this.tcmService = tcmService;
        this.dialogRef = dialogRef;
        this.backendManagerService = backendManagerService;
        this.snackBar = snackBar;
        this.data = data;
        this.actionData = {};
        this.saveToFolderId = '';
        this.isSaveWorkflow = false;
        this.isNewWorkflow = false;
        this.isMoveAction = false;
        this.nodeIdInTree = '';
        this.SNACKBAR_DURATION_MS = 2000;
        this.folderList = [];
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.showEditDetails = false;
        // Enter, comma
        this.separatorKeysCodes = [__WEBPACK_IMPORTED_MODULE_0__angular_cdk_keycodes__["g" /* ENTER */], __WEBPACK_IMPORTED_MODULE_0__angular_cdk_keycodes__["c" /* COMMA */]];
        this.data = data;
        this.actionData['name'] = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["k" /* Validators */].required]);
    }
    ActionEditDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.isMoveAction = this.data['isMoveAction'];
        this.nodeIdInTree = this.data['nodeId'];
        if (this.data.hasOwnProperty('saveWorkflow')) {
            this.isSaveWorkflow = this.data['saveWorkflow'];
        }
        this.backendManagerService.getCurrentUser().subscribe(function (username) {
            _this.currentUser = username['name'];
        });
        this.backendManagerService.getActionDetails(this.data['uuid'])
            .subscribe(function (data) {
            _this.actionData = data;
            _this.isNewWorkflow =
                _this.data['isCopyAction'] || _this.actionData['name'] == null;
            _this.showEditDetails = _this.hasEditDetails();
        });
        this.folderList = this.tcmService.getFolderList();
        if (this.folderList.length > 0) {
            this.saveToFolderId = this.folderList[0].id;
        }
    };
    ActionEditDialog.prototype.add = function (event) {
        var input = event.input;
        var value = event.value;
        // Add action
        if ((value || '').trim()) {
            this.data.nextActionList.push(value.trim());
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    };
    ActionEditDialog.prototype.remove = function (action) {
        var index = this.data.nextActionList.indexOf(action);
        if (index >= 0) {
            this.data.nextActionList.splice(index, 1);
        }
    };
    ActionEditDialog.prototype.hasEditDetails = function () {
        var actionsUseNewActionDialog = [
            'COMMAND_LINE_ACTION', 'LOGCAT_VALIDATION_ACTION', 'INPUT_ACTION',
            'GLOBAL_VARIABLE_VALIDATION_ACTION', 'CLICK_ACTION'
        ];
        if (this.actionData['actionType'] === 'CLICK_ACTION') {
            return this.data.hasOwnProperty('isByElement') &&
                this.data['isByElement'];
        }
        return actionsUseNewActionDialog.includes(this.actionData['actionType']);
    };
    ActionEditDialog.prototype.editAction = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_8__actions_plus_new_action_dialog_new_action_dialog_component__["a" /* NewActionDialogComponent */], { width: '750px', data: this.actionData });
    };
    ActionEditDialog.prototype.cancelDialog = function () {
        this.dialogRef.close();
    };
    ActionEditDialog.prototype.deleteAction = function () {
        var _this = this;
        if (!confirm('Are you sure you wish to delete this?')) {
            return;
        }
        this.backendManagerService.removeAction(this.data['uuid'])
            .subscribe(function (data) {
            if (data) {
                _this.dialogRef.close({ 'deleted': true });
            }
        });
    };
    ActionEditDialog.prototype.playAction = function () {
        var _this = this;
        this.backendManagerService.playAction(this.data['uuid']).subscribe(function (data) {
            console.log(data);
            _this.dialogRef.close();
        });
    };
    ActionEditDialog.prototype.playWorkflowFromCurrentAction = function () {
        this.dialogRef.close({ playWorkflowRequested: true });
    };
    ActionEditDialog.prototype.sendMessage = function () {
        // send message to subscribers via observable subject
        this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_9__constants_messageTypes__["a" /* MESSAGE_TYPES */].refreshWorkflow, 'message from recorder!');
    };
    ActionEditDialog.prototype.saveAction = function () {
        var _this = this;
        if (!this.actionData['name']) {
            this.snackBar.open('The action name can\'t be empty', 'OK', { duration: this.SNACKBAR_DURATION_MS });
            return;
        }
        if (this.isSaveWorkflow === true && !this.data['isMoveAction'] &&
            !this.data['isCopyAction']) {
            this.backendManagerService.saveCurrentWorkflow(this.actionData)
                .subscribe(function (data) {
                var treeRef = _this.tcmService.treeComponent;
                var newNode = {
                    'text': _this.actionData['name'],
                    'icon': 'fa fa-file-code-o',
                    'id': __WEBPACK_IMPORTED_MODULE_4_angular2_uuid__["UUID"].UUID(),
                    'state': { 'opened': true },
                    'isFolder': false,
                    'additionalData': [_this.actionData['actionId']],
                    'children': []
                };
                treeRef.jstree('create_node', _this.saveToFolderId, newNode);
                _this.tcmService.saveJstreeModel();
                _this.tcmService.setCurrentWorkflowName(_this.actionData['name']);
                _this.sendMessage();
            });
        }
        else {
            this.backendManagerService.updateActionMetadata(this.actionData)
                .subscribe(function (data) {
                console.log(data);
            });
        }
        var data = {
            'parentId': this.saveToFolderId,
            'name': this.actionData['name'],
            'actionId': this.actionData['actionId'],
            'metadata': this.actionData
        };
        this.dialogRef.close(data);
    };
    ActionEditDialog.prototype.isCompoundAction = function () {
        return this.actionData['actionType'] === 'COMPOUND_ACTION';
    };
    ActionEditDialog = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'action-edit-dialog',
            template: __webpack_require__("./src/app/test-case-list-editor/action-edit-dialog.html"),
            styles: [__webpack_require__("./src/app/test-case-list-editor/action-edit-dialog.css")],
        }),
        __param(6, Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_material__["f" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_6__services_index__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_7__services_testcase_manager_testcase_manager_service__["a" /* TCMService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["h" /* MatDialogRef */],
            __WEBPACK_IMPORTED_MODULE_5__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["t" /* MatSnackBar */], Object])
    ], ActionEditDialog);
    return ActionEditDialog;
}());



/***/ }),

/***/ "./src/app/test-case-list-editor/action-edit-dialog.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.example-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.example-container > * {\n  width: 100%;\n}\n\n.createdByLabel {\n  color: darkred;\n}\n"

/***/ }),

/***/ "./src/app/test-case-list-editor/action-edit-dialog.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<h1>Action Details</h1>\n<h5 *ngIf=\"currentUser !== actionData.createdBy\" class=\"createdByLabel\">\n    Created by: <span *ngIf=\"!actionData.createdBy\">No Owner</span>\n    <span *ngIf=\"actionData.createdBy\">{{actionData.createdBy}}</span>, Editing is restricted\n</h5>\n<div class=\"example-container\">\n    <mat-form-field>\n        <input matInput placeholder=\"Action Id\" [(ngModel)]=\"actionData.actionId\" readonly>\n    </mat-form-field>\n\n    <mat-form-field>\n      <input matInput placeholder=\"Name\" [(ngModel)]=\"actionData.name\" required [disabled]=\"currentUser !== actionData.createdBy\">\n      <mat-error *ngIf=\"!actionData.name\">You must input a name.</mat-error>\n    </mat-form-field>\n\n    <mat-form-field>\n      <input matInput placeholder=\"Delay After(Ms)\" type=\"number\" [(ngModel)]=\"actionData.delayAfterActionMs\" [disabled]=\"currentUser !== actionData.createdBy\">\n    </mat-form-field>\n\n    <mat-form-field *ngIf=\"isCompoundAction()\">\n      <input matInput placeholder=\"Repeat Time\" [(ngModel)]=\"actionData.repeatTime\" [disabled]=\"!isCompoundAction()\" >\n    </mat-form-field>\n\n    <mat-form-field>\n        <input matInput placeholder=\"Action Type\" [(ngModel)]=\"actionData.actionType\" [disabled]=\"true\">\n    </mat-form-field>\n\n    <div *ngIf=\"actionData.actionType == 'CLICK_ACTION';then clickSection\">here is ignored</div>\n\n    <ng-template #clickSection>\n            <mat-checkbox placeholder=\"Is Raw xy\" ng-disabled [(ngModel)]=\"actionData.isRawXY\">is raw XY</mat-checkbox>\n    </ng-template>\n\n    <mat-form-field>\n        <textarea matInput placeholder=\"Description\" [(ngModel)]=\"actionData.actionDescription\" [disabled]=\"currentUser !== actionData.createdBy\"></textarea>\n    </mat-form-field>\n</div>\n\n<div [hidden]=\"(!data.saveWorkflow || !isNewWorkflow) && !isMoveAction\">\n    <mat-form-field>\n        <mat-select placeholder=\"Folder\" [(ngModel)]=\"saveToFolderId\">\n        <mat-option *ngFor=\"let folder of folderList\" [value]=\"folder.id\">{{ folder.value }}</mat-option>\n        </mat-select>\n    </mat-form-field>\n</div>\n\n<div>\n    <mat-checkbox  [(ngModel)]=\"actionData.runAlways\" [disabled]=\"currentUser !== actionData.createdBy\">Run Always (run current step even if previous step failed)</mat-checkbox>\n</div>\n\n<div>\n  <button mat-raised-button (click)=\"saveAction()\" #btn1>Save</button>\n  <button mat-raised-button (click)=\"cancelDialog()\" #btn2>Cancel</button>\n  <button mat-raised-button (click)=\"deleteAction()\" #btn2>Delete</button>\n  <button mat-raised-button (click)=\"playAction()\" #btn2>Play</button>\n  <button mat-raised-button *ngIf=\"showEditDetails\" (click)=\"editAction()\">Edit Details</button>\n  <button mat-raised-button (click)=\"playWorkflowFromCurrentAction()\" #btn2>\n      Play Workflow From Here</button>\n</div>\n"

/***/ }),

/***/ "./src/app/test-case-list-editor/import-dialog/import-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImportDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__ = __webpack_require__("./node_modules/angular2-uuid/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__("./node_modules/rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_testcase_manager_testcase_manager_service__ = __webpack_require__("./src/app/_services/testcase-manager/testcase-manager.service.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







// action edit dialog
var ImportDialog = /** @class */ (function () {
    function ImportDialog(dialog, tcmService, snackBar, backendManagerService, dialogRef, data) {
        this.dialog = dialog;
        this.tcmService = tcmService;
        this.snackBar = snackBar;
        this.backendManagerService = backendManagerService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.IMPORT_TYPES = { UUID_TYPE: 0, USERNAME_TYPE: 1, TESTNAME_TYPE: 2 };
        this.importType = this.IMPORT_TYPES.UUID_TYPE;
        this.preserveStructureToggle = false;
        this.isLoading = false;
        this.treeDisplay = 'none';
        this.testcaseDetails = [];
        this.previousUsername = '';
        this.previousTestcaseName = '';
        this.SNACKBAR_DURATION_MS = 2000;
        // Flag for disabling/enabling search for test case by name feature
        this.enableSearchByTestcaseName = false;
        this.data = data;
    }
    ImportDialog.prototype.ngOnInit = function () {
        this.setupDataTree();
    };
    ImportDialog.prototype.setupDataTree = function () {
        var jsTreeObj = $(this.testCaseTree.nativeElement);
        this.xmlDataTree = jsTreeObj.jstree({ plugins: ['checkbox', 'wholerow'] });
        this.buildSelectEvent();
    };
    ImportDialog.prototype.updateDataTree = function (treeData) {
        this.xmlDataTree.jstree(true).settings.core.data = treeData;
        this.xmlDataTree.jstree(true).refresh();
    };
    ImportDialog.prototype.buildSelectEvent = function () {
        this.xmlDataTree.on('select_node.jstree', function (e, data) {
            var _this = this;
            var nodeSelected = data.node;
            if (nodeSelected['original'] && !nodeSelected['original']['isFolder']) {
                // display test case details
                this.backendManagerService
                    .getActionDetails(nodeSelected['original']['additionalData'][0])
                    .subscribe(function (actionData) {
                    _this.actionTitle = actionData['name'];
                    _this.actionType = actionData['actionType'];
                    _this.testcaseDetails = actionData['childrenActions'];
                });
            }
        }.bind(this));
    };
    ImportDialog.prototype.validateSearchInput = function (inputText, previousText) {
        if (!inputText || inputText === '') {
            return;
        }
        if (inputText === previousText) {
            return;
        }
        var continueFetching = true;
        var testCasesSelected = (this.xmlDataTree.jstree(true).get_checked().length > 0);
        if (testCasesSelected) {
            // alert user that their currently selected cases will be lost
            // check if they want to proceed
            continueFetching = confirm('Warning, Test Cases will be lost. Continue?');
        }
        return continueFetching;
    };
    ImportDialog.prototype.fetchUserTests = function () {
        var _this = this;
        if (this.validateSearchInput(this.usernameText, this.previousUsername)) {
            this.previousUsername = this.usernameText;
            this.backendManagerService.fetchTestcaseTreeByUsername(this.usernameText)
                .subscribe(function (data) {
                if (data[0] && data[0]['treeDetails']) {
                    var tmpTree = JSON.parse(data[0]['treeDetails']);
                    var treeData = _this.tcmService.convertToJsTreeFormat(tmpTree);
                    _this.updateDataTree(treeData);
                    // Reset previous search input (applies to test case name search
                    // bar which is currently disabled)
                    _this.previousTestcaseName = '';
                }
                else {
                    _this.snackBar.open('Test Case does not exist', 'OK', { duration: _this.SNACKBAR_DURATION_MS });
                }
            });
        }
    };
    ImportDialog.prototype.formatAction = function (testcase) {
        return {
            'text': testcase['name'] + ' | Created By: ' + testcase['createdBy'],
            'id': testcase['uuid'],
            'icon': 'fa fa-file-code-o',
            'isFolder': false,
            'additionalData': [testcase['uuid']]
        };
    };
    // This feature is currently disabled. To enable change, set
    // enableSearchByTestcaseName to true.
    ImportDialog.prototype.fetchTestcaseByName = function () {
        var _this = this;
        if (this.validateSearchInput(this.testCaseNameText, this.previousTestcaseName)) {
            this.previousTestcaseName = this.testCaseNameText;
            this.backendManagerService.fetchTestcaseByName(this.testCaseNameText)
                .subscribe(function (testcases) {
                // make tree using these test cases
                var testcaseTree = [];
                for (var _i = 0, _a = testcases; _i < _a.length; _i++) {
                    var testcase = _a[_i];
                    var testcaseNode = _this.formatAction(testcase);
                    testcaseTree.push(testcaseNode);
                }
                _this.updateDataTree(testcaseTree);
                // Reset previous search input
                _this.previousUsername = '';
            });
        }
    };
    ImportDialog.prototype.selectAll = function () {
        this.xmlDataTree.jstree(true).check_all();
    };
    ImportDialog.prototype.deselectAll = function () {
        this.xmlDataTree.jstree(true).uncheck_all();
    };
    ImportDialog.prototype.preserveStructure = function () {
        this.preserveStructureToggle = !(this.preserveStructureToggle);
    };
    ImportDialog.prototype.onRadioChange = function (event) {
        this.treeDisplay =
            (event.value === this.IMPORT_TYPES.UUID_TYPE ? 'none' : 'block');
    };
    ImportDialog.prototype.cancel = function () {
        this.dialogRef.close();
    };
    ImportDialog.prototype.copyNode = function (nodeId) {
        return new Promise(function (resolve, reject) {
            this.backendManagerService.copyAction(nodeId)
                .catch(function (error) {
                console.log('Test Case does not exist:', error);
                return new __WEBPACK_IMPORTED_MODULE_3_rxjs__["BehaviorSubject"](error).asObservable();
            })
                .subscribe(function (actionData) {
                if (!actionData.error) {
                    var childNode = {
                        'text': actionData['name'],
                        'icon': 'fa fa-file-code-o',
                        'id': __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__["UUID"].UUID(),
                        'state': { 'opened': true },
                        'isFolder': false,
                        'additionalData': [actionData['actionId']],
                        'children': []
                    };
                    resolve(childNode);
                }
                resolve(false);
            });
        }.bind(this));
    };
    ImportDialog.prototype.getParentNode = function (childNode) {
        var parentNode = this.xmlDataTree.jstree(true).get_node(childNode.parent);
        return {
            'text': parentNode.text,
            'icon': parentNode.icon,
            'id': __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__["UUID"].UUID(),
            'state': { 'opened': true },
            'isFolder': true,
            'children': []
        };
    };
    ImportDialog.prototype.import = function () {
        var _this = this;
        this.isLoading = true;
        if (this.importType === this.IMPORT_TYPES.UUID_TYPE) {
            if (this.uuidImportText && this.uuidImportText !== '') {
                this.backendManagerService.copyAction(this.uuidImportText)
                    .catch(function (error) {
                    _this.snackBar.open('Test Case does not exist', 'OK', { duration: _this.SNACKBAR_DURATION_MS });
                    return new __WEBPACK_IMPORTED_MODULE_3_rxjs__["BehaviorSubject"](error).asObservable();
                })
                    .subscribe(function (actionData) {
                    if (!actionData.error) {
                        var data = { 'uuid': actionData['actionId'] };
                        _this.dialogRef.close(data);
                    }
                    else {
                        _this.isLoading = false;
                    }
                });
            }
            else {
                this.snackBar.open('Please Enter a UUID', 'OK', { duration: this.SNACKBAR_DURATION_MS });
                this.isLoading = false;
            }
        }
        else {
            // check if preserve state is on
            // make an array with all uuids that were checked
            var testCasesSelected = this.xmlDataTree.jstree(true).get_checked(true);
            if (testCasesSelected && testCasesSelected.length > 0) {
                this.createTestCaseArray(testCasesSelected);
            }
            else {
                this.snackBar.open('Please Select a Test Case', 'OK', { duration: this.SNACKBAR_DURATION_MS });
                this.isLoading = false;
            }
        }
    };
    ImportDialog.prototype.createTestCaseArray = function (testCasesSelected) {
        return __awaiter(this, void 0, void 0, function () {
            var data, nodeArray, _i, testCasesSelected_1, testcase, id, nodeCopy, parentId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {};
                        nodeArray = {};
                        _i = 0, testCasesSelected_1 = testCasesSelected;
                        _a.label = 1;
                    case 1:
                        if (!(_i < testCasesSelected_1.length)) return [3 /*break*/, 4];
                        testcase = testCasesSelected_1[_i];
                        if (!(testcase['original'] && !testcase['original'].isFolder &&
                            testcase['original']['additionalData'])) return [3 /*break*/, 3];
                        id = testcase['original']['additionalData'][0];
                        return [4 /*yield*/, this.copyNode(id)];
                    case 2:
                        nodeCopy = _a.sent();
                        // Populate node array
                        if (this.preserveStructureToggle) {
                            parentId = testcase.parent;
                            if (!(parentId in nodeArray)) {
                                nodeArray[parentId] = this.getParentNode(testcase);
                            }
                            if (nodeCopy) {
                                nodeArray[parentId].children.push(nodeCopy);
                            }
                        }
                        else if (nodeCopy) {
                            nodeArray[id] = nodeCopy;
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        data['nodeArray'] = nodeArray;
                        this.dialogRef.close(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('testCaseTree'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ImportDialog.prototype, "testCaseTree", void 0);
    ImportDialog = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'import-dialog',
            template: __webpack_require__("./src/app/test-case-list-editor/import-dialog/import-dialog.html"),
            styles: [__webpack_require__("./src/app/test-case-list-editor/import-dialog/import-dialog.css")],
        }),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_5__services_testcase_manager_testcase_manager_service__["a" /* TCMService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["t" /* MatSnackBar */],
            __WEBPACK_IMPORTED_MODULE_4__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogRef */], Object])
    ], ImportDialog);
    return ImportDialog;
}());



/***/ }),

/***/ "./src/app/test-case-list-editor/import-dialog/import-dialog.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.main-body {\n    padding: 5px;\n}\n\n.radio-group-col {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    width: 100% !important;\n}\n\n.radio-buttons {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n}\n\n.tree-button {\n    margin-left: 5px;\n}\n\n.tree-checkbox {\n    padding-top: 10px;\n    margin-left: 10px;\n}\n\n.button-group {\n    text-align: right;\n    width: 100%;\n}\n\n.inputFields {\n    margin-left: 5px;\n    margin-top: -15px;\n    width: 100% !important;\n}\n\n.uuidInput {\n    width: 100%\n}\n\n.usernameInput {\n    width: 100%;\n}\n\n.bottom-buttons {\n    text-align: right;\n    position: -webkit-sticky;\n    position: sticky;\n    bottom: 0;\n}\n\n.testCaseTree {\n    margin-top: 5px;\n    float: left;\n    width: 50%;\n}\n\n.test-case-details {\n    float: left;\n    width: 46%;\n    padding: 10px;\n    text-align: center;\n    position: -webkit-sticky;\n    position: sticky;\n    top: 0;\n    max-height: 450px;\n    overflow-y: auto;\n    -webkit-box-shadow: 0px 1px 5px 2px #888888;\n            box-shadow: 0px 1px 5px 2px #888888;\n    border-radius: 5px;\n    margin-left: 29px;\n}\n\n.action-detail {\n    margin-top: 5px;\n    text-align: left;\n    word-wrap: break-word;\n}\n\n.test-case-details div:nth-child(odd) {\n    background: whitesmoke;\n}\n\n.details-list {\n    list-style-type: none;\n    padding: 0;\n}\n\n.loading-bar {\n    width: 25%;\n    top: 50%;\n    left: 38%;\n}\n\n.device-prepare-overlay {\n    background-color:gray;\n    width: 100%;\n    height: 100%;\n    opacity: 0.5;\n    z-index: 99;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n}\n\n#overflow-y {\n    overflow-y: auto !important;\n}\n"

/***/ }),

/***/ "./src/app/test-case-list-editor/import-dialog/import-dialog.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"device-prepare-overlay\" *ngIf=\"isLoading\">\n        <mat-progress-bar mode=\"indeterminate\" class=\"loading-bar\"></mat-progress-bar>\n</div>\n<div class=\"main-body\">\n    <mat-radio-group class=\"radio-group-col\" [(ngModel)]=\"importType\">\n            <div class=\"radio-buttons\">\n                <mat-radio-button [value]=\"IMPORT_TYPES.UUID_TYPE\" (change)=\"onRadioChange($event)\"></mat-radio-button>\n                <mat-form-field class=\"inputFields\">\n                        <input [(ngModel)]=\"uuidImportText\" class=\"uuidInput\" (keyup.enter)=\"import()\" matInput placeholder=\"Import by UUID\" [disabled]=\"importType !== IMPORT_TYPES.UUID_TYPE\">\n                </mat-form-field>\n            </div>\n            <div class=\"radio-buttons\">\n                <mat-radio-button [value]=\"IMPORT_TYPES.USERNAME_TYPE\" (change)=\"onRadioChange($event)\"></mat-radio-button>\n                <mat-form-field class=\"inputFields\">\n                        <input [(ngModel)]=\"usernameText\" class=\"usernameInput\" (keyup.enter)=\"fetchUserTests()\" matInput placeholder=\"Press Enter to search by Username\" [disabled]=\"importType !== IMPORT_TYPES.USERNAME_TYPE\">\n                </mat-form-field>\n            </div>\n            <div class=\"radio-buttons\" *ngIf=\"enableSearchByTestcaseName\">\n                    <mat-radio-button [value]=\"IMPORT_TYPES.TESTNAME_TYPE\" (change)=\"onRadioChange($event)\"></mat-radio-button>\n                    <mat-form-field class=\"inputFields\">\n                            <input [(ngModel)]=\"testCaseNameText\" class=\"usernameInput\" (keyup.enter)=\"fetchTestcaseByName()\" matInput placeholder=\"Press Enter to search by Test case name\" [disabled]=\"importType !== IMPORT_TYPES.TESTNAME_TYPE\">\n                    </mat-form-field>\n            </div>\n            <div fxLayout=\"row\">\n                <button mat-raised-button [disabled]=\"importType === IMPORT_TYPES.UUID_TYPE\" class=\"tree-button\" (click)=\"selectAll()\">Select All</button>\n                <button mat-raised-button [disabled]=\"importType === IMPORT_TYPES.UUID_TYPE\" class=\"tree-button\" (click)=\"deselectAll()\">Deselect All</button>\n                <mat-checkbox [disabled]=\"importType !== IMPORT_TYPES.USERNAME_TYPE\" class=\"tree-checkbox\" (click)=\"preserveStructure()\" fxFlexAlign=\"end\">Preserve Structure</mat-checkbox>\n            </div>\n            <div>\n                <div #testCaseTree class=\"testCaseTree\" [style.display]=\"treeDisplay\"></div>\n                <div class=\"test-case-details\" [hidden]=\"importType === IMPORT_TYPES.UUID_TYPE || testcaseDetails.length == 0\">\n                    <h4>{{actionTitle}}</h4>\n                    <h6>{{actionType}}</h6>\n                    <div *ngFor=\"let childAction of testcaseDetails\" class=\"action-detail\">\n                        <ul class=\"details-list\">\n                            <li><b>Type: </b>{{childAction.actionType}}</li>\n                            <li>{{childAction.name}}</li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class=\"bottom-buttons\">\n                <button mat-raised-button (click)=\"cancel()\">Cancel</button>\n                <button mat-raised-button (click)=\"import()\">Import</button>\n            </div>\n        </mat-radio-group>\n</div>\n"

/***/ }),

/***/ "./src/app/test-case-list-editor/test-case-list.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.action-list-tree {\n  height: 100%;\n}\n\n.test-case-header {\n  background-color: #f5f5f5;\n  margin: 0px;\n}\n\n.test-case-title {\n  font-size: 18px;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  padding-left: 15px;\n  padding-bottom: 5px;\n}\n\n.workspaceButton {\n  float: right;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  margin-top: 8px;\n  margin-right: 5px;\n}\n"

/***/ }),

/***/ "./src/app/test-case-list-editor/test-case-list.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"save-main-div\" fxFlexFill fxLayout='column'>\n    <div class=\"test-case-header\">\n        <h3 class=\"test-case-title\">Saved Test Cases</h3>\n        <button mat-raised-button class=\"workspaceButton\" (click)=\"createFolder('#', 'New Workspace')\">New Workspace</button>\n    </div>\n    <!-- fxFlex = <growth rate of element> <shrink rate> <default size>-->\n    <!-- https://github.com/angular/flex-layout/wiki/fxFlex-API -->\n    <div class='action-list-tree' fxFlex=\"2 1 inherit\">\n        <div #actionTree></div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/test-case-list-editor/test-case-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestCaseList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__ = __webpack_require__("./node_modules/angular2-uuid/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_file_saver__ = __webpack_require__("./node_modules/file-saver/FileSaver.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_index__ = __webpack_require__("./src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_testcase_manager_testcase_manager_service__ = __webpack_require__("./src/app/_services/testcase-manager/testcase-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_messageTypes__ = __webpack_require__("./src/app/constants/messageTypes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__history_dialog_history_dialog_component__ = __webpack_require__("./src/app/history-dialog/history-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__replay_details_dialog_replay_details_dialog_component__ = __webpack_require__("./src/app/replay-details-dialog/replay-details-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__test_case_list_editor_action_edit_dialog_component__ = __webpack_require__("./src/app/test-case-list-editor/action-edit-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__test_case_list_editor_import_dialog_import_dialog_component__ = __webpack_require__("./src/app/test-case-list-editor/import-dialog/import-dialog.component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};













var TestCaseList = /** @class */ (function () {
    function TestCaseList(messageService, tcmService, dialog, snackBar, backendManagerService) {
        var _this = this;
        this.messageService = messageService;
        this.tcmService = tcmService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.backendManagerService = backendManagerService;
        this.menuItems = {
            'open': {
                'action': this.openLoadAction.bind(this),
                'label': 'Open',
                'icon': 'fa fa-share-alt-square'
            },
            'add': {
                'action': this.addAction.bind(this),
                'label': 'Add',
                'icon': 'fa fa-plug'
            },
            'newFolder': {
                'action': this.newFolderAction.bind(this),
                'label': 'New Folder',
                'icon': 'fa fa-folder-open-o'
            },
            'play': {
                'action': this.playAll.bind(this),
                'label': 'Play',
                'icon': 'fa fa-play'
            },
            'edit': {
                'action': this.editAction.bind(this),
                'label': 'Edit',
                'icon': 'fa fa-pencil-square-o'
            },
            'delete': {
                'action': this.deleteAction.bind(this),
                'label': 'Delete',
                'icon': 'fa fa-trash'
            },
            'import': {
                'action': this.importAction.bind(this),
                'label': 'Import',
                'icon': 'fa fa-envelope-open'
            },
            'rename': {
                'action': this.renameAction.bind(this),
                'label': 'Rename',
                'icon': 'fa fa-tag'
            },
            'copyTo': {
                'action': this.copyTo.bind(this),
                'label': 'CopyTo',
                'icon': 'fa fa-files-o'
            },
            'moveTo': {
                'action': this.moveTo.bind(this),
                'label': 'MoveTo',
                'icon': 'fa fa-paper-plane-o'
            },
            'export': {
                'action': this.exportAction.bind(this),
                'label': 'Export',
                'icon': 'fa fa-cloud-download'
            },
            'exportAll': {
                'action': this.exportAll.bind(this),
                'label': 'Export All',
                'icon': 'fa fa-cloud-download'
            },
        };
        this.SNACKBAR_DURATION_MS = 2000;
        this.subscription =
            this.messageService.getMessage(__WEBPACK_IMPORTED_MODULE_7__constants_messageTypes__["a" /* MESSAGE_TYPES */].refreshWorkflow)
                .subscribe(function (message) {
                _this.message = message;
                console.log('from action list', message);
            });
    }
    TestCaseList.prototype.ngOnInit = function () {
        var _this = this;
        this.setupDataTree();
        this.tcmService.getTestCasesList().subscribe(function (data) {
            if (data['uuid']) {
                _this.tcmService.treeUUID = data['uuid'];
            }
            if (data['treeDetails']) {
                var tmpTree = JSON.parse(data['treeDetails']);
                var treeData = _this.tcmService.convertToJsTreeFormat(tmpTree);
                _this.updateDataTree(treeData);
            }
            else {
                var tree = _this.tcmService.getTestCasesEmptyTree();
                var treeData = _this.tcmService.convertToJsTreeFormat(tree);
                _this.updateDataTree(treeData);
            }
            _this.tcmService.setTreeComponent(_this.xmlDataTree);
        });
    };
    TestCaseList.prototype.setupDataTree = function () {
        var jsTreeObj = $(this.actionTree.nativeElement);
        this.xmlDataTree = jsTreeObj.jstree({
            'core': {
                // this allows modification to tree, such as rename, move, etc
                'check_callback': this.isValidDrop,
                'data': {}
            },
            'plugins': ['contextmenu', 'wholerow', 'dnd'],
            'contextmenu': { items: this.menuItems },
        });
        this.buildSelectEvent();
        this.buildCreateNodeEvent();
        this.buildDeleteNodeEvent();
        this.buildRefreshEvent();
        this.buildMoveEvent();
    };
    TestCaseList.prototype.updateDataTree = function (treeData) {
        this.xmlDataTree.jstree(true).settings.core.data = treeData;
        this.xmlDataTree.jstree(true).refresh();
    };
    TestCaseList.prototype.isValidDrop = function (op, nodeDragged, parentNode, currentPosition, additionalInformation) {
        if (op === 'move_node' && additionalInformation &&
            additionalInformation.dnd &&
            !additionalInformation.ref['original']['isFolder']) {
            return false;
        }
        return true;
    };
    TestCaseList.prototype.buildSelectEvent = function () {
        this.xmlDataTree.on('select_node.jstree', function (e, action) {
            var _this = this;
            var nodeSelected = action.node;
            if (!nodeSelected.original.isFolder &&
                action.event.type !== 'contextmenu') {
                var uuid = this.getUUID(nodeSelected);
                this.backendManagerService.loadWorkflow(uuid).subscribe(function (data) {
                    _this.sendMessage();
                });
                this.tcmService.setCurrentWorkflowName(nodeSelected.text);
            }
        }.bind(this));
    };
    TestCaseList.prototype.buildCreateNodeEvent = function () {
        this.xmlDataTree.on('create_node.jstree', function (e, nodeCreated) {
            if (nodeCreated.node) {
                this.saveTree();
            }
        }.bind(this));
    };
    TestCaseList.prototype.buildDeleteNodeEvent = function () {
        this.xmlDataTree.on('delete_node.jstree', function (e, nodeDeleted) {
            if (nodeDeleted) {
                this.saveTree();
            }
        }.bind(this));
    };
    TestCaseList.prototype.buildRefreshEvent = function () {
        this.xmlDataTree.on('refresh.jstree', function () {
            this.saveTree();
        }.bind(this));
    };
    TestCaseList.prototype.buildMoveEvent = function () {
        this.xmlDataTree.on('move_node.jstree', function () {
            this.saveTree();
        }.bind(this));
    };
    TestCaseList.prototype.saveTree = function () {
        this.tcmService.saveJstreeModel();
    };
    TestCaseList.prototype.getCurrentNode = function (nodeRef) {
        var nodes = this.xmlDataTree.jstree(true).get_selected(nodeRef);
        if (nodes.length > 0) {
            return nodes[0];
        }
        return null;
    };
    TestCaseList.prototype.getUUID = function (currentNode) {
        var uuid = currentNode.id;
        // if it has additional data that means that it is an action,
        // rather than just a folder, so it's additional data
        // is the uuid needed to retrieve those actions
        // from the database
        if (currentNode['original']['additionalData'] &&
            currentNode['original']['additionalData'].length > 0) {
            uuid = currentNode['original']['additionalData'][0];
        }
        return uuid;
    };
    TestCaseList.prototype.getAllChildrenTestList = function (node, actionIds, nodeNames) {
        if (this.xmlDataTree.jstree(true).is_leaf(node)) {
            actionIds.push(this.getUUID(node));
            nodeNames.push(node.text);
        }
        else if (node.children) {
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var nodeID = _a[_i];
                var child = this.xmlDataTree.jstree('get_node', nodeID);
                this.getAllChildrenTestList(child, actionIds, nodeNames);
            }
        }
    };
    TestCaseList.prototype.openLoadAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        if (!currentNode || currentNode.original.isFolder) {
            var msg = 'Open operation cannot be performed on a folder!';
            this.snackBar.open(msg, 'OK', { duration: this.SNACKBAR_DURATION_MS });
            return;
        }
        var uuid = this.getUUID(currentNode);
        this.backendManagerService.loadWorkflow(uuid).subscribe(function (data) {
            _this.sendMessage();
        });
        this.tcmService.setCurrentWorkflowName(currentNode.text);
    };
    TestCaseList.prototype.addAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        if (!currentNode || currentNode.original.isFolder) {
            var msg = 'Add operation cannot be performed on a folder!';
            this.snackBar.open(msg, 'OK', { duration: this.SNACKBAR_DURATION_MS });
            return;
        }
        var uuid = this.getUUID(currentNode);
        this.backendManagerService.addActionByUuid(uuid).subscribe(function (data) {
            _this.sendMessage();
            console.log(data);
        });
    };
    TestCaseList.prototype.createFolder = function (parentId, name) {
        var newNode = this.tcmService.createFolder(name, __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__["UUID"].UUID());
        var node = this.xmlDataTree.jstree('create_node', parentId, newNode);
        this.xmlDataTree.jstree('edit', node, null, function (nodeCreated, status) {
            if (status) {
                nodeCreated.original['text'] = nodeCreated['text'];
                nodeCreated.original['id'] = nodeCreated.id;
                this.saveTree();
            }
        }.bind(this));
    };
    TestCaseList.prototype.newFolderAction = function (nodeRef) {
        var currentNode = this.getCurrentNode(nodeRef);
        if (!currentNode || !currentNode.original.isFolder) {
            var msg = 'New Folder operation can only be performed on a folder!';
            this.snackBar.open(msg, 'OK', { duration: this.SNACKBAR_DURATION_MS });
            return;
        }
        this.createFolder(currentNode.id, 'New Folder');
    };
    TestCaseList.prototype.playAll = function (nodeRef) {
        var _this = this;
        var node = this.getCurrentNode(nodeRef);
        var actionIds = [];
        this.getAllChildrenTestList(node, actionIds, []);
        if (actionIds.length == 1) {
            this.openLoadAction(nodeRef);
            this.backendManagerService.playAction(actionIds[0]).subscribe(function (data) {
                _this.dialog.open(__WEBPACK_IMPORTED_MODULE_9__replay_details_dialog_replay_details_dialog_component__["a" /* ReplayDetailsComponent */], { data: data, width: '900px' });
            });
        }
        else {
            this.backendManagerService.playAll(actionIds).subscribe(function (data) {
                _this.dialog.open(__WEBPACK_IMPORTED_MODULE_8__history_dialog_history_dialog_component__["a" /* HistoryDialogComponent */], { width: '800px', data: data });
            });
        }
    };
    TestCaseList.prototype.editAction = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        if (!currentNode || currentNode.original.isFolder) {
            var msg = 'Edit operation cannot be performed on a folder!';
            this.snackBar.open(msg, 'OK', { duration: this.SNACKBAR_DURATION_MS });
            return;
        }
        var uuid = this.getUUID(currentNode);
        var data = { 'uuid': uuid, 'isNewAction': false };
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_10__test_case_list_editor_action_edit_dialog_component__["a" /* ActionEditDialog */], { width: '800px', data: data });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                if (data['deleted']) {
                    _this.xmlDataTree.jstree('delete_node', _this.getCurrentNode(nodeRef));
                }
                else if (currentNode['text'] !== data['name']) {
                    currentNode['original']['text'] = data['name'];
                    _this.xmlDataTree.jstree('rename_node', currentNode, data['name']);
                    _this.saveTree();
                }
            }
        });
    };
    TestCaseList.prototype.deleteAction = function (nodeRef) {
        if (confirm('Are you sure you wish to delete this?')) {
            this.xmlDataTree.jstree('delete_node', this.getCurrentNode(nodeRef));
        }
    };
    TestCaseList.prototype.importAction = function (nodeRef) {
        var currentNode = this.getCurrentNode(nodeRef);
        if (!currentNode || !currentNode.original.isFolder) {
            var msg = 'Import operation can only be performed on a folder!';
            this.snackBar.open(msg, 'OK', { duration: this.SNACKBAR_DURATION_MS });
            return;
        }
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_11__test_case_list_editor_import_dialog_import_dialog_component__["a" /* ImportDialog */], { width: '800px', height: '600px' });
        dialogRef.afterClosed().subscribe(function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var treeData, parentFolder, msg;
                return __generator(this, function (_a) {
                    if (data) {
                        treeData = this.xmlDataTree.jstree(true).settings.core.data;
                        if (data['uuid'] && data['uuid'] !== '') {
                            parentFolder = this.findExistingTestCaseFolder(data['uuid'], treeData);
                            if (parentFolder === '') {
                                this.addNodeByNodeId(data['uuid'], currentNode);
                            }
                            else {
                                msg = 'Test Case Already Exists in ' + parentFolder;
                                this.snackBar.open(msg, 'OK', { duration: this.SNACKBAR_DURATION_MS });
                            }
                        }
                        else if (data['nodeArray']) {
                            this.addTestCaseToNode(currentNode.id, treeData, data['nodeArray']);
                            this.xmlDataTree.jstree(true).refresh();
                        }
                    }
                    return [2 /*return*/];
                });
            });
        }.bind(this));
    };
    TestCaseList.prototype.addTestCaseToNode = function (nodeId, treeData, nodeArray) {
        if (treeData.id != nodeId && treeData.children &&
            treeData.children.length > 0) {
            for (var _i = 0, _a = treeData.children; _i < _a.length; _i++) {
                var child = _a[_i];
                this.addTestCaseToNode(nodeId, child, nodeArray);
            }
        }
        else if (treeData.id == nodeId) {
            for (var key in nodeArray) {
                treeData.children.push(nodeArray[key]);
            }
        }
    };
    TestCaseList.prototype.findExistingTestCaseFolder = function (treeNodeData, uuid) {
        if (!treeNodeData.isFolder && treeNodeData.additionalData &&
            treeNodeData.additionalData[0] == uuid) {
            var node = this.xmlDataTree.jstree('get_node', treeNodeData.id);
            var parent_1 = this.xmlDataTree.jstree('get_node', node.parent);
            return parent_1.text;
        }
        if (treeNodeData.children && treeNodeData.children.length > 0) {
            for (var _i = 0, _a = treeNodeData.children; _i < _a.length; _i++) {
                var childNode = _a[_i];
                var folder = this.findExistingTestCaseFolder(childNode, uuid);
                if (folder !== '') {
                    return folder;
                }
            }
        }
        return '';
    };
    TestCaseList.prototype.addNodeByNodeId = function (uuid, node) {
        var _this = this;
        this.backendManagerService.getActionDetails(uuid).subscribe(function (data) {
            _this.createNewNode(uuid, node, data['name']);
        });
    };
    TestCaseList.prototype.createNewNode = function (uuid, parentNode, name) {
        var newNode = {
            'icon': 'fa fa-file-code-o',
            'text': name,
            'id': __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__["UUID"].UUID(),
            'state': { 'opened': true },
            'isFolder': false,
            'additionalData': [uuid],
            'children': []
        };
        this.xmlDataTree.jstree('create_node', parentNode.id, newNode);
    };
    TestCaseList.prototype.renameAction = function (nodeRef) {
        var currentNode = this.getCurrentNode(nodeRef);
        if (!currentNode) {
            return;
        }
        var uuid = this.getUUID(currentNode);
        this.xmlDataTree.jstree('edit', currentNode, null, function (node, status) {
            var _this = this;
            if (status && node) {
                if (!currentNode['original'].isFolder) {
                    this.backendManagerService.getActionDetails(uuid).subscribe(function (metadata) {
                        metadata['name'] = node['text'];
                        // need to subscribe otherwise it won't actually change data
                        _this.backendManagerService.updateActionMetadata(metadata)
                            .subscribe(function (info) { return console.log('meta', info); });
                    });
                }
                node.original['text'] = node['text'];
                this.saveTree();
            }
        }.bind(this));
    };
    TestCaseList.prototype.copyTo = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        if (!currentNode || currentNode.original.isFolder) {
            var msg = 'CopyTo operation cannot be performed on a folder!';
            this.snackBar.open(msg, 'OK', { duration: this.SNACKBAR_DURATION_MS });
            return;
        }
        var uuid = this.getUUID(currentNode);
        this.backendManagerService.copyAction(uuid).subscribe(function (data) {
            var dialogRef = _this.dialog.open(__WEBPACK_IMPORTED_MODULE_10__test_case_list_editor_action_edit_dialog_component__["a" /* ActionEditDialog */], {
                width: '800px',
                data: {
                    'uuid': data['actionId'],
                    'isCopyAction': true,
                    'saveWorkflow': true
                }
            });
            console.log(data);
            dialogRef.afterClosed().subscribe(function (data) {
                if (data) {
                    _this.xmlDataTree.jstree('copy_node', currentNode, data['parentId'], 'last', function (node, parent, position) {
                        var originalCopy = Object.assign({}, currentNode['original']);
                        node['original'] = originalCopy;
                        // when copied new id is generated for this node to avoid issues
                        node['original']['id'] = node['id'];
                        // need to make additonal data a copy instead of reference
                        // so that it does not change original node's value
                        node['original']['additionalData'] = Object.assign([], currentNode['original']['additionalData']);
                        node['original']['additionalData'][0] = data['actionId'];
                        var newName = data['name'];
                        if (node['text'] === data['name']) {
                            newName += '(Copy)';
                            data['metadata']['name'] = newName;
                        }
                        // updates name on database
                        this.backendManagerService
                            .updateActionMetadata(data['metadata'])
                            .subscribe(console.log);
                        node['original']['text'] = newName;
                        this.xmlDataTree.jstree('rename_node', node, newName);
                        this.saveTree();
                    }.bind(_this));
                }
            });
        });
    };
    TestCaseList.prototype.moveTo = function (nodeRef) {
        var _this = this;
        var currentNode = this.getCurrentNode(nodeRef);
        if (!currentNode || currentNode.original.isFolder) {
            var msg = 'MoveTo operation cannot be performed on a folder!';
            this.snackBar.open(msg, 'OK', { duration: this.SNACKBAR_DURATION_MS });
            return;
        }
        var uuid = this.getUUID(currentNode);
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_10__test_case_list_editor_action_edit_dialog_component__["a" /* ActionEditDialog */], {
            width: '800px',
            data: { 'uuid': uuid, 'isMoveAction': true, 'saveWorkflow': true }
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                _this.xmlDataTree.jstree('move_node', currentNode, data['parentId'], 'last', function (node, parent, position) {
                    if (node['text'] !== data['name']) {
                        // updates name on database
                        this.backendManagerService
                            .updateActionMetadata(data['metadata'])
                            .subscribe(console.log);
                        node['original']['text'] = data['name'];
                        this.xmlDataTree.jstree('rename_node', node, data['name']);
                    }
                }.bind(_this));
            }
        });
    };
    TestCaseList.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    TestCaseList.prototype.export = function (uuid, fileName) {
        this.backendManagerService.exportTestCase(uuid).subscribe(function (data) {
            var byteChars = JSON.stringify(data, null, 2);
            var exportData = new Blob([byteChars + '\n'], { type: 'application/octet-stream' });
            // export name is displayName
            __WEBPACK_IMPORTED_MODULE_3_file_saver__["saveAs"](exportData, fileName);
        });
    };
    TestCaseList.prototype.exportAction = function (nodeRef) {
        var currentNode = this.getCurrentNode(nodeRef);
        if (!currentNode || currentNode.original.isFolder) {
            var msg = 'Export operation cannot be performed on a folder!';
            this.snackBar.open(msg, 'OK', { duration: this.SNACKBAR_DURATION_MS });
            return;
        }
        var fileName = currentNode.text;
        var uuid = this.getUUID(currentNode);
        this.export(uuid, fileName);
    };
    TestCaseList.prototype.exportAll = function (nodeRef) {
        return __awaiter(this, void 0, void 0, function () {
            var currentNode, actionIds, nodeNames, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentNode = this.getCurrentNode(nodeRef);
                        if (this.xmlDataTree.jstree(true).is_leaf(currentNode) || !currentNode) {
                            return [2 /*return*/];
                        }
                        actionIds = [];
                        nodeNames = [];
                        this.getAllChildrenTestList(currentNode, actionIds, nodeNames);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < actionIds.length)) return [3 /*break*/, 4];
                        this.export(actionIds[i], nodeNames[i]);
                        return [4 /*yield*/, this.sleep(5000)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TestCaseList.prototype.sendMessage = function () {
        // send message to subscribers via observable subject
        this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_7__constants_messageTypes__["a" /* MESSAGE_TYPES */].refreshWorkflow, 'testcaseSelected');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('actionTree'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], TestCaseList.prototype, "actionTree", void 0);
    TestCaseList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-test-case-list',
            template: __webpack_require__("./src/app/test-case-list-editor/test-case-list.component.html"),
            styles: [__webpack_require__("./src/app/test-case-list-editor/test-case-list.component.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_index__["a" /* MessageService */], __WEBPACK_IMPORTED_MODULE_6__services_testcase_manager_testcase_manager_service__["a" /* TCMService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["t" /* MatSnackBar */],
            __WEBPACK_IMPORTED_MODULE_4__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */]])
    ], TestCaseList);
    return TestCaseList;
}());



/***/ }),

/***/ "./src/app/tv-remote-dialog/tv-remote-dialog.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n"

/***/ }),

/***/ "./src/app/tv-remote-dialog/tv-remote-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div style=\"margin:10px;\">\n<h3 >TV Remote Control Actions:</h3>\n\n\n  <table >\n    <tr>\n      <td><button mat-raised-button (click)=\"dPadLeft()\">&lt;</button></td>\n      <td><button mat-raised-button (click)=\"dPadRight()\">&gt;</button></td>\n      <td><button mat-raised-button (click)=\"dPadUp()\">^</button></td>\n      <td><button mat-raised-button (click)=\"dPadDown()\">v</button></td>\n    </tr>\n    <tr>\n      <td><button mat-raised-button (click)=\"back()\">Back</button></td>\n      <td><button mat-raised-button (click)=\"home()\">Home</button></td>\n      <td><button mat-raised-button (click)=\"dPadCenter()\">Center</button></td>\n      <td><button mat-raised-button (click)=\"playPause()\">Play/Pause</button></td>\n    </tr>\n  </table>\n</div>\n"

/***/ }),

/***/ "./src/app/tv-remote-dialog/tv-remote-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TvRemoteDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__("./src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__adb_service__ = __webpack_require__("./src/app/adb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_keycodes__ = __webpack_require__("./src/app/constants/keycodes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__ = __webpack_require__("./src/app/constants/messageTypes.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TvRemoteDialogComponent = /** @class */ (function () {
    function TvRemoteDialogComponent(adbservice, backendManagerService, messageService) {
        this.adbservice = adbservice;
        this.backendManagerService = backendManagerService;
        this.messageService = messageService;
    }
    TvRemoteDialogComponent.prototype.ngOnInit = function () { };
    TvRemoteDialogComponent.prototype.sendMessage = function (text) {
        this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__["a" /* MESSAGE_TYPES */].refreshWorkflow, text);
    };
    /**
     * Executes and stores a specific key event in the tree.
     *
     * @param keyCodeName A key from keyCodes to abstract away the actual value
     */
    TvRemoteDialogComponent.prototype.sendKeyEvent = function (keyCode) {
        var _this = this;
        this.backendManagerService.pressKey(keyCode).subscribe(function () { return _this.sendMessage('test'); });
        this.backendManagerService.getCurrentWorkflow().subscribe(function () { return _this.sendMessage('test'); });
    };
    TvRemoteDialogComponent.prototype.dPadLeft = function () {
        console.log('Left pressed!');
        this.sendKeyEvent(__WEBPACK_IMPORTED_MODULE_4__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_DPAD_LEFT);
    };
    TvRemoteDialogComponent.prototype.dPadRight = function () {
        console.log('Right pressed!');
        this.sendKeyEvent(__WEBPACK_IMPORTED_MODULE_4__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_DPAD_RIGHT);
    };
    TvRemoteDialogComponent.prototype.dPadUp = function () {
        console.log('Up pressed!');
        this.sendKeyEvent(__WEBPACK_IMPORTED_MODULE_4__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_DPAD_UP);
    };
    TvRemoteDialogComponent.prototype.dPadDown = function () {
        console.log('Down pressed!');
        this.sendKeyEvent(__WEBPACK_IMPORTED_MODULE_4__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_DPAD_DOWN);
    };
    TvRemoteDialogComponent.prototype.back = function () {
        console.log('Back pressed!');
        this.sendKeyEvent(__WEBPACK_IMPORTED_MODULE_4__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_BACK);
    };
    TvRemoteDialogComponent.prototype.home = function () {
        console.log('Home pressed!');
        this.sendKeyEvent(__WEBPACK_IMPORTED_MODULE_4__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_HOME);
    };
    TvRemoteDialogComponent.prototype.dPadCenter = function () {
        console.log('dPadCenter pressed!');
        this.sendKeyEvent(__WEBPACK_IMPORTED_MODULE_4__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_DPAD_CENTER);
    };
    TvRemoteDialogComponent.prototype.playPause = function () {
        console.log('Play/Pause pressed!');
        this.sendKeyEvent(__WEBPACK_IMPORTED_MODULE_4__constants_keycodes__["a" /* KEY_CODES */].KEYCODE_MEDIA_PLAY_PAUSE);
    };
    TvRemoteDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tv-remote-dialog',
            template: __webpack_require__("./src/app/tv-remote-dialog/tv-remote-dialog.component.html"),
            styles: [__webpack_require__("./src/app/tv-remote-dialog/tv-remote-dialog.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__adb_service__["a" /* AdbService */],
            __WEBPACK_IMPORTED_MODULE_1__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */],
            __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* MessageService */]])
    ], TvRemoteDialogComponent);
    return TvRemoteDialogComponent;
}());



/***/ }),

/***/ "./src/app/ui-tree-viewer/copy-xml-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CopyXmlDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var CopyXmlDialog = /** @class */ (function () {
    function CopyXmlDialog(dialog, dialogRef, data) {
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        this.copied = false;
        this.data = data;
    }
    CopyXmlDialog.prototype.ngOnInit = function () { };
    CopyXmlDialog.prototype.copyXml = function () {
        var copyElement = document.createElement('textarea');
        copyElement.style.position = 'fixed';
        copyElement.style.opacity = '0';
        copyElement.textContent = this.data['xml'];
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(copyElement);
        copyElement.select();
        document.execCommand('copy');
        body.removeChild(copyElement);
        this.copied = true;
    };
    CopyXmlDialog = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'copy-xml-dialog',
            template: __webpack_require__("./src/app/ui-tree-viewer/copy-xml-dialog.html"),
            styles: [__webpack_require__("./src/app/ui-tree-viewer/copy-xml-dialog.css")],
        }),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogRef */], Object])
    ], CopyXmlDialog);
    return CopyXmlDialog;
}());



/***/ }),

/***/ "./src/app/ui-tree-viewer/copy-xml-dialog.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.xmlData {\n    margin-top: 25px;\n    padding: 5px;\n    border: 1px dashed black;\n}\n\n.copyButton {\n    position: absolute;\n    margin-top: -20px;\n}\n\n#copiedText {\n    color: rgb(11, 100, 11);\n}"

/***/ }),

/***/ "./src/app/ui-tree-viewer/copy-xml-dialog.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div fxLayout=\"column\">\n    <p *ngIf=\"copied\" id=\"copiedText\">Xml Copied!</p>\n    <button fxFlexAlign=\"end\" mat-raised-button (click)=\"copyXml()\" color=\"primary\" class=\"copyButton\">Copy</button>\n    <p class=\"xmlData\">{{data.xml}}</p>\n</div>"

/***/ }),

/***/ "./src/app/ui-tree-viewer/ui-tree-viewer.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.js-tree {\n  font-size: 2rem;\n  padding: 2rem;\n}\n\n.main-section {\n  padding: 1px;\n  background-color: white;\n}\n\n.attributeList {\n  background-color: white;\n  text-align: left;\n  float: left;\n  width: 40%;\n  overflow-y: auto;\n}\n\n.treeArea{\n  background-color: white;\n  float: left;\n  overflow-y: auto;\n}\n\n.attributeItem {\n  width: 100%;\n  padding: 0px 5px 0px 0px;\n  border: 0.5px solid grey;\n}\n\n#attributeTitle {\n  display: inline-block;\n  width: 13rem;\n  padding: 5px;\n  background-color: whitesmoke;\n  font-family: 'Roboto', sans-serif;\n  font-size: 1.5rem;\n}\n\n#attributeValue {\n  display: inline-block;\n  padding: 5px 5px 5px 5px;\n  font-family: 'Roboto', sans-serif;\n  font-size: 1.5rem;\n}\n\n.uiViewerButton {\n  display: inline-block;\n  margin: 5px;\n}\n\n.btn-container{\n  padding: 5px;\n}\n\n.searchInput {\n  padding-left: 20px;\n  width: 80%;\n}\n\n.dropdownSearch {\n  display: inline-block;\n}\n\n.float-right {\n  float: right;\n}\n\n.sideBar {\n  margin-bottom: -35px;\n}\n\n#searchBar {\n  width: 80%;\n}\n\n#attributeSelect {\n  width: 10%;\n}\n"

/***/ }),

/***/ "./src/app/ui-tree-viewer/ui-tree-viewer.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"main-section\">\n     <div class=\"top-bar\" *ngIf=\"treeTopBarState && !hideTopBar\">\n        <div class=\"btn-container\">\n                <button mat-raised-button (click)=\"toggleHighlight()\" class=\"uiViewerButton\" [style.backgroundColor]=\"toggleStateColor\">\n                        Toggle Highlight\n                </button>\n                <button mat-raised-button (click)=\"toggleInspectMode()\" class=\"uiViewerButton\" [style.backgroundColor]=\"toggleInspectColor\">\n                        Inspect Device\n                        </button>\n                <button mat-raised-button (click)=\"expandAll()\" class=\"uiViewerButton\">\n                        Expand All\n                </button>\n                <button mat-raised-button (click)=\"closeAll()\" class=\"uiViewerButton\"> \n                        Close All\n                </button>\n                <button mat-raised-button (click)=\"fetchXML()\" class=\"uiViewerButton\">\n                        Refresh XML\n                </button>\n                <button mat-raised-button (click)=\"showXml()\" class=\"uiViewerButton\"> \n                        Device XML\n                </button>\n                <button mat-raised-button (click)=\"showAttr()\" class=\"uiViewerButton float-right\" [style.backgroundColor]=\"toggleAttributeColor\">\n                        Toggle Attributes\n                </button>\n        </div>\n        <div class=\"searchInput\">\n                <mat-form-field id=\"searchBar\">\n                        <input [(ngModel)]=\"searchText\" (keyup.enter)=\"searchTree()\" matInput placeholder=\"Press enter to Search\">\n                </mat-form-field>\n                <mat-form-field id=\"attributeSelect\">\n                        <mat-select [(value)]=\"selectedSearchAttr\">\n                                <mat-option *ngFor=\"let attr of searchAttributes\" value=\"{{attr}}\">\n                                        {{ attr }}\n                                </mat-option>\n                        </mat-select>\n                </mat-form-field>\n        </div>\n    </div>\n    <!-- Display when slider height is too small -->\n    <div *ngIf=\"!treeTopBarState && !hideTopBar\">\n        <mat-menu #appMenu=\"matMenu\">\n                <button mat-menu-item (click)=\"toggleHighlight()\" [style.backgroundColor]=\"toggleStateColor\">Toggle Highlight</button>\n                <button mat-menu-item (click)=\"toggleInspectMode()\" [style.backgroundColor]=\"toggleInspectColor\">Inspect Device</button>\n                <button mat-menu-item (click)=\"expandAll()\">Expand All</button>\n                <button mat-menu-item (click)=\"closeAll()\">Close All</button>\n                <button mat-menu-item (click)=\"fetchXML()\">Refresh XML</button>\n                <button mat-menu-item (click)=\"showXml()\">Device XML</button>\n        </mat-menu>\n\n        <button mat-icon-button [matMenuTriggerFor]=\"appMenu\">\n                <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\n        </button>\n        <button mat-icon-button (click)=\"showAttr()\" class=\"float-right\">\n                <i class=\"fa fa-caret-square-o-down\" aria-hidden=\"true\" [style.color]=\"toggleAttributeColor\"></i>\n        </button>\n        <div class=\"dropdownSearch\">\n                <mat-form-field class=\"searchInput\">\n                        <input [(ngModel)]=\"searchText\" (keyup.enter)=\"searchTree()\" matInput placeholder=\"Press enter to Search\">\n                </mat-form-field>\n                <mat-form-field id=\"attributeSelect\">\n                        <mat-select [(value)]=\"selectedSearchAttr\">\n                                <mat-option *ngFor=\"let attr of searchAttributes\" value=\"{{attr}}\">\n                                        {{ attr }}\n                                </mat-option>\n                        </mat-select>\n                </mat-form-field>\n        </div>\n    </div>\n    <!-- Display when slider width is too small -->\n    <div *ngIf=\"hideTopBar\" class=\"sideBar\">\n        <mat-menu #appMenu=\"matMenu\">\n                <button mat-menu-item (click)=\"toggleHighlight()\" [style.backgroundColor]=\"toggleStateColor\">Toggle Highlight</button>\n                <button mat-menu-item (click)=\"toggleInspectMode()\" [style.backgroundColor]=\"toggleInspectColor\">Inspect Device</button>\n                <button mat-menu-item (click)=\"showAttr()\" [style.backgroundColor]=\"toggleAttributeColor\">Toggle Attributes</button>\n                <button mat-menu-item (click)=\"expandAll()\">Expand All</button>\n                <button mat-menu-item (click)=\"closeAll()\">Close All</button>\n                <button mat-menu-item (click)=\"fetchXML()\">Refresh XML</button>\n                <button mat-menu-item (click)=\"showXml()\">Copy Device XML</button>\n        </mat-menu>\n\n        <button mat-icon-button [matMenuTriggerFor]=\"appMenu\">\n                <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\n        </button>\n    </div>\n    <div class=\"treeArea\" [style.width.%]=\"treeAreaWidth\">\n        <div #dataTree class=\"js-tree\" [style.height.vh]=\"splitAreaHeight\"></div>\n    </div>\n    <div class=\"attributeList\" [style.display]=\"showAttributes\" [style.height.vh]=\"splitAreaHeight\">\n        <div *ngFor=\"let attribute of attributeList\" class=\"attributeItem\">\n                <div id=\"attributeTitle\">{{ attribute.title }}</div> <div id=\"attributeValue\">{{ attribute.value }}</div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/ui-tree-viewer/ui-tree-viewer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UiTreeViewerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__ = __webpack_require__("./node_modules/angular2-uuid/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_message_service__ = __webpack_require__("./src/app/_services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__ = __webpack_require__("./src/app/constants/messageTypes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__device_service__ = __webpack_require__("./src/app/device.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__copy_xml_dialog_component__ = __webpack_require__("./src/app/ui-tree-viewer/copy-xml-dialog.component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var UiTreeViewerComponent = /** @class */ (function () {
    function UiTreeViewerComponent(dialog, snackBar, deviceService, backendManagerService, messageService) {
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.deviceService = deviceService;
        this.backendManagerService = backendManagerService;
        this.messageService = messageService;
        this.DISPLAY_ON = 'block';
        this.DISPLAY_OFF = 'none';
        this.showAttributes = this.DISPLAY_ON;
        this.treeAreaWidth = 100;
        this.boundsArray = [];
        this.searchAttributes = ['All'];
        this.iconClasses = {};
        this.searchText = '';
        this.canHighlight = true;
        this.inInspect = false;
        this.searchNodeFound = false;
        this.selectedSearchAttr = 'All';
        this.activatedColor = 'deepskyblue';
        this.deactivatedColor = 'lightgrey';
        this.toggleStateColor = this.activatedColor;
        this.toggleInspectColor = this.deactivatedColor;
        this.toggleAttributeColor = this.activatedColor;
        this.SNACKBAR_DURATION_MS = 2000;
    }
    UiTreeViewerComponent.prototype.ngOnInit = function () { };
    UiTreeViewerComponent.prototype.getDeviceRatios = function () {
        var _this = this;
        this.backendManagerService.getDeviceRatios().subscribe(function (ratios) {
            _this.deviceRatios = ratios;
        }, function (error) {
            console.log('Error, could not connect to device:', error);
        });
    };
    UiTreeViewerComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // icon classes from font awesome
        this.iconClasses = {
            'hierarchy': 'fa fa-sitemap',
            'FrameLayout': 'fa fa-object-group',
            'ViewGroup': 'fa fa-users',
            'TextView': 'fa fa-file-text',
            'LinearLayout': 'fa fa-bars',
            'RelativeLayout': 'fa fa-object-ungroup',
            'GridLayout': 'fa fa-th',
            'View': 'fa fa-window-maximize',
            'ImageView': 'fa fa-picture-o',
            'default': 'fa fa-folder'
        };
        this.setupDataTree();
        // fetch xml whenever a device is connected
        this.deviceService.currentDeviceInfo.subscribe(function (device) {
            if (device['deviceId']) {
                _this.fetchXML();
            }
        });
        this.messageService.getMessage(__WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__["a" /* MESSAGE_TYPES */].inspectClickedNode)
            .subscribe(function (coordinates) {
            if (coordinates) {
                // find best node at that position
                var possibleNodes = _this.findAllNodesContainsPoint(coordinates);
                var xmlNode = _this.getSmallestBoundArea(possibleNodes);
                if (xmlNode != null) {
                    _this.xmlDataTree.jstree('deselect_all');
                    _this.focusNode(xmlNode['id']);
                }
            }
        });
        // Refresh xml tree when a new action enters workflow and ui viewer tab is
        // selected
        this.messageService.getMessage(__WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__["a" /* MESSAGE_TYPES */].refreshXml)
            .subscribe(function () {
            if (_this.inUiViewerTab) {
                // need to give the screen time to load,
                // otherwise it will just grab the same xml
                setTimeout(function () {
                    this.fetchXML();
                }.bind(_this), 1000);
            }
        });
    };
    UiTreeViewerComponent.prototype.getSmallestBoundArea = function (possibleNodes) {
        if (possibleNodes.length > 0) {
            var smallestNode = possibleNodes[0];
            for (var index = 1; index < possibleNodes.length; index++) {
                smallestNode = this.getSmallerArea(smallestNode, possibleNodes[index]);
            }
            return smallestNode;
        }
        return null;
    };
    UiTreeViewerComponent.prototype.getSmallerArea = function (firstNode, secondNode) {
        // endX - startX = width, endY - startY = height, width * height
        var firstNodeArea = (firstNode['bounds']['endX'] - firstNode['bounds']['startX']) *
            (firstNode['bounds']['endY'] - firstNode['bounds']['startY']);
        var secondNodeArea = (secondNode['bounds']['endX'] - secondNode['bounds']['startX']) *
            (secondNode['bounds']['endY'] - secondNode['bounds']['startY']);
        if (secondNodeArea < firstNodeArea) {
            return secondNode;
        }
        return firstNode;
    };
    UiTreeViewerComponent.prototype.findAllNodesContainsPoint = function (currentPosition) {
        var possibleNodes = [];
        for (var _i = 0, _a = this.boundsArray; _i < _a.length; _i++) {
            var bound = _a[_i];
            var withinBounds = this.isWithinBounds(currentPosition, bound['bounds']);
            if (withinBounds) {
                possibleNodes.push(bound);
            }
        }
        return possibleNodes;
    };
    UiTreeViewerComponent.prototype.isWithinBounds = function (currentPosition, deviceBounds) {
        // if x,y are between the bounds
        // i.e -> startX < offsetX < endX & startY < offSetY < endY
        if (currentPosition != undefined && deviceBounds != undefined) {
            if ((deviceBounds.startX < currentPosition.offsetX &&
                currentPosition.offsetX < deviceBounds.endX) &&
                (deviceBounds.startY < currentPosition.offsetY &&
                    currentPosition.offsetY < deviceBounds.endY)) {
                return true;
            }
        }
        return false;
    };
    UiTreeViewerComponent.prototype.getIconName = function (name) {
        if (name in this.iconClasses) {
            return this.iconClasses[name];
        }
        return this.iconClasses['default'];
    };
    /*
    XMLTreeObject = {
      'text': class name, --if it doesn't have class name, use tagName, text that
    will be displayed in tree
      'identifier': used to find and highlight this node during Inspect mode,
      'icon': class of icon as string or '/filepath' of
    image, 'attributes': list of attributes like bounds, checkable, etc,
      'children': childNodes
    }
    */
    UiTreeViewerComponent.prototype.createXMLTreeObject = function (xmlElement) {
        var treeAttributes = [];
        for (var attr in xmlElement.attributes) {
            if (!isNaN(parseInt(attr))) {
                var attrName = xmlElement.attributes[attr]['name'];
                // Capitalize first letter of attribute
                attrName = attrName.charAt(0).toUpperCase() + attrName.slice(1);
                var attrValue = xmlElement.attributes[attr]['value'];
                var treeAttr = { 'title': attrName, 'value': attrValue };
                treeAttributes.push(treeAttr);
                // Add to list of possible search values if it has not been added yet
                if (this.searchAttributes.indexOf(attrName) < 0) {
                    this.searchAttributes.push(attrName);
                }
            }
        }
        // get relevant data from element and it's children
        var objName = xmlElement.className;
        var identifier = __WEBPACK_IMPORTED_MODULE_2_angular2_uuid__["UUID"].UUID();
        // add elements to boundsArray
        var bounds = this.convertBounds(xmlElement.getAttribute('bounds'));
        this.boundsArray.push({ 'id': identifier, 'bounds': bounds });
        if (objName == '') {
            objName = xmlElement.tagName;
        }
        objName = objName.replace(/.+\..+\./, '');
        var iconName = this.getIconName(objName);
        var nodeObj = this.createNodeObj(objName, identifier, iconName, treeAttributes);
        for (var _i = 0, _a = xmlElement.childNodes; _i < _a.length; _i++) {
            var childNode = _a[_i];
            var childNodeObj = this.createXMLTreeObject(childNode);
            nodeObj.children.push(childNodeObj);
        }
        return nodeObj;
    };
    UiTreeViewerComponent.prototype.createNodeObj = function (objName, identifier, iconName, treeAttributes) {
        return {
            'text': objName,
            'id': identifier,
            'icon': iconName,
            'attributes': treeAttributes,
            'children': []
        };
    };
    UiTreeViewerComponent.prototype.fetchXML = function () {
        var _this = this;
        // Must get device ratios before fetching everytime
        // because there are situations where the fetchXML function is called
        // before the ratios can be gathered
        this.getDeviceRatios();
        this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__["a" /* MESSAGE_TYPES */].clearCanvas, 'both');
        // clear bounds array
        this.boundsArray = [];
        this.searchAttributes = ['All'];
        this.backendManagerService.fetchXML().subscribe(function (deviceXmlList) {
            var XMLTreeObj = [];
            _this.deviceXml = deviceXmlList;
            for (var _i = 0, _a = deviceXmlList; _i < _a.length; _i++) {
                var xmlData = _a[_i];
                var domObj = (new DOMParser()).parseFromString(xmlData, 'text/xml');
                // this will contain all the xml for the device in a typscript
                // object format
                var hierarchyNodeObj = domObj.getElementsByTagName('hierarchy');
                // need to turn the node object into JSON in order to use in js tree
                if (hierarchyNodeObj.length > 0) {
                    var treeObj = _this.createXMLTreeObject(hierarchyNodeObj[0]);
                    XMLTreeObj.push(treeObj);
                }
            }
            _this.updateDataTree(XMLTreeObj);
        }, function (error) {
            console.log('Error, could not connect to device:', error);
        });
    };
    UiTreeViewerComponent.prototype.setupDataTree = function () {
        var jsTreeObj = $(this.dataTree.nativeElement);
        this.xmlDataTree = jsTreeObj.jstree({
            'core': { 'data': {} },
            'search': {
                'case_insensitive': true,
                'search_callback': this.searchXmlTree.bind(this)
            },
            plugins: ['search', 'wholerow']
        });
        this.buildSelectEvent();
        this.buildHoverEvent();
        this.buildDehoverEvent();
        this.buildSearchCompleteEvent();
    };
    UiTreeViewerComponent.prototype.updateDataTree = function (treeData) {
        this.xmlDataTree.jstree(true).settings.core.data = treeData;
        this.xmlDataTree.jstree(true).refresh();
    };
    UiTreeViewerComponent.prototype.buildSelectEvent = function () {
        this.xmlDataTree.on('select_node.jstree', function (e, data) {
            var attributes = data.node.original.attributes;
            if (attributes != null) {
                this.attributeList = attributes;
            }
            // alert canvas to draw rectangle around element selected
            if (this.messageService !== undefined && this.canHighlight &&
                attributes) {
                var coordinates = this.getBoundsAttribute(attributes);
                if (coordinates != '') {
                    var message = {
                        'coordinates': coordinates,
                        'deviceRatios': this.deviceRatios
                    };
                    this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__["a" /* MESSAGE_TYPES */].nodeSelected, message);
                }
            }
            // make tree area smaller to adjust for displaying attributes
            if (this.showAttributes == this.DISPLAY_ON) {
                this.treeAreaWidth = 60;
            }
        }.bind(this));
    };
    UiTreeViewerComponent.prototype.buildHoverEvent = function () {
        this.xmlDataTree.on('hover_node.jstree', function (e, data) {
            // alert canvas to draw rectangle around element selected
            if (this.messageService != undefined && this.canHighlight &&
                data.node.original.attributes) {
                var coordinates = this.getBoundsAttribute(data.node.original.attributes);
                if (coordinates != '') {
                    var message = {
                        'coordinates': coordinates,
                        'deviceRatios': this.deviceRatios
                    };
                    this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__["a" /* MESSAGE_TYPES */].nodeHovered, message);
                }
            }
        }.bind(this));
    };
    UiTreeViewerComponent.prototype.buildDehoverEvent = function () {
        this.xmlDataTree.on('dehover_node.jstree', function (e, data) {
            // clear canvas
            if (this.messageService != undefined && this.canHighlight) {
                this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__["a" /* MESSAGE_TYPES */].clearCanvas, '');
            }
        }.bind(this));
    };
    UiTreeViewerComponent.prototype.buildSearchCompleteEvent = function () {
        this.xmlDataTree.on('search.jstree', function () {
            if (!this.searchNodeFound) {
                this.snackBar.open('No matches found.', 'OK', { duration: this.SNACKBAR_DURATION_MS });
            }
            else {
                this.searchNodeFound = false;
            }
        }.bind(this));
    };
    UiTreeViewerComponent.prototype.getBoundsAttribute = function (attributes) {
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var attr = attributes_1[_i];
            if (attr['title'] === 'Bounds') {
                return attr['value'];
            }
        }
        return '';
    };
    UiTreeViewerComponent.prototype.focusNode = function (nodeID) {
        this.xmlDataTree.jstree('select_node', nodeID);
        // bring node into focus
        if (this.xmlDataTree.jstree(true).get_node(nodeID, true)) {
            this.xmlDataTree.jstree(true)
                .get_node(nodeID, true)
                .children('.jstree-anchor')
                .focus();
        }
    };
    UiTreeViewerComponent.prototype.searchXmlTree = function (text, node) {
        var attributes = node.original.attributes;
        var lowerCaseText = text.toLowerCase();
        var indices = [];
        if (this.selectedSearchAttr === 'All') {
            var allOffset = 1;
            indices =
                Array.from(Array(this.searchAttributes.length - allOffset).keys());
        }
        else {
            var classNameIndex = this.getAttrIndex(attributes, this.selectedSearchAttr);
            if (classNameIndex !== -1) {
                indices.push(classNameIndex);
            }
        }
        for (var _i = 0, indices_1 = indices; _i < indices_1.length; _i++) {
            var index = indices_1[_i];
            if (attributes[index] &&
                attributes[index]['value'].toLowerCase().includes(lowerCaseText)) {
                this.focusNode(node['id']);
                this.searchNodeFound = true;
            }
        }
    };
    UiTreeViewerComponent.prototype.getAttrIndex = function (attributes, attrName) {
        for (var index = 0; index < attributes.length; index++) {
            if (attributes[index]['title'] === attrName) {
                return index;
            }
        }
        return -1;
    };
    UiTreeViewerComponent.prototype.convertBounds = function (coordinates) {
        // comes in as [startX,startY][endX,endY] in a string
        // get actual values and convert them using the ratio
        if (coordinates != null) {
            // returns array in form of:
            //["", "startX", "startY", "", "endX", "endY", "" ]
            var coordinatesArray = coordinates.split(/[\[\],]/);
            // convert the string values to numbers
            var startX = parseFloat(coordinatesArray[1]);
            var startY = parseFloat(coordinatesArray[2]);
            var endX = parseFloat(coordinatesArray[4]);
            var endY = parseFloat(coordinatesArray[5]);
            // adjust to screen size, Might be getting the ratio incorrectly at the
            // backend
            if (this.deviceRatios) {
                startX = startX / this.deviceRatios.width;
                startY = startY / this.deviceRatios.height;
                endX = endX / this.deviceRatios.width;
                endY = endY / this.deviceRatios.height;
            }
            var actualCoordinates = { 'startX': startX, 'startY': startY, 'endX': endX, 'endY': endY };
            return actualCoordinates;
        }
        return coordinates;
    };
    UiTreeViewerComponent.prototype.toggleHighlight = function () {
        this.canHighlight = !(this.canHighlight);
        if (!this.canHighlight) {
            // clear both canvas
            this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__["a" /* MESSAGE_TYPES */].clearCanvas, 'both');
            this.toggleStateColor = this.deactivatedColor;
        }
        else {
            this.toggleStateColor = this.activatedColor;
        }
    };
    UiTreeViewerComponent.prototype.toggleInspectMode = function () {
        this.inInspect = !(this.inInspect);
        this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__["a" /* MESSAGE_TYPES */].setInspectMode, this.inInspect);
        if (this.inInspect) {
            this.toggleInspectColor = this.activatedColor;
        }
        else {
            this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_5__constants_messageTypes__["a" /* MESSAGE_TYPES */].clearCanvas, 'both');
            this.xmlDataTree.jstree('deselect_all');
            this.toggleInspectColor = this.deactivatedColor;
        }
    };
    UiTreeViewerComponent.prototype.expandAll = function () {
        this.xmlDataTree.jstree('open_all');
    };
    UiTreeViewerComponent.prototype.closeAll = function () {
        this.xmlDataTree.jstree('close_all');
    };
    UiTreeViewerComponent.prototype.showAll = function () {
        this.xmlDataTree.jstree('show_all');
    };
    UiTreeViewerComponent.prototype.hideAll = function () {
        this.xmlDataTree.jstree('hide_all');
    };
    UiTreeViewerComponent.prototype.searchTree = function () {
        this.xmlDataTree.jstree('deselect_all');
        this.xmlDataTree.jstree('search', this.searchText);
    };
    UiTreeViewerComponent.prototype.showXml = function () {
        if (!this.deviceXml) {
            this.snackBar.open('No XML Available', 'OK', { duration: this.SNACKBAR_DURATION_MS });
            return;
        }
        var xmlString = '';
        for (var _i = 0, _a = this.deviceXml; _i < _a.length; _i++) {
            var xml = _a[_i];
            xmlString += xml;
        }
        var data = { 'xml': xmlString };
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_7__copy_xml_dialog_component__["a" /* CopyXmlDialog */], { width: '800px', height: '800px', data: data });
    };
    UiTreeViewerComponent.prototype.showAttr = function () {
        if (this.showAttributes == this.DISPLAY_OFF) {
            this.showAttributes = 'block';
            this.treeAreaWidth = 60;
            this.toggleAttributeColor = this.activatedColor;
        }
        else {
            this.showAttributes = 'none';
            this.treeAreaWidth = 100;
            this.toggleAttributeColor = this.deactivatedColor;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('dataTree'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], UiTreeViewerComponent.prototype, "dataTree", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Boolean)
    ], UiTreeViewerComponent.prototype, "inUiViewerTab", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Number)
    ], UiTreeViewerComponent.prototype, "splitAreaHeight", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Boolean)
    ], UiTreeViewerComponent.prototype, "treeTopBarState", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Boolean)
    ], UiTreeViewerComponent.prototype, "hideTopBar", void 0);
    UiTreeViewerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'ui-tree-viewer',
            template: __webpack_require__("./src/app/ui-tree-viewer/ui-tree-viewer.component.html"),
            styles: [__webpack_require__("./src/app/ui-tree-viewer/ui-tree-viewer.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["t" /* MatSnackBar */],
            __WEBPACK_IMPORTED_MODULE_6__device_service__["a" /* DeviceService */],
            __WEBPACK_IMPORTED_MODULE_3__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */],
            __WEBPACK_IMPORTED_MODULE_4__services_message_service__["a" /* MessageService */]])
    ], UiTreeViewerComponent);
    return UiTreeViewerComponent;
}());



/***/ }),

/***/ "./src/app/validation-flow/validation-details-info-dialog.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.info-table {\n  width: 100%;\n  display: table;\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.info-table tr {\n  border-bottom: 1px solid rgba(0,0,0,0.12);\n}\n\n.info-table td:nth-child(2) {\n  border-left: 1px solid rgba(0,0,0,0.12);\n  max-width: 400px;\n}\n\n.info-table td:nth-child(1) {\n\n  min-width: 150px;\n}\n\n.foot-note {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}"

/***/ }),

/***/ "./src/app/validation-flow/validation-details-info-dialog.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div>\n  <h2>Validation Option Details</h2>\n\n\n  <h3>Match Node Context</h3>\n  <table class='info-table'>\n      <thead>\n        <tr>\n            <th>Type</th>\n            <th>Description</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n            <td>True</td>\n            <td>Match Context(UI hierarchy based match,\n              search the element not only by the text, but also by the element around it).\n              Useful when doing the condition click.\n            </td>\n        </tr>\n        <tr>\n            <td>False</td>\n            <td>Directly match the target text.</td>\n        </tr>\n      </tbody>\n    </table>\n    <h3>Search Range</h3>\n    <table class='info-table'>\n      <thead>\n        <tr>\n            <th>Type</th>\n            <th>Description</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n            <td>Strict</td>\n            <td>Search for text within a 100px radius on the screen (Physical device resolution).</td>\n        </tr>\n        <tr>\n            <td>Around</td>\n          <td><b>Default value</b>. Search for text within a 300px radius on the screen (Physical device resolution).</td>\n        </tr>\n        <tr>\n            <td>Full Screen</td>\n            <td>Search for text on the entire screen. Note: Only use this if the text is unique enough to only appear once on the screen.</td>\n        </tr>\n      </tbody>\n    </table>\n\n    <h3>Stop Type</h3>\n    <table class='info-table'>\n        <thead>\n          <tr>\n              <th>Type</th>\n              <th>Description</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n              <td>Stop All If False</td>\n              <td>Stop and fail the test if the validation is false.</td>\n          </tr>\n          <tr>\n              <td>Stop All If True</td>\n            <td>Stop and fail the test if the validation is true.</td>\n          </tr>\n          <tr>\n              <td>Stop Current Compound If False</td>\n              <td>Break the current compound action if the validation is false but continue test sequence.</td>\n          </tr>\n          <tr>\n              <td>Stop Current Compound If True</td>\n              <td>Break the current compound action if the validation is true but continue test sequence.</td>\n          </tr>\n        </tbody>\n      </table>\n\n    <div class=\"foot-note\" >*More details on uicd userguide</div>\n    <button mat-raised-button color=\"primary\" (click)=\"onOkClick()\">OK</button>\n</div>\n"

/***/ }),

/***/ "./src/app/validation-flow/validation-details.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n"

/***/ }),

/***/ "./src/app/validation-flow/validation-details.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<div class=\"row\">Validation Step</div>\n<mat-radio-group *ngIf=\"inputData.validationSubType!='IMAGE_MATCHING_VALIDATION_ACTION'\" class=\"example-radio-group\" [(ngModel)]=\"inputData.model.selectItem\">\n  <mat-radio-button class=\"example-radio-button\" *ngFor=\"let vItem of inputData.model.vList\" [value]=\"vItem.type\">\n      <mat-form-field class=\"example-full-width\">\n        <input class=\"radio-input\" matInput placeholder=\"{{vItem.type}}\" [(ngModel)]=\"vItem.value\">\n      </mat-form-field>\n  </mat-radio-button>\n</mat-radio-group>\n\n<div class=\"row\">Advanced</div>\n<div [hidden]=\"inputData.validationSubType!='IMAGE_MATCHING_VALIDATION_ACTION'\">\n    <canvas id=\"snapshot\" width=\"50\" height=\"50\">\n    </canvas>\n</div>\n<div *ngIf=\"inputData.validationSubType!='IMAGE_MATCHING_VALIDATION_ACTION'\">\n  <mat-checkbox placeholder=\"Is Match Node Context\" [(ngModel)]=\"inputData.model.isMatchNodeContext\">Match Node Context</mat-checkbox>\n</div>\n<div *ngIf=\"inputData.validationSubType=='IMAGE_MATCHING_VALIDATION_ACTION'||((inputData.model.selectItem=='displayText' || inputData.model.selectItem=='resourceId')&&inputData.model.isMatchNodeContext==false)\">\n  <mat-form-field *ngIf=\"inputData.validationSubType!='IMAGE_MATCHING_VALIDATION_ACTION'\">\n    <mat-select placeholder=\"Match Type\"  [(ngModel)]=\"inputData.model.matchType\">\n      <mat-option value=\"Equals\">Equals</mat-option>\n      <mat-option value=\"EqualsCaseSensitive\">Equals (Case Sensitive)</mat-option>\n      <mat-option value=\"Contains\">Contains</mat-option>\n      <mat-option value=\"RegEx\">Regular expression</mat-option>\n      <mat-option value=\"IsAnyOf\">IsAnyOf</mat-option>\n      <mat-option value=\"UserDefineMatch\">UserDefineMatch</mat-option>\n    </mat-select>\n  </mat-form-field>\n  <mat-form-field>\n    <mat-select placeholder=\"Search Range\"  [(ngModel)]=\"inputData.model.textPosition\">\n      <mat-option value=\"FullScreen\">FullScreen</mat-option>\n      <mat-option value=\"Strict\">Strict</mat-option>\n      <mat-option value=\"Around\">Around</mat-option>\n    </mat-select>\n  </mat-form-field>\n  <mat-form-field *ngIf=\"inputData.validationSubType=='IMAGE_MATCHING_VALIDATION_ACTION'\">\n    <input matInput placeholder=\"Matching Threshold (0.0-1)\" [(ngModel)]=\"inputData.model.threshold\">\n  </mat-form-field>\n</div>\n\n<div class=\"row\" *ngIf=\"inputData.model.validationSubType !== 'CONDITION_CLICK_ACTION'\">\n  <mat-form-field>\n    <mat-select placeholder=\"Stop Type\" [(ngModel)]=\"inputData.model.selectedStopType\">\n      <mat-option *ngFor=\"let sType of stopTypes\" [value]=\"sType.name\">{{ sType.display }}</mat-option>\n    </mat-select>\n  </mat-form-field>\n  <button mat-mini-fab color=\"primary\" (click)=\"openValidationDetailsInfoDlg()\" matTooltip=\"Show Info\"\n  matTooltipPosition=\"right\" matTooltipShowDelay=\"500\">\n    <i class=\"fa fa-info\"></i>\n  </button>\n</div>\n<div class=\"row\" *ngIf=\"inputData.model.validationSubType === 'CONDITION_CLICK_ACTION'\">\n  <b>Note: Validation failure for Conditional Click does not fail the test, it only bypasses the click operation.</b>\n</div>\n\n<div class=\"row\" *ngIf=\"inputData.model.validationSubType === 'LOOP_SCREEN_CONTENT_VALIDATION_ACTION'\">Timeout (in seconds):\n  <mat-form-field>\n    <textarea rows=\"1\" cols=\"10\" matInput [(ngModel)]=\"inputData.model.timeout\"></textarea>\n  </mat-form-field>\n  <mat-form-field>\n    <mat-select placeholder=\"Wait Until\"  [(ngModel)]=\"inputData.model.waitUntil\">\n      <mat-option value=\"WaitUntilAppear\">Wait Until Appear</mat-option>\n      <mat-option value=\"WaitUntilDisappear\">Wait Until Disappear</mat-option>\n    </mat-select>\n  </mat-form-field>\n</div>"

/***/ }),

/***/ "./src/app/validation-flow/validation-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationDetailsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ValidationDetailsInfoDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_index__ = __webpack_require__("./src/app/_services/index.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ValidationDetailsComponent = /** @class */ (function () {
    function ValidationDetailsComponent(backendManagerService, messageService, dialog) {
        this.backendManagerService = backendManagerService;
        this.messageService = messageService;
        this.dialog = dialog;
        this.stopTypes = [
            { name: 'StopTestIfFalse', display: 'Stop All If False' },
            { name: 'StopTestIfTrue', display: 'Stop All If True' },
            {
                name: 'StopCurrentCompoundIfFalse',
                display: 'Stop Current Compound If False'
            },
            {
                name: 'StopCurrentCompoundIfTrue',
                display: 'Stop Current Compound If True'
            },
        ];
    }
    ValidationDetailsComponent.prototype.setModelDefaultValue = function () {
        this.inputData['model'] = this.convertValidationDlgData(this.inputData);
        if (this.inputData['model']['vList'] == null) {
            return;
        }
        var defaultSelector = '';
        for (var i = 0; i < this.inputData['model']['vList'].length; i++) {
            if (i === 0 ||
                this.inputData['model']['vList'][i].type === 'displayText') {
                defaultSelector = this.inputData['model']['vList'][i].type;
            }
        }
        this.inputData['model']['selectItem'] = defaultSelector;
        if (this.inputData['imageData'] != null &&
            this.inputData['validationSubType'] ===
                'IMAGE_MATCHING_VALIDATION_ACTION') {
            var canvas = document.getElementById('snapshot');
            var ctx = canvas.getContext('2d');
            var image = new Image();
            image.onload = function () {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
            };
            image.src = this.inputData['imageData'];
        }
        this.inputData['model']['timeout'] = 60;
        this.inputData['model']['waitUntil'] = 'WaitUntilAppear';
    };
    ValidationDetailsComponent.prototype.ngOnChanges = function () {
        this.setModelDefaultValue();
    };
    ValidationDetailsComponent.prototype.convertValidationDlgData = function (validationData) {
        var vList = [];
        var selectBounds = {};
        // TODO: If nothing returned from the backend, we need some error
        // meesage dialog.
        if (validationData !== null) {
            if ('resourceId' in validationData) {
                vList.push({ 'type': 'resourceId', 'value': validationData['resourceId'] });
            }
            if ('displayText' in validationData) {
                vList.push({ 'type': 'displayText', 'value': validationData['displayText'] });
            }
            if ('checked' in validationData) {
                vList.push({ 'type': 'checked', 'value': validationData['checked'] });
            }
            if (validationData.hasOwnProperty('leafNodeContext') &&
                validationData.leafNodeContext.hasOwnProperty('bounds')) {
                selectBounds = validationData.leafNodeContext.bounds;
            }
            else {
                selectBounds = validationData.bounds;
            }
            if (validationData['validationSubType'] != null) {
                this.inputData['validationSubType'] =
                    validationData['validationSubType'];
            }
            if (validationData['imageData'] != null) {
                this.inputData['imageData'] = validationData['imageData'];
            }
        }
        var model = { 'vList': vList, 'bounds': selectBounds };
        model['selectItem'] = '';
        model['isMatchNodeContext'] = false;
        model['matchType'] = 'Equals';
        if (validationData.hasOwnProperty('model') &&
            validationData.model.hasOwnProperty('textPosition')) {
            model['textPosition'] = validationData.model.textPosition;
        }
        else {
            model['textPosition'] = 'Around';
        }
        model['selectedStopType'] = 'StopTestIfFalse';
        model['threshold'] = 0.7;
        model['validationSubType'] = validationData.validationSubType;
        return model;
    };
    ValidationDetailsComponent.prototype.openValidationDetailsInfoDlg = function () {
        var dialogRef = this.dialog.open(ValidationDetailsInfoDialogComponent, {
            width: '800px',
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], ValidationDetailsComponent.prototype, "inputData", void 0);
    ValidationDetailsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-validation-details',
            template: __webpack_require__("./src/app/validation-flow/validation-details.component.html"),
            styles: [__webpack_require__("./src/app/validation-flow/validation-details.component.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */],
            __WEBPACK_IMPORTED_MODULE_3__services_index__["a" /* MessageService */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */]])
    ], ValidationDetailsComponent);
    return ValidationDetailsComponent;
}());

var ValidationDetailsInfoDialogComponent = /** @class */ (function () {
    function ValidationDetailsInfoDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ValidationDetailsInfoDialogComponent.prototype.onOkClick = function () {
        this.dialogRef.close();
    };
    ValidationDetailsInfoDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-validation-details-info-dialog',
            template: __webpack_require__("./src/app/validation-flow/validation-details-info-dialog.html"),
            styles: [__webpack_require__("./src/app/validation-flow/validation-details-info-dialog.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogRef */], Object])
    ], ValidationDetailsInfoDialogComponent);
    return ValidationDetailsInfoDialogComponent;
}());



/***/ }),

/***/ "./src/app/validation-flow/validation-flow.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.validation-flow-step{\n  margin-top: 30px;\n  margin-bottom: 30px;\n  height: 280px;\n}\n\n.validation-stepper {\n  color: #666;\n  height: 500px;\n}\n\n.step-two-form {\n  margin-left: 20px;\n}\n\n.summary-container {\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.info-text {\n  color: #3f51b5;\n}\n\n.summary-table {\n  width: 100%;\n  display: table;\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.summary-table tr {\n  border-bottom: 1px solid rgba(0,0,0,0.12);\n}\n\n.summary-table td:nth-child(2) {\n  color: #3f51b5;\n}"

/***/ }),

/***/ "./src/app/validation-flow/validation-flow.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<mat-horizontal-stepper #stepper class=\"validation-stepper\">\n  <mat-step >\n    <form>\n      <ng-template matStepLabel>Select Action Type</ng-template>\n      <div class='validation-flow-step'>\n        <div>\n          <h3>Please select action type:</h3>\n        </div>\n        <div>\n            <mat-radio-group placeholder=\"\"  [(ngModel)]=\"actionType\" name='actionType'\n                (change)=\"selectedActionTypeChanged($event.value)\">\n              <mat-radio-button value=\"ScreenContentValidation\" selected>Screen Content Validation</mat-radio-button>\n              <mat-radio-button value=\"FetchScreenContent\">Fetch Screen Content</mat-radio-button>\n              <mat-radio-button value=\"SpecialClick\">Special Click</mat-radio-button>\n            </mat-radio-group>\n        </div>\n        <div *ngIf=\"actionType==='ScreenContentValidation'\">\n          <div>\n              <h3>Please select validation subtype:</h3>\n          </div>\n          <mat-radio-group placeholder=\"\"  [(ngModel)]=\"validationSubType\"  name='validationSubType'>\n            <mat-radio-button value=\"SCREEN_CONTENT_VALIDATION_ACTION\" selected>Regular Validation</mat-radio-button>\n            <mat-radio-button value=\"LOOP_SCREEN_CONTENT_VALIDATION_ACTION\">Loop Validation</mat-radio-button>\n            <mat-radio-button value=\"SCROLL_SCREEN_CONTENT_VALIDATION_ACTION\">Validate Then Scroll</mat-radio-button>\n            <mat-radio-button value=\"CONDITION_CLICK_ACTION\">Conditional Click</mat-radio-button>\n            <mat-radio-button *ngIf=\"imageValidationOption\" value=\"IMAGE_MATCHING_VALIDATION_ACTION\">Image Matching Validation</mat-radio-button>\n          </mat-radio-group>\n        </div>\n        <div *ngIf=\"actionType==='SpecialClick'\">\n          <div>\n              <h3>Please select special click subtype:</h3>\n          </div>\n          <mat-radio-group placeholder=\"\"  [(ngModel)]=\"specialClickSubType\"  name='specialClickSubType'\n              (change)=\"selectedSpecialClickSubTypeChanged($event.value)\">\n            <mat-radio-button value=\"LongClick\" selected>Long Click</mat-radio-button>\n            <mat-radio-button value=\"DoubleClick\">Double Click</mat-radio-button>\n            <mat-radio-button value=\"ZoomIn\">Zoom In</mat-radio-button>\n            <mat-radio-button value=\"ZoomOut\">Zoom Out</mat-radio-button>\n            <mat-radio-button *ngIf=\"imageValidationOption\" value=\"ImageMatchThenClick\">Image Match then Click</mat-radio-button>\n          </mat-radio-group>\n        </div>\n        <div *ngIf=\"actionType==='ScreenContentValidation' && validationSubType==='SCROLL_SCREEN_CONTENT_VALIDATION_ACTION'\">\n            <div>\n                <h3>Please select scroll direction:</h3>\n            </div>\n            <mat-radio-group [(ngModel)]=\"scrollDirection\" name='scrollDirection'>\n              <mat-radio-button value=1>Up</mat-radio-button>\n              <mat-radio-button value=2>Down</mat-radio-button>\n              <mat-radio-button value=3>Left</mat-radio-button>\n              <mat-radio-button value=4>Right</mat-radio-button>\n            </mat-radio-group>\n          </div>\n      </div>\n      <div>\n          <button mat-raised-button color=\"primary\" (click)=\"firstPageNext(stepper)\">{{nextButtonText}}</button>\n      </div>\n    </form>\n  </mat-step>\n  <mat-step >\n    <form class=\"step-two-form\">\n      <ng-template matStepLabel>Fill Action Details</ng-template>\n      <div class = 'validation-flow-step'>\n        <div *ngIf=\"actionType==='FetchScreenContent'\">\n          <app-fetch-content-dialog [(inputData)]=\"validationDetailsData\"></app-fetch-content-dialog>\n        </div>\n        <div *ngIf=\"actionType==='ScreenContentValidation' && validationDetailsData.validationSubType\">\n          <app-validation-details [(inputData)]=\"validationDetailsData\"></app-validation-details>\n        </div>\n        <div *ngIf=\"actionType==='SpecialClick' && specialClickSubType == 'ImageMatchThenClick' && validationDetailsData.specialClickSubType\">\n          <app-special-click-dialog [(inputData)]=\"validationDetailsData\"></app-special-click-dialog>\n        </div>\n      </div>\n      <div>\n        <button mat-raised-button color=\"primary\" (click)=\"cleanData()\" matStepperPrevious>Back</button>\n        <button mat-raised-button color=\"primary\" (click)=\"addNewAction()\">Add Action</button>\n      </div>\n    </form>\n  </mat-step>\n</mat-horizontal-stepper>\n"

/***/ }),

/***/ "./src/app/validation-flow/validation-flow.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationFlowComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




/**
 * ValidationFlowComponent
 */
var ValidationFlowComponent = /** @class */ (function () {
    function ValidationFlowComponent(dialogRef, backendManagerService, snackBar, data) {
        this.dialogRef = dialogRef;
        this.backendManagerService = backendManagerService;
        this.snackBar = snackBar;
        this.data = data;
        this.LONGCLICK_DURATION_MS = 2000;
        this.SNACKBAR_DURATION_MS = 2000;
        this.LAST_STEP_INDEX = 2;
        this.validationDetailsData = {};
        this.imageValidationOption = false;
        // Default scrollDirection (Down), since backend is using int,
        // we have to provide int for backward compatibility
        this.scrollDirection = 2;
        this.nextButtonText = 'Next';
    }
    ValidationFlowComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        this.backendManagerService.getImageValidationOption().subscribe(function (response) {
            _this.imageValidationOption = response['imageValidationOption'];
        });
    };
    ValidationFlowComponent.prototype.addNewAction = function () {
        var _this = this;
        // TODO: Use some standard angular form validation to check the form.
        if (!this.checkFormContent()) {
            return;
        }
        var observable = null;
        switch (this['actionType']) {
            case 'FetchScreenContent':
                observable = this.addFetchScreenContentAction();
                break;
            case 'ScreenContentValidation':
                if (this['validationSubType'] === 'IMAGE_MATCHING_VALIDATION_ACTION') {
                    observable = this.addImageValidationAction();
                }
                else {
                    observable = this.addValidationAction();
                }
                break;
            case 'SpecialClick':
                if (this['specialClickSubType'] === 'ImageMatchThenClick') {
                    observable = this.addImageSpecialClickAction();
                }
                else {
                    observable = this.addSpecialClickAction();
                }
                break;
        }
        if (observable !== null) {
            observable.subscribe(function () {
                _this.dialogRef.close();
                _this.snackBar.open('New action added to workflow.', 'OK', { duration: _this.SNACKBAR_DURATION_MS });
            });
        }
    };
    ValidationFlowComponent.prototype.addSpecialClickAction = function () {
        var observable = null;
        if (this['specialClickSubType'] === 'LongClick') {
            observable = this.backendManagerService.longClick(Math.trunc((this.data.options.startX + this.data.options.endX) / 2), Math.trunc((this.data.options.startY + this.data.options.endY) / 2), this.LONGCLICK_DURATION_MS);
        }
        else if (this['specialClickSubType'] === 'DoubleClick') {
            observable = this.backendManagerService.doubleClick(Math.trunc((this.data.options.startX + this.data.options.endX) / 2), Math.trunc((this.data.options.startY + this.data.options.endY) / 2));
        }
        else if (this['specialClickSubType'] === 'ZoomIn') {
            observable = this.backendManagerService.zoom(this.data.options.startX, this.data.options.startY, this.data.options.endX, this.data.options.endY, true);
        }
        else if (this['specialClickSubType'] === 'ZoomOut') {
            observable = this.backendManagerService.zoom(this.data.options.startX, this.data.options.startY, this.data.options.endX, this.data.options.endY, false);
        }
        return observable;
    };
    ValidationFlowComponent.prototype.addImageSpecialClickAction = function () {
        var dataDictionary = {};
        dataDictionary['textPosition'] =
            this.getVariableFromDetailsModel('textPosition');
        dataDictionary['imageData'] =
            this.validationDetailsData['imageData'].split(',')[1];
        dataDictionary['threshold'] =
            String(this.getVariableFromDetailsModel('threshold'));
        dataDictionary['clickType'] = this.getVariableFromDetailsModel('clickType');
        var bounds = this.validationDetailsData['options'];
        if (bounds != null) {
            for (var key in bounds) {
                if (bounds.hasOwnProperty(key)) {
                    dataDictionary[key] = String(bounds[key]);
                }
            }
        }
        return this.backendManagerService.imageValidationClick(dataDictionary);
    };
    ValidationFlowComponent.prototype.addFetchScreenContentAction = function () {
        var actionData = {};
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
    };
    ValidationFlowComponent.prototype.addValidationAction = function () {
        var selectedType = this.validationDetailsData['model']['selectItem'];
        var selectedContentObj = this.validationDetailsData['model'].vList.find(function (x) { return x.type === selectedType; });
        var params = new URLSearchParams();
        var bounds = this.validationDetailsData['bounds'];
        // set x1, x2, y1, y2 in bounds to params
        if (bounds != null) {
            for (var key in bounds) {
                if (bounds.hasOwnProperty(key)) {
                    params.set(key, bounds[key]);
                }
            }
        }
        params.set('elementType', selectedContentObj.type);
        params.set('value', encodeURIComponent(selectedContentObj.value));
        params.set('isLoopValidation', ('LOOP_SCREEN_CONTENT_VALIDATION_ACTION' === this['validationSubType'])
            .toString());
        params.set('isScrollValidation', ('SCROLL_SCREEN_CONTENT_VALIDATION_ACTION' ===
            this['validationSubType'])
            .toString());
        params.set('scrollDirection', this.scrollDirection.toString());
        params.set('isConditionClick', ('CONDITION_CLICK_ACTION' === this['validationSubType']).toString());
        params.set('textMatchType', this.getVariableFromDetailsModel('matchType'));
        params.set('stopType', this.getVariableFromDetailsModel('selectedStopType'));
        params.set('contentStorageType', this.getVariableFromDetailsModel('isMatchNodeContext') ?
            'contextbased' :
            'default');
        // TODO: change textPosition to boundsSearchType to be consistent
        // with backend
        params.set('textPosition', this.getVariableFromDetailsModel('textPosition'));
        params.set('timeout', this.getVariableFromDetailsModel('timeout'));
        params.set('isWaitUntilDisappear', this.getVariableFromDetailsModel('waitUntil') === 'WaitUntilDisappear' ?
            'true' :
            'false');
        return this.backendManagerService.addValidationStep(params);
    };
    ValidationFlowComponent.prototype.addImageValidationAction = function () {
        var dataDictionary = {};
        dataDictionary['stopType'] =
            this.getVariableFromDetailsModel('selectedStopType');
        dataDictionary['textPosition'] =
            this.getVariableFromDetailsModel('textPosition');
        dataDictionary['imageData'] =
            this.validationDetailsData['imageData'].split(',')[1];
        dataDictionary['threshold'] =
            String(this.getVariableFromDetailsModel('threshold'));
        var bounds = this.validationDetailsData['options'];
        if (bounds != null) {
            for (var key in bounds) {
                if (bounds.hasOwnProperty(key)) {
                    dataDictionary[key] = String(bounds[key]);
                }
            }
        }
        return this.backendManagerService.addImageValidationStep(dataDictionary);
    };
    ValidationFlowComponent.prototype.getVariableFromDetailsModel = function (key) {
        if (this.validationDetailsData == null ||
            this.validationDetailsData['model'] == null ||
            this.validationDetailsData['model'][key] == null) {
            return '';
        }
        return this.validationDetailsData['model'][key];
    };
    ValidationFlowComponent.prototype.checkFormContent = function () {
        if (this['actionType'] === 'FetchScreenContent') {
            var globalVariableName = this.getVariableFromDetailsModel('globalVariableName').trim();
            if (globalVariableName.length === 0 ||
                !globalVariableName.startsWith('$uicd_')) {
                this.snackBar.open('Global variable name should start with "$uicd_"!', 'OK', { duration: this.SNACKBAR_DURATION_MS });
                return false;
            }
        }
        return true;
    };
    ValidationFlowComponent.prototype.firstPageNext = function (stepper) {
        this.validationDetailsData['validationSubType'] = this['validationSubType'];
        this.validationDetailsData['specialClickSubType'] =
            this['specialClickSubType'];
        if ((this['actionType'] === 'ScreenContentValidation' &&
            this['validationSubType'] != 'IMAGE_MATCHING_VALIDATION_ACTION') ||
            this['actionType'] === 'FetchScreenContent') {
            this.backendManagerService
                .getContentFromScreen(this.data.options.startX, this.data.options.startY, this.data.options.endX, this.data.options.endY)
                .subscribe(function (data) {
                this.setValidationDetailsData(data);
                stepper.next();
            }.bind(this));
        }
        else if ((this['actionType'] === 'ScreenContentValidation' &&
            this['validationSubType'] === 'IMAGE_MATCHING_VALIDATION_ACTION') ||
            (this['actionType'] === 'SpecialClick' &&
                this['specialClickSubType'] === 'ImageMatchThenClick')) {
            stepper.next();
        }
        else {
            this.addNewAction();
        }
    };
    ValidationFlowComponent.prototype.setValidationDetailsData = function (data) {
        // need create a new obj and update to validationDetailsData, so that the
        // form on the second step will get update
        var obj = {};
        // For scroll validation, set default search range to FullScreen
        if (this['validationSubType'] ===
            'SCROLL_SCREEN_CONTENT_VALIDATION_ACTION') {
            this.validationDetailsData['model']['textPosition'] = 'FullScreen';
        }
        Object.assign(obj, this.validationDetailsData, data);
        this.validationDetailsData = obj;
        this.validationDetailsData['validationSubType'] = this['validationSubType'];
    };
    ValidationFlowComponent.prototype.cleanData = function () {
        this.validationDetailsData['validationSubType'] = null;
        this.validationDetailsData['specialClickSubType'] = null;
    };
    ValidationFlowComponent.prototype.selectedActionTypeChanged = function (selectedActionType) {
        if (selectedActionType === 'SpecialClick') {
            this.selectedSpecialClickSubTypeChanged(this['specialClickSubType']);
        }
        else {
            this.nextButtonText = 'Next';
        }
    };
    ValidationFlowComponent.prototype.selectedSpecialClickSubTypeChanged = function (specialClickSubType) {
        if (specialClickSubType === 'ImageMatchThenClick') {
            this.nextButtonText = 'Next';
        }
        else {
            this.nextButtonText = 'Add Action';
        }
    };
    ValidationFlowComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-validation-flow',
            template: __webpack_require__("./src/app/validation-flow/validation-flow.component.html"),
            styles: [__webpack_require__("./src/app/validation-flow/validation-flow.component.css")]
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogRef */],
            __WEBPACK_IMPORTED_MODULE_2__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["t" /* MatSnackBar */], Object])
    ], ValidationFlowComponent);
    return ValidationFlowComponent;
}());



/***/ }),

/***/ "./src/app/workflow/workflow.component.css":
/***/ (function(module, exports) {

module.exports = "/*\n * Copyright 2019 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n.links line {\n  stroke: #999;\n  stroke-opacity: 0.6;\n}\n\n.list-group-item {\n  display: block;\n  width: 20%;\n  float: left;\n  color: white;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.control-area {\n  padding: 15px;\n}\n\n.control-area button {\n  min-width: 140px;\n  margin-bottom: 10px;\n}\n"

/***/ }),

/***/ "./src/app/workflow/workflow.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n  Copyright 2019 Google Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n-->\n<ng-template #stopIcon>\n    <i class=\"glyphicon glyphicon-stop control-button control-button-stop\" matTooltip=\"Stop\"></i>\n</ng-template>\n\n<div>\n    <div class=\"control-area\" fxLayout='row wrap'  fxLayoutGap=\"10px\">\n        <button mat-raised-button (click)=\"playCurrentWorkflow()\">\n            <div>\n                <i class=\"fa fa-play-circle\" matTooltip=\"Play\"></i>\n                {{ isReplaying ? \"Stop Playback\" : \"Play Workflow\"}}\n            </div>\n                </button>\n        <button mat-raised-button (click)=\"clearRecord()\" [disabled]=\"isReplaying\">\n            <i class=\"fa fa-remove\"></i>Clear Workspace\n        </button>\n        <button mat-raised-button (click)=\"addActionPlus($event)\" [disabled]=\"isReplaying\">\n                <i class=\"fa fa-plus-circle\"></i>\n            Add Action\n        </button>\n        <button mat-raised-button (click)=\"saveCurrentWorkflow()\" [disabled]=\"isReplaying\">\n            <i class=\"fa fa-floppy-o\"></i>\n            Save Workflow\n        </button>\n        <button mat-raised-button (click)=\"takeScreenshot()\" [disabled]=\"isReplaying\">\n            <i class=\"fa fa-camera\"></i>\n            Add Screenshot\n        </button>\n        <button mat-raised-button (click)=\"openHistory()\" [disabled]=\"isReplaying\">\n            <i class=\"fa fa-history\"></i>\n            Test History\n        </button>\n        <button mat-raised-button (click)=\"removeLast()\" [disabled]=\"isReplaying\">\n            <i class=\"fa fa-undo\"></i>\n            Remove Last Action\n        </button>\n    </div>\n        <div class=\"panel panel-success\">\n            <div class=\"panel-heading\">Workflow Editor (Drag and drop to reorder sequence, hover over for more info)</div>\n            <div class=\"panel-body\">\n                <div>Current Workflow: {{currentWorkflowName}}</div>\n                <ol class=\"list-group\" dnd-sortable-container [sortableData]=\"actionList\">\n                    <li (click)=\"isReplaying || openActionEditDialog($event)\"\n                     *ngFor=\"let action of actionList; let i = index\"\n                      class=\"list-group-item {{action.actionId}}\"\n                       [style.background-color]=\"getBackgroundColor(i)\"\n                       dnd-sortable (onDropSuccess)=\"onDropSuccess($event)\"\n                       [sortableIndex]=\"i\" title={{action.name}}>\n                       {{i + 1}}) {{getTextByType(action)}} <br> ({{action.name}})\n                     </li>\n                </ol>\n            </div>\n        </div>\n</div>\n"

/***/ }),

/***/ "./src/app/workflow/workflow.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkflowComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_backend_manager_backend_manager_service__ = __webpack_require__("./src/app/_services/backend-manager/backend-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_index__ = __webpack_require__("./src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_testcase_manager_testcase_manager_service__ = __webpack_require__("./src/app/_services/testcase-manager/testcase-manager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_plus_new_action_dialog_new_action_dialog_component__ = __webpack_require__("./src/app/actions-plus/new-action-dialog/new-action-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_actions__ = __webpack_require__("./src/app/constants/actions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constants_messageTypes__ = __webpack_require__("./src/app/constants/messageTypes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__history_dialog_history_dialog_component__ = __webpack_require__("./src/app/history-dialog/history-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__log_service__ = __webpack_require__("./src/app/log.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__replay_details_dialog_replay_details_dialog_component__ = __webpack_require__("./src/app/replay-details-dialog/replay-details-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__test_case_list_editor_action_edit_dialog_component__ = __webpack_require__("./src/app/test-case-list-editor/action-edit-dialog.component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var WorkflowComponent = /** @class */ (function () {
    function WorkflowComponent(cd, element, logService, messageService, dialog, tcmService, backendManagerService, snackBar) {
        var _this = this;
        this.cd = cd;
        this.logService = logService;
        this.messageService = messageService;
        this.dialog = dialog;
        this.tcmService = tcmService;
        this.backendManagerService = backendManagerService;
        this.snackBar = snackBar;
        this.SNACKBAR_DURATION_MS = 2000;
        this.isReplaying = false;
        this.nodeDic = {};
        this.actionList = [];
        this.currentWorkflowName = 'none';
        this.currentWorkflowObj = {};
        this.currentReplayAction = -1;
        this.lastReplayAction = -1;
        this.logHandleIdx = 0;
        this.parentNativeElement = element.nativeElement;
        var that = this;
        this.subscription =
            this.messageService.getMessage(__WEBPACK_IMPORTED_MODULE_8__constants_messageTypes__["a" /* MESSAGE_TYPES */].refreshWorkflow)
                .subscribe(function (message) {
                _this.message = message;
                console.log('workflow message', message);
                _this.refreshView();
            });
    }
    WorkflowComponent.prototype.getchLatestLog = function () {
        if (this.playingLogs && this.playingLogs.length > this.logHandleIdx &&
            this.playingLogs[this.logHandleIdx]) {
            var res = this.playingLogs[this.logHandleIdx].split(' ');
            if (res.includes('UUID:')) {
                if (res[res.length - 1] in this.nodeDic) {
                    this.refreshView();
                }
            }
            this.logHandleIdx++;
        }
        this.subscribeLog();
    };
    WorkflowComponent.prototype.subscribeLog = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].timer(300).subscribe(function () { return _this.getchLatestLog(); });
    };
    WorkflowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clearRecord();
        this.subscribeLog();
        this.logService.connect();
        this.logService.outputStream.subscribe(function (output) {
            var startAction = false;
            var endAction = false;
            if (output.indexOf('Start Action') >= 0) {
                startAction = true;
            }
            else if (output.indexOf('End Action') >= 0) {
                endAction = true;
            }
            if (startAction || endAction) {
                var actionId = output.substring(output.indexOf('UUID') + 6);
                for (var i = 0; i < _this.actionList.length; i++) {
                    if (actionId === _this.actionList[i].actionId) {
                        if (startAction) {
                            if (_this.lastReplayAction === i - 1) {
                                _this.lastReplayAction = i;
                                _this.currentReplayAction = i;
                            }
                        }
                        else {
                            _this.currentReplayAction = -1;
                        }
                    }
                }
            }
        });
    };
    WorkflowComponent.prototype.ngOnDestroy = function () {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    };
    WorkflowComponent.prototype.ngAfterViewInit = function () { };
    WorkflowComponent.prototype.getTextByType = function (d) {
        if (d.actionType in __WEBPACK_IMPORTED_MODULE_7__constants_actions__["a" /* ACTIONS */]) {
            return __WEBPACK_IMPORTED_MODULE_7__constants_actions__["a" /* ACTIONS */][d.actionType].shortName;
        }
        return 'UNKNOWN';
    };
    WorkflowComponent.prototype.getColorByType = function (d) {
        if (d.actionType in __WEBPACK_IMPORTED_MODULE_7__constants_actions__["a" /* ACTIONS */]) {
            return __WEBPACK_IMPORTED_MODULE_7__constants_actions__["a" /* ACTIONS */][d.actionType].color;
        }
        return 'black';
    };
    WorkflowComponent.prototype.openHistory = function () {
        var data = { title: 'History' };
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_9__history_dialog_history_dialog_component__["a" /* HistoryDialogComponent */], { width: '800px', data: data });
    };
    WorkflowComponent.prototype.addActionPlus = function (event) {
        var data = { title: 'Add Advanced Action' };
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_6__actions_plus_new_action_dialog_new_action_dialog_component__["a" /* NewActionDialogComponent */], { width: '800px', data: data });
    };
    WorkflowComponent.prototype.clearRecord = function () {
        var _this = this;
        this.tcmService.setCurrentWorkflowName('none');
        this.backendManagerService.createNewWorkSpace().subscribe(function (data) {
            _this.workflowUUID = data['actionId'];
            _this.currentWorkflowObj = data;
            _this.refreshView();
        });
    };
    WorkflowComponent.prototype.refreshView = function () {
        var _this = this;
        this.backendManagerService.getCurrentWorkflow().subscribe(function (data) {
            _this.workflowUUID = data['actionId'];
            _this.currentWorkflowObj = data;
            _this.currentWorkflowName = _this.tcmService.getCurrentWorkflowName();
            _this.actionList = _this.parseWorkflowFromJson(data);
            console.log(_this.actionList);
        });
    };
    WorkflowComponent.prototype.parseWorkflowFromJson = function (json) {
        var workflowData = [];
        for (var index = 0; index < json.childrenActions.length; index++) {
            var action = json.childrenActions[index];
            workflowData.push({
                'actionId': action.actionId,
                'actionType': action.actionType,
                'name': action.name,
            });
        }
        return workflowData;
    };
    WorkflowComponent.prototype.playCurrentWorkflow = function () {
        var _this = this;
        if (this.initedDevices.length == 0) {
            return;
        }
        if (this.isReplaying) {
            this.backendManagerService.cancelCurrentWorkflow().subscribe(function (data) {
                _this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_8__constants_messageTypes__["a" /* MESSAGE_TYPES */].testEnd, '================ Test End (Cancelled) ========');
                _this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_8__constants_messageTypes__["a" /* MESSAGE_TYPES */].setInspectMode, _this.isReplaying);
                console.log(data);
            });
        }
        else {
            this.currentReplayAction = -1;
            this.lastReplayAction = -1;
            this.isReplaying = true;
            this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_8__constants_messageTypes__["a" /* MESSAGE_TYPES */].testStart, '================ Test Start ==================');
            this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_8__constants_messageTypes__["a" /* MESSAGE_TYPES */].setInspectMode, this.isReplaying);
            this.backendManagerService.playCurrentWorkflow().subscribe(function (data) {
                console.log(data);
                _this.isReplaying = false;
                _this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_8__constants_messageTypes__["a" /* MESSAGE_TYPES */].testEnd, '================ Test End ====================');
                _this.messageService.sendMessage(__WEBPACK_IMPORTED_MODULE_8__constants_messageTypes__["a" /* MESSAGE_TYPES */].setInspectMode, _this.isReplaying);
                _this.dialog.open(__WEBPACK_IMPORTED_MODULE_11__replay_details_dialog_replay_details_dialog_component__["a" /* ReplayDetailsComponent */], { data: data, width: '900px' });
                _this.refreshView();
            });
        }
    };
    WorkflowComponent.prototype.removeLast = function () {
        var _this = this;
        this.backendManagerService.removeLastAction().subscribe(function (data) {
            console.log(data);
            _this.refreshView();
        });
    };
    WorkflowComponent.prototype.addActionToWorkflow = function (actions) {
        var _this = this;
        this.backendManagerService.addActionToWorkflow(actions).subscribe(function (sentData) { return _this.refreshView(); });
    };
    WorkflowComponent.prototype.takeScreenshot = function () {
        var action = {};
        action['actionType'] = 'SCREEN_CAP_ACTION';
        action['type'] = __WEBPACK_IMPORTED_MODULE_7__constants_actions__["a" /* ACTIONS */].SCREEN_CAP_ACTION.type;
        this.addActionToWorkflow([action]);
    };
    WorkflowComponent.prototype.saveCurrentWorkflow = function () {
        var _this = this;
        var data = { 'uuid': this.workflowUUID };
        data['saveWorkflow'] = true;
        if (this.currentWorkflowName === 'none') {
            this.dialog.open(__WEBPACK_IMPORTED_MODULE_12__test_case_list_editor_action_edit_dialog_component__["a" /* ActionEditDialog */], { width: '800px', data: data });
        }
        else {
            this.backendManagerService.getActionDetails(this.workflowUUID)
                .subscribe(function (data) {
                _this.backendManagerService.saveCurrentWorkflow(data)
                    .subscribe(function (data) {
                    _this.snackBar.open('Workflow Saved!', '', { duration: _this.SNACKBAR_DURATION_MS });
                });
            });
        }
    };
    WorkflowComponent.prototype.onDropSuccess = function (event) {
        // update order of actions
        var newSequence = [];
        for (var i = 0; i < this.actionList.length; i++) {
            newSequence.push(this.actionList[i].actionId);
        }
        this.currentWorkflowObj['childrenIdList'] = newSequence;
        this.backendManagerService.updateActionMetadata(this.currentWorkflowObj)
            .subscribe(function (data) { return console.log(data); });
    };
    WorkflowComponent.prototype.openActionEditDialog = function (event) {
        var _this = this;
        // second class define is the action uuid
        var id = event.target.className.split(' ')[1];
        var afterClose = this.dialog.open(__WEBPACK_IMPORTED_MODULE_12__test_case_list_editor_action_edit_dialog_component__["a" /* ActionEditDialog */], { width: '800px', data: { 'uuid': id } })
            .afterClosed();
        afterClose.subscribe(function (data) {
            if (data !== undefined && data['playWorkflowRequested'] === true) {
                _this.currentReplayAction = -1;
                _this.isReplaying = true;
                _this.backendManagerService.playCurrentWorkflowFromAction(id).subscribe(function (tdata) {
                    console.log(tdata);
                    _this.isReplaying = false;
                    _this.dialog.open(__WEBPACK_IMPORTED_MODULE_11__replay_details_dialog_replay_details_dialog_component__["a" /* ReplayDetailsComponent */], { data: tdata, width: '900px' });
                    _this.refreshView();
                });
            }
            _this.refreshView();
        });
    };
    WorkflowComponent.prototype.getBackgroundColor = function (item) {
        if (!this.isReplaying) {
            return this.getColorByType(this.actionList[item]);
        }
        if (item === this.currentReplayAction) {
            return 'blue';
        }
        return 'gray';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Array)
    ], WorkflowComponent.prototype, "playingLogs", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Array)
    ], WorkflowComponent.prototype, "initedDevices", void 0);
    WorkflowComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-workflow',
            template: __webpack_require__("./src/app/workflow/workflow.component.html"),
            styles: [__webpack_require__("./src/app/workflow/workflow.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewEncapsulation */].None,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */],
            __WEBPACK_IMPORTED_MODULE_10__log_service__["a" /* LogService */], __WEBPACK_IMPORTED_MODULE_4__services_index__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_5__services_testcase_manager_testcase_manager_service__["a" /* TCMService */],
            __WEBPACK_IMPORTED_MODULE_3__services_backend_manager_backend_manager_service__["a" /* BackendManagerService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["t" /* MatSnackBar */]])
    ], WorkflowComponent);
    return WorkflowComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
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
// The file contents for the current environment will overwrite these during
// build. The build system defaults to the dev environment which uses
// `environment.ts`, but if you do `ng build --env=prod` then
// `environment.prod.ts` will be used instead. The list of which env maps to
// which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__("./src/polyfills.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs__ = __webpack_require__("./node_modules/hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
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






if (__WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_15" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]).catch(function (err) { return console.log(err); });


/***/ }),

/***/ "./src/polyfills.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect__ = __webpack_require__("./node_modules/core-js/es6/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect__ = __webpack_require__("./node_modules/core-js/es7/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone__ = __webpack_require__("./node_modules/zone.js/dist/zone.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone__);
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
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are
 * sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded
 * before your main file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of
 * browsers that automatically update themselves. This includes Safari >= 10,
 * Chrome >= 55 (including Opera), Edge >= 13 on the desktop, and iOS 10 and
 * Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/set';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** Evergreen browsers require these. **/


/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera.
 *http://caniuse.com/#feat=web-animation
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.
/**
 * Need to import at least one locale-data with intl.
 */
// import 'intl/locale-data/jsonp/en';


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map