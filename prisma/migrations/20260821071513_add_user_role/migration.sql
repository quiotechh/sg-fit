-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('MEMBER', 'FOUNDER');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'MEMBER';
