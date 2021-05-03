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

package com.google.uicd.backend.recorder.services;

import com.google.uicd.backend.core.config.UicdConfig;
import com.google.uicd.backend.core.constants.ActionType;
import com.google.uicd.backend.core.constants.LocalStorageConstant;
import com.google.uicd.backend.core.db.ActionEntity;
import com.google.uicd.backend.core.exceptions.UicdActionException;
import com.google.uicd.backend.core.exceptions.UicdException;
import com.google.uicd.backend.core.recorder.utils.ActionEntityFileUtil;
import com.google.uicd.backend.core.uicdactions.BaseAction;
import com.google.uicd.backend.core.uicdactions.ClickAction;
import com.google.uicd.backend.core.uicdactions.CompoundAction;
import com.google.uicd.backend.core.uicdactions.DragAction;
import com.google.uicd.backend.core.uicdactions.LongClickAction;
import com.google.uicd.backend.core.uicdactions.PythonScriptAction;
import com.google.uicd.backend.core.uicdactions.ScreenContentValidationAction;
import com.google.uicd.backend.core.uicdactions.SwipeAction;
import com.google.uicd.backend.core.xmlparser.NodeContext;
import com.google.uicd.backend.recorder.db.DbActionStorageManager;
import com.google.uicd.backend.recorder.db.DbTestCaseTreeStorageManager;
import com.google.uicd.backend.recorder.db.TestCaseTreeEntity;
import com.google.uicd.backend.recorder.utils.TestCaseTreeFileUtil;
import com.google.uicd.backend.recorder.workflowmgr.WorkflowManager;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import net.lingala.zip4j.ZipFile;
import net.lingala.zip4j.exception.ZipException;
import net.lingala.zip4j.model.ZipParameters;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

/** Implements the import/export test case logic */
@Service
public class TestCasesImportExportManager {

  @Autowired private ApplicationContext applicationContext;

  @Autowired private DbTestCaseTreeStorageManager testCaseTreeStorageManager;

  @Autowired private DbActionStorageManager actionStorageManager;

  @Autowired private WorkflowManager workflowManager;

  public void unzipAndImport(File zipFile, String projectId) throws UicdException {
    Path tmpFolderPath = getZipTmpFolderPath(projectId);
    try {
      FileUtils.forceMkdir(tmpFolderPath.toFile());
      FileUtils.cleanDirectory(tmpFolderPath.toFile());
      new ZipFile(zipFile).extractAll(tmpFolderPath.toString());
    } catch (IOException e) {
      throw new UicdException("Can not unzip file.");
    }
    List<ActionEntity> actionEntities =
        ActionEntityFileUtil.loadTestCases(
            Paths.get(tmpFolderPath.toString(), LocalStorageConstant.TESTCASES_FOLDERNAME));
    Optional<TestCaseTreeEntity> testCaseTreeEntityOptional =
        TestCaseTreeFileUtil.loadTestTreeFromFolder(
            Paths.get(tmpFolderPath.toString(), LocalStorageConstant.TESTCASES_TREE_FOLDERNAME));

    if (!testCaseTreeEntityOptional.isPresent()) {
      throw new UicdException("Can not find test case tree, export failed.");
    }

    TestCaseTreeEntity testCaseTreeEntity = testCaseTreeEntityOptional.get();
    refurbishEntities(actionEntities, testCaseTreeEntity, /* ignoreTestTreeId */ false);

    Optional<TestCaseTreeEntity> testCaseTreeEntityImported =
        testCaseTreeStorageManager.getFirstTreeByProjectId(projectId);
    if (!testCaseTreeEntityImported.isPresent()) {
      throw new UicdException("Can not find projectId:" + projectId);
    }
    testCaseTreeEntityImported.get().setTreeDetails(testCaseTreeEntity.getTreeDetails());

    testCaseTreeStorageManager.save(testCaseTreeEntityImported.get());

    // ActionEntities are managed by jpa, need do converting here, so that we don't need detach the
    // Object
    actionStorageManager.saveActions(
        actionEntities.stream()
            .map(item -> BaseAction.fromJson(item.getDetails()))
            .collect(Collectors.toList()));

    // Need invalid cache to make sure
    actionStorageManager.clearCache();
  }

  public boolean hasPermissionToSoftCopy(BaseAction baseAction) {
    String currentUser = UicdConfig.getInstance().getCurrentUser();
    String shareWith = baseAction.getShareWith();
    List<String> shareWithList = Arrays.asList(shareWith.split(","));
    if (shareWithList.contains(currentUser) || baseAction.getCreatedBy().equals(currentUser)) {
      return true;
    }
    return false;
  }

  public String deepImportAction(String actionId) throws UicdActionException {
    List<ActionEntity> originalActionEntities = new ArrayList<>();
    List<BaseAction> pythonActionList = new ArrayList<>();
    fetchActionRecursively(actionId, originalActionEntities, pythonActionList);
    HashMap<String, String> actionIdMapping = new HashMap<>();
    refurbishActionEntities(originalActionEntities, actionIdMapping);

    // ActionEntities are managed by jpa, need do converting here, so that we don't need detach the
    // Object
    actionStorageManager.saveActions(
        originalActionEntities.stream()
            .map(item -> BaseAction.fromJson(item.getDetails()))
            .collect(Collectors.toList()));
    actionStorageManager.clearCache();
    return actionIdMapping.get(actionId);
  }

  public ZipFile zipAndExportTopLevelCaseOnly(
      String projectId, String projectName, String zipFileName) throws UicdException {
    if (zipFileName.isEmpty()) {
      zipFileName = projectName + ".zip";
    }
    Path zipFileFullPath = getZipFullPath(projectId, zipFileName);
    Path tmpFolderPath = getZipTmpFolderPath(projectId);
    // Clean tmp folder first, make sure it is a clean export
    prepareTmpFolderForZip(zipFileFullPath, tmpFolderPath);
    Optional<TestCaseTreeEntity> testCaseTreeEntityOptional =
        testCaseTreeStorageManager.getFirstTreeByProjectId(projectId);

    if (!testCaseTreeEntityOptional.isPresent()) {
      throw new UicdException("Can not get current tree!");
    }
    List<ActionEntity> topLevelTests = new ArrayList<>();
    final List<String> actionIdList =
        getActionListFromTreeDetails(testCaseTreeEntityOptional.get().getTreeDetails());
    for (String actionId : actionIdList) {
      Optional<String> actionStrOptional = workflowManager.getWorkflow(actionId);
      if (actionStrOptional.isPresent()) {
        BaseAction action = BaseAction.fromJson(actionStrOptional.get());
        if (action.getActionType() == ActionType.COMPOUND_ACTION) {
          CompoundAction compoundAction = (CompoundAction) action;
          if (compoundAction.isTopLevelWorkflow()) {
            topLevelTests.add(new ActionEntity(action, true));
          }
        }
      }
    }

    ActionEntityFileUtil.saveTestCases(topLevelTests, tmpFolderPath);
    return genZipFile(zipFileFullPath, tmpFolderPath);
  }

  private ZipFile genZipFile(Path zipFileFullPath, Path tmpFolderPath) throws UicdException {
    try {
      ZipParameters zipParameters = new ZipParameters();
      zipParameters.setIncludeRootFolder(false);
      if (zipFileFullPath.toFile().exists()) {
        FileUtils.forceDelete(zipFileFullPath.toFile());
      }

      ZipFile zipFile = new ZipFile(zipFileFullPath.toString());
      zipFile.addFolder(new File(tmpFolderPath.toString()), zipParameters);
      return zipFile;
    } catch (ZipException e) {
      throw new UicdException("Can not zip files." + e.getMessage());
    } catch (IOException e) {
      throw new UicdException("Can not delete old zip files." + e.getMessage());
    }
  }

  public ZipFile zipAndExport(String projectId, String projectName, String zipFileName)
      throws UicdException {
    if (zipFileName.isEmpty()) {
      zipFileName = projectName + ".zip";
    }
    Path zipFileFullPath = getZipFullPath(projectId, zipFileName);
    Path tmpFolderPath = getZipTmpFolderPath(projectId);
    // Clean tmp folder first, make sure it is a clean export
    prepareTmpFolderForZip(zipFileFullPath, tmpFolderPath);
    Optional<TestCaseTreeEntity> testCaseTreeEntityOptional =
        testCaseTreeStorageManager.getFirstTreeByProjectId(projectId);

    if (!testCaseTreeEntityOptional.isPresent()) {
      throw new UicdException("Can not get current tree!");
    }
    List<ActionEntity> actionEntities = new ArrayList<>();
    final List<String> actionIdList =
        getActionListFromTreeDetails(testCaseTreeEntityOptional.get().getTreeDetails());
    List<BaseAction> pythonActionList = new ArrayList<>();
    for (String actionId : actionIdList) {
      fetchActionRecursively(actionId, actionEntities, pythonActionList);
    }

    // Save actions to folder
    ActionEntityFileUtil.saveTestCases(
        actionEntities,
        Paths.get(tmpFolderPath.toString(), LocalStorageConstant.TESTCASES_FOLDERNAME));

    for (BaseAction pyAction : pythonActionList) {
      if (pyAction.getActionType() == ActionType.PYTHON_SCRIPT_ACTION) {
        PythonScriptAction pythonScriptAction = (PythonScriptAction) pyAction;
        ActionEntityFileUtil.saveToFile(
            pythonScriptAction.script,
            Paths.get(tmpFolderPath.toString(), LocalStorageConstant.PYTHON_SCRIPTS_FOLDERNAME)
                .toString(),
            String.format(
                "%s_%s.py",
                pythonScriptAction.getName(),
                pythonScriptAction.getActionId().toString().substring(0, 6)));
      }
    }
    // Save tree to folder
    TestCaseTreeFileUtil.saveTestTree(
        testCaseTreeEntityOptional.get(),
        Paths.get(tmpFolderPath.toString(), LocalStorageConstant.TESTCASES_TREE_FOLDERNAME));

    return genZipFile(zipFileFullPath, tmpFolderPath);
  }

  private void prepareTmpFolderForZip(Path zipFileFullPath, Path tmpFolderPath)
      throws UicdException {
    try {
      FileUtils.forceMkdir(tmpFolderPath.toFile());
      FileUtils.forceMkdir(zipFileFullPath.getParent().toFile());
      FileUtils.cleanDirectory(tmpFolderPath.toFile());
    } catch (IOException e) {
      throw new UicdException("Can not clean tmp folder." + e.getMessage());
    }
  }

  /**
   * Deep copy the tree and related actions when user try to import project from another user. In
   * Uicd actions are linked by its action id, we need find every actionId recursively on both the
   * testcase tree and in the action table/file. Re-mapping to new uuid and save to
   * database/filesystem.
   *
   * @param srcProjectId
   * @param targetProjectId
   * @throws UicdException
   */
  public void copyTree(String srcProjectId, String targetProjectId) throws UicdException {
    Optional<TestCaseTreeEntity> srcProjectTestCaseTree =
        testCaseTreeStorageManager.getFirstTreeByProjectId(srcProjectId);
    String treeDetails = srcProjectTestCaseTree.get().getTreeDetails();
    final List<String> actionIdList = getActionListFromTreeDetails(treeDetails);

    Optional<TestCaseTreeEntity> srcTestCaseTreeEntityOptional =
        testCaseTreeStorageManager.getFirstTreeByProjectId(srcProjectId);
    Optional<TestCaseTreeEntity> targetTestCaseTreeEntityOptional =
        testCaseTreeStorageManager.getFirstTreeByProjectId(targetProjectId);
    if (!srcTestCaseTreeEntityOptional.isPresent()
        || !targetTestCaseTreeEntityOptional.isPresent()) {
      throw new UicdException("Can not find test tree.");
    }
    targetTestCaseTreeEntityOptional.get().setTreeDetails(treeDetails);

    List<ActionEntity> originalActionEntities = new ArrayList<>();
    List<BaseAction> pythonActionList = new ArrayList<>();
    for (String actionId : actionIdList) {
      fetchActionRecursively(actionId, originalActionEntities, pythonActionList);
    }

    /* clone the entities, otherwise entities are still in the attached state */
    List<ActionEntity> copiedActionEntities = cloneActionEntities(originalActionEntities);
    refurbishEntities(
        copiedActionEntities, targetTestCaseTreeEntityOptional.get(), /* ignoreTestTreeId */ true);
    actionStorageManager.saveActions(convertActionEntityListToActionList(copiedActionEntities));

    testCaseTreeStorageManager.save(targetTestCaseTreeEntityOptional.get());
    // Need clear cache, to make sure it will reload from db, otherwise, the compound action doesn't
    // have the child instance.
    actionStorageManager.clearCache();
  }

  private Path getZipFullPath(String projectId, String zipFileName) {

    return Paths.get(
        UicdConfig.getInstance().getBaseFolder(),
        LocalStorageConstant.EXPORT_FOLDERNAME,
        projectId,
        zipFileName);
  }

  private Path getImportZipFullPath(String zipFileName) {
    return Paths.get(
        UicdConfig.getInstance().getBaseFolder(),
        LocalStorageConstant.ZIP_UPLOAD_FOLDERNAME,
        zipFileName);
  }

  private Path getZipTmpFolderPath(String projectId) {
    return Paths.get(
        UicdConfig.getInstance().getBaseFolder(),
        LocalStorageConstant.EXPORT_FOLDERNAME,
        projectId,
        LocalStorageConstant.ZIP_OUTPUT_FOLDERNAME);
  }

  private List<String> getActionListFromTreeDetails(String treeDetails) {
    // This regex will extra actionId from something like this:
    // "additionalData":["c29e660d-a490-4640-904a-2b504cc6794f"]
    // Original regex pattern: \"additionalData\"\:\[\"([^\]]+)\"\]
    final String regex = "\\\"additionalData\\\"\\:\\[\\\"([^\\]]+)\\\"\\]";

    final Matcher m = Pattern.compile(regex).matcher(treeDetails);

    final List<String> actionIdList = new ArrayList<>();
    while (m.find()) {
      actionIdList.add(m.group(1));
    }
    return actionIdList;
  }

  private List<ActionEntity> convertActionListToActionEntityList(List<BaseAction> baseActionList) {
    return baseActionList.stream()
        .map(action -> new ActionEntity(action))
        .collect(Collectors.toList());
  }

  private List<BaseAction> convertActionEntityListToActionList(
      List<ActionEntity> actionEntitiesList) {
    return actionEntitiesList.stream()
        .map(actionEntity -> BaseAction.fromJson(actionEntity.getDetails()))
        .collect(Collectors.toList());
  }

  private List<ActionEntity> cloneActionEntities(List<ActionEntity> actionEntities) {
    return actionEntities.stream()
        .map(actionEntity -> new ActionEntity(actionEntity))
        .collect(Collectors.toList());
  }

  /**
   * After adding the import/export feature the actionId will be a issue, in the following senario:
   * a) UserA export project.zip from database b) UserB import, modify and export projectB.zip c)
   * UserA import projectB.zip, now the system will be confused about the uuicd, it will override
   * UserA's test cases With the new design of "project" feature by adding the following logic: 1)
   * regenerate all the uuicd, 2) update the createdAt and createdBy field
   *
   * @param actionEntities Original action entity
   * @param testCaseTreeEntity testCaseTreeEntity need update
   * @param ignoreTestTreeId when deep copy the tree, the tree id is also the new id associated with
   *     project, don't need to do the generate the id.
   */
  private void refurbishEntities(
      List<ActionEntity> actionEntities,
      TestCaseTreeEntity testCaseTreeEntity,
      boolean ignoreTestTreeId) {
    HashMap<String, String> uuidMapping = new HashMap<>();
    refurbishActionEntities(actionEntities, uuidMapping);

    if (!ignoreTestTreeId) {
      uuidMapping.putIfAbsent(
          testCaseTreeEntity.getUuid().toString(), UUID.randomUUID().toString());
      testCaseTreeEntity.setUuid(uuidMapping.get(testCaseTreeEntity.getUuid().toString()));
    }

    testCaseTreeEntity.setCreatedBy(UicdConfig.getInstance().getCurrentUser());
    testCaseTreeEntity.setCreatedAt(Instant.now());
    String treeDetails = testCaseTreeEntity.getTreeDetails();
    for (Map.Entry<String, String> entry : uuidMapping.entrySet()) {
      treeDetails = treeDetails.replace(entry.getKey(), entry.getValue());
    }
    testCaseTreeEntity.setTreeDetails(treeDetails);
  }

  private void refurbishActionEntities(
      List<ActionEntity> actionEntities, HashMap<String, String> uuidMapping) {
    for (int j = 0; j < actionEntities.size(); j++) {
      ActionEntity actionEntity = actionEntities.get(j);
      actionEntity.setCreatedBy(UicdConfig.getInstance().getCurrentUser());
      actionEntity.setCreatedAt(Instant.now());
      BaseAction action = BaseAction.fromJson(actionEntity.getDetails());
      action.setCreatedBy(UicdConfig.getInstance().getCurrentUser());

      // Generate new random uuid and put into the map.
      uuidMapping.putIfAbsent(action.getActionId().toString(), UUID.randomUUID().toString());
      // Update the actionId
      action.setActionId(UUID.fromString(uuidMapping.get(action.getActionId().toString())));

      action.setCreatedBy(UicdConfig.getInstance().getCurrentUser());
      if (action.getActionType() == ActionType.COMPOUND_ACTION) {
        CompoundAction compoundAction = (CompoundAction) action;
        for (int i = 0; i < compoundAction.childrenIdList.size(); i++) {
          // Generate new random uuid and put into the map, to make it simple we are not doing a
          // BFS/DFS for the action tree. Add the old-> new uuid mapping here also since we don't
          // know which comes first.
          String currentChildActionId = compoundAction.childrenIdList.get(i);
          Optional<BaseAction> currentChildAction =
              compoundAction.childrenActions.stream()
                  .filter(o -> o.getActionId().toString().equals(currentChildActionId))
                  .findFirst();
          UUID randomUUID = UUID.randomUUID();
          uuidMapping.putIfAbsent(currentChildActionId, randomUUID.toString());
          compoundAction.childrenIdList.set(i, uuidMapping.get(currentChildActionId));
          if (currentChildAction.isPresent()) {
            currentChildAction.get().setActionId(randomUUID);
            currentChildAction.get().setCreatedBy(UicdConfig.getInstance().getCurrentUser());
            generateRandomNodeContextUuid(currentChildAction.get(), uuidMapping);
          }
        }
      }
      actionEntities.set(j, new ActionEntity(action));
    }
  }

  private void generateRandomNodeContextUuid(
      BaseAction baseAction, HashMap<String, String> uuidMapping) {
    List<NodeContext> nodeContextsToUpdate = new ArrayList<>();
    switch (baseAction.getActionType()) {
      case CLICK_ACTION:
        ClickAction clickAction = (ClickAction) baseAction;
        nodeContextsToUpdate.add(clickAction.getNodeContext());
        break;
      case DRAG_ACTION:
        DragAction dragAction = (DragAction) baseAction;
        nodeContextsToUpdate.add(dragAction.getNodeContext());
        nodeContextsToUpdate.add(dragAction.getEndPointNodeContext());
        break;
      case LONG_CLICK_ACTION:
        LongClickAction longClickAction = (LongClickAction) baseAction;
        nodeContextsToUpdate.add(longClickAction.getNodeContext());
        break;
        // the following actions extend ScreenContentValidationAction
        // that has NodeContext
      case CONDITION_CLICK_ACTION:
      case LOOP_SCREEN_CONTENT_VALIDATION_ACTION:
      case SCROLL_SCREEN_CONTENT_VALIDATION_ACTION:
      case ML_IMAGE_VALIDATION_ACTION:
      case SCREEN_CONTENT_VALIDATION_ACTION:
        ScreenContentValidationAction screenContentValidationAction =
            (ScreenContentValidationAction) baseAction;
        nodeContextsToUpdate.add(screenContentValidationAction.getSavedNodeContext());
        break;
      case SWIPE_ACTION:
        SwipeAction swipeAction = (SwipeAction) baseAction;
        nodeContextsToUpdate.add(swipeAction.getStartPointNodeContext());
        nodeContextsToUpdate.add(swipeAction.getEndPointNodeContext());
        break;
      default:
        // do nothing because remaining Action Type don't have NodeContext
        return;
    }
    updateUuidAndMapping(nodeContextsToUpdate, uuidMapping);
  }

  private void updateUuidAndMapping(
      List<NodeContext> nodeContextsToUpdate, HashMap<String, String> uuidMapping) {
    for (NodeContext nodeContextToUpdate : nodeContextsToUpdate) {
      if (nodeContextToUpdate != null) {
        uuidMapping.computeIfAbsent(
            nodeContextToUpdate.getUuid(), k -> UUID.randomUUID().toString());
        nodeContextToUpdate.setUuid(uuidMapping.get(nodeContextToUpdate.getUuid()));
        List<NodeContext> childNodeContexts = nodeContextToUpdate.getChildrenNodeContext();
        updateUuidAndMapping(childNodeContexts, uuidMapping);
      }
    }
  }

  private void fetchActionRecursively(
      String actionId, List<ActionEntity> actionEntities, List<BaseAction> pythonActionList)
      throws UicdActionException {
    // already contains action, skip
    if (actionEntities.stream().filter(o -> o.getUuid().equals(actionId)).findFirst().isPresent()) {
      return;
    }
    BaseAction action = actionStorageManager.getActionByUUID(actionId);
    if (action != null) {
      actionEntities.add(new ActionEntity(action));
      if (action.getActionType() == ActionType.COMPOUND_ACTION) {
        CompoundAction compoundAction = (CompoundAction) action;
        for (String childActionId : compoundAction.childrenIdList) {
          Optional<BaseAction> childAction =
              compoundAction.childrenActions.stream()
                  .filter(x -> x != null)
                  .filter(o -> o.getActionId().toString().equals(childActionId))
                  .findFirst();
          // In current design we already have the compound action in the childrenAction list,
          // however still need to call the fetchActionRecursively, so that it will be added to the
          // actionEntities and get deep copied later.
          if (childAction.isPresent()
              && childAction.get().getActionType() == ActionType.PYTHON_SCRIPT_ACTION) {
            pythonActionList.add(childAction.get());
          }
          if (!childAction.isPresent()
              || childAction.get().getActionType() == ActionType.COMPOUND_ACTION) {
            fetchActionRecursively(childActionId, actionEntities, pythonActionList);
          }
        }
      }
    }
  }
}
