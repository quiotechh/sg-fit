-- CreateTable
CREATE TABLE "day_progress" (
    "id" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "dayId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "day_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "day_progress_purchaseId_dayId_key" ON "day_progress"("purchaseId", "dayId");

-- AddForeignKey
ALTER TABLE "day_progress" ADD CONSTRAINT "day_progress_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "day_progress" ADD CONSTRAINT "day_progress_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "day_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;
