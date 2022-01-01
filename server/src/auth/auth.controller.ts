import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { authUserDto } from './DTO/auth.dto';
import { Response, Request } from 'express';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/register')
  async register(@Body() user: authUserDto) {
    return this.AuthService.register(user);
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() user: authUserDto) {
    return this.AuthService.login(user);
  }
}
