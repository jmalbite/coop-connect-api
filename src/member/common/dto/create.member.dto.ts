import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsStrongPassword,
} from "class-validator";

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
  @IsStrongPassword()
  password: string;

  @IsString()
  contactNumber?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  contributionPerMonth: number;

  @IsBoolean()
  @IsNotEmpty()
  member: boolean;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsString()
  @IsNotEmpty()
  roleId: string;
}
