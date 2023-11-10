import prisma from "../db/prisma";
import { compare, hash } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "login",
      name: "login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
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
    }),
    CredentialsProvider({
      id: "signup",
      name: "signup",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@gmail.com",
        },
        password: { label: "Password", type: "password" },
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
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
};
