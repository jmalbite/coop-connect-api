import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AddLoanPaymentDto } from "./common/dto/add-loan-payment.dto";
import { LoanService } from "src/loan/loan.service";
import {
  addLoanPaymentQuery,
  loanPaymenSelectionQuery,
} from "./common/queries/index";
import {
  TransactionNumberConstant,
  TransactionNumberGenerator,
} from "src/utils";
import { UpdateLoanPaymentDto } from "./common/dto/update-loan-payment.dto";
import { updateLoanPaymentQuery } from "./common/queries/index";

@Injectable()
export class LoanPaymentService {
  constructor(
    private prisma: PrismaService,
    private loan: LoanService,
    private transConstant: TransactionNumberConstant,
    private transGenerator: TransactionNumberGenerator
  ) {}

  async addLoanPayment(params: AddLoanPaymentDto) {
    await this.isLoanExists(params.loanId);

    const transConstant = this.transConstant.classReference.LOAN_PAYMENT;
    const transactionNum =
      this.transGenerator.generateTransactionNumber(transConstant);

    return this.prisma.$transaction(async (tx) => {
      //create first loan payment
      const payment = await tx.loansPayments.create({
        data: {
          ...addLoanPaymentQuery(params, transactionNum),
        },

        select: {
          ...loanPaymenSelectionQuery(),
        },
      });

      //update loan
      const updatedLoan = await this.loan.decrementLoanBalance(
        params.loanId,
        params.paymentAmount
      );

      return { ...payment, updatedLoan };
    });
  }

  async updateLoanPayment(params: UpdateLoanPaymentDto) {
    const { id } = params;

    const loanPayment = await this.prisma.loansPayments.findUnique({
      where: { id },
      select: {
        paymentAmount: true,
      },
    });

    if (!loanPayment) throw new NotFoundException("Loan payment not found");

    const currentAmount = Number(loanPayment.paymentAmount);

    return this.prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.loansPayments.update({
        where: { id },
        data: {
          ...updateLoanPaymentQuery(params),
        },

        select: {
          ...loanPaymenSelectionQuery(),
        },
      });

      const updatedAmount = updatedPayment.paymentAmount;

      if (currentAmount === Number(updatedAmount)) return updatedPayment;

      console.log("here", "👺");

      const updatedLoanBalance = await this.loan.decrementLoanBalance(
        params.loanId,
        Number(updatedAmount)
      );

      return { ...updatedPayment, updatedLoan: updatedLoanBalance };
    });
  }

  async getLoanPaymentById(id: string) {
    const payment = await this.prisma.loansPayments.findUnique({
      where: { id },
      select: { ...loanPaymenSelectionQuery() },
    });

    if (!payment) throw new NotFoundException("Payment not found");

    return payment;
  }

  async getLoanPaymentByTransactionNum(lpTransactionNumber: string) {
    const payment = await this.prisma.loansPayments.findUnique({
      where: { lpTransactionNumber },
      select: { ...loanPaymenSelectionQuery() },
    });

    if (!payment) throw new NotFoundException("Payment not found");

    return payment;
  }

  /**
   * check if the loan exists
   * @param  {string} loanId
   */
  private async isLoanExists(loanId: string) {
    const loan = await this.loan.getLoanById(loanId);

    if (!loan) throw new NotFoundException("Loan not found");
  }

  /**
   * get the current amount for checking
   * if the update is the same amount or not
   * @param  {string} id
   * @returns Promise
   */
  private async getCurrentAmount(id: string): Promise<number> {
    const currentAmount = await this.prisma.loansPayments.findUnique({
      where: { id },
      select: { paymentAmount: true },
    });

    return Number(currentAmount.paymentAmount);
  }
}
