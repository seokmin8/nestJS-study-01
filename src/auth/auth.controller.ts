import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
// import { Post } from "@nestjs/common";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

        @Post('/signup')
        signUp(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void> {
            return this.authService.signUp(authcredentialsDto);
        }
}
