/*
  Warnings:

  - You are about to drop the column `userId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `creatorExperience` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `addedById` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_experienceId_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_userId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "userId",
ADD COLUMN     "addedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "upVotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "creatorExperience";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "location";

-- DropTable
DROP TABLE "Reply";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
