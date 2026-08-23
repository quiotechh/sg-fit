import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

// Expiring in 60s — long enough for the redirect to complete, short enough
// that a leaked/forwarded link is useless.
const DOWNLOAD_URL_EXPIRY_SECONDS = 60

export async function getSignedDownloadUrl(fileKey: string, downloadFileName: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: fileKey,
    ResponseContentDisposition: `attachment; filename="${downloadFileName}"`,
  })

  return getSignedUrl(r2Client, command, { expiresIn: DOWNLOAD_URL_EXPIRY_SECONDS })
}
