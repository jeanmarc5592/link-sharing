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
    const filledAnalytics = this.fillMissingDays(analytics);

    return filledAnalytics.map((data) => {
      return {
        date: this.dateUtils.formatDate(data.date),
        clicks: data.clicks,
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

      return analytics;
    } catch (error) {
      console.error(error);
      return null;
    }
  } 

  private fillMissingDays(analytics: LinkAnalytics[]): { date: Date; clicks: string; }[]  {
    const last7Days = this.dateUtils.generateLast7Days();

    return last7Days.map((date) => {
      const analyticsEntry = analytics.find((entry) => this.dateUtils.getDate(entry.createdAt) === this.dateUtils.getDate(date));
      return {
        date,
        clicks: analyticsEntry ? analyticsEntry.clicks.toString() : "0"
      }
    })
  }
}