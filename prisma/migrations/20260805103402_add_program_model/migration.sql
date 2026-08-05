-- CreateTable
CREATE TABLE "program" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION,
    "duration" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "sessions" TEXT,
    "tags" TEXT[],
    "includes" TEXT[],
    "highlights" TEXT[],
    "bgClass" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "program_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "program_slug_key" ON "program"("slug");

-- CreateIndex
CREATE INDEX "program_category_idx" ON "program"("category");
