import { NextResponse } from "next/server";
import { getAllUsers } from "./service";

export const GET = async () => {
  const users = await getAllUsers();
  return NextResponse.json({ users });
}