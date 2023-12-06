import { AuthService } from "@/server/services/auth";
import { HttpService } from "@/server/services/http";
import { LinksService } from "@/server/services/links";
import { ValidationService } from "@/server/services/validation";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const DELETE = async (req: NextRequestWithAuth, route: { params: { id: string }}) => {
  const authService = new AuthService();
  const linksService = new LinksService();
  const validationService = new ValidationService();
  const httpService = new HttpService();

  const isRequestValid = await authService.validateRequest(req);

  if (isRequestValid !== "OK") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const linkId = route?.params?.id;
  const isValidUUID = validationService.validateUUID(linkId);

  if (isValidUUID !== "OK") {
    return NextResponse.json({ message: "Parameter 'id' is not a valid UUID"}, { status: 400 });
  }

  const deletedLink = await linksService.deleteLink(linkId);

  if (!deletedLink) {
    return NextResponse.json({ message: 'Something went wrong deleting the link' }, { status: 500 });
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

  if (links.length > 0) {
    await linksService.reorderLinks(links);
  }

  return NextResponse.json({ ...deletedLink });
};