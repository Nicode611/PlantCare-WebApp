/*
  Warnings:

  - You are about to drop the column `description` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the `PlantModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Plant` DROP FOREIGN KEY `Plant_model_id_fkey`;

-- DropIndex
DROP INDEX `Plant_model_id_fkey` ON `Plant`;

-- AlterTable
ALTER TABLE `Plant` DROP COLUMN `description`,
    ADD COLUMN `actual_water_lvl` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `image` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `PlantModel`;

-- CreateTable
CREATE TABLE `Model` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `wateringFrequency` INTEGER NOT NULL,
    `sun_lvl_needed` INTEGER NOT NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiseaseModel` (
    `disease_id` INTEGER NOT NULL,
    `model_id` INTEGER NOT NULL,

    PRIMARY KEY (`disease_id`, `model_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disease` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `severity` INTEGER NOT NULL,
    `treatment` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Plant` ADD CONSTRAINT `Plant_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `Model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiseaseModel` ADD CONSTRAINT `DiseaseModel_disease_id_fkey` FOREIGN KEY (`disease_id`) REFERENCES `Disease`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiseaseModel` ADD CONSTRAINT `DiseaseModel_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `Model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
