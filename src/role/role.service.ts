import { Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRoleDto } from "./common/dto";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  /**
   * create new role
   * @param  {CreateRoleDto} params
   * @returns Promise
   */
  async createRole(params: CreateRoleDto): Promise<Role> {
    // console.log(process.env.NODE_ENV, "😍");
    const newRole = await this.prisma.role.create({
      data: {
        ...params,
      },
    });

    return newRole;
  }
}
