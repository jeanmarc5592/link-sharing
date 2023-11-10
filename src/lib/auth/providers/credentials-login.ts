import CredentialsProvider from "next-auth/providers/credentials";
import { AuthService } from "@/server/services/auth";

export const credentialsLogin = CredentialsProvider({
  id: "login",
  name: "login",
  credentials: {
    email: { type: "email" },
    password: { type: "password" },
  },
  async authorize(credentials) {
    const authService = new AuthService();

    return await authService.login(credentials);
  },
});
