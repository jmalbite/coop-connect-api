import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create.member.dto';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  getMembers() {
    return this.memberService.getMembers();
  }

  /**
   * get member by id
   * @param  {} @Param('id'
   * @param  {string} id
   */
  @Get(':id')
  getMemberByid(@Param('id') id: string) {
    return this.memberService.getMemberByid(id);
  }

  @Post('create')
  createMember(@Body() params: CreateMemberDto) {
    console.log(params);
    return this.memberService.createMember(params);
  }

  /**
   * create member
   * @param  {} @Body(
   * @param  {CreateMemberDto} params
   */

  /**
   * deactivate member
   * @param  {} @Param('id'
   * @param  {string} id
   */
  @Post('deactivate/:id')
  deactivateMember(@Param('id') id: string) {
    return this.memberService.deactivateMember(id);
  }
}
