import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  exports: [BoardsService],
  
  // Entity를 사용할 때는 TypeOrmModule로
  // Repository를 사용할 때는 TypeOrmExModule로 구분하여 사용  
  imports: [
    TypeOrmModule.forFeature([Board]),
    TypeOrmExModule.forCustomRepository([BoardRepository]),
  ],
  controllers: [BoardsController],
  
  // 서비스 생성시 자동완성 
  // providers란? nest의 기본 개념! repository,factory,helper 등
  // 취급될 수 있음. 주요 idea는 종속성으로 주입할 수 있다! 객체 간 연결!
  providers: [BoardsService]
})
export class BoardsModule {}
