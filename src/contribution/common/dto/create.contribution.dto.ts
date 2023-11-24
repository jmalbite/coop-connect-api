/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from "class-validator";

export class CreateContributionDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  memberId: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  paymentType: number;

  @IsOptional()
  @IsString()
  screenshot_id?: string;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsNotEmpty()
  contributionDate: string;
}
