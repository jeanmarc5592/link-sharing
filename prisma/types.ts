import { PrismaClient } from "@prisma/client";

export interface SeederInterface {
  generateOne?: (prisma: PrismaClient) => Promise<any>;
  generateMany?: (prisma: PrismaClient) => Promise<any[]>;
}