import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }
    
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username: username });

        if (user && (await bcrypt.compare(password, user.password))) {
            // 로그인 성공 구현부 -> 유저 토큰 생성해주기 ( Secret + Payload )
            // payload 에는 중요정보를 담지 않는다(토큰을 이용해 정보를 가져가기 쉬움)
            const payload = { username }
            const accessToken = await this.jwtService.sign(payload);
            // { 중괄호안에 담아서 주는것은 객체로 준다는 것 }
            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }

    }
}
