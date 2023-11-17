import { Link, PrismaClient } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { ArrayUtils } from "@/lib/utils/array";
import { ModifiedLink } from "@/lib/store/slices/linksSlice";

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
      return ArrayUtils.sortByCreationDate(links, { order: "DESC" });
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

  async editLink(link: Link): Promise<Link | null> {
    try {
      const updatedLink = await prisma.link.update({
        where: { id: link.id, userId: link.userId },
        data: { 
          href: link.href,
          platform: link.platform,
        },
      });
      return updatedLink;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async bulkEditLinks(links: ModifiedLink[]): Promise<Link[] | null> {
    if (links.length === 0) {
      console.error("At least one link is required for bulk edit", links);
      return null;
    }

    if (this.checkLinksModification(links) !== "OK") {
      return null;
    }

    const updatedLinks: Link[] = [];

    try {
      await Promise.all(links.map(async (modifiedLink) => {
        const updatedLink = await this.editLink(modifiedLink);

        if (!updatedLink) {
          return null;
        }

        updatedLinks.push(updatedLink);
      }));

      return updatedLinks;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private checkLinksModification(links: ModifiedLink[]): null | "OK" {
    const linksAreModified = links.every((link) => link.isModified === true);

    if (!linksAreModified) {
      console.error("All provided links must be modified", links);
      return null;
    }

    return "OK";
  }
}