import { AuthService } from "@/server/services/auth";
import { LinksService } from "@/server/services/links";
import { ValidationService } from "@/server/services/validation";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const DELETE = async (req: NextRequestWithAuth, route: { params: { id: string }}) => {
  const authService = new AuthService();
  const linksService = new LinksService();
  const validationService = new ValidationService();

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

  return NextResponse.json({ ...deletedLink });
};