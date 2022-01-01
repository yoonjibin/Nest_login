import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(data: any): Promise<any> {
    const user = await this.authService.validateUser(data);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
