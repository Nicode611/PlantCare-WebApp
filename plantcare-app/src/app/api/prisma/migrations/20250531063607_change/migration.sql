/*
  Warnings:

  - You are about to drop the column `wateringFrequency` on the `Model` table. All the data in the column will be lost.
  - Added the required column `watering_frequency` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Model" DROP COLUMN "wateringFrequency",
ADD COLUMN     "watering_frequency" INTEGER NOT NULL;
