import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { ContributionModule } from "./contribution/contribution.module";
import { LoanModule } from "./loan/loan.module";
import { MemberModule } from "./member/member.module";
import { PermissionModule } from "./permission/permission.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RoleModule } from "./role/role.module";

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
