import { AddLoanDto } from "../dto";

const newDate = new Date();

export const addLoan: AddLoanDto = {
  loaneeId: "to-be-filled",
  amountLoan: 10000,
  monthsPayable: 4,
  interestInPercentage: 2,
  interestInAmount: 2500,
  totalAmountToBePaid: 11000,
  paymentPerPayDay: 2100,
  processingFee: 200,
  remarks: "this is new loan",
  screenshot_id: "sample screenshot_id",
  coMakers: [],
  loanIssued: newDate.toISOString(),
};
