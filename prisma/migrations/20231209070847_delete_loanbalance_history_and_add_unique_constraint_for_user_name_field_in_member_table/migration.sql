/*
  Warnings:

  - You are about to drop the `LoanBalanceHistory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userName]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "LoanBalanceHistory" DROP CONSTRAINT "LoanBalanceHistory_loanId_fkey";

-- DropTable
DROP TABLE "LoanBalanceHistory";

-- CreateIndex
CREATE UNIQUE INDEX "Member_userName_key" ON "Member"("userName");
