/*
  Warnings:

  - You are about to drop the column `weekTips` on the `day_template` table. All the data in the column will be lost.
  - You are about to drop the `program_week` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[programId,weekNumber,dayNumber]` on the table `day_template` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `duration` to the `day_template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `focus` to the `day_template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `day_template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekNumber` to the `day_template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalWeeks` to the `program` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "program_week" DROP CONSTRAINT "program_week_programId_fkey";

-- DropIndex
DROP INDEX "day_template_programId_dayNumber_key";

-- AlterTable
ALTER TABLE "day_template" DROP COLUMN "weekTips",
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "focus" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "tip" TEXT,
ADD COLUMN     "weekNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "program" ADD COLUMN     "totalWeeks" INTEGER NOT NULL;

-- DropTable
DROP TABLE "program_week";

-- CreateIndex
CREATE UNIQUE INDEX "day_template_programId_weekNumber_dayNumber_key" ON "day_template"("programId", "weekNumber", "dayNumber");
