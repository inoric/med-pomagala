/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Items` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "inventoryId" SET DATA TYPE TEXT,
ALTER COLUMN "takenAt" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Inventory.code_unique" ON "Inventory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Items.name_unique" ON "Items"("name");
