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

package com.google.uicd.backend.core.uicdactions;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.uicd.backend.core.uicdactions.jsondbignores.ExternalFileTypeFilter;
import com.google.uicd.backend.core.uicdactions.jsondbignores.OutputTypeFilter;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/**
 * ActionExecutionResult, use this class to store the actual execution result from uicd, the result
 * is in the tree structure, similar to the action tree. go/uicd-design-doc for more details.
 *
 * @author tccyp@google.com
 */
@SuppressWarnings("UnusedVariable")
@JsonAutoDetect(
    fieldVisibility = ANY,
    getterVisibility = NONE,
    setterVisibility = NONE,
    isGetterVisibility = NONE)
public class ActionExecutionResult {

  @JsonInclude(Include.NON_EMPTY)
  private final List<ActionExecutionResult> childrenResult = new ArrayList<>();

  private String actionId;

  @JsonInclude(value = Include.CUSTOM, valueFilter = OutputTypeFilter.class)
  private OutputType outputType;

  @JsonInclude(value = Include.CUSTOM, valueFilter = ExternalFileTypeFilter.class)
  private ExternalFileType externalFileType;

  @JsonInclude(Include.NON_DEFAULT)
  private String externalFilePath;

  private String content;

  @JsonInclude(Include.NON_DEFAULT)
  private int sequenceIndex = 0;

  private String executionId;

  private ActionContext.PlayStatus playStatus;

  private Instant timestamp;

  private String validationDetails;

  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");

  public List<ActionExecutionResult> getChildrenResult() {
    return childrenResult;
  }

  public void setOutputType(OutputType outputType) {
    this.outputType = outputType;
  }

  public String getActionId() {
    return actionId;
  }

  public void setActionId(String actionId) {
    this.actionId = actionId;
  }

  public ActionContext.PlayStatus getPlayStatus() {
    return playStatus;
  }

  public void setPlayStatus(ActionContext.PlayStatus playStatus) {
    this.playStatus = playStatus;
  }

  public ExternalFileType getExternalFileType() {
    return externalFileType;
  }

  public int getSequenceIndex() {
    return sequenceIndex;
  }

  public String getValidationDetails() {
    return validationDetails;
  }

  public String getExternalFilePath() {
    return externalFilePath;
  }

  public void setSequenceIndex(int sequenceIndex) {
    this.sequenceIndex = sequenceIndex;
  }

  public void setExternalFilePath(String externalFilePath) {
    this.externalFilePath = externalFilePath;
  }

  public String getOutputType() {
    return outputType.toString();
  }

  public String getContent() {
    return this.content;
  }

  public void addChildResult(ActionExecutionResult childResult) {
    childrenResult.add(childResult);
  }

  /** setScreenCapOutput set the execution result for screenCap action. */
  public void setScreenCapOutput(String screenshotPath, String content) {
    this.setOutputType(OutputType.SCREENSHOT);
    this.externalFileType = ExternalFileType.SCREENSHOT;
    this.setExternalFilePath(screenshotPath);
    this.content = content;
  }

  /** setScreenCapOutput set the execution result for screenCap action. */
  public void setImgValidationScreenCapOutput(String screenshotPath, String content) {
    this.setOutputType(OutputType.IMG_VALIDATION);
    this.externalFileType = ExternalFileType.SCREENSHOT;
    this.setExternalFilePath(screenshotPath);
    this.content = content;
  }

  /** setLogOutput set the execution result for the logcat action */
  public void setLogOutput(String logFilePath, String content) {
    this.setOutputType(OutputType.LOG);
    this.externalFileType = ExternalFileType.LOG;
    setExternalFilePath(logFilePath);
    this.content = content;
  }

  /** setRegularOutput */
  public void setRegularOutput(String content) {
    this.setOutputType(OutputType.REGULAR);
    this.externalFileType = ExternalFileType.NA;
    this.setExternalFilePath("");
    this.content = content;
    this.timestamp = Instant.now();
  }

  /** setValidationOutput */
  public void setValidationOutput(String content, String validationDetails) {
    this.setOutputType(OutputType.VALIDATION);
    this.setExternalFilePath("");
    this.content = content;
    this.validationDetails = validationDetails;
  }

  /** setLogcatValidationOutput */
  public void setLogcatValidationOutput(
      String content, String logFilePath, String validationDetails) {
    this.setOutputType(OutputType.VALIDATION);
    this.externalFileType = ExternalFileType.LOG;
    this.setExternalFilePath(logFilePath);
    this.content = content;
    this.validationDetails = validationDetails;
  }

  public String toJson() {
    String jsonDataString = "";
    ObjectMapper mapper = new ObjectMapper();

    try {
      jsonDataString = mapper.writeValueAsString(this);
    } catch (JsonProcessingException e) {
      logger.warning(e.getMessage());
    }
    return jsonDataString;
  }

  public String getExecutionId() {
    return executionId;
  }

  public void setExecutionId(String executionId) {
    this.executionId = executionId;
  }

  /** ExecutionResult OutputType */
  public enum OutputType {
    SCREENSHOT,
    LOG,
    VALIDATION,
    IMG_VALIDATION,
    REGULAR,
    ALLDEVICES,
    COMPOUND
  }

  /** ExecutionResult ExternalFileType */
  public enum ExternalFileType {
    SCREENSHOT,
    LOG,
    NA
  }
}
