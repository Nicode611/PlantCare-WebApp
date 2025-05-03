/*
  Warnings:

  - A unique constraint covering the columns `[plant_id,action]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Task_plant_id_action_key` ON `Task`(`plant_id`, `action`);
