import { LinksService } from "@/server/services/links";
import { ValidationService } from "@/server/services/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, route: { params: { id: string }}) => {
  const linksService = new LinksService();
  const validationService = new ValidationService();

  const userId = route?.params?.id;
  const isValidUUID = validationService.validateUUID(userId);

  if (isValidUUID !== "OK") {
    return NextResponse.json({ message: "Parameter 'id' is not a valid UUID"}, { status: 400 });
  }

  const links = await linksService.getLinksByUser(route.params.id);

  if (!links) {
    return NextResponse.json({ message: `Couldn't find links for user with id "${route.params.id}"`});
  }

  return NextResponse.json(links);
}