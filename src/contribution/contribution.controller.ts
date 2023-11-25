import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { CreateContributionDto, EditContributionDto } from "./common/dto";
import { ContributionService } from "./contribution.service";

@Controller("contribution")
export class ContributionController {
  constructor(private contribution: ContributionService) {}

  @Get("contributions")
  getContributions() {
    return this.contribution.getContributions();
  }

  @Post("")
  createContribution(@Body() params: CreateContributionDto) {
    return this.contribution.createContribution(params);
  }

  @Post("edit")
  editContribution(@Body() params: EditContributionDto) {
    return this.contribution.editContribution(params);
  }

  @Get(":id")
  getContributionById(@Param("id", ParseUUIDPipe) id: string) {
    return this.contribution.getContributionById(id);
  }

  @Get(":id")
  getContributionByTransactionNumber(@Param("id") id: string) {
    return this.contribution.getContributionByTransactionNumber(id);
  }
}
