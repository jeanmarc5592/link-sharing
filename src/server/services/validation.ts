import { ZodEffects, ZodError, ZodObject } from "zod";

export class ValidationService {
  validateSchema(schema: ZodObject<any> | ZodEffects<ZodObject<any>>, input: any): ZodError | "OK" {
    const result = schema.safeParse(input);

    if (!result.success) {
      console.error("Schema is not valid", result.error);
      return result.error;
    }

    return "OK";
  }

  validateEquality(stringOne: string, stringTwo: string): null | "OK" {
    const isEqual = stringOne === stringTwo;

    if (!isEqual) {
      console.error("Strings are not equal", { stringOne, stringTwo });
      return null;
    }

    return "OK";
  }
}