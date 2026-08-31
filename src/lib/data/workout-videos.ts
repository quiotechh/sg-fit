import { prisma } from "@/lib/prisma";
import { getSignedViewUrl } from "@/lib/r2";

export async function getWorkoutVideos() {
  const videos = await prisma.workoutVideo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Promise.all(
    videos.map(async ({ videoKey, ...rest }) => ({
      ...rest,
      videoUrl: await getSignedViewUrl(videoKey),
    })),
  );
}

// will use postgres full text search when we have 100s+ of videos
