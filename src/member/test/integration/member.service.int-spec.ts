import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { CreateMemberDto } from "src/member/common/dto";
import { newMemberActive } from "src/member/common/test-data";
import { MemberService } from "src/member/member.service";
import { PrismaService } from "src/prisma/prisma.service";
import { memberRole } from "src/role/common/test-data";
import { RoleService } from "src/role/role.service";
import { newMemberNotActive } from "../../common/test-data/index";

describe("MemberService Int", () => {
  let prisma: PrismaService;
  let role: RoleService;
  let member: MemberService;
  let roleId: string;
  let memberId: string;

  const newMemberRole = memberRole;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    role = moduleRef.get(RoleService);
    member = moduleRef.get(MemberService);

    await prisma.cleanDatabase();
  });

  describe("Role:createRole()", () => {
    it("should create role first", async () => {
      const newRole = await role.createRole(newMemberRole);

      roleId = newRole.id;
    });
  });

  //create member functionality
  describe("createMember()", () => {
    it("it should create member active", async () => {
      const memberDto: CreateMemberDto = {
        ...newMemberActive,
        roleId: roleId,
      };

      const newMember = await member.createMember(memberDto);

      expect(newMember.firstName).toBe(memberDto.firstName);
      expect(newMember.lastName).toBe(memberDto.lastName);
      expect(newMember.userName).toBe(memberDto.userName);
      expect(newMember.contactNumber).toBe(memberDto.contactNumber);
      expect(newMember.member).toBe(memberDto.member);
      expect(newMember.active).toBe(memberDto.active);
      expect(newMember.role.roleName).toBe(newMemberRole.roleName);
    });

    it("it should create member but not active", async () => {
      const memberDto: CreateMemberDto = {
        ...newMemberNotActive,
        roleId: roleId,
      };

      const newMember = await member.createMember(memberDto);

      expect(newMember.firstName).toBe(memberDto.firstName);
      expect(newMember.lastName).toBe(memberDto.lastName);
      expect(newMember.userName).toBe(memberDto.userName);
      expect(newMember.contactNumber).toBe(memberDto.contactNumber);
      expect(newMember.member).toBe(memberDto.member);
      expect(newMember.active).toBe(memberDto.active);
      expect(newMember.role.roleName).toBe(newMemberRole.roleName);
    });
  });

  //!for adding pagination for later
  //get members
  describe("getMembers()", () => {
    it("should return empty array", async () => {
      await prisma.member.deleteMany();

      const result = await member.getMembers();

      expect(result).toEqual([]);
    });

    it("should get members", async () => {
      const member1 = await member.createMember({
        ...newMemberActive,
        roleId: roleId,
      });

      const member2 = await member.createMember({
        ...newMemberNotActive,
        roleId: roleId,
      });

      memberId = member1.id;

      const members = await member.getMembers();

      const expectedMembers = [member1, member2];

      expect(members.length).toBeGreaterThanOrEqual(2);
      expect(members).toEqual(expectedMembers);
    });
  });

  //get member by id
  describe("getMemberById()", () => {
    it("should return member by id", async () => {
      const result = await member.getMemberByid(memberId);

      expect(result.id).toBe(memberId);
      expect(result.firstName).toBe(newMemberActive.firstName);
      expect(result.lastName).toBe(newMemberActive.lastName);
    });

    it("should return not found exception", async () => {
      const nonExistentId = "non-existent-id";

      const result = member.getMemberByid(nonExistentId);

      await expect(result).rejects.toThrowError(NotFoundException);
    });
  });

  // deactivate member
  describe("deactivateMember", () => {
    it("should throw NotFoundException if member not found", async () => {
      const nonExistentId = "non-existent-id";

      const result = member.deactivateMember(nonExistentId);

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it("should deactivate member", async () => {
      const result = await member.deactivateMember(memberId);

      expect(result.id).toBe(memberId);
      expect(result.active).toBeFalsy();
    });
  });
});
