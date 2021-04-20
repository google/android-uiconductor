"""Util functions for logging."""
import datetime.datetime
import time

ONE_HOUR_IN_MINS = 60


def get_time():
  """Return current time in a String."""
  return datetime.now().strftime('%Y-%m-%d-%H-%M')


def record(start):
  """Return time elapsed from the start time parameter."""

  def get_hours(seconds):
    return int(seconds / (ONE_HOUR_IN_MINS * ONE_HOUR_IN_MINS))

  def get_minutes(seconds):
    return int(seconds / ONE_HOUR_IN_MINS) % ONE_HOUR_IN_MINS

  def get_seconds(seconds):
    return seconds % ONE_HOUR_IN_MINS

  seconds_elapsed = int(time.time() - start)
  return '{} hr {} min {} sec'.format(
      get_hours(seconds_elapsed), get_minutes(seconds_elapsed),
      get_seconds(seconds_elapsed))
