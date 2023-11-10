import prisma from "@/lib/db/prisma";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const credentialsLogin = CredentialsProvider({
  id: "login",
  name: "login",
  credentials: {
    email: { type: "email" },
    password: { type: "password" },
  },
  async authorize(credentials) {
    // TODO: Validate input (Required fields are not missing, field types are correct, ...)

    if (!credentials?.email || !credentials.password) {
      return null;
    }

    // TODO: Create and use UsersService
    const user = await prisma.user.findUnique({
      where: {
        email: credentials.email,
      },
    });

    // TODO: Create and use cryptography utils
    if (!user || !(await compare(credentials.password, user.password))) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  },
});
