import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authUserDto } from './DTO/auth.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('register')
  register(@Body() data: authUserDto) {
    return this.AuthService.register(data);
  }
  @Post('login')
  login(@Body() data: authUserDto, @Res({ passthrough: true }) res: Response) {
    const jwt = this.AuthService.login(data);

    res.cookie('auth', jwt, { httpOnly: true });
    res.send();
  }

  @Get('check')
  check(@Req() req: Request) {
    const cookie = req.cookies['auth'];
    if (this.AuthService.check(cookie)) {
      return true;
    }
    return false;
  }
}
