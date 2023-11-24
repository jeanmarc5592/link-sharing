import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  picture: z.string().optional(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;