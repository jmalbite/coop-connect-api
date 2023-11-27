import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoanService } from "./loan.service";
import { AddLoanDto } from "./common/dto";

@Controller("loan")
export class LoanController {
  constructor(private loan: LoanService) {}

  @Get()
  getLoans() {
    return this.loan.getLoans();
  }

  @Post("")
  addNewLoan(@Body() params: AddLoanDto) {
    return this.loan.addNewLoan(params);
  }
}
