/*
  Warnings:

  - A unique constraint covering the columns `[userId,programSlug]` on the table `purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "purchase" ADD COLUMN     "paymentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "purchase_userId_programSlug_key" ON "purchase"("userId", "programSlug");
