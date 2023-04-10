import { Module } from "@nestjs/common";
import { ContributionController } from "./contribution.controller";
import { ContributionService } from "./contribution.service";
import {
  TransactionNumberConstant,
  TransactionNumberGenerator,
} from "src/utils";

@Module({
  controllers: [ContributionController],
  providers: [
    ContributionService,
    TransactionNumberConstant,
    TransactionNumberGenerator,
  ],
})
export class ContributionModule {}
