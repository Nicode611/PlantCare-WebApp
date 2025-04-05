/*
  Warnings:

  - Made the column `water_lvl_needed` on table `Model` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Model` MODIFY `water_lvl_needed` INTEGER NOT NULL;
