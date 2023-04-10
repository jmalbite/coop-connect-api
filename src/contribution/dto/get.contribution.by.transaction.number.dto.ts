/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class GetContributionByTransNumber {
  @IsNotEmpty()
  @IsString()
  cTransactionNumber: string;
}
