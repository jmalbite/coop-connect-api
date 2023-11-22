import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMemberDto } from "./common/dto";
import { MemberResponse } from "./common/types/member.type";

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  //!Adding pagination for getting all members

  async getMembers() {
    return await this.prisma.member.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        contactNumber: true,
        member: true,
        active: true,
        role: {
          select: {
            roleName: true,
          },
        },
      },
    });
  }

  /**
   * get member by id
   * @param  {string} id
   */
  async getMemberByid(id: string): Promise<MemberResponse> {
    const data = await this.prisma.member.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        contactNumber: true,
        member: true,
        active: true,
        contributionPerMonth: true,
        role: {
          select: {
            roleName: true,
          },
        },
      },
    });

    console.log(data);
    return data;
  }

  /**
   * create member
   * @param  {CreateMemberDto} params
   */
  async createMember(params: CreateMemberDto): Promise<MemberResponse> {
    const newMember = await this.prisma.member.create({
      data: {
        ...params,
      },
      // ...memberSelectedReturns(),
    });
    return newMember;
  }

  /**
   * deactivate member
   * @param  {string} id
   */
  async deactivateMember(id: string) {
    return await this.prisma.member.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        contactNumber: true,
        member: true,
        active: true,
        role: {
          select: {
            roleName: true,
          },
        },
      },
    });
  }
}
