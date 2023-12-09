import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.auth.validateMember(username, password);

    if (!user) throw new UnauthorizedException("Invalid username or password");

    return user;
  }
}
