"""Upload trained model weights to Google Cloud Storage."""
import argparse
import os
from google.cloud import storage

BUCKET_NAME = "image-validation"


def upload_blob(bucket_name, source_file_name, destination_blob_name=None):
  """Upload a file to the bucket."""
  if destination_blob_name is None:
    destination_blob_name = source_file_name
  storage_client = storage.Client()
  bucket = storage_client.get_bucket(bucket_name)
  blob = bucket.blob(destination_blob_name)
  blob.upload_from_filename(source_file_name)
  print("File {} uploaded to {}.".format(source_file_name,
                                         destination_blob_name))


def delete_blob(bucket_name, blob_name):
  """Delete a blob from the bucket."""
  storage_client = storage.Client()
  bucket = storage_client.get_bucket(bucket_name)
  blob = bucket.blob(blob_name)
  blob.delete()
  print("Blob {} deleted.".format(blob_name))


def make_blob_public(bucket_name, blob_name):
  """Make a blob publicly accessible."""
  storage_client = storage.Client()
  bucket = storage_client.get_bucket(bucket_name)
  blob = bucket.blob(blob_name)
  blob.make_public()
  print("Blob {} is publicly accessible at {}".format(blob.name,
                                                      blob.public_url))


if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("private_key", help="path to private key")
  parser.add_argument(
      "--outputs_dir",
      default="outputs",
      help="relative path to the weights directory")
  args = parser.parse_args()

  # Establish credentials.
  os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = args.private_key

  for root, dname, fnames in os.walk(args.outputs_dir):
    # Only upload files, not folders.
    if not dname:
      continue
    # Upload using the same file hierarchy as the original source.
    for fname in fnames:
      upload_blob(BUCKET_NAME, "{}/{}".format(root, fname),
                  "{}/{}".format(root, fname))
