/*
  Warnings:

  - You are about to drop the column `lasName` on the `user` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `lasName`,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL;
