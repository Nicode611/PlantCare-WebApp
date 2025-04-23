-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `plant_id` INTEGER NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `date_of_action` DATETIME(3) NOT NULL,
    `checked` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_plant_id_fkey` FOREIGN KEY (`plant_id`) REFERENCES `Plant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
