/*
  Warnings:

  - You are about to drop the column `username` on the `Member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Member_username_key";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "username",
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member_userName_key" ON "Member"("userName");
