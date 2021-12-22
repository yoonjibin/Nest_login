import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authUserDto } from './DTO/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('register')
  register(@Body() data: authUserDto) {
    return this.AuthService.register(data);
  }
}
