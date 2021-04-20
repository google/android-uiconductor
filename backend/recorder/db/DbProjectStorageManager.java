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

package com.google.uicd.backend.recorder.db;

import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.recorder.repositories.ProjectRepository;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

/** Implements the logic to save and fetch project entities to/from database. */
@Service
public class DbProjectStorageManager {
  @Autowired ProjectRepository projectRepository;

  String currentUser = UicdConfig.getInstance().getCurrentUser();
  Logger logger = LogManager.getLogManager().getLogger("uicd");

  /**
   * Currently we are using {@code currentUser} filling for groupId, userId which are saving for
   * possible fulture uses.
   */
  public Optional<ProjectEntity> saveNewProject(String projectName) {
    ProjectEntity newProject =
        new ProjectEntity(
            UUID.randomUUID().toString(), currentUser, "", projectName, currentUser, Instant.now());
    try {
      ProjectEntity savedNewProjectEntity = projectRepository.save(newProject);
      return Optional.of(savedNewProjectEntity);
    } catch (DataAccessException e) {
      logger.warning(
          "DbProjectStorageManager failed to save new Project with name: "
              + projectName
              + "\n"
              + e.getMessage());
      return Optional.empty();
    }
  }

  public List<ProjectEntity> getCurrentUserProjectList() {
    return projectRepository.findByCreatedBy(currentUser);
  }

  public List<ProjectEntity> getCurrentUserSharedProjectList() {
    return projectRepository.findByShareWithContaining(currentUser);
  }

  public List<ProjectEntity> getProjectListByUsername(String username) {
    return projectRepository.findByCreatedBy(username);
  }

  public Optional<ProjectEntity> getProjectByProjectId(String projectId) {
    return projectRepository.findByProjectId(projectId);
  }

  public boolean deleteProjectByProjectId(String projectId) throws UicdException {
    projectRepository.deleteByProjectId(projectId);
    return true;
  }

  public void saveProject(ProjectEntity projectEntity) {
    projectRepository.save(projectEntity);
  }
}
