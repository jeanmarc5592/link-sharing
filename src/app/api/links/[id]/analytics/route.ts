import { AuthService } from "@/server/services/auth";
import { LinksService } from "@/server/services/links";
import { ValidationService } from "@/server/services/validation";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const POST = async (req: NextRequestWithAuth, route: { params: { id: string }}) => {
  const authService = new AuthService();
  const validationService = new ValidationService();
  const linksService = new LinksService();

  const isRequestValid = await authService.validateRequest(req);

  if (isRequestValid !== "OK") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const linkId = route?.params?.id;
  const isValidUUID = validationService.validateUUID(linkId);

  if (isValidUUID !== "OK") {
    return NextResponse.json({ message: "Parameter 'id' is not a valid UUID"}, { status: 400 });
  }

  const linkAnalytics = await linksService.addAnalytics(linkId);

  if (!linkAnalytics) {
    return NextResponse.json({ message: "Something went wrong adding the analytics"}, { status: 500 });
  }

  return NextResponse.json(linkAnalytics);
}