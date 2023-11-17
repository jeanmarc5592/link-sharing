import { ModifiedLink } from "@/lib/store/slices/linksSlice";
import { editLinkSchema } from "@/lib/validators/link";
import { AuthService } from "@/server/services/auth";
import { HttpService } from "@/server/services/http";
import { LinksService } from "@/server/services/links";
import { ValidationService } from "@/server/services/validation";
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

  return NextResponse.json(links);
};

export const POST = async (req: NextRequestWithAuth) => {
  const authService = new AuthService();
  const httpService = new HttpService();
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

  const createdLink = await linksService.addNewLink(userId);

  if (!createdLink) {
    return NextResponse.json({ message: 'Something went wrong adding the new link' }, { status: 500 });
  }

  return NextResponse.json({ ...createdLink }, { status: 201 });
};

export const PUT = async (req: NextRequestWithAuth) => {
  const authService = new AuthService();
  const linksService = new LinksService();
  const validationService = new ValidationService();

  const isRequestValid = await authService.validateRequest(req);

  if (isRequestValid !== "OK") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body: ModifiedLink[] = await req.json();

  const isBodyValid = validationService.validateSchema(editLinkSchema, body);

  if (isBodyValid !== "OK") {
    return NextResponse.json({ ...isBodyValid.errors }, { status: 400 });
  }

  if (body.length > 50) {
    return NextResponse.json({ message: "Maximum number of 50 links exceeded" }, { status: 400 });
  }
  
  const editedLinks = await linksService.bulkEditLinks(body);

  if (!editedLinks) {
    return NextResponse.json({ message: 'Something went wrong editing the links' }, { status: 500 });
  }
  
  return NextResponse.json({ ...editedLinks });
};