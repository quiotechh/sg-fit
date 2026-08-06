/*
  Warnings:

  - You are about to drop the column `category` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the column `programSlug` on the `purchase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,programId]` on the table `purchase` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amountPaid` to the `purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programId` to the `purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "purchase_userId_programSlug_key";

-- AlterTable
ALTER TABLE "purchase" DROP COLUMN "category",
DROP COLUMN "price",
DROP COLUMN "programSlug",
ADD COLUMN     "amountPaid" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "couponCode" TEXT,
ADD COLUMN     "programId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "purchase_userId_programId_key" ON "purchase"("userId", "programId");

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
