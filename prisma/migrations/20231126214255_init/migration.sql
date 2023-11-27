-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "contactNumber" TEXT,
    "contributionPerMonth" DECIMAL(12,2) NOT NULL,
    "member" BOOLEAN NOT NULL,
    "active" BOOLEAN,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "cTransactionNumber" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "paymentType" INTEGER NOT NULL,
    "remarks" TEXT,
    "screenshot_id" TEXT,
    "contributionDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" TEXT NOT NULL,
    "loaneeId" TEXT NOT NULL,
    "lTransactionNumber" TEXT NOT NULL,
    "amountLoan" DECIMAL(12,2) NOT NULL,
    "monthsPayable" INTEGER NOT NULL,
    "interestPercentage" DOUBLE PRECISION NOT NULL,
    "interestAmount" DECIMAL(12,2) NOT NULL,
    "processingFee" DECIMAL(12,2),
    "penaltyAmount" DECIMAL(12,2),
    "status" INTEGER NOT NULL,
    "remarks" TEXT,
    "screenshot_id" TEXT,
    "loanIssued" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoansPayments" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "lpTransactionNumber" TEXT NOT NULL,
    "paymentAmount" DECIMAL(12,2) NOT NULL,
    "remarks" TEXT,
    "loanPaid" DATE NOT NULL,
    "screenshot_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoansPayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanCoMakers" (
    "loanId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "LoanCoMakers_pkey" PRIMARY KEY ("loanId","memberId")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "permissionName" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolesPermissions" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "RolesPermissions_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contribution_cTransactionNumber_key" ON "Contribution"("cTransactionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Loan_lTransactionNumber_key" ON "Loan"("lTransactionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "LoansPayments_lpTransactionNumber_key" ON "LoansPayments"("lpTransactionNumber");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_loaneeId_fkey" FOREIGN KEY ("loaneeId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoansPayments" ADD CONSTRAINT "LoansPayments_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanCoMakers" ADD CONSTRAINT "LoanCoMakers_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanCoMakers" ADD CONSTRAINT "LoanCoMakers_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesPermissions" ADD CONSTRAINT "RolesPermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesPermissions" ADD CONSTRAINT "RolesPermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
