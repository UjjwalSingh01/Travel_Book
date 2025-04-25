/*
  Warnings:

  - You are about to drop the column `otherDetails` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the `PageItinerary` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pageId` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `location` on the `Itinerary` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Location" AS ENUM ('Latitude', 'Longitude');

-- DropForeignKey
ALTER TABLE "PageItinerary" DROP CONSTRAINT "PageItinerary_itineraryId_fkey";

-- DropForeignKey
ALTER TABLE "PageItinerary" DROP CONSTRAINT "PageItinerary_pageId_fkey";

-- AlterTable
ALTER TABLE "Itinerary" ADD COLUMN     "pageId" TEXT NOT NULL,
DROP COLUMN "location",
ADD COLUMN     "location" "Location" NOT NULL;

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "otherDetails";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bio" DROP NOT NULL;

-- DropTable
DROP TABLE "PageItinerary";

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
