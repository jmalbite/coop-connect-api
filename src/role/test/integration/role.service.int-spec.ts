import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRoleDto } from "src/role/common/dto";
import {
  adminRole,
  memberRole,
} from "src/role/common/test-data/role-test.data";
import { RoleController } from "src/role/role.controller";
import { RoleService } from "src/role/role.service";

describe("RoleService Int", () => {
  let prisma: PrismaService;
  let role: RoleController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    role = moduleRef.get(RoleService);

    await prisma.cleanDatabase();
  });

  //it should create role
  describe("createRole()", () => {
    const admin: CreateRoleDto = adminRole;
    const member: CreateRoleDto = memberRole;

    it("should create role for admin", async () => {
      const createdRole = await role.createRole(admin);

      expect(createdRole.roleName).toBe(admin.roleName);
      expect(createdRole.description).toBe(admin.description);
    });

    it("should create role for member", async () => {
      const createdRole = await role.createRole(member);

      expect(createdRole.roleName).toBe(member.roleName);
      expect(createdRole.description).toBe(member.description);
    });
  });
});
