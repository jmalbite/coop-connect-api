import { Body, Controller, Post } from "@nestjs/common";
import { CreateRoleDto } from "./dto";
import { RoleService } from "./role.service";

@Controller("role")
export class RoleController {
  constructor(private roleService: RoleService) {}

  /**
   * create new role
   * @param params  CreateRoleDto
   */
  @Post("create")
  createRole(@Body() params: CreateRoleDto) {
    return this.roleService.createRole(params);
  }
}
