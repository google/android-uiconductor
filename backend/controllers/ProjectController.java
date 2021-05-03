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

package com.google.uicd.backend.controllers;

import com.google.uicd.backend.controllers.responses.ProjectResponse;
import com.google.uicd.backend.recorder.services.ProjectManager;
import java.util.concurrent.Callable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** Handles all the project related requests from frontend. */
@ComponentScan("com.google.uicd.backend.*")
@RestController
public class ProjectController {

  private static final String DONE = "{\"status\":\"done\"}";
  @Autowired ProjectManager projectManager;

  @CrossOrigin(origins = "*")
  @RequestMapping("/projecttest")
  public String projecttest() {
    return DONE;
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/createProject", method = RequestMethod.POST)
  public Callable<ProjectResponse> createProject(@RequestBody String projectName) {
    return () -> projectManager.createProject(projectName);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/deleteProjectByProjectId", method = RequestMethod.POST)
  public Callable<ProjectResponse> deleteProject(@RequestBody String projectId) {
    return () -> projectManager.deleteProjectByProjectId(projectId);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping("/getProjectList")
  public Callable<ProjectResponse> getProjectListOfCurrentUser() {
    return () -> projectManager.getProjectListOfCurrentUser();
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/getProjectListByUsername", method = RequestMethod.GET)
  public Callable<ProjectResponse> getProjectListByUsername(
      @RequestParam(value = "username") String username) {
    return () -> projectManager.getProjectListByUsername(username);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/setCurrentProject", method = RequestMethod.POST)
  public Callable<ProjectResponse> setCurrentProject(@RequestBody String projectId) {
    return () -> projectManager.setCurrentProject(projectId);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/addShareWithUserListToProject", method = RequestMethod.POST)
  public Callable<String> addShareWithUserListToProject(@RequestBody String sharedWith) {
    return () -> {
      projectManager.addShareWithUserListToProject(sharedWith);
      return DONE;
    };
  }
}
