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

import com.google.uicd.backend.core.config.UicdConfig;

/**
 * ImageStorageManager manages the use of different ImageDAO implementations depending on the
 * UicdConfig
 */
public class ImageStorageManager {
  private static ImageStorageManager imgStorageMgr;
  private static final UicdConfig uicdCfg = UicdConfig.getInstance();
  private static ImageDAO imgDao;

  private ImageStorageManager() {}

  public static ImageStorageManager getInstance() {
    if (imgStorageMgr == null) {
      imgStorageMgr = new ImageStorageManager();
      if (uicdCfg.getReferenceImageStorage().equals("gcs")) {
        imgDao = new ImageGcsDAOImpl();
      } else {
        ImageLocalDAOImpl imgLocalDao = new ImageLocalDAOImpl();
        imgLocalDao.setBaseDir(uicdCfg.getTestInputFolder());
        imgDao = imgLocalDao;
      }
    }
    return imgStorageMgr;
  }

  public byte[] getImage(String uuid) {
    return imgDao.getImage(uuid);
  }

  public boolean addImage(String uuid, byte[] image) {
    return imgDao.addImage(uuid, image);
  }

  public boolean updateImage(String uuid, byte[] image) {
    return imgDao.updateImage(uuid, image);
  }

  public boolean deleteImage(String uuid) {
    return imgDao.deleteImage(uuid);
  }
}
