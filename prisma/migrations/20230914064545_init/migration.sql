/*
  Warnings:

  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lasName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lasName` VARCHAR(191) NOT NULL;