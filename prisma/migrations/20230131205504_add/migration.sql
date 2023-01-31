/*
  Warnings:

  - A unique constraint covering the columns `[id,productId,userId]` on the table `Update` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Update_id_productId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Update_id_productId_userId_key" ON "Update"("id", "productId", "userId");
