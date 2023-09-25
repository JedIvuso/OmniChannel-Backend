/*
  Warnings:

  - You are about to drop the column `projectId` on the `resources` table. All the data in the column will be lost.
  - You are about to drop the `eclprojects` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[channelId]` on the table `resources` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channelId` to the `resources` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `resources_projectId_key` ON `resources`;

-- AlterTable
ALTER TABLE `resources` DROP COLUMN `projectId`,
    ADD COLUMN `channelId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `eclprojects`;

-- CreateTable
CREATE TABLE `eclChannels` (
    `channelId` INTEGER NOT NULL AUTO_INCREMENT,
    `channelTitle` VARCHAR(191) NOT NULL,
    `channelImage` VARCHAR(191) NOT NULL,
    `channelDescription` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `eclChannels_channelTitle_key`(`channelTitle`),
    PRIMARY KEY (`channelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `resources_channelId_key` ON `resources`(`channelId`);
