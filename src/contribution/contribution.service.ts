import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { contributionSelectedReturns } from './export/contributin.export';
import { CreateContributionDto } from './dto/create.contribution.dto';

@Injectable()
export class ContributionService {
  constructor(private prisma: PrismaService) {}

  async getContributions() {
    return await this.prisma.contribution.findMany({
      ...contributionSelectedReturns(),
    });
  }

  async createContribution(params: CreateContributionDto) {
    const newContribution = await this.prisma.contribution.create({
      data: {
        ...params,
        cTransactionNumber: `C1231231`,
      },
    });

    return newContribution;
  }
}
