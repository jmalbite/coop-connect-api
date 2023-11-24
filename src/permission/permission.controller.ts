import { Body, Controller, Post } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { CreatePermissionDto } from "./common/dto/index";
import { Permission } from "@prisma/client";

@Controller("permission")
export class PermissionController {
  constructor(private permission: PermissionService) {}

  /**
   * create permission controller
   * @param  {CreatePermissionDto} params
   * @returns Promise
   */
  @Post()
  createPermissions(@Body() params: CreatePermissionDto): Promise<Permission> {
    return this.permission.createPermission(params);
  }
}
