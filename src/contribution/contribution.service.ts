import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaInitException } from "src/common";
import {
  TransactionNumberConstant,
  TransactionNumberGenerator,
} from "src/utils";
import { PrismaService } from "../prisma/prisma.service";
import { CreateContributionDto, EditContributionDto } from "./common/dto";
import { contriDefaultSelectionQuery } from "./common/queries";

@Injectable()
export class ContributionService {
  constructor(
    private prisma: PrismaService,
    private transConstant: TransactionNumberConstant,
    private transNumGenerator: TransactionNumberGenerator
  ) {}

  //*add pagination
  async getContributions() {
    try {
      return await this.prisma.contribution.findMany({
        select: {
          ...contriDefaultSelectionQuery(),
        },
      });
    } catch (error) {
      throw new PrismaInitException();
    }
  }

  async createContribution(params: CreateContributionDto) {
    const isValidMember = await this.isValidMember(params.memberId);

    if (!isValidMember)
      throw new NotFoundException(
        "Member is invalid, please check member details"
      );

    const transactionNum = this.transNumGenerator.generateTransactionNumber(
      this.transConstant.classReference.CONTRIBUTION
    );

    const newContribution = await this.prisma.contribution.create({
      data: {
        ...params,
        cTransactionNumber: transactionNum,
      },
      select: {
        ...contriDefaultSelectionQuery(),
      },
    });

    return newContribution;
  }

  async getContributionByTransactionNumber(cTransactionNumber: string) {
    const contribution = await this.prisma.contribution.findUnique({
      where: {
        cTransactionNumber: cTransactionNumber,
      },
      select: {
        ...contriDefaultSelectionQuery(),
      },
    });

    if (!contribution) throw new NotFoundException("Contribution not found");

    return contribution;
  }

  async getContributionById(id: string) {
    const contribution = await this.prisma.contribution.findUnique({
      where: {
        id,
      },
      select: {
        ...contriDefaultSelectionQuery(),
      },
    });

    if (!contribution) throw new NotFoundException("Contribution not found");

    return contribution;
  }

  async editContribution(params: EditContributionDto) {
    const isContributionExists = await this.prisma.contribution.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!isContributionExists)
      throw new NotFoundException("Contribution not found");

    const isValidMember = await this.isValidMember(params.memberId);

    if (!isValidMember)
      throw new NotFoundException(
        "Member is invalid, please check member details"
      );

    const updateContribution = await this.prisma.contribution.update({
      where: {
        id: params.id,
      },

      data: {
        ...params,
      },

      select: {
        ...contriDefaultSelectionQuery(),
      },
    });

    return updateContribution;
  }

  private async isValidMember(id: string): Promise<boolean> {
    const valid = await this.prisma.member.findUnique({
      where: {
        id,
        active: true,
        member: true,
      },
    });

    return valid ? true : false;
  }
}
