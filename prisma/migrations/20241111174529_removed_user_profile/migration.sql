/*
  Warnings:

  - You are about to drop the column `userProfileId` on the `Resume` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_userProfileId_fkey";

-- DropIndex
DROP INDEX "Resume_userProfileId_key";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "userProfileId";
