/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AddLoanDto } from "../dto";
import { CoMakers } from "src/common";

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

  async coMakersChecker({ coMakers }: AddLoanDto) {
    let testing: any[];

    // coMakers.forEach(async ({ memberId }) => {
    // const coMake = await this.isMemberAlreadyCoMaker(coMakers);
    // console.log("🥂", coMake);

    // if (coMake) {
    //   testing;
    // }
    // });

    console.log(testing);
    return testing;
  }

  async isMemberAlreadyCoMaker({ coMakers }: AddLoanDto) {
    const memberIds = coMakers.map(({ memberId }) => memberId);
    const loanCoMakers = await this.prisma.loanCoMakers.findMany({
      where: {
        AND: [
          {
            memberId: {
              in: memberIds,
            },
          },
          {
            loan: {
              status: {
                equals: 1,
              },
            },
          },
        ],
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
    return loanCoMakers;
  }

  serializeMessageCoMakers(data: AlreadyCoMake[] | any): string {
    console.log("👏", data);
    return data.length !== 0
      ? `Somethings wrong with co-makers selected`
      : `Co-maker/s already a comake ${data.map((comake) => comake)}`;
  }
}
