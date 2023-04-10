import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { contributionSelectedReturns } from "./export";
import { CreateContributionDto, EditContributionDto } from "./dto";
import {
  TransactionNumberConstant,
  TransactionNumberGenerator,
} from "src/utils";
import { PrismaInitException } from "src/common";

@Injectable()
export class ContributionService {
  constructor(
    private prisma: PrismaService,
    private transConstant: TransactionNumberConstant,
    private transNumGenerator: TransactionNumberGenerator
  ) {}

  async getContributions() {
    try {
      return await this.prisma.contribution.findMany({
        ...contributionSelectedReturns(),
      });
    } catch (error) {
      throw new PrismaInitException();
    }
  }

  async createContribution(params: CreateContributionDto) {
    const transactionNum = this.transNumGenerator.generateTransactionNumber(
      this.transConstant.classReference.CONTRIBUTION
    );

    const newContribution = await this.prisma.contribution.create({
      data: {
        ...params,
        cTransactionNumber: transactionNum,
      },

      ...contributionSelectedReturns(),
    });

    return newContribution;
  }

  async getContributionByTransactionNumber(cTransactionNumber: string) {
    const contribution = await this.prisma.contribution.findUnique({
      where: {
        cTransactionNumber: cTransactionNumber,
      },
      ...contributionSelectedReturns(),
    });

    return contribution;
  }

  async getContributionById(id: string) {
    const contribution = await this.prisma.contribution.findUnique({
      where: {
        id,
      },
      ...contributionSelectedReturns(),
    });

    return contribution;
  }

  async editContribution(params: EditContributionDto) {
    const updateContribution = await this.prisma.contribution.update({
      where: {
        id: params.id,
      },

      data: {
        ...params,
      },

      ...contributionSelectedReturns(),
    });

    return updateContribution;
  }
}
