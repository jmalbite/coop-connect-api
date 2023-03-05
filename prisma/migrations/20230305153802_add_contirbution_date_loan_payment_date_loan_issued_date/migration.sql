/*
  Warnings:

  - Added the required column `contributionDate` to the `Contribution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanIssued` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanPaid` to the `LoansPayments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contribution" ADD COLUMN     "contributionDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "loanIssued" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LoansPayments" ADD COLUMN     "loanPaid" TIMESTAMP(3) NOT NULL;
