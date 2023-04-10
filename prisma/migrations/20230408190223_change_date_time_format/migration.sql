-- AlterTable
ALTER TABLE "Contribution" ALTER COLUMN "contributionDate" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Loan" ALTER COLUMN "loanIssued" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "LoansPayments" ALTER COLUMN "loanPaid" SET DATA TYPE DATE;
