import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CoMakersException } from "src/common";
import { PrismaService } from "src/prisma/prisma.service";
import {
  TransactionNumberConstant,
  TransactionNumberGenerator,
} from "src/utils";
import { AddLoanDto } from "./common/dto";
import {
  loanDefaultSelectionQuery,
  newLoanQuery,
} from "./common/queries/index";
import { LoanUtilitiesService } from "./common/utils/loan-utilities.service";

@Injectable()
export class LoanService {
  constructor(
    private prisma: PrismaService,
    private utils: LoanUtilitiesService,
    private transConstant: TransactionNumberConstant,
    private transGenerator: TransactionNumberGenerator
  ) {}

  //NOTE: add pagination once the frontend ready for build
  async getLoans() {
    return await this.prisma.loan.findMany({
      select: {
        ...loanDefaultSelectionQuery(),
      },
    });
  }

  async addNewLoan(params: AddLoanDto) {
    if (params.coMakers.length < 2)
      throw new BadRequestException("Must have at least 2 comakers");

    const isValidMembers = await this.utils.isMembersAndActive(params);

    //checking if it is a member and active
    if (!isValidMembers)
      throw new BadRequestException(
        "One of the members is invalid, please check members details"
      );

    const validateCoMakers = await this.utils.isMemberAlreadyCoMaker(params);

    //checking if selected co makers already a co maker from another loanee
    if (validateCoMakers.length) {
      const message = this.utils.serializeMessageCoMakers(validateCoMakers);

      throw new CoMakersException(message);
    }

    const transactionNum = this.transGenerator.generateTransactionNumber(
      this.transConstant.classReference.LOAN
    );

    const newLoan = await this.prisma.loan.create({
      data: {
        ...newLoanQuery(params, transactionNum),
      },

      select: {
        ...loanDefaultSelectionQuery(),
      },
    });

    return newLoan;
  }

  async getLoanById(id: string) {
    const loan = await this.prisma.loan.findFirst({
      where: { id },

      select: {
        ...loanDefaultSelectionQuery(),
      },
    });

    if (!loan) throw new NotFoundException("Loan not found");

    return loan;
  }

  async getLoanByTransactionNumber(lTransactionNumber: string) {
    const loan = await this.prisma.loan.findFirst({
      where: { lTransactionNumber },

      select: {
        ...loanDefaultSelectionQuery(),
      },
    });

    if (!loan) throw new NotFoundException("Loan not found");

    return loan;
  }

  async updateRemainingBalance(id: string, totalPayments: number) {
    return this.prisma.$transaction(async (tx) => {
      const getTotalMustBePaid = await tx.loan.findUnique({
        where: { id },
        select: { totalAmountToBePaid: true },
      });

      const { totalAmountToBePaid } = getTotalMustBePaid;

      const newBalance = Number(totalAmountToBePaid) - totalPayments;

      //update remaining balance column
      await tx.loan.update({
        where: { id },
        data: {
          remainingBalance: newBalance,
        },
      });
    });
  }
}
