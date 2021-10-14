import { Body, Controller, Delete, forwardRef, Get, Inject, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersDto1, UsersDto2, UsersDto3, UsersDto4 } from 'src/dto/users';
import { ErrMsgDto } from 'src/dto/utility';
import { UsersService } from './users.service';
import { Request } from 'express';
import { SessionService } from 'src/session/session.service';
import { LoggedInGuard } from 'src/auth/logged-in.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(new LoggedInGuard())
export class UsersController {
  constructor(
    private usersService: UsersService,
    @Inject(forwardRef(() => SessionService))
    private sessionService: SessionService,
  ){}

  @ApiOperation({ summary: '유저 생성' })
  @ApiResponse({ type: ErrMsgDto, description: '유저 생성 실패시 실패 이유' })
  @ApiBody({ type: UsersDto1, description: '유저 아이디, 닉네임, 아바타 url' })
  @Post()
  creatUsers(@Body() b: UsersDto1){
    return this.usersService.createUsers(b.user_id, b.nick, b.avatar_url, '');
  }

  @ApiOperation({ summary: '유저 닉네임으로 유저의 프로필 검색'})
  @ApiResponse({ 
    type: UsersDto3, 
    description: `
      유저의 아이디, 닉네임, 아바타 url, 총 게임수, 이긴 게임수, 진 게임수, 래더점수, 유저의 상태
      검색 실패시 실패 이유
    ` })
  @ApiQuery({ name: 'nick', example: 'jinbkim',description: '프로필을 검색할 유저 닉네임' })
  @Get()
  readUsers1(@Query() q){
    return this.usersService.readUsers(q.nick, 'nick');
  }
  @ApiOperation({ summary: '유저 아이디로 유저의 프로필 검색'})
  @ApiResponse({ 
    type: UsersDto3, 
    description: `
      유저의 아이디, 닉네임, 아바타 url, 총 게임수, 이긴 게임수, 진 게임수, 래더점수, 유저의 상태
      검색 실패시 실패 이유
    ` })
  @ApiQuery({ name: 'user_id', example: 'jinbkim', description: '프로필을 검색할 유저 아이디' })
  @Get('user')
  readUsers2(@Query() q){
    return this.usersService.readUsers(q.user_id, 'user_id');
  }

  @ApiOperation({ summary: '유저 정보 변경'})
  @ApiResponse({ type: ErrMsgDto, description: '유저 정보 변경 실패시 실패 이유' })
  @ApiBody({ type: UsersDto2, description: '변경할 유저 아이디, 유저 닉네임, 아바타 이미지 url' })
  @Post('info')
  updateUsers(@Body() b: UsersDto2){
    return this.usersService.updateUsers(b.user_id, b.nick, b.avatar_url);
  }

  @ApiOperation({ summary: '유저 상태 변경'})
  @ApiResponse({ type: ErrMsgDto, description: '유저 상태 변경 실패시 실패 이유' })
  // @ApiBody({ type: UsersDto4, description: '변경할 유저 아이디, 유저 상태' })
  @ApiBody({ type: UsersDto4, description: '변경할 유저 닉네임, 유저 상태' })
  @Post('status')
  async updateStatus(@Body() b: UsersDto4){
    let user;
    user = await this.usersService.readUsers(b.nick, 'nick');
    return await this.usersService.updateStatus(user.user_id, b.status);
    // return this.usersService.updateStatus(b.user_id, b.status);
  }

  @ApiOperation({ summary: '유저 제거'})
  @ApiResponse({ type: ErrMsgDto, description: '유저 제거 실패시 실패 이유' })
  // @ApiQuery({ name: 'user_id', example: 'jinbkim', description: '제거할 유저 아이디' })
  @ApiQuery({ name: 'user_id', example: 'jinbkim', description: '제거할 유저 닉네임' })
  @Delete()
  async deleteUsers(@Query() q){
    let user;
    user = await this.usersService.readUsers(q.nick, 'nick');
    return await this.usersService.deleteUsers(user.user_id);
    // return this.usersService.deleteUsers(q.user_id);
  }

  @ApiOperation({ summary: '나의 정보 검색'})
  @ApiResponse({ 
    type: UsersDto3, 
    description: `
      유저의 아이디, 닉네임, 아바타 url, 총 게임수, 이긴 게임수, 진 게임수, 래더점수, 유저의 상태
      검색 실패시 실패 이유
    ` })
  @Get('myself')
  async getMyInfo(@Req() req: Request){
    let user_id = await this.sessionService.readUserId(req.sessionID);
    return await this.usersService.readUsers(user_id, 'user_id');
  }
}