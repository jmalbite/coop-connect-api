import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePermissionDto } from "./common/dto/create-permission.dto";
import { Permission } from "@prisma/client";

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  /**
   * crate permission service
   * @param  {CreatePermissionDto} params
   * @returns Promise
   */
  async createPermission(params: CreatePermissionDto): Promise<Permission> {
    const newPermission = await this.prisma.permission.create({
      data: {
        ...params,
      },
    });

    return newPermission;
  }
}
