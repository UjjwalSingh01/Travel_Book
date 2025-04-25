/*
  Warnings:

  - Changed the type of `location` on the `Itinerary` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "location",
ADD COLUMN     "location" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Page" ALTER COLUMN "location" DROP NOT NULL;

-- DropEnum
DROP TYPE "Location";
