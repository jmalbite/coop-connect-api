import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { CreatePermissionDto } from "src/permission/common/dto/create-permission.dto";
import {
  readPermission,
  writePermission,
} from "src/permission/common/test-data/permission-test.data";
import { PermissionService } from "src/permission/permission.service";
import { PrismaService } from "src/prisma/prisma.service";

describe("Permission Int", () => {
  let prisma: PrismaService;
  let permission: PermissionService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    permission = moduleRef.get(PermissionService);

    await prisma.cleanDatabase();
  }); //end of before all

  describe("createPermission()", () => {
    const write: CreatePermissionDto = writePermission;
    const read: CreatePermissionDto = readPermission;

    it("should create write permission", async () => {
      const newPermission = await permission.createPermission(write);

      expect(newPermission.permissionName).toBe(write.permissionName);
      expect(newPermission.description).toBe(write.description);
    });

    it("should create read permission", async () => {
      const newPermission = await permission.createPermission(read);

      expect(newPermission.permissionName).toBe(read.permissionName);
      expect(newPermission.description).toBe(read.description);
    });
  });
});
