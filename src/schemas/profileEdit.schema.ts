import { z } from "zod";

export const ProfileEdit = z.object({
  website: z.string().optional(),
  bio: z.string().optional(),
});
