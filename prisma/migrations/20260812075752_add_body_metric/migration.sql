-- CreateTable
CREATE TABLE "body_metric" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weightKg" DOUBLE PRECISION,
    "waistIn" DOUBLE PRECISION,
    "chestIn" DOUBLE PRECISION,
    "hipsIn" DOUBLE PRECISION,
    "armsIn" DOUBLE PRECISION,
    "thighsIn" DOUBLE PRECISION,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "body_metric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "body_metric_userId_idx" ON "body_metric"("userId");

-- AddForeignKey
ALTER TABLE "body_metric" ADD CONSTRAINT "body_metric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
