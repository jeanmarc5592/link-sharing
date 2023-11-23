import { UserUpdates } from "@/app/services/types";
import prisma from "@/lib/db/prisma";
import { User } from "@prisma/client";

export class UsersService {
  async findById(id: string): Promise<Partial<User> | null> {
    try {
      const user = await prisma.user.findFirst({
        where: { id }
      });

      if (!user) {
        console.log(`User with id "${id}" not found.`)
        return null;
      }

      return this.stripSensitiveData(user);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

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

  async update(userId: string, updates: UserUpdates): Promise<Partial<User> | null> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId},
        data: {
          ...updates
        }
      });
      return this.stripSensitiveData(updatedUser);
    } catch (error) {
      console.error(error);
      return null;
    } 
  }

  private stripSensitiveData(user: User): Partial<User> {
    const { password, ...restUser } = user;
    
    return restUser;
  }
}