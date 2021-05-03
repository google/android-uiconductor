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

package com.google.uicd.xmldumper.httpd;

import static androidx.test.platform.app.InstrumentationRegistry.getInstrumentation;

import android.graphics.Point;
import android.util.Log;
import androidx.test.uiautomator.UiDevice;
import com.google.uicd.xmldumper.core.AccessibilityNodeInfoDumper;
import com.google.uicd.xmldumper.core.ComplexUiActionHandler;
import com.google.uicd.xmldumper.utils.AndroidPlatformReflectionUtils;
import fi.iki.elonen.NanoHTTPD;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.json.JSONException;
import org.json.JSONObject;

/** Dump Execution Server */
public class ExecutionServer extends NanoHTTPD {
  private static final String TAG = "UicdExecutionServer";
  private static final String XML_KEYWORD = "xml";
  private static final String XML_COUNT_KEYWORD = "xml_count";
  private static final String WIDTH_KEYWORD = "width";
  private static final String HEIGHT_KEYWORD = "height";
  private static final String VALUE_KEYWORD = "value";
  private static final String EXECUTE_SUCCESS_MSG = "{\"status\":0,\"value\":true}";
  private static final int DEVICE_XML_IDLE_TIMEOUT = 2000;
  public ExecutionServer(int port) {
    super(port);
  }

  /**
   * get XML UI hierarchy.
   *
   * <p>Sample: { "width":1440, "height":2621, "xml_count": 4, "value": { "xml0": "...", "xml1":
   * "...", ... } }
   *
   * @return XML UI hierarchy JSON String.
   */
  public String getDumpStrHandler(String queryParamStr) throws JSONException {
    AndroidPlatformReflectionUtils.clearAccessibilityCache();
    UiDevice mDevice = UiDevice.getInstance(getInstrumentation());
    mDevice.waitForIdle(DEVICE_XML_IDLE_TIMEOUT);
    List<String> xmls =
        AccessibilityNodeInfoDumper.dumpWindowHierarchy(
            queryParamStr != null && queryParamStr.toLowerCase().contains("withclassname"));
    JSONObject jsonRootObj = new JSONObject();
    JSONObject valueObj = new JSONObject();
    for (int i = 0; i < xmls.size(); i++) {
      valueObj.put(XML_KEYWORD + i, xmls.get(i));
    }
    Point devicePhysicalSize = AccessibilityNodeInfoDumper.getDevicePhysicalSize();
    jsonRootObj.put(WIDTH_KEYWORD, devicePhysicalSize.x);
    jsonRootObj.put(HEIGHT_KEYWORD, devicePhysicalSize.y);
    jsonRootObj.put(XML_COUNT_KEYWORD, xmls.size());
    jsonRootObj.put(VALUE_KEYWORD, valueObj);

    return jsonRootObj.toString();
  }

  public String touchDownHandler(JSONObject jsonObject) throws RuntimeException, JSONException {
    ComplexUiActionHandler.touchDown(
        getInstrumentation().getUiAutomation(), jsonObject.getInt("x"), jsonObject.getInt("y"));
    return EXECUTE_SUCCESS_MSG;
  }

  public String touchMoveHandler(JSONObject jsonObject) throws RuntimeException, JSONException {
    ComplexUiActionHandler.touchMove(
        getInstrumentation().getUiAutomation(), jsonObject.getInt("x"), jsonObject.getInt("y"));
    return EXECUTE_SUCCESS_MSG;
  }

  public String touchUpHandler(JSONObject jsonObject) throws RuntimeException, JSONException {
    ComplexUiActionHandler.touchUp(
        getInstrumentation().getUiAutomation(), jsonObject.getInt("x"), jsonObject.getInt("y"));
    return EXECUTE_SUCCESS_MSG;
  }

  public String zoomHandler(JSONObject jsonObject) throws RuntimeException, JSONException {
    ComplexUiActionHandler.zoom(
        new Point(jsonObject.getInt("startX1"), jsonObject.getInt("startY1")),
        new Point(jsonObject.getInt("startX2"), jsonObject.getInt("startY2")),
        new Point(jsonObject.getInt("endX1"), jsonObject.getInt("endY1")),
        new Point(jsonObject.getInt("endX2"), jsonObject.getInt("endY2")));
    return EXECUTE_SUCCESS_MSG;
  }

  public String motionHandler(JSONObject jsonObject) throws JSONException {
    ComplexUiActionHandler.injectMotionEvent(
      getInstrumentation().getUiAutomation(),
      jsonObject.getInt("x"),
      jsonObject.getInt("y"),
      jsonObject.getInt("action"),
      jsonObject.getLong("duration"));
    return EXECUTE_SUCCESS_MSG;
  }

  @Override
  public Response serve(IHTTPSession session) {
    String uri = session.getUri();
    String queryParamStr = session.getQueryParameterString();
    Map<String, String> paramMap = new HashMap<>();
    JSONObject jsonParamsObj = null;
    if (session.getMethod().name().equals("POST")) {
      try {
        session.parseBody(paramMap);
        JSONObject jsonObj = new JSONObject(paramMap.get("postData"));
        // Can not use jsonObj.getJSONObject("params") instead, since the value from backend is
        // actually a String (with escape characters, not a json object).
        jsonParamsObj = new JSONObject(jsonObj.getString("params"));

      } catch (IOException | ResponseException | JSONException e) {
        Log.i(TAG, "Failed to parse the request body.");
      }
    }
    Response response = null;
    try {
      if (uri.contains("dump")) {
        response = newFixedLengthResponse(getDumpStrHandler(queryParamStr));
      } else if (uri.contains("down")) {
        response = newFixedLengthResponse(touchDownHandler(jsonParamsObj));
      } else if (uri.contains("move")) {
        response = newFixedLengthResponse(touchMoveHandler(jsonParamsObj));
      } else if (uri.contains("up")) {
        response = newFixedLengthResponse(touchUpHandler(jsonParamsObj));
      } else if (uri.contains("zoom")) {
        response = newFixedLengthResponse(zoomHandler(jsonParamsObj));
      } else if (uri.contains("motion")) {
        response = newFixedLengthResponse(motionHandler(jsonParamsObj));
      } else {
        return newFixedLengthResponse(
            Response.Status.INTERNAL_ERROR, NanoHTTPD.MIME_PLAINTEXT, uri + " unknown request!");
      }
    } catch (Exception e) {
      e.printStackTrace();
      return newFixedLengthResponse(
          Response.Status.INTERNAL_ERROR, NanoHTTPD.MIME_PLAINTEXT, "Exception: " + e.getMessage());
    }
    return response;
  }
}
