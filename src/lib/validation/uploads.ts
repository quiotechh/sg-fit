import { z } from "zod";

// Client-side compression targets ~500KB and hard-caps resolution to 1920px
// (see compressImage in uploadImage.ts), so a compressed WebP realistically
// never exceeds a couple MB even for a very detailed source image. 3MB gives
// safe headroom for that while still blocking someone bypassing compression
// entirely and uploading an arbitrarily large file.
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

export const getUploadUrlSchema = z.object({
  context: z.enum(["progress-photo", "community-post"]),
  fileSize: z
    .number()
    .int()
    .positive()
    .max(MAX_IMAGE_BYTES, "Image is too large."),
});
