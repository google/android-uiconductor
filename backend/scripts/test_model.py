"""Predict the class for a given image using a trained model."""
import argparse
import os
from keras.preprocessing.image import img_to_array
from keras.preprocessing.image import load_img
import train_model
import util
from google.cloud import storage

BUCKET_NAME = "image-validation"


def reshape_image(img_inp):
  """Reshape the input image to a trainable dimension."""
  img_temp = img_to_array(img_inp)
  return img_temp.reshape((1,) + img_temp.shape)


def download_blob(bucket_name, source_blob_name, destination_file_name):
  """Download a blob from the bucket."""
  storage_client = storage.Client()
  bucket = storage_client.get_bucket(bucket_name)
  blob = bucket.blob(source_blob_name)
  blob.download_to_filename(destination_file_name)


if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument(
      "weights_path", help="path to hdf5 file to download from gcp")
  parser.add_argument("image_path", help="path to image file to validate")
  parser.add_argument("private_key", help="path to private key")
  args = parser.parse_args()

  # Establish credentials.
  os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = args.private_key

  # Download the requested weights file.
  temp_weights = util.get_time() + "-" + args.weights_path.split("/")[-1]
  download_blob(BUCKET_NAME, args.weights_path, temp_weights)

  # Must ensure that the weights file and the model have matching dimensions.
  model = train_model.get_seq_model()
  model.load_weights(temp_weights)

  loaded_img = load_img(
      args.image_path,
      target_size=(train_model.img_width, train_model.img_height))

  # Predict class using the finalized classification model.
  # The call to model.predict() returns a list of a single list.
  for prediction in model.predict(reshape_image(loaded_img))[0]:
    # Print the prediction value, each of which is between 0 and 1.
    # This printed value is read and parsed in MLImageValidationAction.java.
    print(prediction)
  os.remove(temp_weights)
