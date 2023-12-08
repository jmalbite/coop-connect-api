import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";

describe("AuthenticationSerivce Int", () => {
  let moduleRef: TestingModule;
  let prisma: PrismaService;
  let auth: AuthService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule, TestingModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    auth = moduleRef.get(AuthService);

    await prisma.cleanDatabase();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe("login()", () => {
    it.todo("should thow exception if invalid username");
    it.todo("should thow exception if invalid password");
  });

  describe("logout()", () => {
    it.todo("should logout");
  });
});
