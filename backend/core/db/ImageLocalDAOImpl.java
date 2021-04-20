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

package com.google.uicd.backend.core.db;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/** DAO for reference screenshot in local file system */
public class ImageLocalDAOImpl implements ImageDAO {


  protected Logger logger = LogManager.getLogManager().getLogger("uicd");
  private String baseDir;

  public void setBaseDir(String baseDir) {
    this.baseDir = baseDir;
  }

  @Override
  public byte[] getImage(String uuid) {
    File img = new File(Paths.get(baseDir, uuid).toString());
    if (img.exists()) {
      try {
        return Files.readAllBytes(img.toPath());
      } catch (IOException e) {
        logger.warning("Unable to retrieve image.");
        return new byte[0];
      }
    }
    return new byte[0];
  }

  @Override
  public boolean addImage(String uuid, byte[] image) {
    new File(baseDir).mkdirs();
    try (FileOutputStream fos = new FileOutputStream(Paths.get(baseDir, uuid).toString())) {
      fos.write(image);
    } catch (IOException e) {
      logger.warning("Unable to add image.");
      return false;
    }
    return true;
  }

  @Override
  public boolean updateImage(String uuid, byte[] image) {
    if (deleteImage(uuid)) {
      return addImage(uuid, image);
    }
    return false;
  }

  @Override
  public boolean deleteImage(String uuid) {
    File img = new File(Paths.get(baseDir, uuid).toString());
    return img.delete();
  }
}
