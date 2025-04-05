/*
  Warnings:

  - Added the required column `color` to the `plants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `plants` ADD COLUMN `color` VARCHAR(150) NOT NULL;
