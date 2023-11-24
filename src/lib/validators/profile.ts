import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().min(1),
  picture: z.string(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;