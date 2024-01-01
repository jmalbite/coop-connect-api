import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./common/dto/user-login.dto";
import { LocalAuthGuard } from "./common/guards";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @SetMetadata("isPublic", true)
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("login")
  sigIn(@Body() params: UserLoginDto) {
    return this.auth.getMemberDetails(params);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/logout")
  logout(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      req?.session.destroy((err) => {
        if (err) reject(err);
        resolve({
          status: 204,
          message: "Session destroyed",
        });
      });
    });
  }
}
