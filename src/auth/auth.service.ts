import { Injectable } from "@nestjs/common";
import { MemberService } from "src/member/member.service";

@Injectable()
export class AuthService {
  constructor(private member: MemberService) {}

  async validateMember(userName: string, password: string) {
    return this.member.validateMemberForAuth(userName, password);
  }
}
