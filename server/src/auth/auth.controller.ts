import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { authUserDto } from './DTO/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('register')
  async register(@Body() data: authUserDto) {
    return this.AuthService.register(data);
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() data: authUserDto, @Request() Req) {
    return Req.body;
  }
}
