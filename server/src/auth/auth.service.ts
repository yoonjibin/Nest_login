import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/Entity/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}
  async register(data: any) {
    const user = await this.authRepository.findOne({ id: data.id });

    if (user) {
      throw new UnauthorizedException();
    }
    const hash = await bcrypt.hash(data.pw, 10);

    const Userdata = this.authRepository.create({
      id: data.id,
      pw: hash,
      name: data.name,
    });

    const User = this.authRepository.save(Userdata);

    delete (await User).pw;

    return User;
  }
  async login(data: any) {
    const User = this.authRepository.findOne({ id: data.id });
    if (User && (await User).id !== data.id) {
      throw new UnauthorizedException();
    }
    const payload = { id: data.id, name: (await User).name };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
