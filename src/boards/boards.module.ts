import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  // Repository는 직접 작성(이렇게하면 Repository 사용가능)
  imports: [
    // 현재버젼에서 사용불가! forFeature 아래문으로 대체!
    // TypeOrmModule.forFeature([BoardRepository])
    TypeOrmExModule.forCustomRepository([Board])
  ],
  // 컨트롤러 생성시 자동완성
  controllers: [BoardsController],
  
  // 서비스 생성시 자동완성 
  // providers란? nest의 기본 개념! repository,factory,helper 등
  // 취급될 수 있음. 주요 idea는 종속성으로 주입할 수 있다! 객체 간 연결!
  providers: [BoardsService]
})
export class BoardsModule {}
