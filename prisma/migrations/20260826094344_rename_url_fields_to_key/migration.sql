/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `body_metric` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "body_metric" DROP COLUMN "photoUrl",
ADD COLUMN     "photoKey" TEXT;

-- AlterTable
ALTER TABLE "post" DROP COLUMN "imageUrl",
ADD COLUMN     "imageKey" TEXT;
