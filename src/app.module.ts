import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { MemberModule } from "./member/member.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ContributionModule } from "./contribution/contribution.module";
import { LoanModule } from "./loan/loan.module";
import { RoleModule } from "./role/role.module";
import { PermissionModule } from "./permission/permission.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MemberModule,
    PrismaModule,
    ContributionModule,
    LoanModule,
    RoleModule,
    PermissionModule,
  ],
})
export class AppModule {}
