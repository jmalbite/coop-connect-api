import { Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";
import * as argon from "argon2";
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

    const hasPassword = await argon.hash(member.password);

    return await this.member.createMember({
      ...member,
      password: hasPassword,
      roleId: this.createdRole.id,
    });
  }

  async createMultipleMember(membersData: CreateMemberDto[]) {
    this.createdRole = await this.role.createRole(memberRole);

    const hasPassword = await argon.hash("testing123");

    return await this.prisma.member.createMany({
      data: membersData.map((member) => {
        return {
          ...member,
          password: hasPassword,
          roleId: this.createdRole.id,
        };
      }),
      skipDuplicates: true,
    });
  }

  async getValidMember() {
    const member = await this.prisma.member.findFirst({
      where: {
        active: true,
        member: true,
      },
    });

    return member;
  }

  async getNoDefaultMembers() {
    const member = await this.prisma.member.findMany({
      where: {
        active: true,
        member: true,
      },
    });

    return member;
  }

  async getNotActiveMember() {
    const member = await this.prisma.member.findFirst({
      where: {
        active: false,
      },
    });

    return member;
  }

  async getNonMember() {
    const member = await this.prisma.member.findFirst({
      where: {
        member: false,
      },
      take: 3,
    });

    return member;
  }
}
