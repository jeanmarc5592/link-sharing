import { AuthService } from "@/server/services/auth";
import GithubProvider from "next-auth/providers/github";

export const githubAuth = GithubProvider({
  id: "github",
  name: "github",
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  async profile(profile) {
    const authService = new AuthService();

    const user = await authService.authenticateWithGithub(profile);

    return {
      id: user?.id || "% ID %",
      email: user?.email || "% EMAIL %",
    }
  }
});