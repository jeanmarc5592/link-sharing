import type { NextAuthOptions } from "next-auth";
import { credentialsLogin } from "./providers/credentials-login";
import { credentialsSignup } from "./providers/credentials-signup";
import { googleAuth } from "./providers/google-auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    credentialsLogin,
    credentialsSignup,
    googleAuth,
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
