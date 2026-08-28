import { z } from "zod";

export const bodyMetricSchema = z
  .object({
    weightKg: z.number().min(20).max(300).optional(),
    waistIn: z.number().min(5).max(100).optional(),
    chestIn: z.number().min(5).max(100).optional(),
    hipsIn: z.number().min(5).max(100).optional(),
    armsIn: z.number().min(5).max(100).optional(),
    thighsIn: z.number().min(5).max(100).optional(),
    photoKey: z.string().optional(),
    path: z.string(),
  })
  .refine(
    (data) =>
      data.weightKg ||
      data.waistIn ||
      data.chestIn ||
      data.hipsIn ||
      data.armsIn ||
      data.thighsIn ||
      data.photoKey,
    {
      message: "At least one measurement is required.",
    },
  );
