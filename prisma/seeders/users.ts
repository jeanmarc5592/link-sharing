import { PrismaClient, User } from "@prisma/client";

export class UsersSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async generateOne(): Promise<User> {
    return await this.prisma.user.upsert({
      where: { email: "user@email.com" },
      update: {},
      create: {
        email: "user@email.com",
        password: "$2a$12$XGxkVDB5AduU5nt1SaPAwe6X0.Nb4.UEd3i26fokZzQIE.eXwTlgG", // password
     }
    });
  }
}