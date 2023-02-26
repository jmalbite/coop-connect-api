/*
  Warnings:

  - You are about to drop the column `contributionAmount` on the `Member` table. All the data in the column will be lost.
  - The `active` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `member` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "contributionAmount",
ADD COLUMN     "contributionPerMonth" DECIMAL(65,30),
DROP COLUMN "member",
ADD COLUMN     "member" BOOLEAN NOT NULL,
DROP COLUMN "active",
ADD COLUMN     "active" BOOLEAN;
