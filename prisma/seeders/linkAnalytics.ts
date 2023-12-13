import { PrismaClient, LinkAnalytics } from "@prisma/client";
import { faker } from '@faker-js/faker';
import { DateUtils } from "../../src/lib/utils/date";

export class LinkAnalyticsSeeder {
  private dateUtils = DateUtils;

  constructor(private readonly prisma: PrismaClient) {}

  async generateOne(linkId: string, createdAt: Date): Promise<LinkAnalytics> {
    return await this.prisma.linkAnalytics.create({
      data: {
        linkId,
        clicks: faker.number.int({ min: 50, max: 150 }),
        createdAt,
      }
    });
  }

  async generateMany(linkId: string): Promise<LinkAnalytics[]> {
    const last7Days = this.dateUtils.generateLast7Days();
    const result: LinkAnalytics[] = [];

    last7Days.forEach(async (day) => {
      const analytics = await this.generateOne(linkId, day);
      result.push(analytics);
    });

    return result;
  }
}