/*
  Warnings:

  - Added the required column `language` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "acceptAnyMail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "acceptPlantcareMail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "acceptTipsMail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "theme" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
