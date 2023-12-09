import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { CreateMemberDto } from "./common/dto";
import { MemberService } from "./member.service";

@Controller("member")
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get("members")
  getMembers() {
    return this.memberService.getMembers();
  }

  /**
   * get member by id
   * @param  {} @Param('id'
   * @param  {string} id
   */
  @Get(":id")
  getMemberByid(@Param("id", ParseUUIDPipe) id: string) {
    return this.memberService.getMemberByid(id);
  }

  /**
   * create or store members / non-members
   * @param  {} @Body(
   * @param  {CreateMemberDto} params
   */
  @Post("create")
  createMember(@Body() params: CreateMemberDto) {
    return this.memberService.createMember(params);
  }

  /**
   * deactivate member
   * @param  {} @Param('id'
   * @param  {string} id
   */
  @Post("deactivate/:id")
  deactivateMember(@Param("id", ParseUUIDPipe) id: string) {
    return this.memberService.deactivateMember(id);
  }
}
