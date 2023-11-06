import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db/prisma";

export const GET = async (req: NextRequest) => {
  const users = await prisma.user.findMany();
  return NextResponse.json({ users });
}