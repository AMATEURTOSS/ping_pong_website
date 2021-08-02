import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { boolean } from 'joi';
import { BanService } from './ban.service';
import { BanDto1, BanDto2 } from 'src/dto/ban';

@ApiTags('Ban')
@Controller('ban')
export class BanController {
  constructor(private banService: BanService){}

  @ApiOperation({ summary: 'ban 설정'})
  @ApiResponse({ type: boolean, description: 'ban 설정 성공시 true, 실패시 false' })
  @ApiBody({ type: BanDto1, description: 'ban 설정할 채널아이디, 유저아이디' })
  @Post()
  createBan(@Body() b: BanDto1){
    return this.banService.createBan(b.user_id, b.channel_id);
  }

  @ApiOperation({ summary: '해당 유저가 해당 채널의 ban 인지 확인', description: 'ban 시간이 다지나면 ban 목록에서 지워짐'})
  @ApiResponse({ type: boolean, description: '유저가 ban이면 true, 아니면 false' })
  @ApiBody({ type: BanDto1, description: 'ban인지 확인할 유저아이디, 채널아이디' })
  @Get()
  isBan(@Body() b: BanDto1){
    return this.banService.isBan(b.user_id, b.channel_id);
  }

  @ApiOperation({ summary: '한 유저의 모든 ban 제거', description: '회원 탈퇴시 에만 사용됨'})
  @ApiResponse({ type: boolean, description: 'ban 제거 성공시 true, 실패시 false' })
  @ApiBody({ type: BanDto2, description: 'ban 제거할 유저아이디' })
  @Delete()
  deleteBan(@Body() b: BanDto2){
    return this.banService.deleteBan(b.user_id);
  }
}