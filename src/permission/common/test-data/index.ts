import { CreatePermissionDto } from "../dto/create-permission.dto";

export const writePermission: CreatePermissionDto = {
  permissionName: "write:member",
  description: "can manage member data and access",
};

export const readPermission: CreatePermissionDto = {
  permissionName: "read:member",
  description: "can view/read member data",
};
