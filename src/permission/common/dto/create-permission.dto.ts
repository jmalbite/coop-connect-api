import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  permissionName: string;

  @IsString()
  @IsOptional()
  description: string;
}
