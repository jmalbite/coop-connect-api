import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import {
  CreateContributionDto,
  EditContributionDto,
} from "src/contribution/common/dto";
import { ContributionService } from "src/contribution/contribution.service";
import {
  newMemberActive,
  newMemberNotActive,
  newNonMember,
} from "src/member/common/test-data";
import { PrismaService } from "src/prisma/prisma.service";
import { TestHelperModule } from "../../../test-service/test-helper.module";
import { TestHelperService } from "../../../test-service/test-helper.service";
import {
  newContribution,
  udpateContribution,
} from "../../common/test-data/index";

describe("Contribution Int", () => {
  let moduleRef: TestingModule;
  let prisma: PrismaService;
  let testHelper: TestHelperService;
  let contribution: ContributionService;
  let createdContribution: unknown;
  const nonExistentId = "non-existent-id";

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule, TestHelperModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    contribution = moduleRef.get(ContributionService);
    testHelper = moduleRef.get(TestHelperService);

    await prisma.cleanDatabase();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it("should create members and assign role", async () => {
    const sampleData = [newMemberActive, newMemberNotActive, newNonMember];

    await testHelper.createMultipleMember(sampleData);
  });

  //create contribution function
  describe("createContribution()", () => {
    it("should throw an error if member is not found", async () => {
      const result = contribution.createContribution({
        ...newContribution,
        memberId: nonExistentId,
      });

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should throw an error if member is not active", async () => {
      const member = await prisma.member.findFirst({
        where: {
          active: false,
        },
      });

      const result = contribution.createContribution({
        ...newContribution,
        memberId: member.id,
      });

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should throw an error if non-member", async () => {
      const member = await prisma.member.findFirst({
        where: {
          member: false,
        },
      });

      const result = contribution.createContribution({
        ...newContribution,
        memberId: member.id,
      });

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should create contribution", async () => {
      const member = await prisma.member.findFirst({
        where: {
          member: true,
          active: true,
        },
      });

      const data: CreateContributionDto = {
        ...newContribution,
        memberId: member.id,
      };

      const result = await contribution.createContribution(data);

      createdContribution = result;

      expect(result.member.id).toBe(member.id);
      expect(Number(result.amount)).toBe(data.amount);
      expect(result.screenshot_id).toBe(data.screenshot_id);
      expect(result.paymentType).toBe(data.paymentType);
      expect(result.remarks).toBe(data.remarks);
    });
  });

  describe("getContributions()", () => {
    it("should return contributions", async () => {
      const result = await contribution.getContributions();

      expect(result.length).toBe(1);
    });
  });

  describe("getContributionById()", () => {
    it("should throw exception if contribution not found", async () => {
      const result = contribution.getContributionById(nonExistentId);

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should find contribution base by id", async () => {
      const result = await contribution.getContributionById(
        createdContribution["id"]
      );

      expect(result.id).toBe(createdContribution["id"]);
    });
  });

  describe("getContributionByTransactionNumber()", () => {
    it("should throw exception if contribution not found", async () => {
      const result =
        contribution.getContributionByTransactionNumber(nonExistentId);

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should find contribution base on transaction number (cTransactionNumber) ", async () => {
      const result = await contribution.getContributionByTransactionNumber(
        createdContribution["cTransactionNumber"]
      );

      expect(result.id).toBe(createdContribution["id"]);
      expect(result.cTransactionNumber).toBe(
        createdContribution["cTransactionNumber"]
      );
    });
  });

  describe("editContribution()", () => {
    it("should throw exception if contribution not found by id", async () => {
      const result = contribution.editContribution({
        ...udpateContribution,
        id: nonExistentId,
        memberId: createdContribution["memberId"],
      });

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should throw exception if member is invalid", async () => {
      const result = contribution.editContribution({
        ...udpateContribution,
        id: createdContribution["id"],
        memberId: nonExistentId,
      });

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should update the contribution", async () => {
      const data: EditContributionDto = {
        ...udpateContribution,
        id: createdContribution["id"],
        memberId: createdContribution["member"]["id"],
      };

      const result = await contribution.editContribution(data);

      expect(result.id).toBe(data.id);
      expect(result.member.id).toBe(data.memberId);
      expect(Number(result.amount)).toBe(data.amount);
      expect(result.paymentType).toBe(data.paymentType);
      expect(result.screenshot_id).toBe(data.screenshot_id);
      expect(result.remarks).toBe(data.remarks);
    });
  });
});
