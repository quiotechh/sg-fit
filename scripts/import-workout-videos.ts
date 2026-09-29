/**
 * One-time script: bulk-import R2-uploaded workout videos into the
 * WorkoutVideo table. Lists everything under `workout-videos/<category>/`
 * in R2, derives a title from each filename, and inserts one row per video
 * that doesn't already exist (matched by videoKey).
 *
 * SAFE BY DEFAULT — dry run only. Nothing is written to the database
 * unless you pass --commit.
 *
 * Usage:
 *   npx tsx scripts/import-workout-videos.ts            # dry run (prints plan only)
 *   npx tsx scripts/import-workout-videos.ts --commit    # actually inserts rows
 *
 * DATABASE_URL controls which database gets written to — this script never
 * picks a database on its own. Point it at local Postgres or at a Railway
 * tunnel URL depending on where you want the rows to land.
 */
import "dotenv/config";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Same driver-adapter pattern as src/lib/prisma.ts — Prisma 7 requires it.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const PREFIX = "workout-videos/";
const FOLDER_TO_CATEGORY: Record<string, "GYM" | "CHAIR" | "HOME"> = {
  gym: "GYM",
  chair: "CHAIR",
  home: "HOME",
};

// "ChairFront-steps.mp4" -> "Chair Front Steps"
// Best-effort only — filenames aren't consistently cased, so a handful of
// titles (e.g. from "BBdeadlift", "DBBenchpress") will come out awkward.
// Review the dry-run output and rename via Prisma Studio if needed.
function titleFromFilename(filename: string): string {
  const withoutExt = filename.replace(/\.[^.]+$/, "");
  const spaced = withoutExt
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();

  return spaced
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function main() {
  const commit = process.argv.includes("--commit");

  const res = await r2Client.send(
    new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME!,
      Prefix: PREFIX,
    }),
  );

  const objects = (res.Contents ?? []).filter(
    (o) => o.Key && !o.Key.endsWith("/"), // skip folder placeholder entries
  );

  const existing = await prisma.workoutVideo.findMany({
    select: { videoKey: true },
  });
  const existingKeys = new Set(existing.map((v) => v.videoKey));

  const toInsert: {
    title: string;
    videoKey: string;
    duration: number;
    category: "GYM" | "CHAIR" | "HOME";
  }[] = [];
  const skippedExisting: string[] = [];
  const skippedUnknownCategory: string[] = [];

  for (const obj of objects) {
    const key = obj.Key!;
    if (existingKeys.has(key)) {
      skippedExisting.push(key);
      continue;
    }

    const parts = key.slice(PREFIX.length).split("/");
    const folder = parts[0];
    const filename = parts[parts.length - 1];
    const category = FOLDER_TO_CATEGORY[folder];

    if (!category || !filename) {
      skippedUnknownCategory.push(key);
      continue;
    }

    toInsert.push({
      title: titleFromFilename(filename),
      videoKey: key,
      duration: 0, // placeholder — fix manually after import, see script header
      category,
    });
  }

  console.log(`\nFound ${objects.length} objects under ${PREFIX}`);
  console.log(`Already in DB (skipped): ${skippedExisting.length}`);
  if (skippedUnknownCategory.length) {
    console.log(
      `Skipped (unrecognized folder): ${skippedUnknownCategory.length}`,
      skippedUnknownCategory,
    );
  }
  console.log(`\nTo insert: ${toInsert.length}`);
  for (const row of toInsert) {
    console.log(
      `  [${row.category.padEnd(5)}] ${row.title.padEnd(35)} <- ${row.videoKey}`,
    );
  }

  if (!commit) {
    console.log(
      "\nDry run only — nothing written. Re-run with --commit to actually insert these rows.",
    );
    return;
  }

  if (toInsert.length === 0) {
    console.log("\nNothing to insert.");
    return;
  }

  const result = await prisma.workoutVideo.createMany({ data: toInsert });
  console.log(`\nInserted ${result.count} rows.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
