-- CreateTable
CREATE TABLE "program_week" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "days" JSONB NOT NULL,

    CONSTRAINT "program_week_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "day_template" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "weekTips" JSONB NOT NULL,
    "sections" JSONB NOT NULL,

    CONSTRAINT "day_template_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "program_week_programId_weekNumber_key" ON "program_week"("programId", "weekNumber");

-- CreateIndex
CREATE UNIQUE INDEX "day_template_programId_dayNumber_key" ON "day_template"("programId", "dayNumber");

-- AddForeignKey
ALTER TABLE "program_week" ADD CONSTRAINT "program_week_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "day_template" ADD CONSTRAINT "day_template_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
