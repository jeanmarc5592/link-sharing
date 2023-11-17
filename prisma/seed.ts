import { LinksSeeder } from './seeders/links';
import { UsersSeeder } from './seeders/users';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const usersSeeder = new UsersSeeder(prisma);
  const user = await usersSeeder.generateOne();

  const linksSeeder = new LinksSeeder(prisma);
  await linksSeeder.generateOne(user.id);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });