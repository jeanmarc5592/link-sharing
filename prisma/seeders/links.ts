import { PrismaClient, Link } from "@prisma/client";

export class LinksSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async generateOne(userId: string): Promise<Link> {
    return await this.prisma.link.create({
      data: {
        href: "https://www.github.com",
        platform: "GITHUB",
        userId,
        order: 1,
      }
    });
  }
}