import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserLoginDto } from "./common/dto/user-login.dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateMember(params: UserLoginDto) {
    const member = await this.prisma.member.findFirst({
      where: {
        userName: params.username,
      },
      include: {
        role: {
          select: {
            roleName: true,
          },
        },
      },
    });

    if (!member) return null;
  }
}
