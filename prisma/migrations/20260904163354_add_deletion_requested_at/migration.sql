-- AlterTable
ALTER TABLE "user" ADD COLUMN     "deletionRequestedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "user_deletionRequestedAt_idx" ON "user"("deletionRequestedAt");
