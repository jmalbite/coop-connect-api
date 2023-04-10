import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoanService } from "./loan.service";
import { AddLoanDto } from "./dto";

@Controller("loan")
export class LoanController {
  constructor(private loan: LoanService) {}

  @Get("loans")
  getLoans() {
    return this.loan.getLoans();
  }

  @Post("new-loan")
  addNewLoan(@Body() params: AddLoanDto) {
    return this.loan.addNewLoan(params);
  }
}
