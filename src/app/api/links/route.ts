import prisma from "@/lib/db/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export const GET = async (req: any) => {
  const token = await getToken({ req, secret });

  // TODO: Secure API (only authenticated requests)

  const userId = token?.sub;

  const links = await prisma.link.findMany({
    where: { userId }
  });

  return NextResponse.json(links);
};