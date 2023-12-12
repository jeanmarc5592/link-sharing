import { Platform } from "@prisma/client";

export type AnalyticsData = {
  linkName: Platform;
  analytics: {
    date: Date;
    clicks: string;
  }[]
}