import { Prisma } from "@prisma/client";
import { loanStatus } from "src/common/enums";
import { LoanStatus } from "src/utils";
import { AddLoanDto } from "../dto";

export const loanDefaultSelectionQuery = (): Prisma.LoanSelect => ({
  id: true,
  loanee: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
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
    include: {
      member: {
        select: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  },
  loanIssued: true,
});

export const newLoanQuery = (
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

export const validateCoMakersQuery = ({
  coMakers,
}: AddLoanDto): Prisma.LoanCoMakersWhereInput => {
  const memberIds = coMakers.map(({ memberId }) => memberId);
  return {
    AND: [
      {
        memberId: {
          in: memberIds,
        },
      },
      {
        loan: {
          status: {
            equals: loanStatus.LOAN_ACTIVE,
          },
        },
      },
    ],
  };
};

export const membersAndActiveQuery = (
  params: AddLoanDto
): Prisma.MemberWhereInput => {
  const { coMakers } = params;
  const memberIds = coMakers.map(({ memberId }) => memberId);

  return {
    AND: [
      {
        id: {
          in: memberIds,
        },
        member: true,
        active: true,
      },
    ],
  };
};
