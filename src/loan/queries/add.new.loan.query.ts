/* eslint-disable prettier/prettier */
import { Prisma } from "@prisma/client";
import { AddLoanDto } from "../dto";
import { LoanStatus } from "src/utils";

export const addNewLoanQuery = (
  params: AddLoanDto,
  lTransactionNumber: string
): Prisma.XOR<Prisma.LoanCreateInput, Prisma.LoanUncheckedCreateInput> => {
  const {
    loaneeId,
    amountLoan,
    monthsPayable,
    interestPercentage,
    interestAmount,
    processingFee,
    penaltyAmount,
    remarks,
    screenshot_id,
    coMakers,
    loanIssued,
  } = params;

  return {
    loaneeId,
    amountLoan,
    monthsPayable,
    lTransactionNumber,
    interestPercentage,
    interestAmount,
    processingFee,
    penaltyAmount,
    status: LoanStatus.LOAN_ACTIVE,
    remarks,
    screenshot_id,
    loanCoMakers: {
      create: coMakers.map(({ memberId }) => ({
        memberId,
      })),
    },
    loanIssued,
  };
};
