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

package com.google.uicd.backend.recorder.repositories;

import com.google.uicd.backend.recorder.db.ProjectEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/** Handles project related database operations. */
@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, String> {
  List<ProjectEntity> findByCreatedBy(String username);

  List<ProjectEntity> findByShareWithContaining(String username);

  Optional<ProjectEntity> findByProjectNameAndCreatedBy(String projectName, String createdBy);

  Optional<ProjectEntity> findByProjectId(String projectId);

  @Transactional
  List<ProjectEntity> deleteByProjectId(String projectId);
}
