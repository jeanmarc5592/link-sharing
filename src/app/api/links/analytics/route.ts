import { AuthService } from "@/server/services/auth";
import { HttpService } from "@/server/services/http";
import { LinksService } from "@/server/services/links";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const GET = async (req: NextRequestWithAuth) => {
  const httpService = new HttpService();
  const authService = new AuthService();
  const linksService = new LinksService();

  const isRequestValid = await authService.validateRequest(req);

  if (isRequestValid !== "OK") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = await httpService.extractToken(req);
  const userId = await httpService.getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ message: 'No "sub" in token' }, { status: 400 });
  }

  const links = await linksService.getLinksByUser(userId);

  if (!links) {
    return NextResponse.json({ message: 'Something went wrong reading your links' }, { status: 500 });
  }
  
  const linkAnalytics = await linksService.getAnalytics(links);

  // Check if something went wrong and return an error response
  if (!linkAnalytics) {
    return NextResponse.json({ message: 'Something went wrong reading your link analytics' }, { status: 500 });
  }

  return NextResponse.json(linkAnalytics);
}