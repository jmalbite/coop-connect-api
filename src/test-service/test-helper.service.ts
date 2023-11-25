import { Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";
import { CreateMemberDto } from "src/member/common/dto";
import { MemberResponse } from "src/member/common/types";
import { MemberService } from "src/member/member.service";
import { PrismaService } from "src/prisma/prisma.service";
import { memberRole } from "src/role/common/test-data";
import { RoleService } from "src/role/role.service";

@Injectable()
export class TestHelperService {
  private createdRole: Role;

  constructor(
    private role: RoleService,
    private member: MemberService,
    private prisma: PrismaService
  ) {}

  async createMemberAndAssignRole(
    member: CreateMemberDto
  ): Promise<MemberResponse> {
    this.createdRole = await this.role.createRole(memberRole);

    return await this.member.createMember({
      ...member,
      roleId: this.createdRole.id,
    });
  }

  async createMultipleMember(membersData: CreateMemberDto[]) {
    this.createdRole = await this.role.createRole(memberRole);

    return await this.prisma.member.createMany({
      data: membersData.map((member) => {
        return {
          ...member,
          roleId: this.createdRole.id,
        };
      }),
      skipDuplicates: true,
    });
  }
}
