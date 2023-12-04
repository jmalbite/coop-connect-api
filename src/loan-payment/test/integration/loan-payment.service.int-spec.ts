import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { LoanPaymentService } from "src/loan-payment/loan-payment.service";
import { AddLoanDto } from "src/loan/common/dto";
import { LoanService } from "src/loan/loan.service";
import { newNoDefaultMembers } from "src/member/common/test-data";
import { PrismaService } from "src/prisma/prisma.service";
import { TestHelperModule } from "src/test-service/test-helper.module";
import { TestHelperService } from "src/test-service/test-helper.service";
import { addLoan } from "../../../loan/common/test-data/index";
import { CoMakers } from "src/common";
import { addLoanPayment } from "src/loan-payment/common/test-data";
import { AddLoanPaymentDto } from "src/loan-payment/common/dto/add-loan-payment.dto";
import { NotFoundException } from "@nestjs/common";
import { UpdateLoanPaymentDto } from "src/loan-payment/common/dto/update-loan-payment.dto";
import {
  updateLoanPayment,
  changeAmountUpdate,
} from "../../common/test-data/index";

describe("LoanPaymentService Int", () => {
  let moduleRef: TestingModule;
  let prisma: PrismaService;
  let testHelper: TestHelperService;
  let loan: LoanService;
  let loanPayment: LoanPaymentService;
  let sampleMembers: unknown;
  let createdPayment: unknown;

  let createdLoan: unknown;

  const nonExistentId = "non-existent-id";

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule, TestHelperModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    testHelper = moduleRef.get(TestHelperService);
    loan = moduleRef.get(LoanService);
    loanPayment = moduleRef.get(LoanPaymentService);

    await prisma.cleanDatabase();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it("should create members and assign role", async () => {
    await testHelper.createMultipleMember(newNoDefaultMembers);

    const members = await prisma.member.findMany({
      take: 3,
    });

    sampleMembers = members;
  });

  it("should create a loan for a member", async () => {
    const loanee = sampleMembers[0];
    const coMakers: CoMakers[] = [
      { memberId: sampleMembers[1].id },
      { memberId: sampleMembers[2].id },
    ];

    const data: AddLoanDto = {
      ...addLoan,
      loaneeId: loanee["id"],
      coMakers,
    };

    const result = await loan.addNewLoan(data);

    createdLoan = result;
  });

  //addLoanPayment()
  describe("addLoanPayment()", () => {
    const data: AddLoanPaymentDto = addLoanPayment;

    it("should throw exception if the loan is not exist", async () => {
      const result = loanPayment.addLoanPayment({
        ...data,
        loanId: nonExistentId,
      });

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should create loan payment", async () => {
      const result = await loanPayment.addLoanPayment({
        ...data,
        loanId: createdLoan["id"],
      });

      expect(result.loanId).toBe(createdLoan["id"]);
      expect(Number(result.paymentAmount)).toBe(data.paymentAmount);
      expect(result.remarks).toBe(data.remarks);
      expect(result.screenshot_id).toBe(data.screenshot_id);
      createdPayment = result;

      console.log(result);
    });
  });

  //getLoanPaymentById
  describe("getLoanPaymentById()", () => {
    it("should throw exception if the payment not found", async () => {
      const result = loanPayment.getLoanPaymentById(nonExistentId);

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should return the payment base on the id", async () => {
      const result = await loanPayment.getLoanPaymentById(createdPayment["id"]);

      expect(result.id).toBe(createdPayment["id"]);
      expect(result.loanId).toBe(createdPayment["loanId"]);
    });
  });

  describe("getLoanPaymentByTransactionNum()", () => {
    it("should throw exception if the payment not found base on the transaction number", async () => {
      const result = loanPayment.getLoanPaymentByTransactionNum(nonExistentId);

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should return the payment base on the transaction number", async () => {
      const lpTransactionNumber = createdPayment["lpTransactionNumber"];
      const result = await loanPayment.getLoanPaymentByTransactionNum(
        lpTransactionNumber
      );

      expect(result.id).toBe(createdPayment["id"]);
      expect(result.loanId).toBe(createdPayment["loanId"]);
      expect(result.lpTransactionNumber).toBe(
        createdPayment["lpTransactionNumber"]
      );
    });
  });

  describe("updateLoanPayment()", () => {
    it("should throw exception if loan payment not found", async () => {
      const result = loanPayment.updateLoanPayment({
        ...updateLoanPayment,
        id: nonExistentId,
      });

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should update loan payment", async () => {
      const data: UpdateLoanPaymentDto = {
        ...changeAmountUpdate,
        id: createdPayment["id"],
        loanId: createdPayment["loanId"],
      };

      const result = await loanPayment.updateLoanPayment(data);

      expect(result.remarks).toBe(data.remarks);
      expect(Number(result.paymentAmount)).toBe(data.paymentAmount);
    });
  });
});
