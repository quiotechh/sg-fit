import { z } from "zod";

export const getUploadUrlSchema = z.object({
  context: z.enum(["progress-photo", "community-post"]),
});
