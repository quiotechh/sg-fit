import { z } from "zod";

export const createPostSchema = z.object({
  body: z.string().trim().min(1).max(2000),
  imageKey: z.string().optional(),
  path: z.string(),
});

export const addCommentSchema = z.object({
  postId: z.string(),
  body: z.string().trim().min(1).max(500),
  path: z.string(),
});

export const deleteCommentSchema = z.object({
  commentId: z.string(),
  postId: z.string(),
  path: z.string(),
});

export const toggleLikeSchema = z.object({
  postId: z.string(),
  path: z.string(),
});
