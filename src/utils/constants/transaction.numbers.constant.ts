/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";

@Injectable()
export class TransactionNumberConstant {
  public classReference = TransactionNumberConstant;

  static readonly CONTRIBUTION = "TRANSACTION_NUMBER_FOR_CONTRIBUTION";
  static readonly LOAN = "TRANSACTION_NUMBER_FOR_LOAN";
  static readonly LOAN_PAYMENT = "TRANSACTION_NUMBER_FOR_LOAN_PAYMENTS";
  static readonly MEMBER = "TRANSACTION_NUMBER_FOR_MEMBER";
}
