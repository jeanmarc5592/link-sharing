import { z } from "zod";

export const linkSchema = z.object({
  platform: z.string().min(1),
  href: z.string().min(1),
});

export const editLinkSchema = z.array(z.object({
  id: z.string().uuid().min(1),
  platform: z.string().min(1),
  href: z.string().min(1),
  userId: z.string().uuid().min(1),
  isModified: z.literal<boolean>(true),
}));

export type LinkSchemaType = z.infer<typeof linkSchema>;

export type EditLinkSchemaType = z.infer<typeof editLinkSchema>;