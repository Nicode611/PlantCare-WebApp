/*
  Warnings:

  - You are about to drop the column `next_water_date` on the `Plant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Plant` DROP COLUMN `next_water_date`,
    ADD COLUMN `next_watering_date` DATETIME(3) NULL;
