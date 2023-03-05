/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateContributionDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  memberId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  paymentType: number;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsNotEmpty()
  contributionDate: string;
}
