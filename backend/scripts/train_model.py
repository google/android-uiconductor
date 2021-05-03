"""Train the model for classifying screenshots to two classes."""
import argparse
import os
import time
from tensorflow.compat.v1.keras import backend as K
from tensorflow.compat.v1.keras.callbacks import ModelCheckpoint
from tensorflow.compat.v1.keras.layers import Activation
from tensorflow.compat.v1.keras.layers import Conv2D
from tensorflow.compat.v1.keras.layers import Dense
from tensorflow.compat.v1.keras.layers import Dropout
from tensorflow.compat.v1.keras.layers import Flatten
from tensorflow.compat.v1.keras.layers import MaxPooling2D
from tensorflow.compat.v1.keras.models import Sequential
from tensorflow.compat.v1.keras.preprocessing.image import ImageDataGenerator
import util

# Choose the parameters to be used for the model.
EPOCHS = 20
BATCH_SIZE = 32
VALIDATION_SPLIT = .2
LEARNING_RATE = 0.001
DATA_DIR = './data'
OUTPUT_DIR = 'outputs'

ASTERISK_FLAG = '**************************************************************'

# Rescale image dimensions. Note that larger dimensions require more memory.
img_width = 250
img_height = 250

# pick number of samples to get using data augmentation
nb_train_samples = 2000
nb_validation_samples = 800


def main(weights=None,
         epochs=EPOCHS,
         batch_size=BATCH_SIZE,
         validation_split=VALIDATION_SPLIT,
         data_dir=DATA_DIR):
  """Train the model using provided parameters."""
  print(ASTERISK_FLAG)
  print('\tepochs: {}, batch_size: {}, validation_split: {}'.format(
      epochs, batch_size, validation_split))
  model = get_seq_model()

  # Load weights, if provided.
  print()
  if weights:
    print('\tloading previous weights...')
    print('\t(loading {}...)'.format(weights))
    start_loading = time.time()
    model.load_weights(weights)
    print('\tdone in {}!'.format(util.record(start_loading)))
  else:
    print('\tno previous weights to load...')

  print(ASTERISK_FLAG)
  print('\tinitializing image data generators...')
  # Initialize image data generators for data augmentation.
  datagen = ImageDataGenerator(
      rescale=1. / 255,
      rotation_range=40,
      width_shift_range=0.2,
      height_shift_range=0.2,
      shear_range=0.2,
      zoom_range=0.2,
      horizontal_flip=True,
      validation_split=VALIDATION_SPLIT,
      fill_mode='nearest')

  train_generator = datagen.flow_from_directory(
      data_dir,
      target_size=(img_width, img_height),
      batch_size=batch_size,
      class_mode='categorical',
      subset='training')

  validation_generator = datagen.flow_from_directory(
      data_dir,
      target_size=(img_width, img_height),
      batch_size=batch_size,
      class_mode='categorical',
      subset='validation')

  print(ASTERISK_FLAG)
  # Create directory for containing the trained weights.
  custom_dirname = '{}/{}_epoch-{}_batch-{}_split-{}/'.format(
      OUTPUT_DIR, util.get_time(), epochs, batch_size,
      int(100 * validation_split))
  os.makedirs(os.path.dirname(custom_dirname))

  # Record weights to this checkpoint when loss is decreased.
  checkpointer = ModelCheckpoint(
      filepath=custom_dirname + 'weights.{epoch:02d}-{val_loss:.2f}.hdf5',
      verbose=1,
      save_best_only=True)

  model.fit_generator(
      train_generator,
      shuffle=True,
      steps_per_epoch=nb_train_samples // batch_size,
      validation_data=validation_generator,
      validation_steps=nb_validation_samples // batch_size,
      epochs=epochs,
      callbacks=[checkpointer])


def get_seq_model():
  """Define three channel input shape depending on image data format."""
  if K.image_data_format() == 'channels_first':
    input_shape = (3, img_width, img_height)
  else:
    input_shape = (img_width, img_height, 3)

  # Initialize CNN by creating a sequential model.
  model = Sequential()
  model.add(Conv2D(32, (3, 3), input_shape=input_shape))
  model.add(Activation('relu'))
  model.add(MaxPooling2D(pool_size=(2, 2)))

  model.add(Conv2D(32, (3, 3)))
  model.add(Activation('relu'))
  model.add(MaxPooling2D(pool_size=(2, 2)))

  model.add(Conv2D(64, (3, 3)))
  model.add(Activation('relu'))
  model.add(MaxPooling2D(pool_size=(2, 2)))

  model.add(Flatten())
  model.add(Dense(64))
  model.add(Activation('relu'))
  model.add(Dropout(0.5))
  model.add(Dense(2))
  model.add(Activation('sigmoid'))

  model.compile(
      loss='binary_crossentropy', optimizer='rmsprop', metrics=['accuracy'])

  return model


if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument('--data_dir', default=DATA_DIR, help='./data by default')
  parser.add_argument('--weights')
  parser.add_argument('--epochs', type=int, default=EPOCHS)
  parser.add_argument('--batch_size', type=int, default=BATCH_SIZE)
  parser.add_argument('--split', type=float, default=VALIDATION_SPLIT)
  parser.add_argument('--lr', type=float, default=LEARNING_RATE)
  parser.add_argument('--E', action='store_true', help='evaluate')

  args = parser.parse_args()

  main(
      weights=args.weights,
      epochs=args.epochs,
      batch_size=args.batch_size,
      validation_split=args.split,
      data_dir=args.data_dir)
