/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { TransactionNumberConstant } from "../index";

@Injectable()
export class TransactionNumberGenerator {
  constructor(private transNumberCons: TransactionNumberConstant) {}

  /**
   * generate transaction number based on transaction code
   * @param  {string} transaction
   * @returns string
   */
  public generateTransactionNumber(transaction: string): string {
    switch (transaction) {
      case this.transNumberCons.classReference.CONTRIBUTION:
        return `C${this.generator()}`;
      case this.transNumberCons.classReference.LOAN:
        return `L${this.generator()}`;
      case this.transNumberCons.classReference.LOAN_PAYMENT:
        return `LP${this.generator()}`;
    }
  }

  /**
   * code generator base on date and time
   * @returns string
   */
  private generator(): string {
    const date = new Date();

    const combinedTimeDates = [
      "-",
      date.getMonth() + 1,
      date.getDate(),
      date.getFullYear(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];

    return combinedTimeDates.join("");
  }
}
