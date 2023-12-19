import { AuthService } from "@/server/services/auth";
import GoogleProvider from "next-auth/providers/google";

export const googleAuth = GoogleProvider({
  id: "google",
  name: "google",
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  async profile(profile) {
    const authService = new AuthService();

    const user = await authService.authenticateWithGoogle(profile);

    return {
      id: user?.id || "% ID %",
      email: user?.email || "% EMAIL %",
    }
  }
});