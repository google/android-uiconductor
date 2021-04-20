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

import com.google.uicd.backend.controllers.responses.ProjectRecord;
import com.google.uicd.backend.controllers.responses.ProjectResponse;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.recorder.db.DbProjectStorageManager;
import com.google.uicd.backend.recorder.db.ProjectEntity;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

/** Defines the interface to save and load project to/from database or file system. */
@Service
public class ProjectManager {

  protected Logger logger = LogManager.getLogManager().getLogger("uicd");
  @Autowired private ApplicationContext applicationContext;
  @Autowired private DbProjectStorageManager projectStorageManager;
  private static final String DEFAULT_PROJECT_NAME_PREFIX = "default_project_";

  @Autowired private TestCaseTreeManager testCaseTreeManager;
  private ProjectEntity currentProject;

  public ProjectResponse getProjectListOfCurrentUser() {
    List<ProjectEntity> projectEntities = projectStorageManager.getCurrentUserProjectList();

    // Add the project shared by other user.
    List<ProjectEntity> sharedProjectEntities =
        projectStorageManager.getCurrentUserSharedProjectList();

    // Add userid as perfix to the project name to make the frontend easy to read. ideally should
    // move the logic to frontend, but here is easy to implement.
    sharedProjectEntities.stream()
        .forEach(
            entity -> entity.setProjectName(entity.getUserId() + ":" + entity.getProjectName()));
    projectEntities.addAll(sharedProjectEntities);
    // Convert to ProjectRecord object, and move the default one to the first of the list
    ProjectResponse projectResponse =
        ProjectResponse.create(
            projectEntities.stream()
                .map(projectEntity -> ProjectRecord.createdFromProjectEntity(projectEntity))
                .sorted((s1, s2) -> s1.getProjectName().startsWith("default_") ? -1 : 1)
                .collect(Collectors.toList()),
            true);
    return projectResponse;
  }

  public ProjectResponse createProject(String projectName) {
    Optional<ProjectEntity> returnedNewProject = projectStorageManager.saveNewProject(projectName);
    if (returnedNewProject.isPresent()) {
      currentProject = returnedNewProject.get();
      try {
        testCaseTreeManager.createEmptyTreeForNewProject(currentProject.getProjectId());
        return ProjectResponse.create(
            Arrays.asList(ProjectRecord.createdFromProjectEntity(currentProject)), /* isSuccess */
            true);
      } catch (UicdException e) {
        logger.severe("can not create project!");
      }
    }
    return ProjectResponse.create(new ArrayList<>(), /* isSuccess */ false);
  }

  /**
   * Provides a list of users that current project is shared with, this is a simple solution for the
   * sharing asked by a few teams. To implement a real sharing, lots of work need to be done in the
   * backend part.
   */
  public void addShareWithUserListToProject(String sharedWith) {
    if (currentProject == null) {
      return;
    }
    currentProject.setShareWith(sharedWith);
    projectStorageManager.saveProject(currentProject);
  }

  public ProjectResponse setCurrentProject(String projectId) {
    Optional<ProjectEntity> returnedProject =
        projectStorageManager.getProjectByProjectId(projectId);
    if (returnedProject.isPresent()) {
      currentProject = returnedProject.get();
      return ProjectResponse.create(
          Arrays.asList(ProjectRecord.createdFromProjectEntity(currentProject)), /* isSuccess */
          true);
    } else if (projectId.startsWith("default")) { // Default project, for backward compatibility
      String defaultProjectName =
          DEFAULT_PROJECT_NAME_PREFIX + UicdConfig.getInstance().getCurrentUser();
      return createProject(defaultProjectName);
    } else {
      return ProjectResponse.create(new ArrayList<>(), /* isSuccess */ false);
    }
  }

  public ProjectEntity getCurrentProject() {
    return currentProject;
  }

  public ProjectResponse getProjectListByUsername(String username) {
    List<ProjectEntity> projectEntities = projectStorageManager.getProjectListByUsername(username);
    return ProjectResponse.create(
        projectEntities.stream()
            .map(projectEntity -> ProjectRecord.createdFromProjectEntity(projectEntity))
            .collect(Collectors.toList()),
        /* isSuccess */ true);
  }

  public ProjectResponse deleteProjectByProjectId(String projectId) {
    try {
      return ProjectResponse.create(
          new ArrayList<>(),
          /* isSuccess */ projectStorageManager.deleteProjectByProjectId(projectId));
    } catch (UicdException e) {
      return ProjectResponse.create(new ArrayList<>(), /* isSuccess */ false);
    }
  }
}
