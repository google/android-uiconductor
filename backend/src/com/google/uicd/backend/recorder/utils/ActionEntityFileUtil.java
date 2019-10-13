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

package com.google.uicd.backend.core.recorder.utils;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.fasterxml.jackson.core.type.TypeReference;
import com.google.uicd.backend.core.db.ActionEntity;
import com.google.uicd.backend.core.exceptions.UicdActionException;
import com.google.uicd.backend.recorder.utils.JsonUtilEx;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.apache.commons.io.FileUtils;

/** Util class for save/load {@code ActionEntity} from local file system */
public class ActionEntityFileUtil {

  /* Make it noninstantiable with a default private constructor */
  private ActionEntityFileUtil() {}
  /**
   * Saves all test cases to target folder, file name is the action id
   *
   * @param entities action list in action entity format, consistent with database schema
   * @param testcaseFolderPath full path of output folder
   */
  public static void saveTestCases(List<ActionEntity> entities, Path testcaseFolderPath)
      throws UicdActionException {
    try {
      FileUtils.forceMkdir(testcaseFolderPath.toFile());
    } catch (IOException e) {
      throw new UicdActionException("Can not create folder: " + e.getMessage());
    }
    for (ActionEntity actionEntity : entities) {
      String content = JsonUtilEx.toJson(actionEntity);
      try {
        Files.write(
            Paths.get(testcaseFolderPath.toString(), actionEntity.getUuid()),
            content.getBytes(UTF_8));
      } catch (IOException e) {
        throw new UicdActionException(
            "Can not export test cases: " + actionEntity.getUuid() + e.getMessage());
      }
    }
  }

  /**
   * Loads test cases in action list from target folder, file name is the action id
   *
   * @param testcaseFolderPath full path of input folder
   * @param actionIdList list of actionId that need to be loaded
   */
  public static List<ActionEntity> loadTestCases(Path testcaseFolderPath, List<String> actionIdList)
      throws UicdActionException {
    return loadTestCases(testcaseFolderPath, actionIdList, false);
  }

  /**
   * Loads all test cases from target folder, file name is the action id
   *
   * @param testcaseFolderPath full path of input folder
   */
  public static List<ActionEntity> loadTestCases(Path testcaseFolderPath)
      throws UicdActionException {
    return loadTestCases(testcaseFolderPath, new ArrayList<>(), true);
  }

  /**
   * Loads test cases from target folder, file name is the action id
   *
   * @param testcaseFolderPath full path of input folder
   * @param actionIdList list of actionId that need to be loaded
   * @param allFiles whether filter by actionIdList
   */
  public static List<ActionEntity> loadTestCases(
      Path testcaseFolderPath, List<String> actionIdList, boolean allFiles)
      throws UicdActionException {
    List<ActionEntity> actionEntities = new ArrayList<>();
    List<Path> filepathList;
    try (Stream<Path> filePathStream = Files.list(testcaseFolderPath)) {
      if (!allFiles) {
        filepathList =
            filePathStream
                .filter(path -> actionIdList.contains(path.getFileName().toString()))
                .collect(Collectors.toList());
      } else {
        filepathList = filePathStream.collect(Collectors.toList());
      }

    } catch (IOException e) {
      throw new UicdActionException(
          "Can not list files in folder: " + testcaseFolderPath + e.getMessage());
    }
    for (Path filepath : filepathList) {
      actionEntities.add(loadSingleTestCases(filepath));
    }
    return actionEntities;
  }

  /** Loads single action from file */
  public static ActionEntity loadSingleTestCases(Path testcasePath) throws UicdActionException {
    try {
      String testcaseContent = new String(Files.readAllBytes(testcasePath), UTF_8);
      return JsonUtilEx.fromJson(testcaseContent, new TypeReference<ActionEntity>() {});
    } catch (IOException e) {
      throw new UicdActionException("Can find file in folder: " + testcasePath + e.getMessage());
    }
  }
}
