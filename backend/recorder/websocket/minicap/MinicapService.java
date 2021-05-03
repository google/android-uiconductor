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

package com.google.uicd.backend.recorder.websocket.minicap;

import com.google.common.base.Splitter;
import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.devicesdriver.DevicesDriverManager;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import com.google.uicd.backend.core.utils.ADBCommandLineUtil;
import com.google.uicd.backend.core.utils.AdbForward;
import com.google.uicd.backend.core.utils.UicdCoreDelegator;
import com.google.uicd.backend.recorder.websocket.minicap.exceptions.MinicapInstallException;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;
import java.util.logging.LogManager;
import java.util.logging.Logger;

public class MinicapService {
  public MinicapService(String deviceId, BlockingQueue<byte[]> imgQueue) {
    this.deviceId = deviceId;
    this.imgQueue = imgQueue;
    this.adbCommandLineUtil = new ADBCommandLineUtil();
    try {
      installMinicap(deviceId);
    } catch (MinicapInstallException e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
  }

  private static final String MINICAP_BIN = "minicap";
  private static final String REMOTE_PATH = "/data/local/tmp/minicap-devel";
  private static Logger logger = LogManager.getLogManager().getLogger("uicd");
  private String deviceId;

  private boolean running = false;
  // thread to start minicap
  private Thread minicapThread;
  private Thread dataReaderThread;
  private Thread imageParserThread;
  private Process scrcpyProcess;
  private AdbForward forward;

  private BlockingQueue<byte[]> dataQueue = new LinkedBlockingQueue<>();
  private BlockingQueue<byte[]> imgQueue;
  private Banner banner;
  private Socket minicapSocket;
  private final ADBCommandLineUtil adbCommandLineUtil;

  private static void installMinicap(String minicapDevice) throws MinicapInstallException {
    if (minicapDevice == null) {
      throw new MinicapInstallException("deviceId can't be null");
    }
  }

  /**
   * Usage: /data/local/tmp/minicap [-h] [-n <name>]
   *  -d <id>:       Display ID. (0)
   *  -n <name>:     Change the name of the abtract unix domain socket. (minicap)
   *  -P <value>:    Display projection (<w>x<h>@<w>x<h>/{0|90|180|270}).
   *  -Q <value>:    JPEG quality (0-100).
   *  -s:            Take a screenshot and output it to stdout. Needs -P.
   *  -S:            Skip frames when they cannot be consumed quickly enough.
   *  -t:            Attempt to get the capture method running, then exit.
   *  -i:            Get display information in JSON format. May segfault.
   */
  private static String getMinicapCommand(
      int ow, int oh, int dw, int dh, int rotate, boolean shipFrame, String name, String[] args) {
    ArrayList<String> commands = new ArrayList<>();
    commands.add(String.format("LD_LIBRARY_PATH=%s", REMOTE_PATH));
    commands.add(REMOTE_PATH + "/" + MINICAP_BIN);
    commands.add("-P");
    commands.add(String.format("%dx%d@%dx%d/%d", ow, oh, dw, dh, 0));
    commands.add("-n");
    commands.add(name);
    if (shipFrame) {
      commands.add("-S");
    }
    if (args != null) {
      for (String s : args) {
        commands.add(s);
      }
    }
    logger.info("rotate: " + rotate);
    return String.join(" ", commands);
  }

  private AdbForward createForward() {
    forward = generateForwardInfo();
    try {
      adbCommandLineUtil.executeAdb(
          String.format("adb forward tcp:%s localabstract:%s", forward.port(), "scrcpy"),
          forward.serialNumber());

    } catch (Exception e) {
      UicdCoreDelegator.getInstance().logException(e);
      System.out.println("create forward failed");
    }
    return forward;
  }

  /** Generate forward info */
  private AdbForward generateForwardInfo() {
    List<String> adbOutput = new ArrayList<>();
    try {
      adbCommandLineUtil.executeAdb("forward --list", deviceId, adbOutput);
    } catch (Exception e) {
      logger.warning("Error while getting forward list: " + e.getMessage());
    }
    int maxNumber = 0;
    for (String adbOutputLine : adbOutput) {
      // 64b2b4d9 tcp:555 localabstract:xxx
      AdbForward forward = AdbForward.create(adbOutputLine);
      if (forward.isForward() && forward.serialNumber().equals(deviceId)) {
        String l = forward.localAbstract();
        List<String> s = Splitter.on('_').splitToList(l);
        if (s.size() == 3) {
          int n = Integer.parseInt(s.get(2));
          if (n > maxNumber) {
            maxNumber = n;
          }
        }
      }
    }
    maxNumber += 1;

    String forwardStr = String.format("%s_cap_%d", deviceId, maxNumber);
    int freePort = DevicesDriverManager.getInstance().getDevice(deviceId).getMinicapHostPort();
    return AdbForward.create(deviceId, freePort, forwardStr);
  }

  public void reStart(int originalWidth, int originalHeight, final float scale, final int rotate) {
    running = false;
    if (minicapThread != null) {
      minicapThread.stop();
    }

    if (dataReaderThread != null) {
      try {
        dataReaderThread.join();
      } catch (InterruptedException e) {
        UicdCoreDelegator.getInstance().logException(e);
      }
    }

    if (imageParserThread != null) {
      try {
        imageParserThread.join();
      } catch (InterruptedException e) {
        UicdCoreDelegator.getInstance().logException(e);
      }
    }
    if (scrcpyProcess != null) {
      scrcpyProcess.destroy();
    }

    start(originalWidth, originalHeight, scale, rotate);
  }

  public void kill() {
    onClose();

    running = false;
    if (minicapThread != null) {
      minicapThread.stop();
    }

    // close socket
    if (minicapSocket != null && minicapSocket.isConnected()) {
      try {
        minicapSocket.close();
      } catch (IOException e) {
        UicdCoreDelegator.getInstance().logException(e);
      }
      minicapSocket = null;
    }

    if (dataReaderThread != null) {
      try {
        dataReaderThread.join();
      } catch (InterruptedException e) {
        UicdCoreDelegator.getInstance().logException(e);
      }
    }

    if (imageParserThread != null) {
      try {
        imageParserThread.join();
      } catch (InterruptedException e) {
        UicdCoreDelegator.getInstance().logException(e);
      }
    }

    if (scrcpyProcess != null) {
      scrcpyProcess.destroy();
    }
  }

  private void removeForward() {
    if (forward == null || !forward.isForward()) {
      return;
    }
    try {
      adbCommandLineUtil.executeAdb(
          String.format("adb forward --remove tcp:%s", forward.port()), forward.serialNumber());
      forward = null;
    } catch (Exception e) {
      UicdCoreDelegator.getInstance().logException(e);
    }
  }

  public void startScrcpy(int port, int targetHeight) {
    String forwardCmd = String.format("forward tcp:%s localabstract:scrcpy", port);
    String startCommand =
        String.format(
            "shell CLASSPATH=/data/local/tmp/scrcpy-server.apk app_process /"
                + " com.genymobile.scrcpy.Server 1.2.3_image INFO %d JPEG 80 0 - 0 false true",
            targetHeight);
    try {
      adbCommandLineUtil.executeAdb(forwardCmd, deviceId);
      scrcpyProcess = adbCommandLineUtil.executeAdb(startCommand, deviceId, false);
      // need wait 1 sec to make sure the server is fully started.
      Thread.sleep(Duration.ofSeconds(1).toMillis());
    } catch (UicdExternalCommandException | InterruptedException e) {
      UicdCoreDelegator.getInstance()
          .logException(new UicdException("Start scrcpy failed:" + e.getMessage()));
    }
  }

  public void start(int ow, int oh, int dw, int dh, int rotate, boolean shipFrame, String[] args) {
    if (UicdConfig.getInstance().isEnableMinicap()) {
      AdbForward forward = createForward();
      String command =
          getMinicapCommand(ow, oh, dw, dh, rotate, shipFrame, forward.localAbstract(), args);
      logger.info("start minicap:" + command);
      minicapThread = startMinicapThread(command);

      // consume data
      startInitialThread("127.0.0.1", forward.port());
      imageParserThread = startImageParserThread();
      logger.info("forward port:" + forward.port());
    } else {
      int hostScrcpyPort =
          DevicesDriverManager.getInstance().getDevice(deviceId).getMinicapHostPort();
      startScrcpy(hostScrcpyPort, dh);
      imageParserThread = startScrcpyImageParserThread(hostScrcpyPort);
      logger.info("forward port:" + hostScrcpyPort);
    }
  }


  public void start(int originalWidth, int originalHeight, final float scale, final int rotate) {
    start(
        originalWidth,
        originalHeight,
        (int) (originalWidth * scale),
        (int) (originalHeight * scale),
        rotate,
        true,
        null);
  }

  public Thread startScrcpyImageParserThread(int port) {
    Thread thread = new Thread(new ScrcpyParser(port));
    thread.start();
    return thread;
  }

  /**
   * start minicap thread
   *
   * @return Thread
   */
  private Thread startMinicapThread(final String shellCommand) {
    Thread thread =
        new Thread(
            () -> {
              try {
                adbCommandLineUtil.executeAdb(
                    "adb shell " + shellCommand, deviceId, false /* waitFor*/);
              } catch (Exception e) {
                UicdCoreDelegator.getInstance().logException(e);
              }
            });

    thread.start();
    return thread;
  }

  private Thread startInitialThread(final String host, final int port) {
    Thread thread =
        new Thread(
            () -> {
              try {
                byte[] bytes = null;
                int tryTime = 50;
                while (true) {
                  // connect to minicap service
                  minicapSocket = new Socket(host, port);
                  InputStream inputStream = minicapSocket.getInputStream();
                  // do we want to new everytime?
                  bytes = new byte[4096];
                  int n = inputStream.read(bytes);

                  if (n == -1) {
                    Thread.sleep(10);
                    minicapSocket.close();
                  } else {
                    // send bytes Dataparser
                    dataQueue.add(Arrays.copyOfRange(bytes, 0, n));
                    running = true;

                    // start DataReader  ImageParser
                    dataReaderThread = startDataReaderThread(minicapSocket);
                    imageParserThread = startImageParserThread();
                    break;
                  }

                  tryTime--;
                  if (tryTime == 0) {
                    break;
                  }
                }
              } catch (Exception e) {
                UicdCoreDelegator.getInstance().logException(e);
              }
            });
    thread.start();
    return thread;
  }

  private Thread startDataReaderThread(Socket minicapSocket) {
    Thread thread = new Thread(new DataReader(minicapSocket));
    thread.start();
    return thread;
  }

  private Thread startImageParserThread() {
    Thread thread = new Thread(new ImageParser());
    thread.start();
    return thread;
  }

  private void onClose() {
    removeForward();
  }

  private class DataReader implements Runnable {

    DataReader(Socket minicapSocket) {
      this.socket = minicapSocket;
      try {
        this.inputStream = minicapSocket.getInputStream();
      } catch (IOException e) {
        UicdCoreDelegator.getInstance().logException(e);
        onClose();
      }
    }

    static final int BUFF_SIZ = 4096;
    Socket socket = null;
    InputStream inputStream = null;
    long ts = 0;

    @Override
    public void run() {
      try {
        readData();
      } catch (IOException e) {
        logger.warning("minicap lost connection: " + e.getMessage());
        onClose();
      }
    }

    public void readData() throws IOException {
      DataInputStream stream = new DataInputStream(inputStream);
      while (running) {
        byte[] buffer = new byte[BUFF_SIZ];
        ts = System.currentTimeMillis();
        int len = stream.read(buffer);
        if (len == -1) {
          return;
        }
        if (len == BUFF_SIZ) {
          dataQueue.add(buffer);
        } else {
          dataQueue.add(subArray(buffer, 0, len));
        }
      }
    }
  }

  private class ScrcpyParser implements Runnable {
    private final int scrcpyPort;

    public ScrcpyParser(int port) {
      this.scrcpyPort = port;
    }

    @Override
    public void run() {
      Socket socket;
      InputStream socketInput = null;

      try {
        byte[] firstCharBuffer = new byte[1];
        // Metadata size is 68.
        byte[] metaDatabuffer = new byte[68];
        socket = new Socket("localhost", scrcpyPort);
        socketInput = socket.getInputStream();

        // try to read first char, then connect socket1.
        socketInput.read(firstCharBuffer);

        // Need second socket to connect to server for the control message, currently we are not
        // using it, but we still need connect.
        new Socket("localhost", scrcpyPort);
        socketInput.read(metaDatabuffer);

      } catch (IOException e) {
        logger.warning("Can not read first frame from scrcpy: " + e.getMessage());
        onClose();
      }

      byte[] headBuffer = new byte[20];
      byte[] frameSizeBuffer = new byte[4];
      while (true) {
        try {
          // first 20 bytes: width(4), height(4) image format(4), timestamp(8)
          socketInput.read(headBuffer);

          // frame size
          socketInput.read(frameSizeBuffer);

          int readsize = ByteBuffer.wrap(frameSizeBuffer).order(ByteOrder.BIG_ENDIAN).getInt();
          byte[] frameDataBuffer = new byte[readsize];
          int offset = 0;
          while (offset < readsize) {
            int realReadSize = socketInput.read(frameDataBuffer, offset, readsize - offset);
            offset += realReadSize;
          }
          imgQueue.add(frameDataBuffer);
        } catch (Exception e) {
          onClose();
          break;
        }
      }
    }
  }

  private class ImageParser implements Runnable {

    int readn = 0; // read size
    int bannerLen = 2; // banner info size
    int readFrameBytes = 0;
    int frameBodyLength = 0;
    byte[] frameBody = new byte[0];
    long t = 0;
    ////// banner
    int pid = 0;
    int realWidth = 0;
    int realHeight = 0;
    int virtualWidth = 0;
    int virtualHeight = 0;
    int orientation = 0;
    int quirks = 0;

    @Override
    public void run() {
      while (running) {
        try {
          banner = new Banner();
          readData();
        } catch (InterruptedException e) {
          System.out.println(e.getMessage());
          onClose();
        }
      }
    }

    void readData() throws InterruptedException {
      byte[] buffer = dataQueue.poll(5000, TimeUnit.MILLISECONDS);
      if (buffer == null) {
        return;
      }
      int length = buffer.length;
      for (int cursor = 0; cursor < length; ) {
        int ch = buffer[cursor] & 0xff;
        if (readn < bannerLen) {
          cursor = parserBanner(cursor, ch);
        } else if (readFrameBytes < 4) { // frame length
          frameBodyLength += (ch << (readFrameBytes * 8));
          cursor += 1;
          readFrameBytes += 1;
          if (readFrameBytes == 4) {
            t = System.currentTimeMillis();
          }
        } else {
          if (length - cursor >= frameBodyLength) {
            byte[] subByte = Arrays.copyOfRange(buffer, cursor, cursor + frameBodyLength);
            frameBody = mergeArray(frameBody, subByte);
            if ((frameBody[0] != -1) || frameBody[1] != -40) {
              System.out.println("Frame body does not start with JPG header");
              return;
            }
            byte[] finalBytes = Arrays.copyOfRange(frameBody, 0, frameBody.length);

            cursor += frameBodyLength;
            frameBodyLength = 0;
            readFrameBytes = 0;
            frameBody = new byte[0];
            imgQueue.add(finalBytes);
          } else {
            byte[] subByte = Arrays.copyOfRange(buffer, cursor, length);
            frameBody = mergeArray(frameBody, subByte);
            frameBodyLength -= (length - cursor);
            readFrameBytes += (length - cursor);
            cursor = length;
          }
        }
      }
    }

    int parserBanner(int cursor, int ch) {
      switch (cursor) {
        case 0:
          banner.setVersion(ch);
          break;
        case 1:
          bannerLen = ch;
          banner.setLength(bannerLen);
          break;
        case 2:
        case 3:
        case 4:
        case 5:
          {
            pid += (ch << ((readn - 2) * 8));
            if (cursor == 5) {
              banner.setPid(pid);
            }
            break;
          }
        case 6:
        case 7:
        case 8:
        case 9:
          {
            realWidth += (ch << ((readn - 6) * 8));
            if (cursor == 9) {
              banner.setReadWidth(realWidth);
            }
            break;
          }

        case 10:
        case 11:
        case 12:
        case 13:
          realHeight += (ch << ((readn - 10) * 8));
          if (cursor == 13) {
            banner.setReadHeight(realHeight);
          }
          break;
        case 14:
        case 15:
        case 16:
        case 17:
          virtualWidth += (ch << ((readn - 14) * 8));
          if (cursor == 17) {
            banner.setVirtualWidth(virtualWidth);
          }
          break;
        case 18:
        case 19:
        case 20:
        case 21:
          virtualHeight += (ch << ((readn - 18) * 8));
          if (cursor == 21) {
            banner.setVirtualHeight(virtualHeight);
          }
          break;
        case 22:
          orientation = ch * 90;
          banner.setOrientation(orientation);
          break;
        case 23:
          quirks = ch;
          banner.setQuirks(quirks);
          break;
      }
      ++readn;
      ++cursor;
      return cursor;
    }
  }

  private static byte[] subArray(byte[] byte1, int start, int end) {
    byte[] byte2 = new byte[end - start];
    System.arraycopy(byte1, start, byte2, 0, end - start);
    return byte2;
  }

  private static byte[] mergeArray(byte[] a1, byte[] a2) {
    byte[] arr = Arrays.copyOf(a1, a1.length + a2.length);
    System.arraycopy(a2, 0, arr, a1.length, a2.length);
    return arr;
  }
}
