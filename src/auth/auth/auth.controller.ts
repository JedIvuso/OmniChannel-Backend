import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from '../register-auth.dto/login-auth.dto';
import { RegisterAuthDto } from '../register-auth.dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @Post('createuseracc')
  createUserAcc(@Body() dto: RegisterAuthDto) {
    return this.authService.createUserAcc(dto);
  }
}
