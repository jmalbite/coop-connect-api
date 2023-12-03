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
    if (!this.isLoanExists(params.loanId))
      throw new NotFoundException("Loan not found");

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
    if (!this.isLoanExists(params.id))
      throw new NotFoundException("Loan not found");

    const { id } = params;

    return this.prisma.$transaction(async (tx) => {
      const updatePayment = await tx.loansPayments.update({
        where: { id },
        data: {
          ...updateLoanPaymentQuery(params),
        },

        select: {
          ...loanPaymenSelectionQuery(),
        },
      });
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

  private async isLoanExists(loanId: string): Promise<boolean> {
    const loan = await this.loan.getLoanById(loanId);

    return loan ? true : false;
  }
}
