/* eslint-disable prettier/prettier */
import { Prisma } from "@prisma/client";

export const selectedLoanQuery = (): Prisma.LoanArgs => {
  return {
    select: {
      id: true,
      loanee: {
        select: {
          firstName: true,
          lastName: true,
          active: true,
        },
      },
      loaneeId: true,
      lTransactionNumber: true,
      amountLoan: true,
      monthsPayable: true,
      interestPercentage: true,
      interestAmount: true,
      penaltyAmount: true,
      processingFee: true,
      status: true,
      remarks: true,
      screenshot_id: true,
      loanCoMakers: {
        select: {
          memberId: true,
          member: {
            select: {
              userName: true,
            },
          },
        },
      },
      loanIssued: true,
    },
  };
};
