-- DropForeignKey
ALTER TABLE "LinkAnalytics" DROP CONSTRAINT "LinkAnalytics_linkId_fkey";

-- AddForeignKey
ALTER TABLE "LinkAnalytics" ADD CONSTRAINT "LinkAnalytics_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
