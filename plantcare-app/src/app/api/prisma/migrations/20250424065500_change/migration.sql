/*
  Warnings:

  - You are about to drop the column `checked` on the `Task` table. All the data in the column will be lost.
  - Added the required column `isDone` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `checked`,
    ADD COLUMN `isDone` BOOLEAN NOT NULL;
