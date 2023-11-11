import prisma from "@/lib/db/prisma";
import { User } from "@prisma/client";

export class UsersService {
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });
     
      if (!user) {
        console.log(`User with email "${email}" not found.`)
        return null;
      }

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async create(user: Pick<User, "email" | "password">): Promise<User | null> {
    try {
      const createdUser = await prisma.user.create({
        data: {
          ...user,
        }
      });
      return createdUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}