import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).superRefine(({ password, confirmPassword}, ctx) =>  {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmPassword"],
      message: "Passwords must match",
    })
  }
});

export type SignupSchemaType = z.infer<typeof signupSchema>;