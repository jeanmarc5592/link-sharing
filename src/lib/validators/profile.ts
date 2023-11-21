import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().min(1),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;