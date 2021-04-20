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

package com.google.uicd.backend.core.constants;

/** Container of all local storage related keywords */
public class LocalStorageConstant {
  /* Make it noninstantiable with a default private constructor */
  private LocalStorageConstant() {}

  public static final String LOCALSTORAGE_PATH = "localstorage";
  public static final String TESTCASES_FOLDERNAME = "testcases";
  public static final String PYTHON_SCRIPTS_FOLDERNAME = "python_scripts";
  public static final String TESTCASES_TREE_FOLDERNAME = "testcases_tree";
  public static final String TEST_HISTORY_FOLDERNAME = "test_history";
  public static final String PROJECT_PATH_FOLDERNAME = "projects";
  public static final String DEFAULT_PROJECT_NAME = "uicd_default_project";
  public static final String EXPORT_FOLDERNAME = "export";
  public static final String ZIP_OUTPUT_FOLDERNAME = "zip_extra_tmp";
  public static final String ZIP_UPLOAD_FOLDERNAME = "zip_upload_tmp";
}
