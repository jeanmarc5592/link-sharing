import { ZodEffects, ZodObject } from "zod";

export class ValidationService {
  validateSchema(schema: ZodObject<any> | ZodEffects<ZodObject<any>>, input: any) {
    const result = schema.safeParse(input);

    if (!result.success) {
      console.error("Validation failed with errors", result.error);
      return null;
    }

    return "OK";
  }
}