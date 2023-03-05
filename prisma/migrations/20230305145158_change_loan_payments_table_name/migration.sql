/*
  Warnings:

  - You are about to drop the `loansPayments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "loansPayments" DROP CONSTRAINT "loansPayments_loanId_fkey";

-- DropTable
DROP TABLE "loansPayments";

-- CreateTable
CREATE TABLE "LoansPayments" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "lpTransactionNumber" TEXT NOT NULL,
    "paymentAmount" DECIMAL(65,30) NOT NULL,
    "remarks" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoansPayments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoansPayments" ADD CONSTRAINT "LoansPayments_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
