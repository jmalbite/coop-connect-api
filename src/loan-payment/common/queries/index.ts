import { Prisma } from "@prisma/client";
import { AddLoanPaymentDto } from "../dto/add-loan-payment.dto";
import { UpdateLoanPaymentDto } from "../dto/update-loan-payment.dto";

export const addLoanPaymentQuery = (
  params: AddLoanPaymentDto,
  transactionNum: string
): Prisma.XOR<
  Prisma.LoansPaymentsCreateInput,
  Prisma.LoansPaymentsUncheckedCreateInput
> => ({
  loanId: params.loanId,
  lpTransactionNumber: transactionNum,
  paymentAmount: params.paymentAmount,
  paymentType: params.paymentType,
  remarks: params.remarks,
  screenshot_id: params.screenshot_id,
  loanPaid: params.loanPaid,
});

export const updateLoanPaymentQuery = (
  params: UpdateLoanPaymentDto
): Prisma.XOR<
  Prisma.LoansPaymentsUpdateInput,
  Prisma.LoansPaymentsUncheckedUpdateInput
> => ({
  paymentAmount: params.paymentAmount,
  paymentType: params.paymentType,
  remarks: params.remarks,
  screenshot_id: params.screenshot_id,
  loanPaid: params.loanPaid,
});

export const loanPaymenSelectionQuery = (): Prisma.LoansPaymentsSelect => ({
  id: true,
  loanId: true,
  lpTransactionNumber: true,
  paymentAmount: true,
  paymentType: true,
  remarks: true,
  screenshot_id: true,
  loanPaid: true,
  createdAt: true,
});
