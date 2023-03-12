import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  exports: [AuthService],

  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
