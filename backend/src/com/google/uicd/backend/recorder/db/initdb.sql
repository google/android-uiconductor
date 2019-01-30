/* Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
-- mysql -u root -p  < initdb.sql
DROP DATABASE IF EXISTS `uicddb`;
CREATE SCHEMA `uicddb` ;
CREATE TABLE `uicddb`.`uicd_testcase` (
  `uuid` VARCHAR(60) NOT NULL PRIMARY KEY,
  `type` VARCHAR(60) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `tag` VARCHAR(200) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `details` BLOB NULL,
  `created_by` VARCHAR(50) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
   INDEX idx_action_type(`type`));

CREATE TABLE `uicddb`.`uicd_testcases_tree` (
  `uuid` VARCHAR(60) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(60),
  `project_id` VARCHAR(60),
  `group_id` VARCHAR(60),
  `tree_details` BLOB NULL,
  `created_by` VARCHAR(50),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  INDEX idx_action_type(`user_id`));

CREATE TABLE `uicddb`.`uicd_test_history` (
  `uuid` VARCHAR(60) NOT NULL PRIMARY KEY,
  `testcase_uuid` VARCHAR(60),
  `user_id` VARCHAR(60),
  `project_id` VARCHAR(60),
  `group_id` VARCHAR(60),
  `test_result` VARCHAR(500) NOT NULL,
  `test_msg` BLOB NULL,
  `test_details` BLOB NULL,
  `created_by` VARCHAR(50),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  INDEX idx_action_type(`user_id`));