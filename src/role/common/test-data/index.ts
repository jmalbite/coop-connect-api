import { CreateRoleDto } from "../dto";

//admin role
export const adminRole: CreateRoleDto = {
  roleName: "ADMIN",
  description: "admin access",
};

//member role
export const memberRole: CreateRoleDto = {
  roleName: "MEMBER",
  description: "member access",
};
