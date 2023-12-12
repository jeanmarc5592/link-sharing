import prisma from "@/lib/db/prisma";
import { LinkAnalytics, PrismaClient } from "@prisma/client";

export class LinksAnalyticsService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async getByTimespan(span: "7D", linkId: string): Promise<LinkAnalytics[]> {
    if (span === "7D") {
      return await this.getLast7Days(linkId) || [];
    }

    return [];
  }

  mapData (analytics: LinkAnalytics[]): { date: Date; clicks: string; }[] {
    return analytics.map((data) => {
      return {
        date: data.createdAt, // TODO: Format into something like "Dec 5"
        clicks: data.clicks.toString(),
      };
    });
  }

  private async getLast7Days(linkId: string): Promise<LinkAnalytics[] | null> {
    // TODO: Move to "DateUtils"
    const today = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const formattedSevenDaysAgo = sevenDaysAgo.toISOString().split('T')[0]; 

    try {
      const analytics = await this.prisma.linkAnalytics.findMany({
        where: {
          linkId,
          createdAt: {
            gte: new Date(formattedSevenDaysAgo + 'T00:00:00.000Z'),
            lte: new Date(today + 'T23:59:59.999Z'),
          },
        },
        orderBy: {
          createdAt: 'asc',
        }
      });

      // TODO: Fill the missing days 
      return analytics;
    } catch (error) {
      console.error(error);
      return null;
    }
  } 
}