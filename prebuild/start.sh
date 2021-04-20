#!/bin/bash

TAR_X20_DIR="/google/data/rw/teams/nuwa/release"

# Install absl module used by launch.py.
pip3 install absl-py

if [[ ! -f launch.py ]]; then
  echo "Downloading latest version launch.py from X20 dir..."
    cp -f $TAR_X20_DIR"/launch.py" .
fi

if [[ -z "$@" || "$@" == "--"* ]]; then
  python3 launch.py "$@"
else
  python3 launch.py --help
fi
