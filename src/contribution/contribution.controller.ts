import { Controller, Get, Post, Body } from "@nestjs/common";
import { ContributionService } from "./contribution.service";
import {
  CreateContributionDto,
  EditContributionDto,
  GetContributionById,
  GetContributionByTransNumber,
} from "./dto";

@Controller("contribution")
export class ContributionController {
  constructor(private contribution: ContributionService) {}

  @Get("contributions")
  getContributions() {
    return this.contribution.getContributions();
  }

  @Post("contribute")
  createContribution(@Body() params: CreateContributionDto) {
    return this.contribution.createContribution(params);
  }

  @Post("edit-contribution")
  editContribution(@Body() params: EditContributionDto) {
    return this.contribution.editContribution(params);
  }

  @Post("get-contribution-by-transaction-number")
  getContributionByTransactionNumber(
    @Body() params: GetContributionByTransNumber
  ) {
    return this.contribution.getContributionByTransactionNumber(
      params.cTransactionNumber.trim()
    );
  }

  @Post("get-contribution-by-id")
  getContributionById(@Body() params: GetContributionById) {
    return this.contribution.getContributionById(params.id.trim());
  }
}
