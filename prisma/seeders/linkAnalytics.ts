import { PrismaClient, LinkAnalytics } from "@prisma/client";
import { faker } from '@faker-js/faker';

export class LinkAnalyticsSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async generateOne(linkId: string): Promise<LinkAnalytics> {
    return await this.prisma.linkAnalytics.create({
      data: {
        linkId,
        clicks: faker.number.int(250),
      }
    });
  }
}