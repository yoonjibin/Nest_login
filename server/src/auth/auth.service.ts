import { BadRequestException, Injectable } from '@nestjs/common';
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
  async login(data: any) {
    const result = this.authRepository.findOne({ id: data.id });
    console.log(result);
    const payload = { id: data.id };
    console.log(payload);

    if (!result && (await bcrypt.compare((await result).pw === data.pw))) {
      throw new BadRequestException();
    }
    const jwt = this.jwtService.signAsync(payload);

    return jwt;
  }
  async check(cookie: string) {
    const { userdata } = this.jwtService.verify(cookie);

    if (userdata) {
      return true;
    }
  }
}
