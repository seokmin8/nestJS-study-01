import { Controller, Post, Body, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
// import { Post } from "@nestjs/common";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // singUp 메서드가 실행되기 전 유효성 조건을 확인    
    @Post('/signup')
    signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authcredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }

    // validate 메서드의 return값이 user인데 요청값에 user가 없다!?
    @Post('/test')
    // 인증에 관한 middlewere -> validate에서 return되는 user가 요청에 포함된다
    @UseGuards(AuthGuard()) 
    test(@GetUser() user: User) {
        console.log('user', user);
    }
}
