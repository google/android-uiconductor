# This file is a temp file currently only keep for reference. All the tables are created in MySql
# Workbench manually.

-- mysql -u root -p  < initdb.sql
DROP DATABASE IF EXISTS `yuidb`;
CREATE SCHEMA `yuidb` ;
CREATE TABLE `yuidb`.`yui_testcase` (
  `uuid` VARCHAR(60) NOT NULL PRIMARY KEY,
  `type` VARCHAR(60) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `tag` VARCHAR(200) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `details` BLOB NULL,
  `created_by` VARCHAR(50) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
   INDEX idx_action_type(`type`));

CREATE TABLE `yuidb`.`yui_testcases_tree` (
  `uuid` VARCHAR(60) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(60),
  `project_id` VARCHAR(60),
  `group_id` VARCHAR(60),
  `tree_details` BLOB NULL,
  `created_by` VARCHAR(50),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  INDEX idx_action_type(`user_id`));

CREATE TABLE `yuidb`.`yui_test_history` (
  `uuid` VARCHAR(60) NOT NULL PRIMARY KEY,
  `testcase_uuid` VARCHAR(60),
  `user_id` VARCHAR(60),
  `project_id` VARCHAR(60),
  `execution_id` VARCHAR(60),
  `group_id` VARCHAR(60),
  `test_result` VARCHAR(500) NOT NULL,
  `test_msg` BLOB NULL,
  `test_details` BLOB NULL,
  `created_by` VARCHAR(50),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  INDEX idx_action_type(`user_id`));

CREATE TABLE `yuidb`.`uicd_projects` (
  `project_id` VARCHAR(60) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(60) NOT NULL,
  `group_id` VARCHAR(60) NOT NULL,
  `project_name` VARCHAR(100) NOT NULL,
  `created_by` VARCHAR(50),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  INDEX idx_user_id(`user_id`));

-- Create a new unique combination
ALTER TABLE `yuidb`.`uicd_projects` ADD UNIQUE `unique_project_name_per_user`(`user_id`,`project_name`);
-- Drop created index by name
# ALTER TABLE `yuidb`.`uicd_projects` DROP INDEX `unique_project_name_per_user`;
