/*
  Warnings:

  - Added the required column `severity_lvl` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` ADD COLUMN `severity_lvl` VARCHAR(191) NOT NULL;
