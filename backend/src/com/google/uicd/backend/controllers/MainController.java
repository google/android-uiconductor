// Copyright 2018 Google LLC
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

package com.google.uicd.backend.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.constants.DeviceOrientation;
import com.google.uicd.backend.core.constants.UicdConstant;
import com.google.uicd.backend.core.devicesdriver.AndroidDeviceDriver;
import com.google.uicd.backend.core.devicesdriver.Device;
import com.google.uicd.backend.core.devicesdriver.DevicesDriverManager;
import com.google.uicd.backend.core.exceptions.UicdActionException;
import com.google.uicd.backend.core.utils.ADBCommandLineUtil;
import com.google.uicd.backend.core.utils.HostInfoUtil;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import com.google.uicd.backend.core.xmlparser.Bounds;
import com.google.uicd.backend.app.Application;
import com.google.uicd.backend.recorder.websocket.minicap.MinicapUtil;
import com.google.uicd.backend.recorder.websocket.minicap.jetty.MinicapServerManager;
import com.google.uicd.backend.recorder.workflowmgr.WorkflowManager;
import java.awt.Point;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Callable;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@EnableAutoConfiguration
@RestController
public class MainController {

  private static final String DONE = "{\"status\":\"done\"}";
  private static final String FAILED = "{\"status\":\"failed\"}";
  private static final boolean DOUBLE_CLICK = true;
  private DevicesDriverManager devicesDriverManager;
  @Autowired WorkflowManager workflowManager;

  @CrossOrigin(origins = "*")
  @RequestMapping("/getDevicesList")
  public Callable<List<String>> getDevicesList() {
    return () -> {
      List<String> adbOutput = ADBCommandLineUtil.getDevicesList();
      List<String> ret = new ArrayList<>();
      for (Device device : Device.getDevicesListFromString(adbOutput)) {
        ret.add(device.toJson());
      }
      return ret;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/initDevice")
  public Callable<String> initDevice(@RequestParam("deviceId") String deviceId) {
    return () -> {
      if (devicesDriverManager.initXmlDumperDevices.contains(deviceId)) {
        return DONE;
      }

      // pre-run on the device
      // e.g. disable auto orientation
      devicesDriverManager.turnOffAutoRotation(deviceId);

      // init xmldumper
      devicesDriverManager.initXmlDumperDevices.add(deviceId);
      devicesDriverManager.startXmlDumperServer(deviceId, true /* isUpdateApk */);
      return DONE;
    };
  }

  // NOTE: This is used for test purposes only (e.g, Postman). Currently we don't provide
  // a call to stopXmldumperServer on frontend.
  @CrossOrigin(origins = "*")
  @RequestMapping("/stopXmldumperServer")
  public Callable<String> stopXmldumperServer(@RequestParam("deviceId") String deviceId) {
    return () -> {
      devicesDriverManager.stopXmldumperServer(deviceId);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/tap")
  public Callable<String> tap(@RequestParam(value = "x") int x, @RequestParam(value = "y") int y) {
    return () -> {
      workflowManager.recordAndClick(x, y, !DOUBLE_CLICK);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/fetchCurrentXML")
  public Callable<List<String>> fetchCurrentXML() {
    return () -> devicesDriverManager.getSelectedAndroidDeviceDriver().fetchCurrentXML();
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/getDeviceRatios")
  public Callable<String> getDeviceRatios() {
    double heightRatio = devicesDriverManager.getSelectedAndroidDeviceDriver().getHeightRatio();
    double widthRatio = devicesDriverManager.getSelectedAndroidDeviceDriver().getWidthRatio();
    return () ->
        String.format("{\"width\":  %f, \"height\":  %f}", widthRatio, heightRatio);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/longclick")
  public Callable<String> longClick(
      @RequestParam(value = "x") Integer x,
      @RequestParam(value = "y") Integer y,
      @RequestParam(value = "duration", required = false) Integer duration) {
    return () -> {
      workflowManager.recordAndLongClick(x, y, duration == null ? 2000 : duration);
      return DONE;
    };
  }

  /**
   * Use POST method instead of GET in order to transmit the template image data, which has larger
   * size than usual parameters. For convenience, all the data has been stored into JSON format and
   * converted into string.
   */
  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/imageValidationClick", method = RequestMethod.POST)
  public Callable<String> imageValidationClick(
      @RequestBody String imageValidationClickMetadataJson) {
    return () -> {
      workflowManager.recordAndImageValidationClick(imageValidationClickMetadataJson);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/dragStart")
  public Callable<String> dragDown(
      @RequestParam(value = "x") Integer x,
      @RequestParam(value = "y") Integer y) {
    return () -> {
      workflowManager.dragStart(x, y);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/dragMove")
  public Callable<String> dragMove(
      @RequestParam(value = "x") Integer x,
      @RequestParam(value = "y") Integer y) {
    return () -> {
      workflowManager.dragMove(x, y);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/dragStop")
  public Callable<String> dragStop(
      @RequestParam(value = "x") Integer x,
      @RequestParam(value = "y") Integer y) {
    return () -> {
      workflowManager.dragStop(x, y);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/addDragAction")
  public Callable<String> dragStop(
      @RequestParam(value = "xList") String xList, @RequestParam(value = "yList") String yList) {
    return () -> {
      String[] xPoints = xList.split(",");
      String[] yPoints = yList.split(",");
      if (xPoints.length != yPoints.length) {
        return FAILED;
      }
      ArrayList<Point> pointList = new ArrayList();
      for (int i = 0; i < xPoints.length; i++) {
        pointList.add(new Point(Integer.parseInt(xPoints[i]), Integer.parseInt(yPoints[i])));
      }
      workflowManager.recordDrag(pointList);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/doubleclick")
  public Callable<String> doubleClick(
      @RequestParam(value = "x") Integer x, @RequestParam(value = "y") Integer y) {
    return () -> {
      workflowManager.recordAndClick(x, y, DOUBLE_CLICK);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/selectedDeviceChanged")
  public Callable<String> selectedDeviceChanged(@RequestParam(value = "deviceId") String deviceId) {
    return () -> {
      devicesDriverManager.setSelectedDeviceByDeviceId(deviceId);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/addValidationStep")
  public Callable<String> addValidationStep(
      @RequestParam(value = "x1") double startX,
      @RequestParam(value = "y1") double startY,
      @RequestParam(value = "x2") double endX,
      @RequestParam(value = "y2") double endY,
      @RequestParam(value = "elementType") String elementType,
      @RequestParam(value = "value") String value,
      @RequestParam(value = "textMatchType") String textMatchType,
      @RequestParam(value = "textPosition") String textPosition,
      @RequestParam(value = "contentStorageType") String contentStorageType,
      @RequestParam(value = "stopType") String stopType,
      @RequestParam(value = "isLoopValidation") boolean isLoopValidation,
      @RequestParam(value = "isConditionClick") boolean isConditionClick,
      @RequestParam(value = "isScrollValidation") boolean isScrollValidation,
      @RequestParam(value = "scrollDirection") Integer scrollDirection,
      @RequestParam(value = "timeout") Integer timeout,
      @RequestParam(value = "isWaitUntilDisappear") boolean isWaitUntilDisappear) {
    return () -> {
      Bounds selectedBounds = new Bounds(startX, startY, endX, endY);
      workflowManager.recordScreenValidation(
          selectedBounds,
          elementType,
          value,
          textMatchType,
          textPosition,
          contentStorageType,
          stopType,
          isLoopValidation,
          isConditionClick,
          isScrollValidation,
          scrollDirection,
          timeout,
          isWaitUntilDisappear);
      return DONE;
    };
  }

  /**
   * Use POST method instead of GET in order to transmit the template image data, which has larger
   * size than usual parameters. For convenience, all the data has been stored into JSON format and
   * converted into string.
   */
  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/addImageMatchingValidationStep", method = RequestMethod.POST)
  public Callable<String> addImageMatchingValidationStep(
      @RequestBody String imageMatchingValidationStepMetadataJson) {
    return () -> {
      workflowManager.recordScreenImageMatchingValidation(imageMatchingValidationStepMetadataJson);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/getAllAvailableSnippetMethods")
  public Callable<List<String>> getAllAvailableSnippetMethods(
      @RequestParam(value = "packageName") String packageName) {
    return () -> workflowManager.getAllAvailableSnippetMethods(packageName);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/addActionByUUID")
  public Callable<String> addActionByUUID(@RequestParam(value = "uuidStr") String uuidStr) {
    return () -> {
      workflowManager.addAction(uuidStr);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/getContentFromScreen")
  public Callable<String> getContentFromScreen(
      @RequestParam(value = "startX") int startX,
      @RequestParam(value = "startY") int startY,
      @RequestParam(value = "endX") int endX,
      @RequestParam(value = "endY") int endY) {
    return () -> workflowManager.getContentInBounds(new Bounds(startX, startY, endX, endY));
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/swipe")
  public Callable<String> swipe(
      @RequestParam(value = "startX") int startX,
      @RequestParam(value = "startY") int startY,
      @RequestParam(value = "endX") int endX,
      @RequestParam(value = "endY") int endY) {
    return () -> {
      workflowManager.recordAndSwipe(startX, startY, endX, endY);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/fetchXML")
  public Callable<List<String>> fetchXML() {
    return () -> {
      AndroidDeviceDriver driver = devicesDriverManager.getSelectedAndroidDeviceDriver();
      return driver.fetchCurrentXML();
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/createNewWorkSpace")
  public String createNewWorkSpace() {
    return workflowManager.createNewWorkSpace();
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/playCurrentWorkflow")
  public Callable<String> playCurrentWorkflow() {
    return () -> workflowManager.playCurrent();
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/playCurrentWorkflowFromAction", method = RequestMethod.POST)
  public Callable<String> playCurrentWorkflowFromAction(@RequestBody String uuidStr) {
    return () -> workflowManager.playCurrentWorkflowFromAction(uuidStr);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/playAction", method = RequestMethod.POST)
  public Callable<String> playAction(@RequestBody String uuidStr) {
    return () -> workflowManager.playAction(uuidStr);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/cancelCurrentWorkflow")
  public String cancelCurrentWorkflow() {
    workflowManager.cancelCurrentPlayback();
    return DONE;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/setPlayMode")
  public String setPlayMode(@RequestParam(value = "playMode") String playMode) {
    workflowManager.setPlayMode(playMode);
    return DONE;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/removeLastAction")
  public String setPlayMode() {
    workflowManager.removeLastAction();
    return DONE;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/removeAction", method = RequestMethod.POST)
  public String removeAction(@RequestBody String uuidStr) {
    workflowManager.removeAction(uuidStr);
    return DONE;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/pressKey")
  public Callable<String> pressKey(@RequestParam(value = "keyCode") int keyCode) {
    return () -> {
      workflowManager.recordAndInput(keyCode);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/turnOnOffScreen")
  public Callable<String> turnOnOffScreen() {
    return () -> {
      workflowManager.recordAndInput(26);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/getCurrentWorkflow")
  public String getCurrentWorkflow() {
    return workflowManager.getWorkflowJson();
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/clearCurrentWorkflow")
  public String clearCurrentWorkflow() {
    workflowManager.createNewWorkSpace();
    return DONE;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/getActionDetails")
  public String getActionDetails(@RequestParam(value = "uuidStr") String uuidStr) {
    try {
      Optional<String> actionDetails = workflowManager.getActionDetails(uuidStr);
      if (actionDetails.isPresent()) {
        return actionDetails.get();
      }
    } catch (UicdActionException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return FAILED;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/getCurrentUser")
  public String getCurrentUser() {
    return String.format("{\"name\":\"%s\"}", UicdConfig.getInstance().getCurrentUser());
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/loadWorkflow")
  public String loadWorkflow(@RequestParam(value = "uuidStr") String uuidStr) {
    try {
      return workflowManager.loadWorkflow(uuidStr);
    } catch (UicdActionException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return FAILED;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/exportTestCase")
  public String getWorkflow(@RequestParam(value = "uuidStr") String uuidStr) {
    try {
      Optional<String> workflow = workflowManager.getWorkflow(uuidStr);
      if (workflow.isPresent()) {
        return workflow.get();
      }
    } catch (UicdActionException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return FAILED;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/deleteActionByUUID")
  public String deleteAction(@RequestParam(value = "uuidStr") String uuidStr) {
    try {
      workflowManager.deleteAction(uuidStr);
      return DONE;
    } catch (UicdActionException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return FAILED;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/copyAction")
  public String copyAction(@RequestParam(value = "uuidStr") String uuidStr) {
    try {
      return workflowManager.copyAction(uuidStr);
    } catch (UicdActionException | CloneNotSupportedException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
    return FAILED;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/saveCurrentWorkflow", method = RequestMethod.POST)
  public Callable<String> saveCurrentWorkflow(@RequestBody String actionMetadataJson) {
    return () -> workflowManager.saveCurrentWorkflow(actionMetadataJson);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/updateActionMetadata", method = RequestMethod.POST)
  public Callable<String> updateActionMetadata(@RequestBody String actionMetadataJson) {
    return () -> {
      workflowManager.updateActionMetadata(actionMetadataJson);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/initDevicesList")
  public Callable<String> initDevicesList(@RequestParam(value = "deviceId") List<String> devices) {
    return () -> {
      // reset minicap
      MinicapServerManager.getInstance().clearAll();

      devicesDriverManager.initDevicesList(devices, false);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/getInitedDevices")
  public Callable<String> getInitedDevices() {
    return () -> {
      ObjectMapper mapper = new ObjectMapper();
      ObjectNode objectNode = mapper.createObjectNode();
      objectNode.set(
          "devices",
          mapper.convertValue(
              String.join(",", devicesDriverManager.getDeviceList()), JsonNode.class));
      return objectNode.toString();
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/hasInitedDevices")
  public Callable<String> hasInitedDevices() {
    return () -> {
      ObjectMapper mapper = new ObjectMapper();
      ObjectNode objectNode = mapper.createObjectNode();
      objectNode.set(
          "hasInitedDevices",
          mapper.convertValue(
              devicesDriverManager.getXmldumperDriverList().size() > 0, JsonNode.class));
      return objectNode.toString();
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/initMiniCap")
  public Callable<String> initMiniCap(@RequestParam(value = "deviceId") String deviceId) {
    return () -> {
      AndroidDeviceDriver driver = devicesDriverManager.getAndroidDriverByDeviceId(deviceId);
      int rotation =
          driver.getDevice().getOrientation().equals(DeviceOrientation.PORTRAIT) ? 0 : 90;
      return MinicapUtil.startMinicap(driver, rotation);
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/getCurrentMasterDevice")
  public Callable<String> getCurrentMasterDevice() {
    return () -> {
      ObjectMapper mapper = new ObjectMapper();
      ObjectNode objectNode = mapper.createObjectNode();
      if (devicesDriverManager.getMasterDevice() != null) {
        objectNode.set(
            "device",
            mapper.convertValue(
                devicesDriverManager.getMasterDevice().getDeviceId(), JsonNode.class));
        objectNode.set(
            "port",
            mapper.convertValue(
                devicesDriverManager.getMasterDevice().getMinicapWebServerPort(),
                JsonNode.class));
      } else {
        objectNode.set("device", mapper.convertValue("", JsonNode.class));
      }
      return objectNode.toString();
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/getPorts")
  public Callable<String> getPorts(@RequestParam(value = "deviceId") String deviceId) {
    return () -> {
      ObjectMapper mapper = new ObjectMapper();
      ObjectNode objectNode = mapper.createObjectNode();
      AndroidDeviceDriver driver = devicesDriverManager.getAndroidDriverByDeviceId(deviceId);
      if (driver != null) {
        objectNode.set(
            "server_port",
            mapper.convertValue(driver.getDevice().getMinicapWebServerPort(), JsonNode.class));
      } else {
        objectNode.set("server_port", mapper.convertValue(-1, JsonNode.class));
      }
      return objectNode.toString();
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/getImageValidationOption")
  public Callable<String> getImageValidationOption() {
    return () -> {
      return (UicdConfig.getInstance().getImageValidationOption() && HostInfoUtil.isUnix())
          ? "{\"imageValidationOption\":true}"
          : "{\"imageValidationOption\":false}";
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/addActionToWorkflow", method = RequestMethod.POST)
  public Callable<String> addActionToWorkflow(@RequestBody String actionMetadataJson) {
    return () -> {
      workflowManager.addActionToWorkflow(actionMetadataJson);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/zoom")
  public Callable<String> zoom(
      @RequestParam(value = "x1") Integer x1,
      @RequestParam(value = "y1") Integer y1,
      @RequestParam(value = "x2") Integer x2,
      @RequestParam(value = "y2") Integer y2,
      // TODO: change isZoomin to enum(Zoomin/out)
      @RequestParam(value = "isZoomIn") Boolean isZoomin) {
    return () -> {
      workflowManager.recordAndZoom(x1, y1, x2, y2, isZoomin);
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/quickSwipe")
  public Callable<String> quickSwipe(@RequestParam(value = "dir") String direction) {
    return () -> {
      int windowBoundaryOffset = 20;
      int maxX = 360 - windowBoundaryOffset;
      int maxY = 640 - windowBoundaryOffset;
      int minX = 0 + windowBoundaryOffset;
      int minY = 0 + windowBoundaryOffset;
      int midX = 360 / 2;
      int midY = 640 / 2;

      if (direction.equalsIgnoreCase("left")) {
        workflowManager.recordAndSwipe(maxX, midY, minX, midY);
      } else if (direction.equalsIgnoreCase("right")) {
        workflowManager.recordAndSwipe(minX, midY, maxX, midY);
      } else if (direction.equalsIgnoreCase("up")) {
        workflowManager.recordAndSwipe(midX, maxY, midX, midY);
      } else if (direction.equalsIgnoreCase("down")) {
        // There is an issue for devices with notch, swipe down from the top middle might not work,
        // swipe down from the top left as temp solution. see b/111322864 for more details.
        workflowManager.recordAndSwipe(minX, minY, minX, midY);
      }
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/screenRotate")
  public Callable<String> screenRotate(@RequestParam(value = "dir") String direction) {
    return () -> {
      workflowManager.recordAndRotate(direction);
      return DONE;
    };
  }

  @PostConstruct
  private void init() {
    devicesDriverManager = DevicesDriverManager.getInstance();
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/softRestart")
  public Callable<String> softRestart() {
    return () -> {
      Application.restart();
      return DONE;
    };
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/validateUicdBackendConnection")
  public Callable<String> validateUicdBackendConnection() {
    return () -> DONE;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/getVersionInfo")
  public Callable<String> getVersionInfo() {
    return () -> {
      HashMap<String, String> versionInfo = new HashMap<>();
      versionInfo.put("Uicd", UicdConstant.UICD_VERSION);

      String xmlDumperApkVersion = "";
      for (String deviceId : devicesDriverManager.initXmlDumperDevices) {
        Optional<String> xmlDumperVersion = devicesDriverManager.getXmlDumperVersion(deviceId);
        if (xmlDumperVersion.isPresent()) {
          xmlDumperApkVersion = xmlDumperVersion.get();
          break;
        }
      }
      if (xmlDumperApkVersion.isEmpty()) {
        xmlDumperApkVersion =
            UicdConfig.getInstance().getXmlDumperApkVersion() + " (not loaded yet)";
      }

      versionInfo.put("xmlDumper", xmlDumperApkVersion);
      return new ObjectMapper().writeValueAsString(versionInfo);
    };
  }
}
