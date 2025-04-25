-- DropForeignKey
ALTER TABLE "Itinerary" DROP CONSTRAINT "Itinerary_pageId_fkey";

-- AlterTable
ALTER TABLE "Itinerary" ALTER COLUMN "pageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
