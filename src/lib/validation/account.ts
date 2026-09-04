import { z } from "zod";

export const deleteAccountSchema = z.object({
  confirmation: z.string().refine((val) => val === "DELETE", {
    message: 'Please type "DELETE" to confirm.',
  }),
});
