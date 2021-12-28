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
    const result = this.authRepository.findOne({ id: data.id });

    if (result) throw new BadRequestException();

    const hash = await bcrypt.hash(data.pw, 10);

    const UserData = await this.authRepository.create({
      id: data.id,
      pw: hash,
      name: data.name,
    });

    const User = this.authRepository.save(UserData);

    delete (await User).pw;

    return User;
  }
  async validateUser(id: string, pw: string): Promise<any> {
    const user = await this.authRepository.findOne(id);
    if (user && (await bcrypt.compare(user.pw === pw))) {
      const { pw, ...result } = user;

      return result;
    }
    return null;
  }
  async login(data: any) {
    const result = this.authRepository.findOne({ id: data.id });
    const payload = { id: data.id };

    if (!result && (await bcrypt.compare((await result).pw === data.pw))) {
      throw new BadRequestException();
    }
    const jwt = this.jwtService.sign(payload);

    return jwt;
  }
  async check(cookie: string) {
    console.log(cookie);
    const jwt = await this.jwtService.verifyAsync(cookie);
    console.log(jwt);

    if (jwt) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
