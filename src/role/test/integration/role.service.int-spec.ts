import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRoleDto } from "src/role/dto";

describe("RoleService Int", () => {
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);

    await prisma.cleanDatabase();
  });

  //it should create role
  describe("createRole()", () => {
    const roleDto: CreateRoleDto = {
      roleName: "admin",
      description: "admin access",
    };

    it("should create role", async () => {
      const role = await prisma.role.create({
        data: {
          ...roleDto,
        },
      });

      expect(role.roleName).toBe(roleDto.roleName);
      expect(role.description).toBe(roleDto.description);
    });
  });
});
