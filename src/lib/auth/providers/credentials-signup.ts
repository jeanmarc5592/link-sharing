import CredentialsProvider from "next-auth/providers/credentials";
import { AuthService } from "@/server/services/auth";

export const credentialsSignup = CredentialsProvider({
  id: "signup",
  name: "signup",
  credentials: {
    email: { type: "email" },
    password: { type: "password" },
    confirmPassword: { type: "password" },
  },
  async authorize(credentials) {
    const authService = new AuthService();

    return await authService.signup(credentials);
  }
});
