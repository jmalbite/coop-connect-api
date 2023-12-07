import { Module } from "@nestjs/common";
import { LoanModule } from "src/loan/loan.module";
import { LoanPaymentController } from "./loan-payment.controller";
import { LoanPaymentService } from "./loan-payment.service";

@Module({
  imports: [LoanModule],
  controllers: [LoanPaymentController],
  providers: [LoanPaymentService],
})
export class LoanPaymentModule {}
