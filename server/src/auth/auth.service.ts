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
    console.log(data);
    const user = await this.authRepository.findOne({ id: data.id });
    console.log(user);

    if (user) {
      throw new UnauthorizedException();
    }
    const hash = await bcrypt.hash(data.pw, 10);

    const Userdata = this.authRepository.create({
      id: data.id,
      pw: hash,
      name: data.name,
    });
    console.log(Userdata);

    const User = this.authRepository.save(Userdata);

    delete (await User).pw;
    console.log(User);

    return User;
  }
  async login(data: any) {
    const User = this.authRepository.findOne({ id: data.id });
    if (User && (await User).id !== data.id) {
      return '일치하지않는아이디';
    }
    const payload = { id: data.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
