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

package com.google.uicd.backend.recorder.services;

import static java.util.stream.Collectors.toList;

import com.google.uicd.backend.controllers.responses.OcrRecord;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.devicesdriver.DevicesDriverManager;
import com.google.uicd.backend.core.utils.ImageUtil;
import com.google.uicd.backend.core.utils.OCRUtil;
import com.google.uicd.backend.core.xmlparser.Bounds;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;

/** Defines the interfaces related to the inspector mode. */
@Service
public class InspectorManager {
  protected Logger logger = LogManager.getLogManager().getLogger("uicd");

  public List<OcrRecord> getOCRDetails() {
    DevicesDriverManager devicesDriverManager = DevicesDriverManager.getInstance();

    String screenCapPath =
        Paths.get(
                UicdConfig.getInstance().getTestTmpFolder(),
                "tmpImage_" + System.currentTimeMillis() + ".png")
            .toString();
    ImageUtil.saveScreenshotToLocal(
        devicesDriverManager.getMasterDevice().getDeviceId(), screenCapPath);
    OCRUtil ocrUtil = new OCRUtil();
    Map<Bounds, String> map = ocrUtil.getAllTextFromScreen(screenCapPath);
    return map.entrySet().stream()
        .map(entry -> OcrRecord.create(entry.getValue(), entry.getKey()))
        .collect(toList());
  }
}
