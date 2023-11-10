import { CryptographyService } from "@/server/services/cryptography";
import { UsersService } from "@/server/services/users";
import { User } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";

export const credentialsSignup = CredentialsProvider({
  id: "signup",
  name: "signup",
  credentials: {
    email: { type: "email" },
    password: { type: "password" },
  },
  async authorize(credentials) {
    const usersService = new UsersService();
    const crypographyService = new CryptographyService();

    // TODO: Validate input (Required fields are not missing, field types are correct, passwords are equal ...)
    if (!credentials || !credentials.email || !credentials.password) {
      return null;
    }

    const userExists = await usersService.findByEmail(credentials.email);

    if (userExists) {
      return null;
    }

    const userToCreate: Pick<User, "email" | "password"> = {
      email: credentials.email,
      password: await crypographyService.hashString(credentials.password),
    };

    const user = await usersService.create(userToCreate);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    }
  }
});
