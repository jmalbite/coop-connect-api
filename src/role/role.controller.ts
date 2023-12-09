import { Body, Controller, Post } from "@nestjs/common";
import { CreateRoleDto } from "./common/dto";
import { RoleService } from "./role.service";
import { Role } from "@prisma/client";

@Controller("role")
export class RoleController {
  constructor(private role: RoleService) {}

  /**
   * create new role
   * @param params  CreateRoleDto
   */
  @Post("create")
  createRole(@Body() params: CreateRoleDto): Promise<Role> {
    return this.role.createRole(params);
  }
}
