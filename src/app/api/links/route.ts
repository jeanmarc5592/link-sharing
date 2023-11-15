import { AuthService } from "@/server/services/auth";
import { HttpService } from "@/server/services/http";
import { LinksService } from "@/server/services/links";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
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

  return NextResponse.json(links);
};