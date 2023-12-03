import { Module } from "@nestjs/common";
import { MemberService } from "src/member/member.service";
import { PrismaService } from "src/prisma/prisma.service";
import { RoleService } from "src/role/role.service";
import { TestHelperService } from "./test-helper.service";

@Module({
  providers: [TestHelperService, RoleService, MemberService, PrismaService],
})
export class TestHelperModule {}
