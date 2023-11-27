import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AddLoanDto } from "../dto";
import { membersAndActiveQuery, validateCoMakersQuery } from "../queries/index";

interface AlreadyCoMake {
  member: Member;
  loan: Loan;
}

interface Member {
  username: string;
}

interface Loan {
  lTransactionNumber: string;
}

@Injectable()
export class LoanUtilitiesService {
  constructor(private prisma: PrismaService) {}

  async isMemberAlreadyCoMaker(params: AddLoanDto) {
    const result = await this.prisma.loanCoMakers.findMany({
      where: {
        ...validateCoMakersQuery(params),
      },
      select: {
        member: {
          select: {
            userName: true,
          },
        },
        loan: {
          select: {
            lTransactionNumber: true,
          },
        },
      },
    });

    return result;
  }

  async isMembersAndActive(params: AddLoanDto): Promise<boolean> {
    const { coMakers } = params;

    const membersAndActive = await this.prisma.member.findMany({
      where: {
        ...membersAndActiveQuery(params),
      },

      select: {
        firstName: true,
        lastName: true,
      },
    });

    return membersAndActive.length === coMakers.length;
  }

  serializeMessageCoMakers(data: AlreadyCoMake[] | any): string {
    console.log("👏", data);
    return data.length !== 0
      ? `Somethings wrong with co-makers selected`
      : `Co-maker/s already a comake ${data.map((comake) => comake)}`;
  }
}
