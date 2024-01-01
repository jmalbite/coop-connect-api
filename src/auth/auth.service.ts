import { Injectable } from "@nestjs/common";
import { MemberService } from "src/member/member.service";
import { UserLoginDto } from "./common/dto/user-login.dto";

@Injectable()
export class AuthService {
  constructor(private member: MemberService) {}

  async validateMember(userName: string, password: string) {
    return this.member.validateMemberForAuth(userName, password);
  }

  async getMemberDetails(data: UserLoginDto) {
    const { username, password } = data;

    const member = await this.member.validateMemberForAuth(username, password);

    return {
      id: member.id,
      username: member.userName,
      roleName: member.role.roleName,
    };
  }
}
