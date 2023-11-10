import prisma from "@/lib/db/prisma";
import { hash } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const credentialsSignup = CredentialsProvider({
  id: "signup",
  name: "signup",
  credentials: {
    email: { type: "email" },
    password: { type: "password" },
  },
  async authorize(credentials) {
    // TODO: Validate input (Required fields are not missing, field types are correct, ...)
    if (!credentials || !credentials.email || !credentials.password) {
      return null;
    }

    const { email, password } = credentials;

    // TODO: Add cryphtography utils
    const hashed_password = await hash(password, 12);

    // TODO: Add UsersService (check if email is not signed up already)
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return {
      id: user.id,
      email: user.email,
    }
  }
});
