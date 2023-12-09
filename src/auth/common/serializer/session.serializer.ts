import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { MemberService } from "src/member/member.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private member: MemberService) {
    super();
  }

  serializeUser(member: any, done: (err: Error, member: any) => void): any {
    done(null, { id: member.id });
  }

  deserializeUser(payload: any, done: (err: Error, payload: any) => void): any {
    done(null, payload);
  }
}
