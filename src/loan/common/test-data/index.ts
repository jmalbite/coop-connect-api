import { AddLoanDto } from "../dto";

const newDate = new Date();

export const addLoan: AddLoanDto = {
  loaneeId: "to-be-filled",
  amountLoan: 10000,
  monthsPayable: 4,
  interestPercentage: 2,
  interestAmount: 2500,
  processingFee: 200,
  remarks: "this is new loan",
  screenshot_id: "sample screenshot_id",
  penaltyAmount: 200,
  coMakers: [],
  loanIssued: newDate.toISOString(),
};
