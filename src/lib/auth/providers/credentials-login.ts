import { CryptographyService } from "@/server/services/cryptography";
import { UsersService } from "@/server/services/users";
import CredentialsProvider from "next-auth/providers/credentials";

export const credentialsLogin = CredentialsProvider({
  id: "login",
  name: "login",
  credentials: {
    email: { type: "email" },
    password: { type: "password" },
  },
  async authorize(credentials) {
    const usersService = new UsersService();
    const cryptographyService = new CryptographyService();

    // TODO: Validate input (Required fields are not missing, field types are correct, ...)

    if (!credentials || !credentials?.email || !credentials.password) {
      return null;
    }

    const user = await usersService.findByEmail(credentials.email);

    if (!user) {
      return null;
    }
    const passwordsMatch = await cryptographyService.compareStrings(credentials.password, user.password);

    if (!passwordsMatch) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  },
});
