import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { CreateContributionDto } from './dto/create.contribution.dto';

@Controller('contribution')
export class ContributionController {
  constructor(private contribution: ContributionService) {}

  @Get()
  getContributions() {
    return this.contribution.getContributions();
  }

  @Post('contribute')
  createContribution(@Body() params: CreateContributionDto) {
    return this.contribution.createContribution(params);
  }
}
