-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "superUser" BOOLEAN NOT NULL DEFAULT false,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL DEFAULT E'123456',
    "cpf" TEXT,
    "rg" TEXT,
    "permission" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "permissionUuid" TEXT NOT NULL,
    "permissionName" TEXT NOT NULL,
    "permissionLevel" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" SERIAL NOT NULL,
    "contractUuid" TEXT NOT NULL,
    "contractName" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "linkUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "productUuid" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productCode" TEXT NOT NULL,
    "productPrice" INTEGER NOT NULL,
    "productDescription" TEXT,
    "urlPhoto" TEXT NOT NULL,
    "onSale" BOOLEAN,
    "productStock" INTEGER NOT NULL,
    "contractCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_name_uuid_idx" ON "users"("name", "uuid");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_permissionUuid_key" ON "permissions"("permissionUuid");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_permissionName_key" ON "permissions"("permissionName");

-- CreateIndex
CREATE INDEX "permissions_permissionName_idx" ON "permissions"("permissionName");

-- CreateIndex
CREATE UNIQUE INDEX "contracts_contractUuid_key" ON "contracts"("contractUuid");

-- CreateIndex
CREATE UNIQUE INDEX "contracts_code_key" ON "contracts"("code");

-- CreateIndex
CREATE INDEX "contracts_contractUuid_code_idx" ON "contracts"("contractUuid", "code");

-- CreateIndex
CREATE UNIQUE INDEX "products_productUuid_key" ON "products"("productUuid");

-- CreateIndex
CREATE UNIQUE INDEX "products_productCode_key" ON "products"("productCode");

-- CreateIndex
CREATE INDEX "products_productUuid_productCode_idx" ON "products"("productUuid", "productCode");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_permission_fkey" FOREIGN KEY ("permission") REFERENCES "permissions"("permissionName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_contractCode_fkey" FOREIGN KEY ("contractCode") REFERENCES "contracts"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
