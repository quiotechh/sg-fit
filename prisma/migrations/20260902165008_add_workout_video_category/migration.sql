/*
  Warnings:

  - Added the required column `category` to the `workout_video` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkoutCategory" AS ENUM ('GYM', 'CHAIR', 'HOME');

-- DropIndex
DROP INDEX "workout_video_createdAt_idx";

-- AlterTable
ALTER TABLE "workout_video" ADD COLUMN     "category" "WorkoutCategory" NOT NULL;

-- CreateIndex
CREATE INDEX "workout_video_category_createdAt_idx" ON "workout_video"("category", "createdAt");
