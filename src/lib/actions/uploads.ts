"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getSignedUploadUrl } from "@/lib/r2";
import { getUploadUrlSchema } from "@/lib/validation/uploads";
import { hasActiveCommunitySubscription } from "@/lib/data/subscriptions";

export async function getUploadUrl(data: unknown){
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const parsed = getUploadUrlSchema.safeParse(data);
  if(!parsed.success) throw new Error(parsed.error.issues[0].message);
  const {context, fileSize} = parsed.data;

  if(context === "community-post" && !(await hasActiveCommunitySubscription(session.user.id))){
    redirect("/community/checkout");
  };

  const prefix = context === "progress-photo" ? "progress-photos" : "community-posts";
  const key = `${prefix}/${session.user.id}/${crypto.randomUUID()}.webp`;

  const uploadUrl = await getSignedUploadUrl(key, "image/webp", fileSize);

  return { uploadUrl, key };
}