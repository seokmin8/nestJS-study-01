import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';

// TypeOrmModule를 사용하여 엔티티를 AppModule에 등록하기 위한 작업
@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    // other module imports
  ],
  // other AppModule config
})
export class AppModule {}
