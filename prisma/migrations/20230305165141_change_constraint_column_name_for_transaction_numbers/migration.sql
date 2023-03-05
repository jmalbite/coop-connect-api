/*
  Warnings:

  - You are about to drop the column `ctransactionNum` on the `Contribution` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cTransactionNumber]` on the table `Contribution` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lTransactionNumber]` on the table `Loan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lpTransactionNumber]` on the table `LoansPayments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cTransactionNumber` to the `Contribution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contribution" DROP COLUMN "ctransactionNum",
ADD COLUMN     "cTransactionNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contribution_cTransactionNumber_key" ON "Contribution"("cTransactionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Loan_lTransactionNumber_key" ON "Loan"("lTransactionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "LoansPayments_lpTransactionNumber_key" ON "LoansPayments"("lpTransactionNumber");
