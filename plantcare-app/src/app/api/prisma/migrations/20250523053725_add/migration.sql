/*
  Warnings:

  - Added the required column `send_water_mail_alert` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Model` ADD COLUMN `pest_resistant` VARCHAR(191) NULL,
    ADD COLUMN `soil` VARCHAR(191) NULL,
    ADD COLUMN `temperature` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Plant` ADD COLUMN `send_water_mail_alert` BOOLEAN NOT NULL;
