import { z } from "zod";

export const linkSchema = z.object({
  platform: z.string().min(1),
  href: z.string().min(1),
});

export type LinkSchemaType = z.infer<typeof linkSchema>;