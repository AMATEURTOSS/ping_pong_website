import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalModule } from 'src/global/global.module';
import { MatchModule } from 'src/match/match.module';
import { SessionModule } from 'src/session/session.module';
import { UsersModule } from 'src/users/users.module';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

/*
* Game 페이지 관련 모듈
* 1. 매칭 시스템
* 2. 대전 소켓 통신
*/
@Module({
	imports: [ SessionModule, UsersModule, MatchModule, GlobalModule],
  controllers: [GameController],
  providers: [GameService, GameGateway,]
})
export class GameModule {}
