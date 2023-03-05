-- AlterTable
ALTER TABLE "Contribution" ALTER COLUMN "remarks" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Loan" ALTER COLUMN "remarks" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LoansPayments" ALTER COLUMN "remarks" DROP NOT NULL;
