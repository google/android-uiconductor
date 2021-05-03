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

package com.google.uicd.backend.recorder.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.google.uicd.backend.core.exceptions.UicdActionException;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.recorder.db.TestCaseTreeEntity;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.apache.commons.io.FileUtils;

/** Util class for save/load {@code TestCaseTreeEntity} from local file system */
public class TestCaseTreeFileUtil {
  /**
   * Loads the testTree from target folder, the export logic guarantees there is only one file in
   * the target folder
   *
   * @param testTreeFolderPath full path of output folder
   */
  public static Optional<TestCaseTreeEntity> loadTestTreeFromFolder(Path testTreeFolderPath)
      throws UicdException {

    try {
      FileUtils.forceMkdir(testTreeFolderPath.toFile());
    } catch (IOException e) {
      throw new UicdException("Can not create folder");
    }
    List<Path> filepathList;
    try (Stream<Path> filePathStream = Files.list(testTreeFolderPath)) {
      filepathList = filePathStream.collect(Collectors.toList());
    } catch (IOException e) {
      throw new UicdActionException(
          "Can not list files in folder: " + testTreeFolderPath + e.getMessage());
    }
    if (filepathList.isEmpty()) {
      return Optional.empty();
    }

    String testTreeContent = null;
    try {
      testTreeContent = new String(Files.readAllBytes(filepathList.get(0)));
    } catch (IOException e) {
      throw new UicdException(
          "Can not export test cases from file: " + filepathList.get(0).toString());
    }
    TestCaseTreeEntity testCaseTreeEntity =
        JsonUtilEx.fromJson(testTreeContent, new TypeReference<TestCaseTreeEntity>() {});
    return Optional.of(testCaseTreeEntity);
  }

  /**
   * Saves all test case to target folder, file name is the action id
   *
   * @param testCaseTreeEntity test case tree in {@code TestCaseTreeEntity} format, consistent with
   *     database schema
   * @param testTreeFolderPath full path of output folder
   */
  public static void saveTestTree(TestCaseTreeEntity testCaseTreeEntity, Path testTreeFolderPath)
      throws UicdException {
    try {
      FileUtils.forceMkdir(testTreeFolderPath.toFile());
      String content = JsonUtilEx.toJson(testCaseTreeEntity);
      Files.write(
          Paths.get(testTreeFolderPath.toString(), testCaseTreeEntity.getUuid()),
          content.getBytes());
    } catch (IOException e) {
      throw new UicdException("Can not export testcase Tree: " + testCaseTreeEntity.getUuid());
    }
  }
}
