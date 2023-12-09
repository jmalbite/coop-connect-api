import { Injectable, NotFoundException } from "@nestjs/common";
import * as argon from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMemberDto } from "./common/dto";
import { memberDefaultSelectionQuery } from "./common/queries/index";
import { MemberResponse } from "./common/types/index";

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  //!Adding pagination for getting all members

  async getMembers(): Promise<MemberResponse[]> {
    return await this.prisma.member.findMany({
      select: {
        ...memberDefaultSelectionQuery(),
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
        ...memberDefaultSelectionQuery(),
      },
    });

    if (!data) throw new NotFoundException("Member not found");

    return data;
  }

  /**
   * create member
   * @param  {CreateMemberDto} params
   */
  async createMember(params: CreateMemberDto): Promise<MemberResponse> {
    const hashPassword = await argon.hash(params.password);

    const newMember = await this.prisma.member.create({
      data: {
        ...params,
        password: hashPassword,
      },

      select: {
        ...memberDefaultSelectionQuery(),
      },
    });

    delete newMember.password;

    return newMember;
  }

  /**
   * deactivate member
   * @param  {string} id
   */
  async deactivateMember(id: string): Promise<MemberResponse> {
    const isMemberExists = await this.prisma.member.findUnique({
      where: { id },
    });

    if (!isMemberExists) throw new NotFoundException("Member not found");

    const result = await this.prisma.member.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
      select: {
        ...memberDefaultSelectionQuery(),
      },
    });

    return result;
  }

  async validateMemberForAuth(userName: string, password: string) {
    const member = await this.prisma.member.findUnique({
      where: { userName },
      select: {
        id: true,
        password: true,
        role: {
          select: {
            roleName: true,
          },
        },
      },
    });

    if (!member) return null;

    const passwordMatch = await argon.verify(member.password, password);

    if (!passwordMatch) return null;

    return member;
  }

  async getMemberByIdForSerializer(id: string) {
    return await this.prisma.member.findUnique({ where: { id } });
  }
}
