/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";

@Injectable()
export class PaymentTypeConstant {
  public classReference = PaymentTypeConstant;

  static readonly CASH = 1;
  static readonly ONLINE = 2;
}
