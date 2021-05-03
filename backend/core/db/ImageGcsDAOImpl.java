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

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

/** DAO for reference screenshot google cloud database */
public class ImageGcsDAOImpl implements ImageDAO {

  private static final String BUCKET_NAME = "image-dive-data";

  Storage storage = StorageOptions.getDefaultInstance().getService();

  @Override
  public byte[] getImage(String uuid) {
    Blob blob = storage.get(BlobId.of(BUCKET_NAME, uuid));
    return blob.getContent(Blob.BlobSourceOption.generationMatch());
  }

  @Override
  public boolean addImage(String uuid, byte[] image) {
    BlobId blobId = BlobId.of(BUCKET_NAME, uuid);
    BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("image/png").build();
    storage.create(blobInfo, image);
    return true;
  }

  @Override
  public boolean updateImage(String uuid, byte[] image) {
    return addImage(uuid, image);
  }

  @Override
  public boolean deleteImage(String uuid) {
    BlobId blobId = BlobId.of(BUCKET_NAME, uuid);
    return storage.delete(blobId);
  }
}
