/*
  Warnings:

  - Made the column `last_watered_at` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `actual_water_lvl` on table `Plant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `next_watering_date` on table `Plant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Plant` MODIFY `last_watered_at` DATETIME(3) NOT NULL,
    MODIFY `actual_water_lvl` INTEGER NOT NULL,
    MODIFY `next_watering_date` DATETIME(3) NOT NULL;
