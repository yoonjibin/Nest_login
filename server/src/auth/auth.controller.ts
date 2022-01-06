import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authUserDto } from './DTO/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private AuthService: AuthService,
    private JwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() user: authUserDto) {
    return this.AuthService.register(user);
  }
  @Post('/login')
  async login(@Body() user: authUserDto, @Res() res: Response) {
    try {
      await this.AuthService.login(user).then((result) => {
        res.status(200).json(result);
      });
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
