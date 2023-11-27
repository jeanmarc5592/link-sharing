import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  picture: z.string().nullable().optional(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;