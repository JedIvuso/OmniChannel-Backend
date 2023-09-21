/*
  Warnings:

  - The primary key for the `eclprojects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `eclprojects` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `eclProjects_projectId_key` ON `eclprojects`;

-- AlterTable
ALTER TABLE `eclprojects` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `projectId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`projectId`);
