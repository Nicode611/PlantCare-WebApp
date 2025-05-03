-- DropForeignKey
ALTER TABLE `Plant` DROP FOREIGN KEY `Plant_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_plant_id_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_user_id_fkey`;

-- DropIndex
DROP INDEX `Plant_user_id_fkey` ON `Plant`;

-- DropIndex
DROP INDEX `Task_user_id_fkey` ON `Task`;

-- AddForeignKey
ALTER TABLE `Plant` ADD CONSTRAINT `Plant_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_plant_id_fkey` FOREIGN KEY (`plant_id`) REFERENCES `Plant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
