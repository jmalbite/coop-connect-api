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

    const payment = await this.prisma.loansPayments.create({
      data: {
        ...addLoanPaymentQuery(params, transactionNum),
      },

      select: {
        ...loanPaymenSelectionQuery(),
      },
    });

    return payment;
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

    const updatedPayment = await this.prisma.loansPayments.update({
      where: { id },
      data: {
        ...updateLoanPaymentQuery(params),
      },

      select: {
        ...loanPaymenSelectionQuery(),
      },
    });

    return updatedPayment;
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
    return this.prisma.$transaction(async (tx) => {
      const payments = await tx.loansPayments.findMany({
        where: { loanId },
        select: { ...loanPaymenSelectionQuery() },
      });

      const totalPayments = await tx.loansPayments.aggregate({
        where: { loanId },
        _sum: {
          paymentAmount: true,
        },
      });

      return { ...payments, totalPayments: totalPayments._sum.paymentAmount };
    });
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
