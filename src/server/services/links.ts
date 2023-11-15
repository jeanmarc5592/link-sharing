import { Link, PrismaClient } from "@prisma/client";
import prisma from "@/lib/db/prisma";

export class LinksService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async getLinksByUser(userId: string): Promise<Link[]> {
    return await this.prisma.link.findMany({
      where: { userId }
    });
  }
}