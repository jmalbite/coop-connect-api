/*
  Warnings:

  - You are about to alter the column `amount` on the `Contribution` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to alter the column `amountLoan` on the `Loan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to alter the column `interestAmount` on the `Loan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to alter the column `penaltyAmount` on the `Loan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to alter the column `paymentAmount` on the `LoansPayments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to alter the column `contributionPerMonth` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - Made the column `contributionPerMonth` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contribution" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "Loan" ALTER COLUMN "amountLoan" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "interestAmount" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "penaltyAmount" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "LoansPayments" ALTER COLUMN "paymentAmount" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "contributionPerMonth" SET NOT NULL,
ALTER COLUMN "contributionPerMonth" SET DATA TYPE DECIMAL(12,2);
