import { Controller, Get, Delete, Query } from '@nestjs/common';
import { achievementsService } from './achievements.service'
import { AcievementDto2 } from '../dto/achievements'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrMsgDto } from 'src/dto/utility';

@ApiTags('achievements')
@Controller('achievements')
export class achievementsController {
  constructor(private achievementsService: achievementsService){}

  @ApiOperation({ summary: '유저 칭호 검색'})
  @ApiResponse({ 
    type: AcievementDto2, 
    description: `
      유저의 칭호 배열
      검색 실패시 실패 이유 반환
    ` })
  @ApiQuery({ name: 'user_id', example:'jinbkim', description: '칭호를 검색할 유저아이디'})
  @Get()
    readAchoevements(@Query() q){
    return this.achievementsService.readAchievements(q.user_id);
  }
  
  @ApiOperation({ summary: '한 유저의 칭호 모두 삭제', description: '회원 탈퇴시 에만 사용됨'})
  @ApiResponse({ type: ErrMsgDto, description: '칭호 삭제 실패시 실패 이유' })
  @ApiQuery({ name: 'user_id', example:'jinbkim', description: '모든 칭호를 삭제할 유저아이디'})
  @Delete()
  deleteAllAchievements(@Query() q){
    console.log(q);
    return this.achievementsService.deleteAllAchievements(q.user_id);
  }
}