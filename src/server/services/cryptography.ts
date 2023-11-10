import { compare, hash } from "bcryptjs";

export class CryptographyService {
  async compareStrings(stringOne: string, stringTwo: string): Promise<boolean> {
    return compare(stringOne, stringTwo);
  }

  async hashString(str: string) {
    return hash(str, 12);
  }
}