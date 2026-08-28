import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

// Expiring in 60s — long enough for the redirect to complete, short enough
// that a leaked/forwarded link is useless.
const DOWNLOAD_URL_EXPIRY_SECONDS = 60;
const UPLOAD_URL_EXPIRY_SECONDS = 120;
// Feed/gallery images stay on-page longer than a redirect — no forced
// download disposition, and a longer expiry than the PDF download URL.
const VIEW_URL_EXPIRY_SECONDS = 600

export async function getSignedUploadUrl(fileKey: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: fileKey,
    ContentType: contentType,
  });

  return getSignedUrl(r2Client, command, {
    expiresIn: UPLOAD_URL_EXPIRY_SECONDS,
  });
}

export async function getSignedViewUrl(fileKey: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: fileKey,
  })

  return getSignedUrl(r2Client, command, { expiresIn: VIEW_URL_EXPIRY_SECONDS })
}

export async function getSignedDownloadUrl(
  fileKey: string,
  downloadFileName: string,
) {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: fileKey,
    ResponseContentDisposition: `attachment; filename="${downloadFileName}"`,
  });

  return getSignedUrl(r2Client, command, {
    expiresIn: DOWNLOAD_URL_EXPIRY_SECONDS,
  });
}

export async function deleteObject(fileKey: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: fileKey,
  });

  await r2Client.send(command);
}
