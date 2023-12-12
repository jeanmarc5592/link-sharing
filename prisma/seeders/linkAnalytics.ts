import { PrismaClient, Link, LinkAnalytics } from "@prisma/client";

export class LinkAnalyticsSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async generateOne(linkId: string): Promise<LinkAnalytics> {
    return await this.prisma.linkAnalytics.create({
      data: {
        linkId,
        clicks: 23, // TODO: Choose random number
      }
    });
  }

  // TODO: Implement "generateMany"
}