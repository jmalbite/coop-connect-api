import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { MemberModule } from "src/member/member.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SessionSerializer } from "./common/serializer/session.serializer";
import { LocalStrategy } from "./common/strategy/local.strategy";

@Module({
  controllers: [AuthController],
  imports: [MemberModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
