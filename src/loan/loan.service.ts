import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { PrismaInitException } from "src/common";
import { AddLoanDto } from "./dto";
import { addNewLoanQuery, selectedLoanQuery } from "./queries";
import {
  TransactionNumberConstant,
  TransactionNumberGenerator,
} from "src/utils";

@Injectable()
export class LoanService {
  constructor(
    private prisma: PrismaService,
    private transConstant: TransactionNumberConstant,
    private transGenerator: TransactionNumberGenerator
  ) {}

  async getLoans() {
    try {
      return await this.prisma.loan.findMany({
        ...selectedLoanQuery(),
      });
    } catch (error) {
      throw new PrismaInitException();
    }
  }

  async addNewLoan(params: AddLoanDto) {
    const transactionNum = this.transGenerator.generateTransactionNumber(
      this.transConstant.classReference.LOAN
    );

    try {
      const newLoan = await this.prisma.loan.create({
        data: {
          ...addNewLoanQuery(params, transactionNum),
        },
        ...selectedLoanQuery(),
      });

      return newLoan;
    } catch (error) {
      throw new PrismaInitException();
    }
  }
}
