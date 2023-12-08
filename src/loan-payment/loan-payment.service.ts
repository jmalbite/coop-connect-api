import { Injectable, NotFoundException } from "@nestjs/common";
import { LoanService } from "src/loan/loan.service";
import { PrismaService } from "src/prisma/prisma.service";
import {
  TransactionNumberConstant,
  TransactionNumberGenerator,
} from "src/utils";
import { AddLoanPaymentDto } from "./common/dto/add-loan-payment.dto";
import { UpdateLoanPaymentDto } from "./common/dto/update-loan-payment.dto";
import {
  addLoanPaymentQuery,
  loanPaymenSelectionQuery,
  updateLoanPaymentQuery,
} from "./common/queries/index";

@Injectable()
export class LoanPaymentService {
  constructor(
    private prisma: PrismaService,
    private loan: LoanService,
    private transConstant: TransactionNumberConstant,
    private transGenerator: TransactionNumberGenerator
  ) {}

  async addLoanPayment(params: AddLoanPaymentDto) {
    await this.loan.getLoanById(params.loanId);

    const transConstant = this.transConstant.classReference.LOAN_PAYMENT;
    const transactionNum =
      this.transGenerator.generateTransactionNumber(transConstant);

    return this.prisma.$transaction(async (tx) => {
      const payment = await tx.loansPayments.create({
        data: {
          ...addLoanPaymentQuery(params, transactionNum),
        },
        select: {
          ...loanPaymenSelectionQuery(),
        },
      });

      const totalPayments = await tx.loansPayments.aggregate({
        where: { loanId: params.loanId },
        _sum: {
          paymentAmount: true,
        },
      });

      const { paymentAmount } = totalPayments._sum;

      await this.loan.updateRemainingBalance(
        params.loanId,
        Number(paymentAmount)
      );

      return payment;
    });
  }

  async updateLoanPayment(params: UpdateLoanPaymentDto) {
    const { id, loanId } = params;

    const loanPayment = await this.prisma.loansPayments.findUnique({
      where: { id },
      select: {
        paymentAmount: true,
      },
    });

    if (!loanPayment) throw new NotFoundException("Loan payment not found");

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

      const totalPayments = await tx.loansPayments.aggregate({
        where: { loanId },
        _sum: {
          paymentAmount: true,
        },
      });

      const { paymentAmount } = totalPayments._sum;

      await this.loan.updateRemainingBalance(loanId, Number(paymentAmount));

      return updatedPayment;
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

  async getLoanPaymentsByLoanId(loanId: string) {
    const hasPaymentForTheLoan = await this.prisma.loansPayments.findFirst({
      where: { loanId },
    });

    if (!hasPaymentForTheLoan) return [];

    const payments = await this.prisma.loansPayments.findMany({
      where: { loanId },
      select: { ...loanPaymenSelectionQuery() },
    });

    return payments;
  }
}
