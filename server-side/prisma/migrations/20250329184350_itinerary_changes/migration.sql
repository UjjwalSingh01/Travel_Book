/*
  Warnings:

  - You are about to drop the column `ratings` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `visitedCount` on the `Itinerary` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "ratings",
DROP COLUMN "visitedCount",
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;
