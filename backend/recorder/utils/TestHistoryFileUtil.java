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
import com.google.uicd.backend.recorder.db.TestHistoryEntity;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.apache.commons.io.FileUtils;

/** Util class for save/load {@code TestHistoryEntity} from local file system */
public class TestHistoryFileUtil {

  /**
   * Loads the test history from target folder
   *
   * @param testHistoryFolderPath full path of output folder
   * @return list of TestHistoryEntity top50 order by time
   */
  public static List<TestHistoryEntity> loadTestHistoryFromFolder(Path testHistoryFolderPath)
      throws UicdException {

    List<Path> filepathList;
    try (Stream<Path> filePathStream = Files.list(testHistoryFolderPath)) {
      filepathList = filePathStream.collect(Collectors.toList());
    } catch (IOException e) {
      throw new UicdActionException(
          "Can not list files in folder: " + testHistoryFolderPath + e.getMessage());
    }
    if (filepathList.isEmpty()) {
      throw new UicdActionException(
          "Can not find test history files in folder: " + testHistoryFolderPath);
    }

    List<File> files =
        filepathList.stream()
            .map(path -> path.toFile())
            .sorted(Comparator.comparingLong(File::lastModified))
            .limit(50)
            .collect(Collectors.toList());

    List<TestHistoryEntity> top50TestHistoryEntity = new ArrayList<>();
    for (File file : files) {
      try {
        String testHistoryContent = new String(Files.readAllBytes(file.toPath()));
        TestHistoryEntity testHistoryEntity =
            JsonUtilEx.fromJson(testHistoryContent, new TypeReference<TestHistoryEntity>() {});
        top50TestHistoryEntity.add(testHistoryEntity);
      } catch (IOException e) {
        throw new UicdException("Can not export test history from file: " + file);
      }
    }
    return top50TestHistoryEntity;
  }

  /**
   * Saves all test case to target folder, file name is the action id
   *
   * @param testHistoryEntity test history in {@code TestHistoryEntity} format, consistent with
   *     database schema
   * @param testHistoryFolderPath full path of output folder
   */
  public static void saveTestHistory(
      TestHistoryEntity testHistoryEntity, Path testHistoryFolderPath) throws UicdException {
    try {
      FileUtils.forceMkdir(testHistoryFolderPath.toFile());
      String content = JsonUtilEx.toJson(testHistoryEntity);
      Files.write(
          Paths.get(testHistoryFolderPath.toString(), testHistoryEntity.getUuid()),
          content.getBytes());
    } catch (IOException e) {
      throw new UicdException("Can not export test history: " + testHistoryEntity.getUuid());
    }
  }
}
