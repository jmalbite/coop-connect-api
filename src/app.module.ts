import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { AuthenticatedGuard } from "./auth/common/guards";
import { ContributionModule } from "./contribution/contribution.module";
import { LoanPaymentModule } from "./loan-payment/loan-payment.module";
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
    LoanPaymentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard,
    },
  ],
})
export class AppModule {}
