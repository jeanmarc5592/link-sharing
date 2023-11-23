import { UserUpdates } from '@/app/services/types';
import { AuthService } from '@/server/services/auth';
import { HttpService } from '@/server/services/http';
import { UsersService } from '@/server/services/users';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequestWithAuth) => {
  const httpService = new HttpService();
  const authService = new AuthService();
  const usersService = new UsersService();

  const isRequestValid = await authService.validateRequest(req);

  if (isRequestValid !== "OK") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = await httpService.extractToken(req);
  const userId = await httpService.getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ message: 'No "sub" in token' }, { status: 400 });
  }

  const user = await usersService.findById(userId);

  if (!user) {
    return NextResponse.json({ message: 'Something went wrong reading user' }, { status: 500 });
  }

  return NextResponse.json({ ...user });
};

export const PATCH = async (req: NextRequestWithAuth) => {
  const httpService = new HttpService();
  const authService = new AuthService();
  const usersService = new UsersService();

  const isRequestValid = await authService.validateRequest(req);

  if (isRequestValid !== "OK") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body: UserUpdates = await req.json();

  // TODO: Validate "body"

  const token = await httpService.extractToken(req);
  const userId = await httpService.getUserIdFromToken(token);

  if (!userId) {
    return NextResponse.json({ message: 'No "sub" in token' }, { status: 400 });
  }

  const user = await usersService.update(userId, body);

  if (!user) {
    return NextResponse.json({ message: 'Something went wrong updating user' }, { status: 500 });
  }

  return NextResponse.json({ ...user });
};