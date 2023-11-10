import { ZodEffects, ZodObject } from "zod";

export class ValidationService {
  validateSchema(schema: ZodObject<any> | ZodEffects<ZodObject<any>>, input: any): null | "OK" {
    const result = schema.safeParse(input);

    if (!result.success) {
      console.error("Validation failed with errors", result.error);
      return null;
    }

    return "OK";
  }

  validateEquality(stringOne: string, stringTwo: string): null | "OK" {
    const isEqual = stringOne === stringTwo;

    if (!isEqual) {
      return null;
    }

    return "OK";
  }
}