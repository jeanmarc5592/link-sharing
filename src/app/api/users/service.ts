import prisma from "@/lib/db/prisma";
import { User } from "@prisma/client";

export const getAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};