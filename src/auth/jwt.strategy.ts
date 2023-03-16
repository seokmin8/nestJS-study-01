import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      // token생성 때 포함되는 시크릿 텍스트와 같은 값이 들어가야 됨
      secretOrKey: 'Secret1234',
      // 클라이언트 토큰이 어디서 오는지 명시해줌(bearerToken 타입으로)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  // token이 유효한지 확인이 되면 실행되는 메서드 validate
  async validate(payload) {
    // payload가 전달됨
    const { username } = payload; // username 이 들어있다
    // payload의 name과 DB의 name이 맞는지 확인
    const user: User = await this.userRepository.findOneBy({
      username: username,
    });

    // 같은 정보가 들어있지 않으면 예외발생
    if (!user) {
      throw new UnauthorizedException();
    }
    // 같은 정보가 들어있다면 user를 던져준다
    return user;
  }
}
