import prisma from "@/lib/db/prisma";
import { publicProcedure } from "../trpc"

export const usersService = {
  getUsers: publicProcedure.query(async () => {
    return await prisma.user.findMany();
  }),
};