-- CreateTable
CREATE TABLE `eclProjects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectName` VARCHAR(191) NOT NULL,
    `projectId` INTEGER NOT NULL,
    `projectImage` VARCHAR(191) NOT NULL,
    `projectDescription` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `eclProjects_projectName_key`(`projectName`),
    UNIQUE INDEX `eclProjects_projectId_key`(`projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resources` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER NOT NULL,

    UNIQUE INDEX `resources_projectId_key`(`projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
