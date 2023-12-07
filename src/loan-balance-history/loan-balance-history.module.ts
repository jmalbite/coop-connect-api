import { Module } from "@nestjs/common";
import { LoanBalanceHistoryService } from "./loan-balance-history.service";

@Module({
  providers: [LoanBalanceHistoryService],
  exports: [LoanBalanceHistoryService],
})
export class LoanBalanceHistoryModule {}
