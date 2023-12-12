import prisma from "@/lib/db/prisma";
import { DateUtils } from "@/lib/utils/date";
import { LinkAnalytics, PrismaClient } from "@prisma/client";

export class LinksAnalyticsService {
  private readonly prisma: PrismaClient;
  private readonly dateUtils = DateUtils;

  constructor() {
    this.prisma = prisma;
  }

  async getByTimespan(span: "7D", linkId: string): Promise<LinkAnalytics[]> {
    if (span === "7D") {
      return await this.getLast7Days(linkId) || [];
    }

    return [];
  }

  mapData (analytics: LinkAnalytics[]): { date: string; clicks: string; }[] {
    return analytics.map((data) => {
      return {
        date: this.dateUtils.formatDate(data.createdAt),
        clicks: data.clicks.toString(),
      };
    });
  }

  private async getLast7Days(linkId: string): Promise<LinkAnalytics[] | null> {
    const today = this.dateUtils.getToday();
    const sevenDaysAgo = this.dateUtils.getSevenDaysAgo();

    try {
      const analytics = await this.prisma.linkAnalytics.findMany({
        where: {
          linkId,
          createdAt: {
            gte: new Date(sevenDaysAgo + 'T00:00:00.000Z'),
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