/*
  Warnings:

  - Added the required column `password` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "contributionAmount" DROP NOT NULL,
ALTER COLUMN "active" DROP NOT NULL,
ALTER COLUMN "active" DROP DEFAULT;
