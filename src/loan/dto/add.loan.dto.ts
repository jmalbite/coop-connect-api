/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";
import { CoMakers } from "src/common";

export class AddLoanDto {
  @IsNotEmpty()
  @IsString()
  loaneeId: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  amountLoan: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  monthsPayable: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  interestPercentage: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  interestAmount: number;

  @IsOptional()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  processingFee?: number;

  @IsOptional()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  penaltyAmount?: number;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  @IsString()
  screenshot_id?: string;

  @IsNotEmpty()
  @IsArray()
  coMakers: CoMakers[];

  @IsNotEmpty()
  loanIssued: string;
}
