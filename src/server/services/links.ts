import { Link, PrismaClient } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { LinkSchemaType } from "@/lib/validators/link";

export class LinksService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async getLinksByUser(userId: string): Promise<Link[] | null> {
    try {
      const links = await this.prisma.link.findMany({
        where: { userId }
      });
      return links;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async addNewLink(userId: string): Promise<Link | null> {
    try {
      const createdLink = await this.prisma.link.create({
        data: {
          href: "https://www.github.com",
          platform: "GITHUB",
          userId,
        }
      });
      return createdLink;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deleteLink(linkId: string): Promise<Link | null> {
    try {
      const deletedLink = await prisma.link.delete({
        where: {
          id: linkId,
        }
      });
      return deletedLink;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}