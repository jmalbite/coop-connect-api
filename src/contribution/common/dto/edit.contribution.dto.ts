/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class EditContributionDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  id: string;

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
