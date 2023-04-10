import { Module } from "@nestjs/common";
import { LoanController } from "./loan.controller";
import { LoanService } from "./loan.service";
import {
  TransactionNumberConstant,
  TransactionNumberGenerator,
} from "src/utils";

@Module({
  controllers: [LoanController],
  providers: [
    LoanService,
    TransactionNumberConstant,
    TransactionNumberGenerator,
  ],
})
export class LoanModule {}
