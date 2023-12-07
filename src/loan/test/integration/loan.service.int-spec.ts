import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { AddLoanDto } from "src/loan/common/dto";
import { addLoan } from "src/loan/common/test-data";
import { LoanService } from "src/loan/loan.service";
import {
  newMemberActive,
  newMemberActiveND,
  newMemberNotActive,
  newNoDefaultMembers,
  newNonMember,
} from "src/member/common/test-data";
import { PrismaService } from "src/prisma/prisma.service";
import { TestHelperModule } from "src/test-service/test-helper.module";
import { TestHelperService } from "src/test-service/test-helper.service";

describe("LoanService Int", () => {
  let moduleRef: TestingModule;
  let prisma: PrismaService;
  let testHelper: TestHelperService;
  let loan: LoanService;
  let loanCreated: unknown;
  let loanTestData: AddLoanDto;

  const nonExistentId = "non-existent-id";

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule, TestHelperModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    loan = moduleRef.get(LoanService);
    testHelper = moduleRef.get(TestHelperService);

    await prisma.cleanDatabase();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it("should create members and assign role", async () => {
    const sampleData = [
      newMemberActive,
      newMemberNotActive,
      newNonMember,
      newMemberActiveND,
    ];

    await testHelper.createMultipleMember(sampleData);
    await testHelper.createMultipleMember(newNoDefaultMembers);
  });

  describe("addNewLoan()", () => {
    it("should throw exception co-makers have least than 2", async () => {
      const data: AddLoanDto = addLoan;
      const result = loan.addNewLoan(data);

      await expect(result).rejects.toThrowError(BadRequestException);
    });

    it("should throw exception if one of the co-makers is not a member", async () => {
      const nonDefaultMembers = await testHelper.getNoDefaultMembers();
      const defaultMember = await testHelper.getNonMember();

      const data: AddLoanDto = {
        ...addLoan,
        loaneeId: nonDefaultMembers[0].id,
        coMakers: [
          {
            memberId: nonDefaultMembers[1].id,
          },
          {
            memberId: defaultMember.id,
          },
        ],
      };

      const result = loan.addNewLoan(data);

      await expect(result).rejects.toThrowError(BadRequestException);
    });

    it("should throw exception if one of the co-makers is not active", async () => {
      const nonDefaultMembers = await testHelper.getNoDefaultMembers();
      const defaultMember = await testHelper.getNotActiveMember();

      const data: AddLoanDto = {
        ...addLoan,
        loaneeId: nonDefaultMembers[0].id,
        coMakers: [
          {
            memberId: nonDefaultMembers[1].id,
          },
          {
            memberId: defaultMember.id,
          },
        ],
      };

      const result = loan.addNewLoan(data);

      await expect(result).rejects.toThrowError(BadRequestException);
    });

    it("should create loan", async () => {
      const nonDefaultMembers = await testHelper.getNoDefaultMembers();

      const loanee = nonDefaultMembers[0];

      const data: AddLoanDto = {
        ...addLoan,
        loaneeId: nonDefaultMembers[0].id,
        coMakers: [
          {
            memberId: nonDefaultMembers[1].id,
          },
          {
            memberId: nonDefaultMembers[2].id,
          },
        ],
      };

      const dataComakers = data.coMakers.map((member) => member.memberId);

      const result = await loan.addNewLoan(data);
      const resultCoMakers = result.loanCoMakers.map(
        (member) => member["member"]["id"]
      );

      expect(result.loanee.id).toBe(loanee.id);
      expect(Number(result.amountLoan)).toBe(data.amountLoan);
      expect(result.monthsPayable).toBe(data.monthsPayable);
      expect(result.interestInPercentage).toBe(data.interestInPercentage);
      expect(Number(result.interestInAmount)).toBe(data.interestInAmount);
      expect(Number(result.totalAmountToBePaid)).toBe(data.totalAmountToBePaid);
      expect(Number(result.paymentPerPayDay)).toBe(data.paymentPerPayDay);
      expect(Number(result.processingFee)).toBe(data.processingFee);
      expect(result.remarks).toBe(data.remarks);
      expect(result.screenshot_id).toBe(data.screenshot_id);
      expect(resultCoMakers).toEqual(dataComakers);

      //assign global variables
      loanCreated = result;
      loanTestData = data;
    });
  });

  describe("getLoanById()", () => {
    it("should throw exception if the loan is not found", async () => {
      const result = loan.getLoanById(nonExistentId);

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should return loan if found base on id", async () => {
      const result = await loan.getLoanById(loanCreated["id"]);

      expect(result.id).toBe(loanCreated["id"]);
    });
  });

  describe("getLoanByTransactionNumber()", () => {
    it("should throw error if transaction number not found", async () => {
      const result = loan.getLoanById(nonExistentId);

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should return loan if found base on transaction number", async () => {
      const result = await loan.getLoanByTransactionNumber(
        loanCreated["lTransactionNumber"]
      );

      expect(result.id).toBe(loanCreated["id"]);
      expect(result.lTransactionNumber).toBe(loanCreated["lTransactionNumber"]);
    });
  });
});
