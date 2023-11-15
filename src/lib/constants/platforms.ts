import { Platform } from "@prisma/client";

export interface PlatformObject {
  id: Platform;
}

const mapPlatforms = (enumObj: Record<string, string>): PlatformObject[] => {
  const platformKeys = Object.keys(enumObj);

  return platformKeys.map((key) => ({ id: enumObj[key] as Platform }));
}

export const PLATFORMS = mapPlatforms(Platform);