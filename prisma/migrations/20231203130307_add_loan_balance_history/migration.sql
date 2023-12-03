-- CreateTable
CREATE TABLE "LoanBalanceHistory" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "remainingBalance" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanBalanceHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoanBalanceHistory" ADD CONSTRAINT "LoanBalanceHistory_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
