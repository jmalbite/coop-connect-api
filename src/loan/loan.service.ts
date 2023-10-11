import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { CoMakersException, PrismaInitException } from "src/common";
import { AddLoanDto } from "./dto";
import { addNewLoanQuery, selectedLoanQuery } from "./queries";
import {
  TransactionNumberConstant,
  TransactionNumberGenerator,
} from "src/utils";
import { LoanUtilitiesService } from "./utils";

@Injectable()
export class LoanService {
  constructor(
    private prisma: PrismaService,
    private utils: LoanUtilitiesService,
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

    const validateCoMakers = await this.utils.isMemberAlreadyCoMaker(params);

    if (validateCoMakers.length) {
      throw new CoMakersException(
        this.utils.serializeMessageCoMakers(validateCoMakers)
      );
    }

    try {
      const newLoan = await this.prisma.loan.create({
        data: {
          ...addNewLoanQuery(params, transactionNum),
        },
        ...selectedLoanQuery(),
      });

      return newLoan;
    } catch (error) {
      throw new PrismaInitException(error?.message);
    }
  }
}
