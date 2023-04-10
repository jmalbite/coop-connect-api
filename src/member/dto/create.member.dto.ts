/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsBoolean, IsNumber } from "class-validator";

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  contactNumber?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  contributionPerMonth: number;

  @IsBoolean()
  member: boolean;

  @IsBoolean()
  active?: boolean;

  @IsString()
  roleId: string;
}
