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

package com.google.uicd.backend.core.utils;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.uicd.backend.core.exceptions.UicdExternalCommandException;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/**
 * Service class for starting RPC server on the Android device remotely, sending RPC requests and
 * calling the installed snippets (wrapped Java APIs)
 */
public class UicdSnippetClientDriver {
  private static final String INSTRUMENTATION_RUNNER_PACKAGE =
      "com.google.android.mobly.snippet.SnippetRunner";
  private static final String START_SERVER_COMMAND =
      "shell setsid am instrument -w -e action start %s/" + INSTRUMENTATION_RUNNER_PACKAGE;
  private static final String STOP_SERVER_COMMAND =
      "shell am instrument -w -e action stop %s/" + INSTRUMENTATION_RUNNER_PACKAGE;
  private static final String SNIPPET_PROTOCOL_LINE = "SNIPPET START, PROTOCOL 1 ";
  private static final String SNIPPET_PORT_LINE = "SNIPPET SERVING, PORT ";
  private static final String CONNECTION_REQUEST = "{\"cmd\": \"initiate\", \"uid\": %d}";
  private static final String LOCAL_HOST = "localhost";
  private static final String RPC_REQUEST_TEMPLATE = "{\"id\": %d, \"method\": %s, \"params\": %s}";
  private static final String STOP_SERVER_SUCCESS_LOG = "\"OK (0 tests)\"";
  private static final String SEND_REQUEST_FAILURE = "Failed to send the request.";
  private static final String SEND_REQUEST_SUCCESS = "Succeed to send the request.";
  private static final String RECEIVE_RESPONSE_FAILURE = "Failed to send the request.";
  private static final Logger logger = LogManager.getLogManager().getLogger("uicd");

  private final String deviceId;
  private int devicePort;
  private final int hostPort;
  private int idCounter = 0;
  private final String packageName;
  private PrintWriter printWriter;
  private Socket rpcClientSocket;
  private Process serverApkProcess;
  private final long timeout;
  private int uid = -1;
  private final ADBCommandLineUtil adbCommandLineUtil;

  /**
   * @param packageName: package name in full
   * @param deviceId: Android device id
   * @param timeout: waiting timeout for the response
   */
  public UicdSnippetClientDriver(String packageName, String deviceId, int hostPort, long timeout) {
    this.packageName = packageName;
    this.deviceId = deviceId;
    this.hostPort = hostPort;
    this.timeout = timeout;
    this.adbCommandLineUtil = new ADBCommandLineUtil();
  }

  public UicdSnippetClientDriver(String packageName, String deviceId, int hostPort) {
    this(packageName, deviceId, hostPort, 5000);
  }

  /**
   * Start the RPC server process on Android device and set up the socket connection through ADB
   * forwarding.
   *
   * @return boolean indicating the success/failure to start and connect
   */
  public boolean startAppAndConnect() throws UicdExternalCommandException {
    // launch server
    String launchServerCommand = String.format(START_SERVER_COMMAND, packageName);
    List<String> launchOutput = new ArrayList<>();
    logger.info(String.format("Launch snippet apk %s.", packageName));
    serverApkProcess = adbCommandLineUtil.executeAdb(launchServerCommand, deviceId, launchOutput);

    // check the main version of snippet protocol. It should be '1'.
    if (launchOutput.size() != 2
        || !launchOutput.get(0).startsWith(SNIPPET_PROTOCOL_LINE)
        || !launchOutput.get(1).startsWith(SNIPPET_PORT_LINE)) {
      logger.warning("Failed to launch snippet server, output: \n" + launchOutput);
      disconnect();
      return false;
    }

    // get ports for forwarding
    devicePort = Integer.parseInt(launchOutput.get(1).substring(SNIPPET_PORT_LINE.length()));

    // set up forwarding path from localhost to Android device through ADB
    try {
      adbCommandLineUtil.executeAdb(
          String.format("adb forward tcp:%s tcp:%s", hostPort, devicePort), deviceId);
    } catch (Exception e) {
      logger.warning("Failed to set up port forwarding for snippet server: \n" + e.getMessage());
      disconnect();
      return false;
    }

    // try to send connection request from localhost port
    return connect(LOCAL_HOST, hostPort);
  }

  /**
   * Set up the RPC client socket, send the initialization request and get the status.
   *
   * @param host: host address, usually localhost
   * @param hostPort: port number of the host
   */
  private boolean connect(String host, int hostPort) throws UicdExternalCommandException {
    // set up the socket and send initialization request
    try {
      rpcClientSocket = new Socket(host, hostPort);
      printWriter =
          new PrintWriter(
              new BufferedWriter(new OutputStreamWriter(rpcClientSocket.getOutputStream(), UTF_8)));
      String data = String.format(CONNECTION_REQUEST, uid);
      String sendResult = send(data);
      if (sendResult.equals(SEND_REQUEST_FAILURE)) {
        logger.warning(sendResult);
        return false;
      }
      String receiveResponse = receive();
      if (receiveResponse.equals(RECEIVE_RESPONSE_FAILURE)) {
        logger.warning(receiveResponse);
        return false;
      }
      Map<String, Object> jsonMap = parseJsonData(receiveResponse);
      if ((boolean) jsonMap.get("status")) {
        uid = (int) jsonMap.get("uid");
      } else {
        uid = -1;
      }
    } catch (Exception e) {
      logger.warning("Connection failure: " + e.getMessage());
      disconnect();
      return false;
    }
    logger.info(String.format("Snippet %s started on host port %d", packageName, hostPort));
    return true;
  }

  /**
   * Send the request onto certain RPC socket.
   *
   * @param data: the request message which has already wrapped all the information according to the
   *     RPC format
   * @return the original response message received after the request
   */
  private String send(String data) {
    try {
      if (rpcClientSocket != null && rpcClientSocket.isConnected()) {
        printWriter.write(data + '\n');
        printWriter.flush();
        return SEND_REQUEST_SUCCESS;
      }
    } catch (Exception e) {
      logger.warning("Send request failure: " + e.getMessage());
    }
    return SEND_REQUEST_FAILURE;
  }

  /**
   * Get the response message from server using input stream reader. (Only one line per request) Use
   * the timeout to wait for the message until it runs out of time.-
   *
   * @return the original response message received after the request
   */
  private String receive() {
    try {
      long startTime = System.currentTimeMillis();
      long elapsedTime = 0L;

      while (elapsedTime < timeout) {
        if (rpcClientSocket != null && rpcClientSocket.isConnected()) {
          BufferedReader br =
              new BufferedReader(new InputStreamReader(rpcClientSocket.getInputStream(), UTF_8));
          String response = br.readLine();
          if (response != null) {
            return response;
          }
        }
        elapsedTime = System.currentTimeMillis() - startTime;
      }
      logger.warning("Timeout while waiting for response.");
    } catch (Exception e) {
      logger.warning("Receive response failure: " + e.getMessage());
    }
    return RECEIVE_RESPONSE_FAILURE;
  }

  /**
   * Send the RPC request with all the arguments required to execute an operation.
   *
   * @param method: the method name under the current package
   * @param arguments: the list of arguments required by the method, separated by ','
   * @return the "result" field of the response message received if we finish sending and receiving
   *     process
   */
  @SuppressWarnings("unchecked")
  public Optional<String> sendRpcRequest(String method, String arguments) {
    int requestId = idCounter++;
    /**
     * Links for reference:
     *
     * <p>https://g3doc.corp.google.com/codelab/mobly/g3doc/snippet.md?cl=head
     * https://cs.corp.google.com/piper///depot/google3/third_party/py/mobly/controllers/android_device_lib/jsonrpc_client_base.py?rcl=212204422&l=298
     */
    String rpcRequestData = String.format(RPC_REQUEST_TEMPLATE, requestId, method, arguments);
    String sendResult = send(rpcRequestData);
    if (sendResult.equals(SEND_REQUEST_FAILURE)) {
      logger.warning(sendResult);
      return Optional.empty();
    }
    String receiveResponse = receive();
    if (receiveResponse.equals(RECEIVE_RESPONSE_FAILURE)) {
      logger.warning(receiveResponse);
      return Optional.empty();
    }
    // conversion is safe here
    // Response message example: {"error": null, "id": 1, "result": null / "foo5"}
    Map<String, Object> jsonMap = parseJsonData(receiveResponse);
    if (jsonMap.get("error") != null) {
      logger.warning("The RPC method request has some problem: " + jsonMap.get("error"));
      return Optional.empty();
    }
    if ((int) jsonMap.get("id") != requestId) {
      logger.warning(
          String.format(
              "The response ID %s mismatches with the request ID %d.",
              jsonMap.get("id"), requestId));
    }
    return Optional.of(jsonMap.get("result").toString());
  }

  @SuppressWarnings("unchecked")
  private Map<String, Object> parseJsonData(String data) {
    byte[] mapData = data.getBytes(UTF_8);
    Map<String, Object> map = new HashMap<>();
    ObjectMapper objectMapper = new ObjectMapper();

    try {
      // conversion is safe here
      map = objectMapper.readValue(mapData, HashMap.class);
    } catch (IOException e) {
      logger.warning(e.getMessage());
    }
    return map;
  }

  /**
   * Clean everything up. Close the socket, stop the server process both on localhost and RPC, and
   * remove the ADB forwarding path.
   */
  public void disconnect() throws UicdExternalCommandException {
    // close the socket and remove
    if (rpcClientSocket != null && rpcClientSocket.isConnected()) {
      try {
        rpcClientSocket.close();
      } catch (IOException e) {
        UicdCoreDelegator.getInstance().logException(e);
        logger.warning(e.getMessage());
      }
      rpcClientSocket = null;
    }

    // stop the server process locally
    if (serverApkProcess != null) {
      serverApkProcess.destroy();
      serverApkProcess = null;
    }

    // stop the RPC server remotely
    List<String> stopCommandOutput = new ArrayList<>();
    adbCommandLineUtil.executeAdb(
        String.format(STOP_SERVER_COMMAND, packageName), deviceId, stopCommandOutput);
    boolean isStop = false;
    for (String line : stopCommandOutput) {
      if (line.equals(STOP_SERVER_SUCCESS_LOG)) {
        isStop = true;
        break;
      }
    }
    if (!isStop) {
      logger.warning(
          String.format(
              "Failed to stop existing apk. Unexpected output: %s",
              String.join(" ", stopCommandOutput)));
    }

    // remove the ADB forwarding path
    adbCommandLineUtil.removePortForwarding(deviceId, hostPort);
  }
}
