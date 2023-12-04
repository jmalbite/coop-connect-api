import { AddLoanPaymentDto } from "../dto/add-loan-payment.dto";
import { UpdateLoanPaymentDto } from "../dto/update-loan-payment.dto";

const date = new Date();

export const addLoanPayment: AddLoanPaymentDto = {
  loanId: "to-be-filled",
  paymentAmount: 2100,
  paymentType: 1,
  remarks: "payment for the loan",
  screenshot_id: "sample-screenshot-id",
  loanPaid: date.toISOString(),
};

export const updateLoanPayment: UpdateLoanPaymentDto = {
  id: "to-be-filled",
  loanId: "to-be-filled",
  paymentAmount: 2100,
  paymentType: 1,
  remarks: "change remarks",
  screenshot_id: "sample-screenshot-id",
  loanPaid: date.toISOString(),
};

export const changeAmountUpdate: UpdateLoanPaymentDto = {
  id: "to-be-filled",
  loanId: "to-be-filled",
  paymentAmount: 3000,
  paymentType: 1,
  remarks: "change remarks",
  screenshot_id: "sample-screenshot-id",
  loanPaid: date.toISOString(),
};
