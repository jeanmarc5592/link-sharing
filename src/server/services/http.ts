import { JWT, getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";

export class HttpService {
  private jwtSecret = process.env.NEXTAUTH_SECRET;

  async extractToken(req: NextRequestWithAuth): Promise<JWT | null> {
    return await getToken({ req, secret: this.jwtSecret });
  }

  async validateToken(token: JWT | null): Promise<null | "OK"> {
    if (!token) {
      return null;
    }

    return "OK";
  };

  async getUserIdFromToken(token: JWT | null): Promise<string | undefined> {    
    if (!token) {
      return undefined;
    }

    return token.sub;
  }
}