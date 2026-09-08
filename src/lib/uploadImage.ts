import imageCompression from "browser-image-compression";
import { getUploadUrl } from "@/lib/actions/uploads";

function isHeic(file: File) {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  return (
    type === "image/heic" ||
    type === "image/heif" ||
    name.endsWith(".heic") ||
    name.endsWith(".heif")
  );
}

async function toJpegIfHeic(file: File): Promise<File> {
  if (!isHeic(file)) return file;

  // heic2any is wasm-based and heavy — only load it when a HEIC file
  // actually shows up, so PNG/JPEG/WebP uploads never pay this cost.
  const heic2any = (await import("heic2any")).default;
  const result = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 });
  const blob = Array.isArray(result) ? result[0] : result;

  return new File([blob], file.name.replace(/\.(heic|heif)$/i, ".jpg"), {
    type: "image/jpeg",
  });
}

async function compressImage(file: File): Promise<File> {
  const jpegSafeFile = await toJpegIfHeic(file);

  return imageCompression(jpegSafeFile, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
  });
}

export async function uploadImage(
  file: File,
  context: "progress-photo" | "community-post",
): Promise<string> {
  const compressed = await compressImage(file);
  const { uploadUrl, key } = await getUploadUrl({ context, fileSize: compressed.size });

  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "image/webp" },
    body: compressed,
  });

  if (!res.ok) throw new Error("Upload failed, please try again.");

  return key;
}
