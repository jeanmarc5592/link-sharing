import { NextRequest, NextResponse } from "next/server";
import { UsersService } from "@/server/services/users";
import { ValidationService } from '@/server/services/validation';

export const GET = async (req: NextRequest, route: { params: { id: string }}) => {
  const usersService = new UsersService();
  const validationService = new ValidationService();

  const userId = route?.params?.id;
  const isValidUUID = validationService.validateUUID(userId);

  if (isValidUUID !== "OK") {
    return NextResponse.json({ message: "Parameter 'id' is not a valid UUID"}, { status: 400 });
  }

  const user = await usersService.findById(route.params.id);

  if (!user) {
    return NextResponse.json({ message: `Couldn't find user with id "${route.params.id}"`});
  }

  return NextResponse.json({ ...user });
}