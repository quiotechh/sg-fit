-- CreateTable
CREATE TABLE "workout_video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videoKey" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "workout_video_createdAt_idx" ON "workout_video"("createdAt");
