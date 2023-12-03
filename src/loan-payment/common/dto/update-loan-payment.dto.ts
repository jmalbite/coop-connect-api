import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class UpdateLoanPaymentDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  paymentAmount: number;

  @IsNotEmpty()
  @IsNumber()
  paymentType: number;

  @IsOptional()
  @IsString()
  remarks: string;

  @IsOptional()
  @IsString()
  screenshot_id: string;

  @IsNotEmpty()
  @IsDateString()
  loanPaid: string;
}
