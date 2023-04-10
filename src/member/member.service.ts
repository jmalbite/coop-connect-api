import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMemberDto } from "./dto";
import { memberSelectedReturns } from "./export";

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  //!Adding pagination for getting all members

  async getMembers() {
    return await this.prisma.member.findMany({
      ...memberSelectedReturns(),
    });
  }

  /**
   * get member by id
   * @param  {string} id
   */
  async getMemberByid(id: string) {
    return await this.prisma.member.findUnique({
      where: {
        id,
      },
      ...memberSelectedReturns(),
    });
  }

  /**
   * create member
   * @param  {CreateMemberDto} params
   */
  async createMember(params: CreateMemberDto) {
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
      ...memberSelectedReturns(),
    });
  }
}
