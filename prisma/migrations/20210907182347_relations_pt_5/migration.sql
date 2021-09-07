/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[takenById]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[givenById]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Orders_userId_unique" ON "Orders"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_takenById_unique" ON "Orders"("takenById");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_givenById_unique" ON "Orders"("givenById");

-- AddForeignKey
ALTER TABLE "Orders" ADD FOREIGN KEY ("takenById") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD FOREIGN KEY ("givenById") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
