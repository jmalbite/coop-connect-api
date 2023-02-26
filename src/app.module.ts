import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';
import { PrismaModule } from './prisma/prisma.module';
import { ContributionModule } from './contribution/contribution.module';

@Module({
  imports: [AuthModule, MemberModule, PrismaModule, ContributionModule],
})
export class AppModule {}
