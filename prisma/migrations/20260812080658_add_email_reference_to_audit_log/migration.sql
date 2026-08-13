-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "reference" TEXT,
ADD COLUMN     "userEmail" TEXT;

-- CreateIndex
CREATE INDEX "AuditLog_reference_idx" ON "AuditLog"("reference");
