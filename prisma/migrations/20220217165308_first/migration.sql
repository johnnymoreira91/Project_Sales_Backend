-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `superUser` BOOLEAN NOT NULL DEFAULT false,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL DEFAULT '123456',
    `cpf` VARCHAR(191) NULL,
    `rg` VARCHAR(191) NULL,
    `permissionLevel` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_uuid_key`(`uuid`),
    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_name_uuid_idx`(`name`, `uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `permissionUuid` VARCHAR(191) NOT NULL,
    `permissionName` VARCHAR(191) NOT NULL,
    `permissionLevel` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `permissions_permissionUuid_key`(`permissionUuid`),
    UNIQUE INDEX `permissions_permissionName_key`(`permissionName`),
    UNIQUE INDEX `permissions_permissionLevel_key`(`permissionLevel`),
    INDEX `permissions_permissionName_permissionLevel_idx`(`permissionName`, `permissionLevel`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contracts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contractUuid` VARCHAR(191) NOT NULL,
    `contractName` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `linkUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `contracts_contractUuid_key`(`contractUuid`),
    UNIQUE INDEX `contracts_code_key`(`code`),
    INDEX `contracts_contractUuid_code_idx`(`contractUuid`, `code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productUuid` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `productCode` VARCHAR(191) NOT NULL,
    `productPrice` INTEGER NOT NULL,
    `productDescription` VARCHAR(191) NULL,
    `urlPhoto` VARCHAR(191) NOT NULL,
    `onSale` BOOLEAN NULL,
    `productStock` INTEGER NOT NULL,
    `contractCode` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `products_productUuid_key`(`productUuid`),
    UNIQUE INDEX `products_productCode_key`(`productCode`),
    INDEX `products_productUuid_productCode_idx`(`productUuid`, `productCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_permissionLevel_fkey` FOREIGN KEY (`permissionLevel`) REFERENCES `permissions`(`permissionLevel`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_contractCode_fkey` FOREIGN KEY (`contractCode`) REFERENCES `contracts`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
