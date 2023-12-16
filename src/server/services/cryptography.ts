import { compare, hash } from "bcryptjs";

export class CryptographyService {
  async compareStrings(stringOne: string | null, stringTwo: string | null): Promise<null | "OK"> {
    if (!stringOne || !stringTwo) {
      return null;
    }

    const match = await compare(stringOne, stringTwo);

    if (!match) {
      console.error("Strings don't match", { stringOne, stringTwo });
      return null;
    }

    return "OK";
  }

  async hashString(str: string) {
    return hash(str, 12);
  }
}