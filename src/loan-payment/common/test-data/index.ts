import { AddLoanPaymentDto } from "../dto/add-loan-payment.dto";

const date = new Date();

export const addLoanPayment: AddLoanPaymentDto = {
  loanId: "to-be-filled",
  paymentAmount: 2100,
  paymentType: 1,
  remarks: "payment for the loan",
  screenshot_id: "sample-screenshot-id",
  loanPaid: date.toISOString(),
};
