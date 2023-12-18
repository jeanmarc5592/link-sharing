import { AuthService } from "@/server/services/auth";
import GithubProvider from "next-auth/providers/github";

export const githubAuth = GithubProvider({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  async profile(profile) {
    const authService = new AuthService();

    const user = await authService.authenticateWithGithub(profile);

    console.log(user);

    return {
      id: user.id,
      email: user.id,
    }
  }
});