import { Link, LinkAnalytics, PrismaClient } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { ModifiedLink } from "@/lib/store/slices/linksSlice";
import { AnalyticsData } from "@/app/components/types";
import { LinksAnalyticsService } from "./linksAnalytics";

export class LinksService {
  private readonly prisma: PrismaClient;
  private readonly linksAnalyticsService: LinksAnalyticsService;

  constructor() {
    this.prisma = prisma;
    this.linksAnalyticsService = new LinksAnalyticsService();
  }

  async getLinksByUser(userId: string): Promise<Link[] | null> {
    try {
      const links = await this.prisma.link.findMany({
        where: { userId }
      });
      return this.sortByOrder(links);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getLinkById(id: string): Promise<Link | null> {
    try {
      return await this.prisma.link.findFirst({
        where: { id }
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async addNewLink(userId: string): Promise<Link | null> {
    const userLinks = await this.getLinksByUser(userId);

    if (!userLinks) {
      return null;
    }

    try {
      const createdLink = await this.prisma.link.create({
        data: {
          href: "https://www.github.com",
          platform: "GITHUB",
          userId,
          order: userLinks.length + 1,
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
          order: link.order,
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

  async reorderLinks(links: Link[]): Promise<Link[] | null> {
    if (links.length === 0) {
      console.error("At least one link is required for reordering", links);
      return null;
    }

    const reorderedLinks: Link[] = [];

    try {
      await Promise.all(links.map(async (link, index) => {
        const reorderedLink = await this.updateOrderByIndex(index, link);

        if (!reorderedLink) {
          return null;
        }

        reorderedLinks.push(reorderedLink);
      }));

      return reorderedLinks;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAnalytics(links: Link[]): Promise<AnalyticsData[] | null> {
    if (links.length === 0) {
      return [];
    }

    const linksAnalytics: AnalyticsData[] = [];

    try {
      await Promise.all(links.map(async (link) => {
        const analyticsData = await this.linksAnalyticsService.getByTimespan("7D", link.id) as LinkAnalytics[];

        const analytics: AnalyticsData = {
          linkName: link.platform,
          analytics: this.linksAnalyticsService.mapData(analyticsData),
        };

        linksAnalytics.push(analytics);
      }));

      return linksAnalytics;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async addAnalytics(linkId: string): Promise<LinkAnalytics | null> {
    const link = await this.getLinkById(linkId);

    if (!link) {
      return null;
    }

    let analyticsDataOfToday = await this.linksAnalyticsService.getByTimespan("TODAY", linkId) as LinkAnalytics | null;

    if (!analyticsDataOfToday) {
      const newAnalytics = await this.linksAnalyticsService.create(linkId);

      if (!newAnalytics) {
        return null;
      }

      analyticsDataOfToday = newAnalytics;
    } else {
      analyticsDataOfToday = await this.linksAnalyticsService.update(analyticsDataOfToday.id, { clicks: analyticsDataOfToday.clicks + 1 });
    }

    return analyticsDataOfToday;
  }

  private checkLinksModification(links: ModifiedLink[]): null | "OK" {
    const linksAreModified = links.every((link) => link.isModified === true);

    if (!linksAreModified) {
      console.error("All provided links must be modified", links);
      return null;
    }

    return "OK";
  }

  private sortByOrder(links: Link[]): Link[] {
    return links.sort((a, b) => {
      if (!("order" in a) || !("order" in b)) {
        console.error("Key 'order' must be in every element");
        return 0;
      }

      return a.order - b.order;
    });
  }

  private async updateOrderByIndex(index: number, link: ModifiedLink): Promise<ModifiedLink | null> {
    if (!link) {
      return null;
    }

    Object.assign(link, { order: index + 1});

    return await this.editLink(link);
  }
}