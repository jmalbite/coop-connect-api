/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class GetContributionById {
  @IsNotEmpty()
  @IsString()
  id: string;
}
